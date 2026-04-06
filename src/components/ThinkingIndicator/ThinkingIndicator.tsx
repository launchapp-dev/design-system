import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";
import { useReducedMotion } from "../../lib/animation";

const thinkingIndicatorVariants = cva(
  "inline-flex items-center gap-2",
  {
    variants: {
      variant: {
        dots: "",
        brain: "",
        chain: "",
      },
      size: {
        sm: "text-xs",
        md: "text-sm",
        lg: "text-base",
      },
    },
    defaultVariants: {
      variant: "dots",
      size: "md",
    },
  }
);

const dotSizeClasses = {
  sm: "h-1.5 w-1.5",
  md: "h-2 w-2",
  lg: "h-2.5 w-2.5",
} as const;

const brainSizeClasses = {
  sm: "w-5 h-5",
  md: "w-6 h-6",
  lg: "w-8 h-8",
} as const;

export interface ThinkingIndicatorProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof thinkingIndicatorVariants> {
  label?: string;
  steps?: string[];
  currentStep?: number;
}

const DotsIndicator = React.forwardRef<
  HTMLDivElement,
  {
    size?: "sm" | "md" | "lg";
    label?: string;
    reducedMotion: boolean;
  }
>(({ size = "md", label, reducedMotion }, ref) => (
  <div ref={ref} className="flex items-center gap-1.5 rounded-full bg-muted px-3 py-2">
    {[0, 1, 2].map((i) => (
      <span
        key={i}
        className={cn(
          "rounded-full bg-primary",
          dotSizeClasses[size],
          reducedMotion ? "opacity-60" : undefined
        )}
        style={
          reducedMotion
            ? undefined
            : {
                animation: "thinking-bounce 1.4s ease-in-out infinite",
                animationDelay: `${i * 0.16}s`,
              }
        }
        aria-hidden="true"
      />
    ))}
    {label && (
      <span className="ml-1 text-muted-foreground">{label}</span>
    )}
  </div>
));
DotsIndicator.displayName = "DotsIndicator";

const BrainIndicator = React.forwardRef<
  HTMLDivElement,
  {
    size?: "sm" | "md" | "lg";
    label?: string;
    reducedMotion: boolean;
  }
>(({ size = "md", label, reducedMotion }, ref) => (
  <div ref={ref} className="flex items-center gap-2">
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn(
        "text-primary",
        brainSizeClasses[size],
        reducedMotion ? undefined : "animate-[brain-pulse_2s_ease-in-out_infinite]"
      )}
      aria-hidden="true"
    >
      <path d="M12 4.5a2.5 2.5 0 0 0-4.96-.46 2.5 2.5 0 0 0-1.98 3 2.5 2.5 0 0 0-1.32 4.24 3 3 0 0 0 .34 5.58 2.5 2.5 0 0 0 2.96 3.08A2.5 2.5 0 0 0 12 19.5" />
      <path d="M12 4.5a2.5 2.5 0 0 1 4.96-.46 2.5 2.5 0 0 1 1.98 3 2.5 2.5 0 0 1 1.32 4.24 3 3 0 0 1-.34 5.58 2.5 2.5 0 0 1-2.96 3.08A2.5 2.5 0 0 1 12 19.5" />
      <path d="M12 4.5v15" />
      <path d="M8 8.5c.33.5.67 1 1 2 .33-1 .67-1.5 1-2" />
      <path d="M14 8.5c.33.5.67 1 1 2 .33-1 .67-1.5 1-2" />
      <path d="M8 14.5c.33.5.67 1 1 2 .33-1 .67-1.5 1-2" />
      <path d="M14 14.5c.33.5.67 1 1 2 .33-1 .67-1.5 1-2" />
    </svg>
    {label && <span className="text-muted-foreground">{label}</span>}
  </div>
));
BrainIndicator.displayName = "BrainIndicator";

const ChainIndicator = React.forwardRef<
  HTMLDivElement,
  {
    size?: "sm" | "md" | "lg";
    steps: string[];
    currentStep?: number;
    reducedMotion: boolean;
  }
>(({ size = "md", steps, currentStep = 0, reducedMotion }, ref) => {
  const [displayStep, setDisplayStep] = React.useState(0);

  React.useEffect(() => {
    if (currentStep > 0) {
      setDisplayStep(Math.min(currentStep, steps.length));
      return;
    }
    if (reducedMotion) {
      setDisplayStep(steps.length > 0 ? 1 : 0);
      return;
    }
    const interval = setInterval(() => {
      setDisplayStep((prev) => (prev >= steps.length ? 1 : prev + 1));
    }, 1200);
    return () => clearInterval(interval);
  }, [steps.length, currentStep, reducedMotion]);

  return (
    <div ref={ref} className="flex flex-col gap-1.5">
      {steps.slice(0, displayStep).map((step, index) => (
        <div
          key={index}
          className={cn(
            "flex items-center gap-2 text-muted-foreground",
            size === "sm" && "text-xs",
            size === "md" && "text-sm",
            size === "lg" && "text-base"
          )}
        >
          <span
            className={cn(
              "flex h-4 w-4 shrink-0 items-center justify-center rounded-full border border-primary/30 bg-primary/10 text-[10px] text-primary",
              index === displayStep - 1 && !reducedMotion && "animate-[chain-pulse_1s_ease-in-out_infinite]"
            )}
          >
            {index + 1}
          </span>
          <span className="truncate">{step}</span>
        </div>
      ))}
    </div>
  );
});
ChainIndicator.displayName = "ChainIndicator";

function ThinkingIndicator({
  className,
  variant = "dots",
  size = "md",
  label,
  steps = [],
  currentStep,
  ref,
  ...props
}: ThinkingIndicatorProps & { ref?: React.Ref<HTMLDivElement> }) {
  const reducedMotion = useReducedMotion();

  const effectiveSize = size ?? "md";

  const renderIndicator = () => {
    switch (variant) {
      case "brain":
        return (
          <BrainIndicator
            size={effectiveSize}
            label={label}
            reducedMotion={reducedMotion}
          />
        );
      case "chain":
        return (
          <ChainIndicator
            size={effectiveSize}
            steps={steps}
            currentStep={currentStep}
            reducedMotion={reducedMotion}
          />
        );
      default:
        return (
          <DotsIndicator
            size={effectiveSize}
            label={label}
            reducedMotion={reducedMotion}
          />
        );
    }
  };

  return (
    <div
      ref={ref}
      role="status"
      aria-live="polite"
      aria-label={label || "Thinking"}
      className={cn(thinkingIndicatorVariants({ variant, size }), className)}
      {...props}
    >
      {renderIndicator()}
      <style>{`
        @keyframes thinking-bounce {
          0%, 80%, 100% {
            transform: translateY(0);
            opacity: 0.4;
          }
          40% {
            transform: translateY(-6px);
            opacity: 1;
          }
        }
        @keyframes brain-pulse {
          0%, 100% {
            opacity: 0.6;
            transform: scale(1);
          }
          50% {
            opacity: 1;
            transform: scale(1.05);
          }
        }
        @keyframes chain-pulse {
          0%, 100% {
            box-shadow: 0 0 0 0 hsl(var(--la-primary) / 0.4);
          }
          50% {
            box-shadow: 0 0 0 4px hsl(var(--la-primary) / 0);
          }
        }
        @media (prefers-reduced-motion: reduce) {
          @keyframes thinking-bounce {
            0%, 100% { opacity: 0.6; transform: none; }
          }
          @keyframes brain-pulse {
            0%, 100% { opacity: 0.8; transform: none; }
          }
          @keyframes chain-pulse {
            0%, 100% { box-shadow: none; }
          }
        }
      `}</style>
    </div>
  );
}

ThinkingIndicator.displayName = "ThinkingIndicator";

export type ThinkingIndicatorVariants = VariantProps<typeof thinkingIndicatorVariants>;

export { ThinkingIndicator, thinkingIndicatorVariants };
