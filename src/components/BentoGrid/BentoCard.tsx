import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";

const bentoCardVariants = cva(
  "relative overflow-hidden rounded-xl border border-border bg-card text-card-foreground transition-all duration-300",
  {
    variants: {
      variant: {
        default: "shadow-sm hover:shadow-md",
        gradient: "bg-gradient-to-br from-primary/10 via-card to-secondary/10 hover:from-primary/20 hover:to-secondary/20",
        outline: "border-2 hover:border-primary/50",
        ghost: "border-transparent bg-transparent hover:bg-accent/10",
        elevated: "shadow-lg hover:shadow-xl hover:-translate-y-1",
      },
      size: {
        sm: "p-4",
        md: "p-6",
        lg: "p-8",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
);

export interface BentoCardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof bentoCardVariants> {
  icon?: React.ReactNode;
  header?: React.ReactNode;
  footer?: React.ReactNode;
}

const BentoCard = React.forwardRef<HTMLDivElement, BentoCardProps>(
  ({ className, variant, size, icon, header, footer, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(bentoCardVariants({ variant, size }), className)}
        {...props}
      >
        {icon && (
          <div className="mb-4 flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10 text-primary">
            {icon}
          </div>
        )}
        {header && <div className="mb-2 font-semibold text-lg">{header}</div>}
        <div className="text-sm text-muted-foreground">{children}</div>
        {footer && (
          <div className="mt-4 pt-4 border-t border-border text-xs text-muted-foreground">
            {footer}
          </div>
        )}
      </div>
    );
  }
);
BentoCard.displayName = "BentoCard";

const BentoCardTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn("font-semibold text-lg leading-tight", className)}
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
    className={cn("text-sm text-muted-foreground mt-1", className)}
    {...props}
  />
));
BentoCardDescription.displayName = "BentoCardDescription";

const BentoCardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("mt-3", className)} {...props} />
));
BentoCardContent.displayName = "BentoCardContent";

const BentoCardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("mt-4 pt-4 border-t border-border", className)}
    {...props}
  />
));
BentoCardFooter.displayName = "BentoCardFooter";

const BentoCardIcon = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    variant?: "default" | "primary" | "secondary" | "accent";
  }
>(({ className, variant = "default", ...props }, ref) => {
  const variantClasses: Record<string, string> = {
    default: "bg-muted text-muted-foreground",
    primary: "bg-primary/10 text-primary",
    secondary: "bg-secondary/10 text-secondary",
    accent: "bg-accent/10 text-accent-foreground",
  };

  return (
    <div
      ref={ref}
      className={cn(
        "flex items-center justify-center w-10 h-10 rounded-lg shrink-0",
        variantClasses[variant],
        className
      )}
      {...props}
    />
  );
});
BentoCardIcon.displayName = "BentoCardIcon";

export {
  BentoCard,
  BentoCardTitle,
  BentoCardDescription,
  BentoCardContent,
  BentoCardFooter,
  BentoCardIcon,
  bentoCardVariants,
};
