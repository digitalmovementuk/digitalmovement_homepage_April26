import { useLenis } from "./lib/useLenis";
import { Nav } from "./components/Nav";
import { Hero } from "./components/Hero";
import { TrustMarquee } from "./components/TrustMarquee";
import { BrandVideoStrip } from "./components/BrandVideoStrip";
import { Services } from "./components/Services";
import { CaseStudies } from "./components/CaseStudies";
import { Process } from "./components/Process";
import { Testimonials } from "./components/Testimonials";
import { Owner } from "./components/Owner";
import { FAQ } from "./components/FAQ";
import { Footer } from "./components/Footer";
import { StickyCTA } from "./components/StickyCTA";
import { ScrollProgress } from "./components/ScrollProgress";
import { GoogleReviewBadge } from "./components/GoogleReviewBadge";

export default function App() {
  useLenis();
  return (
    <>
      <ScrollProgress />
      <Nav />
      <main id="main">
        <Hero />
        <TrustMarquee />
        <BrandVideoStrip />
        <Services />
        <CaseStudies />
        <Process />
        <Testimonials />
        <Owner />
        <FAQ />
      </main>
      <Footer />
      <GoogleReviewBadge />
      <StickyCTA />
    </>
  );
}
