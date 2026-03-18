import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import {
  AlertDialogRoot,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
} from "./index";

const meta: Meta<typeof AlertDialogRoot> = {
  title: "Components/AlertDialog",
  component: AlertDialogRoot,
  argTypes: {
    open: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof AlertDialogRoot>;

export const Default: Story = {
  render: () => (
    <AlertDialogRoot>
      <AlertDialogTrigger
        style={{
          display: "inline-flex",
          height: 40,
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 6,
          border: "none",
          background: "hsl(var(--destructive))",
          color: "hsl(var(--destructive-foreground))",
          padding: "0 16px",
          fontSize: 14,
          cursor: "pointer",
        }}
      >
        Delete Account
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialogRoot>
  ),
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
      <p
        style={{
          fontSize: 12,
          color: "hsl(var(--muted-foreground))",
          margin: 0,
        }}
      >
        Note: AlertDialog does not close on overlay click — this is intentional
        for destructive confirmation flows.
      </p>
      <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
        <AlertDialogRoot>
          <AlertDialogTrigger
            style={{
              display: "inline-flex",
              height: 40,
              alignItems: "center",
              borderRadius: 6,
              border: "none",
              background: "hsl(var(--destructive))",
              color: "hsl(var(--destructive-foreground))",
              padding: "0 16px",
              fontSize: 14,
              cursor: "pointer",
            }}
          >
            Delete Item
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete Item</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to delete this item? This action cannot be
                undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction>Delete</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogRoot>

        <AlertDialogRoot>
          <AlertDialogTrigger
            style={{
              display: "inline-flex",
              height: 40,
              alignItems: "center",
              borderRadius: 6,
              border: "1px solid hsl(var(--border))",
              background: "hsl(var(--background))",
              padding: "0 16px",
              fontSize: 14,
              cursor: "pointer",
            }}
          >
            Leave Page
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Leave without saving?</AlertDialogTitle>
              <AlertDialogDescription>
                You have unsaved changes. Leaving this page will discard them.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Stay</AlertDialogCancel>
              <AlertDialogAction>Leave</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogRoot>

        <AlertDialogRoot>
          <AlertDialogTrigger
            style={{
              display: "inline-flex",
              height: 40,
              alignItems: "center",
              borderRadius: 6,
              border: "1px solid hsl(var(--border))",
              background: "hsl(var(--background))",
              padding: "0 16px",
              fontSize: 14,
              cursor: "pointer",
            }}
          >
            Long Content
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                This Alert Dialog Has a Very Long Title That Tests Wrapping
                Behavior
              </AlertDialogTitle>
              <AlertDialogDescription>
                This description is intentionally lengthy to show how the
                AlertDialog handles overflow content in the header. The
                component should gracefully handle long text without breaking
                the layout.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction>Confirm</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogRoot>
      </div>
    </div>
  ),
};

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
      {(
        [
          { label: "Small", maxWidth: "24rem" },
          { label: "Default", maxWidth: "32rem" },
          { label: "Large", maxWidth: "48rem" },
        ] as const
      ).map(({ label, maxWidth }) => (
        <AlertDialogRoot key={label}>
          <AlertDialogTrigger
            style={{
              display: "inline-flex",
              height: 40,
              alignItems: "center",
              borderRadius: 6,
              border: "1px solid hsl(var(--border))",
              background: "hsl(var(--background))",
              padding: "0 16px",
              fontSize: 14,
              cursor: "pointer",
            }}
          >
            {label}
          </AlertDialogTrigger>
          <AlertDialogContent style={{ maxWidth }}>
            <AlertDialogHeader>
              <AlertDialogTitle>{label} AlertDialog</AlertDialogTitle>
              <AlertDialogDescription>
                This alert dialog uses a max-width of {maxWidth}.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction>Confirm</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogRoot>
      ))}
    </div>
  ),
};

export const Interactive: Story = {
  render: () => {
    const [open, setOpen] = React.useState(false);
    const [result, setResult] = React.useState<"confirmed" | "cancelled" | null>(null);

    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 16, alignItems: "flex-start" }}>
        <button
          onClick={() => {
            setResult(null);
            setOpen(true);
          }}
          style={{
            display: "inline-flex",
            height: 40,
            alignItems: "center",
            borderRadius: 6,
            border: "none",
            background: "hsl(var(--destructive))",
            color: "hsl(var(--destructive-foreground))",
            padding: "0 16px",
            fontSize: 14,
            cursor: "pointer",
          }}
        >
          Open Controlled AlertDialog
        </button>
        {result && (
          <p
            style={{
              fontSize: 13,
              color:
                result === "confirmed"
                  ? "hsl(var(--destructive))"
                  : "hsl(var(--muted-foreground))",
            }}
          >
            Result: {result}
          </p>
        )}
        <AlertDialogRoot open={open} onOpenChange={setOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Confirm Destructive Action</AlertDialogTitle>
              <AlertDialogDescription>
                This controlled AlertDialog tracks the user's choice. Unlike
                Dialog, clicking the overlay will not close this — the user
                must explicitly choose Cancel or Confirm.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={() => setResult("cancelled")}>
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction
                onClick={() => {
                  setResult("confirmed");
                  setOpen(false);
                }}
              >
                Confirm
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogRoot>
      </div>
    );
  },
};

export const DarkMode: Story = {
  parameters: {
    globals: { theme: "dark" },
  },
  render: () => (
    <div
      style={{
        padding: 24,
        background: "hsl(var(--background))",
        borderRadius: 8,
      }}
    >
      <AlertDialogRoot>
        <AlertDialogTrigger
          style={{
            display: "inline-flex",
            height: 40,
            alignItems: "center",
            borderRadius: 6,
            border: "none",
            background: "hsl(var(--destructive))",
            color: "hsl(var(--destructive-foreground))",
            padding: "0 16px",
            fontSize: 14,
            cursor: "pointer",
          }}
        >
          Delete in Dark Mode
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Dark Mode AlertDialog</AlertDialogTitle>
            <AlertDialogDescription>
              This alert dialog renders correctly in dark mode with appropriate
              contrast, border, and button colors.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction>Confirm</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogRoot>
    </div>
  ),
};
