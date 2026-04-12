import type { Meta, StoryObj } from "@storybook/react";
import { Logo } from "./index";

const meta: Meta<typeof Logo> = {
  title: "Components/Logo",
  component: Logo,
  argTypes: {
    variant: {
      control: "select",
      options: ["horizontal", "stacked", "mark", "wordmark"],
    },
    size: {
      control: "select",
      options: ["xs", "sm", "md", "lg", "xl"],
    },
    color: {
      control: "select",
      options: ["brand", "white", "black", "current"],
    },
  },
  args: {
    variant: "horizontal",
    size: "md",
    color: "brand",
  },
};

export default meta;
type Story = StoryObj<typeof Logo>;

export const Default: Story = {};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "32px", padding: "24px" }}>
      {(["horizontal", "stacked", "mark", "wordmark"] as const).map((variant) => (
        <div key={variant} style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          <span style={{ fontSize: "12px", color: "#888", textTransform: "capitalize" }}>
            {variant}
          </span>
          <Logo variant={variant} size="md" />
        </div>
      ))}
    </div>
  ),
};

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px", padding: "24px" }}>
      {(["xs", "sm", "md", "lg", "xl"] as const).map((size) => (
        <div key={size} style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <span style={{ fontSize: "12px", color: "#888", width: "24px" }}>{size}</span>
          <Logo size={size} />
        </div>
      ))}
    </div>
  ),
};

export const ColorSchemes: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px", padding: "24px" }}>
      <div style={{ padding: "16px", background: "#fff", borderRadius: "8px" }}>
        <Logo color="brand" />
      </div>
      <div style={{ padding: "16px", background: "#0f172a", borderRadius: "8px" }}>
        <Logo color="white" />
      </div>
      <div style={{ padding: "16px", background: "#f1f5f9", borderRadius: "8px" }}>
        <Logo color="black" />
      </div>
    </div>
  ),
};

export const Mark: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "16px", alignItems: "center", padding: "24px" }}>
      {(["xs", "sm", "md", "lg", "xl"] as const).map((size) => (
        <Logo key={size} variant="mark" size={size} />
      ))}
    </div>
  ),
};

export const Stacked: Story = {
  args: {
    variant: "stacked",
    size: "lg",
  },
};

export const DarkBackground: Story = {
  render: () => (
    <div
      style={{
        padding: "32px",
        background: "#0f172a",
        borderRadius: "12px",
        display: "flex",
        flexDirection: "column",
        gap: "24px",
      }}
    >
      <Logo color="white" variant="horizontal" />
      <Logo color="white" variant="stacked" />
      <Logo color="white" variant="mark" size="lg" />
    </div>
  ),
};
