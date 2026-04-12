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

export interface ParticlesProps extends React.HTMLAttributes<HTMLDivElement> {
  count?: number;
  speed?: number;
  color?: string;
  size?: number;
  maxSize?: number;
}

function Particles({
  count = 50,
  speed = 1,
  color = "var(--la-primary)",
  size = 4,
  maxSize = 8,
  className,
  ref,
  ...props
}: ParticlesProps & { ref?: React.Ref<HTMLDivElement> }) {
  const reduced = usePrefersReducedMotion();
  const [particles, setParticles] = React.useState<
    Array<{
      id: number;
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      opacity: number;
    }>
  >([]);

  React.useEffect(() => {
    if (reduced) return;
    const newParticles = Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * (maxSize - size) + size,
      speedX: (Math.random() - 0.5) * speed,
      speedY: (Math.random() - 0.5) * speed,
      opacity: Math.random() * 0.5 + 0.3,
    }));
    setParticles(newParticles);
  }, [count, speed, size, maxSize, reduced]);

  React.useEffect(() => {
    if (reduced || particles.length === 0) return;

    let animationId: number;
    let lastTime = 0;
    const interval = 1000 / 60;

    const animate = (timestamp: number) => {
      if (timestamp - lastTime >= interval) {
        lastTime = timestamp;
        setParticles((prev) =>
          prev.map((p) => {
            let newX = p.x + p.speedX * 0.1;
            let newY = p.y + p.speedY * 0.1;
            if (newX < 0) newX = 100;
            if (newX > 100) newX = 0;
            if (newY < 0) newY = 100;
            if (newY > 100) newY = 0;
            return { ...p, x: newX, y: newY };
          }),
        );
      }
      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationId);
  }, [particles.length, reduced]);

  return (
    <div ref={ref} className={cn("relative overflow-hidden", className)} {...props}>
      <div aria-hidden className="absolute inset-0">
        {reduced
          ? Array.from({ length: Math.min(count, 20) }, (_, i) => (
              <div
                key={i}
                className="absolute rounded-full animate-float"
                style={{
                  left: `${(i * 5) % 100}%`,
                  top: `${(i * 7) % 100}%`,
                  width: size,
                  height: size,
                  backgroundColor: color,
                  opacity: 0.5,
                  animationDelay: `${i * 0.2}s`,
                }}
              />
            ))
          : particles.map((p) => (
              <div
                key={p.id}
                className="absolute rounded-full"
                style={{
                  left: `${p.x}%`,
                  top: `${p.y}%`,
                  width: p.size,
                  height: p.size,
                  backgroundColor: color,
                  opacity: p.opacity,
                  transition: "left 0.1s linear, top 0.1s linear",
                }}
              />
            ))}
      </div>
    </div>
  );
}
Particles.displayName = "Particles";

export interface StarsProps extends React.HTMLAttributes<HTMLDivElement> {
  count?: number;
  speed?: number;
  minSize?: number;
  maxSize?: number;
  starColor?: string;
}

function Stars({
  count = 100,
  speed = 0.5,
  minSize = 1,
  maxSize = 3,
  starColor = "#ffffff",
  className,
  ref,
  ...props
}: StarsProps & { ref?: React.Ref<HTMLDivElement> }) {
  const reduced = usePrefersReducedMotion();
  const [stars, setStars] = React.useState<
    Array<{
      id: number;
      x: number;
      y: number;
      size: number;
      opacity: number;
      twinkleSpeed: number;
    }>
  >([]);

  React.useEffect(() => {
    const newStars = Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * (maxSize - minSize) + minSize,
      opacity: Math.random() * 0.5 + 0.5,
      twinkleSpeed: Math.random() * 2 + 1,
    }));
    setStars(newStars);
  }, [count, minSize, maxSize]);

  return (
    <div
      ref={ref}
      className={cn("relative overflow-hidden bg-[oklch(5%_0_0)]", className)}
      {...props}
    >
      <div aria-hidden className="absolute inset-0">
        {stars.map((star) => (
          <div
            key={star.id}
            className="absolute rounded-full"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: star.size,
              height: star.size,
              backgroundColor: starColor,
              opacity: reduced ? star.opacity : star.opacity,
              animation: reduced ? "none" : `twinkle ${star.twinkleSpeed}s ease-in-out infinite`,
            }}
          />
        ))}
      </div>
      <style>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 1; }
        }
      `}</style>
    </div>
  );
}
Stars.displayName = "Stars";

export interface MatrixRainProps extends React.HTMLAttributes<HTMLDivElement> {
  characters?: string;
  columns?: number;
  speed?: number;
  fontSize?: number;
  color?: string;
}

function MatrixRain({
  characters = "01",
  columns = 30,
  speed = 100,
  fontSize = 14,
  color = "#00ff00",
  className,
  ref,
  ...props
}: MatrixRainProps & { ref?: React.Ref<HTMLDivElement> }) {
  const reduced = usePrefersReducedMotion();
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [drops, setDrops] = React.useState<number[]>([]);

  React.useEffect(() => {
    if (reduced) {
      setDrops(Array(columns).fill(0));
      return;
    }
    setDrops(Array(columns).fill(0));

    const interval = setInterval(() => {
      setDrops((prev) =>
        prev.map((drop, _i) => {
          const random = Math.random();
          if (random > 0.975) return 0;
          return drop + 1;
        }),
      );
    }, speed);

    return () => clearInterval(interval);
  }, [columns, speed, reduced]);

  if (reduced) {
    return (
      <div
        ref={ref}
        className={cn("relative overflow-hidden bg-black font-mono", className)}
        {...props}
      >
        <div ref={containerRef} className="flex h-full">
          {Array.from({ length: columns }).map((_, colIndex) => (
            <div key={colIndex} className="flex flex-col flex-1">
              {Array.from({ length: 10 }).map((_, rowIndex) => (
                <span
                  key={rowIndex}
                  className="text-center"
                  style={{
                    fontSize,
                    color: `hsl(120, 100%, ${50 + Math.random() * 30}%)`,
                  }}
                >
                  {characters[Math.floor(Math.random() * characters.length)]}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div
      ref={ref}
      className={cn("relative overflow-hidden bg-black font-mono", className)}
      {...props}
    >
      <div ref={containerRef} className="flex h-full">
        {drops.map((drop, colIndex) => (
          <div key={colIndex} className="flex flex-col flex-1">
            {Array.from({ length: 30 }).map((_, i) => {
              const isActive = i <= drop;
              return (
                <span
                  key={i}
                  className="text-center"
                  style={{
                    fontSize,
                    color: isActive ? color : `hsl(120, 100%, ${70 - i * 2}%)`,
                    textShadow: isActive ? `0 0 8px ${color}` : "none",
                  }}
                >
                  {characters[Math.floor(Math.random() * characters.length)]}
                </span>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}
MatrixRain.displayName = "MatrixRain";

export interface NoiseTextureProps extends React.HTMLAttributes<HTMLDivElement> {
  opacity?: number;
  noiseFrequency?: number;
}

function NoiseTexture({
  opacity = 0.4,
  noiseFrequency = 0.5,
  className,
  ref,
  ...props
}: NoiseTextureProps & { ref?: React.Ref<HTMLDivElement> }) {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const [noiseData, setNoiseData] = React.useState<string>("");

  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    const imageData = ctx.createImageData(width, height);
    const data = imageData.data;

    for (let i = 0; i < data.length; i += 4) {
      const value = Math.random() * 255;
      data[i] = value;
      data[i + 1] = value;
      data[i + 2] = value;
      data[i + 3] = 255;
    }

    ctx.putImageData(imageData, 0, 0);
    setNoiseData(canvas.toDataURL());
  }, []);

  return (
    <div ref={ref} className={cn("relative overflow-hidden", className)} {...props}>
      <canvas
        ref={canvasRef}
        width={256}
        height={256}
        className="absolute inset-0 w-full h-full"
        aria-hidden
      />
      <div
        aria-hidden
        className="absolute inset-0 w-full h-full"
        style={{
          opacity,
          backgroundImage: noiseData ? `url(${noiseData})` : undefined,
          backgroundRepeat: "repeat",
          backgroundSize: "256px 256px",
        }}
      />
    </div>
  );
}
NoiseTexture.displayName = "NoiseTexture";

export interface AnimatedGridProps extends React.HTMLAttributes<HTMLDivElement> {
  cellSize?: number;
  color?: string;
  strokeWidth?: number;
  animated?: boolean;
  animationSpeed?: number;
}

function AnimatedGrid({
  cellSize = 40,
  color = "var(--la-border)",
  strokeWidth = 1,
  animated = true,
  animationSpeed = 3,
  className,
  ref,
  ...props
}: AnimatedGridProps & { ref?: React.Ref<HTMLDivElement> }) {
  const reduced = usePrefersReducedMotion();
  const id = React.useId();

  return (
    <div ref={ref} className={cn("relative overflow-hidden", className)} {...props}>
      <svg
        aria-hidden
        className="absolute inset-0 h-full w-full"
        style={{
          backgroundRepeat: "repeat",
          backgroundSize: `${cellSize}px ${cellSize}px`,
        }}
      >
        <defs>
          <pattern id={id} width={cellSize} height={cellSize} patternUnits="userSpaceOnUse">
            <path
              d={`M ${cellSize} 0 L 0 0 0 ${cellSize}`}
              fill="none"
              stroke={color}
              strokeWidth={strokeWidth}
              style={{
                animation: reduced || !animated ? "none" : undefined,
              }}
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#${id})`} />
      </svg>
      {animated && !reduced && (
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `linear-gradient(90deg, transparent 0%, color-mix(in srgb, var(--la-background) 10%, transparent) 50%, transparent 100%)`,
            backgroundSize: "200% 100%",
            animation: `grid-sweep ${animationSpeed}s linear infinite`,
          }}
        />
      )}
      <style>{`
        @keyframes grid-sweep {
          0% { background-position: -100% 0; }
          100% { background-position: 200% 0; }
        }
      `}</style>
    </div>
  );
}
AnimatedGrid.displayName = "AnimatedGrid";

export interface GradientBackgroundProps extends React.HTMLAttributes<HTMLDivElement> {
  colors?: string[];
  speed?: number;
  direction?: "linear" | "radial" | "conic";
  angle?: number;
}

function GradientBackground({
  colors = ["var(--la-primary)", "var(--la-secondary)", "var(--la-accent)"],
  speed = 8,
  direction = "linear",
  angle = 45,
  className,
  ref,
  ...props
}: GradientBackgroundProps & { ref?: React.Ref<HTMLDivElement> }) {
  const reduced = usePrefersReducedMotion();
  const colorString = colors.join(", ");

  let gradientStyle: React.CSSProperties = {};

  if (direction === "linear") {
    gradientStyle = {
      background: `linear-gradient(${angle}deg, ${colorString})`,
      backgroundSize: "400% 400%",
      animation: reduced ? "none" : `gradient-shift ${speed}s ease infinite`,
    };
  } else if (direction === "radial") {
    gradientStyle = {
      background: `radial-gradient(circle, ${colorString})`,
      backgroundSize: "400% 400%",
      animation: reduced ? "none" : `gradient-shift ${speed}s ease infinite`,
    };
  } else if (direction === "conic") {
    gradientStyle = {
      background: `conic-gradient(${colorString})`,
      backgroundSize: "400% 400%",
      animation: reduced ? "none" : `gradient-shift ${speed}s ease infinite`,
    };
  }

  return (
    <div
      ref={ref}
      className={cn("relative overflow-hidden", className)}
      style={gradientStyle}
      {...props}
    >
      <style>{`
        @keyframes gradient-shift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
    </div>
  );
}
GradientBackground.displayName = "GradientBackground";

export interface AnimatedGradientProps extends React.HTMLAttributes<HTMLDivElement> {
  colors?: string[];
  speed?: number;
  size?: number;
}

function AnimatedGradient({
  colors = ["#ff006e", "#8338ec", "#3a86ff"],
  speed = 6,
  size = 200,
  className,
  ref,
  ...props
}: AnimatedGradientProps & { ref?: React.Ref<HTMLDivElement> }) {
  const reduced = usePrefersReducedMotion();

  return (
    <div ref={ref} className={cn("relative overflow-hidden", className)} {...props}>
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background: `linear-gradient(45deg, ${colors.join(", ")})`,
          backgroundSize: "300% 300%",
          animation: reduced ? "none" : `animated-gradient ${speed}s ease infinite`,
        }}
      />
      <style>{`
        @keyframes animated-gradient {
          0% { background-position: 0% 50%; }
          25% { background-position: 100% 50%; }
          50% { background-position: 100% 0%; }
          75% { background-position: 0% 100%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
    </div>
  );
}
AnimatedGradient.displayName = "AnimatedGradient";

export interface ShimmerBackgroundProps extends React.HTMLAttributes<HTMLDivElement> {
  color?: string;
  speed?: number;
  intensity?: number;
  width?: number;
}

function ShimmerBackground({
  color = "var(--la-primary)",
  speed = 2,
  intensity = 0.5,
  width = 100,
  className,
  ref,
  ...props
}: ShimmerBackgroundProps & { ref?: React.Ref<HTMLDivElement> }) {
  const reduced = usePrefersReducedMotion();

  return (
    <div ref={ref} className={cn("relative overflow-hidden", className)} {...props}>
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background: `linear-gradient(90deg, transparent 0%, ${color} 50%, transparent 100%)`,
          backgroundSize: `${width}% 100%`,
          backgroundPosition: "-100% 0",
          animation: reduced ? "none" : `shimmer ${speed}s infinite`,
          opacity: intensity,
        }}
      />
      <style>{`
        @keyframes shimmer {
          0% { background-position: -100% 0; }
          100% { background-position: 100% 0; }
        }
      `}</style>
    </div>
  );
}
ShimmerBackground.displayName = "ShimmerBackground";

export {
  Particles,
  Stars,
  MatrixRain,
  NoiseTexture,
  AnimatedGrid,
  GradientBackground,
  AnimatedGradient,
  ShimmerBackground,
};
