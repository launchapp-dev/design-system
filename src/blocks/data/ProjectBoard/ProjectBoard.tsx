import * as React from "react";
import {
  DndContext,
  type DragEndEvent,
  type DragOverEvent,
  type DragStartEvent,
  DragOverlay,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  closestCorners,
  useDroppable,
} from "@dnd-kit/core";
import {
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Card, CardContent } from "../../../components/Card";
import { Badge } from "../../../components/Badge";
import { Avatar, AvatarFallback, AvatarImage } from "../../../components/Avatar";
import { Button } from "../../../components/Button";
import { Input } from "../../../components/Input";
import { ScrollArea } from "../../../components/ScrollArea";
import { cn } from "../../../lib/utils";

export type ProjectStatus = "planning" | "in-progress" | "review" | "completed" | "on-hold";

export interface ProjectTask {
  id: string;
  title: string;
  description?: string;
  priority?: "low" | "medium" | "high" | "critical";
  assignee?: { name: string; avatarUrl?: string };
  dueDate?: string;
  tags?: string[];
  milestone?: string;
}

export interface ProjectColumn {
  id: string;
  title: string;
  status: ProjectStatus;
  color?: string;
  tasks: ProjectTask[];
}

export interface ProjectBoardProps {
  initialColumns?: ProjectColumn[];
  className?: string;
}

const priorityVariant: Record<string, "secondary" | "default" | "destructive" | "outline"> = {
  low: "secondary",
  medium: "default",
  high: "destructive",
  critical: "outline",
};

const priorityLabel: Record<string, string> = {
  low: "Low",
  medium: "Medium",
  high: "High",
  critical: "Critical",
};

const statusColors: Record<ProjectStatus, string> = {
  planning: "bg-info",
  "in-progress": "bg-warning",
  review: "bg-primary",
  completed: "bg-success",
  "on-hold": "bg-muted-foreground",
};

function ProjectTaskCardDisplay({
  task,
  isDragging,
}: {
  task: ProjectTask;
  isDragging?: boolean;
}) {
  return (
    <Card
      className={cn(
        "cursor-grab bg-card transition-shadow hover:shadow-md active:cursor-grabbing",
        isDragging && "rotate-1 shadow-lg",
      )}
    >
      <CardContent className="p-3 space-y-2">
        <p className="text-sm font-medium leading-snug">{task.title}</p>
        {task.description && (
          <p className="text-xs text-muted-foreground line-clamp-2">{task.description}</p>
        )}
        <div className="flex flex-wrap items-center gap-2">
          {task.priority && (
            <Badge variant={priorityVariant[task.priority]} className="px-1.5 py-0 text-[10px]">
              {priorityLabel[task.priority]}
            </Badge>
          )}
          {task.dueDate && (
            <span className="text-[10px] text-muted-foreground flex items-center gap-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="10"
                height="10"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                aria-hidden="true"
              >
                <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
                <line x1="16" x2="16" y1="2" y2="6" />
                <line x1="8" x2="8" y1="2" y2="6" />
                <line x1="3" x2="21" y1="10" y2="10" />
              </svg>
              {task.dueDate}
            </span>
          )}
          {task.assignee && (
            <Avatar size="sm" className="h-5 w-5">
              {task.assignee.avatarUrl && (
                <AvatarImage src={task.assignee.avatarUrl} alt={task.assignee.name} />
              )}
              <AvatarFallback className="text-[9px]">
                {task.assignee.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
          )}
        </div>
        {task.tags && task.tags.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {task.tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center rounded-full bg-muted px-1.5 py-0 text-[10px] text-muted-foreground"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
        {task.milestone && (
          <div className="flex items-center gap-1 text-[10px] text-muted-foreground">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="10"
              height="10"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden="true"
            >
              <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" />
              <line x1="4" x2="4" y1="22" y2="15" />
            </svg>
            {task.milestone}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function SortableProjectTaskCard({ task }: { task: ProjectTask }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: task.id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={cn("touch-none select-none", isDragging && "opacity-40")}
    >
      <ProjectTaskCardDisplay task={task} />
    </div>
  );
}

function DroppableColumnTasks({
  columnId,
  tasks,
}: {
  columnId: string;
  tasks: ProjectTask[];
}) {
  const { setNodeRef } = useDroppable({ id: columnId });

  return (
    <div ref={setNodeRef} className="min-h-[4rem] space-y-2 py-1">
      <SortableContext
        items={tasks.map((t) => t.id)}
        strategy={verticalListSortingStrategy}
      >
        {tasks.map((task) => (
          <SortableProjectTaskCard key={task.id} task={task} />
        ))}
      </SortableContext>
    </div>
  );
}

const DEFAULT_COLUMNS: ProjectColumn[] = [
  { id: "planning", title: "Planning", status: "planning", tasks: [] },
  { id: "in-progress", title: "In Progress", status: "in-progress", tasks: [] },
  { id: "review", title: "Review", status: "review", tasks: [] },
  { id: "completed", title: "Completed", status: "completed", tasks: [] },
];

export function ProjectBoard({
  initialColumns = DEFAULT_COLUMNS,
  className,
  ref,
}: ProjectBoardProps & { ref?: React.Ref<HTMLDivElement> }) {
  const [columns, setColumns] = React.useState<ProjectColumn[]>(initialColumns);
  const [activeTask, setActiveTask] = React.useState<ProjectTask | null>(null);
  const [addingToColumn, setAddingToColumn] = React.useState<string | null>(null);
  const [newTaskTitle, setNewTaskTitle] = React.useState("");

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }),
  );

  const findColumnByTaskId = React.useCallback(
    (taskId: string) => columns.find((col) => col.tasks.some((t) => t.id === taskId)),
    [columns],
  );

  const handleDragStart = (event: DragStartEvent) => {
    const column = findColumnByTaskId(String(event.active.id));
    setActiveTask(column?.tasks.find((t) => t.id === String(event.active.id)) ?? null);
  };

  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event;
    if (!over) return;

    const activeId = String(active.id);
    const overId = String(over.id);
    if (activeId === overId) return;

    const activeColumn = findColumnByTaskId(activeId);
    const overColumn =
      findColumnByTaskId(overId) ?? columns.find((col) => col.id === overId);

    if (!activeColumn || !overColumn || activeColumn.id === overColumn.id) return;

    setColumns((prev) => {
      const activeTasks = [...activeColumn.tasks];
      const overTasks = [...overColumn.tasks];

      const activeIndex = activeTasks.findIndex((t) => t.id === activeId);
      const [task] = activeTasks.splice(activeIndex, 1);

      const overTaskIndex = overTasks.findIndex((t) => t.id === overId);
      overTasks.splice(overTaskIndex >= 0 ? overTaskIndex : overTasks.length, 0, task);

      return prev.map((col) => {
        if (col.id === activeColumn.id) return { ...col, tasks: activeTasks };
        if (col.id === overColumn.id) return { ...col, tasks: overTasks };
        return col;
      });
    });
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveTask(null);
    if (!over) return;

    const activeId = String(active.id);
    const overId = String(over.id);
    if (activeId === overId) return;

    const activeColumn = findColumnByTaskId(activeId);
    if (!activeColumn) return;

    const oldIndex = activeColumn.tasks.findIndex((t) => t.id === activeId);
    const newIndex = activeColumn.tasks.findIndex((t) => t.id === overId);
    if (newIndex === -1) return;

    setColumns((prev) =>
      prev.map((col) =>
        col.id === activeColumn.id
          ? { ...col, tasks: arrayMove(col.tasks, oldIndex, newIndex) }
          : col,
      ),
    );
  };

  const handleAddTask = (columnId: string) => {
    const title = newTaskTitle.trim();
    if (!title) return;
    setColumns((prev) =>
      prev.map((col) =>
        col.id === columnId
          ? {
              ...col,
              tasks: [
                ...col.tasks,
                {
                  id: `task-${Date.now()}-${Math.random()}`,
                  title,
                  priority: "medium",
                },
              ],
            }
          : col,
      ),
    );
    setNewTaskTitle("");
    setAddingToColumn(null);
  };

  return (
    <div ref={ref} className={cn("flex h-full gap-4 overflow-x-auto pb-4", className)}>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
      >
        {columns.map((column) => (
          <div
            key={column.id}
            className="flex w-72 shrink-0 flex-col rounded-lg border border-border bg-muted/20"
          >
            <div className="flex items-center gap-2 px-4 py-3">
              <div
                className={cn("h-2 w-2 rounded-full", statusColors[column.status])}
                aria-hidden="true"
              />
              <h3 className="text-sm font-semibold">{column.title}</h3>
              <span className="ml-auto flex h-5 min-w-[1.25rem] items-center justify-center rounded-full bg-muted px-1.5 text-xs font-medium text-muted-foreground">
                {column.tasks.length}
              </span>
            </div>

            <ScrollArea className="flex-1 px-3">
              <DroppableColumnTasks columnId={column.id} tasks={column.tasks} />
            </ScrollArea>

            <div className="p-3 pt-2">
              {addingToColumn === column.id ? (
                <div className="space-y-2">
                  <Input
                    autoFocus
                    placeholder="Task title..."
                    value={newTaskTitle}
                    onChange={(e) => setNewTaskTitle(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") handleAddTask(column.id);
                      if (e.key === "Escape") {
                        setAddingToColumn(null);
                        setNewTaskTitle("");
                      }
                    }}
                  />
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      className="flex-1"
                      onClick={() => handleAddTask(column.id)}
                    >
                      Add task
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setAddingToColumn(null);
                        setNewTaskTitle("");
                      }}
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              ) : (
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full justify-start text-muted-foreground hover:text-foreground"
                  onClick={() => setAddingToColumn(column.id)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    aria-hidden="true"
                    className="mr-1"
                  >
                    <line x1="12" y1="5" x2="12" y2="19" />
                    <line x1="5" y1="12" x2="19" y2="12" />
                  </svg>
                  Add task
                </Button>
              )}
            </div>
          </div>
        ))}

        <DragOverlay>
          {activeTask && <ProjectTaskCardDisplay task={activeTask} isDragging />}
        </DragOverlay>
      </DndContext>
    </div>
  );
}

ProjectBoard.displayName = "ProjectBoard";
