import { motion } from "framer-motion";

export const Reveal = ({ children, delay = 0, className = "", y = 28 }) => (
  <motion.div
    initial={{ opacity: 0, y }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-60px" }}
    transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    className={className}
  >
    {children}
  </motion.div>
);

export const SectionHeading = ({ overline, title, text, id }) => (
  <div className="max-w-2xl mb-14 md:mb-20">
    {overline && (
      <Reveal>
        <p
          data-testid={`${id}-overline`}
          className="text-xs font-bold uppercase tracking-[0.25em] text-[#D97706] mb-4"
        >
          {overline}
        </p>
      </Reveal>
    )}
    <Reveal delay={0.08}>
      <h2 className="font-display text-4xl sm:text-5xl font-bold tracking-tight text-white leading-[1.05]">
        {title}
      </h2>
    </Reveal>
    {text && (
      <Reveal delay={0.16}>
        <p className="mt-5 text-base sm:text-lg text-[#A1A1AA] leading-relaxed">{text}</p>
      </Reveal>
    )}
  </div>
);
