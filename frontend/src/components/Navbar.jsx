import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone } from "lucide-react";
import { CONTACT } from "@/data/content";

const LINKS = [
  { label: "Úvod", hash: "#uvod" },
  { label: "Služby", hash: "#sluzby" },
  { label: "Galerie", hash: "#galerie" },
  { label: "Recenze", hash: "#recenze" },
  { label: "Kontakt", hash: "#kontakt" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const onHome = location.pathname === "/";
  const href = (h) => (onHome ? h : `/${h}`);

  return (
    <>
      <header
        data-testid="main-header"
        className="fixed top-0 inset-x-0 z-50 bg-[#0A0A0C]/80 backdrop-blur-md border-b border-[#272A35]"
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-8 h-16 md:h-[72px] flex items-center justify-between">
          <Link to="/" data-testid="nav-logo" className="flex items-baseline gap-2 group">
            <span className="font-display text-2xl font-black tracking-tight text-white">
              MAFER<span className="text-[#D97706]">.</span>
            </span>
            <span className="hidden lg:block text-[10px] uppercase tracking-[0.2em] text-[#71717A] group-hover:text-[#A1A1AA] transition-colors">
              malířské a úklidové služby
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-8" data-testid="nav-desktop">
            {LINKS.map((l) => (
              <a
                key={l.hash}
                href={href(l.hash)}
                data-testid={`nav-link-${l.hash.slice(1)}`}
                className="text-sm font-medium text-[#A1A1AA] hover:text-white transition-colors"
              >
                {l.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <a
              href={CONTACT.phoneHref}
              data-testid="nav-call-button"
              className="hidden md:inline-flex items-center gap-2 rounded-full bg-[#D97706] hover:bg-[#F59E0B] text-[#0A0A0C] text-sm font-bold px-5 py-2.5 transition-colors"
            >
              <Phone size={15} strokeWidth={2.5} />
              {CONTACT.phone}
            </a>
            <button
              data-testid="nav-menu-toggle"
              onClick={() => setOpen(true)}
              className="md:hidden p-2 text-white"
              aria-label="Otevřít menu"
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            data-testid="nav-mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[60] bg-[#0A0A0C] flex flex-col"
          >
            <div className="h-16 px-5 flex items-center justify-between border-b border-[#272A35]">
              <span className="font-display text-2xl font-black text-white">
                MAFER<span className="text-[#D97706]">.</span>
              </span>
              <button
                data-testid="nav-menu-close"
                onClick={() => setOpen(false)}
                className="p-2 text-white"
                aria-label="Zavřít menu"
              >
                <X size={26} />
              </button>
            </div>
            <nav className="flex-1 flex flex-col justify-center px-8 gap-2">
              {LINKS.map((l, i) => (
                <motion.a
                  key={l.hash}
                  href={href(l.hash)}
                  data-testid={`nav-mobile-link-${l.hash.slice(1)}`}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, x: -24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.08 + i * 0.06, duration: 0.4 }}
                  className="font-display text-4xl font-bold text-[#A1A1AA] hover:text-white py-2 transition-colors"
                >
                  {l.label}
                </motion.a>
              ))}
            </nav>
            <div className="p-6 border-t border-[#272A35] flex gap-3">
              <a
                href={CONTACT.phoneHref}
                data-testid="nav-mobile-call"
                className="flex-1 inline-flex items-center justify-center gap-2 rounded-full bg-[#D97706] text-[#0A0A0C] font-bold py-3.5"
              >
                <Phone size={16} strokeWidth={2.5} /> Zavolat
              </a>
              <a
                href={href("#kontakt")}
                data-testid="nav-mobile-quote"
                onClick={() => setOpen(false)}
                className="flex-1 inline-flex items-center justify-center rounded-full border border-[#272A35] text-white font-bold py-3.5"
              >
                Poptat
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
