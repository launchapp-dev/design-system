import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{ts,tsx}",
    "../../src/**/*.{ts,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--la-border))",
        input: "hsl(var(--la-input))",
        ring: "hsl(var(--la-ring))",
        background: "hsl(var(--la-background))",
        foreground: "hsl(var(--la-foreground))",
        primary: {
          DEFAULT: "hsl(var(--la-primary))",
          foreground: "hsl(var(--la-primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--la-secondary))",
          foreground: "hsl(var(--la-secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--la-destructive))",
          foreground: "hsl(var(--la-destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--la-muted))",
          foreground: "hsl(var(--la-muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--la-accent))",
          foreground: "hsl(var(--la-accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--la-popover))",
          foreground: "hsl(var(--la-popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--la-card))",
          foreground: "hsl(var(--la-card-foreground))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--la-sidebar))",
          foreground: "hsl(var(--la-sidebar-foreground))",
          border: "hsl(var(--la-sidebar-border))",
        },
        docs: {
          DEFAULT: "hsl(var(--la-docs-bg))",
        },
      },
      borderRadius: {
        lg: "var(--la-radius)",
        md: "calc(var(--la-radius) - 2px)",
        sm: "calc(var(--la-radius) - 4px)",
      },
      fontFamily: {
        sans: ["var(--la-font-sans)", "system-ui", "sans-serif"],
        mono: ["var(--la-font-mono)", "monospace"],
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
        "slide-in-from-left": {
          from: { transform: "translateX(-100%)" },
          to: { transform: "translateX(0)" },
        },
        "slide-out-to-left": {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-100%)" },
        },
        "slide-in-from-right": {
          from: { transform: "translateX(100%)" },
          to: { transform: "translateX(0)" },
        },
        "slide-out-to-right": {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(100%)" },
        },
        "collapsible-down": {
          from: { height: "0" },
          to: { height: "var(--radix-collapsible-content-height)" },
        },
        "collapsible-up": {
          from: { height: "var(--radix-collapsible-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in 0.2s ease-out",
        "fade-out": "fade-out 0.2s ease-out",
        "slide-in-from-left": "slide-in-from-left 0.3s ease-out",
        "slide-out-to-left": "slide-out-to-left 0.3s ease-out",
        "slide-in-from-right": "slide-in-from-right 0.3s ease-out",
        "slide-out-to-right": "slide-out-to-right 0.3s ease-out",
        "collapsible-down": "collapsible-down 0.2s ease-out",
        "collapsible-up": "collapsible-up 0.2s ease-out",
      },
    },
  },
  plugins: [],
};

export default config;
