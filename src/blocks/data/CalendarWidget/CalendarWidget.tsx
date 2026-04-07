import * as React from "react";
import {
  format,
  isSameDay,
  addMonths,
  subMonths,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addDays,
  isSameMonth,
  isToday,
} from "date-fns";
import { Button } from "@/components/Button";
import { cn } from "@/lib/utils";

export interface CalendarWidgetEvent {
  id: string;
  title: string;
  date: Date;
  color?: "primary" | "secondary" | "destructive" | "accent";
  allDay?: boolean;
}

export interface CalendarWidgetProps extends React.HTMLAttributes<HTMLDivElement> {
  events?: CalendarWidgetEvent[];
  selectedDate?: Date;
  onDateSelect?: (date: Date) => void;
  onEventClick?: (event: CalendarWidgetEvent) => void;
  initialMonth?: Date;
}

const eventDotColors: Record<NonNullable<CalendarWidgetEvent["color"]>, string> = {
  primary: "bg-primary",
  secondary: "bg-secondary",
  destructive: "bg-destructive",
  accent: "bg-accent",
};

function ChevronLeft() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="m15 18-6-6 6-6" />
    </svg>
  );
}

function ChevronRight() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="m9 18 6-6-6-6" />
    </svg>
  );
}

function CalendarWidget({
  events = [],
  selectedDate,
  onDateSelect,
  onEventClick,
  initialMonth = new Date(),
  className,
  ...props
}: CalendarWidgetProps) {
  const [currentMonth, setCurrentMonth] = React.useState(initialMonth);
  const [internalSelected, setInternalSelected] = React.useState<Date | undefined>(selectedDate);

  React.useEffect(() => {
    if (selectedDate !== undefined) setInternalSelected(selectedDate);
  }, [selectedDate]);

  const effectiveSelected = selectedDate ?? internalSelected;

  const goToPrev = () => setCurrentMonth((m) => subMonths(m, 1));
  const goToNext = () => setCurrentMonth((m) => addMonths(m, 1));

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(monthStart);
  const calStart = startOfWeek(monthStart, { weekStartsOn: 0 });
  const calEnd = endOfWeek(monthEnd, { weekStartsOn: 0 });

  const days: Date[] = [];
  let d = calStart;
  while (d <= calEnd) {
    days.push(d);
    d = addDays(d, 1);
  }

  const getEventsForDay = (date: Date) =>
    events.filter((e) => isSameDay(e.date, date));

  const WEEKS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

  const handleDateClick = (date: Date) => {
    setInternalSelected(date);
    onDateSelect?.(date);
  };

  return (
    <div
      ref={((props as { ref?: React.Ref<HTMLDivElement> }).ref) as React.Ref<HTMLDivElement>}
      className={cn("rounded-lg border bg-card", className)}
      {...props}
    >
      <div className="flex items-center justify-between border-b px-4 py-3">
        <Button variant="ghost" size="icon" className="h-7 w-7" onClick={goToPrev} aria-label="Previous month">
          <ChevronLeft />
        </Button>
        <span className="text-sm font-semibold">{format(currentMonth, "MMMM yyyy")}</span>
        <Button variant="ghost" size="icon" className="h-7 w-7" onClick={goToNext} aria-label="Next month">
          <ChevronRight />
        </Button>
      </div>

      <div className="grid grid-cols-7 border-b">
        {WEEKS.map((day) => (
          <div
            key={day}
            className="py-1.5 text-center text-xs font-semibold uppercase tracking-wider text-muted-foreground"
          >
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7">
        {days.map((day, i) => {
          const dayEvents = getEventsForDay(day);
          const isCurrentMonth = isSameMonth(day, currentMonth);
          const isSelected = effectiveSelected && isSameDay(day, effectiveSelected);
          const today = isToday(day);

          return (
            <button
              key={i}
              onClick={() => handleDateClick(day)}
              className={cn(
                "group relative flex min-h-[3.5rem] flex-col items-center justify-start gap-0.5 border-b border-r px-1 py-1.5 text-sm transition-colors hover:bg-accent",
                i % 7 === 6 && "border-r-0",
                Math.floor(i / 7) === Math.floor((days.length - 1) / 7) && "border-b-0",
                !isCurrentMonth && "text-muted-foreground/50",
                isSelected && "bg-accent",
              )}
              aria-label={format(day, "EEEE, MMMM d, yyyy")}
            >
              <span
                className={cn(
                  "flex h-6 w-6 items-center justify-center rounded-full text-xs",
                  today && "bg-primary text-primary-foreground font-bold",
                  isSelected && !today && "bg-accent font-semibold",
                )}
              >
                {format(day, "d")}
              </span>
              {dayEvents.length > 0 && (
                <div className="flex flex-wrap items-center justify-center gap-0.5">
                  {dayEvents.slice(0, 3).map((ev) => (
                    <button
                      key={ev.id}
                      onClick={(e) => {
                        e.stopPropagation();
                        onEventClick?.(ev);
                      }}
                      className={cn(
                        "h-1.5 w-1.5 rounded-full",
                        eventDotColors[ev.color ?? "primary"],
                      )}
                      aria-label={ev.title}
                    />
                  ))}
                  {dayEvents.length > 3 && (
                    <span className="text-[9px] text-muted-foreground">+{dayEvents.length - 3}</span>
                  )}
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

CalendarWidget.displayName = "CalendarWidget";

export { CalendarWidget };
