import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import CtaStrip from "@/components/CtaStrip";
import Gallery from "@/components/Gallery";
import Reviews from "@/components/Reviews";
import InquiryForm from "@/components/InquiryForm";
import Footer from "@/components/Footer";
import MobileCta from "@/components/MobileCta";

export default function Home() {
  return (
    <main data-testid="home-page">
      <Navbar />
      <Hero />
      <Services />
      <CtaStrip
        testid="cta-after-services"
        title="Potřebujete malovat, uklidit nebo vyklidit?"
        text="Ozvěte se MAFER a domluvte si nezávaznou poptávku."
      />
      <Gallery />
      <CtaStrip
        testid="cta-after-gallery"
        title="Líbí se vám naše práce?"
        text="Domluvte si nezávaznou poptávku."
      />
      <Reviews />
      <InquiryForm />
      <Footer />
      <MobileCta />
    </main>
  );
}
