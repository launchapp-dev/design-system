import * as React from "react";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";
import { useReducedMotion } from "../../lib/animation";

const funnelChartVariants = cva("relative", {
  variants: {
    size: {
      sm: "text-xs",
      md: "text-sm",
      lg: "text-base",
    },
    orientation: {
      vertical: "",
      horizontal: "",
    },
  },
  defaultVariants: {
    size: "md",
    orientation: "vertical",
  },
});

const funnelStageVariants = cva(
  "transition-all",
  {
    variants: {
      borderRadius: {
        none: "rounded-none",
        sm: "rounded-sm",
        md: "rounded-[--la-radius]",
        lg: "rounded-lg",
      },
    },
    defaultVariants: {
      borderRadius: "md",
    },
  }
);

export interface FunnelStage {
  id: string;
  label: string;
  value: number;
  color?: string;
}

export interface FunnelChartProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "color">,
    VariantProps<typeof funnelChartVariants> {
  data: FunnelStage[];
  height?: number | string;
  stageHeight?: number;
  gap?: number;
  colorScale?: "sequential" | "diverging" | "gradient" | "custom";
  customColors?: string[];
  showLabels?: boolean;
  showValues?: boolean;
  showPercentage?: boolean;
  showConversionRate?: boolean;
  formatValue?: (value: number) => string;
  onStageClick?: (stage: FunnelStage, index: number) => void;
  onStageHover?: (stage: FunnelStage | null, index: number | null) => void;
  showTooltip?: boolean;
  tooltipContent?: (stage: FunnelStage, index: number, percentage: number, conversionRate: number) => React.ReactNode;
  borderRadius?: VariantProps<typeof funnelStageVariants>["borderRadius"];
  animationDuration?: number;
  "aria-label"?: string;
}

function getSequentialColor(index: number, total: number): string {
  const hue = 200 - (index / Math.max(total - 1, 1)) * 120;
  const saturation = 65 + (index / Math.max(total - 1, 1)) * 15;
  const lightness = 50 - (index / Math.max(total - 1, 1)) * 15;
  return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
}

function getDivergingColor(index: number, total: number): string {
  const ratio = index / Math.max(total - 1, 1);
  if (ratio < 0.5) {
    const t = ratio * 2;
    return `hsl(${220 - t * 40}, ${70 + t * 10}%, ${60 - t * 15}%)`;
  } else {
    const t = (ratio - 0.5) * 2;
    return `hsl(${180 - t * 100}, ${75 + t * 10}%, ${50 - t * 10}%)`;
  }
}

function getGradientColor(index: number, total: number): string {
  const hue = 210;
  const saturation = 70;
  const lightness = 60 - (index / Math.max(total - 1, 1)) * 30;
  return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
}

function getStageColor(
  stage: FunnelStage,
  index: number,
  total: number,
  colorScale: FunnelChartProps["colorScale"],
  customColors?: string[]
): string {
  if (stage.color) return stage.color;

  if (colorScale === "custom" && customColors && customColors.length > 0) {
    return customColors[index % customColors.length];
  }

  switch (colorScale) {
    case "diverging":
      return getDivergingColor(index, total);
    case "gradient":
      return getGradientColor(index, total);
    case "sequential":
    default:
      return getSequentialColor(index, total);
  }
}

const FunnelChart = React.forwardRef<HTMLDivElement, FunnelChartProps>(
  (
    {
      data,
      height,
      stageHeight: propStageHeight,
      gap = 4,
      colorScale = "sequential",
      customColors,
      showLabels = true,
      showValues = true,
      showPercentage = true,
      showConversionRate = false,
      formatValue = (v) => v.toLocaleString(),
      onStageClick,
      onStageHover,
      showTooltip = true,
      tooltipContent,
      borderRadius = "md",
      animationDuration = 500,
      className,
      size,
      orientation = "vertical",
      "aria-label": ariaLabel,
      ...props
    },
    ref
  ) => {
    const reducedMotion = useReducedMotion();
    const [hoveredStage, setHoveredStage] = React.useState<number | null>(null);
    const [animatedWidths, setAnimatedWidths] = React.useState<number[]>([]);

    const stageHeight = propStageHeight ?? (size === "sm" ? 40 : size === "lg" ? 80 : 60);
    const defaultHeight = size === "sm" ? 200 : size === "lg" ? 450 : 320;
    const svgHeight = typeof height === "number" ? height : defaultHeight;

    const totalStages = data.length;
    const maxValue = data.length > 0 ? data[0].value : 0;

    const stageMetrics = React.useMemo(() => {
      return data.map((stage, index) => {
        const percentage = maxValue > 0 ? (stage.value / maxValue) * 100 : 0;
        const conversionRate = index > 0 && data[index - 1].value > 0
          ? ((stage.value / data[index - 1].value) * 100)
          : 100;
        return { percentage, conversionRate };
      });
    }, [data, maxValue]);

    React.useEffect(() => {
      const widths = data.map((_, index) => {
        const ratio = maxValue > 0 ? data[index].value / maxValue : 0;
        return ratio;
      });
      setAnimatedWidths(widths);
    }, [data, maxValue]);

    const handleStageMouseEnter = (index: number) => {
      setHoveredStage(index);
      onStageHover?.(data[index], index);
    };

    const handleStageMouseLeave = () => {
      setHoveredStage(null);
      onStageHover?.(null, null);
    };

    const handleStageClick = (index: number) => {
      onStageClick?.(data[index], index);
    };

    const defaultTooltip = (
      stage: FunnelStage,
      index: number,
      percentage: number,
      conversionRate: number
    ): React.ReactNode => (
      <div className="text-xs space-y-1">
        <div className="font-medium">{stage.label}</div>
        <div>{formatValue(stage.value)}</div>
        {showPercentage && <div>{percentage.toFixed(1)}% of total</div>}
        {showConversionRate && index > 0 && (
          <div className="text-muted-foreground">
            {conversionRate.toFixed(1)}% from previous
          </div>
        )}
      </div>
    );

    const autoAriaLabel = React.useMemo(() => {
      if (ariaLabel) return ariaLabel;
      if (!data || data.length === 0) return "Empty funnel chart";
      const total = data.reduce((sum, s) => sum + s.value, 0);
      return `Funnel chart with ${data.length} stages, total value ${total.toLocaleString()}`;
    }, [ariaLabel, data]);

    if (!data || data.length === 0) {
      return (
        <div
          ref={ref}
          className={cn(
            funnelChartVariants({ size, orientation }),
            "flex items-center justify-center bg-muted/30 rounded-[--la-radius] p-8",
            className
          )}
          role="img"
          aria-label="Empty funnel chart"
          {...props}
        >
          <p className="text-muted-foreground">No data available</p>
        </div>
      );
    }

    if (orientation === "horizontal") {
      const totalWidth = 100;
      const barHeight = stageHeight;

      return (
        <TooltipPrimitive.Provider>
          <div
            ref={ref}
            className={cn(funnelChartVariants({ size, orientation }), className)}
            role="img"
            aria-label={autoAriaLabel}
            {...props}
          >
            <div className="space-y-2">
              {data.map((stage, index) => {
                const percentage = stageMetrics[index].percentage;
                const conversionRate = stageMetrics[index].conversionRate;
                const color = getStageColor(stage, index, totalStages, colorScale, customColors);
                const isHovered = hoveredStage === index;

                const stageElement = (
                  <div
                    key={stage.id}
                    className={cn(
                      "flex items-center gap-3",
                      onStageClick && "cursor-pointer"
                    )}
                    onClick={() => handleStageClick(index)}
                    onMouseEnter={() => handleStageMouseEnter(index)}
                    onMouseLeave={handleStageMouseLeave}
                    role="listitem"
                    aria-label={`${stage.label}: ${formatValue(stage.value)}, ${percentage.toFixed(1)}%`}
                  >
                    {showLabels && (
                      <div className="w-24 text-right text-muted-foreground truncate">
                        {stage.label}
                      </div>
                    )}
                    <div className="flex-1 h-12 bg-muted/20 rounded-sm overflow-hidden relative">
                      <div
                        className={cn(
                          funnelStageVariants({ borderRadius }),
                          "h-full transition-all",
                          isHovered && "opacity-90"
                        )}
                        style={{
                          width: `${(animatedWidths[index] || 0) * 100}%`,
                          backgroundColor: color,
                          transition: reducedMotion
                            ? "none"
                            : `width ${animationDuration}ms cubic-bezier(0.34, 1.56, 0.64, 1)`,
                        }}
                      />
                    </div>
                    {showValues && (
                      <div className="w-20 text-right tabular-nums">
                        {formatValue(stage.value)}
                      </div>
                    )}
                    {showPercentage && (
                      <div className="w-16 text-right text-muted-foreground tabular-nums">
                        {percentage.toFixed(0)}%
                      </div>
                    )}
                  </div>
                );

                if (showTooltip) {
                  return (
                    <TooltipPrimitive.Root key={stage.id}>
                      <TooltipPrimitive.Trigger asChild>
                        {stageElement}
                      </TooltipPrimitive.Trigger>
                      <TooltipPrimitive.Portal>
                        <TooltipPrimitive.Content
                          sideOffset={4}
                          className="z-50 overflow-hidden rounded-md border border-border bg-popover px-3 py-1.5 text-xs text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2"
                        >
                          {tooltipContent
                            ? tooltipContent(stage, index, percentage, conversionRate)
                            : defaultTooltip(stage, index, percentage, conversionRate)}
                        </TooltipPrimitive.Content>
                      </TooltipPrimitive.Portal>
                    </TooltipPrimitive.Root>
                  );
                }

                return stageElement;
              })}
            </div>
          </div>
        </TooltipPrimitive.Provider>
      );
    }

    const maxWidth = 100;
    const svgWidth = maxWidth;
    const totalHeight = totalStages * stageHeight + (totalStages - 1) * gap;

    return (
      <TooltipPrimitive.Provider>
        <div
          ref={ref}
          className={cn(funnelChartVariants({ size, orientation }), className)}
          role="img"
          aria-label={autoAriaLabel}
          {...props}
        >
          <svg
            width="100%"
            height={svgHeight}
            viewBox={`0 0 ${svgWidth} ${totalHeight}`}
            className="overflow-visible"
            preserveAspectRatio="xMidYMid meet"
          >
            <defs>
              <filter id="funnel-shadow" x="-10%" y="-10%" width="120%" height="120%">
                <feDropShadow dx="0" dy="2" stdDeviation="2" floodOpacity="0.1" />
              </filter>
            </defs>

            {data.map((stage, index) => {
              const percentage = stageMetrics[index].percentage;
              const conversionRate = stageMetrics[index].conversionRate;
              const color = getStageColor(stage, index, totalStages, colorScale, customColors);
              const isHovered = hoveredStage === index;

              const currentWidthRatio = animatedWidths[index] || 0;
              const currentWidth = currentWidthRatio * maxWidth;
              const xOffset = (maxWidth - currentWidth) / 2;

              const y = index * (stageHeight + gap);
              const radius = borderRadius === "none" ? 0 : borderRadius === "sm" ? 2 : borderRadius === "lg" ? 8 : 4;

              const stageElement = (
                <g key={stage.id}>
                  <rect
                    x={xOffset}
                    y={y}
                    width={Math.max(0, currentWidth)}
                    height={stageHeight}
                    fill={color}
                    rx={radius}
                    ry={radius}
                    filter={isHovered ? "url(#funnel-shadow)" : undefined}
                    className={cn(
                      funnelStageVariants({ borderRadius }),
                      onStageClick && "cursor-pointer",
                      isHovered && "opacity-90"
                    )}
                    style={{
                      transition: reducedMotion
                        ? "none"
                        : `all ${animationDuration}ms cubic-bezier(0.34, 1.56, 0.64, 1)`,
                    }}
                    onClick={() => handleStageClick(index)}
                    onMouseEnter={() => handleStageMouseEnter(index)}
                    onMouseLeave={handleStageMouseLeave}
                    role="img"
                    aria-label={`${stage.label}: ${formatValue(stage.value)}, ${percentage.toFixed(1)}%`}
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        handleStageClick(index);
                      }
                    }}
                  />

                  {showLabels && currentWidth > 20 && (
                    <text
                      x={maxWidth / 2}
                      y={y + stageHeight / 2 - (showValues || showPercentage ? 6 : 0)}
                      textAnchor="middle"
                      dominantBaseline="middle"
                      fill="hsl(var(--la-card-foreground))"
                      className="font-medium select-none pointer-events-none"
                      style={{
                        fontSize: size === "sm" ? 10 : size === "lg" ? 14 : 12,
                      }}
                    >
                      {stage.label.length > Math.floor(currentWidth / 6)
                        ? `${stage.label.slice(0, Math.floor(currentWidth / 6) - 2)}...`
                        : stage.label}
                    </text>
                  )}

                  {showValues && currentWidth > 30 && (
                    <text
                      x={maxWidth / 2}
                      y={y + stageHeight / 2 + (showLabels ? 8 : 0)}
                      textAnchor="middle"
                      dominantBaseline="middle"
                      fill="hsl(var(--la-card-foreground) / 0.8)"
                      className="select-none pointer-events-none tabular-nums"
                      style={{
                        fontSize: size === "sm" ? 9 : size === "lg" ? 12 : 10,
                      }}
                    >
                      {formatValue(stage.value)}
                    </text>
                  )}

                  {showPercentage && !showValues && currentWidth > 30 && (
                    <text
                      x={maxWidth / 2}
                      y={y + stageHeight / 2 + (showLabels ? 8 : 0)}
                      textAnchor="middle"
                      dominantBaseline="middle"
                      fill="hsl(var(--la-card-foreground) / 0.8)"
                      className="select-none pointer-events-none tabular-nums"
                      style={{
                        fontSize: size === "sm" ? 9 : size === "lg" ? 12 : 10,
                      }}
                    >
                      {percentage.toFixed(0)}%
                    </text>
                  )}
                </g>
              );

              if (showTooltip) {
                return (
                  <TooltipPrimitive.Root key={stage.id}>
                    <TooltipPrimitive.Trigger asChild>
                      {stageElement}
                    </TooltipPrimitive.Trigger>
                    <TooltipPrimitive.Portal>
                      <TooltipPrimitive.Content
                        sideOffset={4}
                        className="z-50 overflow-hidden rounded-md border border-border bg-popover px-3 py-1.5 text-xs text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2"
                      >
                        {tooltipContent
                          ? tooltipContent(stage, index, percentage, conversionRate)
                          : defaultTooltip(stage, index, percentage, conversionRate)}
                      </TooltipPrimitive.Content>
                    </TooltipPrimitive.Portal>
                  </TooltipPrimitive.Root>
                );
              }

              return stageElement;
            })}
          </svg>

          <div className="sr-only" aria-live="polite" aria-atomic="true">
            {hoveredStage !== null &&
              `Hovered: ${data[hoveredStage].label}, value: ${formatValue(data[hoveredStage].value)}, ${stageMetrics[hoveredStage].percentage.toFixed(1)}% of total`}
          </div>
        </div>
      </TooltipPrimitive.Provider>
    );
  }
);

FunnelChart.displayName = "FunnelChart";

export type FunnelChartVariants = VariantProps<typeof funnelChartVariants>;
export type FunnelStageVariants = VariantProps<typeof funnelStageVariants>;

export { FunnelChart, funnelChartVariants, funnelStageVariants };
