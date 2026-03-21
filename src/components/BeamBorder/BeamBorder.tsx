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

export interface BeamBorderProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof beamBorderVariants> {
  borderColor?: string;
  duration?: number;
  beamWidth?: number;
}

const beamBorderVariants = cva(
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

function BeamBorder({
  children,
  className,
  size = "md",
  borderColor = "hsl(var(--la-primary))",
  duration = 3,
  beamWidth = 60,
  ref,
  style,
  ...props
}: BeamBorderProps & { ref?: React.Ref<HTMLDivElement> }) {
  const reduced = usePrefersReducedMotion();
  const padding = size === "sm" ? 1 : size === "md" ? 2 : 3;

  return (
    <div
      ref={ref}
      className={cn(beamBorderVariants({ size }), className)}
      style={style}
      {...props}
    >
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          padding: `${padding}px`,
        }}
      >
        <div
          className="absolute inset-0 rounded-[calc(var(--la-radius)-2px)]"
          style={{
            background: `linear-gradient(90deg, transparent 0%, transparent calc(50% - ${beamWidth / 2}px), ${borderColor} 50%, transparent calc(50% + ${beamWidth / 2}px), transparent 100%)`,
            backgroundSize: "200% 100%",
            animation: reduced ? "none" : "beam-slide 2s linear infinite",
          }}
        />
      </div>
      <div className="relative z-10 bg-card text-card-foreground rounded-[calc(var(--la-radius)-2px)]">
        {children}
      </div>
      {!reduced && (
        <style>{`
          @keyframes beam-slide {
            0% { background-position: 200% 0; }
            100% { background-position: 0% 0; }
          }
        `}</style>
      )}
    </div>
  );
}

BeamBorder.displayName = "BeamBorder";

export { BeamBorder, beamBorderVariants };
