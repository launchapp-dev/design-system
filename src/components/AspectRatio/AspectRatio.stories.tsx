import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import { AspectRatio } from "./index";

const meta: Meta = {
  title: "Components/AspectRatio",
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div style={{ width: 400 }}>
      <AspectRatio ratio={16 / 9}>
        <div
          style={{
            width: "100%",
            height: "100%",
            background: "linear-gradient(135deg, hsl(var(--primary)) 0%, hsl(220, 70%, 50%) 100%)",
            borderRadius: 8,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "white",
            fontSize: 18,
            fontWeight: 600,
          }}
        >
          16:9
        </div>
      </AspectRatio>
    </div>
  ),
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24, alignItems: "start" }}>
      {([
        { ratio: 16 / 9, label: "16:9 (Widescreen)" },
        { ratio: 4 / 3, label: "4:3 (Standard)" },
        { ratio: 1 / 1, label: "1:1 (Square)" },
        { ratio: 21 / 9, label: "21:9 (Ultrawide)" },
        { ratio: 9 / 16, label: "9:16 (Portrait)" },
        { ratio: 3 / 2, label: "3:2 (Photo)" },
      ] as const).map(({ ratio, label }) => (
        <div key={label}>
          <p style={{ fontSize: 12, marginBottom: 8, color: "hsl(var(--muted-foreground))" }}>{label}</p>
          <AspectRatio ratio={ratio}>
            <div
              style={{
                width: "100%",
                height: "100%",
                background: "hsl(var(--muted))",
                borderRadius: 6,
                border: "1px solid hsl(var(--border))",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 13,
                fontWeight: 500,
                color: "hsl(var(--muted-foreground))",
              }}
            >
              {label.split(" ")[0]}
            </div>
          </AspectRatio>
        </div>
      ))}
    </div>
  ),
};

export const ImageUseCase: Story = {
  render: () => (
    <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 24 }}>
      <div>
        <p style={{ fontSize: 13, marginBottom: 8, color: "hsl(var(--muted-foreground))" }}>16:9 — Video thumbnail</p>
        <AspectRatio ratio={16 / 9}>
          <div
            style={{
              width: "100%",
              height: "100%",
              background: "hsl(var(--muted))",
              borderRadius: 8,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
              gap: 8,
              color: "hsl(var(--muted-foreground))",
            }}
          >
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <polygon points="5 3 19 12 5 21 5 3" />
            </svg>
            <span style={{ fontSize: 12 }}>Video Thumbnail</span>
          </div>
        </AspectRatio>
      </div>
      <div>
        <p style={{ fontSize: 13, marginBottom: 8, color: "hsl(var(--muted-foreground))" }}>1:1 — Avatar</p>
        <AspectRatio ratio={1}>
          <div
            style={{
              width: "100%",
              height: "100%",
              background: "hsl(var(--primary))",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "hsl(var(--primary-foreground))",
              fontSize: 24,
              fontWeight: 700,
            }}
          >
            AG
          </div>
        </AspectRatio>
      </div>
    </div>
  ),
};

export const Interactive: Story = {
  args: {
    ratio: 16 / 9,
  },
  argTypes: {
    ratio: {
      control: { type: "number", min: 0.25, max: 4, step: 0.25 },
      description: "Width divided by height (e.g. 16/9 = 1.778)",
    },
  },
  render: (args) => (
    <div style={{ width: 400 }}>
      <AspectRatio ratio={args.ratio}>
        <div
          style={{
            width: "100%",
            height: "100%",
            background: "hsl(var(--muted))",
            border: "1px solid hsl(var(--border))",
            borderRadius: 8,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 14,
            color: "hsl(var(--muted-foreground))",
          }}
        >
          ratio: {typeof args.ratio === "number" ? args.ratio.toFixed(3) : args.ratio}
        </div>
      </AspectRatio>
    </div>
  ),
};
