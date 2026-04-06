import type * as React from "react";
import { StatsCard, type StatsCardProps } from "../StatsCard";
import { cn } from "@/lib/utils";

export interface Metric {
  id: string;
  stats: StatsCardProps;
}

export interface MetricGridProps extends React.HTMLAttributes<HTMLDivElement> {
  metrics: Metric[];
  columns?: 1 | 2 | 3 | 4 | 5 | 6;
  gap?: "sm" | "md" | "lg";
  responsive?: boolean;
}

const columnsVariants = {
  1: "grid-cols-1",
  2: "grid-cols-1 sm:grid-cols-2",
  3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
  4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
  5: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5",
  6: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6",
};

const responsiveColumnsVariants = {
  1: "grid-cols-1",
  2: "grid-cols-2",
  3: "grid-cols-2 sm:grid-cols-3",
  4: "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4",
  5: "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5",
  6: "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6",
};

const gapVariants = {
  sm: "gap-3",
  md: "gap-4",
  lg: "gap-6",
};

function MetricGrid({
  metrics,
  columns = 4,
  gap = "md",
  responsive = true,
  className,
  ref,
  ...props
}: MetricGridProps & { ref?: React.Ref<HTMLDivElement> }) {
  const columnClass = responsive ? columnsVariants[columns] : responsiveColumnsVariants[columns];

  return (
    <div ref={ref} className={cn("grid", columnClass, gapVariants[gap], className)} {...props}>
      {metrics.map((metric) => (
        <StatsCard key={metric.id} {...metric.stats} />
      ))}
    </div>
  );
}
MetricGrid.displayName = "MetricGrid";

export { MetricGrid };
