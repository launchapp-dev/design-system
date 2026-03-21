import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";

const multiStepWizardVariants = cva("w-full", {
  variants: {
    variant: {
      default: "",
      card: "rounded-lg border border-border bg-card p-6 shadow-sm",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

export interface WizardStep {
  id: string;
  title: string;
  description?: string;
  content: React.ReactNode;
  validate?: () => Promise<boolean> | boolean;
}

export interface MultiStepWizardProps
  extends VariantProps<typeof multiStepWizardVariants> {
  steps: WizardStep[];
  onComplete: () => void;
  onSaveDraft?: (currentStep: number) => void;
  onStepChange?: (step: number) => void;
  initialStep?: number;
  className?: string;
  completeLabel?: string;
  nextLabel?: string;
  prevLabel?: string;
  saveDraftLabel?: string;
}

function MultiStepWizard({
  steps,
  onComplete,
  onSaveDraft,
  onStepChange,
  initialStep = 0,
  className,
  variant,
  completeLabel = "Complete",
  nextLabel = "Next",
  prevLabel = "Back",
  saveDraftLabel = "Save Draft",
}: MultiStepWizardProps) {
  const [currentStep, setCurrentStep] = React.useState(initialStep);
  const [validating, setValidating] = React.useState(false);

  const step = steps[currentStep];
  const isFirst = currentStep === 0;
  const isLast = currentStep === steps.length - 1;
  const progress = steps.length > 0 ? ((currentStep + 1) / steps.length) * 100 : 0;

  const handleNext = async () => {
    if (step?.validate) {
      setValidating(true);
      try {
        const valid = await step.validate();
        if (!valid) return;
      } finally {
        setValidating(false);
      }
    }
    if (isLast) {
      onComplete();
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

  return (
    <div className={cn(multiStepWizardVariants({ variant }), className)}>
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-foreground">
            Step {currentStep + 1} of {steps.length}
          </span>
          {step?.title && (
            <span className="text-sm text-muted-foreground">{step.title}</span>
          )}
        </div>
        <div
          className="w-full bg-muted rounded-full h-2 overflow-hidden"
          role="progressbar"
          aria-valuenow={Math.round(progress)}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label="Wizard progress"
        >
          <div
            className="bg-primary rounded-full h-2 transition-all duration-300 ease-in-out"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="flex mt-3 gap-1.5">
          {steps.map((s, i) => (
            <div
              key={s.id}
              className={cn(
                "flex-1 h-1 rounded-full transition-colors duration-200",
                i <= currentStep ? "bg-primary" : "bg-muted"
              )}
              aria-hidden="true"
            />
          ))}
        </div>
      </div>

      {(step?.title || step?.description) && (
        <div className="mb-6">
          {step.title && (
            <h3 className="text-lg font-semibold text-foreground">{step.title}</h3>
          )}
          {step.description && (
            <p className="text-sm text-muted-foreground mt-1">{step.description}</p>
          )}
        </div>
      )}

      <div className="mb-6">{step?.content}</div>

      <div className="flex items-center justify-between gap-3">
        <div className="flex gap-2">
          <button
            type="button"
            onClick={handlePrev}
            disabled={isFirst}
            className={cn(
              "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors",
              "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
              "h-10 px-4 py-2",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
              "disabled:pointer-events-none disabled:opacity-50"
            )}
          >
            {prevLabel}
          </button>
          {onSaveDraft && (
            <button
              type="button"
              onClick={() => onSaveDraft(currentStep)}
              className={cn(
                "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors",
                "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
                "h-10 px-4 py-2",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              )}
            >
              {saveDraftLabel}
            </button>
          )}
        </div>
        <button
          type="button"
          onClick={handleNext}
          disabled={validating}
          className={cn(
            "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors",
            "bg-primary text-primary-foreground hover:bg-primary/90",
            "h-10 px-4 py-2",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
            "disabled:pointer-events-none disabled:opacity-50"
          )}
        >
          {validating ? "Validating…" : isLast ? completeLabel : nextLabel}
        </button>
      </div>
    </div>
  );
}

MultiStepWizard.displayName = "MultiStepWizard";

export { MultiStepWizard };
