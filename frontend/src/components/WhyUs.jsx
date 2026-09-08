import { ShieldCheck, BadgeCheck, Layers, UserCheck, Handshake } from "lucide-react";
import { Reveal, SectionHeading } from "@/components/Reveal";
import { WHY_US } from "@/data/content";

const ICONS = { ShieldCheck, BadgeCheck, Layers, UserCheck, Handshake };

const WhyUs = () => (
  <section id="proc-mafer" data-testid="why-us-section" className="py-24 md:py-32 bg-[#121316] border-y border-[#272A35]">
    <div className="max-w-7xl mx-auto px-5 sm:px-8">
      <SectionHeading
        id="why-us"
        overline="Proč si vybrat MAFER"
        title="Řemeslo, na které se můžete spolehnout"
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-5">
        {WHY_US.map((w, i) => {
          const Icon = ICONS[w.icon];
          const span = i < 3 ? "lg:col-span-2" : "lg:col-span-3";
          return (
            <Reveal key={w.title} delay={i * 0.08} className={span}>
              <div
                data-testid={`why-us-card-${i}`}
                className="group h-full rounded-2xl border border-[#272A35] hover:border-[#D97706]/60 bg-[#0A0A0C] p-7 transition-colors duration-300 hover:-translate-y-1"
              >
                <div className="flex items-center justify-between mb-6">
                  <div className="w-11 h-11 rounded-xl bg-[#1A1C23] border border-[#272A35] flex items-center justify-center">
                    <Icon size={20} className="text-[#D97706]" />
                  </div>
                  <span className="font-display text-sm font-bold text-[#3F3F46]">
                    0{i + 1}
                  </span>
                </div>
                <h3 className="font-display text-xl font-bold text-white tracking-tight">{w.title}</h3>
                <p className="mt-2 text-sm text-[#A1A1AA] leading-relaxed">{w.desc}</p>
              </div>
            </Reveal>
          );
        })}
      </div>
    </div>
  </section>
);

export default WhyUs;
