import { format } from "date-fns";
import * as React from "react";
import { cn } from "../../lib/utils";
import { Calendar, type CalendarProps } from "../Calendar";
import { Popover, PopoverContent, PopoverTrigger } from "../Popover";

const CalendarIcon = () => (
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
    <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
    <line x1="16" x2="16" y1="2" y2="6" />
    <line x1="8" x2="8" y1="2" y2="6" />
    <line x1="3" x2="21" y1="10" y2="10" />
  </svg>
);

export interface DatePickerProps {
  selected?: Date;
  onSelect?: (date: Date | undefined) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  dateFormat?: string;
  calendarProps?: Omit<CalendarProps, "mode" | "selected" | "onSelect">;
}

function DatePicker({
  selected,
  onSelect,
  placeholder = "Pick a date",
  disabled,
  className,
  dateFormat = "PPP",
  calendarProps,
  ref,
}: DatePickerProps & { ref?: React.Ref<HTMLButtonElement> }) {
  const [open, setOpen] = React.useState(false);
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          ref={ref}
          disabled={disabled}
          aria-label={selected ? format(selected, dateFormat) : placeholder}
          aria-haspopup="dialog"
          aria-expanded={open}
          className={cn(
            "flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
            "disabled:cursor-not-allowed disabled:opacity-50",
            !selected && "text-muted-foreground",
            className,
          )}
        >
          <span className="truncate">
            {selected ? format(selected, dateFormat) : placeholder}
          </span>
          <CalendarIcon />
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={selected}
          onSelect={onSelect}
          autoFocus
          {...calendarProps}
        />
      </PopoverContent>
    </Popover>
  );
}

DatePicker.displayName = "DatePicker";

export { DatePicker };
