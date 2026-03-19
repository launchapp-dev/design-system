import * as React from "react";
import { Card, CardContent } from "@/components/Card";
import { ChartContainer, AreaChart, Area } from "@/components/Chart";
import { cn } from "@/lib/utils";

export interface MetricCardItem {
  id: string;
  label: string;
  value: string | number;
  trend?: "up" | "down" | "neutral";
  trendValue?: string;
  sparklineData?: number[];
  sparklineColor?: string;
}

export interface MetricCardsProps extends React.HTMLAttributes<HTMLDivElement> {
  items: MetricCardItem[];
}

const trendIcon = (trend: MetricCardItem["trend"]) => {
  if (trend === "up") return "↑";
  if (trend === "down") return "↓";
  return "→";
};

const trendClass = (trend: MetricCardItem["trend"]) => {
  if (trend === "up") return "text-emerald-600 dark:text-emerald-400";
  if (trend === "down") return "text-destructive";
  return "text-muted-foreground";
};

const MetricCards = React.forwardRef<HTMLDivElement, MetricCardsProps>(
  ({ items, className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4",
        className
      )}
      {...props}
    >
      {items.map((item) => {
        const normalizedData = item.sparklineData?.map((v) => ({ value: v }));
        const color = item.sparklineColor ?? "hsl(var(--ag-chart-1))";
        const gradientId = `mc-gradient-${item.id}`;

        return (
          <Card key={item.id} className="flex flex-col">
            <CardContent className="flex flex-col gap-2 p-4">
              <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                {item.label}
              </p>
              <div className="flex items-end justify-between gap-2">
                <div className="space-y-1">
                  <p className="text-2xl font-bold tracking-tight">{item.value}</p>
                  {item.trend !== undefined && (
                    <div className="flex items-center gap-1">
                      <span className={cn("text-xs font-medium", trendClass(item.trend))}>
                        {trendIcon(item.trend)}
                      </span>
                      {item.trendValue && (
                        <span className={cn("text-xs", trendClass(item.trend))}>
                          {item.trendValue}
                        </span>
                      )}
                    </div>
                  )}
                </div>
                {normalizedData && normalizedData.length > 0 && (
                  <div className="h-10 w-20 flex-shrink-0">
                    <ChartContainer height="100%">
                      <AreaChart
                        data={normalizedData}
                        margin={{ top: 2, right: 0, left: 0, bottom: 2 }}
                      >
                        <defs>
                          <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor={color} stopOpacity={0.2} />
                            <stop offset="95%" stopColor={color} stopOpacity={0} />
                          </linearGradient>
                        </defs>
                        <Area
                          type="monotone"
                          dataKey="value"
                          stroke={color}
                          strokeWidth={1.5}
                          fill={`url(#${gradientId})`}
                          dot={false}
                          isAnimationActive={false}
                        />
                      </AreaChart>
                    </ChartContainer>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  )
);
MetricCards.displayName = "MetricCards";

export { MetricCards };
