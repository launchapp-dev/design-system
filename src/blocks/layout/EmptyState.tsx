import * as React from "react";
import { cn } from "../../lib/utils";
import { Button } from "../../components/Button";

// ── Icons (inline SVG to avoid lucide-react dep) ─────────────────────────────
function BoxIcon({ className }: { className?: string }) {
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
      <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
      <path d="m3.3 7 8.7 5 8.7-5" />
      <path d="M12 22V12" />
    </svg>
  );
}

function SearchIcon({ className }: { className?: string }) {
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
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}

function FileQuestionIcon({ className }: { className?: string }) {
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
      <path d="M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z" />
      <path d="M14 2v5a1 1 0 0 0 1 1h5" />
      <path d="M10 9H8" />
      <path d="M16 13H8" />
      <path d="M16 17H8" />
      <circle cx="12" cy="14" r="2" />
      <path d="M12 11v-1" />
    </svg>
  );
}

function InboxIcon({ className }: { className?: string }) {
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
      <polyline points="22 12 16 12 14 15 10 15 8 12 2 12" />
      <path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z" />
    </svg>
  );
}

function FolderOpenIcon({ className }: { className?: string }) {
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
      <path d="m6 14 1.5-2.9A2 2 0 0 1 9.24 10H20a2 2 0 0 1 1.94 2.5l-1.54 6a2 2 0 0 1-1.95 1.5H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H18a2 2 0 0 1 2 2v2" />
    </svg>
  );
}

export type EmptyStateVariant = "default" | "search" | "error" | "inbox" | "folder";

export interface EmptyStateProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  description?: string;
  icon?: React.ReactNode;
  variant?: EmptyStateVariant;
  action?: {
    label: string;
    onClick: () => void;
    variant?: "default" | "outline" | "ghost";
  };
  secondaryAction?: {
    label: string;
    onClick: () => void;
  };
  compact?: boolean;
}

const variantConfig: Record<
  EmptyStateVariant,
  { icon: React.ReactNode; defaultTitle: string; defaultDescription: string }
> = {
  default: {
    icon: <BoxIcon className="h-12 w-12" />,
    defaultTitle: "Nothing to see here",
    defaultDescription: "There are no items to display at the moment.",
  },
  search: {
    icon: <SearchIcon className="h-12 w-12" />,
    defaultTitle: "No results found",
    defaultDescription: "Try adjusting your search or filters to find what you're looking for.",
  },
  error: {
    icon: <FileQuestionIcon className="h-12 w-12" />,
    defaultTitle: "Something went wrong",
    defaultDescription: "We couldn't load the content. Please try again later.",
  },
  inbox: {
    icon: <InboxIcon className="h-12 w-12" />,
    defaultTitle: "Your inbox is empty",
    defaultDescription: "You're all caught up! Check back later for new messages.",
  },
  folder: {
    icon: <FolderOpenIcon className="h-12 w-12" />,
    defaultTitle: "No files yet",
    defaultDescription: "Upload your first file to get started.",
  },
};

function EmptyState({
  title,
  description,
  icon,
  variant = "default",
  action,
  secondaryAction,
  compact = false,
  className,
  ...props
}: EmptyStateProps) {
  const config = variantConfig[variant];
  const displayIcon = icon || config.icon;
  const displayTitle = title || config.defaultTitle;
  const displayDescription = description || config.defaultDescription;

  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center text-center",
        compact ? "py-8 px-4" : "py-16 px-4",
        className
      )}
      {...props}
    >
      <div
        className={cn(
          "rounded-full bg-muted flex items-center justify-center text-muted-foreground",
          compact ? "h-16 w-16 mb-4" : "h-24 w-24 mb-6"
        )}
      >
        {React.isValidElement(displayIcon)
          ? React.cloneElement(displayIcon as React.ReactElement<{ className?: string }>, {
              className: cn(
                compact ? "h-8 w-8" : "h-12 w-12",
                (displayIcon as React.ReactElement<{ className?: string }>).props.className
              ),
            })
          : displayIcon}
      </div>

      <h3
        className={cn(
          "font-semibold text-foreground",
          compact ? "text-lg mb-1" : "text-xl mb-2"
        )}
      >
        {displayTitle}
      </h3>

      <p
        className={cn(
          "text-muted-foreground max-w-sm",
          compact ? "text-sm mb-4" : "text-base mb-6"
        )}
      >
        {displayDescription}
      </p>

      {(action || secondaryAction) && (
        <div className="flex flex-col sm:flex-row items-center gap-3">
          {action && (
            <Button onClick={action.onClick} variant={action.variant || "default"}>
              {action.label}
            </Button>
          )}
          {secondaryAction && (
            <Button onClick={secondaryAction.onClick} variant="ghost">
              {secondaryAction.label}
            </Button>
          )}
        </div>
      )}
    </div>
  );
}

EmptyState.displayName = "EmptyState";

export { EmptyState };
