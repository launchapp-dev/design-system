import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";
import { useReducedMotion } from "../../lib/animation";

const beamContainerVariants = cva("relative", {
  variants: {
    variant: {
      default: "",
      gradient: "",
      glow: "",
      dashed: "",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

export interface BeamPoint {
  id: string;
  x: number;
  y: number;
  label?: string;
  color?: string;
}

export interface BeamConnection {
  from: string;
  to: string;
  animated?: boolean;
  dashed?: boolean;
}

export interface BeamProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "children">,
    VariantProps<typeof beamContainerVariants> {
  points?: BeamPoint[];
  connections?: BeamConnection[];
  width?: number;
  height?: number;
  lineColor?: string;
  lineWidth?: number;
  animationSpeed?: number;
  showPoints?: boolean;
  pointSize?: "sm" | "md" | "lg";
  onPointClick?: (point: BeamPoint) => void;
}

const Beam = React.forwardRef<HTMLDivElement, BeamProps>(
  (
    {
      className,
      variant,
      points = [],
      connections = [],
      width = 600,
      height = 400,
      lineColor = "hsl(var(--la-primary))",
      lineWidth = 2,
      animationSpeed = 3,
      showPoints = true,
      pointSize = "md",
      onPointClick,
      ...props
    },
    ref
  ) => {
    const prefersReducedMotion = useReducedMotion();
    const pointMap = React.useMemo(
      () => new Map(points.map((p) => [p.id, p])),
      [points]
    );

    const pointSizeMap = {
      sm: 8,
      md: 12,
      lg: 16,
    };

    const size = pointSizeMap[pointSize];

    const getPointPosition = (id: string) => {
      const point = pointMap.get(id);
      return point ? { x: point.x, y: point.y } : { x: 0, y: 0 };
    };

    const strokeDasharray = variant === "dashed" ? "8 4" : "none";
    const glowFilter = variant === "glow" ? "url(#beam-glow)" : undefined;
    const gradientId = "beam-gradient";

    return (
      <div
        ref={ref}
        className={cn(beamContainerVariants({ variant }), className)}
        style={{ width, height }}
        role="img"
        aria-label="Animated beam connections"
        {...props}
      >
        <svg
          width={width}
          height={height}
          className="absolute inset-0"
          style={{ overflow: "visible" }}
        >
          <defs>
            <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor={lineColor} stopOpacity="0.2" />
              <stop offset="50%" stopColor={lineColor} stopOpacity="1" />
              <stop offset="100%" stopColor={lineColor} stopOpacity="0.2" />
            </linearGradient>
            <filter id="beam-glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="4" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <marker
              id="arrowhead"
              markerWidth="10"
              markerHeight="7"
              refX="9"
              refY="3.5"
              orient="auto"
            >
              <polygon
                points="0 0, 10 3.5, 0 7"
                fill={lineColor}
                opacity="0.5"
              />
            </marker>
          </defs>

          {connections.map((conn, index) => {
            const from = getPointPosition(conn.from);
            const to = getPointPosition(conn.to);
            const fromPoint = pointMap.get(conn.from);
            const toPoint = pointMap.get(conn.to);
            const color = toPoint?.color || lineColor;

            const dx = to.x - from.x;
            const dy = to.y - from.y;
            const length = Math.sqrt(dx * dx + dy * dy);
            const angle = Math.atan2(dy, dx) * (180 / Math.PI);

            const animateTransform = prefersReducedMotion
              ? undefined
              : `translate(${from.x}, ${from.y}) rotate(${angle}) scaleX(${length / 100})`;

            return (
              <g key={`${conn.from}-${conn.to}-${index}`}>
                <line
                  x1={from.x}
                  y1={from.y}
                  x2={to.x}
                  y2={to.y}
                  stroke={variant === "gradient" ? `url(#${gradientId})` : color}
                  strokeWidth={lineWidth}
                  strokeDasharray={strokeDasharray}
                  strokeLinecap="round"
                  opacity={0.4}
                  filter={glowFilter}
                />
                {conn.animated && !prefersReducedMotion && (
                  <line
                    x1={from.x}
                    y1={from.y}
                    x2={to.x}
                    y2={to.y}
                    stroke={color}
                    strokeWidth={lineWidth * 1.5}
                    strokeLinecap="round"
                    filter={glowFilter}
                    style={{
                      strokeDasharray: "20 80",
                      animation: `beam-dash ${animationSpeed}s linear infinite`,
                    }}
                  />
                )}
                {conn.animated && !prefersReducedMotion && (
                  <circle
                    r="4"
                    fill={color}
                    filter={glowFilter}
                    style={{
                      animation: `beam-dot ${animationSpeed}s linear infinite`,
                    }}
                  >
                    <animateMotion
                      dur={`${animationSpeed}s`}
                      repeatCount="indefinite"
                      path={`M${from.x},${from.y} L${to.x},${to.y}`}
                    />
                  </circle>
                )}
              </g>
            );
          })}
        </svg>

        {showPoints &&
          points.map((point) => (
            <button
              key={point.id}
              className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full transition-transform hover:scale-125 focus:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--la-ring))] focus-visible:ring-offset-2"
              style={{
                left: point.x,
                top: point.y,
                width: size,
                height: size,
                backgroundColor: point.color || lineColor,
                boxShadow: `0 0 ${size}px ${point.color || lineColor}`,
              }}
              onClick={() => onPointClick?.(point)}
              aria-label={point.label || `Point ${point.id}`}
            >
              {point.label && <span className="sr-only">{point.label}</span>}
            </button>
          ))}
      </div>
    );
  }
);
Beam.displayName = "Beam";

export interface BeamLineProps {
  start: { x: number; y: number };
  endPoint: { x: number; y: number };
  animated?: boolean;
  color?: string;
  width?: number;
  className?: string;
}

const BeamLine = React.forwardRef<SVGLineElement, BeamLineProps>(
  (
    {
      className,
      start,
      endPoint,
      animated = false,
      color = "hsl(var(--la-primary))",
      width = 2,
      ...props
    },
    ref
  ) => {
    const prefersReducedMotion = useReducedMotion();

    return (
      <line
        ref={ref}
        x1={start.x}
        y1={start.y}
        x2={endPoint.x}
        y2={endPoint.y}
        stroke={color}
        strokeWidth={width}
        strokeLinecap="round"
        className={className}
        {...props}
      >
        {animated && !prefersReducedMotion && (
          <animate
            attributeName="stroke-dashoffset"
            from="100"
            to="0"
            dur="1s"
            repeatCount="indefinite"
          />
        )}
      </line>
    );
  }
);
BeamLine.displayName = "BeamLine";

export interface BeamDotProps extends React.HTMLAttributes<HTMLDivElement> {
  position: { x: number; y: number };
  color?: string;
  size?: "sm" | "md" | "lg";
  pulse?: boolean;
}

const dotVariants = cva("absolute -translate-x-1/2 -translate-y-1/2 rounded-full", {
  variants: {
    size: {
      sm: "h-2 w-2",
      md: "h-3 w-3",
      lg: "h-4 w-4",
    },
    pulse: {
      true: "animate-ping",
      false: "",
    },
  },
  defaultVariants: {
    size: "md",
    pulse: false,
  },
});

const BeamDot = React.forwardRef<HTMLDivElement, BeamDotProps>(
  ({ className, position, color = "hsl(var(--la-primary))", size = "md", pulse = false, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(dotVariants({ size, pulse }), className)}
        style={{
          left: position.x,
          top: position.y,
          backgroundColor: color,
          boxShadow: `0 0 10px ${color}`,
        }}
        {...props}
      />
    );
  }
);
BeamDot.displayName = "BeamDot";

export { Beam, BeamLine, BeamDot, beamContainerVariants };
