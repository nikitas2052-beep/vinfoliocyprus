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
        // ─── Brand (new Vinfolio palette) ────────────────────────
        // Primary: dark blue-graphite (#242E35)
        ink: {
          DEFAULT: "#242E35",
          50: "#F4F5F6",
          100: "#E5E7E9",
          200: "#C2C7CB",
          300: "#9DA4AB",
          400: "#5D6973",
          500: "#3A464F",
          600: "#242E35",
          700: "#1B2329",
          800: "#13191E",
          900: "#0B1014",
        },
        // Secondary: deep wine red (#C31432)
        wine: {
          DEFAULT: "#C31432",
          50: "#FCE7EB",
          100: "#F8C9D2",
          200: "#EE8A99",
          300: "#E04D62",
          400: "#C31432",
          500: "#9F1029",
          600: "#7B0C20",
          700: "#570817",
          800: "#33050E",
        },
        // Accent: deep wine red (mirrors wine palette)
        bronze: {
          DEFAULT: "#C31432",
          50: "#FCE7EB",
          100: "#F8C9D2",
          200: "#EE8A99",
          300: "#E04D62",
          400: "#C31432",
          500: "#9F1029",
          600: "#7B0C20",
          700: "#570817",
        },
        // Neutral surfaces
        paper: "#FFFFFF",
        chalk: "#F9F8F4",
        muted: "#545D5C",
        line: "#E5E2DC",
        // Legacy aliases (kept so any leftover classes still resolve)
        cream: "#000000",
        surface: "#FFFFFF",
        burgundy: {
          DEFAULT: "#C31432",
          50: "#FCE7EB",
          100: "#F8C9D2",
          200: "#EE8A99",
          300: "#E04D62",
          400: "#C31432",
          500: "#9F1029",
          600: "#7B0C20",
          700: "#570817",
          800: "#33050E",
          900: "#1A030A",
        },
        gold: {
          DEFAULT: "#C31432",
          light: "#E04D62",
          dark: "#9F1029",
        },
        seal: "#C31432",
      },
      fontFamily: {
        serif: ["var(--font-cormorant)", "Cormorant Infant", "Georgia", "serif"],
        sans: ["var(--font-alata)", "Alata", "system-ui", "sans-serif"],
      },
      fontSize: {
        display: ["clamp(3rem, 8vw, 6.25rem)", { lineHeight: "1.02", letterSpacing: "-0.02em" }],
        hero: ["clamp(2.25rem, 5vw, 3.75rem)", { lineHeight: "1.05", letterSpacing: "-0.015em" }],
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
        "marquee-x": {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "ken-burns": {
          "0%": { transform: "scale(1) translate(0,0)" },
          "100%": { transform: "scale(1.06) translate(-1%, -1%)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.8s cubic-bezier(0.22,1,0.36,1)",
        shimmer: "shimmer 2s linear infinite",
        marquee: "marquee-x 45s linear infinite",
        "ken-burns": "ken-burns 14s ease-in-out infinite alternate",
      },
      backgroundImage: {
        "gradient-bronze": "linear-gradient(135deg, #E04D62 0%, #9F1029 100%)",
        "gradient-ink": "linear-gradient(135deg, #242E35 0%, #13191E 100%)",
      },
      boxShadow: {
        soft: "0 6px 24px -10px rgba(36,46,53,0.18)",
        card: "0 4px 30px -12px rgba(36,46,53,0.12)",
        hover: "0 18px 50px -20px rgba(36,46,53,0.30)",
      },
      borderRadius: {
        sm: "4px",
        DEFAULT: "4px",
        pill: "13px",
      },
    },
  },
  plugins: [],
};

export default config;
