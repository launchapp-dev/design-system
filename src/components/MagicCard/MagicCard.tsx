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

export interface TiltCardProps extends React.HTMLAttributes<HTMLDivElement> {
  maxTilt?: number;
  scale?: number;
}

const TiltCard = React.forwardRef<HTMLDivElement, TiltCardProps>(
  ({ className, children, maxTilt = 12, scale = 1.02, style, ...props }, ref) => {
    const reduced = usePrefersReducedMotion();
    const internalRef = React.useRef<HTMLDivElement>(null);
    const [transform, setTransform] = React.useState("");

    const handleMouseMove = React.useCallback(
      (e: React.MouseEvent<HTMLDivElement>) => {
        if (reduced) return;
        const el = internalRef.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        setTransform(
          `perspective(1000px) rotateY(${x * maxTilt}deg) rotateX(${-y * maxTilt}deg) scale(${scale})`
        );
      },
      [reduced, maxTilt, scale]
    );

    const handleMouseLeave = React.useCallback(() => {
      setTransform("perspective(1000px) rotateY(0deg) rotateX(0deg) scale(1)");
    }, []);

    return (
      <div
        ref={(node) => {
          (internalRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
          if (typeof ref === "function") ref(node);
          else if (ref) (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
        }}
        className={cn(
          "rounded-lg border border-border bg-card text-card-foreground shadow-sm",
          className
        )}
        style={{
          transition: reduced ? "none" : "transform 0.15s ease-out",
          transform,
          transformStyle: "preserve-3d",
          willChange: "transform",
          ...style,
        }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        {...props}
      >
        {children}
      </div>
    );
  }
);
TiltCard.displayName = "TiltCard";

export interface SpotlightCardProps extends React.HTMLAttributes<HTMLDivElement> {
  spotlightColor?: string;
  spotlightSize?: number;
}

const SpotlightCard = React.forwardRef<HTMLDivElement, SpotlightCardProps>(
  (
    {
      className,
      children,
      spotlightColor = "hsl(var(--la-primary) / 0.15)",
      spotlightSize = 400,
      ...props
    },
    ref
  ) => {
    const [spotlight, setSpotlight] = React.useState({ x: 0, y: 0, visible: false });

    const handleMouseMove = React.useCallback((e: React.MouseEvent<HTMLDivElement>) => {
      const rect = e.currentTarget.getBoundingClientRect();
      setSpotlight({ x: e.clientX - rect.left, y: e.clientY - rect.top, visible: true });
    }, []);

    const handleMouseLeave = React.useCallback(() => {
      setSpotlight((s) => ({ ...s, visible: false }));
    }, []);

    return (
      <div
        ref={ref}
        className={cn(
          "relative overflow-hidden rounded-lg border border-border bg-card text-card-foreground shadow-sm",
          className
        )}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        {...props}
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 transition-opacity duration-300"
          style={{
            opacity: spotlight.visible ? 1 : 0,
            background: `radial-gradient(${spotlightSize}px circle at ${spotlight.x}px ${spotlight.y}px, ${spotlightColor}, transparent 60%)`,
          }}
        />
        {children}
      </div>
    );
  }
);
SpotlightCard.displayName = "SpotlightCard";

export interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  blur?: "sm" | "md" | "lg" | "xl";
}

const blurMap = {
  sm: "backdrop-blur-sm",
  md: "backdrop-blur-md",
  lg: "backdrop-blur-lg",
  xl: "backdrop-blur-xl",
};

const GlassCard = React.forwardRef<HTMLDivElement, GlassCardProps>(
  ({ className, blur = "md", children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "rounded-lg border border-white/20 bg-white/10 text-card-foreground shadow-xl",
        blurMap[blur],
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
);
GlassCard.displayName = "GlassCard";

export interface MagneticButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  strength?: number;
}

const MagneticButton = React.forwardRef<HTMLButtonElement, MagneticButtonProps>(
  ({ className, children, strength = 0.3, style, ...props }, ref) => {
    const reduced = usePrefersReducedMotion();
    const internalRef = React.useRef<HTMLButtonElement>(null);
    const [offset, setOffset] = React.useState({ x: 0, y: 0 });

    const handleMouseMove = React.useCallback(
      (e: React.MouseEvent<HTMLButtonElement>) => {
        if (reduced) return;
        const el = internalRef.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const x = (e.clientX - rect.left - rect.width / 2) * strength;
        const y = (e.clientY - rect.top - rect.height / 2) * strength;
        setOffset({ x, y });
      },
      [reduced, strength]
    );

    const handleMouseLeave = React.useCallback(() => {
      setOffset({ x: 0, y: 0 });
    }, []);

    return (
      <button
        ref={(node) => {
          (internalRef as React.MutableRefObject<HTMLButtonElement | null>).current = node;
          if (typeof ref === "function") ref(node);
          else if (ref) (ref as React.MutableRefObject<HTMLButtonElement | null>).current = node;
        }}
        className={cn(
          "inline-flex items-center justify-center rounded-[--la-radius] bg-[hsl(var(--la-primary))] text-[hsl(var(--la-primary-foreground))] px-4 py-2 text-sm font-medium ring-offset-[hsl(var(--la-background))] transition-transform focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--la-ring))] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
          className
        )}
        style={{
          transform: `translate(${offset.x}px, ${offset.y}px)`,
          transitionDuration: reduced ? "0ms" : "100ms",
          transitionTimingFunction: "ease-out",
          ...style,
        }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        {...props}
      >
        {children}
      </button>
    );
  }
);
MagneticButton.displayName = "MagneticButton";

export interface ShimmerButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  shimmerColor?: string;
}

const ShimmerButton = React.forwardRef<HTMLButtonElement, ShimmerButtonProps>(
  ({ className, children, shimmerColor = "rgba(255,255,255,0.35)", ...props }, ref) => (
    <button
      ref={ref}
      className={cn(
        "relative inline-flex items-center justify-center overflow-hidden rounded-[--la-radius] bg-[hsl(var(--la-primary))] px-4 py-2 text-sm font-medium text-[hsl(var(--la-primary-foreground))] ring-offset-[hsl(var(--la-background))] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--la-ring))] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
        className
      )}
      {...props}
    >
      <span className="relative z-10">{children}</span>
      <span
        aria-hidden
        className="absolute inset-0 -translate-x-full animate-shimmer motion-reduce:animate-none"
        style={{
          background: `linear-gradient(90deg, transparent 0%, ${shimmerColor} 50%, transparent 100%)`,
        }}
      />
    </button>
  )
);
ShimmerButton.displayName = "ShimmerButton";

export interface AnimatedBorderCardProps extends React.HTMLAttributes<HTMLDivElement> {
  borderColor?: string;
  duration?: number;
}

const AnimatedBorderCard = React.forwardRef<HTMLDivElement, AnimatedBorderCardProps>(
  ({ className, children, borderColor = "hsl(var(--la-primary))", duration = 3, ...props }, ref) => {
    const reduced = usePrefersReducedMotion();
    return (
      <div
        ref={ref}
        className={cn("relative rounded-lg p-px overflow-hidden", className)}
        {...props}
      >
        <div
          aria-hidden
          className="absolute inset-[-50%] z-0"
          style={{
            background: `conic-gradient(from 0deg, transparent 0%, ${borderColor} 20%, transparent 40%)`,
            animation: reduced ? "none" : `spin ${duration}s linear infinite`,
          }}
        />
        <div className="relative z-10 rounded-[calc(var(--la-radius)-1px)] bg-card text-card-foreground">
          {children}
        </div>
      </div>
    );
  }
);
AnimatedBorderCard.displayName = "AnimatedBorderCard";

export { TiltCard, SpotlightCard, GlassCard, MagneticButton, ShimmerButton, AnimatedBorderCard };
