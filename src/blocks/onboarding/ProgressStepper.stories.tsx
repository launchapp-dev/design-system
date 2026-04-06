import type { Meta, StoryObj } from "storybook";
import { ProgressStepper } from "./ProgressStepper";
import { Input } from "@/components/Input";
import { Label } from "@/components/Label";

const meta = {
  title: "Blocks/Onboarding/ProgressStepper",
  component: ProgressStepper,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  argTypes: {
    orientation: {
      control: "select",
      options: ["horizontal", "vertical"],
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
    initialStep: {
      control: "number",
    },
    allowSkip: {
      control: "boolean",
    },
  },
} satisfies Meta<typeof ProgressStepper>;

export default meta;
type Story = StoryObj<typeof meta>;

const defaultSteps = [
  {
    id: "1",
    title: "Account",
    description: "Set up your account",
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
        <p className="text-sm text-muted-foreground">This step is optional.</p>
      </div>
    ),
  },
  {
    id: "4",
    title: "Complete",
    content: (
      <div className="text-center py-4">
        <h3 className="font-semibold">Ready!</h3>
      </div>
    ),
  },
];

export const Default: Story = {
  args: {
    steps: defaultSteps,
    onComplete: () => console.log("Stepper complete!"),
  },
};

export const WithSkip: Story = {
  args: {
    steps: defaultSteps,
    allowSkip: true,
    onComplete: () => console.log("Stepper complete!"),
    onSkip: (step) => console.log("Skipped:", step),
  },
};

export const Vertical: Story = {
  args: {
    steps: defaultSteps,
    orientation: "vertical",
    onComplete: () => console.log("Stepper complete!"),
  },
};

export const SmallSize: Story = {
  args: {
    steps: defaultSteps,
    size: "sm",
    onComplete: () => console.log("Stepper complete!"),
  },
};

export const LargeSize: Story = {
  args: {
    steps: defaultSteps,
    size: "lg",
    onComplete: () => console.log("Stepper complete!"),
  },
};

export const StartingAtStep2: Story = {
  args: {
    steps: defaultSteps,
    initialStep: 1,
    onComplete: () => console.log("Stepper complete!"),
  },
};

export const WithValidation: Story = {
  args: {
    steps: [
      {
        id: "1",
        title: "Email",
        content: (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email-validate">Email</Label>
              <Input id="email-validate" type="email" placeholder="john@example.com" />
            </div>
          </div>
        ),
        validate: async () => {
          await new Promise((resolve) => setTimeout(resolve, 500));
          return true;
        },
      },
      {
        id: "2",
        title: "Name",
        content: (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name-validate">Name</Label>
              <Input id="name-validate" placeholder="John" />
            </div>
          </div>
        ),
      },
      {
        id: "3",
        title: "Done",
        content: (
          <div className="text-center py-4">
            <h3 className="font-semibold">All validated!</h3>
          </div>
        ),
      },
    ],
    onComplete: () => console.log("Stepper complete!"),
  },
};

export const WithCustomLabels: Story = {
  args: {
    steps: defaultSteps,
    completeLabel: "Finish Setup",
    nextLabel: "Continue",
    prevLabel: "Go Back",
    skipLabel: "Skip this step",
    onComplete: () => console.log("Stepper complete!"),
  },
};
