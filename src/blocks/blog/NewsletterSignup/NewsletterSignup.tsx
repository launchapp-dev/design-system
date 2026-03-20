import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../../lib/utils";
import { Button } from "../../../components/Button";
import { Input } from "../../../components/Input";
import { Card, CardContent } from "../../../components/Card";

const newsletterSignupVariants = cva("w-full", {
  variants: {
    variant: {
      default: "py-16 px-4",
      card: "py-8 px-4",
      inline: "py-8 px-4",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

export interface NewsletterSignupProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof newsletterSignupVariants> {
  title?: string;
  subtitle?: string;
  placeholder?: string;
  buttonLabel?: string;
  successTitle?: string;
  successMessage?: string;
  onSubmit?: (email: string) => Promise<void> | void;
}

const NewsletterSignup = React.forwardRef<HTMLDivElement, NewsletterSignupProps>(
  (
    {
      className,
      variant,
      title = "Stay in the loop",
      subtitle,
      placeholder = "Enter your email",
      buttonLabel = "Subscribe",
      successTitle = "You're subscribed!",
      successMessage = "Thanks for signing up. We'll be in touch.",
      onSubmit,
      ...props
    },
    ref
  ) => {
    const [email, setEmail] = React.useState("");
    const [loading, setLoading] = React.useState(false);
    const [success, setSuccess] = React.useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      if (!email) return;
      setLoading(true);
      try {
        await onSubmit?.(email);
        setSuccess(true);
        setEmail("");
      } finally {
        setLoading(false);
      }
    };

    const inner = (
      <>
        {success ? (
          <div className="text-center space-y-2">
            <div className="flex justify-center mb-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>
            <p className="font-semibold text-foreground">{successTitle}</p>
            <p className="text-sm text-muted-foreground">{successMessage}</p>
          </div>
        ) : (
          <>
            {(title || subtitle) && (
              <div className={cn("mb-6", variant !== "inline" && "text-center")}>
                {title && (
                  <h2 className="text-2xl font-bold tracking-tight text-foreground">{title}</h2>
                )}
                {subtitle && (
                  <p className="mt-2 text-muted-foreground">{subtitle}</p>
                )}
              </div>
            )}
            <form
              onSubmit={handleSubmit}
              className={cn(
                "flex gap-2",
                variant === "inline" ? "flex-row" : "flex-col sm:flex-row"
              )}
            >
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={placeholder}
                required
                aria-label="Email address"
                className="flex-1"
              />
              <Button type="submit" disabled={loading}>
                {loading ? "Subscribing..." : buttonLabel}
              </Button>
            </form>
          </>
        )}
      </>
    );

    if (variant === "card") {
      return (
        <div ref={ref} className={cn(newsletterSignupVariants({ variant }), className)} {...props}>
          <div className="max-w-lg mx-auto">
            <Card>
              <CardContent className="pt-6">{inner}</CardContent>
            </Card>
          </div>
        </div>
      );
    }

    return (
      <div
        ref={ref}
        className={cn(
          newsletterSignupVariants({ variant }),
          variant === "default" && "bg-muted/30",
          className
        )}
        {...props}
      >
        <div className="max-w-lg mx-auto">{inner}</div>
      </div>
    );
  }
);

NewsletterSignup.displayName = "NewsletterSignup";

export { NewsletterSignup, newsletterSignupVariants };
