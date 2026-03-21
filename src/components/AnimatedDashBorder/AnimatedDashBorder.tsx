import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";

function usePrefersReducedMotion(): boolean {
  return React.useMemo(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    []
  );
}

export interface AnimatedDashBorderProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof animatedDashBorderVariants> {
  borderColor?: string;
  duration?: number;
  dashWidth?: number;
  dashGap?: number;
}

const animatedDashBorderVariants = cva(
  "relative rounded-[calc(var(--la-radius)-1px)] overflow-hidden",
  {
    variants: {
      size: {
        sm: "p-px",
        md: "p-[2px]",
        lg: "p-[3px]",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

function AnimatedDashBorder({
  children,
  className,
  size = "md",
  borderColor = "hsl(var(--la-primary))",
  duration = 2,
  dashWidth = 8,
  dashGap = 4,
  ref,
  style,
  ...props
}: AnimatedDashBorderProps & { ref?: React.Ref<HTMLDivElement> }) {
  const reduced = usePrefersReducedMotion();
  const padding = size === "sm" ? 1 : size === "md" ? 2 : 3;
  const totalDash = dashWidth + dashGap;

  return (
    <div
      ref={ref}
      className={cn(animatedDashBorderVariants({ size }), className)}
      style={style}
      {...props}
    >
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          padding: `${padding}px`,
          background: reduced
            ? `repeating-linear-gradient(0deg, ${borderColor} 0px, ${borderColor} ${dashWidth}px, transparent ${dashWidth}px, transparent ${totalDash}px), repeating-linear-gradient(90deg, ${borderColor} 0px, ${borderColor} ${dashWidth}px, transparent ${dashWidth}px, transparent ${totalDash}px), repeating-linear-gradient(180deg, ${borderColor} 0px, ${borderColor} ${dashWidth}px, transparent ${dashWidth}px, transparent ${totalDash}px), repeating-linear-gradient(270deg, ${borderColor} 0px, ${borderColor} ${dashWidth}px, transparent ${dashWidth}px, transparent ${totalDash}px)`
            : `repeating-linear-gradient(0deg, ${borderColor} 0px, ${borderColor} ${dashWidth}px, transparent ${dashWidth}px, transparent ${totalDash}px)`,
          backgroundSize: reduced ? "100% 100%" : `${totalDash}px 100%`,
          animation: reduced ? "none" : `dash-march-vertical ${duration}s linear infinite`,
          borderRadius: "inherit",
        }}
      />
      {!reduced && (
        <style>{`
          @keyframes dash-march-vertical {
            0% { background-position: 0 0; }
            100% { background-position: ${totalDash}px 0; }
          }
        `}</style>
      )}
      <div className="relative z-10 bg-card text-card-foreground rounded-[calc(var(--la-radius)-2px)]">
        {children}
      </div>
    </div>
  );
}

AnimatedDashBorder.displayName = "AnimatedDashBorder";

export { AnimatedDashBorder, animatedDashBorderVariants };
