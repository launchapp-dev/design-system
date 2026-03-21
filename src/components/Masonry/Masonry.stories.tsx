import type { Meta, StoryObj } from "@storybook/react";
import { Masonry } from "./index";

const meta = {
  title: "Components/Masonry",
  component: Masonry,
} satisfies Meta<typeof Masonry>;

export default meta;
type Story = StoryObj<typeof meta>;

const items = [
  { height: 120, label: "Item 1" },
  { height: 200, label: "Item 2" },
  { height: 160, label: "Item 3" },
  { height: 100, label: "Item 4" },
  { height: 240, label: "Item 5" },
  { height: 140, label: "Item 6" },
  { height: 180, label: "Item 7" },
  { height: 110, label: "Item 8" },
  { height: 220, label: "Item 9" },
];

export const Default: Story = {
  render: () => (
    <Masonry cols={3} style={{ width: "720px" }}>
      {items.map((item) => (
        <div
          key={item.label}
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
            breakInside: "avoid",
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
            breakInside: "avoid",
          }}
        >
          <span style={{ fontWeight: 600, fontSize: "0.875rem" }}>{item.label}</span>
        </div>
      ))}
    </Masonry>
  ),
};
