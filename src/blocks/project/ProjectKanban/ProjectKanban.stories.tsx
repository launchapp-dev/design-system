import type { Meta, StoryObj } from "@storybook/react";
import { ProjectKanban, type ProjectColumn, type ProjectCard } from "./ProjectKanban";

const sampleCards: Record<string, ProjectCard[]> = {
  todo: [
    {
      id: "c1",
      title: "Design system audit",
      description: "Review all components for consistency and accessibility.",
      priority: "high",
      labels: ["design", "a11y"],
      assignee: { name: "Sarah Chen", initials: "SC", avatar: "https://i.pravatar.cc/150?u=sarah" },
      dueDate: "Apr 10",
    },
    {
      id: "c2",
      title: "Update onboarding copy",
      description: "Revise step 3 of the wizard to be clearer.",
      priority: "medium",
      labels: ["copy"],
      assignee: { name: "Alex Kim", initials: "AK" },
      dueDate: "Apr 12",
    },
  ],
  inprogress: [
    {
      id: "c3",
      title: "Implement search command palette",
      priority: "high",
      labels: ["feature", "search"],
      assignee: { name: "Jordan Lee", initials: "JL", avatar: "https://i.pravatar.cc/150?u=jordan" },
      dueDate: "Apr 8",
      commentCount: 4,
    },
  ],
  done: [
    {
      id: "c4",
      title: "Fix auth redirect loop",
      priority: "urgent",
      labels: ["bug", "auth"],
      assignee: { name: "Morgan Xu", initials: "MX", avatar: "https://i.pravatar.cc/150?u=morgan" },
    },
  ],
};

const columns: ProjectColumn[] = [
  { id: "todo", title: "To Do", color: "#94a3b8", cards: sampleCards.todo },
  { id: "inprogress", title: "In Progress", color: "#3b82f6", cards: sampleCards.inprogress },
  { id: "done", title: "Done", color: "#22c55e", cards: sampleCards.done },
];

const meta: Meta<typeof ProjectKanban> = {
  title: "Blocks/Project/ProjectKanban",
  component: ProjectKanban,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof ProjectKanban>;

export const Default: Story = {
  args: {
    columns,
  },
};