import * as React from "react";
import { Input } from "../../../components/Input";
import { Button } from "../../../components/Button";
import { Badge } from "../../../components/Badge";
import {
  SelectRoot,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "../../../components/Select";
import { cn } from "../../../lib/utils";

export interface SearchResultItem {
  id: string;
  title: string;
  excerpt?: string;
  category?: string;
  tags?: string[];
  url?: string;
  author?: string;
  date?: string;
  readingTime?: string;
  onClick?: () => void;
}

export interface SearchResultsProps extends React.HTMLAttributes<HTMLDivElement> {
  query?: string;
  results?: SearchResultItem[];
  totalCount?: number;
  onSearch?: (query: string) => void;
  onResultClick?: (item: SearchResultItem) => void;
  searchPlaceholder?: string;
  sortOptions?: { label: string; value: string }[];
  activeSort?: string;
  onSortChange?: (sort: string) => void;
  isLoading?: boolean;
  showFilters?: boolean;
  filters?: { label: string; count: number }[];
  activeFilter?: string;
  onFilterChange?: (filter: string) => void;
}

const SearchResultsInner = React.forwardRef<HTMLDivElement, SearchResultsProps>(
  (
    {
      query = "",
      results = [],
      totalCount,
      onSearch,
      onResultClick,
      searchPlaceholder = "Search…",
      sortOptions = [],
      activeSort,
      onSortChange,
      isLoading = false,
      showFilters = false,
      filters = [],
      activeFilter,
      onFilterChange,
      className,
      ...props
    },
    ref
  ) => {
    const [localQuery, setLocalQuery] = React.useState(query);

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      onSearch?.(localQuery);
    };

    return (
      <div ref={ref} className={cn("space-y-6", className)} {...props}>
        <form onSubmit={handleSubmit} className="flex items-center gap-3">
          <div className="relative flex-1">
            <svg
              className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
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
            <Input
              value={localQuery}
              onChange={(e) => setLocalQuery(e.target.value)}
              placeholder={searchPlaceholder}
              className="pl-10"
              aria-label="Search"
            />
          </div>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Searching…" : "Search"}
          </Button>
        </form>

        {showFilters && filters.length > 0 && (
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => onFilterChange?.("")}
              className={cn(
                "inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-sm font-medium transition-colors",
                !activeFilter
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-background text-muted-foreground hover:border-foreground/30 hover:text-foreground"
              )}
            >
              All
              {totalCount !== undefined && (
                <Badge variant="secondary" className="ml-1 h-5 w-5 items-center justify-center p-0 text-xs">
                  {totalCount}
                </Badge>
              )}
            </button>
            {filters.map((filter) => (
              <button
                key={filter.label}
                type="button"
                onClick={() => onFilterChange?.(filter.label)}
                className={cn(
                  "inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-sm font-medium transition-colors",
                  filter.label === activeFilter
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border bg-background text-muted-foreground hover:border-foreground/30 hover:text-foreground"
                )}
              >
                {filter.label}
                <Badge variant="secondary" className="ml-1 h-5 w-5 items-center justify-center p-0 text-xs">
                  {filter.count}
                </Badge>
              </button>
            ))}
          </div>
        )}

        {(sortOptions.length > 0 || totalCount !== undefined) && (
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              {totalCount !== undefined ? `${totalCount} result${totalCount !== 1 ? "s" : ""}` : ""}
              {query && <span> for <strong>&ldquo;{query}&rdquo;</strong></span>}
            </p>
            {sortOptions.length > 0 && (
              <SelectRoot value={activeSort} onValueChange={onSortChange}>
                <SelectTrigger className="w-44">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  {sortOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </SelectRoot>
            )}
          </div>
        )}

        {results.length === 0 && !isLoading ? (
          <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-border py-16 text-center">
            <svg
              className="mb-4 h-12 w-12 text-muted-foreground/50"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <h3 className="mb-1 text-lg font-semibold">No results found</h3>
            <p className="text-sm text-muted-foreground">
              Try adjusting your search or filters to find what you&apos;re looking for.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {results.map((result) => (
              <article
                key={result.id}
                className={cn(
                  "group cursor-pointer rounded-lg border border-border p-5 transition-colors hover:border-foreground/20 hover:bg-muted/30",
                  result.url === undefined && "cursor-default"
                )}
                onClick={() => (result.onClick ? result.onClick() : onResultClick?.(result))}
                role={result.url !== undefined ? "link" : undefined}
                tabIndex={0}
                onKeyDown={(e) => {
                  if ((e.key === "Enter" || e.key === " ") && result.url) {
                    e.preventDefault();
                    result.onClick ? result.onClick() : onResultClick?.(result);
                  }
                }}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="text-base font-semibold group-hover:text-primary">
                        {result.title}
                      </h3>
                      {result.category && (
                        <Badge variant="secondary" className="text-xs">
                          {result.category}
                        </Badge>
                      )}
                    </div>
                    {result.excerpt && (
                      <p className="mt-1.5 line-clamp-2 text-sm text-muted-foreground">
                        {result.excerpt}
                      </p>
                    )}
                    <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                      {result.author && <span>By {result.author}</span>}
                      {result.date && <span>{result.date}</span>}
                      {result.readingTime && <span>{result.readingTime}</span>}
                      {result.tags && result.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1">
                          {result.tags.map((tag) => (
                            <Badge key={tag} variant="outline" className="text-[10px]">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                  {result.url && (
                    <svg
                      className="mt-1 h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-primary"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                      />
                    </svg>
                  )}
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    );
  }
);
SearchResultsInner.displayName = "SearchResults";

export const SearchResults = SearchResultsInner;
