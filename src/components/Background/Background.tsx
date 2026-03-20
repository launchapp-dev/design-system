import * as React from "react";
import { cn } from "../../lib/utils";

function usePrefersReducedMotion() {
  const [reduced, setReduced] = React.useState(false);
  React.useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);
  return reduced;
}

export interface GradientMeshProps extends React.HTMLAttributes<HTMLDivElement> {
  colors?: string[];
  speed?: number;
}

const GradientMesh = React.forwardRef<HTMLDivElement, GradientMeshProps>(
  (
    {
      className,
      colors = ["#ee7752", "#e73c7e", "#23a6d5", "#23d5ab"],
      speed = 8,
      style,
      ...props
    },
    ref
  ) => {
    const reduced = usePrefersReducedMotion();
    return (
      <div
        ref={ref}
        className={cn("w-full h-full", className)}
        style={{
          background: `linear-gradient(-45deg, ${colors.join(", ")})`,
          backgroundSize: "400% 400%",
          animation: reduced ? "none" : `gradient-mesh ${speed}s ease infinite`,
          ...style,
        }}
        {...props}
      />
    );
  }
);
GradientMesh.displayName = "GradientMesh";

export interface AuroraProps extends React.HTMLAttributes<HTMLDivElement> {
  colors?: string[];
  speed?: number;
}

const Aurora = React.forwardRef<HTMLDivElement, AuroraProps>(
  (
    {
      className,
      colors = ["#3b82f6", "#8b5cf6", "#ec4899", "#06b6d4"],
      speed = 10,
      children,
      ...props
    },
    ref
  ) => {
    const reduced = usePrefersReducedMotion();
    return (
      <div ref={ref} className={cn("relative overflow-hidden", className)} {...props}>
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `linear-gradient(135deg, ${colors.join(", ")})`,
            backgroundSize: "400% 400%",
            animation: reduced ? "none" : `aurora ${speed}s ease infinite`,
          }}
        />
        {children}
      </div>
    );
  }
);
Aurora.displayName = "Aurora";

export interface GridPatternProps extends React.SVGAttributes<SVGSVGElement> {
  width?: number;
  height?: number;
  x?: number;
  y?: number;
  strokeDasharray?: string;
  squares?: [number, number][];
}

const GridPattern = React.forwardRef<SVGSVGElement, GridPatternProps>(
  (
    {
      className,
      width = 40,
      height = 40,
      x = -1,
      y = -1,
      strokeDasharray = "0",
      squares,
      ...props
    },
    ref
  ) => {
    const id = React.useId();
    return (
      <svg
        ref={ref}
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute inset-0 h-full w-full fill-none stroke-[hsl(var(--la-border))]",
          className
        )}
        {...props}
      >
        <defs>
          <pattern
            id={id}
            width={width}
            height={height}
            patternUnits="userSpaceOnUse"
            x={x}
            y={y}
          >
            <path
              d={`M.5 ${height}V.5H${width}`}
              fill="none"
              strokeDasharray={strokeDasharray}
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" strokeWidth={0} fill={`url(#${id})`} />
        {squares && (
          <svg x={x} y={y} className="overflow-visible">
            {squares.map(([sqX, sqY]) => (
              <rect
                key={`${sqX}-${sqY}`}
                width={width - 1}
                height={height - 1}
                x={sqX * width + 1}
                y={sqY * height + 1}
                fill="hsl(var(--la-accent))"
                strokeWidth={0}
              />
            ))}
          </svg>
        )}
      </svg>
    );
  }
);
GridPattern.displayName = "GridPattern";

export interface DotPatternProps extends React.SVGAttributes<SVGSVGElement> {
  width?: number;
  height?: number;
  cx?: number;
  cy?: number;
  cr?: number;
}

const DotPattern = React.forwardRef<SVGSVGElement, DotPatternProps>(
  ({ className, width = 16, height = 16, cx = 1, cy = 1, cr = 1, ...props }, ref) => {
    const id = React.useId();
    return (
      <svg
        ref={ref}
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute inset-0 h-full w-full fill-[hsl(var(--la-border))]",
          className
        )}
        {...props}
      >
        <defs>
          <pattern
            id={id}
            width={width}
            height={height}
            patternUnits="userSpaceOnUse"
            patternContentUnits="userSpaceOnUse"
          >
            <circle cx={cx} cy={cy} r={cr} />
          </pattern>
        </defs>
        <rect width="100%" height="100%" strokeWidth={0} fill={`url(#${id})`} />
      </svg>
    );
  }
);
DotPattern.displayName = "DotPattern";

export { GradientMesh, Aurora, GridPattern, DotPattern };
