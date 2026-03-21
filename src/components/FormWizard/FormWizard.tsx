import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";
import { Button } from "../Button";
import { Progress } from "../Progress";

const wizardVariants = cva("flex flex-col", {
  variants: {
    size: {
      sm: "gap-4",
      md: "gap-6",
      lg: "gap-8",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

export interface FormWizardStep {
  id: string;
  title: string;
  description?: string;
  content: React.ReactNode;
  validate?: () => Promise<boolean> | boolean;
}

export interface WizardFormData {
  currentStep: number;
  steps: string[];
  data: Record<string, unknown>;
  savedAt?: string;
}

export interface FormWizardProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onSubmit">,
    VariantProps<typeof wizardVariants> {
  steps: FormWizardStep[];
  defaultStep?: number;
  onStepChange?: (step: number) => void;
  onComplete?: () => void | Promise<void>;
  onSaveDraft?: (data: WizardFormData) => void;
  loadDraft?: WizardFormData;
  completeLabel?: string;
  nextLabel?: string;
  backLabel?: string;
  saveDraftLabel?: string;
  showProgress?: boolean;
  allowStepNavigation?: boolean;
  isSubmitting?: boolean;
}

function FormWizard(
  {
    steps,
    defaultStep = 0,
    onStepChange,
    onComplete,
    onSaveDraft,
    loadDraft,
    completeLabel = "Complete",
    nextLabel = "Next",
    backLabel = "Back",
    saveDraftLabel = "Save Draft",
    showProgress = true,
    allowStepNavigation = true,
    isSubmitting = false,
    size,
    className,
    ...props
  }: FormWizardProps,
  ref: React.ForwardedRef<HTMLDivElement>
) {
  const [currentStep, setCurrentStep] = React.useState(
    loadDraft?.currentStep ?? defaultStep
  );
  const [isValidating, setIsValidating] = React.useState(false);
  const [stepErrors, setStepErrors] = React.useState<Record<string, string>>({});

  const totalSteps = steps.length;
  const progress = ((currentStep + 1) / totalSteps) * 100;
  const activeStep = steps[currentStep];
  const isFirstStep = currentStep === 0;
  const isLastStep = currentStep === totalSteps - 1;

  const goToStep = React.useCallback(
    (step: number) => {
      if (step >= 0 && step < totalSteps) {
        setCurrentStep(step);
        setStepErrors({});
        onStepChange?.(step);
      }
    },
    [totalSteps, onStepChange]
  );

  const validateCurrentStep = React.useCallback(async (): Promise<boolean> => {
    if (!activeStep?.validate) return true;

    setIsValidating(true);
    try {
      const isValid = await activeStep.validate();
      if (!isValid) {
        setStepErrors({ [activeStep.id]: "Validation failed" });
      }
      return isValid;
    } catch (error) {
      setStepErrors({
        [activeStep.id]: error instanceof Error ? error.message : "Validation failed",
      });
      return false;
    } finally {
      setIsValidating(false);
    }
  }, [activeStep]);

  const handleNext = React.useCallback(async () => {
    const isValid = await validateCurrentStep();
    if (!isValid) return;

    if (isLastStep) {
      await onComplete?.();
    } else {
      goToStep(currentStep + 1);
    }
  }, [validateCurrentStep, isLastStep, onComplete, currentStep, goToStep]);

  const handleBack = React.useCallback(() => {
    if (!isFirstStep) {
      goToStep(currentStep - 1);
    }
  }, [isFirstStep, currentStep, goToStep]);

  const handleSaveDraft = React.useCallback(() => {
    const draftData: WizardFormData = {
      currentStep,
      steps: steps.map((s) => s.id),
      data: {},
      savedAt: new Date().toISOString(),
    };
    onSaveDraft?.(draftData);
  }, [currentStep, steps, onSaveDraft]);

  const handleKeyDown = React.useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter" && !isLastStep) {
        e.preventDefault();
        handleNext();
      }
    },
    [handleNext, isLastStep]
  );

  return (
    <div
      ref={ref}
      className={cn(wizardVariants({ size }), className)}
      onKeyDown={handleKeyDown}
      {...props}
    >
      {showProgress && (
        <div className="space-y-2">
          <Progress value={progress} className="h-2" />
          <p className="text-sm text-muted-foreground text-right">
            Step {currentStep + 1} of {totalSteps}
          </p>
        </div>
      )}

      <nav aria-label="Wizard steps">
        <ol role="list" className="flex items-center gap-2">
          {steps.map((step, index) => {
            const isCompleted = index < currentStep;
            const isCurrent = index === currentStep;
            const canNavigate = allowStepNavigation && index <= currentStep;

            return (
              <React.Fragment key={step.id}>
                <li className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => canNavigate && goToStep(index)}
                    disabled={!canNavigate}
                    aria-current={isCurrent ? "step" : undefined}
                    className={cn(
                      "flex h-8 w-8 items-center justify-center rounded-full border-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                      isCompleted &&
                        "border-primary bg-primary text-primary-foreground",
                      isCurrent &&
                        "border-primary bg-background text-primary",
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
                      "h-0.5 w-8 rounded-full transition-colors",
                      index < currentStep ? "bg-primary" : "bg-muted"
                    )}
                  />
                )}
              </React.Fragment>
            );
          })}
        </ol>
      </nav>

      <div className="min-h-0 flex-1" role="tabpanel" aria-label={activeStep?.title}>
        {activeStep && (
          <div>
            <div className="mb-4">
              <h2 className="text-lg font-semibold">{activeStep.title}</h2>
              {activeStep.description && (
                <p className="mt-1 text-sm text-muted-foreground">
                  {activeStep.description}
                </p>
              )}
            </div>
            <div>{activeStep.content}</div>
            {stepErrors[activeStep.id] && (
              <p className="mt-2 text-sm text-destructive" role="alert">
                {stepErrors[activeStep.id]}
              </p>
            )}
          </div>
        )}
      </div>

      <div className="flex items-center justify-between border-t pt-4">
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={handleBack}
            disabled={isFirstStep || isSubmitting || isValidating}
          >
            {backLabel}
          </Button>
          {onSaveDraft && (
            <Button
              variant="ghost"
              onClick={handleSaveDraft}
              disabled={isSubmitting || isValidating}
            >
              {saveDraftLabel}
            </Button>
          )}
        </div>
        <Button
          onClick={handleNext}
          disabled={isSubmitting || isValidating}
        >
          {isSubmitting || isValidating
            ? "Processing..."
            : isLastStep
            ? completeLabel
            : nextLabel}
        </Button>
      </div>
    </div>
  );
}

FormWizard.displayName = "FormWizard";

export { FormWizard, wizardVariants };
