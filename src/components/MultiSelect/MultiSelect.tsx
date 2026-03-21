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
        sm: "min-h-8 px-2.5 py-1 text-xs",
        md: "min-h-10 px-3 py-2 text-sm",
        lg: "min-h-12 px-4 py-2 text-base",
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
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "value" | "onChange">,
    VariantProps<typeof multiSelectTriggerVariants> {
  options: MultiSelectOption[];
  value?: string[];
  onValueChange?: (values: string[]) => void;
  placeholder?: string;
  searchPlaceholder?: string;
  emptyText?: string;
  maxCount?: number;
  disabled?: boolean;
}

function MultiSelect({
      className,
      size,
      options,
      value = [],
      onValueChange,
      placeholder = "Select options...",
      searchPlaceholder = "Search...",
      emptyText = "No results found.",
      maxCount = 3,
      disabled, ref,
      ...props
    }: MultiSelectProps & { ref?: React.Ref<HTMLDivElement> }) {
    const [open, setOpen] = React.useState(false);
    const listboxId = React.useId();

    const handleSelect = (optionValue: string) => {
      const newValue = value.includes(optionValue)
        ? value.filter((v) => v !== optionValue)
        : [...value, optionValue];
      onValueChange?.(newValue);
    };

    const handleRemove = (optionValue: string, e: React.MouseEvent | React.KeyboardEvent) => {
      e.stopPropagation();
      onValueChange?.(value.filter((v) => v !== optionValue));
    };

    const visibleValues = value.slice(0, maxCount);
    const hiddenCount = value.length - visibleValues.length;

    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <div
            ref={ref}
            role="combobox"
            aria-expanded={open}
            aria-haspopup="listbox"
            aria-multiselectable="true"
            aria-controls={listboxId}
            aria-disabled={disabled ? true : undefined}
            tabIndex={disabled ? -1 : 0}
            onKeyDown={(e) => {
              if ((e.key === "Enter" || e.key === " ") && !disabled) {
                e.preventDefault();
                setOpen((prev) => !prev);
              }
            }}
            className={cn(
              multiSelectTriggerVariants({ size }),
              disabled && "cursor-not-allowed opacity-50 pointer-events-none",
              "cursor-pointer",
              className
            )}
            {...props}
          >
            <div className="flex flex-1 flex-wrap gap-1 overflow-hidden">
              {value.length === 0 ? (
                <span className="text-muted-foreground">{placeholder}</span>
              ) : (
                <>
                  {visibleValues.map((v) => {
                    const opt = options.find((o) => o.value === v);
                    return (
                      <Badge
                        key={v}
                        variant="secondary"
                        className="flex items-center gap-1 rounded pr-0.5"
                      >
                        {opt?.label ?? v}
                        <button
                          type="button"
                          aria-label={`Remove ${opt?.label ?? v}`}
                          className="ml-0.5 rounded-full p-0.5 hover:bg-secondary-foreground/20 focus:outline-none focus:ring-1 focus:ring-ring"
                          onClick={(e) => handleRemove(v, e)}
                          onKeyDown={(e) => {
                            if (e.key === "Enter" || e.key === " ") {
                              e.preventDefault();
                              handleRemove(v, e);
                            }
                          }}
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
                    <Badge variant="secondary">+{hiddenCount} more</Badge>
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
          </div>
        </PopoverTrigger>
        <PopoverContent className="w-[--radix-popover-trigger-width] p-0" align="start">
          <Command>
            <CommandInput placeholder={searchPlaceholder} />
            <CommandList id={listboxId}>
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
                    >
                      <div
                        className={cn(
                          "mr-2 flex h-4 w-4 shrink-0 items-center justify-center rounded-sm border border-primary",
                          isSelected
                            ? "bg-primary text-primary-foreground"
                            : "opacity-50"
                        )}
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

MultiSelect.displayName = "MultiSelect";

export { MultiSelect, multiSelectTriggerVariants };
