import { notFound } from "next/navigation";
import Link from "next/link";
import { getTemplateById, ALL_TEMPLATE_IDS, templates } from "@/lib/templates-registry";
import { CodeBlock } from "@/components/CodeBlock";

interface PageProps {
  params: Promise<{ id: string }>;
}

export function generateStaticParams() {
  return ALL_TEMPLATE_IDS.map((id) => ({ id }));
}

export async function generateMetadata({ params }: PageProps) {
  const { id } = await params;
  const template = getTemplateById(id as any);
  if (!template) return {};
  return {
    title: `${template.name} Template — LaunchApp Design System`,
    description: template.description,
  };
}

export default async function TemplatePage({ params }: PageProps) {
  const { id } = await params;
  const template = getTemplateById(id as any);

  if (!template) {
    notFound();
  }

  const currentIdx = templates.findIndex((t) => t.id === template.id);
  const prevTemplate = currentIdx > 0 ? templates[currentIdx - 1] : null;
  const nextTemplate =
    currentIdx < templates.length - 1 ? templates[currentIdx + 1] : null;

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
        <span className="text-foreground">{template.name}</span>
      </nav>

      <div className="mb-10">
        <div className="inline-flex px-3 py-1 rounded-full border text-xs font-medium text-muted-foreground mb-4">
          {template.category}
        </div>
        <h1 className="text-4xl font-bold tracking-tight mb-4">{template.name}</h1>
        <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed">
          {template.description}
        </p>
      </div>

      <div className="grid grid-cols-2 gap-6 mb-12">
        <div className="space-y-4">
          <div>
            <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-3">
              Key Features
            </h2>
            <ul className="space-y-2">
              {template.features.map((feature, i) => (
                <li key={i} className="text-sm text-foreground flex items-start gap-2">
                  <span className="text-primary mt-0.5 font-bold">✓</span>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-3">
              Components & Blocks
            </h2>
            <div className="flex flex-wrap gap-2">
              {template.blocks.map((block, i) => (
                <span
                  key={i}
                  className="text-xs px-3 py-1.5 rounded-md border bg-muted text-foreground hover:border-primary transition-colors"
                >
                  {block}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-3">
              Quick Start
            </h2>
            <p className="text-sm text-muted-foreground mb-2">Use the CLI to scaffold this template:</p>
            <div className="bg-muted p-3 rounded-lg border">
              <code className="text-xs text-foreground font-mono">
                {template.scaffoldCommand}
              </code>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-8 mb-12">
        <div>
          <h2 className="text-2xl font-semibold mb-4">Preview</h2>
          <div className="rounded-lg border bg-muted/30 p-8 min-h-96 flex items-center justify-center">
            <div className="text-center text-muted-foreground">
              <p className="mb-2">Live preview coming soon</p>
              <p className="text-sm">See the code below to implement this template</p>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-4">Implementation</h2>
          <CodeBlock
            lang="tsx"
            title={`${template.name}.tsx`}
            code={template.previewCode}
          />
        </div>

        <div className="rounded-xl border bg-accent/30 p-6">
          <h3 className="font-semibold mb-2">Full Source Code</h3>
          <p className="text-sm text-muted-foreground mb-4">
            The complete implementation of this template is available in the design system repository.
          </p>
          <div className="space-y-2 text-sm">
            <p>
              <strong>File:</strong> <code className="text-xs bg-muted px-2 py-1 rounded">{template.sourceFile}</code>
            </p>
            <p>
              <strong>Repository:</strong> <a href="https://github.com/launchapp-dev/design-system" target="_blank" rel="noreferrer" className="text-primary hover:underline">
                github.com/launchapp-dev/design-system
              </a>
            </p>
          </div>
        </div>
      </div>

      <div className="mt-12 flex items-center justify-between pt-6 border-t">
        <div>
          {prevTemplate && (
            <Link
              href={`/templates/${prevTemplate.id}`}
              className="flex flex-col gap-1 group"
            >
              <span className="text-xs text-muted-foreground">← Previous</span>
              <span className="font-medium group-hover:text-primary transition-colors">
                {prevTemplate.name}
              </span>
            </Link>
          )}
        </div>
        <Link
          href="/templates"
          className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
        >
          Back to Templates
        </Link>
        <div className="text-right">
          {nextTemplate && (
            <Link
              href={`/templates/${nextTemplate.id}`}
              className="flex flex-col gap-1 items-end group"
            >
              <span className="text-xs text-muted-foreground">Next →</span>
              <span className="font-medium group-hover:text-primary transition-colors">
                {nextTemplate.name}
              </span>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
