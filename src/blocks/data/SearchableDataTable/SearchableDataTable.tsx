import * as React from "react";
import {
  type ColumnDef,
  type ColumnFiltersState,
  type SortingState,
  type PaginationState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/Table";
import { Input } from "@/components/Input";
import { Button } from "@/components/Button";
import { Badge } from "@/components/Badge";
import {
  SelectRoot,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/Select";
import { cn } from "@/lib/utils";

export interface SearchableDataTableFilterOption {
  label: string;
  value: string;
}

export interface SearchableDataTableProps<TData> {
  columns: ColumnDef<TData>[];
  data: TData[];
  searchColumn?: string;
  searchPlaceholder?: string;
  filterColumn?: string;
  filterLabel?: string;
  filterOptions?: SearchableDataTableFilterOption[];
  pageSize?: number;
  className?: string;
}

function SearchableDataTableInner<TData>(
  {
    columns,
    data,
    searchColumn,
    searchPlaceholder = "Search...",
    filterColumn,
    filterLabel = "Filter",
    filterOptions,
    pageSize = 10,
    className,
  }: SearchableDataTableProps<TData>,
  ref: React.ForwardedRef<HTMLDivElement>
) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [activeFilter, setActiveFilter] = React.useState<string>("");
  const [pagination, setPagination] = React.useState<PaginationState>({
    pageIndex: 0,
    pageSize,
  });

  const effectiveData = React.useMemo(() => {
    if (!filterColumn || !activeFilter) return data;
    return data.filter(
      (row) => String((row as Record<string, unknown>)[filterColumn] ?? "") === activeFilter
    );
  }, [data, filterColumn, activeFilter]);

  const searchCol =
    searchColumn ??
    (columns[0] as ColumnDef<TData> & { accessorKey?: string })?.accessorKey;

  const table = useReactTable({
    data: effectiveData,
    columns,
    state: { sorting, columnFilters, pagination },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    table.getColumn(String(searchCol))?.setFilterValue(e.target.value);
    setPagination((prev) => ({ ...prev, pageIndex: 0 }));
  };

  const handleFilterChange = (value: string) => {
    setActiveFilter(value === "__all__" ? "" : value);
    setPagination((prev) => ({ ...prev, pageIndex: 0 }));
  };

  return (
    <div ref={ref} className={cn("space-y-4", className)}>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        {searchCol && (
          <Input
            placeholder={searchPlaceholder}
            value={
              (table.getColumn(String(searchCol))?.getFilterValue() as string) ?? ""
            }
            onChange={handleSearchChange}
            className="max-w-xs"
          />
        )}
        {filterColumn && filterOptions && filterOptions.length > 0 && (
          <div className="flex items-center gap-2">
            <SelectRoot
              value={activeFilter || "__all__"}
              onValueChange={handleFilterChange}
            >
              <SelectTrigger className="w-44">
                <SelectValue placeholder={filterLabel} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="__all__">All</SelectItem>
                {filterOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </SelectRoot>
            {activeFilter && (
              <Badge
                variant="secondary"
                className="cursor-pointer gap-1"
                onClick={() => handleFilterChange("__all__")}
              >
                {filterOptions.find((o) => o.value === activeFilter)?.label ?? activeFilter}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="12"
                  height="12"
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
            )}
          </div>
        )}
        <p className="ml-auto text-sm text-muted-foreground">
          {table.getFilteredRowModel().rows.length} result
          {table.getFilteredRowModel().rows.length !== 1 ? "s" : ""}
        </p>
      </div>

      <div className="overflow-hidden rounded-md border border-border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    onClick={
                      header.column.getCanSort()
                        ? header.column.getToggleSortingHandler()
                        : undefined
                    }
                    className={header.column.getCanSort() ? "cursor-pointer select-none" : ""}
                  >
                    {header.isPlaceholder ? null : (
                      <span className="inline-flex items-center gap-1">
                        {flexRender(header.column.columnDef.header, header.getContext())}
                        {header.column.getCanSort() && (
                          <span className="text-xs text-muted-foreground">
                            {header.column.getIsSorted() === "asc"
                              ? "↑"
                              : header.column.getIsSorted() === "desc"
                              ? "↓"
                              : "↕"}
                          </span>
                        )}
                      </span>
                    )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
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
          Page {table.getState().pagination.pageIndex + 1} of{" "}
          {Math.max(1, table.getPageCount())}
        </p>
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>Rows:</span>
            <SelectRoot
              value={String(table.getState().pagination.pageSize)}
              onValueChange={(value) => table.setPageSize(Number(value))}
            >
              <SelectTrigger size="sm" className="w-16">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {[10, 20, 50].map((size) => (
                  <SelectItem key={size} value={String(size)}>
                    {size}
                  </SelectItem>
                ))}
              </SelectContent>
            </SelectRoot>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}

export const SearchableDataTable = React.forwardRef(SearchableDataTableInner) as <TData>(
  props: SearchableDataTableProps<TData> & { ref?: React.ForwardedRef<HTMLDivElement> }
) => React.ReactElement;

(
  SearchableDataTable as React.ForwardRefExoticComponent<SearchableDataTableProps<unknown>>
).displayName = "SearchableDataTable";
