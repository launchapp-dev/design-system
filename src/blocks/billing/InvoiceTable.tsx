import * as React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/Table";
import { Badge } from "../../components/Badge";
import { Button } from "../../components/Button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../../components/DropdownMenu";
import { MoreHorizontal, Download, Eye } from "lucide-react";
import { cn } from "../../lib/utils";

export type InvoiceStatus = "paid" | "pending" | "failed" | "refunded";

export interface Invoice {
  id: string;
  number: string;
  date: string;
  amount: string;
  status: InvoiceStatus;
  description?: string;
  downloadUrl?: string;
}

export interface InvoiceTableProps extends React.HTMLAttributes<HTMLDivElement> {
  invoices: Invoice[];
  showDescription?: boolean;
  onDownload?: (invoice: Invoice) => void;
  onView?: (invoice: Invoice) => void;
  caption?: string;
}

const statusVariant: Record<InvoiceStatus, "default" | "secondary" | "destructive" | "outline"> = {
  paid: "default",
  pending: "secondary",
  failed: "destructive",
  refunded: "outline",
};

const statusLabel: Record<InvoiceStatus, string> = {
  paid: "Paid",
  pending: "Pending",
  failed: "Failed",
  refunded: "Refunded",
};

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function InvoiceTable({
  invoices,
  showDescription = false,
  onDownload,
  onView,
  caption,
  className,
  ...props
}: InvoiceTableProps) {
  return (
    <div className={cn("space-y-4", className)} {...props}>
      <Table>
        {caption && <TableCaption>{caption}</TableCaption>}
        <TableHeader>
          <TableRow>
            <TableHead>Invoice</TableHead>
            <TableHead>Date</TableHead>
            {showDescription && <TableHead>Description</TableHead>}
            <TableHead className="text-right">Amount</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="w-12" />
          </TableRow>
        </TableHeader>
        <TableBody>
          {invoices.map((invoice) => (
            <TableRow key={invoice.id}>
              <TableCell className="font-medium">{invoice.number}</TableCell>
              <TableCell className="text-muted-foreground">{formatDate(invoice.date)}</TableCell>
              {showDescription && (
                <TableCell className="text-muted-foreground">{invoice.description}</TableCell>
              )}
              <TableCell className="text-right font-medium">{invoice.amount}</TableCell>
              <TableCell>
                <Badge variant={statusVariant[invoice.status]}>
                  {statusLabel[invoice.status]}
                </Badge>
              </TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    {onView && (
                      <DropdownMenuItem onClick={() => onView(invoice)}>
                        <Eye className="mr-2 h-4 w-4" />
                        View invoice
                      </DropdownMenuItem>
                    )}
                    {onDownload && (
                      <DropdownMenuItem onClick={() => onDownload(invoice)}>
                        <Download className="mr-2 h-4 w-4" />
                        Download PDF
                      </DropdownMenuItem>
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {invoices.length === 0 && (
        <p className="py-8 text-center text-sm text-muted-foreground">No invoices found.</p>
      )}
    </div>
  );
}

InvoiceTable.displayName = "InvoiceTable";

export { InvoiceTable };
export type { InvoiceTableProps, Invoice, InvoiceStatus };
