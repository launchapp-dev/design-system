import type { Meta, StoryObj } from "@storybook/react";
import { Toaster, ToastAction } from "./index";
import { useToast, toast } from "./useToast";
import { Button } from "../Button";

const meta: Meta = {
  title: "Components/Toast",
  decorators: [
    (Story) => (
      <>
        <Story />
        <Toaster />
      </>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    const { toast: showToast } = useToast();
    return (
      <Button
        variant="outline"
        onClick={() =>
          showToast({ title: "Notification", description: "Your action was successful." })
        }
      >
        Show Toast
      </Button>
    );
  },
};

export const Success: Story = {
  render: () => (
    <Button
      variant="outline"
      onClick={() =>
        toast({
          variant: "success",
          title: "Success!",
          description: "Your changes have been saved.",
        })
      }
    >
      Show Success Toast
    </Button>
  ),
};

export const Destructive: Story = {
  render: () => (
    <Button
      variant="destructive"
      onClick={() =>
        toast({
          variant: "destructive",
          title: "Error",
          description: "Something went wrong. Please try again.",
        })
      }
    >
      Show Error Toast
    </Button>
  ),
};

export const WithAction: Story = {
  render: () => (
    <Button
      variant="outline"
      onClick={() =>
        toast({
          title: "File deleted",
          description: "The file has been moved to trash.",
          action: (
            <ToastAction altText="Undo delete" onClick={() => {}}>
              Undo
            </ToastAction>
          ),
        })
      }
    >
      Show Toast with Action
    </Button>
  ),
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
      <Button
        variant="outline"
        onClick={() => toast({ title: "Default", description: "Default toast notification." })}
      >
        Default
      </Button>
      <Button
        variant="outline"
        onClick={() =>
          toast({ variant: "success", title: "Success", description: "Operation completed." })
        }
      >
        Success
      </Button>
      <Button
        variant="outline"
        onClick={() =>
          toast({ variant: "destructive", title: "Error", description: "Something failed." })
        }
      >
        Destructive
      </Button>
    </div>
  ),
};
