import type * as React from "react";
import { cn } from "@/lib/utils";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/Avatar";
import { Badge } from "@/components/Badge";
import { Button } from "@/components/Button";

export interface ActivityFeedItem {
  id: string;
  type: "comment" | "update" | "create" | "delete" | "mention" | "status";
  title: string;
  description?: string;
  timestamp: string;
  avatarSrc?: string;
  avatarFallback?: string;
  userName?: string;
  badge?: string;
  badgeVariant?: "default" | "secondary" | "destructive" | "outline";
  href?: string;
}

export interface ActivityFeedProps extends React.HTMLAttributes<HTMLDivElement> {
  items: ActivityFeedItem[];
  title?: string;
  showLoadMore?: boolean;
  onLoadMore?: () => void;
  onItemClick?: (item: ActivityFeedItem) => void;
}

const typeIcons: Record<ActivityFeedItem["type"], React.ReactNode> = {
  comment: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  ),
  update: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M21.5 2v6h-6M2.5 22v-6h6M2 11.5a10 10 0 0 1 18.8-4.3M22 12.5a10 10 0 0 1-18.8 4.2" />
    </svg>
  ),
  create: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M12 5v14M5 12h14" />
    </svg>
  ),
  delete: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
    </svg>
  ),
  mention: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="4" />
      <path d="M16 8v5a3 3 0 0 0 6 0v-1a10 10 0 1 0-3.92 7.94" />
    </svg>
  ),
  status: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  ),
};

const typeColors: Record<ActivityFeedItem["type"], string> = {
  comment: "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/30",
  update: "text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/30",
  create: "text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/30",
  delete: "text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/30",
  mention: "text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-950/30",
  status: "text-slate-600 dark:text-slate-400 bg-slate-50 dark:bg-slate-950/30",
};

function ActivityFeed({
  items,
  title,
  showLoadMore = false,
  onLoadMore,
  onItemClick,
  className,
  ...props
}: ActivityFeedProps) {
  return (
    <div ref={null} className={cn("space-y-3", className)} {...props}>
      {title && <h3 className="text-sm font-semibold text-foreground px-1">{title}</h3>}
      <div className="space-y-2">
        {items.map((item) => (
          <button
            key={item.id}
            onClick={() => onItemClick?.(item)}
            className={cn(
              "w-full flex items-start gap-3 rounded-[--la-radius] p-3 text-left transition-colors hover:bg-[hsl(var(--la-accent))]",
              item.href && "cursor-pointer",
            )}
          >
            <div className="relative shrink-0">
              {item.avatarSrc || item.avatarFallback ? (
                <Avatar size="sm">
                  {item.avatarSrc && <AvatarImage src={item.avatarSrc} alt={item.userName ?? ""} />}
                  <AvatarFallback className="text-xs">{item.avatarFallback ?? ""}</AvatarFallback>
                </Avatar>
              ) : null}
              <div
                className={cn(
                  "absolute -bottom-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full border-2 border-background",
                  typeColors[item.type],
                )}
              >
                {typeIcons[item.type]}
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0">
                  <p className="text-sm font-medium text-foreground leading-tight">{item.title}</p>
                  {item.description && (
                    <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">
                      {item.description}
                    </p>
                  )}
                </div>
                <div className="flex flex-col items-end gap-1 shrink-0">
                  {item.badge && (
                    <Badge variant={item.badgeVariant ?? "secondary"} className="text-[10px]">
                      {item.badge}
                    </Badge>
                  )}
                  <time className="text-xs text-muted-foreground whitespace-nowrap">
                    {item.timestamp}
                  </time>
                </div>
              </div>
            </div>
          </button>
        ))}
      </div>
      {showLoadMore && (
        <div className="pt-2">
          <Button variant="ghost" size="sm" className="w-full" onClick={onLoadMore}>
            Load more
          </Button>
        </div>
      )}
    </div>
  );
}

ActivityFeed.displayName = "ActivityFeed";

export { ActivityFeed };
