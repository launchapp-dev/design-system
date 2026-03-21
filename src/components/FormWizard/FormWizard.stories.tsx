import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { FormWizard, type FormWizardStep } from "./FormWizard";
import { Input } from "../Input";
import { Label } from "../Label";
import { Button } from "../Button";

const meta: Meta<typeof FormWizard> = {
  title: "Components/FormWizard",
  component: FormWizard,
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
    showProgress: {
      control: "boolean",
    },
    allowStepNavigation: {
      control: "boolean",
    },
  },
};

export default meta;
type Story = StoryObj<typeof FormWizard>;

const BasicStep1 = () => (
  <div className="space-y-4">
    <div>
      <Label htmlFor="name">Full Name</Label>
      <Input id="name" placeholder="Enter your full name" />
    </div>
    <div>
      <Label htmlFor="email">Email</Label>
      <Input id="email" type="email" placeholder="Enter your email" />
    </div>
  </div>
);

const BasicStep2 = () => (
  <div className="space-y-4">
    <div>
      <Label htmlFor="company">Company Name</Label>
      <Input id="company" placeholder="Enter company name" />
    </div>
    <div>
      <Label htmlFor="role">Role</Label>
      <Input id="role" placeholder="Enter your role" />
    </div>
  </div>
);

const BasicStep3 = () => (
  <div className="space-y-4">
    <div>
      <Label htmlFor="password">Password</Label>
      <Input id="password" type="password" placeholder="Create a password" />
    </div>
    <div>
      <Label htmlFor="confirm">Confirm Password</Label>
      <Input id="confirm" type="password" placeholder="Confirm your password" />
    </div>
  </div>
);

const basicSteps: FormWizardStep[] = [
  { id: "personal", title: "Personal Info", description: "Your basic information", content: <BasicStep1 /> },
  { id: "work", title: "Work Details", description: "Tell us about your work", content: <BasicStep2 /> },
  { id: "security", title: "Security", description: "Set up your password", content: <BasicStep3 /> },
];

export const Default: Story = {
  args: {
    steps: basicSteps,
    onComplete: () => console.log("Wizard completed!"),
    onStepChange: (step) => console.log("Step changed to:", step),
  },
};

export const WithValidation: Story = {
  args: {
    steps: [
      {
        id: "step1",
        title: "Required Field",
        content: (
          <div>
            <Label htmlFor="required">Required Field *</Label>
            <Input id="required" placeholder="This field is required" />
          </div>
        ),
        validate: () => {
          const input = document.getElementById("required") as HTMLInputElement;
          return input?.value.length > 0;
        },
      },
      {
        id: "step2",
        title: "Final Step",
        content: <p>All done! Click Complete to finish.</p>,
      },
    ],
  },
};

export const WithSaveDraft: Story = {
  args: {
    steps: basicSteps,
    onSaveDraft: (data) => {
      console.log("Draft saved:", data);
      alert("Draft saved! Check console for data.");
    },
    saveDraftLabel: "Save & Continue Later",
  },
};

export const Small: Story = {
  args: {
    steps: basicSteps,
    size: "sm",
  },
};

export const Large: Story = {
  args: {
    steps: basicSteps,
    size: "lg",
  },
};

export const NoProgress: Story = {
  args: {
    steps: basicSteps,
    showProgress: false,
  },
};

export const DisabledNavigation: Story = {
  args: {
    steps: basicSteps,
    allowStepNavigation: false,
  },
};

function InteractiveWizard() {
  const [draft, setDraft] = React.useState<any>(null);

  const handleLoadDraft = () => {
    if (draft) {
      alert("Draft loaded from " + draft.savedAt);
    }
  };

  return (
    <div className="space-y-4">
      <FormWizard
        steps={basicSteps}
        onSaveDraft={setDraft}
        loadDraft={draft}
        onComplete={() => alert("Form submitted!")}
        onStepChange={(step) => console.log("Current step:", step)}
      />
      {draft && (
        <Button variant="outline" onClick={handleLoadDraft}>
          Load Draft
        </Button>
      )}
    </div>
  );
}

export const Interactive: Story = {
  render: () => <InteractiveWizard />,
};
