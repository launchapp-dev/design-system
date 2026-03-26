import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";

const alertVariants = cva(
  "relative w-full rounded-lg border px-4 py-3 text-sm [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground [&>svg~*]:pl-7",
  {
    variants: {
      variant: {
        default: "border-border bg-background text-foreground [&>svg]:text-foreground",
        info: "border-[hsl(var(--la-info)/0.5)] bg-[hsl(var(--la-info)/0.15)] text-[hsl(var(--la-info-foreground))] [&>svg]:text-[hsl(var(--la-info-foreground))]",
        destructive:
          "border-destructive/50 bg-destructive/15 text-destructive dark:border-destructive [&>svg]:text-destructive",
        warning:
          "border-[hsl(var(--la-warning)/0.5)] bg-[hsl(var(--la-warning)/0.15)] text-[hsl(var(--la-warning-foreground))] [&>svg]:text-[hsl(var(--la-warning-foreground))]",
        success:
          "border-[hsl(var(--la-success)/0.5)] bg-[hsl(var(--la-success)/0.15)] text-[hsl(var(--la-success-foreground))] [&>svg]:text-[hsl(var(--la-success-foreground))]",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface AlertProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof alertVariants> {}

function Alert({ className, variant, ref, ...props }: AlertProps & { ref?: React.Ref<HTMLDivElement> }) {
  return (
    <div
      ref={ref}
      role={variant === "destructive" || variant === "warning" ? "alert" : "status"}
      className={cn(alertVariants({ variant }), className)}
      {...props}
    />
  );
}
Alert.displayName = "Alert";

function AlertTitle({ className, ref, ...props }: React.HTMLAttributes<HTMLHeadingElement> & { ref?: React.Ref<HTMLParagraphElement> }) {
  return (
  <h5
    ref={ref}
    className={cn("mb-1 font-medium leading-none tracking-tight", className)}
    {...props}
  />
);
}
AlertTitle.displayName = "AlertTitle";

function AlertDescription({ className, ref, ...props }: React.HTMLAttributes<HTMLParagraphElement> & { ref?: React.Ref<HTMLParagraphElement> }) {
  return (
  <div
    ref={ref}
    className={cn("text-sm [&_p]:leading-relaxed", className)}
    {...props}
  />
);
}
AlertDescription.displayName = "AlertDescription";

export { Alert, AlertTitle, AlertDescription, alertVariants };
