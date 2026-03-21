import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";
import { Badge } from "../Badge";
import { Input } from "../Input";

const tagInputVariants = cva(
  "flex flex-wrap gap-1.5 rounded-md border bg-background p-2 transition-colors focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2",
  {
    variants: {
      size: {
        sm: "min-h-8 text-xs",
        md: "min-h-10 text-sm",
        lg: "min-h-12 text-base",
      },
      error: {
        true: "border-destructive focus-within:ring-destructive",
        false: "border-input",
      },
    },
    defaultVariants: {
      size: "md",
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

export interface TagInputTag {
  id: string;
  label: string;
  value: string;
}

export interface TagInputProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange" | "value">,
    VariantProps<typeof tagInputVariants> {
  value: string[] | TagInputTag[];
  onChange: (tags: string[] | TagInputTag[]) => void;
  suggestions?: string[] | TagInputTag[];
  onSuggestionSelect?: (tag: string | TagInputTag) => void;
  placeholder?: string;
  maxTags?: number;
  allowCreate?: boolean;
  createLabel?: string;
  disabled?: boolean;
  delimiter?: string;
  tagVariant?: VariantProps<typeof tagVariants>["variant"];
}

function createTagFromString(label: string): TagInputTag {
  const id = `tag-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
  return { id, label, value: label.toLowerCase().replace(/\s+/g, "-") };
}

function isTagInputTagArray(arr: unknown[]): arr is TagInputTag[] {
  return arr.length > 0 && typeof arr[0] === "object" && "id" in (arr[0] as TagInputTag);
}

function TagInput(
  {
    value,
    onChange,
    suggestions = [],
    onSuggestionSelect,
    placeholder = "Add tag...",
    maxTags,
    allowCreate = true,
    createLabel = "Create",
    disabled = false,
    delimiter = ",",
    size = "md",
    error,
    tagVariant = "default",
    className,
    ...props
  }: TagInputProps,
  ref: React.ForwardedRef<HTMLDivElement>
) {
  const [inputValue, setInputValue] = React.useState("");
  const [showSuggestions, setShowSuggestions] = React.useState(false);
  const [highlightedIndex, setHighlightedIndex] = React.useState(0);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const listboxRef = React.useRef<HTMLUListElement>(null);

  const isObjectMode = isTagInputTagArray(value as TagInputTag[]);

  const normalizeSuggestions = React.useMemo(() => {
    if (isTagInputTagArray(suggestions as TagInputTag[])) {
      return suggestions as TagInputTag[];
    }
    return (suggestions as string[]).map((s) => createTagFromString(s));
  }, [suggestions]);

  const normalizedValue = React.useMemo(() => {
    if (isObjectMode) {
      return value as TagInputTag[];
    }
    return (value as string[]).map((s) => createTagFromString(s));
  }, [value, isObjectMode]);

  const filteredSuggestions = React.useMemo(() => {
    if (!inputValue.trim()) return [];
    const query = inputValue.toLowerCase().trim();
    const existingIds = new Set(normalizedValue.map((t) => t.value));
    return normalizeSuggestions.filter(
      (s) => !existingIds.has(s.value) && s.label.toLowerCase().includes(query)
    );
  }, [inputValue, normalizeSuggestions, normalizedValue]);

  const canAddTag = !maxTags || normalizedValue.length < maxTags;

  const addTag = React.useCallback(
    (tag: TagInputTag) => {
      if (!canAddTag) return;
      const exists = normalizedValue.some((t) => t.value === tag.value);
      if (!exists) {
        const newValue = isObjectMode 
          ? [...normalizedValue, tag]
          : [...(value as string[]), tag.label];
        onChange(newValue);
        onSuggestionSelect?.(isObjectMode ? tag : tag.label);
      }
      setInputValue("");
      setShowSuggestions(false);
      setHighlightedIndex(0);
    },
    [canAddTag, normalizedValue, value, isObjectMode, onChange, onSuggestionSelect]
  );

  const removeTag = React.useCallback(
    (tagId: string) => {
      if (isObjectMode) {
        onChange((value as TagInputTag[]).filter((t) => t.id !== tagId));
      } else {
        const tag = normalizedValue.find((t) => t.id === tagId);
        if (tag) {
          onChange((value as string[]).filter((v) => v !== tag.label));
        }
      }
    },
    [normalizedValue, value, isObjectMode, onChange]
  );

  const handleInputChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value;
      setInputValue(newValue);
      setShowSuggestions(true);
      setHighlightedIndex(0);

      if (delimiter && newValue.includes(delimiter)) {
        const parts = newValue.split(delimiter);
        const tags = parts
          .map((p) => p.trim())
          .filter((p) => p.length > 0)
          .map(createTagFromString);
        tags.forEach(addTag);
      }
    },
    [delimiter, addTag]
  );

  const handleKeyDown = React.useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Backspace" && !inputValue && normalizedValue.length > 0) {
        e.preventDefault();
        removeTag(normalizedValue[normalizedValue.length - 1].id);
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        const maxIndex = allowCreate && inputValue
          ? filteredSuggestions.length
          : filteredSuggestions.length - 1;
        setHighlightedIndex((prev) => Math.min(prev + 1, maxIndex));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setHighlightedIndex((prev) => Math.max(prev - 1, 0));
      } else if (e.key === "Enter") {
        e.preventDefault();
        if (filteredSuggestions.length > 0 && highlightedIndex < filteredSuggestions.length) {
          addTag(filteredSuggestions[highlightedIndex]);
        } else if (allowCreate && inputValue.trim()) {
          addTag(createTagFromString(inputValue.trim()));
        }
      } else if (e.key === "Escape") {
        setShowSuggestions(false);
        setHighlightedIndex(0);
      }
    },
    [inputValue, normalizedValue, filteredSuggestions, highlightedIndex, allowCreate, addTag, removeTag]
  );

  const handleFocus = React.useCallback(() => {
    if (inputValue.trim()) {
      setShowSuggestions(true);
    }
  }, [inputValue]);

  const handleBlur = React.useCallback((e: React.FocusEvent) => {
    if (!containerRef.current?.contains(e.relatedTarget as Node)) {
      setShowSuggestions(false);
      setHighlightedIndex(0);
    }
  }, []);

  React.useEffect(() => {
    if (listboxRef.current) {
      const highlightedItem = listboxRef.current.children[highlightedIndex] as HTMLElement;
      highlightedItem?.scrollIntoView({ block: "nearest" });
    }
  }, [highlightedIndex]);

  return (
    <div
      ref={containerRef}
      className={cn("relative", className)}
      onBlur={handleBlur}
      {...props}
    >
      <div
        ref={ref}
        className={cn(tagInputVariants({ size, error }), disabled && "opacity-50 cursor-not-allowed")}
      >
        {normalizedValue.map((tag) => (
          <Badge
            key={tag.id}
            variant="secondary"
            className={cn(
              "flex items-center gap-1 pr-1",
              size === "sm" && "text-xs",
              size === "lg" && "text-base",
              tagVariant === "default" && "bg-primary/10 text-primary hover:bg-primary/20",
              tagVariant === "outline" && "border border-border text-foreground hover:bg-accent"
            )}
          >
            <span>{tag.label}</span>
            <button
              type="button"
              onClick={() => removeTag(tag.id)}
              disabled={disabled}
              className="ml-1 rounded-sm hover:bg-foreground/20 focus:outline-none focus:ring-1 focus:ring-ring"
              aria-label={`Remove ${tag.label}`}
            >
              <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </Badge>
        ))}
        {canAddTag && (
          <Input
            ref={inputRef}
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            onFocus={handleFocus}
            placeholder={normalizedValue.length === 0 ? placeholder : ""}
            disabled={disabled}
            className="h-auto flex-1 min-w-[120px] border-0 bg-transparent p-0 focus-visible:ring-0 focus-visible:ring-offset-0"
            aria-label="Add tag"
            aria-expanded={showSuggestions}
            aria-haspopup="listbox"
            aria-autocomplete="list"
            aria-activedescendant={showSuggestions ? `tag-option-${highlightedIndex}` : undefined}
          />
        )}
      </div>

      {showSuggestions && (filteredSuggestions.length > 0 || (allowCreate && inputValue.trim())) && (
        <ul
          ref={listboxRef}
          role="listbox"
          className="absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-md border bg-popover shadow-md"
        >
          {filteredSuggestions.map((suggestion, index) => (
            <li
              key={suggestion.id}
              id={`tag-option-${index}`}
              role="option"
              aria-selected={highlightedIndex === index}
              className={cn(
                "px-3 py-2 cursor-pointer",
                highlightedIndex === index && "bg-accent text-accent-foreground"
              )}
              onClick={() => addTag(suggestion)}
              onMouseEnter={() => setHighlightedIndex(index)}
            >
              {suggestion.label}
            </li>
          ))}
          {allowCreate && inputValue.trim() && filteredSuggestions.every((s) => s.label !== inputValue.trim()) && (
            <li
              id={`tag-option-${filteredSuggestions.length}`}
              role="option"
              aria-selected={highlightedIndex === filteredSuggestions.length}
              className={cn(
                "px-3 py-2 cursor-pointer border-t",
                highlightedIndex === filteredSuggestions.length && "bg-accent text-accent-foreground"
              )}
              onClick={() => addTag(createTagFromString(inputValue.trim()))}
              onMouseEnter={() => setHighlightedIndex(filteredSuggestions.length)}
            >
              <span className="text-muted-foreground">{createLabel}: </span>
              <span className="font-medium">{inputValue.trim()}</span>
            </li>
          )}
        </ul>
      )}
    </div>
  );
}

TagInput.displayName = "TagInput";

export { TagInput, tagInputVariants, createTagFromString };
