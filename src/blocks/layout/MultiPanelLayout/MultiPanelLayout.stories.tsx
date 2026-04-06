import type { Meta, StoryObj } from "@storybook/react";
import { MultiPanelLayout } from "./MultiPanelLayout";

const meta: Meta<typeof MultiPanelLayout> = {
  title: "Blocks/Layout/MultiPanelLayout",
  component: MultiPanelLayout,
  parameters: { layout: "fullscreen" },
};

export default meta;
type Story = StoryObj<typeof MultiPanelLayout>;

export const ThreePanel: Story = {
  render: () => (
    <MultiPanelLayout
      leftPanel={
        <div className="p-4">
          <h3 className="mb-4 text-sm font-semibold">Inbox</h3>
          {["Email one", "Email two", "Email three"].map((e) => (
            <div key={e} className="mb-2 rounded-md border p-3 text-sm">{e}</div>
          ))}
        </div>
      }
      centerPanel={
        <div className="p-6">
          <h3 className="text-lg font-semibold">Email Content</h3>
          <p className="mt-2 text-muted-foreground">Select an email to read it here.</p>
        </div>
      }
      rightPanel={
        <div className="p-4">
          <h3 className="mb-4 text-sm font-semibold">Details</h3>
          <p className="text-sm text-muted-foreground">Email details appear here.</p>
        </div>
      }
    />
  ),
};

export const TwoPanel: Story = {
  render: () => (
    <MultiPanelLayout
      leftPanel={
        <div className="p-4">
          <h3 className="mb-4 text-sm font-semibold">Files</h3>
          {["file1.tsx", "file2.tsx", "file3.tsx"].map((f) => (
            <div key={f} className="mb-2 rounded-md border p-3 text-sm">{f}</div>
          ))}
        </div>
      }
      centerPanel={
        <div className="p-6">
          <h3 className="text-lg font-semibold">File Editor</h3>
          <p className="mt-2 text-muted-foreground">Select a file to edit.</p>
        </div>
      }
    />
  ),
};

export const DarkMode: Story = {
  render: () => (
    <div className="dark" style={{ background: "hsl(240 10% 3.9%)", minHeight: "100vh" }}>
      <MultiPanelLayout
        leftPanel={<div className="p-4"><h3 className="mb-4 text-sm font-semibold text-white">Left</h3></div>}
        centerPanel={<div className="p-6"><h3 className="text-lg font-semibold text-white">Center</h3></div>}
        rightPanel={<div className="p-4"><h3 className="mb-4 text-sm font-semibold text-white">Right</h3></div>}
      />
    </div>
  ),
};