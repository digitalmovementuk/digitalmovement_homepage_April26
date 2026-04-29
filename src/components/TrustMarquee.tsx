import { Star } from "lucide-react";

const ITEMS = [
  { kind: "stars" as const },
  { kind: "text" as const, label: "Trusted by UK businesses" },
  { kind: "google" as const },
  { kind: "text" as const, label: "200+ five-star reviews" },
  { kind: "stars" as const },
  { kind: "text" as const, label: "Page 1 from day 5" },
  { kind: "google" as const },
  { kind: "text" as const, label: "No long-term contracts" },
  { kind: "stars" as const },
  { kind: "text" as const, label: "We show you the maths" },
  { kind: "google" as const },
  { kind: "text" as const, label: "London · UK-wide" },
];

export function TrustMarquee() {
  return (
    <section
      aria-label="Trust signals"
      className="relative border-y border-ink/8 bg-white py-4 sm:py-5"
    >
      <div className="mask-fade-x overflow-hidden">
        <div className="marquee-track items-center text-ink-muted">
          {[...ITEMS, ...ITEMS].map((item, i) => (
            <Item key={i} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}

function Item({ item }: { item: (typeof ITEMS)[number] }) {
  if (item.kind === "stars") {
    return (
      <span className="inline-flex items-center gap-1 text-dm-gold">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star key={i} size={14} fill="currentColor" stroke="none" />
        ))}
      </span>
    );
  }
  if (item.kind === "google") {
    return (
      <span className="glass-pill inline-flex items-center gap-2 rounded-pill px-3 py-1.5">
        <GoogleG />
        <span className="text-[12px] font-bold tracking-wide text-ink">Google · 5.0</span>
      </span>
    );
  }
  return (
    <span className="text-[12px] font-bold uppercase tracking-[0.18em] whitespace-nowrap">
      {item.label}
    </span>
  );
}

function GoogleG() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" aria-hidden>
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
