import Link from "next/link";
import { CodeBlock } from "@/components/CodeBlock";

export const metadata = {
  title: "Submit a Community Theme — LaunchApp Design System",
  description:
    "Guidelines and process for submitting your own color theme to the LaunchApp Design System community gallery.",
};

export default function ContributeCommunityThemePage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
        <Link href="/" className="hover:text-foreground transition-colors">
          Home
        </Link>
        <span>/</span>
        <Link
          href="/community-themes"
          className="hover:text-foreground transition-colors"
        >
          Community Themes
        </Link>
        <span>/</span>
        <span className="text-foreground">Submit a Theme</span>
      </nav>

      <div className="mb-12">
        <h1 className="text-4xl font-bold tracking-tight mb-4">
          Submit Your Community Theme
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl leading-relaxed">
          Share your custom color palette with the LaunchApp community.
          Submitted themes that meet our guidelines will be featured in the
          official community theme gallery for everyone to use.
        </p>
      </div>

      <div className="space-y-12">
        <section>
          <h2 className="text-2xl font-bold tracking-tight mb-6">
            What is a Community Theme?
          </h2>
          <p className="text-muted-foreground mb-4">
            A community theme is a curated set of color tokens that define the
            appearance of the LaunchApp Design System components. It includes
            separate palettes for light and dark modes, ensuring your theme
            works beautifully in all environments.
          </p>
          <p className="text-muted-foreground">
            Themes are shared as JSON files and can be easily installed via the
            LaunchApp CLI or imported directly into projects.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold tracking-tight mb-6">
            Requirements
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="rounded-lg border p-6 bg-card">
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <span className="text-primary">✓</span>
                Complete Token Coverage
              </h3>
              <p className="text-sm text-muted-foreground">
                All 19 required design tokens must be defined for both light and
                dark modes (background, foreground, primary, secondary, accent,
                destructive, muted, border, input, ring, and their foreground
                pairs).
              </p>
            </div>

            <div className="rounded-lg border p-6 bg-card">
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <span className="text-primary">✓</span>
                Proper HSL Format
              </h3>
              <p className="text-sm text-muted-foreground">
                All color values must be in HSL format: H S% L% (e.g., "262 83%
                58%"). Each component must be a valid number within range (H:
                0-360, S & L: 0-100).
              </p>
            </div>

            <div className="rounded-lg border p-6 bg-card">
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <span className="text-primary">✓</span>
                Contrast Compliance
              </h3>
              <p className="text-sm text-muted-foreground">
                Foreground colors must have sufficient contrast against
                background colors to meet WCAG AA accessibility standards
                (minimum 4.5:1 for text).
              </p>
            </div>

            <div className="rounded-lg border p-6 bg-card">
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <span className="text-primary">✓</span>
                Clear Author Information
              </h3>
              <p className="text-sm text-muted-foreground">
                Include your name, and optionally your website/profile URL and
                email. This helps the community credit and contact you.
              </p>
            </div>

            <div className="rounded-lg border p-6 bg-card">
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <span className="text-primary">✓</span>
                Semantic Versioning
              </h3>
              <p className="text-sm text-muted-foreground">
                Use semantic versioning (X.Y.Z) for your theme. Start with 1.0.0
                for your first submission.
              </p>
            </div>

            <div className="rounded-lg border p-6 bg-card">
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <span className="text-primary">✓</span>
                License Specification
              </h3>
              <p className="text-sm text-muted-foreground">
                Specify a license (e.g., MIT, Apache-2.0, BSD-3-Clause). We
                recommend MIT for open-source themes.
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold tracking-tight mb-6">
            Submission Process
          </h2>
          <div className="space-y-6">
            <div className="flex gap-6">
              <div className="flex flex-col items-center">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold">
                  1
                </div>
                <div className="mt-4 w-0.5 h-12 bg-border" />
              </div>
              <div className="pb-8">
                <h3 className="text-lg font-semibold mb-2">
                  Create Your Theme JSON
                </h3>
                <p className="text-muted-foreground mb-4">
                  Create a JSON file for your theme following the required
                  schema. Define your color tokens for both light and dark
                  modes.
                </p>
              </div>
            </div>

            <div className="flex gap-6">
              <div className="flex flex-col items-center">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold">
                  2
                </div>
                <div className="mt-4 w-0.5 h-12 bg-border" />
              </div>
              <div className="pb-8">
                <h3 className="text-lg font-semibold mb-2">
                  Preview Your Theme
                </h3>
                <p className="text-muted-foreground mb-4">
                  Test your theme in the LaunchApp components to ensure colors
                  look good and meet accessibility standards.
                </p>
              </div>
            </div>

            <div className="flex gap-6">
              <div className="flex flex-col items-center">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold">
                  3
                </div>
                <div className="mt-4 w-0.5 h-12 bg-border" />
              </div>
              <div className="pb-8">
                <h3 className="text-lg font-semibold mb-2">
                  Validate Your JSON
                </h3>
                <p className="text-muted-foreground mb-4">
                  Use the validation tool to ensure your theme complies with the
                  schema. Fix any validation errors before submission.
                </p>
              </div>
            </div>

            <div className="flex gap-6">
              <div className="flex flex-col items-center">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold">
                  4
                </div>
                <div className="mt-4 w-0.5 h-12 bg-border" />
              </div>
              <div className="pb-8">
                <h3 className="text-lg font-semibold mb-2">
                  Submit for Review
                </h3>
                <p className="text-muted-foreground mb-4">
                  Open an issue on the{" "}
                  <a
                    href="https://github.com/launchapp-dev/design-system"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    design system repository
                  </a>{" "}
                  with the label "theme-submission" and include your theme JSON
                  and preview details.
                </p>
              </div>
            </div>

            <div className="flex gap-6">
              <div className="flex flex-col items-center">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold">
                  5
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Get Featured</h3>
                <p className="text-muted-foreground">
                  Once approved, your theme will be added to the community
                  gallery and available for everyone to use and discover.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8 rounded-lg border bg-primary/5 p-6 border-l-4 border-primary">
            <h3 className="font-semibold mb-2">Review Timeline</h3>
            <p className="text-sm text-muted-foreground">
              Our team will review your submission within 1-2 weeks. You may
              receive feedback for color adjustments or accessibility
              improvements. Featured themes will be credited with your name and
              links to your profile.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold tracking-tight mb-6">
            Theme JSON Schema
          </h2>
          <p className="text-muted-foreground mb-4">
            Here's the required structure for your community theme JSON file.
            You can also{" "}
            <a
              href="/theme-template.json"
              download="theme-template.json"
              className="text-primary hover:underline font-medium"
            >
              download a template file
            </a>{" "}
            to get started quickly.
          </p>
          <CodeBlock
            lang="json"
            code={`{
  "id": "my-awesome-theme",
  "name": "My Awesome Theme",
  "description": "A vibrant theme with warm earthy tones",
  "author": {
    "name": "Your Name",
    "url": "https://yourwebsite.com",
    "email": "your.email@example.com"
  },
  "version": "1.0.0",
  "license": "MIT",
  "previewColor": "25 83% 60%",
  "keywords": ["warm", "earthy", "vibrant", "cozy"],
  "repository": "https://github.com/username/theme-repo",
  "tokens": {
    "light": {
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
      "--la-ring": "25 83% 60%"
    },
    "dark": {
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
      "--la-ring": "25 83% 70%"
    }
  }
}`}
          />
        </section>

        <section>
          <h2 className="text-2xl font-bold tracking-tight mb-6">
            Required Design Tokens
          </h2>
          <p className="text-muted-foreground mb-4">
            Your theme must include all of these 19 tokens for both light and
            dark modes:
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-semibold">Token</th>
                  <th className="text-left py-3 px-4 font-semibold">Purpose</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b hover:bg-muted/50">
                  <td className="py-3 px-4 font-mono text-xs">
                    --la-background
                  </td>
                  <td className="py-3 px-4 text-muted-foreground">
                    Primary background color
                  </td>
                </tr>
                <tr className="border-b hover:bg-muted/50">
                  <td className="py-3 px-4 font-mono text-xs">
                    --la-foreground
                  </td>
                  <td className="py-3 px-4 text-muted-foreground">
                    Primary text color
                  </td>
                </tr>
                <tr className="border-b hover:bg-muted/50">
                  <td className="py-3 px-4 font-mono text-xs">--la-card</td>
                  <td className="py-3 px-4 text-muted-foreground">
                    Card/panel background
                  </td>
                </tr>
                <tr className="border-b hover:bg-muted/50">
                  <td className="py-3 px-4 font-mono text-xs">
                    --la-card-foreground
                  </td>
                  <td className="py-3 px-4 text-muted-foreground">
                    Card text color
                  </td>
                </tr>
                <tr className="border-b hover:bg-muted/50">
                  <td className="py-3 px-4 font-mono text-xs">--la-popover</td>
                  <td className="py-3 px-4 text-muted-foreground">
                    Popover/dropdown background
                  </td>
                </tr>
                <tr className="border-b hover:bg-muted/50">
                  <td className="py-3 px-4 font-mono text-xs">
                    --la-popover-foreground
                  </td>
                  <td className="py-3 px-4 text-muted-foreground">
                    Popover text color
                  </td>
                </tr>
                <tr className="border-b hover:bg-muted/50">
                  <td className="py-3 px-4 font-mono text-xs">--la-primary</td>
                  <td className="py-3 px-4 text-muted-foreground">
                    Primary brand color
                  </td>
                </tr>
                <tr className="border-b hover:bg-muted/50">
                  <td className="py-3 px-4 font-mono text-xs">
                    --la-primary-foreground
                  </td>
                  <td className="py-3 px-4 text-muted-foreground">
                    Primary button text
                  </td>
                </tr>
                <tr className="border-b hover:bg-muted/50">
                  <td className="py-3 px-4 font-mono text-xs">
                    --la-secondary
                  </td>
                  <td className="py-3 px-4 text-muted-foreground">
                    Secondary color
                  </td>
                </tr>
                <tr className="border-b hover:bg-muted/50">
                  <td className="py-3 px-4 font-mono text-xs">
                    --la-secondary-foreground
                  </td>
                  <td className="py-3 px-4 text-muted-foreground">
                    Secondary button text
                  </td>
                </tr>
                <tr className="border-b hover:bg-muted/50">
                  <td className="py-3 px-4 font-mono text-xs">--la-accent</td>
                  <td className="py-3 px-4 text-muted-foreground">
                    Accent/highlight color
                  </td>
                </tr>
                <tr className="border-b hover:bg-muted/50">
                  <td className="py-3 px-4 font-mono text-xs">
                    --la-accent-foreground
                  </td>
                  <td className="py-3 px-4 text-muted-foreground">
                    Accent text color
                  </td>
                </tr>
                <tr className="border-b hover:bg-muted/50">
                  <td className="py-3 px-4 font-mono text-xs">
                    --la-destructive
                  </td>
                  <td className="py-3 px-4 text-muted-foreground">
                    Error/danger color
                  </td>
                </tr>
                <tr className="border-b hover:bg-muted/50">
                  <td className="py-3 px-4 font-mono text-xs">
                    --la-destructive-foreground
                  </td>
                  <td className="py-3 px-4 text-muted-foreground">
                    Destructive button text
                  </td>
                </tr>
                <tr className="border-b hover:bg-muted/50">
                  <td className="py-3 px-4 font-mono text-xs">--la-muted</td>
                  <td className="py-3 px-4 text-muted-foreground">
                    Disabled/muted background
                  </td>
                </tr>
                <tr className="border-b hover:bg-muted/50">
                  <td className="py-3 px-4 font-mono text-xs">
                    --la-muted-foreground
                  </td>
                  <td className="py-3 px-4 text-muted-foreground">
                    Disabled/muted text
                  </td>
                </tr>
                <tr className="border-b hover:bg-muted/50">
                  <td className="py-3 px-4 font-mono text-xs">--la-border</td>
                  <td className="py-3 px-4 text-muted-foreground">
                    Border color
                  </td>
                </tr>
                <tr className="border-b hover:bg-muted/50">
                  <td className="py-3 px-4 font-mono text-xs">--la-input</td>
                  <td className="py-3 px-4 text-muted-foreground">
                    Input field background
                  </td>
                </tr>
                <tr className="hover:bg-muted/50">
                  <td className="py-3 px-4 font-mono text-xs">--la-ring</td>
                  <td className="py-3 px-4 text-muted-foreground">
                    Focus ring color
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold tracking-tight mb-6">
            Color Picker & HSL Converter
          </h2>
          <div className="rounded-lg border bg-card p-6">
            <p className="text-muted-foreground mb-4">
              Use any online HSL color picker to select your colors. Make sure
              to copy the values in HSL format (Hue Saturation% Lightness%)
              without parentheses.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="rounded-lg border p-4 bg-muted/50">
                <p className="font-mono text-sm mb-2 text-muted-foreground">
                  ❌ Wrong format:
                </p>
                <p className="font-mono text-sm text-foreground">
                  hsl(262, 83%, 58%)
                </p>
              </div>
              <div className="rounded-lg border p-4 bg-muted/50">
                <p className="font-mono text-sm mb-2 text-muted-foreground">
                  ✓ Correct format:
                </p>
                <p className="font-mono text-sm text-foreground">262 83% 58%</p>
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold tracking-tight mb-6">
            Example Submission Issue
          </h2>
          <p className="text-muted-foreground mb-4">
            Here's a template for your submission issue on GitHub:
          </p>
          <div className="rounded-lg border bg-muted/50 p-6">
            <div className="space-y-4 text-sm font-mono text-muted-foreground">
              <div>
                <p className="font-semibold text-foreground mb-2">
                  Title: Theme Submission: [Theme Name]
                </p>
              </div>

              <div className="space-y-2">
                <p className="font-semibold text-foreground">Description:</p>
                <pre className="bg-background p-3 rounded text-xs overflow-x-auto">
                  {`## Theme Details
- **Name:** My Awesome Theme
- **ID:** my-awesome-theme
- **Author:** Your Name
- **Version:** 1.0.0

## Description
A brief description of your theme and its inspiration.

## Inspiration & Palette
- Explain what inspired this theme
- Describe the aesthetic (warm, cool, vibrant, muted, etc.)
- List any color schemes or projects that influenced it

## Accessibility
- [x] All foreground/background pairs meet WCAG AA contrast (4.5:1)
- [x] Tested with color blindness simulators
- [x] Light mode is readable
- [x] Dark mode is readable

## Preview
[Paste your theme JSON here between triple backticks]

## Installation Preview
Once approved, users will install this theme with:
\`npx @launchapp/design-system theme add my-awesome-theme\`

## License
MIT`}
                </pre>
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold tracking-tight mb-6">
            Best Practices
          </h2>
          <div className="space-y-4">
            <div className="rounded-lg border p-6 bg-card">
              <h3 className="font-semibold mb-2">Test Contrast Ratios</h3>
              <p className="text-sm text-muted-foreground">
                Use tools like WebAIM Contrast Checker to ensure all text colors
                meet WCAG AA standards (4.5:1 for normal text, 3:1 for large
                text).
              </p>
            </div>

            <div className="rounded-lg border p-6 bg-card">
              <h3 className="font-semibold mb-2">
                Consider Light & Dark Parity
              </h3>
              <p className="text-sm text-muted-foreground">
                Both light and dark modes should feel equally polished. Test
                that colors work well in both contexts and maintain visual
                hierarchy.
              </p>
            </div>

            <div className="rounded-lg border p-6 bg-card">
              <h3 className="font-semibold mb-2">Use Consistent Saturation</h3>
              <p className="text-sm text-muted-foreground">
                Maintain consistent saturation levels across related colors for
                a cohesive palette. Avoid mixing very saturated and very
                desaturated colors.
              </p>
            </div>

            <div className="rounded-lg border p-6 bg-card">
              <h3 className="font-semibold mb-2">Test on Real Components</h3>
              <p className="text-sm text-muted-foreground">
                Don't just look at color swatches. Preview your theme on actual
                buttons, inputs, cards, and other components to see how it looks
                in context.
              </p>
            </div>

            <div className="rounded-lg border p-6 bg-card">
              <h3 className="font-semibold mb-2">Document Your Inspiration</h3>
              <p className="text-sm text-muted-foreground">
                Share what inspired your theme. Was it a nature scene? A famous
                color palette? A cultural aesthetic? Stories make themes more
                memorable.
              </p>
            </div>

            <div className="rounded-lg border p-6 bg-card">
              <h3 className="font-semibold mb-2">Semantic Versioning</h3>
              <p className="text-sm text-muted-foreground">
                Follow semver: patch for minor color tweaks (1.0.1), minor for
                new features/tokens (1.1.0), major for breaking changes (2.0.0).
              </p>
            </div>
          </div>
        </section>

        <section className="rounded-lg border bg-accent/10 p-8">
          <h2 className="text-2xl font-bold tracking-tight mb-4">Questions?</h2>
          <p className="text-muted-foreground mb-4">
            If you have questions about the submission process or requirements:
          </p>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>
              <strong>GitHub Issues:</strong>{" "}
              <a
                href="https://github.com/launchapp-dev/design-system/issues"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                Open an issue with the "question" label
              </a>
            </li>
            <li>
              <strong>View Schema:</strong>{" "}
              <Link
                href="/community-themes"
                className="text-primary hover:underline"
              >
                Back to Community Themes Gallery
              </Link>
            </li>
            <li>
              <strong>Community:</strong> Join our community discussions and
              connect with other theme creators
            </li>
          </ul>
        </section>
      </div>
    </div>
  );
}
