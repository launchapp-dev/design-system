import type { Meta, StoryObj } from "@storybook/react";
import { SecuritySettings } from "./SecuritySettings";

const meta: Meta<typeof SecuritySettings> = {
  title: "Blocks/Settings/SecuritySettings",
  component: SecuritySettings,
  parameters: { layout: "padded" },
};

export default meta;
type Story = StoryObj<typeof SecuritySettings>;

export const Default: Story = {
  args: {},
};

export const With2FA: Story = {
  args: {
    has2FA: true,
    activeSessions: 2,
  },
};

export const ManySessions: Story = {
  args: {
    activeSessions: 5,
  },
};

export const DarkMode: Story = {
  render: () => (
    <div className="dark" style={{ background: "hsl(240 10% 3.9%)", padding: 24 }}>
      <SecuritySettings />
    </div>
  ),
};