import type * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/Card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/Avatar";
import { Badge } from "@/components/Badge";
import { cn } from "@/lib/utils";

export interface TimelineEvent {
  id: string;
  date: string;
  title: string;
  description?: string;
  icon?: React.ReactNode;
  color?: string;
  badge?: string;
  badgeVariant?: "default" | "secondary" | "outline" | "destructive";
  avatarSrc?: string;
  avatarFallback?: string;
  href?: string;
}

export interface TimelineViewProps extends React.HTMLAttributes<HTMLDivElement> {
  events: TimelineEvent[];
  title?: string;
  compact?: boolean;
  onEventClick?: (event: TimelineEvent) => void;
}

function TimelineView({
  events,
  title,
  compact = false,
  onEventClick,
  className,
  ...props
}: TimelineViewProps) {
  return (
    <div ref={null} className={cn("space-y-1", className)} {...props}>
      {title && (
        <CardHeader className="pb-4">
          <CardTitle className="text-base">{title}</CardTitle>
        </CardHeader>
      )}
      <div className="relative">
        {events.map((event, index) => (
          <div key={event.id} className={cn("relative flex gap-4", compact ? "pb-4" : "pb-6")}>
            <div className="flex flex-col items-center">
              <div
                className={cn(
                  "flex items-center justify-center rounded-full border-2",
                  compact ? "h-6 w-6" : "h-8 w-8",
                  event.color ? "" : "border-primary bg-primary text-primary-foreground",
                )}
                style={event.color ? { borderColor: event.color, backgroundColor: event.color } : undefined}
              >
                {event.icon ? (
                  <span className={compact ? "scale-75" : ""}>{event.icon}</span>
                ) : (
                  <div className={cn(!event.color && "text-[10px] font-bold")}>
                    {index + 1}
                  </div>
                )}
              </div>
              {index < events.length - 1 && (
                <div className="w-px flex-1 bg-border mt-1" aria-hidden="true" />
              )}
            </div>
            <div className="flex-1 pt-0.5">
              <button
                onClick={() => onEventClick?.(event)}
                className={cn(
                  "w-full text-left rounded-[--la-radius] p-2 transition-colors hover:bg-[hsl(var(--la-accent))]",
                  event.href && "cursor-pointer",
                )}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <p className={cn("font-medium leading-tight", compact ? "text-sm" : "text-base")}>
                        {event.title}
                      </p>
                      {event.badge && (
                        <Badge variant={event.badgeVariant ?? "secondary"} className="text-[10px] h-4">
                          {event.badge}
                        </Badge>
                      )}
                    </div>
                    {event.description && (
                      <p className={cn("text-muted-foreground mt-1", compact ? "text-xs" : "text-sm")}>
                        {event.description}
                      </p>
                    )}
                  </div>
                  <time className={cn("text-muted-foreground shrink-0", compact ? "text-[10px]" : "text-xs")}>
                    {event.date}
                  </time>
                </div>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

TimelineView.displayName = "TimelineView";

export { TimelineView };
export type { TimelineEvent, TimelineViewProps };