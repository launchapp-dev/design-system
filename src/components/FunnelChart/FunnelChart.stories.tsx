import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import { FunnelChart } from "./index";
import type { FunnelStep } from "./FunnelChart";

const salesFunnelData: FunnelStep[] = [
  { id: "visitors", label: "Website Visitors", value: 50000 },
  { id: "signups", label: "Sign Ups", value: 12500 },
  { id: "activated", label: "Activated", value: 6250 },
  { id: "subscribed", label: "Subscribed", value: 1875 },
  { id: "retained", label: "Retained", value: 937 },
];

const marketingFunnelData: FunnelStep[] = [
  { id: "impressions", label: "Impressions", value: 1000000 },
  { id: "clicks", label: "Clicks", value: 50000 },
  { id: "leads", label: "Leads", value: 5000 },
  { id: "prospects", label: "Prospects", value: 500 },
  { id: "customers", label: "Customers", value: 50 },
];

const onboardingFunnelData: FunnelStep[] = [
  { id: "started", label: "Started", value: 1000 },
  { id: "step1", label: "Profile Setup", value: 850 },
  { id: "step2", label: "Preferences", value: 720 },
  { id: "step3", label: "Integration", value: 580 },
  { id: "completed", label: "Completed", value: 495 },
];

const checkoutFunnelData: FunnelStep[] = [
  { id: "cart", label: "Added to Cart", value: 2500, color: "hsl(var(--la-chart-1))" },
  { id: "shipping", label: "Shipping Info", value: 1875, color: "hsl(var(--la-chart-2))" },
  { id: "payment", label: "Payment", value: 1500, color: "hsl(var(--la-chart-3))" },
  { id: "review", label: "Review", value: 1350, color: "hsl(var(--la-chart-4))" },
  { id: "complete", label: "Complete", value: 1282, color: "hsl(var(--la-chart-5))" },
];

const simpleFunnelData: FunnelStep[] = [
  { id: "awareness", label: "Awareness", value: 100 },
  { id: "interest", label: "Interest", value: 60 },
  { id: "desire", label: "Desire", value: 30 },
  { id: "action", label: "Action", value: 15 },
];

const meta: Meta<typeof FunnelChart> = {
  title: "Components/FunnelChart",
  component: FunnelChart,
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
    orientation: {
      control: "select",
      options: ["vertical", "horizontal"],
    },
    showLabels: { control: "boolean" },
    showValues: { control: "boolean" },
    showPercentages: { control: "boolean" },
    showDropOffs: { control: "boolean" },
  },
  args: {
    size: "md",
    orientation: "vertical",
    showLabels: true,
    showValues: true,
    showPercentages: true,
    showDropOffs: true,
    steps: salesFunnelData,
  },
};

export default meta;
type Story = StoryObj<typeof FunnelChart>;

export const Default: Story = {
  render: (args) => <FunnelChart {...args} />,
};

export const SalesFunnel: Story = {
  name: "Sales Funnel",
  args: {
    steps: salesFunnelData,
  },
};

export const MarketingFunnel: Story = {
  name: "Marketing Funnel",
  args: {
    steps: marketingFunnelData,
  },
};

export const OnboardingFunnel: Story = {
  name: "Onboarding Funnel",
  args: {
    steps: onboardingFunnelData,
  },
};

export const CheckoutFunnel: Story = {
  name: "Checkout Funnel",
  args: {
    steps: checkoutFunnelData,
  },
};

export const Horizontal: Story = {
  name: "Horizontal Orientation",
  args: {
    steps: salesFunnelData,
    orientation: "horizontal",
  },
};

export const SmallSize: Story = {
  name: "Small Size",
  args: {
    size: "sm",
    steps: simpleFunnelData,
  },
};

export const LargeSize: Story = {
  name: "Large Size",
  args: {
    size: "lg",
    steps: salesFunnelData,
  },
};

export const WithoutLabels: Story = {
  name: "Without Labels",
  args: {
    steps: salesFunnelData,
    showLabels: false,
  },
};

export const WithoutValues: Story = {
  name: "Without Values",
  args: {
    steps: salesFunnelData,
    showValues: false,
  },
};

export const WithoutPercentages: Story = {
  name: "Without Percentages",
  args: {
    steps: salesFunnelData,
    showPercentages: false,
  },
};

export const WithoutDropOffs: Story = {
  name: "Without Drop-offs",
  args: {
    steps: salesFunnelData,
    showDropOffs: false,
  },
};

export const MinimalLabels: Story = {
  name: "Minimal Labels",
  args: {
    steps: salesFunnelData,
    showLabels: true,
    showValues: false,
    showPercentages: false,
    showDropOffs: false,
  },
};

export const Interactive: Story = {
  name: "Interactive (Click Handler)",
  render: (args) => {
    const [selected, setSelected] = React.useState<string | null>(null);

    return (
      <div>
        <FunnelChart
          {...args}
          onStepClick={(step) => setSelected(`${step.label}: ${step.value.toLocaleString()}`)}
        />
        {selected && (
          <div className="mt-4 p-3 bg-muted rounded-[--la-radius] text-sm">
            Selected: <strong>{selected}</strong>
          </div>
        )}
      </div>
    );
  },
  args: {
    steps: salesFunnelData,
  },
};

export const WithCustomColors: Story = {
  name: "With Custom Colors",
  args: {
    steps: checkoutFunnelData,
  },
};

export const FewSteps: Story = {
  name: "Few Steps",
  args: {
    steps: simpleFunnelData,
  },
};

export const ManySteps: Story = {
  name: "Many Steps",
  args: {
    steps: [
      { id: "awareness", label: "Awareness", value: 100000 },
      { id: "interest", label: "Interest", value: 75000 },
      { id: "consideration", label: "Consideration", value: 50000 },
      { id: "intent", label: "Intent", value: 35000 },
      { id: "evaluation", label: "Evaluation", value: 20000 },
      { id: "purchase", label: "Purchase", value: 10000 },
      { id: "loyalty", label: "Loyalty", value: 5000 },
    ],
  },
};

export const Empty: Story = {
  args: {
    steps: [],
  },
};

export const HorizontalSales: Story = {
  name: "Horizontal Sales Funnel",
  args: {
    steps: salesFunnelData,
    orientation: "horizontal",
    size: "lg",
  },
};

export const ComparisonVerticalHorizontal: Story = {
  name: "Vertical vs Horizontal",
  render: () => (
    <div className="flex flex-col gap-8">
      <div>
        <h4 className="text-sm font-medium mb-3">Vertical Orientation</h4>
        <FunnelChart
          steps={salesFunnelData}
          orientation="vertical"
          aria-label="Vertical funnel chart"
        />
      </div>
      <div>
        <h4 className="text-sm font-medium mb-3">Horizontal Orientation</h4>
        <FunnelChart
          steps={salesFunnelData}
          orientation="horizontal"
          aria-label="Horizontal funnel chart"
        />
      </div>
    </div>
  ),
};

export const SizeComparison: Story = {
  name: "Size Comparison",
  render: () => (
    <div className="flex flex-col gap-8">
      <div>
        <h4 className="text-sm font-medium mb-3">Small</h4>
        <FunnelChart
          steps={simpleFunnelData}
          size="sm"
          aria-label="Small funnel chart"
        />
      </div>
      <div>
        <h4 className="text-sm font-medium mb-3">Medium</h4>
        <FunnelChart
          steps={simpleFunnelData}
          size="md"
          aria-label="Medium funnel chart"
        />
      </div>
      <div>
        <h4 className="text-sm font-medium mb-3">Large</h4>
        <FunnelChart
          steps={simpleFunnelData}
          size="lg"
          aria-label="Large funnel chart"
        />
      </div>
    </div>
  ),
};

export const DarkMode: Story = {
  parameters: {
    globals: { theme: "dark" },
  },
  render: () => (
    <div className="p-6 bg-background rounded-lg">
      <FunnelChart
        steps={salesFunnelData}
        aria-label="Sales funnel in dark mode"
      />
    </div>
  ),
};
