import * as React from "react";
import { cva } from "class-variance-authority";
import { cn } from "../../lib/utils";

export type ConsentAction = "accepted_all" | "rejected_all" | "customized" | "withdrawn";

export interface ConsentHistoryEntry {
  id: string;
  timestamp: string | Date;
  action: ConsentAction;
  categories?: Record<string, boolean>;
  ipAddress?: string;
  userAgent?: string;
}

export interface ConsentHistoryTableProps {
  entries: ConsentHistoryEntry[];
  emptyMessage?: string;
  className?: string;
  onWithdraw?: (entryId: string) => void;
}

const actionBadgeVariants = cva(
  "inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium",
  {
    variants: {
      action: {
        accepted_all:
          "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
        rejected_all:
          "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400",
        customized:
          "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400",
        withdrawn:
          "bg-[hsl(var(--la-muted))] text-[hsl(var(--la-muted-foreground))]",
      },
    },
    defaultVariants: {
      action: "customized",
    },
  }
);

const ACTION_LABELS: Record<ConsentAction, string> = {
  accepted_all: "Accepted All",
  rejected_all: "Rejected All",
  customized: "Customized",
  withdrawn: "Withdrawn",
};

function formatTimestamp(value: string | Date): string {
  const date = typeof value === "string" ? new Date(value) : value;
  return new Intl.DateTimeFormat(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date);
}

function ConsentHistoryTable({
  entries,
  emptyMessage = "No consent history found.",
  className,
  onWithdraw,
}: ConsentHistoryTableProps) {
  if (entries.length === 0) {
    return (
      <div
        className={cn(
          "rounded-lg border border-[hsl(var(--la-border))] p-8 text-center",
          "text-sm text-[hsl(var(--la-muted-foreground))]",
          className
        )}
      >
        {emptyMessage}
      </div>
    );
  }

  return (
    <div
      className={cn(
        "overflow-hidden rounded-lg border border-[hsl(var(--la-border))]",
        className
      )}
    >
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-[hsl(var(--la-border))] bg-[hsl(var(--la-muted))]">
              <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-[hsl(var(--la-muted-foreground))]">
                Date &amp; Time
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-[hsl(var(--la-muted-foreground))]">
                Action
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-[hsl(var(--la-muted-foreground))]">
                Categories
              </th>
              <th className="px-4 py-3 text-right text-xs font-medium uppercase tracking-wider text-[hsl(var(--la-muted-foreground))]">
                <span className="sr-only">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[hsl(var(--la-border))] bg-[hsl(var(--la-background))]">
            {entries.map((entry) => (
              <tr
                key={entry.id}
                className="transition-colors hover:bg-[hsl(var(--la-muted)/0.5)]"
              >
                <td className="whitespace-nowrap px-4 py-3 text-[hsl(var(--la-foreground))]">
                  {formatTimestamp(entry.timestamp)}
                </td>
                <td className="px-4 py-3">
                  <span className={actionBadgeVariants({ action: entry.action })}>
                    {ACTION_LABELS[entry.action]}
                  </span>
                </td>
                <td className="px-4 py-3">
                  {entry.categories ? (
                    <div className="flex flex-wrap gap-1">
                      {Object.entries(entry.categories).map(([key, enabled]) => (
                        <span
                          key={key}
                          className={cn(
                            "inline-flex items-center rounded px-1.5 py-0.5 text-[11px]",
                            enabled
                              ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                              : "bg-[hsl(var(--la-muted))] text-[hsl(var(--la-muted-foreground))] line-through"
                          )}
                        >
                          {key}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <span className="text-[hsl(var(--la-muted-foreground))]">—</span>
                  )}
                </td>
                <td className="px-4 py-3 text-right">
                  {onWithdraw && entry.action !== "withdrawn" && (
                    <button
                      type="button"
                      onClick={() => onWithdraw(entry.id)}
                      className={cn(
                        "text-xs text-[hsl(var(--la-muted-foreground))] underline",
                        "hover:text-[hsl(var(--la-foreground))] hover:no-underline",
                        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--la-ring))]",
                        "rounded"
                      )}
                    >
                      Withdraw
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

ConsentHistoryTable.displayName = "ConsentHistoryTable";

export { ConsentHistoryTable, actionBadgeVariants, ACTION_LABELS };
