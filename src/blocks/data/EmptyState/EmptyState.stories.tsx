import type { Meta, StoryObj } from "@storybook/react";
import { EmptyState, emptyStateIcons } from "./EmptyState";

const meta: Meta<typeof EmptyState> = {
  title: "Blocks/Data/EmptyState",
  component: EmptyState,
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof EmptyState>;

export const Default: Story = {
  args: {
    title: "No projects yet",
    description: "Get started by creating your first project.",
    icon: emptyStateIcons.folder,
    primaryAction: {
      label: "Create project",
      onClick: () => console.log("Create project"),
    },
  },
};

export const Small: Story = {
  args: {
    title: "No results",
    description: "Try adjusting your search.",
    icon: emptyStateIcons.search,
    size: "sm",
  },
};

export const Large: Story = {
  args: {
    title: "Welcome to your dashboard",
    description: "You haven't created any reports yet. Start by creating your first report to see your data here.",
    icon: emptyStateIcons.box,
    size: "lg",
    primaryAction: {
      label: "Create report",
      onClick: () => console.log("Create"),
    },
    secondaryAction: {
      label: "Learn more",
      onClick: () => console.log("Learn"),
    },
  },
};

export const Bordered: Story = {
  args: {
    title: "No notifications",
    description: "You're all caught up! Check back later for updates.",
    icon: emptyStateIcons.bell,
    variant: "bordered",
  },
};

export const Card: Story = {
  args: {
    title: "No team members",
    description: "Invite your team to collaborate on this project.",
    icon: emptyStateIcons.users,
    variant: "card",
    primaryAction: {
      label: "Invite team",
      onClick: () => console.log("Invite"),
    },
  },
};

export const WithTwoActions: Story = {
  args: {
    title: "No files uploaded",
    description: "Upload files to share with your team or import from a cloud storage provider.",
    icon: emptyStateIcons.file,
    primaryAction: {
      label: "Upload files",
      onClick: () => console.log("Upload"),
    },
    secondaryAction: {
      label: "Import from cloud",
      onClick: () => console.log("Import"),
    },
  },
};

export const WithHref: Story = {
  args: {
    title: "Inbox empty",
    description: "No new messages in your inbox.",
    icon: emptyStateIcons.inbox,
    primaryAction: {
      label: "Send message",
      href: "#compose",
    },
  },
};

export const SearchEmpty: Story = {
  args: {
    title: "No results found",
    description: "We couldn't find any matches for 'project alpha'. Try a different search term.",
    icon: emptyStateIcons.search,
    size: "md",
    primaryAction: {
      label: "Clear search",
      onClick: () => console.log("Clear"),
    },
  },
};

export const Minimal: Story = {
  args: {
    title: "Nothing here yet",
  },
};

export const NoIcon: Story = {
  args: {
    title: "No data available",
    description: "Data will appear here once your integration is complete.",
    primaryAction: {
      label: "View setup guide",
      onClick: () => console.log("View"),
    },
  },
};
