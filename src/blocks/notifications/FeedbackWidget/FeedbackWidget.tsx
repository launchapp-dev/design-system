import * as React from "react";
import { cn } from "@/lib/utils";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/Popover";
import { Button } from "@/components/Button";
import { Textarea } from "@/components/Textarea";
import { Input } from "@/components/Input";
import { Card, CardContent } from "@/components/Card";

export type FeedbackRating = 1 | 2 | 3 | 4 | 5;

export type FeedbackCategory =
  | "bug"
  | "feature"
  | "ui"
  | "performance"
  | "other";

export interface FeedbackSubmission {
  rating: FeedbackRating;
  category: FeedbackCategory;
  message?: string;
  email?: string;
}

export interface FeedbackWidgetProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "children" | "onSubmit"> {
  onSubmit: (feedback: FeedbackSubmission) => void;
  isLoading?: boolean;
  variant?: "popover" | "inline" | "compact";
  defaultOpen?: boolean;
  successMessage?: string;
  title?: string;
  placeholder?: string;
  showEmail?: boolean;
  categories?: FeedbackCategory[];
  className?: string;
}

const ratingLabels: Record<FeedbackRating, string> = {
  1: "Very dissatisfied",
  2: "Dissatisfied",
  3: "Neutral",
  4: "Satisfied",
  5: "Very satisfied",
};

const categoryLabels: Record<FeedbackCategory, string> = {
  bug: "Bug report",
  feature: "Feature request",
  ui: "UI/UX feedback",
  performance: "Performance issue",
  other: "Other",
};

const ratingEmojis: Record<FeedbackRating, string> = {
  1: "😞",
  2: "😕",
  3: "😐",
  4: "😊",
  5: "😄",
};

function FeedbackForm({
  onSubmit,
  isLoading,
  placeholder = "Tell us more about your experience…",
  showEmail = false,
  categories = (["bug", "feature", "ui", "performance", "other"] as FeedbackCategory[]),
  onCancel,
  successMessage = "Thank you for your feedback!",
  className,
}: {
  onSubmit: (feedback: FeedbackSubmission) => void;
  isLoading?: boolean;
  placeholder?: string;
  showEmail?: boolean;
  categories?: FeedbackCategory[];
  onCancel?: () => void;
  successMessage?: string;
  className?: string;
}) {
  const [rating, setRating] = React.useState<FeedbackRating | null>(null);
  const [category, setCategory] = React.useState<FeedbackCategory>("other");
  const [message, setMessage] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [submitted, setSubmitted] = React.useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (rating === null) return;
    setSubmitted(true);
    onSubmit({ rating, category, message: message.trim() || undefined, email: email.trim() || undefined });
  }

  function handleReset() {
    setRating(null);
    setCategory("other");
    setMessage("");
    setEmail("");
    setSubmitted(false);
  }

  if (submitted) {
    return (
      <div className={cn("flex flex-col items-center gap-3 py-6 text-center", className)}>
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-success/10 dark:bg-success/30">
          <svg
            className="h-6 w-6 text-success dark:dark:text-success"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <div>
          <p className="font-medium">{successMessage}</p>
          <Button
            variant="ghost"
            size="sm"
            className="mt-2 h-7 text-xs"
            onClick={handleReset}
          >
            Submit more feedback
          </Button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={cn("space-y-4", className)}>
      <div className="space-y-2">
        <label className="text-sm font-medium">How would you rate your experience?</label>
        <div className="flex items-center justify-center gap-2" role="group" aria-label="Rating">
          {([1, 2, 3, 4, 5] as FeedbackRating[]).map((r) => (
            <button
              key={r}
              type="button"
              aria-label={ratingLabels[r]}
              aria-pressed={rating === r}
              onClick={() => setRating(r)}
              className={cn(
                "flex h-10 w-10 items-center justify-center rounded-lg text-xl transition-all",
                "hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                rating === r
                  ? "bg-primary/10 ring-2 ring-primary scale-110"
                  : "bg-muted hover:bg-muted/80"
              )}
            >
              {ratingEmojis[r]}
            </button>
          ))}
        </div>
        {rating !== null && (
          <p className="text-center text-xs text-muted-foreground">
            {ratingLabels[rating]}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Category</label>
        <div className="flex flex-wrap gap-1.5">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setCategory(cat)}
              className={cn(
                "rounded-full border px-3 py-1 text-xs font-medium transition-colors",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                category === cat
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-background text-muted-foreground hover:border-foreground/30 hover:text-foreground"
              )}
            >
              {categoryLabels[cat]}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <Textarea
          placeholder={placeholder}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={3}
          className="resize-none"
        />
      </div>

      {showEmail && (
        <div className="space-y-2">
          <Input
            type="email"
            placeholder="Email (optional)"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="h-9"
          />
        </div>
      )}

      <div className="flex items-center gap-2">
        <Button
          type="submit"
          className="flex-1"
          disabled={rating === null || isLoading}
        >
          {isLoading ? "Submitting…" : "Submit feedback"}
        </Button>
        {onCancel && (
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
        )}
      </div>
    </form>
  );
}

export function FeedbackWidget({
  onSubmit,
  isLoading,
  variant = "popover",
  defaultOpen = false,
  successMessage = "Thank you for your feedback!",
  title = "Share your feedback",
  placeholder,
  showEmail,
  categories,
  className,
  ...props
}: FeedbackWidgetProps) {
  const [open, setOpen] = React.useState(defaultOpen);

  if (variant === "compact") {
    return (
      <div className={cn("", className)} {...props}>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button variant="outline" size="sm" className="gap-2">
              <svg
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
                />
              </svg>
              Feedback
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80" align="end">
            <div className="space-y-1 mb-3">
              <h4 className="font-semibold text-sm">{title}</h4>
            </div>
            <FeedbackForm
              onSubmit={(f) => {
                onSubmit(f);
              }}
              isLoading={isLoading}
              placeholder={placeholder}
              showEmail={showEmail}
              categories={categories}
              successMessage={successMessage}
              onCancel={() => setOpen(false)}
            />
          </PopoverContent>
        </Popover>
      </div>
    );
  }

  if (variant === "inline") {
    return (
      <Card className={cn("", className)} {...props}>
        <CardContent className="pt-4">
          <div className="mb-3">
            <h3 className="font-semibold text-sm">{title}</h3>
          </div>
          <FeedbackForm
            onSubmit={onSubmit}
            isLoading={isLoading}
            placeholder={placeholder}
            showEmail={showEmail}
            categories={categories}
            successMessage={successMessage}
          />
        </CardContent>
      </Card>
    );
  }

  return (
    <div className={cn("", className)} {...props}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" size="icon" className="rounded-full" aria-label="Open feedback">
            <svg
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
              />
            </svg>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80" align="end">
          <div className="space-y-1 mb-3">
            <h4 className="font-semibold text-sm">{title}</h4>
          </div>
          <FeedbackForm
            onSubmit={(f) => {
              onSubmit(f);
              setOpen(false);
            }}
            isLoading={isLoading}
            placeholder={placeholder}
            showEmail={showEmail}
            categories={categories}
            successMessage={successMessage}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}

FeedbackWidget.displayName = "FeedbackWidget";
