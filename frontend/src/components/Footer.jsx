import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Facebook } from "lucide-react";
import { CONTACT } from "@/data/content";

const Footer = () => (
  <footer data-testid="footer" className="bg-[#0A0A0C] border-t border-[#272A35] overflow-hidden">
    <div className="max-w-7xl mx-auto px-5 sm:px-8 pt-16 pb-28 md:pb-10">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-16">
        <div className="md:col-span-2">
          <p className="font-display text-3xl font-black text-white">
            MAFER<span className="text-[#D97706]">.</span>
          </p>
          <p className="mt-1 text-xs uppercase tracking-[0.2em] text-[#71717A]">
            Malířské a úklidové služby
          </p>
          <p className="mt-5 text-sm text-[#A1A1AA] leading-relaxed max-w-sm">
            {CONTACT.owner} · Profesionální malířské, úklidové a vyklízecí práce
            v Praze a okolí.
          </p>
          {CONTACT.facebook ? (
            <a
              href={CONTACT.facebook}
              target="_blank"
              rel="noopener noreferrer"
              data-testid="footer-facebook"
              className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#A1A1AA] hover:text-[#F59E0B] transition-colors"
            >
              <Facebook size={16} /> Facebook
            </a>
          ) : (
            <span
              data-testid="footer-facebook-placeholder"
              title="Odkaz na Facebook profil bude doplněn"
              className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#52525B] cursor-not-allowed"
            >
              <Facebook size={16} /> Facebook (odkaz bude doplněn)
            </span>
          )}
        </div>

        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#D97706] mb-4">Kontakt</p>
          <ul className="space-y-3 text-sm">
            <li>
              <a href={CONTACT.phoneHref} data-testid="footer-phone" className="flex items-center gap-2 text-[#A1A1AA] hover:text-white transition-colors">
                <Phone size={14} className="text-[#D97706]" /> {CONTACT.phone}
              </a>
            </li>
            <li>
              <a href={CONTACT.emailHref} data-testid="footer-email" className="flex items-center gap-2 text-[#A1A1AA] hover:text-white transition-colors break-all">
                <Mail size={14} className="text-[#D97706] shrink-0" /> {CONTACT.email}
              </a>
            </li>
            <li className="flex items-start gap-2 text-[#A1A1AA]">
              <MapPin size={14} className="text-[#D97706] mt-1 shrink-0" />
              <span>
                {CONTACT.address}
                <br />
                IČO: {CONTACT.ico}
              </span>
            </li>
          </ul>
        </div>

        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#D97706] mb-4">Navigace</p>
          <ul className="space-y-3 text-sm">
            {[
              { label: "Úvod", to: "/#uvod" },
              { label: "Služby", to: "/#sluzby" },
              { label: "Galerie", to: "/#galerie" },
              { label: "O nás", to: "/#proc-mafer" },
              { label: "Kontakt", to: "/#kontakt" },
            ].map((l) => (
              <li key={l.label}>
                <Link to={l.to} data-testid={`footer-link-${l.label.toLowerCase().replace(/\s/g, "-")}`} className="text-[#A1A1AA] hover:text-white transition-colors">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div aria-hidden="true" className="select-none pointer-events-none -mx-2">
        <p className="font-display font-black text-center leading-[0.85] text-outline text-[22vw] md:text-[18vw]">
          MAFER
        </p>
      </div>

      <div className="mt-4 pt-8 border-t border-[#272A35] flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[#71717A]">
        <p>© {new Date().getFullYear()} {CONTACT.name} · {CONTACT.owner} · IČO {CONTACT.ico}</p>
        <div className="flex gap-6">
          <Link to="/ochrana-osobnich-udaju" data-testid="footer-link-gdpr" className="hover:text-white transition-colors">
            Ochrana osobních údajů
          </Link>
          <Link to="/obchodni-podminky" data-testid="footer-link-terms" className="hover:text-white transition-colors">
            Podmínky
          </Link>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
