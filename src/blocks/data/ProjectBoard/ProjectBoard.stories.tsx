import type { Meta, StoryObj } from "@storybook/react";
import { ProjectBoard } from "./ProjectBoard";
import type { ProjectColumn } from "./ProjectBoard";

const sampleColumns: ProjectColumn[] = [
  {
    id: "planning",
    title: "Planning",
    status: "planning",
    tasks: [
      {
        id: "p1",
        title: "Define product requirements",
        priority: "high",
        tags: ["PRD"],
        milestone: "Phase 1",
      },
      {
        id: "p2",
        title: "Competitive analysis",
        priority: "medium",
        assignee: { name: "Sarah Mitchell", avatarUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80" },
      },
    ],
  },
  {
    id: "in-progress",
    title: "In Progress",
    status: "in-progress",
    tasks: [
      {
        id: "ip1",
        title: "Design system implementation",
        description: "Build out all 106 components following the design spec",
        priority: "critical",
        dueDate: "2024-04-15",
        assignee: { name: "James Chen", avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80" },
        tags: ["Design", "Frontend"],
        milestone: "Phase 2",
      },
      {
        id: "ip2",
        title: "API integration layer",
        priority: "high",
        dueDate: "2024-04-20",
        assignee: { name: "Alex Rivera", avatarUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80" },
        tags: ["Backend"],
      },
    ],
  },
  {
    id: "review",
    title: "Review",
    status: "review",
    tasks: [
      {
        id: "r1",
        title: "Authentication flow",
        priority: "high",
        dueDate: "2024-04-10",
        assignee: { name: "Morgan Taylor", avatarUrl: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80" },
        tags: ["Auth", "Security"],
        milestone: "Phase 1",
      },
    ],
  },
  {
    id: "completed",
    title: "Completed",
    status: "completed",
    tasks: [
      {
        id: "c1",
        title: "Project setup & monorepo",
        priority: "medium",
        assignee: { name: "Sam Patel" },
        tags: ["DevOps"],
      },
    ],
  },
];

const meta: Meta<typeof ProjectBoard> = {
  title: "Blocks/Data/ProjectBoard",
  component: ProjectBoard,
};

export default meta;
type Story = StoryObj<typeof ProjectBoard>;

export const Default: Story = {
  render: () => (
    <div className="h-[500px]">
      <ProjectBoard initialColumns={sampleColumns} />
    </div>
  ),
};

export const Empty: Story = {
  render: () => (
    <div className="h-[400px]">
      <ProjectBoard />
    </div>
  ),
};

export const DarkMode: Story = {
  decorators: [
    (Story) => (
      <div className="dark bg-background p-6 rounded-lg">
        <Story />
      </div>
    ),
  ],
  render: () => (
    <div className="h-[400px]">
      <ProjectBoard initialColumns={sampleColumns} />
    </div>
  ),
};
