import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { Line } from "recharts";

const sparklineVariants = cva("inline-block", {
  variants: {
    size: {
      sm: "h-4 w-12",
      md: "h-6 w-20",
      lg: "h-8 w-32",
    },
    variant: {
      default: "",
      primary: "[&_.recharts-line-path]:stroke-primary",
      success: "[&_.recharts-line-path]:stroke-success",
      warning: "[&_.recharts-line-path]:stroke-warning",
      destructive: "[&_.recharts-line-path]:stroke-destructive",
    },
  },
  defaultVariants: {
    size: "md",
    variant: "default",
  },
});

export interface SparklineDataPoint {
  value: number;
  label?: string;
}

export interface SparklineProps
  extends Omit<React.HTMLAttributes<HTMLSpanElement>, "color">,
    VariantProps<typeof sparklineVariants> {
  data: number[] | SparklineDataPoint[];
  color?: string;
  showArea?: boolean;
  areaOpacity?: number;
  strokeWidth?: number;
  animated?: boolean;
}

function Sparkline(
  {
    data,
    color,
    showArea = false,
    areaOpacity = 0.1,
    strokeWidth = 2,
    animated = true,
    size,
    variant,
    className,
    ref,
    ...props
  }: SparklineProps & { ref?: React.Ref<HTMLSpanElement> }
) {
  const values = Array.isArray(data[0])
    ? (data as number[])
    : (data as SparklineDataPoint[]).map((d) => d.value);

  const normalizedData = values.map((value, index) => ({ index, value }));
  const minValue = Math.min(...values);
  const maxValue = Math.max(...values);
  const range = maxValue - minValue || 1;

  const width = size === "sm" ? 48 : size === "md" ? 80 : 128;
  const height = size === "sm" ? 16 : size === "md" ? 24 : 32;

  const chartColor = color ?? "hsl(var(--la-chart-1))";

  const pathPoints = normalizedData.map((point, i) => {
    const x = (i / (normalizedData.length - 1)) * width;
    const y = height - ((point.value - minValue) / range) * height;
    return `${x},${y}`;
  });

  const linePath = `M ${pathPoints.join(" L ")}`;

  const areaPath = showArea
    ? `M 0,${height} L ${pathPoints.join(" L ")} L ${width},${height} Z`
    : "";

  return (
    <span
      ref={ref}
      className={cn(sparklineVariants({ size, variant }), className)}
      role="img"
      aria-label={`Sparkline chart: ${values.join(", ")}`}
      {...props}
    >
      <svg
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        className="w-full h-full"
        role="presentation"
      >
        <defs>
          <linearGradient id="sparkline-area-gradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={chartColor} stopOpacity={areaOpacity} />
            <stop offset="100%" stopColor={chartColor} stopOpacity={0} />
          </linearGradient>
        </defs>
        {showArea && (
          <path
            d={areaPath}
            fill="url(#sparkline-area-gradient)"
            className={animated ? "animate-in fade-in duration-500" : ""}
          />
        )}
        <path
          d={linePath}
          fill="none"
          stroke={chartColor}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
          className={cn("recharts-line-path", animated && "animate-in fade-in duration-500")}
        />
      </svg>
    </span>
  );
}
Sparkline.displayName = "Sparkline";

export { Sparkline, sparklineVariants };
