import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import { BillingPage } from "./BillingPage";

const meta: Meta<typeof BillingPage> = {
  title: "Blocks/Settings/BillingPage",
  component: BillingPage,
  parameters: {
    layout: "padded",
    docs: {
      source: {
        code: `import { BillingPage } from "@launchapp/design-system/blocks";

export default function Page() {
  return (
    <BillingPage
      currentPlan="pro"
      onUpgrade={(plan) => console.log("upgrade to", plan)}
      onManagePayment={() => console.log("manage payment")}
    />
  );
}`,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div style={{ maxWidth: 800 }}>
      <BillingPage
        onUpgrade={() => console.log("Upgrade")}
        onUpdatePayment={() => console.log("Update payment")}
        onDownloadInvoice={(id) => console.log("Download", id)}
      />
    </div>
  ),
};

export const PastDue: Story = {
  render: () => (
    <div style={{ maxWidth: 800 }}>
      <BillingPage
        plan={{
          name: "Pro",
          price: "$29",
          billingCycle: "per month",
          status: "past_due",
          features: ["Unlimited projects", "10GB storage", "Priority support"],
        }}
        usage={[
          { label: "Storage", used: 9.8, total: 10, unit: "GB" },
          { label: "API calls", used: 9900, total: 10000, unit: "req/mo" },
        ]}
        invoices={[
          { id: "INV-004", date: "Mar 1, 2026", amount: "$29.00", status: "open" },
          { id: "INV-003", date: "Feb 1, 2026", amount: "$29.00", status: "paid" },
        ]}
      />
    </div>
  ),
};

export const DarkMode: Story = {
  decorators: [
    (Story) => (
      <div className="dark" style={{ background: "#09090b", padding: "24px", borderRadius: "8px" }}>
        <Story />
      </div>
    ),
  ],
  render: () => (
    <div style={{ maxWidth: 800 }}>
      <BillingPage />
    </div>
  ),
};

export const Mobile: Story = {
  parameters: {
    viewport: { defaultViewport: "mobile1" },
  },
  render: () => (
    <BillingPage
      onUpgrade={() => console.log("Upgrade")}
      onUpdatePayment={() => console.log("Update payment")}
      onDownloadInvoice={(id) => console.log("Download", id)}
    />
  ),
};

export const Tablet: Story = {
  parameters: {
    viewport: { defaultViewport: "tablet" },
  },
  render: () => (
    <div style={{ maxWidth: 800, margin: "0 auto" }}>
      <BillingPage
        onUpgrade={() => console.log("Upgrade")}
        onUpdatePayment={() => console.log("Update payment")}
        onDownloadInvoice={(id) => console.log("Download", id)}
      />
    </div>
  ),
};

export const CompositionExample: Story = {
  name: "Composition (Built From)",
  render: () => (
    <div style={{ maxWidth: 800, margin: "0 auto" }}>
      <BillingPage
        onUpgrade={() => console.log("Upgrade")}
        onUpdatePayment={() => console.log("Update payment")}
        onDownloadInvoice={(id) => console.log("Download", id)}
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "BillingPage is composed from these design system primitives. Use the **Show code** toggle to see the full implementation.",
      },
      source: {
        code: `import {
  Badge,
  Button,
  Card, CardHeader, CardTitle, CardDescription, CardContent,
  Progress,
  Separator,
  Table, TableHeader, TableRow, TableHead, TableBody, TableCell,
} from "@launchapp/design-system";

// BillingPage assembles three sections from design system primitives:
// 1. Current plan card: Badge for plan tier, Button for upgrade/manage, Progress for usage meters
// 2. Payment method card: current card display + Button to update
// 3. Invoice history: Table with date, amount, status Badge, and download Button per row
export function BillingPage({ plan, usageMeters = [], invoices = [], onUpgrade, onUpdatePayment, onDownloadInvoice }) {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Current plan</CardTitle>
            <CardDescription>You are on the <Badge>{plan?.name ?? "Free"}</Badge> plan.</CardDescription>
          </div>
          <Button onClick={onUpgrade}>Upgrade</Button>
        </CardHeader>
        {usageMeters.length > 0 && (
          <CardContent className="space-y-4">
            {usageMeters.map((meter) => (
              <div key={meter.label}>
                <div className="flex justify-between text-sm mb-1">
                  <span>{meter.label}</span>
                  <span>{meter.used} / {meter.limit}</span>
                </div>
                <Progress value={(meter.used / meter.limit) * 100} />
              </div>
            ))}
          </CardContent>
        )}
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Payment method</CardTitle>
            <CardDescription>Manage your billing information.</CardDescription>
          </div>
          <Button variant="outline" onClick={onUpdatePayment}>Update</Button>
        </CardHeader>
      </Card>

      {invoices.length > 0 && (
        <Card>
          <CardHeader><CardTitle>Invoices</CardTitle></CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead />
                </TableRow>
              </TableHeader>
              <TableBody>
                {invoices.map((inv) => (
                  <TableRow key={inv.id}>
                    <TableCell>{inv.date}</TableCell>
                    <TableCell>{inv.amount}</TableCell>
                    <TableCell><Badge variant={inv.status === "paid" ? "default" : "destructive"}>{inv.status}</Badge></TableCell>
                    <TableCell><Button variant="ghost" size="sm" onClick={() => onDownloadInvoice?.(inv.id)}>Download</Button></TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}
    </div>
  );
}`,
      },
    },
  },
};
