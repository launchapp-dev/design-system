import type * as React from "react";
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
// ── Icons (inline SVG to avoid lucide-react dep in block layer) ──────────────
function MoreHorizontalIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <circle cx="12" cy="12" r="1.5" /><circle cx="19" cy="12" r="1.5" /><circle cx="5" cy="12" r="1.5" />
    </svg>
  );
}
function DownloadIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" />
    </svg>
  );
}
function EyeIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" /><circle cx="12" cy="12" r="3" />
    </svg>
  );
}
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
                      <MoreHorizontalIcon className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    {onView && (
                      <DropdownMenuItem onClick={() => onView(invoice)}>
                        <EyeIcon className="mr-2 h-4 w-4" />
                        View invoice
                      </DropdownMenuItem>
                    )}
                    {onDownload && (
                      <DropdownMenuItem onClick={() => onDownload(invoice)}>
                        <DownloadIcon className="mr-2 h-4 w-4" />
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
