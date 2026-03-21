import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";

const gaugeVariants = cva("relative inline-flex items-center justify-center", {
  variants: {
    size: {
      sm: "w-20 h-12",
      md: "w-32 h-20",
      lg: "w-48 h-28",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

const needleVariants = cva("absolute origin-bottom transition-transform", {
  variants: {
    animation: {
      none: "",
      smooth: "ease-out",
      bounce: "",
    },
  },
  defaultVariants: {
    animation: "smooth",
  },
});

export interface GaugeProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "color">,
    VariantProps<typeof gaugeVariants> {
  value: number;
  min?: number;
  max?: number;
  startAngle?: number;
  endAngle?: number;
  showValue?: boolean;
  showMinMax?: boolean;
  showLabel?: boolean;
  label?: string;
  formatValue?: (value: number) => string;
  colorScheme?: "primary" | "secondary" | "success" | "warning" | "destructive" | "muted" | "accent" | "chart1" | "chart2" | "chart3" | "chart4" | "chart5";
  trackColor?: string;
  needleColor?: string;
  needleLength?: number;
  needleWidth?: number;
  animationDuration?: number;
  animated?: boolean;
  "aria-label"?: string;
  "aria-valuemin"?: number;
  "aria-valuemax"?: number;
  "aria-valuenow"?: number;
  segments?: number;
  thresholds?: { value: number; color: string; label?: string }[];
}

function Gauge({
  value,
  min = 0,
  max = 100,
  startAngle = -135,
  endAngle = 135,
  showValue = true,
  showMinMax = true,
  showLabel = false,
  label,
  formatValue = (v) => v.toFixed(0),
  colorScheme = "primary",
  trackColor,
  needleColor,
  needleLength,
  needleWidth = 3,
  animationDuration = 800,
  animated = true,
  size,
  className,
  "aria-label": ariaLabel,
  "aria-valuemin": ariaValueMin,
  "aria-valuemax": ariaValueMax,
  "aria-valuenow": ariaValueNow,
  segments = 5,
  thresholds,
  ref,
  ...props
}: GaugeProps & { ref?: React.Ref<HTMLDivElement> }) {
  const containerRef = React.useRef<HTMLDivElement>(null);
  React.useImperativeHandle(ref, () => containerRef.current!);

  const svgRef = React.useRef<SVGSVGElement>(null);

  const clampedValue = Math.max(min, Math.min(max, value));
  const range = max - min;
  const valuePercentage = ((clampedValue - min) / range) * 100;

  const angleRange = endAngle - startAngle;
  const valueAngle = startAngle + (valuePercentage / 100) * angleRange;

  const getColor = React.useCallback((scheme: string): string => {
    const colorMap: Record<string, string> = {
      primary: "hsl(var(--la-primary))",
      secondary: "hsl(var(--la-secondary-foreground))",
      success: "hsl(var(--la-chart-3))",
      warning: "hsl(var(--la-chart-4))",
      destructive: "hsl(var(--la-destructive))",
      muted: "hsl(var(--la-muted-foreground))",
      accent: "hsl(var(--la-accent-foreground))",
      chart1: "hsl(var(--la-chart-1))",
      chart2: "hsl(var(--la-chart-2))",
      chart3: "hsl(var(--la-chart-3))",
      chart4: "hsl(var(--la-chart-4))",
      chart5: "hsl(var(--la-chart-5))",
    };
    return colorMap[scheme] || colorMap.primary;
  }, []);

  const gaugeColor = getColor(colorScheme);
  const computedTrackColor = trackColor || "hsl(var(--la-muted))";

  const width = size === "sm" ? 80 : size === "lg" ? 192 : 128;
  const height = size === "sm" ? 48 : size === "lg" ? 112 : 72;
  const centerX = width / 2;
  const centerY = height - 4;
  const radius = size === "sm" ? 34 : size === "lg" ? 82 : 54;
  const computedNeedleLength = needleLength ?? radius * 0.75;

  const polarToCartesian = React.useCallback(
    (cx: number, cy: number, r: number, angle: number) => {
      const angleInRadians = ((angle - 90) * Math.PI) / 180;
      return {
        x: cx + r * Math.cos(angleInRadians),
        y: cy + r * Math.sin(angleInRadians),
      };
    },
    []
  );

  const createArc = React.useCallback(
    (startAngle: number, endAngle: number, r: number) => {
      const start = polarToCartesian(centerX, centerY, r, endAngle);
      const end = polarToCartesian(centerX, centerY, r, startAngle);
      const largeArcFlag = endAngle - startAngle <= 180 ? 0 : 1;
      return `M ${start.x} ${start.y} A ${r} ${r} 0 ${largeArcFlag} 0 ${end.x} ${end.y}`;
    },
    [centerX, centerY, polarToCartesian]
  );

  const trackPath = createArc(startAngle, endAngle, radius);
  const valuePath = createArc(startAngle, valueAngle, radius);

  const needleTip = polarToCartesian(centerX, centerY, computedNeedleLength, valueAngle);
  const needleBase1 = polarToCartesian(centerX, centerY, needleWidth, valueAngle - 90);
  const needleBase2 = polarToCartesian(centerX, centerY, needleWidth, valueAngle + 90);

  const needlePath = `M ${needleTip.x} ${needleTip.y} L ${needleBase1.x} ${needleBase1.y} L ${needleBase2.x} ${needleBase2.y} Z`;

  const tickAngles = React.useMemo(() => {
    const ticks: number[] = [];
    for (let i = 0; i <= segments; i++) {
      ticks.push(startAngle + (i / segments) * angleRange);
    }
    return ticks;
  }, [startAngle, endAngle, segments, angleRange]);

  const autoAriaLabel = React.useMemo(() => {
    if (ariaLabel) return ariaLabel;
    return `${label ? `${label}: ` : ""}${formatValue(clampedValue)} out of ${max}`;
  }, [ariaLabel, label, clampedValue, max, formatValue]);

  const computedNeedleColor = needleColor || gaugeColor;

  return (
    <div
      ref={containerRef}
      role="meter"
      aria-label={autoAriaLabel}
      aria-valuemin={ariaValueMin ?? min}
      aria-valuemax={ariaValueMax ?? max}
      aria-valuenow={ariaValueNow ?? clampedValue}
      className={cn(gaugeVariants({ size }), className)}
      {...props}
    >
      <svg
        ref={svgRef}
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        className="overflow-visible"
      >
        <defs>
          <linearGradient id={`gauge-gradient-${colorScheme}`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={getColor(thresholds?.[0]?.color || colorScheme)} />
            <stop offset="100%" stopColor={gaugeColor} />
          </linearGradient>
          <filter id={`gauge-glow-${colorScheme}`}>
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <path
          d={trackPath}
          fill="none"
          stroke={computedTrackColor}
          strokeWidth={size === "sm" ? 4 : size === "lg" ? 10 : 6}
          strokeLinecap="round"
        />

        <path
          d={valuePath}
          fill="none"
          stroke={thresholds ? getColor(colorScheme) : gaugeColor}
          strokeWidth={size === "sm" ? 4 : size === "lg" ? 10 : 6}
          strokeLinecap="round"
          className="transition-all"
          style={{
            filter: `url(#gauge-glow-${colorScheme})`,
          }}
        />

        {thresholds?.map((threshold, index) => {
          const thresholdAngle = startAngle + ((threshold.value - min) / range) * angleRange;
          const pos = polarToCartesian(centerX, centerY, radius, thresholdAngle);
          return (
            <circle
              key={index}
              cx={pos.x}
              cy={pos.y}
              r={size === "sm" ? 2 : size === "lg" ? 4 : 3}
              fill={getColor(threshold.color)}
            />
          );
        })}

        {tickAngles.map((angle, index) => {
          const innerPos = polarToCartesian(centerX, centerY, radius - 4, angle);
          const outerPos = polarToCartesian(centerX, centerY, radius + 4, angle);
          return (
            <line
              key={index}
              x1={innerPos.x}
              y1={innerPos.y}
              x2={outerPos.x}
              y2={outerPos.y}
              stroke="currentColor"
              strokeWidth={1}
              className="text-muted-foreground"
            />
          );
        })}

        <g
          className={cn(needleVariants({ animation: animated ? "smooth" : "none" }))}
          style={{
            transform: `rotate(${valueAngle}deg)`,
            transformOrigin: `${centerX}px ${centerY}px`,
            transitionDuration: animated ? `${animationDuration}ms` : "0ms",
            transitionTimingFunction: animated ? "cubic-bezier(0.34, 1.56, 0.64, 1)" : "linear",
          }}
        >
          <path
            d={needlePath}
            fill={computedNeedleColor}
            className="drop-shadow-md"
          />
          <circle
            cx={centerX}
            cy={centerY}
            r={needleWidth + 2}
            fill={computedTrackColor}
          />
          <circle
            cx={centerX}
            cy={centerY}
            r={needleWidth}
            fill={computedNeedleColor}
          />
        </g>

        {showMinMax && (
          <>
            <text
              x={polarToCartesian(centerX, centerY, radius + 12, startAngle).x}
              y={polarToCartesian(centerX, centerY, radius + 12, startAngle).y + 4}
              fontSize={size === "sm" ? 8 : size === "lg" ? 12 : 10}
              fill="currentColor"
              className="text-muted-foreground"
              textAnchor={startAngle < -90 ? "end" : "middle"}
            >
              {min}
            </text>
            <text
              x={polarToCartesian(centerX, centerY, radius + 12, endAngle).x}
              y={polarToCartesian(centerX, centerY, radius + 12, endAngle).y + 4}
              fontSize={size === "sm" ? 8 : size === "lg" ? 12 : 10}
              fill="currentColor"
              className="text-muted-foreground"
              textAnchor={endAngle > 90 ? "start" : "middle"}
            >
              {max}
            </text>
          </>
        )}
      </svg>

      {(showValue || showLabel) && (
        <div className="absolute inset-x-0 flex flex-col items-center" style={{ top: height * 0.15 }}>
          {showLabel && label && (
            <span className={cn(
              "text-muted-foreground font-medium",
              size === "sm" ? "text-[10px]" : size === "lg" ? "text-sm" : "text-xs"
            )}>
              {label}
            </span>
          )}
          {showValue && (
            <span className={cn(
              "font-bold text-foreground",
              size === "sm" ? "text-sm" : size === "lg" ? "text-2xl" : "text-lg"
            )}>
              {formatValue(clampedValue)}
            </span>
          )}
        </div>
      )}
    </div>
  );
}

Gauge.displayName = "Gauge";

export { Gauge, gaugeVariants, needleVariants };
