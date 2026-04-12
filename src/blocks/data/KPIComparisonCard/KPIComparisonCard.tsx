import type * as React from "react";
import { cn } from "@/lib/utils";
import { Card, CardHeader, CardDescription, CardContent } from "@/components/Card";
import { Badge } from "@/components/Badge";

export interface KPIComparisonCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  currentValue: string | number;
  previousValue?: string | number;
  change?: string | number;
  changeDirection?: "up" | "down" | "neutral";
  changeLabel?: string;
  description?: string;
  unit?: string;
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

function KPIComparisonCard({
  title,
  currentValue,
  previousValue,
  change,
  changeDirection = "neutral",
  changeLabel,
  description,
  unit,
  inverted = false,
  className,
  ...props
}: KPIComparisonCardProps) {
  const isPositive = inverted ? changeDirection === "down" : changeDirection === "up";
  const isNegative = inverted ? changeDirection === "up" : changeDirection === "down";

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

  const Icon =
    changeDirection === "up" ? UpIcon : changeDirection === "down" ? DownIcon : NeutralIcon;

  return (
    <Card ref={null} className={cn("", className)} {...props}>
      <CardHeader className="pb-2">
        <CardDescription className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
          {title}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-baseline gap-2">
          <span className="text-3xl font-bold tracking-tight">
            {currentValue}
            {unit && <span className="text-lg text-muted-foreground">{unit}</span>}
          </span>
        </div>

        {previousValue !== undefined && (
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">
              vs {previousValue}
              {unit}
            </span>
            {change !== undefined && (
              <Badge
                variant="secondary"
                className={cn("gap-1 px-1.5 py-0.5 font-medium", bgClass, colorClass)}
              >
                <Icon />
                {typeof change === "number" ? `${change > 0 ? "+" : ""}${change}%` : change}
                {changeLabel && <span className="ml-1 text-xs opacity-80">{changeLabel}</span>}
              </Badge>
            )}
          </div>
        )}

        {description && (
          <p className="text-xs text-muted-foreground pt-1 border-t border-border/50">
            {description}
          </p>
        )}
      </CardContent>
    </Card>
  );
}

KPIComparisonCard.displayName = "KPIComparisonCard";

export { KPIComparisonCard };
