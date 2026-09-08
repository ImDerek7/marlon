import { motion, useScroll, useTransform } from "framer-motion";
import { Phone, ArrowDown, ShieldCheck, MapPin } from "lucide-react";
import { CONTACT, IMAGES } from "@/data/content";

const LINES = [
  "Profesionální malířské,",
  "úklidové a vyklízecí",
  "práce v Praze.",
];

const Hero = () => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 700], [0, 160]);
  const opacity = useTransform(scrollY, [0, 500], [1, 0.35]);

  return (
    <section id="uvod" data-testid="hero-section" className="relative min-h-[100svh] flex items-end overflow-hidden">
      <motion.div style={{ y }} className="absolute inset-0">
        <img
          src={IMAGES.hero}
          alt="Řemeslník MAFER při práci"
          className="w-full h-[115%] object-cover"
          loading="eager"
        />
      </motion.div>
      <div className="absolute inset-0 bg-[#0A0A0C]/55" />
      <div
        className="absolute inset-0"
        style={{ background: "linear-gradient(to top, #0A0A0C 4%, rgba(10,10,12,0.25) 45%, rgba(10,10,12,0.45) 100%)" }}
      />

      <motion.div style={{ opacity }} className="relative z-10 w-full max-w-7xl mx-auto px-5 sm:px-8 pb-24 md:pb-32 pt-40">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="inline-flex items-center gap-2 rounded-full border border-[#D97706]/40 bg-[#0A0A0C]/60 backdrop-blur-md px-4 py-1.5 mb-8"
          data-testid="hero-trust-badge"
        >
          <ShieldCheck size={14} className="text-[#D97706]" />
          <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#F4F4F5]">
            Živnostník s veřejně uvedeným profilem · IČO {CONTACT.ico}
          </span>
        </motion.div>

        <h1 className="font-display text-5xl sm:text-6xl md:text-7xl font-black tracking-tighter text-white leading-[1.02] max-w-4xl">
          {LINES.map((line, i) => (
            <span key={i} className="block overflow-hidden pb-1">
              <motion.span
                className="block"
                initial={{ y: "110%" }}
                animate={{ y: 0 }}
                transition={{ duration: 0.9, delay: 0.25 + i * 0.13, ease: [0.22, 1, 0.36, 1] }}
              >
                {i === 2 ? (
                  <>
                    práce <span className="text-[#D97706]">v Praze.</span>
                  </>
                ) : (
                  line
                )}
              </motion.span>
            </span>
          ))}
        </h1>

        <motion.p
          data-testid="hero-subtitle"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.75, duration: 0.7 }}
          className="mt-6 max-w-xl text-base sm:text-lg text-[#D4D4D8] leading-relaxed"
        >
          Postaráme se o váš interiér od přípravy až po finální úklid. Kvalitní
          práce, férová komunikace a spolehlivý přístup.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.7 }}
          className="mt-10 flex flex-col sm:flex-row gap-4"
        >
          <a
            href="#kontakt"
            data-testid="hero-cta-quote"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-[#D97706] hover:bg-[#F59E0B] text-[#0A0A0C] font-extrabold text-sm uppercase tracking-wider px-9 py-4 transition-colors"
          >
            Nezávazně poptat
            <ArrowDown size={16} strokeWidth={2.5} />
          </a>
          <a
            href={CONTACT.phoneHref}
            data-testid="hero-cta-call"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-white/25 bg-[#0A0A0C]/40 backdrop-blur-md hover:border-[#D97706] hover:text-[#F59E0B] text-white font-extrabold text-sm uppercase tracking-wider px-9 py-4 transition-colors"
          >
            <Phone size={16} strokeWidth={2.5} />
            Zavolat · {CONTACT.phone}
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1, duration: 0.8 }}
          className="mt-10 flex items-center gap-2 text-[#A1A1AA] text-sm"
        >
          <MapPin size={15} className="text-[#D97706]" />
          {CONTACT.area}
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
