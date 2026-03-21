import type { Meta, StoryObj } from "@storybook/react";
import { DataTicker } from "./DataTicker";

const meta = {
  title: "Components/Dashboard/DataTicker",
  component: DataTicker,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
    variant: {
      control: "select",
      options: ["default", "primary", "success", "warning", "destructive"],
    },
    autoUpdate: {
      control: "boolean",
    },
    showChange: {
      control: "boolean",
    },
    animated: {
      control: "boolean",
    },
    updateInterval: {
      control: { type: "range", min: 1000, max: 10000, step: 500 },
    },
    maxItems: {
      control: { type: "range", min: 1, max: 10, step: 1 },
    },
  },
} satisfies Meta<typeof DataTicker>;

export default meta;
type Story = StoryObj<typeof meta>;

const stockItems = [
  { label: "AAPL", value: "178.52", change: 2.34, prefix: "$" },
  { label: "GOOGL", value: "141.80", change: -0.87, prefix: "$" },
  { label: "MSFT", value: "378.91", change: 1.56, prefix: "$" },
  { label: "AMZN", value: "178.25", change: 0.42, prefix: "$" },
];

const cryptoItems = [
  { label: "BTC", value: "67,234", change: 3.45, prefix: "$" },
  { label: "ETH", value: "3,456", change: -1.23, prefix: "$" },
  { label: "SOL", value: "178", change: 5.67, prefix: "$" },
];

const metricsItems = [
  { label: "Users", value: "12,456", change: 8.2, suffix: " online" },
  { label: "Revenue", value: "$45,231", change: 12.5 },
  { label: "Orders", value: "1,234", change: -2.3 },
];

export const Default: Story = {
  args: {
    items: stockItems.slice(0, 1),
    showChange: true,
  },
};

export const MultipleItems: Story = {
  args: {
    items: stockItems,
    showChange: true,
    maxItems: 4,
  },
};

export const AutoUpdating: Story = {
  args: {
    items: stockItems,
    autoUpdate: true,
    updateInterval: 3000,
    showChange: true,
  },
};

export const CryptoTicker: Story = {
  args: {
    items: cryptoItems,
    variant: "primary",
    autoUpdate: true,
    updateInterval: 2000,
  },
};

export const MetricsTicker: Story = {
  args: {
    items: metricsItems,
    variant: "success",
    showChange: true,
  },
};

export const Small: Story = {
  args: {
    items: stockItems.slice(0, 1),
    size: "sm",
  },
};

export const Large: Story = {
  args: {
    items: stockItems.slice(0, 1),
    size: "lg",
  },
};

export const Primary: Story = {
  args: {
    items: stockItems.slice(0, 1),
    variant: "primary",
  },
};

export const Success: Story = {
  args: {
    items: [{ label: "Growth", value: "125%", change: 15.3 }],
    variant: "success",
  },
};

export const Warning: Story = {
  args: {
    items: [{ label: "Warning", value: "75%", change: -5.2 }],
    variant: "warning",
  },
};

export const Destructive: Story = {
  args: {
    items: [{ label: "Alert", value: "Critical", change: -12.5 }],
    variant: "destructive",
  },
};

export const WithoutChange: Story = {
  args: {
    items: stockItems,
    showChange: false,
  },
};

export const WithoutAnimation: Story = {
  args: {
    items: stockItems,
    autoUpdate: true,
    animated: false,
    updateInterval: 2000,
  },
};

export const FastUpdate: Story = {
  args: {
    items: stockItems,
    autoUpdate: true,
    updateInterval: 1000,
  },
};

export const SlowUpdate: Story = {
  args: {
    items: stockItems,
    autoUpdate: true,
    updateInterval: 5000,
  },
};

export const LimitedItems: Story = {
  args: {
    items: stockItems,
    maxItems: 2,
    autoUpdate: true,
    updateInterval: 2000,
  },
};
