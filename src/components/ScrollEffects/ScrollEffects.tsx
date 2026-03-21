import * as React from "react";
import * as ScrollAreaPrimitive from "@radix-ui/react-scroll-area";
import { cn } from "../../lib/utils";

function usePrefersReducedMotion() {
  return React.useMemo(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    []
  );
}

export interface StickySectionProps extends React.HTMLAttributes<HTMLDivElement> {
  offset?: number;
}

function StickySection({
  children,
  className,
  offset = 0,
  ref,
  ...props
}: StickySectionProps & { ref?: React.Ref<HTMLDivElement> }) {
  return (
    <div
      ref={ref}
      className={cn("relative", className)}
      style={{ paddingTop: offset }}
      {...props}
    >
      <div
        className="sticky top-[var(--sticky-offset,0px)] z-10"
        style={{ "--sticky-offset": `${offset}px` } as React.CSSProperties}
      >
        {children}
      </div>
    </div>
  );
}
StickySection.displayName = "StickySection";

export interface StickyHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  offset?: number;
}

function StickyHeader({
  children,
  className,
  offset = 0,
  ref,
  ...props
}: StickyHeaderProps & { ref?: React.Ref<HTMLDivElement> }) {
  return (
    <div
      ref={ref}
      className={cn(
        "sticky top-0 z-20 bg-background/95 backdrop-blur-sm border-b border-border",
        className
      )}
      style={{ top: `${offset}px` }}
      {...props}
    >
      {children}
    </div>
  );
}
StickyHeader.displayName = "StickyHeader";

export interface HorizontalScrollProps extends React.HTMLAttributes<HTMLDivElement> {
  scrollSpeed?: number;
  showScrollbar?: boolean;
}

function HorizontalScroll({
  children,
  className,
  scrollSpeed = 1,
  showScrollbar = true,
  ref,
  ...props
}: HorizontalScrollProps & { ref?: React.Ref<HTMLDivElement> }) {
  const reduced = usePrefersReducedMotion();
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = React.useState(false);
  const [startX, setStartX] = React.useState(0);
  const [scrollLeft, setScrollLeft] = React.useState(0);

  const handleMouseDown = React.useCallback((e: React.MouseEvent) => {
    if (reduced) return;
    setIsDragging(true);
    setStartX(e.pageX - (containerRef.current?.offsetLeft || 0));
    setScrollLeft(containerRef.current?.scrollLeft || 0);
  }, [reduced]);

  const handleMouseUp = React.useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleMouseMove = React.useCallback((e: React.MouseEvent) => {
    if (!isDragging || reduced) return;
    e.preventDefault();
    const x = e.pageX - (containerRef.current?.offsetLeft || 0);
    const walk = (x - startX) * scrollSpeed * 2;
    if (containerRef.current) {
      containerRef.current.scrollLeft = scrollLeft - walk;
    }
  }, [isDragging, startX, scrollLeft, scrollSpeed, reduced]);

  return (
    <div
      ref={(node) => {
        (containerRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
        if (typeof ref === "function") ref(node);
        else if (ref) (containerRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
      }}
      className={cn(
        "overflow-x-auto overflow-y-hidden",
        isDragging && "cursor-grabbing select-none",
        reduced ? "" : "scroll-smooth",
        className
      )}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onMouseMove={handleMouseMove}
      {...props}
    >
      <div className={cn("inline-flex", !showScrollbar && "[&::-webkit-scrollbar]:hidden [&::-webkit-scrollbar]:hidden", showScrollbar && "[&::-webkit-scrollbar]:h-2")}>
        {children}
      </div>
    </div>
  );
}
HorizontalScroll.displayName = "HorizontalScroll";

export interface ScrollProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  position?: "top" | "bottom";
  color?: string;
  height?: number;
}

function ScrollProgress({
  children,
  className,
  position = "top",
  color = "hsl(var(--la-primary))",
  height = 3,
  ref,
  ...props
}: ScrollProgressProps & { ref?: React.Ref<HTMLDivElement> }) {
  const [progress, setProgress] = React.useState(0);
  const containerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const updateProgress = () => {
      const scrollTop = container.scrollTop;
      const scrollHeight = container.scrollHeight - container.clientHeight;
      const newProgress = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
      setProgress(newProgress);
    };

    container.addEventListener("scroll", updateProgress, { passive: true });
    updateProgress();

    return () => container.removeEventListener("scroll", updateProgress);
  }, []);

  return (
    <div
      ref={(node) => {
        (containerRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
        if (typeof ref === "function") ref(node);
        else if (ref) (containerRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
      }}
      className={cn("overflow-auto", className)}
      {...props}
    >
      {position === "top" && (
        <div
          aria-hidden
          className="sticky top-0 z-10 h-0"
          style={{ height: `${height}px` }}
        >
          <div
            className="h-full transition-all duration-75"
            style={{
              width: `${progress}%`,
              backgroundColor: color,
            }}
          />
        </div>
      )}
      {children}
      {position === "bottom" && (
        <div
          aria-hidden
          className="sticky bottom-0 z-10 h-0"
          style={{ height: `${height}px` }}
        >
          <div
            className="h-full transition-all duration-75"
            style={{
              width: `${progress}%`,
              backgroundColor: color,
            }}
          />
        </div>
      )}
    </div>
  );
}
ScrollProgress.displayName = "ScrollProgress";

export interface RevealOnScrollProps extends React.HTMLAttributes<HTMLDivElement> {
  threshold?: number;
  direction?: "up" | "down" | "left" | "right";
  distance?: number;
  duration?: number;
  delay?: number;
}

function RevealOnScroll({
  children,
  className,
  threshold = 0.1,
  direction = "up",
  distance = 30,
  duration = 600,
  delay = 0,
  ref,
  style,
  ...props
}: RevealOnScrollProps & { ref?: React.Ref<HTMLDivElement> }) {
  const [isVisible, setIsVisible] = React.useState(false);
  const localRef = React.useRef<HTMLDivElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  const setRefs = React.useCallback(
    (node: HTMLDivElement | null) => {
      (localRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
      if (typeof ref === "function") ref(node);
      else if (ref)
        (localRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
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

  const getTransform = () => {
    if (isVisible) return "translate(0, 0) scale(1)";
    const transforms: Record<string, string> = {
      up: `translateY(${distance}px)`,
      down: `translateY(-${distance}px)`,
      left: `translateX(${distance}px)`,
      right: `translateX(-${distance}px)`,
    };
    return `${transforms[direction]} scale(0.95)`;
  };

  return (
    <div
      ref={setRefs}
      className={cn("transition-[opacity,transform]", className)}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: getTransform(),
        transitionDuration: prefersReducedMotion ? "0ms" : `${duration}ms`,
        transitionTimingFunction: "ease-out",
        transitionDelay: isVisible ? `${delay}ms` : "0ms",
        ...style,
      }}
      {...props}
    >
      {children}
    </div>
  );
}
RevealOnScroll.displayName = "RevealOnScroll";

export interface ScrollSnapContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  snapType?: "x" | "y" | "both";
  snapAlign?: "start" | "end" | "center";
}

function ScrollSnapContainer({
  children,
  className,
  snapType = "x",
  snapAlign = "start",
  ref,
  ...props
}: ScrollSnapContainerProps & { ref?: React.Ref<HTMLDivElement> }) {
  return (
    <div
      ref={ref}
      className={cn(
        "overflow-auto",
        snapType === "x" && "snap-x",
        snapType === "y" && "snap-y",
        snapType === "both" && "snap-both",
        className
      )}
      {...props}
    >
      <div
        className={cn(
          "inline-flex",
          snapType === "x" && "snap-x",
          snapType === "y" && "snap-y",
          snapType === "both" && "snap-both",
          snapAlign === "start" && (snapType === "x" || snapType === "both" ? "snap-start" : ""),
          snapAlign === "end" && (snapType === "x" || snapType === "both" ? "snap-end" : ""),
          snapAlign === "center" && (snapType === "x" || snapType === "both" ? "snap-center" : "")
        )}
      >
        {children}
      </div>
    </div>
  );
}
ScrollSnapContainer.displayName = "ScrollSnapContainer";

export interface ScrollSnapItemProps extends React.HTMLAttributes<HTMLDivElement> {
  snapAlign?: "start" | "end" | "center";
}

function ScrollSnapItem({
  children,
  className,
  snapAlign = "start",
  ref,
  ...props
}: ScrollSnapItemProps & { ref?: React.Ref<HTMLDivElement> }) {
  return (
    <div
      ref={ref}
      className={cn(
        "snap-align-start",
        snapAlign === "start" && "snap-start",
        snapAlign === "end" && "snap-end",
        snapAlign === "center" && "snap-center",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
ScrollSnapItem.displayName = "ScrollSnapItem";

export {
  StickySection,
  StickyHeader,
  HorizontalScroll,
  ScrollProgress,
  RevealOnScroll,
  ScrollSnapContainer,
  ScrollSnapItem,
};
