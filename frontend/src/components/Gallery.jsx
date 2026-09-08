import { useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { Expand, ArrowUpRight } from "lucide-react";
import { Reveal, SectionHeading } from "@/components/Reveal";
import { GALLERY, GALLERY_CATEGORIES } from "@/data/content";

const Gallery = () => {
  const [cat, setCat] = useState("vse");
  const [index, setIndex] = useState(-1);
  const items = GALLERY.filter((g) => cat === "vse" || g.cat === cat);

  return (
    <section id="galerie" data-testid="gallery-section" className="py-24 md:py-32 bg-[#0A0A0C]">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <SectionHeading
          id="gallery"
          overline="Galerie"
          title="Ukázky naší práce"
          text="Aktuálně ilustrační fotografie – skutečné realizace MAFER budou průběžně doplňovány na tato místa."
        />

        <Reveal className="flex flex-wrap gap-2 mb-10" delay={0.1}>
          {GALLERY_CATEGORIES.map((c) => (
            <button
              key={c.key}
              data-testid={`gallery-filter-${c.key}`}
              onClick={() => setCat(c.key)}
              className={`rounded-full px-4 py-2 text-xs font-bold uppercase tracking-wider border transition-colors ${
                cat === c.key
                  ? "bg-[#D97706] border-[#D97706] text-[#0A0A0C]"
                  : "border-[#272A35] text-[#A1A1AA] hover:border-[#D97706]/60 hover:text-white"
              }`}
            >
              {c.label}
            </button>
          ))}
        </Reveal>

        <div className="columns-2 md:columns-3 gap-4 [column-fill:balance]" data-testid="gallery-grid">
          {items.map((g, i) => (
            <Reveal key={g.id} delay={(i % 3) * 0.06} className="mb-4 break-inside-avoid">
              <button
                data-testid={`gallery-item-${g.id}`}
                onClick={() => setIndex(i)}
                className="group relative block w-full overflow-hidden rounded-xl border border-[#272A35] hover:border-[#D97706]/60 transition-colors"
              >
                <img
                  src={g.src}
                  alt={g.title}
                  loading="lazy"
                  className="w-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-[#0A0A0C]/0 group-hover:bg-[#0A0A0C]/45 transition-colors duration-300 flex items-end justify-between p-4">
                  <span className="text-sm font-semibold text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {g.title}
                  </span>
                  <Expand
                    size={18}
                    className="text-[#D97706] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  />
                </div>
              </button>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-16" delay={0.1}>
          <div className="rounded-2xl border border-[#272A35] bg-[#121316] p-8 md:p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <h3 className="font-display text-2xl md:text-3xl font-bold text-white tracking-tight">
                Chcete podobný výsledek?
              </h3>
              <p className="mt-2 text-[#A1A1AA]">Nechte si nezávazně nacenit vaši zakázku.</p>
            </div>
            <a
              href="#kontakt"
              data-testid="gallery-cta-quote"
              className="shrink-0 inline-flex items-center gap-2 rounded-full bg-[#D97706] hover:bg-[#F59E0B] text-[#0A0A0C] font-extrabold text-sm uppercase tracking-wider px-8 py-4 transition-colors"
            >
              Poptat zakázku <ArrowUpRight size={16} strokeWidth={2.5} />
            </a>
          </div>
        </Reveal>
      </div>

      <Lightbox
        open={index >= 0}
        close={() => setIndex(-1)}
        index={index}
        slides={items.map((g) => ({ src: g.src, title: g.title }))}
        styles={{ container: { backgroundColor: "rgba(10,10,12,0.95)" } }}
      />
    </section>
  );
};

export default Gallery;
