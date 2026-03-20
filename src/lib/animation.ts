import * as React from "react";

export function useReducedMotion(): boolean {
  return React.useMemo(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    []
  );
}

export const duration = {
  fast: 150,
  base: 250,
  slow: 400,
  slower: 600,
} as const;

export const easing = {
  easeOut: "cubic-bezier(0.16, 1, 0.3, 1)",
  easeIn: "cubic-bezier(0.4, 0, 1, 1)",
  easeInOut: "cubic-bezier(0.4, 0, 0.2, 1)",
  spring: "cubic-bezier(0.34, 1.56, 0.64, 1)",
} as const;

export function motionSafe(className: string): string {
  return `motion-safe:${className}`;
}

export function motionReduce(className: string): string {
  return `motion-reduce:${className}`;
}
