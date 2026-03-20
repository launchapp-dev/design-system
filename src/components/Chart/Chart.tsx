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

export interface ChartDataTable {
  headers: string[];
  rows: (string | number | null)[][];
}

export interface ChartContainerProps extends React.HTMLAttributes<HTMLElement> {
  config?: ChartConfig;
  children: React.ReactElement;
  height?: number | string;
  aspect?: number;
  minHeight?: number | string;
  "aria-label"?: string;
  "aria-labelledby"?: string;
  description?: string;
  dataTable?: ChartDataTable;
}

function ChartContainer({ config, children, className, height = 300, aspect, minHeight, style, "aria-label": ariaLabel, "aria-labelledby": ariaLabelledBy, description, dataTable, ref, ...props }: ChartContainerProps & { ref?: React.Ref<HTMLElement> }) {
    const id = React.useId();
    const descId = description ? `${id}-desc` : undefined;
    const tableId = dataTable ? `${id}-table` : undefined;
    const describedBy = [descId, tableId].filter(Boolean).join(" ") || undefined;

    const cssVars = React.useMemo(() => {
      if (!config) return {};
      return Object.fromEntries(
        Object.entries(config).map(([key, { color }]) => [
          `--color-${key}`,
          color ?? "hsl(var(--la-chart-1))",
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

    if (description || dataTable) {
      return (
        <figure
          ref={ref as React.Ref<HTMLElement>}
          className={cn("w-full", className)}
          style={style}
          {...props}
        >
          <div
            role="img"
            aria-label={ariaLabel ?? autoLabel}
            aria-labelledby={ariaLabelledBy}
            aria-describedby={describedBy}
            style={cssVars as React.CSSProperties}
          >
            <ResponsiveContainer width="100%" height={height as number | `${number}%`} minHeight={minHeight} aspect={aspect}>
              {children}
            </ResponsiveContainer>
          </div>
          {description && (
            <figcaption id={descId} className="sr-only">
              {description}
            </figcaption>
          )}
          {dataTable && (
            <table id={tableId} className="sr-only">
              <thead>
                <tr>
                  {dataTable.headers.map((header, i) => (
                    <th key={i} scope="col">{header}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {dataTable.rows.map((row, i) => (
                  <tr key={i}>
                    {row.map((cell, j) => (
                      j === 0
                        ? <th key={j} scope="row">{cell ?? ""}</th>
                        : <td key={j}>{cell ?? ""}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </figure>
      );
    }

    return (
      <div
        ref={ref as React.Ref<HTMLDivElement>}
        role="img"
        aria-label={ariaLabel ?? autoLabel}
        aria-labelledby={ariaLabelledBy}
        className={cn("w-full", className)}
        style={{ ...(cssVars as React.CSSProperties), ...style }}
        {...props}
      >
        <ResponsiveContainer width="100%" height={height as number | `${number}%`} minHeight={minHeight} aspect={aspect}>
          {children}
        </ResponsiveContainer>
      </div>
    );
  }
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
  "hsl(var(--la-chart-1))",
  "hsl(var(--la-chart-2))",
  "hsl(var(--la-chart-3))",
  "hsl(var(--la-chart-4))",
  "hsl(var(--la-chart-5))",
] as const;

export { ChartContainer, LineChart, BarChart, AreaChart, PieChart };
