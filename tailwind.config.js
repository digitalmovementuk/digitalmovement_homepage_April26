/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        canvas: {
          DEFAULT: "#FAF7F2",
          1: "#FAF7F2",
          2: "#F4F0E8",
          3: "#EFEAE0",
        },
        panel: {
          DEFAULT: "#FFFFFF",
          soft: "#F7F4EE",
        },
        ink: {
          DEFAULT: "#1B0E2E",
          soft: "#3F3450",
          muted: "#6E6478",
          faint: "#A39CB2",
        },
        dm: {
          pink: "#F13C64",
          magenta: "#E6359B",
          "hot-magenta": "#EC178D",
          violet: "#D332FF",
          "violet-deep": "#9A2FC6",
          orange: "#FFB23D",
          "orange-deep": "#F05F22",
          gold: "#F5A623",
          whatsapp: "#25D366",
        },
      },
      fontFamily: {
        sans: [
          "Manrope",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "sans-serif",
        ],
      },
      borderRadius: {
        card: "16px",
        pill: "999px",
        xl2: "20px",
      },
      boxShadow: {
        soft: "0 26px 60px -28px rgba(27, 14, 46, 0.22)",
        card: "0 14px 40px -22px rgba(27, 14, 46, 0.18)",
        pop: "0 22px 50px -16px rgba(241, 60, 100, 0.32)",
        ring: "0 0 0 1px rgba(27, 14, 46, 0.08)",
      },
      backgroundImage: {
        "dm-cta": "linear-gradient(90deg, #F13C64 0%, #E6359B 50%, #DC2EC9 100%)",
        "dm-brand":
          "linear-gradient(135deg, #FFB23D 14%, #F05F22 33%, #EC178D 59%, #D332FF 78%, #9A2FC6 100%)",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "blob-spin": {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        "pulse-soft": {
          "0%, 100%": { boxShadow: "0 0 0 0 rgba(241, 60, 100, 0.45)" },
          "50%": { boxShadow: "0 0 0 14px rgba(241, 60, 100, 0)" },
        },
      },
      animation: {
        marquee: "marquee 38s linear infinite",
        "blob-spin": "blob-spin 60s linear infinite",
        "pulse-soft": "pulse-soft 2.4s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
