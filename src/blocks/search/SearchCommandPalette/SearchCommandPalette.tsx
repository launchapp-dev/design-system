import * as React from "react";
import { cn } from "../../../lib/utils";
import {
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandSeparator,
} from "../../../components/Command";
import { Badge } from "../../../components/Badge";
import { ScrollArea } from "../../../components/ScrollArea";

export interface SearchResult {
  id: string;
  title: string;
  description?: string;
  category?: string;
  url?: string;
  onSelect?: () => void;
}

export interface SearchFilter {
  id: string;
  label: string;
  count?: number;
}

export interface RecentSearch {
  id: string;
  query: string;
  timestamp?: string;
}

export interface SearchCommandPaletteProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  results?: SearchResult[];
  filters?: SearchFilter[];
  recentSearches?: RecentSearch[];
  activeFilter?: string;
  onFilterChange?: (filterId: string) => void;
  onRecentSearchClick?: (query: string) => void;
  onSearch?: (query: string) => void;
  placeholder?: string;
  emptyText?: string;
  maxRecentSearches?: number;
  className?: string;
}

export function useSearchCommandPalette(defaultOpen = false) {
  const [open, setOpen] = React.useState(defaultOpen);

  React.useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen((v) => !v);
      }
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, []);

  return { open, setOpen };
}

export function SearchCommandPalette({
  open,
  onOpenChange,
  results = [],
  filters = [],
  recentSearches = [],
  activeFilter,
  onFilterChange,
  onRecentSearchClick,
  onSearch,
  placeholder = "Search…",
  emptyText = "No results found.",
  maxRecentSearches = 5,
  className: _className,
}: SearchCommandPaletteProps) {
  const [query, setQuery] = React.useState("");

  const handleValueChange = (value: string) => {
    setQuery(value);
    onSearch?.(value);
  };

  const displayedRecentSearches = recentSearches.slice(0, maxRecentSearches);
  const showRecentSearches = !query && displayedRecentSearches.length > 0;
  const showFilters = !query && filters.length > 0;
  const showResults = query && results.length > 0;
  const showEmpty = query && results.length === 0;

  return (
    <CommandDialog open={open} onOpenChange={onOpenChange}>
      <div className="relative">
        <CommandInput
          placeholder={placeholder}
          value={query}
          onValueChange={handleValueChange}
        />
        {showFilters && (
          <div className="flex items-center gap-2 border-t border-border px-3 py-2">
            {filters.map((filter) => (
              <button
                key={filter.id}
                type="button"
                onClick={() => onFilterChange?.(filter.id === activeFilter ? "" : filter.id)}
                className={cn(
                  "inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium transition-colors",
                  filter.id === activeFilter
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border bg-background text-muted-foreground hover:border-foreground/30 hover:text-foreground"
                )}
              >
                {filter.label}
                {filter.count !== undefined && (
                  <Badge variant="secondary" className="ml-0.5 h-4 w-4 items-center justify-center p-0 text-[10px]">
                    {filter.count}
                  </Badge>
                )}
              </button>
            ))}
          </div>
        )}
      </div>
      <CommandList>
        {showRecentSearches && (
          <>
            <CommandGroup heading="Recent searches">
              {displayedRecentSearches.map((recent) => (
                <CommandItem
                  key={recent.id}
                  value={recent.query}
                  onSelect={() => {
                    setQuery(recent.query);
                    onRecentSearchClick?.(recent.query);
                  }}
                  className="flex items-center gap-2"
                >
                  <svg
                    className="h-4 w-4 shrink-0 text-muted-foreground"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span className="flex-1 text-sm">{recent.query}</span>
                  {recent.timestamp && (
                    <span className="text-xs text-muted-foreground">{recent.timestamp}</span>
                  )}
                </CommandItem>
              ))}
            </CommandGroup>
            <CommandSeparator />
          </>
        )}
        {showFilters && !query && filters.length > 0 && (
          <>
            <CommandGroup heading="Browse categories">
              {filters.map((filter) => (
                <CommandItem
                  key={filter.id}
                  value={`category:${filter.label}`}
                  onSelect={() => onFilterChange?.(filter.id)}
                  className="flex items-center gap-2"
                >
                  <svg
                    className="h-4 w-4 shrink-0 text-muted-foreground"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                    />
                  </svg>
                  <span className="flex-1 text-sm">{filter.label}</span>
                  {filter.count !== undefined && (
                    <Badge variant="secondary" className="text-xs">
                      {filter.count}
                    </Badge>
                  )}
                </CommandItem>
              ))}
            </CommandGroup>
            <CommandSeparator />
          </>
        )}
        {showResults && (
          <CommandGroup heading={`Results (${results.length})`}>
            <ScrollArea className="max-h-64">
              {results.map((result) => (
                <CommandItem
                  key={result.id}
                  value={[result.title, result.description ?? "", result.category ?? ""].join(" ")}
                  onSelect={() => {
                    result.onSelect?.();
                    onOpenChange(false);
                  }}
                  className="flex items-start gap-3 py-3"
                >
                  <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-border bg-muted/50">
                    <svg
                      className="h-4 w-4 text-muted-foreground"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="truncate text-sm font-medium">{result.title}</span>
                      {result.category && (
                        <Badge variant="secondary" className="shrink-0 text-xs">
                          {result.category}
                        </Badge>
                      )}
                    </div>
                    {result.description && (
                      <p className="line-clamp-1 text-xs text-muted-foreground">
                        {result.description}
                      </p>
                    )}
                  </div>
                  {result.url && (
                    <svg
                      className="h-4 w-4 shrink-0 text-muted-foreground"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                      />
                    </svg>
                  )}
                </CommandItem>
              ))}
            </ScrollArea>
          </CommandGroup>
        )}
        {showEmpty && <CommandEmpty>{emptyText}</CommandEmpty>}
      </CommandList>
    </CommandDialog>
  );
}
