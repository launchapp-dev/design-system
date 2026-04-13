import * as React from "react";
import {
  DndContext,
  type DragEndEvent,
  DragOverlay,
  PointerSensor,
  useDraggable,
  useDroppable,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  addDays,
  addMonths,
  differenceInMilliseconds,
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  isSameDay,
  isSameMonth,
  isToday,
  setHours,
  setMinutes,
  startOfDay,
  startOfMonth,
  startOfWeek,
  subMonths,
} from "date-fns";
import { CSS } from "@dnd-kit/utilities";
import { Badge } from "@/components/Badge";
import { Button } from "@/components/Button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/Card";
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
} from "@/components/Dialog";
import { Input } from "@/components/Input";
import { Label } from "@/components/Label";
import { ScrollArea } from "@/components/ScrollArea";
import { Textarea } from "@/components/Textarea";
import { cn } from "@/lib/utils";

export type CalendarViewMode = "month" | "week" | "day";

export interface CalendarEvent {
  id: string;
  title: string;
  date: Date | string;
  endDate?: Date | string;
  description?: string;
  color?: "default" | "primary" | "secondary" | "destructive" | "outline";
  allDay?: boolean;
}

export interface CalendarEventCreateInput {
  title: string;
  date: Date;
  endDate?: Date;
  description?: string;
  color: NonNullable<CalendarEvent["color"]>;
  allDay: boolean;
}

export interface CalendarViewProps extends React.HTMLAttributes<HTMLDivElement> {
  events?: CalendarEvent[];
  selectedDate?: Date;
  onDateSelect?: (date: Date) => void;
  onEventClick?: (event: CalendarEvent) => void;
  onEventCreate?: (event: CalendarEventCreateInput) => void;
  onEventReschedule?: (event: CalendarEvent) => void;
  title?: string;
  description?: string;
  initialMonth?: Date;
  onMonthChange?: (month: Date) => void;
  showEventList?: boolean;
  maxEventsPerDay?: number;
  view?: CalendarViewMode;
  defaultView?: CalendarViewMode;
  onViewChange?: (view: CalendarViewMode) => void;
  showCreateButton?: boolean;
}

const hourSlots = Array.from({ length: 12 }, (_, index) => index + 8);

const eventColorMap: Record<NonNullable<CalendarEvent["color"]>, string> = {
  default: "border-border bg-muted text-foreground",
  primary: "border-primary bg-primary text-primary-foreground",
  secondary: "border-secondary bg-secondary text-secondary-foreground",
  destructive: "border-destructive bg-destructive text-destructive-foreground",
  outline: "border-border bg-background text-foreground",
};

const eventAccentMap: Record<NonNullable<CalendarEvent["color"]>, string> = {
  default: "bg-muted-foreground",
  primary: "bg-primary",
  secondary: "bg-secondary",
  destructive: "bg-destructive",
  outline: "bg-border",
};

function toDate(value: Date | string) {
  return value instanceof Date ? value : new Date(value);
}

function toDateInputValue(date: Date) {
  return format(date, "yyyy-MM-dd");
}

function toTimeInputValue(date: Date) {
  return format(date, "HH:mm");
}

function fromDateAndTime(dateValue: string, timeValue: string) {
  const [year, month, day] = dateValue.split("-").map(Number);
  const [hours, minutes] = timeValue.split(":").map(Number);
  return new Date(year, month - 1, day, hours, minutes);
}

function getEventStart(event: CalendarEvent) {
  return toDate(event.date);
}

function getEventEnd(event: CalendarEvent) {
  return event.endDate ? toDate(event.endDate) : undefined;
}

function eventDuration(event: CalendarEvent) {
  const start = getEventStart(event);
  const end = getEventEnd(event);
  return end ? Math.max(differenceInMilliseconds(end, start), 0) : 0;
}

function rescheduleEvent(event: CalendarEvent, nextStart: Date) {
  const duration = eventDuration(event);
  return {
    ...event,
    date: nextStart,
    endDate: duration > 0 ? new Date(nextStart.getTime() + duration) : undefined,
  };
}

function getCalendarDays(month: Date) {
  return eachDayOfInterval({
    start: startOfWeek(startOfMonth(month)),
    end: endOfWeek(endOfMonth(month)),
  });
}

function getWeekDays(date: Date) {
  return eachDayOfInterval({
    start: startOfWeek(date),
    end: endOfWeek(date),
  });
}

function normalizeEvents(events: CalendarEvent[]) {
  return events.map((event) => ({
    ...event,
    date: getEventStart(event),
    endDate: getEventEnd(event),
  }));
}

function sortEvents(events: CalendarEvent[]) {
  return [...events].sort((a, b) => getEventStart(a).getTime() - getEventStart(b).getTime());
}

function sameDayEvents(events: CalendarEvent[], date: Date) {
  return sortEvents(events.filter((event) => isSameDay(getEventStart(event), date)));
}

function formatEventTime(event: CalendarEvent) {
  if (event.allDay) return "All day";
  const start = getEventStart(event);
  const end = getEventEnd(event);
  return end ? `${format(start, "h:mm a")} - ${format(end, "h:mm a")}` : format(start, "h:mm a");
}

function calendarEventId(id: string) {
  return `calendar-event:${id}`;
}

function dayDropId(date: Date) {
  return `calendar-day:${toDateInputValue(date)}`;
}

function timeDropId(date: Date, hour: number) {
  return `calendar-time:${toDateInputValue(date)}:${hour}`;
}

function createEventId() {
  return `event-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

function CalendarEventCard({
  event,
  onClick,
  compact = false,
  isDragging = false,
}: {
  event: CalendarEvent;
  onClick?: (event: CalendarEvent) => void;
  compact?: boolean;
  isDragging?: boolean;
}) {
  const { attributes, listeners, setNodeRef, transform, isDragging: isDragSource } = useDraggable({
    id: calendarEventId(event.id),
  });
  const style = transform ? { transform: CSS.Translate.toString(transform) } : undefined;

  return (
    <button
      ref={setNodeRef}
      type="button"
      style={style}
      onClick={() => onClick?.(event)}
      className={cn(
        "flex w-full touch-none select-none items-start gap-2 rounded-md border px-2 py-1.5 text-left text-xs transition-shadow hover:shadow-sm",
        eventColorMap[event.color ?? "default"],
        isDragSource && "opacity-40",
        isDragging && "shadow-lg",
      )}
      {...attributes}
      {...listeners}
    >
      <span
        className={cn(
          "mt-1 h-2 w-2 shrink-0 rounded-full",
          event.color === "outline" ? "bg-foreground" : "bg-current",
        )}
        aria-hidden="true"
      />
      <span className="min-w-0 flex-1">
        <span className="block truncate font-medium">{event.title}</span>
        {!compact && <span className="block text-[11px] opacity-80">{formatEventTime(event)}</span>}
      </span>
    </button>
  );
}

function MonthDayCell({
  date,
  currentMonth,
  selectedDate,
  events,
  maxEvents,
  onSelectDate,
  onCreate,
  onEventClick,
}: {
  date: Date;
  currentMonth: Date;
  selectedDate?: Date;
  events: CalendarEvent[];
  maxEvents: number;
  onSelectDate: (date: Date) => void;
  onCreate: (date: Date) => void;
  onEventClick?: (event: CalendarEvent) => void;
}) {
  const { setNodeRef, isOver } = useDroppable({ id: dayDropId(date) });
  const isCurrentMonth = isSameMonth(date, currentMonth);
  const isSelected = selectedDate ? isSameDay(date, selectedDate) : false;

  return (
    <div
      ref={setNodeRef}
      className={cn(
        "min-h-[8rem] border-b border-r border-border bg-background p-2 transition-colors",
        !isCurrentMonth && "bg-muted/30 text-muted-foreground",
        isSelected && "bg-primary/5",
        isOver && "bg-accent",
      )}
    >
      <div className="mb-2 flex items-center justify-between gap-2">
        <button
          type="button"
          onClick={() => onSelectDate(date)}
          className={cn(
            "flex h-7 w-7 items-center justify-center rounded-md text-sm font-medium hover:bg-accent hover:text-accent-foreground",
            isToday(date) && "bg-primary text-primary-foreground",
            isSelected && !isToday(date) && "ring-1 ring-primary",
          )}
        >
          {format(date, "d")}
        </button>
        <button
          type="button"
          onClick={() => onCreate(date)}
          className="flex h-7 w-7 items-center justify-center rounded-md text-muted-foreground hover:bg-accent hover:text-accent-foreground"
          aria-label={`Create event on ${format(date, "MMMM d")}`}
        >
          <PlusIcon />
        </button>
      </div>
      <div className="space-y-1">
        {events.slice(0, maxEvents).map((event) => (
          <CalendarEventCard key={event.id} event={event} compact onClick={onEventClick} />
        ))}
        {events.length > maxEvents && (
          <button
            type="button"
            onClick={() => onSelectDate(date)}
            className="text-xs font-medium text-muted-foreground hover:text-foreground"
          >
            +{events.length - maxEvents} more
          </button>
        )}
      </div>
    </div>
  );
}

function TimeSlot({
  date,
  hour,
  children,
}: {
  date: Date;
  hour: number;
  children: React.ReactNode;
}) {
  const { setNodeRef, isOver } = useDroppable({ id: timeDropId(date, hour) });

  return (
    <div
      ref={setNodeRef}
      className={cn(
        "min-h-[4.5rem] border-b border-border p-2 transition-colors",
        isOver && "bg-accent",
      )}
    >
      {children}
    </div>
  );
}

function CalendarCreateDialog({
  open,
  selectedDate,
  onOpenChange,
  onCreate,
}: {
  open: boolean;
  selectedDate: Date;
  onOpenChange: (open: boolean) => void;
  onCreate: (event: CalendarEventCreateInput) => void;
}) {
  const [title, setTitle] = React.useState("");
  const [dateValue, setDateValue] = React.useState(toDateInputValue(selectedDate));
  const [startTime, setStartTime] = React.useState(toTimeInputValue(setMinutes(setHours(selectedDate, 9), 0)));
  const [endTime, setEndTime] = React.useState(toTimeInputValue(setMinutes(setHours(selectedDate, 10), 0)));
  const [description, setDescription] = React.useState("");
  const [allDay, setAllDay] = React.useState(false);
  const [color, setColor] = React.useState<NonNullable<CalendarEvent["color"]>>("primary");

  React.useEffect(() => {
    if (!open) return;
    setTitle("");
    setDateValue(toDateInputValue(selectedDate));
    setStartTime(toTimeInputValue(setMinutes(setHours(selectedDate, 9), 0)));
    setEndTime(toTimeInputValue(setMinutes(setHours(selectedDate, 10), 0)));
    setDescription("");
    setAllDay(false);
    setColor("primary");
  }, [open, selectedDate]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmedTitle = title.trim();
    if (!trimmedTitle) return;
    onCreate({
      title: trimmedTitle,
      date: allDay ? startOfDay(fromDateAndTime(dateValue, "00:00")) : fromDateAndTime(dateValue, startTime),
      endDate: allDay ? undefined : fromDateAndTime(dateValue, endTime),
      description: description.trim() || undefined,
      color,
      allDay,
    });
    onOpenChange(false);
  };

  return (
    <DialogRoot open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create event</DialogTitle>
          <DialogDescription>Schedule a CRM activity or admin milestone.</DialogDescription>
        </DialogHeader>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <Label htmlFor="calendar-event-title">Title</Label>
            <Input
              id="calendar-event-title"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              placeholder="Discovery call"
            />
          </div>
          <div className="grid gap-3 sm:grid-cols-3">
            <div className="space-y-2 sm:col-span-3">
              <Label htmlFor="calendar-event-date">Date</Label>
              <Input
                id="calendar-event-date"
                type="date"
                value={dateValue}
                onChange={(event) => setDateValue(event.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="calendar-event-start">Start</Label>
              <Input
                id="calendar-event-start"
                type="time"
                value={startTime}
                disabled={allDay}
                onChange={(event) => setStartTime(event.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="calendar-event-end">End</Label>
              <Input
                id="calendar-event-end"
                type="time"
                value={endTime}
                disabled={allDay}
                onChange={(event) => setEndTime(event.target.value)}
              />
            </div>
            <label className="flex items-center gap-2 rounded-md border border-border px-3 py-2 text-sm">
              <input
                type="checkbox"
                checked={allDay}
                onChange={(event) => setAllDay(event.target.checked)}
              />
              All day
            </label>
          </div>
          <div className="space-y-2">
            <Label htmlFor="calendar-event-color">Color</Label>
            <select
              id="calendar-event-color"
              value={color}
              onChange={(event) => setColor(event.target.value as NonNullable<CalendarEvent["color"]>)}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground"
            >
              <option value="primary">Primary</option>
              <option value="secondary">Secondary</option>
              <option value="default">Default</option>
              <option value="outline">Outline</option>
              <option value="destructive">Destructive</option>
            </select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="calendar-event-description">Description</Label>
            <Textarea
              id="calendar-event-description"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              placeholder="Add notes, location, or agenda"
            />
          </div>
          <DialogFooter>
            <Button type="button" variant="ghost" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">Create event</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </DialogRoot>
  );
}

function PlusIcon() {
  return (
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
    >
      <path d="M5 12h14" />
      <path d="M12 5v14" />
    </svg>
  );
}

function ChevronIcon({ direction }: { direction: "left" | "right" }) {
  return (
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
    >
      {direction === "left" ? <path d="m15 18-6-6 6-6" /> : <path d="m9 18 6-6-6-6" />}
    </svg>
  );
}

function CalendarViewInner(
  {
    events = [],
    selectedDate,
    onDateSelect,
    onEventClick,
    onEventCreate,
    onEventReschedule,
    title = "Calendar",
    description = "Plan customer touchpoints, internal milestones, and admin work.",
    initialMonth = new Date(),
    onMonthChange,
    showEventList = true,
    maxEventsPerDay = 3,
    view,
    defaultView = "month",
    onViewChange,
    showCreateButton = true,
    className,
    ref,
    ...props
  }: CalendarViewProps & { ref?: React.Ref<HTMLDivElement> },
) {
  const [currentMonth, setCurrentMonth] = React.useState(initialMonth);
  const [internalSelectedDate, setInternalSelectedDate] = React.useState<Date | undefined>(
    selectedDate ?? initialMonth,
  );
  const [internalView, setInternalView] = React.useState(defaultView);
  const [calendarEvents, setCalendarEvents] = React.useState<CalendarEvent[]>(() =>
    normalizeEvents(events),
  );
  const [createDate, setCreateDate] = React.useState(selectedDate ?? initialMonth);
  const [isCreateOpen, setIsCreateOpen] = React.useState(false);
  const [activeEvent, setActiveEvent] = React.useState<CalendarEvent | null>(null);

  React.useEffect(() => {
    setCalendarEvents(normalizeEvents(events));
  }, [events]);

  React.useEffect(() => {
    if (selectedDate !== undefined) setInternalSelectedDate(selectedDate);
  }, [selectedDate]);

  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 6 } }));
  const effectiveSelectedDate = selectedDate ?? internalSelectedDate ?? initialMonth;
  const effectiveView = view ?? internalView;
  const selectedDayEvents = sameDayEvents(calendarEvents, effectiveSelectedDate);
  const currentWeekDays = getWeekDays(effectiveSelectedDate);
  const monthDays = getCalendarDays(currentMonth);

  const handleSelectDate = React.useCallback(
    (date: Date) => {
      setInternalSelectedDate(date);
      if (!isSameMonth(date, currentMonth)) {
        setCurrentMonth(date);
        onMonthChange?.(date);
      }
      onDateSelect?.(date);
    },
    [currentMonth, onDateSelect, onMonthChange],
  );

  const handleViewChange = (nextView: CalendarViewMode) => {
    setInternalView(nextView);
    onViewChange?.(nextView);
  };

  const openCreateDialog = (date: Date) => {
    setCreateDate(date);
    setIsCreateOpen(true);
  };

  const handleCreateEvent = (event: CalendarEventCreateInput) => {
    const createdEvent: CalendarEvent = {
      ...event,
      id: createEventId(),
    };
    setCalendarEvents((current) => sortEvents([...current, createdEvent]));
    setInternalSelectedDate(event.date);
    onEventCreate?.(event);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    setActiveEvent(null);
    const activeId = String(event.active.id).replace("calendar-event:", "");
    const overId = event.over ? String(event.over.id) : "";
    const sourceEvent = calendarEvents.find((calendarEvent) => calendarEvent.id === activeId);
    if (!sourceEvent || !overId) return;

    const originalStart = getEventStart(sourceEvent);
    let nextStart: Date | undefined;
    if (overId.startsWith("calendar-day:")) {
      const nextDate = new Date(`${overId.replace("calendar-day:", "")}T00:00:00`);
      nextStart = sourceEvent.allDay
        ? startOfDay(nextDate)
        : setMinutes(setHours(nextDate, originalStart.getHours()), originalStart.getMinutes());
    }
    if (overId.startsWith("calendar-time:")) {
      const [, dateValue, hourValue] = overId.split(":");
      nextStart = setMinutes(setHours(new Date(`${dateValue}T00:00:00`), Number(hourValue)), 0);
    }
    if (!nextStart) return;

    const updatedEvent = rescheduleEvent(sourceEvent, nextStart);
    setCalendarEvents((current) =>
      sortEvents(current.map((calendarEvent) => (calendarEvent.id === activeId ? updatedEvent : calendarEvent))),
    );
    setInternalSelectedDate(nextStart);
    onEventReschedule?.(updatedEvent);
  };

  const goToPrevious = () => {
    if (effectiveView === "month") {
      const previousMonth = subMonths(currentMonth, 1);
      setCurrentMonth(previousMonth);
      onMonthChange?.(previousMonth);
      return;
    }
    handleSelectDate(addDays(effectiveSelectedDate, effectiveView === "week" ? -7 : -1));
  };

  const goToNext = () => {
    if (effectiveView === "month") {
      const nextMonth = addMonths(currentMonth, 1);
      setCurrentMonth(nextMonth);
      onMonthChange?.(nextMonth);
      return;
    }
    handleSelectDate(addDays(effectiveSelectedDate, effectiveView === "week" ? 7 : 1));
  };

  const goToToday = () => {
    const today = new Date();
    setCurrentMonth(today);
    handleSelectDate(today);
  };

  const rangeLabel =
    effectiveView === "month"
      ? format(currentMonth, "MMMM yyyy")
      : effectiveView === "week"
        ? `${format(currentWeekDays[0], "MMM d")} - ${format(currentWeekDays[6], "MMM d, yyyy")}`
        : format(effectiveSelectedDate, "EEEE, MMMM d");

  return (
    <div ref={ref} className={cn("flex flex-col gap-4", className)} {...props}>
      <DndContext
        sensors={sensors}
        onDragStart={(event) => {
          const id = String(event.active.id).replace("calendar-event:", "");
          setActiveEvent(calendarEvents.find((calendarEvent) => calendarEvent.id === id) ?? null);
        }}
        onDragEnd={handleDragEnd}
        onDragCancel={() => setActiveEvent(null)}
      >
        <Card>
          <CardHeader className="gap-4">
            <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
              <div>
                <CardTitle className="text-lg">{title}</CardTitle>
                {description && <CardDescription>{description}</CardDescription>}
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <Button variant="ghost" size="sm" onClick={goToToday}>
                  Today
                </Button>
                <div className="flex items-center rounded-md border border-border">
                  <Button variant="ghost" size="icon" onClick={goToPrevious} aria-label="Previous range">
                    <ChevronIcon direction="left" />
                  </Button>
                  <span className="min-w-[11rem] px-2 text-center text-sm font-medium">{rangeLabel}</span>
                  <Button variant="ghost" size="icon" onClick={goToNext} aria-label="Next range">
                    <ChevronIcon direction="right" />
                  </Button>
                </div>
                <div className="flex rounded-md border border-border p-0.5">
                  {(["month", "week", "day"] as const).map((mode) => (
                    <Button
                      key={mode}
                      variant={effectiveView === mode ? "default" : "ghost"}
                      size="sm"
                      className="capitalize"
                      onClick={() => handleViewChange(mode)}
                    >
                      {mode}
                    </Button>
                  ))}
                </div>
                {showCreateButton && (
                  <Button size="sm" onClick={() => openCreateDialog(effectiveSelectedDate)}>
                    <PlusIcon />
                    New event
                  </Button>
                )}
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            {effectiveView === "month" && (
              <div className="overflow-x-auto">
                <div className="min-w-[48rem]">
                  <div className="grid grid-cols-7 border-t border-l border-border bg-muted/40">
                    {currentWeekDays.map((day) => (
                      <div key={day.toISOString()} className="border-r border-border px-3 py-2 text-xs font-semibold text-muted-foreground">
                        {format(day, "EEE")}
                      </div>
                    ))}
                  </div>
                  <div className="grid grid-cols-7 border-l border-border">
                    {monthDays.map((day) => (
                      <MonthDayCell
                        key={day.toISOString()}
                        date={day}
                        currentMonth={currentMonth}
                        selectedDate={effectiveSelectedDate}
                        events={sameDayEvents(calendarEvents, day)}
                        maxEvents={maxEventsPerDay}
                        onSelectDate={handleSelectDate}
                        onCreate={openCreateDialog}
                        onEventClick={onEventClick}
                      />
                    ))}
                  </div>
                </div>
              </div>
            )}
            {effectiveView === "week" && (
              <div className="overflow-x-auto">
                <div className="min-w-[58rem]">
                  <div className="grid grid-cols-[4rem_repeat(7,minmax(0,1fr))] border-t border-border bg-muted/40">
                    <div className="border-r border-border" />
                    {currentWeekDays.map((day) => (
                      <button
                        key={day.toISOString()}
                        type="button"
                        onClick={() => handleSelectDate(day)}
                        className={cn(
                          "border-r border-border px-3 py-2 text-left text-sm font-medium",
                          isSameDay(day, effectiveSelectedDate) && "bg-primary/10 text-primary",
                        )}
                      >
                        <span className="block text-xs text-muted-foreground">{format(day, "EEE")}</span>
                        {format(day, "MMM d")}
                      </button>
                    ))}
                  </div>
                  {hourSlots.map((hour) => (
                    <div key={hour} className="grid grid-cols-[4rem_repeat(7,minmax(0,1fr))]">
                      <div className="border-r border-b border-border px-2 py-2 text-xs text-muted-foreground">
                        {format(setHours(startOfDay(effectiveSelectedDate), hour), "ha")}
                      </div>
                      {currentWeekDays.map((day) => {
                        const slotEvents = sameDayEvents(calendarEvents, day).filter((event) =>
                          event.allDay ? hour === 8 : getEventStart(event).getHours() === hour,
                        );
                        return (
                          <TimeSlot key={`${day.toISOString()}-${hour}`} date={day} hour={hour}>
                            <div className="space-y-1">
                              {slotEvents.map((event) => (
                                <CalendarEventCard key={event.id} event={event} onClick={onEventClick} />
                              ))}
                            </div>
                          </TimeSlot>
                        );
                      })}
                    </div>
                  ))}
                </div>
              </div>
            )}
            {effectiveView === "day" && (
              <div>
                {hourSlots.map((hour) => {
                  const slotEvents = selectedDayEvents.filter((event) =>
                    event.allDay ? hour === 8 : getEventStart(event).getHours() === hour,
                  );
                  return (
                    <div key={hour} className="grid grid-cols-[4.5rem_1fr]">
                      <div className="border-r border-b border-border px-3 py-3 text-xs text-muted-foreground">
                        {format(setHours(startOfDay(effectiveSelectedDate), hour), "ha")}
                      </div>
                      <TimeSlot date={effectiveSelectedDate} hour={hour}>
                        <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                          {slotEvents.map((event) => (
                            <CalendarEventCard key={event.id} event={event} onClick={onEventClick} />
                          ))}
                        </div>
                      </TimeSlot>
                    </div>
                  );
                })}
              </div>
            )}
          </CardContent>
        </Card>

        {showEventList && (
          <Card>
            <CardHeader className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <CardTitle className="text-base">{format(effectiveSelectedDate, "EEEE")}</CardTitle>
                <CardDescription>{format(effectiveSelectedDate, "MMMM d, yyyy")}</CardDescription>
              </div>
              <Button variant="outline" size="sm" onClick={() => openCreateDialog(effectiveSelectedDate)}>
                <PlusIcon />
                Add activity
              </Button>
            </CardHeader>
            <CardContent>
              {selectedDayEvents.length === 0 ? (
                <div className="rounded-md border border-dashed border-border p-8 text-center">
                  <p className="text-sm font-medium">No events scheduled</p>
                  <p className="mt-1 text-sm text-muted-foreground">Create an event or drag one here.</p>
                </div>
              ) : (
                <ScrollArea className="h-72">
                  <div className="space-y-3 pr-3">
                    {selectedDayEvents.map((event) => (
                      <button
                        key={event.id}
                        type="button"
                        onClick={() => onEventClick?.(event)}
                        className="flex w-full items-start gap-3 rounded-md border border-border bg-background p-3 text-left transition-colors hover:bg-accent hover:text-accent-foreground"
                      >
                        <span className={cn("mt-1 h-2.5 w-2.5 shrink-0 rounded-full", eventAccentMap[event.color ?? "default"])} />
                        <span className="min-w-0 flex-1">
                          <span className="block text-sm font-medium">{event.title}</span>
                          <span className="block text-xs text-muted-foreground">{formatEventTime(event)}</span>
                          {event.description && <span className="mt-1 block text-xs text-muted-foreground">{event.description}</span>}
                        </span>
                        {event.allDay && <Badge variant="outline">All day</Badge>}
                      </button>
                    ))}
                  </div>
                </ScrollArea>
              )}
            </CardContent>
          </Card>
        )}

        <DragOverlay>
          {activeEvent && <CalendarEventCard event={activeEvent} compact isDragging />}
        </DragOverlay>
      </DndContext>

      <CalendarCreateDialog
        open={isCreateOpen}
        selectedDate={createDate}
        onOpenChange={setIsCreateOpen}
        onCreate={handleCreateEvent}
      />
    </div>
  );
}

export const CalendarView = React.forwardRef(CalendarViewInner) as <T extends HTMLDivElement>(
  props: CalendarViewProps & { ref?: React.Ref<T> },
) => React.ReactElement;

(CalendarView as React.ForwardRefExoticComponent<CalendarViewProps>).displayName = "CalendarView";
