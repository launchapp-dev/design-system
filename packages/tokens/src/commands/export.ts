import path from "node:path";
import type { ExportOptions, ThemeConfig } from "../utils/types.js";
import { readFile, writeFile, fileExists, readJson, writeJson } from "../utils/fs.js";
import { themeToFigmaTokens } from "../utils/figma.js";
import { generateGlobalsCss } from "../templates/css.js";

export async function exportCommand(options: ExportOptions): Promise<void> {
  console.log("\n  @launchapp/tokens — Export Tokens\n");

  const inputPath = options.input
    ? path.resolve(process.cwd(), options.input)
    : path.resolve(process.cwd(), "tokens.json");

  if (!fileExists(inputPath)) {
    console.error(`  Error: Input file not found: ${options.input ?? "tokens.json"}\n`);
    process.exit(1);
  }

  const theme = readJson<ThemeConfig>(inputPath);
  const outputPath = path.resolve(process.cwd(), options.output);

  switch (options.format) {
    case "figma": {
      const figmaTokens = themeToFigmaTokens(theme);
      writeJson(outputPath, figmaTokens);
      console.log(`  Exported Figma Tokens to: ${path.relative(process.cwd(), outputPath)}`);
      break;
    }
    case "json": {
      writeJson(outputPath, theme);
      console.log(`  Exported JSON tokens to: ${path.relative(process.cwd(), outputPath)}`);
      break;
    }
    case "css": {
      const css = generateGlobalsCss(theme);
      writeFile(outputPath, css);
      console.log(`  Exported CSS to: ${path.relative(process.cwd(), outputPath)}`);
      break;
    }
    default:
      console.error(`  Error: Unknown format: ${options.format}\n`);
      process.exit(1);
  }

  console.log("\n  Export complete!\n");
}
