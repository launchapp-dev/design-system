import type * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";

const textareaVariants = cva(
  "flex w-full rounded-md border bg-background text-foreground text-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      resize: {
        none: "resize-none",
        vertical: "resize-y",
        horizontal: "resize-x",
        both: "resize",
      },
      error: {
        true: "border-destructive focus-visible:ring-destructive",
        false: "border-input",
      },
    },
    defaultVariants: {
      resize: "vertical",
      error: false,
    },
  }
);

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    VariantProps<typeof textareaVariants> {
  error?: boolean;
}

function Textarea({ className, resize, error, rows = 3, ref, ...props }: TextareaProps & { ref?: React.Ref<HTMLTextAreaElement> }) {
    if (
      process.env.NODE_ENV !== "production" &&
      !props.id &&
      !props["aria-label"] &&
      !props["aria-labelledby"]
    ) {
      console.warn(
        "Textarea: missing label association. Provide `id` paired with a <Label htmlFor>, or pass `aria-label`/`aria-labelledby`."
      );
    }
    return (
      <textarea
        ref={ref}
        rows={rows}
        className={cn(textareaVariants({ resize, error }), "px-4 py-4 md:px-3 md:py-2 text-base md:text-sm", className)}
        aria-invalid={error || undefined}
        {...props}
      />
    );
  }

Textarea.displayName = "Textarea";

export type TextareaVariants = VariantProps<typeof textareaVariants>;

export { Textarea };
