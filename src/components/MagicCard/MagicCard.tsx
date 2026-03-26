import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
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

function TiltCard({ className, children, maxTilt = 12, scale = 1.02, style, ref, ...props }: TiltCardProps & { ref?: React.Ref<HTMLDivElement> }) {
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
TiltCard.displayName = "TiltCard";

export interface SpotlightCardProps extends React.HTMLAttributes<HTMLDivElement> {
  spotlightColor?: string;
  spotlightSize?: number;
}

function SpotlightCard({
  className,
  children,
  spotlightColor = "hsl(var(--la-primary) / 0.15)",
  spotlightSize = 400,
  ref,
  ...props
}: SpotlightCardProps & { ref?: React.Ref<HTMLDivElement> }) {
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

function GlassCard({ className, blur = "md", children, ref, ...props }: GlassCardProps & { ref?: React.Ref<HTMLDivElement> }) {
  return (
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
  );
}
GlassCard.displayName = "GlassCard";

export interface MagneticButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  strength?: number;
}

function MagneticButton({ className, children, strength = 0.3, style, ref, ...props }: MagneticButtonProps & { ref?: React.Ref<HTMLButtonElement> }) {
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
MagneticButton.displayName = "MagneticButton";

export interface ShimmerButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  shimmerColor?: string;
}

function ShimmerButton({ className, children, shimmerColor = "rgba(255,255,255,0.35)", ref, ...props }: ShimmerButtonProps & { ref?: React.Ref<HTMLButtonElement> }) {
  return (
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
  );
}
ShimmerButton.displayName = "ShimmerButton";

export interface AnimatedBorderCardProps extends React.HTMLAttributes<HTMLDivElement> {
  borderColor?: string;
  duration?: number;
}

function AnimatedBorderCard({ className, children, borderColor = "hsl(var(--la-primary))", duration = 3, ref, ...props }: AnimatedBorderCardProps & { ref?: React.Ref<HTMLDivElement> }) {
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
AnimatedBorderCard.displayName = "AnimatedBorderCard";

export interface HolographicCardProps extends React.HTMLAttributes<HTMLDivElement> {
  intensity?: number;
}

function HolographicCard({ 
  className, 
  children, 
  intensity = 1, 
  ref, 
  ...props 
}: HolographicCardProps & { ref?: React.Ref<HTMLDivElement> }) {
  const reduced = usePrefersReducedMotion();
  const [mousePos, setMousePos] = React.useState({ x: 0.5, y: 0.5 });

  const handleMouseMove = React.useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: (e.clientX - rect.left) / rect.width,
      y: (e.clientY - rect.top) / rect.height,
    });
  }, []);

  const handleMouseLeave = React.useCallback(() => {
    setMousePos({ x: 0.5, y: 0.5 });
  }, []);

  const hue = reduced ? 260 : Math.round(mousePos.x * 360 + mousePos.y * 180) % 360;

  return (
    <div
      ref={ref}
      className={cn(
        "relative overflow-hidden rounded-lg border border-white/20 bg-gradient-to-br from-gray-900/90 to-gray-800/90 text-card-foreground shadow-xl",
        className
      )}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background: reduced
            ? "linear-gradient(135deg, rgba(139, 92, 246, 0.2), rgba(6, 182, 212, 0.2))"
            : `linear-gradient(
              ${mousePos.x * 180}deg,
              hsla(${hue}, 100%, 50%, ${0.15 * intensity}),
              hsla(${(hue + 60) % 360}, 100%, 50%, ${0.1 * intensity}),
              hsla(${(hue + 120) % 360}, 100%, 50%, ${0.15 * intensity})
            )`,
          transition: reduced ? "none" : "background 0.1s ease-out",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background: `radial-gradient(
            circle at ${mousePos.x * 100}% ${mousePos.y * 100}%,
            hsla(${hue}, 100%, 70%, ${0.3 * intensity}),
            transparent 50%
          )`,
          transition: reduced ? "none" : "background 0.1s ease-out",
        }}
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
}
HolographicCard.displayName = "HolographicCard";

export interface NeonGlowCardProps extends React.HTMLAttributes<HTMLDivElement> {
  glowColor?: string;
  glowIntensity?: "sm" | "md" | "lg";
  animate?: boolean;
}

const glowIntensityMap = {
  sm: { blur: 8, spread: 2 },
  md: { blur: 16, spread: 4 },
  lg: { blur: 24, spread: 6 },
};

function NeonGlowCard({ 
  className, 
  children, 
  glowColor = "hsl(var(--la-primary))",
  glowIntensity = "md",
  animate = true,
  ref, 
  ...props 
}: NeonGlowCardProps & { ref?: React.Ref<HTMLDivElement> }) {
  const reduced = usePrefersReducedMotion();
  const [isHovered, setIsHovered] = React.useState(false);
  const intensity = glowIntensityMap[glowIntensity];

  return (
    <div
      ref={ref}
      className={cn("relative rounded-lg", className)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      {...props}
    >
      <div
        aria-hidden
        className="absolute inset-0 rounded-lg transition-opacity duration-300"
        style={{
          boxShadow: isHovered || !animate
            ? `0 0 ${intensity.blur}px ${intensity.spread}px ${glowColor}, 
               0 0 ${intensity.blur * 2}px ${intensity.spread}px ${glowColor},
               inset 0 0 ${intensity.blur / 2}px ${glowColor}`
            : `0 0 ${intensity.blur / 2}px ${glowColor}`,
          opacity: isHovered || !animate ? 1 : 0.5,
          animation: !reduced && animate && isHovered 
            ? "neon-pulse 1.5s ease-in-out infinite" 
            : "none",
        }}
      />
      <div className="relative rounded-lg border border-current/30 bg-card text-card-foreground backdrop-blur-sm">
        {children}
      </div>
    </div>
  );
}
NeonGlowCard.displayName = "NeonGlowCard";

export interface RippleButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  rippleColor?: string;
}

interface Ripple {
  id: number;
  x: number;
  y: number;
  size: number;
}

function RippleButton({ 
  className, 
  children, 
  rippleColor = "rgba(255, 255, 255, 0.35)",
  ref,
  ...props 
}: RippleButtonProps & { ref?: React.Ref<HTMLButtonElement> }) {
  const reduced = usePrefersReducedMotion();
  const [ripples, setRipples] = React.useState<Ripple[]>([]);
  const internalRef = React.useRef<HTMLButtonElement>(null);

  const createRipple = React.useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
    if (reduced) return;
    
    const button = internalRef.current;
    if (!button) return;

    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height) * 2;
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;

    const newRipple: Ripple = {
      id: Date.now(),
      x,
      y,
      size,
    };

    setRipples((prev) => [...prev, newRipple]);

    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== newRipple.id));
    }, 600);
  }, [reduced]);

  return (
    <button
      ref={(node) => {
        (internalRef as React.MutableRefObject<HTMLButtonElement | null>).current = node;
        if (typeof ref === "function") ref(node);
        else if (ref) (ref as React.MutableRefObject<HTMLButtonElement | null>).current = node;
      }}
      className={cn(
        "relative inline-flex items-center justify-center overflow-hidden rounded-[--la-radius] bg-[hsl(var(--la-primary))] px-4 py-2 text-sm font-medium text-[hsl(var(--la-primary-foreground))] ring-offset-[hsl(var(--la-background))] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--la-ring))] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
        className
      )}
      onClick={createRipple}
      {...props}
    >
      <span className="relative z-10">{children}</span>
      {ripples.map((ripple) => (
        <span
          key={ripple.id}
          aria-hidden
          className="absolute rounded-full animate-ripple"
          style={{
            left: ripple.x,
            top: ripple.y,
            width: ripple.size,
            height: ripple.size,
            backgroundColor: rippleColor,
          }}
        />
      ))}
    </button>
  );
}
RippleButton.displayName = "RippleButton";

export interface GlowPulseButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  glowColor?: string;
  pulseIntensity?: "sm" | "md" | "lg";
}

const pulseIntensityMap = {
  sm: { scale: 1.02, blur: 8 },
  md: { scale: 1.04, blur: 16 },
  lg: { scale: 1.06, blur: 24 },
};

function GlowPulseButton({ 
  className, 
  children, 
  glowColor = "hsl(var(--la-primary))",
  pulseIntensity = "md",
  ref,
  ...props 
}: GlowPulseButtonProps & { ref?: React.Ref<HTMLButtonElement> }) {
  const reduced = usePrefersReducedMotion();
  const intensity = pulseIntensityMap[pulseIntensity];

  return (
    <button
      ref={ref}
      className={cn(
        "relative inline-flex items-center justify-center rounded-[--la-radius] bg-[hsl(var(--la-primary))] px-4 py-2 text-sm font-medium text-[hsl(var(--la-primary-foreground))] ring-offset-[hsl(var(--la-background))] transition-transform focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--la-ring))] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
        reduced ? "" : "hover:scale-[var(--pulse-scale)]",
        className
      )}
      style={{
        "--pulse-scale": intensity.scale,
        "--pulse-blur": `${intensity.blur}px`,
        "--pulse-color": glowColor,
      } as React.CSSProperties}
      {...props}
    >
      <span
        aria-hidden
        className="absolute inset-0 rounded-[--la-radius] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          boxShadow: `0 0 var(--pulse-blur) var(--pulse-color)`,
          animation: reduced ? "none" : "glow-pulse 2s ease-in-out infinite",
        }}
      />
      <span className="relative z-10">{children}</span>
    </button>
  );
}
GlowPulseButton.displayName = "GlowPulseButton";

export interface MorphButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  morphStyle?: "blob" | "pill" | "rounded";
}

const morphVariants = cva(
  "relative inline-flex items-center justify-center px-4 py-2 text-sm font-medium ring-offset-[hsl(var(--la-background))] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--la-ring))] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      morphStyle: {
        blob: "bg-[hsl(var(--la-primary))] text-[hsl(var(--la-primary-foreground))] rounded-2xl",
        pill: "bg-[hsl(var(--la-primary))] text-[hsl(var(--la-primary-foreground))] rounded-full",
        rounded: "bg-[hsl(var(--la-primary))] text-[hsl(var(--la-primary-foreground))] rounded-[--la-radius]",
      },
    },
    defaultVariants: {
      morphStyle: "blob",
    },
  }
);

type MorphButtonVariantProps = VariantProps<typeof morphVariants>;

function MorphButton({ 
  className, 
  children, 
  morphStyle = "blob",
  ref,
  ...props 
}: MorphButtonProps & MorphButtonVariantProps & { ref?: React.Ref<HTMLButtonElement> }) {
  const reduced = usePrefersReducedMotion();
  const [morphState, setMorphState] = React.useState(0);

  const handleMouseEnter = React.useCallback(() => {
    if (reduced) return;
    setMorphState((prev) => (prev + 1) % 4);
  }, [reduced]);

  const borderRadiusMap = {
    blob: ["16px 32px 24px 16px", "24px 16px 32px 24px", "16px 24px 16px 32px", "32px 16px 24px 16px"],
    pill: ["9999px", "24px 9999px 9999px 24px", "9999px 24px 24px 9999px", "16px 9999px 9999px 16px"],
    rounded: ["calc(var(--la-radius))", "calc(var(--la-radius) * 1.5)", "calc(var(--la-radius) * 0.75)", "calc(var(--la-radius) * 1.25)"],
  };

  return (
    <button
      ref={ref}
      className={cn(morphVariants({ morphStyle }), className)}
      style={{
        borderRadius: borderRadiusMap[morphStyle || "blob"][morphState],
        transition: reduced ? "none" : "border-radius 0.3s ease-in-out",
      }}
      onMouseEnter={handleMouseEnter}
      {...props}
    >
      {children}
    </button>
  );
}
MorphButton.displayName = "MorphButton";

export type MorphVariants = VariantProps<typeof morphVariants>;

export { 
  TiltCard, 
  SpotlightCard, 
  GlassCard, 
  MagneticButton, 
  ShimmerButton, 
  AnimatedBorderCard,
  HolographicCard,
  NeonGlowCard,
  RippleButton,
  GlowPulseButton,
  MorphButton,
  morphVariants,
};
