import * as React from "react";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/Card";

export interface SparklineCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  value: string | number;
  data: number[];
  color?: string;
  trend?: "up" | "down" | "neutral";
  trendValue?: string;
  description?: string;
}

function SparklineCard({
  title,
  value,
  data,
  color = "#3b82f6",
  trend,
  trendValue,
  description,
  className,
  ...props
}: SparklineCardProps) {
  const id = React.useId();
  const gradientId = `sparkline-gradient-${id}`;
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const width = 120;
  const height = 40;
  const padding = 2;

  const points = data.map((v, i) => {
    const x = padding + (i / (data.length - 1)) * (width - padding * 2);
    const y = height - padding - ((v - min) / range) * (height - padding * 2);
    return `${x},${y}`;
  });

  const fillPoints = [
    `${padding},${height - padding}`,
    ...points,
    `${width - padding},${height - padding}`,
  ].join(" ");

  const trendColors = {
    up: "text-emerald-600 dark:text-emerald-400",
    down: "text-destructive",
    neutral: "text-muted-foreground",
  };

  return (
    <Card ref={null} className={cn("overflow-hidden", className)} {...props}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1">
        <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
        {trend && (
          <span className={cn("text-xs font-medium", trendColors[trend])}>
            {trend === "up" ? "+" : trend === "down" ? "-" : ""}{trendValue}
          </span>
        )}
      </CardHeader>
      <CardContent className="flex items-end justify-between gap-4">
        <div>
          <div className="text-2xl font-bold">{value}</div>
          {description && (
            <p className="mt-0.5 text-xs text-muted-foreground">{description}</p>
          )}
        </div>
        <svg
          width={width}
          height={height}
          viewBox={`0 0 ${width} ${height}`}
          className="overflow-visible"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={color} stopOpacity="0.25" />
              <stop offset="100%" stopColor={color} stopOpacity="0" />
            </linearGradient>
          </defs>
          <polygon points={fillPoints} fill={`url(#${gradientId})`} />
          <polyline
            points={points.join(" ")}
            fill="none"
            stroke={color}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </CardContent>
    </Card>
  );
}

SparklineCard.displayName = "SparklineCard";

export { SparklineCard };
