import path from "node:path";
import type { ImportOptions, FigmaTokensSchema, ThemeConfig } from "../utils/types.js";
import { readFile, writeFile, fileExists, readJson } from "../utils/fs.js";
import { parseFigmaTokens } from "../utils/figma.js";
import { generateGlobalsCss, generateTailwindConfig, generatePostcssConfig } from "../templates/css.js";

export async function importCommand(options: ImportOptions): Promise<void> {
  console.log("\n  @launchapp/tokens — Import Tokens\n");

  const inputPath = path.resolve(process.cwd(), options.input);

  if (!fileExists(inputPath)) {
    console.error(`  Error: Input file not found: ${options.input}\n`);
    process.exit(1);
  }

  let theme: ThemeConfig;

  if (options.format === "figma") {
    const figmaTokens = readJson<FigmaTokensSchema>(inputPath);
    theme = parseFigmaTokens(figmaTokens);
    console.log("  Parsed Figma Tokens format");
  } else {
    theme = readJson<ThemeConfig>(inputPath);
    console.log("  Parsed JSON theme format");
  }

  const outputDir = options.output
    ? path.resolve(process.cwd(), options.output)
    : path.dirname(inputPath);

  const globalsPath = path.join(outputDir, "globals.css");
  const tailwindPath = path.join(outputDir, "tailwind.config.ts");
  const postcssPath = path.join(outputDir, "postcss.config.js");

  writeFile(globalsPath, generateGlobalsCss(theme));
  writeFile(
    tailwindPath,
    generateTailwindConfig({
      fontSans: theme.light.fontSans,
      fontMono: theme.light.fontMono,
    })
  );
  writeFile(postcssPath, generatePostcssConfig());

  console.log("\n  Generated files:");
  console.log(`    ${path.relative(process.cwd(), globalsPath)}`);
  console.log(`    ${path.relative(process.cwd(), tailwindPath)}`);
  console.log(`    ${path.relative(process.cwd(), postcssPath)}`);
  console.log("\n  Import complete!\n");
}
