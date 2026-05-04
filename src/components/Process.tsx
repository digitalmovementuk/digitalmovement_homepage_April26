import { useEffect, useRef, useState, Fragment } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, ArrowDown } from "lucide-react";
import { processSteps } from "../content";
import { Reveal } from "../lib/Reveal";
import { KineticH2 } from "../lib/KineticH2";

export function Process() {
  const reduce = useReducedMotion();
  const cardRefs = useRef<(HTMLElement | null)[]>([]);
  const [activeStep, setActiveStep] = useState(0);

  /**
   * Sync the active card to the user's scroll position.
   *
   * Each card is observed against a thin band at the viewport's vertical
   * centre (rootMargin "-45% 0 -45% 0" → ~10vh tall detection zone).
   * Whichever card currently overlaps that band is "active". On mobile
   * (vertical stack) cards cross the band one at a time, so the active
   * state moves smoothly as you scroll. On desktop (horizontal row) the
   * section is shorter than the viewport so all cards enter the band
   * together — the iteration order ensures the active state ends up on
   * the card the user is closest to as the section settles into place.
   */
  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return;
    const observers: IntersectionObserver[] = [];
    cardRefs.current.forEach((el, i) => {
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveStep(i);
        },
        { rootMargin: "-45% 0px -45% 0px", threshold: 0 },
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return (
    <section
      id="process"
      className="relative py-20 sm:py-24 md:py-28 lg:py-32 section-line overflow-hidden"
    >
      <div className="container-dm-wide relative">
        <div className="section-chapter">
          <span className="section-chapter__num" aria-hidden>03</span>
          <span className="section-chapter__rule" aria-hidden />
        </div>
        <div className="text-center lg:text-left">
          <Reveal>
            <p className="eyebrow">How it works</p>
          </Reveal>
          <KineticH2
            className="display mt-5 sm:mt-6 text-[clamp(44px,7.4vw,124px)] uppercase max-w-[20ch] mx-auto lg:mx-0"
            spans={[
              { text: "Here's what" },
              { text: "happens next.", className: "text-accent" },
            ]}
          />
          <Reveal delay={0.15}>
            <p className="mt-7 sm:mt-8 max-w-[680px] mx-auto lg:mx-0 text-[17px] sm:text-[19px] text-ink-soft leading-relaxed">
              Three steps. No padded sales decks. You see it all happen.
            </p>
          </Reveal>
        </div>

        {/* Step cards. Connectors live BETWEEN cards (never across), so they
            can't overlap the numbered badge or the description text. */}
        <div
          role="list"
          className="mt-14 sm:mt-18 md:mt-20 grid gap-6 lg:gap-0 grid-cols-1 lg:grid-cols-[1fr_auto_1fr_auto_1fr] items-stretch"
        >
          {processSteps.map((step, i) => {
            const isActive = activeStep === i;
            const isLast = i === processSteps.length - 1;
            return (
              <Fragment key={step.n}>
                <Reveal delay={i * 0.08} className="h-full">
                  <article
                    ref={(el) => {
                      cardRefs.current[i] = el;
                    }}
                    role="listitem"
                    className={`relative h-full rounded-card border p-7 sm:p-8 md:p-9 transition-all duration-500 ${
                      isActive
                        ? "border-transparent bg-white shadow-pop ring-2 ring-dm-hot-magenta/35 -translate-y-0.5"
                        : "border-ink/10 bg-white/75 backdrop-blur-md"
                    }`}
                  >
                    {/* Numbered badge */}
                    <div className="flex justify-center sm:justify-start">
                      <div className="relative">
                        <span
                          aria-hidden
                          className={`absolute inset-0 rounded-full transition-opacity duration-500 ${
                            isActive ? "opacity-100" : "opacity-0"
                          }`}
                          style={{ background: "var(--grad-cta)", filter: "blur(18px)" }}
                        />
                        <motion.div
                          animate={isActive && !reduce ? { scale: 1.06 } : { scale: 1 }}
                          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                          className={`relative grid h-16 w-16 place-items-center rounded-full transition-colors duration-500 ${
                            isActive ? "shadow-pop" : "bg-canvas-2 border border-ink/10"
                          }`}
                          style={isActive ? { background: "var(--grad-cta)" } : undefined}
                        >
                          <span
                            className={`stat-num text-[26px] transition-colors duration-500 ${
                              isActive ? "text-white" : "text-ink"
                            }`}
                          >
                            {step.n}
                          </span>
                        </motion.div>
                      </div>
                    </div>

                    {/* Content */}
                    <p
                      className={`mt-6 sm:mt-7 text-center sm:text-left text-[11px] sm:text-[12px] font-bold uppercase tracking-[0.20em] transition-colors duration-500 ${
                        isActive ? "text-accent" : "text-ink-muted"
                      }`}
                    >
                      {step.eta}
                    </p>
                    <h3 className="mt-2 text-center sm:text-left text-[22px] xl:text-[24px] font-extrabold text-ink leading-tight">
                      {step.title}
                    </h3>
                    <p className="mt-3 text-center sm:text-left text-[15px] text-ink-soft leading-relaxed">
                      {step.body}
                    </p>
                  </article>
                </Reveal>

                {!isLast && (
                  <div
                    aria-hidden
                    className="flex items-center justify-center text-ink-muted/70 lg:px-2"
                  >
                    <span className="lg:hidden py-1">
                      <ArrowDown size={20} strokeWidth={2.4} />
                    </span>
                    <span className="hidden lg:inline-flex">
                      <ArrowRight size={22} strokeWidth={2.4} />
                    </span>
                  </div>
                )}
              </Fragment>
            );
          })}
        </div>
      </div>
    </section>
  );
}
