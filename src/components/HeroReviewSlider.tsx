import { memo, useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { Star, ExternalLink } from "lucide-react";
import { testimonials, googleRating } from "../content";

const SHORTS = testimonials.map((t) => {
  const max = 110;
  const trimmed =
    t.quote.length > max ? t.quote.slice(0, max).trimEnd() + "…" : t.quote;
  return { name: t.name, role: t.role, quote: trimmed };
});

const TYPE_MS = 16; // per character — quick keyboard-style
const HOLD_MS = 1400; // pause after a review is fully typed
const TRANSITION_MS = 140; // brief gap before next review starts

export function HeroReviewSlider() {
  const reduce = useReducedMotion();
  const [reviewIdx, setReviewIdx] = useState(0);
  const [shown, setShown] = useState(0);
  const [phase, setPhase] = useState<"typing" | "holding" | "switching">("typing");
  const [paused, setPaused] = useState(false);
  const timerRef = useRef<number | null>(null);

  const review = SHORTS[reviewIdx];
  const fullText = `"${review.quote}"`;

  useEffect(() => {
    if (reduce) {
      setShown(fullText.length);
      return;
    }
    if (paused) return;

    const clear = () => {
      if (timerRef.current !== null) {
        window.clearTimeout(timerRef.current);
        timerRef.current = null;
      }
    };

    if (phase === "typing") {
      if (shown < fullText.length) {
        timerRef.current = window.setTimeout(() => setShown((v) => v + 1), TYPE_MS);
      } else {
        setPhase("holding");
      }
    } else if (phase === "holding") {
      timerRef.current = window.setTimeout(() => setPhase("switching"), HOLD_MS);
    } else if (phase === "switching") {
      timerRef.current = window.setTimeout(() => {
        setReviewIdx((i) => (i + 1) % SHORTS.length);
        setShown(0);
        setPhase("typing");
      }, TRANSITION_MS);
    }

    return clear;
  }, [phase, shown, fullText, paused, reduce]);

  const visible = fullText.slice(0, shown);
  const isComplete = shown >= fullText.length;

  return (
    <div
      className="glass-pill rounded-pill p-2 pr-2 sm:p-2.5 flex w-full lg:inline-flex lg:w-auto items-stretch gap-2 sm:gap-3 max-w-full overflow-hidden shadow-[0_18px_50px_-22px_rgba(27,14,46,0.30)] ring-1 ring-white/60 !bg-white/95"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      role="region"
      aria-label="Google reviews"
      aria-live="polite"
    >
      {/* Static rating chip — bigger, more prominent */}
      <div className="flex items-center gap-2 sm:gap-2.5 rounded-pill bg-white px-3.5 sm:px-4 py-2 sm:py-2.5 flex-shrink-0">
        <GoogleG size={20} />
        <span className="stat-num text-[18px] sm:text-[20px] text-black">
          {googleRating.rating.toFixed(1)}
        </span>
        <span className="hidden sm:inline-flex items-center gap-0.5 text-dm-gold">
          {Array.from({ length: 5 }).map((_, n) => (
            <Star key={n} size={14} fill="currentColor" stroke="none" />
          ))}
        </span>
        <span className="text-[12px] sm:text-[13px] font-bold uppercase tracking-[0.12em] text-black hidden md:inline">
          +100
        </span>
      </div>

      {/* Typewriter review — bigger, primary attention */}
      <div className="relative min-w-0 flex-1 overflow-hidden self-center px-1">
        <p className="truncate text-[14px] sm:text-[16px] md:text-[17px] text-black font-medium">
          <span className={visible.startsWith('"') ? "text-black/55" : ""}>
            {visible}
          </span>
          <span
            aria-hidden
            className="inline-block w-[2px] h-[1em] align-middle ml-[1px] bg-black"
            style={{
              animation: isComplete ? "blink 0.9s steps(2) infinite" : undefined,
              opacity: isComplete ? undefined : 1,
            }}
          />
          {isComplete && (
            <span className="ml-2 text-black/70 hidden lg:inline font-semibold">
              — {review.name}
            </span>
          )}
        </p>
      </div>

      {/* Progress dots */}
      <div className="hidden md:flex items-center gap-1.5 px-2 flex-shrink-0">
        {SHORTS.map((_, n) => (
          <button
            key={n}
            onClick={() => {
              setReviewIdx(n);
              setShown(0);
              setPhase("typing");
            }}
            aria-label={`Show review ${n + 1}`}
            className={`h-2 rounded-full transition-all ${
              n === reviewIdx ? "w-6 bg-ink" : "w-2 bg-ink/25 hover:bg-ink/50"
            }`}
          />
        ))}
      </div>

      {/* See all reviews — memoised so the colour pulse stays continuous
          across every typewriter re-render of the parent */}
      <SeeAllReviewsButton />
    </div>
  );
}

const SeeAllReviewsButton = memo(function SeeAllReviewsButton() {
  return (
    <a
      href={googleRating.reviewsUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="pulse-plum-color inline-flex items-center gap-1.5 sm:gap-2 rounded-pill border px-3.5 sm:px-5 py-2 sm:py-2.5 text-[12px] sm:text-[13px] font-bold uppercase tracking-[0.12em] flex-shrink-0"
    >
      <span className="hidden sm:inline">See all reviews</span>
      <span className="sm:hidden">All</span>
      <ExternalLink size={14} />
    </a>
  );
});

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
