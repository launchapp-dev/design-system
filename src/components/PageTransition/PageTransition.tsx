import * as React from "react";
import { cn } from "../../lib/utils";

function usePrefersReducedMotion() {
  return React.useMemo(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    [],
  );
}

export interface PageTransitionProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "fade" | "slide" | "scale" | "morph";
  direction?: "up" | "down" | "left" | "right";
  duration?: number;
  delay?: number;
  show?: boolean;
}

function PageTransition({
  children,
  className,
  variant = "fade",
  direction = "up",
  duration = 400,
  delay = 0,
  show = true,
  ref,
  style,
  ...props
}: PageTransitionProps & { ref?: React.Ref<HTMLDivElement> }) {
  const reduced = usePrefersReducedMotion();
  const [isVisible, setIsVisible] = React.useState(show);
  const [isAnimating, setIsAnimating] = React.useState(false);

  React.useEffect(() => {
    if (show) {
      setIsAnimating(true);
      const timer = setTimeout(() => setIsVisible(true), 10);
      return () => clearTimeout(timer);
    } else {
      setIsVisible(false);
    }
  }, [show]);

  const getTransform = () => {
    if (!isVisible && !isAnimating) return "scale(0.9) translateY(20px)";
    if (!isVisible) {
      const transforms: Record<string, string> = {
        up: "translateY(20px)",
        down: "translateY(-20px)",
        left: "translateX(20px)",
        right: "translateX(-20px)",
      };
      return variant === "scale"
        ? "scale(0.95)"
        : variant === "slide"
          ? transforms[direction]
          : "none";
    }
    return "none";
  };

  const getOpacity = () => {
    if (!isVisible) return 0;
    return 1;
  };

  return (
    <div
      ref={ref}
      className={cn("transition-[opacity,transform]", className)}
      style={{
        opacity: reduced ? 1 : getOpacity(),
        transform: reduced ? "none" : getTransform(),
        transitionDuration: reduced ? "0ms" : `${duration}ms`,
        transitionTimingFunction: "ease-out",
        transitionDelay: reduced ? "0ms" : `${delay}ms`,
        ...style,
      }}
      {...props}
    >
      {children}
    </div>
  );
}
PageTransition.displayName = "PageTransition";

export interface TransitionGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  mode?: "single" | "out-in" | "in-out";
}

function TransitionGroup({
  children,
  className,
  mode = "out-in",
  ref,
  ...props
}: TransitionGroupProps & { ref?: React.Ref<HTMLDivElement> }) {
  const [currentKey, setCurrentKey] = React.useState<React.Key | null>(null);
  const [currentChild, setCurrentChild] = React.useState<React.ReactNode>(null);
  const [_isTransitioning, setIsTransitioning] = React.useState(false);

  React.useEffect(() => {
    const arr = React.Children.toArray(children);
    if (arr.length > 0) {
      const firstChild = arr[0];
      const key = React.isValidElement(firstChild) ? firstChild.key : null;
      if (key !== currentKey) {
        if (currentKey !== null && mode !== "single") {
          setIsTransitioning(true);
          setTimeout(() => {
            setCurrentKey(key);
            setCurrentChild(firstChild);
            setIsTransitioning(false);
          }, 200);
        } else {
          setCurrentKey(key);
          setCurrentChild(firstChild);
        }
      }
    }
  }, [children, currentKey, mode]);

  return (
    <div ref={ref} className={cn("relative", className)} {...props}>
      {currentChild}
    </div>
  );
}
TransitionGroup.displayName = "TransitionGroup";

export interface RouteTransitionProps
  extends React.ComponentPropsWithoutRef<"div">,
    Omit<PageTransitionProps, "show"> {
  activeRoute?: string;
  routes?: Array<{ path: string; element: React.ReactNode }>;
}

function RouteTransition({
  children,
  className,
  activeRoute,
  routes = [],
  ref,
  ...props
}: RouteTransitionProps & { ref?: React.Ref<HTMLDivElement> }) {
  const [displayedRoute, setDisplayedRoute] = React.useState(activeRoute);
  const [isAnimating, setIsAnimating] = React.useState(false);
  const reduced = usePrefersReducedMotion();

  const currentRoute = routes.find((r) => r.path === activeRoute);

  React.useEffect(() => {
    if (activeRoute !== displayedRoute) {
      setIsAnimating(true);
      const timer = setTimeout(
        () => {
          setDisplayedRoute(activeRoute);
          setTimeout(() => setIsAnimating(false), reduced ? 0 : 300);
        },
        reduced ? 0 : 150,
      );
      return () => clearTimeout(timer);
    }
  }, [activeRoute, displayedRoute, reduced]);

  const element = currentRoute?.element || children;

  return (
    <div
      ref={ref}
      className={cn(
        "transition-[opacity,transform]",
        isAnimating && "opacity-0 translate-y-2",
        className,
      )}
      style={{
        transitionDuration: reduced ? "0ms" : "300ms",
        transitionTimingFunction: "ease-out",
      }}
      {...props}
    >
      {element}
    </div>
  );
}
RouteTransition.displayName = "RouteTransition";

export interface AnimatePresenceProps extends React.HTMLAttributes<HTMLDivElement> {
  mode?: "sync" | "wait" | "popLayout";
}

function AnimatePresence({
  children,
  className,
  mode = "sync",
  ref,
  ...props
}: AnimatePresenceProps & { ref?: React.Ref<HTMLDivElement> }) {
  const [childrenState, setChildrenState] = React.useState<React.ReactNode>(children);
  const [_isExiting, _setIsExiting] = React.useState(false);
  const _reduced = usePrefersReducedMotion();

  React.useEffect(() => {
    setChildrenState(children);
  }, [children]);

  return (
    <div ref={ref} className={cn("relative", className)} {...props}>
      {childrenState}
    </div>
  );
}
AnimatePresence.displayName = "AnimatePresence";

export interface MorphTransitionProps extends React.HTMLAttributes<HTMLDivElement> {
  isActive?: boolean;
  duration?: number;
}

function MorphTransition({
  children,
  className,
  isActive = true,
  duration = 500,
  ref,
  style,
  ...props
}: MorphTransitionProps & { ref?: React.Ref<HTMLDivElement> }) {
  const reduced = usePrefersReducedMotion();
  const [prevChildren, setPrevChildren] = React.useState<React.ReactNode>(null);
  const [isMorphing, setIsMorphing] = React.useState(false);
  const containerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (!isActive) {
      setIsMorphing(true);
      const timer = setTimeout(
        () => {
          setPrevChildren(children);
          setIsMorphing(false);
        },
        reduced ? 0 : duration / 2,
      );
      return () => clearTimeout(timer);
    } else if (prevChildren !== children) {
      setPrevChildren(children);
    }
  }, [isActive, children, prevChildren, duration, reduced]);

  return (
    <div
      ref={(node) => {
        (containerRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
        if (typeof ref === "function") ref(node);
        else if (ref)
          (containerRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
      }}
      className={cn("relative overflow-hidden", className)}
      style={style}
      {...props}
    >
      {prevChildren && (
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            opacity: reduced ? 0 : isMorphing ? 0 : 1,
            transform: reduced ? "none" : isMorphing ? "scale(0.9)" : "scale(1)",
            transition: reduced
              ? "none"
              : `opacity ${duration / 2}ms ease-out, transform ${duration / 2}ms ease-out`,
          }}
        >
          {prevChildren}
        </div>
      )}
      <div
        style={{
          opacity: reduced ? 1 : isMorphing ? 0 : 1,
          transform: reduced ? "none" : isMorphing ? "scale(1.1)" : "scale(1)",
          transition: reduced
            ? "none"
            : `opacity ${duration / 2}ms ease-out, transform ${duration / 2}ms ease-out`,
          transitionDelay: reduced ? "0ms" : `${duration / 2}ms`,
        }}
      >
        {children}
      </div>
    </div>
  );
}
MorphTransition.displayName = "MorphTransition";

export { PageTransition, TransitionGroup, RouteTransition, AnimatePresence, MorphTransition };
