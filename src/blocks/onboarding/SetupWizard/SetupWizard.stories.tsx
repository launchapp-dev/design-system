import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import { SetupWizard, type SetupStep } from "./SetupWizard";

const meta: Meta<typeof SetupWizard> = {
  title: "Blocks/Onboarding/SetupWizard",
  component: SetupWizard,
  parameters: { layout: "fullscreen" },
};

export default meta;
type Story = StoryObj<typeof SetupWizard>;

const steps: SetupStep[] = [
  { id: "workspace", label: "Set up your workspace", completed: true },
  { id: "profile", label: "Complete your profile", completed: true },
  { id: "invite", label: "Invite teammates", completed: false, optional: true },
  { id: "connect", label: "Connect integrations", completed: false },
];

export const Default: Story = {
  render: (args) => {
    const [activeStep, setActiveStep] = React.useState("invite");
    return (
      <SetupWizard
        {...args}
        steps={steps}
        currentStepId={activeStep}
        onStepClick={setActiveStep}
      />
    );
  },
  args: {},
};

export const AllComplete: Story = {
  render: (args) => {
    const allDone = steps.map((s) => ({ ...s, completed: true }));
    return <SetupWizard {...args} steps={allDone} onComplete={() => alert("Launch!")} />;
  },
};

export const DarkMode: Story = {
  render: () => (
    <div className="dark" style={{ background: "hsl(240 10% 3.9%)" }}>
      <SetupWizard steps={steps} />
    </div>
  ),
};