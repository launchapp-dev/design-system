import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";
import { Popover, PopoverContent, PopoverTrigger } from "../Popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../Command";
import { Badge } from "../Badge";

const multiSelectTriggerVariants = cva(
  "flex w-full items-center justify-between gap-2 rounded-md border border-input bg-background text-foreground ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      size: {
        sm: "min-h-11 md:min-h-8 px-3 md:px-2.5 py-2 md:py-1 text-sm md:text-xs min-h-[44px] md:min-h-0",
        md: "min-h-12 md:min-h-10 px-4 md:px-3 py-3 md:py-2 text-base md:text-sm min-h-[44px] md:min-h-0",
        lg: "min-h-12 px-4 py-2 text-base min-h-[44px]",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

export interface MultiSelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface MultiSelectProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "value" | "onChange">,
    VariantProps<typeof multiSelectTriggerVariants> {
  options: MultiSelectOption[];
  value?: string[];
  onValueChange?: (values: string[]) => void;
  placeholder?: string;
  searchPlaceholder?: string;
  emptyText?: string;
  maxCount?: number;
}

const MultiSelect = React.forwardRef<HTMLButtonElement, MultiSelectProps>(
  (
    {
      className,
      size,
      options,
      value = [],
      onValueChange,
      placeholder = "Select options...",
      searchPlaceholder = "Search...",
      emptyText = "No results found.",
      maxCount = 3,
      disabled,
      id,
      ...props
    },
    ref
  ) => {
    const [open, setOpen] = React.useState(false);
    const [focusedTagIndex, setFocusedTagIndex] = React.useState<number | null>(null);
    const listboxId = React.useId();
    const triggerId = id || React.useId();
    const tagRefs = React.useRef<(HTMLSpanElement | null)[]>([]);
    const internalRef = React.useRef<HTMLButtonElement>(null);
    const composedRef = ref || internalRef;

    const handleSelect = (optionValue: string) => {
      const newValue = value.includes(optionValue)
        ? value.filter((v) => v !== optionValue)
        : [...value, optionValue];
      onValueChange?.(newValue);
    };

    const handleRemove = (optionValue: string, e?: React.MouseEvent | React.KeyboardEvent) => {
      e?.stopPropagation();
      onValueChange?.(value.filter((v) => v !== optionValue));
    };

    const handleTriggerKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
      if (disabled) return;

      if (e.key === "ArrowDown" || e.key === "ArrowUp") {
        e.preventDefault();
        setOpen(true);
      } else if (e.key === "Enter" || e.key === " ") {
        if (focusedTagIndex !== null && value.length > 0) {
          e.preventDefault();
          const tagToRemove = value[focusedTagIndex];
          if (tagToRemove) {
            handleRemove(tagToRemove, e);
            setFocusedTagIndex(null);
          }
        } else {
          e.preventDefault();
          setOpen(!open);
        }
      } else if (e.key === "Escape") {
        setOpen(false);
      } else if (e.key === "Backspace" || e.key === "Delete") {
        if (focusedTagIndex !== null && value.length > 0) {
          e.preventDefault();
          const tagToRemove = value[focusedTagIndex];
          if (tagToRemove) {
            handleRemove(tagToRemove, e);
            const newIndex = Math.min(focusedTagIndex, value.length - 2);
            setFocusedTagIndex(newIndex >= 0 ? newIndex : null);
          }
        }
      } else if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
        if (value.length > 0) {
          e.preventDefault();
          const direction = e.key === "ArrowLeft" ? -1 : 1;
          setFocusedTagIndex((prev) => {
            if (prev === null) {
              return direction === 1 ? 0 : value.length - 1;
            }
            const next = prev + direction;
            if (next < 0 || next >= value.length) {
              return null;
            }
            return next;
          });
        }
      }
    };

    const visibleValues = value.slice(0, maxCount);
    const hiddenCount = value.length - visibleValues.length;

    const selectedLabels = React.useMemo(() => {
      return value.map((v) => options.find((o) => o.value === v)?.label ?? v);
    }, [value, options]);

    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <button
            ref={composedRef}
            id={triggerId}
            role="combobox"
            aria-expanded={open}
            aria-haspopup="listbox"
            aria-multiselectable="true"
            aria-controls={listboxId}
            aria-label={
              value.length > 0
                ? `${selectedLabels.length} selected: ${selectedLabels.join(", ")}`
                : placeholder
            }
            disabled={disabled}
            className={cn(multiSelectTriggerVariants({ size }), className)}
            onKeyDown={handleTriggerKeyDown}
            {...props}
          >
            <div className="flex flex-1 flex-wrap gap-1 overflow-hidden">
              {value.length === 0 ? (
                <span className="text-muted-foreground">{placeholder}</span>
              ) : (
                <>
                  {visibleValues.map((v, index) => {
                    const opt = options.find((o) => o.value === v);
                    return (
                      <Badge
                        key={v}
                        variant="secondary"
                        className={cn(
                          "flex items-center gap-1 rounded pe-0.5",
                          focusedTagIndex === index && "ring-2 ring-ring"
                        )}
                        ref={(el) => {
                          tagRefs.current[index] = el;
                        }}
                        tabIndex={-1}
                        aria-label={`${opt?.label ?? v}, press Backspace or Delete to remove`}
                      >
                        <span>{opt?.label ?? v}</span>
                        <button
                          type="button"
                          aria-label={`Remove ${opt?.label ?? v}`}
                          className="ms-0.5 rounded-full p-0.5 hover:bg-secondary-foreground/20 focus:outline-none focus:ring-1 focus:ring-ring"
                          onClick={(e) => handleRemove(v, e)}
                          onKeyDown={(e) => {
                            if (e.key === "Enter" || e.key === " ") {
                              e.preventDefault();
                              handleRemove(v, e);
                            }
                          }}
                          tabIndex={-1}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="10"
                            height="10"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            aria-hidden="true"
                          >
                            <path d="M18 6 6 18" />
                            <path d="m6 6 12 12" />
                          </svg>
                        </button>
                      </Badge>
                    );
                  })}
                  {hiddenCount > 0 && (
                    <Badge variant="secondary" aria-label={`${hiddenCount} more items selected`}>
                      +{hiddenCount} more
                    </Badge>
                  )}
                </>
              )}
            </div>
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
              className="shrink-0 opacity-50"
              aria-hidden="true"
            >
              <path d="m7 15 5 5 5-5" />
              <path d="m7 9 5-5 5 5" />
            </svg>
          </button>
        </PopoverTrigger>
        <PopoverContent className="w-[--radix-popover-trigger-width] p-0" align="start">
          <Command>
            <CommandInput placeholder={searchPlaceholder} />
            <CommandList id={listboxId} role="listbox" aria-multiselectable="true">
              <CommandEmpty>{emptyText}</CommandEmpty>
              <CommandGroup>
                {options.map((option) => {
                  const isSelected = value.includes(option.value);
                  return (
                    <CommandItem
                      key={option.value}
                      value={option.label}
                      disabled={option.disabled}
                      onSelect={() => handleSelect(option.value)}
                      aria-selected={isSelected}
                      role="option"
                      aria-checked={isSelected}
                    >
                      <div
                        className={cn(
                          "me-2 flex h-4 w-4 shrink-0 items-center justify-center rounded-sm border border-primary",
                          isSelected
                            ? "bg-primary text-primary-foreground"
                            : "opacity-50"
                        )}
                        aria-hidden="true"
                      >
                        {isSelected && (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="12"
                            height="12"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            aria-hidden="true"
                          >
                            <path d="M20 6 9 17l-5-5" />
                          </svg>
                        )}
                      </div>
                      {option.label}
                    </CommandItem>
                  );
                })}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    );
  }
);

MultiSelect.displayName = "MultiSelect";

export { MultiSelect, multiSelectTriggerVariants };
