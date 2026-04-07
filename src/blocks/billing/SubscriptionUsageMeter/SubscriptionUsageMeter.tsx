import * as React from "react";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/Card";
import { Progress } from "@/components/Progress";
import { Badge } from "@/components/Badge";
import { Button } from "@/components/Button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/Tooltip";

export type UsagePeriod = "current" | "previous" | "projected";

export interface UsageMetric {
  id: string;
  label: string;
  used: number;
  limit: number;
  unit?: string;
  period?: UsagePeriod;
  warningThreshold?: number;
  onUpgradeClick?: () => void;
}

export interface SubscriptionUsageMeterProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "children"> {
  planName: string;
  metrics: UsageMetric[];
  billingCycle?: "monthly" | "yearly";
  onUpgrade?: (metricId: string) => void;
  showPeriodBadge?: boolean;
  title?: string;
}

function formatNumber(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}k`;
  return String(n);
}

function getUsagePercent(used: number, limit: number): number {
  if (limit <= 0) return 0;
  return Math.min(100, Math.round((used / limit) * 100));
}

function getUsageColor(percent: number, warningThreshold = 80): string {
  if (percent >= 100) return "text-destructive";
  if (percent >= warningThreshold) return "text-orange-500 dark:text-orange-400";
  return "text-primary";
}

function MetricRow({
  metric,
}: {
  metric: UsageMetric;
}) {
  const percent = getUsagePercent(metric.used, metric.limit);
  const isOver = percent >= 100;
  const isWarning = percent >= (metric.warningThreshold ?? 80) && !isOver;

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-sm">
        <div className="flex items-center gap-2">
          <span className="font-medium">{metric.label}</span>
          {metric.period && metric.period !== "current" && (
            <Badge variant="secondary" className="text-[10px]">
              {metric.period}
            </Badge>
          )}
          {isWarning && (
            <Tooltip>
              <TooltipTrigger asChild>
                <svg
                  className="h-4 w-4 shrink-0 text-orange-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
              </TooltipTrigger>
              <TooltipContent>
                Near usage limit — consider upgrading.
              </TooltipContent>
            </Tooltip>
          )}
          {isOver && (
            <Tooltip>
              <TooltipTrigger asChild>
                <svg
                  className="h-4 w-4 shrink-0 text-destructive"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </TooltipTrigger>
              <TooltipContent>Usage limit reached.</TooltipContent>
            </Tooltip>
          )}
        </div>
        <div className="flex items-center gap-1.5">
          <span className={cn("font-semibold tabular-nums", getUsageColor(percent, metric.warningThreshold))}>
            {formatNumber(metric.used)}
          </span>
          <span className="text-muted-foreground">/</span>
          <span className="text-muted-foreground tabular-nums">
            {formatNumber(metric.limit)}
            {metric.unit && <span className="ml-0.5 text-xs">{metric.unit}</span>}
          </span>
          <span className={cn("ml-1 text-xs tabular-nums", getUsageColor(percent, metric.warningThreshold))}>
            {percent}%
          </span>
        </div>
      </div>
      <Progress
        value={percent}
        size="sm"
        aria-label={`${metric.label}: ${metric.used} of ${metric.limit} used`}
        className={cn(
          isOver && "[&>div]:bg-destructive",
          isWarning && "[&>div]:bg-orange-500 dark:[&>div]:bg-orange-400",
        )}
      />
    </div>
  );
}

export function SubscriptionUsageMeter({
  planName,
  metrics,
  billingCycle = "monthly",
  onUpgrade,
  showPeriodBadge = true,
  title = "Usage",
  className,
  ...props
}: SubscriptionUsageMeterProps) {
  const totalPercent = React.useMemo(() => {
    if (metrics.length === 0) return 0;
    const sum = metrics.reduce((acc, m) => acc + getUsagePercent(m.used, m.limit), 0);
    return Math.round(sum / metrics.length);
  }, [metrics]);

  const hasAnyWarning = metrics.some(
    (m) => getUsagePercent(m.used, m.limit) >= (m.warningThreshold ?? 80)
  );

  return (
    <div className={cn("space-y-4", className)} {...props}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h3 className="text-base font-semibold">{title}</h3>
          <Badge variant="outline">{planName}</Badge>
          {showPeriodBadge && (
            <Badge variant="secondary" className="text-xs">
              {billingCycle}
            </Badge>
          )}
        </div>
        <div className="flex items-center gap-1.5 text-sm">
          <span className="text-muted-foreground">Overall:</span>
          <span
            className={cn(
              "font-semibold tabular-nums",
              totalPercent >= 100
                ? "text-destructive"
                : totalPercent >= 80
                  ? "text-orange-500 dark:text-orange-400"
                  : "text-primary"
            )}
          >
            {totalPercent}%
          </span>
        </div>
      </div>

      <Card>
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-sm font-medium">Current Period</CardTitle>
            {hasAnyWarning && (
              <Button
                size="sm"
                variant="outline"
                className="h-7 text-xs"
                onClick={() => onUpgrade?.("general")}
              >
                Upgrade plan
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent className="space-y-5">
          {metrics.map((metric) => (
            <MetricRow
              key={metric.id}
              metric={metric}
            />
          ))}
        </CardContent>
      </Card>
    </div>
  );
}

SubscriptionUsageMeter.displayName = "SubscriptionUsageMeter";

export { SubscriptionUsageMeter };
