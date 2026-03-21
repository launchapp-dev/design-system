import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { ChartContainer } from "@/components/Chart";

const funnelVariants = cva("relative", {
  variants: {
    size: {
      sm: "text-xs",
      md: "text-sm",
      lg: "text-base",
    },
    variant: {
      default: "",
      outline: "[&_.funnel-stage]:border [&_.funnel-stage]:border-border",
      filled: "[&_.funnel-stage]:border-0",
    },
  },
  defaultVariants: {
    size: "md",
    variant: "default",
  },
});

export interface FunnelStage {
  label: string;
  value: number;
  color?: string;
}

export interface FunnelChartProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "color">,
    VariantProps<typeof funnelVariants> {
  stages: FunnelStage[];
  height?: number | string;
  showConversionRate?: boolean;
  showPercentage?: boolean;
  orientation?: "horizontal" | "vertical";
}

function FunnelChart(
  {
    stages,
    height = 300,
    showConversionRate = true,
    showPercentage = true,
    orientation = "vertical",
    size,
    variant,
    className,
    ref,
    ...props
  }: FunnelChartProps & { ref?: React.Ref<HTMLDivElement> }
) {
  const maxValue = Math.max(...stages.map((s) => s.value));
  const totalValue = stages[0].value;

  const [focusedIndex, setFocusedIndex] = React.useState<number | null>(null);

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    let newIndex = index;

    switch (e.key) {
      case "ArrowUp":
        newIndex = Math.max(0, index - 1);
        break;
      case "ArrowDown":
        newIndex = Math.min(stages.length - 1, index + 1);
        break;
      default:
        return;
    }

    e.preventDefault();
    setFocusedIndex(newIndex);
    document.getElementById(`funnel-stage-${newIndex}`)?.focus();
  };

  const conversionRates = stages.map((stage, index) => {
    if (index === 0) return 100;
    return (stage.value / stages[index - 1].value) * 100;
  });

  return (
    <div
      ref={ref}
      className={cn(funnelVariants({ size, variant }), className)}
      role="list"
      aria-label="Funnel chart visualization"
      {...props}
    >
      <ChartContainer height={height}>
        <div
          className={cn(
            "w-full h-full flex",
            orientation === "horizontal" ? "flex-row" : "flex-col"
          )}
        >
          {stages.map((stage, index) => {
            const percentage = (stage.value / maxValue) * 100;
            const color = stage.color ?? `hsl(var(--la-chart-${(index % 5) + 1}))`;
            const isFocused = focusedIndex === index;

            return (
              <div
                key={stage.label}
                id={`funnel-stage-${index}`}
                role="listitem"
                tabIndex={isFocused ? 0 : -1}
                aria-label={`${stage.label}: ${stage.value}${showConversionRate ? `, conversion: ${conversionRates[index].toFixed(1)}%` : ""}`}
                className={cn(
                  "funnel-stage relative transition-all",
                  isFocused && "ring-2 ring-primary ring-offset-2",
                  orientation === "vertical" ? "mb-2 last:mb-0" : "mr-2 last:mr-0"
                )}
                style={
                  orientation === "vertical"
                    ? {
                        width: `${percentage}%`,
                        height: `${100 / stages.length}%`,
                        marginLeft: `${(100 - percentage) / 2}%`,
                        backgroundColor: color,
                      }
                    : {
                        width: `${100 / stages.length}%`,
                        height: `${percentage}%`,
                        marginTop: `${(100 - percentage) / 2}%`,
                        backgroundColor: color,
                      }
                }
                onFocus={() => setFocusedIndex(index)}
                onBlur={() => setFocusedIndex(null)}
                onKeyDown={(e) => handleKeyDown(e, index)}
              >
                <div
                  className={cn(
                    "absolute inset-0 flex flex-col items-center justify-center text-primary-foreground p-2"
                  )}
                >
                  <div className="font-semibold">{stage.label}</div>
                  <div className="text-xs opacity-90">
                    {stage.value.toLocaleString()}
                    {showPercentage && ` (${((stage.value / totalValue) * 100).toFixed(1)}%)`}
                  </div>
                  {showConversionRate && index > 0 && (
                    <div className="text-xs opacity-75 mt-1">
                      ↓ {conversionRates[index].toFixed(1)}%
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </ChartContainer>
    </div>
  );
}
FunnelChart.displayName = "FunnelChart";

export { FunnelChart, funnelVariants };
