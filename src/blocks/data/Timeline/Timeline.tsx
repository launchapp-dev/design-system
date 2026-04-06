import type * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../../lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "../../../components/Avatar";
import { Badge, type BadgeProps } from "../../../components/Badge";

const timelineVariants = cva("relative", {
  variants: {
    size: {
      sm: "text-sm",
      md: "text-base",
      lg: "text-lg",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

export interface TimelineItem {
  id: string;
  date: string;
  title: string;
  description?: string;
  badge?: string;
  badgeVariant?: BadgeProps["variant"];
  icon?: React.ReactNode;
  avatarSrc?: string;
  avatarFallback?: string;
}

export interface TimelineProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof timelineVariants> {
  items: TimelineItem[];
  order?: "chronological" | "reverse";
  compact?: boolean;
}

function Timeline({
  className,
  items,
  order = "chronological",
  compact = false,
  size,
  ref,
  ...props
}: TimelineProps & { ref?: React.Ref<HTMLDivElement> }) {
  const orderedItems = order === "reverse" ? [...items].reverse() : items;

  return (
    <div ref={ref} className={cn(timelineVariants({ size }), className)} {...props}>
      <div className="relative">
        <div className="absolute left-4 top-0 bottom-0 w-px bg-border" aria-hidden="true" />
        <ol className="space-y-0">
          {orderedItems.map((item, index) => {
            const isLast = index === orderedItems.length - 1;
            const hasAvatar = item.avatarSrc !== undefined || item.avatarFallback !== undefined;
            const hasIcon = item.icon !== undefined && !hasAvatar;

            return (
              <li
                key={item.id}
                className={cn("relative pl-12", compact ? "pb-4" : "pb-8", isLast && "pb-0")}
              >
                <div className="absolute left-0 flex h-8 w-8 items-center justify-center">
                  {hasAvatar ? (
                    <Avatar size="sm" className="border-2 border-background ring-1 ring-border">
                      {item.avatarSrc && (
                        <AvatarImage src={item.avatarSrc} alt={item.avatarFallback ?? item.title} />
                      )}
                      <AvatarFallback>{item.avatarFallback ?? "?"}</AvatarFallback>
                    </Avatar>
                  ) : hasIcon ? (
                    <div className="flex h-8 w-8 items-center justify-center rounded-full border border-border bg-background text-muted-foreground">
                      {item.icon}
                    </div>
                  ) : (
                    <div className="h-3 w-3 rounded-full border-2 border-primary bg-background" />
                  )}
                </div>

                <div className={cn("flex flex-col", compact ? "gap-0.5" : "gap-1")}>
                  <div className="flex flex-wrap items-center gap-2">
                    <time className="text-xs text-muted-foreground" dateTime={item.date}>
                      {item.date}
                    </time>
                    {item.badge && (
                      <Badge variant={item.badgeVariant ?? "secondary"} className="text-xs">
                        {item.badge}
                      </Badge>
                    )}
                  </div>
                  <p
                    className={cn(
                      "font-medium leading-snug text-foreground",
                      compact ? "text-sm" : "text-base",
                    )}
                  >
                    {item.title}
                  </p>
                  {item.description && !compact && (
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  )}
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
}

Timeline.displayName = "Timeline";

export { Timeline };
