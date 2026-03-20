import * as React from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/Avatar";
import { Badge } from "@/components/Badge";
import { ScrollArea } from "@/components/ScrollArea";
import { Separator } from "@/components/Separator";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/Card";
import { cn } from "@/lib/utils";
import type { BadgeProps } from "@/components/Badge";

export interface ActivityItem {
  id: string;
  user: {
    name: string;
    avatarSrc?: string;
    initials: string;
  };
  description: string;
  timestamp: string;
  actionType: string;
  actionVariant?: BadgeProps["variant"];
}

export interface ActivityFeedProps extends React.HTMLAttributes<HTMLDivElement> {
  items: ActivityItem[];
  title?: string;
  description?: string;
  maxHeight?: number | string;
}

function ActivityFeed({ items, title = "Activity Feed", description, maxHeight = 400, className, ref, ...props }: ActivityFeedProps & { ref?: React.Ref<HTMLDivElement> }) {
  return (
    <Card ref={ref} className={cn("flex flex-col", className)} {...props}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent className="p-0">
        <ScrollArea style={{ maxHeight }} className="px-6 pb-6">
          <ul className="space-y-0" role="list" aria-label={title}>
            {items.map((item, index) => (
              <li key={item.id}>
                <div className="flex items-start gap-3 py-3">
                  <Avatar size="sm" className="mt-0.5 shrink-0">
                    {item.user.avatarSrc && (
                      <AvatarImage src={item.user.avatarSrc} alt={item.user.name} />
                    )}
                    <AvatarFallback>{item.user.initials}</AvatarFallback>
                  </Avatar>
                  <div className="min-w-0 flex-1 space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-sm font-medium leading-none">{item.user.name}</span>
                      <Badge variant={item.actionVariant ?? "secondary"} className="text-xs">
                        {item.actionType}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                    <time
                      className="text-xs text-muted-foreground"
                      dateTime={item.timestamp}
                    >
                      {item.timestamp}
                    </time>
                  </div>
                </div>
                {index < items.length - 1 && <Separator />}
              </li>
            ))}
          </ul>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
ActivityFeed.displayName = "ActivityFeed";

export { ActivityFeed };
