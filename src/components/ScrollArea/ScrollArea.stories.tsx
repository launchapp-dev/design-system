import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import { ScrollArea, ScrollBar } from "./index";

const meta: Meta = {
  title: "Components/ScrollArea",
};

export default meta;
type Story = StoryObj<typeof meta>;

const tags = [
  "v1.2.0", "v1.1.0", "v1.0.0", "v0.9.0", "v0.8.0",
  "v0.7.0", "v0.6.0", "v0.5.0", "v0.4.0", "v0.3.0",
  "v0.2.0", "v0.1.0", "v0.0.9", "v0.0.8", "v0.0.7",
  "v0.0.6", "v0.0.5", "v0.0.4", "v0.0.3", "v0.0.2",
];

export const Default: Story = {
  render: () => (
    <ScrollArea style={{ height: 200, width: 300, border: "1px solid hsl(var(--border))", borderRadius: 8 }}>
      <div style={{ padding: "16px" }}>
        {tags.map((tag) => (
          <React.Fragment key={tag}>
            <div style={{ fontSize: 14, padding: "8px 0", borderBottom: "1px solid hsl(var(--border))" }}>
              {tag}
            </div>
          </React.Fragment>
        ))}
      </div>
    </ScrollArea>
  ),
};

export const HorizontalScroll: Story = {
  render: () => (
    <ScrollArea style={{ width: 300, whiteSpace: "nowrap", border: "1px solid hsl(var(--border))", borderRadius: 8 }}>
      <div style={{ display: "flex", gap: 12, padding: 16 }}>
        {Array.from({ length: 15 }, (_, i) => (
          <div
            key={i}
            style={{
              minWidth: 80,
              height: 80,
              borderRadius: 8,
              background: `hsl(${(i * 25) % 360}, 60%, 50%)`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
              fontSize: 14,
              fontWeight: 600,
              flexShrink: 0,
            }}
          >
            {i + 1}
          </div>
        ))}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  ),
};

export const WithLongText: Story = {
  render: () => (
    <ScrollArea style={{ height: 300, width: 400, border: "1px solid hsl(var(--border))", borderRadius: 8 }}>
      <div style={{ padding: 16 }}>
        <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 12 }}>Release Notes</h3>
        {Array.from({ length: 10 }, (_, i) => (
          <div key={i} style={{ marginBottom: 16 }}>
            <p style={{ fontSize: 14, fontWeight: 600, marginBottom: 4 }}>Version {10 - i}.0.0</p>
            <p style={{ fontSize: 13, color: "hsl(var(--muted-foreground))", lineHeight: 1.6 }}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.
            </p>
          </div>
        ))}
      </div>
    </ScrollArea>
  ),
};

export const SmallContainer: Story = {
  render: () => (
    <ScrollArea style={{ height: 100, width: 200, border: "1px solid hsl(var(--border))", borderRadius: 8 }}>
      <div style={{ padding: 12 }}>
        {Array.from({ length: 20 }, (_, i) => (
          <div key={i} style={{ fontSize: 12, padding: "4px 0", color: "hsl(var(--muted-foreground))" }}>
            Item {i + 1}: some content here
          </div>
        ))}
      </div>
    </ScrollArea>
  ),
};
