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

export interface GradientBorderProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof gradientBorderVariants> {
  borderColor?: string;
  secondaryColor?: string;
  duration?: number;
  gradientSize?: number;
}

const gradientBorderVariants = cva(
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

function GradientBorder({
  children,
  className,
  size = "md",
  borderColor = "hsl(var(--la-primary))",
  secondaryColor,
  duration = 4,
  gradientSize = 45,
  ref,
  style,
  ...props
}: GradientBorderProps & { ref?: React.Ref<HTMLDivElement> }) {
  const reduced = usePrefersReducedMotion();
  const padding = size === "sm" ? 1 : size === "md" ? 2 : 3;
  const secondary = secondaryColor || borderColor;

  return (
    <div
      ref={ref}
      className={cn(gradientBorderVariants({ size }), className)}
      style={style}
      {...props}
    >
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          padding: `${padding}px`,
          background: reduced
            ? "none"
            : `conic-gradient(from 0deg, ${borderColor} 0%, ${secondary} ${gradientSize}%, transparent ${gradientSize * 2}%, ${borderColor} ${gradientSize * 2 + 20}%, ${secondary} 100%)`,
          animation: reduced ? "none" : `gradient-spin ${duration}s linear infinite`,
          borderRadius: "inherit",
        }}
      />
      <div className="relative z-10 bg-card text-card-foreground rounded-[calc(var(--la-radius)-2px)]">
        {children}
      </div>
      {!reduced && (
        <style>{`
          @keyframes gradient-spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      )}
    </div>
  );
}

GradientBorder.displayName = "GradientBorder";

export { GradientBorder, gradientBorderVariants };
