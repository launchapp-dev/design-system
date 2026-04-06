import type { Meta, StoryObj } from "@storybook/react";
import { WelcomeWizard, type WelcomeWizardStep } from "./WelcomeWizard";

const meta: Meta<typeof WelcomeWizard> = {
  title: "Blocks/Onboarding/WelcomeWizard",
  component: WelcomeWizard,
  parameters: { layout: "fullscreen" },
};

export default meta;
type Story = StoryObj<typeof WelcomeWizard>;

const steps: WelcomeWizardStep[] = [
  {
    id: "profile",
    title: "Build your profile",
    description: "Tell us a bit about yourself.",
    content: <div className="space-y-4"><p className="text-sm text-muted-foreground">Profile content goes here.</p></div>,
  },
  {
    id: "workspace",
    title: "Create your workspace",
    description: "Set up a space for your team.",
    content: <div className="space-y-4"><p className="text-sm text-muted-foreground">Workspace content goes here.</p></div>,
  },
  {
    id: "connect",
    title: "Connect integrations",
    description: "Link your favorite tools.",
    content: <div className="space-y-4"><p className="text-sm text-muted-foreground">Integrations content goes here.</p></div>,
  },
];

export const Default: Story = {
  render: (args) => <WelcomeWizard {...args} steps={steps} onComplete={() => alert("Complete!")} />,
  args: {},
};

export const DarkMode: Story = {
  render: () => (
    <div className="dark" style={{ background: "hsl(240 10% 3.9%)" }}>
      <WelcomeWizard steps={steps} onComplete={() => {}} />
    </div>
  ),
};