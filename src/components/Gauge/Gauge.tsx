import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const gaugeVariants = cva("relative inline-flex items-center justify-center", {
  variants: {
    size: {
      sm: "w-32 h-20",
      md: "w-48 h-28",
      lg: "w-64 h-36",
    },
    variant: {
      default: "",
      success: "[&_.gauge-fill]:text-success",
      warning: "[&_.gauge-fill]:text-warning",
      destructive: "[&_.gauge-fill]:text-destructive",
    },
  },
  defaultVariants: {
    size: "md",
    variant: "default",
  },
});

export interface GaugeProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "color">,
    VariantProps<typeof gaugeVariants> {
  value: number;
  min?: number;
  max?: number;
  label?: string;
  showValue?: boolean;
  unit?: string;
  thickness?: number;
  animated?: boolean;
  duration?: number;
}

function Gauge(
  {
    value,
    min = 0,
    max = 100,
    label,
    showValue = true,
    unit = "%",
    thickness = 12,
    animated = true,
    duration = 1000,
    size,
    variant,
    className,
    ref,
    ...props
  }: GaugeProps & { ref?: React.Ref<HTMLDivElement> }
) {
  const [animatedValue, setAnimatedValue] = React.useState(min);
  const percentage = ((animatedValue - min) / (max - min)) * 100;
  const angle = (percentage / 100) * 180 - 90;

  React.useEffect(() => {
    if (!animated) {
      setAnimatedValue(value);
      return;
    }

    const startTime = Date.now();
    const startValue = animatedValue;
    const endValue = value;
    const animate = () => {
      const now = Date.now();
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const currentValue = startValue + (endValue - startValue) * eased;
      setAnimatedValue(currentValue);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [value, animated, duration, min, max]);

  const radius = 45;
  const circumference = Math.PI * radius;
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div
      ref={ref}
      className={cn(gaugeVariants({ size, variant }), className)}
      role="meter"
      aria-valuenow={value}
      aria-valuemin={min}
      aria-valuemax={max}
      aria-label={label ?? `Gauge: ${value}${unit}`}
      tabIndex={0}
      {...props}
    >
      <svg
        viewBox="0 0 100 55"
        className="w-full h-full"
        role="presentation"
      >
        <defs>
          <linearGradient id={`gauge-gradient-${variant}`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="hsl(var(--la-chart-1))" />
            <stop offset="50%" stopColor="hsl(var(--la-chart-3))" />
            <stop offset="100%" stopColor="hsl(var(--la-chart-5))" />
          </linearGradient>
        </defs>
        <path
          d="M 10 50 A 40 40 0 0 1 90 50"
          fill="none"
          stroke="hsl(var(--la-muted))"
          strokeWidth={thickness}
          strokeLinecap="round"
          className="opacity-20"
        />
        <path
          d="M 10 50 A 40 40 0 0 1 90 50"
          fill="none"
          stroke={`url(#gauge-gradient-${variant})`}
          strokeWidth={thickness}
          strokeLinecap="round"
          strokeDasharray={strokeDasharray}
          strokeDashoffset={strokeDashoffset}
          className="gauge-fill transition-all"
          style={{
            transformOrigin: "center",
          }}
        />
        <g transform={`rotate(${angle} 50 50)`}>
          <line
            x1="50"
            y1="50"
            x2="50"
            y2="20"
            stroke="hsl(var(--la-foreground))"
            strokeWidth="2"
            strokeLinecap="round"
            className={animated ? "transition-transform" : ""}
          />
          <circle cx="50" cy="50" r="4" fill="hsl(var(--la-foreground))" />
        </g>
      </svg>
      {showValue && (
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 text-center">
          <div className="text-2xl font-bold">
            {Math.round(animatedValue)}
            {unit}
          </div>
          {label && <div className="text-xs text-muted-foreground">{label}</div>}
        </div>
      )}
    </div>
  );
}
Gauge.displayName = "Gauge";

export { Gauge, gaugeVariants };
