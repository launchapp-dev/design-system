import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";

const bentoCardVariants = cva(
  "relative overflow-hidden rounded-lg border border-border bg-card text-card-foreground transition-all duration-300 ease-out",
  {
    variants: {
      variant: {
        default: "shadow-sm",
        gradient:
          "bg-gradient-to-br from-[hsl(var(--la-card))] to-[hsl(var(--la-muted))]",
        outline: "border-2 border-border bg-transparent",
        elevated: "shadow-lg",
        ghost: "border-transparent bg-transparent shadow-none",
      },
      hover: {
        none: "",
        lift: "hover:-translate-y-1 hover:shadow-xl",
        glow: "hover:shadow-[0_0_30px_rgba(var(--la-primary-rgb),0.3)]",
        scale: "hover:scale-[1.02]",
        border: "hover:border-[hsl(var(--la-primary))] hover:border-2",
      },
      padding: {
        none: "p-0",
        sm: "p-3",
        md: "p-4",
        lg: "p-6",
        xl: "p-8",
      },
    },
    defaultVariants: {
      variant: "default",
      hover: "lift",
      padding: "md",
    },
  }
);

export interface BentoCardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof bentoCardVariants> {
  asChild?: boolean;
}

const BentoCard = React.forwardRef<HTMLDivElement, BentoCardProps>(
  ({ className, variant, hover, padding, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(bentoCardVariants({ variant, hover, padding }), className)}
        {...props}
      />
    );
  }
);
BentoCard.displayName = "BentoCard";

const BentoCardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5", className)}
    {...props}
  />
));
BentoCardHeader.displayName = "BentoCardHeader";

const BentoCardTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn("text-lg font-semibold leading-none tracking-tight", className)}
    {...props}
  />
));
BentoCardTitle.displayName = "BentoCardTitle";

const BentoCardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
));
BentoCardDescription.displayName = "BentoCardDescription";

const BentoCardIcon = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "flex h-10 w-10 items-center justify-center rounded-lg bg-muted text-muted-foreground",
      className
    )}
    {...props}
  />
));
BentoCardIcon.displayName = "BentoCardIcon";

const BentoCardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("", className)} {...props} />
));
BentoCardContent.displayName = "BentoCardContent";

const BentoCardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center pt-4", className)}
    {...props}
  />
));
BentoCardFooter.displayName = "BentoCardFooter";

const BentoCardBackground = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    gradient?: string;
    pattern?: "dots" | "grid" | "lines";
  }
>(({ className, gradient, pattern, children, ...props }, ref) => {
  const patternClasses = {
    dots: "bg-[radial-gradient(circle_at_center,hsl(var(--la-muted-foreground)/0.1)_1px,transparent_1px)] bg-[length:16px_16px]",
    grid: "bg-[linear-gradient(hsl(var(--la-muted-foreground)/0.1)_1px,transparent_1px),linear-gradient(90deg,hsl(var(--la-muted-foreground)/0.1)_1px,transparent_1px)] bg-[length:24px_24px]",
    lines: "bg-[repeating-linear-gradient(45deg,transparent,transparent_10px,hsl(var(--la-muted-foreground)/0.05)_10px,hsl(var(--la-muted-foreground)/0.05)_20px)]",
  };

  return (
    <div
      ref={ref}
      className={cn(
        "absolute inset-0 -z-10 overflow-hidden",
        pattern && patternClasses[pattern],
        className
      )}
      style={gradient ? { background: gradient } : undefined}
      {...props}
    >
      {children}
    </div>
  );
});
BentoCardBackground.displayName = "BentoCardBackground";

export {
  BentoCard,
  BentoCardHeader,
  BentoCardTitle,
  BentoCardDescription,
  BentoCardIcon,
  BentoCardContent,
  BentoCardFooter,
  BentoCardBackground,
  bentoCardVariants,
};
