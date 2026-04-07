import type { Meta, StoryObj } from "@storybook/react";
import { ActivityStream, type StreamEvent } from "./ActivityStream";

const sampleEvents: StreamEvent[] = [
  {
    id: "1",
    actor: { name: "Sarah Chen", initials: "SC", avatar: "https://i.pravatar.cc/150?u=sarah" },
    action: "created",
    target: "Q2 Marketing Campaign",
    timestamp: "2 minutes ago",
    metadata: "This campaign targets enterprise customers with a focus on product-led growth.",
    type: "create",
  },
  {
    id: "2",
    actor: { name: "Alex Kim", initials: "AK", avatar: "https://i.pravatar.cc/150?u=alex" },
    action: "commented on",
    target: "LaunchApp Dashboard Redesign",
    timestamp: "15 minutes ago",
    metadata: "Added some feedback on the new sidebar layout — looks great!",
    type: "comment",
  },
  {
    id: "3",
    actor: { name: "Jordan Lee", initials: "JL", avatar: "https://i.pravatar.cc/150?u=jordan" },
    action: "published",
    target: "Feature Update: Q1 2026",
    timestamp: "1 hour ago",
    type: "publish",
  },
  {
    id: "4",
    actor: { name: "Morgan Xu", initials: "MX", avatar: "https://i.pravatar.cc/150?u=morgan" },
    action: "updated",
    target: "User Onboarding Flow",
    timestamp: "2 hours ago",
    type: "update",
  },
  {
    id: "5",
    actor: { name: "Taylor Smith", initials: "TS", avatar: "https://i.pravatar.cc/150?u=taylor" },
    action: "liked",
    target: "Design System v0.2",
    timestamp: "3 hours ago",
    type: "like",
  },
];

const meta: Meta<typeof ActivityStream> = {
  title: "Blocks/Activity/ActivityStream",
  component: ActivityStream,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof ActivityStream>;

export const Default: Story = {
  args: {
    events: sampleEvents,
    title: "Activity Stream",
  },
};

export const WithLoadMore: Story = {
  args: {
    events: sampleEvents,
    title: "Recent Activity",
    showLoadMore: true,
  },
};