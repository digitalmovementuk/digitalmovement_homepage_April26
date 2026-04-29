import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";
import { faqs } from "../content";
import { Reveal } from "../lib/Reveal";
import { KineticH2 } from "../lib/KineticH2";

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="relative py-24 sm:py-28 md:py-36 lg:py-40 section-line overflow-hidden">
      <div className="container-dm-wide relative">
        <div className="section-chapter">
          <span className="section-chapter__num" aria-hidden>06</span>
          <span className="section-chapter__rule" aria-hidden />
        </div>
        <div className="grid gap-10 sm:gap-12 lg:grid-cols-[0.85fr_1.3fr] lg:gap-14 xl:gap-20 items-start">
          <div className="lg:sticky lg:top-[120px] text-center lg:text-left">
            <Reveal>
              <p className="eyebrow">Common questions</p>
            </Reveal>
            <KineticH2
              className="display mt-5 sm:mt-6 text-[clamp(40px,6.8vw,108px)] uppercase max-w-[12ch] mx-auto lg:mx-0"
              spans={[
                { text: "Got" },
                { text: "questions?", className: "text-accent" },
              ]}
            />
            <Reveal delay={0.15}>
              <p className="mt-7 sm:mt-8 max-w-[420px] mx-auto lg:mx-0 text-[17px] sm:text-[18px] text-ink-soft leading-relaxed">
                Quick, honest answers. If something's not here, just ask — we
                reply fast.
              </p>
              <a
                href="#contact"
                className="mt-7 inline-flex items-center gap-2 btn-pill btn-ink text-[12px] px-5 py-3"
              >
                Ask us anything
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
              </a>
            </Reveal>
          </div>

          <Reveal delay={0.08}>
            <ul className="glass shimmer rounded-card overflow-hidden divide-y divide-ink/8">
              {faqs.map((f, i) => {
                const isOpen = open === i;
                return (
                  <li key={f.q}>
                    <button
                      onClick={() => setOpen(isOpen ? null : i)}
                      aria-expanded={isOpen}
                      className="flex w-full items-center justify-between gap-4 sm:gap-6 px-6 sm:px-8 py-6 sm:py-7 text-left transition hover:bg-white/40"
                    >
                      <span
                        className={`text-[18px] sm:text-[20px] md:text-[22px] xl:text-[24px] font-bold transition-colors ${
                          isOpen ? "text-ink" : "text-ink-soft"
                        }`}
                      >
                        {f.q}
                      </span>
                      <span
                        className={`grid h-9 w-9 sm:h-10 sm:w-10 flex-shrink-0 place-items-center rounded-full transition-all ${
                          isOpen
                            ? "bg-ink text-white"
                            : "bg-canvas-2 text-ink"
                        }`}
                      >
                        <Plus
                          size={16}
                          className={`transition-transform duration-300 ${isOpen ? "rotate-45" : ""}`}
                        />
                      </span>
                    </button>
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          key="content"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                          className="overflow-hidden"
                        >
                          <p className="px-6 sm:px-8 pb-7 sm:pb-8 pr-12 sm:pr-16 text-[16px] sm:text-[17px] text-ink-soft leading-relaxed">
                            {f.a}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </li>
                );
              })}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
