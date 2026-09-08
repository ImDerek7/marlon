import { useEffect } from "react";
import "@/App.css";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Lenis from "lenis";
import { Toaster } from "@/components/ui/sonner";
import Home from "@/pages/Home";
import ServicePage from "@/pages/ServicePage";
import LegalPage from "@/pages/LegalPage";

const ScrollManager = () => {
  const location = useLocation();
  useEffect(() => {
    const lenis = window.__lenis;
    if (location.hash) {
      const t = setTimeout(() => {
        if (lenis) lenis.scrollTo(location.hash, { offset: -72, duration: 1.2 });
        else document.querySelector(location.hash)?.scrollIntoView();
      }, 120);
      return () => clearTimeout(t);
    }
    if (lenis) lenis.scrollTo(0, { immediate: true });
    else window.scrollTo(0, 0);
  }, [location]);
  return null;
};

function App() {
  useEffect(() => {
    const lenis = new Lenis({ duration: 1.15, smoothWheel: true });
    window.__lenis = lenis;
    let raf;
    const loop = (t) => {
      lenis.raf(t);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
      window.__lenis = null;
    };
  }, []);

  return (
    <div className="grain bg-[#0A0A0C] min-h-screen text-[#F4F4F5]">
      <BrowserRouter>
        <ScrollManager />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sluzby/:slug" element={<ServicePage />} />
          <Route path="/ochrana-osobnich-udaju" element={<LegalPage type="gdpr" />} />
          <Route path="/obchodni-podminky" element={<LegalPage type="terms" />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </BrowserRouter>
      <Toaster position="top-center" theme="dark" />
    </div>
  );
}

export default App;
