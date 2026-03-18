import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--ag-border))",
        input: "hsl(var(--ag-input))",
        ring: "hsl(var(--ag-ring))",
        background: "hsl(var(--ag-background))",
        foreground: "hsl(var(--ag-foreground))",
        primary: {
          DEFAULT: "hsl(var(--ag-primary))",
          foreground: "hsl(var(--ag-primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--ag-secondary))",
          foreground: "hsl(var(--ag-secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--ag-destructive))",
          foreground: "hsl(var(--ag-destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--ag-muted))",
          foreground: "hsl(var(--ag-muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--ag-accent))",
          foreground: "hsl(var(--ag-accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--ag-popover))",
          foreground: "hsl(var(--ag-popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--ag-card))",
          foreground: "hsl(var(--ag-card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--ag-radius)",
        md: "calc(var(--ag-radius) - 2px)",
        sm: "calc(var(--ag-radius) - 4px)",
      },
      fontFamily: {
        sans: ["var(--ag-font-sans)", "system-ui", "sans-serif"],
        mono: ["var(--ag-font-mono)", "monospace"],
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "fade-in": {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        "fade-out": {
          from: { opacity: "1" },
          to: { opacity: "0" },
        },
        "slide-in-from-top": {
          from: { transform: "translateY(-100%)" },
          to: { transform: "translateY(0)" },
        },
        "slide-in-from-bottom": {
          from: { transform: "translateY(100%)" },
          to: { transform: "translateY(0)" },
        },
        "scale-in": {
          from: { opacity: "0", transform: "scale(0.95)" },
          to: { opacity: "1", transform: "scale(1)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in 0.2s ease-out",
        "fade-out": "fade-out 0.2s ease-out",
        "slide-in-from-top": "slide-in-from-top 0.3s ease-out",
        "slide-in-from-bottom": "slide-in-from-bottom 0.3s ease-out",
        "scale-in": "scale-in 0.2s ease-out",
      },
    },
  },
  plugins: [],
};

export default config;
