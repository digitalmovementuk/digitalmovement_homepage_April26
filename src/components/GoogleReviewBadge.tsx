import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, X, Store } from "lucide-react";
import { testimonials, googleRating } from "../content";

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

function Stars({ size = 14 }: { size?: number }) {
  return (
    <span className="inline-flex items-center gap-0.5 text-dm-orange-deep">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} size={size} fill="currentColor" stroke="none" />
      ))}
    </span>
  );
}

export function GoogleReviewBadge() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    if (open) window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      {/* Sticky trust badge — bottom-left, full content on every viewport.
          Sits opposite the centered StickyCTA so they never collide. */}
      <motion.button
        type="button"
        onClick={() => setOpen(true)}
        aria-label={`Open Google reviews — ${googleRating.rating} stars, +100 reviews`}
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="fixed left-3 sm:left-5 z-40 rounded-card bg-white border border-ink/10 shadow-card hover:-translate-y-0.5 hover:shadow-soft transition active:scale-[0.97] px-3 py-2.5 sm:px-4 sm:py-3"
        style={{
          bottom: "max(0.75rem, env(safe-area-inset-bottom, 0px))",
        }}
      >
        <span className="flex items-center gap-2.5 sm:gap-3 text-left">
          <GoogleG size={26} />
          <span className="flex flex-col leading-tight">
            <span className="text-[10px] sm:text-[11px] font-semibold text-ink-soft">
              Google Rating
            </span>
            <span className="flex items-center gap-1.5 mt-0.5">
              <span className="text-[15px] sm:text-[17px] font-extrabold text-ink">
                {googleRating.rating.toFixed(1)}
              </span>
              <Stars size={12} />
            </span>
            <span className="text-[10px] sm:text-[11px] text-ink-muted mt-0.5">
              Based on +100 reviews
            </span>
          </span>
        </span>
      </motion.button>

      {/* Reviews modal — bottom sheet on mobile, centered card on sm+ */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              key="backdrop"
              className="fixed inset-0 z-[85] bg-ink/60 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              aria-hidden
            />
            <motion.div
              key="sheet"
              role="dialog"
              aria-modal="true"
              aria-label="Customer reviews"
              className="fixed inset-x-0 bottom-0 z-[86] flex max-h-[92vh] flex-col rounded-t-[24px] bg-white shadow-soft sm:inset-0 sm:m-auto sm:max-h-[85vh] sm:max-w-[640px] sm:rounded-card overflow-hidden"
              initial={{ y: "100%", opacity: 0.6 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: "100%", opacity: 0 }}
              transition={{ type: "spring", damping: 32, stiffness: 280 }}
            >
              {/* Drag handle on mobile */}
              <div
                aria-hidden
                className="sm:hidden mx-auto mt-2.5 mb-1 h-1 w-10 rounded-full bg-ink/20"
              />

              <header className="flex-shrink-0 border-b border-ink/8 px-5 py-4 sm:p-6">
                <div className="flex items-center gap-3">
                  <span className="grid h-12 w-12 place-items-center rounded-lg bg-blue-50 text-blue-600 flex-shrink-0">
                    <Store size={24} strokeWidth={2.2} />
                  </span>
                  <div className="flex-1 min-w-0">
                    <h2 className="text-[18px] sm:text-[20px] font-extrabold text-blue-600 leading-tight">
                      Digital Movement
                    </h2>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-[16px] font-extrabold text-dm-orange-deep">
                        {googleRating.rating.toFixed(1)}
                      </span>
                      <Stars size={15} />
                    </div>
                  </div>
                  <button
                    onClick={() => setOpen(false)}
                    aria-label="Close reviews"
                    className="grid h-10 w-10 place-items-center rounded-full text-ink-muted hover:text-ink hover:bg-canvas-2 transition flex-shrink-0"
                  >
                    <X size={20} />
                  </button>
                </div>
                <div className="mt-4 flex flex-wrap gap-2 justify-center">
                  <a
                    href={googleRating.reviewsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-pill bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 text-[13px] font-bold transition"
                  >
                    See all reviews
                  </a>
                  <a
                    href={googleRating.reviewsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-pill bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 text-[13px] font-bold transition"
                  >
                    review us on
                    <span className="grid h-5 w-5 place-items-center rounded-full bg-white">
                      <GoogleG size={13} />
                    </span>
                  </a>
                </div>
              </header>

              <div className="overflow-y-auto flex-1 px-5 sm:px-6 divide-y divide-ink/8">
                {testimonials.map((t) => (
                  <article key={t.name} className="py-5">
                    <header className="flex items-center gap-3">
                      <div className="grid h-10 w-10 place-items-center rounded-full bg-dm-cta text-white text-[14px] font-extrabold uppercase shadow-pop flex-shrink-0">
                        {(t.initial ?? t.name[0]).toUpperCase()}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-[15px] font-bold text-blue-600 truncate">
                          {t.name}
                        </p>
                        <p className="text-[12px] text-ink-muted">
                          {t.when ?? "Recent"}
                        </p>
                      </div>
                      <div className="flex-shrink-0">
                        <GoogleG size={20} />
                      </div>
                    </header>
                    <div className="mt-2.5">
                      <Stars size={14} />
                    </div>
                    <p className="mt-3 text-[14px] sm:text-[15px] text-ink leading-relaxed">
                      "{t.quote}"
                    </p>
                  </article>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
