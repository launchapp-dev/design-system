#!/usr/bin/env node
import { readdir, readFile, writeFile } from "fs/promises";
import { join, dirname, basename, extname } from "path";
import { fileURLToPath } from "url";
import Anthropic from "@anthropic-ai/sdk";
import { existsSync } from "fs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const COMPONENTS_DIR = join(ROOT, "src", "components");

const WCAG_RULES = {
  MISSING_ARIA_LABEL: {
    pattern: /\b(aria-label|aria-labelledby)\b/,
    message: "WCAG 4.1.2 - Missing accessible name",
  },
  MISSING_ALT_TEXT: {
    pattern: /alt=/,
    message: "WCAG 1.1.1 - Missing alt text on image",
  },
  MISSING_LABEL: {
    pattern: /htmlFor|aria-label/,
    message: "WCAG 3.3.2 - Form input needs label association",
  },
  INTERACTIVE_DIV_NO_ROLE: {
    pattern: /role=/,
    message: "WCAG 4.1.2 - Interactive element needs semantic role",
  },
  MISSING_ARIA_LIVE: {
    pattern: /aria-live/,
    message: "WCAG 4.1.3 - Dynamic content needs aria-live",
  },
};

async function readComponent(filePath) {
  const code = await readFile(filePath, "utf-8");
  const name = basename(dirname(filePath));
  return { name, code, filePath };
}

async function getComponentFiles() {
  const files = [];
  const entries = await readdir(COMPONENTS_DIR, { withFileTypes: true });

  for (const entry of entries) {
    if (entry.isDirectory()) {
      const componentFile = join(COMPONENTS_DIR, entry.name, `${entry.name}.tsx`);
      if (existsSync(componentFile)) {
        files.push(componentFile);
      }
    }
  }

  return files;
}

async function analyzeComponent(component, client) {
  const systemPrompt = `You are an accessibility (a11y) expert specializing in WCAG 2.1 compliance for React components.
Analyze React component code and identify accessibility violations. Be thorough and specific.`;

  const analysisPrompt = `Analyze this React component for WCAG 2.1 accessibility violations:

\`\`\`tsx
${component.code}
\`\`\`

Component name: ${component.name}

Return a JSON object with this exact structure:
{
  "violations": [
    {
      "line": number,
      "type": "WCAG criterion (e.g., 1.1.1)",
      "message": "description of violation",
      "severity": "error" or "warning",
      "code": "violation code"
    }
  ],
  "wcagLevel": "A" or "AA" or "AAA",
  "improvementScore": number between 0 and 100
}`;

  try {
    const message = await client.messages.create({
      model: "claude-3-5-sonnet-20241022",
      max_tokens: 2000,
      system: systemPrompt,
      messages: [
        {
          role: "user",
          content: analysisPrompt,
        },
      ],
    });

    const responseText =
      message.content[0].type === "text" ? message.content[0].text : "";
    const jsonMatch = responseText.match(/\{[\s\S]*\}/);

    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }
  } catch (error) {
    console.error(`Error analyzing ${component.name}:`, error.message);
  }

  return { violations: [], wcagLevel: "AA", improvementScore: 50 };
}

async function generateFix(component, violations, client) {
  if (violations.length === 0) return null;

  const violationsList = violations
    .map(
      (v) =>
        `- Line ${v.line}: [${v.code}] ${v.message} (${v.type}, ${v.severity})`
    )
    .join("\n");

  const systemPrompt = `You are an expert React developer specializing in accessibility.
Fix React component code to resolve accessibility violations while maintaining functionality and style.
Return only the corrected component code in a code block, no explanations.`;

  const fixPrompt = `Fix the accessibility violations in this React component:

\`\`\`tsx
${component.code}
\`\`\`

Violations to fix:
${violationsList}

Return the corrected component code with all violations fixed. Maintain the original functionality, styling, and structure. Wrap the code in a \`\`\`tsx code block.`;

  try {
    const message = await client.messages.create({
      model: "claude-3-5-sonnet-20241022",
      max_tokens: 3000,
      system: systemPrompt,
      messages: [
        {
          role: "user",
          content: fixPrompt,
        },
      ],
    });

    const responseText =
      message.content[0].type === "text" ? message.content[0].text : "";
    const codeMatch = responseText.match(/```(?:tsx?|jsx?)?\n?([\s\S]*?)\n?```/);

    if (codeMatch) {
      return codeMatch[1];
    }
  } catch (error) {
    console.error(`Error generating fix for ${component.name}:`, error.message);
  }

  return null;
}

async function main() {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    console.error(
      "Error: ANTHROPIC_API_KEY environment variable is not set"
    );
    process.exit(1);
  }

  const client = new Anthropic({ apiKey });

  const args = process.argv.slice(2);
  const autoFix = args.includes("--fix") || args.includes("-f");
  const reportOnly = args.includes("--report") || args.includes("-r");

  console.log("🔍 Scanning components for accessibility violations...\n");

  const componentFiles = await getComponentFiles();
  const components = await Promise.all(
    componentFiles.map((f) => readComponent(f))
  );

  const results = [];
  let totalViolations = 0;
  let totalErrors = 0;
  let totalWarnings = 0;

  for (const component of components) {
    const analysis = await analyzeComponent(component, client);

    if (analysis.violations && analysis.violations.length > 0) {
      console.log(`\n⚠️  ${component.name}`);
      console.log(`   WCAG Level: ${analysis.wcagLevel}`);
      console.log(`   Violations: ${analysis.violations.length}`);

      const errors = analysis.violations.filter((v) => v.severity === "error");
      const warnings = analysis.violations.filter((v) => v.severity === "warning");

      if (errors.length > 0) {
        console.log(`   🔴 Errors: ${errors.length}`);
        errors.forEach((v) => {
          console.log(`      - [${v.code}] ${v.message}`);
        });
        totalErrors += errors.length;
      }

      if (warnings.length > 0) {
        console.log(`   🟡 Warnings: ${warnings.length}`);
        warnings.forEach((v) => {
          console.log(`      - [${v.code}] ${v.message}`);
        });
        totalWarnings += warnings.length;
      }

      totalViolations += analysis.violations.length;

      if (autoFix) {
        console.log(`   🔧 Generating fix...`);
        const fixedCode = await generateFix(component, analysis.violations, client);

        if (fixedCode) {
          await writeFile(component.filePath, fixedCode);
          console.log(`   ✅ Fixed and saved to ${component.filePath}`);
        } else {
          console.log(`   ⚠️  Could not auto-fix, manual review needed`);
        }
      }

      results.push({
        component: component.name,
        filePath: component.filePath,
        violations: analysis.violations,
        wcagLevel: analysis.wcagLevel,
        improvementScore: analysis.improvementScore,
      });
    } else {
      console.log(`✅ ${component.name} - No violations found`);
    }
  }

  console.log("\n" + "=".repeat(60));
  console.log("📊 Summary");
  console.log("=".repeat(60));
  console.log(`Components analyzed: ${components.length}`);
  console.log(`Total violations: ${totalViolations}`);
  console.log(`   🔴 Errors: ${totalErrors}`);
  console.log(`   🟡 Warnings: ${totalWarnings}`);

  if (autoFix) {
    console.log(
      "\n✨ Auto-fix complete! Please review the changes and test thoroughly."
    );
  }

  if (totalViolations > 0 && !autoFix && !reportOnly) {
    console.log(
      '\n💡 Run with --fix to automatically fix violations, or --report to generate a detailed report.'
    );
  }
}

main().catch((error) => {
  console.error("Error:", error.message);
  process.exit(1);
});
