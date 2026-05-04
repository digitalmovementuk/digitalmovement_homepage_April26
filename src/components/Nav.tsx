import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, ArrowRight } from "lucide-react";
import { navLinks, business } from "../content";

function IGIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.6" fill="currentColor" />
    </svg>
  );
}
function FBIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M13.5 22v-7.5h2.6l.4-3h-3V9.6c0-.87.27-1.46 1.52-1.46H17V5.4c-.3-.04-1.27-.13-2.4-.13-2.37 0-4 1.45-4 4.1V11.5H8v3h2.6V22h2.9z" />
    </svg>
  );
}

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
          scrolled ? "glass-nav" : "bg-transparent"
        }`}
      >
        <div className="container-dm-wide flex h-[76px] md:h-[88px] lg:h-[96px] items-center justify-between">
          <a
            href="#top"
            className="flex items-center gap-3"
            aria-label="Digital Movement home"
          >
            <img
              src={`${import.meta.env.BASE_URL}brand/logo-color-positive.svg`}
              alt="Digital Movement UK"
              className="h-10 sm:h-12 lg:h-14 w-auto"
              draggable={false}
            />
          </a>

          <nav className="hidden md:flex items-center gap-7 lg:gap-9 xl:gap-11">
            {navLinks.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className={`text-[14px] lg:text-[15px] font-extrabold uppercase tracking-[0.14em] hover:text-dm-hot-magenta transition ${
                  scrolled ? "text-ink" : "text-white drop-shadow-[0_1px_8px_rgba(0,0,0,0.45)]"
                }`}
              >
                {l.label}
              </a>
            ))}
          </nav>

          {/* Right cluster — social icons (always visible) + CTA / hamburger */}
          <div className="flex items-center gap-3 sm:gap-4">
            {/* Free-standing social icons, no box */}
            <div className="flex items-center gap-3 sm:gap-4">
              {business.socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className={`hover:text-dm-hot-magenta hover:-translate-y-0.5 transition ${
                    scrolled ? "text-ink" : "text-white drop-shadow-[0_1px_8px_rgba(0,0,0,0.45)]"
                  }`}
                >
                  {s.label === "Instagram" ? <IGIcon size={22} /> : <FBIcon size={22} />}
                </a>
              ))}
            </div>

            {/* Secondary CTA — Nav is a wayfinding surface, not a primary
                conversion surface. Outline pill keeps the gradient pill
                reserved for the Hero / StickyCTA / form submit. */}
            <a
              href="#contact"
              className={`hidden md:inline-flex btn-pill text-[12px] px-5 py-3 ${
                scrolled ? "btn-secondary" : "btn-secondary-on-dark"
              }`}
            >
              Free Proposal <ArrowRight size={16} />
            </a>

            {/* Hamburger — mobile only. Inverts on the dark video hero. */}
            <button
              className={`md:hidden grid h-11 w-11 place-items-center rounded-pill backdrop-blur ${
                scrolled
                  ? "border border-ink/10 bg-white/70 text-ink"
                  : "border border-white/40 bg-white/15 text-white"
              }`}
              onClick={() => setOpen(true)}
              aria-label="Open menu"
            >
              <Menu size={20} />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              key="backdrop"
              className="fixed inset-0 z-[60] bg-ink/60 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
            />
            <motion.aside
              key="drawer"
              className="fixed inset-y-0 right-0 z-[70] w-[88%] max-w-[420px] p-6 bg-canvas"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              style={{ boxShadow: "-30px 0 60px -10px rgba(27,14,46,0.25)" }}
            >
              <div className="flex items-center justify-between">
                <img
                  src={`${import.meta.env.BASE_URL}brand/logo-color-positive.svg`}
                  alt="Digital Movement UK"
                  className="h-7 w-auto"
                />
                <button
                  className="grid h-11 w-11 place-items-center rounded-pill border border-ink/10 text-ink"
                  onClick={() => setOpen(false)}
                  aria-label="Close menu"
                >
                  <X size={20} />
                </button>
              </div>
              <nav className="mt-10 flex flex-col">
                {navLinks.map((l, i) => (
                  <motion.a
                    key={l.href}
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="block py-4 text-[26px] font-bold tracking-tight border-b border-ink/8 text-ink"
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.06 * i + 0.1 }}
                  >
                    {l.label}
                  </motion.a>
                ))}
              </nav>
              <a
                href="#contact"
                onClick={() => setOpen(false)}
                className="btn-pill btn-secondary mt-8 w-full justify-center"
              >
                Free Proposal <ArrowRight size={16} />
              </a>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
