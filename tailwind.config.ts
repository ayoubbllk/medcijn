import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-body)", "system-ui", "sans-serif"],
        heading: ["var(--font-heading)", "system-ui", "sans-serif"],
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        card: {
          DEFAULT: "var(--card)",
          foreground: "var(--card-foreground)",
        },
        popover: {
          DEFAULT: "var(--popover)",
          foreground: "var(--popover-foreground)",
        },
        primary: {
          DEFAULT: "var(--primary)",
          foreground: "var(--primary-foreground)",
          50: "#EFFBFB",
          100: "#D6F5F6",
          200: "#AEEAEC",
          300: "#7CDCDF",
          400: "#43C7CC",
          500: "#16B0B7",
          600: "#0D949C",
          700: "#0F777E",
          800: "#115F65",
          900: "#124E53",
        },
        secondary: {
          DEFAULT: "var(--secondary)",
          foreground: "var(--secondary-foreground)",
        },
        muted: {
          DEFAULT: "var(--muted)",
          foreground: "var(--muted-foreground)",
        },
        accent: {
          DEFAULT: "var(--accent)",
          foreground: "var(--accent-foreground)",
          50: "#FDF0ED",
          100: "#F9DCD6",
          200: "#F2B5A8",
          300: "#E98870",
          400: "#E8674A",
          500: "#D94E2F",
          600: "#B53D23",
          700: "#8F2F1B",
        },
        mint: {
          DEFAULT: "#7FB8A4",
          50: "#EEF6F3",
          100: "#D5E9E2",
          200: "#B0D6C9",
          300: "#7FB8A4",
          400: "#5A9B87",
          500: "#3F7F6C",
        },
        medical: {
          50: "#EFFBFB",
          100: "#D6F5F6",
          200: "#AEEAEC",
          300: "#7CDCDF",
          400: "#43C7CC",
          500: "#16B0B7",
          600: "#0D949C",
          700: "#0F777E",
          800: "#115F65",
          900: "#124E53",
        },
        destructive: {
          DEFAULT: "var(--destructive)",
          foreground: "var(--destructive-foreground)",
        },
        border: "var(--border)",
        input: "var(--input)",
        ring: "var(--ring)",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "pulse-slow": {
          "0%, 100%": { transform: "scale(1)", opacity: "0.6" },
          "50%": { transform: "scale(1.03)", opacity: "0.8" },
        },
        "ecg-draw": {
          "0%": { strokeDashoffset: "1000" },
          "100%": { strokeDashoffset: "0" },
        },
        "float": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-6px)" },
        },
      },
      animation: {
        "pulse-slow": "pulse-slow 4s ease-in-out infinite",
        "ecg-draw": "ecg-draw 2s ease-out forwards",
        "float": "float 6s ease-in-out infinite",
      },
      boxShadow: {
        soft: "0 4px 24px -6px rgba(13, 148, 156, 0.14)",
        "soft-lg": "0 12px 40px -8px rgba(13, 148, 156, 0.2)",
        teal: "0 16px 48px -12px rgba(13, 148, 156, 0.45)",
      },
    },
  },
  plugins: [],
};
export default config;
