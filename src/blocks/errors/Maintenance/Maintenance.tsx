import * as React from "react";
import { cn } from "../../../lib/utils";
import { Badge } from "../../../components/Badge";

export interface MaintenanceProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  description?: string;
  statusMessage?: string;
  estimatedTime?: string;
  contactEmail?: string;
  illustration?: React.ReactNode;
  updates?: Array<{ label: string; status: "done" | "in-progress" | "pending" }>;
}

const defaultIllustration = (
  <svg
    className="w-32 h-32 text-muted-foreground/40"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    aria-hidden="true"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1}
      d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1}
      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
    />
  </svg>
);

const statusColors = {
  done: "bg-success",
  "in-progress": "bg-primary animate-pulse",
  pending: "bg-muted-foreground/30",
};

const Maintenance = React.forwardRef<HTMLDivElement, MaintenanceProps>(
  (
    {
      className,
      title = "We'll be back soon",
      description = "We're performing scheduled maintenance to improve your experience. We'll be back online shortly.",
      statusMessage,
      estimatedTime,
      contactEmail,
      illustration,
      updates = [],
      ...props
    },
    ref,
  ) => {
    return (
      <div
        ref={ref}
        className={cn(
          "flex min-h-[60vh] flex-col items-center justify-center px-4 py-16 text-center",
          className,
        )}
        {...props}
      >
        <div className="mb-8">{illustration ?? defaultIllustration}</div>

        {statusMessage && (
          <div className="mb-4">
            <Badge variant="secondary">{statusMessage}</Badge>
          </div>
        )}

        <h1 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">{title}</h1>
        <p className="mt-4 max-w-md text-muted-foreground">{description}</p>

        {estimatedTime && (
          <p className="mt-3 text-sm font-medium text-foreground">
            Estimated completion: <span className="text-primary">{estimatedTime}</span>
          </p>
        )}

        {updates.length > 0 && (
          <div className="mt-8 w-full max-w-sm rounded-lg border border-border bg-card p-4 text-left">
            <p className="text-xs font-semibold text-foreground mb-3">Status updates</p>
            <ul className="space-y-2">
              {updates.map((update, i) => (
                <li key={i} className="flex items-center gap-3 text-sm">
                  <span
                    className={cn("h-2 w-2 shrink-0 rounded-full", statusColors[update.status])}
                    aria-hidden="true"
                  />
                  <span
                    className={cn(
                      update.status === "done" && "text-muted-foreground line-through",
                      update.status === "in-progress" && "text-foreground font-medium",
                      update.status === "pending" && "text-muted-foreground",
                    )}
                  >
                    {update.label}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {contactEmail && (
          <p className="mt-8 text-sm text-muted-foreground">
            Need help?{" "}
            <a href={`mailto:${contactEmail}`} className="text-primary hover:underline">
              {contactEmail}
            </a>
          </p>
        )}
      </div>
    );
  },
);

Maintenance.displayName = "Maintenance";

export { Maintenance };
