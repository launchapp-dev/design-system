import type { Meta, StoryObj } from "@storybook/react";
import { AIComponentGenerator } from "./index";

const meta: Meta<typeof AIComponentGenerator> = {
  title: "Components/AIComponentGenerator",
  component: AIComponentGenerator,
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
  },
  args: {
    size: "md",
  },
};

export default meta;
type Story = StoryObj<typeof AIComponentGenerator>;

export const Default: Story = {
  render: (args) => <AIComponentGenerator {...args} />,
};

export const Small: Story = {
  render: (args) => <AIComponentGenerator {...args} size="sm" />,
};

export const Large: Story = {
  render: (args) => <AIComponentGenerator {...args} size="lg" />,
};
