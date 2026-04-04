import {
  closestCenter,
  DndContext,
  type DragEndEvent,
  DragOverlay,
  type DragStartEvent,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  rectSortingStrategy,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import { cn } from "../../lib/utils";

const dashboardGridVariants = cva("grid gap-4", {
  variants: {
    columns: {
      1: "grid-cols-1",
      2: "grid-cols-1 md:grid-cols-2",
      3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
      4: "grid-cols-1 md:grid-cols-2 lg:grid-cols-4",
    },
  },
  defaultVariants: {
    columns: 3,
  },
});

export interface DashboardWidget {
  id: string;
  title: string;
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
}

export interface DashboardGridProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof dashboardGridVariants> {
  widgets: DashboardWidget[];
  onReorder?: (widgets: DashboardWidget[]) => void;
  editable?: boolean;
}

const widgetSizeClasses: Record<"sm" | "md" | "lg", string> = {
  sm: "min-h-32",
  md: "min-h-48",
  lg: "min-h-64 md:col-span-2",
};

interface SortableWidgetProps {
  widget: DashboardWidget;
  editable: boolean;
}

function SortableWidget({ widget, editable }: SortableWidgetProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: widget.id, disabled: !editable });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(
        "group relative rounded-[--la-radius] border border-border bg-card p-4 transition-shadow",
        widgetSizeClasses[widget.size || "md"],
        isDragging && "opacity-50 shadow-lg z-50",
        editable && "hover:shadow-md",
      )}
      {...attributes}
      {...(editable ? listeners : {})}
    >
      {editable && (
        <div
          className={cn(
            "absolute left-2 top-2 cursor-grab text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity",
            isDragging && "cursor-grabbing",
          )}
          aria-label="Drag handle"
        >
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
            aria-hidden="true"
          >
            <circle cx="9" cy="5" r="1" />
            <circle cx="9" cy="12" r="1" />
            <circle cx="9" cy="19" r="1" />
            <circle cx="15" cy="5" r="1" />
            <circle cx="15" cy="12" r="1" />
            <circle cx="15" cy="19" r="1" />
          </svg>
        </div>
      )}
      <div className="mb-2">
        <h3 className="text-sm font-semibold text-card-foreground">
          {widget.title}
        </h3>
      </div>
      <div className="text-sm text-muted-foreground">{widget.children}</div>
    </div>
  );
}

function WidgetOverlay({ widget }: { widget: DashboardWidget }) {
  return (
    <div
      className={cn(
        "rounded-[--la-radius] border border-primary/50 bg-card/95 p-4 shadow-xl",
        widgetSizeClasses[widget.size || "md"],
      )}
    >
      <div className="mb-2">
        <h3 className="text-sm font-semibold text-card-foreground">
          {widget.title}
        </h3>
      </div>
      <div className="text-sm text-muted-foreground">{widget.children}</div>
    </div>
  );
}

function DashboardGrid({
  widgets: initialWidgets,
  columns,
  className,
  onReorder,
  editable = false,
  ref,
  ...props
}: DashboardGridProps & { ref?: React.Ref<HTMLDivElement> }) {
  const [widgets, setWidgets] =
    React.useState<DashboardWidget[]>(initialWidgets);
  const [activeWidget, setActiveWidget] =
    React.useState<DashboardWidget | null>(null);

  React.useEffect(() => {
    setWidgets(initialWidgets);
  }, [initialWidgets]);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const handleDragStart = (event: DragStartEvent) => {
    const widget = widgets.find((w) => w.id === event.active.id);
    setActiveWidget(widget || null);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveWidget(null);

    if (over && active.id !== over.id) {
      const oldIndex = widgets.findIndex((w) => w.id === active.id);
      const newIndex = widgets.findIndex((w) => w.id === over.id);

      const newWidgets = arrayMove(widgets, oldIndex, newIndex);
      setWidgets(newWidgets);
      onReorder?.(newWidgets);
    }
  };

  return (
    <div
      ref={ref}
      className={cn(dashboardGridVariants({ columns }), className)}
      role="grid"
      aria-label="Dashboard grid"
      {...props}
    >
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={widgets.map((w) => w.id)}
          strategy={rectSortingStrategy}
        >
          {widgets.map((widget) => (
            <SortableWidget
              key={widget.id}
              widget={widget}
              editable={editable}
            />
          ))}
        </SortableContext>

        <DragOverlay>
          {activeWidget && <WidgetOverlay widget={activeWidget} />}
        </DragOverlay>
      </DndContext>
    </div>
  );
}

DashboardGrid.displayName = "DashboardGrid";

export type DashboardGridVariants = VariantProps<typeof dashboardGridVariants>;

export { DashboardGrid, dashboardGridVariants };
