import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import { Popover, PopoverTrigger, PopoverContent, PopoverArrow } from "./index";

const meta: Meta<typeof Popover> = {
  title: "Components/Popover",
  component: Popover,
  argTypes: {
    open: { control: "boolean" },
    modal: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div style={{ display: "flex", justifyContent: "center", padding: "80px" }}>
      <Popover>
        <PopoverTrigger asChild>
          <button
            style={{
              padding: "8px 16px",
              border: "1px solid hsl(var(--border))",
              borderRadius: "6px",
              background: "hsl(var(--background))",
              cursor: "pointer",
            }}
          >
            Open Popover
          </button>
        </PopoverTrigger>
        <PopoverContent>
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <p style={{ fontSize: "14px", fontWeight: 500 }}>Dimensions</p>
            <p style={{ fontSize: "13px", color: "var(--muted-foreground)" }}>
              Set the dimensions for the layer.
            </p>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  ),
};

export const AllVariants: Story = {
  render: () => (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "48px",
        justifyContent: "center",
        padding: "80px 32px",
      }}
    >
      {(["top", "bottom", "left", "right"] as const).map((side) => (
        <div
          key={side}
          style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "8px" }}
        >
          <span style={{ fontSize: "12px", color: "var(--muted-foreground)" }}>side={side}</span>
          <Popover defaultOpen>
            <PopoverTrigger asChild>
              <button
                style={{
                  padding: "8px 16px",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "6px",
                  background: "hsl(var(--background))",
                  cursor: "pointer",
                }}
              >
                Trigger
              </button>
            </PopoverTrigger>
            <PopoverContent side={side}>
              <p style={{ fontSize: "13px" }}>Opens on {side}</p>
            </PopoverContent>
          </Popover>
        </div>
      ))}
    </div>
  ),
};

export const AllSizes: Story = {
  render: () => (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "48px",
        justifyContent: "center",
        padding: "80px 32px",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "8px" }}>
        <span style={{ fontSize: "12px", color: "var(--muted-foreground)" }}>Small</span>
        <Popover defaultOpen>
          <PopoverTrigger asChild>
            <button
              style={{
                padding: "8px 16px",
                border: "1px solid hsl(var(--border))",
                borderRadius: "6px",
                background: "hsl(var(--background))",
                cursor: "pointer",
              }}
            >
              Small
            </button>
          </PopoverTrigger>
          <PopoverContent className="w-40">
            <p style={{ fontSize: "13px" }}>Compact content</p>
          </PopoverContent>
        </Popover>
      </div>

      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "8px" }}>
        <span style={{ fontSize: "12px", color: "var(--muted-foreground)" }}>Default (w-72)</span>
        <Popover defaultOpen>
          <PopoverTrigger asChild>
            <button
              style={{
                padding: "8px 16px",
                border: "1px solid hsl(var(--border))",
                borderRadius: "6px",
                background: "hsl(var(--background))",
                cursor: "pointer",
              }}
            >
              Default
            </button>
          </PopoverTrigger>
          <PopoverContent>
            <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
              <p style={{ fontSize: "14px", fontWeight: 500 }}>Title</p>
              <p style={{ fontSize: "13px", color: "var(--muted-foreground)" }}>
                Default width popover with some descriptive content.
              </p>
            </div>
          </PopoverContent>
        </Popover>
      </div>

      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "8px" }}>
        <span style={{ fontSize: "12px", color: "var(--muted-foreground)" }}>Wide</span>
        <Popover defaultOpen>
          <PopoverTrigger asChild>
            <button
              style={{
                padding: "8px 16px",
                border: "1px solid hsl(var(--border))",
                borderRadius: "6px",
                background: "hsl(var(--background))",
                cursor: "pointer",
              }}
            >
              Wide
            </button>
          </PopoverTrigger>
          <PopoverContent className="w-96">
            <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
              <p style={{ fontSize: "14px", fontWeight: 500 }}>Wide Popover</p>
              <p style={{ fontSize: "13px", color: "var(--muted-foreground)" }}>
                This popover is wider and can contain more content, forms, or multi-column layouts.
              </p>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  ),
};

export const Interactive: Story = {
  render: () => {
    const [name, setName] = React.useState("");
    const [submitted, setSubmitted] = React.useState<string | null>(null);

    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "16px",
          padding: "80px",
        }}
      >
        <Popover>
          <PopoverTrigger asChild>
            <button
              style={{
                padding: "8px 16px",
                border: "1px solid hsl(var(--border))",
                borderRadius: "6px",
                background: "hsl(var(--background))",
                cursor: "pointer",
              }}
            >
              Edit Name
            </button>
          </PopoverTrigger>
          <PopoverContent className="w-64">
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              <p style={{ fontSize: "14px", fontWeight: 500 }}>Edit display name</p>
              <input
                style={{
                  width: "100%",
                  padding: "6px 8px",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "4px",
                  fontSize: "13px",
                  background: "hsl(var(--background))",
                  color: "hsl(var(--foreground))",
                  boxSizing: "border-box",
                }}
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <button
                style={{
                  padding: "6px 12px",
                  background: "hsl(var(--primary))",
                  color: "hsl(var(--primary-foreground))",
                  border: "none",
                  borderRadius: "4px",
                  fontSize: "13px",
                  cursor: "pointer",
                }}
                onClick={() => setSubmitted(name)}
              >
                Save
              </button>
            </div>
          </PopoverContent>
        </Popover>
        {submitted !== null && (
          <p style={{ fontSize: "13px", color: "var(--muted-foreground)" }}>
            Saved: {submitted || "(empty)"}
          </p>
        )}
      </div>
    );
  },
};

export const DarkMode: Story = {
  parameters: {
    globals: { theme: "dark" },
  },
  render: () => (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        padding: "80px",
        background: "hsl(var(--background))",
      }}
    >
      <Popover>
        <PopoverTrigger asChild>
          <button
            style={{
              padding: "8px 16px",
              border: "1px solid hsl(var(--border))",
              borderRadius: "6px",
              background: "hsl(var(--background))",
              color: "hsl(var(--foreground))",
              cursor: "pointer",
            }}
          >
            Open Popover
          </button>
        </PopoverTrigger>
        <PopoverContent>
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <p style={{ fontSize: "14px", fontWeight: 500 }}>Dark Mode Popover</p>
            <p style={{ fontSize: "13px", color: "var(--muted-foreground)" }}>
              Styled for dark theme with proper contrast.
            </p>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  ),
};

export const WithArrow: Story = {
  render: () => (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "48px",
        justifyContent: "center",
        padding: "80px 32px",
      }}
    >
      {(["top", "bottom", "left", "right"] as const).map((side) => (
        <div
          key={side}
          style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "8px" }}
        >
          <span style={{ fontSize: "12px", color: "var(--muted-foreground)" }}>side={side}</span>
          <Popover defaultOpen>
            <PopoverTrigger asChild>
              <button
                style={{
                  padding: "8px 16px",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "6px",
                  background: "hsl(var(--background))",
                  cursor: "pointer",
                }}
              >
                Trigger
              </button>
            </PopoverTrigger>
            <PopoverContent side={side}>
              <PopoverArrow />
              <p style={{ fontSize: "13px" }}>With arrow, {side}</p>
            </PopoverContent>
          </Popover>
        </div>
      ))}
    </div>
  ),
};

export const EdgeCases: Story = {
  render: () => (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "48px",
        justifyContent: "center",
        padding: "80px 32px",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "8px" }}>
        <span style={{ fontSize: "12px", color: "var(--muted-foreground)" }}>Long Content</span>
        <Popover defaultOpen>
          <PopoverTrigger asChild>
            <button
              style={{
                padding: "8px 16px",
                border: "1px solid hsl(var(--border))",
                borderRadius: "6px",
                background: "hsl(var(--background))",
                cursor: "pointer",
              }}
            >
              Long
            </button>
          </PopoverTrigger>
          <PopoverContent>
            <p style={{ fontSize: "13px" }}>
              This popover contains a much longer piece of text that wraps across multiple lines to
              verify that the layout handles overflow gracefully without breaking the visual
              structure.
            </p>
          </PopoverContent>
        </Popover>
      </div>

      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "8px" }}>
        <span style={{ fontSize: "12px", color: "var(--muted-foreground)" }}>Align Start</span>
        <Popover defaultOpen>
          <PopoverTrigger asChild>
            <button
              style={{
                padding: "8px 16px",
                border: "1px solid hsl(var(--border))",
                borderRadius: "6px",
                background: "hsl(var(--background))",
                cursor: "pointer",
              }}
            >
              align=start
            </button>
          </PopoverTrigger>
          <PopoverContent align="start">
            <p style={{ fontSize: "13px" }}>Aligned to start of trigger</p>
          </PopoverContent>
        </Popover>
      </div>

      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "8px" }}>
        <span style={{ fontSize: "12px", color: "var(--muted-foreground)" }}>Align End</span>
        <Popover defaultOpen>
          <PopoverTrigger asChild>
            <button
              style={{
                padding: "8px 16px",
                border: "1px solid hsl(var(--border))",
                borderRadius: "6px",
                background: "hsl(var(--background))",
                cursor: "pointer",
              }}
            >
              align=end
            </button>
          </PopoverTrigger>
          <PopoverContent align="end">
            <p style={{ fontSize: "13px" }}>Aligned to end of trigger</p>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  ),
};
