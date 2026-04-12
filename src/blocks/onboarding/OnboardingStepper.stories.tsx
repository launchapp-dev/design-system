import type { Meta, StoryObj } from "@storybook/react";
import { OnboardingStepper } from "./OnboardingStepper";
import { Input } from "@/components/Input";
import { Label } from "@/components/Label";
import { Checkbox } from "@/components/Checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/Select";

const meta: Meta<typeof OnboardingStepper> = {
  title: "Blocks/Onboarding/OnboardingStepper",
  component: OnboardingStepper,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Multi-step onboarding wizard with progress indicator, step validation, and keyboard navigation.",
      },
    },
  },
  argTypes: {
    orientation: {
      control: "radio",
      options: ["horizontal", "vertical"],
    },
    size: {
      control: "radio",
      options: ["sm", "md", "lg"],
    },
    allowSkip: {
      control: "boolean",
    },
    showStepNumbers: {
      control: "boolean",
    },
  },
};

export default meta;
type Story = StoryObj<typeof OnboardingStepper>;

const BasicSteps = [
  {
    id: "profile",
    title: "Profile",
    description: "Set up your personal information",
    content: (
      <div className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="first-name">First name</Label>
            <Input id="first-name" placeholder="Alice" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="last-name">Last name</Label>
            <Input id="last-name" placeholder="Smith" />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="alice@example.com" />
        </div>
      </div>
    ),
  },
  {
    id: "workspace",
    title: "Workspace",
    description: "Configure your workspace",
    content: (
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="workspace-name">Workspace name</Label>
          <Input id="workspace-name" placeholder="Acme Engineering" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="workspace-url">Workspace URL</Label>
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">app.example.com/</span>
            <Input id="workspace-url" placeholder="acme-eng" />
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "preferences",
    title: "Preferences",
    description: "Set your preferences",
    content: (
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="theme">Theme</Label>
          <Select>
            <SelectTrigger id="theme">
              <SelectValue placeholder="Select theme" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="light">Light</SelectItem>
              <SelectItem value="dark">Dark</SelectItem>
              <SelectItem value="system">System</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center gap-2">
          <Checkbox id="notifications" />
          <Label htmlFor="notifications">Enable notifications</Label>
        </div>
      </div>
    ),
  },
  {
    id: "complete",
    title: "Complete",
    description: "Review and finish",
    content: (
      <div className="flex flex-col items-center gap-4 py-4 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
          <svg
            className="h-8 w-8 text-primary"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <div>
          <h3 className="text-lg font-semibold">Ready to go!</h3>
          <p className="text-sm text-muted-foreground">
            Review your settings and click Complete to finish.
          </p>
        </div>
      </div>
    ),
  },
];

export const Horizontal: Story = {
  args: {
    steps: BasicSteps,
    orientation: "horizontal",
    onComplete: () => console.log("Onboarding complete!"),
  },
};

export const Vertical: Story = {
  args: {
    steps: BasicSteps,
    orientation: "vertical",
    onComplete: () => console.log("Onboarding complete!"),
  },
};

export const WithOptionalSteps: Story = {
  args: {
    steps: [
      ...BasicSteps.slice(0, 2),
      {
        id: "invite",
        title: "Invite Team",
        description: "Invite colleagues (optional)",
        optional: true,
        content: (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="invite-email">Email address</Label>
              <Input id="invite-email" type="email" placeholder="colleague@company.com" />
            </div>
            <p className="text-sm text-muted-foreground">
              You can skip this step and invite team members later.
            </p>
          </div>
        ),
      },
      ...BasicSteps.slice(2),
    ],
    orientation: "horizontal",
    allowSkip: true,
    onComplete: () => console.log("Onboarding complete!"),
  },
};

export const WithValidation: Story = {
  args: {
    steps: [
      {
        id: "profile",
        title: "Profile",
        description: "Fill in all fields to continue",
        content: (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="first-name-required">First name *</Label>
              <Input id="first-name-required" placeholder="Required" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="last-name-required">Last name *</Label>
              <Input id="last-name-required" placeholder="Required" />
            </div>
          </div>
        ),
        validate: () => {
          const firstName = (document.getElementById("first-name-required") as HTMLInputElement)
            ?.value;
          const lastName = (document.getElementById("last-name-required") as HTMLInputElement)
            ?.value;
          if (!firstName || !lastName) {
            alert("Please fill in both fields");
            return false;
          }
          return true;
        },
      },
      ...BasicSteps.slice(1),
    ],
    orientation: "horizontal",
    onComplete: () => console.log("Onboarding complete!"),
  },
};

export const SmallSize: Story = {
  args: {
    steps: BasicSteps,
    orientation: "horizontal",
    size: "sm",
    onComplete: () => console.log("Onboarding complete!"),
  },
};

export const LargeSize: Story = {
  args: {
    steps: BasicSteps,
    orientation: "horizontal",
    size: "lg",
    onComplete: () => console.log("Onboarding complete!"),
  },
};

export const WithoutStepNumbers: Story = {
  args: {
    steps: BasicSteps,
    orientation: "horizontal",
    showStepNumbers: false,
    onComplete: () => console.log("Onboarding complete!"),
  },
};

export const DarkModeHorizontal: Story = {
  args: {
    steps: BasicSteps,
    orientation: "horizontal",
    onComplete: () => console.log("Onboarding complete!"),
  },
  parameters: {
    backgrounds: { default: "dark" },
  },
  decorators: [
    (Story) => (
      <div className="dark">
        <Story />
      </div>
    ),
  ],
};

export const DarkModeVertical: Story = {
  args: {
    steps: BasicSteps,
    orientation: "vertical",
    onComplete: () => console.log("Onboarding complete!"),
  },
  parameters: {
    backgrounds: { default: "dark" },
  },
  decorators: [
    (Story) => (
      <div className="dark">
        <Story />
      </div>
    ),
  ],
};

export const Mobile: Story = {
  args: {
    steps: BasicSteps,
    orientation: "horizontal",
    onComplete: () => console.log("Onboarding complete!"),
  },
  parameters: {
    viewport: { defaultViewport: "mobile1" },
  },
};

export const ManySteps: Story = {
  args: {
    steps: [
      { id: "1", title: "Step 1", content: <div>Content 1</div> },
      { id: "2", title: "Step 2", content: <div>Content 2</div> },
      { id: "3", title: "Step 3", content: <div>Content 3</div> },
      { id: "4", title: "Step 4", content: <div>Content 4</div> },
      { id: "5", title: "Step 5", content: <div>Content 5</div> },
      { id: "6", title: "Step 6", content: <div>Content 6</div> },
    ],
    orientation: "horizontal",
    onComplete: () => console.log("Onboarding complete!"),
  },
};
