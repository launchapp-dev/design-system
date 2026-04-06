import * as React from "react";
import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { Badge } from "@/components/Badge";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/Popover";
import { Checkbox } from "@/components/Checkbox";
import { Label } from "@/components/Label";
import { cn } from "@/lib/utils";

export interface FilterOption {
  label: string;
  value: string;
}

export interface FilterBarProps extends React.HTMLAttributes<HTMLDivElement> {
  searchValue?: string;
  searchPlaceholder?: string;
  onSearchChange?: (value: string) => void;
  onSearch?: (value: string) => void;
  filters?: { column: string; label: string; options: FilterOption[] }[];
  activeFilters?: Record<string, string[]>;
  onFiltersChange?: (filters: Record<string, string[]>) => void;
  showSearch?: boolean;
  showColumnToggle?: boolean;
  availableColumns?: string[];
  activeColumns?: string[];
  onColumnsChange?: (columns: string[]) => void;
}

const FilterIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
  </svg>
);

const ColumnsIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <line x1="8" y1="6" x2="21" y2="6" />
    <line x1="8" y1="12" x2="21" y2="12" />
    <line x1="8" y1="18" x2="21" y2="18" />
    <line x1="3" y1="6" x2="3.01" y2="6" />
    <line x1="3" y1="12" x2="3.01" y2="12" />
    <line x1="3" y1="18" x2="3.01" y2="18" />
  </svg>
);

function FilterBar({
  searchValue = "",
  searchPlaceholder = "Search…",
  onSearchChange,
  onSearch,
  filters = [],
  activeFilters = {},
  onFiltersChange,
  showSearch = true,
  showColumnToggle = false,
  availableColumns = [],
  activeColumns = [],
  onColumnsChange,
  className,
  ...props
}: FilterBarProps) {
  const [localSearch, setLocalSearch] = React.useState(searchValue);

  const handleSearchChange = (value: string) => {
    setLocalSearch(value);
    onSearchChange?.(value);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch?.(localSearch);
  };

  const totalActiveFilters = Object.values(activeFilters).flat().length;

  const toggleFilter = (column: string, value: string) => {
    const current = activeFilters[column] ?? [];
    const next = current.includes(value) ? current.filter((v) => v !== value) : [...current, value];
    onFiltersChange?.({ ...activeFilters, [column]: next });
  };

  const clearFilters = () => {
    onFiltersChange?.({});
  };

  return (
    <div ref={null} className={cn("flex flex-wrap items-center gap-3", className)} {...props}>
      {showSearch && (
        <form onSubmit={handleSearchSubmit} className="relative flex-1 min-w-[200px] max-w-sm">
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
            value={localSearch}
            onChange={(e) => handleSearchChange(e.target.value)}
            placeholder={searchPlaceholder}
            className="pl-10"
            aria-label="Search"
          />
        </form>
      )}

      {filters.map((filter) => {
        const active = activeFilters[filter.column] ?? [];
        return (
          <Popover key={filter.column}>
            <PopoverTrigger asChild>
              <Button variant="outline" size="sm" className="h-9 gap-1.5">
                <FilterIcon />
                {filter.label}
                {active.length > 0 && (
                  <Badge
                    variant="secondary"
                    className="ml-1 h-5 w-5 items-center justify-center p-0 text-xs"
                  >
                    {active.length}
                  </Badge>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-56 p-3" align="start">
              <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                {filter.label}
              </p>
              <div className="space-y-1">
                {filter.options.map((option) => (
                  <Label
                    key={option.value}
                    className="flex cursor-pointer items-center gap-2 rounded px-2 py-1.5 text-sm font-normal hover:bg-accent"
                  >
                    <Checkbox
                      checked={active.includes(option.value)}
                      onCheckedChange={() => toggleFilter(filter.column, option.value)}
                    />
                    {option.label}
                  </Label>
                ))}
              </div>
              {active.length > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="mt-2 w-full text-xs"
                  onClick={() => toggleFilter(filter.column, active[0])}
                >
                  Clear
                </Button>
              )}
            </PopoverContent>
          </Popover>
        );
      })}

      {totalActiveFilters > 0 && (
        <Button
          variant="ghost"
          size="sm"
          onClick={clearFilters}
          className="h-9 text-xs text-muted-foreground"
        >
          Clear all ({totalActiveFilters})
        </Button>
      )}

      {showColumnToggle && availableColumns.length > 0 && (
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" size="sm" className="h-9 gap-1.5">
              <ColumnsIcon />
              Columns
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-48 p-3" align="end">
            <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Toggle columns
            </p>
            <div className="space-y-1">
              {availableColumns.map((col) => (
                <Label
                  key={col}
                  className="flex cursor-pointer items-center gap-2 rounded px-2 py-1.5 text-sm font-normal hover:bg-accent capitalize"
                >
                  <Checkbox
                    checked={activeColumns.includes(col)}
                    onCheckedChange={(checked) => {
                      const next = checked
                        ? [...activeColumns, col]
                        : activeColumns.filter((c) => c !== col);
                      onColumnsChange?.(next);
                    }}
                  />
                  {col}
                </Label>
              ))}
            </div>
          </PopoverContent>
        </Popover>
      )}
    </div>
  );
}

FilterBar.displayName = "FilterBar";

export { FilterBar };
