import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";

const funnelVariants = cva("flex flex-col", {
  variants: {
    size: {
      sm: "gap-1",
      md: "gap-2",
      lg: "gap-3",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

const funnelItemVariants = cva("relative flex items-center justify-center overflow-hidden transition-all duration-300", {
  variants: {
    colorScheme: {
      primary: "bg-primary text-primary-foreground",
      secondary: "bg-secondary text-secondary-foreground",
      success: "bg-[hsl(var(--la-chart-3))] text-background",
      warning: "bg-[hsl(var(--la-chart-4))] text-background",
      destructive: "bg-destructive text-destructive-foreground",
      chart1: "bg-[hsl(var(--la-chart-1))] text-primary-foreground",
      chart2: "bg-[hsl(var(--la-chart-2))] text-primary-foreground",
      chart3: "bg-[hsl(var(--la-chart-3))] text-background",
      chart4: "bg-[hsl(var(--la-chart-4))] text-background",
      chart5: "bg-[hsl(var(--la-chart-5))] text-primary-foreground",
    },
    variant: {
      solid: "",
      outline: "border-2 border-current",
      gradient: "",
    },
  },
  defaultVariants: {
    colorScheme: "chart1",
    variant: "solid",
  },
});

type FunnelColorScheme = "primary" | "secondary" | "success" | "warning" | "destructive" | "chart1" | "chart2" | "chart3" | "chart4" | "chart5";

export interface FunnelStep {
  value: number;
  label: string;
  percentage?: number;
  colorScheme?: FunnelColorScheme;
}

export interface FunnelProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "color">,
    VariantProps<typeof funnelVariants> {
  data: FunnelStep[];
  title?: string;
  subtitle?: string;
  showPercentages?: boolean;
  showValues?: boolean;
  showLabels?: boolean;
  formatValue?: (value: number) => string;
  formatPercentage?: (percentage: number) => string;
  maxValue?: number;
  colorScheme?: FunnelColorScheme;
  "aria-label"?: string;
  onStepClick?: (step: FunnelStep, index: number) => void;
}

function Funnel({
  data,
  title,
  subtitle,
  showPercentages = true,
  showValues = true,
  showLabels = true,
  formatValue = (v) => v.toLocaleString(),
  formatPercentage = (p) => `${p.toFixed(1)}%`,
  maxValue,
  colorScheme = "chart1",
  size,
  className,
  "aria-label": ariaLabel,
  onStepClick,
  ref,
  ...props
}: FunnelProps & { ref?: React.Ref<HTMLDivElement> }) {
  const containerRef = React.useRef<HTMLDivElement>(null);
  React.useImperativeHandle(ref, () => containerRef.current!);

  const computedMax = React.useMemo(() => {
    if (maxValue !== undefined) return maxValue;
    return Math.max(...data.map((d) => d.value), 1);
  }, [data, maxValue]);

  const stepsWithPercentages = React.useMemo(() => {
    const firstValue = data[0]?.value || 1;
    return data.map((step, index) => ({
      ...step,
      percentage: (step.value / firstValue) * 100,
      conversionRate: index > 0 ? (step.value / data[index - 1].value) * 100 : 100,
    }));
  }, [data]);

  const autoAriaLabel = React.useMemo(() => {
    if (ariaLabel) return ariaLabel;
    const stepLabels = data.map((d) => d.label).join(", ");
    return `Funnel chart: ${stepLabels}`;
  }, [ariaLabel, data]);

  const handleStepClick = React.useCallback(
    (index: number) => {
      if (onStepClick) {
        onStepClick(data[index], index);
      }
    },
    [data, onStepClick]
  );

  if (!data.length) {
    return (
      <div
        ref={containerRef}
        role="img"
        aria-label="Empty funnel chart"
        className={cn("flex items-center justify-center text-muted-foreground", className)}
        {...props}
      >
        No data
      </div>
    );
  }

  const funnelColorSchemes: Array<FunnelProps["colorScheme"]> = [
    "chart1",
    "chart2",
    "chart3",
    "chart4",
    "chart5",
  ];

  return (
    <div
      ref={containerRef}
      role="figure"
      aria-label={autoAriaLabel}
      className={cn("w-full", className)}
      {...props}
    >
      {(title || subtitle) && (
        <div className="mb-4 text-center">
          {title && <h3 className="text-lg font-semibold text-foreground">{title}</h3>}
          {subtitle && <p className="text-sm text-muted-foreground">{subtitle}</p>}
        </div>
      )}

      <div
        role="list"
        aria-label="Funnel stages"
        className={cn(funnelVariants({ size }), "relative")}
      >
        {stepsWithPercentages.map((step, index) => {
          const widthPercentage = (step.value / computedMax) * 100;
          const stepColorScheme = step.colorScheme || funnelColorSchemes[index % funnelColorSchemes.length];
          const isClickable = !!onStepClick;

          return (
            <div
              key={index}
              role="listitem"
              className={cn(
                funnelItemVariants({ colorScheme: stepColorScheme, variant: "solid" }),
                "rounded-md font-medium",
                isClickable && "cursor-pointer hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
              )}
              style={{ width: `${widthPercentage}%` }}
              tabIndex={isClickable ? 0 : undefined}
              onClick={() => handleStepClick(index)}
              onKeyDown={(e) => {
                if ((e.key === "Enter" || e.key === " ") && isClickable) {
                  e.preventDefault();
                  handleStepClick(index);
                }
              }}
              aria-label={`${step.label}: ${formatValue(step.value)}${showPercentages ? ` (${formatPercentage(step.percentage)})` : ""}`}
            >
              <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
                <div
                  className="absolute inset-0 opacity-20"
                  style={{
                    background: `linear-gradient(135deg, transparent 0%, currentColor 50%, transparent 100%)`,
                  }}
                />
              </div>

              <div className="relative z-10 flex flex-col items-center justify-center px-2 py-1 text-center">
                {showLabels && (
                  <span className={cn(
                    "font-medium leading-tight",
                    size === "sm" ? "text-[10px]" : size === "lg" ? "text-sm" : "text-xs"
                  )}>
                    {step.label}
                  </span>
                )}
                <div className="flex items-center gap-1 leading-tight">
                  {showValues && (
                    <span className={cn(
                      "font-semibold",
                      size === "sm" ? "text-xs" : size === "lg" ? "text-base" : "text-sm"
                    )}>
                      {formatValue(step.value)}
                    </span>
                  )}
                  {showPercentages && (
                    <span className={cn(
                      "opacity-80",
                      size === "sm" ? "text-[10px]" : size === "lg" ? "text-xs" : "text-[10px]"
                    )}>
                      ({formatPercentage(step.percentage)})
                    </span>
                  )}
                </div>
                {index > 0 && (
                  <span className={cn(
                    "opacity-60",
                    size === "sm" ? "text-[8px]" : size === "lg" ? "text-xs" : "text-[10px]"
                  )}>
                    {formatPercentage(step.conversionRate)} from previous
                  </span>
                )}
              </div>

              {index < stepsWithPercentages.length - 1 && (
                <div
                  className={cn(
                    "absolute bottom-0 left-0 right-0 flex justify-center",
                    size === "sm" ? "-mb-1" : size === "lg" ? "-mb-2" : "-mb-1.5"
                  )}
                >
                  <svg
                    width={size === "sm" ? 12 : size === "lg" ? 20 : 16}
                    height={size === "sm" ? 8 : size === "lg" ? 14 : 10}
                    viewBox="0 0 16 10"
                    fill="none"
                    className="text-foreground"
                  >
                    <path
                      d="M0 0L8 10L16 0H0Z"
                      fill="currentColor"
                      fillOpacity={0.1}
                    />
                    <path
                      d="M0 0L8 10L16 0"
                      stroke="currentColor"
                      strokeOpacity={0.3}
                      strokeWidth={1}
                      fill="none"
                    />
                  </svg>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

Funnel.displayName = "Funnel";

export { Funnel, funnelVariants, funnelItemVariants };
