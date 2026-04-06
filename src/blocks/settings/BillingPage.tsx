import type * as React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "../../components/Card";
import { Badge } from "../../components/Badge";
import { Button } from "../../components/Button";
import { Progress } from "../../components/Progress";
import { Separator } from "../../components/Separator";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "../../components/Table";
import { cn } from "../../lib/utils";

export interface BillingPlan {
  name: string;
  price: string;
  billingCycle: string;
  status: "active" | "trialing" | "canceled" | "past_due";
  features: string[];
}

export interface UsageMeter {
  label: string;
  used: number;
  total: number;
  unit: string;
}

export interface PaymentMethod {
  brand: string;
  last4: string;
  expMonth: number;
  expYear: number;
}

export interface Invoice {
  id: string;
  date: string;
  amount: string;
  status: "paid" | "open" | "void";
  downloadUrl?: string;
}

export interface BillingPageProps {
  plan?: BillingPlan;
  usage?: UsageMeter[];
  paymentMethod?: PaymentMethod;
  invoices?: Invoice[];
  onUpgrade?: () => void;
  onUpdatePayment?: () => void;
  onDownloadInvoice?: (id: string) => void;
  className?: string;
}

const statusBadgeVariant: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
  active: "default",
  trialing: "secondary",
  canceled: "outline",
  past_due: "destructive",
};

const invoiceBadgeVariant: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
  paid: "default",
  open: "secondary",
  void: "outline",
};

const defaultPlan: BillingPlan = {
  name: "Pro",
  price: "$29",
  billingCycle: "per month",
  status: "active",
  features: ["Unlimited projects", "10GB storage", "Priority support", "API access"],
};

const defaultUsage: UsageMeter[] = [
  { label: "Storage", used: 4.2, total: 10, unit: "GB" },
  { label: "API calls", used: 8400, total: 10000, unit: "req/mo" },
];

const defaultPaymentMethod: PaymentMethod = {
  brand: "Visa",
  last4: "4242",
  expMonth: 12,
  expYear: 2026,
};

const defaultInvoices: Invoice[] = [
  { id: "INV-001", date: "Mar 1, 2026", amount: "$29.00", status: "paid" },
  { id: "INV-002", date: "Feb 1, 2026", amount: "$29.00", status: "paid" },
  { id: "INV-003", date: "Jan 1, 2026", amount: "$29.00", status: "paid" },
];

function BillingPage({
      plan = defaultPlan,
      usage = defaultUsage,
      paymentMethod = defaultPaymentMethod,
      invoices = defaultInvoices,
      onUpgrade,
      onUpdatePayment,
      onDownloadInvoice,
      className, ref}: BillingPageProps & { ref?: React.Ref<HTMLDivElement> }) {
    return (
      <div ref={ref} className={cn("space-y-6", className)}>
        <div>
          <h3 className="text-lg font-semibold text-foreground">Billing</h3>
          <p className="text-sm text-muted-foreground">Manage your subscription and payment details.</p>
        </div>
        <Separator />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between gap-2">
                <CardTitle className="text-base">{plan.name} plan</CardTitle>
                <Badge variant={statusBadgeVariant[plan.status]}>
                  {plan.status.replace("_", " ")}
                </Badge>
              </div>
              <CardDescription>
                {plan.price}
                <span className="text-muted-foreground"> {plan.billingCycle}</span>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-1">
                {plan.features.map((f) => (
                  <li key={f} className="text-sm text-muted-foreground flex items-center gap-2">
                    <span className="text-primary" aria-hidden="true">&#10003;</span>
                    {f}
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button variant="outline" size="sm" onClick={onUpgrade}>
                Upgrade plan
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Usage</CardTitle>
              <CardDescription>Current billing period</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {usage.map((meter) => {
                const pct = Math.min(Math.round((meter.used / meter.total) * 100), 100);
                return (
                  <div key={meter.label} className="space-y-1.5">
                    <div className="flex justify-between text-sm">
                      <span className="text-foreground">{meter.label}</span>
                      <span className="text-muted-foreground">
                        {meter.used} / {meter.total} {meter.unit}
                      </span>
                    </div>
                    <Progress
                      value={pct}
                      size="sm"
                      aria-label={`${meter.label} usage: ${pct}%`}
                    />
                  </div>
                );
              })}
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between gap-2">
              <div>
                <CardTitle className="text-base">Payment method</CardTitle>
                <CardDescription>
                  {paymentMethod.brand} ending in {paymentMethod.last4} &bull; Expires{" "}
                  {String(paymentMethod.expMonth).padStart(2, "0")}/{paymentMethod.expYear}
                </CardDescription>
              </div>
              <Button variant="outline" size="sm" onClick={onUpdatePayment}>
                Update
              </Button>
            </div>
          </CardHeader>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Invoice history</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Invoice</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {invoices.map((invoice) => (
                  <TableRow key={invoice.id}>
                    <TableCell className="font-medium">{invoice.id}</TableCell>
                    <TableCell className="text-muted-foreground">{invoice.date}</TableCell>
                    <TableCell>{invoice.amount}</TableCell>
                    <TableCell>
                      <Badge variant={invoiceBadgeVariant[invoice.status]}>
                        {invoice.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onDownloadInvoice?.(invoice.id)}
                        aria-label={`Download invoice ${invoice.id}`}
                      >
                        Download
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    );
  }

BillingPage.displayName = "BillingPage";

export { BillingPage };
