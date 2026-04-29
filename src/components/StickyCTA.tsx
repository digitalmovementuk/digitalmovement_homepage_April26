import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, MessageCircle } from "lucide-react";
import { business } from "../content";

export function StickyCTA() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const showAfter = window.innerHeight * 0.85;
      const footer = document.querySelector("footer");
      const footerTop = footer?.getBoundingClientRect().top ?? Infinity;
      const beforeFooter = footerTop > window.innerHeight + 80;
      setVisible(window.scrollY > showAfter && beforeFooter);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-x-0 z-40 pointer-events-none"
          style={{ bottom: "max(20px, env(safe-area-inset-bottom))" }}
        >
          <div className="container-dm flex justify-center">
            <div className="pointer-events-auto glass-strong inline-flex items-center gap-2 rounded-pill p-1.5 pl-3 sm:pl-5">
              <span className="hidden sm:inline-flex items-center text-[12px] font-bold uppercase tracking-[0.14em] text-ink pr-1">
                Get your free proposal
              </span>
              <a
                href={business.whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="grid h-11 w-11 place-items-center rounded-pill bg-dm-whatsapp/15 text-dm-whatsapp hover:bg-dm-whatsapp/25 transition"
                aria-label="WhatsApp us"
              >
                <MessageCircle size={18} />
              </a>
              <a
                href="#contact"
                className="btn-pill btn-primary px-4 sm:px-5 py-3 text-[12px] animate-pulse-soft"
              >
                <span className="hidden sm:inline">Free Proposal</span>
                <span className="sm:hidden">Free</span>
                <ArrowRight size={14} />
              </a>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
