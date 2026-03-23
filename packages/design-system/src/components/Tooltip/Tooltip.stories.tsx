import type { Meta, StoryObj } from "@storybook/react";
import { TooltipProvider, TooltipRoot, TooltipTrigger, TooltipContent } from "./index";

const meta = {
  title: "Components/Tooltip",
  component: TooltipContent,
  decorators: [
    (Story) => (
      <TooltipProvider>
        <Story />
      </TooltipProvider>
    ),
  ],
  argTypes: {
    side: {
      control: "select",
      options: ["top", "right", "bottom", "left"],
    },
    sideOffset: {
      control: "number",
    },
  },
} satisfies Meta<typeof TooltipContent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <div style={{ display: "flex", justifyContent: "center", padding: "48px" }}>
      <TooltipRoot>
        <TooltipTrigger>Hover me</TooltipTrigger>
        <TooltipContent {...args}>Tooltip content</TooltipContent>
      </TooltipRoot>
    </div>
  ),
  args: {
    side: "top",
    sideOffset: 4,
  },
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "32px", justifyContent: "center", padding: "64px" }}>
      {(["top", "right", "bottom", "left"] as const).map((side) => (
        <TooltipRoot key={side}>
          <TooltipTrigger
            style={{ padding: "8px 16px", border: "1px solid #e2e8f0", borderRadius: "4px", cursor: "pointer" }}
          >
            {side}
          </TooltipTrigger>
          <TooltipContent side={side}>Tooltip on {side}</TooltipContent>
        </TooltipRoot>
      ))}
    </div>
  ),
};

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "32px", justifyContent: "center", padding: "64px" }}>
      <TooltipRoot>
        <TooltipTrigger style={{ padding: "8px 16px", border: "1px solid #e2e8f0", borderRadius: "4px" }}>
          Short
        </TooltipTrigger>
        <TooltipContent>Hi</TooltipContent>
      </TooltipRoot>
      <TooltipRoot>
        <TooltipTrigger style={{ padding: "8px 16px", border: "1px solid #e2e8f0", borderRadius: "4px" }}>
          Medium
        </TooltipTrigger>
        <TooltipContent>Medium length tooltip</TooltipContent>
      </TooltipRoot>
      <TooltipRoot>
        <TooltipTrigger style={{ padding: "8px 16px", border: "1px solid #e2e8f0", borderRadius: "4px" }}>
          Long
        </TooltipTrigger>
        <TooltipContent>This is a much longer tooltip with more descriptive content</TooltipContent>
      </TooltipRoot>
    </div>
  ),
};

export const Interactive: Story = {
  render: (args) => (
    <div style={{ display: "flex", justifyContent: "center", padding: "64px" }}>
      <TooltipRoot>
        <TooltipTrigger style={{ padding: "8px 16px", border: "1px solid #e2e8f0", borderRadius: "4px", cursor: "pointer" }}>
          Hover to see tooltip
        </TooltipTrigger>
        <TooltipContent {...args}>Interactive tooltip</TooltipContent>
      </TooltipRoot>
    </div>
  ),
  args: {
    side: "top",
    sideOffset: 4,
  },
};

export const DarkMode: Story = {
  decorators: [
    (Story) => (
      <div className="dark" style={{ background: "#09090b", padding: "64px", borderRadius: "8px", display: "flex", justifyContent: "center" }}>
        <Story />
      </div>
    ),
  ],
  render: () => (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "32px", justifyContent: "center" }}>
      {(["top", "right", "bottom", "left"] as const).map((side) => (
        <TooltipRoot key={side}>
          <TooltipTrigger style={{ padding: "8px 16px", border: "1px solid #333", borderRadius: "4px", color: "#fff", cursor: "pointer" }}>
            {side}
          </TooltipTrigger>
          <TooltipContent side={side}>Tooltip on {side}</TooltipContent>
        </TooltipRoot>
      ))}
    </div>
  ),
};

export const EdgeCases: Story = {
  render: () => (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "32px", justifyContent: "center", padding: "64px" }}>
      <TooltipRoot>
        <TooltipTrigger style={{ padding: "8px 16px", border: "1px solid #e2e8f0", borderRadius: "4px" }}>
          Long text
        </TooltipTrigger>
        <TooltipContent>
          A very long tooltip message that tests how the component handles overflow and wrapping of text content in constrained layouts
        </TooltipContent>
      </TooltipRoot>
      <TooltipRoot>
        <TooltipTrigger style={{ padding: "8px 16px", border: "1px solid #e2e8f0", borderRadius: "4px" }}>
          Large offset
        </TooltipTrigger>
        <TooltipContent sideOffset={16}>Large side offset</TooltipContent>
      </TooltipRoot>
      <TooltipRoot>
        <TooltipTrigger style={{ padding: "8px 16px", border: "1px solid #e2e8f0", borderRadius: "4px" }}>
          No offset
        </TooltipTrigger>
        <TooltipContent sideOffset={0}>Zero offset</TooltipContent>
      </TooltipRoot>
    </div>
  ),
};
