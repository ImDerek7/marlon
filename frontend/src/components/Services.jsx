import { Link } from "react-router-dom";
import Marquee from "react-fast-marquee";
import { PaintRoller, Sparkles, Truck, ArrowUpRight, Check } from "lucide-react";
import { Reveal, SectionHeading } from "@/components/Reveal";
import { SERVICES_MAIN, SERVICES_EXTRA } from "@/data/content";

const ICONS = { PaintRoller, Sparkles, Truck };

const Services = () => (
  <section id="sluzby" data-testid="services-section" className="py-24 md:py-32 bg-[#0A0A0C]">
    <div className="max-w-7xl mx-auto px-5 sm:px-8">
      <SectionHeading
        id="services"
        overline="Naše služby"
        title="Vše pro váš interiér pod jednou střechou"
        text="Malování, úklid i vyklízení můžete zkombinovat do jedné zakázky. Méně starostí, jedna domluva, jeden výsledek."
      />

      <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
        {SERVICES_MAIN.map((s, i) => {
          const Icon = ICONS[s.icon];
          const wide = i === 0;
          return (
            <Reveal
              key={s.slug}
              delay={i * 0.1}
              className={wide ? "md:col-span-12" : "md:col-span-6"}
            >
              <Link
                to={`/sluzby/${s.slug}`}
                data-testid={`service-card-${s.slug}`}
                className="group relative block overflow-hidden rounded-2xl border border-[#272A35] hover:border-[#D97706]/60 bg-[#121316] transition-colors duration-300 hover:-translate-y-1"
              >
                <div className={wide ? "relative h-64 md:h-80" : "relative h-56"}>
                  <img
                    src={s.image}
                    alt={s.title}
                    loading="lazy"
                    className="absolute inset-0 w-full h-full object-cover opacity-70 group-hover:opacity-90 group-hover:scale-105 transition-all duration-700"
                  />
                  <div
                    className="absolute inset-0"
                    style={{ background: "linear-gradient(to top, #121316 8%, rgba(18,19,22,0.15) 60%)" }}
                  />
                  <div className="absolute top-5 left-5 w-12 h-12 rounded-xl bg-[#0A0A0C]/70 backdrop-blur-md border border-[#D97706]/40 flex items-center justify-center">
                    <Icon size={22} className="text-[#D97706]" />
                  </div>
                </div>
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

      <Reveal delay={0.15} className="mt-16">
        <div className="rounded-2xl border border-[#272A35] bg-[#121316] overflow-hidden">
          <div className="p-6 md:p-8 flex flex-col md:flex-row md:items-center gap-4 justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#D97706] mb-2">
                Další řemeslné práce
              </p>
              <p className="text-[#A1A1AA] text-sm md:text-base">
                Drobné práce, které doladí vaši zakázku do posledního detailu.
              </p>
            </div>
            <a
              href="#kontakt"
              data-testid="services-extra-cta"
              className="shrink-0 inline-flex items-center gap-2 text-sm font-bold text-white hover:text-[#F59E0B] transition-colors"
            >
              Poptat kombinaci služeb <ArrowUpRight size={16} />
            </a>
          </div>
          <div className="border-t border-[#272A35] py-4" data-testid="services-marquee">
            <Marquee speed={28} gradient={false} pauseOnHover>
              {SERVICES_EXTRA.map((item) => (
                <span key={item} className="mx-6 flex items-center gap-6 whitespace-nowrap">
                  <span className="font-display text-xl md:text-2xl font-bold text-[#3F3F46]">
                    {item}
                  </span>
                  <span className="w-2 h-2 rotate-45 bg-[#D97706]" />
                </span>
              ))}
            </Marquee>
          </div>
        </div>
      </Reveal>
    </div>
  </section>
);

export default Services;
