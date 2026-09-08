import { Phone, Mail } from "lucide-react";
import { CONTACT } from "@/data/content";

const MobileCta = () => (
  <div
    data-testid="mobile-sticky-cta"
    className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-[#0A0A0C]/90 backdrop-blur-xl border-t border-[#272A35] px-4 pt-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))] flex gap-3"
  >
    <a
      href={CONTACT.phoneHref}
      data-testid="mobile-cta-call"
      className="flex-1 inline-flex items-center justify-center gap-2 rounded-full bg-[#D97706] active:bg-[#F59E0B] text-[#0A0A0C] font-extrabold text-sm py-3.5"
    >
      <Phone size={16} strokeWidth={2.5} /> Zavolat
    </a>
    <a
      href="/#kontakt"
      data-testid="mobile-cta-quote"
      className="flex-1 inline-flex items-center justify-center gap-2 rounded-full border border-[#272A35] text-white font-extrabold text-sm py-3.5"
    >
      <Mail size={16} /> Poptávka
    </a>
  </div>
);

export default MobileCta;
