import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import { cn } from "../../lib/utils";
import { Popover, PopoverAnchor, PopoverContent } from "../Popover";

const tagInputVariants = cva(
  "flex flex-wrap items-center gap-1.5 w-full rounded-[--la-radius] border bg-[hsl(var(--la-background))] text-sm ring-offset-[hsl(var(--la-background))] transition-colors focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2",
  {
    variants: {
      size: {
        sm: "min-h-8 px-2 py-1.5 text-xs gap-1",
        md: "min-h-10 px-3 py-2 text-sm gap-1.5",
        lg: "min-h-12 px-4 py-3 text-base gap-2",
      },
      error: {
        true: "border-[hsl(var(--la-destructive))] focus-within:ring-[hsl(var(--la-destructive))]",
        false:
          "border-[hsl(var(--la-input))] focus-within:ring-[hsl(var(--la-ring))]",
      },
    },
    compoundVariants: [
      {
        size: "sm",
        error: false,
        className: "focus-within:ring-[hsl(var(--la-ring))]",
      },
    ],
    defaultVariants: {
      size: "md",
      error: false,
    },
  },
);

const tagVariants = cva(
  "inline-flex items-center gap-1 rounded-full font-medium transition-colors",
  {
    variants: {
      variant: {
        default:
          "bg-[hsl(var(--la-primary)/0.1)] text-[hsl(var(--la-primary))] hover:bg-[hsl(var(--la-primary)/0.2)]",
        secondary:
          "bg-[hsl(var(--la-secondary))] text-[hsl(var(--la-secondary-foreground))] hover:bg-[hsl(var(--la-secondary)/0.8)]",
        outline:
          "border border-[hsl(var(--la-border))] text-[hsl(var(--la-foreground))] hover:bg-[hsl(var(--la-accent))]",
      },
      size: {
        sm: "px-2 py-0.5 text-xs",
        md: "px-2.5 py-0.5 text-xs",
        lg: "px-3 py-1 text-sm",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  },
);

export interface TagInputProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange">,
    VariantProps<typeof tagInputVariants> {
  value: string[];
  onChange: (value: string[]) => void;
  suggestions?: string[];
  placeholder?: string;
  disabled?: boolean;
  allowCreate?: boolean;
  maxTags?: number;
  tagVariant?: VariantProps<typeof tagVariants>["variant"];
  id?: string;
}

const TagInput = React.forwardRef<HTMLDivElement, TagInputProps>(
  (
    {
      value,
      onChange,
      suggestions = [],
      placeholder = "Add tag…",
      disabled = false,
      allowCreate = true,
      maxTags,
      className,
      error,
      size = "md",
      tagVariant = "default",
      id,
      ...props
    },
    ref,
  ) => {
    const [inputValue, setInputValue] = React.useState("");
    const [open, setOpen] = React.useState(false);
    const [highlightedIndex, setHighlightedIndex] = React.useState<number>(-1);
    const [focusedTagIndex, setFocusedTagIndex] = React.useState<number | null>(
      null,
    );
    const inputRef = React.useRef<HTMLInputElement>(null);
    const containerRef = React.useRef<HTMLDivElement>(null);
    const tagRefs = React.useRef<(HTMLSpanElement | null)[]>([]);
    const generatedId = React.useId();
    const listboxId = id ? `${id}-listbox` : `${generatedId}-listbox`;
    const inputId = id || generatedId;

    const isAtMax = maxTags !== undefined && value.length >= maxTags;

    const filteredSuggestions = React.useMemo(() => {
      const q = inputValue.trim().toLowerCase();
      if (!q) return [];
      return suggestions.filter(
        (s) => s.toLowerCase().includes(q) && !value.includes(s),
      );
    }, [inputValue, suggestions, value]);

    const canCreate =
      allowCreate &&
      inputValue.trim().length > 0 &&
      !value.includes(inputValue.trim()) &&
      !suggestions.includes(inputValue.trim());

    const listItems: string[] = [
      ...filteredSuggestions,
      ...(canCreate ? [`Create "${inputValue.trim()}"`] : []),
    ];

    const addTag = (tag: string) => {
      const trimmed = tag.trim();
      if (!trimmed || value.includes(trimmed) || isAtMax) return;
      onChange([...value, trimmed]);
      setInputValue("");
      setOpen(false);
      setHighlightedIndex(-1);
      inputRef.current?.focus();
    };

    const removeTag = (tag: string) => {
      onChange(value.filter((t) => t !== tag));
      inputRef.current?.focus();
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setInputValue(e.target.value);
      setHighlightedIndex(-1);
      setFocusedTagIndex(null);
      setOpen(e.target.value.trim().length > 0);
    };

    const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter" || e.key === ",") {
        e.preventDefault();
        if (highlightedIndex >= 0 && highlightedIndex < listItems.length) {
          const item = listItems[highlightedIndex];
          if (item !== undefined) {
            const isCreate = item.startsWith('Create "');
            addTag(isCreate ? inputValue.trim() : item);
          }
        } else if (inputValue.trim()) {
          addTag(inputValue.trim());
        }
      } else if (e.key === "Backspace") {
        if (inputValue === "" && value.length > 0) {
          if (focusedTagIndex !== null) {
            e.preventDefault();
            const tagToRemove = value[focusedTagIndex];
            if (tagToRemove) {
              removeTag(tagToRemove);
              const newIndex = focusedTagIndex - 1;
              setFocusedTagIndex(newIndex >= 0 ? newIndex : null);
            }
          } else {
            e.preventDefault();
            setFocusedTagIndex(value.length - 1);
          }
        }
      } else if (e.key === "Delete") {
        if (inputValue === "" && focusedTagIndex !== null && value.length > 0) {
          e.preventDefault();
          const tagToRemove = value[focusedTagIndex];
          if (tagToRemove) {
            removeTag(tagToRemove);
            const newIndex =
              focusedTagIndex >= value.length - 1
                ? value.length - 2
                : focusedTagIndex;
            setFocusedTagIndex(newIndex >= 0 ? newIndex : null);
          }
        }
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        setFocusedTagIndex(null);
        if (listItems.length > 0) {
          setHighlightedIndex((i) => Math.min(i + 1, listItems.length - 1));
          setOpen(true);
        }
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setFocusedTagIndex(null);
        setHighlightedIndex((i) => Math.max(i - 1, -1));
      } else if (e.key === "Escape") {
        if (open) {
          e.preventDefault();
          setOpen(false);
          setHighlightedIndex(-1);
        }
        setFocusedTagIndex(null);
      } else if (e.key === "ArrowLeft") {
        if (inputValue === "" && value.length > 0) {
          e.preventDefault();
          setFocusedTagIndex((prev) => {
            if (prev === null) return value.length - 1;
            return prev > 0 ? prev - 1 : prev;
          });
        }
      } else if (e.key === "ArrowRight") {
        if (inputValue === "" && focusedTagIndex !== null) {
          e.preventDefault();
          setFocusedTagIndex((prev) => {
            if (prev === null) return null;
            return prev < value.length - 1 ? prev + 1 : null;
          });
        }
      } else if (e.key === "Home") {
        if (inputValue === "" && value.length > 0) {
          e.preventDefault();
          setFocusedTagIndex(0);
        }
      } else if (e.key === "End") {
        if (inputValue === "" && focusedTagIndex !== null) {
          e.preventDefault();
          setFocusedTagIndex(null);
          inputRef.current?.focus();
        }
      }
    };

    const handleContainerClick = () => {
      if (!disabled) inputRef.current?.focus();
    };

    React.useImperativeHandle(
      ref,
      () => containerRef.current as HTMLDivElement,
    );

    React.useEffect(() => {
      if (focusedTagIndex !== null && tagRefs.current[focusedTagIndex]) {
        tagRefs.current[focusedTagIndex]?.focus();
      }
    }, [focusedTagIndex]);

    const handleTagKeyDown = (
      e: React.KeyboardEvent<HTMLSpanElement>,
      index: number,
    ) => {
      if (e.key === "Backspace" || e.key === "Delete") {
        e.preventDefault();
        const tagToRemove = value[index];
        if (tagToRemove) {
          removeTag(tagToRemove);
          const newIndex = e.key === "Backspace" ? index - 1 : index;
          setFocusedTagIndex(newIndex >= 0 ? newIndex : null);
        }
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        setFocusedTagIndex(index > 0 ? index - 1 : 0);
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        if (index < value.length - 1) {
          setFocusedTagIndex(index + 1);
        } else {
          setFocusedTagIndex(null);
          inputRef.current?.focus();
        }
      } else if (e.key === "Home") {
        e.preventDefault();
        setFocusedTagIndex(0);
      } else if (e.key === "End") {
        e.preventDefault();
        setFocusedTagIndex(null);
        inputRef.current?.focus();
      }
    };

    return (
      <div ref={containerRef} {...props}>
        <Popover open={open && listItems.length > 0} onOpenChange={setOpen}>
          <PopoverAnchor asChild>
            <div
              role="combobox"
              aria-expanded={open}
              aria-haspopup="listbox"
              aria-controls={listboxId}
              aria-label={`${value.length} tag${value.length !== 1 ? "s" : ""} selected${value.length > 0 ? `: ${value.join(", ")}` : ""}`}
              onClick={handleContainerClick}
              className={cn(
                tagInputVariants({ size, error }),
                "cursor-text",
                disabled && "pointer-events-none opacity-50",
                className,
              )}
            >
              {value.map((tag, index) => (
                <span
                  key={tag}
                  ref={(el) => {
                    tagRefs.current[index] = el;
                  }}
                  tabIndex={focusedTagIndex === index ? 0 : -1}
                  onKeyDown={(e) => handleTagKeyDown(e, index)}
                  onFocus={() => setFocusedTagIndex(index)}
                  onBlur={() => setFocusedTagIndex(null)}
                  className={cn(
                    tagVariants({ variant: tagVariant, size }),
                    focusedTagIndex === index &&
                      "ring-2 ring-[hsl(var(--la-ring))] ring-offset-1",
                  )}
                  aria-label={`${tag}, press Backspace or Delete to remove`}
                >
                  {tag}
                  <button
                    type="button"
                    tabIndex={-1}
                    onClick={(e) => {
                      e.stopPropagation();
                      removeTag(tag);
                    }}
                    aria-label={`Remove ${tag}`}
                    className="ml-0.5 rounded-full hover:bg-black/10 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[hsl(var(--la-ring))]"
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
                      <line x1="18" y1="6" x2="6" y2="18" />
                      <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                  </button>
                </span>
              ))}
              {!isAtMax && (
                <input
                  ref={inputRef}
                  type="text"
                  value={inputValue}
                  onChange={handleInputChange}
                  onKeyDown={handleInputKeyDown}
                  onBlur={() => setTimeout(() => setOpen(false), 150)}
                  onFocus={() => {
                    setFocusedTagIndex(null);
                    if (inputValue.trim() && listItems.length > 0)
                      setOpen(true);
                  }}
                  placeholder={value.length === 0 ? placeholder : ""}
                  disabled={disabled}
                  aria-autocomplete="list"
                  aria-controls={listboxId}
                  aria-activedescendant={
                    highlightedIndex >= 0
                      ? `${listboxId}-${highlightedIndex}`
                      : undefined
                  }
                  id={inputId}
                  className="flex-1 min-w-[120px] bg-transparent outline-none placeholder:text-[hsl(var(--la-muted-foreground))]"
                />
              )}
            </div>
          </PopoverAnchor>
          <PopoverContent
            className="p-1 w-[var(--radix-popover-trigger-width)]"
            align="start"
            sideOffset={4}
            onOpenAutoFocus={(e) => e.preventDefault()}
          >
            <ul id={listboxId} className="max-h-48 overflow-y-auto">
              {listItems.map((item, i) => {
                const isCreate = item.startsWith('Create "');
                return (
                  <li
                    key={item}
                    id={`${listboxId}-${i}`}
                    aria-selected={i === highlightedIndex}
                  >
                    <button
                      type="button"
                      tabIndex={-1}
                      onMouseDown={(e) => {
                        e.preventDefault();
                        addTag(isCreate ? inputValue.trim() : item);
                      }}
                      onMouseEnter={() => setHighlightedIndex(i)}
                      className={cn(
                        "w-full text-left px-2 py-1.5 rounded-sm text-sm transition-colors",
                        "hover:bg-[hsl(var(--la-accent))] hover:text-[hsl(var(--la-accent-foreground))]",
                        i === highlightedIndex &&
                          "bg-[hsl(var(--la-accent))] text-[hsl(var(--la-accent-foreground))]",
                        isCreate && "text-[hsl(var(--la-primary))] font-medium",
                      )}
                    >
                      {item}
                    </button>
                  </li>
                );
              })}
            </ul>
          </PopoverContent>
        </Popover>
        {maxTags !== undefined && (
          <p
            className="mt-1 text-xs text-[hsl(var(--la-muted-foreground))]"
            aria-live="polite"
            role="status"
          >
            {value.length}/{maxTags} tags
          </p>
        )}
      </div>
    );
  },
);

TagInput.displayName = "TagInput";

export type TagInputVariants = VariantProps<typeof tagInputVariants>;
export type TagVariants = VariantProps<typeof tagVariants>;

export { TagInput, tagInputVariants, tagVariants };
