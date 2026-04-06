import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import { ProgressChecklist, type ProgressChecklistSection } from "./ProgressChecklist";

const meta: Meta<typeof ProgressChecklist> = {
  title: "Blocks/Onboarding/ProgressChecklist",
  component: ProgressChecklist,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

const baseSections: ProgressChecklistSection[] = [
  {
    id: "account",
    title: "Account Setup",
    description: "Configure your account details",
    items: [
      { id: "1", title: "Add your profile photo", completed: true, href: "/settings/profile" },
      { id: "2", title: "Set your display name", completed: true, href: "/settings/profile" },
      { id: "3", title: "Verify your email address", completed: false, href: "/settings/profile" },
    ],
  },
  {
    id: "workspace",
    title: "Workspace",
    description: "Set up your team workspace",
    items: [
      { id: "4", title: "Create your first project", completed: false, href: "/projects/new" },
      { id: "5", title: "Invite team members", completed: false, href: "/settings/team" },
      { id: "6", title: "Set up integrations", completed: false, href: "/settings/integrations" },
    ],
  },
  {
    id: "billing",
    title: "Billing",
    description: "Set up your subscription",
    items: [
      { id: "7", title: "Choose a plan", completed: false, href: "/settings/billing" },
      { id: "8", title: "Add payment method", completed: false, href: "/settings/billing" },
    ],
  },
];

const InteractiveTemplate = (args: React.ComponentProps<typeof ProgressChecklist>) => {
  const [sections, setSections] = React.useState(args.sections);
  const handleToggle = (sectionId: string, itemId: string, completed: boolean) => {
    setSections((prev) =>
      prev.map((section) =>
        section.id === sectionId
          ? {
              ...section,
              items: section.items.map((item) =>
                item.id === itemId ? { ...item, completed } : item
              ),
            }
          : section
      )
    );
  };
  return <ProgressChecklist {...args} sections={sections} onItemToggle={handleToggle} />;
};

export const Default: Story = {
  render: InteractiveTemplate,
  args: {
    sections: baseSections,
  },
};

export const PartiallyComplete: Story = {
  render: InteractiveTemplate,
  args: {
    sections: baseSections.map((section) => ({
      ...section,
      items: section.items.map((item, idx) => ({
        ...item,
        completed: idx === 0,
      })),
    })),
  },
};

export const AllComplete: Story = {
  render: InteractiveTemplate,
  args: {
    sections: baseSections.map((section) => ({
      ...section,
      items: section.items.map((item) => ({ ...item, completed: true })),
    })),
  },
};

export const WithoutOverallProgress: Story = {
  render: InteractiveTemplate,
  args: {
    sections: baseSections,
    showOverallProgress: false,
  },
};

export const DarkMode: Story = {
  parameters: {
    backgrounds: { default: "dark" },
  },
  render: InteractiveTemplate,
  args: {
    sections: baseSections,
  },
};
