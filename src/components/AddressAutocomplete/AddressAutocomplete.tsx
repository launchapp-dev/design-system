import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";
import { Input } from "../Input";

const addressAutocompleteVariants = cva("relative", {
  variants: {
    size: {
      sm: "",
      md: "",
      lg: "",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

export interface AddressSuggestion {
  id: string;
  label: string;
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  countryCode: string;
}

export interface AddressValue {
  street: string;
  street2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  countryCode: string;
}

export interface AddressAutocompleteProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange" | "value">,
    VariantProps<typeof addressAutocompleteVariants> {
  value: AddressValue | null;
  onChange: (value: AddressValue) => void;
  onSearch?: (query: string) => Promise<AddressSuggestion[]> | AddressSuggestion[];
  suggestions?: AddressSuggestion[];
  placeholder?: string;
  disabled?: boolean;
  showDetails?: boolean;
  error?: boolean;
}

function AddressAutocomplete(
  {
    value,
    onChange,
    onSearch,
    suggestions: controlledSuggestions,
    placeholder = "Enter address",
    disabled = false,
    showDetails = true,
    error = false,
    size,
    className,
    ...props
  }: AddressAutocompleteProps,
  ref: React.ForwardedRef<HTMLDivElement>
) {
  const [inputValue, setInputValue] = React.useState(value?.street || "");
  const [suggestions, setSuggestions] = React.useState<AddressSuggestion[]>([]);
  const [isOpen, setIsOpen] = React.useState(false);
  const [highlightedIndex, setHighlightedIndex] = React.useState(0);
  const [isLoading, setIsLoading] = React.useState(false);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const listboxRef = React.useRef<HTMLUListElement>(null);

  const effectiveSuggestions = controlledSuggestions ?? suggestions;

  React.useEffect(() => {
    if (value?.street) {
      setInputValue(value.street);
    }
  }, [value?.street]);

  const handleSearch = React.useCallback(
    async (query: string) => {
      if (!query.trim()) {
        setSuggestions([]);
        setIsOpen(false);
        return;
      }

      if (onSearch) {
        setIsLoading(true);
        try {
          const results = await onSearch(query);
          setSuggestions(results);
          setIsOpen(results.length > 0);
          setHighlightedIndex(0);
        } catch (error) {
          console.error("Address search failed:", error);
          setSuggestions([]);
        } finally {
          setIsLoading(false);
        }
      }
    },
    [onSearch]
  );

  const debouncedSearch = React.useMemo(() => {
    let timeoutId: ReturnType<typeof setTimeout>;
    return (query: string) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => handleSearch(query), 300);
    };
  }, [handleSearch]);

  const handleInputChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value;
      setInputValue(newValue);
      debouncedSearch(newValue);
    },
    [debouncedSearch]
  );

  const handleSelectSuggestion = React.useCallback(
    (suggestion: AddressSuggestion) => {
      setInputValue(suggestion.street);
      setIsOpen(false);
      setHighlightedIndex(0);
      onChange({
        street: suggestion.street,
        city: suggestion.city,
        state: suggestion.state,
        postalCode: suggestion.postalCode,
        country: suggestion.country,
        countryCode: suggestion.countryCode,
      });
    },
    [onChange]
  );

  const handleKeyDown = React.useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (!isOpen) return;

      if (e.key === "ArrowDown") {
        e.preventDefault();
        setHighlightedIndex((prev) =>
          Math.min(prev + 1, effectiveSuggestions.length - 1)
        );
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setHighlightedIndex((prev) => Math.max(prev - 1, 0));
      } else if (e.key === "Enter") {
        e.preventDefault();
        if (effectiveSuggestions[highlightedIndex]) {
          handleSelectSuggestion(effectiveSuggestions[highlightedIndex]);
        }
      } else if (e.key === "Escape") {
        setIsOpen(false);
        setHighlightedIndex(0);
      }
    },
    [isOpen, effectiveSuggestions, highlightedIndex, handleSelectSuggestion]
  );

  const handleFocus = React.useCallback(() => {
    if (inputValue.trim() && effectiveSuggestions.length > 0) {
      setIsOpen(true);
    }
  }, [inputValue, effectiveSuggestions.length]);

  const handleBlur = React.useCallback((e: React.FocusEvent) => {
    if (!containerRef.current?.contains(e.relatedTarget)) {
      setIsOpen(false);
      setHighlightedIndex(0);
    }
  }, []);

  React.useEffect(() => {
    if (listboxRef.current) {
      const highlightedItem = listboxRef.current.children[highlightedIndex] as HTMLElement;
      highlightedItem?.scrollIntoView({ block: "nearest" });
    }
  }, [highlightedIndex]);

  const formatAddressLine = (addr: AddressSuggestion) => {
    const parts = [addr.city, addr.state, addr.postalCode].filter(Boolean);
    return parts.join(", ");
  };

  return (
    <div
      ref={containerRef}
      className={cn(addressAutocompleteVariants({ size }), className)}
      onBlur={handleBlur}
      {...props}
    >
      <div ref={ref} className="relative">
        <Input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onFocus={handleFocus}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          disabled={disabled}
          error={error}
          className={cn(
            size === "sm" && "h-8 text-xs",
            size === "lg" && "h-12 text-base"
          )}
          aria-label="Address search"
          aria-expanded={isOpen}
          aria-haspopup="listbox"
          aria-autocomplete="list"
          aria-activedescendant={isOpen ? `addr-option-${highlightedIndex}` : undefined}
        />
        {isLoading && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            <svg
              className="h-4 w-4 animate-spin text-muted-foreground"
              fill="none"
              viewBox="0 0 24 24"
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

      {isOpen && effectiveSuggestions.length > 0 && (
        <ul
          ref={listboxRef}
          role="listbox"
          className="absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-md border bg-popover shadow-md"
        >
          {effectiveSuggestions.map((suggestion, index) => (
            <li
              key={suggestion.id}
              id={`addr-option-${index}`}
              role="option"
              aria-selected={highlightedIndex === index}
              className={cn(
                "cursor-pointer px-3 py-2",
                highlightedIndex === index && "bg-accent text-accent-foreground"
              )}
              onClick={() => handleSelectSuggestion(suggestion)}
              onMouseEnter={() => setHighlightedIndex(index)}
            >
              <div className="font-medium">{suggestion.street}</div>
              <div className="text-sm text-muted-foreground">
                {formatAddressLine(suggestion)}
              </div>
            </li>
          ))}
        </ul>
      )}

      {showDetails && value && (value.city || value.state || value.postalCode) && (
        <div className="mt-2 rounded-md border bg-muted/50 p-3 text-sm">
          <div className="space-y-1">
            {value.street && <div className="font-medium">{value.street}</div>}
            {value.street2 && <div>{value.street2}</div>}
            <div className="text-muted-foreground">
              {[value.city, value.state, value.postalCode].filter(Boolean).join(", ")}
            </div>
            {value.country && (
              <div className="text-muted-foreground">{value.country}</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

AddressAutocomplete.displayName = "AddressAutocomplete";

export { AddressAutocomplete, addressAutocompleteVariants };
