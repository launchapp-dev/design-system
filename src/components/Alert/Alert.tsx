import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";

const alertVariants = cva(
  "relative w-full rounded-lg border px-4 py-3 text-sm [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground [&>svg~*]:pl-7",
  {
    variants: {
      variant: {
        default: "border-border bg-background text-foreground [&>svg]:text-foreground",
        info: "border-blue-500/50 bg-blue-500/15 text-blue-700 dark:border-blue-500 dark:text-blue-400 [&>svg]:text-blue-700 dark:[&>svg]:text-blue-400",
        destructive:
          "border-destructive/50 bg-destructive/15 text-destructive dark:border-destructive [&>svg]:text-destructive",
        warning:
          "border-amber-500/50 bg-amber-500/15 text-amber-700 dark:border-amber-500 dark:text-amber-400 [&>svg]:text-amber-700 dark:[&>svg]:text-amber-400",
        success:
          "border-green-500/50 bg-green-500/15 text-green-700 dark:border-green-500 dark:text-green-400 [&>svg]:text-green-700 dark:[&>svg]:text-green-400",
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

export type AlertVariants = VariantProps<typeof alertVariants>;

export { Alert, AlertTitle, AlertDescription, alertVariants };
