import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { REVIEWS } from "@/data/content";

const AUTOPLAY_MS = 4500;

const Stars = () => (
  <div className="flex gap-1 justify-center" aria-label="5 z 5 hvězdiček">
    {Array.from({ length: 5 }).map((_, i) => (
      <Star key={i} size={18} className="fill-[#D97706] text-[#D97706]" />
    ))}
  </div>
);

const Reviews = () => {
  const [index, setIndex] = useState(0);
  const [dir, setDir] = useState(1);
  const [paused, setPaused] = useState(false);
  const count = REVIEWS.length;

  const go = useCallback(
    (d) => {
      setDir(d);
      setIndex((i) => (i + d + count) % count);
    },
    [count]
  );

  useEffect(() => {
    if (paused || count < 2) return;
    const t = setInterval(() => go(1), AUTOPLAY_MS);
    return () => clearInterval(t);
  }, [paused, go, count]);

  if (!count) return null;
  const r = REVIEWS[index];

  return (
    <section id="recenze" data-testid="reviews-section" className="py-24 md:py-32 bg-[#0A0A0C]">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <Reveal>
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#D97706] mb-4">
              Recenze
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="font-display text-4xl sm:text-5xl font-bold tracking-tight text-white">
              Co říkají naši zákazníci
            </h2>
          </Reveal>
          <Reveal delay={0.16}>
            <div className="mt-5 flex flex-col items-center gap-2">
              <Stars />
              <p className="text-sm text-[#A1A1AA]">
                Ověřené zkušenosti zákazníků z veřejného firemního profilu
              </p>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <div
            className="max-w-3xl mx-auto"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            data-testid="reviews-carousel"
          >
            <div className="rounded-2xl border border-[#272A35] bg-[#121316] px-7 py-10 md:px-14 md:py-14 min-h-[320px] flex flex-col overflow-hidden">
              <Quote size={36} className="text-[#D97706] mb-6 shrink-0" strokeWidth={1.5} />
              <AnimatePresence mode="wait" initial={false}>
                <motion.figure
                  key={index}
                  initial={{ opacity: 0, x: dir * 48 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: dir * -48 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.25}
                  onDragEnd={(e, info) => {
                    if (info.offset.x < -60) go(1);
                    else if (info.offset.x > 60) go(-1);
                  }}
                  className="flex-1 flex flex-col cursor-grab active:cursor-grabbing touch-pan-y"
                  data-testid={`review-slide-${index}`}
                >
                  <blockquote className="flex-1 font-display text-xl md:text-2xl font-medium text-white leading-relaxed">
                    „{r.text}“
                  </blockquote>
                  <figcaption className="mt-8 flex items-center gap-3">
                    <span className="w-10 h-10 rounded-full bg-[#D97706]/15 border border-[#D97706]/40 flex items-center justify-center font-display font-bold text-[#D97706] shrink-0">
                      {r.name.charAt(0)}
                    </span>
                    <span>
                      <span className="block text-sm font-bold text-white">{r.name}</span>
                      <span className="block text-xs text-[#71717A]">{r.source}</span>
                    </span>
                  </figcaption>
                </motion.figure>
              </AnimatePresence>
            </div>

            <div className="mt-6 flex items-center justify-center gap-5">
              <button
                data-testid="reviews-prev"
                onClick={() => go(-1)}
                aria-label="Předchozí recenze"
                className="w-10 h-10 rounded-full border border-[#272A35] hover:border-[#D97706] hover:bg-[#D97706] text-[#A1A1AA] hover:text-[#0A0A0C] flex items-center justify-center transition-colors"
              >
                <ChevronLeft size={18} />
              </button>
              <div className="flex gap-2" data-testid="reviews-dots">
                {REVIEWS.map((rev, i) => (
                  <button
                    key={rev.name}
                    data-testid={`reviews-dot-${i}`}
                    onClick={() => {
                      setDir(i > index ? 1 : -1);
                      setIndex(i);
                    }}
                    aria-label={`Recenze ${i + 1}`}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      i === index ? "w-8 bg-[#D97706]" : "w-1.5 bg-[#3F3F46] hover:bg-[#71717A]"
                    }`}
                  />
                ))}
              </div>
              <button
                data-testid="reviews-next"
                onClick={() => go(1)}
                aria-label="Další recenze"
                className="w-10 h-10 rounded-full border border-[#272A35] hover:border-[#D97706] hover:bg-[#D97706] text-[#A1A1AA] hover:text-[#0A0A0C] flex items-center justify-center transition-colors"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default Reviews;
