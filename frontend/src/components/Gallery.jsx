import { useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { Expand } from "lucide-react";
import { Reveal, SectionHeading } from "@/components/Reveal";
import { GALLERY } from "@/data/content";

// Skutečné fotografie realizací MAFER: stačí vyměnit URL v GALLERY
// v souboru src/data/content.js – struktura galerie zůstane stejná.
const Gallery = () => {
  const [index, setIndex] = useState(-1);

  return (
    <section id="galerie" data-testid="gallery-section" className="py-24 md:py-32 bg-[#0A0A0C]">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <SectionHeading
          id="gallery"
          overline="Galerie"
          title="Ukázky naší práce"
          text="Fotografie skutečných realizací MAFER budou brzy doplněny – aktuálně ilustrační ukázky."
        />

        <div className="columns-2 md:columns-3 gap-4 [column-fill:balance]" data-testid="gallery-grid">
          {GALLERY.map((g, i) => (
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
      </div>

      <Lightbox
        open={index >= 0}
        close={() => setIndex(-1)}
        index={index}
        slides={GALLERY.map((g) => ({ src: g.src, title: g.title }))}
        styles={{ container: { backgroundColor: "rgba(10,10,12,0.95)" } }}
      />
    </section>
  );
};

export default Gallery;
