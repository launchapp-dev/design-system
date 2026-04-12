import type * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
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
        breaking: "bg-destructive text-destructive-foreground dark:bg-destructive/30 dark:text-destructive",
        feature: "bg-primary/10 text-primary",
        fix: "bg-success/10 text-success dark:bg-success/30 dark:dark:text-success",
        improvement: "bg-info text-info-foreground dark:bg-info/30 dark:text-info",
        security: "bg-warning text-warning dark:bg-warning/10 dark:text-warning",
        deprecation: "bg-muted text-muted-foreground",
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
        <div className="h-2.5 w-2.5 rounded-full bg-primary ring-2 ring-background flex-shrink-0 mt-1" />
        <div className="w-px flex-1 bg-border mt-2" />
      </div>
      <div className="pb-8 min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2 mb-2">
          <span className="inline-flex items-center rounded-md border border-border bg-background px-2.5 py-0.5 text-xs font-mono font-semibold text-foreground">
            {entry.version}
          </span>
          <h3 className="text-sm font-semibold text-foreground">{entry.title}</h3>
        </div>
        {entry.description && (
          <p className="mb-3 text-sm text-muted-foreground">{entry.description}</p>
        )}
        <ul className="space-y-1.5">
          {entry.changes.map((change, i) => (
            <li key={i} className="flex items-start gap-2 text-sm">
              {change.tag && (
                <span
                  className={cn(changelogTagVariants({ tag: change.tag }), "mt-0.5 flex-shrink-0")}
                >
                  {TAG_LABELS[change.tag]}
                </span>
              )}
              <span className="text-muted-foreground">{change.text}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function Changelog({ className, entries, title = "Changelog", ...props }: ChangelogProps) {
  const grouped = groupByDate(entries);

  return (
    <div className={cn("space-y-8", className)} {...props}>
      {title && <h2 className="text-2xl font-bold text-foreground">{title}</h2>}
      {Array.from(grouped.entries()).map(([date, dateEntries]) => (
        <section key={date}>
          <div className="flex items-center gap-3 mb-4">
            <time
              dateTime={date}
              className="text-xs font-semibold uppercase tracking-wider text-muted-foreground"
            >
              {date}
            </time>
            <div className="flex-1 h-px bg-border" />
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
