import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";

const funnelChartVariants = cva("relative", {
  variants: {
    size: {
      sm: "h-64",
      md: "h-80",
      lg: "h-96",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

export interface FunnelStep {
  id: string;
  label: string;
  value: number;
  color?: string;
}

export interface FunnelChartProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "color">,
    VariantProps<typeof funnelChartVariants> {
  steps: FunnelStep[];
  height?: number | string;
  showLabels?: boolean;
  showValues?: boolean;
  showPercentages?: boolean;
  showDropOffs?: boolean;
  orientation?: "vertical" | "horizontal";
  onStepClick?: (step: FunnelStep) => void;
  "aria-label"?: string;
}

const CHART_COLORS = [
  "hsl(var(--la-chart-1))",
  "hsl(var(--la-chart-2))",
  "hsl(var(--la-chart-3))",
  "hsl(var(--la-chart-4))",
  "hsl(var(--la-chart-5))",
];

function formatValue(value: number): string {
  if (value >= 1000000) return `${(value / 1000000).toFixed(1)}M`;
  if (value >= 1000) return `${(value / 1000).toFixed(1)}K`;
  return value.toString();
}

function formatPercentage(value: number): string {
  return `${value.toFixed(1)}%`;
}

const FunnelChart = React.forwardRef<HTMLDivElement, FunnelChartProps>(
  (
    {
      steps,
      height,
      size,
      showLabels = true,
      showValues = true,
      showPercentages = true,
      showDropOffs = true,
      orientation = "vertical",
      className,
      onStepClick,
      "aria-label": ariaLabel,
      ...props
    },
    ref
  ) => {
    const containerRef = React.useRef<HTMLDivElement>(null);
    const [containerWidth, setContainerWidth] = React.useState(0);

    React.useEffect(() => {
      const observer = new ResizeObserver((entries) => {
        if (entries[0]) {
          setContainerWidth(entries[0].contentRect.width);
        }
      });

      if (containerRef.current) {
        observer.observe(containerRef.current);
      }

      return () => observer.disconnect();
    }, []);

    const defaultHeight = size === "sm" ? 256 : size === "lg" ? 384 : 320;
    const svgHeight: number = typeof height === "number" ? height : defaultHeight;
    const svgWidth = containerWidth || 400;

    const maxValue = React.useMemo(() => {
      if (!steps || steps.length === 0) return 0;
      return Math.max(...steps.map((s) => s.value));
    }, [steps]);

    const stepMetrics = React.useMemo(() => {
      if (!steps || steps.length === 0 || maxValue === 0) return [];
      
      return steps.map((step, index) => {
        const percentage = (step.value / maxValue) * 100;
        const previousStep = index > 0 ? steps[index - 1] : null;
        const dropOffPercentage = previousStep 
          ? ((previousStep.value - step.value) / previousStep.value) * 100 
          : 0;
        const retentionPercentage = previousStep
          ? (step.value / previousStep.value) * 100
          : 100;
        
        return {
          ...step,
          percentage,
          dropOffPercentage,
          retentionPercentage,
          index,
        };
      });
    }, [steps, maxValue]);

    const getStepColor = (index: number, customColor?: string): string => {
      return customColor || CHART_COLORS[index % CHART_COLORS.length];
    };

    const autoAriaLabel = React.useMemo(() => {
      if (ariaLabel) return ariaLabel;
      if (!steps || steps.length === 0) return "Empty funnel chart";
      return `Funnel chart with ${steps.length} steps, starting at ${formatValue(steps[0].value)}`;
    }, [ariaLabel, steps]);

    if (!steps || steps.length === 0) {
      return (
        <div
          ref={ref}
          className={cn(
            funnelChartVariants({ size }),
            "flex items-center justify-center bg-muted/30 rounded-[--la-radius]",
            className
          )}
          role="img"
          aria-label="Empty funnel chart"
          {...props}
        >
          <p className="text-sm text-muted-foreground">No data available</p>
        </div>
      );
    }

    if (orientation === "horizontal") {
      const padding = { top: 20, right: 80, bottom: 20, left: 20 };
      const chartWidth = svgWidth - padding.left - padding.right;
      const chartHeight = svgHeight - padding.top - padding.bottom;
      const stepHeight = chartHeight / steps.length;
      const funnelGap = 4;

      return (
        <div
          ref={(node) => {
            containerRef.current = node;
            if (typeof ref === "function") ref(node);
            else if (ref) ref.current = node;
          }}
          className={cn(funnelChartVariants({ size }), className)}
          role="img"
          aria-label={autoAriaLabel}
          {...props}
        >
          <svg
            width="100%"
            height={svgHeight}
            viewBox={`0 0 ${svgWidth} ${svgHeight}`}
            className="overflow-visible"
          >
            {stepMetrics.map((step, index) => {
              const y = padding.top + index * stepHeight + funnelGap / 2;
              const h = stepHeight - funnelGap;
              const widthRatio = step.percentage / 100;
              const w = chartWidth * widthRatio;
              const x = padding.left;

              const nextStep = index < stepMetrics.length - 1 ? stepMetrics[index + 1] : null;
              const nextWidthRatio = nextStep ? nextStep.percentage / 100 : widthRatio;
              const nextW = chartWidth * nextWidthRatio;

              const trX = w;
              const brX = nextW;

              return (
                <g key={step.id}>
                  <path
                    d={`M ${x},${y} L ${x + trX},${y} L ${x + brX},${y + h} L ${x},${y + h} Z`}
                    fill={getStepColor(index, step.color)}
                    className={cn(
                      "transition-opacity duration-200",
                      onStepClick && "cursor-pointer hover:opacity-80"
                    )}
                    onClick={() => onStepClick?.(step)}
                    role="img"
                    aria-label={`${step.label}: ${formatValue(step.value)} (${formatPercentage(step.percentage)} of total)`}
                  />
                  {showLabels && (
                    <text
                      x={x + 12}
                      y={y + h / 2}
                      dominantBaseline="middle"
                      fill="hsl(var(--la-card-foreground))"
                      className="text-xs font-medium select-none pointer-events-none"
                    >
                      {step.label}
                    </text>
                  )}
                  {showValues && (
                    <text
                      x={svgWidth - padding.right + 8}
                      y={y + h / 2}
                      dominantBaseline="middle"
                      fill="hsl(var(--la-foreground))"
                      className="text-xs font-medium select-none pointer-events-none"
                    >
                      {formatValue(step.value)}
                    </text>
                  )}
                  {showPercentages && index > 0 && (
                    <text
                      x={svgWidth - padding.right + 8}
                      y={y + h / 2 + 14}
                      dominantBaseline="middle"
                      fill="hsl(var(--la-muted-foreground))"
                      className="text-[10px] select-none pointer-events-none"
                    >
                      {formatPercentage(step.retentionPercentage)}
                    </text>
                  )}
                  {showDropOffs && nextStep && step.dropOffPercentage > 0 && (
                    <g>
                      <line
                        x1={x + Math.min(w, nextW) + 8}
                        y1={y + h / 2}
                        x2={x + Math.min(w, nextW) + 24}
                        y2={y + h / 2}
                        stroke="hsl(var(--la-muted-foreground))"
                        strokeWidth={1}
                        strokeDasharray="2,2"
                        className="pointer-events-none"
                      />
                      <text
                        x={x + Math.min(w, nextW) + 28}
                        y={y + h / 2}
                        dominantBaseline="middle"
                        fill="hsl(var(--la-destructive))"
                        className="text-[10px] select-none pointer-events-none"
                      >
                        -{formatPercentage(step.dropOffPercentage)}
                      </text>
                    </g>
                  )}
                </g>
              );
            })}
          </svg>
        </div>
      );
    }

    const padding = { top: 40, right: 40, bottom: 20, left: 40 };
    const chartWidth = svgWidth - padding.left - padding.right;
    const chartHeight = svgHeight - padding.top - padding.bottom;
    const stepWidth = chartWidth / steps.length;
    const funnelGap = 8;

    return (
      <div
        ref={(node) => {
          containerRef.current = node;
          if (typeof ref === "function") ref(node);
          else if (ref) ref.current = node;
        }}
        className={cn(funnelChartVariants({ size }), className)}
        role="img"
        aria-label={autoAriaLabel}
        {...props}
      >
        <svg
          width="100%"
          height={svgHeight}
          viewBox={`0 0 ${svgWidth} ${svgHeight}`}
          className="overflow-visible"
        >
          {stepMetrics.map((step, index) => {
            const x = padding.left + index * stepWidth + funnelGap / 2;
            const w = stepWidth - funnelGap;
            const heightRatio = step.percentage / 100;
            const h = chartHeight * heightRatio;
            const y = padding.top + (chartHeight - h) / 2;

            const nextStep = index < stepMetrics.length - 1 ? stepMetrics[index + 1] : null;
            const nextHeightRatio = nextStep ? nextStep.percentage / 100 : heightRatio;
            const nextH = chartHeight * nextHeightRatio;
            const nextY = padding.top + (chartHeight - nextH) / 2;

            const trY = y;
            const brY = nextY;
            const rightX = x + w;
            const nextRightX = padding.left + (index + 1) * stepWidth + funnelGap / 2;
            const nextRightW = stepWidth - funnelGap;
            const nrX = nextRightX + nextRightW;

            return (
              <g key={step.id}>
                <path
                  d={`M ${x},${trY} L ${rightX},${trY} L ${nrX},${brY} L ${nrX},${brY + nextH} L ${rightX},${brY + nextH} L ${x},${y + h} Z`}
                  fill={getStepColor(index, step.color)}
                  className={cn(
                    "transition-opacity duration-200",
                    onStepClick && "cursor-pointer hover:opacity-80"
                  )}
                  onClick={() => onStepClick?.(step)}
                  role="img"
                  aria-label={`${step.label}: ${formatValue(step.value)} (${formatPercentage(step.percentage)} of total)`}
                />
                {showLabels && (
                  <text
                    x={x + w / 2}
                    y={y + h / 2 - (showValues ? 8 : 0)}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fill="hsl(var(--la-card-foreground))"
                    className="text-xs font-medium select-none pointer-events-none"
                    style={{ fontSize: Math.min(12, Math.min(w / 6, h / 3)) }}
                  >
                    {step.label.length > Math.floor(w / 7)
                      ? `${step.label.slice(0, Math.floor(w / 7) - 2)}...`
                      : step.label}
                  </text>
                )}
                {showValues && (
                  <text
                    x={x + w / 2}
                    y={y + h / 2 + 8}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fill="hsl(var(--la-muted-foreground))"
                    className="text-[10px] select-none pointer-events-none"
                  >
                    {formatValue(step.value)}
                  </text>
                )}
                {showPercentages && index > 0 && (
                  <text
                    x={x + w / 2}
                    y={y + h / 2 + 20}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fill="hsl(var(--la-muted-foreground) / 0.8)"
                    className="text-[9px] select-none pointer-events-none"
                  >
                    {formatPercentage(step.retentionPercentage)}
                  </text>
                )}
                {showDropOffs && nextStep && step.dropOffPercentage > 0 && (
                  <g>
                    <line
                      x1={rightX + 4}
                      y1={y + h / 2}
                      x2={rightX + 20}
                      y2={y + h / 2}
                      stroke="hsl(var(--la-muted-foreground))"
                      strokeWidth={1}
                      strokeDasharray="2,2"
                      className="pointer-events-none"
                    />
                    <text
                      x={rightX + 24}
                      y={y + h / 2}
                      dominantBaseline="middle"
                      fill="hsl(var(--la-destructive))"
                      className="text-[10px] select-none pointer-events-none"
                    >
                      -{formatPercentage(step.dropOffPercentage)}
                    </text>
                  </g>
                )}
              </g>
            );
          })}
        </svg>
      </div>
    );
  }
);

FunnelChart.displayName = "FunnelChart";

export { FunnelChart, funnelChartVariants };
