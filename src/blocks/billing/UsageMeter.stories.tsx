import type { Meta, StoryObj } from "@storybook/react";
import { UsageMeter } from "./UsageMeter";

const meta: Meta<typeof UsageMeter> = {
  title: "Blocks/Billing/UsageMeter",
  component: UsageMeter,
  parameters: { layout: "padded" },
};
export default meta;
type Story = StoryObj<typeof meta>;

const defaultItems = [
  { id: "1", label: "Storage", used: 4.2, total: 10, unit: "GB", warningThreshold: 80 },
  { id: "2", label: "API calls", used: 8400, total: 10000, unit: "req/mo", warningThreshold: 90 },
  { id: "3", label: "Team members", used: 3, total: 10, unit: "seats" },
  { id: "4", label: "Projects", used: 2, total: 3, unit: "", warningThreshold: 70 },
];

export const Default: Story = {
  render: () => (
    <div style={{ maxWidth: 480 }}>
      <UsageMeter
        items={defaultItems}
        onUpgrade={() => console.log("Upgrade")}
      />
    </div>
  ),
};

export const WarningLevels: Story = {
  render: () => (
    <div style={{ maxWidth: 480 }}>
      <UsageMeter
        items={[
          { id: "1", label: "Storage", used: 9.5, total: 10, unit: "GB", warningThreshold: 80 },
          { id: "2", label: "API calls", used: 9500, total: 10000, unit: "req/mo", warningThreshold: 90 },
          { id: "3", label: "Team seats", used: 3, total: 10, unit: "seats" },
        ]}
        onUpgrade={() => console.log("Upgrade")}
      />
    </div>
  ),
};

export const AtCapacity: Story = {
  render: () => (
    <div style={{ maxWidth: 480 }}>
      <UsageMeter
        items={[
          { id: "1", label: "Storage", used: 10, total: 10, unit: "GB" },
          { id: "2", label: "Projects", used: 3, total: 3, unit: "" },
        ]}
        onUpgrade={() => console.log("Upgrade")}
      />
    </div>
  ),
};

export const NoUpgradeButton: Story = {
  render: () => (
    <div style={{ maxWidth: 480 }}>
      <UsageMeter items={defaultItems} showUpgradeButton={false} />
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
    <div style={{ maxWidth: 480 }}>
      <UsageMeter items={defaultItems} onUpgrade={() => console.log("Upgrade")} />
    </div>
  ),
};
