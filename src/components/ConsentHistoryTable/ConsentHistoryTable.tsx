
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
          "bg-success/10 text-success dark:bg-success/30 dark:dark:text-success",
        rejected_all:
          "bg-destructive text-destructive-foreground dark:bg-destructive/30 dark:text-destructive",
        customized:
          "bg-info text-info-foreground dark:bg-info/30 dark:text-info",
        withdrawn:
          "bg-muted text-muted-foreground",
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
          "rounded-lg border border-border p-8 text-center",
          "text-sm text-muted-foreground",
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
        "overflow-hidden rounded-lg border border-border",
        className
      )}
    >
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-muted">
              <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Date &amp; Time
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Action
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Categories
              </th>
              <th className="px-4 py-3 text-right text-xs font-medium uppercase tracking-wider text-muted-foreground">
                <span className="sr-only">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border bg-background">
            {entries.map((entry) => (
              <tr
                key={entry.id}
                className="transition-colors hover:bg-muted/50"
              >
                <td className="whitespace-nowrap px-4 py-3 text-foreground">
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
                              ? "bg-success/10 text-success dark:bg-success/30 dark:dark:text-success"
                              : "bg-muted text-muted-foreground line-through"
                          )}
                        >
                          {key}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <span className="text-muted-foreground">—</span>
                  )}
                </td>
                <td className="px-4 py-3 text-right">
                  {onWithdraw && entry.action !== "withdrawn" && (
                    <button
                      type="button"
                      onClick={() => onWithdraw(entry.id)}
                      className={cn(
                        "text-xs text-muted-foreground underline",
                        "hover:text-foreground hover:no-underline",
                        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
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
