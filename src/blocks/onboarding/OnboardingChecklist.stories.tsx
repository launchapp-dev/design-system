import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import { OnboardingChecklist } from "./OnboardingChecklist";
import type { ChecklistItem } from "./OnboardingChecklist";

const baseItems: ChecklistItem[] = [
  {
    id: "profile",
    title: "Complete your profile",
    description: "Add your name, avatar, and bio.",
    completed: true,
  },
  {
    id: "workspace",
    title: "Create a workspace",
    description: "Set up your first workspace to organize projects.",
    completed: true,
  },
  {
    id: "invite",
    title: "Invite a team member",
    description: "Collaboration is better together.",
    completed: false,
    href: "#invite",
  },
  {
    id: "integration",
    title: "Connect an integration",
    description: "Link Slack, GitHub, or another tool.",
    completed: false,
  },
  {
    id: "publish",
    title: "Publish your first project",
    description: "Go live and share your work.",
    completed: false,
  },
];

const meta: Meta<typeof OnboardingChecklist> = {
  title: "Blocks/Onboarding/OnboardingChecklist",
  component: OnboardingChecklist,
  parameters: {
    layout: "padded",
    docs: {
      source: {
        code: `import { OnboardingChecklist } from "@launchapp/design-system/blocks/onboarding";

const [items, setItems] = useState(initialItems);

const handleToggle = (id: string, completed: boolean) => {
  setItems((prev) =>
    prev.map((item) => item.id === id ? { ...item, completed } : item)
  );
};

export default function Page() {
  return (
    <OnboardingChecklist
      title="Getting started"
      items={items}
      onItemToggle={handleToggle}
    />
  );
}`,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof OnboardingChecklist>;

const InteractiveTemplate = (args: React.ComponentProps<typeof OnboardingChecklist>) => {
  const [items, setItems] = React.useState(args.items);
  return (
    <div style={{ maxWidth: 520 }}>
      <OnboardingChecklist
        {...args}
        items={items}
        onItemToggle={(id, completed) =>
          setItems((prev) => prev.map((item) => (item.id === id ? { ...item, completed } : item)))
        }
      />
    </div>
  );
};

export const Default: Story = {
  render: InteractiveTemplate,
  args: {
    title: "Getting started",
    description: "Complete these tasks to get the most out of the platform.",
    items: baseItems,
  },
};

export const AllComplete: Story = {
  render: (args) => (
    <div style={{ maxWidth: 520 }}>
      <OnboardingChecklist {...args} />
    </div>
  ),
  args: {
    title: "Getting started",
    items: baseItems.map((item) => ({ ...item, completed: true })),
  },
};

export const DarkMode: Story = {
  render: (args) => (
    <div
      className="dark"
      style={{ background: "hsl(240 10% 3.9%)", padding: "24px", maxWidth: 520 }}
    >
      <OnboardingChecklist {...args} />
    </div>
  ),
  args: {
    title: "Getting started",
    items: baseItems,
  },
};

export const Mobile: Story = {
  parameters: { viewport: { defaultViewport: "mobile1" } },
  render: InteractiveTemplate,
  args: {
    title: "Getting started",
    items: baseItems,
  },
};
