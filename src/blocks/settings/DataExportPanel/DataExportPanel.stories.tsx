import type { Meta, StoryObj } from "@storybook/react";
import { DataExportPanel } from "./DataExportPanel";
import type { ExportHistoryItem } from "./DataExportPanel";

const sampleHistory: ExportHistoryItem[] = [
  {
    id: "exp-1",
    requestedAt: new Date(Date.now() - 86400000 * 2).toISOString(),
    completedAt: new Date(Date.now() - 86400000 * 2 + 120000).toISOString(),
    format: "json",
    scope: "all",
    status: "ready",
    sizeBytes: 2457600,
    downloadUrl: "#",
  },
  {
    id: "exp-2",
    requestedAt: new Date(Date.now() - 86400000 * 7).toISOString(),
    completedAt: new Date(Date.now() - 86400000 * 7 + 60000).toISOString(),
    format: "csv",
    scope: "billing",
    status: "ready",
    sizeBytes: 38400,
    downloadUrl: "#",
  },
  {
    id: "exp-3",
    requestedAt: new Date(Date.now() - 86400000).toISOString(),
    format: "zip",
    scope: "all",
    status: "error",
  },
];

const meta: Meta<typeof DataExportPanel> = {
  title: "Blocks/Settings/DataExportPanel",
  component: DataExportPanel,
  parameters: {
    layout: "padded",
    docs: {
      source: {
        code: `import { DataExportPanel } from "@launchapp/design-system/blocks/settings";

export default function Page() {
  const [progress, setProgress] = React.useState(0);
  const [current, setCurrent] = React.useState(null);

  function handleRequest(format, scope) {
    setCurrent({ id: "new", requestedAt: new Date().toISOString(), format, scope, status: "processing" });
    // Simulate progress
  }

  return (
    <DataExportPanel
      history={history}
      currentExport={current}
      progress={progress}
      onRequestExport={handleRequest}
    />
  );
}`,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof DataExportPanel>;

export const Default: Story = {
  args: {
    history: [],
  },
};

export const WithHistory: Story = {
  args: {
    history: sampleHistory,
  },
};

export const Processing: Story = {
  args: {
    history: sampleHistory,
    currentExport: {
      id: "exp-new",
      requestedAt: new Date().toISOString(),
      format: "zip",
      scope: "all",
      status: "processing",
    },
    progress: 42,
  },
};

export const DarkMode: Story = {
  parameters: { backgrounds: { default: "dark" } },
  render: (args) => (
    <div className="dark bg-background p-6">
      <DataExportPanel {...args} />
    </div>
  ),
  args: {
    history: sampleHistory,
  },
};

export const Mobile: Story = {
  parameters: { viewport: { defaultViewport: "mobile1" } },
  args: {
    history: sampleHistory,
  },
};
