import { Link } from "react-router-dom";
import { PaintRoller, Sparkles, Truck, Wrench, ArrowUpRight, Check } from "lucide-react";
import { Reveal, SectionHeading } from "@/components/Reveal";
import { SERVICES_MAIN, SERVICES_EXTRA } from "@/data/content";

const ICONS = { PaintRoller, Sparkles, Truck, Wrench };

const CARDS = [
  ...SERVICES_MAIN,
  {
    slug: null,
    icon: "Wrench",
    title: "Další řemeslné práce",
    desc: "Lakýrnické práce, renovace, montáže a drobné opravy.",
    image: null,
    items: SERVICES_EXTRA,
  },
];

const Services = () => (
  <section id="sluzby" data-testid="services-section" className="py-24 md:py-32 bg-[#0A0A0C]">
    <div className="max-w-7xl mx-auto px-5 sm:px-8">
      <SectionHeading
        id="services"
        overline="Naše služby"
        title="Co pro vás uděláme"
        text="Malování, úklid i vyklízení můžete zkombinovat do jedné zakázky. Méně starostí, jedna domluva, jeden výsledek."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {CARDS.map((s, i) => {
          const Icon = ICONS[s.icon];
          return (
            <Reveal key={s.title} delay={i * 0.08}>
              <Link
                to={s.slug ? `/sluzby/${s.slug}` : "/#kontakt"}
                data-testid={`service-card-${s.slug || "dalsi-remeslne-prace"}`}
                className="group relative block h-full overflow-hidden rounded-2xl border border-[#272A35] hover:border-[#D97706]/60 bg-[#121316] transition-colors duration-300 hover:-translate-y-1"
              >
                {s.image ? (
                  <div className="relative h-48 md:h-56">
                    <img
                      src={s.image}
                      alt={s.title}
                      loading="lazy"
                      className="absolute inset-0 w-full h-full object-cover opacity-70 group-hover:opacity-90 group-hover:scale-105 transition-all duration-700"
                    />
                    <div
                      className="absolute inset-0"
                      style={{ background: "linear-gradient(to top, #121316 8%, rgba(18,19,22,0.1) 60%)" }}
                    />
                    <div className="absolute top-5 left-5 w-12 h-12 rounded-xl bg-[#0A0A0C]/70 backdrop-blur-md border border-[#D97706]/40 flex items-center justify-center">
                      <Icon size={22} className="text-[#D97706]" />
                    </div>
                  </div>
                ) : (
                  <div className="relative h-48 md:h-56 bg-[#1A1C23] flex items-center justify-center">
                    <Icon size={56} className="text-[#D97706] opacity-80 group-hover:scale-110 transition-transform duration-500" strokeWidth={1.25} />
                  </div>
                )}
                <div className="p-6 md:p-8">
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="font-display text-2xl md:text-3xl font-bold tracking-tight text-white">
                      {s.title}
                    </h3>
                    <span className="mt-1 shrink-0 w-9 h-9 rounded-full border border-[#272A35] group-hover:border-[#D97706] group-hover:bg-[#D97706] flex items-center justify-center transition-colors duration-300">
                      <ArrowUpRight size={16} className="text-[#A1A1AA] group-hover:text-[#0A0A0C] transition-colors" />
                    </span>
                  </div>
                  <p className="mt-3 text-sm md:text-base text-[#A1A1AA] leading-relaxed">{s.desc}</p>
                  <ul className="mt-5 flex flex-wrap gap-2">
                    {s.items.map((item) => (
                      <li
                        key={item}
                        className="inline-flex items-center gap-1.5 rounded-full bg-[#1A1C23] border border-[#272A35] px-3 py-1.5 text-xs font-medium text-[#D4D4D8]"
                      >
                        <Check size={12} className="text-[#D97706]" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </Link>
            </Reveal>
          );
        })}
      </div>
    </div>
  </section>
);

export default Services;
