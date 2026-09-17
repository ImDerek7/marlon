import { useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/styles.css";
import { Expand, ArrowUpRight, Phone } from "lucide-react";
import { Reveal, SectionHeading } from "@/components/Reveal";
import { GALLERY, CONTACT } from "@/data/content";

const Gallery = () => {
  const [index, setIndex] = useState(-1);

  return (
    <section id="galerie" data-testid="gallery-section" className="py-24 md:py-32 bg-[#0A0A0C]">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <SectionHeading
          id="gallery"
          overline="Galerie"
          title="Ukázky naší práce"
          text="Skutečné realizace MAFER – malování, úklid, renovace i nátěry. Fotografie pochází přímo z našich zakázek."
        />

        <div
          className="grid grid-cols-2 md:grid-cols-6 grid-flow-dense gap-3 md:gap-4 auto-rows-[130px] sm:auto-rows-[160px] md:auto-rows-[190px]"
          data-testid="gallery-grid"
        >
          {GALLERY.map((g, i) => (
            <Reveal key={g.id} delay={(i % 4) * 0.05} className={`${g.mob} ${g.span}`}>
              <button
                data-testid={`gallery-item-${g.id}`}
                onClick={() => setIndex(i)}
                className="group relative block w-full h-full overflow-hidden rounded-xl border border-[#272A35] hover:border-[#D97706]/60 transition-colors"
              >
                <img
                  src={g.src}
                  alt={g.title}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-[#0A0A0C]/0 group-hover:bg-[#0A0A0C]/45 transition-colors duration-300 flex items-end justify-between p-4">
                  <span className="text-sm font-semibold text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-left">
                    {g.title}
                  </span>
                  <Expand
                    size={18}
                    className="text-[#D97706] opacity-0 group-hover:opacity-100 transition-opacity duration-300 shrink-0"
                  />
                </div>
              </button>
            </Reveal>
          ))}

          <Reveal delay={0.1} className="col-span-2 md:col-span-4 md:row-span-2">
            <div
              data-testid="gallery-cta-tile"
              className="flex flex-col justify-between w-full h-full min-h-[130px] rounded-xl border border-[#D97706]/40 bg-[#D97706]/10 p-6 md:p-8"
            >
              <p className="font-display text-xl md:text-2xl font-bold text-white tracking-tight max-w-xs">
                Vaše zakázka může být další.
              </p>
              <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-3">
                <a
                  href={CONTACT.phoneHref}
                  data-testid="gallery-cta-call"
                  className="inline-flex items-center gap-2 rounded-full bg-[#D97706] hover:bg-[#F59E0B] text-[#0A0A0C] text-xs font-extrabold uppercase tracking-wider px-5 py-2.5 transition-colors"
                >
                  <Phone size={14} strokeWidth={2.5} /> Zavolat
                </a>
                <a
                  href="#kontakt"
                  data-testid="gallery-cta-quote"
                  className="group inline-flex items-center gap-2 text-sm font-extrabold uppercase tracking-wider text-[#F59E0B] hover:text-white transition-colors"
                >
                  Nezávazně poptat
                  <ArrowUpRight size={16} strokeWidth={2.5} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </div>

      <Lightbox
        open={index >= 0}
        close={() => setIndex(-1)}
        index={index}
        slides={GALLERY.map((g) => ({ src: g.src, title: g.title }))}
        plugins={[Zoom]}
        styles={{ container: { backgroundColor: "rgba(10,10,12,0.95)" } }}
      />
    </section>
  );
};

export default Gallery;
