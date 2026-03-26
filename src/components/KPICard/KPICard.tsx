import * as React from "react";
import { Area, AreaChart, ResponsiveContainer } from "recharts";
import { cn } from "../../lib/utils";

export interface KPICardProps extends React.HTMLAttributes<HTMLDivElement> {
  label: string;
  value: string | number;
  trend?: "up" | "down" | "neutral";
  trendLabel?: string;
  sparklineData?: number[];
  sparklineColor?: string;
}

const KPICard = React.forwardRef<HTMLDivElement, KPICardProps>(
  ({ label,
      value,
      trend,
      trendLabel,
      sparklineData,
      sparklineColor = "hsl(var(--la-chart-1))",
      className,
      ...props }, ref) => {
    const normalizedSparkline = React.useMemo(
      () => sparklineData?.map((v) => ({ value: v })),
      [sparklineData]
    );
    const gradientId = `ag-sparkline-${label.replace(/[^a-z0-9]/gi, "-")}`;

    return (
      <div
        ref={ref}
        className={cn(
          "rounded-lg border border-border bg-card p-6 text-card-foreground shadow-sm",
          className
        )}
        {...props}
      >
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0 space-y-1">
            <p className="truncate text-sm text-muted-foreground">{label}</p>
            <p className="text-3xl font-bold tracking-tight">{value}</p>
          </div>
          {normalizedSparkline && normalizedSparkline.length > 0 && (
            <div className="h-12 w-24 shrink-0" aria-hidden="true">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={normalizedSparkline} margin={{ top: 2, right: 0, left: 0, bottom: 2 }}>
                  <defs>
                    <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={sparklineColor} stopOpacity={0.2} />
                      <stop offset="95%" stopColor={sparklineColor} stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <Area
                    type="monotone"
                    dataKey="value"
                    stroke={sparklineColor}
                    strokeWidth={1.5}
                    fill={`url(#${gradientId})`}
                    dot={false}
                    isAnimationActive={false}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>
        {(trend !== undefined || trendLabel) && (
          <div className="mt-3 flex items-center gap-1">
            {trend && (
              <span
                aria-hidden="true"
                className={cn("text-xs font-medium", {
                  "text-emerald-600 dark:text-emerald-400": trend === "up",
                  "text-destructive": trend === "down",
                  "text-muted-foreground": trend === "neutral",
                })}
              >
                {trend === "up" ? "↑" : trend === "down" ? "↓" : "→"}
              </span>
            )}
            {trendLabel ? (
              <span
                className={cn("text-xs", {
                  "text-emerald-600 dark:text-emerald-400": trend === "up",
                  "text-destructive": trend === "down",
                  "text-muted-foreground": trend === "neutral" || trend === undefined,
                })}
              >
                {trendLabel}
              </span>
            ) : (
              trend && (
                <span className="sr-only">
                  {trend === "up" ? "Trending up" : trend === "down" ? "Trending down" : "Trend neutral"}
                </span>
              )
            )}
          </div>
        )}
      </div>
    );
  }
KPICard.displayName = "KPICard";

export { KPICard };
