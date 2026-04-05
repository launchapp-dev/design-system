import type { Meta, StoryObj } from "storybook";
import { OnboardingWizard } from "./OnboardingWizard";
import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { Label } from "@/components/Label";

const meta = {
  title: "Blocks/Onboarding/OnboardingWizard",
  component: OnboardingWizard,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  argTypes: {
    orientation: {
      control: "select",
      options: ["horizontal", "vertical"],
    },
    defaultStep: {
      control: "number",
    },
    allowSkip: {
      control: "boolean",
    },
  },
} satisfies Meta<typeof OnboardingWizard>;

export default meta;
type Story = StoryObj<typeof meta>;

const defaultSteps = [
  {
    id: "1",
    title: "Account",
    description: "Set up your account details",
    content: (
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">Full Name</Label>
          <Input id="name" placeholder="John Doe" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="john@example.com" />
        </div>
      </div>
    ),
  },
  {
    id: "2",
    title: "Profile",
    description: "Create your profile",
    content: (
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="company">Company</Label>
          <Input id="company" placeholder="Acme Inc." />
        </div>
        <div className="space-y-2">
          <Label htmlFor="role">Role</Label>
          <Input id="role" placeholder="Software Engineer" />
        </div>
      </div>
    ),
  },
  {
    id: "3",
    title: "Preferences",
    description: "Set your preferences",
    optional: true,
    content: (
      <div className="space-y-4">
        <p className="text-sm text-muted-foreground">
          This step is optional. You can skip it if you want.
        </p>
        <div className="space-y-2">
          <Label htmlFor="timezone">Timezone</Label>
          <Input id="timezone" placeholder="UTC-8" />
        </div>
      </div>
    ),
  },
  {
    id: "4",
    title: "Complete",
    description: "You're all set!",
    content: (
      <div className="text-center py-8">
        <h3 className="text-lg font-semibold">Ready to go!</h3>
        <p className="text-muted-foreground mt-2">
          Click complete to finish your setup.
        </p>
      </div>
    ),
  },
];

export const Default: Story = {
  args: {
    steps: defaultSteps,
    defaultStep: 0,
    onComplete: () => console.log("Onboarding complete!"),
  },
};

export const WithSkip: Story = {
  args: {
    steps: defaultSteps,
    defaultStep: 0,
    allowSkip: true,
    onComplete: () => console.log("Onboarding complete!"),
    onSkip: (step) => console.log("Skipped step:", step),
  },
};

export const VerticalOrientation: Story = {
  args: {
    steps: defaultSteps,
    defaultStep: 0,
    orientation: "vertical",
    onComplete: () => console.log("Onboarding complete!"),
  },
};

export const StartingAtStep2: Story = {
  args: {
    steps: defaultSteps,
    defaultStep: 1,
    onComplete: () => console.log("Onboarding complete!"),
  },
};

export const WithCustomLabels: Story = {
  args: {
    steps: defaultSteps,
    defaultStep: 0,
    completeLabel: "Finish Setup",
    nextLabel: "Continue",
    backLabel: "Previous",
    skipLabel: "Skip this",
    onComplete: () => console.log("Onboarding complete!"),
  },
};

export const WithoutStepNumbers: Story = {
  args: {
    steps: defaultSteps,
    defaultStep: 0,
    showStepNumbers: false,
    onComplete: () => console.log("Onboarding complete!"),
  },
};

const interactiveSteps = [
  {
    id: "1",
    title: "Welcome",
    content: (
      <div className="text-center py-8">
        <h3 className="text-lg font-semibold">Welcome to Our App!</h3>
        <p className="text-muted-foreground mt-2">
          Let's get you set up in a few quick steps.
        </p>
        <Button className="mt-4">Get Started</Button>
      </div>
    ),
  },
  {
    id: "2",
    title: "Connect",
    content: (
      <div className="space-y-4">
        <p className="text-sm text-muted-foreground">
          Connect your favorite services to get started.
        </p>
        <div className="grid gap-3">
          <Button variant="outline" className="justify-start">
            Connect GitHub
          </Button>
          <Button variant="outline" className="justify-start">
            Connect Slack
          </Button>
          <Button variant="outline" className="justify-start">
            Connect Google
          </Button>
        </div>
      </div>
    ),
  },
  {
    id: "3",
    title: "Invite Team",
    content: (
      <div className="space-y-4">
        <p className="text-sm text-muted-foreground">
          Invite your team members to collaborate.
        </p>
        <div className="space-y-2">
          <Input placeholder="Enter email address" />
          <Button>Send Invitation</Button>
        </div>
      </div>
    ),
  },
  {
    id: "4",
    title: "Done",
    content: (
      <div className="text-center py-8">
        <h3 className="text-lg font-semibold">You're All Set!</h3>
        <p className="text-muted-foreground mt-2">
          Welcome to the team. Let's build something great together.
        </p>
      </div>
    ),
  },
];

export const InteractiveExample: Story = {
  args: {
    steps: interactiveSteps,
    defaultStep: 0,
    onComplete: () => console.log("Interactive onboarding complete!"),
  },
};
