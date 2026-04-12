import type * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/Card";
import { Badge } from "@/components/Badge";
import { cn } from "@/lib/utils";

export interface StatsCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  value: string | number;
  description?: string;
  trend?: {
    direction: "up" | "down" | "neutral";
    value: string;
    label?: string;
  };
  icon?: React.ReactNode;
  footer?: React.ReactNode;
  variant?: "default" | "highlight" | "subtle";
}

function StatsCard({
  title,
  value,
  description,
  trend,
  icon,
  footer,
  variant = "default",
  className,
  ref,
  ...props
}: StatsCardProps & { ref?: React.Ref<HTMLDivElement> }) {
  const trendColors = {
    up: "text-success",
    down: "text-destructive",
    neutral: "text-muted-foreground",
  };

  const trendBg = {
    up: "bg-success/5 dark:bg-success/10",
    down: "bg-destructive/5 dark:bg-destructive/10",
    neutral: "bg-muted",
  };

  const trendIcons = {
    up: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
        <polyline points="17 6 23 6 23 12" />
      </svg>
    ),
    down: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <polyline points="23 18 13.5 8.5 8.5 13.5 1 6" />
        <polyline points="17 18 23 18 23 12" />
      </svg>
    ),
    neutral: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
      </svg>
    ),
  };

  return (
    <Card
      ref={ref}
      className={cn(
        "transition-shadow hover:shadow-md",
        variant === "highlight" && "border-primary/50 bg-primary/5",
        variant === "subtle" && "border-transparent bg-muted/50",
        className,
      )}
      {...props}
    >
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
        {icon && (
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-muted text-muted-foreground">
            {icon}
          </div>
        )}
      </CardHeader>
      <CardContent>
        <div className="space-y-1.5">
          <div className="text-2xl font-bold tracking-tight">{value}</div>
          {description && <p className="text-xs text-muted-foreground">{description}</p>}
          {trend && (
            <div className="flex items-center gap-2 pt-1">
              <Badge
                variant="secondary"
                className={cn(
                  "gap-1 px-1.5 py-0.5 font-medium",
                  trendBg[trend.direction],
                  trendColors[trend.direction],
                )}
              >
                {trendIcons[trend.direction]}
                {trend.value}
              </Badge>
              {trend.label && <span className="text-xs text-muted-foreground">{trend.label}</span>}
            </div>
          )}
        </div>
        {footer && <div className="mt-4 border-t border-border/50 pt-3">{footer}</div>}
      </CardContent>
    </Card>
  );
}
StatsCard.displayName = "StatsCard";

export { StatsCard };
