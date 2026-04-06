import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Button } from "@/components/Button";
import { cn } from "@/lib/utils";

const stepperVariants = cva("w-full", {
  variants: {
    orientation: {
      horizontal: "flex flex-col",
      vertical: "flex flex-col md:flex-row gap-8",
    },
  },
  defaultVariants: {
    orientation: "horizontal",
  },
});

const stepIndicatorVariants = cva(
  "relative flex items-center justify-center rounded-full border-2 font-semibold transition-all duration-200",
  {
    variants: {
      status: {
        pending: "border-muted-foreground/30 bg-background text-muted-foreground",
        current: "border-primary bg-background text-primary ring-2 ring-primary/20",
        completed: "border-primary bg-primary text-primary-foreground",
      },
      size: {
        sm: "h-8 w-8 text-sm",
        md: "h-10 w-10 text-base",
        lg: "h-12 w-12 text-lg",
      },
    },
    defaultVariants: {
      status: "pending",
      size: "md",
    },
  },
);

export interface Step {
  id: string;
  title: string;
  description?: string;
  content: React.ReactNode;
  optional?: boolean;
  validate?: () => Promise<boolean> | boolean;
}

export interface OnboardingStepperProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange">,
    VariantProps<typeof stepperVariants> {
  steps: Step[];
  onComplete: () => void;
  onStepChange?: (step: number) => void;
  onSkip?: (step: number) => void;
  initialStep?: number;
  size?: "sm" | "md" | "lg";
  allowSkip?: boolean;
  completeLabel?: string;
  nextLabel?: string;
  prevLabel?: string;
  skipLabel?: string;
  showStepNumbers?: boolean;
  connectorClassName?: string;
}

const OnboardingStepper = React.forwardRef<HTMLDivElement, OnboardingStepperProps>(
  (
    {
      steps,
      onComplete,
      onStepChange,
      onSkip,
      initialStep = 0,
      orientation = "horizontal",
      size = "md",
      allowSkip = false,
      completeLabel = "Complete",
      nextLabel = "Next",
      prevLabel = "Back",
      skipLabel = "Skip",
      showStepNumbers = true,
      className,
      connectorClassName,
      ...props
    },
    ref,
  ) => {
    const [currentStep, setCurrentStep] = React.useState(initialStep);
    const [validating, setValidating] = React.useState(false);
    const [completed, setCompleted] = React.useState(false);
    const stepRefs = React.useRef<(HTMLButtonElement | null)[]>([]);

    const isFirst = currentStep === 0;
    const isLast = currentStep === steps.length - 1;
    const currentStepData = steps[currentStep];

    const handleNext = async () => {
      if (currentStepData?.validate) {
        setValidating(true);
        try {
          const valid = await currentStepData.validate();
          if (!valid) return;
        } finally {
          setValidating(false);
        }
      }

      if (isLast) {
        setCompleted(true);
        setTimeout(() => {
          onComplete();
        }, 600);
      } else {
        const next = currentStep + 1;
        setCurrentStep(next);
        onStepChange?.(next);
      }
    };

    const handlePrev = () => {
      if (!isFirst) {
        const prev = currentStep - 1;
        setCurrentStep(prev);
        onStepChange?.(prev);
      }
    };

    const handleSkip = () => {
      if (allowSkip && currentStepData?.optional) {
        onSkip?.(currentStep);
        if (!isLast) {
          const next = currentStep + 1;
          setCurrentStep(next);
          onStepChange?.(next);
        }
      }
    };

    const handleStepClick = (index: number) => {
      if (index < currentStep || (allowSkip && steps[index]?.optional)) {
        setCurrentStep(index);
        onStepChange?.(index);
      }
    };

    const handleKeyDown = (event: React.KeyboardEvent) => {
      if (orientation === "horizontal") {
        if (event.key === "ArrowRight") {
          event.preventDefault();
          handleNext();
        } else if (event.key === "ArrowLeft") {
          event.preventDefault();
          handlePrev();
        }
      } else {
        if (event.key === "ArrowDown") {
          event.preventDefault();
          handleNext();
        } else if (event.key === "ArrowUp") {
          event.preventDefault();
          handlePrev();
        }
      }

      if (event.key === "Home") {
        event.preventDefault();
        if (!isFirst) {
          setCurrentStep(0);
          onStepChange?.(0);
        }
      } else if (event.key === "End") {
        event.preventDefault();
        if (!isLast) {
          setCurrentStep(steps.length - 1);
          onStepChange?.(steps.length - 1);
        }
      }
    };

    React.useEffect(() => {
      stepRefs.current[currentStep]?.focus();
    }, [currentStep]);

    const getStepStatus = (index: number): "pending" | "current" | "completed" => {
      if (index === currentStep) return "current";
      if (index < currentStep) return "completed";
      return "pending";
    };

    const CompletionAnimation = () => (
      <div className="flex flex-col items-center justify-center gap-6 py-12 text-center animate-in fade-in zoom-in duration-500">
        <div className="relative">
          <div className="absolute inset-0 animate-ping rounded-full bg-primary/20" />
          <div className="relative flex h-20 w-20 items-center justify-center rounded-full bg-primary text-primary-foreground">
            <svg className="h-10 w-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={3}
                d="M5 13l4 4L19 7"
                className="animate-in zoom-in duration-300 delay-150"
              />
            </svg>
          </div>
        </div>
        <div className="space-y-2">
          <h3 className="text-2xl font-bold">All done!</h3>
          <p className="text-muted-foreground">You&apos;ve completed all the steps.</p>
        </div>
      </div>
    );

    const StepIndicator = ({
      step,
      index,
      status,
    }: {
      step: Step;
      index: number;
      status: "pending" | "current" | "completed";
    }) => {
      const clickable = index < currentStep || (allowSkip && step.optional);

      return (
        <button
          ref={(el) => {
            stepRefs.current[index] = el;
          }}
          type="button"
          onClick={() => clickable && handleStepClick(index)}
          onKeyDown={handleKeyDown}
          disabled={!clickable && status !== "current"}
          tabIndex={status === "current" ? 0 : -1}
          aria-current={status === "current" ? "step" : undefined}
          aria-label={`Step ${index + 1}: ${step.title}${status === "completed" ? " (completed)" : ""}`}
          className={cn(
            stepIndicatorVariants({ status, size }),
            clickable && "cursor-pointer hover:scale-105",
            !clickable && status !== "current" && "cursor-default",
          )}
        >
          {status === "completed" ? (
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          ) : showStepNumbers ? (
            index + 1
          ) : (
            <span className="sr-only">Step {index + 1}</span>
          )}
        </button>
      );
    };

    const HorizontalStepper = () => (
      <div className="w-full">
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => {
              const status = getStepStatus(index);
              const isLastStep = index === steps.length - 1;

              return (
                <React.Fragment key={step.id}>
                  <div className="flex flex-col items-center gap-3">
                    <StepIndicator step={step} index={index} status={status} />
                    <div className="text-center">
                      <div
                        className={cn(
                          "text-sm font-medium",
                          status === "current" ? "text-foreground" : "text-muted-foreground",
                        )}
                      >
                        {step.title}
                      </div>
                      {step.description && (
                        <div className="text-xs text-muted-foreground">{step.description}</div>
                      )}
                      {step.optional && (
                        <div className="text-xs text-muted-foreground">Optional</div>
                      )}
                    </div>
                  </div>
                  {!isLastStep && (
                    <div
                      className={cn(
                        "mx-4 h-0.5 flex-1 transition-colors duration-300",
                        index < currentStep ? "bg-primary" : "bg-muted",
                        connectorClassName,
                      )}
                      aria-hidden="true"
                    />
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </div>

        <div
          className="rounded-lg border bg-card p-6"
          role="region"
          aria-label={`Step ${currentStep + 1} of ${steps.length}`}
        >
          <div className="mb-6">
            <h3 className="text-lg font-semibold">{currentStepData?.title}</h3>
            {currentStepData?.description && (
              <p className="mt-1 text-sm text-muted-foreground">{currentStepData.description}</p>
            )}
          </div>

          <div className="mb-6">{currentStepData?.content}</div>

          <div className="flex items-center justify-between gap-3">
            <Button
              variant="outline"
              onClick={handlePrev}
              disabled={isFirst}
              aria-label="Go to previous step"
            >
              {prevLabel}
            </Button>

            <div className="flex gap-3">
              {allowSkip && currentStepData?.optional && (
                <Button variant="ghost" onClick={handleSkip} aria-label="Skip this step">
                  {skipLabel}
                </Button>
              )}
              <Button
                onClick={handleNext}
                disabled={validating}
                aria-label={isLast ? "Complete onboarding" : "Go to next step"}
              >
                {validating ? "Validating…" : isLast ? completeLabel : nextLabel}
              </Button>
            </div>
          </div>
        </div>
      </div>
    );

    const VerticalStepper = () => (
      <div className="flex w-full flex-col md:flex-row">
        <div className="md:w-64 md:shrink-0">
          <div className="flex flex-row gap-2 overflow-x-auto pb-4 md:flex-col md:gap-1 md:overflow-visible md:pb-0">
            {steps.map((step, index) => {
              const status = getStepStatus(index);
              const clickable = index < currentStep || (allowSkip && step.optional);

              return (
                <button
                  key={step.id}
                  ref={(el) => {
                    stepRefs.current[index] = el;
                  }}
                  type="button"
                  onClick={() => clickable && handleStepClick(index)}
                  onKeyDown={handleKeyDown}
                  disabled={!clickable && status !== "current"}
                  tabIndex={status === "current" ? 0 : -1}
                  aria-current={status === "current" ? "step" : undefined}
                  className={cn(
                    "flex w-full items-center gap-3 rounded-lg p-3 text-left transition-colors",
                    status === "current" && "bg-accent",
                    clickable && "hover:bg-accent/50 cursor-pointer",
                    !clickable && status !== "current" && "cursor-default opacity-60",
                  )}
                >
                  <div
                    className={cn(
                      "flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 text-sm font-medium",
                      status === "completed" && "border-primary bg-primary text-primary-foreground",
                      status === "current" &&
                        "border-primary bg-background text-primary ring-2 ring-primary/20",
                      status === "pending" &&
                        "border-muted-foreground/30 bg-background text-muted-foreground",
                    )}
                  >
                    {status === "completed" ? (
                      <svg
                        className="h-4 w-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    ) : (
                      index + 1
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div
                      className={cn(
                        "truncate text-sm font-medium",
                        status === "current" ? "text-foreground" : "text-muted-foreground",
                      )}
                    >
                      {step.title}
                    </div>
                    {step.optional && <div className="text-xs text-muted-foreground">Optional</div>}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        <div
          className="flex-1 md:ml-8"
          role="region"
          aria-label={`Step ${currentStep + 1} of ${steps.length}`}
        >
          <div className="rounded-lg border bg-card p-6">
            <div className="mb-6">
              <h3 className="text-lg font-semibold">{currentStepData?.title}</h3>
              {currentStepData?.description && (
                <p className="mt-1 text-sm text-muted-foreground">{currentStepData.description}</p>
              )}
            </div>

            <div className="mb-6">{currentStepData?.content}</div>

            <div className="flex items-center justify-between gap-3">
              <Button
                variant="outline"
                onClick={handlePrev}
                disabled={isFirst}
                aria-label="Go to previous step"
              >
                {prevLabel}
              </Button>

              <div className="flex gap-3">
                {allowSkip && currentStepData?.optional && (
                  <Button variant="ghost" onClick={handleSkip} aria-label="Skip this step">
                    {skipLabel}
                  </Button>
                )}
                <Button
                  onClick={handleNext}
                  disabled={validating}
                  aria-label={isLast ? "Complete onboarding" : "Go to next step"}
                >
                  {validating ? "Validating…" : isLast ? completeLabel : nextLabel}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );

    return (
      <div ref={ref} className={cn(stepperVariants({ orientation }), className)} {...props}>
        {completed ? (
          <CompletionAnimation />
        ) : orientation === "horizontal" ? (
          <HorizontalStepper />
        ) : (
          <VerticalStepper />
        )}
      </div>
    );
  },
);

OnboardingStepper.displayName = "OnboardingStepper";

export type { VariantProps };
export { OnboardingStepper, stepperVariants, stepIndicatorVariants };
