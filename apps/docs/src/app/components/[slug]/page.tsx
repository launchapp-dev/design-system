import { notFound } from "next/navigation";
import Link from "next/link";
import { getComponent, components } from "@/lib/registry";
import { ComponentPreview } from "@/components/ComponentPreview";
import { CodeBlock } from "@/components/CodeBlock";
import { PropsTable } from "@/components/PropsTable";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return components.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const component = getComponent(slug);
  if (!component) return {};
  return {
    title: `${component.name} — LaunchApp Design System`,
    description: component.description,
  };
}

export default async function ComponentPage({ params }: PageProps) {
  const { slug } = await params;
  const component = getComponent(slug);
  if (!component) return notFound();

  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
        <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
        <span>/</span>
        <Link href="/" className="hover:text-foreground transition-colors">Components</Link>
        <span>/</span>
        <span className="text-foreground">{component.name}</span>
      </nav>

      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <h1 className="text-3xl font-bold tracking-tight">{component.name}</h1>
          <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium text-muted-foreground capitalize">
            {component.category}
          </span>
        </div>
        <p className="text-lg text-muted-foreground leading-relaxed">{component.description}</p>
      </div>

      <div className="mb-10">
        <ComponentPreview slug={slug} />
      </div>

      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-4">Installation</h2>
        <CodeBlock
          lang="bash"
          code={`npm install @launchapp/design-system`}
        />
        <div className="mt-4">
          <CodeBlock
            lang="tsx"
            title="Import"
            code={component.importStatement}
          />
        </div>
      </section>

      {component.examples.length > 0 && (
        <section className="mb-10">
          <h2 className="text-xl font-semibold mb-6">Examples</h2>
          <div className="space-y-8">
            {component.examples.map((example) => (
              <div key={example.title}>
                <h3 className="text-base font-medium mb-2">{example.title}</h3>
                {example.description && (
                  <p className="text-sm text-muted-foreground mb-3">{example.description}</p>
                )}
                <CodeBlock lang="tsx" code={example.code} />
              </div>
            ))}
          </div>
        </section>
      )}

      <section>
        <h2 className="text-xl font-semibold mb-4">Props</h2>
        <PropsTable props={component.props} />
      </section>

      <div className="mt-12 flex items-center justify-between pt-6 border-t">
        <PrevNextLinks currentSlug={slug} />
      </div>
    </div>
  );
}

function PrevNextLinks({ currentSlug }: { currentSlug: string }) {
  const idx = components.findIndex((c) => c.slug === currentSlug);
  const prev = idx > 0 ? components[idx - 1] : null;
  const next = idx < components.length - 1 ? components[idx + 1] : null;

  return (
    <>
      <div>
        {prev && (
          <Link
            href={`/components/${prev.slug}`}
            className="flex flex-col gap-1 group"
          >
            <span className="text-xs text-muted-foreground">← Previous</span>
            <span className="font-medium group-hover:text-primary transition-colors">
              {prev.name}
            </span>
          </Link>
        )}
      </div>
      <div className="text-right">
        {next && (
          <Link
            href={`/components/${next.slug}`}
            className="flex flex-col gap-1 items-end group"
          >
            <span className="text-xs text-muted-foreground">Next →</span>
            <span className="font-medium group-hover:text-primary transition-colors">
              {next.name}
            </span>
          </Link>
        )}
      </div>
    </>
  );
}
