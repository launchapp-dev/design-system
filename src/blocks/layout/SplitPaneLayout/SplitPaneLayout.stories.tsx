import type { Meta, StoryObj } from "@storybook/react";
import { SplitPaneLayout } from "./SplitPaneLayout";

const meta: Meta<typeof SplitPaneLayout> = {
  title: "Blocks/Layout/SplitPaneLayout",
  component: SplitPaneLayout,
  parameters: { layout: "fullscreen" },
};

export default meta;
type Story = StoryObj<typeof SplitPaneLayout>;

export const Horizontal: Story = {
  render: () => (
    <SplitPaneLayout
      leftPane={
        <div className="p-4">
          <h3 className="mb-4 text-sm font-semibold">File Explorer</h3>
          {["src", "components", "utils"].map((f) => (
            <div key={f} className="mb-2 rounded-md bg-muted p-2 text-sm">{f}</div>
          ))}
        </div>
      }
      rightPane={
        <div className="p-4">
          <h3 className="mb-4 text-sm font-semibold">Code Editor</h3>
          <div className="rounded-md bg-muted p-4 text-sm font-mono">
            const example = "hello";
          </div>
        </div>
      }
      leftPaneSize={240}
    />
  ),
};

export const Vertical: Story = {
  render: () => (
    <SplitPaneLayout
      orientation="vertical"
      leftPane={
        <div className="p-4">
          <h3 className="text-sm font-semibold">Top Panel</h3>
          <p className="mt-2 text-muted-foreground">Preview content</p>
        </div>
      }
      rightPane={
        <div className="p-4">
          <h3 className="text-sm font-semibold">Bottom Panel</h3>
          <p className="mt-2 text-muted-foreground">Console / output</p>
        </div>
      }
      leftPaneSize={300}
    />
  ),
};

export const DarkMode: Story = {
  render: () => (
    <div className="dark" style={{ background: "hsl(240 10% 3.9%)", minHeight: "100vh" }}>
      <SplitPaneLayout
        leftPane={<div className="p-4 text-white">Left</div>}
        rightPane={<div className="p-4 text-white">Right</div>}
        leftPaneSize={240}
      />
    </div>
  ),
};