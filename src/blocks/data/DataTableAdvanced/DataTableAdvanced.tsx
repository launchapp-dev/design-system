import * as React from "react";
import {
  type ColumnDef,
  type ColumnFiltersState,
  type SortingState,
  type PaginationState,
  type VisibilityState,
  type RowSelectionState,
  type ColumnSizingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/Table";
import { Input } from "@/components/Input";
import { Button } from "@/components/Button";
import { Checkbox } from "@/components/Checkbox";
import { Badge } from "@/components/Badge";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/DropdownMenu";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/Popover";
import { Label } from "@/components/Label";
import {
  SelectRoot,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/Select";
import { cn } from "@/lib/utils";

export interface DataTableAdvancedFilterOption {
  label: string;
  value: string;
}

export interface DataTableAdvancedProps<TData> {
  columns: ColumnDef<TData>[];
  data: TData[];
  title?: string;
  searchColumn?: string;
  searchPlaceholder?: string;
  filterColumns?: {
    column: string;
    label: string;
    options: DataTableAdvancedFilterOption[];
  }[];
  pageSize?: number;
  enableColumnResize?: boolean;
  enableExport?: boolean;
  onExport?: (rows: TData[], format: "csv" | "json") => void;
  onBulkDelete?: (rows: TData[]) => void;
  onRowClick?: (row: TData) => void;
  className?: string;
}

function exportToCsv<TData>(rows: TData[], filename = "export.csv") {
  if (rows.length === 0) return;
  const keys = Object.keys(rows[0] as Record<string, unknown>);
  const csvRows = [
    keys.join(","),
    ...rows.map((row) =>
      keys
        .map((k) => {
          const val = String((row as Record<string, unknown>)[k] ?? "");
          return `"${val.replace(/"/g, '""')}"`;
        })
        .join(","),
    ),
  ];
  const blob = new Blob([csvRows.join("\n")], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

function exportToJson<TData>(rows: TData[], filename = "export.json") {
  const blob = new Blob([JSON.stringify(rows, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

function DataTableAdvancedInner<TData>(
  {
    columns,
    data,
    title,
    searchColumn,
    searchPlaceholder = "Search...",
    filterColumns,
    pageSize = 10,
    enableColumnResize = false,
    enableExport = false,
    onExport,
    onBulkDelete,
    onRowClick,
    className,
  }: DataTableAdvancedProps<TData>,
  ref: React.ForwardedRef<HTMLDivElement>,
) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState<RowSelectionState>({});
  const [columnSizing, setColumnSizing] = React.useState<ColumnSizingState>({});
  const [pagination, setPagination] = React.useState<PaginationState>({
    pageIndex: 0,
    pageSize,
  });
  const [activeFilters, setActiveFilters] = React.useState<Record<string, string[]>>({});

  const effectiveData = React.useMemo(() => {
    if (!filterColumns || Object.keys(activeFilters).length === 0) return data;
    return data.filter((row) => {
      return Object.entries(activeFilters).every(([col, vals]) => {
        if (vals.length === 0) return true;
        const value = String((row as Record<string, unknown>)[col] ?? "");
        return vals.includes(value);
      });
    });
  }, [data, filterColumns, activeFilters]);

  const columnsWithSelect = React.useMemo<ColumnDef<TData>[]>(
    () => [
      {
        id: "select",
        size: 44,
        header: ({ table }) => (
          <Checkbox
            checked={
              table.getIsAllPageRowsSelected()
                ? true
                : table.getIsSomePageRowsSelected()
                  ? "indeterminate"
                  : false
            }
            onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
            aria-label="Select all"
          />
        ),
        cell: ({ row }) => (
          <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(value) => row.toggleSelected(!!value)}
            aria-label="Select row"
          />
        ),
        enableSorting: false,
        enableHiding: false,
        enableResizing: false,
      },
      ...columns,
    ],
    [columns],
  );

  const searchCol =
    searchColumn ?? (columns[0] as ColumnDef<TData> & { accessorKey?: string })?.accessorKey;

  const table = useReactTable({
    data: effectiveData,
    columns: columnsWithSelect,
    state: { sorting, columnFilters, columnVisibility, rowSelection, columnSizing, pagination },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    onColumnSizingChange: setColumnSizing,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    columnResizeMode: enableColumnResize ? "onChange" : undefined,
    enableColumnResizing: enableColumnResize,
  });

  const selectedRows = table.getFilteredSelectedRowModel().rows;
  const hasSelection = selectedRows.length > 0;

  const toggleFilter = (column: string, value: string) => {
    setActiveFilters((prev) => {
      const existing = prev[column] ?? [];
      const next = existing.includes(value)
        ? existing.filter((v) => v !== value)
        : [...existing, value];
      return { ...prev, [column]: next };
    });
    setPagination((prev) => ({ ...prev, pageIndex: 0 }));
  };

  const clearAllFilters = () => {
    setActiveFilters({});
    setPagination((prev) => ({ ...prev, pageIndex: 0 }));
  };

  const activeFilterCount = Object.values(activeFilters).reduce((acc, v) => acc + v.length, 0);

  const handleExport = (format: "csv" | "json") => {
    const rows = hasSelection
      ? selectedRows.map((r) => r.original)
      : table.getFilteredRowModel().rows.map((r) => r.original);
    if (onExport) {
      onExport(rows, format);
    } else if (format === "csv") {
      exportToCsv(rows);
    } else {
      exportToJson(rows);
    }
  };

  return (
    <div ref={ref} className={cn("space-y-4", className)}>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-1 flex-wrap items-center gap-2">
          {searchCol && (
            <Input
              placeholder={searchPlaceholder}
              value={(table.getColumn(String(searchCol))?.getFilterValue() as string) ?? ""}
              onChange={(e) => {
                table.getColumn(String(searchCol))?.setFilterValue(e.target.value);
                setPagination((prev) => ({ ...prev, pageIndex: 0 }));
              }}
              className="max-w-xs"
              aria-label={searchPlaceholder}
            />
          )}

          {filterColumns && filterColumns.length > 0 && (
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" size="sm" className="h-10 gap-1.5">
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
                  Filter
                  {activeFilterCount > 0 && (
                    <Badge variant="secondary" className="ml-1 h-5 min-w-5 px-1 text-[10px]">
                      {activeFilterCount}
                    </Badge>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-64 p-3" align="start">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    Filters
                  </p>
                  {activeFilterCount > 0 && (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-auto px-1 py-0 text-xs text-muted-foreground hover:text-foreground"
                      onClick={clearAllFilters}
                    >
                      Clear all
                    </Button>
                  )}
                </div>
                <div className="space-y-4">
                  {filterColumns.map((fc) => (
                    <div key={fc.column}>
                      <p className="mb-1.5 text-xs font-medium text-foreground">{fc.label}</p>
                      <div className="space-y-1">
                        {fc.options.map((option) => (
                          <Label
                            key={option.value}
                            className="flex cursor-pointer items-center gap-2 rounded px-2 py-1.5 text-sm font-normal hover:bg-accent"
                          >
                            <Checkbox
                              checked={(activeFilters[fc.column] ?? []).includes(option.value)}
                              onCheckedChange={() => toggleFilter(fc.column, option.value)}
                            />
                            {option.label}
                          </Label>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </PopoverContent>
            </Popover>
          )}

          {activeFilterCount > 0 &&
            Object.entries(activeFilters).flatMap(([col, vals]) =>
              vals.map((val) => {
                const fc = filterColumns?.find((f) => f.column === col);
                const label = fc?.options.find((o) => o.value === val)?.label ?? val;
                return (
                  <Badge
                    key={`${col}:${val}`}
                    variant="secondary"
                    className="cursor-pointer gap-1 pr-1"
                    onClick={() => toggleFilter(col, val)}
                  >
                    {fc ? `${fc.label}: ` : ""}
                    {label}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="10"
                      height="10"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <line x1="18" y1="6" x2="6" y2="18" />
                      <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                  </Badge>
                );
              }),
            )}
        </div>

        <div className="flex items-center gap-2">
          {enableExport && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="h-10 gap-1.5">
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
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="7 10 12 15 17 10" />
                    <line x1="12" y1="15" x2="12" y2="3" />
                  </svg>
                  Export
                  {hasSelection && (
                    <Badge variant="secondary" className="ml-1 h-5 min-w-5 px-1 text-[10px]">
                      {selectedRows.length}
                    </Badge>
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="min-w-36">
                <DropdownMenuLabel>
                  {hasSelection ? `Export ${selectedRows.length} selected` : "Export all"}
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => handleExport("csv")}>
                  Export as CSV
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleExport("json")}>
                  Export as JSON
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="h-10 gap-1.5">
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
                Columns
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="min-w-40">
              <DropdownMenuLabel>Toggle columns</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {table
                .getAllColumns()
                .filter((col) => col.getCanHide())
                .map((col) => (
                  <DropdownMenuCheckboxItem
                    key={col.id}
                    checked={col.getIsVisible()}
                    onCheckedChange={(value) => col.toggleVisibility(!!value)}
                    className="capitalize"
                  >
                    {col.id}
                  </DropdownMenuCheckboxItem>
                ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {hasSelection && (
        <div className="flex items-center gap-3 rounded-md border border-border bg-muted/50 px-4 py-2">
          <span className="text-sm text-muted-foreground">
            {selectedRows.length} row{selectedRows.length !== 1 ? "s" : ""} selected
          </span>
          <div className="flex-1" />
          {onBulkDelete && (
            <Button
              variant="destructive"
              size="sm"
              onClick={() => {
                onBulkDelete(selectedRows.map((r) => r.original));
                table.resetRowSelection();
              }}
            >
              Delete selected
            </Button>
          )}
          <Button variant="ghost" size="sm" onClick={() => table.resetRowSelection()}>
            Clear
          </Button>
        </div>
      )}

      <div
        className={cn(
          "overflow-hidden rounded-md border border-border",
          enableColumnResize && "overflow-x-auto",
        )}
      >
        <Table
          style={
            enableColumnResize
              ? { width: table.getTotalSize(), tableLayout: "fixed" }
              : undefined
          }
          aria-label={title ?? "Data table"}
        >
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  const isSortable = header.column.getCanSort();
                  const sortDir = header.column.getIsSorted();
                  const ariaSortValue =
                    sortDir === "asc" ? "ascending" : sortDir === "desc" ? "descending" : "none";
                  return (
                    <TableHead
                      key={header.id}
                      style={enableColumnResize ? { width: header.getSize() } : undefined}
                      aria-sort={isSortable ? ariaSortValue : undefined}
                      className={cn("relative", isSortable ? "cursor-pointer select-none" : "")}
                      onClick={isSortable ? header.column.getToggleSortingHandler() : undefined}
                      onKeyDown={
                        isSortable
                          ? (e) => {
                              if (e.key === "Enter" || e.key === " ") {
                                e.preventDefault();
                                header.column.getToggleSortingHandler()?.(e);
                              }
                            }
                          : undefined
                      }
                      tabIndex={isSortable ? 0 : undefined}
                    >
                      {header.isPlaceholder ? null : (
                        <span className="inline-flex items-center gap-1">
                          {flexRender(header.column.columnDef.header, header.getContext())}
                          {isSortable && (
                            <span className="text-xs text-muted-foreground" aria-hidden="true">
                              {sortDir === "asc" ? "↑" : sortDir === "desc" ? "↓" : "↕"}
                            </span>
                          )}
                        </span>
                      )}
                      {enableColumnResize && header.column.getCanResize() && (
                        <div
                          onMouseDown={header.getResizeHandler()}
                          onTouchStart={header.getResizeHandler()}
                          className={cn(
                            "absolute right-0 top-0 h-full w-1 cursor-col-resize touch-none select-none bg-border opacity-0 hover:opacity-100",
                            header.column.getIsResizing() && "bg-primary opacity-100",
                          )}
                          aria-hidden="true"
                        />
                      )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() ? "selected" : undefined}
                  onClick={onRowClick ? () => onRowClick(row.original) : undefined}
                  className={cn(onRowClick && "cursor-pointer")}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      style={enableColumnResize ? { width: cell.column.getSize() } : undefined}
                    >
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columnsWithSelect.length}
                  className="h-24 text-center text-muted-foreground"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected
        </p>
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>Rows per page:</span>
            <SelectRoot
              value={String(table.getState().pagination.pageSize)}
              onValueChange={(value) => {
                table.setPageSize(Number(value));
                setPagination((prev) => ({ ...prev, pageIndex: 0 }));
              }}
            >
              <SelectTrigger size="sm" className="w-16">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {[10, 20, 30, 50, 100].map((size) => (
                  <SelectItem key={size} value={String(size)}>
                    {size}
                  </SelectItem>
                ))}
              </SelectContent>
            </SelectRoot>
          </div>
          <span className="text-sm text-muted-foreground">
            Page {table.getState().pagination.pageIndex + 1} of {Math.max(1, table.getPageCount())}
          </span>
          <div className="flex gap-1">
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.setPageIndex(0)}
              disabled={!table.getCanPreviousPage()}
              aria-label="First page"
            >
              {"«"}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
              aria-label="Previous page"
            >
              {"‹"}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
              aria-label="Next page"
            >
              {"›"}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.setPageIndex(table.getPageCount() - 1)}
              disabled={!table.getCanNextPage()}
              aria-label="Last page"
            >
              {"»"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export const DataTableAdvanced = React.forwardRef(DataTableAdvancedInner) as <TData>(
  props: DataTableAdvancedProps<TData> & { ref?: React.ForwardedRef<HTMLDivElement> },
) => React.ReactElement;

(DataTableAdvanced as React.ForwardRefExoticComponent<DataTableAdvancedProps<unknown>>).displayName =
  "DataTableAdvanced";
