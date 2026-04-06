import type * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/Card";
import { Badge } from "@/components/Badge";
import { cn } from "@/lib/utils";

export interface MetricCardItem {
  id: string;
  label: string;
  value: string | number;
  change?: string;
  changeType?: "up" | "down" | "neutral";
  changeLabel?: string;
  icon?: React.ReactNode;
  description?: string;
  href?: string;
  onClick?: () => void;
}

export interface MetricCardsProps extends React.HTMLAttributes<HTMLDivElement> {
  items: MetricCardItem[];
  columns?: 1 | 2 | 3 | 4;
  showChange?: boolean;
}

const upArrowIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="12"
    height="12"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <polyline points="18 15 12 9 6 15" />
  </svg>
);

const downArrowIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="12"
    height="12"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

function MetricCards({
  items,
  columns = 4,
  showChange = true,
  className,
  ...props
}: MetricCardsProps) {
  const gridClass = {
    1: "grid-cols-1",
    2: "grid-cols-1 sm:grid-cols-2",
    3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
  }[columns];

  return (
    <div ref={null} className={cn("grid gap-4", gridClass, className)} {...props}>
      {items.map((item) => (
        <Card
          key={item.id}
          className={cn(
            "transition-shadow hover:shadow-md",
            (item.href || item.onClick) && "cursor-pointer",
          )}
          onClick={item.href ? undefined : item.onClick}
        >
          {item.href ? (
            <a href={item.href} className="block">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {item.label}
                </CardTitle>
                {item.icon && (
                  <div className="flex h-8 w-8 items-center justify-center rounded-md bg-muted text-muted-foreground">
                    {item.icon}
                  </div>
                )}
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold tracking-tight">{item.value}</div>
                {item.description && (
                  <p className="text-xs text-muted-foreground mt-0.5">{item.description}</p>
                )}
                {showChange && item.change && (
                  <div className="flex items-center gap-1.5 mt-2">
                    <Badge
                      variant="secondary"
                      className={cn(
                        "gap-1 text-xs font-medium",
                        item.changeType === "up" &&
                          "text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/30",
                        item.changeType === "down" &&
                          "text-destructive bg-red-50 dark:bg-red-950/30",
                        item.changeType === "neutral" && "text-muted-foreground",
                      )}
                    >
                      {item.changeType === "up" && upArrowIcon}
                      {item.changeType === "down" && downArrowIcon}
                      {item.change}
                    </Badge>
                    {item.changeLabel && (
                      <span className="text-xs text-muted-foreground">{item.changeLabel}</span>
                    )}
                  </div>
                )}
              </CardContent>
            </a>
          ) : (
            <>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {item.label}
                </CardTitle>
                {item.icon && (
                  <div className="flex h-8 w-8 items-center justify-center rounded-md bg-muted text-muted-foreground">
                    {item.icon}
                  </div>
                )}
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold tracking-tight">{item.value}</div>
                {item.description && (
                  <p className="text-xs text-muted-foreground mt-0.5">{item.description}</p>
                )}
                {showChange && item.change && (
                  <div className="flex items-center gap-1.5 mt-2">
                    <Badge
                      variant="secondary"
                      className={cn(
                        "gap-1 text-xs font-medium",
                        item.changeType === "up" &&
                          "text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/30",
                        item.changeType === "down" &&
                          "text-destructive bg-red-50 dark:bg-red-950/30",
                        item.changeType === "neutral" && "text-muted-foreground",
                      )}
                    >
                      {item.changeType === "up" && upArrowIcon}
                      {item.changeType === "down" && downArrowIcon}
                      {item.change}
                    </Badge>
                    {item.changeLabel && (
                      <span className="text-xs text-muted-foreground">{item.changeLabel}</span>
                    )}
                  </div>
                )}
              </CardContent>
            </>
          )}
        </Card>
      ))}
    </div>
  );
}

MetricCards.displayName = "MetricCards";

export { MetricCards };
