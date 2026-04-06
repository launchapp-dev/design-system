import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import { InboxView } from "./InboxView";
import type { InboxItem } from "./InboxView";

const mockItems: InboxItem[] = [
  {
    id: "1",
    sender: "Alice Chen",
    senderInitials: "AC",
    subject: "Re: Design system review",
    preview:
      "Looks great! I especially like the new notification blocks. One small note on the timeline...",
    date: "9:41 AM",
    read: false,
  },
  {
    id: "2",
    sender: "Bob Martinez",
    senderInitials: "BM",
    subject: "PR #148 is ready for review",
    preview:
      "Hey, I've finished the onboarding components. Could you take a look before end of day?",
    date: "8:30 AM",
    read: false,
  },
  {
    id: "3",
    sender: "GitHub",
    senderInitials: "GH",
    subject: "Your pull request was merged",
    preview:
      "launchapp-dev/design-system: feat(blocks): add chat and file upload blocks [TASK-126]",
    date: "Yesterday",
    read: true,
  },
  {
    id: "4",
    sender: "Carol White",
    senderInitials: "CW",
    subject: "Welcome to the design team!",
    preview:
      "Hi! I'm so excited to have you on board. Here are a few resources to help you get started...",
    date: "Mon",
    read: true,
  },
  {
    id: "5",
    sender: "Billing",
    senderInitials: "BI",
    subject: "Your invoice for March 2026",
    preview: "Invoice #INV-0042 for $299.00 is now available. Due date: April 1, 2026.",
    date: "Mar 1",
    read: true,
  },
];

const meta: Meta<typeof InboxView> = {
  title: "Blocks/Notifications/InboxView",
  component: InboxView,
  parameters: {
    layout: "padded",
    docs: {
      source: {
        code: `import { InboxView } from "@launchapp/design-system/blocks/notifications";

export default function Page() {
  const [items, setItems] = useState(initialItems);
  const [selectedId, setSelectedId] = useState<string>();

  return (
    <InboxView
      items={items}
      selectedId={selectedId}
      onSelect={setSelectedId}
      onMarkRead={(id) =>
        setItems((prev) => prev.map((item) => item.id === id ? { ...item, read: true } : item))
      }
    />
  );
}`,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof InboxView>;

const InteractiveTemplate = (args: React.ComponentProps<typeof InboxView>) => {
  const [items, setItems] = React.useState(args.items);
  const [selectedId, setSelectedId] = React.useState<string | undefined>();
  return (
    <div style={{ maxWidth: 560 }}>
      <InboxView
        {...args}
        items={items}
        selectedId={selectedId}
        onSelect={setSelectedId}
        onMarkRead={(id) =>
          setItems((prev) => prev.map((item) => (item.id === id ? { ...item, read: true } : item)))
        }
      />
    </div>
  );
};

export const Default: Story = {
  render: InteractiveTemplate,
  args: {
    title: "Inbox",
    items: mockItems,
  },
};

export const AllRead: Story = {
  render: (args) => (
    <div style={{ maxWidth: 560 }}>
      <InboxView {...args} />
    </div>
  ),
  args: {
    title: "Inbox",
    items: mockItems.map((item) => ({ ...item, read: true })),
  },
};

export const Empty: Story = {
  render: (args) => (
    <div style={{ maxWidth: 560 }}>
      <InboxView {...args} />
    </div>
  ),
  args: {
    title: "Inbox",
    items: [],
  },
};

export const DarkMode: Story = {
  render: (args) => (
    <div
      className="dark"
      style={{ background: "hsl(240 10% 3.9%)", padding: "24px", maxWidth: 560 }}
    >
      <InboxView {...args} />
    </div>
  ),
  args: {
    title: "Inbox",
    items: mockItems,
  },
};

export const Mobile: Story = {
  parameters: { viewport: { defaultViewport: "mobile1" } },
  render: InteractiveTemplate,
  args: {
    title: "Inbox",
    items: mockItems,
  },
};
