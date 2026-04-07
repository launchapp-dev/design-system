import type * as React from "react";
import { cn } from "@/lib/utils";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/Card";

export interface FunnelStage {
  label: string;
  value: number;
  color?: string;
}

export interface FunnelChartCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  description?: string;
  stages: FunnelStage[];
  showValues?: boolean;
  showPercentages?: boolean;
}

function FunnelChartCard({
  title,
  description,
  stages,
  showValues = true,
  showPercentages = true,
  className,
  ...props
}: FunnelChartCardProps) {
  const maxValue = Math.max(...stages.map((s) => s.value));
  const defaultColors = [
    "bg-primary",
    "bg-primary/80",
    "bg-primary/60",
    "bg-primary/40",
    "bg-primary/25",
  ];

  return (
    <Card ref={null} className={cn("", className)} {...props}>
      <CardHeader>
        <CardTitle className="text-base font-semibold">{title}</CardTitle>
        {description && <CardDescription className="text-xs">{description}</CardDescription>}
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {stages.map((stage, index) => {
            const widthPercent = (stage.value / maxValue) * 100;
            const prevValue = index > 0 ? stages[index - 1].value : null;
            const conversionPercent =
              prevValue !== null ? Math.round((stage.value / prevValue) * 100) : null;

            return (
              <div key={stage.label} className="space-y-1.5">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium">{stage.label}</span>
                  <div className="flex items-center gap-2">
                    {showValues && (
                      <span className="text-muted-foreground">
                        {stage.value.toLocaleString()}
                      </span>
                    )}
                    {showPercentages && conversionPercent !== null && (
                      <span className="text-xs text-muted-foreground">
                        {conversionPercent}%
                      </span>
                    )}
                  </div>
                </div>
                <div className="h-6 w-full overflow-hidden rounded-md bg-muted">
                  <div
                    className={cn(
                      "h-full rounded-md transition-all duration-500",
                      stage.color || defaultColors[index % defaultColors.length],
                    )}
                    style={{ width: `${widthPercent}%` }}
                    role="progressbar"
                    aria-valuenow={stage.value}
                    aria-valuemin={0}
                    aria-valuemax={maxValue}
                    aria-label={`${stage.label}: ${stage.value}`}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}

FunnelChartCard.displayName = "FunnelChartCard";

export { FunnelChartCard };
