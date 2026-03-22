import type { ThemeTokens } from "../utils/types.js";

export function generateGlobalsCss(opts: {
  light: ThemeTokens;
  dark: ThemeTokens;
}): string {
  const { light, dark } = opts;

  const formatToken = (value: string): string => value;

  return `@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --la-background: ${formatToken(light.colors.background)};
    --la-foreground: ${formatToken(light.colors.foreground)};

    --la-card: ${formatToken(light.colors.card)};
    --la-card-foreground: ${formatToken(light.colors["card-foreground"])};

    --la-popover: ${formatToken(light.colors.popover)};
    --la-popover-foreground: ${formatToken(light.colors["popover-foreground"])};

    --la-primary: ${formatToken(light.colors.primary)};
    --la-primary-foreground: ${formatToken(light.colors["primary-foreground"])};

    --la-secondary: ${formatToken(light.colors.secondary)};
    --la-secondary-foreground: ${formatToken(light.colors["secondary-foreground"])};

    --la-muted: ${formatToken(light.colors.muted)};
    --la-muted-foreground: ${formatToken(light.colors["muted-foreground"])};

    --la-accent: ${formatToken(light.colors.accent)};
    --la-accent-foreground: ${formatToken(light.colors["accent-foreground"])};

    --la-destructive: ${formatToken(light.colors.destructive)};
    --la-destructive-foreground: ${formatToken(light.colors["destructive-foreground"])};

    --la-border: ${formatToken(light.colors.border)};
    --la-input: ${formatToken(light.colors.input)};
    --la-ring: ${formatToken(light.colors.ring)};

    --la-radius: ${light.radius};

    --la-font-sans: "${light.fontSans}";
    --la-font-mono: "${light.fontMono}";

    --la-chart-1: ${formatToken(light.charts["chart-1"])};
    --la-chart-2: ${formatToken(light.charts["chart-2"])};
    --la-chart-3: ${formatToken(light.charts["chart-3"])};
    --la-chart-4: ${formatToken(light.charts["chart-4"])};
    --la-chart-5: ${formatToken(light.charts["chart-5"])};
  }

  .dark {
    --la-background: ${formatToken(dark.colors.background)};
    --la-foreground: ${formatToken(dark.colors.foreground)};

    --la-card: ${formatToken(dark.colors.card)};
    --la-card-foreground: ${formatToken(dark.colors["card-foreground"])};

    --la-popover: ${formatToken(dark.colors.popover)};
    --la-popover-foreground: ${formatToken(dark.colors["popover-foreground"])};

    --la-primary: ${formatToken(dark.colors.primary)};
    --la-primary-foreground: ${formatToken(dark.colors["primary-foreground"])};

    --la-secondary: ${formatToken(dark.colors.secondary)};
    --la-secondary-foreground: ${formatToken(dark.colors["secondary-foreground"])};

    --la-muted: ${formatToken(dark.colors.muted)};
    --la-muted-foreground: ${formatToken(dark.colors["muted-foreground"])};

    --la-accent: ${formatToken(dark.colors.accent)};
    --la-accent-foreground: ${formatToken(dark.colors["accent-foreground"])};

    --la-destructive: ${formatToken(dark.colors.destructive)};
    --la-destructive-foreground: ${formatToken(dark.colors["destructive-foreground"])};

    --la-border: ${formatToken(dark.colors.border)};
    --la-input: ${formatToken(dark.colors.input)};
    --la-ring: ${formatToken(dark.colors.ring)};

    --la-chart-1: ${formatToken(dark.charts["chart-1"])};
    --la-chart-2: ${formatToken(dark.charts["chart-2"])};
    --la-chart-3: ${formatToken(dark.charts["chart-3"])};
    --la-chart-4: ${formatToken(dark.charts["chart-4"])};
    --la-chart-5: ${formatToken(dark.charts["chart-5"])};
  }

  * {
    @apply border-border;
  }

  body {
    @apply bg-background text-foreground;
  }
}
`;
}

export function generateTailwindConfig(opts: { fontSans: string; fontMono: string }): string {
  return `import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}"],
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
      },
      borderRadius: {
        lg: "var(--la-radius)",
        md: "calc(var(--la-radius) - 2px)",
        sm: "calc(var(--la-radius) - 4px)",
      },
      fontFamily: {
        sans: ["var(--la-font-sans)", "${opts.fontSans}", "system-ui", "sans-serif"],
        mono: ["var(--la-font-mono)", "${opts.fontMono}", "monospace"],
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
        "scale-in": {
          from: { opacity: "0", transform: "scale(0.95)" },
          to: { opacity: "1", transform: "scale(1)" },
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
        "scale-in": "scale-in 0.2s ease-out",
        "collapsible-down": "collapsible-down 0.2s ease-out",
        "collapsible-up": "collapsible-up 0.2s ease-out",
      },
    },
  },
  plugins: [],
};

export default config;
`;
}

export function generatePostcssConfig(): string {
  return `export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
`;
}

export function generateTokensJson(opts: { light: ThemeTokens; dark: ThemeTokens }): string {
  const tokens = {
    light: opts.light,
    dark: opts.dark,
  };
  return JSON.stringify(tokens, null, 2);
}
