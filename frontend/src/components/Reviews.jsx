import { Star, MessageSquareQuote, ExternalLink } from "lucide-react";
import { Reveal, SectionHeading } from "@/components/Reveal";
import { REVIEWS, CONTACT } from "@/data/content";

const Stars = () => (
  <div className="flex gap-1" aria-label="5 z 5 hvězdiček">
    {Array.from({ length: 5 }).map((_, i) => (
      <Star key={i} size={16} className="fill-[#D97706] text-[#D97706]" />
    ))}
  </div>
);

const Reviews = () => (
  <section data-testid="reviews-section" className="py-24 md:py-32 bg-[#0A0A0C]">
    <div className="max-w-7xl mx-auto px-5 sm:px-8">
      <SectionHeading
        id="reviews"
        overline="Recenze"
        title="Co říkají zákazníci"
      />

      {REVIEWS.length === 0 ? (
        <Reveal>
          <div
            data-testid="reviews-empty-state"
            className="rounded-2xl border-2 border-dashed border-[#272A35] bg-[#121316] p-10 md:p-14 text-center"
          >
            <div className="mx-auto w-14 h-14 rounded-2xl bg-[#1A1C23] border border-[#272A35] flex items-center justify-center mb-5">
              <MessageSquareQuote size={24} className="text-[#D97706]" />
            </div>
            <h3 className="font-display text-2xl font-bold text-white tracking-tight">
              Recenze právě připravujeme
            </h3>
            <p className="mt-3 max-w-lg mx-auto text-[#A1A1AA] text-sm md:text-base leading-relaxed">
              Zobrazujeme pouze skutečné, ověřitelné recenze. Mezitím si můžete
              prohlédnout naše veřejné firemní profily.
            </p>
            <div className="mt-7 flex flex-wrap justify-center gap-3">
              <a
                href={CONTACT.profiles.firemniProfil}
                target="_blank"
                rel="noopener noreferrer"
                data-testid="reviews-link-firemniprofil"
                className="inline-flex items-center gap-2 rounded-full bg-[#1A1C23] border border-[#272A35] hover:border-[#D97706]/60 px-5 py-2.5 text-sm font-semibold text-white transition-colors"
              >
                Firemniprofil.cz <ExternalLink size={14} />
              </a>
              <a
                href={CONTACT.profiles.nejRemeslnici}
                target="_blank"
                rel="noopener noreferrer"
                data-testid="reviews-link-nejremeslnici"
                className="inline-flex items-center gap-2 rounded-full bg-[#1A1C23] border border-[#272A35] hover:border-[#D97706]/60 px-5 py-2.5 text-sm font-semibold text-white transition-colors"
              >
                NejRemeslnici.cz <ExternalLink size={14} />
              </a>
            </div>
          </div>
        </Reveal>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {REVIEWS.map((r, i) => (
            <Reveal key={i} delay={i * 0.08}>
              <figure
                data-testid={`review-card-${i}`}
                className="h-full rounded-2xl border border-[#272A35] bg-[#121316] p-7"
              >
                <Stars />
                <blockquote className="mt-4 text-[#D4D4D8] text-sm leading-relaxed">
                  „{r.text}“
                </blockquote>
                <figcaption className="mt-5 text-xs text-[#71717A]">
                  <span className="text-white font-semibold">{r.name}</span> · {r.date}
                  {r.source && <> · {r.source}</>}
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      )}
    </div>
  </section>
);

export default Reviews;
