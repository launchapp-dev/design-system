import type * as React from "react";
import { cn } from "../../../lib/utils";
import { Badge } from "../../../components/Badge";

export interface CheckoutFunnelStep {
  id: string;
  label: string;
  count: number;
  dropOff?: number;
  dropOffRate?: number;
}

export interface CheckoutFunnelProps extends React.HTMLAttributes<HTMLDivElement> {
  steps: CheckoutFunnelStep[];
  startCount?: number;
  showDropoff?: boolean;
  currency?: string;
  showValues?: boolean;
}

function CheckoutFunnel(
  {
    steps,
    startCount,
    showDropoff = true,
    showValues = true,
    className,
    ...props
  }: CheckoutFunnelProps,
  ref: React.Ref<HTMLDivElement>,
) {
  const maxCount = Math.max(...steps.map((s) => s.count), startCount ?? 0);

  return (
    <div ref={ref} className={cn("space-y-0", className)} {...props}>
      <div className="space-y-3">
        {steps.map((step, idx) => {
          const widthPct = maxCount > 0 ? Math.max((step.count / maxCount) * 100, 15) : 100;
          const prevCount = idx > 0 ? steps[idx - 1].count : (startCount ?? step.count);
          const dropOffCount = prevCount - step.count;
          const dropOffRate = prevCount > 0 ? (dropOffCount / prevCount) * 100 : 0;

          return (
            <div key={step.id} className="relative">
              <div className="flex items-center gap-3">
                {/* Label */}
                <div className="w-32 shrink-0 text-right">
                  <p className="text-xs font-medium text-muted-foreground">{step.label}</p>
                </div>

                {/* Bar */}
                <div className="relative flex-1">
                  <div className="flex h-8 items-center">
                    <div
                      className={cn(
                        "h-full rounded-md transition-all duration-500",
                        idx === 0
                          ? "bg-info"
                          : idx === steps.length - 1
                            ? "bg-success"
                            : "bg-primary/80",
                      )}
                      style={{ width: `${widthPct}%` }}
                    />
                    <div className="absolute right-2 flex items-center gap-2">
                      {showValues && (
                        <span className="text-sm font-semibold tabular-nums">
                          {step.count.toLocaleString()}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Drop-off indicator */}
                {showDropoff && idx > 0 && (
                  <div className="w-24 shrink-0">
                    <Badge
                      variant={
                        dropOffRate > 30
                          ? "destructive"
                          : dropOffRate > 15
                            ? "secondary"
                            : "outline"
                      }
                      className="text-xs"
                    >
                      -{dropOffRate.toFixed(1)}%
                      <span className="ml-1 opacity-60">({dropOffCount.toLocaleString()})</span>
                    </Badge>
                  </div>
                )}
                {showDropoff && idx === 0 && startCount && (
                  <div className="w-24 shrink-0">
                    <span className="text-xs text-muted-foreground">baseline</span>
                  </div>
                )}
              </div>

              {/* Connector line */}
              {idx < steps.length - 1 && (
                <div className="ml-[calc(8rem+1.5rem)] mt-1 h-3 border-l-2 border-dashed border-muted-foreground/30" />
              )}
            </div>
          );
        })}
      </div>

      {/* Summary */}
      {steps.length >= 2 && (
        <div className="mt-4 rounded-lg border bg-muted/20 p-3">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Overall conversion</span>
            <span className="font-semibold">
              {((steps[steps.length - 1].count / (startCount ?? steps[0].count)) * 100).toFixed(1)}%
            </span>
          </div>
          <div className="mt-1.5 h-2 w-full overflow-hidden rounded-full bg-muted">
            <div
              className="h-full rounded-full bg-success transition-all"
              style={{
                width: `${Math.max(
                  (steps[steps.length - 1].count / (startCount ?? steps[0].count)) * 100,
                  2,
                )}%`,
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}

CheckoutFunnel.displayName = "CheckoutFunnel";

export { CheckoutFunnel };
