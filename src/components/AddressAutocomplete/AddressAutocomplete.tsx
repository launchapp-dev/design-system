import * as React from "react";
import * as PopoverPrimitive from "@radix-ui/react-popover";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const addressAutocompleteVariants = cva(
  "flex w-full rounded-md border bg-[hsl(var(--la-background))] text-[hsl(var(--la-foreground))] transition-colors focus-within:outline-none focus-within:ring-2 focus-within:ring-[hsl(var(--la-ring))] focus-within:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      size: {
        sm: "h-8 text-xs",
        md: "h-10 text-sm",
        lg: "h-12 text-base",
      },
      error: {
        true: "border-[hsl(var(--la-destructive))] focus-within:ring-[hsl(var(--la-destructive))]",
        false: "border-[hsl(var(--la-input))]",
      },
    },
    defaultVariants: {
      size: "md",
      error: false,
    },
  }
);

export interface AddressSuggestion {
  id: string;
  label: string;
  description?: string;
  street?: string;
  city?: string;
  state?: string;
  postalCode?: string;
  country?: string;
  countryCode?: string;
  latitude?: number;
  longitude?: number;
}

export interface AddressAutocompleteProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size" | "value" | "onChange">,
    VariantProps<typeof addressAutocompleteVariants> {
  value?: string;
  onChange?: (value: string, suggestion: AddressSuggestion | null) => void;
  onSearch?: (query: string) => Promise<AddressSuggestion[]> | AddressSuggestion[];
  suggestions?: AddressSuggestion[];
  onSuggestionSelect?: (suggestion: AddressSuggestion) => void;
  debounceMs?: number;
  minChars?: number;
  loading?: boolean;
  showIcons?: boolean;
  emptyMessage?: string;
}

const LocationIcon = () => (
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
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

const BuildingIcon = () => (
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
    <rect width="16" height="20" x="4" y="2" rx="2" ry="2" />
    <path d="M9 22v-4h6v4" />
    <path d="M8 6h.01" />
    <path d="M16 6h.01" />
    <path d="M12 6h.01" />
    <path d="M12 10h.01" />
    <path d="M12 14h.01" />
    <path d="M16 10h.01" />
    <path d="M16 14h.01" />
    <path d="M8 10h.01" />
    <path d="M8 14h.01" />
  </svg>
);

const MapPinIcon = () => (
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
    <line x1="2" x2="22" y1="12" y2="12" />
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
  </svg>
);

const AddressAutocomplete = React.forwardRef<HTMLInputElement, AddressAutocompleteProps>(
  (
    {
      value: controlledValue,
      onChange,
      onSearch,
      suggestions: externalSuggestions,
      onSuggestionSelect,
      debounceMs = 300,
      minChars = 3,
      loading: externalLoading,
      showIcons = true,
      emptyMessage = "No results found",
      size,
      error,
      disabled,
      className,
      placeholder = "Search for an address...",
      ...props
    },
    ref
  ) => {
    const [inputValue, setInputValue] = React.useState(controlledValue ?? "");
    const [isOpen, setIsOpen] = React.useState(false);
    const [internalSuggestions, setInternalSuggestions] = React.useState<AddressSuggestion[]>([]);
    const [internalLoading, setInternalLoading] = React.useState(false);
    const [highlightedIndex, setHighlightedIndex] = React.useState(-1);
    const inputRef = React.useRef<HTMLInputElement>(null);
    const debounceRef = React.useRef<ReturnType<typeof setTimeout>>();

    React.useImperativeHandle(ref, () => inputRef.current!);

    const suggestions = externalSuggestions ?? internalSuggestions;
    const loading = externalLoading ?? internalLoading;

    React.useEffect(() => {
      if (controlledValue !== undefined) {
        setInputValue(controlledValue);
      }
    }, [controlledValue]);

    const searchSuggestions = React.useCallback(
      async (query: string) => {
        if (!onSearch) return;
        
        if (query.length < minChars) {
          setInternalSuggestions([]);
          setIsOpen(false);
          return;
        }

        setInternalLoading(true);
        try {
          const results = await onSearch(query);
          setInternalSuggestions(results);
          setIsOpen(results.length > 0);
        } catch {
          setInternalSuggestions([]);
        } finally {
          setInternalLoading(false);
        }
      },
      [onSearch, minChars]
    );

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value;
      setInputValue(newValue);
      setHighlightedIndex(-1);

      if (externalSuggestions === undefined) {
        if (debounceRef.current) {
          clearTimeout(debounceRef.current);
        }
        debounceRef.current = setTimeout(() => {
          searchSuggestions(newValue);
        }, debounceMs);
      } else {
        setIsOpen(newValue.length >= minChars);
      }

      onChange?.(newValue, null);
    };

    const handleSuggestionSelect = (suggestion: AddressSuggestion) => {
      setInputValue(suggestion.label);
      setIsOpen(false);
      setInternalSuggestions([]);
      onChange?.(suggestion.label, suggestion);
      onSuggestionSelect?.(suggestion);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (!isOpen) {
        if (e.key === "ArrowDown" || e.key === "ArrowUp") {
          e.preventDefault();
          setIsOpen(suggestions.length > 0);
        }
        return;
      }

      switch (e.key) {
        case "ArrowDown":
          e.preventDefault();
          setHighlightedIndex((prev) =>
            prev < suggestions.length - 1 ? prev + 1 : 0
          );
          break;
        case "ArrowUp":
          e.preventDefault();
          setHighlightedIndex((prev) =>
            prev > 0 ? prev - 1 : suggestions.length - 1
          );
          break;
        case "Enter":
          e.preventDefault();
          if (highlightedIndex >= 0 && suggestions[highlightedIndex]) {
            handleSuggestionSelect(suggestions[highlightedIndex]);
          }
          break;
        case "Escape":
          e.preventDefault();
          setIsOpen(false);
          setHighlightedIndex(-1);
          break;
      }
    };

    const handleFocus = () => {
      if (inputValue.length >= minChars && suggestions.length > 0) {
        setIsOpen(true);
      }
    };

    const handleBlur = () => {
      setTimeout(() => {
        setIsOpen(false);
        setHighlightedIndex(-1);
      }, 150);
    };

    React.useEffect(() => {
      return () => {
        if (debounceRef.current) {
          clearTimeout(debounceRef.current);
        }
      };
    }, []);

    const getSuggestionIcon = (suggestion: AddressSuggestion) => {
      if (suggestion.street && !suggestion.city) return <BuildingIcon />;
      if (suggestion.country && !suggestion.city) return <MapPinIcon />;
      return <LocationIcon />;
    };

    return (
      <PopoverPrimitive.Root open={isOpen && !disabled}>
        <PopoverPrimitive.Anchor asChild>
          <div className={cn(addressAutocompleteVariants({ size, error }), className)}>
            {showIcons && (
              <div className="flex h-full items-center border-r border-[hsl(var(--la-border))] px-3 text-[hsl(var(--la-muted-foreground))]">
                <LocationIcon />
              </div>
            )}
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              onFocus={handleFocus}
              onBlur={handleBlur}
              disabled={disabled}
              placeholder={placeholder}
              className={cn(
                "flex-1 bg-transparent px-3 py-2 outline-none placeholder:text-[hsl(var(--la-muted-foreground))]",
                size === "sm" && "text-xs",
                size === "md" && "text-sm",
                size === "lg" && "text-base"
              )}
              aria-label="Address search"
              aria-invalid={error || undefined}
              aria-expanded={isOpen}
              aria-haspopup="listbox"
              aria-autocomplete="list"
              role="combobox"
              {...props}
            />
            {loading && (
              <div className="flex h-full items-center px-3">
                <svg
                  className="h-4 w-4 animate-spin text-[hsl(var(--la-muted-foreground))]"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
              </div>
            )}
          </div>
        </PopoverPrimitive.Anchor>
        <PopoverPrimitive.Portal>
          <PopoverPrimitive.Content
            className="z-50 w-[var(--radix-popover-trigger-width)] rounded-md border border-[hsl(var(--la-border))] bg-[hsl(var(--la-popover))] shadow-lg"
            sideOffset={4}
            align="start"
            onOpenAutoFocus={(e) => e.preventDefault()}
            onCloseAutoFocus={(e) => e.preventDefault()}
          >
            <div
              role="listbox"
              className="max-h-60 overflow-auto p-1"
              aria-label="Address suggestions"
            >
              {suggestions.length === 0 ? (
                <div className="px-3 py-2 text-center text-sm text-[hsl(var(--la-muted-foreground))]">
                  {loading ? "Searching..." : emptyMessage}
                </div>
              ) : (
                suggestions.map((suggestion, index) => (
                  <button
                    key={suggestion.id}
                    type="button"
                    role="option"
                    aria-selected={highlightedIndex === index}
                    className={cn(
                      "flex w-full items-start gap-2 rounded-sm px-3 py-2 text-left text-sm outline-none",
                      "transition-colors",
                      highlightedIndex === index
                        ? "bg-[hsl(var(--la-accent))] text-[hsl(var(--la-accent-foreground))]"
                        : "text-[hsl(var(--la-popover-foreground))] hover:bg-[hsl(var(--la-accent))] hover:text-[hsl(var(--la-accent-foreground))]"
                    )}
                    onClick={() => handleSuggestionSelect(suggestion)}
                    onMouseEnter={() => setHighlightedIndex(index)}
                  >
                    {showIcons && (
                      <span className="mt-0.5 shrink-0 text-[hsl(var(--la-muted-foreground))]">
                        {getSuggestionIcon(suggestion)}
                      </span>
                    )}
                    <div className="min-w-0 flex-1">
                      <div className="truncate font-medium">
                        {suggestion.label}
                      </div>
                      {suggestion.description && (
                        <div className="truncate text-xs text-[hsl(var(--la-muted-foreground))]">
                          {suggestion.description}
                        </div>
                      )}
                    </div>
                  </button>
                ))
              )}
            </div>
          </PopoverPrimitive.Content>
        </PopoverPrimitive.Portal>
      </PopoverPrimitive.Root>
    );
  }
);

AddressAutocomplete.displayName = "AddressAutocomplete";

export { AddressAutocomplete, addressAutocompleteVariants };
