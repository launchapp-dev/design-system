import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";
import { useReducedMotion } from "../../lib/animation";

const gaugeVariants = cva("relative inline-flex items-center justify-center", {
  variants: {
    size: {
      sm: "h-24 w-24",
      md: "h-32 w-32",
      lg: "h-40 w-40",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

export interface GaugeColorZone {
  from: number;
  to: number;
  color: string;
}

export interface GaugeProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "value">,
    VariantProps<typeof gaugeVariants> {
  value: number;
  min?: number;
  max?: number;
  label?: string;
  unit?: string;
  showValue?: boolean;
  showMinMax?: boolean;
  colorZones?: GaugeColorZone[];
  trackColor?: string;
  needleColor?: string;
  centerColor?: string;
  startAngle?: number;
  endAngle?: number;
  animationDuration?: number;
  "aria-label"?: string;
  formatValue?: (value: number) => string;
}

function polarToCartesian(centerX: number, centerY: number, radius: number, angleInDegrees: number) {
  const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180;
  return {
    x: centerX + radius * Math.cos(angleInRadians),
    y: centerY + radius * Math.sin(angleInRadians),
  };
}

function describeArc(
  x: number,
  y: number,
  radius: number,
  startAngle: number,
  endAngle: number
) {
  const start = polarToCartesian(x, y, radius, endAngle);
  const end = polarToCartesian(x, y, radius, startAngle);
  const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";

  return [
    "M",
    start.x,
    start.y,
    "A",
    radius,
    radius,
    0,
    largeArcFlag,
    0,
    end.x,
    end.y,
  ].join(" ");
}

function valueToAngle(
  value: number,
  min: number,
  max: number,
  startAngle: number,
  endAngle: number
): number {
  const normalized = Math.max(0, Math.min(1, (value - min) / (max - min)));
  return startAngle + normalized * (endAngle - startAngle);
}

const Gauge = React.forwardRef<HTMLDivElement, GaugeProps>(
  (
    {
      value,
      min = 0,
      max = 100,
      label,
      unit,
      showValue = true,
      showMinMax = true,
      colorZones,
      trackColor = "hsl(var(--la-muted))",
      needleColor = "hsl(var(--la-primary))",
      centerColor = "hsl(var(--la-card))",
      startAngle = 135,
      endAngle = 405,
      animationDuration = 500,
      size,
      className,
      "aria-label": ariaLabel,
      formatValue,
      ...props
    },
    ref
  ) => {
  const reducedMotion = useReducedMotion();
  const clampedValue = Math.max(min, Math.min(max, value));
  const needleAngle = valueToAngle(clampedValue, min, max, startAngle, endAngle);

  const defaultZones: GaugeColorZone[] = colorZones ?? [
    { from: min, to: min + (max - min) * 0.3, color: "hsl(142, 71%, 45%)" },
    { from: min + (max - min) * 0.3, to: min + (max - min) * 0.7, color: "hsl(45, 93%, 47%)" },
    { from: min + (max - min) * 0.7, to: max, color: "hsl(0, 72%, 51%)" },
  ];

  const displayValue = formatValue ? formatValue(clampedValue) : clampedValue.toFixed(0);

  const autoAriaLabel =
    ariaLabel ||
    (label
      ? `${label}: ${displayValue}${unit ? " " + unit : ""}, range ${min} to ${max}`
      : `Gauge value ${displayValue}${unit ? " " + unit : ""}, range ${min} to ${max}`);

  const svgSize = size === "sm" ? 96 : size === "lg" ? 160 : 128;
  const center = svgSize / 2;
  const trackRadius = center - 12;
  const needleLength = trackRadius - 8;
  const needleWidth = size === "sm" ? 3 : size === "lg" ? 5 : 4;

  return (
    <div
      ref={ref}
      className={cn(gaugeVariants({ size }), "flex-col", className)}
      role="img"
      aria-label={autoAriaLabel}
      aria-valuenow={clampedValue}
      aria-valuemin={min}
      aria-valuemax={max}
      {...props}
    >
      <svg
        width={svgSize}
        height={svgSize}
        viewBox={`0 0 ${svgSize} ${svgSize}`}
        className="transform -rotate-0"
        aria-hidden="true"
      >
        <defs>
          <filter id="gauge-shadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow
              dx="0"
              dy="2"
              stdDeviation="3"
              floodOpacity="0.15"
            />
          </filter>
        </defs>

        <g filter="url(#gauge-shadow)">
          {defaultZones.map((zone, index) => {
            const zoneStartAngle = valueToAngle(zone.from, min, max, startAngle, endAngle);
            const zoneEndAngle = valueToAngle(zone.to, min, max, startAngle, endAngle);
            const pathId = `zone-${index}`;

            return (
              <path
                key={index}
                d={describeArc(center, center, trackRadius, zoneStartAngle, zoneEndAngle)}
                fill="none"
                stroke={zone.color}
                strokeWidth={size === "sm" ? 6 : size === "lg" ? 10 : 8}
                strokeLinecap="round"
              />
            );
          })}
        </g>

        <circle
          cx={center}
          cy={center}
          r={needleLength - 10}
          fill={centerColor}
          stroke={trackColor}
          strokeWidth={1}
        />

        <g
          style={{
            transformOrigin: `${center}px ${center}px`,
            transform: `rotate(${needleAngle}deg)`,
            transition: reducedMotion
              ? "none"
              : `transform ${animationDuration}ms cubic-bezier(0.34, 1.56, 0.64, 1)`,
          }}
        >
          <polygon
            points={`${center},${center - needleLength} ${center - needleWidth / 2},${center - 8} ${center + needleWidth / 2},${center - 8}`}
            fill={needleColor}
            className="transition-colors duration-200"
          />
        </g>

        <circle
          cx={center}
          cy={center}
          r={size === "sm" ? 6 : size === "lg" ? 10 : 8}
          fill={needleColor}
        />
      </svg>

      <div className="flex flex-col items-center -mt-2">
        {showValue && (
          <div className="flex items-baseline gap-0.5">
            <span className="text-lg font-bold tabular-nums">{displayValue}</span>
            {unit && <span className="text-sm text-muted-foreground">{unit}</span>}
          </div>
        )}
        {label && (
          <span className="text-xs text-muted-foreground text-center max-w-[80%]">
            {label}
          </span>
        )}
      </div>

      {showMinMax && (
        <div className="absolute bottom-0 left-0 right-0 flex justify-between px-1 text-[10px] text-muted-foreground/60">
          <span>{min}</span>
          <span>{max}</span>
        </div>
      )}
    </div>
  );
  }
);

Gauge.displayName = "Gauge";

export type GaugeVariants = VariantProps<typeof gaugeVariants>;

export { Gauge, gaugeVariants };
