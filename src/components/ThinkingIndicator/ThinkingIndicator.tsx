import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";
import { useReducedMotion } from "../../lib/animation";
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "../Collapsible";

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

export interface ReasoningStep {
  label: string;
  status?: "pending" | "active" | "done";
}

export interface ThinkingIndicatorProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof thinkingIndicatorVariants> {
  label?: string;
  steps?: string[] | ReasoningStep[];
  currentStep?: number;
  isThinking?: boolean;
}

function isReasoningSteps(steps: string[] | ReasoningStep[]): steps is ReasoningStep[] {
  return steps.length > 0 && typeof steps[0] === "object";
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

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

function ChevronDownIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

const ReasoningChainIndicator = ({
  label = "Thinking",
  steps,
  isThinking = true,
}: {
  label?: string;
  steps: ReasoningStep[];
  isThinking?: boolean;
}) => {
  const [stepsOpen, setStepsOpen] = React.useState(false);

  return (
    <div className="inline-flex flex-col gap-2">
      <div className="flex items-center gap-2">
        <div
          className={cn(
            "rounded-full p-1.5 transition-colors",
            isThinking
              ? "animate-pulse text-[hsl(var(--la-primary))] bg-[hsl(var(--la-primary)/0.1)]"
              : "text-muted-foreground"
          )}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z" />
            <path d="M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z" />
            <path d="M15 13a4.5 4.5 0 0 1-3-4 4.5 4.5 0 0 1-3 4" />
            <path d="M17.599 6.5a3 3 0 0 0 .399-1.375" />
            <path d="M6.003 5.125A3 3 0 0 0 6.401 6.5" />
            <path d="M3.477 10.896a4 4 0 0 1 .585-.396" />
            <path d="M19.938 10.5a4 4 0 0 1 .585.396" />
            <path d="M6 18a4 4 0 0 1-1.967-.516" />
            <path d="M19.967 17.484A4 4 0 0 1 18 18" />
          </svg>
        </div>
        <span className="text-sm text-muted-foreground">{label}</span>
        {isThinking && (
          <div className="flex items-center gap-0.5">
            <span
              className="h-1.5 w-1.5 rounded-full bg-[hsl(var(--la-primary))] animate-bounce"
              style={{ animationDelay: "0ms" }}
            />
            <span
              className="h-1.5 w-1.5 rounded-full bg-[hsl(var(--la-primary))] animate-bounce"
              style={{ animationDelay: "150ms" }}
            />
            <span
              className="h-1.5 w-1.5 rounded-full bg-[hsl(var(--la-primary))] animate-bounce"
              style={{ animationDelay: "300ms" }}
            />
          </div>
        )}
      </div>
      <Collapsible open={stepsOpen} onOpenChange={setStepsOpen}>
        <CollapsibleTrigger className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors pl-1">
          <ChevronDownIcon
            className={cn(
              "transition-transform duration-200",
              stepsOpen && "rotate-180"
            )}
          />
          {stepsOpen ? "Hide" : "Show"} reasoning
        </CollapsibleTrigger>
        <CollapsibleContent>
          <ol className="mt-2 flex flex-col gap-1 pl-2 border-l border-border ml-1">
            {steps.map((step, index) => (
              <li
                key={index}
                className={cn(
                  "flex items-center gap-2 text-xs py-0.5 transition-colors",
                  step.status === "done" && "text-muted-foreground",
                  step.status === "active" && "text-foreground font-medium",
                  step.status === "pending" && "text-muted-foreground/60"
                )}
              >
                {step.status === "done" ? (
                  <CheckIcon className="text-[hsl(var(--la-primary))] shrink-0" />
                ) : step.status === "active" ? (
                  <span className="h-2 w-2 rounded-full bg-[hsl(var(--la-primary))] animate-pulse shrink-0" />
                ) : (
                  <span className="h-2 w-2 rounded-full border border-border shrink-0" />
                )}
                {step.label}
              </li>
            ))}
          </ol>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
};

function ThinkingIndicator({
  className,
  variant = "dots",
  size = "md",
  label,
  steps = [],
  currentStep,
  isThinking,
  ref,
  ...props
}: ThinkingIndicatorProps & { ref?: React.Ref<HTMLDivElement> }) {
  const reducedMotion = useReducedMotion();

  const effectiveSize = size ?? "md";

  if (steps.length > 0 && isReasoningSteps(steps)) {
    return (
      <div
        ref={ref}
        role="status"
        aria-live="polite"
        aria-label={label || "Thinking"}
        className={cn("inline-flex flex-col", className)}
        {...props}
      >
        <ReasoningChainIndicator
          label={label}
          steps={steps}
          isThinking={isThinking ?? true}
        />
      </div>
    );
  }

  const stringSteps = steps as string[];

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
            steps={stringSteps}
            currentStep={currentStep}
            reducedMotion={reducedMotion}
          />
        );
      case "dots":
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

export { ThinkingIndicator, thinkingIndicatorVariants };
