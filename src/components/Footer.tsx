import { ArrowRight, Mail, Phone, MessageCircle } from "lucide-react";
import { business, navLinks, services } from "../content";
import { KineticH2 } from "../lib/KineticH2";
import { Reveal } from "../lib/Reveal";

function IGIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
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

export function Footer() {
  return (
    <footer className="relative pt-20 sm:pt-24 md:pt-28 pb-12 sm:pb-14 section-line">
      <div className="container-dm-wide">
        {/* Big CTA */}
        <Reveal>
        <div
          className="relative overflow-hidden rounded-card p-8 sm:p-10 md:p-14 text-center"
          style={{ background: "var(--grad-cta)" }}
        >
          <div
            aria-hidden
            className="absolute inset-0"
            style={{
              backgroundImage:
                "radial-gradient(900px 400px at 100% 0%, rgba(255,178,61,0.4), transparent 60%), radial-gradient(700px 300px at 0% 100%, rgba(154,47,198,0.5), transparent 60%)",
            }}
          />
          <div className="relative">
            <p className="eyebrow text-[12px] text-white/85">Ready to grow?</p>
            <KineticH2
              className="display mt-4 text-[clamp(44px,7.4vw,124px)] uppercase max-w-[14ch] mx-auto text-white"
              spans={[
                { text: "Let's get you to" },
                { text: "page 1.", className: "underline decoration-white/60 underline-offset-[12px]" },
              ]}
            />
            <div className="mt-6 sm:mt-7 flex flex-wrap justify-center gap-3">
              <a
                href="#contact"
                className="btn-pill bg-white text-ink hover:bg-white/95"
              >
                Free Proposal <ArrowRight size={16} />
              </a>
              <a
                href={business.whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-pill glass-dark text-white"
              >
                <MessageCircle size={16} /> WhatsApp us
              </a>
            </div>
          </div>
        </div>
        </Reveal>

        {/* Footer grid */}
        <div className="mt-12 sm:mt-16 grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr] text-center sm:text-left">
          <Reveal>
            <img
              src={`${import.meta.env.BASE_URL}brand/logo-color-positive.svg`}
              alt="Digital Movement UK"
              className="h-8 w-auto mx-auto sm:mx-0"
            />
            <p className="mt-5 max-w-[360px] mx-auto sm:mx-0 text-[14px] text-ink-soft leading-relaxed">
              A UK digital marketing agency that gets businesses to page 1 of Google. Real leads. Real growth. Plain-English advice.
            </p>
            <div className="mt-6 flex items-center justify-center sm:justify-start gap-3">
              {business.socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass grid h-10 w-10 place-items-center rounded-full transition hover:-translate-y-0.5 text-ink"
                  aria-label={s.label}
                >
                  {s.label === "Instagram" ? <IGIcon size={16} /> : <FBIcon size={16} />}
                </a>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-ink-muted">
              Services
            </p>
            <ul className="mt-4 space-y-2.5">
              {services.map((s) => (
                <li key={s.key}>
                  <a href="#services" className="text-[14px] text-ink-soft hover:text-ink">
                    {s.title}
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.16}>
            <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-ink-muted">
              Company
            </p>
            <ul className="mt-4 space-y-2.5">
              {navLinks.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="text-[14px] text-ink-soft hover:text-ink">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.24}>
            <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-ink-muted">
              Get in touch
            </p>
            <ul className="mt-4 space-y-3">
              <li>
                <a
                  href={business.phoneHref}
                  className="inline-flex items-center gap-2 text-[14px] text-ink-soft hover:text-ink"
                >
                  <Phone size={14} /> {business.phone}
                </a>
              </li>
              <li>
                <a
                  href={business.emailHref}
                  className="inline-flex items-center gap-2 text-[14px] text-ink-soft hover:text-ink break-all"
                >
                  <Mail size={14} /> {business.email}
                </a>
              </li>
            </ul>
            <address className="mt-5 not-italic text-[13px] text-ink-muted leading-relaxed">
              {business.address.line1}
              <br />
              {business.address.line2}
              <br />
              {business.address.country}
            </address>
          </Reveal>
        </div>

        <div className="mt-10 sm:mt-12 pt-6 border-t border-ink/8 flex flex-col sm:flex-row flex-wrap items-center justify-center sm:justify-between gap-4 text-[12px] text-ink-muted text-center sm:text-left">
          <p>© {new Date().getFullYear()} Digital Movement UK. All rights reserved.</p>
          <div className="flex items-center gap-5">
            <a href="#" className="hover:text-ink">Privacy</a>
            <a href="#" className="hover:text-ink">Cookies</a>
            <a href="#" className="hover:text-ink">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
