import Link from "next/link";
import { templates } from "@/lib/templates-registry";

interface FeatureTag {
  name: string;
  color: string;
}

function TemplateCard({ template }: { template: (typeof templates)[0] }) {
  const categoryColors: Record<string, string> = {
    SaaS: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100",
    Retail:
      "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-100",
    Marketing:
      "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100",
  };

  return (
    <Link href={`/templates/${template.id}`}>
      <div className="group cursor-pointer rounded-xl border p-6 hover:border-primary hover:shadow-md transition-all hover:bg-accent/30">
        <div className="space-y-4">
          <div className="flex items-start justify-between">
            <div className="space-y-2">
              <h3 className="text-lg font-semibold group-hover:text-primary transition-colors">
                {template.name}
              </h3>
              <p className="text-sm text-muted-foreground">
                {template.description}
              </p>
            </div>
            <span
              className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap ${categoryColors[template.category] || "bg-gray-100 text-gray-800"}`}
            >
              {template.category}
            </span>
          </div>

          <div className="space-y-3">
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-2">
                Key Features
              </h4>
              <ul className="space-y-1">
                {template.features.slice(0, 3).map((feature, i) => (
                  <li
                    key={i}
                    className="text-sm text-muted-foreground flex items-start gap-2"
                  >
                    <span className="text-primary mt-1">✓</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-2">
                Components Used
              </h4>
              <div className="flex flex-wrap gap-1">
                {template.blocks.slice(0, 4).map((block, i) => (
                  <span
                    key={i}
                    className="text-xs px-2 py-1 rounded border bg-muted text-muted-foreground"
                  >
                    {block}
                  </span>
                ))}
                {template.blocks.length > 4 && (
                  <span className="text-xs px-2 py-1 text-muted-foreground">
                    +{template.blocks.length - 4} more
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="pt-2">
            <div className="inline-flex items-center text-sm font-medium text-primary group-hover:gap-2 transition-all gap-1">
              View Template
              <span className="group-hover:translate-x-1 transition-transform">
                →
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

export const metadata = {
  title: "Templates — LaunchApp Design System",
  description:
    "Full application templates showcasing the design system in real-world scenarios.",
};

export default function TemplatesPage() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
        <Link href="/" className="hover:text-foreground transition-colors">
          Home
        </Link>
        <span>/</span>
        <span className="text-foreground">Templates</span>
      </nav>

      <div className="mb-12">
        <h1 className="text-4xl font-bold tracking-tight mb-4">
          Application Templates
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed">
          Explore complete, production-ready application templates built with
          the LaunchApp Design System. Each template demonstrates best practices
          and can be used as a starting point for your projects.
        </p>
        <div className="flex flex-wrap gap-3 mt-6">
          <Link
            href="/templates/contribute"
            className="inline-flex items-center rounded-md border px-4 py-2 text-sm font-medium hover:bg-accent transition-colors"
          >
            Submit Your Template
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {templates.map((template) => (
          <TemplateCard key={template.id} template={template} />
        ))}
      </div>

      <div className="rounded-xl border bg-muted/50 p-8 mb-12">
        <h2 className="text-xl font-semibold mb-4">Getting Started</h2>
        <p className="text-muted-foreground mb-6">
          Each template includes all source code and can be scaffolded via CLI
          or cloned from the repository. Visit any template page to view the
          full implementation and code examples.
        </p>
        <div className="space-y-2 text-sm text-muted-foreground">
          <p>
            📦 <strong>All templates are production-ready</strong> and fully
            accessible
          </p>
          <p>
            🎨 <strong>Built with design tokens</strong> for easy customization
          </p>
          <p>
            📱 <strong>Responsive design</strong> for all screen sizes
          </p>
          <p>
            🌙 <strong>Dark mode support</strong> included
          </p>
        </div>
      </div>

      <section className="mt-16">
        <h2 className="text-3xl font-bold tracking-tight mb-6">
          Submit Your Template
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="rounded-lg border p-8 bg-card">
            <h3 className="text-lg font-semibold mb-3">
              Contribute a Template
            </h3>
            <p className="text-muted-foreground mb-6">
              Have a great application template built with the design system?
              We'd love to feature it in our gallery!
            </p>
            <div className="space-y-4 text-sm">
              <div>
                <h4 className="font-medium mb-2">Requirements</h4>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                  <li>Uses only LaunchApp design system components</li>
                  <li>Production-ready and fully accessible</li>
                  <li>Documented implementation notes</li>
                  <li>Clear usage examples and code comments</li>
                  <li>Responsive design with mobile support</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="rounded-lg border p-8 bg-card">
            <h3 className="text-lg font-semibold mb-3">How to Submit</h3>
            <ol className="space-y-4 text-sm">
              <li className="flex gap-3">
                <span className="font-semibold text-primary min-w-6">1</span>
                <span className="text-muted-foreground">
                  Create your template following the design system guidelines
                </span>
              </li>
              <li className="flex gap-3">
                <span className="font-semibold text-primary min-w-6">2</span>
                <span className="text-muted-foreground">
                  Push your code to a public GitHub repository with clear
                  documentation
                </span>
              </li>
              <li className="flex gap-3">
                <span className="font-semibold text-primary min-w-6">3</span>
                <span className="text-muted-foreground">
                  Open an issue on the design system repo with your template
                  details
                </span>
              </li>
              <li className="flex gap-3">
                <span className="font-semibold text-primary min-w-6">4</span>
                <span className="text-muted-foreground">
                  Our team will review and potentially feature your template
                </span>
              </li>
            </ol>
          </div>
        </div>

        <div className="mt-8 rounded-lg border bg-muted/30 p-6">
          <h3 className="text-lg font-semibold mb-3">Template Structure</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Your template submission should include:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <h4 className="text-sm font-medium mb-2">Source Code</h4>
              <p className="text-xs text-muted-foreground">
                Well-organized React/TypeScript components using design system
                primitives
              </p>
            </div>
            <div>
              <h4 className="text-sm font-medium mb-2">Documentation</h4>
              <p className="text-xs text-muted-foreground">
                README with setup instructions, feature overview, and
                customization guide
              </p>
            </div>
            <div>
              <h4 className="text-sm font-medium mb-2">Examples</h4>
              <p className="text-xs text-muted-foreground">
                Live demos or screenshots showing the template in action
              </p>
            </div>
          </div>
        </div>

        <div className="mt-8 rounded-lg border-l-4 border-primary bg-primary/5 p-6">
          <h3 className="text-lg font-semibold mb-2">Community Standards</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Submitted templates are evaluated based on:
          </p>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>
              <strong>Accessibility:</strong> WCAG compliance and keyboard
              navigation
            </li>
            <li>
              <strong>Design Quality:</strong> Consistent visual hierarchy and
              spacing
            </li>
            <li>
              <strong>Code Quality:</strong> Clean, maintainable, and well-typed
              code
            </li>
            <li>
              <strong>Documentation:</strong> Clear instructions and usage
              examples
            </li>
            <li>
              <strong>Originality:</strong> Unique use cases or variations of
              application types
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
}
