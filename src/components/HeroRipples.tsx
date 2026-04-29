import { useEffect, useRef, useState } from "react";

type Ripple = {
  id: number;
  x: number;
  y: number;
  /** 0 (idle) → 1 (sprint) — drives size, opacity, duration. */
  intensity: number;
};

export function HeroRipples({ scope }: { scope: React.RefObject<HTMLElement | null> }) {
  const [ripples, setRipples] = useState<Ripple[]>([]);
  const idRef = useRef(0);
  const lastEmit = useRef(0);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const inside = (e: { clientX: number; clientY: number }) => {
      const el = scope.current;
      if (!el) return null;
      const rect = el.getBoundingClientRect();
      const within =
        e.clientX >= rect.left &&
        e.clientX <= rect.right &&
        e.clientY >= rect.top &&
        e.clientY <= rect.bottom;
      if (!within) return null;
      return {
        x: (e.clientX - rect.left) / rect.width,
        y: (e.clientY - rect.top) / rect.height,
      };
    };

    const emit = (x: number, y: number, intensity: number, throttleMs: number) => {
      const now = performance.now();
      if (now - lastEmit.current < throttleMs) return;
      lastEmit.current = now;
      const id = ++idRef.current;
      // Bigger jitter when fast so the wake widens
      const j = 0.012 + intensity * 0.05;
      const jitterX = (Math.random() - 0.5) * j;
      const jitterY = (Math.random() - 0.5) * j;
      // Cap concurrent ripples lower to keep paint cost bounded
      setRipples((r) => [
        ...r.slice(-9),
        { id, x: x + jitterX, y: y + jitterY, intensity },
      ]);
      window.setTimeout(
        () => setRipples((r) => r.filter((rp) => rp.id !== id)),
        1800,
      );
    };

    // ── Velocity tracking ───────────────────────────────────
    let lastX = 0;
    let lastY = 0;
    let lastT = 0;
    let velSmooth = 0; // smoothed px/sec, EMA
    const VEL_FAST = 2400; // px/sec considered "sprinting"

    const measure = (clientX: number, clientY: number) => {
      const now = performance.now();
      if (lastT > 0) {
        const dx = clientX - lastX;
        const dy = clientY - lastY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const dt = Math.max(1, now - lastT);
        const inst = (dist / dt) * 1000; // px/sec
        // EMA smoothing — responsive but stable
        velSmooth = velSmooth * 0.55 + inst * 0.45;
      }
      lastX = clientX;
      lastY = clientY;
      lastT = now;
      return Math.min(1, velSmooth / VEL_FAST);
    };

    // Velocity decay so a stop quickly resets the smoothed speed
    let decayTimer = 0;

    const onMouseMove = (e: MouseEvent) => {
      const pos = inside(e);
      if (!pos) return;
      const intensity = measure(e.clientX, e.clientY);
      // Faster cursor → many more ripples per second
      // intensity 0 → 110ms, intensity 1 → 22ms
      const throttle = 22 + (1 - intensity) * 88;
      emit(pos.x, pos.y, intensity, throttle);
      window.clearTimeout(decayTimer);
      decayTimer = window.setTimeout(() => {
        velSmooth *= 0.4;
      }, 120);
    };

    const onTouchMove = (e: TouchEvent) => {
      const t = e.touches[0];
      if (!t) return;
      const pos = inside({ clientX: t.clientX, clientY: t.clientY });
      if (!pos) return;
      const intensity = measure(t.clientX, t.clientY);
      const throttle = 22 + (1 - intensity) * 88;
      emit(pos.x, pos.y, intensity, throttle);
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("touchmove", onTouchMove);
      window.clearTimeout(decayTimer);
    };
  }, [scope]);

  return (
    <div aria-hidden className="ripple-layer absolute inset-0 -z-[5] overflow-hidden pointer-events-none">
      {ripples.map((r) => {
        // Map intensity to visual properties
        const sizePx = 200 + r.intensity * 280; // 200 → 480px
        const opacity = 0.55 + r.intensity * 0.45; // 0.55 → 1.0
        const duration = 1.4 + r.intensity * 0.55; // 1.4s → 1.95s
        return (
          <span
            key={r.id}
            className="ripple"
            style={
              {
                left: `${r.x * 100}%`,
                top: `${r.y * 100}%`,
                width: `${sizePx}px`,
                height: `${sizePx}px`,
                opacity,
                animationDuration: `${duration}s`,
              } as React.CSSProperties
            }
          />
        );
      })}
    </div>
  );
}
