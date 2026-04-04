import * as React from "react";
import { cn } from "../../lib/utils";

export interface SpotlightProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: number;
  spring?: boolean;
  followsMouse?: boolean;
}

function Spotlight({
  size = 600,
  spring = false,
  followsMouse = true,
  className,
  style,
  ref,
  ...props
}: SpotlightProps & { ref?: React.Ref<HTMLDivElement> }) {
  const [position, setPosition] = React.useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = React.useState(false);
  const reduced = React.useMemo(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    [],
  );

  const handleMouseMove = React.useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!followsMouse) return;
      const rect = e.currentTarget.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      setPosition({ x, y });
    },
    [followsMouse],
  );

  const handleMouseEnter = React.useCallback(() => {
    setIsHovered(true);
  }, []);

  const handleMouseLeave = React.useCallback(() => {
    setIsHovered(false);
    if (!spring) {
      setPosition({ x: 50, y: 50 });
    }
  }, [spring]);

  const springTransition =
    spring && !reduced ? "transition-all duration-700 ease-out" : "";
  const hoverTransition = !reduced ? "transition-[opacity] duration-300" : "";

  return (
    <div
      ref={ref}
      className={cn("relative overflow-hidden", className)}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={style}
      {...props}
    >
      <div
        aria-hidden
        className={cn("pointer-events-none absolute inset-0", hoverTransition)}
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(circle ${size}px at ${position.x}% ${position.y}%, 
            hsl(var(--la-primary) / 0.15), 
            hsl(var(--la-primary) / 0.05) 40%, 
            transparent 70%)`,
          transition: springTransition || undefined,
        }}
      />
      {reduced && (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background: `radial-gradient(circle ${size}px at 50% 50%, 
              hsl(var(--la-primary) / 0.15), 
              hsl(var(--la-primary) / 0.05) 40%, 
              transparent 70%)`,
          }}
        />
      )}
    </div>
  );
}
Spotlight.displayName = "Spotlight";

export { Spotlight };
