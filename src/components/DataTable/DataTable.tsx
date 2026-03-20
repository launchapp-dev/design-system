import * as React from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  PaginationState,
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
} from "../Table";
import { Input } from "../Input";
import { Button } from "../Button";
import { cn } from "../../lib/utils";

export interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  filterColumn?: string;
  filterPlaceholder?: string;
  pageSize?: number;
  className?: string;
  "aria-label"?: string;
  "aria-labelledby"?: string;
}

function DataTableInner<TData, TValue>(
  {
    columns,
    data,
    filterColumn,
    filterPlaceholder = "Filter...",
    pageSize = 10,
    className,
    "aria-label": ariaLabel,
    "aria-labelledby": ariaLabelledby,
  }: DataTableProps<TData, TValue>,
  ref: React.ForwardedRef<HTMLDivElement>
) {
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

  const filterCol = filterColumn ?? columns[0]?.id ?? (columns[0] as ColumnDef<TData, TValue> & { accessorKey?: string })?.accessorKey;

  if (process.env.NODE_ENV !== "production" && !ariaLabel && !ariaLabelledby) {
    console.warn(
      "DataTable: Missing accessible name. Provide `aria-label` or `aria-labelledby` for WCAG 1.3.1 compliance."
    );
  }

  return (
    <div ref={ref} className={cn("space-y-4", className)}>
      {filterCol && (
        <Input
          aria-label={filterPlaceholder}
          placeholder={filterPlaceholder}
          value={(table.getColumn(String(filterCol))?.getFilterValue() as string) ?? ""}
          onChange={(e) =>
            table.getColumn(String(filterCol))?.setFilterValue(e.target.value)
          }
          className="max-w-sm"
        />
      )}

      <Table aria-label={ariaLabel} aria-labelledby={ariaLabelledby}>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                const isSortable = header.column.getCanSort();
                const sortDir = header.column.getIsSorted();
                const ariaSortValue = sortDir === "asc" ? "ascending" : sortDir === "desc" ? "descending" : "none";
                return (
                <TableHead
                  key={header.id}
                  onClick={isSortable ? header.column.getToggleSortingHandler() : undefined}
                  tabIndex={isSortable ? 0 : undefined}
                  aria-sort={isSortable ? ariaSortValue : undefined}
                  onKeyDown={isSortable ? (e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      header.column.getToggleSortingHandler()?.(e);
                    }
                  } : undefined}
                  className={isSortable ? "cursor-pointer select-none" : ""}
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
              <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center text-muted-foreground">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span>Rows per page:</span>
          <select
            value={table.getState().pagination.pageSize}
            onChange={(e) => table.setPageSize(Number(e.target.value))}
            className="h-8 rounded-md border border-input bg-background px-2 text-sm"
            aria-label="Rows per page"
          >
            {[10, 20, 30, 50].map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">
            Page {table.getState().pagination.pageIndex + 1} of{" "}
            {table.getPageCount()}
          </span>
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

export const DataTable = React.forwardRef(DataTableInner) as <TData, TValue>(
  props: DataTableProps<TData, TValue> & { ref?: React.ForwardedRef<HTMLDivElement> }
) => React.ReactElement;

(DataTable as React.ForwardRefExoticComponent<DataTableProps<unknown, unknown>>).displayName = "DataTable";
