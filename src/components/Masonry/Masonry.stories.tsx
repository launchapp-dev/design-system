import type { Meta, StoryObj } from "@storybook/react";
import { Masonry } from "./index";

const meta = {
  title: "Components/Masonry",
  component: Masonry,
  argTypes: {
    cols: {
      control: { type: "select" },
      options: [1, 2, 3, 4, 5],
    },
  },
} satisfies Meta<typeof Masonry>;

export default meta;
type Story = StoryObj<typeof meta>;

const items = [
  { height: 120, label: "Item 1", color: "#6366f1" },
  { height: 200, label: "Item 2", color: "#8b5cf6" },
  { height: 160, label: "Item 3", color: "#10b981" },
  { height: 100, label: "Item 4", color: "#f59e0b" },
  { height: 240, label: "Item 5", color: "#ef4444" },
  { height: 140, label: "Item 6", color: "#3b82f6" },
  { height: 180, label: "Item 7", color: "#ec4899" },
  { height: 110, label: "Item 8", color: "#14b8a6" },
  { height: 220, label: "Item 9", color: "#f97316" },
];

export const Default: Story = {
  render: () => (
    <Masonry cols={3} style={{ width: "720px" }}>
      {items.map((item) => (
        <div
          key={item.label}
          className="break-inside-avoid"
          style={{
            height: item.height,
            marginBottom: "16px",
            padding: "16px",
            borderRadius: "12px",
            border: "1px solid var(--border)",
            background: "var(--card)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <span style={{ fontWeight: 600, fontSize: "0.875rem" }}>{item.label}</span>
        </div>
      ))}
    </Masonry>
  ),
};

export const TwoColumns: Story = {
  render: () => (
    <Masonry cols={2} style={{ width: "480px" }}>
      {items.slice(0, 6).map((item) => (
        <div
          key={item.label}
          className="break-inside-avoid"
          style={{
            height: item.height,
            marginBottom: "16px",
            padding: "16px",
            borderRadius: "12px",
            border: "1px solid var(--border)",
            background: "var(--card)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <span style={{ fontWeight: 600, fontSize: "0.875rem" }}>{item.label}</span>
        </div>
      ))}
    </Masonry>
  ),
};

export const FourColumns: Story = {
  render: () => (
    <Masonry cols={4} style={{ width: "960px" }}>
      {[...items, ...items.slice(0, 3)].map((item, i) => (
        <div
          key={`${item.label}-${i}`}
          className="break-inside-avoid"
          style={{
            height: item.height,
            marginBottom: "16px",
            padding: "16px",
            borderRadius: "12px",
            border: "1px solid var(--border)",
            background: "var(--card)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <span style={{ fontWeight: 600, fontSize: "0.875rem" }}>{item.label}</span>
        </div>
      ))}
    </Masonry>
  ),
};

export const ColoredCards: Story = {
  render: () => (
    <Masonry cols={3} style={{ width: "720px" }}>
      {items.map((item) => (
        <div
          key={item.label}
          className="break-inside-avoid"
          style={{
            height: item.height,
            marginBottom: "16px",
            padding: "16px",
            borderRadius: "12px",
            background: `${item.color}22`,
            border: `1px solid ${item.color}44`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <span style={{ fontWeight: 600, fontSize: "0.875rem", color: item.color }}>
            {item.label}
          </span>
        </div>
      ))}
    </Masonry>
  ),
};
