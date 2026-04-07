import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import { PrivacySettings } from "./PrivacySettings";

const meta: Meta<typeof PrivacySettings> = {
  title: "Blocks/Settings/PrivacySettings",
  component: PrivacySettings,
  parameters: { layout: "padded" },
};

export default meta;
type Story = StoryObj<typeof PrivacySettings>;

export const Default: Story = {
  args: {},
};

export const AllEnabled: Story = {
  render: () => {
    const [toggles, setToggles] = React.useState([
      { id: "analytics", label: "Usage analytics", description: "Help us improve.", enabled: true, onChange: () => {} },
      { id: "marketing", label: "Marketing emails", description: "Receive updates.", enabled: true, onChange: () => {} },
      { id: "crash", label: "Crash reports", description: "Help fix issues.", enabled: true, onChange: () => {} },
      { id: "profile", label: "Public profile", description: "Visible to others.", enabled: true, onChange: () => {} },
    ]);
    return (
      <PrivacySettings
        toggles={toggles.map((t) => ({ ...t, onChange: (id: string, enabled: boolean) => setToggles((prev) => prev.map((x) => x.id === id ? { ...x, enabled } : x)) }))}
      />
    );
  },
};

export const DarkMode: Story = {
  render: () => (
    <div className="dark" style={{ background: "hsl(240 10% 3.9%)", padding: 24 }}>
      <PrivacySettings />
    </div>
  ),
};