import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";
import { Popover, PopoverContent, PopoverAnchor } from "../Popover";

const tagInputVariants = cva(
  "flex flex-wrap items-center gap-1.5 min-h-10 w-full rounded-md border bg-background px-3 py-2 text-sm transition-colors",
  {
    variants: {
      error: {
        true: "border-destructive focus-within:ring-destructive",
        false: "border-input focus-within:ring-ring",
      },
    },
    defaultVariants: {
      error: false,
    },
  }
);

const tagVariants = cva(
  "inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium transition-colors",
  {
    variants: {
      variant: {
        default: "bg-primary/10 text-primary hover:bg-primary/20",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        outline: "border border-border text-foreground hover:bg-accent",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface TagInputProps extends VariantProps<typeof tagInputVariants> {
  value: string[];
  onChange: (value: string[]) => void;
  suggestions?: string[];
  placeholder?: string;
  disabled?: boolean;
  allowCreate?: boolean;
  maxTags?: number;
  className?: string;
  tagVariant?: VariantProps<typeof tagVariants>["variant"];
  "aria-label"?: string;
}

function TagInput({
  value,
  onChange,
  suggestions = [],
  placeholder = "Add tag…",
  disabled = false,
  allowCreate = true,
  maxTags,
  className,
  error,
  tagVariant = "default",
  "aria-label": ariaLabel,
}: TagInputProps) {
  const [inputValue, setInputValue] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const [highlightedIndex, setHighlightedIndex] = React.useState<number>(-1);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const containerRef = React.useRef<HTMLDivElement>(null);

  const isAtMax = maxTags !== undefined && value.length >= maxTags;

  const filteredSuggestions = React.useMemo(() => {
    const q = inputValue.trim().toLowerCase();
    if (!q) return [];
    return suggestions.filter(
      (s) =>
        s.toLowerCase().includes(q) &&
        !value.includes(s)
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
    setOpen(e.target.value.trim().length > 0);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
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
    } else if (e.key === "Backspace" && inputValue === "" && value.length > 0) {
      removeTag(value[value.length - 1] as string);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlightedIndex((i) => Math.min(i + 1, listItems.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlightedIndex((i) => Math.max(i - 1, -1));
    } else if (e.key === "Escape") {
      setOpen(false);
      setHighlightedIndex(-1);
    }
  };

  const handleContainerClick = () => {
    if (!disabled) inputRef.current?.focus();
  };

  return (
    <div ref={containerRef}>
      <Popover open={open && listItems.length > 0} onOpenChange={setOpen}>
        <PopoverAnchor asChild>
          <div
            role="group"
            aria-label={ariaLabel ?? "Tag input"}
            onClick={handleContainerClick}
            className={cn(
              tagInputVariants({ error }),
              "focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 cursor-text",
              disabled && "pointer-events-none opacity-50",
              className
            )}
          >
            {value.map((tag) => (
              <span key={tag} className={cn(tagVariants({ variant: tagVariant }))}>
                {tag}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeTag(tag);
                  }}
                  aria-label={`Remove tag ${tag}`}
                  className="ml-0.5 rounded-full hover:bg-black/10 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
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
                onKeyDown={handleKeyDown}
                onBlur={() => setTimeout(() => setOpen(false), 150)}
                onFocus={() => {
                  if (inputValue.trim() && listItems.length > 0) setOpen(true);
                }}
                placeholder={value.length === 0 ? placeholder : ""}
                disabled={disabled}
                aria-autocomplete="list"
                aria-expanded={open}
                className="flex-1 min-w-[120px] bg-transparent outline-none placeholder:text-muted-foreground text-sm"
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
          <ul role="listbox" className="max-h-48 overflow-y-auto">
            {listItems.map((item, i) => {
              const isCreate = item.startsWith('Create "');
              return (
                <li key={item} role="option" aria-selected={i === highlightedIndex}>
                  <button
                    type="button"
                    onMouseDown={(e) => {
                      e.preventDefault();
                      addTag(isCreate ? inputValue.trim() : item);
                    }}
                    onMouseEnter={() => setHighlightedIndex(i)}
                    className={cn(
                      "w-full text-left px-2 py-1.5 rounded-sm text-sm transition-colors",
                      "hover:bg-accent hover:text-accent-foreground",
                      i === highlightedIndex && "bg-accent text-accent-foreground",
                      isCreate && "text-primary font-medium"
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
        <p className="mt-1 text-xs text-muted-foreground" aria-live="polite">
          {value.length}/{maxTags} tags
        </p>
      )}
    </div>
  );
}

TagInput.displayName = "TagInput";

export { TagInput };
