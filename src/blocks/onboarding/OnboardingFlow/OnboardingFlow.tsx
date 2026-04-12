import type * as React from "react";
import { Button } from "@/components/Button";
import { Card, CardContent } from "@/components/Card";
import { Progress } from "@/components/Progress";
import { cn } from "@/lib/utils";

export interface OnboardingStep {
  id: string;
  title: string;
  description?: string;
  content: React.ReactNode;
  icon?: React.ReactNode;
}

export interface OnboardingFlowProps extends React.HTMLAttributes<HTMLDivElement> {
  steps: OnboardingStep[];
  currentStep?: number;
  onStepChange?: (step: number) => void;
  onComplete?: () => void;
  nextLabel?: string;
  backLabel?: string;
  completeLabel?: string;
  showProgress?: boolean;
  allowSkip?: boolean;
  onSkip?: () => void;
}

function OnboardingFlow({
  steps,
  currentStep = 0,
  onStepChange,
  onComplete,
  nextLabel = "Continue",
  backLabel = "Back",
  completeLabel = "Get Started",
  showProgress = true,
  allowSkip = false,
  onSkip,
  className,
  ...props
}: OnboardingFlowProps) {
  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      const next = currentStep + 1;
      onStepChange?.(next);
    } else {
      onComplete?.();
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      onStepChange?.(currentStep - 1);
    }
  };

  const step = steps[currentStep];
  const progressPct = ((currentStep + 1) / steps.length) * 100;

  return (
    <div ref={null} className={cn("max-w-xl mx-auto", className)} {...props}>
      {showProgress && (
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">
              Step {currentStep + 1} of {steps.length}
            </span>
            <span className="text-sm text-muted-foreground">{step.title}</span>
          </div>
          <Progress value={progressPct} className="h-1.5" />
        </div>
      )}

      <div className="flex items-center gap-4 mb-6">
        {step.icon && (
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-accent text-accent-foreground">
            {step.icon}
          </div>
        )}
        <div>
          <h2 className="text-xl font-bold tracking-tight">{step.title}</h2>
          {step.description && (
            <p className="text-sm text-muted-foreground mt-1">{step.description}</p>
          )}
        </div>
      </div>

      <Card className="mb-8">
        <CardContent className="pt-6">
          {step.content}
        </CardContent>
      </Card>

      <div className="flex items-center justify-between">
        <Button
          variant="ghost"
          onClick={handleBack}
          disabled={currentStep === 0}
        >
          {backLabel}
        </Button>
        <div className="flex gap-2">
          {allowSkip && onSkip && (
            <Button variant="ghost" onClick={onSkip}>
              Skip for now
            </Button>
          )}
          <Button onClick={handleNext}>
            {currentStep === steps.length - 1 ? completeLabel : nextLabel}
          </Button>
        </div>
      </div>
    </div>
  );
}

OnboardingFlow.displayName = "OnboardingFlow";

export { OnboardingFlow };