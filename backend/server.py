from fastapi import FastAPI, APIRouter, UploadFile, File, Form, HTTPException, Request
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import re
import ipaddress
import logging
import time
import uuid
import httpx
from pathlib import Path
from html import escape
from html.parser import HTMLParser
from urllib.parse import urlparse
from datetime import datetime, timezone

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

app = FastAPI()
api_router = APIRouter(prefix="/api")

UPLOAD_DIR = ROOT_DIR / "uploads"
UPLOAD_DIR.mkdir(exist_ok=True)

# --- Emergent managed email (Resend proxy) ---
EMAIL_BASE_URL = "https://integrations.emergentagent.com"
EMAIL_KEY = os.environ["EMERGENT_EMAIL_KEY"]
EMAIL_FROM_NAME = os.environ["EMAIL_FROM_NAME"]
EMAIL_REPLY_TO = os.environ.get("EMAIL_REPLY_TO")
OWNER_EMAIL = os.environ["OWNER_EMAIL"]

_SHORTENERS = ("bit.ly", "tinyurl.com", "t.co", "is.gd", "cutt.ly", "goo.gl", "rebrand.ly")
_CRED_ASK = ("reply with your password", "reply with the code", "send your password", "cvv",
             "send us your password", "enter your password below", "confirm your card number",
             "your full card number", "seed phrase", "recovery phrase", "verify your card",
             "social security number", "confirm your bank details")
_HOSTISH = re.compile(r"\b(?:https?://)?((?:[a-z0-9-]+\.)+[a-z]{2,})", re.I)


def _host_ok(host: str) -> bool:
    if not host or "xn--" in host:
        return False
    try:
        ipaddress.ip_address(host)
        return False
    except ValueError:
        pass
    return not any(host == s or host.endswith("." + s) for s in _SHORTENERS)


def _same_site(shown: str, real: str) -> bool:
    return shown == real or real.endswith("." + shown) or shown.endswith("." + real)


class _EmailScan(HTMLParser):
    def __init__(self):
        super().__init__()
        self.tags, self.urls, self.anchors = set(), [], []
        self._href, self._text = None, []

    def handle_starttag(self, tag, attrs):
        self.tags.add(tag.lower())
        self.urls += [v for k, v in attrs if k.lower() in ("href", "src") and v]
        if tag.lower() == "a":
            self._href = dict((k.lower(), v) for k, v in attrs).get("href")
            self._text = []

    def handle_data(self, data):
        if self._href is not None:
            self._text.append(data)

    def handle_endtag(self, tag):
        if tag.lower() == "a" and self._href is not None:
            self.anchors.append((self._href, "".join(self._text)))
            self._href, self._text = None, []


def _assert_safe_email(subject: str, html: str) -> None:
    scan = _EmailScan()
    scan.feed(html)
    if scan.tags & {"form", "input", "textarea", "select"}:
        raise ValueError("No forms or input fields in email (G2)")
    body = f"{subject}\n{html}".lower()
    for p in _CRED_ASK:
        if p in body:
            raise ValueError(f"Email asks the recipient for credentials: {p!r} (G2)")
    for url in scan.urls:
        low = url.strip().lower()
        if low.startswith(("mailto:", "tel:", "cid:", "#")):
            continue
        if not low.startswith("https://"):
            raise ValueError(f"Email links/assets must be absolute https: {url!r} (G3)")
        host = urlparse(low).hostname or ""
        if not _host_ok(host) or urlparse(low).username is not None:
            raise ValueError(f"Shortened, numeric-host or credential-bearing URL: {url!r} (G3)")
    for href, text in scan.anchors:
        real = urlparse(href.strip().lower()).hostname or ""
        if not real:
            continue
        for m in _HOSTISH.finditer(text):
            if not _same_site(m.group(1).lower(), real):
                raise ValueError(f"Anchor text {m.group(1)!r} != real link host {real!r} (G3)")


async def send_email(*, to: str, subject: str, html: str, reply_to: str | None = None) -> str | None:
    _assert_safe_email(subject, html)
    payload = {"to": [to], "subject": subject, "html": html, "from_name": EMAIL_FROM_NAME}
    if reply_to or EMAIL_REPLY_TO:
        payload["contact_email"] = reply_to or EMAIL_REPLY_TO
    try:
        async with httpx.AsyncClient(timeout=30) as client_http:
            resp = await client_http.post(
                f"{EMAIL_BASE_URL}/api/v1/email/send",
                headers={"X-Email-Key": EMAIL_KEY},
                json=payload,
            )
        resp.raise_for_status()
        return resp.json().get("id")
    except httpx.HTTPStatusError as e:
        logger.error(f"Email send failed: {e.response.status_code} {e.response.text}")
        raise HTTPException(status_code=502, detail="Failed to send email")
    except Exception as e:
        logger.error(f"Email send error: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to send email")


# --- Simple per-IP rate limit: 6 inquiries / hour ---
_RATE: dict[str, list[float]] = {}


def _check_rate(ip: str):
    now = time.time()
    hits = [t for t in _RATE.get(ip, []) if now - t < 3600]
    if len(hits) >= 6:
        raise HTTPException(status_code=429, detail="Příliš mnoho poptávek. Zkuste to prosím později.")
    hits.append(now)
    _RATE[ip] = hits


@api_router.get("/")
async def root():
    return {"message": "MAFER API"}


@api_router.get("/health")
async def health():
    return {"status": "ok"}


ALLOWED_EXT = {".jpg", ".jpeg", ".png", ".webp", ".heic"}
MAX_FILE_SIZE = 8 * 1024 * 1024


@api_router.post("/inquiry")
async def create_inquiry(
    request: Request,
    jmeno: str = Form(...),
    telefon: str = Form(...),
    email: str = Form(...),
    sluzba: str = Form(""),
    lokalita: str = Form(""),
    termin: str = Form(""),
    popis: str = Form(""),
    souhlas: str = Form(...),
    fotky: list[UploadFile] = File(default=[]),
):
    if souhlas.lower() not in ("true", "on", "1", "ano"):
        raise HTTPException(status_code=422, detail="Souhlas se zpracováním osobních údajů je povinný.")
    if len(jmeno.strip()) < 2 or len(telefon.strip()) < 6 or "@" not in email:
        raise HTTPException(status_code=422, detail="Vyplňte prosím povinná pole.")
    _check_rate(request.client.host if request.client else "unknown")

    inquiry_id = str(uuid.uuid4())
    saved_files = []
    for f in (fotky or [])[:5]:
        if not f.filename:
            continue
        ext = Path(f.filename).suffix.lower()
        if ext not in ALLOWED_EXT:
            continue
        content = await f.read()
        if len(content) > MAX_FILE_SIZE or len(content) == 0:
            continue
        name = f"{inquiry_id}_{len(saved_files)}{ext}"
        (UPLOAD_DIR / name).write_bytes(content)
        saved_files.append(name)

    doc = {
        "id": inquiry_id,
        "jmeno": jmeno.strip(),
        "telefon": telefon.strip(),
        "email": email.strip(),
        "sluzba": sluzba.strip(),
        "lokalita": lokalita.strip(),
        "termin": termin.strip(),
        "popis": popis.strip(),
        "fotky": saved_files,
        "created_at": datetime.now(timezone.utc).isoformat(),
    }
    await db.inquiries.insert_one(doc)

    rows = [
        ("Jméno", doc["jmeno"]),
        ("Telefon", f'<a href="tel:{escape(doc["telefon"])}">{escape(doc["telefon"])}</a>'),
        ("E-mail", f'<a href="mailto:{escape(doc["email"])}">{escape(doc["email"])}</a>'),
        ("Typ služby", doc["sluzba"] or "—"),
        ("Lokalita", doc["lokalita"] or "—"),
        ("Preferovaný termín", doc["termin"] or "—"),
        ("Popis zakázky", (doc["popis"] or "—").replace("\n", "<br>")),
        ("Přiložené fotografie", str(len(saved_files))),
    ]
    body_rows = "".join(
        f'<tr><td style="padding:8px 16px 8px 0;color:#71717A;font-size:13px;vertical-align:top;white-space:nowrap">{label}</td>'
        f'<td style="padding:8px 0;color:#18181B;font-size:14px">{value}</td></tr>'
        for label, value in rows
    )
    html = (
        '<table role="presentation" width="100%" style="font-family:Arial,sans-serif"><tr><td style="padding:24px">'
        f'<p style="font-size:11px;letter-spacing:2px;color:#D97706;text-transform:uppercase;margin:0 0 8px">Nová poptávka z webu</p>'
        f'<h1 style="font-size:20px;color:#18181B;margin:0 0 16px">{escape(EMAIL_FROM_NAME)}</h1>'
        f'<table role="presentation">{body_rows}</table>'
        f'<p style="font-size:12px;color:#A1A1AA;margin-top:24px">Fotografie jsou uloženy v administraci webu (ID poptávky: {inquiry_id}). '
        f'Odesláno z webu {escape(EMAIL_FROM_NAME)}.</p>'
        '</td></tr></table>'
    )
    subject = f"Nová poptávka – {doc['sluzba'] or 'web MAFER'}"
    email_id = await send_email(to=OWNER_EMAIL, subject=subject, html=html, reply_to=doc["email"])

    return {"status": "success", "id": inquiry_id, "email_id": email_id}


app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
