import { Command } from "commander";
import { initCommand } from "./commands/init.js";
import { importCommand } from "./commands/import.js";
import { exportCommand } from "./commands/export.js";

const packageJson = {
  name: "@launchapp/tokens",
  version: "0.1.0",
  description: "CLI tool for design token management and theme scaffolding",
};

const program = new Command();

program
  .name("launchapp-tokens")
  .description(packageJson.description)
  .version(packageJson.version);

program
  .command("init")
  .description("Initialize a new themed design system instance")
  .option("-n, --name <name>", "Project name")
  .option("-p, --primary <hex>", "Primary color (hex)")
  .option("-d, --primary-dark <hex>", "Primary color for dark mode (hex)")
  .option("-r, --radius <value>", "Border radius (e.g. 0.5rem)")
  .option("-s, --font-sans <font>", "Sans-serif font family")
  .option("-m, --font-mono <font>", "Monospace font family")
  .option("-o, --output <dir>", "Output directory", ".")
  .option("--storybook", "Include Storybook configuration", false)
  .action(async (options) => {
    const initOptions =
      options.name && options.primary
        ? {
            projectName: options.name,
            primaryColor: options.primary,
            primaryDarkColor: options.primaryDark ?? "#7C5FFF",
            borderRadius: options.radius ?? "0.5rem",
            fontSans: options.fontSans ?? "Inter",
            fontMono: options.fontMono ?? "JetBrains Mono",
            includeStorybook: options.storybook ?? false,
            outputDir: options.output,
          }
        : undefined;

    await initCommand(initOptions);
  });

program
  .command("import")
  .description("Import tokens from Figma Tokens or JSON format")
  .argument("<input>", "Input file path (Figma Tokens JSON or theme JSON)")
  .option("-o, --output <dir>", "Output directory for generated files")
  .option("-f, --format <format>", "Input format: figma, json", "figma")
  .action(async (input, options) => {
    await importCommand({
      input,
      output: options.output,
      format: options.format,
    });
  });

program
  .command("export")
  .description("Export tokens to various formats")
  .argument("<output>", "Output file path")
  .option("-i, --input <file>", "Input tokens file (default: tokens.json)")
  .option("-f, --format <format>", "Output format: figma, json, css", "figma")
  .action(async (output, options) => {
    await exportCommand({
      input: options.input,
      output,
      format: options.format,
    });
  });

program.parse();
