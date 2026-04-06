import * as React from "react";
import { cn } from "../../lib/utils";

function usePrefersReducedMotion() {
  return React.useMemo(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    []
  );
}

export interface FadeInOnScrollProps extends React.HTMLAttributes<HTMLDivElement> {
  threshold?: number;
  duration?: number;
  delay?: number;
}

function FadeInOnScroll(
  { children, threshold = 0.1, duration = 600, delay = 0, className, style, ref, ...props }: FadeInOnScrollProps & { ref?: React.Ref<HTMLDivElement> }
) {
  const [isVisible, setIsVisible] = React.useState(false);
  const localRef = React.useRef<HTMLDivElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  const setRefs = React.useCallback(
    (node: HTMLDivElement | null) => {
      (localRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
      if (typeof ref === "function") ref(node);
      else if (ref)
        (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
    },
    [ref]
  );

  React.useEffect(() => {
    if (prefersReducedMotion) {
      setIsVisible(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold }
    );
    if (localRef.current) observer.observe(localRef.current);
    return () => observer.disconnect();
  }, [threshold, prefersReducedMotion]);

  return (
    <div
      ref={setRefs}
      className={cn("transition-[opacity,transform]", className)}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(20px)",
        transitionDuration: `${duration}ms`,
        transitionTimingFunction: "ease-out",
        transitionDelay: delay ? `${delay}ms` : undefined,
        ...style,
      }}
      {...props}
    >
      {children}
    </div>
  );
}
FadeInOnScroll.displayName = "FadeInOnScroll";

export interface CountUpProps extends React.HTMLAttributes<HTMLSpanElement> {
  to: number;
  from?: number;
  duration?: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  threshold?: number;
}

function CountUp(
  {
    to,
    from = 0,
    duration = 1500,
    decimals = 0,
    prefix = "",
    suffix = "",
    threshold = 0.1,
    className,
    ref,
    ...props
  }: CountUpProps & { ref?: React.Ref<HTMLSpanElement> }
) {
  const [value, setValue] = React.useState(from);
  const localRef = React.useRef<HTMLSpanElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  const setRefs = React.useCallback(
    (node: HTMLSpanElement | null) => {
      (localRef as React.MutableRefObject<HTMLSpanElement | null>).current = node;
      if (typeof ref === "function") ref(node);
      else if (ref)
        (ref as React.MutableRefObject<HTMLSpanElement | null>).current = node;
    },
    [ref]
  );

  React.useEffect(() => {
    if (prefersReducedMotion) {
      setValue(to);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();

        const start = performance.now();
        const range = to - from;

        const tick = (now: number) => {
          const elapsed = now - start;
          const progress = Math.min(elapsed / duration, 1);
          const eased = 1 - (1 - progress) ** 3;
          setValue(from + range * eased);
          if (progress < 1) requestAnimationFrame(tick);
        };

        requestAnimationFrame(tick);
      },
      { threshold }
    );
    if (localRef.current) observer.observe(localRef.current);
    return () => observer.disconnect();
  }, [to, from, duration, threshold, prefersReducedMotion]);

  const formattedFinal = `${prefix}${to.toFixed(decimals)}${suffix}`;

  return (
    <span
      ref={setRefs}
      className={cn("tabular-nums", className)}
      aria-live="polite"
      aria-atomic="true"
      aria-label={formattedFinal}
      {...props}
    >
      {prefix}
      {value.toFixed(decimals)}
      {suffix}
    </span>
  );
}
CountUp.displayName = "CountUp";

export interface ParallaxProps extends React.HTMLAttributes<HTMLDivElement> {
  speed?: number;
}

function Parallax({ speed = 0.3, children, className, style, ref, ...props }: ParallaxProps & { ref?: React.Ref<HTMLDivElement> }) {
  const [offset, setOffset] = React.useState(0);
  const localRef = React.useRef<HTMLDivElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  const setRefs = React.useCallback(
    (node: HTMLDivElement | null) => {
      (localRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
      if (typeof ref === "function") ref(node);
      else if (ref)
        (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
    },
    [ref]
  );

  React.useEffect(() => {
    if (prefersReducedMotion) return;

    const handleScroll = () => {
      if (!localRef.current) return;
      const rect = localRef.current.getBoundingClientRect();
      const centerY = rect.top + rect.height / 2;
      const viewportCenter = window.innerHeight / 2;
      setOffset((centerY - viewportCenter) * speed);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [speed, prefersReducedMotion]);

  return (
    <div
      ref={setRefs}
      className={cn("will-change-transform", className)}
      style={{
        transform: `translateY(${offset}px)`,
        ...style,
      }}
      {...props}
    >
      {children}
    </div>
  );
}
Parallax.displayName = "Parallax";

export { FadeInOnScroll, CountUp, Parallax };
