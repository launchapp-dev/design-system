import type Anthropic from "@anthropic-ai/sdk";

export interface A11yViolation {
  line: number;
  component: string;
  type: string;
  message: string;
  severity: "error" | "warning";
  code: string;
  source?: "claude" | "axe-core";
}

export interface A11yFix {
  violation: A11yViolation;
  suggestedFix: string;
  explanation: string;
}

export interface A11yAnalysisResult {
  component: string;
  violations: A11yViolation[];
  fixes: A11yFix[];
  wcagLevel: "A" | "AA" | "AAA";
  improvementScore: number;
}

export interface A11yFixerOptions {
  client: typeof Anthropic.default;
  apiKey?: string;
  model?: string;
}

const COMMON_A11Y_PATTERNS = {
  missingAriaLabel: {
    pattern: /\b(Button|IconButton|Tooltip|Popover|Select|Combobox|Menu)\b/,
    violation: "WCAG 4.1.2 - Missing accessible name",
    severity: "error" as const,
  },
  missingAlt: {
    pattern: /<img\s+(?!.*alt=)/i,
    violation: "WCAG 1.1.1 - Missing alt text",
    severity: "error" as const,
  },
  missingLabel: {
    pattern: /<(Input|Textarea|Select)\b(?!.*aria-label)(?!.*aria-labelledby)/i,
    violation: "WCAG 3.3.2 - Missing form label association",
    severity: "error" as const,
  },
  missingRole: {
    pattern: /<div\s+onClick|onKeyDown/i,
    violation: "WCAG 4.1.2 - Interactive element needs semantic role",
    severity: "error" as const,
  },
  missingAriaLive: {
    pattern: /toast|notification|alert|status/i,
    violation: "WCAG 4.1.3 - Dynamic content needs aria-live",
    severity: "warning" as const,
  },
};

export async function analyzeComponentA11y(
  component: string,
  code: string,
  options: A11yFixerOptions
): Promise<A11yAnalysisResult> {
  const { apiKey, model = "claude-3-5-sonnet-20241022" } = options;

  const client = new options.client({ apiKey });

  const systemPrompt = `You are an accessibility (a11y) expert specializing in WCAG 2.1 compliance for React components.
Analyze React component code and identify accessibility violations. For each violation:
1. Identify the WCAG criterion (e.g., 1.1.1, 4.1.2)
2. Explain the issue in detail
3. Provide a concrete code fix

Focus on:
- Missing aria-label/aria-labelledby on interactive elements
- Missing alt text on images
- Missing form label associations
- Missing semantic roles on interactive divs
- Missing aria-live regions for dynamic content
- Missing aria-describedby for instructions/descriptions
- Keyboard navigation issues
- Color contrast issues
- Focus management problems

Return a JSON object with violations array and fixes array.`;

  const analysisPrompt = `Analyze this React component for WCAG 2.1 accessibility violations:

\`\`\`tsx
${code}
\`\`\`

Component name: ${component}

Return a JSON object with this exact structure:
{
  "violations": [
    {
      "line": number,
      "type": "WCAG criterion (e.g., 1.1.1)",
      "message": "description of violation",
      "severity": "error" or "warning",
      "code": "violation code (e.g., MISSING_ALT_TEXT)"
    }
  ],
  "fixes": [
    {
      "violationCode": "violation code",
      "suggestedFix": "exact code change or replacement",
      "explanation": "why this fixes the issue"
    }
  ],
  "wcagLevel": "A" or "AA" or "AAA",
  "improvementScore": number between 0 and 100
}`;

  const message = await client.messages.create({
    model,
    max_tokens: 2000,
    system: systemPrompt,
    messages: [
      {
        role: "user",
        content: analysisPrompt,
      },
    ],
  });

  let analysisData: {
    violations: Array<Omit<A11yViolation, "component">>;
    fixes: Array<{ violationCode: string; suggestedFix: string; explanation: string }>;
    wcagLevel: "A" | "AA" | "AAA";
    improvementScore: number;
  };

  const responseText =
    message.content[0].type === "text" ? message.content[0].text : "";

  const jsonMatch = responseText.match(/\{[\s\S]*\}/);
  if (!jsonMatch) {
    throw new Error("Failed to parse accessibility analysis response");
  }

  analysisData = JSON.parse(jsonMatch[0]);

  const violations: A11yViolation[] = analysisData.violations.map((v) => ({
    ...v,
    component,
  }));

  const fixes: A11yFix[] = analysisData.fixes.map((f) => {
    const violation = violations.find((v) => v.code === f.violationCode);
    return {
      violation: violation || violations[0],
      suggestedFix: f.suggestedFix,
      explanation: f.explanation,
    };
  });

  return {
    component,
    violations,
    fixes,
    wcagLevel: analysisData.wcagLevel,
    improvementScore: analysisData.improvementScore,
  };
}

export async function generateComponentFix(
  component: string,
  code: string,
  violations: A11yViolation[],
  options: A11yFixerOptions
): Promise<string> {
  const { apiKey, model = "claude-3-5-sonnet-20241022" } = options;

  const client = new options.client({ apiKey });

  const violationsList = violations
    .map(
      (v) =>
        `- Line ${v.line}: [${v.code}] ${v.message} (${v.type}, ${v.severity})`
    )
    .join("\n");

  const systemPrompt = `You are an expert React developer specializing in accessibility.
Fix React component code to resolve accessibility violations while maintaining functionality and style.
Return only the corrected component code, no explanations.`;

  const fixPrompt = `Fix the accessibility violations in this React component:

\`\`\`tsx
${code}
\`\`\`

Violations to fix:
${violationsList}

Return the corrected component code with all violations fixed. Maintain the original functionality, styling, and structure. Only fix accessibility issues.`;

  const message = await client.messages.create({
    model,
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

  return responseText;
}

export async function batchAnalyzeComponents(
  components: Record<string, string>,
  options: A11yFixerOptions
): Promise<A11yAnalysisResult[]> {
  const results: A11yAnalysisResult[] = [];

  for (const [name, code] of Object.entries(components)) {
    const result = await analyzeComponentA11y(name, code, options);
    results.push(result);
  }

  return results;
}

export function generateA11yReport(results: A11yAnalysisResult[]): string {
  const totalViolations = results.reduce((sum, r) => sum + r.violations.length, 0);
  const errors = results.reduce(
    (sum, r) => sum + r.violations.filter((v) => v.severity === "error").length,
    0
  );
  const warnings = results.reduce(
    (sum, r) => sum + r.violations.filter((v) => v.severity === "warning").length,
    0
  );

  const report = `
# Accessibility Analysis Report

## Summary
- **Total Violations:** ${totalViolations}
- **Errors:** ${errors}
- **Warnings:** ${warnings}
- **Components Analyzed:** ${results.length}

## Component Details

${results
  .map(
    (r) => `
### ${r.component}
- WCAG Level: ${r.wcagLevel}
- Improvement Score: ${r.improvementScore}%
- Violations: ${r.violations.length}

${
  r.violations.length > 0
    ? `#### Violations:
${r.violations.map((v) => `- **[${v.code}]** ${v.message} (${v.type})${v.source ? ` (${v.source})` : ""}`).join("\n")}`
    : "No violations found ✓"
}

${r.fixes.length > 0 ? `#### Suggested Fixes:
${r.fixes.map((f) => `- ${f.explanation}\n  \`${f.suggestedFix}\``).join("\n")}` : ""}
`
  )
  .join("\n")}
`;

  return report;
}

export async function verifyWithAxeCore(htmlContent: string): Promise<A11yViolation[]> {
  try {
    // Dynamically import axe-core and jsdom for verification
    const { JSDOM } = await import("jsdom");
    const { default: axe } = await import("axe-core");

    const dom = new JSDOM(htmlContent);
    const { document } = dom.window;

    const results = await axe.run(document);

    const violations: A11yViolation[] = [];

    // Process axe violations
    results.violations.forEach((violation: any) => {
      violation.nodes.forEach((node: any, index: number) => {
        violations.push({
          line: index + 1,
          component: "Component",
          type: violation.id,
          message: violation.description,
          severity: "error",
          code: violation.id,
          source: "axe-core",
        });
      });
    });

    return violations;
  } catch (error) {
    console.warn("axe-core verification skipped:", (error as Error).message);
    return [];
  }
}
