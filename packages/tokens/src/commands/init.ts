import path from "node:path";
import prompts from "prompts";
import type { InitOptions } from "../utils/types.js";
import { isValidHex } from "../utils/color.js";
import { writeFile, ensureDirectory } from "../utils/fs.js";
import { createDefaultTheme } from "../utils/theme.js";
import {
  generateGlobalsCss,
  generateTailwindConfig,
  generatePostcssConfig,
  generateTokensJson,
} from "../templates/css.js";

async function promptForOptions(): Promise<InitOptions> {
  const answers = await prompts(
    [
      {
        type: "text",
        name: "projectName",
        message: "Project name",
        initial: "my-theme",
        validate: (v: string) =>
          /^[a-z0-9-_]+$/.test(v) || "Use lowercase letters, numbers, hyphens, and underscores only",
      },
      {
        type: "text",
        name: "primaryColor",
        message: "Primary color (hex, e.g. #4C3AFF)",
        initial: "#4C3AFF",
        validate: (v: string) => isValidHex(v) || "Enter a valid hex color (e.g. #4C3AFF)",
      },
      {
        type: "text",
        name: "primaryDarkColor",
        message: "Primary color for dark mode (hex)",
        initial: "#7C5FFF",
        validate: (v: string) => isValidHex(v) || "Enter a valid hex color (e.g. #7C5FFF)",
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
      {
        type: "confirm",
        name: "includeStorybook",
        message: "Include Storybook configuration?",
        initial: false,
      },
      {
        type: "text",
        name: "outputDir",
        message: "Output directory",
        initial: ".",
      },
    ],
    {
      onCancel: () => {
        console.log("\n  Cancelled.\n");
        process.exit(0);
      },
    }
  );

  return answers as InitOptions;
}

export async function initCommand(options?: Partial<InitOptions>): Promise<void> {
  console.log("\n  @launchapp/tokens — Theme Scaffolder\n");

  const opts = options ?? (await promptForOptions());

  const targetDir = path.resolve(process.cwd(), opts.outputDir, opts.projectName);

  if (opts.outputDir === "." || opts.outputDir === "./") {
    console.log(`\n  Initializing theme in current directory...\n`);
  } else {
    console.log(`\n  Creating theme: ${opts.projectName}\n`);
  }

  ensureDirectory(targetDir);

  const theme = createDefaultTheme({
    primaryColor: opts.primaryColor,
    primaryDarkColor: opts.primaryDarkColor,
    borderRadius: opts.borderRadius,
    fontSans: opts.fontSans,
    fontMono: opts.fontMono,
  });

  const globalsPath = path.join(targetDir, "src", "styles", "globals.css");
  const tailwindPath = path.join(targetDir, "tailwind.config.ts");
  const postcssPath = path.join(targetDir, "postcss.config.js");
  const tokensPath = path.join(targetDir, "tokens.json");

  writeFile(globalsPath, generateGlobalsCss(theme));
  writeFile(tailwindPath, generateTailwindConfig({ fontSans: opts.fontSans, fontMono: opts.fontMono }));
  writeFile(postcssPath, generatePostcssConfig());
  writeFile(tokensPath, generateTokensJson(theme));

  console.log("  Files generated:");
  console.log(`    ${path.relative(process.cwd(), globalsPath)}`);
  console.log(`    ${path.relative(process.cwd(), tailwindPath)}`);
  console.log(`    ${path.relative(process.cwd(), postcssPath)}`);
  console.log(`    ${path.relative(process.cwd(), tokensPath)}`);

  console.log("\n  Next steps:\n");
  console.log(`    cd ${opts.projectName}`);
  console.log("    npm install @launchapp/design-system tailwindcss postcss autoprefixer");

  if (opts.fontSans !== "system-ui") {
    console.log(`    # Add "${opts.fontSans}" via Google Fonts or your font provider`);
  }

  console.log("\n  Import the design system styles in your entry file:");
  console.log('    import "@launchapp/design-system/styles.css"');
  console.log('    import "./src/styles/globals.css"\n');
}
