import fs from "fs";
import path from "path";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  ALL_BLOCK_CATEGORIES,
  BLOCK_CATEGORY_LABELS,
  BLOCK_CATEGORY_DESCRIPTIONS,
  getBlocksByCategory,
  type BlockCategory,
} from "@/lib/blocks-registry";
import { BlockPreview } from "@/components/BlockPreview";
import { CodeBlock } from "@/components/CodeBlock";
import { BlockCodeSection } from "@/components/BlockCodeSection";

interface PageProps {
  params: { category: string };
}

const BLOCKS_ROOT = path.resolve(process.cwd(), "../../src/blocks");

function readBlockSource(sourcePath: string): string | null {
  try {
    return fs.readFileSync(path.join(BLOCKS_ROOT, sourcePath), "utf-8");
  } catch {
    return null;
  }
}

export function generateStaticParams() {
  return ALL_BLOCK_CATEGORIES.map((category) => ({ category }));
}

export function generateMetadata({ params }: PageProps) {
  const category = params.category as BlockCategory;
  if (!ALL_BLOCK_CATEGORIES.includes(category)) return {};
  const label = BLOCK_CATEGORY_LABELS[category];
  return {
    title: `${label} Blocks — LaunchApp Design System`,
    description: BLOCK_CATEGORY_DESCRIPTIONS[category],
  };
}

export default async function BlockCategoryPage({ params }: PageProps) {
  const category = params.category as BlockCategory;
  if (!ALL_BLOCK_CATEGORIES.includes(category)) return notFound();

  const categoryBlocks = getBlocksByCategory(category);
  const label = BLOCK_CATEGORY_LABELS[category];
  const description = BLOCK_CATEGORY_DESCRIPTIONS[category];

  const currentIdx = ALL_BLOCK_CATEGORIES.indexOf(category);
  const prevCategory = currentIdx > 0 ? ALL_BLOCK_CATEGORIES[currentIdx - 1] : null;
  const nextCategory =
    currentIdx < ALL_BLOCK_CATEGORIES.length - 1 ? ALL_BLOCK_CATEGORIES[currentIdx + 1] : null;

  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
        <Link href="/" className="hover:text-foreground transition-colors">
          Home
        </Link>
        <span>/</span>
        <Link href="/blocks/auth" className="hover:text-foreground transition-colors">
          Blocks
        </Link>
        <span>/</span>
        <span className="text-foreground">{label}</span>
      </nav>

      <div className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight mb-2">{label}</h1>
        <p className="text-lg text-muted-foreground leading-relaxed">{description}</p>
      </div>

      <div className="space-y-16">
        {await Promise.all(
          categoryBlocks.map(async (block) => {
            const sourceCode = readBlockSource(block.sourcePath);
            return (
              <section key={block.id} id={block.id}>
                <div className="mb-4">
                  <h2 className="text-xl font-semibold">{block.name}</h2>
                  <p className="text-sm text-muted-foreground mt-1">{block.description}</p>
                </div>
                <div className="mb-4">
                  <BlockPreview blockId={block.id} />
                </div>
                <BlockCodeSection
                  usageCode={
                    <CodeBlock lang="tsx" title={`${block.name}.tsx`} code={block.code} />
                  }
                  sourceCode={
                    sourceCode ? (
                      <CodeBlock
                        lang="tsx"
                        title={block.sourcePath.split("/").pop()}
                        code={sourceCode}
                      />
                    ) : null
                  }
                />
              </section>
            );
          })
        )}
      </div>

      <div className="mt-12 flex items-center justify-between pt-6 border-t">
        <div>
          {prevCategory && (
            <Link
              href={`/blocks/${prevCategory}`}
              className="flex flex-col gap-1 group"
            >
              <span className="text-xs text-muted-foreground">← Previous</span>
              <span className="font-medium group-hover:text-primary transition-colors">
                {BLOCK_CATEGORY_LABELS[prevCategory]}
              </span>
            </Link>
          )}
        </div>
        <div className="text-right">
          {nextCategory && (
            <Link
              href={`/blocks/${nextCategory}`}
              className="flex flex-col gap-1 items-end group"
            >
              <span className="text-xs text-muted-foreground">Next →</span>
              <span className="font-medium group-hover:text-primary transition-colors">
                {BLOCK_CATEGORY_LABELS[nextCategory]}
              </span>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
