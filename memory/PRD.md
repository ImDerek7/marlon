# MAFER – web pro živnostníka (PRD)

## Původní zadání
Moderní, profesionální a důvěryhodný web pro MAFER – malířské a úklidové služby (Matyas Ferenc, Praha a okolí, IČO 17693021, tel 774 344 186, mattyas.ferenc1@seznam.cz). Cíl: získávání zákazníků. Prémiový tmavý design (antracit + zlatá), česky, mobil-first, SEO (LocalBusiness schema), sekce: hero, služby, proč MAFER, galerie s lightboxem, před/po slider, proces, certifikát/důvěra, recenze, poptávkový formulář s fotkami, CTA banner, footer. Podstránky pro služby. Nevymýšlet reference, certifikáty, ceny ani recenze – jen upravitelná místa.

## Architektura
- Frontend: React 19 + Tailwind, framer-motion (revealy, hero kinetic text), lenis (smooth scroll), react-fast-marquee, yet-another-react-lightbox, react-hook-form + zod.
- Backend: FastAPI, MongoDB (kolekce `inquiries`), Emergent managed Resend email (POST /api/inquiry → uložení + e-mail majiteli). Upload fotek do /app/backend/uploads (max 5 × 8 MB, jen obrázky). Rate-limit 6 poptávek/h/IP.
- Data obsahu: /app/frontend/src/data/content.js (služby, galerie, recenze, kontakty – jediné místo pro editace).
- Stránky: / (11 sekcí), /sluzby/:slug (3 podstránky), /ochrana-osobnich-udaju, /obchodni-podminky.

## User persony
- Domácnost v Praze hledající malíře/úklid – chce rychle zavolat.
- Majitel bytu po rekonstrukci – chce poslat poptávku s fotkami.
- Správce bytových prostor – hledá ověřitelnost (IČO, profily).

## Implementováno (2026-07, fork 1)
- Kompletní homepage se všemi 11 sekcemi dle zadání, kinetic hero s maskovaným reveal + parallax, marquee, číslované kroky procesu.
- Poptávkový formulář s validací, uploadem fotek a GDPR checkboxem → e-mail na mattyas.ferenc1@seznam.cz + uložení do DB. Ověřeno UI testem i curlem (e-mail skutečně odeslán).
- Galerie 16 fotek s filtry kategorií + fullscreen lightbox (ILUSTRAČNÍ stock fotky, označeno na webu).
- Interaktivní před/po slider (ilustrační, označeno).
- Sekce důvěry s odkazy na Firemniprofil.cz a NejRemeslnici.cz; placeholder pro certifikát.
- Recenze: záměrně prázdné (žádné vymyšlené) – prázdný stav s odkazy na profily; doplnění přes REVIEWS v content.js.
- 3 podstránky služeb, GDPR + obchodní podmínky, sticky mobilní CTA, hamburger menu, SEO meta + LocalBusiness JSON-LD.

## Iterace 2 (2026-07): zjednodušení a konverze
- Hero zkrácen: headline „Malování, úklid a vyklízení bez starostí", primární CTA „Zavolat MAFER" (tel), sekundární „Nezávazná poptávka"
- Služby: 4 rovnocenné bloky (Malířské práce – vč. viditelného odstranění plísní, Úklid, Vyklízení, Další řemeslné práce); marquee odstraněna
- Galerie: bez filtrů, jedna masonry sekce „Ukázky naší práce" + lightbox; výměna fotek = editace GALLERY v content.js
- Recenze: 5 skutečných recenzí z veřejného profilu (zdroj Firemniprofil.cz – Roman Č., Jonáš, David, Tomas, Nela) jako auto-carousel (4,5 s, šipky, tečky, swipe/drag, pauza na hover)
- Z homepage odebrány: Proč MAFER, Před/Po, Proces, Důvěra, CtaBanner (komponenty zůstávají v kódu pro pozdější použití)
- Nové CTA pásy (CtaStrip) po službách a pod galerií: Zavolat MAFER + Nezávazně poptat
- Facebook: https://www.facebook.com/matisek.ferenc (footer, target _blank)
- Navigace: Úvod, Služby, Galerie, Recenze, Kontakt
- Ověřeno screenshoty: hero, 4 karty služeb, CTA pásy, galerie bez filtrů, carousel (auto i ruční přepínání), Facebook link

## Backlog
- P0: Doplnit skutečné fotografie realizací (galerie, hero, před/po), skutečný certifikát, skutečné recenze, odkaz na Facebook profil.
- P1: AI-generované fotografie na míru (uživatel zvolil kombinaci stock + AI), OG image, favicon MAFER, admin přehled poptávek.
- P2: Blog/SEO články (např. "malování bytu Praha cena"), vícejazyčnost (EN), cookies lišta.

## Poznámky
- Fotky z poptávek se do e-mailu nepřikládají (proxy nepodporuje attachments) – v e-mailu je počet + ID poptávky, soubory jsou v /app/backend/uploads.
- E-mail odesílatele je platformní; odpověď jde přímo zákazníkovi (reply-to = e-mail zákazníka).
