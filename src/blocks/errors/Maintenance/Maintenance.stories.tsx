import type { Meta, StoryObj } from "@storybook/react";
import { Maintenance } from "./index";

const sampleUpdates = [
  { label: "Database migration", status: "done" as const },
  { label: "Service restart", status: "in-progress" as const },
  { label: "Cache warmup", status: "pending" as const },
  { label: "Health checks", status: "pending" as const },
];

const meta: Meta<typeof Maintenance> = {
  title: "Blocks/Errors/Maintenance",
  component: Maintenance,
  parameters: {
    layout: "fullscreen",
    docs: {
      source: {
        code: `import { Maintenance } from "@launchapp/design-system";

export default function MaintenancePage() {
  return (
    <Maintenance
      title="We'll be back soon"
      description="Scheduled maintenance in progress."
      estimatedTime="2:00 PM UTC"
      contactEmail="support@example.com"
    />
  );
}`,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Maintenance>;

export const Default: Story = {
  render: () => (
    <Maintenance
      statusMessage="Scheduled maintenance"
      estimatedTime="2:00 PM UTC today"
      contactEmail="support@example.com"
    />
  ),
};

export const WithStatusUpdates: Story = {
  render: () => (
    <Maintenance
      statusMessage="In progress"
      estimatedTime="~15 minutes remaining"
      updates={sampleUpdates}
      contactEmail="support@example.com"
    />
  ),
};

export const MinimalMessage: Story = {
  render: () => (
    <Maintenance
      title="Down for maintenance"
      description="We're upgrading our infrastructure. Back shortly."
    />
  ),
};

export const Emergency: Story = {
  render: () => (
    <Maintenance
      title="Unplanned maintenance"
      description="We're investigating an incident affecting some users. Our team is actively working on a resolution."
      statusMessage="Incident in progress"
      estimatedTime="Unknown — investigating"
      contactEmail="urgent@example.com"
      updates={[
        { label: "Incident detected", status: "done" },
        { label: "Root cause identified", status: "in-progress" },
        { label: "Fix deployed", status: "pending" },
        { label: "Service restored", status: "pending" },
      ]}
    />
  ),
};

export const DarkMode: Story = {
  decorators: [
    (Story) => (
      <div className="dark bg-background min-h-screen">
        <Story />
      </div>
    ),
  ],
  render: () => (
    <Maintenance
      statusMessage="Scheduled maintenance"
      estimatedTime="2:00 PM UTC today"
      updates={sampleUpdates}
      contactEmail="support@example.com"
    />
  ),
};

export const Mobile: Story = {
  parameters: { viewport: { defaultViewport: "mobile1" } },
  render: () => (
    <Maintenance
      statusMessage="Maintenance"
      estimatedTime="~15 minutes"
      updates={sampleUpdates}
      contactEmail="support@example.com"
    />
  ),
};
