import type { Meta, StoryObj } from "@storybook/react";
import { DashboardLayout } from "./DashboardLayout";

const SampleHeader = () => (
  <div className="flex h-14 items-center gap-4 px-4">
    <span className="text-sm font-semibold">Dashboard</span>
    <div className="flex-1" />
    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted text-xs font-medium">JS</div>
  </div>
);

const SampleLeftPanel = ({ title = "Sidebar" }: { title?: string }) => (
  <div className="p-4">
    <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">{title}</p>
    {["Overview", "Analytics", "Reports", "Customers", "Products", "Settings"].map((item, i) => (
      <button
        key={item}
        type="button"
        className={`mb-1 flex w-full items-center rounded-[--la-radius] px-3 py-2 text-sm transition-colors hover:bg-accent ${i === 0 ? "bg-accent font-medium" : "text-foreground"}`}
      >
        {item}
      </button>
    ))}
  </div>
);

const SampleRightPanel = () => (
  <div className="p-4">
    <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Details</p>
    <div className="space-y-3">
      {["Revenue", "Users", "Orders", "Conversion"].map((label) => (
        <div key={label} className="flex items-center justify-between rounded-[--la-radius] border border-border p-3">
          <span className="text-sm text-muted-foreground">{label}</span>
          <span className="text-sm font-semibold">—</span>
        </div>
      ))}
    </div>
  </div>
);

const SampleContent = ({ label = "Main Content" }: { label?: string }) => (
  <div className="h-full min-h-64 p-6">
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="rounded-lg border border-border bg-card p-4">
          <p className="text-sm font-medium">Card {i + 1}</p>
          <p className="mt-1 text-2xl font-bold">—</p>
          <p className="mt-1 text-xs text-muted-foreground">{label}</p>
        </div>
      ))}
    </div>
  </div>
);

const meta: Meta<typeof DashboardLayout> = {
  title: "Blocks/Layout/DashboardLayout",
  component: DashboardLayout,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
  decorators: [
    (Story) => (
      <div className="h-[600px] w-full overflow-hidden rounded-lg border border-border">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof DashboardLayout>;

export const SingleColumn: Story = {
  render: () => (
    <DashboardLayout columns={1} header={<SampleHeader />}>
      <SampleContent label="Single column layout" />
    </DashboardLayout>
  ),
};

export const SplitColumn: Story = {
  render: () => (
    <DashboardLayout
      columns={2}
      header={<SampleHeader />}
      leftPanel={<SampleLeftPanel />}
    >
      <SampleContent label="Split column layout" />
    </DashboardLayout>
  ),
};

export const TripleColumn: Story = {
  render: () => (
    <DashboardLayout
      columns={3}
      header={<SampleHeader />}
      leftPanel={<SampleLeftPanel />}
      rightPanel={<SampleRightPanel />}
    >
      <SampleContent label="Triple column layout" />
    </DashboardLayout>
  ),
};

export const DarkMode: Story = {
  decorators: [
    (Story) => (
      <div className="dark h-[600px] w-full overflow-hidden rounded-lg border border-border">
        <Story />
      </div>
    ),
  ],
  render: () => (
    <DashboardLayout
      columns={3}
      header={<SampleHeader />}
      leftPanel={<SampleLeftPanel />}
      rightPanel={<SampleRightPanel />}
    >
      <SampleContent label="Triple column · dark mode" />
    </DashboardLayout>
  ),
};
