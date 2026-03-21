import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
  DragStartEvent,
  DragOverlay,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  rectSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { cn } from "@/lib/utils";
import { Card } from "@/components/Card";

const dashboardGridVariants = cva("grid gap-4", {
  variants: {
    cols: {
      1: "grid-cols-1",
      2: "grid-cols-1 md:grid-cols-2",
      3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
      4: "grid-cols-1 md:grid-cols-2 lg:grid-cols-4",
    },
  },
  defaultVariants: {
    cols: 3,
  },
});

export interface DashboardWidget {
  id: string;
  title?: string;
  size?: "sm" | "md" | "lg";
  content: React.ReactNode;
}

export interface DashboardGridProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof dashboardGridVariants> {
  widgets: DashboardWidget[];
  onReorder?: (widgets: DashboardWidget[]) => void;
  draggable?: boolean;
}

interface SortableWidgetProps {
  widget: DashboardWidget;
  draggable: boolean;
}

function SortableWidget({ widget, draggable }: SortableWidgetProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: widget.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const sizeClasses = {
    sm: "col-span-1 row-span-1",
    md: "col-span-1 row-span-1 md:col-span-1 md:row-span-1",
    lg: "col-span-1 row-span-1 md:col-span-2 md:row-span-2",
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(sizeClasses[widget.size ?? "md"], isDragging && "z-50")}
      {...(draggable ? attributes : {})}
      {...(draggable ? listeners : {})}
    >
      <Card
        className={cn(
          "h-full transition-shadow",
          draggable && "cursor-grab active:cursor-grabbing",
          isDragging && "shadow-xl ring-2 ring-primary"
        )}
      >
        {widget.title && (
          <div className="p-4 border-b border-border">
            <h3 className="text-sm font-semibold">{widget.title}</h3>
          </div>
        )}
        <div className="p-4">{widget.content}</div>
      </Card>
    </div>
  );
}

function DashboardGrid(
  {
    widgets: initialWidgets,
    cols,
    onReorder,
    draggable = true,
    className,
    ref,
    ...props
  }: DashboardGridProps & { ref?: React.Ref<HTMLDivElement> }
) {
  const [widgets, setWidgets] = React.useState(initialWidgets);
  const [activeId, setActiveId] = React.useState<string | null>(null);

  React.useEffect(() => {
    setWidgets(initialWidgets);
  }, [initialWidgets]);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = widgets.findIndex((w) => w.id === active.id);
      const newIndex = widgets.findIndex((w) => w.id === over.id);

      const newWidgets = arrayMove(widgets, oldIndex, newIndex);
      setWidgets(newWidgets);
      onReorder?.(newWidgets);
    }

    setActiveId(null);
  };

  const activeWidget = activeId ? widgets.find((w) => w.id === activeId) : null;

  return (
    <div ref={ref} className={cn(dashboardGridVariants({ cols }), className)} {...props}>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <SortableContext items={widgets.map((w) => w.id)} strategy={rectSortingStrategy}>
          {widgets.map((widget) => (
            <SortableWidget key={widget.id} widget={widget} draggable={draggable} />
          ))}
        </SortableContext>

        <DragOverlay>
          {activeWidget ? (
            <Card className="shadow-2xl ring-2 ring-primary opacity-90">
              {activeWidget.title && (
                <div className="p-4 border-b border-border">
                  <h3 className="text-sm font-semibold">{activeWidget.title}</h3>
                </div>
              )}
              <div className="p-4">{activeWidget.content}</div>
            </Card>
          ) : null}
        </DragOverlay>
      </DndContext>
    </div>
  );
}
DashboardGrid.displayName = "DashboardGrid";

export { DashboardGrid, dashboardGridVariants };
