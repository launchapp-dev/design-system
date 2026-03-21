import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";
import { Badge } from "../Badge";

const changelogVariants = cva("", {
  variants: {},
  defaultVariants: {},
});

export interface ChangelogEntry {
  id: string;
  version: string;
  date: string;
  title: string;
  description?: string;
  type?: "major" | "minor" | "patch" | "breaking" | "security";
  items?: string[];
}

export interface ChangelogProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof changelogVariants> {
  entries: ChangelogEntry[];
  title?: string;
  description?: string;
  showDescriptions?: boolean;
}

const Changelog = React.forwardRef<HTMLDivElement, ChangelogProps>(
  ({ className, entries, title = "Changelog", description, showDescriptions = true, ...props }, ref) => {
    const groupedEntries = React.useMemo(() => {
      const groups: Record<string, ChangelogEntry[]> = {};
      entries.forEach(entry => {
        const date = new Date(entry.date);
        const monthYear = date.toLocaleDateString("en-US", { month: "long", year: "numeric" });
        if (!groups[monthYear]) {
          groups[monthYear] = [];
        }
        groups[monthYear].push(entry);
      });
      return groups;
    }, [entries]);

    return (
      <div ref={ref} className={cn(changelogVariants({ className }), className)} {...props}>
        {(title || description) && (
          <div className="mb-6">
            {title && <h2 className="text-xl font-semibold">{title}</h2>}
            {description && (
              <p className="mt-1 text-sm text-muted-foreground">{description}</p>
            )}
          </div>
        )}

        <div className="space-y-8">
          {Object.entries(groupedEntries).map(([monthYear, monthEntries]) => (
            <ChangelogGroup key={monthYear} title={monthYear}>
              {monthEntries.map(entry => (
                <ChangelogItem
                  key={entry.id}
                  entry={entry}
                  showDescription={showDescriptions}
                />
              ))}
            </ChangelogGroup>
          ))}
        </div>
      </div>
    );
  }
);
Changelog.displayName = "Changelog";

export interface ChangelogGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
}

function ChangelogGroup({ className, title, children, ...props }: ChangelogGroupProps) {
  return (
    <div className={cn("space-y-4", className)} {...props}>
      <div className="flex items-center gap-4">
        <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
        <div className="h-px flex-1 bg-border" />
      </div>
      <div className="space-y-4">{children}</div>
    </div>
  );
}

export interface ChangelogItemProps extends React.HTMLAttributes<HTMLDivElement> {
  entry: ChangelogEntry;
  showDescription?: boolean;
}

function ChangelogItem({ className, entry, showDescription = true, ...props }: ChangelogItemProps) {
  return (
    <div className={cn("rounded-lg border border-border p-4", className)} {...props}>
      <div className="flex flex-wrap items-start justify-between gap-2">
        <div className="flex items-center gap-2">
          <ChangelogVersion version={entry.version} type={entry.type} />
          <span className="text-sm text-muted-foreground">{entry.date}</span>
        </div>
        {entry.type && (
          <ChangelogTypeBadge type={entry.type} />
        )}
      </div>
      <h4 className="mt-2 font-medium">{entry.title}</h4>
      {showDescription && entry.description && (
        <p className="mt-1 text-sm text-muted-foreground">{entry.description}</p>
      )}
      {entry.items && entry.items.length > 0 && (
        <ul className="mt-3 space-y-1">
          {entry.items.map((item, index) => (
            <li key={index} className="flex items-start gap-2 text-sm">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-muted-foreground" aria-hidden="true" />
              <span className="text-muted-foreground">{item}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function ChangelogVersion({ version, type }: { version: string; type?: ChangelogEntry["type"] }) {
  return (
    <code className={cn(
      "rounded px-1.5 py-0.5 font-mono text-sm font-semibold",
      type === "breaking" && "bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300",
      type === "major" && "bg-purple-100 text-purple-800 dark:bg-purple-900/50 dark:text-purple-300",
      type === "minor" && "bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300",
      type === "patch" && "bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300",
      type === "security" && "bg-amber-100 text-amber-800 dark:bg-amber-900/50 dark:text-amber-300",
      !type && "bg-muted text-muted-foreground"
    )}>
      v{version}
    </code>
  );
}

function ChangelogTypeBadge({ type }: { type: NonNullable<ChangelogEntry["type"]> }) {
  const variants: Record<typeof type, { label: string; variant: "default" | "secondary" | "outline" | "destructive" }> = {
    breaking: { label: "Breaking", variant: "destructive" },
    major: { label: "Major", variant: "default" },
    minor: { label: "Minor", variant: "secondary" },
    patch: { label: "Patch", variant: "outline" },
    security: { label: "Security", variant: "default" },
  };

  const { label, variant } = variants[type];

  return (
    <Badge variant={variant} className="text-xs">
      {label}
    </Badge>
  );
}

export { Changelog, ChangelogGroup, ChangelogItem };
