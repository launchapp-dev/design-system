import * as React from "react";
import { StatDisplay } from "@/components/StatDisplay";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/Card";
import { ChartContainer, AreaChart, Area, XAxis, CartesianGrid, ChartTooltip } from "@/components/Chart";
import { cn } from "@/lib/utils";
import type { KPICardProps } from "@/components/KPICard";

export interface StatsOverviewChartData {
  label: string;
  [key: string]: string | number;
}

export interface StatsOverviewProps extends React.HTMLAttributes<HTMLDivElement> {
  items: KPICardProps[];
  cols?: 2 | 3 | 4;
  title?: string;
  description?: string;
  chartData?: StatsOverviewChartData[];
  chartKeys?: { key: string; color?: string }[];
}

const StatsOverview = React.forwardRef<HTMLDivElement, StatsOverviewProps>(
  ({ items, cols = 4, title, description, chartData, chartKeys, className, ...props }, ref) => (
    <div ref={ref} className={cn("space-y-6", className)} {...props}>
      {(title || description) && (
        <div className="space-y-1">
          {title && <h2 className="text-xl font-semibold tracking-tight">{title}</h2>}
          {description && <p className="text-sm text-muted-foreground">{description}</p>}
        </div>
      )}
      <StatDisplay items={items} cols={cols} />
      {chartData && chartData.length > 0 && chartKeys && chartKeys.length > 0 && (
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer height={180}>
              <AreaChart data={chartData} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
                <defs>
                  {chartKeys.map(({ key, color }, i) => (
                    <linearGradient key={key} id={`gradient-${key}`} x1="0" y1="0" x2="0" y2="1">
                      <stop
                        offset="5%"
                        stopColor={color ?? `hsl(var(--la-chart-${i + 1}))`}
                        stopOpacity={0.2}
                      />
                      <stop
                        offset="95%"
                        stopColor={color ?? `hsl(var(--la-chart-${i + 1}))`}
                        stopOpacity={0}
                      />
                    </linearGradient>
                  ))}
                </defs>
                <CartesianGrid strokeDasharray="3 3" className="stroke-border" vertical={false} />
                <XAxis
                  dataKey="label"
                  tick={{ fontSize: 11, fill: "hsl(var(--la-muted-foreground))" }}
                  tickLine={false}
                  axisLine={false}
                />
                <ChartTooltip
                  contentStyle={{
                    background: "hsl(var(--la-card))",
                    border: "1px solid hsl(var(--la-border))",
                    borderRadius: "var(--la-radius)",
                    fontSize: 12,
                  }}
                />
                {chartKeys.map(({ key, color }, i) => (
                  <Area
                    key={key}
                    type="monotone"
                    dataKey={key}
                    stroke={color ?? `hsl(var(--la-chart-${i + 1}))`}
                    strokeWidth={2}
                    fill={`url(#gradient-${key})`}
                    dot={false}
                    isAnimationActive={false}
                  />
                ))}
              </AreaChart>
            </ChartContainer>
          </CardContent>
        </Card>
      )}
    </div>
  )
);
StatsOverview.displayName = "StatsOverview";

export { StatsOverview };
