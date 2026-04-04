import * as React from "react";
import { useReducedMotion } from "../../lib/animation";
import { cn } from "../../lib/utils";

export interface StickySectionProps
  extends React.HTMLAttributes<HTMLDivElement> {
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

export interface StickyHeaderProps
  extends React.HTMLAttributes<HTMLDivElement> {
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
        className,
      )}
      style={{ top: `${offset}px` }}
      {...props}
    >
      {children}
    </div>
  );
}
StickyHeader.displayName = "StickyHeader";

export interface HorizontalScrollProps
  extends React.HTMLAttributes<HTMLDivElement> {
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
  const reduced = useReducedMotion();
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = React.useState(false);
  const [startX, setStartX] = React.useState(0);
  const [scrollLeft, setScrollLeft] = React.useState(0);

  const handleMouseDown = React.useCallback(
    (e: React.MouseEvent) => {
      if (reduced) return;
      setIsDragging(true);
      setStartX(e.pageX - (containerRef.current?.offsetLeft || 0));
      setScrollLeft(containerRef.current?.scrollLeft || 0);
    },
    [reduced],
  );

  const handleMouseUp = React.useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleMouseMove = React.useCallback(
    (e: React.MouseEvent) => {
      if (!isDragging || reduced) return;
      e.preventDefault();
      const x = e.pageX - (containerRef.current?.offsetLeft || 0);
      const walk = (x - startX) * scrollSpeed * 2;
      if (containerRef.current) {
        containerRef.current.scrollLeft = scrollLeft - walk;
      }
    },
    [isDragging, startX, scrollLeft, scrollSpeed, reduced],
  );

  const handleWheel = React.useCallback(
    (e: React.WheelEvent) => {
      if (!containerRef.current) return;
      e.preventDefault();
      containerRef.current.scrollLeft += e.deltaY * scrollSpeed;
    },
    [scrollSpeed],
  );

  return (
    <div
      ref={(node) => {
        (
          containerRef as React.MutableRefObject<HTMLDivElement | null>
        ).current = node;
        if (typeof ref === "function") ref(node);
        else if (ref)
          (
            containerRef as React.MutableRefObject<HTMLDivElement | null>
          ).current = node;
      }}
      className={cn(
        "overflow-x-auto overflow-y-hidden",
        isDragging && "cursor-grabbing select-none",
        reduced ? "" : "scroll-smooth",
        className,
      )}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onMouseMove={handleMouseMove}
      onWheel={handleWheel}
      {...props}
    >
      <div
        className={cn(
          "inline-flex",
          !showScrollbar && "[&::-webkit-scrollbar]:hidden",
        )}
      >
        {children}
      </div>
    </div>
  );
}
HorizontalScroll.displayName = "HorizontalScroll";

export interface ScrollProgressProps
  extends React.HTMLAttributes<HTMLDivElement> {
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
      const newProgress =
        scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
      setProgress(newProgress);
    };

    container.addEventListener("scroll", updateProgress, { passive: true });
    updateProgress();

    return () => container.removeEventListener("scroll", updateProgress);
  }, []);

  return (
    <div
      ref={(node) => {
        (
          containerRef as React.MutableRefObject<HTMLDivElement | null>
        ).current = node;
        if (typeof ref === "function") ref(node);
        else if (ref)
          (
            containerRef as React.MutableRefObject<HTMLDivElement | null>
          ).current = node;
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

export interface RevealOnScrollProps
  extends React.HTMLAttributes<HTMLDivElement> {
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
  const prefersReducedMotion = useReducedMotion();

  const setRefs = React.useCallback(
    (node: HTMLDivElement | null) => {
      (localRef as React.MutableRefObject<HTMLDivElement | null>).current =
        node;
      if (typeof ref === "function") ref(node);
      else if (ref)
        (localRef as React.MutableRefObject<HTMLDivElement | null>).current =
          node;
    },
    [ref],
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
      { threshold },
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

export interface ScrollSnapContainerProps
  extends React.HTMLAttributes<HTMLDivElement> {
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
        className,
      )}
      {...props}
    >
      <div
        className={cn(
          "inline-flex",
          snapType === "x" && "snap-x",
          snapType === "y" && "snap-y",
          snapType === "both" && "snap-both",
          snapAlign === "start" &&
            (snapType === "x" || snapType === "both" ? "snap-start" : ""),
          snapAlign === "end" &&
            (snapType === "x" || snapType === "both" ? "snap-end" : ""),
          snapAlign === "center" &&
            (snapType === "x" || snapType === "both" ? "snap-center" : ""),
        )}
      >
        {children}
      </div>
    </div>
  );
}
ScrollSnapContainer.displayName = "ScrollSnapContainer";

export interface ScrollSnapItemProps
  extends React.HTMLAttributes<HTMLDivElement> {
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
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
ScrollSnapItem.displayName = "ScrollSnapItem";

export interface ParallaxSectionProps
  extends React.HTMLAttributes<HTMLDivElement> {
  speed?: number;
  direction?: "up" | "down";
  scale?: number;
}

const ParallaxSection = React.forwardRef<HTMLDivElement, ParallaxSectionProps>(
  (
    {
      children,
      className,
      speed = 0.5,
      direction = "up",
      scale = 1,
      style,
      ...props
    },
    ref,
  ) => {
    const [offset, setOffset] = React.useState(0);
    const localRef = React.useRef<HTMLDivElement>(null);
    const prefersReducedMotion = useReducedMotion();

    const setRefs = React.useCallback(
      (node: HTMLDivElement | null) => {
        (localRef as React.MutableRefObject<HTMLDivElement | null>).current =
          node;
        if (typeof ref === "function") ref(node);
        else if (ref)
          (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
      },
      [ref],
    );

    React.useEffect(() => {
      if (prefersReducedMotion) return;

      const handleScroll = () => {
        if (!localRef.current) return;
        const rect = localRef.current.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
        const elementCenter = rect.top + rect.height / 2;
        const viewportCenter = viewportHeight / 2;
        const distanceFromCenter = elementCenter - viewportCenter;
        const maxDistance = viewportHeight;
        const normalizedOffset = distanceFromCenter / maxDistance;
        const parallaxOffset =
          normalizedOffset * speed * 100 * (direction === "up" ? -1 : 1);
        setOffset(parallaxOffset);
      };

      window.addEventListener("scroll", handleScroll, { passive: true });
      handleScroll();
      return () => window.removeEventListener("scroll", handleScroll);
    }, [speed, direction, prefersReducedMotion]);

    return (
      <div
        ref={setRefs}
        className={cn("relative overflow-hidden", className)}
        style={{
          ...style,
        }}
        {...props}
      >
        <div
          className="will-change-transform h-full w-full"
          style={{
            transform: prefersReducedMotion
              ? `scale(${scale})`
              : `translateY(${offset}px) scale(${scale})`,
            transition: prefersReducedMotion ? "none" : "transform 0.1s linear",
          }}
        >
          {children}
        </div>
      </div>
    );
  },
);
ParallaxSection.displayName = "ParallaxSection";

export interface ProgressIndicatorProps
  extends React.HTMLAttributes<HTMLDivElement> {
  position?: "top" | "bottom";
  color?: string;
  height?: number;
  showOnScroll?: boolean;
}

const ProgressIndicator = React.forwardRef<
  HTMLDivElement,
  ProgressIndicatorProps
>(
  (
    {
      className,
      position = "top",
      color = "hsl(var(--la-primary))",
      height = 3,
      showOnScroll = false,
      style,
      ...props
    },
    ref,
  ) => {
    const [progress, setProgress] = React.useState(0);
    const prefersReducedMotion = useReducedMotion();

    React.useEffect(() => {
      const updateProgress = () => {
        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        const scrollHeight =
          document.documentElement.scrollHeight - window.innerHeight;
        const newProgress =
          scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
        setProgress(newProgress);
      };

      window.addEventListener("scroll", updateProgress, { passive: true });
      updateProgress();
      return () => window.removeEventListener("scroll", updateProgress);
    }, []);

    const isVisible = !showOnScroll || progress > 0;

    return (
      <div
        ref={ref}
        className={cn(
          "fixed left-0 right-0 z-50 pointer-events-none",
          position === "top" ? "top-0" : "bottom-0",
          isVisible ? "opacity-100" : "opacity-0",
          prefersReducedMotion ? "" : "transition-opacity duration-200",
          className,
        )}
        style={{ height: `${height}px`, ...style }}
        role="progressbar"
        aria-valuenow={Math.round(progress)}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label="Page scroll progress"
        {...props}
      >
        <div
          className="h-full"
          style={{
            width: `${progress}%`,
            backgroundColor: color,
          }}
        />
      </div>
    );
  },
);
ProgressIndicator.displayName = "ProgressIndicator";

export {
  HorizontalScroll,
  ParallaxSection,
  ProgressIndicator,
  RevealOnScroll,
  ScrollProgress,
  ScrollSnapContainer,
  ScrollSnapItem,
  StickyHeader,
  StickySection,
};
