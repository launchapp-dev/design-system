import type { Meta, StoryObj } from "@storybook/react";
import { MultiStepWizard } from "./MultiStepWizard";
import { Input } from "@/components/Input";
import { Label } from "@/components/Label";

const steps = [
  {
    id: "profile",
    title: "Your profile",
    description: "Tell us a bit about yourself to get started.",
    content: (
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
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
          <Label htmlFor="bio">Bio</Label>
          <Input id="bio" placeholder="Software engineer at Acme Corp." />
        </div>
      </div>
    ),
  },
  {
    id: "workspace",
    title: "Workspace",
    description: "Set up your workspace details.",
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
    id: "invite",
    title: "Invite team",
    description: "Invite your colleagues to collaborate.",
    content: (
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="invite-email-1">Email address</Label>
          <Input id="invite-email-1" type="email" placeholder="colleague@company.com" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="invite-email-2">Email address (optional)</Label>
          <Input id="invite-email-2" type="email" placeholder="another@company.com" />
        </div>
      </div>
    ),
  },
  {
    id: "done",
    title: "All set!",
    description: "You're ready to start using the platform.",
    content: (
      <div className="flex flex-col items-center gap-4 py-6 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
          <svg className="h-8 w-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <div>
          <h3 className="text-lg font-semibold">Everything is set up!</h3>
          <p className="text-sm text-muted-foreground">Your workspace is ready. Click Complete to get started.</p>
        </div>
      </div>
    ),
  },
];

const meta: Meta<typeof MultiStepWizard> = {
  title: "Blocks/Onboarding/MultiStepWizard",
  component: MultiStepWizard,
  parameters: {
    layout: "padded",
    docs: {
      source: {
        code: `import { MultiStepWizard } from "@launchapp/design-system/blocks/onboarding";

const steps = [
  { id: "profile", title: "Your profile", content: <ProfileForm /> },
  { id: "workspace", title: "Workspace", content: <WorkspaceForm /> },
  { id: "done", title: "All set!", content: <SuccessMessage /> },
];

export default function Page() {
  return (
    <MultiStepWizard
      steps={steps}
      onComplete={() => router.push("/dashboard")}
    />
  );
}`,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof MultiStepWizard>;

export const Default: Story = {
  render: (args) => (
    <div style={{ maxWidth: 600 }}>
      <MultiStepWizard {...args} />
    </div>
  ),
  args: {
    steps,
  },
};

export const TwoSteps: Story = {
  render: (args) => (
    <div style={{ maxWidth: 600 }}>
      <MultiStepWizard {...args} />
    </div>
  ),
  args: {
    steps: steps.slice(0, 2),
  },
};

export const DarkMode: Story = {
  render: (args) => (
    <div className="dark" style={{ background: "hsl(240 10% 3.9%)", padding: "24px", maxWidth: 600 }}>
      <MultiStepWizard {...args} />
    </div>
  ),
  args: {
    steps,
  },
};

export const Mobile: Story = {
  parameters: {
    viewport: { defaultViewport: "mobile1" },
  },
  render: (args) => (
    <div style={{ padding: "16px" }}>
      <MultiStepWizard {...args} />
    </div>
  ),
  args: {
    steps,
  },
};
