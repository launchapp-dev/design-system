import Link from "next/link";
import { CodeBlock } from "@/components/CodeBlock";

export const metadata = {
  title: "Submit a Community Theme — LaunchApp Design System",
  description:
    "Guidelines and process for submitting your own community theme to the LaunchApp Design System gallery.",
};

export default function SubmitCommunityThemePage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
        <Link href="/" className="hover:text-foreground transition-colors">
          Home
        </Link>
        <span>/</span>
        <Link href="/community-themes" className="hover:text-foreground transition-colors">
          Community Themes
        </Link>
        <span>/</span>
        <span className="text-foreground">Submit a Theme</span>
      </nav>

      <div className="mb-12">
        <h1 className="text-4xl font-bold tracking-tight mb-4">Submit Your Community Theme</h1>
        <p className="text-xl text-muted-foreground max-w-2xl leading-relaxed">
          Share your custom color theme with the LaunchApp community. Submitted themes that meet our
          quality standards will be featured in the official community theme gallery.
        </p>
      </div>

      <div className="space-y-12">
        <section>
          <h2 className="text-2xl font-bold tracking-tight mb-6">What is a Community Theme?</h2>
          <p className="text-muted-foreground mb-4">
            A community theme is a complete color palette for the LaunchApp Design System that includes:
          </p>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground">
            <li>Light and dark mode color tokens</li>
            <li>Semantic color definitions (primary, secondary, destructive, etc.)</li>
            <li>Metadata about the theme (name, description, author information)</li>
            <li>Keywords for discoverability and categorization</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold tracking-tight mb-6">Theme Requirements</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="rounded-lg border p-6 bg-card">
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <span className="text-primary">✓</span>
                Complete Color Palette
              </h3>
              <p className="text-sm text-muted-foreground">
                Must define all 19 required design tokens for both light and dark modes (HSL format).
              </p>
            </div>

            <div className="rounded-lg border p-6 bg-card">
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <span className="text-primary">✓</span>
                Valid HSL Colors
              </h3>
              <p className="text-sm text-muted-foreground">
                All color values must be valid HSL format: "H S% L%" (e.g., "262 83% 58%").
              </p>
            </div>

            <div className="rounded-lg border p-6 bg-card">
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <span className="text-primary">✓</span>
                Sufficient Contrast
              </h3>
              <p className="text-sm text-muted-foreground">
                Foreground and background combinations must meet WCAG AA standards for accessibility.
              </p>
            </div>

            <div className="rounded-lg border p-6 bg-card">
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <span className="text-primary">✓</span>
                Semantic Versioning
              </h3>
              <p className="text-sm text-muted-foreground">
                Theme version must follow semver format (e.g., 1.0.0).
              </p>
            </div>

            <div className="rounded-lg border p-6 bg-card">
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <span className="text-primary">✓</span>
                Clear Metadata
              </h3>
              <p className="text-sm text-muted-foreground">
                Include theme name, description, author info, and license (MIT, Apache-2.0, etc.).
              </p>
            </div>

            <div className="rounded-lg border p-6 bg-card">
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <span className="text-primary">✓</span>
                Open Source License
              </h3>
              <p className="text-sm text-muted-foreground">
                Theme must use an open source license (MIT, Apache-2.0, BSD, ISC, etc.).
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold tracking-tight mb-6">Required Color Tokens</h2>
          <p className="text-muted-foreground mb-4">
            Your theme must define all of these tokens for both light and dark modes:
          </p>
          <div className="rounded-lg border bg-muted/50 p-6 overflow-x-auto">
            <div className="grid grid-cols-2 gap-4 text-sm font-mono text-muted-foreground">
              <div>
                <p className="font-semibold text-foreground mb-2">Background & Surface</p>
                <ul className="space-y-1">
                  <li>--la-background</li>
                  <li>--la-foreground</li>
                  <li>--la-card</li>
                  <li>--la-card-foreground</li>
                  <li>--la-popover</li>
                  <li>--la-popover-foreground</li>
                </ul>
              </div>
              <div>
                <p className="font-semibold text-foreground mb-2">Semantic Colors</p>
                <ul className="space-y-1">
                  <li>--la-primary</li>
                  <li>--la-primary-foreground</li>
                  <li>--la-secondary</li>
                  <li>--la-secondary-foreground</li>
                  <li>--la-muted</li>
                  <li>--la-muted-foreground</li>
                </ul>
              </div>
              <div>
                <p className="font-semibold text-foreground mb-2">Interactive</p>
                <ul className="space-y-1">
                  <li>--la-accent</li>
                  <li>--la-accent-foreground</li>
                  <li>--la-destructive</li>
                  <li>--la-destructive-foreground</li>
                  <li>--la-border</li>
                  <li>--la-input</li>
                </ul>
              </div>
              <div>
                <p className="font-semibold text-foreground mb-2">Focus States</p>
                <ul className="space-y-1">
                  <li>--la-ring</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold tracking-tight mb-6">Submission Process</h2>
          <div className="space-y-6">
            <div className="flex gap-6">
              <div className="flex flex-col items-center">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold">
                  1
                </div>
                <div className="mt-4 w-0.5 h-12 bg-border" />
              </div>
              <div className="pb-8">
                <h3 className="text-lg font-semibold mb-2">Create Your Theme</h3>
                <p className="text-muted-foreground mb-4">
                  Design your custom color palette with light and dark mode variants. Use HSL format for all color
                  values and ensure sufficient contrast for accessibility.
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
                <h3 className="text-lg font-semibold mb-2">Create Theme JSON File</h3>
                <p className="text-muted-foreground mb-4">
                  Create a JSON file following the community theme schema with all required metadata and color tokens.
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
                <h3 className="text-lg font-semibold mb-2">Test Your Theme</h3>
                <p className="text-muted-foreground mb-4">
                  Test the theme on the design system components to ensure colors work well together. Verify contrast
                  ratios meet WCAG AA standards.
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
                <h3 className="text-lg font-semibold mb-2">Push to GitHub (Optional)</h3>
                <p className="text-muted-foreground mb-4">
                  For themes with additional assets or documentation, create a public repository to showcase your work.
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
                <h3 className="text-lg font-semibold mb-2">Submit for Review</h3>
                <p className="text-muted-foreground mb-4">
                  Open an issue on the{" "}
                  <a
                    href="https://github.com/launchapp-dev/design-system"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    design system repository
                  </a>
                  {" "}with the label "theme-submission" and include:
                </p>
                <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                  <li>Complete theme JSON file content</li>
                  <li>Theme name and description</li>
                  <li>Author information</li>
                  <li>License information</li>
                  <li>Preview colors or screenshot of the theme applied to components</li>
                  <li>Repository URL (if available)</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="mt-8 rounded-lg border bg-primary/5 p-6 border-l-4 border-primary">
            <h3 className="font-semibold mb-2">Review Timeline</h3>
            <p className="text-sm text-muted-foreground">
              Our team will review your submission within 1-2 weeks. You may receive feedback for improvements.
              Approved themes will be featured in the community theme gallery with author credit and links.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold tracking-tight mb-6">Theme JSON Schema Example</h2>
          <p className="text-muted-foreground mb-4">
            Here's an example of a complete community theme JSON file:
          </p>
          <CodeBlock
            lang="json"
            code={`{
  "id": "my-awesome-theme",
  "name": "My Awesome Theme",
  "description": "A beautiful custom theme with warm, inviting colors",
  "author": {
    "name": "Your Name",
    "url": "https://yourwebsite.com",
    "email": "you@example.com"
  },
  "version": "1.0.0",
  "license": "MIT",
  "previewColor": "262 83% 58%",
  "keywords": ["warm", "custom", "professional"],
  "repository": "https://github.com/yourname/my-awesome-theme",
  "tokens": {
    "light": {
      "--la-background": "0 0% 100%",
      "--la-foreground": "0 0% 13%",
      "--la-card": "0 0% 100%",
      "--la-card-foreground": "0 0% 13%",
      "--la-popover": "0 0% 100%",
      "--la-popover-foreground": "0 0% 13%",
      "--la-primary": "262 83% 58%",
      "--la-primary-foreground": "0 0% 100%",
      "--la-secondary": "0 0% 96%",
      "--la-secondary-foreground": "0 0% 20%",
      "--la-muted": "0 0% 90%",
      "--la-muted-foreground": "0 0% 45%",
      "--la-accent": "262 83% 58%",
      "--la-accent-foreground": "0 0% 100%",
      "--la-destructive": "0 100% 67%",
      "--la-destructive-foreground": "0 0% 100%",
      "--la-border": "0 0% 88%",
      "--la-input": "0 0% 88%",
      "--la-ring": "262 83% 58%"
    },
    "dark": {
      "--la-background": "0 0% 13%",
      "--la-foreground": "0 0% 96%",
      "--la-card": "0 0% 17%",
      "--la-card-foreground": "0 0% 96%",
      "--la-popover": "0 0% 17%",
      "--la-popover-foreground": "0 0% 96%",
      "--la-primary": "262 83% 68%",
      "--la-primary-foreground": "0 0% 13%",
      "--la-secondary": "0 0% 30%",
      "--la-secondary-foreground": "0 0% 96%",
      "--la-muted": "0 0% 40%",
      "--la-muted-foreground": "0 0% 70%",
      "--la-accent": "262 83% 68%",
      "--la-accent-foreground": "0 0% 13%",
      "--la-destructive": "0 100% 67%",
      "--la-destructive-foreground": "0 0% 100%",
      "--la-border": "0 0% 32%",
      "--la-input": "0 0% 32%",
      "--la-ring": "262 83% 68%"
    }
  }
}`}
          />
        </section>

        <section>
          <h2 className="text-2xl font-bold tracking-tight mb-6">Best Practices</h2>
          <div className="space-y-4">
            <div className="rounded-lg border p-6 bg-card">
              <h3 className="font-semibold mb-2">Choose Thoughtful Colors</h3>
              <p className="text-sm text-muted-foreground">
                Select colors that work well together across different contexts. Test on buttons, cards, forms, and
                other components to ensure visual harmony.
              </p>
            </div>

            <div className="rounded-lg border p-6 bg-card">
              <h3 className="font-semibold mb-2">Ensure Accessibility</h3>
              <p className="text-sm text-muted-foreground">
                Use contrast checking tools to verify WCAG AA compliance. Test with screen readers and keyboard
                navigation to ensure the theme works for all users.
              </p>
            </div>

            <div className="rounded-lg border p-6 bg-card">
              <h3 className="font-semibold mb-2">Light and Dark Coherence</h3>
              <p className="text-sm text-muted-foreground">
                Ensure the dark mode is not just an inverse of the light mode. Create a cohesive experience where both
                modes feel intentional and pleasant to use.
              </p>
            </div>

            <div className="rounded-lg border p-6 bg-card">
              <h3 className="font-semibold mb-2">Document Your Inspiration</h3>
              <p className="text-sm text-muted-foreground">
                Share the story behind your theme. What inspired the color choices? What mood or use case does it
                serve? This helps users understand if it's right for their project.
              </p>
            </div>

            <div className="rounded-lg border p-6 bg-card">
              <h3 className="font-semibold mb-2">Semantic Color Relationships</h3>
              <p className="text-sm text-muted-foreground">
                Ensure semantic colors (primary, secondary, destructive) have clear visual distinctions. Users should
                immediately understand the purpose of each color.
              </p>
            </div>

            <div className="rounded-lg border p-6 bg-card">
              <h3 className="font-semibold mb-2">Test with Real Components</h3>
              <p className="text-sm text-muted-foreground">
                Use the community themes gallery to preview your theme with actual design system components before
                submission.
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold tracking-tight mb-6">Example Submission Issue</h2>
          <p className="text-muted-foreground mb-4">
            Here's a template for your submission issue on GitHub:
          </p>
          <div className="rounded-lg border bg-muted/50 p-6">
            <div className="space-y-4 text-sm font-mono text-muted-foreground">
              <div>
                <p className="font-semibold text-foreground mb-2">Title: Theme Submission: [Theme Name]</p>
              </div>

              <div className="space-y-2">
                <p className="font-semibold text-foreground">Description:</p>
                <pre className="bg-background p-3 rounded text-xs overflow-x-auto">
{`## Theme Details
- **Name:** My Awesome Theme
- **Author:** Your Name
- **Version:** 1.0.0
- **License:** MIT
- **Repository:** https://github.com/yourname/my-theme (optional)

## Description
[2-3 sentence description of your theme's aesthetic and use cases]

## Color Philosophy
[Explain your color choices and design decisions]

## Accessibility
- [x] WCAG AA contrast compliance
- [x] Tested on design system components
- [x] Light and dark modes verified

## Theme JSON
\`\`\`json
{
  "id": "my-awesome-theme",
  ... (complete theme JSON)
}
\`\`\`

## Preview
[If possible, include a screenshot or description of how the theme looks when applied]`}
                </pre>
              </div>
            </div>
          </div>
        </section>

        <section className="rounded-lg border bg-accent/10 p-8">
          <h2 className="text-2xl font-bold tracking-tight mb-4">Questions?</h2>
          <p className="text-muted-foreground mb-4">
            If you have questions about theme submission or requirements:
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
              <strong>Theme Gallery:</strong>{" "}
              <Link href="/community-themes" className="text-primary hover:underline">
                View existing community themes for inspiration
              </Link>
            </li>
            <li>
              <strong>Design System:</strong>{" "}
              <Link href="/components/button" className="text-primary hover:underline">
                Explore components to understand color usage
              </Link>
            </li>
          </ul>
        </section>
      </div>
    </div>
  );
}
