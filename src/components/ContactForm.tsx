import { useState } from "react";
import { motion, useReducedMotion, AnimatePresence } from "framer-motion";
import { ArrowRight, Check, Phone, MessageCircle, Clock } from "lucide-react";
import { business } from "../content";

const SERVICES = ["SEO", "Google Ads", "Social Media", "Website", "Not sure yet"];

type Variant = "hero" | "panel";

export function ContactForm({ variant = "hero" }: { variant?: Variant }) {
  const reduce = useReducedMotion();
  const [submitted, setSubmitted] = useState(false);
  const [hp, setHp] = useState("");

  const handle = (e: React.FormEvent) => {
    e.preventDefault();
    if (hp) return;
    setSubmitted(true);
  };

  const cardClasses =
    variant === "hero"
      ? "glass-frosted rounded-card p-5 sm:p-7"
      : "glass-frosted rounded-card p-6 sm:p-8";

  return (
    <div className={cardClasses}>
      <AnimatePresence mode="wait">
        {!submitted ? (
          <motion.form
            key="form"
            onSubmit={handle}
            initial={reduce ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35 }}
            className="relative z-[1] space-y-3.5"
          >
            <div className="flex items-center justify-between gap-3 pb-1 text-left">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-ink-muted">
                  Free Proposal
                </p>
                <h3 className="mt-1 text-[22px] sm:text-[24px] font-extrabold leading-tight text-ink">
                  Tell us what you need.
                </h3>
              </div>
              <span className="inline-flex items-center gap-1 rounded-pill bg-dm-gold/15 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-dm-orange-deep flex-shrink-0">
                ★ 5.0
              </span>
            </div>

            <Field label="Your name" id="name" name="name" required autoComplete="name" />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <Field
                label="Email"
                id="email"
                name="email"
                type="email"
                required
                autoComplete="email"
              />
              <Field label="Phone" id="phone" name="phone" type="tel" autoComplete="tel" />
            </div>

            <div>
              <Label htmlFor="topic">What you need</Label>
              <select id="topic" name="topic" className={inputBase}>
                {SERVICES.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <Label htmlFor="message">Anything we should know? (optional)</Label>
              <textarea
                id="message"
                name="message"
                rows={3}
                className={`${inputBase} resize-none`}
                placeholder="Goals, current site, timeline…"
              />
            </div>

            {/* honeypot */}
            <input
              type="text"
              tabIndex={-1}
              autoComplete="off"
              value={hp}
              onChange={(e) => setHp(e.target.value)}
              className="hidden"
              aria-hidden="true"
            />

            <button
              type="submit"
              className="btn-pill btn-primary w-full mt-1"
            >
              Send My Free Proposal <ArrowRight size={16} />
            </button>

            <p className="text-[11px] text-ink-muted leading-relaxed">
              No pressure, no jargon. We reply within 24h on weekdays. By submitting you agree to be contacted about your enquiry.
            </p>
          </motion.form>
        ) : (
          <motion.div
            key="success"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-[1] py-4 text-center"
          >
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-dm-cta shadow-pop text-white">
              <Check size={26} strokeWidth={3} />
            </div>
            <h3 className="mt-5 text-[22px] font-extrabold text-ink">We've got your details.</h3>
            <p className="mt-2 text-ink-soft leading-relaxed">
              A founder — not a sales rep — will reply personally within 24h on weekdays.
            </p>

            {/* Inline "what happens next" — keeps the user at the form, no
                scroll-away link. Saving the number is the next concrete
                action; that's why it's the prominent affordance. */}
            <div className="mt-6 rounded-xl2 border border-ink/10 bg-white/70 p-4 sm:p-5 text-left space-y-3">
              <div className="flex items-start gap-3">
                <span className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-full bg-canvas-2 text-ink">
                  <Clock size={15} strokeWidth={2.4} />
                </span>
                <div className="text-[13px] text-ink-soft leading-relaxed">
                  <p className="font-bold text-ink">Reply within 24h</p>
                  <p>Weekdays. We screen-share the audit on a 30-min call — no padded sales deck.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-full bg-canvas-2 text-ink">
                  <Phone size={14} strokeWidth={2.4} />
                </span>
                <div className="text-[13px] text-ink-soft leading-relaxed">
                  <p className="font-bold text-ink">Save our number</p>
                  <p>
                    Call-backs come from{" "}
                    <a href={business.phoneHref} className="text-ink underline underline-offset-2 hover:text-dm-hot-magenta">
                      {business.phone}
                    </a>
                    . If we ring, that's us.
                  </p>
                </div>
              </div>
            </div>

            {/* Optional fast lane — WhatsApp for those who'd rather not wait. */}
            <a
              href={business.whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-pill btn-secondary mt-5 inline-flex text-[12px] px-5 py-3"
            >
              <MessageCircle size={14} /> Or WhatsApp us now
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

const inputBase =
  "w-full rounded-xl2 border border-ink/12 bg-white/80 px-4 py-3 text-[15px] text-ink placeholder:text-ink-faint outline-none transition focus:border-dm-hot-magenta focus:bg-white focus:ring-2 focus:ring-dm-hot-magenta/15";

function Label({ htmlFor, children }: { htmlFor: string; children: React.ReactNode }) {
  return (
    <label
      htmlFor={htmlFor}
      className="mb-1.5 block text-[11px] font-bold uppercase tracking-[0.14em] text-ink-muted"
    >
      {children}
    </label>
  );
}

function Field({
  label,
  id,
  name,
  type = "text",
  required,
  autoComplete,
}: {
  label: string;
  id: string;
  name: string;
  type?: string;
  required?: boolean;
  autoComplete?: string;
}) {
  return (
    <div>
      <Label htmlFor={id}>{label}</Label>
      <input
        id={id}
        name={name}
        type={type}
        required={required}
        autoComplete={autoComplete}
        className={inputBase}
      />
    </div>
  );
}
