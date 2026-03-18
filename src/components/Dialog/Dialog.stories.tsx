import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import {
  DialogRoot,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "./index";

const meta: Meta<typeof DialogRoot> = {
  title: "Components/Dialog",
  component: DialogRoot,
  argTypes: {
    open: { control: "boolean" },
    modal: { control: "boolean" },
  },
  args: {
    modal: true,
  },
};

export default meta;
type Story = StoryObj<typeof DialogRoot>;

export const Default: Story = {
  render: () => (
    <DialogRoot>
      <DialogTrigger
        style={{
          display: "inline-flex",
          height: 40,
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 6,
          border: "1px solid hsl(var(--border))",
          background: "hsl(var(--background))",
          padding: "0 16px",
          fontSize: 14,
          cursor: "pointer",
        }}
      >
        Open Dialog
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Dialog Title</DialogTitle>
          <DialogDescription>
            This is a dialog description that provides more context about the
            action being taken.
          </DialogDescription>
        </DialogHeader>
        <div style={{ padding: "16px 0", fontSize: 14 }}>
          Dialog body content goes here.
        </div>
        <DialogFooter>
          <DialogClose
            style={{
              display: "inline-flex",
              height: 40,
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 6,
              border: "1px solid hsl(var(--border))",
              background: "hsl(var(--background))",
              padding: "0 16px",
              fontSize: 14,
              cursor: "pointer",
            }}
          >
            Cancel
          </DialogClose>
          <DialogClose
            style={{
              display: "inline-flex",
              height: 40,
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 6,
              border: "none",
              background: "hsl(var(--primary))",
              color: "hsl(var(--primary-foreground))",
              padding: "0 16px",
              fontSize: 14,
              cursor: "pointer",
            }}
          >
            Save Changes
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </DialogRoot>
  ),
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
      <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
        <DialogRoot>
          <DialogTrigger
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
            With Footer
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Profile</DialogTitle>
              <DialogDescription>
                Make changes to your profile here. Click save when you are done.
              </DialogDescription>
            </DialogHeader>
            <div style={{ padding: "16px 0", fontSize: 14 }}>
              Profile form content.
            </div>
            <DialogFooter>
              <DialogClose
                style={{
                  display: "inline-flex",
                  height: 36,
                  alignItems: "center",
                  borderRadius: 6,
                  border: "1px solid hsl(var(--border))",
                  background: "hsl(var(--background))",
                  padding: "0 12px",
                  fontSize: 14,
                  cursor: "pointer",
                }}
              >
                Cancel
              </DialogClose>
              <DialogClose
                style={{
                  display: "inline-flex",
                  height: 36,
                  alignItems: "center",
                  borderRadius: 6,
                  border: "none",
                  background: "hsl(var(--primary))",
                  color: "hsl(var(--primary-foreground))",
                  padding: "0 12px",
                  fontSize: 14,
                  cursor: "pointer",
                }}
              >
                Save
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </DialogRoot>

        <DialogRoot>
          <DialogTrigger
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
            Header Only
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Notification Settings</DialogTitle>
              <DialogDescription>
                Configure how you receive notifications.
              </DialogDescription>
            </DialogHeader>
            <div style={{ padding: "16px 0", fontSize: 14 }}>
              Notification preferences form.
            </div>
          </DialogContent>
        </DialogRoot>

        <DialogRoot>
          <DialogTrigger
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
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                A Very Long Dialog Title That Tests How The Title Wraps
              </DialogTitle>
              <DialogDescription>
                This description is intentionally long to demonstrate how the
                Dialog handles overflow content in both the header and body
                sections of the component.
              </DialogDescription>
            </DialogHeader>
            <div style={{ padding: "16px 0", fontSize: 14 }}>
              <p>Paragraph one of the body content.</p>
              <p style={{ marginTop: 8 }}>Paragraph two with more details.</p>
              <p style={{ marginTop: 8 }}>Paragraph three to add length.</p>
              <p style={{ marginTop: 8 }}>Paragraph four to add length.</p>
              <p style={{ marginTop: 8 }}>Paragraph five to add length.</p>
            </div>
            <DialogFooter>
              <DialogClose
                style={{
                  display: "inline-flex",
                  height: 36,
                  alignItems: "center",
                  borderRadius: 6,
                  border: "1px solid hsl(var(--border))",
                  background: "hsl(var(--background))",
                  padding: "0 12px",
                  fontSize: 14,
                  cursor: "pointer",
                }}
              >
                Close
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </DialogRoot>
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
        <DialogRoot key={label}>
          <DialogTrigger
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
          </DialogTrigger>
          <DialogContent style={{ maxWidth }}>
            <DialogHeader>
              <DialogTitle>{label} Dialog</DialogTitle>
              <DialogDescription>
                This dialog uses a max-width of {maxWidth}.
              </DialogDescription>
            </DialogHeader>
            <div style={{ padding: "16px 0", fontSize: 14 }}>
              Body content for the {label.toLowerCase()} size dialog.
            </div>
            <DialogFooter>
              <DialogClose
                style={{
                  display: "inline-flex",
                  height: 36,
                  alignItems: "center",
                  borderRadius: 6,
                  border: "none",
                  background: "hsl(var(--primary))",
                  color: "hsl(var(--primary-foreground))",
                  padding: "0 12px",
                  fontSize: 14,
                  cursor: "pointer",
                }}
              >
                Close
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </DialogRoot>
      ))}
    </div>
  ),
};

export const Interactive: Story = {
  render: () => {
    const [open, setOpen] = React.useState(false);
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 16, alignItems: "flex-start" }}>
        <button
          onClick={() => setOpen(true)}
          style={{
            display: "inline-flex",
            height: 40,
            alignItems: "center",
            borderRadius: 6,
            border: "none",
            background: "hsl(var(--primary))",
            color: "hsl(var(--primary-foreground))",
            padding: "0 16px",
            fontSize: 14,
            cursor: "pointer",
          }}
        >
          Open Controlled Dialog
        </button>
        <p style={{ fontSize: 13, color: "hsl(var(--muted-foreground))" }}>
          Dialog is: {open ? "open" : "closed"}
        </p>
        <DialogRoot open={open} onOpenChange={setOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Controlled Dialog</DialogTitle>
              <DialogDescription>
                This dialog is controlled externally via React state. It
                supports escape to close, overlay click to close, and the
                cancel button.
              </DialogDescription>
            </DialogHeader>
            <div style={{ padding: "16px 0", fontSize: 14 }}>
              Interactive content with live state tracking.
            </div>
            <DialogFooter>
              <DialogClose
                onClick={() => setOpen(false)}
                style={{
                  display: "inline-flex",
                  height: 36,
                  alignItems: "center",
                  borderRadius: 6,
                  border: "1px solid hsl(var(--border))",
                  background: "hsl(var(--background))",
                  padding: "0 12px",
                  fontSize: 14,
                  cursor: "pointer",
                }}
              >
                Cancel
              </DialogClose>
              <button
                onClick={() => setOpen(false)}
                style={{
                  display: "inline-flex",
                  height: 36,
                  alignItems: "center",
                  borderRadius: 6,
                  border: "none",
                  background: "hsl(var(--primary))",
                  color: "hsl(var(--primary-foreground))",
                  padding: "0 12px",
                  fontSize: 14,
                  cursor: "pointer",
                }}
              >
                Confirm
              </button>
            </DialogFooter>
          </DialogContent>
        </DialogRoot>
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
      <DialogRoot>
        <DialogTrigger
          style={{
            display: "inline-flex",
            height: 40,
            alignItems: "center",
            borderRadius: 6,
            border: "1px solid hsl(var(--border))",
            background: "hsl(var(--background))",
            color: "hsl(var(--foreground))",
            padding: "0 16px",
            fontSize: 14,
            cursor: "pointer",
          }}
        >
          Open Dark Dialog
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Dark Mode Dialog</DialogTitle>
            <DialogDescription>
              This dialog renders correctly in dark mode with appropriate
              contrast and border colors.
            </DialogDescription>
          </DialogHeader>
          <div style={{ padding: "16px 0", fontSize: 14 }}>
            Dark mode body content.
          </div>
          <DialogFooter>
            <DialogClose
              style={{
                display: "inline-flex",
                height: 36,
                alignItems: "center",
                borderRadius: 6,
                border: "1px solid hsl(var(--border))",
                background: "hsl(var(--background))",
                color: "hsl(var(--foreground))",
                padding: "0 12px",
                fontSize: 14,
                cursor: "pointer",
              }}
            >
              Cancel
            </DialogClose>
            <DialogClose
              style={{
                display: "inline-flex",
                height: 36,
                alignItems: "center",
                borderRadius: 6,
                border: "none",
                background: "hsl(var(--primary))",
                color: "hsl(var(--primary-foreground))",
                padding: "0 12px",
                fontSize: 14,
                cursor: "pointer",
              }}
            >
              Confirm
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </DialogRoot>
    </div>
  ),
};
