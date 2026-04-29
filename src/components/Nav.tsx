import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, ArrowRight } from "lucide-react";
import { navLinks } from "../content";

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
              src="/brand/logo-color-positive.svg"
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
                className="text-[14px] lg:text-[15px] font-extrabold uppercase tracking-[0.14em] text-ink hover:text-dm-hot-magenta transition"
              >
                {l.label}
              </a>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <a
              href="#contact"
              className="btn-pill btn-primary text-[12px] px-5 py-3"
            >
              Free Proposal <ArrowRight size={16} />
            </a>
          </div>

          <button
            className="md:hidden grid h-11 w-11 place-items-center rounded-pill border border-ink/10 bg-white/70 backdrop-blur text-ink"
            onClick={() => setOpen(true)}
            aria-label="Open menu"
          >
            <Menu size={20} />
          </button>
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
                  src="/brand/logo-color-positive.svg"
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
                className="btn-pill btn-primary mt-8 w-full justify-center"
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
