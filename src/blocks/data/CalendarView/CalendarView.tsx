import * as React from "react";
import {
  format,
  isSameMonth,
  isSameDay,
  addMonths,
  subMonths,
  isToday,
} from "date-fns";
import type { CalendarDay } from "react-day-picker";
import { Calendar } from "@/components/Calendar";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/Card";
import { Button } from "@/components/Button";
import { ScrollArea } from "@/components/ScrollArea";
import { cn } from "@/lib/utils";

export interface CalendarEvent {
  id: string;
  title: string;
  date: Date;
  endDate?: Date;
  description?: string;
  color?: "default" | "primary" | "secondary" | "destructive" | "outline";
  allDay?: boolean;
}

export interface CalendarViewProps extends React.HTMLAttributes<HTMLDivElement> {
  events?: CalendarEvent[];
  selectedDate?: Date;
  onDateSelect?: (date: Date) => void;
  onEventClick?: (event: CalendarEvent) => void;
  title?: string;
  description?: string;
  initialMonth?: Date;
  onMonthChange?: (month: Date) => void;
  showEventList?: boolean;
  maxEventsPerDay?: number;
}

const eventColorMap: Record<NonNullable<CalendarEvent["color"]>, string> = {
  default: "bg-primary text-primary-foreground",
  primary: "bg-primary text-primary-foreground",
  secondary: "bg-secondary text-secondary-foreground",
  destructive: "bg-destructive text-destructive-foreground",
  outline: "bg-transparent border border-border text-foreground",
};

function CalendarViewInner(
  {
    events = [],
    selectedDate,
    onDateSelect,
    onEventClick,
    title = "Calendar",
    description,
    initialMonth = new Date(),
    onMonthChange,
    showEventList = true,
    maxEventsPerDay = 3,
    className,
    ref,
    ...props
  }: CalendarViewProps & { ref?: React.Ref<HTMLDivElement> }
) {
  const [currentMonth, setCurrentMonth] = React.useState(initialMonth);
  const [internalSelectedDate, setInternalSelectedDate] = React.useState<Date | undefined>(
    selectedDate ?? new Date()
  );

  React.useEffect(() => {
    if (selectedDate !== undefined) setInternalSelectedDate(selectedDate);
  }, [selectedDate]);

  const effectiveSelectedDate = selectedDate ?? internalSelectedDate;

  const handleSelect = React.useCallback(
    (date: Date | undefined) => {
      if (!date) return;
      setInternalSelectedDate(date);
      onDateSelect?.(date);
    },
    [onDateSelect]
  );

  const handleMonthChange = React.useCallback(
    (month: Date) => {
      setCurrentMonth(month);
      onMonthChange?.(month);
    },
    [onMonthChange]
  );

  const goToPreviousMonth = () => handleMonthChange(subMonths(currentMonth, 1));
  const goToNextMonth = () => handleMonthChange(addMonths(currentMonth, 1));
  const goToToday = () => {
    const today = new Date();
    handleMonthChange(today);
    handleSelect(today);
  };

  const getEventsForDay = React.useCallback(
    (date: Date) =>
      events.filter((event) => {
        const eventDate = new Date(event.date);
        return (
          eventDate.getFullYear() === date.getFullYear() &&
          eventDate.getMonth() === date.getMonth() &&
          eventDate.getDate() === date.getDate()
        );
      }),
    [events]
  );

  const selectedDayEvents = getEventsForDay(effectiveSelectedDate ?? new Date());

  return (
    <div ref={ref} className={cn("flex flex-col gap-4 lg:flex-row", className)} {...props}>
      <Card className="flex-1">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <div>
            <CardTitle className="text-base">{title}</CardTitle>
            {description && <CardDescription className="text-xs">{description}</CardDescription>}
          </div>
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="sm" onClick={goToToday} className="h-8 px-2 text-xs">
              Today
            </Button>
            <Button variant="ghost" size="icon" onClick={goToPreviousMonth} className="h-8 w-8" aria-label="Previous month">
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
                <path d="m15 18-6-6 6-6" />
              </svg>
            </Button>
            <span className="min-w-[8rem] text-center text-sm font-medium">
              {format(currentMonth, "MMMM yyyy")}
            </span>
            <Button variant="ghost" size="icon" onClick={goToNextMonth} className="h-8 w-8" aria-label="Next month">
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
                <path d="m9 18 6-6-6-6" />
              </svg>
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-3">
          <Calendar
            mode="single"
            selected={effectiveSelectedDate}
            onSelect={handleSelect}
            month={currentMonth}
            onMonthChange={handleMonthChange}
            className="w-full"
            components={{
              Day: ({ day }: { day: CalendarDay }) => {
                const date = day.date;
                const dayEvents = getEventsForDay(date);
                const hasEvents = dayEvents.length > 0;
                const isCurrentMonth = isSameMonth(date, currentMonth);
                const isSelected = effectiveSelectedDate ? isSameDay(date, effectiveSelectedDate) : false;
                const today = isToday(date);

                return (
                  <div
                    className={cn(
                      "relative flex h-9 w-9 flex-col items-center justify-center rounded-md text-sm",
                      !isCurrentMonth && "text-muted-foreground/40",
                      isCurrentMonth && !isSelected && !today && "hover:bg-accent hover:text-accent-foreground",
                      isSelected && "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground",
                      today && !isSelected && "ring-1 ring-primary text-primary"
                    )}
                  >
                    <span>{date.getDate()}</span>
                    {hasEvents && isCurrentMonth && (
                      <div className="absolute bottom-0.5 left-1/2 flex -translate-x-1/2 gap-0.5">
                        {dayEvents.slice(0, maxEventsPerDay).map((event) => (
                          <div
                            key={event.id}
                            className={cn(
                              "h-1 w-1 rounded-full",
                              isSelected
                                ? "bg-primary-foreground/70"
                                : event.color && event.color !== "default"
                                ? eventColorMap[event.color]
                                : "bg-primary"
                            )}
                          />
                        ))}
                        {dayEvents.length > maxEventsPerDay && (
                          <span className="text-[8px] text-muted-foreground">+</span>
                        )}
                      </div>
                    )}
                  </div>
                );
              },
            }}
          />
        </CardContent>
      </Card>

      {showEventList && (
        <Card className="w-full lg:w-72">
          <CardHeader className="pb-3">
            <CardTitle className="text-base">
              {effectiveSelectedDate ? format(effectiveSelectedDate, "EEEE") : "Events"}
            </CardTitle>
            {effectiveSelectedDate && (
              <CardDescription className="text-xs">
                {format(effectiveSelectedDate, "MMMM d, yyyy")}
              </CardDescription>
            )}
          </CardHeader>
          <CardContent className="p-0">
            <ScrollArea className="h-[300px] px-4 lg:h-[400px]">
              {selectedDayEvents.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-8 text-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="mb-2 text-muted-foreground"
                    aria-hidden="true"
                  >
                    <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
                    <line x1="16" x2="16" y1="2" y2="6" />
                    <line x1="8" x2="8" y1="2" y2="6" />
                    <line x1="3" x2="21" y1="10" y2="10" />
                  </svg>
                  <p className="text-sm text-muted-foreground">No events scheduled</p>
                  <p className="mt-1 text-xs text-muted-foreground/60">
                    Select a day to view events
                  </p>
                </div>
              ) : (
                <div className="space-y-2 pb-4">
                  {selectedDayEvents.slice(0, maxEventsPerDay).map((event) => (
                    <button
                      key={event.id}
                      type="button"
                      onClick={() => onEventClick?.(event)}
                      className="flex w-full items-start gap-3 rounded-md border border-border bg-background p-3 text-left transition-colors hover:bg-accent hover:text-accent-foreground"
                    >
                      <div
                        className={cn(
                          "mt-0.5 h-2 w-2 shrink-0 rounded-full",
                          event.color && event.color !== "default"
                            ? event.color === "destructive"
                              ? "bg-destructive"
                              : event.color === "secondary"
                              ? "bg-secondary"
                              : event.color === "outline"
                              ? "bg-border"
                              : "bg-primary"
                            : "bg-primary"
                        )}
                      />
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-medium leading-snug">{event.title}</p>
                        {event.allDay ? (
                          <p className="text-xs text-muted-foreground">All day</p>
                        ) : (
                          <p className="text-xs text-muted-foreground">
                            {format(new Date(event.date), "h:mm a")}
                            {event.endDate && ` – ${format(new Date(event.endDate), "h:mm a")}`}
                          </p>
                        )}
                        {event.description && (
                          <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">
                            {event.description}
                          </p>
                        )}
                      </div>
                    </button>
                  ))}
                  {selectedDayEvents.length > maxEventsPerDay && (
                    <p className="px-3 py-2 text-xs text-muted-foreground">
                      +{selectedDayEvents.length - maxEventsPerDay} more events
                    </p>
                  )}
                </div>
              )}
            </ScrollArea>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

export const CalendarView = React.forwardRef(CalendarViewInner) as <
  T extends HTMLDivElement,
>(
  props: CalendarViewProps & { ref?: React.Ref<T> }
) => React.ReactElement;

(CalendarView as React.ForwardRefExoticComponent<CalendarViewProps>).displayName = "CalendarView";
