import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";

const realtimeTickerVariants = cva(
  "flex items-center gap-2 rounded-[--la-radius] border border-border bg-card px-3 py-2",
  {
    variants: {
      size: {
        sm: "text-xs",
        md: "text-sm",
        lg: "text-base",
      },
      variant: {
        default: "",
        compact: "px-2 py-1",
        expanded: "p-4",
      },
    },
    defaultVariants: {
      size: "md",
      variant: "default",
    },
  }
);

const tickerValueVariants = cva("font-semibold tabular-nums", {
  variants: {
    trend: {
      up: "text-[hsl(var(--la-chart-3))]",
      down: "text-destructive",
      neutral: "text-card-foreground",
    },
  },
  defaultVariants: {
    trend: "neutral",
  },
});

const tickerChangeVariants = cva("flex items-center gap-0.5 font-medium tabular-nums", {
  variants: {
    trend: {
      up: "text-[hsl(var(--la-chart-3))]",
      down: "text-destructive",
      neutral: "text-muted-foreground",
    },
  },
  defaultVariants: {
    trend: "neutral",
  },
});

export interface TickerItem {
  id: string;
  label: string;
  value: number;
  previousValue?: number;
  unit?: string;
  precision?: number;
  format?: "number" | "currency" | "percent" | "bytes";
}

export interface RealtimeTickerProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange">,
    VariantProps<typeof realtimeTickerVariants> {
  items: TickerItem[];
  updateInterval?: number;
  showTrend?: boolean;
  showChange?: boolean;
  live?: boolean;
  onUpdate?: (items: TickerItem[]) => void;
}

function formatValue(value: number, format: TickerItem["format"], precision: number): string {
  switch (format) {
    case "currency":
      if (Math.abs(value) >= 1000000) {
        return `$${(value / 1000000).toFixed(precision)}M`;
      }
      if (Math.abs(value) >= 1000) {
        return `$${(value / 1000).toFixed(precision)}K`;
      }
      return `$${value.toFixed(precision)}`;
    case "percent":
      return `${value.toFixed(precision)}%`;
    case "bytes":
      if (value >= 1073741824) {
        return `${(value / 1073741824).toFixed(precision)} GB`;
      }
      if (value >= 1048576) {
        return `${(value / 1048576).toFixed(precision)} MB`;
      }
      if (value >= 1024) {
        return `${(value / 1024).toFixed(precision)} KB`;
      }
      return `${value.toFixed(precision)} B`;
    default:
      if (Math.abs(value) >= 1000000) {
        return `${(value / 1000000).toFixed(precision)}M`;
      }
      if (Math.abs(value) >= 1000) {
        return `${(value / 1000).toFixed(precision)}K`;
      }
      return value.toFixed(precision);
  }
}

function getTrend(current: number, previous?: number): "up" | "down" | "neutral" {
  if (previous === undefined) return "neutral";
  if (current > previous) return "up";
  if (current < previous) return "down";
  return "neutral";
}

function TrendIcon({ trend }: { trend: "up" | "down" | "neutral" }) {
  if (trend === "neutral") return null;
  
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={cn(trend === "down" && "rotate-180")}
    >
      <path d="m18 15-6-6-6 6" />
    </svg>
  );
}

function LiveIndicator({ live }: { live: boolean }) {
  if (!live) return null;
  
  return (
    <span className="flex items-center gap-1">
      <span className="relative flex h-2 w-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-chart-3 opacity-75" />
        <span className="relative inline-flex rounded-full h-2 w-2 bg-chart-3" />
      </span>
      <span className="text-[10px] uppercase tracking-wider text-muted-foreground">Live</span>
    </span>
  );
}

function AnimatedValue({ 
  value, 
  previousValue,
  format,
  precision = 2,
  showTrend = true,
  size = "md",
}: {
  value: number;
  previousValue?: number;
  format?: TickerItem["format"];
  precision?: number;
  showTrend?: boolean;
  size?: "sm" | "md" | "lg";
}) {
  const [displayValue, setDisplayValue] = React.useState(value);
  const trend = getTrend(value, previousValue);
  
  React.useEffect(() => {
    if (previousValue !== undefined && value !== previousValue) {
      const startValue = displayValue;
      const endValue = value;
      const duration = 300;
      const startTime = performance.now();
      
      const animate = (currentTime: number) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        const eased = 1 - (1 - progress) ** 3;
        const current = startValue + (endValue - startValue) * eased;
        
        setDisplayValue(current);
        
        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };
      
      requestAnimationFrame(animate);
    } else {
      setDisplayValue(value);
    }
  }, [value, previousValue, displayValue]);
  
  const textSize = size === "sm" ? "text-sm" : size === "lg" ? "text-xl" : "text-base";
  
  return (
    <span className={cn(tickerValueVariants({ trend }), textSize, showTrend && "transition-colors duration-300")}>
      {formatValue(displayValue, format, precision)}
    </span>
  );
}

function RealtimeTicker({
  items,
  updateInterval = 2000,
  showTrend = true,
  showChange = true,
  live = false,
  size,
  variant,
  className,
  onUpdate,
  ref,
  ...props
}: RealtimeTickerProps & { ref?: React.Ref<HTMLDivElement> }) {
  const [currentItems, setCurrentItems] = React.useState<TickerItem[]>(items);
  const [previousItems, setPreviousItems] = React.useState<TickerItem[]>([]);
  
  React.useEffect(() => {
    setCurrentItems(items);
  }, [items]);
  
  React.useEffect(() => {
    if (!live || updateInterval <= 0) return;
    
    const interval = setInterval(() => {
      setPreviousItems(currentItems);
      
      const newItems = currentItems.map((item) => {
        const fluctuation = (Math.random() - 0.5) * 0.1;
        const newValue = item.value * (1 + fluctuation);
        
        return {
          ...item,
          previousValue: item.value,
          value: newValue,
        };
      });
      
      setCurrentItems(newItems);
      onUpdate?.(newItems);
    }, updateInterval);
    
    return () => clearInterval(interval);
  }, [live, updateInterval, currentItems, onUpdate]);
  
  return (
    <div
      ref={ref}
      className={cn(realtimeTickerVariants({ size, variant }), className)}
      role="status"
      aria-live={live ? "polite" : "off"}
      aria-label="Real-time data ticker"
      {...props}
    >
      {live && <LiveIndicator live={live} />}
      
      <div className={cn("flex flex-wrap gap-4", variant === "expanded" && "gap-6")}>
        {currentItems.map((item, _index) => {
          const previousItem = previousItems.find((p) => p.id === item.id);
          const previousValue = item.previousValue ?? previousItem?.value;
          const trend = getTrend(item.value, previousValue);
          const change = previousValue ? item.value - previousValue : 0;
          const changePercent = previousValue ? ((item.value - previousValue) / previousValue) * 100 : 0;
          
          return (
            <div key={item.id} className="flex flex-col">
              <span className="text-xs text-muted-foreground uppercase tracking-wide">
                {item.label}
              </span>
              <div className="flex items-baseline gap-2">
                <AnimatedValue
                  value={item.value}
                  previousValue={previousValue}
                  format={item.format}
                  precision={item.precision ?? 2}
                  showTrend={showTrend}
                  size={size ?? undefined}
                />
                {item.unit && (
                  <span className="text-muted-foreground">{item.unit}</span>
                )}
                {showChange && previousValue !== undefined && (
                  <span className={cn(tickerChangeVariants({ trend }), "text-xs")}>
                    <TrendIcon trend={trend} />
                    <span>
                      {change >= 0 ? "+" : ""}
                      {changePercent.toFixed(1)}%
                    </span>
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

RealtimeTicker.displayName = "RealtimeTicker";

export type RealtimeTickerVariants = VariantProps<typeof realtimeTickerVariants>;
export type TickerValueVariants = VariantProps<typeof tickerValueVariants>;
export type TickerChangeVariants = VariantProps<typeof tickerChangeVariants>;

export { RealtimeTicker, realtimeTickerVariants, tickerValueVariants, tickerChangeVariants };
