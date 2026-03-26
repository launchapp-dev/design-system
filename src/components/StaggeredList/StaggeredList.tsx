import * as React from "react";
import { cn } from "../../lib/utils";
import { useReducedMotion, easing } from "../../lib/animation";

export interface StaggeredListProps extends React.HTMLAttributes<HTMLDivElement> {
  staggerDelay?: number;
  duration?: number;
  initialDelay?: number;
}

interface StaggeredItemProps {
  children: React.ReactNode;
  index: number;
  staggerDelay: number;
  duration: number;
  initialDelay: number;
  prefersReducedMotion: boolean;
}

const StaggeredItem = React.forwardRef<HTMLElement, StaggeredItemProps>(
  ({ children,
  index,
  staggerDelay,
  duration,
  initialDelay,
  prefersReducedMotion }, ref) => {
  const [visible, setVisible] = React.useState(prefersReducedMotion);

  React.useEffect(() => {
    if (prefersReducedMotion) {
      setVisible(true);
      return;
    }
    const delay = initialDelay + index * staggerDelay;
    const timer = setTimeout(() => setVisible(true), delay);
    return () => clearTimeout(timer);
  }, [index, staggerDelay, initialDelay, prefersReducedMotion]);

  return (
    <div
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(16px)",
        transitionProperty: "opacity, transform",
        transitionDuration: `${duration}ms`,
        transitionTimingFunction: easing.easeOut,
      }}
    >
      {children}
    </div>
  );
}

const StaggeredList = React.forwardRef<HTMLDivElement, StaggeredListProps>(
  ({ children,
    staggerDelay = 80,
    duration = 400,
    initialDelay = 0,
    className,
    ...props }, ref) => {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div ref={ref} className={cn("flex flex-col", className)} {...props}>
      {React.Children.map(children, (child, i) => (
        <StaggeredItem
          key={i}
          index={i}
          staggerDelay={staggerDelay}
          duration={duration}
          initialDelay={initialDelay}
          prefersReducedMotion={prefersReducedMotion}
        >
          {child}
        </StaggeredItem>
      ))}
    </div>
  );
});
StaggeredList.displayName = "StaggeredList";

export { StaggeredList };
