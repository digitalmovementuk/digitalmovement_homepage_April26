import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { processSteps } from "../content";
import { Reveal } from "../lib/Reveal";
import { KineticH2 } from "../lib/KineticH2";

export function Process() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 70%", "end 30%"],
  });
  const lineLength = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section id="process" className="relative py-24 sm:py-28 md:py-36 lg:py-40 section-line overflow-hidden">
      <div className="container-dm-wide relative" ref={sectionRef}>
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
              Four steps. No padded sales decks. You see it all happen.
            </p>
          </Reveal>
        </div>

        {/* Desktop horizontal timeline */}
        <div className="mt-16 sm:mt-20 hidden lg:block relative">
          <svg
            className="absolute inset-x-0 top-[40px] h-[2px] w-full"
            viewBox="0 0 1000 2"
            preserveAspectRatio="none"
            aria-hidden
          >
            <line x1="0" y1="1" x2="1000" y2="1" stroke="rgba(27,14,46,0.10)" strokeWidth="2" />
            <motion.line
              x1="0"
              y1="1"
              x2="1000"
              y2="1"
              stroke="url(#proc-grad)"
              strokeWidth="2"
              style={{ pathLength: lineLength }}
            />
            <defs>
              <linearGradient
                id="proc-grad"
                x1="0"
                x2="1000"
                y1="0"
                y2="0"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#FFB23D" />
                <stop offset="0.5" stopColor="#EC178D" />
                <stop offset="1" stopColor="#9A2FC6" />
              </linearGradient>
            </defs>
          </svg>

          <div className="relative grid grid-cols-4 gap-10">
            {processSteps.map((step, i) => (
              <Reveal key={step.n} delay={i * 0.08}>
                <div>
                  <div className="relative flex h-[96px] items-center justify-center">
                    <div className="glass-strong grid h-24 w-24 place-items-center rounded-full">
                      <span className="stat-num text-[34px] text-ink">{step.n}</span>
                    </div>
                  </div>
                  <p className="mt-7 text-center text-[12px] font-bold uppercase tracking-[0.20em] text-ink-muted">
                    {step.eta}
                  </p>
                  <h3 className="mt-2 text-center text-[22px] xl:text-[24px] font-extrabold text-ink">
                    {step.title}
                  </h3>
                  <p className="mt-3 text-center text-[15px] text-ink-soft leading-relaxed">
                    {step.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* Mobile vertical timeline — centered stack */}
        <ol className="lg:hidden mt-12 sm:mt-14 relative">
          <div
            aria-hidden
            className="absolute left-1/2 -translate-x-1/2 top-10 bottom-10 w-px bg-ink/12"
          />
          {processSteps.map((step, i) => (
            <li key={step.n} className="relative pb-12 last:pb-0 text-center">
              <Reveal delay={i * 0.06}>
                <div className="glass-strong mx-auto grid h-20 w-20 place-items-center rounded-full">
                  <span className="stat-num text-[28px] text-ink">{step.n}</span>
                </div>
                <p className="mt-5 text-[12px] font-bold uppercase tracking-[0.20em] text-ink-muted">
                  {step.eta}
                </p>
                <h3 className="mt-2 text-[22px] font-extrabold text-ink">{step.title}</h3>
                <p className="mt-2 max-w-[420px] mx-auto text-[15px] text-ink-soft leading-relaxed">
                  {step.body}
                </p>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
