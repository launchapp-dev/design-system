import Link from "next/link";
import { CodeBlock } from "@/components/CodeBlock";

export const metadata = {
  title: "Submit a Template — LaunchApp Design System",
  description: "Guidelines and process for submitting your own application template to the LaunchApp Design System gallery.",
};

export default function ContributeTemplatePage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
        <Link href="/" className="hover:text-foreground transition-colors">
          Home
        </Link>
        <span>/</span>
        <Link href="/templates" className="hover:text-foreground transition-colors">
          Templates
        </Link>
        <span>/</span>
        <span className="text-foreground">Submit a Template</span>
      </nav>

      <div className="mb-12">
        <h1 className="text-4xl font-bold tracking-tight mb-4">Submit Your Template</h1>
        <p className="text-xl text-muted-foreground max-w-2xl leading-relaxed">
          Share your application templates built with the LaunchApp Design System. Submitted templates
          that meet our quality standards will be featured in the official template gallery.
        </p>
      </div>

      <div className="space-y-12">
        <section>
          <h2 className="text-2xl font-bold tracking-tight mb-6">Requirements</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="rounded-lg border p-6 bg-card">
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <span className="text-primary">✓</span>
                Component Usage
              </h3>
              <p className="text-sm text-muted-foreground">
                Templates must use exclusively LaunchApp design system components. No custom-built components or third-party UI libraries.
              </p>
            </div>

            <div className="rounded-lg border p-6 bg-card">
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <span className="text-primary">✓</span>
                Accessibility
              </h3>
              <p className="text-sm text-muted-foreground">
                Full WCAG 2.1 AA compliance, keyboard navigation, proper ARIA attributes, and screen reader support.
              </p>
            </div>

            <div className="rounded-lg border p-6 bg-card">
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <span className="text-primary">✓</span>
                Responsive Design
              </h3>
              <p className="text-sm text-muted-foreground">
                Mobile-first approach with proper breakpoint handling and touch-friendly interaction targets.
              </p>
            </div>

            <div className="rounded-lg border p-6 bg-card">
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <span className="text-primary">✓</span>
                Theme Support
              </h3>
              <p className="text-sm text-muted-foreground">
                Full light and dark mode support using CSS custom properties and the design system token system.
              </p>
            </div>

            <div className="rounded-lg border p-6 bg-card">
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <span className="text-primary">✓</span>
                Code Quality
              </h3>
              <p className="text-sm text-muted-foreground">
                Clean TypeScript code, proper component composition, no console errors, and production-ready implementation.
              </p>
            </div>

            <div className="rounded-lg border p-6 bg-card">
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <span className="text-primary">✓</span>
                Documentation
              </h3>
              <p className="text-sm text-muted-foreground">
                Comprehensive README with setup, features, customization guide, and code examples.
              </p>
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
                <h3 className="text-lg font-semibold mb-2">Create Your Template</h3>
                <p className="text-muted-foreground mb-4">
                  Build your application template using the LaunchApp Design System components. Follow the component
                  guidelines and design system patterns.
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
                <h3 className="text-lg font-semibold mb-2">Prepare Documentation</h3>
                <p className="text-muted-foreground mb-4">
                  Write a comprehensive README that includes:
                </p>
                <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                  <li>Template name and description</li>
                  <li>Key features and use cases</li>
                  <li>Installation and setup instructions</li>
                  <li>Component inventory and structure</li>
                  <li>Customization and theming guide</li>
                  <li>Usage examples and code snippets</li>
                </ul>
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
                <h3 className="text-lg font-semibold mb-2">Push to GitHub</h3>
                <p className="text-muted-foreground mb-4">
                  Create a public repository with your template code, clear commit history, and comprehensive documentation.
                </p>
              </div>
            </div>

            <div className="flex gap-6">
              <div className="flex flex-col items-center">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold">
                  4
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
                  {" "}with the label "template-submission" and include:
                </p>
                <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                  <li>Link to your template repository</li>
                  <li>Template name and description</li>
                  <li>List of components used</li>
                  <li>Key features overview</li>
                  <li>Preview screenshots or live demo link</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="mt-8 rounded-lg border bg-primary/5 p-6 border-l-4 border-primary">
            <h3 className="font-semibold mb-2">Review Timeline</h3>
            <p className="text-sm text-muted-foreground">
              Our team will review your submission within 1-2 weeks. You may receive feedback for improvements.
              Featured templates will be credited with author information and links to your profile.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold tracking-tight mb-6">Template Structure Example</h2>
          <p className="text-muted-foreground mb-4">
            Here's a suggested directory structure for your template:
          </p>
          <CodeBlock
            lang="text"
            code={`my-template/
├── src/
│   ├── components/
│   │   ├── Header.tsx
│   │   ├── Navigation.tsx
│   │   ├── Hero.tsx
│   │   ├── Features.tsx
│   │   ├── Footer.tsx
│   │   └── index.ts
│   ├── lib/
│   │   └── utils.ts
│   └── App.tsx
├── public/
│   ├── preview.png
│   └── screenshot.png
├── README.md
├── CUSTOMIZATION.md
├── package.json
└── tsconfig.json`}
          />
        </section>

        <section>
          <h2 className="text-2xl font-bold tracking-tight mb-6">Best Practices</h2>
          <div className="space-y-4">
            <div className="rounded-lg border p-6 bg-card">
              <h3 className="font-semibold mb-2">Use Design Tokens</h3>
              <p className="text-sm text-muted-foreground">
                Leverage CSS custom properties (--la-*) for all colors, spacing, and typography. This ensures
                your template respects user theme choices and customizations.
              </p>
            </div>

            <div className="rounded-lg border p-6 bg-card">
              <h3 className="font-semibold mb-2">Semantic HTML</h3>
              <p className="text-sm text-muted-foreground">
                Use semantic HTML elements and proper heading hierarchy. Never skip heading levels or use divs
                when semantic elements are appropriate.
              </p>
            </div>

            <div className="rounded-lg border p-6 bg-card">
              <h3 className="font-semibold mb-2">Component Composition</h3>
              <p className="text-sm text-muted-foreground">
                Build templates by composing design system components and blocks. Avoid prop drilling by using
                React Context for cross-cutting concerns.
              </p>
            </div>

            <div className="rounded-lg border p-6 bg-card">
              <h3 className="font-semibold mb-2">Error Handling</h3>
              <p className="text-sm text-muted-foreground">
                Implement graceful error boundaries, proper form validation, and user-friendly error messages.
                Show loading states for async operations.
              </p>
            </div>

            <div className="rounded-lg border p-6 bg-card">
              <h3 className="font-semibold mb-2">Performance</h3>
              <p className="text-sm text-muted-foreground">
                Optimize bundle size, implement code splitting where appropriate, and use Next.js features like
                Image optimization and lazy loading.
              </p>
            </div>

            <div className="rounded-lg border p-6 bg-card">
              <h3 className="font-semibold mb-2">Testing</h3>
              <p className="text-sm text-muted-foreground">
                Include unit tests for complex logic and integration tests for critical user flows. Aim for at
                least 70% code coverage.
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
                <p className="font-semibold text-foreground mb-2">Title: Template Submission: [Template Name]</p>
              </div>

              <div className="space-y-2">
                <p className="font-semibold text-foreground">Description:</p>
                <pre className="bg-background p-3 rounded text-xs overflow-x-auto">
{`## Template Details
- **Name:** My Awesome Template
- **Category:** SaaS / E-commerce / Marketing
- **Repository:** https://github.com/username/template-repo
- **Live Demo:** https://demo.example.com (optional)

## Overview
[2-3 sentence description of what this template does]

## Key Features
- Feature 1
- Feature 2
- Feature 3
- Feature 4

## Components Used
- Button
- Card
- Table
- Form components
- Navigation components

## Screenshot
[Include screenshot or preview image]

## Customization
[Brief note on how users can customize this template]

## Requirements Met
- [x] Uses only LaunchApp design system components
- [x] WCAG 2.1 AA compliant
- [x] Responsive design (mobile, tablet, desktop)
- [x] Light and dark mode support
- [x] Comprehensive documentation
- [x] Production-ready code`}
                </pre>
              </div>
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
              <strong>Documentation:</strong>{" "}
              <Link href="/components/button" className="text-primary hover:underline">
                Browse component documentation
              </Link>
            </li>
            <li>
              <strong>Community:</strong> Join our community discussions and connect with other contributors
            </li>
          </ul>
        </section>
      </div>
    </div>
  );
}
