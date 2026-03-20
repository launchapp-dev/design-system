import * as React from "react";
import { Button } from "@/components/Button";
import { cn } from "@/lib/utils";

export interface WizardStep {
  id: string;
  title: string;
  description?: string;
  content: React.ReactNode;
}

export interface MultiStepWizardProps extends React.HTMLAttributes<HTMLDivElement> {
  steps: WizardStep[];
  defaultStep?: number;
  onStepChange?: (step: number) => void;
  onComplete?: () => void;
  completeLabel?: string;
  nextLabel?: string;
  backLabel?: string;
}

const MultiStepWizard = React.forwardRef<HTMLDivElement, MultiStepWizardProps>(
  (
    {
      steps,
      defaultStep = 0,
      onStepChange,
      onComplete,
      completeLabel = "Complete",
      nextLabel = "Next",
      backLabel = "Back",
      className,
      ...props
    },
    ref
  ) => {
    const [currentStep, setCurrentStep] = React.useState(defaultStep);

    const goToStep = (step: number) => {
      setCurrentStep(step);
      onStepChange?.(step);
    };

    const handleNext = () => {
      if (currentStep < steps.length - 1) {
        goToStep(currentStep + 1);
      } else {
        onComplete?.();
      }
    };

    const handleBack = () => {
      if (currentStep > 0) {
        goToStep(currentStep - 1);
      }
    };

    const activeStep = steps[currentStep];

    return (
      <div ref={ref} className={cn("flex flex-col gap-8", className)} {...props}>
        <nav aria-label="Progress">
          <ol role="list" className="flex items-center gap-2 sm:gap-4">
            {steps.map((step, index) => {
              const isCompleted = index < currentStep;
              const isCurrent = index === currentStep;
              return (
                <React.Fragment key={step.id}>
                  <li className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => index < currentStep && goToStep(index)}
                      disabled={index > currentStep}
                      aria-current={isCurrent ? "step" : undefined}
                      className={cn(
                        "flex h-9 w-9 items-center justify-center rounded-full border-2 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                        isCompleted &&
                          "border-primary bg-primary text-primary-foreground hover:bg-primary/90 cursor-pointer",
                        isCurrent &&
                          "border-primary bg-background text-primary cursor-default",
                        !isCompleted &&
                          !isCurrent &&
                          "border-muted bg-background text-muted-foreground cursor-not-allowed"
                      )}
                    >
                      {isCompleted ? (
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
                      ) : (
                        <span>{index + 1}</span>
                      )}
                    </button>
                    <span
                      className={cn(
                        "hidden text-sm font-medium sm:block",
                        isCurrent ? "text-foreground" : "text-muted-foreground"
                      )}
                    >
                      {step.title}
                    </span>
                  </li>
                  {index < steps.length - 1 && (
                    <li
                      aria-hidden="true"
                      className={cn(
                        "h-0.5 flex-1 rounded-full transition-colors",
                        index < currentStep ? "bg-primary" : "bg-muted"
                      )}
                    />
                  )}
                </React.Fragment>
              );
            })}
          </ol>
        </nav>

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
          <Button
            variant="outline"
            onClick={handleBack}
            disabled={currentStep === 0}
          >
            {backLabel}
          </Button>
          <span className="text-sm text-muted-foreground">
            Step {currentStep + 1} of {steps.length}
          </span>
          <Button onClick={handleNext}>
            {currentStep === steps.length - 1 ? completeLabel : nextLabel}
          </Button>
        </div>
      </div>
    );
  }
);
MultiStepWizard.displayName = "MultiStepWizard";

export { MultiStepWizard };
