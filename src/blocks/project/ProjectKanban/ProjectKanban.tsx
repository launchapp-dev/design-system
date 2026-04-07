import type * as React from "react";
import { Badge } from "@/components/Badge";
import { Button } from "@/components/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/Card";
import { cn } from "@/lib/utils";

export interface ProjectCard {
  id: string;
  title: string;
  description?: string;
  priority?: "low" | "medium" | "high" | "urgent";
  assignee?: {
    name: string;
    avatar?: string;
    initials?: string;
  };
  labels?: string[];
  dueDate?: string;
  commentCount?: number;
}

export interface ProjectColumn {
  id: string;
  title: string;
  color?: string;
  cards: ProjectCard[];
  addCard?: boolean;
}

export interface ProjectKanbanProps extends React.HTMLAttributes<HTMLDivElement> {
  columns: ProjectColumn[];
  onCardClick?: (card: ProjectCard) => void;
  onColumnUpdate?: (column: ProjectColumn) => void;
  onAddCard?: (columnId: string) => void;
}

const priorityColors: Record<ProjectCard["priority"] & string, string> = {
  low: "text-slate-600 dark:text-slate-400 bg-slate-50 dark:bg-slate-950/30",
  medium: "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/30",
  high: "text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/30",
  urgent: "text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/30",
};

function ProjectKanban({
  columns,
  onCardClick,
  onAddCard,
  className,
  ...props
}: ProjectKanbanProps) {
  return (
    <div ref={null} className={cn("flex gap-4 overflow-x-auto pb-4", className)} {...props}>
      {columns.map((column) => (
        <div key={column.id} className="flex-shrink-0 w-72">
          <Card className="flex flex-col max-h-[600px]">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {column.color && (
                    <div
                      className="h-3 w-3 rounded-full"
                      style={{ backgroundColor: column.color }}
                      aria-hidden="true"
                    />
                  )}
                  <CardTitle className="text-sm font-semibold">{column.title}</CardTitle>
                </div>
                <Badge variant="secondary" className="text-xs h-5">
                  {column.cards.length}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="flex-1 overflow-y-auto pb-2">
              <div className="space-y-2">
                {column.cards.map((card) => (
                  <button
                    key={card.id}
                    onClick={() => onCardClick?.(card)}
                    className="w-full text-left rounded-[--la-radius] border border-border bg-card p-3 transition-shadow hover:shadow-md"
                  >
                    {card.labels && card.labels.length > 0 && (
                      <div className="flex flex-wrap gap-1 mb-2">
                        {card.labels.map((label) => (
                          <Badge key={label} variant="outline" className="text-[10px] h-4">
                            {label}
                          </Badge>
                        ))}
                      </div>
                    )}
                    <p className="text-sm font-medium leading-tight">{card.title}</p>
                    {card.description && (
                      <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{card.description}</p>
                    )}
                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center gap-2">
                        {card.assignee && (
                          <div className="flex items-center gap-1.5">
                            <div className="h-5 w-5 rounded-full bg-muted overflow-hidden">
                              {card.assignee.avatar ? (
                                <img src={card.assignee.avatar} alt={card.assignee.name} className="h-full w-full object-cover" />
                              ) : (
                                <span className="flex items-center justify-center h-full text-[10px] font-medium">
                                  {card.assignee.initials ?? card.assignee.name.slice(0, 2)}
                                </span>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        {card.priority && (
                          <Badge
                            variant="secondary"
                            className={cn("text-[10px] h-4 capitalize", priorityColors[card.priority])}
                          >
                            {card.priority}
                          </Badge>
                        )}
                        {card.dueDate && (
                          <span className="text-[10px] text-muted-foreground">{card.dueDate}</span>
                        )}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
              {column.addCard !== false && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full mt-2"
                  onClick={() => onAddCard?.(column.id)}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1" aria-hidden="true">
                    <line x1="12" y1="5" x2="12" y2="19" />
                    <line x1="5" y1="12" x2="19" y2="12" />
                  </svg>
                  Add card
                </Button>
              )}
            </CardContent>
          </Card>
        </div>
      ))}
    </div>
  );
}

ProjectKanban.displayName = "ProjectKanban";

export { ProjectKanban };
export type { ProjectCard, ProjectColumn, ProjectKanbanProps };