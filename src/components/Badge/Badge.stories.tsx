import type { Meta, StoryObj } from "@storybook/react";
import { Badge } from "./index";

const meta = {
  title: "Components/Badge",
  component: Badge,
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "secondary", "outline", "destructive"],
    },
    children: {
      control: "text",
    },
  },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: "Badge",
    variant: "default",
  },
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "12px", alignItems: "center" }}>
      <Badge variant="default">Default</Badge>
      <Badge variant="secondary">Secondary</Badge>
      <Badge variant="outline">Outline</Badge>
      <Badge variant="destructive">Destructive</Badge>
    </div>
  ),
};

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "12px", alignItems: "center" }}>
      <Badge variant="default">Badge</Badge>
      <Badge variant="default" style={{ fontSize: "0.625rem" }}>Small text</Badge>
      <Badge variant="default" style={{ fontSize: "0.875rem", padding: "4px 12px" }}>Large padding</Badge>
    </div>
  ),
};

export const Interactive: Story = {
  args: {
    children: "Interactive badge",
    variant: "default",
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
    <div style={{ display: "flex", flexWrap: "wrap", gap: "12px", alignItems: "center" }}>
      <Badge variant="default">Default</Badge>
      <Badge variant="secondary">Secondary</Badge>
      <Badge variant="outline">Outline</Badge>
      <Badge variant="destructive">Destructive</Badge>
    </div>
  ),
};

export const EdgeCases: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", alignItems: "center" }}>
        <Badge variant="default">A badge with a very long label that tests overflow behavior in constrained layouts</Badge>
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", alignItems: "center" }}>
        <Badge variant="default">{""}</Badge>
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", alignItems: "center" }}>
        <Badge variant="outline">Inline</Badge>
        <span>badge used</span>
        <Badge variant="secondary">inside</Badge>
        <span>text content</span>
      </div>
    </div>
  ),
};
