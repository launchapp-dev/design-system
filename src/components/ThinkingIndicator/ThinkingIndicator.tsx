import * as React from "react";
import { cn } from "../../lib/utils";
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "../Collapsible";

export interface ReasoningStep {
  label: string;
  status?: "pending" | "active" | "done";
}

export interface ThinkingIndicatorProps {
  isThinking?: boolean;
  label?: string;
  steps?: ReasoningStep[];
  className?: string;
}

function BrainIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z" />
      <path d="M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z" />
      <path d="M15 13a4.5 4.5 0 0 1-3-4 4.5 4.5 0 0 1-3 4" />
      <path d="M17.599 6.5a3 3 0 0 0 .399-1.375" />
      <path d="M6.003 5.125A3 3 0 0 0 6.401 6.5" />
      <path d="M3.477 10.896a4 4 0 0 1 .585-.396" />
      <path d="M19.938 10.5a4 4 0 0 1 .585.396" />
      <path d="M6 18a4 4 0 0 1-1.967-.516" />
      <path d="M19.967 17.484A4 4 0 0 1 18 18" />
    </svg>
  );
}

function ChevronDownIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

function ThinkingIndicator({
  isThinking = true,
  label = "Thinking",
  steps = [],
  className,
}: ThinkingIndicatorProps) {
  const [stepsOpen, setStepsOpen] = React.useState(false);

  return (
    <div className={cn("inline-flex flex-col gap-2", className)}>
      <div className="flex items-center gap-2">
        <div
          className={cn(
            "rounded-full p-1.5 transition-colors",
            isThinking
              ? "animate-pulse text-[hsl(var(--la-primary))] bg-[hsl(var(--la-primary)/0.1)]"
              : "text-muted-foreground"
          )}
        >
          <BrainIcon />
        </div>
        <span className="text-sm text-muted-foreground">{label}</span>
        {isThinking && (
          <div className="flex items-center gap-0.5">
            <span
              className="h-1.5 w-1.5 rounded-full bg-[hsl(var(--la-primary))] animate-bounce"
              style={{ animationDelay: "0ms" }}
            />
            <span
              className="h-1.5 w-1.5 rounded-full bg-[hsl(var(--la-primary))] animate-bounce"
              style={{ animationDelay: "150ms" }}
            />
            <span
              className="h-1.5 w-1.5 rounded-full bg-[hsl(var(--la-primary))] animate-bounce"
              style={{ animationDelay: "300ms" }}
            />
          </div>
        )}
      </div>
      {steps.length > 0 && (
        <Collapsible open={stepsOpen} onOpenChange={setStepsOpen}>
          <CollapsibleTrigger className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors pl-1">
            <ChevronDownIcon
              className={cn(
                "transition-transform duration-200",
                stepsOpen && "rotate-180"
              )}
            />
            {stepsOpen ? "Hide" : "Show"} reasoning
          </CollapsibleTrigger>
          <CollapsibleContent>
            <ol className="mt-2 flex flex-col gap-1 pl-2 border-l border-border ml-1">
              {steps.map((step, index) => (
                <li
                  key={index}
                  className={cn(
                    "flex items-center gap-2 text-xs py-0.5 transition-colors",
                    step.status === "done" && "text-muted-foreground",
                    step.status === "active" && "text-foreground font-medium",
                    step.status === "pending" && "text-muted-foreground/60"
                  )}
                >
                  {step.status === "done" ? (
                    <CheckIcon className="text-[hsl(var(--la-primary))] shrink-0" />
                  ) : step.status === "active" ? (
                    <span className="h-2 w-2 rounded-full bg-[hsl(var(--la-primary))] animate-pulse shrink-0" />
                  ) : (
                    <span className="h-2 w-2 rounded-full border border-border shrink-0" />
                  )}
                  {step.label}
                </li>
              ))}
            </ol>
          </CollapsibleContent>
        </Collapsible>
      )}
    </div>
  );
}

ThinkingIndicator.displayName = "ThinkingIndicator";

export { ThinkingIndicator };
