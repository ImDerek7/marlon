import { useRef, useState, useCallback } from "react";
import { MoveHorizontal } from "lucide-react";
import { Reveal, SectionHeading } from "@/components/Reveal";
import { IMAGES } from "@/data/content";

const BeforeAfter = () => {
  const ref = useRef(null);
  const [pos, setPos] = useState(50);
  const dragging = useRef(false);

  const update = useCallback((clientX) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    setPos(Math.min(96, Math.max(4, ((clientX - r.left) / r.width) * 100)));
  }, []);

  return (
    <section data-testid="before-after-section" className="py-24 md:py-32 bg-[#121316] border-y border-[#272A35]">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <SectionHeading
          id="before-after"
          overline="Před / Po"
          title="Rozdíl poznáte na první pohled"
          text="Táhněte jezdec a porovnejte. Ukázka je ilustrační – skutečné fotografie před a po realizaci budou doplněny."
        />
        <Reveal>
          <div
            ref={ref}
            data-testid="before-after-slider"
            className="relative aspect-[16/10] md:aspect-[21/9] overflow-hidden rounded-2xl border border-[#272A35] select-none touch-none cursor-ew-resize"
            onPointerDown={(e) => {
              dragging.current = true;
              e.currentTarget.setPointerCapture(e.pointerId);
              update(e.clientX);
            }}
            onPointerMove={(e) => dragging.current && update(e.clientX)}
            onPointerUp={() => (dragging.current = false)}
            onPointerCancel={() => (dragging.current = false)}
          >
            <img
              src={IMAGES.after}
              alt="Po realizaci"
              className="absolute inset-0 w-full h-full object-cover"
              draggable={false}
            />
            <div
              className="absolute inset-0 overflow-hidden"
              style={{ width: `${pos}%` }}
            >
              <img
                src={IMAGES.before}
                alt="Před realizací"
                className="absolute inset-0 h-full object-cover"
                style={{ width: ref.current?.getBoundingClientRect().width || "100vw" }}
                draggable={false}
              />
              <div className="absolute inset-0 bg-[#0A0A0C]/25" />
            </div>
            <div
              className="absolute top-0 bottom-0 w-px bg-[#D97706]"
              style={{ left: `${pos}%` }}
            >
              <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-[#D97706] flex items-center justify-center shadow-lg shadow-black/50">
                <MoveHorizontal size={20} className="text-[#0A0A0C]" strokeWidth={2.5} />
              </div>
            </div>
            <span className="absolute top-4 left-4 rounded-full bg-[#0A0A0C]/70 backdrop-blur-md px-3 py-1 text-[11px] font-bold uppercase tracking-[0.2em] text-white">
              Před
            </span>
            <span className="absolute top-4 right-4 rounded-full bg-[#D97706] px-3 py-1 text-[11px] font-bold uppercase tracking-[0.2em] text-[#0A0A0C]">
              Po
            </span>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default BeforeAfter;
