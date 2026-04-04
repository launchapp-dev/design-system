import * as React from "react";
import { cn } from "../../lib/utils";

function usePrefersReducedMotion() {
  return React.useMemo(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    [],
  );
}

export interface AnimatedBorderProps
  extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "beam" | "gradient-spin" | "dashed";
  borderColor?: string;
  secondaryColor?: string;
  duration?: number;
  size?: "sm" | "md" | "lg";
}

const sizeMap = {
  sm: 1,
  md: 2,
  lg: 3,
};

function AnimatedBorder({
  children,
  className,
  variant = "beam",
  borderColor = "hsl(var(--la-primary))",
  secondaryColor,
  duration = 4,
  size = "md",
  ref,
  style,
  ...props
}: AnimatedBorderProps & { ref?: React.Ref<HTMLDivElement> }) {
  const reduced = usePrefersReducedMotion();
  const borderWidth = sizeMap[size];
  const secondary = secondaryColor || borderColor;
  const dashLength = 8 + borderWidth * 2;
  const gapLength = 4 + borderWidth;

  const renderBeamBorder = () => (
    <div
      aria-hidden
      className="absolute inset-0 pointer-events-none"
      style={{
        padding: `${borderWidth}px`,
      }}
    >
      <div
        className="absolute inset-0 rounded-[calc(var(--la-radius)-1px)]"
        style={{
          background: `linear-gradient(90deg, transparent 0%, transparent 45%, ${borderColor} 50%, transparent 55%, transparent 100%)`,
          backgroundSize: "200% 100%",
          animation: reduced ? "none" : "beam-slide 2s linear infinite",
        }}
      />
    </div>
  );

  const renderGradientSpinBorder = () => (
    <div
      aria-hidden
      className="absolute inset-0 pointer-events-none"
      style={{
        padding: `${borderWidth}px`,
        background: reduced
          ? "none"
          : `conic-gradient(from 0deg, ${borderColor} 0%, ${secondary} 25%, transparent 50%, ${borderColor} 75%, ${secondary} 100%)`,
        animation: reduced ? "none" : `spin ${duration}s linear infinite`,
        borderRadius: "inherit",
      }}
    />
  );

  const renderDashedBorder = () => (
    <div
      aria-hidden
      className="absolute inset-0 pointer-events-none rounded-[calc(var(--la-radius)-1px)]"
      style={{
        padding: `${borderWidth}px`,
        background: reduced
          ? `repeating-linear-gradient(0deg, ${borderColor}, ${borderColor} ${dashLength}px, transparent ${dashLength}px, transparent ${dashLength + gapLength}px), repeating-linear-gradient(90deg, ${borderColor}, ${borderColor} ${dashLength}px, transparent ${dashLength}px, transparent ${dashLength + gapLength}px), repeating-linear-gradient(180deg, ${borderColor}, ${borderColor} ${dashLength}px, transparent ${dashLength}px, transparent ${dashLength + gapLength}px), repeating-linear-gradient(270deg, ${borderColor}, ${borderColor} ${dashLength}px, transparent ${dashLength}px, transparent ${dashLength + gapLength}px)`
          : `repeating-linear-gradient(0deg, ${borderColor}, ${borderColor} ${dashLength}px, transparent ${dashLength}px, transparent ${dashLength + gapLength}px)`,
        backgroundSize: reduced
          ? "100% 100%"
          : `${dashLength + gapLength}px 100%`,
        animation: reduced ? "none" : `dash-march ${duration}s linear infinite`,
        mask: "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
        maskComposite: "exclude",
        WebkitMask:
          "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
        WebkitMaskComposite: "xor",
      }}
    />
  );

  return (
    <div
      ref={ref}
      className={cn(
        "relative rounded-[calc(var(--la-radius)-1px)] overflow-hidden",
        className,
      )}
      style={style}
      {...props}
    >
      {variant === "beam" && renderBeamBorder()}
      {variant === "gradient-spin" && renderGradientSpinBorder()}
      {variant === "dashed" && renderDashedBorder()}
      <div className="relative z-10 bg-card text-card-foreground">
        {children}
      </div>
      <style>{`
        @keyframes beam-slide {
          0% { background-position: 200% 0; }
          100% { background-position: 0% 0; }
        }
        @keyframes dash-march {
          0% { background-position: 0 0; }
          100% { background-position: ${dashLength + gapLength}px 0; }
        }
      `}</style>
    </div>
  );
}
AnimatedBorder.displayName = "AnimatedBorder";

export { AnimatedBorder };
