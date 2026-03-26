import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";

export interface TypewriterProps extends React.HTMLAttributes<HTMLSpanElement> {
  text: string;
  speed?: number;
  showCursor?: boolean;
}

function Typewriter({ text, speed = 50, showCursor = true, className, ref, ...props }: TypewriterProps & { ref?: React.Ref<HTMLSpanElement> }) {
  const [displayed, setDisplayed] = React.useState("");
  const prefersReducedMotion = React.useMemo(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    []
  );

  React.useEffect(() => {
    if (prefersReducedMotion) {
      setDisplayed(text);
      return;
    }
    setDisplayed("");
    let i = 0;
    const interval = setInterval(() => {
      i++;
      setDisplayed(text.slice(0, i));
      if (i >= text.length) clearInterval(interval);
    }, speed);
    return () => clearInterval(interval);
  }, [text, speed, prefersReducedMotion]);

  return (
    <span ref={ref} className={cn("inline-block", className)} {...props}>
      <span aria-hidden="true">
        {displayed}
        {showCursor && (
          <span
            aria-hidden="true"
            className="inline-block animate-cursor-blink border-r-2 border-current ml-0.5"
          />
        )}
      </span>
      <span
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
      >
        {text}
      </span>
    </span>
  );
}
Typewriter.displayName = "Typewriter";

const blurInVariants = cva(
  "inline-block animate-blur-in motion-reduce:animate-none",
  {
    variants: {
      size: {
        sm: "text-sm",
        md: "text-base",
        lg: "text-lg",
      },
    },
    defaultVariants: { size: "md" },
  }
);

export interface BlurInProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof blurInVariants> {}

function BlurIn({ className, size, children, ref, ...props }: BlurInProps & { ref?: React.Ref<HTMLSpanElement> }) {
  return (
    <span
      ref={ref}
      className={cn(blurInVariants({ size }), className)}
      {...props}
    >
      {children}
    </span>
  );
}
BlurIn.displayName = "BlurIn";

const fadeUpVariants = cva(
  "inline-block animate-fade-up motion-reduce:animate-none",
  {
    variants: {
      size: {
        sm: "text-sm",
        md: "text-base",
        lg: "text-lg",
      },
    },
    defaultVariants: { size: "md" },
  }
);

export interface FadeUpProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof fadeUpVariants> {}

function FadeUp({ className, size, children, ref, ...props }: FadeUpProps & { ref?: React.Ref<HTMLSpanElement> }) {
  return (
    <span
      ref={ref}
      className={cn(fadeUpVariants({ size }), className)}
      {...props}
    >
      {children}
    </span>
  );
}
FadeUp.displayName = "FadeUp";

export interface LetterRevealProps extends React.HTMLAttributes<HTMLSpanElement> {
  text: string;
  staggerDelay?: number;
}

function LetterReveal({ text, staggerDelay = 30, className, ref, ...props }: LetterRevealProps & { ref?: React.Ref<HTMLSpanElement> }) {
  return (
    <span
      ref={ref}
      className={cn("inline-block", className)}
      aria-label={text}
      {...props}
    >
      {text.split("").map((char, i) => (
        <span
          key={i}
          aria-hidden="true"
          className="inline-block opacity-0 animate-letter-reveal motion-reduce:animate-none motion-reduce:opacity-100"
          style={{ animationDelay: `${i * staggerDelay}ms` }}
        >
          {char === " " ? "\u00a0" : char}
        </span>
      ))}
    </span>
  );
}
LetterReveal.displayName = "LetterReveal";

export interface WordRevealProps extends React.HTMLAttributes<HTMLSpanElement> {
  text: string;
  staggerDelay?: number;
}

function WordReveal({
  text,
  staggerDelay = 100,
  className,
  ref,
  ...props
}: WordRevealProps & { ref?: React.Ref<HTMLSpanElement> }) {
  const words = text.split(" ");
  return (
    <span
      ref={ref}
      className={cn("inline-block", className)}
      aria-label={text}
      {...props}
    >
      {words.map((word, i) => (
        <span key={i} className="inline-block">
          <span
            aria-hidden="true"
            className="inline-block opacity-0 animate-fade-up motion-reduce:animate-none motion-reduce:opacity-100"
            style={{ animationDelay: `${i * staggerDelay}ms` }}
          >
            {word}
          </span>
          {i < words.length - 1 && <span aria-hidden="true"> </span>}
        </span>
      ))}
    </span>
  );
}
WordReveal.displayName = "WordReveal";

const gradientTextVariants = cva("inline-block", {
  variants: {
    variant: {
      default: "bg-gradient-to-r from-[hsl(var(--la-primary))] to-[hsl(var(--la-secondary))] bg-clip-text text-transparent",
      primary: "bg-gradient-to-r from-[hsl(var(--la-primary))] to-[hsl(var(--la-primary)/0.7)] bg-clip-text text-transparent",
      rainbow: "bg-gradient-to-r from-[hsl(var(--la-destructive))] via-[hsl(var(--la-primary))] to-[hsl(var(--la-secondary))] bg-clip-text text-transparent",
      sunset: "bg-gradient-to-r from-[#f97316] via-[#ec4899] to-[#8b5cf6] bg-clip-text text-transparent",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

export interface GradientTextProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof gradientTextVariants> {}

function GradientText({
  className,
  variant,
  children,
  ref,
  ...props
}: GradientTextProps & { ref?: React.Ref<HTMLSpanElement> }) {
  return (
    <span
      ref={ref}
      className={cn(gradientTextVariants({ variant }), className)}
      {...props}
    >
      {children}
    </span>
  );
}
GradientText.displayName = "GradientText";

export type BlurInVariants = VariantProps<typeof blurInVariants>;
export type FadeUpVariants = VariantProps<typeof fadeUpVariants>;
export type GradientTextVariants = VariantProps<typeof gradientTextVariants>;

export { Typewriter, BlurIn, FadeUp, LetterReveal, WordReveal, GradientText, gradientTextVariants };
