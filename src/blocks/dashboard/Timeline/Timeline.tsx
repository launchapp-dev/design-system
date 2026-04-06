import type * as React from "react";
import { cn } from "@/lib/utils";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/Avatar";
import { Badge } from "@/components/Badge";

export interface TimelineEntry {
  id: string;
  title: string;
  description?: string;
  timestamp: string;
  icon?: React.ReactNode;
  avatarSrc?: string;
  avatarFallback?: string;
  badge?: string;
  badgeVariant?: "default" | "secondary" | "destructive" | "outline";
  onClick?: () => void;
}

export interface TimelineProps extends React.HTMLAttributes<HTMLDivElement> {
  entries: TimelineEntry[];
  showDates?: boolean;
  compact?: boolean;
}

const DotIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="8"
    height="8"
    viewBox="0 0 8 8"
    fill="currentColor"
    aria-hidden="true"
  >
    <circle cx="4" cy="4" r="4" />
  </svg>
);

function Timeline({
  entries,
  showDates = false,
  compact = false,
  className,
  ...props
}: TimelineProps) {
  return (
    <div ref={null} className={cn("relative", className)} {...props}>
      <div className="absolute left-4 top-0 bottom-0 w-px bg-border" aria-hidden="true" />
      <div className="space-y-0">
        {entries.map((entry, _index) => (
          <div key={entry.id} className="relative flex gap-4 pb-6 last:pb-0">
            <div
              className={cn(
                "relative z-10 flex shrink-0 items-center justify-center rounded-full bg-background",
                compact ? "mt-1.5 h-6 w-6" : "mt-2 h-8 w-8",
              )}
            >
              {entry.avatarSrc || entry.avatarFallback ? (
                <Avatar size="sm">
                  {entry.avatarSrc && <AvatarImage src={entry.avatarSrc} alt="" />}
                  <AvatarFallback className="text-[10px]">
                    {entry.avatarFallback ?? ""}
                  </AvatarFallback>
                </Avatar>
              ) : entry.icon ? (
                <span className="text-muted-foreground">{entry.icon}</span>
              ) : (
                <DotIcon />
              )}
            </div>
            <div className={cn("flex flex-col min-w-0 flex-1", compact ? "pt-0.5" : "pt-1")}>
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0 flex-1">
                  <p
                    className={cn("font-medium text-foreground", compact ? "text-sm" : "text-base")}
                  >
                    {entry.title}
                  </p>
                  {entry.description && (
                    <p
                      className={cn(
                        "mt-0.5 text-muted-foreground",
                        compact ? "text-xs" : "text-sm",
                      )}
                    >
                      {entry.description}
                    </p>
                  )}
                </div>
                <div className="flex shrink-0 items-center gap-2">
                  {entry.badge && (
                    <Badge variant={entry.badgeVariant ?? "secondary"} className="text-xs">
                      {entry.badge}
                    </Badge>
                  )}
                  <time className="text-xs text-muted-foreground whitespace-nowrap">
                    {entry.timestamp}
                  </time>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

Timeline.displayName = "Timeline";

export { Timeline };
