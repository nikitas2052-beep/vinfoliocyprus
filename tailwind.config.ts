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
        burgundy: {
          DEFAULT: "#722F37",
          50: "#F5E6E8",
          100: "#E9CDD0",
          200: "#D29BA2",
          300: "#BC6973",
          400: "#A53B47",
          500: "#722F37",
          600: "#5C262C",
          700: "#451C21",
          800: "#2E1316",
          900: "#170A0B",
        },
        gold: {
          DEFAULT: "#D4AF37",
          light: "#E6C75E",
          dark: "#A98A2B",
        },
        seal: "#8B1A1A",
        cream: "#F5F0E8",
        ink: "#0F0A0B",
        surface: "#1A1416",
        muted: "#B8A89C",
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
      },
      animation: {
        "fade-up": "fade-up 0.6s ease-out",
        shimmer: "shimmer 2s linear infinite",
      },
      backgroundImage: {
        "gradient-burgundy":
          "linear-gradient(135deg, #722F37 0%, #45161C 100%)",
        "gradient-gold":
          "linear-gradient(135deg, #E6C75E 0%, #A98A2B 100%)",
      },
    },
  },
  plugins: [],
};

export default config;
