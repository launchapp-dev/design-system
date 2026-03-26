# AI-Powered Accessibility Auto-Fixer

This document describes the accessibility (a11y) analysis and auto-fixing system for the design system components.

## Overview

The accessibility auto-fixer uses Claude AI to automatically detect and fix WCAG 2.1 accessibility violations in React components. It analyzes component code for common accessibility issues and provides fixes.

## Installation

The tool requires the Anthropic SDK. It's already added to `package.json` as a dev dependency:

```bash
npm install @anthropic-ai/sdk --save-dev
```

## Usage

### Basic Analysis (Report Only)

Generate an accessibility report for all components:

```bash
ANTHROPIC_API_KEY=sk-... npm run fix-a11y
```

This will scan all components in `src/components/` and report violations without making changes.

### Interactive Approval Mode

Review and approve fixes before applying them:

```bash
ANTHROPIC_API_KEY=sk-... npm run fix-a11y:approve
```

This mode analyzes components, generates fixes, and asks for your approval before applying each fix. You can review the suggested changes and decide whether to apply or skip them.

### Auto-Fix Mode

Automatically fix accessibility violations in all components:

```bash
ANTHROPIC_API_KEY=sk-... npm run fix-a11y:auto
```

This will analyze each component, generate fixes, and write the corrected code back to files without asking for approval.

## Features

### Analyzed Issues

The tool detects and fixes the following WCAG 2.1 violations:

1. **WCAG 1.1.1 (Non-text Content)** - Missing alt text on images
2. **WCAG 3.3.2 (Labels or Instructions)** - Missing form label associations
3. **WCAG 4.1.2 (Name, Role, Value)** - Missing aria-label, aria-labelledby, or semantic roles
4. **WCAG 4.1.3 (Status Messages)** - Missing aria-live regions for dynamic content
5. **WCAG 4.2.1 (Character Key Shortcuts)** - Keyboard accessibility issues
6. **WCAG 2.4.3 (Focus Order)** - Focus management problems
7. **WCAG 1.4.3 (Contrast Minimum)** - Color contrast issues

### Analysis Modes

The tool supports multiple analysis modes:

- **Violation Detection**: Identifies specific accessibility issues with line numbers
- **WCAG Level Assessment**: Determines compliance level (A, AA, or AAA)
- **Fix Generation**: Produces corrected code maintaining functionality
- **Report Generation**: Creates detailed accessibility reports

## API Usage

The tool exports TypeScript functions for programmatic use:

### `analyzeComponentA11y(component, code, options)`

Analyze a single component for accessibility violations.

```typescript
import {
  analyzeComponentA11y,
  type A11yAnalysisResult,
} from "@launchapp/design-system";
import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

const result = await analyzeComponentA11y("Button", buttonCode, {
  client: Anthropic,
  apiKey: process.env.ANTHROPIC_API_KEY,
});

console.log(result.violations); // Array of accessibility violations
console.log(result.wcagLevel); // WCAG compliance level
console.log(result.improvementScore); // 0-100 score
```

### `generateComponentFix(component, code, violations, options)`

Generate fixes for specific violations.

```typescript
import { generateComponentFix } from "@launchapp/design-system";

const fixedCode = await generateComponentFix(
  "Button",
  buttonCode,
  violations,
  { client: Anthropic, apiKey: process.env.ANTHROPIC_API_KEY }
);

// Write fixed code to file
fs.writeFileSync("Button.tsx", fixedCode);
```

### `batchAnalyzeComponents(components, options)`

Analyze multiple components in batch.

```typescript
import { batchAnalyzeComponents } from "@launchapp/design-system";

const components = {
  Button: buttonCode,
  Input: inputCode,
  Dialog: dialogCode,
};

const results = await batchAnalyzeComponents(components, {
  client: Anthropic,
  apiKey: process.env.ANTHROPIC_API_KEY,
});

// Process results
results.forEach((result) => {
  console.log(`${result.component}: ${result.violations.length} violations`);
});
```

### `generateA11yReport(results)`

Generate a formatted accessibility report.

```typescript
import { generateA11yReport } from "@launchapp/design-system";

const report = generateA11yReport(results);
console.log(report); // Markdown formatted report
```

## Output Example

### Violation Report

```
🔍 Scanning components for accessibility violations...

⚠️  Button
   WCAG Level: AA
   Violations: 2
   🔴 Errors: 1
      - [MISSING_ARIA_LABEL] Missing accessible name
   🟡 Warnings: 1
      - [MISSING_KEYBOARD_HANDLER] onClick without onKeyDown

✅ Input - No violations found

==============================================================
📊 Summary
==============================================================
Components analyzed: 50
Total violations: 12
   🔴 Errors: 8
   🟡 Warnings: 4
```

## Common Violations & Fixes

### Missing aria-label

**Issue**: Interactive components without accessible names

```tsx
// ❌ Before
<button onClick={handleClick}>🎨</button>

// ✅ After
<button onClick={handleClick} aria-label="Change theme">
  🎨
</button>
```

### Missing Form Label

**Issue**: Input fields without associated labels

```tsx
// ❌ Before
<Input id="email" type="email" />

// ✅ After
<Label htmlFor="email">Email</Label>
<Input id="email" type="email" aria-labelledby="email-label" />
```

### Missing aria-live

**Issue**: Dynamic content not announced to screen readers

```tsx
// ❌ Before
<div className="notification">{message}</div>

// ✅ After
<div className="notification" aria-live="polite" aria-atomic="true">
  {message}
</div>
```

## Configuration

### Environment Variables

- `ANTHROPIC_API_KEY`: Required. Your Anthropic API key
- `MODEL`: Optional. Claude model to use (default: `claude-3-5-sonnet-20241022`)

## Scripts

The following npm scripts are available:

- `npm run fix-a11y` - Run accessibility analysis on all components (report only)
- `npm run fix-a11y:approve` - Interactively review and approve fixes with human approval
- `npm run fix-a11y:auto` - Auto-fix accessibility violations in components without approval

## Technical Details

### Implementation

- **Core Utility**: `src/lib/a11y-fixer.ts` - Main TypeScript utility for analysis and fixing
- **CLI Script**: `scripts/fix-a11y.mjs` - Command-line interface for bulk operations

### Architecture

The system works in three phases:

1. **Scanning**: Reads all component files from `src/components/`
2. **Analysis**: Uses Claude to detect WCAG violations in each component
3. **Fixing**: Generates corrected code for each violation

### WCAG Compliance

The tool focuses on WCAG 2.1 Level AA compliance, which includes:

- Level A: Basic accessibility (minimum)
- Level AA: Enhanced accessibility (recommended)
- Level AAA: Expert-level accessibility (optional)

## Limitations

- The tool works best with React/TSX component code
- Complex components with many dependencies may need manual review
- Generated fixes are suggestions and should be tested before committing
- Color contrast issues require visual analysis (AI may miss context)

## Best Practices

1. **Always Review**: Review AI-generated fixes before committing
2. **Test Thoroughly**: Test all accessibility features after fixing
3. **Use Keyboard Navigation**: Test with keyboard only (Tab, Enter, Space, Arrows)
4. **Test with Screen Readers**: Use NVDA, JAWS, or VoiceOver
5. **Check Semantics**: Ensure fixes use semantic HTML when possible

## Integration with CI/CD

To integrate into your CI/CD pipeline:

```yaml
# .github/workflows/a11y.yml
name: Accessibility Check

on: [pull_request]

jobs:
  a11y:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: npm install
      - run: ANTHROPIC_API_KEY=${{ secrets.ANTHROPIC_API_KEY }} npm run fix-a11y
```

## Troubleshooting

### API Key Error

```
Error: ANTHROPIC_API_KEY environment variable is not set
```

Make sure to set your API key before running:

```bash
export ANTHROPIC_API_KEY=sk-...
npm run fix-a11y
```

### Rate Limiting

If you exceed API rate limits, the script will pause and retry. For large component libraries, consider processing components in batches.

### Parse Errors

If the tool fails to parse a component's response, check that the component code is valid TypeScript/JSX and review the error message for context.

## Future Enhancements

Potential improvements:

- Support for Vue, Svelte, and other frameworks
- Integration with axe-core for additional analysis
- Automated testing to verify fixes don't break functionality
- Visual regression detection for styling changes
- Historical tracking of accessibility improvements

## Command-Line Flags

The fix-a11y script supports the following flags:

- `--fix` or `-f` - Automatically apply all fixes without asking
- `--interactive` or `-i` - Review and approve each fix before applying (human approval)
- `--report` or `-r` - Generate a detailed markdown report of violations

Examples:

```bash
# Analysis only (default)
npm run fix-a11y

# Interactive approval mode (asks before applying fixes)
npm run fix-a11y:approve
# or
npm run fix-a11y -- --interactive

# Auto-fix without approval
npm run fix-a11y:auto
# or
npm run fix-a11y -- --fix

# Generate detailed report
npm run fix-a11y -- --report
```

## Human Approval Workflow

The interactive approval mode enables a workflow where an AI agent detects and suggests fixes, but each fix requires human approval before being applied:

1. **Detection Phase**: The AI analyzes all components and identifies accessibility violations
2. **Fix Generation**: For each violation, the AI generates a corrected version of the code
3. **Human Approval**: The user reviews the suggested fix and can approve or skip it
4. **Application**: Only approved fixes are written to the component files

This ensures that complex or edge-case fixes are reviewed by a human before they're applied to the codebase.

## Contributing

To improve the accessibility fixer:

1. Add new WCAG rules to `WCAG_RULES` in `scripts/fix-a11y.mjs`
2. Update prompts in `src/lib/a11y-fixer.ts` for better analysis
3. Test with real components to ensure quality
4. Document new rules in this README

## References

- [WCAG 2.1 Specification](https://www.w3.org/WAI/WCAG21/quickref/)
- [Radix UI Accessibility](https://www.radix-ui.com/docs/primitives/overview/accessibility)
- [ARIA Authoring Practices Guide](https://www.w3.org/WAI/ARIA/apg/)
- [Web Accessibility by Google](https://www.udacity.com/course/web-accessibility--ud891)
