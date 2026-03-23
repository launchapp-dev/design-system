import type { Meta, StoryObj } from "@storybook/react";
import { LiveIndicator } from "./index";

const meta = {
  title: "Components/LiveIndicator",
  component: LiveIndicator,
  argTypes: {
    status: {
      control: "select",
      options: ["online", "offline", "degraded"],
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
    label: {
      control: "text",
    },
    pulse: {
      control: "boolean",
    },
  },
} satisfies Meta<typeof LiveIndicator>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    status: "online",
    label: "Live",
    size: "md",
    pulse: true,
  },
};

export const AllStatuses: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
      <LiveIndicator status="online" label="Online" />
      <LiveIndicator status="offline" label="Offline" />
      <LiveIndicator status="degraded" label="Degraded" />
    </div>
  ),
};

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
      <LiveIndicator size="sm" status="online" label="Small" />
      <LiveIndicator size="md" status="online" label="Medium" />
      <LiveIndicator size="lg" status="online" label="Large" />
    </div>
  ),
};

export const NoPulse: Story = {
  args: {
    status: "online",
    label: "No pulse",
    pulse: false,
  },
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
    <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
      <LiveIndicator status="online" label="Online" />
      <LiveIndicator status="offline" label="Offline" />
      <LiveIndicator status="degraded" label="Degraded" />
    </div>
  ),
};
