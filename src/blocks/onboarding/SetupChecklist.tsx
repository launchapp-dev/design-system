import * as React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/Card";
import { Checkbox } from "@/components/Checkbox";
import { Progress } from "@/components/Progress";
import { Badge } from "@/components/Badge";
import { cn } from "@/lib/utils";

export interface ChecklistItem {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  href?: string;
  icon?: React.ReactNode;
  action?: {
    label: string;
    onClick: () => void;
  };
}

export interface SetupChecklistProps extends React.HTMLAttributes<HTMLDivElement> {
  items: ChecklistItem[];
  title?: string;
  description?: string;
  onItemToggle?: (id: string, completed: boolean) => void;
  showProgress?: boolean;
  compact?: boolean;
}

const SetupChecklist = React.forwardRef<HTMLDivElement, SetupChecklistProps>(
  (
    {
      items,
      title = "Getting Started",
      description,
      onItemToggle,
      showProgress = true,
      compact = false,
      className,
      ...props
    },
    ref,
  ) => {
    const completedCount = items.filter((item) => item.completed).length;
    const progress = items.length > 0 ? Math.round((completedCount / items.length) * 100) : 0;
    const allComplete = completedCount === items.length;

    return (
      <Card ref={ref} className={cn("", className)} {...props}>
        {(title || description || showProgress) && (
          <CardHeader>
            {(title || description) && (
              <div className="flex flex-col sm:flex-row items-start justify-between gap-4">
                <div className="flex-1">
                  {title && <CardTitle>{title}</CardTitle>}
                  {description && <CardDescription className="mt-1">{description}</CardDescription>}
                </div>
                {allComplete && (
                  <Badge variant="default" className="shrink-0">
                    Complete!
                  </Badge>
                )}
              </div>
            )}
            {showProgress && (
              <div className="mt-4 space-y-1.5">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">
                    {completedCount} of {items.length} tasks done
                  </span>
                  <span className="font-medium">{progress}%</span>
                </div>
                <Progress value={progress} aria-label={`${progress}% complete`} />
              </div>
            )}
          </CardHeader>
        )}
        <CardContent className={compact ? "p-4" : ""}>
          <ul role="list" className={cn("space-y-3", compact ? "space-y-2" : "")}>
            {items.map((item) => (
              <li key={item.id}>
                <div
                  className={cn(
                    "flex items-start gap-3 rounded-md border p-3 transition-colors",
                    item.completed ? "border-border bg-muted/40" : "border-border bg-background",
                    compact && "p-2",
                  )}
                >
                  <Checkbox
                    id={`checklist-${item.id}`}
                    checked={item.completed}
                    onCheckedChange={(checked) => onItemToggle?.(item.id, checked === true)}
                    aria-label={item.title}
                    className="mt-0.5 shrink-0"
                  />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      {item.icon && (
                        <span className="shrink-0 text-muted-foreground">{item.icon}</span>
                      )}
                      <label
                        htmlFor={`checklist-${item.id}`}
                        className={cn(
                          "cursor-pointer text-sm font-medium leading-none",
                          item.completed && "text-muted-foreground line-through",
                        )}
                      >
                        {item.href ? (
                          <a
                            href={item.href}
                            className="hover:underline focus-visible:underline"
                            onClick={(e) => e.stopPropagation()}
                          >
                            {item.title}
                          </a>
                        ) : (
                          item.title
                        )}
                      </label>
                    </div>
                    {item.description && (
                      <p
                        className={cn(
                          "mt-1 text-xs text-muted-foreground",
                          compact && "text-[10px]",
                        )}
                      >
                        {item.description}
                      </p>
                    )}
                    {item.action && !item.completed && (
                      <button
                        type="button"
                        onClick={item.action.onClick}
                        className="mt-2 text-xs text-primary hover:underline"
                      >
                        {item.action.label}
                      </button>
                    )}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    );
  },
);
SetupChecklist.displayName = "SetupChecklist";

export { SetupChecklist };
