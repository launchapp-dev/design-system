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

const Particles = React.forwardRef<HTMLDivElement, ParticlesProps>(
  ({ count = 50,
  speed = 1,
  color = "hsl(var(--la-primary))",
  size = 4,
  maxSize = 8,
  className,
  ...props }, ref) => {
  const reduced = usePrefersReducedMotion();
  const [particles, setParticles] = React.useState<Array<{
    id: number;
    x: number;
    y: number;
    size: number;
    speedX: number;
    speedY: number;
    opacity: number;
  }>>([]);

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
          })
        );
      }
      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationId);
  }, [particles.length, reduced]);

  return (
    <div
      ref={ref}
      className={cn("relative overflow-hidden", className)}
      {...props}
    >
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
});
Particles.displayName = "Particles";

export interface StarsProps extends React.HTMLAttributes<HTMLDivElement> {
  count?: number;
  speed?: number;
  minSize?: number;
  maxSize?: number;
  starColor?: string;
}

const Stars = React.forwardRef<HTMLDivElement, StarsProps>(
  ({ count = 100,
  speed = 0.5,
  minSize = 1,
  maxSize = 3,
  starColor = "#ffffff",
  className,
  ...props }, ref) => {
  const reduced = usePrefersReducedMotion();
  const [stars, setStars] = React.useState<Array<{
    id: number;
    x: number;
    y: number;
    size: number;
    opacity: number;
    twinkleSpeed: number;
  }>>([]);

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
      className={cn("relative overflow-hidden bg-[#0a0a1a] dark:bg-[#0a0a1a]", className)}
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
              animation: reduced
                ? "none"
                : `twinkle ${star.twinkleSpeed}s ease-in-out infinite`,
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
});
Stars.displayName = "Stars";

export interface MatrixRainProps extends React.HTMLAttributes<HTMLDivElement> {
  characters?: string;
  columns?: number;
  speed?: number;
  fontSize?: number;
  color?: string;
}

const MatrixRain = React.forwardRef<HTMLDivElement, MatrixRainProps>(
  ({ characters = "01",
  columns = 30,
  speed = 100,
  fontSize = 14,
  color = "#00ff00",
  className,
  ...props }, ref) => {
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
        prev.map((drop, i) => {
          const random = Math.random();
          if (random > 0.975) return 0;
          return drop + 1;
        })
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
});
MatrixRain.displayName = "MatrixRain";

export interface NoiseTextureProps extends React.HTMLAttributes<HTMLDivElement> {
  opacity?: number;
  noiseFrequency?: number;
}

const NoiseTexture = React.forwardRef<HTMLDivElement, NoiseTextureProps>(
  ({ opacity = 0.4,
  noiseFrequency = 0.5,
  className,
  ...props }, ref) => {
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
  }, [noiseFrequency]);

  return (
    <div
      ref={ref}
      className={cn("relative overflow-hidden", className)}
      {...props}
    >
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
});
NoiseTexture.displayName = "NoiseTexture";

export interface AnimatedGridProps extends React.HTMLAttributes<HTMLDivElement> {
  cellSize?: number;
  color?: string;
  strokeWidth?: number;
  animated?: boolean;
  animationSpeed?: number;
}

const AnimatedGrid = React.forwardRef<HTMLDivElement, AnimatedGridProps>(
  ({ cellSize = 40,
  color = "hsl(var(--la-border))",
  strokeWidth = 1,
  animated = true,
  animationSpeed = 3,
  className,
  ...props }, ref) => {
  const reduced = usePrefersReducedMotion();
  const id = React.useId();

  return (
    <div
      ref={ref}
      className={cn("relative overflow-hidden", className)}
      {...props}
    >
      <svg
        aria-hidden
        className="absolute inset-0 h-full w-full"
        style={{
          backgroundRepeat: "repeat",
          backgroundSize: `${cellSize}px ${cellSize}px`,
        }}
      >
        <defs>
          <pattern
            id={id}
            width={cellSize}
            height={cellSize}
            patternUnits="userSpaceOnUse"
          >
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
            background: `linear-gradient(90deg, transparent 0%, hsl(var(--la-background)/0.1) 50%, transparent 100%)`,
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
});
AnimatedGrid.displayName = "AnimatedGrid";

export { Particles, Stars, MatrixRain, NoiseTexture, AnimatedGrid };
