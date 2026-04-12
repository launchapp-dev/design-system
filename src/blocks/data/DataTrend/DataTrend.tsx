import type * as React from "react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/Badge";

export interface DataTrendProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string | number;
  change: string | number;
  direction: "up" | "down" | "neutral";
  label?: string;
  compareLabel?: string;
  inverted?: boolean;
}

const UpIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <polyline points="18 15 12 9 6 15" />
  </svg>
);

const DownIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

const NeutralIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <line x1="5" x2="19" y1="12" y2="12" />
  </svg>
);

function DataTrend({
  value,
  change,
  direction,
  label,
  compareLabel,
  inverted = false,
  className,
  ...props
}: DataTrendProps) {
  const isPositive = inverted ? direction === "down" : direction === "up";
  const isNegative = inverted ? direction === "up" : direction === "down";

  const colorClass = isPositive
    ? "text-success"
    : isNegative
      ? "text-destructive"
      : "text-muted-foreground";

  const bgClass = isPositive
    ? "bg-success/5 dark:bg-success/10"
    : isNegative
      ? "bg-destructive/5 dark:bg-destructive/10"
      : "bg-muted";

  const Icon = direction === "up" ? UpIcon : direction === "down" ? DownIcon : NeutralIcon;

  return (
    <div className={cn("flex items-center gap-3", className)} {...props}>
      <div className="flex flex-col">
        <span className="text-2xl font-bold tracking-tight">{value}</span>
        {label && <span className="text-sm text-muted-foreground">{label}</span>}
      </div>
      <div className="flex flex-col items-end gap-1">
        <Badge variant="secondary" className={cn("gap-1 px-1.5 py-0.5 font-medium", bgClass, colorClass)}>
          <Icon />
          {typeof change === "number" ? `${change > 0 ? "+" : ""}${change}%` : change}
        </Badge>
        {compareLabel && (
          <span className="text-xs text-muted-foreground">{compareLabel}</span>
        )}
      </div>
    </div>
  );
}

DataTrend.displayName = "DataTrend";

export { DataTrend };
