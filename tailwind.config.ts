import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Core palette
        ink: {
          DEFAULT: "#0A0B0E",
          50: "#F5F5F7",
          100: "#E8E9EE",
          200: "#C4C6D2",
          300: "#9195A8",
          400: "#5E6278",
          500: "#3B3F54",
          600: "#252838",
          700: "#16192A",
          800: "#0E1020",
          900: "#0A0B0E",
        },
        // Electric accent
        volt: {
          DEFAULT: "#00E5FF",
          50: "#E0FAFE",
          100: "#B3F5FD",
          200: "#66EBFB",
          300: "#19E1F9",
          400: "#00D4EF",
          500: "#00C4DD",
          600: "#00A8BE",
          700: "#008CA0",
          800: "#007080",
          900: "#005262",
        },
        // Warm gold accent
        gold: {
          DEFAULT: "#F5A623",
          50: "#FEF8ED",
          100: "#FDEFD3",
          200: "#FBDFA7",
          300: "#F9CF7B",
          400: "#F7BF4F",
          500: "#F5A623",
          600: "#D4891A",
          700: "#AB6E14",
          800: "#82530F",
          900: "#59380A",
        },
        // Semantic
        success: "#00D084",
        danger: "#FF4757",
        warning: "#FFB830",
      },
      fontFamily: {
        display: ["var(--font-syne)", "sans-serif"],
        body: ["var(--font-dm-sans)", "sans-serif"],
        mono: ["var(--font-jetbrains)", "monospace"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-mesh":
          "radial-gradient(at 40% 20%, hsla(189,100%,56%,0.08) 0px, transparent 50%), radial-gradient(at 80% 0%, hsla(45,89%,55%,0.05) 0px, transparent 50%), radial-gradient(at 0% 50%, hsla(340,100%,76%,0.03) 0px, transparent 50%)",
        "card-shine":
          "linear-gradient(135deg, rgba(255,255,255,0.05) 0%, transparent 50%)",
      },
      animation: {
        "fade-up": "fadeUp 0.5s ease forwards",
        "fade-in": "fadeIn 0.4s ease forwards",
        "slide-in": "slideIn 0.4s ease forwards",
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        shimmer: "shimmer 2s linear infinite",
        float: "float 6s ease-in-out infinite",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideIn: {
          "0%": { opacity: "0", transform: "translateX(-16px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-700px 0" },
          "100%": { backgroundPosition: "700px 0" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
      boxShadow: {
        "volt-glow": "0 0 30px rgba(0, 229, 255, 0.2)",
        "volt-glow-sm": "0 0 12px rgba(0, 229, 255, 0.15)",
        "card-elevated":
          "0 4px 6px -1px rgba(0,0,0,0.4), 0 2px 4px -2px rgba(0,0,0,0.3)",
        "card-hover":
          "0 20px 40px -12px rgba(0,0,0,0.6), 0 0 0 1px rgba(0,229,255,0.1)",
        inner: "inset 0 1px 0 rgba(255,255,255,0.06)",
      },
      borderRadius: {
        "2xl": "1rem",
        "3xl": "1.5rem",
      },
    },
  },
  plugins: [],
};
export default config;
