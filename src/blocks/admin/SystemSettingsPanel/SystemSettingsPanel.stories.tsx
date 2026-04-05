import type { Meta, StoryObj } from "@storybook/react";
import { SystemSettingsPanel, type FeatureFlag, type AppConfigField } from "./SystemSettingsPanel";

const meta: Meta<typeof SystemSettingsPanel> = {
  title: "Blocks/Admin/SystemSettingsPanel",
  component: SystemSettingsPanel,
};
export default meta;
type Story = StoryObj<typeof SystemSettingsPanel>;

const sampleConfig: AppConfigField[] = [
  { id: "app_name", label: "Application Name", type: "text", value: "LaunchApp", placeholder: "Enter app name" },
  { id: "support_email", label: "Support Email", type: "email", value: "support@launchapp.dev", placeholder: "support@example.com" },
  { id: "app_url", label: "Application URL", type: "url", value: "https://launchapp.dev", placeholder: "https://" },
];

const sampleFlags: FeatureFlag[] = [
  { id: "dark_mode", name: "Dark Mode", description: "Enable dark mode for all users.", enabled: true },
  { id: "beta_features", name: "Beta Features", description: "Enable access to experimental beta features.", enabled: false },
  { id: "maintenance_mode", name: "Maintenance Mode", description: "Put the application in maintenance mode.", enabled: false },
  { id: "ai_assistant", name: "AI Assistant", description: "Enable the AI assistant integration.", enabled: true },
  { id: "analytics", name: "Analytics", description: "Enable product analytics and tracking.", enabled: true },
];

export const Default: Story = {
  args: {
    appName: "LaunchApp",
    appConfig: sampleConfig,
    featureFlags: sampleFlags,
    onConfigChange: (id, value) => console.log("config change", id, value),
    onFlagToggle: (id, enabled) => console.log("flag toggle", id, enabled),
    onSaveConfig: (config) => console.log("save config", config),
    onSaveFlags: (flags) => console.log("save flags", flags),
  },
};

export const ConfigOnly: Story = {
  args: {
    appName: "LaunchApp",
    appConfig: sampleConfig,
    featureFlags: [],
    onConfigChange: (id, value) => console.log("config change", id, value),
    onSaveConfig: (config) => console.log("save config", config),
  },
};

export const FlagsOnly: Story = {
  args: {
    appName: "LaunchApp",
    appConfig: [],
    featureFlags: sampleFlags,
    onFlagToggle: (id, enabled) => console.log("flag toggle", id, enabled),
    onSaveFlags: (flags) => console.log("save flags", flags),
  },
};

export const Saving: Story = {
  args: {
    appName: "LaunchApp",
    appConfig: sampleConfig,
    featureFlags: sampleFlags,
    onSaveConfig: async () => { await new Promise((r) => setTimeout(r, 2000)); },
    onSaveFlags: async () => { await new Promise((r) => setTimeout(r, 2000)); },
    saving: true,
  },
};
