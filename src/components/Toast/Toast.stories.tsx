import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import {
  ToastProvider,
  ToastViewport,
  ToastRoot,
  ToastTitle,
  ToastDescription,
  ToastAction,
  ToastClose,
  Toaster,
} from "./index";
import { toast, useToast } from "./useToast";

const meta = {
  title: "Components/Toast",
  component: ToastRoot,
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "success", "destructive"],
    },
  },
} satisfies Meta<typeof ToastRoot>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <ToastProvider>
      <ToastRoot {...args} open>
        <div className="grid gap-1">
          <ToastTitle>Notification</ToastTitle>
          <ToastDescription>Your changes have been saved.</ToastDescription>
        </div>
        <ToastClose />
      </ToastRoot>
      <ToastViewport style={{ position: "relative", maxWidth: "420px" }} />
    </ToastProvider>
  ),
  args: {
    variant: "default",
  },
};

export const AllVariants: Story = {
  render: () => (
    <ToastProvider>
      <ToastRoot variant="default" open>
        <div className="grid gap-1">
          <ToastTitle>Default</ToastTitle>
          <ToastDescription>This is a default notification.</ToastDescription>
        </div>
        <ToastClose />
      </ToastRoot>
      <ToastRoot variant="success" open>
        <div className="grid gap-1">
          <ToastTitle>Success</ToastTitle>
          <ToastDescription>Your action completed successfully.</ToastDescription>
        </div>
        <ToastClose />
      </ToastRoot>
      <ToastRoot variant="destructive" open>
        <div className="grid gap-1">
          <ToastTitle>Destructive</ToastTitle>
          <ToastDescription>Something went wrong. Please try again.</ToastDescription>
        </div>
        <ToastClose />
      </ToastRoot>
      <ToastViewport style={{ position: "relative", maxWidth: "420px" }} />
    </ToastProvider>
  ),
};

export const AllSizes: Story = {
  render: () => (
    <ToastProvider>
      <ToastRoot variant="default" open>
        <div className="grid gap-1">
          <ToastTitle>Short</ToastTitle>
        </div>
        <ToastClose />
      </ToastRoot>
      <ToastRoot variant="default" open>
        <div className="grid gap-1">
          <ToastTitle>With description</ToastTitle>
          <ToastDescription>A brief supporting message.</ToastDescription>
        </div>
        <ToastClose />
      </ToastRoot>
      <ToastRoot variant="default" open>
        <div className="grid gap-1">
          <ToastTitle>Long content toast with extended title text</ToastTitle>
          <ToastDescription>
            This toast has a very long description that tests how the component handles overflow and
            wrapping behavior in constrained viewport widths.
          </ToastDescription>
        </div>
        <ToastClose />
      </ToastRoot>
      <ToastRoot variant="default" open>
        <div className="grid gap-1">
          <ToastTitle>With action</ToastTitle>
          <ToastDescription>You can undo this action.</ToastDescription>
        </div>
        <ToastAction altText="Undo">Undo</ToastAction>
        <ToastClose />
      </ToastRoot>
      <ToastViewport style={{ position: "relative", maxWidth: "420px" }} />
    </ToastProvider>
  ),
};

function InteractiveDemo() {
  const { dismiss } = useToast();

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "12px", alignItems: "flex-start" }}>
      <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
        <button
          style={{ padding: "8px 16px", borderRadius: "6px", border: "1px solid #e2e8f0", cursor: "pointer" }}
          onClick={() => toast({ title: "Default", description: "This is a default notification." })}
        >
          Show Default
        </button>
        <button
          style={{ padding: "8px 16px", borderRadius: "6px", border: "1px solid #bbf7d0", background: "#f0fdf4", cursor: "pointer" }}
          onClick={() => toast({ variant: "success", title: "Success!", description: "Your changes have been saved." })}
        >
          Show Success
        </button>
        <button
          style={{ padding: "8px 16px", borderRadius: "6px", border: "1px solid #fecaca", background: "#fef2f2", cursor: "pointer" }}
          onClick={() => toast({ variant: "destructive", title: "Error", description: "Something went wrong." })}
        >
          Show Destructive
        </button>
        <button
          style={{ padding: "8px 16px", borderRadius: "6px", border: "1px solid #e2e8f0", cursor: "pointer" }}
          onClick={() =>
            toast({
              title: "With action",
              description: "You can undo this.",
              action: (
                <ToastAction altText="Undo" onClick={() => dismiss()}>
                  Undo
                </ToastAction>
              ),
            })
          }
        >
          Show With Action
        </button>
        <button
          style={{ padding: "8px 16px", borderRadius: "6px", border: "1px solid #e2e8f0", cursor: "pointer" }}
          onClick={() => dismiss()}
        >
          Dismiss All
        </button>
      </div>
      <Toaster />
    </div>
  );
}

export const Interactive: Story = {
  render: () => <InteractiveDemo />,
};

export const DarkMode: Story = {
  decorators: [
    (Story) => (
      <div className="dark" style={{ background: "#09090b", padding: "24px", borderRadius: "8px" }}>
        <Story />
      </div>
    ),
  ],
  render: () => (
    <ToastProvider>
      <ToastRoot variant="default" open>
        <div className="grid gap-1">
          <ToastTitle>Default</ToastTitle>
          <ToastDescription>This is a default notification.</ToastDescription>
        </div>
        <ToastClose />
      </ToastRoot>
      <ToastRoot variant="success" open>
        <div className="grid gap-1">
          <ToastTitle>Success</ToastTitle>
          <ToastDescription>Your action completed successfully.</ToastDescription>
        </div>
        <ToastClose />
      </ToastRoot>
      <ToastRoot variant="destructive" open>
        <div className="grid gap-1">
          <ToastTitle>Destructive</ToastTitle>
          <ToastDescription>Something went wrong. Please try again.</ToastDescription>
        </div>
        <ToastClose />
      </ToastRoot>
      <ToastViewport style={{ position: "relative", maxWidth: "420px" }} />
    </ToastProvider>
  ),
};
