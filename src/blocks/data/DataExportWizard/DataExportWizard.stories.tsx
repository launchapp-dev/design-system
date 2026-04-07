import type { Meta, StoryObj } from "@storybook/react";
import { DataExportWizard } from "./DataExportWizard";

const meta: Meta<typeof DataExportWizard> = {
  title: "Blocks/Data/DataExportWizard",
  component: DataExportWizard,
  parameters: { layout: "padded" },
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div className="max-w-2xl">
      <DataExportWizard
        onExport={(opts) => console.log("Export with:", opts)}
      />
    </div>
  ),
};

export const DarkMode: Story = {
  decorators: [
    (Story) => (
      <div className="dark bg-zinc-950 p-8 rounded-xl">
        <Story />
      </div>
    ),
  ],
  render: () => (
    <div className="max-w-2xl">
      <DataExportWizard
        onExport={(opts) => console.log("Export with:", opts)}
      />
    </div>
  ),
};
