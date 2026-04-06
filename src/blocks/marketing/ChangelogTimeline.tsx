import type * as React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../../components/Card";
import { Badge } from "../../components/Badge";
import { Button } from "../../components/Button";
import { Separator } from "../../components/Separator";
import { cn } from "../../lib/utils";

export type ChangelogTag =
  | "breaking"
  | "feature"
  | "fix"
  | "improvement"
  | "security"
  | "deprecation"
  | "performance";

export interface ChangelogEntry {
  id: string;
  version: string;
  date: string;
  title: string;
  description?: string;
  content?: string;
  tags?: ChangelogTag[];
  author?: {
    name: string;
    avatar?: string;
  };
}

export interface ChangelogTimelineProps extends React.HTMLAttributes<HTMLDivElement> {
  entries: ChangelogEntry[];
  title?: string;
  description?: string;
  showSubscribe?: boolean;
  onSubscribe?: () => void;
  onViewAll?: () => void;
  maxEntries?: number;
  emptyState?: React.ReactNode;
}

const tagBadgeVariant: Record<ChangelogTag, "default" | "secondary" | "destructive" | "outline"> = {
  breaking: "destructive",
  feature: "default",
  fix: "secondary",
  improvement: "secondary",
  security: "destructive",
  deprecation: "outline",
  performance: "default",
};

const tagLabel: Record<ChangelogTag, string> = {
  breaking: "Breaking",
  feature: "Feature",
  fix: "Fix",
  improvement: "Improvement",
  security: "Security",
  deprecation: "Deprecated",
  performance: "Performance",
};

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function ChangelogTimelineEntry({ entry, isLast }: { entry: ChangelogEntry; isLast: boolean }) {
  return (
    <div className="relative flex gap-4">
      <div className="flex flex-col items-center">
        <div className="h-3 w-3 rounded-full bg-primary ring-2 ring-background flex-shrink-0 mt-1.5" />
        {!isLast && <div className="w-px flex-1 bg-border mt-2" />}
      </div>
      <div className={cn("pb-8 min-w-0 flex-1", isLast && "pb-0")}>
        <Card>
          <CardHeader className="pb-3">
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <span className="inline-flex items-center rounded-md border bg-background px-2.5 py-0.5 text-xs font-mono font-semibold">
                {entry.version}
              </span>
              <time dateTime={entry.date} className="text-xs text-muted-foreground">
                {formatDate(entry.date)}
              </time>
            </div>
            <CardTitle className="text-base mt-2">{entry.title}</CardTitle>
            {entry.description && <CardDescription>{entry.description}</CardDescription>}
            {entry.tags && entry.tags.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mt-2">
                {entry.tags.map((tag) => (
                  <Badge key={tag} variant={tagBadgeVariant[tag]}>
                    {tagLabel[tag]}
                  </Badge>
                ))}
              </div>
            )}
          </CardHeader>
          {entry.content && (
            <>
              <Separator />
              <CardContent className="pt-4">
                <div
                  className="prose prose-sm dark:prose-invert max-w-none"
                  // biome-ignore lint/security/noDangerouslySetInnerHtml: Content is developer-provided
                  dangerouslySetInnerHTML={{ __html: entry.content }}
                />
              </CardContent>
            </>
          )}
        </Card>
      </div>
    </div>
  );
}

function ChangelogTimeline({
  entries,
  title = "Changelog",
  description = "Stay up to date with the latest updates and improvements.",
  showSubscribe = true,
  onSubscribe,
  onViewAll,
  maxEntries,
  emptyState,
  className,
  ...props
}: ChangelogTimelineProps) {
  const displayEntries = maxEntries ? entries.slice(0, maxEntries) : entries;
  const hasMore = maxEntries && entries.length > maxEntries;

  if (entries.length === 0 && emptyState) {
    return (
      <div className={cn("space-y-6", className)} {...props}>
        {emptyState}
      </div>
    );
  }

  return (
    <div className={cn("space-y-8", className)} {...props}>
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
        <div className="space-y-2">
          <h2 className="text-2xl font-bold tracking-tight">{title}</h2>
          {description && <p className="text-muted-foreground">{description}</p>}
        </div>
        {showSubscribe && (
          <Button variant="outline" onClick={onSubscribe}>
            Subscribe to updates
          </Button>
        )}
      </div>

      <Separator />

      {entries.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No updates yet.</p>
        </div>
      ) : (
        <div className="space-y-0">
          {displayEntries.map((entry, index) => (
            <ChangelogTimelineEntry
              key={entry.id}
              entry={entry}
              isLast={index === displayEntries.length - 1 && !hasMore}
            />
          ))}
        </div>
      )}

      {hasMore && onViewAll && (
        <div className="flex justify-center pt-4">
          <Button variant="outline" onClick={onViewAll}>
            View all {entries.length} updates
          </Button>
        </div>
      )}
    </div>
  );
}

ChangelogTimeline.displayName = "ChangelogTimeline";

export { ChangelogTimeline };
