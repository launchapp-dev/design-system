import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import prompts from "prompts";

const COMMUNITY_THEMES = {
  dracula: {
    name: "Dracula",
    tokens: {
      light: {
        "--la-background": "0 0% 100%",
        "--la-foreground": "231 15% 18%",
        "--la-card": "0 0% 100%",
        "--la-card-foreground": "231 15% 18%",
        "--la-popover": "0 0% 100%",
        "--la-popover-foreground": "231 15% 18%",
        "--la-primary": "265 89% 66%",
        "--la-primary-foreground": "0 0% 100%",
        "--la-secondary": "231 15% 95%",
        "--la-secondary-foreground": "231 15% 25%",
        "--la-muted": "231 15% 90%",
        "--la-muted-foreground": "231 15% 45%",
        "--la-accent": "265 89% 66%",
        "--la-accent-foreground": "0 0% 100%",
        "--la-destructive": "0 100% 67%",
        "--la-destructive-foreground": "0 0% 100%",
        "--la-border": "231 15% 88%",
        "--la-input": "231 15% 88%",
        "--la-ring": "265 89% 66%",
      },
      dark: {
        "--la-background": "231 15% 18%",
        "--la-foreground": "60 30% 96%",
        "--la-card": "231 15% 22%",
        "--la-card-foreground": "60 30% 96%",
        "--la-popover": "231 15% 22%",
        "--la-popover-foreground": "60 30% 96%",
        "--la-primary": "189 100% 74%",
        "--la-primary-foreground": "231 15% 18%",
        "--la-secondary": "231 15% 35%",
        "--la-secondary-foreground": "60 30% 96%",
        "--la-muted": "231 15% 40%",
        "--la-muted-foreground": "231 15% 70%",
        "--la-accent": "189 100% 74%",
        "--la-accent-foreground": "231 15% 18%",
        "--la-destructive": "0 100% 67%",
        "--la-destructive-foreground": "0 0% 100%",
        "--la-border": "231 15% 32%",
        "--la-input": "231 15% 32%",
        "--la-ring": "189 100% 74%",
      },
    },
  },
  nord: {
    name: "Nord",
    tokens: {
      light: {
        "--la-background": "0 0% 100%",
        "--la-foreground": "219 16% 27%",
        "--la-card": "0 0% 100%",
        "--la-card-foreground": "219 16% 27%",
        "--la-popover": "0 0% 100%",
        "--la-popover-foreground": "219 16% 27%",
        "--la-primary": "218 88% 52%",
        "--la-primary-foreground": "0 0% 100%",
        "--la-secondary": "219 16% 95%",
        "--la-secondary-foreground": "219 16% 30%",
        "--la-muted": "219 16% 90%",
        "--la-muted-foreground": "219 16% 45%",
        "--la-accent": "218 88% 52%",
        "--la-accent-foreground": "0 0% 100%",
        "--la-destructive": "0 86% 59%",
        "--la-destructive-foreground": "0 0% 100%",
        "--la-border": "219 16% 88%",
        "--la-input": "219 16% 88%",
        "--la-ring": "218 88% 52%",
      },
      dark: {
        "--la-background": "219 16% 20%",
        "--la-foreground": "218 17% 92%",
        "--la-card": "219 16% 24%",
        "--la-card-foreground": "218 17% 92%",
        "--la-popover": "219 16% 24%",
        "--la-popover-foreground": "218 17% 92%",
        "--la-primary": "218 88% 65%",
        "--la-primary-foreground": "219 16% 20%",
        "--la-secondary": "219 16% 35%",
        "--la-secondary-foreground": "218 17% 92%",
        "--la-muted": "219 16% 42%",
        "--la-muted-foreground": "219 16% 70%",
        "--la-accent": "218 88% 65%",
        "--la-accent-foreground": "219 16% 20%",
        "--la-destructive": "0 86% 59%",
        "--la-destructive-foreground": "0 0% 100%",
        "--la-border": "219 16% 32%",
        "--la-input": "219 16% 32%",
        "--la-ring": "218 88% 65%",
      },
    },
  },
  gruvbox: {
    name: "Gruvbox",
    tokens: {
      light: {
        "--la-background": "0 0% 100%",
        "--la-foreground": "14 8% 23%",
        "--la-card": "0 0% 100%",
        "--la-card-foreground": "14 8% 23%",
        "--la-popover": "0 0% 100%",
        "--la-popover-foreground": "14 8% 23%",
        "--la-primary": "25 83% 60%",
        "--la-primary-foreground": "0 0% 100%",
        "--la-secondary": "14 8% 95%",
        "--la-secondary-foreground": "14 8% 30%",
        "--la-muted": "14 8% 90%",
        "--la-muted-foreground": "14 8% 45%",
        "--la-accent": "25 83% 60%",
        "--la-accent-foreground": "0 0% 100%",
        "--la-destructive": "0 100% 62%",
        "--la-destructive-foreground": "0 0% 100%",
        "--la-border": "14 8% 88%",
        "--la-input": "14 8% 88%",
        "--la-ring": "25 83% 60%",
      },
      dark: {
        "--la-background": "14 8% 18%",
        "--la-foreground": "60 23% 92%",
        "--la-card": "14 8% 22%",
        "--la-card-foreground": "60 23% 92%",
        "--la-popover": "14 8% 22%",
        "--la-popover-foreground": "60 23% 92%",
        "--la-primary": "25 83% 70%",
        "--la-primary-foreground": "14 8% 18%",
        "--la-secondary": "14 8% 35%",
        "--la-secondary-foreground": "60 23% 92%",
        "--la-muted": "14 8% 42%",
        "--la-muted-foreground": "14 8% 70%",
        "--la-accent": "25 83% 70%",
        "--la-accent-foreground": "14 8% 18%",
        "--la-destructive": "0 100% 62%",
        "--la-destructive-foreground": "0 0% 100%",
        "--la-border": "14 8% 32%",
        "--la-input": "14 8% 32%",
        "--la-ring": "25 83% 70%",
      },
    },
  },
};

function hexToHsl(hex: string): string {
  const clean = hex.replace("#", "");
  const r = parseInt(clean.slice(0, 2), 16) / 255;
  const g = parseInt(clean.slice(2, 4), 16) / 255;
  const b = parseInt(clean.slice(4, 6), 16) / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
        break;
      case g:
        h = ((b - r) / d + 2) / 6;
        break;
      case b:
        h = ((r - g) / d + 4) / 6;
        break;
    }
  }

  return `${Math.round(h * 360)} ${Math.round(s * 100)}% ${Math.round(l * 100)}%`;
}

function isValidHex(hex: string): boolean {
  return /^#[0-9a-fA-F]{6}$/.test(hex);
}

function generateGlobalsCss(opts: {
  primaryHsl: string;
  primaryDarkHsl: string;
  radius: string;
  fontSans: string;
  fontMono: string;
}): string {
  return `@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --la-background: 0 0% 100%;
    --la-foreground: 240 10% 3.9%;

    --la-card: 0 0% 100%;
    --la-card-foreground: 240 10% 3.9%;

    --la-popover: 0 0% 100%;
    --la-popover-foreground: 240 10% 3.9%;

    --la-primary: ${opts.primaryHsl};
    --la-primary-foreground: 0 0% 98%;

    --la-secondary: 240 4.8% 95.9%;
    --la-secondary-foreground: 240 5.9% 10%;

    --la-muted: 240 4.8% 95.9%;
    --la-muted-foreground: 240 3.8% 46.1%;

    --la-accent: 240 4.8% 95.9%;
    --la-accent-foreground: 240 5.9% 10%;

    --la-destructive: 0 84.2% 60.2%;
    --la-destructive-foreground: 0 0% 98%;

    --la-border: 240 5.9% 90%;
    --la-input: 240 5.9% 90%;
    --la-ring: ${opts.primaryHsl};

    --la-radius: ${opts.radius};

    --la-font-sans: "${opts.fontSans}";
    --la-font-mono: "${opts.fontMono}";

    --la-chart-1: ${opts.primaryHsl};
    --la-chart-2: 200 80% 50%;
    --la-chart-3: 150 60% 45%;
    --la-chart-4: 30 90% 55%;
    --la-chart-5: 350 80% 55%;
  }

  .dark {
    --la-background: 240 10% 3.9%;
    --la-foreground: 0 0% 98%;

    --la-card: 240 10% 3.9%;
    --la-card-foreground: 0 0% 98%;

    --la-popover: 240 10% 3.9%;
    --la-popover-foreground: 0 0% 98%;

    --la-primary: ${opts.primaryDarkHsl};
    --la-primary-foreground: 0 0% 98%;

    --la-secondary: 240 3.7% 15.9%;
    --la-secondary-foreground: 0 0% 98%;

    --la-muted: 240 3.7% 15.9%;
    --la-muted-foreground: 240 5% 64.9%;

    --la-accent: 240 3.7% 15.9%;
    --la-accent-foreground: 0 0% 98%;

    --la-destructive: 0 62.8% 30.6%;
    --la-destructive-foreground: 0 0% 98%;

    --la-border: 240 3.7% 15.9%;
    --la-input: 240 3.7% 15.9%;
    --la-ring: ${opts.primaryDarkHsl};

    --la-chart-1: ${opts.primaryDarkHsl};
    --la-chart-2: 200 75% 60%;
    --la-chart-3: 150 55% 55%;
    --la-chart-4: 30 85% 65%;
    --la-chart-5: 350 75% 65%;
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

function generateTailwindConfig(opts: {
  fontSans: string;
  fontMono: string;
}): string {
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

function generateStorybookMain(projectName: string): string {
  return `import type { StorybookConfig } from "@storybook/react-vite";

const config: StorybookConfig = {
  stories: ["../src/**/*.stories.@(ts|tsx)"],
  addons: ["@storybook/addon-docs"],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  docs: {
    autodocs: "tag",
  },
  viteFinal(config) {
    return {
      ...config,
      resolve: {
        ...config.resolve,
        alias: {
          ...config.resolve?.alias,
          "@": new URL("../src", import.meta.url).pathname,
        },
      },
    };
  },
};

export default config;
`;
}

function generateStorybookPreview(): string {
  return `import React, { useEffect } from "react";
import type { Decorator, Preview } from "@storybook/react";
import "../src/styles/globals.css";

const withDarkMode: Decorator = (Story, context) => {
  const theme = context.globals.theme as string;

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  return React.createElement(Story);
};

const preview: Preview = {
  globalTypes: {
    theme: {
      description: "Global theme for components",
      toolbar: {
        title: "Theme",
        icon: "circlehollow",
        items: [
          { value: "light", title: "Light", icon: "sun" },
          { value: "dark", title: "Dark", icon: "moon" },
        ],
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: {
    theme: "light",
  },
  parameters: {
    backgrounds: { disable: true },
    layout: "centered",
  },
  decorators: [withDarkMode],
};

export default preview;
`;
}

function generatePostcssConfig(): string {
  return `export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
`;
}

function writeFile(filePath: string, content: string): void {
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  fs.writeFileSync(filePath, content, "utf-8");
}

function copyTemplate(
  templateDir: string,
  targetDir: string,
  replacements: Record<string, string>
): void {
  if (!fs.existsSync(templateDir)) {
    console.error(`Error: Template directory not found: ${templateDir}`);
    process.exit(1);
  }

  const copyDir = (src: string, dest: string) => {
    if (!fs.existsSync(dest)) {
      fs.mkdirSync(dest, { recursive: true });
    }

    const files = fs.readdirSync(src);
    files.forEach((file) => {
      const srcPath = path.join(src, file);
      const destPath = path.join(dest, file);
      const stat = fs.statSync(srcPath);

      if (stat.isDirectory()) {
        copyDir(srcPath, destPath);
      } else {
        let content = fs.readFileSync(srcPath, "utf-8");

        for (const [key, value] of Object.entries(replacements)) {
          content = content.replace(new RegExp(key, "g"), value);
        }

        writeFile(destPath, content);
      }
    });
  };

  copyDir(templateDir, targetDir);
}

function generateCommunityCss(
  theme: (typeof COMMUNITY_THEMES)[keyof typeof COMMUNITY_THEMES]
): string {
  const renderTokens = (
    tokens: Record<string, string>,
    selector: string
  ): string => {
    const entries = Object.entries(tokens)
      .map(([key, value]) => `    ${key}: ${value};`)
      .join("\n");
    return `  ${selector} {\n${entries}\n  }`;
  };

  return `@layer base {\n${renderTokens(
    theme.tokens.light,
    ":root"
  )}\n\n${renderTokens(theme.tokens.dark, ".dark")}\n}`;
}

async function installCommunityTheme(themeId: string): Promise<void> {
  const theme = COMMUNITY_THEMES[themeId as keyof typeof COMMUNITY_THEMES];

  if (!theme) {
    console.error(
      `\n  Error: Theme "${themeId}" not found.\n`
    );
    console.log("  Available themes:");
    Object.keys(COMMUNITY_THEMES).forEach((id) => {
      console.log(`    - ${id}`);
    });
    console.log();
    process.exit(1);
  }

  const themesDir = path.join(process.cwd(), "src", "styles", "themes");

  if (!fs.existsSync(themesDir)) {
    fs.mkdirSync(themesDir, { recursive: true });
  }

  const themeFile = path.join(themesDir, `${themeId}.css`);
  const cssContent = generateCommunityCss(theme);

  fs.writeFileSync(themeFile, cssContent, "utf-8");

  console.log(`\n  ✓ Installed ${theme.name} theme\n`);
  console.log("  Import the theme in your entry file:\n");
  console.log(`    import "./src/styles/themes/${themeId}.css";\n`);
}

async function main(): Promise<void> {
  const args = process.argv.slice(2);

  if (args[0] === "add" && args[1]) {
    await installCommunityTheme(args[1]);
    return;
  }

  if (args[0] === "list") {
    console.log("\n  Available community themes:\n");
    Object.entries(COMMUNITY_THEMES).forEach(([id, theme]) => {
      console.log(`    ${id.padEnd(15)} - ${theme.name}`);
    });
    console.log();
    return;
  }

  console.log("\n  LaunchApp Design System — App Scaffolder\n");

  const answers = await prompts(
    [
      {
        type: "select",
        name: "appType",
        message: "Choose an application template",
        choices: [
          { title: "SaaS", value: "saas", description: "Complete SaaS app with auth, dashboard, and settings" },
          { title: "Marketing", value: "marketing", description: "Landing page with hero, features, and pricing" },
          { title: "Admin", value: "admin", description: "Admin dashboard with tables, charts, and data management" },
        ],
        initial: 0,
      },
      {
        type: "text",
        name: "projectName",
        message: "Project name",
        initial: "my-app",
        validate: (v: string) =>
          /^[a-z0-9-_]+$/.test(v) || "Use lowercase letters, numbers, hyphens, and underscores only",
      },
      {
        type: "text",
        name: "primaryColor",
        message: "Primary color (hex, e.g. #4C3AFF)",
        initial: "#4C3AFF",
        validate: (v: string) =>
          isValidHex(v) || "Enter a valid hex color (e.g. #4C3AFF)",
      },
      {
        type: "text",
        name: "primaryDarkColor",
        message: "Primary color for dark mode (hex)",
        initial: "#7C5FFF",
        validate: (v: string) =>
          isValidHex(v) || "Enter a valid hex color (e.g. #7C5FFF)",
      },
      {
        type: "text",
        name: "borderRadius",
        message: "Base border radius (e.g. 0.5rem, 0.375rem, 0rem)",
        initial: "0.5rem",
        validate: (v: string) =>
          /^\d+(\.\d+)?(rem|px|em)$/.test(v) || "Enter a valid CSS length (e.g. 0.5rem)",
      },
      {
        type: "select",
        name: "fontSans",
        message: "Sans-serif font family",
        choices: [
          { title: "Inter", value: "Inter" },
          { title: "Geist", value: "Geist" },
          { title: "DM Sans", value: "DM Sans" },
          { title: "Plus Jakarta Sans", value: "Plus Jakarta Sans" },
          { title: "Nunito", value: "Nunito" },
          { title: "System UI (no custom font)", value: "system-ui" },
        ],
        initial: 0,
      },
      {
        type: "select",
        name: "fontMono",
        message: "Monospace font family",
        choices: [
          { title: "JetBrains Mono", value: "JetBrains Mono" },
          { title: "Fira Code", value: "Fira Code" },
          { title: "Geist Mono", value: "Geist Mono" },
          { title: "monospace (no custom font)", value: "monospace" },
        ],
        initial: 0,
      },
    ],
    {
      onCancel: () => {
        console.log("\n  Cancelled.\n");
        process.exit(0);
      },
    }
  );

  const targetDir = path.resolve(process.cwd(), answers.projectName as string);

  if (fs.existsSync(targetDir)) {
    console.error(`\n  Error: directory "${answers.projectName}" already exists.\n`);
    process.exit(1);
  }

  const primaryHsl = hexToHsl(answers.primaryColor as string);
  const primaryDarkHsl = hexToHsl(answers.primaryDarkColor as string);
  const appType = answers.appType as string;

  const __dirname = path.dirname(fileURLToPath(import.meta.url));
  const templatePath = path.join(__dirname, "..", "templates", appType);

  const replacements = {
    "{{projectName}}": answers.projectName as string,
  };

  copyTemplate(templatePath, targetDir, replacements);

  const globalsPath = path.join(targetDir, "src", "styles", "globals.css");
  const tailwindPath = path.join(targetDir, "tailwind.config.ts");
  const postcssPath = path.join(targetDir, "postcss.config.js");

  writeFile(
    globalsPath,
    generateGlobalsCss({
      primaryHsl,
      primaryDarkHsl,
      radius: answers.borderRadius as string,
      fontSans: answers.fontSans as string,
      fontMono: answers.fontMono as string,
    })
  );

  writeFile(
    tailwindPath,
    generateTailwindConfig({
      fontSans: answers.fontSans as string,
      fontMono: answers.fontMono as string,
    })
  );

  writeFile(postcssPath, generatePostcssConfig());

  const appTypeLabels: Record<string, string> = {
    saas: "SaaS",
    marketing: "Marketing",
    admin: "Admin Dashboard",
  };

  console.log(`\n  ✓ Created project: ${answers.projectName}`);
  console.log(`  ✓ Template: ${appTypeLabels[appType]}\n`);
  console.log("  Generated files:");
  console.log(`    ${path.relative(process.cwd(), globalsPath)}`);
  console.log(`    ${path.relative(process.cwd(), tailwindPath)}`);
  console.log(`    ${path.relative(process.cwd(), postcssPath)}`);

  console.log("\n  Next steps:\n");
  console.log(`    cd ${answers.projectName}`);
  console.log("    npm install");

  if (answers.fontSans !== "system-ui") {
    console.log(`    # Add "${answers.fontSans}" to your HTML via Google Fonts or your font provider`);
  }

  console.log("    npm run dev");

  console.log("\n  To customize your theme:\n");
  console.log("  1. Edit src/styles/globals.css to modify colors and tokens");
  console.log("  2. Edit tailwind.config.ts to adjust fonts and spacing");
  console.log("\n  To install a community theme, run:");
  console.log("    npx @launchapp/ds add <theme-id>\n");
  console.log("  Available themes:");
  Object.entries(COMMUNITY_THEMES).forEach(([id, theme]) => {
    console.log(`    - ${id} (${theme.name})`);
  });
  console.log();
}

main().catch((err: unknown) => {
  console.error(err);
  process.exit(1);
});
