import * as React from "react";
import { Button } from "@/components/Button";
import { cn } from "@/lib/utils";

export interface SetupStep {
  id: string;
  label: string;
  icon?: string;
  completed: boolean;
  optional?: boolean;
}

export interface SetupWizardProps extends React.HTMLAttributes<HTMLDivElement> {
  steps: SetupStep[];
  currentStepId?: string;
  onStepClick?: (stepId: string) => void;
  onComplete?: () => void;
}

const SetupWizard = React.forwardRef<HTMLDivElement, SetupWizardProps>(
  ({ steps, currentStepId, onStepClick, onComplete, className, ...props }, ref) => {
    const completedCount = steps.filter((s) => s.completed).length;
    const progress = (completedCount / steps.length) * 100;
    const activeStep = currentStepId ?? steps.find((s) => !s.completed)?.id ?? steps[0]?.id;
    const allDone = completedCount === steps.length;

    return (
      <div ref={ref} className={cn("min-h-screen bg-muted/20 px-6 py-12", className)} {...props}>
        <div className="mx-auto max-w-xl">
          <div className="mb-8 text-center">
            <h1 className="text-2xl font-bold">Set up your workspace</h1>
            <p className="mt-2 text-muted-foreground">
              Complete {completedCount} of {steps.length} steps to get started.
            </p>
          </div>

          <div className="mb-4 rounded-full bg-muted p-1">
            <div className="h-1.5 rounded-full bg-primary transition-all" style={{ width: `${progress}%` }} />
          </div>

          <div className="mb-8 space-y-2">
            {steps.map((step) => {
              const isActive = step.id === activeStep;
              return (
                <button
                  key={step.id}
                  type="button"
                  onClick={() => onStepClick?.(step.id)}
                  className={cn(
                    "flex w-full items-center gap-3 rounded-lg border p-4 text-left transition-colors",
                    isActive
                      ? "border-primary bg-primary/5"
                      : "border-border bg-background hover:border-muted-foreground/30",
                    step.completed && "opacity-70",
                  )}
                >
                  <span
                    className={cn(
                      "flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-medium",
                      step.completed
                        ? "bg-primary text-primary-foreground"
                        : isActive
                          ? "bg-primary/10 text-primary"
                          : "bg-muted text-muted-foreground",
                    )}
                  >
                    {step.completed ? "✓" : step.icon ?? steps.indexOf(step) + 1}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className={cn("text-sm font-medium", step.completed && "line-through text-muted-foreground")}>
                      {step.label}
                    </p>
                  </div>
                  {step.optional && !step.completed && (
                    <span className="rounded-full bg-muted px-2 py-0.5 text-xs text-muted-foreground">Optional</span>
                  )}
                  {step.completed && (
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-green-100 text-green-600 text-xs">✓</span>
                  )}
                </button>
              );
            })}
          </div>

          {allDone && (
            <div className="text-center">
              <Button size="lg" onClick={onComplete}>
                Launch workspace
              </Button>
            </div>
          )}
        </div>
      </div>
    );
  },
);
SetupWizard.displayName = "SetupWizard";

export { SetupWizard };