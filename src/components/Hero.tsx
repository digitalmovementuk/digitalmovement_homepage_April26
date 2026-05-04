import { useEffect, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, ArrowDown } from "lucide-react";
import { useMagnetic } from "../lib/useMagnetic";
import { ContactForm } from "./ContactForm";
import { HeroReviewSlider } from "./HeroReviewSlider";
import { HeroRipples } from "./HeroRipples";

const HEADLINE_LINES = [
  { words: ["Guaranteed", "Results"], highlight: true },
] as const;

export function Hero() {
  const reduce = useReducedMotion();
  const ctaRef = useMagnetic<HTMLAnchorElement>(0.22, 8);
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = true;
    v.defaultMuted = true;
    v.play().catch(() => {});
  }, []);

  return (
    <section
      id="top"
      ref={sectionRef}
      className="relative isolate overflow-hidden pt-[100px] pb-14 sm:pt-[116px] sm:pb-16 md:pt-[128px] md:pb-20 lg:pt-[120px] lg:pb-16 xl:pt-[140px] xl:pb-20 lg:min-h-[100svh] lg:max-h-[100svh] flex flex-col justify-center text-white"
    >
      <HeroRipples scope={sectionRef} />

      {/* Video background — same treatment as the proof bar:
          brand-colour video + 55% dark wash + radial vignette + grain. */}
      <div aria-hidden className="absolute inset-0 -z-10 overflow-hidden">
        {/* Brand-colour fallback so the section never flashes white before
            the video paints (or when the user prefers reduced motion). */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(120deg, #FFB23D 0%, #F05F22 28%, #EC178D 58%, #D332FF 88%)",
          }}
        />
        {!reduce && (
          <video
            ref={videoRef}
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            // @ts-expect-error fetchpriority is missing from React types
            fetchpriority="high"
            className="absolute inset-0 h-full w-full object-cover scale-110"
            src={`${import.meta.env.BASE_URL}video/dm-color-theme.mp4`}
            {...({ "webkit-playsinline": "true", "x5-playsinline": "true" } as Record<string, string>)}
          />
        )}
        {/* 40% dark wash — balances video visibility with headline contrast */}
        <div className="absolute inset-0 bg-ink/40" />
        {/* Radial vignette — pushes the centre slightly darker so big text pops */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(120% 80% at 50% 50%, rgba(15,8,32,0.10) 0%, rgba(15,8,32,0.45) 100%)",
          }}
        />
        {/* Subtle grain */}
        <div className="noise opacity-40" />
      </div>

      <div className="container-dm-wide">
        <div className="grid gap-8 lg:gap-10 xl:gap-14 lg:grid-cols-[minmax(0,1fr)_400px] xl:grid-cols-[minmax(0,1fr)_440px] 2xl:grid-cols-[minmax(0,1fr)_480px] items-start">
          {/* LEFT: copy + CTAs */}
          <div className="text-center lg:text-left order-1 min-w-0 max-w-full">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="flex justify-center lg:justify-start max-w-full min-w-0"
            >
              <HeroReviewSlider />
            </motion.div>

            {/* Founder-led caption — quiet credibility anchor that delivers
                the longevity cue without standing alone as a stat. */}
            <motion.p
              className="mt-6 sm:mt-7 lg:mt-6 text-[11px] sm:text-[12px] font-bold uppercase tracking-[0.22em] text-white/70"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.35 }}
            >
              Founder-led · Since 2018
            </motion.p>

            <h1
              className="display mt-3 sm:mt-4 md:mt-5 text-[clamp(40px,11vw,92px)] sm:text-[clamp(40px,7vw,92px)] uppercase max-w-full !text-white drop-shadow-[0_2px_24px_rgba(0,0,0,0.45)]"
            >
              {HEADLINE_LINES.map((line, li) => {
                const inner = line.words.map((word, wi) => {
                  const idx = li * 4 + wi;
                  return (
                    <span key={`${li}-${wi}`} className="word-reveal mr-[0.22em]">
                      <span style={{ animationDelay: `${0.12 + idx * 0.06}s` }}>
                        {word}
                      </span>
                    </span>
                  );
                });
                return (
                  <span key={li} className="block">
                    {line.highlight ? (
                      <span className="highlight-sweep">{inner}</span>
                    ) : (
                      inner
                    )}
                  </span>
                );
              })}
            </h1>

            <motion.p
              className="mt-5 sm:mt-6 lg:mt-5 xl:mt-6 max-w-[600px] mx-auto lg:mx-0 text-[17px] sm:text-[18px] lg:text-[17px] xl:text-[18px] leading-relaxed text-white/85"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.6 }}
            >
              <span className="font-bold text-white">
                Your business deserves real growth.
              </span>{" "}
              We are the best-value UK digital marketing agency — founder-led,
              plain English, no agency jargon.
            </motion.p>

            <motion.div
              className="mt-7 sm:mt-8 lg:mt-7 flex flex-wrap items-center justify-center lg:justify-start gap-3"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.78 }}
            >
              <a ref={ctaRef} href="#contact" className="btn-pill btn-primary">
                Free Proposal <ArrowRight size={16} />
              </a>
              <a
                href="#case-studies"
                className="btn-pill btn-secondary-on-dark"
              >
                <ArrowDown size={14} strokeWidth={2.4} /> Case Studies
              </a>
            </motion.div>

          </div>

          {/* RIGHT: contact form — fades up then pulses 3 times to draw attention */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="order-2 lg:sticky lg:top-[120px]"
            id="contact"
          >
            <div className="form-pulse-on-load ambient-float rounded-card">
              <ContactForm variant="hero" />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Hero scroll cue — inverted for the dark video backdrop */}
      <a
        href="#services"
        aria-label="Scroll to services"
        className="scroll-cue absolute left-1/2 -translate-x-1/2 bottom-6 sm:bottom-8 lg:bottom-10 xl:bottom-12 flex flex-col items-center gap-2 text-[12px] sm:text-[13px] font-bold uppercase tracking-[0.22em] text-white/80 hover:text-white transition"
      >
        <span className="grid h-14 w-14 sm:h-16 sm:w-16 place-items-center rounded-full border border-white/30 bg-white/15 backdrop-blur-md shadow-card text-white">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <path d="M12 5v14" />
            <path d="m6 13 6 6 6-6" />
          </svg>
        </span>
        Scroll
      </a>
    </section>
  );
}
