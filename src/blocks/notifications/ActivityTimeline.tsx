import * as React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/Card";
import { cn } from "@/lib/utils";

export interface TimelineEntry {
  id: string;
  title: string;
  description?: string;
  timestamp: string;
  icon?: React.ReactNode;
  iconClassName?: string;
}

export interface ActivityTimelineProps extends React.HTMLAttributes<HTMLDivElement> {
  items: TimelineEntry[];
  title?: string;
  description?: string;
}

const DefaultIcon = () => (
  <svg
    className="h-3 w-3"
    fill="currentColor"
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    <circle cx="12" cy="12" r="6" />
  </svg>
);

const ActivityTimeline = React.forwardRef<HTMLDivElement, ActivityTimelineProps>(
  ({ items, title, description, className, ...props }, ref) => (
    <Card ref={ref} className={cn("", className)} {...props}>
      {(title || description) && (
        <CardHeader>
          {title && <CardTitle>{title}</CardTitle>}
          {description && <CardDescription>{description}</CardDescription>}
        </CardHeader>
      )}
      <CardContent className={cn(!title && !description ? "pt-6" : "")}>
        <ol role="list" className="space-y-0">
          {items.map((item, index) => (
            <li key={item.id} className="relative flex gap-4">
              {index < items.length - 1 && (
                <div
                  className="absolute left-3.5 top-8 bottom-0 w-px bg-border"
                  aria-hidden="true"
                />
              )}
              <div
                className={cn(
                  "relative flex h-7 w-7 shrink-0 items-center justify-center rounded-full border bg-background text-muted-foreground",
                  item.iconClassName
                )}
              >
                {item.icon ?? <DefaultIcon />}
              </div>
              <div className="min-w-0 flex-1 pb-6">
                <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-0.5">
                  <p className="text-sm font-medium">{item.title}</p>
                  <time className="text-xs text-muted-foreground whitespace-nowrap" dateTime={item.timestamp}>
                    {item.timestamp}
                  </time>
                </div>
                {item.description && (
                  <p className="mt-1 text-sm text-muted-foreground">{item.description}</p>
                )}
              </div>
            </li>
          ))}
        </ol>
      </CardContent>
    </Card>
  )
);
ActivityTimeline.displayName = "ActivityTimeline";

export { ActivityTimeline };
