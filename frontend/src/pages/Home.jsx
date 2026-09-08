import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import WhyUs from "@/components/WhyUs";
import Gallery from "@/components/Gallery";
import BeforeAfter from "@/components/BeforeAfter";
import Process from "@/components/Process";
import Trust from "@/components/Trust";
import Reviews from "@/components/Reviews";
import InquiryForm from "@/components/InquiryForm";
import CtaBanner from "@/components/CtaBanner";
import Footer from "@/components/Footer";
import MobileCta from "@/components/MobileCta";

export default function Home() {
  return (
    <main data-testid="home-page">
      <Navbar />
      <Hero />
      <Services />
      <WhyUs />
      <Gallery />
      <BeforeAfter />
      <Process />
      <Trust />
      <Reviews />
      <InquiryForm />
      <CtaBanner />
      <Footer />
      <MobileCta />
    </main>
  );
}
