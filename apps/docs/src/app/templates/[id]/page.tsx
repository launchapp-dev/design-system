import Link from "next/link";
import { notFound } from "next/navigation";
import { CodeBlock } from "@/components/CodeBlock";
import {
  ALL_TEMPLATE_IDS,
  getTemplateById,
  type TemplateId,
} from "@/lib/templates-registry";

interface PageProps {
  params: Promise<{ id: string }>;
}

export function generateStaticParams() {
  return ALL_TEMPLATE_IDS.map((id) => ({ id }));
}

export async function generateMetadata({ params }: PageProps) {
  const { id } = await params;
  const template = getTemplateById(id as TemplateId);
  if (!template) return {};
  return {
    title: `${template.name} Template — LaunchApp Design System`,
    description: template.description,
  };
}

export default async function TemplateDetailPage({ params }: PageProps) {
  const { id } = await params;
  const template = getTemplateById(id as TemplateId);
  if (!template) return notFound();

  const currentIdx = ALL_TEMPLATE_IDS.indexOf(id as TemplateId);
  const prevId = currentIdx > 0 ? ALL_TEMPLATE_IDS[currentIdx - 1] : null;
  const nextId =
    currentIdx < ALL_TEMPLATE_IDS.length - 1
      ? ALL_TEMPLATE_IDS[currentIdx + 1]
      : null;

  const prevTemplate = prevId ? getTemplateById(prevId) : null;
  const nextTemplate = nextId ? getTemplateById(nextId) : null;

  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
        <Link href="/" className="hover:text-foreground transition-colors">
          Home
        </Link>
        <span>/</span>
        <Link
          href="/templates"
          className="hover:text-foreground transition-colors"
        >
          Templates
        </Link>
        <span>/</span>
        <span className="text-foreground">{template.name}</span>
      </nav>

      <div className="mb-10">
        <div className="flex items-center gap-3 mb-2">
          <h1 className="text-4xl font-bold tracking-tight">{template.name}</h1>
          <span className="inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium text-muted-foreground capitalize">
            {template.category}
          </span>
        </div>
        <p className="text-lg text-muted-foreground leading-relaxed">
          {template.description}
        </p>
      </div>

      <div className="grid grid-cols-2 gap-8 mb-12">
        <section>
          <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground mb-4">
            Key Features
          </h2>
          <ul className="space-y-2">
            {template.features.map((feature, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="text-primary mt-0.5 flex-shrink-0">✓</span>
                <span className="text-base">{feature}</span>
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground mb-4">
            Components Used
          </h2>
          <div className="space-y-2">
            {template.blocks.map((block, i) => (
              <div
                key={i}
                className="inline-flex items-center rounded-md border bg-muted px-3 py-1 text-sm text-muted-foreground mr-2 mb-2"
              >
                {block}
              </div>
            ))}
          </div>
        </section>
      </div>

      <section className="mb-12 p-6 rounded-xl border bg-muted/30">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground mb-4">
          Quick Start
        </h2>
        <p className="text-sm text-muted-foreground mb-4">
          Scaffold this template in your project using the CLI:
        </p>
        <CodeBlock
          lang="bash"
          code={template.scaffoldCommand}
          title="Terminal"
        />
      </section>

      <section className="mb-12">
        <h2 className="text-xl font-semibold mb-4">Usage Example</h2>
        <CodeBlock
          lang="tsx"
          title={`${template.name.replace(/\s+/g, "")}.tsx`}
          code={template.previewCode}
        />
      </section>

      <section className="mb-12">
        <h2 className="text-xl font-semibold mb-4">About This Template</h2>
        <div className="rounded-lg border p-6 bg-muted/30">
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-semibold text-muted-foreground mb-1">
                Template ID
              </h3>
              <p className="font-mono text-sm">{template.id}</p>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-muted-foreground mb-1">
                Source File
              </h3>
              <p className="font-mono text-sm">{template.sourceFile}</p>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-muted-foreground mb-1">
                Category
              </h3>
              <p className="text-sm">{template.category}</p>
            </div>
          </div>
        </div>
      </section>

      <div className="mt-12 flex items-center justify-between pt-6 border-t">
        <div>
          {prevTemplate && (
            <Link
              href={`/templates/${prevId}`}
              className="flex flex-col gap-1 group"
            >
              <span className="text-xs text-muted-foreground">← Previous</span>
              <span className="font-medium group-hover:text-primary transition-colors">
                {prevTemplate.name}
              </span>
            </Link>
          )}
        </div>
        <div className="text-right">
          {nextTemplate && (
            <Link
              href={`/templates/${nextId}`}
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
