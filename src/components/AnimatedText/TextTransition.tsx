import * as React from "react";
import { cn } from "../../lib/utils";

export interface TextTransitionProps extends React.HTMLAttributes<HTMLSpanElement> {
  text: string;
  duration?: number;
  staggerDelay?: number;
  direction?: "up" | "down";
}

function TextTransition({
  text,
  duration = 300,
  staggerDelay = 50,
  direction = "up",
  className,
  ref,
  ...props
}: TextTransitionProps & { ref?: React.Ref<HTMLSpanElement> }) {
  const [displayText, setDisplayText] = React.useState(text);
  const [isTransitioning, setIsTransitioning] = React.useState(false);
  const prevTextRef = React.useRef(text);

  const prefersReducedMotion = React.useMemo(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    [],
  );

  React.useEffect(() => {
    if (text === prevTextRef.current) return;

    if (prefersReducedMotion) {
      setDisplayText(text);
      prevTextRef.current = text;
      return;
    }

    setIsTransitioning(true);
    const exitTimer = setTimeout(() => {
      prevTextRef.current = text;
      setDisplayText(text);
      setIsTransitioning(false);
    }, duration);

    return () => clearTimeout(exitTimer);
  }, [text, duration, prefersReducedMotion]);

  const characters = displayText.split("");

  return (
    <span ref={ref} className={cn("inline-block", className)} aria-label={text} {...props}>
      {characters.map((char, i) => {
        const isExiting = isTransitioning && text !== prevTextRef.current;
        const animationClass =
          direction === "up"
            ? isExiting
              ? "animate-slide-out-to-top motion-reduce:opacity-100 motion-reduce:animate-none"
              : "animate-slide-in-from-bottom motion-reduce:opacity-100 motion-reduce:animate-none"
            : isExiting
              ? "animate-slide-out-to-bottom motion-reduce:opacity-100 motion-reduce:animate-none"
              : "animate-slide-in-from-top motion-reduce:opacity-100 motion-reduce:animate-none";

        return (
          <span
            key={`${i}-${displayText}`}
            aria-hidden="true"
            className={cn("inline-block", animationClass)}
            style={{
              animationDuration: prefersReducedMotion ? "0ms" : `${duration}ms`,
              animationDelay: prefersReducedMotion ? "0ms" : `${i * staggerDelay}ms`,
            }}
          >
            {char === " " ? "\u00a0" : char}
          </span>
        );
      })}
    </span>
  );
}
TextTransition.displayName = "TextTransition";

export { TextTransition };
