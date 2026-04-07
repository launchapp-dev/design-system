import * as React from "react";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/Card";
import { Badge } from "@/components/Badge";
import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import {
  SelectRoot as Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/Select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/Table";

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

export type BillingHistoryStatus = "paid" | "pending" | "failed" | "refunded" | "void";

export interface BillingInvoice {
  id: string;
  number: string;
  date: string;
  dueDate?: string;
  amount: string;
  tax?: string;
  status: BillingHistoryStatus;
  description?: string;
  downloadUrl?: string;
  viewUrl?: string;
}

export interface BillingHistoryProps extends React.HTMLAttributes<HTMLDivElement> {
  invoices: BillingInvoice[];
  showTax?: boolean;
  onDownload?: (invoice: BillingInvoice) => void;
  onView?: (invoice: BillingInvoice) => void;
  onExport?: () => void;
  title?: string;
  pageSize?: number;
}

const statusVariant: Record<BillingHistoryStatus, "default" | "secondary" | "destructive" | "outline" | "secondary"> = {
  paid: "default",
  pending: "secondary",
  failed: "destructive",
  refunded: "outline",
  void: "secondary",
};

const statusLabel: Record<BillingHistoryStatus, string> = {
  paid: "Paid",
  pending: "Pending",
  failed: "Failed",
  refunded: "Refunded",
  void: "Void",
};

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
}

function BillingHistory({
  invoices,
  showTax = false,
  onDownload,
  onView,
  onExport,
  title = "Billing History",
  pageSize: pageSizeProp = 10,
  className,
  ...props
}: BillingHistoryProps) {
  const [search, setSearch] = React.useState("");
  const [statusFilter, setStatusFilter] = React.useState<BillingHistoryStatus | "all">("all");
  const [page, setPage] = React.useState(0);
  const [pageSize, setPageSize] = React.useState(pageSizeProp);

  const filtered = React.useMemo(() => {
    return invoices.filter((inv) => {
      if (search && !inv.number.toLowerCase().includes(search.toLowerCase()) && !inv.description?.toLowerCase().includes(search.toLowerCase())) return false;
      if (statusFilter !== "all" && inv.status !== statusFilter) return false;
      return true;
    });
  }, [invoices, search, statusFilter]);

  const pageCount = Math.max(1, Math.ceil(filtered.length / pageSize));
  const pageData = filtered.slice(page * pageSize, (page + 1) * pageSize);

  React.useEffect(() => { setPage(0); }, [search, statusFilter]);

  const totalPaid = filtered.filter((i) => i.status === "paid").reduce((acc, i) => acc + parseFloat(i.amount.replace(/[^0-9.]/g, "")), 0);

  return (
    <div className={cn("space-y-4", className)} {...props}>
      <div className="flex items-center justify-between">
        <h3 className="text-base font-semibold">{title}</h3>
        <div className="flex gap-2">
          {onExport && <Button variant="outline" size="sm" onClick={onExport}>Export CSV</Button>}
        </div>
      </div>

      <Card>
        <CardContent className="pt-4">
          <div className="flex flex-wrap items-center gap-2">
            <Input
              placeholder="Search by invoice number…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1 min-w-[160px]"
            />
            <Select value={statusFilter} onValueChange={(v) => setStatusFilter(v as BillingHistoryStatus | "all")}>
              <SelectTrigger className="w-[130px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All statuses</SelectItem>
                <SelectItem value="paid">Paid</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="failed">Failed</SelectItem>
                <SelectItem value="refunded">Refunded</SelectItem>
                <SelectItem value="void">Void</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {filtered.length > 0 && (
        <div className="rounded-lg border bg-muted/30 px-4 py-3 flex items-center justify-between">
          <span className="text-sm text-muted-foreground">{filtered.length} invoice{filtered.length !== 1 ? "s" : ""}</span>
          <span className="text-sm font-medium">Total paid: ${totalPaid.toFixed(2)}</span>
        </div>
      )}

      <div className="rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Invoice</TableHead>
              <TableHead>Date</TableHead>
              {showTax && <TableHead>Tax</TableHead>}
              <TableHead className="text-right">Amount</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="w-24" />
            </TableRow>
          </TableHeader>
          <TableBody>
            {pageData.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="py-8 text-center text-sm text-muted-foreground">
                  No invoices found.
                </TableCell>
              </TableRow>
            ) : (
              pageData.map((invoice) => (
                <TableRow key={invoice.id}>
                  <TableCell>
                    <div className="text-sm font-medium">{invoice.number}</div>
                    {invoice.description && <div className="text-xs text-muted-foreground truncate max-w-[200px]">{invoice.description}</div>}
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">{formatDate(invoice.date)}</TableCell>
                  {showTax && <TableCell className="text-sm text-muted-foreground">{invoice.tax ?? "—"}</TableCell>}
                  <TableCell className="text-right font-medium">{invoice.amount}</TableCell>
                  <TableCell><Badge variant={statusVariant[invoice.status]}>{statusLabel[invoice.status]}</Badge></TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      {onView && (
                        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => onView(invoice)} title="View invoice">
                          <EyeIcon className="h-4 w-4" />
                        </Button>
                      )}
                      {onDownload && (
                        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => onDownload(invoice)} title="Download PDF">
                          <DownloadIcon className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {pageCount > 1 && (
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Showing {page * pageSize + 1}–{Math.min((page + 1) * pageSize, filtered.length)} of {filtered.length}
          </p>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={() => setPage((p) => Math.max(0, p - 1))} disabled={page === 0}>Previous</Button>
            <span className="text-sm text-muted-foreground">{page + 1} / {pageCount}</span>
            <Button variant="outline" size="sm" onClick={() => setPage((p) => Math.min(pageCount - 1, p + 1))} disabled={page >= pageCount - 1}>Next</Button>
          </div>
        </div>
      )}
    </div>
  );
}

BillingHistory.displayName = "BillingHistory";

export { BillingHistory };
