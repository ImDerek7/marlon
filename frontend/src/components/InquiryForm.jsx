import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Phone, Mail, MapPin, Send, CheckCircle2, Paperclip, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Reveal, SectionHeading } from "@/components/Reveal";
import { CONTACT, SERVICE_OPTIONS } from "@/data/content";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const schema = z.object({
  jmeno: z.string().min(2, "Zadejte prosím jméno"),
  telefon: z.string().min(6, "Zadejte prosím telefon"),
  email: z.string().email("Zadejte prosím platný e-mail"),
  sluzba: z.string().optional(),
  lokalita: z.string().optional(),
  termin: z.string().optional(),
  popis: z.string().optional(),
  souhlas: z.literal(true, { errorMap: () => ({ message: "Souhlas je povinný" }) }),
});

const inputCls =
  "w-full rounded-xl bg-[#0A0A0C] border border-[#272A35] focus:border-[#D97706] focus:outline-none focus:ring-1 focus:ring-[#D97706] px-4 py-3.5 text-sm text-white placeholder:text-[#52525B] transition-colors";

const Field = ({ label, error, children, testid }) => (
  <div>
    <label className="block text-xs font-bold uppercase tracking-[0.15em] text-[#A1A1AA] mb-2">
      {label}
    </label>
    {children}
    {error && (
      <p data-testid={`${testid}-error`} className="mt-1.5 text-xs text-red-400">
        {error}
      </p>
    )}
  </div>
);

const InquiryForm = () => {
  const [sent, setSent] = useState(false);
  const [fileNames, setFileNames] = useState([]);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(schema) });

  const onSubmit = async (values) => {
    const fd = new FormData();
    Object.entries(values).forEach(([k, v]) => fd.append(k, String(v)));
    const files = document.getElementById("inquiry-photos")?.files || [];
    Array.from(files).slice(0, 5).forEach((f) => fd.append("fotky", f));
    try {
      const res = await fetch(`${API}/inquiry`, { method: "POST", body: fd });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.detail || "Odeslání se nezdařilo");
      }
      setSent(true);
    } catch (e) {
      toast.error("Poptávku se nepodařilo odeslat", {
        description: "Zkuste to prosím znovu, nebo zavolejte na " + CONTACT.phone,
      });
    }
  };

  return (
    <section id="kontakt" data-testid="contact-section" className="py-24 md:py-32 bg-[#121316] border-y border-[#272A35]">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16">
        <div className="lg:col-span-2">
          <SectionHeading
            id="contact"
            overline="Kontakt / Poptávka"
            title="Potřebujete pomoci s interiérem, úklidem nebo vyklízením?"
            text="Napište nám nebo zavolejte. Domluvíme se na rozsahu práce a dalším postupu."
          />
          <Reveal delay={0.15}>
            <div className="space-y-4">
              <a
                href={CONTACT.phoneHref}
                data-testid="contact-phone-link"
                className="flex items-center gap-4 rounded-2xl border border-[#272A35] hover:border-[#D97706]/60 bg-[#0A0A0C] p-5 transition-colors group"
              >
                <span className="w-11 h-11 rounded-xl bg-[#1A1C23] border border-[#272A35] flex items-center justify-center shrink-0">
                  <Phone size={19} className="text-[#D97706]" />
                </span>
                <span>
                  <span className="block text-xs uppercase tracking-[0.15em] text-[#71717A]">Zavolejte</span>
                  <span className="block font-display text-xl font-bold text-white group-hover:text-[#F59E0B] transition-colors">
                    {CONTACT.phone}
                  </span>
                </span>
              </a>
              <a
                href={CONTACT.emailHref}
                data-testid="contact-email-link"
                className="flex items-center gap-4 rounded-2xl border border-[#272A35] hover:border-[#D97706]/60 bg-[#0A0A0C] p-5 transition-colors group"
              >
                <span className="w-11 h-11 rounded-xl bg-[#1A1C23] border border-[#272A35] flex items-center justify-center shrink-0">
                  <Mail size={19} className="text-[#D97706]" />
                </span>
                <span className="min-w-0">
                  <span className="block text-xs uppercase tracking-[0.15em] text-[#71717A]">Napište</span>
                  <span className="block font-semibold text-white group-hover:text-[#F59E0B] transition-colors truncate">
                    {CONTACT.email}
                  </span>
                </span>
              </a>
              <div className="flex items-center gap-4 rounded-2xl border border-[#272A35] bg-[#0A0A0C] p-5" data-testid="contact-area">
                <span className="w-11 h-11 rounded-xl bg-[#1A1C23] border border-[#272A35] flex items-center justify-center shrink-0">
                  <MapPin size={19} className="text-[#D97706]" />
                </span>
                <span>
                  <span className="block text-xs uppercase tracking-[0.15em] text-[#71717A]">Působíme</span>
                  <span className="block font-semibold text-white">{CONTACT.area}</span>
                </span>
              </div>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.1} className="lg:col-span-3">
          {sent ? (
            <div
              data-testid="inquiry-success"
              className="h-full min-h-[420px] rounded-2xl border border-[#D97706]/40 bg-[#0A0A0C] flex flex-col items-center justify-center text-center p-10"
            >
              <CheckCircle2 size={52} className="text-[#D97706] mb-6" strokeWidth={1.5} />
              <h3 className="font-display text-3xl font-bold text-white tracking-tight">
                Děkujeme za poptávku
              </h3>
              <p className="mt-3 max-w-sm text-[#A1A1AA] leading-relaxed">
                Ozveme se vám co nejdříve. Pokud spěcháte, zavolejte na{" "}
                <a href={CONTACT.phoneHref} className="text-[#F59E0B] font-semibold">
                  {CONTACT.phone}
                </a>
                .
              </p>
            </div>
          ) : (
            <form
              data-testid="inquiry-form"
              onSubmit={handleSubmit(onSubmit)}
              className="rounded-2xl border border-[#272A35] bg-[#0A0A0C] p-6 md:p-9 space-y-5"
              noValidate
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <Field label="Jméno *" error={errors.jmeno?.message} testid="inquiry-name">
                  <input
                    {...register("jmeno")}
                    data-testid="inquiry-name"
                    placeholder="Vaše jméno"
                    className={inputCls}
                    autoComplete="name"
                  />
                </Field>
                <Field label="Telefon *" error={errors.telefon?.message} testid="inquiry-phone">
                  <input
                    {...register("telefon")}
                    data-testid="inquiry-phone"
                    placeholder="777 000 000"
                    className={inputCls}
                    autoComplete="tel"
                    inputMode="tel"
                  />
                </Field>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <Field label="E-mail *" error={errors.email?.message} testid="inquiry-email">
                  <input
                    {...register("email")}
                    data-testid="inquiry-email"
                    placeholder="vas@email.cz"
                    className={inputCls}
                    autoComplete="email"
                    inputMode="email"
                  />
                </Field>
                <Field label="Typ služby" testid="inquiry-service">
                  <select {...register("sluzba")} data-testid="inquiry-service" className={inputCls}>
                    <option value="">Vyberte službu…</option>
                    {SERVICE_OPTIONS.map((o) => (
                      <option key={o} value={o}>{o}</option>
                    ))}
                  </select>
                </Field>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <Field label="Lokalita" testid="inquiry-location">
                  <input
                    {...register("lokalita")}
                    data-testid="inquiry-location"
                    placeholder="např. Praha 9"
                    className={inputCls}
                  />
                </Field>
                <Field label="Preferovaný termín" testid="inquiry-date">
                  <input
                    {...register("termin")}
                    data-testid="inquiry-date"
                    type="date"
                    className={inputCls}
                  />
                </Field>
              </div>
              <Field label="Popis zakázky" testid="inquiry-message">
                <textarea
                  {...register("popis")}
                  data-testid="inquiry-message"
                  rows={4}
                  placeholder="Popište stručně, co potřebujete (velikost prostor, rozsah prací…)"
                  className={`${inputCls} resize-none`}
                />
              </Field>

              <div>
                <label
                  htmlFor="inquiry-photos"
                  data-testid="inquiry-photos-label"
                  className="flex items-center justify-center gap-2 rounded-xl border-2 border-dashed border-[#272A35] hover:border-[#D97706]/60 px-4 py-5 text-sm text-[#A1A1AA] hover:text-white cursor-pointer transition-colors"
                >
                  <Paperclip size={16} className="text-[#D97706]" />
                  {fileNames.length
                    ? `${fileNames.length} ${fileNames.length === 1 ? "fotografie připravena" : "fotografie připraveny"}`
                    : "Přiložit fotografie prostor (max. 5)"}
                </label>
                <input
                  id="inquiry-photos"
                  data-testid="inquiry-photos"
                  type="file"
                  accept="image/*"
                  multiple
                  className="hidden"
                  onChange={(e) => setFileNames(Array.from(e.target.files || []).map((f) => f.name))}
                />
              </div>

              <div>
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    {...register("souhlas")}
                    data-testid="inquiry-consent"
                    className="mt-0.5 w-4 h-4 rounded border-[#272A35] bg-[#0A0A0C] accent-[#D97706]"
                  />
                  <span className="text-xs text-[#A1A1AA] leading-relaxed">
                    Souhlasím se{" "}
                    <a href="/ochrana-osobnich-udaju" className="underline hover:text-white">
                      zpracováním osobních údajů
                    </a>{" "}
                    za účelem vyřízení poptávky. *
                  </span>
                </label>
                {errors.souhlas && (
                  <p data-testid="inquiry-consent-error" className="mt-1.5 text-xs text-red-400">
                    {errors.souhlas.message}
                  </p>
                )}
              </div>

              <button
                type="submit"
                data-testid="inquiry-submit"
                disabled={isSubmitting}
                className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-[#D97706] hover:bg-[#F59E0B] disabled:opacity-60 text-[#0A0A0C] font-extrabold text-sm uppercase tracking-wider px-8 py-4 transition-colors"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 size={16} className="animate-spin" /> Odesílám…
                  </>
                ) : (
                  <>
                    Odeslat poptávku <Send size={15} strokeWidth={2.5} />
                  </>
                )}
              </button>
            </form>
          )}
        </Reveal>
      </div>
    </section>
  );
};

export default InquiryForm;
