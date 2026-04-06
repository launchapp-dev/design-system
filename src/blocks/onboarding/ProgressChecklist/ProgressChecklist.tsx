import * as React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/Card";
import { Checkbox } from "@/components/Checkbox";
import { Progress } from "@/components/Progress";
import { Badge } from "@/components/Badge";
import { cn } from "@/lib/utils";

export interface ProgressChecklistItem {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  href?: string;
}

export interface ProgressChecklistSection {
  id: string;
  title: string;
  description?: string;
  items: ProgressChecklistItem[];
}

export interface ProgressChecklistProps extends React.HTMLAttributes<HTMLDivElement> {
  sections: ProgressChecklistSection[];
  onItemToggle?: (sectionId: string, itemId: string, completed: boolean) => void;
  showOverallProgress?: boolean;
  overallTitle?: string;
}

function SectionProgress({
  section,
  onToggle,
}: {
  section: ProgressChecklistSection;
  onToggle: (itemId: string, completed: boolean) => void;
}) {
  const completedCount = section.items.filter((i) => i.completed).length;
  const progress = section.items.length > 0 ? Math.round((completedCount / section.items.length) * 100) : 0;
  const allComplete = completedCount === section.items.length;

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0 flex-1">
            <CardTitle className="text-base">{section.title}</CardTitle>
            {section.description && (
              <CardDescription className="mt-0.5">{section.description}</CardDescription>
            )}
          </div>
          {allComplete ? (
            <Badge variant="default" className="shrink-0 text-xs">
              Done
            </Badge>
          ) : (
            <Badge variant="secondary" className="shrink-0 text-xs">
              {completedCount}/{section.items.length}
            </Badge>
          )}
        </div>
        <Progress value={progress} aria-label={`${section.title}: ${progress}% complete`} className="mt-3" />
      </CardHeader>
      <CardContent className="space-y-2">
        {section.items.map((item, idx) => (
          <React.Fragment key={item.id}>
            <div
              className={cn(
                "flex items-start gap-3 rounded-md p-2 transition-colors",
                item.completed ? "bg-muted/40" : "bg-background"
              )}
            >
              <Checkbox
                id={`${section.id}-${item.id}`}
                checked={item.completed}
                onCheckedChange={(checked) => onToggle(item.id, checked === true)}
                aria-label={item.title}
                className="mt-0.5 shrink-0"
              />
              <div className="min-w-0 flex-1">
                <label
                  htmlFor={`${section.id}-${item.id}`}
                  className={cn(
                    "cursor-pointer text-sm font-medium leading-none",
                    item.completed && "text-muted-foreground line-through"
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
                {item.description && (
                  <p className="mt-1 text-xs text-muted-foreground">{item.description}</p>
                )}
              </div>
            </div>
            {idx < section.items.length - 1 && <div className="border-t border-border/50" />}
          </React.Fragment>
        ))}
      </CardContent>
    </Card>
  );
}

const ProgressChecklist = React.forwardRef<HTMLDivElement, ProgressChecklistProps>(
  (
    {
      sections,
      onItemToggle,
      showOverallProgress = true,
      overallTitle = "Overall Progress",
      className,
      ...props
    },
    ref
  ) => {
    const totalItems = sections.reduce((sum, s) => sum + s.items.length, 0);
    const totalCompleted = sections.reduce(
      (sum, s) => sum + s.items.filter((i) => i.completed).length,
      0
    );
    const overallProgress = totalItems > 0 ? Math.round((totalCompleted / totalItems) * 100) : 0;
    const allComplete = totalCompleted === totalItems && totalItems > 0;

    const handleToggle = (sectionId: string, itemId: string, completed: boolean) => {
      onItemToggle?.(sectionId, itemId, completed);
    };

    return (
      <div ref={ref} className={cn("space-y-6", className)} {...props}>
        {showOverallProgress && (
          <Card>
            <CardHeader className="pb-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <CardTitle>{overallTitle}</CardTitle>
                  <p className="mt-0.5 text-sm text-muted-foreground">
                    {totalCompleted} of {totalItems} tasks complete
                  </p>
                </div>
                {allComplete ? (
                  <Badge variant="default" className="shrink-0">
                    Complete!
                  </Badge>
                ) : (
                  <span className="text-2xl font-bold tabular-nums">{overallProgress}%</span>
                )}
              </div>
              <Progress value={overallProgress} aria-label={`Overall: ${overallProgress}% complete`} className="mt-3" />
            </CardHeader>
          </Card>
        )}

        <div className="grid gap-6 md:grid-cols-2">
          {sections.map((section) => (
            <SectionProgress
              key={section.id}
              section={section}
              onToggle={(itemId, completed) => handleToggle(section.id, itemId, completed)}
            />
          ))}
        </div>
      </div>
    );
  }
);
ProgressChecklist.displayName = "ProgressChecklist";

export { ProgressChecklist };
