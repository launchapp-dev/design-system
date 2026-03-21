import * as React from "react";
import { cn } from "../../lib/utils";
import { Button } from "../Button";
import {
  TooltipProvider,
  TooltipRoot,
  TooltipTrigger,
  TooltipContent,
} from "../Tooltip";

export interface FeedbackButtonsProps {
  onThumbsUp?: () => void;
  onThumbsDown?: () => void;
  onCopy?: () => void;
  onRegenerate?: () => void;
  content?: string;
  className?: string;
}

function ThumbsUpIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M7 10v12" />
      <path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2a3.13 3.13 0 0 1 3 3.88Z" />
    </svg>
  );
}

function ThumbsDownIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M17 14V2" />
      <path d="M9 18.12 10 14H4.17a2 2 0 0 1-1.92-2.56l2.33-8A2 2 0 0 1 6.5 2H20a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-2.76a2 2 0 0 0-1.79 1.11L12 22a3.13 3.13 0 0 1-3-3.88Z" />
    </svg>
  );
}

function CopyIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
      <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
    </svg>
  );
}

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

function RefreshCwIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
      <path d="M21 3v5h-5" />
      <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" />
      <path d="M8 16H3v5" />
    </svg>
  );
}

function FeedbackButtons({
  onThumbsUp,
  onThumbsDown,
  onCopy,
  onRegenerate,
  content,
  className,
}: FeedbackButtonsProps) {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = () => {
    if (content) {
      navigator.clipboard.writeText(content).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }).catch(() => {});
    }
    onCopy?.();
  };

  return (
    <TooltipProvider>
      <div className={cn("flex items-center gap-0.5", className)}>
        <TooltipRoot>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              onClick={onThumbsUp}
              aria-label="Helpful"
              className="h-8 w-8"
            >
              <ThumbsUpIcon />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Helpful</TooltipContent>
        </TooltipRoot>

        <TooltipRoot>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              onClick={onThumbsDown}
              aria-label="Not helpful"
              className="h-8 w-8"
            >
              <ThumbsDownIcon />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Not helpful</TooltipContent>
        </TooltipRoot>

        <TooltipRoot>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleCopy}
              aria-label={copied ? "Copied!" : "Copy"}
              className="h-8 w-8"
            >
              {copied ? <CheckIcon className="text-[hsl(var(--la-primary))]" /> : <CopyIcon />}
            </Button>
          </TooltipTrigger>
          <TooltipContent>{copied ? "Copied!" : "Copy"}</TooltipContent>
        </TooltipRoot>

        <TooltipRoot>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              onClick={onRegenerate}
              aria-label="Regenerate"
              className="h-8 w-8"
            >
              <RefreshCwIcon />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Regenerate</TooltipContent>
        </TooltipRoot>
      </div>
    </TooltipProvider>
  );
}

FeedbackButtons.displayName = "FeedbackButtons";

export { FeedbackButtons };
