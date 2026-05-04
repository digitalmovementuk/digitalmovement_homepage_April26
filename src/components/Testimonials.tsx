import { Star, ExternalLink, Quote, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { testimonials, googleRating, results } from "../content";
import { Reveal } from "../lib/Reveal";
import { KineticH2 } from "../lib/KineticH2";

const featured = results[0];

export function Testimonials() {
  return (
    <section
      id="reviews"
      className="relative py-24 sm:py-28 md:py-36 lg:py-40 section-line overflow-hidden"
    >
      <div className="bloom-warm" />
      <div className="container-dm-wide relative">
        <div className="section-chapter">
          <span className="section-chapter__num" aria-hidden>04</span>
          <span className="section-chapter__rule" aria-hidden />
        </div>

        {/* Header — single row, no left/right split = no negative space */}
        <div className="grid gap-8 lg:gap-12 lg:grid-cols-[1fr_auto] lg:items-end text-center lg:text-left">
          <div>
            <Reveal>
              <p className="eyebrow">Testimonials</p>
            </Reveal>
            <KineticH2
              className="display mt-5 sm:mt-6 text-[clamp(40px,6.4vw,108px)] uppercase max-w-[20ch] mx-auto lg:mx-0"
              spans={[
                { text: "5.0 rated.", className: "text-accent" },
                { text: "+100 reviews." },
              ]}
            />
            <Reveal delay={0.15}>
              <p className="mt-7 sm:mt-8 max-w-[680px] mx-auto lg:mx-0 text-[17px] sm:text-[19px] text-ink-soft leading-relaxed">
                Real UK businesses. Real verified reviews. Read every single
                one — including the long ones — on Google.
              </p>
            </Reveal>
          </div>

          <Reveal delay={0.2} className="flex flex-col items-center lg:items-end gap-4">
            <div className="glass-pill inline-flex items-center gap-4 rounded-card px-5 py-4">
              <GoogleG size={32} />
              <div>
                <div className="flex items-center gap-2">
                  <span className="stat-num text-[26px] text-ink">
                    {googleRating.rating.toFixed(1)}
                  </span>
                  <span className="inline-flex items-center gap-0.5 text-dm-gold">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} size={15} fill="currentColor" stroke="none" />
                    ))}
                  </span>
                </div>
                <p className="text-[12px] text-ink-muted font-semibold">
                  +100 reviews
                </p>
              </div>
            </div>
            <a
              href={googleRating.reviewsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-pill btn-ink text-[12px] px-5 py-3"
            >
              Read +100 reviews on Google
              <ExternalLink size={14} />
            </a>
          </Reveal>
        </div>

        {/* Featured client transformation — moved here from the Results section.
            Anchors the testimonials block with one big, plain-English win
            before the four-up review grid. */}
        <Reveal delay={0.1}>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="mt-12 sm:mt-14 md:mt-16 glass-strong rounded-card p-6 sm:p-8 md:p-10 grid gap-6 md:gap-8 md:grid-cols-[1fr_auto] md:items-end text-center md:text-left"
          >
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-ink-muted">
                {featured.industry} · {featured.work}
              </p>
              <p className="mt-3 display text-[clamp(24px,3.4vw,40px)] uppercase max-w-[24ch] mx-auto md:mx-0">
                "{featured.quote}"
              </p>
              <p className="mt-4 text-ink-muted text-[14px]">
                {featured.metric} {featured.label.toLowerCase()} · {featured.timeline}
              </p>
            </div>
            <a href="#contact" className="btn-link self-center md:self-end">
              Talk to us about your numbers <ArrowRight size={14} />
            </a>
          </motion.div>
        </Reveal>

        {/* Reviews grid — 2x2 on lg+, stack on mobile.
            Cards alternate solid white + tinted glass for visual rhythm. */}
        <div className="mt-14 sm:mt-18 md:mt-20 grid gap-5 sm:gap-6 md:gap-7 sm:grid-cols-2 items-stretch">
          {testimonials.map((t, i) => (
            <Reveal key={t.name} delay={i * 0.07}>
              <ReviewCard t={t} variant={i % 2 === 0 ? "solid" : "tinted"} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function ReviewCard({
  t,
  variant,
}: {
  t: (typeof testimonials)[number];
  variant: "solid" | "tinted";
}) {
  const cardCls =
    variant === "solid"
      ? "bg-white border-ink/10"
      : "bg-canvas-2/80 border-ink/12 backdrop-blur-md";
  return (
    <article
      className={`group relative h-full rounded-card border ${cardCls} p-7 sm:p-8 md:p-9 shadow-card transition-all duration-300 hover:-translate-y-0.5 hover:shadow-soft active:scale-[0.99] text-center sm:text-left`}
    >
      <div
        aria-hidden
        className="absolute -top-px left-8 right-8 h-px bg-gradient-to-r from-transparent via-dm-hot-magenta/45 to-transparent"
      />
      <div className="flex items-center sm:items-start justify-center sm:justify-between gap-4">
        <div className="flex items-center gap-1 text-dm-gold">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} size={20} fill="currentColor" stroke="none" />
          ))}
        </div>
        <Quote size={28} className="text-ink/12 hidden sm:block" strokeWidth={2.5} />
      </div>

      <p className="mt-6 text-[18px] sm:text-[20px] md:text-[22px] leading-relaxed text-ink font-medium text-balance">
        "{t.quote}"
      </p>

      <div className="mt-8 flex flex-col sm:flex-row items-center sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="grid h-12 w-12 place-items-center rounded-full bg-dm-cta text-white text-[18px] font-extrabold uppercase shadow-pop flex-shrink-0">
            {(t.initial ?? t.name[0]).toUpperCase()}
          </div>
          <div className="min-w-0 text-left">
            <p className="text-[16px] font-extrabold text-ink truncate">
              {t.name}
            </p>
            <p className="text-[12px] text-ink-muted">{t.role}</p>
          </div>
        </div>
        <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-[0.18em] text-ink-muted font-semibold flex-shrink-0">
          <GoogleG size={14} />
          <span>Verified</span>
        </div>
      </div>
    </article>
  );
}

function GoogleG({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden>
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.75h3.57c2.08-1.92 3.28-4.74 3.28-8.07z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.75c-.99.66-2.25 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.12A6.96 6.96 0 0 1 5.5 12c0-.74.13-1.46.34-2.12V7.04H2.18A11 11 0 0 0 1 12c0 1.78.43 3.46 1.18 4.96l3.66-2.84z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.04l3.66 2.84C6.71 7.31 9.14 5.38 12 5.38z"
      />
    </svg>
  );
}
