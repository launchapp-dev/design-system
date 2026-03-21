import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import { Funnel } from "./index";

const leadGenData = [
  { value: 10000, label: "Visitors" },
  { value: 5000, label: "Leads" },
  { value: 2500, label: "MQLs" },
  { value: 1000, label: "SQLs" },
  { value: 500, label: "Opportunities" },
  { value: 200, label: "Customers" },
];

const salesPipelineData = [
  { value: 1500, label: "Prospects" },
  { value: 1200, label: "Qualified" },
  { value: 800, label: "Demo Scheduled" },
  { value: 500, label: "Proposal Sent" },
  { value: 300, label: "Negotiation" },
  { value: 180, label: "Closed Won" },
];

const onboardingData = [
  { value: 5000, label: "Signed Up" },
  { value: 4000, label: "Email Verified" },
  { value: 3500, label: "Profile Complete" },
  { value: 2500, label: "First Action" },
  { value: 1500, label: "Weekly Active" },
  { value: 1000, label: "Monthly Active" },
];

const meta: Meta<typeof Funnel> = {
  title: "Components/FunnelChart",
  component: Funnel,
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
    colorScheme: {
      control: "select",
      options: ["primary", "chart1", "chart2", "chart3", "chart4", "chart5"],
    },
    showPercentages: { control: "boolean" },
    showValues: { control: "boolean" },
    showLabels: { control: "boolean" },
  },
  args: {
    size: "md",
    showPercentages: true,
    showValues: true,
    showLabels: true,
    data: leadGenData,
  },
};

export default meta;
type Story = StoryObj<typeof Funnel>;

export const Default: Story = {
  render: (args) => <Funnel {...args} />,
};

export const LeadGeneration: Story = {
  name: "Lead Generation Funnel",
  render: () => (
    <div className="space-y-4 max-w-lg">
      <h3 className="text-lg font-semibold">Lead Generation Funnel</h3>
      <Funnel
        data={leadGenData}
        title="Marketing Conversion"
        subtitle="Q4 2024 Performance"
      />
    </div>
  ),
};

export const SalesPipeline: Story = {
  render: () => (
    <div className="space-y-4 max-w-lg">
      <h3 className="text-lg font-semibold">Sales Pipeline</h3>
      <Funnel
        data={salesPipelineData}
        colorScheme="chart2"
      />
    </div>
  ),
};

export const UserOnboarding: Story = {
  render: () => (
    <div className="space-y-4 max-w-lg">
      <h3 className="text-lg font-semibold">User Onboarding Funnel</h3>
      <Funnel
        data={onboardingData}
        colorScheme="chart3"
        showValues={true}
        showPercentages={true}
      />
    </div>
  ),
};

export const ConversionRates: Story = {
  render: () => (
    <div className="space-y-4 max-w-xl">
      <h3 className="text-lg font-semibold">Conversion Funnel with Drop-off Rates</h3>
      <Funnel
        data={leadGenData}
        showValues={true}
        showPercentages={true}
        showLabels={true}
      />
    </div>
  ),
};

export const SimpleLabels: Story = {
  name: "Simple (Labels Only)",
  render: () => (
    <div className="space-y-4 max-w-lg">
      <h3 className="text-lg font-semibold">Simple Funnel</h3>
      <Funnel
        data={leadGenData}
        showValues={false}
        showPercentages={false}
      />
    </div>
  ),
};

export const SmallSize: Story = {
  args: {
    size: "sm",
    data: leadGenData.slice(0, 4),
  },
};

export const LargeSize: Story = {
  args: {
    size: "lg",
    data: leadGenData,
  },
};

export const ClickableFunnel: Story = {
  name: "With Click Handler",
  render: () => {
    const [selectedStep, setSelectedStep] = React.useState<string | null>(null);

    return (
      <div className="space-y-4 max-w-lg">
        <h3 className="text-lg font-semibold">Interactive Funnel</h3>
        {selectedStep && (
          <p className="text-sm text-muted-foreground">
            Selected stage: {selectedStep}
          </p>
        )}
        <Funnel
          data={leadGenData}
          onStepClick={(step) => setSelectedStep(step.label)}
        />
      </div>
    );
  },
};

export const PrimaryColor: Story = {
  args: {
    colorScheme: "primary",
  },
};

export const Chart1Color: Story = {
  args: {
    colorScheme: "chart1",
  },
};

export const Chart2Color: Story = {
  args: {
    colorScheme: "chart2",
  },
};

export const Chart3Color: Story = {
  args: {
    colorScheme: "chart3",
  },
};

export const Chart4Color: Story = {
  args: {
    colorScheme: "chart4",
  },
};

export const Chart5Color: Story = {
  args: {
    colorScheme: "chart5",
  },
};

export const DarkMode: Story = {
  parameters: {
    backgrounds: { default: "dark" },
  },
  render: () => (
    <div
      style={{ padding: "24px", background: "hsl(var(--background))", borderRadius: "8px" }}
      className="space-y-4 max-w-lg"
    >
      <h3 className="text-lg font-semibold text-foreground">Dark Mode Funnel</h3>
      <Funnel
        data={leadGenData}
        colorScheme="chart1"
      />
    </div>
  ),
};

export const EmptyData: Story = {
  args: {
    data: [],
  },
};

export const TwoSteps: Story = {
  name: "Two Steps",
  args: {
    data: [
      { value: 1000, label: "Visitors" },
      { value: 100, label: "Signups" },
    ],
  },
};

export const ManySteps: Story = {
  name: "Many Steps",
  args: {
    data: [
      { value: 100000, label: "Awareness" },
      { value: 50000, label: "Interest" },
      { value: 25000, label: "Consideration" },
      { value: 15000, label: "Intent" },
      { value: 8000, label: "Evaluation" },
      { value: 5000, label: "Purchase" },
      { value: 3000, label: "Retention" },
      { value: 2000, label: "Advocacy" },
    ],
    size: "sm",
  },
};
