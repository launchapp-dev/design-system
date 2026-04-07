import type * as React from "react";
import { cn } from "@/lib/utils";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/Card";
import { Checkbox } from "@/components/Checkbox";
import { Progress } from "@/components/Progress";
import { Badge } from "@/components/Badge";

export interface ChecklistLinkItem {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  href?: string;
  external?: boolean;
  tag?: string;
}

export interface ChecklistSection {
  title?: string;
  items: ChecklistLinkItem[];
}

export interface ChecklistWithLinksProps extends React.HTMLAttributes<HTMLDivElement> {
  sections?: ChecklistSection[];
  items?: ChecklistLinkItem[];
  title?: string;
  description?: string;
  onItemToggle?: (id: string, completed: boolean) => void;
  onItemClick?: (item: ChecklistLinkItem) => void;
}

function ChecklistWithLinks({
  sections = [],
  items = [],
  title = "Checklist",
  description,
  onItemToggle,
  onItemClick,
  className,
  ...props
}: ChecklistWithLinksProps) {
  const allItems = sections.length > 0
    ? sections.flatMap((s) => s.items)
    : items;

  const completedCount = allItems.filter((item) => item.completed).length;
  const progress = allItems.length > 0
    ? Math.round((completedCount / allItems.length) * 100)
    : 0;
  const allComplete = completedCount === allItems.length;

  const handleClick = (item: ChecklistLinkItem, e: React.MouseEvent) => {
    if (item.href) {
      onItemClick?.(item);
    }
  };

  return (
    <Card ref={null} className={cn("", className)} {...props}>
      <CardHeader>
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <CardTitle>{title}</CardTitle>
            {description && (
              <CardDescription className="mt-1">{description}</CardDescription>
            )}
          </div>
          {allComplete && (
            <Badge variant="default" className="shrink-0">
              Complete!
            </Badge>
          )}
        </div>
        {allItems.length > 0 && (
          <div className="mt-4 space-y-1.5">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">
                {completedCount} of {allItems.length} done
              </span>
              <span className="font-medium">{progress}%</span>
            </div>
            <Progress value={progress} aria-label={`${progress}% complete`} />
          </div>
        )}
      </CardHeader>
      <CardContent>
        {sections.length > 0 ? (
          <div className="space-y-6">
            {sections.map((section, sIdx) => (
              <div key={section.title || `section-${sIdx}`}>
                {section.title && (
                  <h4 className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    {section.title}
                  </h4>
                )}
                <ul role="list" className="space-y-2">
                  {section.items.map((item) => (
                    <ChecklistRow
                      key={item.id}
                      item={item}
                      onToggle={onItemToggle}
                      onClick={handleClick}
                    />
                  ))}
                </ul>
              </div>
            ))}
          </div>
        ) : (
          <ul role="list" className="space-y-2">
            {items.map((item) => (
              <ChecklistRow
                key={item.id}
                item={item}
                onToggle={onItemToggle}
                onClick={handleClick}
              />
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  );
}

function ChecklistRow({
  item,
  onToggle,
  onClick,
}: {
  item: ChecklistLinkItem;
  onToggle?: (id: string, completed: boolean) => void;
  onClick?: (item: ChecklistLinkItem, e: React.MouseEvent) => void;
}) {
  return (
    <li>
      <div
        className={cn(
          "group flex items-start gap-3 rounded-md border p-3 transition-colors",
          item.completed ? "border-border bg-muted/40" : "border-border bg-background",
        )}
      >
        <Checkbox
          id={`checklist-link-${item.id}`}
          checked={item.completed}
          onCheckedChange={(checked) => onToggle?.(item.id, checked === true)}
          aria-label={item.title}
          className="mt-0.5 shrink-0"
        />
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <label
              htmlFor={`checklist-link-${item.id}`}
              className={cn(
                "text-sm font-medium leading-none cursor-pointer",
                item.completed && "text-muted-foreground line-through",
              )}
            >
              {item.title}
            </label>
            {item.tag && (
              <Badge variant="outline" className="text-xs">
                {item.tag}
              </Badge>
            )}
          </div>
          {item.description && (
            <p className="mt-1 text-xs text-muted-foreground">{item.description}</p>
          )}
          {item.href && (
            <button
              type="button"
              onClick={(e) => onClick?.(item, e)}
              className="mt-2 text-xs text-primary hover:underline focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring rounded"
            >
              {item.external ? "Open in new tab" : "Go to step"}{" "}
              <span aria-hidden="true">→</span>
            </button>
          )}
        </div>
      </div>
    </li>
  );
}

ChecklistWithLinks.displayName = "ChecklistWithLinks";

export { ChecklistWithLinks };
