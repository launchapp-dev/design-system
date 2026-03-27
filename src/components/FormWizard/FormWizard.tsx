import * as React from "react";
import { cn } from "../../lib/utils";

type FormWizardContextType = {
  currentStep: number;
  totalSteps: number;
  onNext: () => void;
  onPrevious: () => void;
  setCurrentStep: (step: number) => void;
  canNext: boolean;
  canPrevious: boolean;
  isLoading?: boolean;
};

const FormWizardContext = React.createContext<FormWizardContextType | undefined>(
  undefined
);

function useFormWizard() {
  const context = React.useContext(FormWizardContext);
  if (!context) {
    throw new Error("useFormWizard must be used within FormWizard");
  }
  return context;
}

interface FormWizardProps extends React.HTMLAttributes<HTMLDivElement> {
  initialStep?: number;
  children: React.ReactNode;
  onStepChange?: (step: number) => void;
}

function FormWizard({
  initialStep = 0,
  children,
  onStepChange,
  className,
  ref,
  ...props
}: FormWizardProps & { ref?: React.Ref<HTMLDivElement> }) {
  const childArray = React.Children.toArray(children).filter(
    (child) => React.isValidElement(child) && child.type === FormWizardStep
  );
  const totalSteps = childArray.length;
  const [currentStep, setCurrentStep] = React.useState(
    Math.max(0, Math.min(initialStep, totalSteps - 1))
  );

  const handleSetStep = React.useCallback(
    (step: number) => {
      const newStep = Math.max(0, Math.min(step, totalSteps - 1));
      setCurrentStep(newStep);
      onStepChange?.(newStep);
    },
    [totalSteps, onStepChange]
  );

  const handleNext = React.useCallback(() => {
    if (currentStep < totalSteps - 1) {
      handleSetStep(currentStep + 1);
    }
  }, [currentStep, totalSteps, handleSetStep]);

  const handlePrevious = React.useCallback(() => {
    if (currentStep > 0) {
      handleSetStep(currentStep - 1);
    }
  }, [currentStep, handleSetStep]);

  const value: FormWizardContextType = {
    currentStep,
    totalSteps,
    onNext: handleNext,
    onPrevious: handlePrevious,
    setCurrentStep: handleSetStep,
    canNext: currentStep < totalSteps - 1,
    canPrevious: currentStep > 0,
  };

  return (
    <FormWizardContext.Provider value={value}>
      <div ref={ref} className={cn("flex flex-col gap-6", className)} {...props}>
        {children}
      </div>
    </FormWizardContext.Provider>
  );
}

FormWizard.displayName = "FormWizard";

interface FormWizardProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  showLabels?: boolean;
  getStepLabel?: (step: number) => string;
}

function FormWizardProgress({
  showLabels = true,
  getStepLabel,
  className,
  ref,
  ...props
}: FormWizardProgressProps & { ref?: React.Ref<HTMLDivElement> }) {
  const { currentStep, totalSteps } = useFormWizard();

  return (
    <div
      ref={ref}
      className={cn("flex items-center gap-2", className)}
      aria-label={`Step ${currentStep + 1} of ${totalSteps}`}
      {...props}
    >
      {Array.from({ length: totalSteps }).map((_, i) => (
        <div key={i} className="flex flex-col items-center flex-1">
          <div className="flex items-center gap-2 w-full">
            <button
              type="button"
              onClick={() => {}}
              aria-label={`Step ${i + 1}${showLabels ? `: ${getStepLabel?.(i) ?? `Step ${i + 1}`}` : ""}`}
              aria-current={currentStep === i}
              className={cn(
                "flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-medium transition-colors",
                currentStep === i
                  ? "bg-[hsl(var(--la-primary))] text-[hsl(var(--la-primary-foreground))]"
                  : currentStep > i
                    ? "bg-[hsl(var(--la-primary)/0.2)] text-[hsl(var(--la-primary))]"
                    : "bg-[hsl(var(--la-muted))] text-[hsl(var(--la-muted-foreground))]"
              )}
            >
              {currentStep > i ? (
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              ) : (
                i + 1
              )}
            </button>
            {i < totalSteps - 1 && (
              <div
                className={cn(
                  "flex-1 h-1 rounded-full transition-colors",
                  currentStep > i
                    ? "bg-[hsl(var(--la-primary))]"
                    : "bg-[hsl(var(--la-muted))]"
                )}
              />
            )}
          </div>
          {showLabels && (
            <span className="text-xs text-[hsl(var(--la-muted-foreground))] mt-1">
              {getStepLabel?.(i) ?? `Step ${i + 1}`}
            </span>
          )}
        </div>
      ))}
    </div>
  );
}

FormWizardProgress.displayName = "FormWizardProgress";

interface FormWizardNavProps extends React.HTMLAttributes<HTMLDivElement> {
  onNext?: () => Promise<boolean> | boolean;
  onPrevious?: () => void;
  nextLabel?: string;
  previousLabel?: string;
  submitLabel?: string;
  isSubmitting?: boolean;
}

function FormWizardNav({
  onNext,
  onPrevious,
  nextLabel = "Next",
  previousLabel = "Previous",
  submitLabel = "Submit",
  isSubmitting = false,
  className,
  ref,
  ...props
}: FormWizardNavProps & { ref?: React.Ref<HTMLDivElement> }) {
  const { currentStep, totalSteps, onNext: wizardNext, onPrevious: wizardPrevious, canNext, canPrevious } = useFormWizard();
  const [isLoading, setIsLoading] = React.useState(false);
  const isLastStep = currentStep === totalSteps - 1;

  const handleNext = async () => {
    setIsLoading(true);
    try {
      const canProceed = onNext ? await onNext() : true;
      if (canProceed !== false) {
        wizardNext();
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      ref={ref}
      className={cn("flex gap-2 justify-between", className)}
      {...props}
    >
      <button
        type="button"
        onClick={() => {
          onPrevious?.();
          wizardPrevious();
        }}
        disabled={!canPrevious || isLoading || isSubmitting}
        className="inline-flex items-center justify-center whitespace-nowrap rounded-[--la-radius] font-medium ring-offset-[hsl(var(--la-background))] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--la-ring))] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-[hsl(var(--la-input))] bg-[hsl(var(--la-background))] hover:bg-[hsl(var(--la-accent))] hover:text-[hsl(var(--la-accent-foreground))] h-11 md:h-9 rounded-[--la-radius] px-3 text-sm min-h-[44px] md:min-h-0"
      >
        {previousLabel}
      </button>
      <button
        type={isLastStep ? "submit" : "button"}
        onClick={!isLastStep ? handleNext : undefined}
        disabled={!canNext && !isLastStep ? true : isLoading || isSubmitting}
        className="inline-flex items-center justify-center whitespace-nowrap rounded-[--la-radius] font-medium ring-offset-[hsl(var(--la-background))] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--la-ring))] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-[hsl(var(--la-primary))] text-[hsl(var(--la-primary-foreground))] hover:bg-[hsl(var(--la-primary)/0.9)] h-11 md:h-9 rounded-[--la-radius] px-3 text-sm min-h-[44px] md:min-h-0"
      >
        {isLoading || isSubmitting ? "Loading..." : isLastStep ? submitLabel : nextLabel}
      </button>
    </div>
  );
}

FormWizardNav.displayName = "FormWizardNav";

interface FormWizardContentProps extends React.HTMLAttributes<HTMLDivElement> {
  stepIndex: number;
}

function FormWizardContent({
  stepIndex,
  className,
  children,
  ref,
  ...props
}: FormWizardContentProps & { ref?: React.Ref<HTMLDivElement> }) {
  const { currentStep } = useFormWizard();

  if (currentStep !== stepIndex) {
    return null;
  }

  return (
    <div ref={ref} className={cn("space-y-4", className)} {...props}>
      {children}
    </div>
  );
}

FormWizardContent.displayName = "FormWizardContent";

export {
  FormWizard,
  FormWizardProgress,
  FormWizardNav,
  FormWizardContent,
  useFormWizard,
};
