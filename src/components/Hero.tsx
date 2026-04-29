import { useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Play } from "lucide-react";
import { heroStats } from "../content";
import { useCountUp } from "../lib/useCountUp";
import { useMagnetic } from "../lib/useMagnetic";
import { ContactForm } from "./ContactForm";
import { HeroReviewSlider } from "./HeroReviewSlider";
import { HeroRipples } from "./HeroRipples";

const HEADLINE_LINES = [
  { words: ["Guaranteed", "results."], highlight: true },
  { words: ["Page", "1", "Google."], highlight: false },
] as const;

export function Hero() {
  const reduce = useReducedMotion();
  const ctaRef = useMagnetic<HTMLAnchorElement>(0.22, 8);
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section
      id="top"
      ref={sectionRef}
      className="relative isolate overflow-hidden pt-[100px] pb-14 sm:pt-[116px] sm:pb-16 md:pt-[128px] md:pb-20 lg:pt-[120px] lg:pb-16 xl:pt-[140px] xl:pb-20 lg:min-h-[100svh] lg:max-h-[100svh] flex flex-col justify-center"
    >
      <HeroRipples scope={sectionRef} />
      {/* Background ambient — brand colour-theme video radiating motion */}
      <div aria-hidden className="absolute inset-0 -z-10 ambient-load overflow-hidden">
        {reduce ? (
          // Reduced-motion fallback: static conic gradient
          <div
            className="blob"
            style={{
              width: "60vw",
              height: "60vw",
              top: "-15vw",
              right: "-25vw",
              background:
                "conic-gradient(from 90deg at 50% 50%, #FFB23D, #F05F22, #EC178D, #D332FF, #FFB23D)",
              opacity: 0.22,
            }}
          />
        ) : (
          <video
            aria-hidden
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            className="absolute inset-0 h-full w-full object-cover"
            src="/video/dm-color-theme.mp4"
            {...({ "webkit-playsinline": "" } as Record<string, string>)}
          />
        )}
        {/* Cream tint so headline + form remain highly legible.
            Lighter on mobile so the brand video reads more vividly. */}
        <div
          className="absolute inset-0 bg-[rgba(250,247,242,0.62)] sm:bg-[rgba(250,247,242,0.72)] lg:bg-[rgba(250,247,242,0.78)]"
        />
        {/* Atmospheric pink glow on top of the cream */}
        <div
          className="blob"
          style={{
            width: "40vw",
            height: "40vw",
            bottom: "-15vw",
            left: "-10vw",
            background:
              "radial-gradient(closest-side, rgba(241,60,100,0.22), transparent 70%)",
            opacity: 0.55,
          }}
        />
        <div className="noise" />
      </div>

      <div className="container-dm-wide">
        <div className="grid gap-8 lg:gap-10 xl:gap-14 lg:grid-cols-[minmax(0,1fr)_400px] xl:grid-cols-[minmax(0,1fr)_440px] 2xl:grid-cols-[minmax(0,1fr)_480px] items-start">
          {/* LEFT: copy + CTAs + stats */}
          <div className="text-center lg:text-left order-1 min-w-0 max-w-full">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="flex justify-center lg:justify-start max-w-full min-w-0"
            >
              <HeroReviewSlider />
            </motion.div>

            <h1 className="display mt-7 sm:mt-9 md:mt-11 lg:mt-10 xl:mt-12 text-[clamp(30px,6vw,92px)] uppercase max-w-full">
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
              className="mt-5 sm:mt-6 lg:mt-5 xl:mt-6 max-w-[600px] mx-auto lg:mx-0 text-[15px] sm:text-[17px] md:text-[18px] lg:text-[17px] xl:text-[18px] leading-relaxed text-ink-soft"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.6 }}
            >
              We're a UK digital marketing agency that's gotten clients to page 1 in
              as little as 5&nbsp;days. Real leads. Real growth. Plain-English
              advice — no agency jargon.
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
              <a href="#results" className="btn-pill btn-ghost">
                <Play size={14} fill="currentColor" stroke="none" /> Case Studies
              </a>
            </motion.div>

            {/* Hero proof row — fills the column at 16" Mac */}
            <div className="mt-12 lg:mt-10 xl:mt-14 grid grid-cols-2 gap-x-6 gap-y-6 sm:grid-cols-4 max-w-[640px] mx-auto lg:mx-0">
              {heroStats.map((s, i) => (
                <Stat
                  key={i}
                  value={s.value}
                  suffix={s.suffix}
                  label={s.label}
                  delay={0.95 + i * 0.07}
                />
              ))}
            </div>
          </div>

          {/* Scroll cue — sits at the bottom of the left column on desktop */}

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

      {/* Hero scroll cue — centered on mobile, bottom-left on desktop */}
      <a
        href="#services"
        aria-label="Scroll to services"
        className="scroll-cue absolute left-1/2 -translate-x-1/2 lg:left-10 xl:left-14 lg:translate-x-0 bottom-6 lg:bottom-10 xl:bottom-12 flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.22em] text-ink-muted hover:text-ink transition"
      >
        <span className="grid h-9 w-9 place-items-center rounded-full border border-ink/15 bg-white/60 backdrop-blur-sm">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <path d="M12 5v14" />
            <path d="m6 13 6 6 6-6" />
          </svg>
        </span>
        Scroll
      </a>
    </section>
  );
}

function Stat({
  value,
  suffix,
  label,
  delay,
}: {
  value: number;
  suffix: string;
  label: string;
  delay: number;
}) {
  const { ref, value: v } = useCountUp(value);
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className="border-l border-ink/12 pl-3 sm:pl-4 text-left"
    >
      <div ref={ref as never} className="stat-num text-[28px] sm:text-[32px] md:text-[38px] xl:text-[42px] text-ink">
        {v.toLocaleString("en-GB")}
        <span className="text-accent">{suffix}</span>
      </div>
      <div className="mt-1 text-[10.5px] sm:text-[11.5px] uppercase tracking-[0.14em] text-ink-muted leading-tight">
        {label}
      </div>
    </motion.div>
  );
}
