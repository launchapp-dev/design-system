import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/Button";
import { Card, CardContent } from "@/components/Card";
import { Progress } from "@/components/Progress";
import { Badge } from "@/components/Badge";

export interface GoalOption {
  id: string;
  label: string;
  description: string;
  icon?: React.ReactNode;
}

export interface GoalStep {
  id: string;
  title: string;
  description: string;
  options: GoalOption[];
  multiSelect?: boolean;
}

export interface GoalSetupWizardProps extends React.HTMLAttributes<HTMLDivElement> {
  steps: GoalStep[];
  onComplete: (selections: Record<string, string[]>) => void;
  onCancel?: () => void;
  continueLabel?: string;
  backLabel?: string;
  finishLabel?: string;
  skipOptional?: boolean;
}

function GoalSetupWizard({
  steps,
  onComplete,
  onCancel,
  continueLabel = "Continue",
  backLabel = "Back",
  finishLabel = "Finish Setup",
  skipOptional = false,
  className,
  ...props
}: GoalSetupWizardProps) {
  const [currentStep, setCurrentStep] = React.useState(0);
  const [selections, setSelections] = React.useState<Record<string, string[]>>({});

  const step = steps[currentStep];
  const isFirst = currentStep === 0;
  const isLast = currentStep === steps.length - 1;
  const progress = ((currentStep + 1) / steps.length) * 100;

  const currentSelections = selections[step.id] || [];
  const canContinue =
    step.multiSelect || currentSelections.length > 0;

  const handleToggle = (optionId: string) => {
    setSelections((prev) => {
      const current = prev[step.id] || [];
      if (step.multiSelect) {
        if (current.includes(optionId)) {
          return { ...prev, [step.id]: current.filter((id) => id !== optionId) };
        }
        return { ...prev, [step.id]: [...current, optionId] };
      }
      return { ...prev, [step.id]: [optionId] };
    });
  };

  const handleNext = () => {
    if (isLast) {
      onComplete(selections);
    } else {
      setCurrentStep((s) => s + 1);
    }
  };

  const handleBack = () => {
    setCurrentStep((s) => Math.max(0, s - 1));
  };

  return (
    <div className={cn("w-full max-w-2xl mx-auto", className)} {...props}>
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-muted-foreground">
            Step {currentStep + 1} of {steps.length}
          </span>
          {step.description && (
            <span className="text-xs text-muted-foreground">{step.description}</span>
          )}
        </div>
        <Progress value={progress} aria-label={`Step ${currentStep + 1} of ${steps.length}`} />
      </div>

      <Card className="mb-6">
        <CardContent className="pt-6">
          <h2 className="text-xl font-semibold mb-6">{step.title}</h2>
          <div
            className={cn(
              "grid gap-3",
              step.options.length <= 3
                ? "grid-cols-1 sm:grid-cols-3"
                : "grid-cols-1 sm:grid-cols-2",
            )}
          >
            {step.options.map((option) => {
              const isSelected = currentSelections.includes(option.id);
              return (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => handleToggle(option.id)}
                  className={cn(
                    "flex items-start gap-3 p-4 rounded-lg border text-left transition-all",
                    isSelected
                      ? "border-primary bg-primary/5 ring-1 ring-primary"
                      : "border-border bg-background hover:border-primary/50 hover:bg-muted/50",
                  )}
                >
                  {option.icon && (
                    <span className="flex-shrink-0 mt-0.5">{option.icon}</span>
                  )}
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                      <span className="font-medium text-sm">{option.label}</span>
                      {isSelected && (
                        <Badge variant="default" className="h-5 shrink-0">
                          Selected
                        </Badge>
                      )}
                    </div>
                    {option.description && (
                      <p className="mt-1 text-xs text-muted-foreground line-clamp-2">
                        {option.description}
                      </p>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
          {step.multiSelect && (
            <p className="mt-4 text-xs text-muted-foreground">
              Select all that apply. You can change these later.
            </p>
          )}
        </CardContent>
      </Card>

      <div className="flex items-center justify-between">
        <div>
          {!isFirst && (
            <Button variant="outline" onClick={handleBack}>
              {backLabel}
            </Button>
          )}
        </div>
        <div className="flex gap-3">
          {onCancel && currentStep === 0 && (
            <Button variant="ghost" onClick={onCancel}>
              Skip for now
            </Button>
          )}
          <Button onClick={handleNext} disabled={!canContinue && !skipOptional}>
            {isLast ? finishLabel : continueLabel}
          </Button>
        </div>
      </div>
    </div>
  );
}

GoalSetupWizard.displayName = "GoalSetupWizard";

export { GoalSetupWizard };
