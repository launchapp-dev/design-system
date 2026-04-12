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
import { Card, CardContent } from "@/components/Card";
import { Badge } from "@/components/Badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/Avatar";
import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { ScrollArea } from "@/components/ScrollArea";
import { cn } from "@/lib/utils";

export interface KanbanCard {
  id: string;
  title: string;
  description?: string;
  badge?: string;
  badgeVariant?: "default" | "secondary" | "destructive" | "outline";
  avatarFallback?: string;
  avatarSrc?: string;
}

export interface KanbanColumn {
  id: string;
  title: string;
  cards: KanbanCard[];
}

export interface KanbanBoardProps {
  initialColumns?: KanbanColumn[];
  className?: string;
}

function KanbanCardDisplay({ card, isDragging }: { card: KanbanCard; isDragging?: boolean }) {
  return (
    <Card
      className={cn(
        "cursor-grab bg-card transition-shadow hover:shadow-md active:cursor-grabbing",
        isDragging && "rotate-1 shadow-lg",
      )}
    >
      <CardContent className="p-3">
        <div className="flex flex-col sm:flex-row items-start justify-between gap-2">
          <p className="text-sm font-medium leading-snug">{card.title}</p>
          {card.avatarFallback && (
            <Avatar size="sm" className="shrink-0">
              {card.avatarSrc && <AvatarImage src={card.avatarSrc} alt={card.avatarFallback} />}
              <AvatarFallback className="text-[10px]">{card.avatarFallback}</AvatarFallback>
            </Avatar>
          )}
        </div>
        {card.description && (
          <p className="mt-1.5 text-xs text-muted-foreground">{card.description}</p>
        )}
        {card.badge && (
          <div className="mt-2">
            <Badge variant={card.badgeVariant ?? "secondary"} className="px-2 py-0 text-[10px]">
              {card.badge}
            </Badge>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function SortableKanbanCard({ card }: { card: KanbanCard }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: card.id,
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
      <KanbanCardDisplay card={card} />
    </div>
  );
}

function DroppableColumnCards({ columnId, cards }: { columnId: string; cards: KanbanCard[] }) {
  const { setNodeRef } = useDroppable({ id: columnId });

  return (
    <div ref={setNodeRef} className="min-h-[4rem] space-y-2 py-1">
      <SortableContext items={cards.map((c) => c.id)} strategy={verticalListSortingStrategy}>
        {cards.map((card) => (
          <SortableKanbanCard key={card.id} card={card} />
        ))}
      </SortableContext>
    </div>
  );
}

const DEFAULT_COLUMNS: KanbanColumn[] = [
  { id: "todo", title: "To Do", cards: [] },
  { id: "in-progress", title: "In Progress", cards: [] },
  { id: "done", title: "Done", cards: [] },
];

export function KanbanBoard({
  initialColumns = DEFAULT_COLUMNS,
  className,
  ref,
}: KanbanBoardProps & { ref?: React.Ref<HTMLDivElement> }) {
  const [columns, setColumns] = React.useState<KanbanColumn[]>(initialColumns);
  const [activeCard, setActiveCard] = React.useState<KanbanCard | null>(null);
  const [addingToColumn, setAddingToColumn] = React.useState<string | null>(null);
  const [newCardTitle, setNewCardTitle] = React.useState("");

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }),
  );

  const findColumnByCardId = React.useCallback(
    (cardId: string) => columns.find((col) => col.cards.some((c) => c.id === cardId)),
    [columns],
  );

  const handleDragStart = (event: DragStartEvent) => {
    const column = findColumnByCardId(String(event.active.id));
    setActiveCard(column?.cards.find((c) => c.id === String(event.active.id)) ?? null);
  };

  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event;
    if (!over) return;

    const activeId = String(active.id);
    const overId = String(over.id);
    if (activeId === overId) return;

    const activeColumn = findColumnByCardId(activeId);
    const overColumn = findColumnByCardId(overId) ?? columns.find((col) => col.id === overId);

    if (!activeColumn || !overColumn || activeColumn.id === overColumn.id) return;

    setColumns((prev) => {
      const activeCards = [...activeColumn.cards];
      const overCards = [...overColumn.cards];

      const activeIndex = activeCards.findIndex((c) => c.id === activeId);
      const [card] = activeCards.splice(activeIndex, 1);

      const overCardIndex = overCards.findIndex((c) => c.id === overId);
      overCards.splice(overCardIndex >= 0 ? overCardIndex : overCards.length, 0, card);

      return prev.map((col) => {
        if (col.id === activeColumn.id) return { ...col, cards: activeCards };
        if (col.id === overColumn.id) return { ...col, cards: overCards };
        return col;
      });
    });
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveCard(null);
    if (!over) return;

    const activeId = String(active.id);
    const overId = String(over.id);
    if (activeId === overId) return;

    const activeColumn = findColumnByCardId(activeId);
    if (!activeColumn) return;

    const oldIndex = activeColumn.cards.findIndex((c) => c.id === activeId);
    const newIndex = activeColumn.cards.findIndex((c) => c.id === overId);
    if (newIndex === -1) return;

    setColumns((prev) =>
      prev.map((col) =>
        col.id === activeColumn.id
          ? { ...col, cards: arrayMove(col.cards, oldIndex, newIndex) }
          : col,
      ),
    );
  };

  const handleAddCard = (columnId: string) => {
    const title = newCardTitle.trim();
    if (!title) return;
    setColumns((prev) =>
      prev.map((col) =>
        col.id === columnId
          ? {
              ...col,
              cards: [...col.cards, { id: `card-${Date.now()}-${Math.random()}`, title }],
            }
          : col,
      ),
    );
    setNewCardTitle("");
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
            className="flex w-72 shrink-0 flex-col rounded-lg border border-border bg-muted/30"
          >
            <div className="flex items-center gap-2 px-4 py-3">
              <h3 className="text-sm font-semibold">{column.title}</h3>
              <span className="flex h-5 min-w-[1.25rem] items-center justify-center rounded-full bg-muted px-1.5 text-xs font-medium text-muted-foreground">
                {column.cards.length}
              </span>
            </div>

            <ScrollArea className="flex-1 px-3">
              <DroppableColumnCards columnId={column.id} cards={column.cards} />
            </ScrollArea>

            <div className="p-3 pt-2">
              {addingToColumn === column.id ? (
                <div className="space-y-2">
                  <Input
                    autoFocus
                    placeholder="Card title..."
                    value={newCardTitle}
                    onChange={(e) => setNewCardTitle(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") handleAddCard(column.id);
                      if (e.key === "Escape") {
                        setAddingToColumn(null);
                        setNewCardTitle("");
                      }
                    }}
                  />
                  <div className="flex gap-2">
                    <Button size="sm" className="flex-1" onClick={() => handleAddCard(column.id)}>
                      Add card
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setAddingToColumn(null);
                        setNewCardTitle("");
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
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                    className="mr-1"
                  >
                    <line x1="12" y1="5" x2="12" y2="19" />
                    <line x1="5" y1="12" x2="19" y2="12" />
                  </svg>
                  Add card
                </Button>
              )}
            </div>
          </div>
        ))}

        <DragOverlay>
          {activeCard && <KanbanCardDisplay card={activeCard} isDragging />}
        </DragOverlay>
      </DndContext>
    </div>
  );
}

KanbanBoard.displayName = "KanbanBoard";
