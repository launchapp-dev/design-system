import type { Meta, StoryObj } from "@storybook/react";
import { toast } from "sonner";
import { Toaster } from "./index";

const meta = {
  title: "Components/Sonner",
  component: Toaster,
  decorators: [
    (Story) => (
      <>
        <Story />
      </>
    ),
  ],
} satisfies Meta<typeof Toaster>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
      <Toaster />
      <button
        style={{
          padding: "8px 16px",
          border: "1px solid #e2e8f0",
          borderRadius: "6px",
          cursor: "pointer",
        }}
        onClick={() => toast("Event has been created")}
      >
        Show Toast
      </button>
    </div>
  ),
};

export const AllTypes: Story = {
  render: () => (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
      <Toaster richColors />
      <button
        style={{
          padding: "8px 16px",
          border: "1px solid #e2e8f0",
          borderRadius: "6px",
          cursor: "pointer",
        }}
        onClick={() => toast.success("Profile updated successfully")}
      >
        Success
      </button>
      <button
        style={{
          padding: "8px 16px",
          border: "1px solid #e2e8f0",
          borderRadius: "6px",
          cursor: "pointer",
        }}
        onClick={() => toast.error("Failed to save changes")}
      >
        Error
      </button>
      <button
        style={{
          padding: "8px 16px",
          border: "1px solid #e2e8f0",
          borderRadius: "6px",
          cursor: "pointer",
        }}
        onClick={() => toast.info("New version available")}
      >
        Info
      </button>
      <button
        style={{
          padding: "8px 16px",
          border: "1px solid #e2e8f0",
          borderRadius: "6px",
          cursor: "pointer",
        }}
        onClick={() => toast.warning("Storage almost full")}
      >
        Warning
      </button>
      <button
        style={{
          padding: "8px 16px",
          border: "1px solid #e2e8f0",
          borderRadius: "6px",
          cursor: "pointer",
        }}
        onClick={() =>
          toast.promise(new Promise((resolve) => setTimeout(resolve, 2000)), {
            loading: "Saving...",
            success: "Saved!",
            error: "Failed",
          })
        }
      >
        Loading
      </button>
    </div>
  ),
};

export const WithDescription: Story = {
  render: () => (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
      <Toaster richColors />
      <button
        style={{
          padding: "8px 16px",
          border: "1px solid #e2e8f0",
          borderRadius: "6px",
          cursor: "pointer",
        }}
        onClick={() =>
          toast.success("Scheduled: Catch up", {
            description: "Friday, February 10, 2023 at 5:57 PM",
          })
        }
      >
        With Description
      </button>
    </div>
  ),
};

export const Interactive: Story = {
  args: {
    theme: "system",
    richColors: false,
    position: "bottom-right",
  },
  argTypes: {
    theme: {
      control: "select",
      options: ["light", "dark", "system"],
    },
    position: {
      control: "select",
      options: [
        "top-left",
        "top-center",
        "top-right",
        "bottom-left",
        "bottom-center",
        "bottom-right",
      ],
    },
    richColors: {
      control: "boolean",
    },
  },
  render: (args) => (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
      <Toaster {...args} />
      <button
        style={{
          padding: "8px 16px",
          border: "1px solid #e2e8f0",
          borderRadius: "6px",
          cursor: "pointer",
        }}
        onClick={() => toast("Notification triggered")}
      >
        Trigger Toast
      </button>
    </div>
  ),
};

export const DarkMode: Story = {
  decorators: [
    (Story) => (
      <div
        className="dark"
        style={{
          background: "#09090b",
          padding: "24px",
          borderRadius: "8px",
          minHeight: "120px",
        }}
      >
        <Story />
      </div>
    ),
  ],
  render: () => (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
      <Toaster theme="dark" richColors />
      <button
        style={{
          padding: "8px 16px",
          border: "1px solid #374151",
          background: "#1f2937",
          color: "#f9fafb",
          borderRadius: "6px",
          cursor: "pointer",
        }}
        onClick={() => toast.success("Dark mode toast")}
      >
        Success
      </button>
      <button
        style={{
          padding: "8px 16px",
          border: "1px solid #374151",
          background: "#1f2937",
          color: "#f9fafb",
          borderRadius: "6px",
          cursor: "pointer",
        }}
        onClick={() => toast.error("Dark mode error")}
      >
        Error
      </button>
      <button
        style={{
          padding: "8px 16px",
          border: "1px solid #374151",
          background: "#1f2937",
          color: "#f9fafb",
          borderRadius: "6px",
          cursor: "pointer",
        }}
        onClick={() => toast.info("Dark mode info")}
      >
        Info
      </button>
    </div>
  ),
};
