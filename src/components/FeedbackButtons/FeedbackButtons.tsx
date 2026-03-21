import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const feedbackButtonsVariants = cva(
  "flex items-center gap-1",
  {
    variants: {
      variant: {
        default: "",
        minimal: "opacity-0 group-hover:opacity-100 focus-within:opacity-100 transition-opacity",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface FeedbackButtonsProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof feedbackButtonsVariants> {
  onThumbsUp?: () => void;
  onThumbsDown?: () => void;
  onRegenerate?: () => void;
  onCopy?: () => void;
  onShare?: () => void;
  isThumbsUp?: boolean | null;
  isThumbsDown?: boolean | null;
  showRegenerate?: boolean;
  showCopy?: boolean;
  showShare?: boolean;
  copied?: boolean;
}

function FeedbackButtons({
  onThumbsUp,
  onThumbsDown,
  onRegenerate,
  onCopy,
  onShare,
  isThumbsUp,
  isThumbsDown,
  showRegenerate = true,
  showCopy = true,
  showShare = false,
  copied = false,
  variant = "default",
  className,
  ...props
}: FeedbackButtonsProps & { ref?: React.Ref<HTMLDivElement> }) {
  return (
    <div
      className={cn(feedbackButtonsVariants({ variant }), className)}
      role="group"
      aria-label="Message feedback"
      {...props}
    >
      {onThumbsUp && (
        <FeedbackButton
          onClick={onThumbsUp}
          pressed={isThumbsUp === true}
          aria-label="Good response"
          tooltip="Good response"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill={isThumbsUp ? "currentColor" : "none"}
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M7 10v12" />
            <path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2a3.13 3.13 0 0 1 3 3.88Z" />
          </svg>
        </FeedbackButton>
      )}
      {onThumbsDown && (
        <FeedbackButton
          onClick={onThumbsDown}
          pressed={isThumbsDown === true}
          aria-label="Bad response"
          tooltip="Bad response"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill={isThumbsDown ? "currentColor" : "none"}
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M17 14V2" />
            <path d="M9 18.12 10 14H4.17a2 2 0 0 1-1.92-2.56l2.33-8A2 2 0 0 1 6.5 2H20a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-2.76a2 2 0 0 0-1.79 1.11L12 22a3.13 3.13 0 0 1-3-3.88Z" />
          </svg>
        </FeedbackButton>
      )}
      {showRegenerate && onRegenerate && (
        <FeedbackButton
          onClick={onRegenerate}
          aria-label="Regenerate response"
          tooltip="Regenerate"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
            <path d="M3 3v5h5" />
            <path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16" />
            <path d="M16 16h5v5" />
          </svg>
        </FeedbackButton>
      )}
      {showCopy && onCopy && (
        <FeedbackButton
          onClick={onCopy}
          aria-label={copied ? "Copied" : "Copy to clipboard"}
          tooltip={copied ? "Copied!" : "Copy"}
          pressed={copied}
        >
          {copied ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M20 6 9 17l-5-5" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
              <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
            </svg>
          )}
        </FeedbackButton>
      )}
      {showShare && onShare && (
        <FeedbackButton
          onClick={onShare}
          aria-label="Share response"
          tooltip="Share"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <circle cx="18" cy="5" r="3" />
            <circle cx="6" cy="12" r="3" />
            <circle cx="18" cy="19" r="3" />
            <line x1="8.59" x2="15.42" y1="13.51" y2="17.49" />
            <line x1="15.41" x2="8.59" y1="6.51" y2="10.49" />
          </svg>
        </FeedbackButton>
      )}
    </div>
  );
}
FeedbackButtons.displayName = "FeedbackButtons";

interface FeedbackButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  tooltip?: string;
  pressed?: boolean;
}

function FeedbackButton({
  tooltip,
  pressed,
  className,
  children,
  ...props
}: FeedbackButtonProps & { ref?: React.Ref<HTMLButtonElement> }) {
  return (
    <button
      type="button"
      className={cn(
        "inline-flex h-7 w-7 items-center justify-center rounded-md text-muted-foreground transition-colors",
        "hover:bg-muted hover:text-foreground",
        "focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-1",
        "disabled:pointer-events-none disabled:opacity-50",
        pressed && "bg-muted text-foreground",
        className
      )}
      title={tooltip}
      aria-pressed={pressed}
      {...props}
    >
      {children}
    </button>
  );
}
FeedbackButton.displayName = "FeedbackButton";

export { FeedbackButtons, FeedbackButton, feedbackButtonsVariants };
