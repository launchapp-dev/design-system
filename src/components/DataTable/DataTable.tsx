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
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../Table";
import { Input } from "../Input";
import { Button } from "../Button";
import { cn } from "../../lib/utils";

export interface DataTableProps<TData, TValue> {
  ref?: React.Ref<HTMLDivElement>;
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  filterColumn?: string;
  filterPlaceholder?: string;
  pageSize?: number;
  className?: string;
  "aria-label"?: string;
  "aria-labelledby"?: string;
}

export function DataTable<TData, TValue>({
  ref,
  columns,
  data,
  filterColumn,
  filterPlaceholder = "Filter...",
  pageSize = 10,
  className,
  "aria-label": ariaLabel,
  "aria-labelledby": ariaLabelledby,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [pagination, setPagination] = React.useState<PaginationState>({
    pageIndex: 0,
    pageSize,
  });

  const table = useReactTable({
    data,
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

  const filterCol =
    filterColumn ??
    columns[0]?.id ??
    (columns[0] as ColumnDef<TData, TValue> & { accessorKey?: string })?.accessorKey;

  if (process.env.NODE_ENV !== "production" && !ariaLabel && !ariaLabelledby) {
    console.warn(
      "DataTable: Missing accessible name. Provide `aria-label` or `aria-labelledby` for WCAG 1.3.1 compliance.",
    );
  }

  return (
    <div ref={ref} className={cn("space-y-4 w-full", className)}>
      {filterCol && (
        <Input
          aria-label={filterPlaceholder}
          placeholder={filterPlaceholder}
          value={(table.getColumn(String(filterCol))?.getFilterValue() as string) ?? ""}
          onChange={(e) => table.getColumn(String(filterCol))?.setFilterValue(e.target.value)}
          className="w-full max-w-full md:max-w-sm"
        />
      )}

      <div className="w-full overflow-x-auto rounded-md border border-border -mx-4 px-4 md:mx-0 md:px-0 md:border-0">
        <Table
          aria-label={ariaLabel}
          aria-labelledby={ariaLabelledby}
          className="min-w-full md:min-w-0"
        >
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="hover:bg-transparent">
                {headerGroup.headers.map((header) => {
                  const isSortable = header.column.getCanSort();
                  const sortDir = header.column.getIsSorted();
                  const ariaSortValue =
                    sortDir === "asc" ? "ascending" : sortDir === "desc" ? "descending" : "none";
                  return (
                    <TableHead
                      key={header.id}
                      onClick={isSortable ? header.column.getToggleSortingHandler() : undefined}
                      tabIndex={isSortable ? 0 : undefined}
                      aria-sort={isSortable ? ariaSortValue : undefined}
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
                      className={cn(
                        isSortable ? "cursor-pointer select-none" : "",
                        "min-h-[44px] whitespace-nowrap",
                      )}
                    >
                      {header.isPlaceholder ? null : (
                        <span className="inline-flex items-center gap-1">
                          {flexRender(header.column.columnDef.header, header.getContext())}
                          {header.column.getCanSort() && (
                            <span aria-hidden="true" className="text-muted-foreground">
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
                  data-state={row.getIsSelected() && "selected"}
                  className="hover:bg-muted/50"
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="py-3 md:py-2">
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

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between sm:gap-2">
        <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
          <span className="hidden sm:inline">Rows per page:</span>
          <select
            value={table.getState().pagination.pageSize}
            onChange={(e) => table.setPageSize(Number(e.target.value))}
            className="h-11 md:h-8 rounded-md border border-input bg-background px-3 md:px-2 text-sm min-h-[44px] md:min-h-0 w-full sm:w-auto"
            aria-label="Rows per page"
          >
            {[10, 20, 30, 50].map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
          <span className="text-sm text-muted-foreground text-center sm:text-left">
            Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
          </span>
          <div className="flex gap-2 justify-center sm:justify-end">
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
              className="min-h-[44px] px-4"
              aria-label="Previous page"
            >
              <span className="hidden sm:inline">Previous</span>
              <svg
                className="h-4 w-4 sm:hidden"
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
                <path d="m15 18-6-6 6-6" />
              </svg>
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
              className="min-h-[44px] px-4"
              aria-label="Next page"
            >
              <span className="hidden sm:inline">Next</span>
              <svg
                className="h-4 w-4 sm:hidden"
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
                <path d="m9 18 6-6-6-6" />
              </svg>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
