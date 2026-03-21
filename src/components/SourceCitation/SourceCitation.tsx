import * as React from "react";
import { cn } from "../../lib/utils";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "../Popover";

export interface SourceCitationProps {
  index: number;
  title: string;
  url?: string;
  snippet?: string;
  className?: string;
}

function ExternalLinkIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="10"
      height="10"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M15 3h6v6" />
      <path d="M10 14 21 3" />
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    </svg>
  );
}

function SourceCitation({
  index,
  title,
  url,
  snippet,
  className,
}: SourceCitationProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          type="button"
          className={cn(
            "inline-flex items-center justify-center h-4 min-w-4 px-1 rounded text-[10px] font-medium leading-none",
            "bg-[hsl(var(--la-primary)/0.15)] text-[hsl(var(--la-primary))]",
            "hover:bg-[hsl(var(--la-primary)/0.25)] transition-colors cursor-pointer",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--la-ring))] focus-visible:ring-offset-1",
            className
          )}
          aria-label={`Source ${index}: ${title}`}
        >
          {index}
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-3" align="start">
        <div className="flex flex-col gap-1.5">
          <p className="text-sm font-medium leading-snug">{title}</p>
          {url && (
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-xs text-[hsl(var(--la-primary))] hover:underline truncate"
            >
              <ExternalLinkIcon />
              <span className="truncate">{url}</span>
            </a>
          )}
          {snippet && (
            <p className="text-xs text-muted-foreground leading-relaxed border-t border-border pt-1.5 mt-0.5">
              {snippet}
            </p>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
}

SourceCitation.displayName = "SourceCitation";

export { SourceCitation };
