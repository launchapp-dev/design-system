import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import { DataExportCard } from "./DataExportCard";

const meta: Meta<typeof DataExportCard> = {
  title: "Blocks/Settings/DataExportCard",
  component: DataExportCard,
  parameters: {
    layout: "padded",
    docs: {
      source: {
        code: `import { DataExportCard } from "@launchapp/design-system/blocks";

<DataExportCard
  lastExportDate="2026-01-15"
  onExport={() => console.log("export requested")}
/>`,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <DataExportCard
      lastExportDate="2026-01-15"
      onExport={() => console.log("export requested")}
    />
  ),
};

export const NoPreviousExport: Story = {
  render: () => (
    <DataExportCard
      onExport={() => console.log("export requested")}
    />
  ),
};

export const Exporting: Story = {
  render: () => (
    <DataExportCard
      lastExportDate="2026-01-15"
      onExport={() => console.log("export requested")}
      isExporting={true}
    />
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
    <DataExportCard
      lastExportDate="2026-01-15"
      onExport={() => console.log("export requested")}
    />
  ),
};

export const Mobile: Story = {
  parameters: {
    viewport: {
      defaultViewport: "mobile1",
    },
  },
  render: () => (
    <DataExportCard
      lastExportDate="2026-01-15"
      onExport={() => console.log("export requested")}
    />
  ),
};
