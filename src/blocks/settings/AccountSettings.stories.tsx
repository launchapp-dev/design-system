import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import { AccountSettings } from "./AccountSettings";

const meta: Meta<typeof AccountSettings> = {
  title: "Blocks/Settings/AccountSettings",
  component: AccountSettings,
  parameters: {
    layout: "padded",
    docs: {
      source: {
        code: `import { AccountSettings } from "@launchapp/design-system/blocks/settings";

export default function Page() {
  return (
    <AccountSettings
      onEmailChange={async (values) => console.log(values)}
      onPasswordChange={async (values) => console.log(values)}
      onDeleteAccount={() => console.log("delete account")}
    />
  );
}`,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div style={{ maxWidth: 640 }}>
      <AccountSettings
        currentEmail="jane@example.com"
        onEmailChange={(v) => console.log("Email changed:", v)}
        onPasswordChange={(v) => console.log("Password changed:", v)}
        onDeleteAccount={() => console.log("Delete account")}
      />
    </div>
  ),
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
    <div style={{ maxWidth: 640 }}>
      <AccountSettings currentEmail="jane@example.com" />
    </div>
  ),
};

export const Mobile: Story = {
  parameters: {
    viewport: { defaultViewport: "mobile1" },
  },
  render: () => (
    <AccountSettings
      currentEmail="jane@example.com"
      onEmailChange={(v) => console.log("Email changed:", v)}
      onPasswordChange={(v) => console.log("Password changed:", v)}
      onDeleteAccount={() => console.log("Delete account")}
    />
  ),
};

export const Tablet: Story = {
  parameters: {
    viewport: { defaultViewport: "tablet" },
  },
  render: () => (
    <div style={{ maxWidth: 640, margin: "0 auto" }}>
      <AccountSettings
        currentEmail="jane@example.com"
        onEmailChange={(v) => console.log("Email changed:", v)}
        onPasswordChange={(v) => console.log("Password changed:", v)}
        onDeleteAccount={() => console.log("Delete account")}
      />
    </div>
  ),
};
