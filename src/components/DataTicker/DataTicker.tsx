import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const dataTickerVariants = cva(
  "inline-flex items-center gap-2 px-3 py-1.5 rounded-md border border-border bg-card",
  {
    variants: {
      size: {
        sm: "text-xs",
        md: "text-sm",
        lg: "text-base",
      },
      variant: {
        default: "",
        primary: "border-primary/20 bg-primary/5",
        success: "border-success/20 bg-success/5",
        warning: "border-warning/20 bg-warning/5",
        destructive: "border-destructive/20 bg-destructive/5",
      },
    },
    defaultVariants: {
      size: "md",
      variant: "default",
    },
  }
);

export interface TickerItem {
  label: string;
  value: string | number;
  change?: number;
  prefix?: string;
  suffix?: string;
}

export interface DataTickerProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof dataTickerVariants> {
  items: TickerItem[];
  autoUpdate?: boolean;
  updateInterval?: number;
  maxItems?: number;
  showChange?: boolean;
  animated?: boolean;
}

function DataTicker(
  {
    items,
    autoUpdate = false,
    updateInterval = 3000,
    maxItems,
    showChange = true,
    animated = true,
    size,
    variant,
    className,
    ref,
    ...props
  }: DataTickerProps & { ref?: React.Ref<HTMLDivElement> }
) {
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [displayItems, setDisplayItems] = React.useState(items);
  const [isVisible, setIsVisible] = React.useState(true);

  const itemsToShow = maxItems ? items.slice(0, maxItems) : items;

  React.useEffect(() => {
    setDisplayItems(itemsToShow);
  }, [itemsToShow]);

  React.useEffect(() => {
    if (!autoUpdate || displayItems.length <= 1) return;

    const interval = setInterval(() => {
      setIsVisible(false);

      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % displayItems.length);
        setIsVisible(true);
      }, 300);
    }, updateInterval);

    return () => clearInterval(interval);
  }, [autoUpdate, updateInterval, displayItems.length]);

  const formatChange = (change: number) => {
    const sign = change >= 0 ? "+" : "";
    return `${sign}${change.toFixed(2)}%`;
  };

  const getChangeColor = (change: number) => {
    if (change > 0) return "text-success";
    if (change < 0) return "text-destructive";
    return "text-muted-foreground";
  };

  return (
    <div
      ref={ref}
      className={cn(dataTickerVariants({ size, variant }), className)}
      role="marquee"
      aria-live="polite"
      aria-label="Real-time data ticker"
      {...props}
    >
      {displayItems.length === 1 || !autoUpdate ? (
        displayItems.map((item, idx) => (
          <div key={idx} className="flex items-center gap-2">
            <span className="text-muted-foreground">{item.label}:</span>
            <span className="font-semibold">
              {item.prefix}
              {item.value}
              {item.suffix}
            </span>
            {showChange && item.change !== undefined && (
              <span className={cn("font-medium", getChangeColor(item.change))}>
                {formatChange(item.change)}
              </span>
            )}
          </div>
        ))
      ) : (
        <div
          className={cn(
            "flex items-center gap-2 transition-opacity duration-300",
            animated && (isVisible ? "opacity-100" : "opacity-0")
          )}
        >
          <span className="text-muted-foreground">
            {displayItems[currentIndex].label}:
          </span>
          <span className="font-semibold">
            {displayItems[currentIndex].prefix}
            {displayItems[currentIndex].value}
            {displayItems[currentIndex].suffix}
          </span>
          {showChange && displayItems[currentIndex].change !== undefined && (
            <span
              className={cn(
                "font-medium",
                getChangeColor(displayItems[currentIndex].change)
              )}
            >
              {formatChange(displayItems[currentIndex].change)}
            </span>
          )}
        </div>
      )}
      {autoUpdate && (
        <div className="ml-2 flex gap-1">
          {displayItems.map((_, idx) => (
            <div
              key={idx}
              className={cn(
                "w-1.5 h-1.5 rounded-full transition-colors",
                idx === currentIndex ? "bg-primary" : "bg-muted"
              )}
            />
          ))}
        </div>
      )}
    </div>
  );
}
DataTicker.displayName = "DataTicker";

export { DataTicker, dataTickerVariants };
