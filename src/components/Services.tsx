import { useState } from "react";
import type { ReactElement } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Check, Plus } from "lucide-react";
import { services } from "../content";
import { Reveal } from "../lib/Reveal";
import { KineticH2 } from "../lib/KineticH2";

const ICONS: Record<string, ReactElement> = {
  seo: (
    <svg viewBox="0 0 48 48" fill="none" className="h-9 w-9">
      <defs>
        <linearGradient id="g-seo" x1="0" x2="48" y1="0" y2="48" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FFB23D" />
          <stop offset="0.55" stopColor="#EC178D" />
          <stop offset="1" stopColor="#D332FF" />
        </linearGradient>
      </defs>
      <circle cx="20" cy="20" r="11" stroke="url(#g-seo)" strokeWidth="2.5" />
      <path d="M28 28l9 9" stroke="url(#g-seo)" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M14 20h12M20 14v12" stroke="url(#g-seo)" strokeWidth="2" strokeLinecap="round" opacity=".6" />
    </svg>
  ),
  "google-ads": (
    <svg viewBox="0 0 48 48" fill="none" className="h-9 w-9">
      <defs>
        <linearGradient id="g-ads" x1="0" x2="48" y1="0" y2="48" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FFB23D" />
          <stop offset="0.55" stopColor="#EC178D" />
          <stop offset="1" stopColor="#D332FF" />
        </linearGradient>
      </defs>
      <path
        d="M12 38l14-22 5 8M22 26l9 12"
        stroke="url(#g-ads)"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="34" cy="14" r="4" fill="url(#g-ads)" />
    </svg>
  ),
  social: (
    <svg viewBox="0 0 48 48" fill="none" className="h-9 w-9">
      <defs>
        <linearGradient id="g-soc" x1="0" x2="48" y1="0" y2="48" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FFB23D" />
          <stop offset="0.55" stopColor="#EC178D" />
          <stop offset="1" stopColor="#D332FF" />
        </linearGradient>
      </defs>
      <circle cx="14" cy="14" r="4" stroke="url(#g-soc)" strokeWidth="2.5" />
      <circle cx="34" cy="14" r="4" stroke="url(#g-soc)" strokeWidth="2.5" />
      <circle cx="24" cy="34" r="4" stroke="url(#g-soc)" strokeWidth="2.5" />
      <path d="M17 16l5 16M31 16l-5 16" stroke="url(#g-soc)" strokeWidth="2" opacity=".7" />
    </svg>
  ),
  websites: (
    <svg viewBox="0 0 48 48" fill="none" className="h-9 w-9">
      <defs>
        <linearGradient id="g-web" x1="0" x2="48" y1="0" y2="48" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FFB23D" />
          <stop offset="0.55" stopColor="#EC178D" />
          <stop offset="1" stopColor="#D332FF" />
        </linearGradient>
      </defs>
      <rect x="7" y="10" width="34" height="26" rx="3" stroke="url(#g-web)" strokeWidth="2.5" />
      <path d="M7 17h34" stroke="url(#g-web)" strokeWidth="2" />
      <circle cx="11" cy="13.5" r="1" fill="url(#g-web)" />
      <circle cx="14.5" cy="13.5" r="1" fill="url(#g-web)" />
      <path d="M14 26h12M14 30h8" stroke="url(#g-web)" strokeWidth="2" strokeLinecap="round" />
    </svg>
  ),
};

export function Services() {
  const [openSet, setOpenSet] = useState<Set<string>>(new Set());

  const toggle = (key: string) => {
    setOpenSet((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  };

  return (
    <section id="services" className="relative py-24 sm:py-28 md:py-36 lg:py-40 overflow-hidden">
      <div className="bloom-warm" />
      <div className="container-dm-wide relative">
        <div className="section-chapter">
          <span className="section-chapter__num" aria-hidden>01</span>
          <span className="section-chapter__rule" aria-hidden />
        </div>
        <div className="text-center lg:text-left">
          <Reveal>
            <p className="eyebrow">What we do</p>
          </Reveal>
          <KineticH2
            className="display mt-5 sm:mt-6 text-[clamp(44px,7.4vw,124px)] uppercase max-w-[18ch] mx-auto lg:mx-0"
            spans={[
              { text: "Four levers." },
              { text: "One growth engine.", className: "text-accent" },
            ]}
          />
          <Reveal delay={0.15}>
            <p className="mt-7 sm:mt-8 max-w-[640px] mx-auto lg:mx-0 text-[17px] sm:text-[19px] text-ink-soft leading-relaxed">
              Channels that compound. Tap a card to see exactly how each lever works.
            </p>
          </Reveal>
        </div>

        {/* Symmetrical grid — all cards identical width AND height. */}
        <div className="mt-14 sm:mt-18 md:mt-20 grid gap-5 sm:gap-6 md:gap-7 grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 items-stretch">
          {services.map((s, i) => {
            const isOpen = openSet.has(s.key);
            return (
              <Reveal key={s.key} delay={i * 0.06} className="h-full">
                <article
                  className={`group glass shimmer relative h-full flex flex-col overflow-hidden rounded-card p-6 sm:p-7 transition-all duration-300 active:scale-[0.99] ${
                    isOpen
                      ? "ring-2 ring-dm-hot-magenta/35 shadow-pop"
                      : "hover:-translate-y-0.5"
                  }`}
                >
                  <div
                    aria-hidden
                    className="absolute -right-12 -top-12 h-32 w-32 rounded-full opacity-20 blur-2xl"
                    style={{ background: "var(--grad-brand)" }}
                  />
                  <div className="relative flex flex-1 flex-col text-center sm:text-left">
                    <div className="flex items-start justify-between">
                      <div className="grid h-12 w-12 place-items-center rounded-xl2 bg-canvas-2/70 backdrop-blur-sm">
                        {ICONS[s.key]}
                      </div>
                      <button
                        onClick={() => toggle(s.key)}
                        className={`grid h-9 w-9 place-items-center rounded-full border transition ${
                          isOpen
                            ? "border-transparent bg-ink text-white"
                            : "border-ink/15 bg-white/70 backdrop-blur-sm text-ink-muted hover:text-ink hover:border-ink/30"
                        }`}
                        aria-label={isOpen ? "Collapse details" : "Expand details"}
                        aria-expanded={isOpen}
                      >
                        <Plus
                          size={16}
                          className={`transition-transform duration-300 ${isOpen ? "rotate-45" : ""}`}
                        />
                      </button>
                    </div>

                    <h3 className="mt-7 text-[22px] sm:text-[24px] font-extrabold uppercase tracking-tight text-ink">
                      {s.title}
                    </h3>

                    {/* Reserved height so single- and two-line promises share space evenly */}
                    <p className="mt-2 text-[15px] text-ink-soft leading-relaxed min-h-[3.4em]">
                      {s.promise}
                    </p>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          key="open"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                          className="overflow-hidden"
                        >
                          <p className="mt-4 text-[14px] text-ink-soft leading-relaxed">
                            {s.detail}
                          </p>
                          <ul className="mt-4 inline-flex flex-col gap-2.5 mx-auto sm:mx-0 text-left">
                            {s.bullets.map((b) => (
                              <li
                                key={b}
                                className="flex items-center gap-2.5 text-[13.5px] text-ink-soft"
                              >
                                <span className="grid h-5 w-5 place-items-center rounded-full bg-dm-cta text-white flex-shrink-0">
                                  <Check size={12} strokeWidth={3} />
                                </span>
                                {b}
                              </li>
                            ))}
                          </ul>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* CTA pinned to the bottom of every card → identical placement */}
                    <div className="mt-auto pt-6 flex justify-center sm:justify-start">
                      <a
                        href="#contact"
                        className="text-[12px] font-bold uppercase tracking-[0.14em] text-ink hover:text-dm-hot-magenta inline-flex items-center gap-1.5 transition"
                      >
                        Get a proposal <ArrowUpRight size={14} />
                      </a>
                    </div>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
