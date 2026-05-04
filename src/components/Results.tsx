import { results } from "../content";
import { Reveal } from "../lib/Reveal";
import { KineticH2 } from "../lib/KineticH2";

export function Results() {
  return (
    <section
      id="results"
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
            <p className="eyebrow">The receipts</p>
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
              We don't show vanity metrics. We show what actually moved — leads,
              conversions, sales, traffic.
            </p>
          </Reveal>
        </div>

        <div className="mt-14 sm:mt-18 md:mt-20 grid gap-5 sm:gap-6 md:gap-7 grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 items-stretch">
          {results.map((res, i) => (
            <Reveal key={res.metric} delay={i * 0.06}>
              <article
                className="group glass shimmer relative w-full text-center sm:text-left overflow-hidden rounded-card p-6 sm:p-7 transition-all duration-300 h-full hover:-translate-y-0.5"
              >
                <div
                  aria-hidden
                  className="absolute -bottom-12 -right-12 h-40 w-40 rounded-full blur-3xl opacity-30"
                  style={{ background: "var(--grad-cta)" }}
                />
                <p className="relative text-[10.5px] sm:text-[11px] font-bold uppercase tracking-[0.18em] text-ink-muted">
                  {res.industry}
                </p>
                <p className="relative mt-3 stat-num text-[44px] sm:text-[52px] md:text-[60px] xl:text-[68px] leading-none text-ink">
                  {res.metric}
                </p>
                <p className="relative mt-3 text-[13px] sm:text-[14px] uppercase tracking-[0.10em] text-ink-soft font-semibold">
                  {res.label}
                </p>
                <p className="relative mt-4 text-[12px] text-ink-muted">{res.work}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
