import { useLenis } from "./lib/useLenis";
import { Nav } from "./components/Nav";
import { Hero } from "./components/Hero";
import { TrustMarquee } from "./components/TrustMarquee";
import { Services } from "./components/Services";
import { Results } from "./components/Results";
import { Process } from "./components/Process";
import { Testimonials } from "./components/Testimonials";
import { Owner } from "./components/Owner";
import { FAQ } from "./components/FAQ";
import { Footer } from "./components/Footer";
import { StickyCTA } from "./components/StickyCTA";
import { ScrollProgress } from "./components/ScrollProgress";

export default function App() {
  useLenis();
  return (
    <>
      <ScrollProgress />
      <Nav />
      <main id="main">
        <Hero />
        <TrustMarquee />
        <Services />
        <Results />
        <Process />
        <Testimonials />
        <Owner />
        <FAQ />
      </main>
      <Footer />
      <StickyCTA />
    </>
  );
}
