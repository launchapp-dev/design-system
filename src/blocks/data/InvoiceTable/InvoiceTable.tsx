import type * as React from "react";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/Card";
import { Badge } from "@/components/Badge";
import { Button } from "@/components/Button";
import { Avatar, AvatarFallback } from "@/components/Avatar";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/DropdownMenu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/Select";
import { Input } from "@/components/Input";
import { ScrollArea } from "@/components/ScrollArea";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/Table";

export interface Invoice {
  id: string;
  number: string;
  client: string;
  clientEmail?: string;
  clientInitials?: string;
  amount: number;
  currency?: string;
  status: "paid" | "pending" | "overdue" | "draft";
  dueDate: string;
  issuedDate?: string;
  description?: string;
}

export interface InvoiceTableProps extends React.HTMLAttributes<HTMLDivElement> {
  invoices: Invoice[];
  onViewInvoice?: (invoice: Invoice) => void;
  onDownloadInvoice?: (invoice: Invoice) => void;
  onMarkPaid?: (invoice: Invoice) => void;
  onSendReminder?: (invoice: Invoice) => void;
  onDeleteInvoice?: (invoice: Invoice) => void;
  searchPlaceholder?: string;
  statusFilterLabel?: string;
  emptyMessage?: string;
}

const statusVariant: Record<Invoice["status"], "default" | "secondary" | "destructive" | "outline"> = {
  paid: "default",
  pending: "secondary",
  overdue: "destructive",
  draft: "outline",
};

const statusLabel: Record<Invoice["status"], string> = {
  paid: "Paid",
  pending: "Pending",
  overdue: "Overdue",
  draft: "Draft",
};

function MoreIcon() {
  return (
    <svg
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
      <circle cx="12" cy="12" r="1" />
      <circle cx="12" cy="5" r="1" />
      <circle cx="12" cy="19" r="1" />
    </svg>
  );
}

function DownloadIcon() {
  return (
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
      <line x1="12" x2="12" y1="15" y2="3" />
    </svg>
  );
}

function SendIcon() {
  return (
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
      <line x1="22" y1="2" x2="11" y2="13" />
      <polygon points="22 2 15 22 11 13 2 9 22 2" />
    </svg>
  );
}

function EyeIcon() {
  return (
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
      <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function TrashIcon() {
  return (
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
      <polyline points="3 6 5 6 21 6" />
      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
    </svg>
  );
}

function CheckIcon() {
  return (
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
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

function SearchIcon() {
  return (
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
      <circle cx="11" cy="11" r="8" />
      <line x1="21" x2="16.65" y1="21" y2="16.65" />
    </svg>
  );
}

function formatCurrency(amount: number, currency = "USD"): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
  }).format(amount);
}

function InvoiceTable({
  invoices,
  onViewInvoice,
  onDownloadInvoice,
  onMarkPaid,
  onSendReminder,
  onDeleteInvoice,
  searchPlaceholder = "Search invoices...",
  emptyMessage = "No invoices found",
  className,
  ...props
}: InvoiceTableProps) {
  const [search, setSearch] = React.useState("");
  const [statusFilter, setStatusFilter] = React.useState<string>("all");

  const filtered = React.useMemo(() => {
    return invoices.filter((inv) => {
      const matchesSearch =
        search === "" ||
        inv.number.toLowerCase().includes(search.toLowerCase()) ||
        inv.client.toLowerCase().includes(search.toLowerCase());
      const matchesStatus = statusFilter === "all" || inv.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [invoices, search, statusFilter]);

  const totalPaid = filtered.filter((i) => i.status === "paid").reduce((sum, i) => sum + i.amount, 0);
  const totalPending = filtered.filter((i) => i.status === "pending").reduce((sum, i) => sum + i.amount, 0);
  const totalOverdue = filtered.filter((i) => i.status === "overdue").reduce((sum, i) => sum + i.amount, 0);

  return (
    <div ref={((props as { ref?: React.Ref<HTMLDivElement> }).ref) as React.Ref<HTMLDivElement>} className={cn("space-y-4", className)} {...props}>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1 max-w-xs">
          <div className="pointer-events-none absolute inset-y-0 left-3 flex items-center">
            <SearchIcon />
          </div>
          <Input
            placeholder={searchPlaceholder}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[160px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All statuses</SelectItem>
            <SelectItem value="paid">Paid</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="overdue">Overdue</SelectItem>
            <SelectItem value="draft">Draft</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        <Card>
          <CardContent className="flex flex-col gap-1 p-4">
            <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Total Paid</span>
            <span className="text-xl font-bold text-emerald-600 dark:text-emerald-400">{formatCurrency(totalPaid)}</span>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex flex-col gap-1 p-4">
            <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Total Pending</span>
            <span className="text-xl font-bold text-amber-600 dark:text-amber-400">{formatCurrency(totalPending)}</span>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex flex-col gap-1 p-4">
            <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Total Overdue</span>
            <span className="text-xl font-bold text-red-600 dark:text-red-400">{formatCurrency(totalOverdue)}</span>
          </CardContent>
        </Card>
      </div>

      <ScrollArea className="rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[120px]">Invoice #</TableHead>
              <TableHead>Client</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Due Date</TableHead>
              <TableHead className="w-[60px]" />
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center text-muted-foreground py-8">
                  {emptyMessage}
                </TableCell>
              </TableRow>
            ) : (
              filtered.map((invoice) => (
                <TableRow key={invoice.id}>
                  <TableCell>
                    <span className="font-mono text-sm font-medium">{invoice.number}</span>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {invoice.clientInitials && (
                        <Avatar size="sm">
                          <AvatarFallback className="text-[10px]">{invoice.clientInitials}</AvatarFallback>
                        </Avatar>
                      )}
                      <div>
                        <div className="text-sm font-medium">{invoice.client}</div>
                        {invoice.clientEmail && (
                          <div className="text-xs text-muted-foreground">{invoice.clientEmail}</div>
                        )}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="font-medium">{formatCurrency(invoice.amount, invoice.currency)}</span>
                  </TableCell>
                  <TableCell>
                    <Badge variant={statusVariant[invoice.status]}>{statusLabel[invoice.status]}</Badge>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm text-muted-foreground">{invoice.dueDate}</span>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreIcon />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        {onViewInvoice && (
                          <DropdownMenuItem onClick={() => onViewInvoice(invoice)}>
                            <EyeIcon />
                            <span className="ml-2">View</span>
                          </DropdownMenuItem>
                        )}
                        {onDownloadInvoice && (
                          <DropdownMenuItem onClick={() => onDownloadInvoice(invoice)}>
                            <DownloadIcon />
                            <span className="ml-2">Download PDF</span>
                          </DropdownMenuItem>
                        )}
                        {onMarkPaid && invoice.status !== "paid" && (
                          <DropdownMenuItem onClick={() => onMarkPaid(invoice)}>
                            <CheckIcon />
                            <span className="ml-2">Mark as paid</span>
                          </DropdownMenuItem>
                        )}
                        {onSendReminder && invoice.status === "pending" && (
                          <DropdownMenuItem onClick={() => onSendReminder(invoice)}>
                            <SendIcon />
                            <span className="ml-2">Send reminder</span>
                          </DropdownMenuItem>
                        )}
                        {onDeleteInvoice && (
                          <>
                            <DropdownMenuItem
                              onClick={() => onDeleteInvoice(invoice)}
                              className="text-destructive focus:text-destructive"
                            >
                              <TrashIcon />
                              <span className="ml-2">Delete</span>
                            </DropdownMenuItem>
                          </>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </ScrollArea>
    </div>
  );
}

InvoiceTable.displayName = "InvoiceTable";

export { InvoiceTable };
