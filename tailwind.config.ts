import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // ─── Brand ─────────────────────────────────────────────────
        burgundy: {
          DEFAULT: "#722F37",
          50: "#FBF1F2",
          100: "#F5DDE0",
          200: "#E5B1B6",
          300: "#C97D85",
          400: "#9E4651",
          500: "#722F37",
          600: "#5C262C",
          700: "#451C21",
          800: "#2E1316",
          900: "#170A0B",
        },
        gold: {
          DEFAULT: "#B8860B",
          light: "#E6C75E",
          dark: "#8E6708",
        },
        seal: "#8B1A1A",

        // ─── Semantic surfaces (now LIGHT theme) ──────────────────
        // These names are kept stable across the codebase so a future
        // theme swap is a single config edit.
        ink: "#F8F2E7",      // page background (warm cream)
        surface: "#FFFFFF",  // cards / dropdowns / drawer
        cream: "#2A1014",    // primary text — deep wine ink
        muted: "#7A6B5C",    // secondary text — warm brown
        line: "#E5D9C5",     // borders on cream
      },
      fontFamily: {
        serif: ["var(--font-playfair)", "Georgia", "serif"],
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-1000px 0" },
          "100%": { backgroundPosition: "1000px 0" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
        "marquee-x": {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.6s ease-out",
        shimmer: "shimmer 2s linear infinite",
        float: "float 4s ease-in-out infinite",
        marquee: "marquee-x 40s linear infinite",
      },
      backgroundImage: {
        "gradient-burgundy":
          "linear-gradient(135deg, #722F37 0%, #45161C 100%)",
        "gradient-gold":
          "linear-gradient(135deg, #E6C75E 0%, #B8860B 100%)",
        "gradient-cream":
          "linear-gradient(180deg, #FBF6EC 0%, #F2E8D4 100%)",
      },
      boxShadow: {
        "wine-soft": "0 10px 40px -15px rgba(114,47,55,0.25)",
        "wine-glow": "0 0 30px -5px rgba(212,175,55,0.4)",
        "card-soft": "0 4px 24px -8px rgba(74,20,26,0.12)",
      },
    },
  },
  plugins: [],
};

export default config;
