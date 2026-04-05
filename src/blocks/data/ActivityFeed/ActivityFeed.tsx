import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/Card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/Avatar";
import { Button } from "@/components/Button";
import { cn } from "@/lib/utils";

export type ActivityType = "create" | "update" | "delete" | "share" | "comment" | "like" | "custom";

export interface ActivityItem {
  id: string;
  type?: ActivityType;
  icon?: React.ReactNode;
  title: string;
  description?: string;
  timestamp: Date | string;
  user?: {
    name: string;
    avatar?: string;
    email?: string;
  };
  link?: {
    label: string;
    href: string;
  };
  customIcon?: React.ReactNode;
}

export interface ActivityFeedProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  description?: string;
  activities: ActivityItem[];
  maxItems?: number;
  showViewAll?: boolean;
  onViewAll?: () => void;
  viewAllLabel?: string;
  emptyMessage?: string;
  renderTimestamp?: (timestamp: Date | string) => string;
  loading?: boolean;
}

const defaultTypeIcons: Record<ActivityType, React.ReactNode> = {
  create: (
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14" />
      <path d="M12 5v14" />
    </svg>
  ),
  update: (
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 20h9" />
      <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" />
    </svg>
  ),
  delete: (
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 6h18" />
      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
    </svg>
  ),
  share: (
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="18" cy="5" r="3" />
      <circle cx="6" cy="12" r="3" />
      <circle cx="18" cy="19" r="3" />
      <line x1="8.59" x2="15.42" y1="13.51" y2="17.49" />
      <line x1="15.41" x2="8.59" y1="6.51" y2="10.49" />
    </svg>
  ),
  comment: (
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  ),
  like: (
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
    </svg>
  ),
  custom: null,
};

const typeColors: Record<ActivityType, string> = {
  create: "bg-emerald-50 text-emerald-600 dark:bg-emerald-950/30 dark:text-emerald-400",
  update: "bg-blue-50 text-blue-600 dark:bg-blue-950/30 dark:text-blue-400",
  delete: "bg-red-50 text-red-600 dark:bg-red-950/30 dark:text-red-400",
  share: "bg-purple-50 text-purple-600 dark:bg-purple-950/30 dark:text-purple-400",
  comment: "bg-amber-50 text-amber-600 dark:bg-amber-950/30 dark:text-amber-400",
  like: "bg-rose-50 text-rose-600 dark:bg-rose-950/30 dark:text-rose-400",
  custom: "bg-muted text-muted-foreground",
};

function formatRelativeTime(timestamp: Date | string): string {
  const date = typeof timestamp === "string" ? new Date(timestamp) : timestamp;
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffSecs = Math.round(diffMs / 1000);
  const diffMins = Math.round(diffSecs / 60);
  const diffHours = Math.round(diffMins / 60);
  const diffDays = Math.round(diffHours / 24);

  if (diffSecs < 60) return "just now";
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays === 1) return "yesterday";
  if (diffDays < 7) return `${diffDays}d ago`;
  return date.toLocaleDateString();
}

function ActivityFeed({
  title,
  description,
  activities,
  maxItems,
  showViewAll = false,
  onViewAll,
  viewAllLabel = "View all activity",
  emptyMessage = "No recent activity",
  renderTimestamp = formatRelativeTime,
  loading = false,
  className,
  ref,
  ...props
}: ActivityFeedProps & { ref?: React.Ref<HTMLDivElement> }) {
  const displayActivities = maxItems ? activities.slice(0, maxItems) : activities;
  const hasMore = maxItems ? activities.length > maxItems : false;

  if (loading) {
    return (
      <Card ref={ref} className={className} {...props}>
        {(title || description) && (
          <CardHeader>
            {title && <CardTitle>{title}</CardTitle>}
            {description && <CardDescription>{description}</CardDescription>}
          </CardHeader>
        )}
        <CardContent>
          <div className="space-y-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="h-8 w-8 animate-pulse rounded-full bg-muted" />
                <div className="flex-1 space-y-2">
                  <div className="h-4 w-3/4 animate-pulse rounded bg-muted" />
                  <div className="h-3 w-1/2 animate-pulse rounded bg-muted" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card ref={ref} className={className} {...props}>
      {(title || description) && (
        <CardHeader>
          {title && <CardTitle>{title}</CardTitle>}
          {description && <CardDescription>{description}</CardDescription>}
        </CardHeader>
      )}
      <CardContent className={!title && !description ? "pt-6" : undefined}>
        {displayActivities.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-muted">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-muted-foreground">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              </svg>
            </div>
            <p className="text-sm text-muted-foreground">{emptyMessage}</p>
          </div>
        ) : (
          <div className="space-y-4">
            {displayActivities.map((activity) => {
              const icon = activity.customIcon ?? (activity.type ? defaultTypeIcons[activity.type] : null);
              const iconBg = activity.type ? typeColors[activity.type] : typeColors.custom;

              return (
                <div key={activity.id} className="flex items-start gap-3">
                  {activity.user ? (
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={activity.user.avatar} alt={activity.user.name} />
                      <AvatarFallback>{activity.user.name.slice(0, 2).toUpperCase()}</AvatarFallback>
                    </Avatar>
                  ) : (
                    icon && (
                      <div className={cn("flex h-8 w-8 shrink-0 items-center justify-center rounded-full", iconBg)}>
                        {icon}
                      </div>
                    )
                  )}
                  <div className="flex-1 space-y-0.5">
                    <p className="text-sm">
                      <span className="font-medium">
                        {activity.user ? activity.user.name : activity.title}
                      </span>
                      {activity.user && activity.description && (
                        <span className="text-muted-foreground"> {activity.description}</span>
                      )}
                      {!activity.user && !activity.description && (
                        <span className="text-muted-foreground"> {activity.title}</span>
                      )}
                      {activity.link && (
                        <a href={activity.link.href} className="ml-1 font-medium text-primary hover:underline">
                          {activity.link.label}
                        </a>
                      )}
                    </p>
                    {activity.user && activity.description && (
                      <p className="text-xs text-muted-foreground">{activity.title}</p>
                    )}
                    <p className="text-xs text-muted-foreground">{renderTimestamp(activity.timestamp)}</p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </CardContent>
      {(showViewAll || hasMore) && (
        <CardFooter className="border-t border-border/50 pt-4">
          <Button variant="ghost" className="w-full" onClick={onViewAll}>
            {viewAllLabel}
          </Button>
        </CardFooter>
      )}
    </Card>
  );
}
ActivityFeed.displayName = "ActivityFeed";

export { ActivityFeed };
