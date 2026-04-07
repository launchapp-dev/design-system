import type { Meta, StoryObj } from "@storybook/react";
import { OnboardingFlow, type OnboardingStep } from "./OnboardingFlow";

const checkIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const profileIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

const teamIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

const rocketIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
    <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
    <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
    <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
  </svg>
);

const steps: OnboardingStep[] = [
  {
    id: "profile",
    title: "Create your profile",
    description: "Tell us a bit about yourself to personalize your experience.",
    icon: profileIcon,
    content: (
      <div className="space-y-4">
        <p className="text-sm text-muted-foreground">Set up your profile to get personalized recommendations and features.</p>
        <div className="space-y-2">
          <input type="text" placeholder="Full name" className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm" />
          <input type="text" placeholder="Company (optional)" className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm" />
        </div>
      </div>
    ),
  },
  {
    id: "team",
    title: "Invite your team",
    description: "Collaborate with your colleagues from day one.",
    icon: teamIcon,
    content: (
      <div className="space-y-4">
        <p className="text-sm text-muted-foreground">Add your teammates to collaborate on projects.</p>
        <div className="space-y-2">
          <input type="email" placeholder="colleague@company.com" className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm" />
        </div>
        <p className="text-xs text-muted-foreground">You can skip this step and invite later from settings.</p>
      </div>
    ),
  },
  {
    id: "ready",
    title: "You're all set!",
    description: "Everything is configured and ready to go.",
    icon: rocketIcon,
    content: (
      <div className="space-y-4">
        <p className="text-sm text-muted-foreground">Your workspace is ready. Here's what you can do next:</p>
        <ul className="space-y-2 text-sm">
          <li className="flex items-center gap-2">
            <span className="text-emerald-500">{checkIcon}</span>
            Create your first project
          </li>
          <li className="flex items-center gap-2">
            <span className="text-emerald-500">{checkIcon}</span>
            Explore the template library
          </li>
          <li className="flex items-center gap-2">
            <span className="text-emerald-500">{checkIcon}</span>
            Invite team members
          </li>
        </ul>
      </div>
    ),
  },
];

const meta: Meta<typeof OnboardingFlow> = {
  title: "Blocks/Onboarding/OnboardingFlow",
  component: OnboardingFlow,
  tags: ["autodocs"],
  argTypes: { currentStep: { control: false } },
};

export default meta;
type Story = StoryObj<typeof OnboardingFlow>;

export const Default: Story = {
  render: () => {
    const [step, setStep] = React.useState(0);
    return (
      <div className="p-8">
        <OnboardingFlow
          steps={steps}
          currentStep={step}
          onStepChange={setStep}
          onComplete={() => alert("Completed!")}
        />
      </div>
    );
  },
};