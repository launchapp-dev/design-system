import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";
import { useReducedMotion } from "../../lib/animation";

const marqueeVariants = cva("relative flex overflow-hidden", {
  variants: {
    direction: {
      left: "flex-row",
      right: "flex-row",
      up: "flex-col",
      down: "flex-col",
    },
    speed: {
      slow: "[--marquee-duration:60s]",
      normal: "[--marquee-duration:30s]",
      fast: "[--marquee-duration:15s]",
    },
  },
  defaultVariants: {
    direction: "left",
    speed: "normal",
  },
});

const marqueeContentVariants = cva("flex shrink-0", {
  variants: {
    direction: {
      left: "flex-row animate-marquee-left",
      right: "flex-row animate-marquee-right",
      up: "flex-col animate-marquee-up",
      down: "flex-col animate-marquee-down",
    },
    pauseOnHover: {
      true: "hover:[animation-play-state:paused]",
      false: "",
    },
  },
  defaultVariants: {
    direction: "left",
    pauseOnHover: false,
  },
});

export interface MarqueeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof marqueeVariants> {
  pauseOnHover?: boolean;
  showGradient?: boolean;
  gradientColor?: string;
  gradientWidth?: string | number;
}

const Marquee = React.forwardRef<HTMLDivElement, MarqueeProps>(
  (
    {
      className,
      children,
      direction = "left",
      speed = "normal",
      pauseOnHover = false,
      showGradient = false,
      gradientColor,
      gradientWidth = 64,
      ...props
    },
    ref,
  ) => {
    const prefersReducedMotion = useReducedMotion();

    if (prefersReducedMotion) {
      return (
        <div ref={ref} className={cn("relative overflow-hidden", className)} {...props}>
          {children}
        </div>
      );
    }

    const isVertical = direction === "up" || direction === "down";
    const gradientStyle = gradientColor
      ? ({ "--gradient-color": gradientColor } as React.CSSProperties)
      : {};
    const gradientWidthStyle =
      typeof gradientWidth === "number" ? `${gradientWidth}px` : gradientWidth;

    return (
      <div ref={ref} className={cn(marqueeVariants({ direction, speed }), className)} {...props}>
        {showGradient && !isVertical && (
          <>
            <div
              className="pointer-events-none absolute left-0 top-0 z-10 h-full bg-gradient-to-r from-[var(--gradient-color,var(--la-background))] to-transparent"
              style={{ width: gradientWidthStyle, ...gradientStyle }}
              aria-hidden="true"
            />
            <div
              className="pointer-events-none absolute right-0 top-0 z-10 h-full bg-gradient-to-l from-[var(--gradient-color,var(--la-background))] to-transparent"
              style={{ width: gradientWidthStyle, ...gradientStyle }}
              aria-hidden="true"
            />
          </>
        )}
        {showGradient && isVertical && (
          <>
            <div
              className="pointer-events-none absolute left-0 top-0 z-10 w-full bg-gradient-to-b from-[var(--gradient-color,var(--la-background))] to-transparent"
              style={{ height: gradientWidthStyle, ...gradientStyle }}
              aria-hidden="true"
            />
            <div
              className="pointer-events-none absolute bottom-0 left-0 z-10 w-full bg-gradient-to-t from-[var(--gradient-color,var(--la-background))] to-transparent"
              style={{ height: gradientWidthStyle, ...gradientStyle }}
              aria-hidden="true"
            />
          </>
        )}
        <div
          className={cn(
            marqueeContentVariants({ direction, pauseOnHover }),
            "[animation-duration:var(--marquee-duration)]",
          )}
          style={{ animationDuration: "var(--marquee-duration)" }}
        >
          {children}
        </div>
        <div
          className={cn(
            marqueeContentVariants({ direction, pauseOnHover }),
            "[animation-duration:var(--marquee-duration)]",
          )}
          style={{ animationDuration: "var(--marquee-duration)" }}
          aria-hidden="true"
        >
          {children}
        </div>
      </div>
    );
  },
);

Marquee.displayName = "Marquee";

export interface MarqueeItemProps extends React.HTMLAttributes<HTMLDivElement> {}

const MarqueeItem = React.forwardRef<HTMLDivElement, MarqueeItemProps>(
  ({ className, ...props }, ref) => {
    return <div ref={ref} className={cn("shrink-0", className)} {...props} />;
  },
);

MarqueeItem.displayName = "MarqueeItem";

export type MarqueeVariants = VariantProps<typeof marqueeVariants>;
export type MarqueeContentVariants = VariantProps<typeof marqueeContentVariants>;

export { Marquee, MarqueeItem, marqueeVariants, marqueeContentVariants };
