import type * as React from "react";
import { cn } from "../../lib/utils";
import { Progress } from "../../components/Progress";
import { Button } from "../../components/Button";

export interface UsageMeterItem {
  id: string;
  label: string;
  used: number;
  total: number;
  unit: string;
  warningThreshold?: number;
  description?: string;
}

export interface UsageMeterProps extends React.HTMLAttributes<HTMLDivElement> {
  items: UsageMeterItem[];
  onUpgrade?: () => void;
  showUpgradeButton?: boolean;
  title?: string;
}

function UsageMeter({
  items,
  onUpgrade,
  showUpgradeButton = true,
  title = "Usage",
  className,
  ...props
}: UsageMeterProps) {
  const allCapped = items.every((item) => item.used >= item.total);
  const anyWarning = items.some((item) => {
    if (!item.warningThreshold) return false;
    const pct = (item.used / item.total) * 100;
    return pct >= item.warningThreshold;
  });

  return (
    <div className={cn("space-y-4", className)} {...props}>
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium">{title}</h3>
        {showUpgradeButton && (allCapped || anyWarning) && onUpgrade && (
          <Button variant="outline" size="sm" onClick={onUpgrade}>
            Upgrade plan
          </Button>
        )}
      </div>

      <div className="space-y-5">
        {items.map((item) => {
          const pct = Math.min(Math.round((item.used / item.total) * 100), 100);
          const isWarning = item.warningThreshold && pct >= item.warningThreshold;
          const isCapped = item.used >= item.total;

          return (
            <div key={item.id} className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <span className={cn(isCapped && "text-muted-foreground")}>
                    {item.label}
                  </span>
                  {isWarning && !isCapped && (
                    <span className="text-xs font-medium text-destructive">Warning</span>
                  )}
                  {isCapped && (
                    <span className="text-xs font-medium text-muted-foreground">Limit reached</span>
                  )}
                </div>
                <span
                  className={cn(
                    "font-medium",
                    isCapped && "text-muted-foreground",
                    isWarning && !isCapped && "text-destructive"
                  )}
                >
                  {item.used.toLocaleString()} / {item.total.toLocaleString()} {item.unit}
                </span>
              </div>
              <Progress
                value={pct}
                size="sm"
                className={cn(
                  isWarning && !isCapped && "[&>div]:bg-destructive",
                  isCapped && "[&>div]:bg-muted"
                )}
                aria-label={`${item.label}: ${pct}%`}
              />
              {item.description && (
                <p className="text-xs text-muted-foreground">{item.description}</p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

UsageMeter.displayName = "UsageMeter";

export { UsageMeter };
