import { ShieldCheck, FileBadge, ExternalLink } from "lucide-react";
import { Reveal, SectionHeading } from "@/components/Reveal";
import { CONTACT } from "@/data/content";

const Trust = () => (
  <section data-testid="trust-section" className="py-24 md:py-32 bg-[#121316] border-y border-[#272A35]">
    <div className="max-w-7xl mx-auto px-5 sm:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
      <div>
        <SectionHeading
          id="trust"
          overline="Důvěra a ověření"
          title="Důvěra zákazníků je pro nás důležitá"
          text="MAFER má veřejně uvedený firemní profil s identifikovatelnými údaji a hodnocením. Fungujeme jako řádně registrovaný živnostník."
        />
        <Reveal delay={0.15}>
          <ul className="space-y-4">
            {[
              `Živnostník ${CONTACT.owner}, IČO ${CONTACT.ico}`,
              "Veřejně dohledatelný firemní profil a hodnocení",
              "Působnost Praha a okolí",
            ].map((t) => (
              <li key={t} className="flex items-start gap-3 text-[#D4D4D8] text-sm md:text-base">
                <ShieldCheck size={18} className="mt-0.5 shrink-0 text-[#D97706]" />
                {t}
              </li>
            ))}
          </ul>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={CONTACT.profiles.firemniProfil}
              target="_blank"
              rel="noopener noreferrer"
              data-testid="trust-link-firemniprofil"
              className="inline-flex items-center gap-2 rounded-full border border-[#272A35] hover:border-[#D97706]/60 px-5 py-2.5 text-sm font-semibold text-[#D4D4D8] hover:text-white transition-colors"
            >
              Firemniprofil.cz <ExternalLink size={14} />
            </a>
            <a
              href={CONTACT.profiles.nejRemeslnici}
              target="_blank"
              rel="noopener noreferrer"
              data-testid="trust-link-nejremeslnici"
              className="inline-flex items-center gap-2 rounded-full border border-[#272A35] hover:border-[#D97706]/60 px-5 py-2.5 text-sm font-semibold text-[#D4D4D8] hover:text-white transition-colors"
            >
              NejRemeslnici.cz <ExternalLink size={14} />
            </a>
          </div>
        </Reveal>
      </div>

      <Reveal delay={0.2}>
        <div
          data-testid="certificate-placeholder"
          className="relative rounded-2xl border-2 border-dashed border-[#272A35] bg-[#0A0A0C] aspect-[4/3] flex flex-col items-center justify-center text-center p-10"
        >
          <div className="w-14 h-14 rounded-2xl bg-[#1A1C23] border border-[#272A35] flex items-center justify-center mb-5">
            <FileBadge size={24} className="text-[#D97706]" />
          </div>
          <p className="font-display text-xl font-bold text-white">Prostor pro certifikát</p>
          <p className="mt-2 max-w-xs text-sm text-[#71717A] leading-relaxed">
            Sem bude vložen skutečný certifikát nebo známka ověření z firemního
            profilu. Po kliknutí půjde zvětšit.
          </p>
        </div>
      </Reveal>
    </div>
  </section>
);

export default Trust;
