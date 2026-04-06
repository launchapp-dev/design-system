import * as React from "react";
import { Button } from "@/components/Button";
import { Card, CardContent } from "@/components/Card";
import { Progress } from "@/components/Progress";
import { cn } from "@/lib/utils";

export interface WelcomeWizardStep {
  id: string;
  title: string;
  description: string;
  content: React.ReactNode;
}

export interface WelcomeWizardProps extends React.HTMLAttributes<HTMLDivElement> {
  steps: WelcomeWizardStep[];
  initialStep?: number;
  onComplete?: (finalStepId: string) => void;
  onSkip?: () => void;
}

const WelcomeWizard = React.forwardRef<HTMLDivElement, WelcomeWizardProps>(
  (
    {
      steps,
      initialStep = 0,
      onComplete,
      onSkip,
      className,
      ...props
    },
    ref,
  ) => {
    const [currentStep, setCurrentStep] = React.useState(initialStep);
    const step = steps[currentStep];
    const progress = ((currentStep + 1) / steps.length) * 100;
    const isLast = currentStep === steps.length - 1;

    const handleNext = () => {
      if (isLast) {
        onComplete?.(step.id);
      } else {
        setCurrentStep((s) => s + 1);
      }
    };

    const handleBack = () => {
      if (currentStep > 0) {
        setCurrentStep((s) => s - 1);
      }
    };

    return (
      <div ref={ref} className={cn("flex min-h-screen flex-col", className)} {...props}>
        <div className="border-b border-border bg-background px-6 py-4">
          <div className="mx-auto max-w-2xl space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span className="font-medium text-foreground">{step.title}</span>
              <span className="text-muted-foreground">
                Step {currentStep + 1} of {steps.length}
              </span>
            </div>
            <Progress value={progress} aria-label={`Step ${currentStep + 1} of ${steps.length}`} />
          </div>
        </div>

        <div className="flex flex-1 items-center justify-center bg-muted/20 px-6 py-12">
          <div className="mx-auto w-full max-w-2xl">
            <Card className="shadow-sm">
              <CardContent className="pt-8 pb-8">
                <div className="mb-8 text-center">
                  <h1 className="text-2xl font-bold tracking-tight">{step.title}</h1>
                  <p className="mt-2 text-muted-foreground">{step.description}</p>
                </div>
                <div>{step.content}</div>
              </CardContent>
            </Card>

            <div className="mt-6 flex items-center justify-between">
              <Button
                variant="ghost"
                size="sm"
                onClick={onSkip ?? (currentStep > 0 ? handleBack : undefined)}
              >
                {currentStep > 0 ? "Back" : "Skip all"}
              </Button>
              <Button size="sm" onClick={handleNext}>
                {isLast ? "Get started" : "Continue"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  },
);
WelcomeWizard.displayName = "WelcomeWizard";

export { WelcomeWizard };