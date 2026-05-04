import { motion } from "framer-motion";
import { heroStats } from "../content";
import { useCountUp } from "../lib/useCountUp";

/**
 * Horizontal proof bar with a static brand-gradient background.
 *
 * The brand video lives on the Hero only — duplicating it here created a
 * visual stutter (same loop seen twice within ~200vh). The static gradient
 * keeps the brand atmosphere without competing with the Hero.
 */
export function BrandVideoStrip() {
  return (
    <section
      aria-label="Headline results"
      className="relative overflow-hidden border-y border-ink/8"
      style={{
        background:
          "linear-gradient(120deg, #FFB23D 0%, #F05F22 28%, #EC178D 58%, #D332FF 88%)",
      }}
    >
      {/* Contrast overlays to keep stats legible over the saturated gradient. */}
      <div aria-hidden className="absolute inset-0 bg-ink/40" />
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(120% 80% at 50% 50%, rgba(15,8,32,0.10) 0%, rgba(15,8,32,0.45) 100%)",
        }}
      />
      <div className="noise opacity-40" />

      <div className="container-dm-wide relative py-10 sm:py-12 md:py-14 lg:py-16">
        <ul className="flex flex-row items-center justify-around gap-6 sm:gap-10 md:gap-16 divide-x divide-white/15">
          {heroStats.map((s, i) => (
            <ProofStat
              key={i}
              value={s.value}
              suffix={s.suffix}
              label={s.label}
              delay={0.1 + i * 0.1}
              isFirst={i === 0}
            />
          ))}
        </ul>
      </div>
    </section>
  );
}

function ProofStat({
  value,
  suffix,
  label,
  delay,
  isFirst,
}: {
  value: number;
  suffix: string;
  label: string;
  delay: number;
  isFirst: boolean;
}) {
  const { ref, value: v } = useCountUp(value);
  return (
    <motion.li
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      className={`flex-1 min-w-0 text-center ${isFirst ? "" : "pl-6 sm:pl-10 md:pl-16"}`}
    >
      <div
        ref={ref as never}
        className="stat-num text-[44px] sm:text-[64px] md:text-[80px] lg:text-[96px] xl:text-[112px] leading-none text-white drop-shadow-[0_2px_24px_rgba(0,0,0,0.45)]"
      >
        {v.toLocaleString("en-GB")}
        <span className="text-white/95">{suffix}</span>
      </div>
      <div className="mt-3 sm:mt-4 text-[11px] sm:text-[12px] md:text-[13px] uppercase tracking-[0.18em] text-white/85 font-bold">
        {label}
      </div>
    </motion.li>
  );
}
