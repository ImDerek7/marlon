import { Phone, Mail } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { CONTACT } from "@/data/content";

const CtaBanner = () => (
  <section data-testid="cta-banner" className="py-24 md:py-32 bg-[#0A0A0C] relative overflow-hidden">
    <div
      className="absolute inset-0 opacity-[0.06]"
      style={{
        backgroundImage: "radial-gradient(circle at 70% 30%, #D97706 0%, transparent 55%)",
      }}
    />
    <div className="relative max-w-5xl mx-auto px-5 sm:px-8 text-center">
      <Reveal>
        <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#D97706] mb-5">
          Nezávazná konzultace
        </p>
      </Reveal>
      <Reveal delay={0.08}>
        <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-black tracking-tighter text-white leading-[1.05]">
          Plánujete malování,
          <br />
          úklid nebo vyklízení?
        </h2>
      </Reveal>
      <Reveal delay={0.16}>
        <p className="mt-5 text-[#A1A1AA] text-base sm:text-lg">
          Ozvěte se a domluvte si nezávaznou konzultaci.
        </p>
      </Reveal>
      <Reveal delay={0.24}>
        <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
          <a
            href={CONTACT.phoneHref}
            data-testid="cta-banner-call"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-[#D97706] hover:bg-[#F59E0B] text-[#0A0A0C] font-extrabold text-sm uppercase tracking-wider px-9 py-4 transition-colors"
          >
            <Phone size={16} strokeWidth={2.5} /> {CONTACT.phone}
          </a>
          <a
            href={CONTACT.emailHref}
            data-testid="cta-banner-email"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-[#272A35] hover:border-[#D97706] hover:text-[#F59E0B] text-white font-extrabold text-sm uppercase tracking-wider px-9 py-4 transition-colors"
          >
            <Mail size={16} /> Napsat e-mail
          </a>
        </div>
      </Reveal>
    </div>
  </section>
);

export default CtaBanner;
