import * as React from "react";
import { Button } from "@/components/Button";
import { cn } from "@/lib/utils";

export interface WizardStep {
  id: string;
  title: string;
  description?: string;
  content: React.ReactNode;
  optional?: boolean;
}

export interface OnboardingWizardProps extends React.HTMLAttributes<HTMLDivElement> {
  steps: WizardStep[];
  defaultStep?: number;
  onStepChange?: (step: number) => void;
  onComplete?: () => void;
  onSkip?: (step: number) => void;
  allowSkip?: boolean;
  completeLabel?: string;
  nextLabel?: string;
  backLabel?: string;
  skipLabel?: string;
  showStepNumbers?: boolean;
  orientation?: "horizontal" | "vertical";
}

const OnboardingWizard = React.forwardRef<HTMLDivElement, OnboardingWizardProps>(
  (
    {
      steps,
      defaultStep = 0,
      onStepChange,
      onComplete,
      onSkip,
      allowSkip = false,
      completeLabel = "Complete",
      nextLabel = "Next",
      backLabel = "Back",
      skipLabel = "Skip",
      showStepNumbers = true,
      orientation = "horizontal",
      className,
      ...props
    },
    ref,
  ) => {
    const [currentStep, setCurrentStep] = React.useState(defaultStep);
    const [completed, setCompleted] = React.useState(false);
    const stepRefs = React.useRef<(HTMLButtonElement | null)[]>([]);

    const isFirst = currentStep === 0;
    const isLast = currentStep === steps.length - 1;
    const activeStep = steps[currentStep];

    const goToStep = (step: number) => {
      setCurrentStep(step);
      onStepChange?.(step);
    };

    const handleNext = () => {
      if (isLast) {
        setCompleted(true);
        setTimeout(() => {
          onComplete?.();
        }, 600);
      } else {
        goToStep(currentStep + 1);
      }
    };

    const handleBack = () => {
      if (!isFirst) {
        goToStep(currentStep - 1);
      }
    };

    const handleSkip = () => {
      if (allowSkip && activeStep?.optional) {
        onSkip?.(currentStep);
        if (!isLast) {
          goToStep(currentStep + 1);
        }
      }
    };

    const handleStepClick = (index: number) => {
      if (index < currentStep || (allowSkip && steps[index]?.optional)) {
        goToStep(index);
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

    const HorizontalProgress = () => (
      <nav aria-label="Progress">
        <ol role="list" className="flex items-center gap-2 sm:gap-4">
          {steps.map((step, index) => {
            const status = getStepStatus(index);
            const isLastStep = index === steps.length - 1;
            const isClickable = index < currentStep || (allowSkip && step.optional);

            return (
              <React.Fragment key={step.id}>
                <li className="flex items-center gap-2">
                  <button
                    ref={(el) => {
                      stepRefs.current[index] = el;
                    }}
                    type="button"
                    onClick={() => isClickable && handleStepClick(index)}
                    disabled={!isClickable && status !== "current"}
                    aria-current={status === "current" ? "step" : undefined}
                    aria-label={`Step ${index + 1}: ${step.title}${status === "completed" ? " (completed)" : ""}`}
                    className={cn(
                      "flex items-center justify-center rounded-full border-2 font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                      status === "completed" &&
                        "h-9 w-9 border-primary bg-primary text-primary-foreground hover:bg-primary/90 cursor-pointer",
                      status === "current" &&
                        "h-9 w-9 border-primary bg-background text-primary ring-2 ring-primary/20 cursor-default",
                      status === "pending" &&
                        "h-9 w-9 border-muted-foreground/30 bg-background text-muted-foreground cursor-not-allowed",
                      isClickable && "hover:scale-105",
                    )}
                  >
                    {status === "completed" ? (
                      <svg
                        className="h-4 w-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2.5}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    ) : showStepNumbers ? (
                      <span className="text-sm">{index + 1}</span>
                    ) : (
                      <span className="sr-only">Step {index + 1}</span>
                    )}
                  </button>
                  <span
                    className={cn(
                      "hidden text-sm font-medium sm:block",
                      status === "current" ? "text-foreground" : "text-muted-foreground",
                    )}
                  >
                    {step.title}
                  </span>
                </li>
                {!isLastStep && (
                  <li
                    aria-hidden="true"
                    className={cn(
                      "h-0.5 flex-1 rounded-full transition-colors",
                      index < currentStep ? "bg-primary" : "bg-muted",
                    )}
                  />
                )}
              </React.Fragment>
            );
          })}
        </ol>
      </nav>
    );

    const VerticalProgress = () => (
      <div className="flex w-full flex-col md:flex-row gap-8">
        <div className="md:w-64 md:shrink-0">
          <div className="flex flex-row gap-2 overflow-x-auto pb-4 md:flex-col md:gap-1 md:overflow-visible md:pb-0">
            {steps.map((step, index) => {
              const status = getStepStatus(index);
              const isClickable = index < currentStep || (allowSkip && step.optional);

              return (
                <button
                  key={step.id}
                  ref={(el) => {
                    stepRefs.current[index] = el;
                  }}
                  type="button"
                  onClick={() => isClickable && handleStepClick(index)}
                  disabled={!isClickable && status !== "current"}
                  tabIndex={status === "current" ? 0 : -1}
                  aria-current={status === "current" ? "step" : undefined}
                  className={cn(
                    "flex w-full items-center gap-3 rounded-lg p-3 text-left transition-colors",
                    status === "current" && "bg-accent",
                    isClickable && "hover:bg-accent/50 cursor-pointer",
                    !isClickable && status !== "current" && "cursor-default opacity-60",
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
      </div>
    );

    return (
      <div ref={ref} className={cn("flex flex-col gap-8", className)} {...props}>
        {completed ? (
          <CompletionAnimation />
        ) : (
          <>
            {orientation === "horizontal" ? <HorizontalProgress /> : <VerticalProgress />}

            <div className="min-h-0 flex-1">
              {activeStep && (
                <div>
                  <div className="mb-6">
                    <h2 className="text-xl font-semibold">{activeStep.title}</h2>
                    {activeStep.description && (
                      <p className="mt-1 text-sm text-muted-foreground">{activeStep.description}</p>
                    )}
                  </div>
                  <div>{activeStep.content}</div>
                </div>
              )}
            </div>

            <div className="flex items-center justify-between">
              <Button variant="outline" onClick={handleBack} disabled={isFirst}>
                {backLabel}
              </Button>

              <span className="text-sm text-muted-foreground">
                Step {currentStep + 1} of {steps.length}
              </span>

              <div className="flex gap-3">
                {allowSkip && activeStep?.optional && (
                  <Button variant="ghost" onClick={handleSkip}>
                    {skipLabel}
                  </Button>
                )}
                <Button onClick={handleNext}>{isLast ? completeLabel : nextLabel}</Button>
              </div>
            </div>
          </>
        )}
      </div>
    );
  },
);
OnboardingWizard.displayName = "OnboardingWizard";

export { OnboardingWizard };
