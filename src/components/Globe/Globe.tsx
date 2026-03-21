import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";
import { useReducedMotion } from "../../lib/animation";

const globeVariants = cva(
  "relative inline-block overflow-hidden rounded-full",
  {
    variants: {
      size: {
        sm: "h-32 w-32",
        md: "h-64 w-64",
        lg: "h-96 w-96",
        xl: "h-[32rem] w-[32rem]",
      },
      variant: {
        default: "",
        glass: "backdrop-blur-md",
        dark: "ring-2 ring-white/20",
      },
    },
    defaultVariants: {
      size: "md",
      variant: "default",
    },
  }
);

export interface GlobeLocation {
  lat: number;
  lng: number;
  label?: string;
  color?: string;
  size?: "sm" | "md" | "lg";
}

export interface GlobeProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "children">,
    VariantProps<typeof globeVariants> {
  locations?: GlobeLocation[];
  autoRotate?: boolean;
  rotationSpeed?: number;
  showGrid?: boolean;
  showAtmosphere?: boolean;
  onLocationClick?: (location: GlobeLocation, index: number) => void;
  activeLocation?: number;
}

const Globe = React.forwardRef<HTMLDivElement, GlobeProps>(
  (
    {
      className,
      size,
      variant,
      locations = [],
      autoRotate = true,
      rotationSpeed = 30,
      showGrid = false,
      showAtmosphere = true,
      onLocationClick,
      activeLocation,
      ...props
    },
    ref
  ) => {
    const prefersReducedMotion = useReducedMotion();
    const containerRef = React.useRef<HTMLDivElement>(null);
    const [mousePosition, setMousePosition] = React.useState({ x: 0, y: 0 });
    const [isHovering, setIsHovering] = React.useState(false);

    const handleMouseMove = React.useCallback(
      (e: React.MouseEvent<HTMLDivElement>) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        const x = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
        const y = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);
        setMousePosition({ x, y });
      },
      []
    );

    const rotateX = isHovering ? mousePosition.y * 20 : 0;
    const rotateY = isHovering ? -mousePosition.x * 20 : prefersReducedMotion || !autoRotate ? 0 : 0;

    const sizeMap = {
      sm: 128,
      md: 256,
      lg: 384,
      xl: 512,
    };

    const globeSize = size ? sizeMap[size] : 256;
    const scaleFactor = globeSize / 256;

    const convertToPosition = (lat: number, lng: number) => {
      const phi = (90 - lat) * (Math.PI / 180);
      const theta = (lng + 180) * (Math.PI / 180);
      const x = -(globeSize / 2) * Math.sin(phi) * Math.cos(theta) + globeSize / 2;
      const y = (globeSize / 2) * Math.cos(phi) + globeSize / 2;
      const z = (globeSize / 2) * Math.sin(phi) * Math.sin(theta);
      return { x, y, z };
    };

    const gridLines = React.useMemo(() => {
      const lines: { start: { lat: number; lng: number }; end: { lat: number; lng: number } }[] = [];
      for (let i = -60; i <= 60; i += 30) {
        lines.push({ start: { lat: i, lng: -180 }, end: { lat: i, lng: 180 } });
      }
      for (let i = -180; i < 180; i += 30) {
        lines.push({ start: { lat: -80, lng: i }, end: { lat: 80, lng: i } });
      }
      return lines;
    }, []);

    return (
      <div
        ref={(node) => {
          (containerRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
          if (typeof ref === "function") ref(node);
          else if (ref) (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
        }}
        className={cn(globeVariants({ size, variant }), className)}
        style={{
          perspective: `${globeSize * 2}px`,
          height: globeSize,
          width: globeSize,
        }}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => {
          setIsHovering(false);
          setMousePosition({ x: 0, y: 0 });
        }}
        role="img"
        aria-label="Interactive globe"
        {...props}
      >
        <div
          className={cn(
            "absolute inset-0 origin-center",
            prefersReducedMotion || !autoRotate ? "" : "animate-globe-rotate"
          )}
          style={{
            transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
            transformStyle: "preserve-3d",
          }}
        >
          <div
            className="absolute inset-0 rounded-full bg-gradient-to-br from-[hsl(var(--la-primary))] via-[hsl(var(--la-accent))] to-[hsl(var(--la-primary))] opacity-80"
            style={{
              background: `
                radial-gradient(circle at 30% 30%, hsl(200 70% 50% / 0.4) 0%, transparent 50%),
                radial-gradient(circle at 70% 60%, hsl(180 60% 40% / 0.3) 0%, transparent 40%),
                radial-gradient(circle at 50% 80%, hsl(220 50% 60% / 0.3) 0%, transparent 40%),
                linear-gradient(135deg, hsl(200 70% 50%) 0%, hsl(180 60% 40%) 50%, hsl(220 50% 60%) 100%)
              `,
              boxShadow: "inset -20px -20px 60px rgba(0,0,0,0.4), inset 10px 10px 30px rgba(255,255,255,0.1)",
            }}
          />

          {showGrid && (
            <svg
              className="absolute inset-0 h-full w-full opacity-20"
              viewBox={`0 0 ${globeSize} ${globeSize}`}
              style={{ transform: "translateZ(0)" }}
            >
              {gridLines.map((line, i) => {
                const start = convertToPosition(line.start.lat, line.start.lng);
                const end = convertToPosition(line.end.lat, line.end.lng);
                return (
                  <line
                    key={i}
                    x1={start.x}
                    y1={start.y}
                    x2={end.x}
                    y2={end.y}
                    stroke="currentColor"
                    strokeWidth={1}
                    className="text-white"
                  />
                );
              })}
            </svg>
          )}

          {locations.map((location, index) => {
            const pos = convertToPosition(location.lat, location.lng);
            const locationSize = location.size === "sm" ? 6 : location.size === "lg" ? 12 : 8;
            const isActive = activeLocation === index;
            return (
              <button
                key={index}
                className={cn(
                  "absolute rounded-full transition-all duration-300",
                  isActive ? "z-20 scale-125" : "z-10 hover:scale-110 hover:z-20"
                )}
                style={{
                  left: pos.x - locationSize / 2,
                  top: pos.y - locationSize / 2,
                  width: locationSize,
                  height: locationSize,
                  backgroundColor: location.color || "hsl(var(--la-destructive))",
                  boxShadow: isActive
                    ? `0 0 0 3px rgba(255,255,255,0.5), 0 0 20px ${location.color || "hsl(var(--la-destructive))"}`
                    : `0 0 10px ${location.color || "hsl(var(--la-destructive))"}`,
                  transform: `translateZ(${pos.z}px)`,
                }}
                onClick={() => onLocationClick?.(location, index)}
                aria-label={location.label || `Location at ${location.lat}, ${location.lng}`}
              >
                {location.label && (
                  <span className="sr-only">{location.label}</span>
                )}
              </button>
            );
          })}

          {showAtmosphere && (
            <div
              className="pointer-events-none absolute rounded-full"
              style={{
                inset: `-${globeSize * 0.05}px`,
                background: "radial-gradient(circle at center, transparent 85%, rgba(100,150,255,0.15) 100%)",
                transform: "translateZ(1px)",
              }}
            />
          )}
        </div>

        <div
          className="pointer-events-none absolute inset-0 rounded-full"
          style={{
            background: "linear-gradient(135deg, rgba(255,255,255,0.2) 0%, transparent 50%, rgba(0,0,0,0.2) 100%)",
          }}
        />
      </div>
    );
  }
);
Globe.displayName = "Globe";

export interface GlobeRingProps extends React.HTMLAttributes<HTMLDivElement> {
  orbit?: "inner" | "middle" | "outer";
  color?: "primary" | "accent" | "destructive" | "muted";
  size?: "sm" | "md" | "lg";
}

const ringVariants = cva("absolute rounded-full border opacity-30", {
  variants: {
    orbit: {
      inner: "",
      middle: "",
      outer: "",
    },
    color: {
      primary: "border-[hsl(var(--la-primary))]",
      accent: "border-[hsl(var(--la-accent))]",
      destructive: "border-[hsl(var(--la-destructive))]",
      muted: "border-[hsl(var(--la-muted-foreground))]",
    },
  },
  defaultVariants: {
    orbit: "inner",
    color: "primary",
  },
});

const GlobeRing = React.forwardRef<HTMLDivElement, GlobeRingProps>(
  ({ className, orbit = "inner", color = "primary", ...props }, ref) => {
    const orbitSizes = {
      inner: "h-40 w-40",
      middle: "h-52 w-52",
      outer: "h-64 w-64",
    };

    return (
      <div
        ref={ref}
        className={cn(
          ringVariants({ orbit, color }),
          orbitSizes[orbit],
          "animate-pulse",
          className
        )}
        {...props}
      />
    );
  }
);
GlobeRing.displayName = "GlobeRing";

export { Globe, GlobeRing, globeVariants };
