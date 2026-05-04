import { useEffect, useRef } from "react";
import { Phone, MessageCircle, Mail } from "lucide-react";
import { business } from "../content";
import { Reveal } from "../lib/Reveal";
import { KineticH2 } from "../lib/KineticH2";

export function Owner() {
  return (
    <section className="relative py-20 sm:py-24 md:py-28 lg:py-32 section-line overflow-hidden">
      <div className="container-dm-wide relative">
        <div className="section-chapter">
          <span className="section-chapter__num" aria-hidden>05</span>
          <span className="section-chapter__rule" aria-hidden />
        </div>

        {/* Header — full width above the video + contact panel */}
        <div className="text-center lg:text-left">
          <Reveal>
            <p className="eyebrow">Founder-led replies</p>
          </Reveal>
          <KineticH2
            className="display mt-5 sm:mt-6 text-[clamp(40px,6.8vw,108px)] uppercase max-w-[18ch] mx-auto lg:mx-0"
            spans={[
              { text: "No tickets." },
              { text: "No queue.", className: "text-accent" },
            ]}
          />
          <Reveal delay={0.15}>
            <p className="mt-7 sm:mt-8 mx-auto lg:mx-0 max-w-[760px] text-[17px] sm:text-[19px] text-ink-soft leading-relaxed">
              Whichever channel you use, a founder reads it. We pick up the phone, reply on
              WhatsApp, and answer email — fast. If it's not the right fit for your
              business, we'll say so. Pick the channel that suits you.
            </p>
          </Reveal>
        </div>

        {/* Video left + Contact panel right — side by side at matching heights */}
        <div className="mt-12 sm:mt-14 lg:mt-16 grid gap-6 lg:gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-stretch">
          <Reveal className="h-full">
            <OwnerVideo />
          </Reveal>

          <Reveal delay={0.12} className="h-full">
            {/* Dark contrast panel — vertically aligned to the video margins */}
            <div
              className="relative h-full overflow-hidden rounded-card p-6 sm:p-8 lg:p-10 shadow-soft flex flex-col"
              style={{
                background:
                  "radial-gradient(700px 280px at 100% 0%, rgba(241,60,100,0.18), transparent 60%), radial-gradient(500px 260px at 0% 100%, rgba(154,47,198,0.22), transparent 60%), #1B0E2E",
              }}
            >
              <p className="text-[11px] sm:text-[12px] font-bold uppercase tracking-[0.20em] text-white/55 mb-5 sm:mb-6">
                Three ways to reach us
              </p>
              {/* Tiles — centered vertical stack on mobile, side-by-side icon+text on lg+. */}
              <div className="flex flex-col gap-3 sm:gap-4">
                <a
                  href={business.phoneHref}
                  className="group flex flex-col sm:flex-row items-center sm:gap-4 gap-3 text-center sm:text-left rounded-card border border-white/12 bg-white/[0.06] backdrop-blur-md p-5 sm:p-5 transition hover:bg-white/[0.10] hover:-translate-y-0.5 hover:border-white/25 active:scale-[0.98]"
                >
                  <span className="grid h-14 w-14 sm:h-14 sm:w-14 place-items-center rounded-full bg-white/10 text-white flex-shrink-0">
                    <Phone size={22} />
                  </span>
                  <div className="min-w-0">
                    <p className="text-[10.5px] font-bold uppercase tracking-[0.18em] text-white/55">
                      Call us
                    </p>
                    <p className="mt-0.5 text-[18px] sm:text-[19px] font-extrabold text-white">
                      {business.phone}
                    </p>
                    <p className="mt-0.5 text-[11.5px] text-white/55">Mon–Fri, 9–6</p>
                  </div>
                </a>
                <a
                  href={business.whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex flex-col sm:flex-row items-center sm:gap-4 gap-3 text-center sm:text-left rounded-card border border-white/12 bg-white/[0.06] backdrop-blur-md p-5 sm:p-5 transition hover:bg-white/[0.10] hover:-translate-y-0.5 hover:border-dm-whatsapp/40 active:scale-[0.98]"
                >
                  <span className="grid h-14 w-14 sm:h-14 sm:w-14 place-items-center rounded-full bg-dm-whatsapp/20 text-dm-whatsapp flex-shrink-0">
                    <MessageCircle size={22} />
                  </span>
                  <div className="min-w-0">
                    <p className="text-[10.5px] font-bold uppercase tracking-[0.18em] text-white/55">
                      WhatsApp
                    </p>
                    <p className="mt-0.5 text-[18px] sm:text-[19px] font-extrabold text-white">
                      Message us
                    </p>
                    <p className="mt-0.5 text-[11.5px] text-white/55">Reply within 1h</p>
                  </div>
                </a>
                <a
                  href={business.emailHref}
                  className="group flex flex-col sm:flex-row items-center sm:gap-4 gap-3 text-center sm:text-left rounded-card border border-white/12 bg-white/[0.06] backdrop-blur-md p-5 sm:p-5 transition hover:bg-white/[0.10] hover:-translate-y-0.5 hover:border-white/25 active:scale-[0.98]"
                >
                  <span className="grid h-14 w-14 sm:h-14 sm:w-14 place-items-center rounded-full bg-white/10 text-white flex-shrink-0">
                    <Mail size={22} />
                  </span>
                  <div className="min-w-0">
                    <p className="text-[10.5px] font-bold uppercase tracking-[0.18em] text-white/55">
                      Email
                    </p>
                    <p className="mt-0.5 text-[15px] sm:text-[17px] lg:text-[18px] font-extrabold text-white break-all sm:truncate">
                      {business.email}
                    </p>
                    <p className="mt-0.5 text-[11.5px] text-white/55">Reply within 24h</p>
                  </div>
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function OwnerVideo() {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    v.muted = true;
    v.defaultMuted = true;
    const tryPlay = () => v.play().catch(() => {});
    if (typeof IntersectionObserver === "undefined") {
      tryPlay();
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) tryPlay();
        else v.pause();
      },
      { threshold: 0.1 },
    );
    io.observe(v);
    return () => io.disconnect();
  }, []);

  return (
    <div className="relative h-full w-full rounded-card overflow-hidden glass shadow-soft min-h-[480px] lg:min-h-0">
      <video
        ref={ref}
        className="absolute inset-0 h-full w-full object-cover"
        src={`${import.meta.env.BASE_URL}video/dm-signpost.mp4`}
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        // @ts-expect-error fetchpriority is missing from React types
        fetchpriority="low"
        aria-label="Digital Movement sticker spotted on a London lamppost"
        {...({ "webkit-playsinline": "true", "x5-playsinline": "true" } as Record<string, string>)}
      />
      {/* Bottom-up gradient for caption legibility */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(27,14,46,0) 45%, rgba(27,14,46,0.55) 100%)",
        }}
      />
      {/* Caption */}
      <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
        <p className="text-[11px] font-bold uppercase tracking-[0.20em] text-white/80">
          Spotted in London
        </p>
        <p className="mt-1 text-[22px] sm:text-[24px] font-extrabold leading-tight">
          We're out there. Doing the work.
        </p>
        <p className="mt-1 text-[13px] text-white/80">
          London office · UK-wide service
        </p>
      </div>
    </div>
  );
}
