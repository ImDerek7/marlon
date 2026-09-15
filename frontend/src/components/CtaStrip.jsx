import { Phone, ArrowRight } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { CONTACT } from "@/data/content";

const CtaStrip = ({ title, text, testid }) => (
  <section
    data-testid={testid}
    className="py-16 md:py-20 bg-[#121316] border-y border-[#272A35] relative overflow-hidden"
  >
    <div
      className="absolute inset-0 opacity-[0.05] pointer-events-none"
      style={{ backgroundImage: "radial-gradient(circle at 85% 50%, #D97706 0%, transparent 55%)" }}
    />
    <div className="relative max-w-7xl mx-auto px-5 sm:px-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
      <Reveal>
        <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-white">
          {title}
        </h2>
        <p className="mt-2 text-[#A1A1AA] text-base sm:text-lg">{text}</p>
      </Reveal>
      <Reveal delay={0.1} className="flex flex-col sm:flex-row gap-3 shrink-0 w-full md:w-auto">
        <a
          href={CONTACT.phoneHref}
          data-testid={`${testid}-call`}
          className="inline-flex items-center justify-center gap-2 rounded-full bg-[#D97706] hover:bg-[#F59E0B] text-[#0A0A0C] font-extrabold text-sm uppercase tracking-wider px-8 py-4 transition-colors"
        >
          <Phone size={16} strokeWidth={2.5} /> Zavolat MAFER
        </a>
        <a
          href="#kontakt"
          data-testid={`${testid}-quote`}
          className="inline-flex items-center justify-center gap-2 rounded-full border border-[#272A35] hover:border-[#D97706] hover:text-[#F59E0B] text-white font-extrabold text-sm uppercase tracking-wider px-8 py-4 transition-colors"
        >
          Nezávazně poptat <ArrowRight size={15} strokeWidth={2.5} />
        </a>
      </Reveal>
    </div>
  </section>
);

export default CtaStrip;
