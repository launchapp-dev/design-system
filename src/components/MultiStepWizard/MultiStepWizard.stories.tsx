import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import { useForm } from "react-hook-form";
import { MultiStepWizard } from "./index";

const meta: Meta<typeof MultiStepWizard> = {
  title: "Components/MultiStepWizard",
  component: MultiStepWizard,
  argTypes: {
    variant: { control: "select", options: ["default", "card"] },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    const [completed, setCompleted] = React.useState(false);
    const [draft, setDraft] = React.useState<number | null>(null);

    const steps = [
      {
        id: "personal",
        title: "Personal Info",
        description: "Tell us a bit about yourself.",
        content: (
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            <label
              style={{ display: "flex", flexDirection: "column", gap: "4px", fontSize: "14px" }}
            >
              Full Name
              <input
                placeholder="Jane Smith"
                style={{
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "6px",
                  padding: "8px 12px",
                  fontSize: "14px",
                  background: "transparent",
                }}
              />
            </label>
            <label
              style={{ display: "flex", flexDirection: "column", gap: "4px", fontSize: "14px" }}
            >
              Email
              <input
                type="email"
                placeholder="jane@example.com"
                style={{
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "6px",
                  padding: "8px 12px",
                  fontSize: "14px",
                  background: "transparent",
                }}
              />
            </label>
          </div>
        ),
      },
      {
        id: "account",
        title: "Account Setup",
        description: "Choose your credentials.",
        content: (
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            <label
              style={{ display: "flex", flexDirection: "column", gap: "4px", fontSize: "14px" }}
            >
              Username
              <input
                placeholder="janesmith"
                style={{
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "6px",
                  padding: "8px 12px",
                  fontSize: "14px",
                  background: "transparent",
                }}
              />
            </label>
            <label
              style={{ display: "flex", flexDirection: "column", gap: "4px", fontSize: "14px" }}
            >
              Password
              <input
                type="password"
                placeholder="••••••••"
                style={{
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "6px",
                  padding: "8px 12px",
                  fontSize: "14px",
                  background: "transparent",
                }}
              />
            </label>
          </div>
        ),
      },
      {
        id: "confirm",
        title: "Confirm",
        description: "Review and confirm your details.",
        content: (
          <div
            style={{
              padding: "12px",
              borderRadius: "8px",
              background: "hsl(var(--muted))",
              fontSize: "14px",
            }}
          >
            <p style={{ margin: 0 }}>
              Everything looks good! Click <strong>Complete</strong> to finish.
            </p>
          </div>
        ),
      },
    ];

    if (completed) {
      return (
        <div style={{ padding: "40px", textAlign: "center" }}>
          <p style={{ fontSize: "16px", fontWeight: 600 }}>✓ Wizard completed!</p>
          <button
            style={{
              marginTop: "12px",
              padding: "8px 16px",
              borderRadius: "6px",
              cursor: "pointer",
            }}
            onClick={() => setCompleted(false)}
          >
            Reset
          </button>
        </div>
      );
    }

    return (
      <div style={{ padding: "40px", maxWidth: "480px" }}>
        {draft !== null && (
          <p
            style={{
              fontSize: "12px",
              color: "hsl(var(--muted-foreground))",
              marginBottom: "16px",
            }}
          >
            Draft saved at step {draft + 1}
          </p>
        )}
        <MultiStepWizard
          steps={steps}
          onComplete={() => setCompleted(true)}
          onSaveDraft={(step) => setDraft(step)}
          variant="card"
        />
      </div>
    );
  },
};

export const WithValidation: Story = {
  render: () => {
    const {
      register,
      trigger,
      formState: { errors },
    } = useForm<{ name: string; email: string }>({
      mode: "onChange",
    });
    const [completed, setCompleted] = React.useState(false);

    const steps = [
      {
        id: "info",
        title: "Your Info",
        content: (
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            <label
              style={{ display: "flex", flexDirection: "column", gap: "4px", fontSize: "14px" }}
            >
              Name *
              <input
                {...register("name", { required: "Name is required" })}
                placeholder="Jane Smith"
                style={{
                  border: `1px solid ${errors.name ? "hsl(var(--destructive))" : "hsl(var(--border))"}`,
                  borderRadius: "6px",
                  padding: "8px 12px",
                  fontSize: "14px",
                  background: "transparent",
                }}
              />
              {errors.name && (
                <span style={{ fontSize: "12px", color: "hsl(var(--destructive))" }}>
                  {errors.name.message}
                </span>
              )}
            </label>
            <label
              style={{ display: "flex", flexDirection: "column", gap: "4px", fontSize: "14px" }}
            >
              Email *
              <input
                {...register("email", {
                  required: "Email is required",
                  pattern: { value: /^\S+@\S+$/i, message: "Invalid email" },
                })}
                type="email"
                placeholder="jane@example.com"
                style={{
                  border: `1px solid ${errors.email ? "hsl(var(--destructive))" : "hsl(var(--border))"}`,
                  borderRadius: "6px",
                  padding: "8px 12px",
                  fontSize: "14px",
                  background: "transparent",
                }}
              />
              {errors.email && (
                <span style={{ fontSize: "12px", color: "hsl(var(--destructive))" }}>
                  {errors.email.message}
                </span>
              )}
            </label>
          </div>
        ),
        validate: () => trigger(["name", "email"]),
      },
      {
        id: "done",
        title: "Done",
        content: <p style={{ fontSize: "14px" }}>Form validated — ready to submit.</p>,
      },
    ];

    if (completed) {
      return (
        <div style={{ padding: "40px", textAlign: "center" }}>
          <p style={{ fontSize: "16px", fontWeight: 600 }}>✓ Submitted!</p>
        </div>
      );
    }

    return (
      <div style={{ padding: "40px", maxWidth: "480px" }}>
        <MultiStepWizard steps={steps} onComplete={() => setCompleted(true)} variant="card" />
      </div>
    );
  },
};

export const DefaultVariant: Story = {
  render: () => {
    const steps = [
      { id: "s1", title: "Step One", content: <p style={{ fontSize: "14px" }}>Step 1 content</p> },
      { id: "s2", title: "Step Two", content: <p style={{ fontSize: "14px" }}>Step 2 content</p> },
      {
        id: "s3",
        title: "Step Three",
        content: <p style={{ fontSize: "14px" }}>Step 3 content</p>,
      },
    ];
    return (
      <div style={{ padding: "40px", maxWidth: "480px" }}>
        <MultiStepWizard steps={steps} onComplete={() => {}} />
      </div>
    );
  },
};
