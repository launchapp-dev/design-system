import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";

const inputVariants = cva(
  "flex w-full rounded-md border bg-background text-foreground transition-colors file:border-0 file:bg-transparent file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      size: {
        sm: "h-8 px-3 py-1 text-xs",
        md: "h-10 px-3 py-2 text-sm",
        lg: "h-12 px-4 py-3 text-base",
      },
      error: {
        true: "border-destructive focus-visible:ring-destructive",
        false: "border-input",
      },
    },
    defaultVariants: {
      size: "md",
      error: false,
    },
  }
);

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size">,
    VariantProps<typeof inputVariants> {
  error?: boolean;
}

function Input({ className, size, error, ref, ...props }: InputProps & { ref?: React.Ref<HTMLInputElement> }) {
    if (
      process.env.NODE_ENV !== "production" &&
      !props.id &&
      !props["aria-label"] &&
      !props["aria-labelledby"]
    ) {
      console.warn(
        "Input: missing label association. Provide `id` paired with a <Label htmlFor>, or pass `aria-label`/`aria-labelledby`."
      );
    }
    return (
      <input
        className={cn(inputVariants({ size, error }), className)}
        ref={ref}
        aria-invalid={error || undefined}
        {...props}
      />
    );
  }

Input.displayName = "Input";

export { Input };
