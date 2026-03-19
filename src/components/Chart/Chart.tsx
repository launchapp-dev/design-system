import * as React from "react";
import {
  ResponsiveContainer,
  LineChart as RechartsLineChart,
  BarChart as RechartsBarChart,
  AreaChart as RechartsAreaChart,
  PieChart as RechartsPieChart,
} from "recharts";
import { cn } from "../../lib/utils";

export type ChartConfig = Record<string, { label?: string; color?: string }>;

export interface ChartContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  config?: ChartConfig;
  children: React.ReactElement;
  height?: number | string;
  aspect?: number;
  minHeight?: number | string;
  "aria-label"?: string;
  "aria-labelledby"?: string;
}

const ChartContainer = React.forwardRef<HTMLDivElement, ChartContainerProps>(
  ({ config, children, className, height = 300, aspect, minHeight, style, "aria-label": ariaLabel, "aria-labelledby": ariaLabelledBy, ...props }, ref) => {
    const cssVars = React.useMemo(() => {
      if (!config) return {};
      return Object.fromEntries(
        Object.entries(config).map(([key, { color }]) => [
          `--color-${key}`,
          color ?? "hsl(var(--ag-chart-1))",
        ])
      );
    }, [config]);

    const autoLabel = React.useMemo(() => {
      if (ariaLabel || ariaLabelledBy || !config) return undefined;
      const labels = Object.values(config)
        .map((v) => v.label)
        .filter(Boolean);
      return labels.length > 0 ? `Chart: ${labels.join(", ")}` : "Chart";
    }, [ariaLabel, ariaLabelledBy, config]);

    return (
      <div
        ref={ref}
        role="img"
        aria-label={ariaLabel ?? autoLabel}
        aria-labelledby={ariaLabelledBy}
        className={cn("w-full", className)}
        style={{ ...(cssVars as React.CSSProperties), ...style }}
        {...props}
      >
        <ResponsiveContainer width="100%" height={height} minHeight={minHeight} aspect={aspect}>
          {children}
        </ResponsiveContainer>
      </div>
    );
  }
);
ChartContainer.displayName = "ChartContainer";

export type LineChartProps = React.ComponentProps<typeof RechartsLineChart>;
export type BarChartProps = React.ComponentProps<typeof RechartsBarChart>;
export type AreaChartProps = React.ComponentProps<typeof RechartsAreaChart>;
export type PieChartProps = React.ComponentProps<typeof RechartsPieChart>;

function LineChart(props: LineChartProps) {
  return <RechartsLineChart {...props} />;
}
LineChart.displayName = "LineChart";

function BarChart(props: BarChartProps) {
  return <RechartsBarChart {...props} />;
}
BarChart.displayName = "BarChart";

function AreaChart(props: AreaChartProps) {
  return <RechartsAreaChart {...props} />;
}
AreaChart.displayName = "AreaChart";

function PieChart(props: PieChartProps) {
  return <RechartsPieChart {...props} />;
}
PieChart.displayName = "PieChart";

export const CHART_COLORS = [
  "hsl(var(--ag-chart-1))",
  "hsl(var(--ag-chart-2))",
  "hsl(var(--ag-chart-3))",
  "hsl(var(--ag-chart-4))",
  "hsl(var(--ag-chart-5))",
] as const;

export { ChartContainer, LineChart, BarChart, AreaChart, PieChart };
