import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";

const sparklineVariants = cva("inline-block", {
  variants: {
    size: {
      sm: "h-4 w-12",
      md: "h-6 w-20",
      lg: "h-8 w-28",
    },
    colorScheme: {
      primary:
        "[&_.sparkline-line]:stroke-primary [&_.sparkline-area]:fill-primary [&_.sparkline-point]:fill-primary",
      secondary:
        "[&_.sparkline-line]:stroke-secondary-foreground [&_.sparkline-area]:fill-secondary-foreground [&_.sparkline-point]:fill-secondary-foreground",
      destructive:
        "[&_.sparkline-line]:stroke-destructive [&_.sparkline-area]:fill-destructive [&_.sparkline-point]:fill-destructive",
      muted:
        "[&_.sparkline-line]:stroke-muted-foreground [&_.sparkline-area]:fill-muted-foreground [&_.sparkline-point]:fill-muted-foreground",
      accent:
        "[&_.sparkline-line]:stroke-accent-foreground [&_.sparkline-area]:fill-accent-foreground [&_.sparkline-point]:fill-accent-foreground",
      success:
        "[&_.sparkline-line]:stroke-[hsl(var(--la-chart-3))] [&_.sparkline-area]:fill-[hsl(var(--la-chart-3))] [&_.sparkline-point]:fill-[hsl(var(--la-chart-3))]",
      warning:
        "[&_.sparkline-line]:stroke-[hsl(var(--la-chart-4))] [&_.sparkline-area]:fill-[hsl(var(--la-chart-4))] [&_.sparkline-point]:fill-[hsl(var(--la-chart-4))]",
      chart1:
        "[&_.sparkline-line]:stroke-chart-1 [&_.sparkline-area]:fill-chart-1 [&_.sparkline-point]:fill-chart-1",
      chart2:
        "[&_.sparkline-line]:stroke-chart-2 [&_.sparkline-area]:fill-chart-2 [&_.sparkline-point]:fill-chart-2",
      chart3:
        "[&_.sparkline-line]:stroke-chart-3 [&_.sparkline-area]:fill-chart-3 [&_.sparkline-point]:fill-chart-3",
      chart4:
        "[&_.sparkline-line]:stroke-chart-4 [&_.sparkline-area]:fill-chart-4 [&_.sparkline-point]:fill-chart-4",
      chart5:
        "[&_.sparkline-line]:stroke-chart-5 [&_.sparkline-area]:fill-chart-5 [&_.sparkline-point]:fill-chart-5",
    },
  },
  defaultVariants: {
    size: "md",
    colorScheme: "primary",
  },
});

export interface SparklineProps
  extends Omit<React.SVGAttributes<SVGSVGElement>, "color">,
    VariantProps<typeof sparklineVariants> {
  data: number[];
  width?: number;
  height?: number;
  strokeWidth?: number;
  showArea?: boolean;
  showPoints?: boolean;
  pointRadius?: number;
  curveType?: "linear" | "smooth" | "step";
  "aria-label"?: string;
}

function Sparkline({
  data,
  width,
  height,
  strokeWidth = 1.5,
  showArea = false,
  showPoints = false,
  pointRadius = 1.5,
  curveType = "smooth",
  size,
  colorScheme,
  className,
  "aria-label": ariaLabel,
  ref,
  ...props
}: SparklineProps & { ref?: React.Ref<SVGSVGElement> }) {
  const svgRef = ref || React.useRef<SVGSVGElement>(null);

  const defaultWidth = size === "sm" ? 48 : size === "lg" ? 112 : 80;
  const defaultHeight = size === "sm" ? 16 : size === "lg" ? 32 : 24;

  const svgWidth = width ?? defaultWidth;
  const svgHeight = height ?? defaultHeight;

  const padding = Math.max(strokeWidth, pointRadius) + 1;

  const chartWidth = svgWidth - padding * 2;
  const chartHeight = svgHeight - padding * 2;

  const { path, areaPath, points } = React.useMemo(() => {
    if (!data || data.length === 0) {
      return { path: "", areaPath: "", points: [] };
    }

    const min = Math.min(...data);
    const max = Math.max(...data);
    const range = max - min || 1;

    const xStep = chartWidth / Math.max(data.length - 1, 1);

    const coordinates = data.map((value, index) => ({
      x: padding + index * xStep,
      y: padding + chartHeight - ((value - min) / range) * chartHeight,
    }));

    let pathD = "";
    let areaD = "";

    if (curveType === "smooth" && coordinates.length > 2) {
      pathD = coordinates.reduce((acc, point, i) => {
        if (i === 0) return `M ${point.x} ${point.y}`;

        const prev = coordinates[i - 1];
        const cp1x = prev.x + (point.x - prev.x) / 3;
        const cp1y = prev.y;
        const cp2x = prev.x + (point.x - prev.x) / 3;
        const cp2y = point.y;

        return `${acc} C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${point.x} ${point.y}`;
      }, "");
    } else if (curveType === "step") {
      pathD = coordinates.reduce((acc, point, i) => {
        if (i === 0) return `M ${point.x} ${point.y}`;
        const prev = coordinates[i - 1];
        return `${acc} L ${point.x} ${prev.y} L ${point.x} ${point.y}`;
      }, "");
    } else {
      pathD = coordinates
        .map((point, i) => `${i === 0 ? "M" : "L"} ${point.x} ${point.y}`)
        .join(" ");
    }

    if (showArea && coordinates.length > 0) {
      const baseline = padding + chartHeight;
      if (curveType === "smooth" && coordinates.length > 2) {
        const smoothPath = coordinates.reduce((acc, point, i) => {
          if (i === 0) return `M ${point.x} ${point.y}`;

          const prev = coordinates[i - 1];
          const cp1x = prev.x + (point.x - prev.x) / 3;
          const cp1y = prev.y;
          const cp2x = prev.x + (point.x - prev.x) / 3;
          const cp2y = point.y;

          return `${acc} C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${point.x} ${point.y}`;
        }, "");

        const lastCoord = coordinates[coordinates.length - 1];
        const firstCoord = coordinates[0];
        areaD = `${smoothPath} L ${lastCoord.x} ${baseline} L ${firstCoord.x} ${baseline} Z`;
      } else if (curveType === "step") {
        const stepPath = coordinates.reduce((acc, point, i) => {
          if (i === 0) return `M ${point.x} ${point.y}`;
          const prev = coordinates[i - 1];
          return `${acc} L ${point.x} ${prev.y} L ${point.x} ${point.y}`;
        }, "");
        const lastCoord = coordinates[coordinates.length - 1];
        const firstCoord = coordinates[0];
        areaD = `${stepPath} L ${lastCoord.x} ${baseline} L ${firstCoord.x} ${baseline} Z`;
      } else {
        const lastCoord = coordinates[coordinates.length - 1];
        const firstCoord = coordinates[0];
        areaD = `${pathD} L ${lastCoord.x} ${baseline} L ${firstCoord.x} ${baseline} Z`;
      }
    }

    return { path: pathD, areaPath: areaD, points: coordinates };
  }, [data, chartWidth, chartHeight, padding, curveType, showArea]);

  const autoAriaLabel = React.useMemo(() => {
    if (ariaLabel) return ariaLabel;
    if (!data || data.length === 0) return "Empty sparkline";

    const min = Math.min(...data);
    const max = Math.max(...data);
    const first = data[0];
    const last = data[data.length - 1];
    const trend = last > first ? "upward" : last < first ? "downward" : "stable";

    return `Sparkline: ${data.length} data points, range ${min.toFixed(1)} to ${max.toFixed(1)}, ${trend} trend`;
  }, [ariaLabel, data]);

  if (!data || data.length === 0) {
    return (
      <svg
        ref={svgRef}
        viewBox={`0 0 ${svgWidth} ${svgHeight}`}
        width={svgWidth}
        height={svgHeight}
        role="img"
        aria-label="Empty sparkline"
        className={cn(sparklineVariants({ size, colorScheme }), className)}
        {...props}
      >
        <line
          x1={padding}
          y1={svgHeight / 2}
          x2={svgWidth - padding}
          y2={svgHeight / 2}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          strokeDasharray="2 2"
          opacity={0.3}
        />
      </svg>
    );
  }

  return (
    <svg
      ref={svgRef}
      viewBox={`0 0 ${svgWidth} ${svgHeight}`}
      width={svgWidth}
      height={svgHeight}
      role="img"
      aria-label={autoAriaLabel}
      className={cn(sparklineVariants({ size, colorScheme }), className)}
      preserveAspectRatio="none"
      {...props}
    >
      {showArea && areaPath && <path className="sparkline-area" d={areaPath} opacity={0.15} />}
      <path
        className="sparkline-line"
        d={path}
        fill="none"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {showPoints &&
        points.map((point, index) => (
          <circle
            key={index}
            className="sparkline-point"
            cx={point.x}
            cy={point.y}
            r={pointRadius}
          />
        ))}
    </svg>
  );
}

Sparkline.displayName = "Sparkline";

export type SparklineVariants = VariantProps<typeof sparklineVariants>;

export { Sparkline, sparklineVariants };
