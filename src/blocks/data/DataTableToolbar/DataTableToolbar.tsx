import * as React from "react";
import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { DropdownMenu, DropdownMenuContent, DropdownMenuCheckboxItem, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/DropdownMenu";
import { SelectRoot as Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/Select";
import { Badge } from "@/components/Badge";
import { TooltipRoot as Tooltip, TooltipContent, TooltipTrigger } from "@/components/Tooltip";
import { cn } from "@/lib/utils";

export interface ToolbarAction {
  id: string;
  label: string;
  icon?: React.ReactNode;
  variant?: "default" | "destructive" | "outline";
  disabled?: boolean;
  onClick: () => void;
}

export interface ColumnVisibilityOption {
  id: string;
  label: string;
  visible: boolean;
}

export interface DataTableToolbarProps extends React.HTMLAttributes<HTMLDivElement> {
  search?: string;
  onSearchChange?: (value: string) => void;
  searchPlaceholder?: string;
  showSearch?: boolean;
  columnVisibility?: ColumnVisibilityOption[];
  onColumnVisibilityChange?: (columns: ColumnVisibilityOption[]) => void;
  allColumns?: { id: string; label: string }[];
  actions?: ToolbarAction[];
  bulkActions?: ToolbarAction[];
  selectedCount?: number;
  onClearSelection?: () => void;
  onSelectAll?: () => void;
  filters?: React.ReactNode;
  showFilters?: boolean;
  filterCount?: number;
  onToggleFilters?: () => void;
  loading?: boolean;
}

function DataTableToolbar({
  search,
  onSearchChange,
  searchPlaceholder = "Search…",
  showSearch = true,
  columnVisibility,
  onColumnVisibilityChange,
  allColumns,
  actions,
  bulkActions,
  selectedCount = 0,
  onClearSelection,
  filters,
  showFilters = false,
  filterCount = 0,
  onToggleFilters,
  loading = false,
  className,
  ...props
}: DataTableToolbarProps) {
  const isSelecting = selectedCount > 0;

  return (
    <div
      className={cn(
        "flex flex-wrap items-center gap-2 p-3 rounded-lg border bg-card",
        className,
      )}
      {...props}
    >
      {isSelecting ? (
        <div className="flex items-center gap-2 flex-1 min-w-0">
          <Badge variant="secondary" className="shrink-0">
            {selectedCount} selected
          </Badge>
          {bulkActions?.map((action) => (
            <Button
              key={action.id}
              size="sm"
              variant={action.variant ?? "outline"}
              onClick={action.onClick}
              disabled={action.disabled || loading}
              className="shrink-0"
            >
              {action.icon}
              {action.label}
            </Button>
          ))}
          {onClearSelection && (
            <Button
              size="sm"
              variant="ghost"
              onClick={onClearSelection}
              className="shrink-0"
            >
              Clear
            </Button>
          )}
        </div>
      ) : (
        <>
          {showSearch && (
            <div className="relative flex-1 min-w-48">
              <svg
                className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.35-4.35" />
              </svg>
              <Input
                type="search"
                placeholder={searchPlaceholder}
                value={search}
                onChange={(e) => onSearchChange?.(e.target.value)}
                disabled={loading}
                className="pl-9"
                aria-label="Search table"
              />
            </div>
          )}

          {showFilters && filters && (
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={onToggleFilters}
                  aria-label="Toggle filters"
                  className="relative"
                >
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
                  Filters
                  {filterCount > 0 && (
                    <Badge
                      variant="secondary"
                      className="ml-1.5 h-4 min-w-4 justify-center px-1 text-xs"
                    >
                      {filterCount}
                    </Badge>
                  )}
                </Button>
              </TooltipTrigger>
              <TooltipContent>Toggle column filters</TooltipContent>
            </Tooltip>
          )}

          {allColumns && allColumns.length > 0 && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" disabled={loading}>
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
                    className="mr-1.5"
                    aria-hidden="true"
                  >
                    <path d="M12 3v18" />
                    <rect width="6" height="18" x="9" y="3" rx="2" />
                    <path d="M6 8h12" />
                    <path d="M6 16h12" />
                  </svg>
                  Columns
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuLabel>Toggle columns</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {allColumns.map((col) => {
                  const vis = columnVisibility?.find((c) => c.id === col.id);
                  return (
                    <DropdownMenuCheckboxItem
                      key={col.id}
                      checked={vis?.visible ?? true}
                      onCheckedChange={(checked) => {
                        if (!columnVisibility || !onColumnVisibilityChange) return;
                        onColumnVisibilityChange(
                          columnVisibility.map((c) =>
                            c.id === col.id ? { ...c, visible: checked } : c,
                          ),
                        );
                      }}
                    >
                      {col.label}
                    </DropdownMenuCheckboxItem>
                  );
                })}
              </DropdownMenuContent>
            </DropdownMenu>
          )}

          {actions?.map((action) => (
            <Button
              key={action.id}
              size="sm"
              variant={action.variant ?? "default"}
              onClick={action.onClick}
              disabled={action.disabled || loading}
            >
              {action.icon}
              {action.label}
            </Button>
          ))}
        </>
      )}
    </div>
  );
}

DataTableToolbar.displayName = "DataTableToolbar";

export { DataTableToolbar };
