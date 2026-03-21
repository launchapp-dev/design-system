import type { Meta, StoryObj } from "@storybook/react";
import { TimelineDisplay } from "./TimelineDisplay";

const meta = {
  title: "Components/Rich Media/TimelineDisplay",
  component: TimelineDisplay,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    orientation: {
      control: "select",
      options: ["vertical", "horizontal"],
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
    animated: {
      control: "boolean",
    },
  },
} satisfies Meta<typeof TimelineDisplay>;

export default meta;
type Story = StoryObj<typeof meta>;

const sampleItems = [
  {
    id: "1",
    title: "Project Started",
    description: "Initial commit and project setup completed",
    timestamp: "Jan 1, 2024",
    status: "completed" as const,
  },
  {
    id: "2",
    title: "Design Phase",
    description: "UI/UX design and component library created",
    timestamp: "Jan 15, 2024",
    status: "completed" as const,
  },
  {
    id: "3",
    title: "Development",
    description: "Core features implementation in progress",
    timestamp: "Feb 1, 2024",
    status: "in-progress" as const,
  },
  {
    id: "4",
    title: "Testing",
    description: "QA and user acceptance testing",
    timestamp: "Mar 1, 2024",
    status: "pending" as const,
  },
  {
    id: "5",
    title: "Launch",
    description: "Production deployment and release",
    timestamp: "Apr 1, 2024",
    status: "pending" as const,
  },
];

const errorItems = [
  {
    id: "1",
    title: "Build Started",
    timestamp: "10:00 AM",
    status: "completed" as const,
  },
  {
    id: "2",
    title: "Running Tests",
    description: "128 tests passed",
    timestamp: "10:05 AM",
    status: "completed" as const,
  },
  {
    id: "3",
    title: "Deploy Failed",
    description: "Connection timeout to production server",
    timestamp: "10:10 AM",
    status: "error" as const,
  },
];

export const Default: Story = {
  args: {
    items: sampleItems,
    orientation: "vertical",
    size: "md",
    animated: true,
    className: "w-full max-w-md",
  },
};

export const Horizontal: Story = {
  args: {
    items: sampleItems.slice(0, 4),
    orientation: "horizontal",
    size: "md",
    animated: true,
    className: "w-full max-w-2xl",
  },
};

export const WithErrors: Story = {
  args: {
    items: errorItems,
    orientation: "vertical",
    size: "md",
    animated: true,
    className: "w-full max-w-md",
  },
};

export const Small: Story = {
  args: {
    items: sampleItems,
    orientation: "vertical",
    size: "sm",
    animated: true,
    className: "w-full max-w-sm",
  },
};

export const Large: Story = {
  args: {
    items: sampleItems,
    orientation: "vertical",
    size: "lg",
    animated: true,
    className: "w-full max-w-lg",
  },
};

export const Interactive: Story = {
  render: () => (
    <TimelineDisplay
      items={sampleItems}
      onItemClick={(item) => alert(`Clicked: ${item.title}`)}
      className="w-full max-w-md cursor-pointer"
    />
  ),
};

export const WithoutAnimation: Story = {
  args: {
    items: sampleItems,
    orientation: "vertical",
    animated: false,
    className: "w-full max-w-md",
  },
};
