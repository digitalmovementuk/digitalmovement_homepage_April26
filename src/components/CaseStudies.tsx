import { ArrowUpRight, MapPin } from "lucide-react";
import type { CaseStudy } from "../content";
import { caseStudies } from "../content";
import { Reveal } from "../lib/Reveal";
import { KineticH2 } from "../lib/KineticH2";

const ACCENT_GRAD: Record<CaseStudy["accent"], string> = {
  orange: "linear-gradient(135deg, #FFB23D 0%, #F05F22 55%, #EC178D 100%)",
  pink: "linear-gradient(135deg, #F05F22 0%, #EC178D 55%, #D332FF 100%)",
  violet: "linear-gradient(135deg, #EC178D 0%, #9A2FC6 55%, #4A1E8C 100%)",
};

export function CaseStudies() {
  const [featured, ...rest] = caseStudies;

  return (
    <section
      id="case-studies"
      className="relative py-24 sm:py-28 md:py-36 lg:py-40 section-line overflow-hidden"
    >
      <div className="bloom-cool" />
      <div className="container-dm-wide relative">
        <div className="section-chapter">
          <span className="section-chapter__num" aria-hidden>02</span>
          <span className="section-chapter__rule" aria-hidden />
        </div>

        <div className="text-center lg:text-left">
          <Reveal>
            <p className="eyebrow">Case studies</p>
          </Reveal>
          <KineticH2
            className="display mt-5 sm:mt-6 text-[clamp(44px,7.4vw,124px)] uppercase max-w-[20ch] mx-auto lg:mx-0"
            spans={[
              { text: "Real numbers." },
              { text: "Real businesses.", className: "text-accent" },
            ]}
          />
          <Reveal delay={0.15}>
            <p className="mt-7 sm:mt-8 max-w-[680px] mx-auto lg:mx-0 text-[17px] sm:text-[19px] text-ink-soft leading-relaxed">
              Five UK businesses. Five different industries. Same outcome:
              measurable growth you can read off a dashboard.
            </p>
          </Reveal>
        </div>

        {/* FEATURED CARD — full-width, branded tile left + content right on lg+ */}
        <Reveal delay={0.1}>
          <FeaturedCard study={featured} />
        </Reveal>

        {/* GRID OF 4 — 2x2 on lg, single column on mobile */}
        <div className="mt-6 sm:mt-7 md:mt-8 grid gap-5 sm:gap-6 md:gap-7 grid-cols-1 lg:grid-cols-2">
          {rest.map((cs, i) => (
            <Reveal key={cs.slug} delay={0.05 + i * 0.07}>
              <SnapshotCard study={cs} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ────────────────────────────────────────────────────────────── */
/*  Branded monogram tile — placeholder for the real image. Uses
    the study's accent gradient + the client's initials in display
    type. Reads as deliberate ("case study coming soon") rather than
    missing data, and reuses ACCENT_GRAD already defined here.        */
/* ────────────────────────────────────────────────────────────── */

function monogram(client: string): string {
  return client
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
}

function MonogramTile({
  study,
  size,
}: {
  study: CaseStudy;
  size: "featured" | "snapshot";
}) {
  const monoFontSize =
    size === "featured"
      ? "text-[clamp(120px,18vw,260px)]"
      : "text-[clamp(80px,12vw,140px)]";
  return (
    <>
      {/* Brand gradient base */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{ background: ACCENT_GRAD[study.accent] }}
      />
      {/* Diagonal accent — adds visual depth to the flat gradient */}
      <div
        aria-hidden
        className="absolute inset-0 mix-blend-overlay opacity-40 pointer-events-none"
        style={{
          background:
            "radial-gradient(120% 60% at 0% 100%, rgba(255,255,255,0.45), transparent 60%), radial-gradient(80% 80% at 100% 0%, rgba(15,8,32,0.35), transparent 60%)",
        }}
      />
      {/* Subtle grain so the gradient doesn't read flat */}
      <div className="noise opacity-30" />
      {/* Bottom dark wash so overlaid pills/numbers stay legible */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(180deg, rgba(15,8,32,0) 45%, rgba(15,8,32,0.55) 100%)",
        }}
      />
      {/* Monogram — large, display type, slightly off-centre so it doesn't
          fight with the top-left industry pill or bottom-left metric. */}
      <span
        aria-hidden
        className={`absolute inset-0 flex items-center justify-end pr-[8%] sm:pr-[10%] stat-num ${monoFontSize} leading-none text-white/22 select-none`}
        style={{ letterSpacing: "-0.02em" }}
      >
        {monogram(study.client)}
      </span>
    </>
  );
}

/* ────────────────────────────────────────────────────────────── */
/*  FEATURED CARD                                                 */
/* ────────────────────────────────────────────────────────────── */

function FeaturedCard({ study }: { study: CaseStudy }) {
  return (
    <article className="group mt-14 sm:mt-18 md:mt-20 relative overflow-hidden rounded-card border border-ink/10 bg-white shadow-card">
      {/* Soft accent glow on the corner */}
      <div
        aria-hidden
        className="absolute -top-32 -right-24 h-72 w-72 rounded-full blur-3xl opacity-25 pointer-events-none"
        style={{ background: ACCENT_GRAD[study.accent] }}
      />

      <div className="grid lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)]">
        {/* Branded tile */}
        <div className="relative aspect-[4/3] lg:aspect-auto lg:min-h-[480px] overflow-hidden">
          <MonogramTile study={study} size="featured" />

          {/* Industry pill, top-left */}
          <div className="absolute top-5 left-5 flex items-center gap-2">
            <span className="rounded-pill bg-white/95 backdrop-blur px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.16em] text-ink">
              {study.industry}
            </span>
            <span className="hidden sm:inline-flex items-center gap-1 rounded-pill bg-white/15 backdrop-blur-md px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.16em] text-white border border-white/30">
              <MapPin size={12} strokeWidth={2.5} />
              {study.location}
            </span>
          </div>

          {/* Featured badge, top-right */}
          <div className="absolute top-5 right-5">
            <span className="rounded-pill bg-white/95 backdrop-blur px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.16em] text-ink shadow-pop">
              Featured
            </span>
          </div>

          {/* Client name + headline metric overlay, bottom-left */}
          <div className="absolute bottom-5 left-5 right-5 text-white">
            <p className="text-[10.5px] font-bold uppercase tracking-[0.18em] text-white/85">
              {study.client}
            </p>
            <p className="stat-num mt-2 text-[clamp(36px,5vw,64px)] leading-none drop-shadow-[0_2px_18px_rgba(0,0,0,0.5)]">
              {study.metrics[0]?.value}
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="relative p-7 sm:p-9 md:p-11 lg:p-12 flex flex-col">
          <div className="flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.18em] text-ink-muted">
            <span>{study.client}</span>
            <span className="h-px flex-1 bg-ink/12" />
            <span>{study.timeline}</span>
          </div>

          <h3 className="mt-4 display text-[clamp(28px,3.6vw,48px)] uppercase leading-[1.05] text-ink">
            {study.headline}
          </h3>

          <p className="mt-5 text-[16px] sm:text-[17px] text-ink-soft leading-relaxed">
            {study.body}
          </p>

          {/* Key metrics row */}
          <ul className="mt-7 grid grid-cols-3 gap-4 sm:gap-6 border-y border-ink/10 py-5 sm:py-6">
            {study.metrics.map((m) => (
              <li key={m.label} className="text-left">
                <p className="stat-num text-[24px] sm:text-[28px] md:text-[32px] leading-none text-ink">
                  {m.value}
                </p>
                <p className="mt-2 text-[10.5px] sm:text-[11px] uppercase tracking-[0.16em] text-ink-muted leading-tight">
                  {m.label}
                </p>
              </li>
            ))}
          </ul>

          {/* Service tags */}
          <div className="mt-6 flex flex-wrap items-center gap-2 sm:gap-2.5">
            {study.services.map((s) => (
              <span
                key={s}
                className="rounded-pill bg-canvas-2 px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.14em] text-ink-soft"
              >
                {s}
              </span>
            ))}
          </div>

          <a href="#contact" className="btn-link mt-auto pt-7 self-start">
            Talk to us about your numbers <ArrowUpRight size={14} />
          </a>
        </div>
      </div>
    </article>
  );
}

/* ────────────────────────────────────────────────────────────── */
/*  SNAPSHOT CARD                                                 */
/* ────────────────────────────────────────────────────────────── */

function SnapshotCard({ study }: { study: CaseStudy }) {
  return (
    <article className="group h-full overflow-hidden rounded-card border border-ink/10 bg-white shadow-card transition-all duration-300 hover:-translate-y-0.5 hover:shadow-soft flex flex-col">
      {/* Branded tile */}
      <div className="relative aspect-[16/10] overflow-hidden">
        <MonogramTile study={study} size="snapshot" />

        {/* Industry pill */}
        <div className="absolute top-4 left-4 flex items-center gap-2">
          <span className="rounded-pill bg-white/95 backdrop-blur px-3 py-1.5 text-[10.5px] font-bold uppercase tracking-[0.16em] text-ink">
            {study.industry}
          </span>
        </div>

        {/* Headline metric over the tile, bottom-left */}
        <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-3">
          <p className="stat-num text-[28px] sm:text-[32px] md:text-[36px] leading-none text-white drop-shadow-[0_2px_18px_rgba(0,0,0,0.5)]">
            {study.metrics[0]?.value}
          </p>
          <span className="rounded-pill bg-white/15 backdrop-blur-md border border-white/30 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-white inline-flex items-center gap-1">
            <MapPin size={10} strokeWidth={2.5} />
            {study.location}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="relative p-6 sm:p-7 flex flex-col flex-1">
        <div className="flex items-center gap-2 text-[10.5px] font-bold uppercase tracking-[0.18em] text-ink-muted">
          <span>{study.client}</span>
          <span className="h-px flex-1 bg-ink/12" />
          <span>{study.timeline}</span>
        </div>

        <h3 className="mt-3 text-[20px] sm:text-[22px] font-extrabold text-ink leading-tight">
          {study.headline}
        </h3>

        <p className="mt-3 text-[14.5px] text-ink-soft leading-relaxed">
          {study.body}
        </p>

        {/* Supporting metrics — small, inline */}
        <ul className="mt-5 grid grid-cols-3 gap-3 border-t border-ink/10 pt-4">
          {study.metrics.slice(1).map((m) => (
            <li key={m.label}>
              <p className="stat-num text-[18px] sm:text-[20px] leading-none text-ink">
                {m.value}
              </p>
              <p className="mt-1.5 text-[10px] uppercase tracking-[0.14em] text-ink-muted leading-tight">
                {m.label}
              </p>
            </li>
          ))}
          {Array.from({ length: Math.max(0, 3 - (study.metrics.length - 1)) }).map((_, i) => (
            <li key={`pad-${i}`} aria-hidden />
          ))}
        </ul>

        {/* Service tags */}
        <div className="mt-5 flex flex-wrap gap-2">
          {study.services.map((s) => (
            <span
              key={s}
              className="rounded-pill bg-canvas-2 px-2.5 py-1 text-[10.5px] font-bold uppercase tracking-[0.14em] text-ink-soft"
            >
              {s}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
}
