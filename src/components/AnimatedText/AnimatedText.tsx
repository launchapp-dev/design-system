import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";

const animatedTextVariants = cva("inline-block", {
  variants: {
    animation: {
      fadeUp: "animate-fade-up motion-reduce:animate-none motion-reduce:opacity-100",
      blurIn: "animate-blur-in motion-reduce:animate-none",
      letterReveal: "",
      wordReveal: "",
    },
    size: {
      sm: "text-sm",
      md: "text-base",
      lg: "text-lg",
      xl: "text-xl",
      "2xl": "text-2xl",
    },
  },
  defaultVariants: {
    animation: "fadeUp",
    size: "md",
  },
});

export interface AnimatedTextProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof animatedTextVariants> {
  text: string;
  staggerDelay?: number;
  byCharacter?: boolean;
  delay?: number;
}

function AnimatedText({
  text,
  animation = "fadeUp",
  size,
  staggerDelay = 50,
  byCharacter = false,
  delay = 0,
  className,
  ref,
  ...props
}: AnimatedTextProps & { ref?: React.Ref<HTMLSpanElement> }) {
  const prefersReducedMotion = React.useMemo(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    []
  );

  if (animation === "letterReveal" || byCharacter) {
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
            style={{
              animationDelay: prefersReducedMotion ? "0ms" : `${delay + i * staggerDelay}ms`,
            }}
          >
            {char === " " ? "\u00a0" : char}
          </span>
        ))}
      </span>
    );
  }

  if (animation === "wordReveal") {
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
              style={{
                animationDelay: prefersReducedMotion ? "0ms" : `${delay + i * staggerDelay}ms`,
              }}
            >
              {word}
            </span>
            {i < words.length - 1 && <span aria-hidden="true"> </span>}
          </span>
        ))}
      </span>
    );
  }

  return (
    <span
      ref={ref}
      className={cn(animatedTextVariants({ animation, size }), className)}
      style={{
        animationDelay: prefersReducedMotion ? "0ms" : `${delay}ms`,
      }}
      {...props}
    >
      {text}
    </span>
  );
}
AnimatedText.displayName = "AnimatedText";

export { AnimatedText };
