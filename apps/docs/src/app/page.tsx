import Link from "next/link";
import {
  ALL_CATEGORIES,
  CATEGORY_LABELS,
  type ComponentCategory,
  components,
} from "@/lib/registry";

function CategorySection({
  category,
  items,
}: {
  category: ComponentCategory;
  items: typeof components;
}) {
  return (
    <div>
      <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-3">
        {CATEGORY_LABELS[category]}
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
        {items.map((component) => (
          <Link
            key={component.slug}
            href={`/components/${component.slug}`}
            className="group flex flex-col rounded-lg border p-3 hover:border-primary hover:bg-accent/50 transition-all"
          >
            <span className="font-medium text-sm">{component.name}</span>
            <span className="text-xs text-muted-foreground mt-1 line-clamp-2 leading-relaxed">
              {component.description}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default function HomePage() {
  const grouped = ALL_CATEGORIES.reduce(
    (acc, cat) => {
      const items = components.filter((c) => c.category === cat);
      if (items.length > 0) acc[cat] = items;
      return acc;
    },
    {} as Partial<Record<ComponentCategory, typeof components>>,
  );

  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      <div className="mb-10">
        <div className="inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium text-muted-foreground mb-4">
          v0.1.0 · {components.length} components
        </div>
        <h1 className="text-4xl font-bold tracking-tight mb-4">
          LaunchApp Design System
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl leading-relaxed">
          A comprehensive component library built on{" "}
          <span className="text-foreground font-medium">
            Radix UI Primitives
          </span>{" "}
          and <span className="text-foreground font-medium">Tailwind CSS</span>.
          Accessible, customizable, and production-ready.
        </p>
        <div className="flex flex-wrap gap-3 mt-6">
          <Link
            href="/components/button"
            className="inline-flex items-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            Browse Components
          </Link>
          <Link
            href="/tokens"
            className="inline-flex items-center rounded-md border px-4 py-2 text-sm font-medium hover:bg-accent transition-colors"
          >
            Design Tokens
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-10 p-4 rounded-xl border bg-muted/30">
        <div className="text-center p-3">
          <div className="text-3xl font-bold text-primary">
            {components.length}
          </div>
          <div className="text-sm text-muted-foreground mt-1">Components</div>
        </div>
        <div className="text-center p-3 border-x">
          <div className="text-3xl font-bold text-primary">
            {ALL_CATEGORIES.length}
          </div>
          <div className="text-sm text-muted-foreground mt-1">Categories</div>
        </div>
        <div className="text-center p-3">
          <div className="text-3xl font-bold text-primary">100%</div>
          <div className="text-sm text-muted-foreground mt-1">Accessible</div>
        </div>
      </div>

      <div className="space-y-8">
        {ALL_CATEGORIES.map((cat) => {
          const items = grouped[cat];
          if (!items) return null;
          return <CategorySection key={cat} category={cat} items={items} />;
        })}
      </div>
    </div>
  );
}
