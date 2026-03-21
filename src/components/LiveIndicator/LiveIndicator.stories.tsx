import type { Meta, StoryObj } from "@storybook/react";
import { LiveIndicator } from "./index";

const meta: Meta<typeof LiveIndicator> = {
  title: "Components/LiveIndicator",
  component: LiveIndicator,
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof LiveIndicator>;

export const Default: Story = {
  render: () => <LiveIndicator />,
};

export const Small: Story = {
  render: () => <LiveIndicator size="sm" />,
};

export const Medium: Story = {
  render: () => <LiveIndicator size="md" />,
};

export const Large: Story = {
  render: () => <LiveIndicator size="lg" />,
};

export const WithoutLabel: Story = {
  render: () => <LiveIndicator showLabel={false} />,
};

export const CustomLabel: Story = {
  render: () => <LiveIndicator label="Streaming" />,
};

export const RedDot: Story = {
  render: () => <LiveIndicator dotColor="red" />,
};

export const GreenDot: Story = {
  render: () => <LiveIndicator dotColor="green" />,
};

export const AmberDot: Story = {
  render: () => <LiveIndicator dotColor="amber" />,
};

export const BlueDot: Story = {
  render: () => <LiveIndicator dotColor="blue" />,
};

export const WithoutPulse: Story = {
  render: () => <LiveIndicator pulse={false} />,
};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-6">
      <LiveIndicator size="sm" label="Small" />
      <LiveIndicator size="md" label="Medium" />
      <LiveIndicator size="lg" label="Large" />
    </div>
  ),
};

export const Colors: Story = {
  render: () => (
    <div className="flex items-center gap-6">
      <LiveIndicator dotColor="default" label="Default" />
      <LiveIndicator dotColor="red" label="Red" />
      <LiveIndicator dotColor="green" label="Green" />
      <LiveIndicator dotColor="amber" label="Amber" />
      <LiveIndicator dotColor="blue" label="Blue" />
    </div>
  ),
};

export const InContext: Story = {
  render: () => (
    <div className="rounded-lg border border-border bg-background p-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-semibold">Live Stream</h3>
          <p className="text-sm text-muted-foreground">
            Watch the event in real-time
          </p>
        </div>
        <LiveIndicator label="Live" />
      </div>
    </div>
  ),
};

export const DarkMode: Story = {
  decorators: [
    (Story) => (
      <div className="dark" style={{ background: "hsl(240 10% 3.9%)", padding: "24px", borderRadius: "8px" }}>
        <Story />
      </div>
    ),
  ],
  render: () => (
    <div className="flex items-center gap-6">
      <LiveIndicator dotColor="default" label="Default" />
      <LiveIndicator dotColor="red" label="Red" />
      <LiveIndicator dotColor="green" label="Green" />
      <LiveIndicator dotColor="amber" label="Amber" />
      <LiveIndicator dotColor="blue" label="Blue" />
    </div>
  ),
};
