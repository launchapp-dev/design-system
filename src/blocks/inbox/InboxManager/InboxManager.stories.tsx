import type { Meta, StoryObj } from "@storybook/react";
import { InboxManager, type InboxFolder, type InboxMessage } from "./InboxManager";

const folders: InboxFolder[] = [
  { id: "inbox", label: "Inbox", count: 4 },
  { id: "starred", label: "Starred", count: 1 },
  { id: "sent", label: "Sent", count: 12 },
  { id: "drafts", label: "Drafts", count: 2 },
  { id: "archive", label: "Archive" },
];

const messages: InboxMessage[] = [
  {
    id: "1",
    sender: { name: "Sarah Chen", initials: "SC", avatar: "https://i.pravatar.cc/150?u=sarah" },
    subject: "Design system update — new components merged",
    preview: "PR #367 is now live with InvoiceTable, FileManager, and CalendarWidget blocks...",
    timestamp: "2m ago",
    read: false,
    starred: true,
    priority: "normal",
    tags: ["design", "release"],
  },
  {
    id: "2",
    sender: { name: "CI Bot", initials: "CI" },
    subject: "[CI] Build passed — all templates green",
    preview: "18/18 turbo tasks passed. No errors, no warnings.",
    timestamp: "15m ago",
    read: false,
    priority: "urgent",
    tags: ["ci"],
  },
  {
    id: "3",
    sender: { name: "Alex Kim", initials: "AK", avatar: "https://i.pravatar.cc/150?u=alex" },
    subject: "Review request: CommandPalette component",
    preview: "Can you take a look at the new CommandPalette block implementation?",
    timestamp: "1h ago",
    read: false,
    pinned: true,
    tags: ["review"],
  },
  {
    id: "4",
    sender: { name: "Jordan Lee", initials: "JL", avatar: "https://i.pravatar.cc/150?u=jordan" },
    subject: "Q2 planning documents",
    preview: "I've shared the Q2 roadmap document. Let me know if you have any questions...",
    timestamp: "3h ago",
    read: true,
    tags: ["planning"],
  },
  {
    id: "5",
    sender: { name: "Morgan Xu", initials: "MX" },
    subject: "Sprint retrospective notes",
    preview: "Added our retro notes to the wiki. Key action items are summarized at the bottom.",
    timestamp: "Yesterday",
    read: true,
  },
];

const meta: Meta<typeof InboxManager> = {
  title: "Blocks/Inbox/InboxManager",
  component: InboxManager,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof InboxManager>;

export const Default: Story = {
  args: {
    messages,
    folders,
    activeFolder: "inbox",
    title: "Inbox",
  },
};

export const WithoutFolders: Story = {
  args: {
    messages,
  },
};