import type * as React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/Avatar";
import { Badge } from "@/components/Badge";
import { Button } from "@/components/Button";
import { CardHeader, CardTitle } from "@/components/Card";
import { cn } from "@/lib/utils";

export interface StreamEvent {
  id: string;
  actor: {
    name: string;
    avatar?: string;
    initials?: string;
  };
  action: string;
  target?: string;
  timestamp: string;
  metadata?: string;
  type?: "create" | "update" | "delete" | "comment" | "share" | "like" | "publish";
  href?: string;
}

export interface ActivityStreamProps extends React.HTMLAttributes<HTMLDivElement> {
  events: StreamEvent[];
  title?: string;
  showLoadMore?: boolean;
  onLoadMore?: () => void;
  onEventClick?: (event: StreamEvent) => void;
}

const typeActionLabel: Record<NonNullable<StreamEvent["type"]>, string> = {
  create: "created",
  update: "updated",
  delete: "deleted",
  comment: "commented on",
  share: "shared",
  like: "liked",
  publish: "published",
};

const _typeColors: Record<NonNullable<StreamEvent["type"]>, string> = {
  create: "text-success bg-success/5 dark:bg-success/10",
  update: "text-warning dark:text-warning bg-warning/5 dark:bg-warning/10",
  delete: "text-destructive dark:text-destructive bg-destructive/5 dark:bg-destructive/10",
  comment: "text-info dark:text-info bg-info dark:bg-info/30",
  share: "text-primary dark:text-primary bg-primary dark:bg-primary/30",
  like: "text-pink-600 dark:text-pink-400 bg-pink-50 dark:bg-pink-950/30",
  publish: "text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/30",
};

const typeDots: Record<NonNullable<StreamEvent["type"]>, string> = {
  create: "bg-success",
  update: "bg-warning",
  delete: "bg-destructive",
  comment: "bg-info",
  share: "bg-primary",
  like: "bg-pink-500",
  publish: "bg-indigo-500",
};

function ActivityStream({
  events,
  title,
  showLoadMore = false,
  onLoadMore,
  onEventClick,
  className,
  ...props
}: ActivityStreamProps) {
  return (
    <div ref={null} className={cn("space-y-3", className)} {...props}>
      {title && (
        <CardHeader className="pb-2">
          <CardTitle className="text-base">{title}</CardTitle>
        </CardHeader>
      )}
      <div className={cn("relative", !title && "pt-2")}>
        <div className="absolute left-4 top-0 bottom-0 w-px bg-border" aria-hidden="true" />
        <div className="space-y-4">
          {events.map((event, _index) => (
            <div key={event.id} className="relative flex gap-3 pl-8">
              <div
                className={cn(
                  "absolute left-2.5 top-1.5 h-3 w-3 rounded-full border-2 border-background",
                  typeDots[event.type ?? "update"],
                )}
                aria-hidden="true"
              />
              <button
                onClick={() => onEventClick?.(event)}
                className={cn(
                  "flex flex-1 items-start gap-3 rounded-[--la-radius] p-3 text-left transition-colors hover:bg-accent",
                  event.href && "cursor-pointer",
                )}
              >
                <Avatar size="sm" className="shrink-0 mt-0.5">
                  {event.actor.avatar && <AvatarImage src={event.actor.avatar} alt={event.actor.name} />}
                  <AvatarFallback className="text-xs">{event.actor.initials ?? event.actor.name.slice(0, 2).toUpperCase()}</AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-foreground">
                    <span className="font-medium">{event.actor.name}</span>{" "}
                    <span className="text-muted-foreground">{typeActionLabel[event.type ?? "update"]}</span>{" "}
                    {event.target && <span className="font-medium">{event.target}</span>}
                  </p>
                  {event.metadata && (
                    <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">{event.metadata}</p>
                  )}
                  <time className="text-xs text-muted-foreground mt-1 block">{event.timestamp}</time>
                </div>
                {event.type && (
                  <Badge variant="secondary" className="shrink-0 text-[10px]">
                    {event.type}
                  </Badge>
                )}
              </button>
            </div>
          ))}
        </div>
        {showLoadMore && (
          <div className="pt-4 pl-8">
            <Button variant="ghost" size="sm" onClick={onLoadMore} className="w-full">
              Load more
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

ActivityStream.displayName = "ActivityStream";

export { ActivityStream };