import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import { RealtimeTicker } from "./index";
import type { TickerItem } from "./RealtimeTicker";

const stockItems: TickerItem[] = [
  { id: "aapl", label: "AAPL", value: 178.52, format: "currency", precision: 2 },
  { id: "googl", label: "GOOGL", value: 141.80, format: "currency", precision: 2 },
  { id: "msft", label: "MSFT", value: 378.91, format: "currency", precision: 2 },
  { id: "amzn", label: "AMZN", value: 178.25, format: "currency", precision: 2 },
];

const cryptoItems: TickerItem[] = [
  { id: "btc", label: "BTC", value: 43250.00, format: "currency", precision: 0 },
  { id: "eth", label: "ETH", value: 2285.50, format: "currency", precision: 2 },
  { id: "sol", label: "SOL", value: 98.75, format: "currency", precision: 2 },
];

const serverMetrics: TickerItem[] = [
  { id: "cpu", label: "CPU", value: 45.2, unit: "%", precision: 1 },
  { id: "memory", label: "Memory", value: 6.8, unit: "GB", precision: 1 },
  { id: "requests", label: "Requests", value: 1250, unit: "/s", precision: 0 },
  { id: "latency", label: "Latency", value: 42, unit: "ms", precision: 0 },
];

const bandwidthItems: TickerItem[] = [
  { id: "download", label: "Download", value: 125.8, unit: "Mbps", precision: 1 },
  { id: "upload", label: "Upload", value: 24.3, unit: "Mbps", precision: 1 },
  { id: "ping", label: "Ping", value: 12, unit: "ms", precision: 0 },
];

const conversionItems: TickerItem[] = [
  { id: "rate", label: "Conversion", value: 3.42, format: "percent", precision: 2 },
  { id: "bounce", label: "Bounce", value: 32.5, format: "percent", precision: 1 },
  { id: "sessions", label: "Sessions", value: 45280, precision: 0 },
];

const meta: Meta<typeof RealtimeTicker> = {
  title: "Components/RealtimeTicker",
  component: RealtimeTicker,
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
    variant: {
      control: "select",
      options: ["default", "compact", "expanded"],
    },
    updateInterval: {
      control: { type: "range", min: 500, max: 5000, step: 100 },
    },
    showTrend: { control: "boolean" },
    showChange: { control: "boolean" },
    live: { control: "boolean" },
  },
  args: {
    size: "md",
    variant: "default",
    updateInterval: 2000,
    showTrend: true,
    showChange: true,
    live: false,
    items: stockItems,
  },
};

export default meta;
type Story = StoryObj<typeof RealtimeTicker>;

export const Default: Story = {
  render: (args) => <RealtimeTicker {...args} />,
};

export const Live: Story = {
  args: {
    live: true,
    items: stockItems,
  },
};

export const LiveCrypto: Story = {
  args: {
    live: true,
    items: cryptoItems,
    updateInterval: 1500,
  },
};

export const LiveServerMetrics: Story = {
  args: {
    live: true,
    items: serverMetrics,
    updateInterval: 1000,
  },
};

export const LiveBandwidth: Story = {
  args: {
    live: true,
    items: bandwidthItems,
    updateInterval: 800,
  },
};

export const Compact: Story = {
  args: {
    variant: "compact",
    items: stockItems,
  },
};

export const Expanded: Story = {
  args: {
    variant: "expanded",
    items: serverMetrics,
    size: "lg",
  },
};

export const Small: Story = {
  args: {
    size: "sm",
    items: cryptoItems,
  },
};

export const Large: Story = {
  args: {
    size: "lg",
    items: stockItems,
  },
};

export const WithoutTrend: Story = {
  args: {
    showTrend: false,
    items: stockItems,
  },
};

export const WithoutChange: Story = {
  args: {
    showChange: false,
    items: stockItems,
  },
};

export const ConversionMetrics: Story = {
  args: {
    items: conversionItems,
    variant: "expanded",
  },
};

export const WithOnUpdate: Story = {
  render: (args) => {
    const [items, setItems] = React.useState<TickerItem[]>(args.items);
    const [updateCount, setUpdateCount] = React.useState(0);
    
    const handleUpdate = (newItems: TickerItem[]) => {
      setItems(newItems);
      setUpdateCount((c) => c + 1);
    };
    
    return (
      <div>
        <RealtimeTicker
          {...args}
          items={items}
          live
          onUpdate={handleUpdate}
        />
        <div className="mt-4 text-sm text-muted-foreground">
          Updates received: {updateCount}
        </div>
      </div>
    );
  },
  args: {
    items: stockItems,
    updateInterval: 1000,
  },
};

export const FastUpdates: Story = {
  args: {
    live: true,
    updateInterval: 500,
    items: serverMetrics,
  },
};

export const SlowUpdates: Story = {
  args: {
    live: true,
    updateInterval: 4000,
    items: stockItems,
  },
};

export const SingleItem: Story = {
  args: {
    items: [{ id: "btc", label: "BTC/USD", value: 43250.00, format: "currency", precision: 2 }],
    live: true,
    variant: "expanded",
    size: "lg",
  },
};

export const ManyItems: Story = {
  args: {
    items: Array.from({ length: 8 }, (_, i) => ({
      id: `item-${i}`,
      label: `Metric ${i + 1}`,
      value: Math.random() * 1000,
      precision: 1,
    })),
    variant: "compact",
  },
};

export const DarkMode: Story = {
  parameters: {
    globals: { theme: "dark" },
  },
  render: () => (
    <div className="p-6 bg-background rounded-lg space-y-4">
      <RealtimeTicker items={stockItems} live />
      <RealtimeTicker items={serverMetrics} live updateInterval={1000} />
    </div>
  ),
};

export const DarkModeLive: Story = {
  parameters: {
    globals: { theme: "dark" },
  },
  render: () => (
    <div className="p-6 bg-background rounded-lg">
      <RealtimeTicker items={cryptoItems} live variant="expanded" size="lg" />
    </div>
  ),
};
