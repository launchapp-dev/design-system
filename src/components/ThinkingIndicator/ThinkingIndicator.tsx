import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const thinkingIndicatorVariants = cva(
  "flex items-center gap-2",
  {
    variants: {
      variant: {
        dots: "",
        pulse: "",
        chain: "",
      },
      size: {
        sm: "text-xs",
        md: "text-sm",
        lg: "text-base",
      },
    },
    defaultVariants: {
      variant: "dots",
      size: "md",
    },
  }
);

export interface ThinkingIndicatorProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof thinkingIndicatorVariants> {
  label?: string;
  steps?: ThinkingStep[];
  currentStep?: number;
}

export interface ThinkingStep {
  id: string;
  label: string;
  status: "pending" | "active" | "completed";
}

function ThinkingIndicator({
  variant = "dots",
  size = "md",
  label = "Thinking…",
  steps,
  currentStep = 0,
  className,
  ...props
}: ThinkingIndicatorProps & { ref?: React.Ref<HTMLDivElement> }) {
  if (variant === "chain" && steps && steps.length > 0) {
    return (
      <div
        role="status"
        aria-label={label}
        className={cn(thinkingIndicatorVariants({ variant, size }), "flex-col items-start gap-2", className)}
        {...props}
      >
        <div className="flex items-center gap-2">
          <BrainPulseIcon />
          <span className="text-muted-foreground">{label}</span>
        </div>
        <ol className="flex flex-col gap-1 pl-6">
          {steps.map((step, index) => (
            <li
              key={step.id}
              className={cn(
                "flex items-center gap-2 text-xs transition-colors",
                step.status === "completed" && "text-muted-foreground",
                step.status === "active" && "text-foreground font-medium",
                step.status === "pending" && "text-muted-foreground/50"
              )}
            >
              {step.status === "completed" ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                  className="text-primary"
                >
                  <path d="M20 6 9 17l-5-5" />
                </svg>
              ) : step.status === "active" ? (
                <span className="relative flex h-3 w-3">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
                  <span className="relative inline-flex h-3 w-3 rounded-full bg-primary" />
                </span>
              ) : (
                <span className="h-3 w-3 rounded-full border border-muted-foreground/30" />
              )}
              <span>{step.label}</span>
            </li>
          ))}
        </ol>
      </div>
    );
  }

  if (variant === "pulse") {
    return (
      <div
        role="status"
        aria-label={label}
        className={cn(thinkingIndicatorVariants({ variant, size }), className)}
        {...props}
      >
        <BrainPulseIcon />
        <span className="text-muted-foreground">{label}</span>
      </div>
    );
  }

  return (
    <div
      role="status"
      aria-label={label}
      className={cn(thinkingIndicatorVariants({ variant, size }), className)}
      {...props}
    >
      <div className="flex items-center gap-1 rounded-2xl bg-muted px-3 py-2">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="h-2 w-2 rounded-full bg-muted-foreground"
            style={{
              animation: "thinking-bounce 1.2s ease-in-out infinite",
              animationDelay: `${i * 0.2}s`,
            }}
            aria-hidden="true"
          />
        ))}
      </div>
      {label && <span className="text-xs text-muted-foreground">{label}</span>}
      <style>{`
        @keyframes thinking-bounce {
          0%, 60%, 100% { transform: translateY(0); opacity: 0.4; }
          30% { transform: translateY(-4px); opacity: 1; }
        }
      `}</style>
    </div>
  );
}
ThinkingIndicator.displayName = "ThinkingIndicator";

function BrainPulseIcon({ className }: { className?: string }) {
  return (
    <span className={cn("relative flex h-5 w-5", className)}>
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
        className="animate-brain-pulse text-primary"
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
      <style>{`
        @keyframes brain-pulse {
          0%, 100% { opacity: 0.6; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.05); }
        }
        .animate-brain-pulse {
          animation: brain-pulse 2s ease-in-out infinite;
        }
      `}</style>
    </span>
  );
}

export { ThinkingIndicator, thinkingIndicatorVariants };
