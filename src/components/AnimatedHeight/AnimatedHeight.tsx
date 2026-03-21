import * as React from "react";
import { cn } from "../../lib/utils";
import { useReducedMotion, easing } from "../../lib/animation";

export interface AnimatedHeightProps extends React.HTMLAttributes<HTMLDivElement> {
  isOpen?: boolean;
  duration?: number;
}

function AnimatedHeight({ children, isOpen = true, duration = 250, className, style, ref, ...props }: AnimatedHeightProps & { ref?: React.Ref<HTMLDivElement> }) {
  const prefersReducedMotion = useReducedMotion();
  const innerRef = React.useRef<HTMLDivElement>(null);
  const [height, setHeight] = React.useState<number | "auto">(isOpen ? "auto" : 0);
  const [isHidden, setIsHidden] = React.useState(!isOpen);
  const isFirstRender = React.useRef(true);

  React.useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    if (!innerRef.current) return;

    if (prefersReducedMotion) {
      setHeight(isOpen ? "auto" : 0);
      setIsHidden(!isOpen);
      return;
    }

    if (isOpen) {
      setIsHidden(false);
      const contentHeight = innerRef.current.scrollHeight;
      setHeight(contentHeight);
      const timer = setTimeout(() => setHeight("auto"), duration);
      return () => clearTimeout(timer);
    } else {
      const contentHeight = innerRef.current.scrollHeight;
      setHeight(contentHeight);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setHeight(0));
      });
      const timer = setTimeout(() => setIsHidden(true), duration);
      return () => clearTimeout(timer);
    }
  }, [isOpen, duration, prefersReducedMotion]);

  return (
    <div
      ref={ref}
      className={cn("overflow-hidden", className)}
      style={{
        height: height === "auto" ? "auto" : `${height}px`,
        transitionProperty: height === "auto" ? "none" : "height",
        transitionDuration: prefersReducedMotion ? "0ms" : `${duration}ms`,
        transitionTimingFunction: easing.easeOut,
        ...style,
      }}
      {...props}
    >
      <div ref={innerRef} inert={isHidden ? true : undefined}>{children}</div>
    </div>
  );
}
AnimatedHeight.displayName = "AnimatedHeight";

export { AnimatedHeight };
