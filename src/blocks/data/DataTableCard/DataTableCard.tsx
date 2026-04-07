import type * as React from "react";
import { cn } from "@/lib/utils";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/Card";
import { Button } from "@/components/Button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/Table";

export interface DataTableColumn<T = Record<string, unknown>> {
  key: string;
  header: string;
  render?: (row: T) => React.ReactNode;
  sortable?: boolean;
}

export interface DataTableCardProps<T = Record<string, unknown>> extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  description?: string;
  columns: DataTableColumn<T>[];
  data: T[];
  keyField?: keyof T;
  actions?: React.ReactNode;
  onRowClick?: (row: T) => void;
  emptyMessage?: string;
  loading?: boolean;
}

function DataTableCard<T extends Record<string, unknown>>({
  title,
  description,
  columns,
  data,
  keyField = "id" as keyof T,
  actions,
  onRowClick,
  emptyMessage = "No data available",
  loading = false,
  className,
  ...props
}: DataTableCardProps<T>) {
  return (
    <Card ref={null} className={cn("", className)} {...props}>
      {(title || description || actions) && (
        <CardHeader className="flex flex-row items-start justify-between gap-4 space-y-0">
          <div>
            {title && <CardTitle className="text-base">{title}</CardTitle>}
            {description && <CardDescription className="mt-1">{description}</CardDescription>}
          </div>
          {actions && <div className="flex items-center gap-2">{actions}</div>}
        </CardHeader>
      )}
      <CardContent className={loading ? "opacity-50 pointer-events-none" : undefined}>
        <div className="overflow-hidden rounded-lg border">
          <Table>
            <TableHeader>
              <TableRow>
                {columns.map((col) => (
                  <TableHead key={col.key} className="font-semibold">
                    {col.header}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={columns.length} className="h-24 text-center text-muted-foreground">
                    {emptyMessage}
                  </TableCell>
                </TableRow>
              ) : (
                data.map((row, rowIndex) => (
                  <TableRow
                    key={String(row[keyField]) || rowIndex}
                    onClick={() => onRowClick?.(row)}
                    className={cn(onRowClick && "cursor-pointer hover:bg-muted/50")}
                  >
                    {columns.map((col) => (
                      <TableCell key={col.key}>
                        {col.render
                          ? col.render(row)
                          : String(row[col.key] ?? "")}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}

DataTableCard.displayName = "DataTableCard";

export { DataTableCard };
