import type { Meta, StoryObj } from "storybook";
import { SetupChecklist } from "./SetupChecklist";

const meta = {
  title: "Blocks/Onboarding/SetupChecklist",
  component: SetupChecklist,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  argTypes: {
    compact: {
      control: "boolean",
    },
    showProgress: {
      control: "boolean",
    },
  },
} satisfies Meta<typeof SetupChecklist>;

export default meta;
type Story = StoryObj<typeof meta>;

const defaultItems = [
  {
    id: "1",
    title: "Create your first project",
    description: "Projects help you organize your work",
    completed: false,
    href: "#",
  },
  {
    id: "2",
    title: "Invite team members",
    description: "Collaborate with your colleagues",
    completed: false,
  },
  {
    id: "3",
    title: "Connect integrations",
    description: "Link your favorite tools",
    completed: false,
  },
  {
    id: "4",
    title: "Set up notifications",
    description: "Choose how you want to be notified",
    completed: true,
  },
];

export const Default: Story = {
  args: {
    items: defaultItems,
    title: "Getting Started",
    description: "Complete these steps to get the most out of our platform",
    onItemToggle: (id, completed) =>
      console.log(`Item ${id} is now ${completed ? "completed" : "incomplete"}`),
  },
};

export const WithProgressHidden: Story = {
  args: {
    items: defaultItems,
    title: "Setup Checklist",
    showProgress: false,
    onItemToggle: (id, completed) => console.log(`Item ${id} changed to ${completed}`),
  },
};

export const Compact: Story = {
  args: {
    items: defaultItems,
    title: "Quick Setup",
    compact: true,
    onItemToggle: (id, completed) => console.log(`Item ${id} changed to ${completed}`),
  },
};

export const AllComplete: Story = {
  args: {
    items: [
      {
        id: "1",
        title: "Create your first project",
        completed: true,
      },
      {
        id: "2",
        title: "Invite team members",
        completed: true,
      },
      {
        id: "3",
        title: "Connect integrations",
        completed: true,
      },
      {
        id: "4",
        title: "Set up notifications",
        completed: true,
      },
    ],
    title: "All Done!",
    description: "You've completed all setup steps",
  },
};

export const WithIcons: Story = {
  args: {
    items: [
      {
        id: "1",
        title: "Configure workspace",
        description: "Set up your workspace settings",
        completed: false,
        icon: (
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
        ),
      },
      {
        id: "2",
        title: "Add payment method",
        description: "Enter your billing details",
        completed: false,
        icon: (
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
            />
          </svg>
        ),
      },
      {
        id: "3",
        title: "Create API key",
        description: "Generate your first API key",
        completed: true,
        icon: (
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"
            />
          </svg>
        ),
      },
    ],
    title: "Setup Progress",
    onItemToggle: (id, completed) => console.log(`Item ${id} changed to ${completed}`),
  },
};

export const WithActions: Story = {
  args: {
    items: [
      {
        id: "1",
        title: "Verify your email",
        description: "Click the link in your inbox",
        completed: false,
        action: {
          label: "Resend email",
          onClick: () => console.log("Resending email..."),
        },
      },
      {
        id: "2",
        title: "Complete profile",
        description: "Add your photo and bio",
        completed: false,
        action: {
          label: "Edit profile",
          onClick: () => console.log("Opening profile editor..."),
        },
      },
      {
        id: "3",
        title: "Set up 2FA",
        description: "Add an extra layer of security",
        completed: false,
      },
    ],
    title: "Account Setup",
    onItemToggle: (id, completed) => console.log(`Item ${id} changed to ${completed}`),
  },
};

export const Empty: Story = {
  args: {
    items: [],
    title: "No Tasks",
    description: "You're all caught up!",
  },
};
