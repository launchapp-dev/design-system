import { cva, type VariantProps } from "class-variance-authority";
import type * as React from "react";
import { cn } from "../../lib/utils";

export type ChangelogTag =
  | "breaking"
  | "feature"
  | "fix"
  | "improvement"
  | "security"
  | "deprecation";

export interface ChangelogChange {
  text: string;
  tag?: ChangelogTag;
}

export interface ChangelogEntry {
  version: string;
  date: string;
  title: string;
  description?: string;
  changes: ChangelogChange[];
}

export interface ChangelogProps extends React.HTMLAttributes<HTMLDivElement> {
  entries: ChangelogEntry[];
  title?: string;
}

const changelogTagVariants = cva(
  "inline-flex items-center rounded-full px-2 py-0.5 text-xs font-semibold",
  {
    variants: {
      tag: {
        breaking:
          "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
        feature:
          "bg-[hsl(var(--la-primary)/0.1)] text-[hsl(var(--la-primary))]",
        fix: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
        improvement:
          "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
        security:
          "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400",
        deprecation:
          "bg-[hsl(var(--la-muted))] text-[hsl(var(--la-muted-foreground))]",
      },
    },
  },
);

const TAG_LABELS: Record<ChangelogTag, string> = {
  breaking: "Breaking",
  feature: "Feature",
  fix: "Fix",
  improvement: "Improvement",
  security: "Security",
  deprecation: "Deprecated",
};

function groupByDate(entries: ChangelogEntry[]): Map<string, ChangelogEntry[]> {
  const groups = new Map<string, ChangelogEntry[]>();
  for (const entry of entries) {
    const existing = groups.get(entry.date);
    if (existing) {
      existing.push(entry);
    } else {
      groups.set(entry.date, [entry]);
    }
  }
  return groups;
}

function ChangelogEntryCard({ entry }: { entry: ChangelogEntry }) {
  return (
    <div className="flex gap-4">
      <div className="flex flex-col items-center">
        <div className="h-2.5 w-2.5 rounded-full bg-[hsl(var(--la-primary))] ring-2 ring-[hsl(var(--la-background))] flex-shrink-0 mt-1" />
        <div className="w-px flex-1 bg-[hsl(var(--la-border))] mt-2" />
      </div>
      <div className="pb-8 min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2 mb-2">
          <span className="inline-flex items-center rounded-md border border-[hsl(var(--la-border))] bg-[hsl(var(--la-background))] px-2.5 py-0.5 text-xs font-mono font-semibold text-[hsl(var(--la-foreground))]">
            {entry.version}
          </span>
          <h3 className="text-sm font-semibold text-[hsl(var(--la-foreground))]">
            {entry.title}
          </h3>
        </div>
        {entry.description && (
          <p className="mb-3 text-sm text-[hsl(var(--la-muted-foreground))]">
            {entry.description}
          </p>
        )}
        <ul className="space-y-1.5">
          {entry.changes.map((change, i) => (
            <li key={i} className="flex items-start gap-2 text-sm">
              {change.tag && (
                <span
                  className={cn(
                    changelogTagVariants({ tag: change.tag }),
                    "mt-0.5 flex-shrink-0",
                  )}
                >
                  {TAG_LABELS[change.tag]}
                </span>
              )}
              <span className="text-[hsl(var(--la-muted-foreground))]">
                {change.text}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function Changelog({
  className,
  entries,
  title = "Changelog",
  ...props
}: ChangelogProps) {
  const grouped = groupByDate(entries);

  return (
    <div className={cn("space-y-8", className)} {...props}>
      {title && (
        <h2 className="text-2xl font-bold text-[hsl(var(--la-foreground))]">
          {title}
        </h2>
      )}
      {Array.from(grouped.entries()).map(([date, dateEntries]) => (
        <section key={date}>
          <div className="flex items-center gap-3 mb-4">
            <time
              dateTime={date}
              className="text-xs font-semibold uppercase tracking-wider text-[hsl(var(--la-muted-foreground))]"
            >
              {date}
            </time>
            <div className="flex-1 h-px bg-[hsl(var(--la-border))]" />
          </div>
          <div>
            {dateEntries.map((entry, i) => (
              <ChangelogEntryCard key={`${entry.version}-${i}`} entry={entry} />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}

Changelog.displayName = "Changelog";
export type ChangelogTagVariants = VariantProps<typeof changelogTagVariants>;

export { Changelog, changelogTagVariants };
