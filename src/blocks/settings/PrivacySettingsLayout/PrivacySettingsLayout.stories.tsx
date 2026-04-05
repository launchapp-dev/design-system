import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import { PrivacySettingsLayout } from "./PrivacySettingsLayout";

const meta: Meta<typeof PrivacySettingsLayout> = {
  title: "Blocks/Settings/PrivacySettingsLayout",
  component: PrivacySettingsLayout,
  parameters: {
    layout: "padded",
    docs: {
      source: {
        code: `import { PrivacySettingsLayout } from "@launchapp/design-system/blocks";

<PrivacySettingsLayout
  lastExportDate="2026-01-15"
  onExport={() => console.log("export requested")}
  onDeleteAccount={() => console.log("account deleted")}
/>`,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div style={{ maxWidth: 640 }}>
      <PrivacySettingsLayout
        lastExportDate="2026-01-15"
        onExport={() => console.log("export requested")}
        onDeleteAccount={() => console.log("account deleted")}
      />
    </div>
  ),
};

export const NoPreviousExport: Story = {
  render: () => (
    <div style={{ maxWidth: 640 }}>
      <PrivacySettingsLayout
        onExport={() => console.log("export requested")}
        onDeleteAccount={() => console.log("account deleted")}
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
      <PrivacySettingsLayout
        lastExportDate="2026-01-15"
        onExport={() => console.log("export requested")}
        onDeleteAccount={() => console.log("account deleted")}
      />
    </div>
  ),
};

export const Mobile: Story = {
  parameters: {
    viewport: {
      defaultViewport: "mobile1",
    },
  },
  render: () => (
    <div style={{ maxWidth: 640 }}>
      <PrivacySettingsLayout
        lastExportDate="2026-01-15"
        onExport={() => console.log("export requested")}
        onDeleteAccount={() => console.log("account deleted")}
      />
    </div>
  ),
};
