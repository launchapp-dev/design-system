import type * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/Card";
import { Badge } from "@/components/Badge";
import { Button } from "@/components/Button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/Avatar";
import { Progress } from "@/components/Progress";
import { Separator } from "@/components/Separator";
import { cn } from "@/lib/utils";

export interface DashboardMetric {
  id: string;
  label: string;
  value: string | number;
  change?: string;
  changeType?: "up" | "down" | "neutral";
  changeLabel?: string;
  icon?: React.ReactNode;
  description?: string;
  progress?: number;
  trend?: Array<{ label: string; value: number }>;
  href?: string;
}

export interface MetricsDashboardProps extends React.HTMLAttributes<HTMLDivElement> {
  metrics: DashboardMetric[];
  title?: string;
  columns?: 1 | 2 | 3 | 4;
  showChange?: boolean;
  showProgress?: boolean;
  compact?: boolean;
}

const upArrowIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <polyline points="18 15 12 9 6 15" />
  </svg>
);

const downArrowIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

const SparklineIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="60" height="20" viewBox="0 0 60 20" fill="none" aria-hidden="true">
    <polyline points="0,18 10,12 20,14 30,8 40,10 50,5 60,7" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

function MetricsDashboard({
  metrics,
  title,
  columns = 4,
  showChange = true,
  showProgress = false,
  compact = false,
  className,
  ...props
}: MetricsDashboardProps) {
  const gridClass = {
    1: "grid-cols-1",
    2: "grid-cols-1 sm:grid-cols-2",
    3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
  }[columns];

  return (
    <div ref={null} className={cn("space-y-4", className)} {...props}>
      {title && (
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold tracking-tight">{title}</h2>
        </div>
      )}
      <div className={cn("grid gap-4", gridClass)}>
        {metrics.map((metric) => (
          <Card
            key={metric.id}
            className={cn(
              "transition-shadow hover:shadow-md",
              (metric.href) && "cursor-pointer",
            )}
          >
            <CardHeader className={compact ? "pb-2" : "flex flex-row items-center justify-between space-y-0 pb-2"}>
              <div className="flex items-center gap-3 min-w-0">
                {metric.icon && (
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-[hsl(var(--la-accent))] text-[hsl(var(--la-accent-foreground))]">
                    {metric.icon}
                  </div>
                )}
                <CardTitle className={cn("font-medium text-muted-foreground", compact ? "text-xs" : "text-sm")}>
                  {metric.label}
                </CardTitle>
              </div>
              {!compact && metric.trend && (
                <div className="text-muted-foreground shrink-0">
                  <SparklineIcon />
                </div>
              )}
            </CardHeader>
            <CardContent className={compact ? "pt-0" : ""}>
              <div className={cn("font-bold tracking-tight", compact ? "text-lg" : "text-2xl")}>
                {metric.value}
              </div>
              {metric.description && (
                <p className="text-xs text-muted-foreground mt-0.5">{metric.description}</p>
              )}
              {showProgress && metric.progress !== undefined && (
                <Progress value={metric.progress} className="mt-3 h-1.5" />
              )}
              {showChange && metric.change && (
                <div className="flex items-center gap-1.5 mt-2">
                  <Badge
                    variant="secondary"
                    className={cn(
                      "gap-1 text-xs font-medium",
                      metric.changeType === "up" && "text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/30",
                      metric.changeType === "down" && "text-destructive bg-red-50 dark:bg-red-950/30",
                      metric.changeType === "neutral" && "text-muted-foreground",
                    )}
                  >
                    {metric.changeType === "up" && upArrowIcon}
                    {metric.changeType === "down" && downArrowIcon}
                    {metric.change}
                  </Badge>
                  {metric.changeLabel && (
                    <span className="text-xs text-muted-foreground">{metric.changeLabel}</span>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

MetricsDashboard.displayName = "MetricsDashboard";

export { MetricsDashboard };
export type { DashboardMetric, MetricsDashboardProps };