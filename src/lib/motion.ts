import * as React from "react";
import { useReducedMotion } from "./animation";

// ─── Duration tokens ──────────────────────────────────────────────────────────

export const motionDuration = {
  fast: "var(--la-duration-fast)",
  normal: "var(--la-duration-normal)",
  slow: "var(--la-duration-slow)",
  slower: "var(--la-duration-slower)",
} as const;

export type MotionDuration = keyof typeof motionDuration;

export const motionDurationMs = {
  fast: 150,
  normal: 250,
  slow: 400,
  slower: 600,
} as const;

// ─── Easing tokens ────────────────────────────────────────────────────────────

export const motionEasing = {
  in: "var(--la-ease-in)",
  out: "var(--la-ease-out)",
  inOut: "var(--la-ease-in-out)",
  spring: "var(--la-ease-spring)",
  bounce: "var(--la-ease-bounce)",
} as const;

export type MotionEasing = keyof typeof motionEasing;

export const motionEasingValues = {
  in: "cubic-bezier(0.4, 0, 1, 1)",
  out: "cubic-bezier(0.16, 1, 0.3, 1)",
  inOut: "cubic-bezier(0.4, 0, 0.2, 1)",
  spring: "cubic-bezier(0.34, 1.56, 0.64, 1)",
  bounce: "cubic-bezier(0.68, -0.55, 0.27, 1.55)",
} as const;

// ─── Entrance animation presets ───────────────────────────────────────────────

export type EntrancePreset = "fade" | "slideUp" | "scale" | "blur";

export const entranceAnimation: Record<
  EntrancePreset,
  { className: string; keyframe: string }
> = {
  fade: {
    className: "animate-enter-fade",
    keyframe: "la-enter-fade",
  },
  slideUp: {
    className: "animate-enter-slide-up",
    keyframe: "la-enter-slide-up",
  },
  scale: {
    className: "animate-enter-scale",
    keyframe: "la-enter-scale",
  },
  blur: {
    className: "animate-enter-blur",
    keyframe: "la-enter-blur",
  },
};

// ─── Exit animation presets ───────────────────────────────────────────────────

export type ExitPreset = "fade" | "slideDown" | "scale";

export const exitAnimation: Record<
  ExitPreset,
  { className: string; keyframe: string }
> = {
  fade: {
    className: "animate-exit-fade",
    keyframe: "la-exit-fade",
  },
  slideDown: {
    className: "animate-exit-slide-down",
    keyframe: "la-exit-slide-down",
  },
  scale: {
    className: "animate-exit-scale",
    keyframe: "la-exit-scale",
  },
};

// ─── Loading animation presets ────────────────────────────────────────────────

export type LoadingPreset = "skeleton" | "spinner" | "pulse";

export const loadingAnimation: Record<
  LoadingPreset,
  { className: string; keyframe: string }
> = {
  skeleton: {
    className: "animate-skeleton",
    keyframe: "la-skeleton",
  },
  spinner: {
    className: "animate-spinner",
    keyframe: "la-spinner",
  },
  pulse: {
    className: "animate-pulse-soft",
    keyframe: "la-pulse-soft",
  },
};

// ─── CSS variable accessors ───────────────────────────────────────────────────

export const motionTokens = {
  duration: motionDuration,
  easing: motionEasing,
} as const;

// ─── React style prop helpers ─────────────────────────────────────────────────

export interface MotionStyleProps {
  duration?: MotionDuration;
  easing?: MotionEasing;
  delay?: number;
}

export function buildTransitionStyle({
  duration = "normal",
  easing = "out",
  delay,
}: MotionStyleProps = {}): React.CSSProperties {
  return {
    transitionDuration: motionDuration[duration],
    transitionTimingFunction: motionEasing[easing],
    ...(delay !== undefined && { transitionDelay: `${delay}ms` }),
  };
}

export function buildAnimationStyle(
  keyframe: string,
  {
    duration = "normal",
    easing = "out",
    delay,
    fillMode = "both",
    iterations = 1,
  }: MotionStyleProps & {
    fillMode?: "both" | "forwards" | "backwards" | "none";
    iterations?: number | "infinite";
  } = {},
): React.CSSProperties {
  const dur = motionDuration[duration];
  const ease = motionEasing[easing];
  const del = delay !== undefined ? ` ${delay}ms` : "";
  return {
    animation: `${keyframe} ${dur} ${ease}${del} ${fillMode} ${iterations === "infinite" ? "infinite" : iterations}`,
  };
}

// ─── Hooks ────────────────────────────────────────────────────────────────────

export { useReducedMotion };

export function useMotionSafe<T>(
  full: T,
  reduced: T,
): T {
  const prefersReduced = useReducedMotion();
  return prefersReduced ? reduced : full;
}
