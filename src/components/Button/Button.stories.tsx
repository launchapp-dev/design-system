import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "./index";

const meta: Meta<typeof Button> = {
  title: "Components/Button",
  component: Button,
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "outline", "ghost", "destructive", "secondary", "link"],
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg", "icon"],
    },
    disabled: { control: "boolean" },
  },
  args: {
    variant: "default",
    size: "md",
    disabled: false,
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Default: Story = {
  render: (args) => <Button {...args}>Button</Button>,
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      {(["default", "secondary", "outline", "ghost", "destructive", "link"] as const).map((variant) => (
        <div key={variant} style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          <span style={{ fontSize: "12px", textTransform: "capitalize" }}>{variant}</span>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <Button variant={variant}>Button</Button>
            <Button variant={variant} disabled>Disabled</Button>
          </div>
        </div>
      ))}
    </div>
  ),
};

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      {(["sm", "md", "lg"] as const).map((size) => (
        <div key={size} style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <span style={{ width: 24, fontSize: "12px" }}>{size}</span>
          <Button size={size}>Default</Button>
          <Button size={size} variant="outline">Outline</Button>
          <Button size={size} variant="ghost">Ghost</Button>
          <Button size={size} variant="destructive">Destructive</Button>
        </div>
      ))}
    </div>
  ),
};

export const Outline: Story = {
  render: (args) => <Button {...args} variant="outline">Outline</Button>,
};

export const Ghost: Story = {
  render: (args) => <Button {...args} variant="ghost">Ghost</Button>,
};

export const Destructive: Story = {
  render: (args) => <Button {...args} variant="destructive">Delete</Button>,
};

export const Secondary: Story = {
  render: (args) => <Button {...args} variant="secondary">Secondary</Button>,
};

export const Link: Story = {
  render: (args) => <Button {...args} variant="link">Link button</Button>,
};

export const IconSize: Story = {
  render: () => (
    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
      <Button size="icon" aria-label="Add">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
      </Button>
      <Button size="icon" variant="outline" aria-label="Add">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
      </Button>
      <Button size="icon" variant="ghost" aria-label="Add">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
      </Button>
    </div>
  ),
};
