import type { Meta, StoryObj } from "@storybook/react";
import { SubscriptionUsageMeter } from "./SubscriptionUsageMeter";
import type { UsageMetric } from "./SubscriptionUsageMeter";

const meta: Meta<typeof SubscriptionUsageMeter> = {
  title: "Blocks/Billing/SubscriptionUsageMeter",
  component: SubscriptionUsageMeter,
  parameters: { layout: "padded" },
};
export default meta;
type Story = StoryObj<typeof meta>;

const mockMetrics: UsageMetric[] = [
  {
    id: "api-calls",
    label: "API Calls",
    used: 48500,
    limit: 50000,
    unit: "",
    warningThreshold: 80,
  },
  {
    id: "storage",
    label: "Storage",
    used: 7.2,
    limit: 10,
    unit: "GB",
    warningThreshold: 75,
  },
  {
    id: "team-seats",
    label: "Team Seats",
    used: 8,
    limit: 10,
    unit: "seats",
    warningThreshold: 80,
  },
  {
    id: "projects",
    label: "Projects",
    used: 15,
    limit: 20,
    unit: "",
    warningThreshold: 70,
  },
];

const overLimitMetrics: UsageMetric[] = [
  ...mockMetrics,
  { id: "bandwidth", label: "Bandwidth", used: 105, limit: 100, unit: "GB", warningThreshold: 80 },
];

export const Default: Story = {
  render: () => (
    <div className="max-w-md">
      <SubscriptionUsageMeter
        planName="Pro"
        metrics={mockMetrics}
        onUpgrade={(id) => console.log("Upgrade for", id)}
      />
    </div>
  ),
};

export const WithOverLimit: Story = {
  render: () => (
    <div className="max-w-md">
      <SubscriptionUsageMeter
        planName="Pro"
        metrics={overLimitMetrics}
        onUpgrade={(id) => console.log("Upgrade for", id)}
      />
    </div>
  ),
};

export const WarningState: Story = {
  render: () => (
    <div className="max-w-md">
      <SubscriptionUsageMeter
        planName="Pro"
        metrics={[
          { id: "api", label: "API Calls", used: 82000, limit: 100000, unit: "", warningThreshold: 80 },
          { id: "storage", label: "Storage", used: 45, limit: 50, unit: "GB", warningThreshold: 75 },
        ]}
        onUpgrade={(id) => console.log("Upgrade for", id)}
      />
    </div>
  ),
};

export const YearlyBilling: Story = {
  render: () => (
    <div className="max-w-md">
      <SubscriptionUsageMeter
        planName="Enterprise"
        metrics={mockMetrics}
        billingCycle="yearly"
        onUpgrade={(id) => console.log("Upgrade for", id)}
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
    <div className="max-w-md">
      <SubscriptionUsageMeter
        planName="Pro"
        metrics={mockMetrics}
        onUpgrade={(id) => console.log("Upgrade for", id)}
      />
    </div>
  ),
};
