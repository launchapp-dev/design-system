import * as React from "react";
import { cn } from "@/lib/utils";

export interface TypingIndicatorProps
  extends React.HTMLAttributes<HTMLDivElement> {
  label?: string;
}

const TypingIndicator = React.forwardRef<HTMLDivElement, TypingIndicatorProps>(
  ({ label = "Typing…", className, ...props }, ref) => (
    <div
      ref={ref}
      role="status"
      aria-label={label}
      className={cn("flex items-center gap-2", className)}
      {...props}
    >
      <div className="flex items-center gap-1 rounded-2xl bg-muted px-3 py-2">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="h-2 w-2 rounded-full bg-muted-foreground"
            style={{
              animation: "typing-bounce 1.2s ease-in-out infinite",
              animationDelay: `${i * 0.2}s`,
            }}
            aria-hidden="true"
          />
        ))}
      </div>
      {label && <span className="text-xs text-muted-foreground">{label}</span>}
      <style>{`
        @keyframes typing-bounce {
          0%, 60%, 100% { transform: translateY(0); opacity: 0.4; }
          30% { transform: translateY(-4px); opacity: 1; }
        }
      `}</style>
    </div>
  ),
);
TypingIndicator.displayName = "TypingIndicator";

export { TypingIndicator };
