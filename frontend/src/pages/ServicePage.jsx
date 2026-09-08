import { useParams, Navigate } from "react-router-dom";
import { Phone, ArrowRight, Check } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MobileCta from "@/components/MobileCta";
import CtaBanner from "@/components/CtaBanner";
import { Reveal } from "@/components/Reveal";
import { SERVICE_PAGES, CONTACT } from "@/data/content";

export default function ServicePage() {
  const { slug } = useParams();
  const page = SERVICE_PAGES[slug];
  if (!page) return <Navigate to="/" replace />;

  return (
    <main data-testid={`service-page-${slug}`}>
      <Navbar />
      <section className="relative pt-40 pb-24 md:pb-32 overflow-hidden">
        <div className="absolute inset-0">
          <img src={page.image} alt={page.title} className="w-full h-full object-cover opacity-25" />
          <div
            className="absolute inset-0"
            style={{ background: "linear-gradient(to top, #0A0A0C 10%, rgba(10,10,12,0.5) 100%)" }}
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-5 sm:px-8">
          <Reveal>
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#D97706] mb-4">
              {page.overline}
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <h1 className="font-display text-5xl sm:text-6xl md:text-7xl font-black tracking-tighter text-white max-w-3xl leading-[1.02]">
              {page.title}
            </h1>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mt-6 max-w-xl text-base sm:text-lg text-[#A1A1AA] leading-relaxed">
              {page.lead}
            </p>
          </Reveal>
          <Reveal delay={0.24}>
            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <a
                href="/#kontakt"
                data-testid="service-cta-quote"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#D97706] hover:bg-[#F59E0B] text-[#0A0A0C] font-extrabold text-sm uppercase tracking-wider px-8 py-4 transition-colors"
              >
                Nezávazně poptat <ArrowRight size={16} strokeWidth={2.5} />
              </a>
              <a
                href={CONTACT.phoneHref}
                data-testid="service-cta-call"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/25 hover:border-[#D97706] hover:text-[#F59E0B] text-white font-extrabold text-sm uppercase tracking-wider px-8 py-4 transition-colors"
              >
                <Phone size={16} strokeWidth={2.5} /> {CONTACT.phone}
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="py-20 md:py-28 bg-[#121316] border-y border-[#272A35]">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 grid grid-cols-1 md:grid-cols-2 gap-5">
          {page.blocks.map((b, i) => (
            <Reveal key={b.title} delay={i * 0.1}>
              <div
                data-testid={`service-block-${i}`}
                className="h-full rounded-2xl border border-[#272A35] bg-[#0A0A0C] p-8"
              >
                <h2 className="font-display text-2xl font-bold text-white tracking-tight mb-6">
                  {b.title}
                </h2>
                <ul className="space-y-3.5">
                  {b.items.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-[#D4D4D8] text-sm md:text-base">
                      <Check size={17} className="mt-0.5 shrink-0 text-[#D97706]" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <CtaBanner />
      <Footer />
      <MobileCta />
    </main>
  );
}
