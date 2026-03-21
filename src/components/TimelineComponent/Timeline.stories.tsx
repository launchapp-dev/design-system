import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import { Timeline } from "./index";

const meta: Meta<typeof Timeline> = {
  title: "Components/Timeline",
  component: Timeline,
  argTypes: {
    orientation: {
      control: "select",
      options: ["vertical", "horizontal"],
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
    animate: {
      control: "select",
      options: ["none", "fade", "slide"],
    },
    animatedOnScroll: { control: "boolean" },
  },
  args: {
    orientation: "vertical",
    size: "md",
    animate: "none",
    animatedOnScroll: false,
  },
};

export default meta;
type Story = StoryObj<typeof Timeline>;

const projectItems = [
  {
    id: "1",
    title: "Project Kickoff",
    description: "Initial planning and team alignment meeting",
    date: "Jan 15, 2024",
    status: "completed" as const,
  },
  {
    id: "2",
    title: "Design Phase",
    description: "Created wireframes and high-fidelity mockups",
    date: "Feb 1, 2024",
    status: "completed" as const,
  },
  {
    id: "3",
    title: "Development Sprint 1",
    description: "Core features and API integration",
    date: "Feb 15, 2024",
    status: "completed" as const,
  },
  {
    id: "4",
    title: "Development Sprint 2",
    description: "Advanced features and optimizations",
    date: "Mar 1, 2024",
    status: "pending" as const,
  },
  {
    id: "5",
    title: "Testing & QA",
    description: "Comprehensive testing and bug fixes",
    date: "Mar 15, 2024",
    status: "pending" as const,
  },
  {
    id: "6",
    title: "Launch",
    description: "Production deployment and monitoring",
    date: "Apr 1, 2024",
    status: "pending" as const,
  },
];

const educationItems = [
  {
    id: "1",
    title: "Computer Science Degree",
    description: "Bachelor of Science, Stanford University",
    date: "2016 - 2020",
    status: "completed" as const,
  },
  {
    id: "2",
    title: "Software Engineering Intern",
    description: "Google Summer of Code",
    date: "Summer 2019",
    status: "completed" as const,
  },
  {
    id: "3",
    title: "Junior Developer",
    description: "Tech Startup Inc.",
    date: "2020 - 2022",
    status: "completed" as const,
  },
  {
    id: "4",
    title: "Senior Engineer",
    description: "Current Position",
    date: "2022 - Present",
    status: "completed" as const,
  },
];

const eventItems = [
  {
    id: "1",
    title: "React Summit",
    description: "Conference talk on Design Systems",
    date: "June 2024",
    status: "completed" as const,
  },
  {
    id: "2",
    title: "Tech Conference",
    description: "Panel discussion on UI/UX",
    date: "September 2024",
    status: "pending" as const,
  },
];

const CheckIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="10"
    height="10"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="3"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M20 6 9 17l-5-5" />
  </svg>
);

const CircleIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="6"
    height="6"
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
  >
    <circle cx="12" cy="12" r="10" />
  </svg>
);

export const Default: Story = {
  render: (args) => (
    <Timeline {...args} items={projectItems} />
  ),
};

export const Horizontal: Story = {
  render: (args) => (
    <div className="w-full overflow-x-auto">
      <Timeline {...args} items={eventItems} orientation="horizontal" />
    </div>
  ),
};

export const WithAnimated: Story = {
  render: (args) => (
    <Timeline {...args} items={projectItems} animate="fade" />
  ),
};

export const WithSlideAnimation: Story = {
  render: (args) => (
    <Timeline {...args} items={projectItems} animate="slide" />
  ),
};

export const SmallSize: Story = {
  render: (args) => (
    <Timeline {...args} items={projectItems} size="sm" />
  ),
};

export const LargeSize: Story = {
  render: (args) => (
    <Timeline {...args} items={projectItems} size="lg" />
  ),
};

export const Education: Story = {
  render: (args) => (
    <Timeline {...args} items={educationItems} />
  ),
};

export const WithIcons: Story = {
  render: (args) => (
    <Timeline
      {...args}
      items={[
        {
          id: "1",
          title: "Completed Task",
          description: "This task has been finished",
          status: "completed" as const,
          icon: <CheckIcon />,
        },
        {
          id: "2",
          title: "In Progress",
          description: "Currently working on this",
          status: "default" as const,
          icon: <CircleIcon />,
        },
        {
          id: "3",
          title: "Pending Task",
          description: "Waiting to start",
          status: "pending" as const,
        },
      ]}
    />
  ),
};

export const ErrorStatus: Story = {
  render: (args) => (
    <Timeline
      {...args}
      items={[
        {
          id: "1",
          title: "Step 1",
          description: "Completed",
          status: "completed" as const,
        },
        {
          id: "2",
          title: "Step 2",
          description: "Failed",
          status: "error" as const,
        },
        {
          id: "3",
          title: "Step 3",
          description: "Waiting",
          status: "pending" as const,
        },
      ]}
    />
  ),
};

export const HorizontalAnimated: Story = {
  render: (args) => (
    <div className="w-full overflow-x-auto">
      <Timeline
        {...args}
        items={eventItems}
        orientation="horizontal"
        animate="fade"
      />
    </div>
  ),
};
