import { Reveal, SectionHeading } from "@/components/Reveal";
import { PROCESS_STEPS } from "@/data/content";

const Process = () => (
  <section data-testid="process-section" className="py-24 md:py-32 bg-[#0A0A0C]">
    <div className="max-w-7xl mx-auto px-5 sm:px-8">
      <SectionHeading
        id="process"
        overline="Jak probíhá zakázka"
        title="Čtyři kroky k hotové práci"
      />
      <div className="grid grid-cols-1 md:grid-cols-4 gap-px bg-[#272A35] rounded-2xl overflow-hidden border border-[#272A35]">
        {PROCESS_STEPS.map((s, i) => (
          <Reveal key={s.n} delay={i * 0.1}>
            <div
              data-testid={`process-step-${i}`}
              className="group relative h-full bg-[#0A0A0C] hover:bg-[#121316] p-8 transition-colors duration-300"
            >
              <span className="font-display text-6xl md:text-7xl font-black text-outline group-hover:text-[#D97706] group-hover:[-webkit-text-stroke:0px] transition-all duration-500">
                {s.n}
              </span>
              <div className="mt-8 w-8 h-px bg-[#D97706]" />
              <h3 className="mt-5 font-display text-2xl font-bold text-white tracking-tight">
                {s.title}
              </h3>
              <p className="mt-2 text-sm text-[#A1A1AA] leading-relaxed">{s.desc}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

export default Process;
