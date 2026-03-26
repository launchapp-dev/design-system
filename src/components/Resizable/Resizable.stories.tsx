import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "./index";

const meta: Meta = {
  title: "Components/Resizable",
  parameters: {
    docs: {
      description: {
        component: `
## Accessibility Features

### ARIA Attributes
- Resize handle has \`role="separator"\`
- Handle has \`aria-label\` describing panels (e.g., "Resize between sidebar and content")
- Handle has \`aria-orientation="vertical"\` or \`"horizontal"\`
- \`aria-valuenow\` shows current panel size percentage

### Keyboard Navigation
- **Tab**: Focus resize handle
- **Left/Right Arrow** (horizontal): Resize panels left/right
- **Up/Down Arrow** (vertical): Resize panels up/down
- **Home/End**: Min/max resize positions
- Shift+Arrow for larger increments

### Screen Reader Behavior
- Handle purpose announced
- Current panel sizes announced
- Resize constraints announced if applicable
- Dimension changes announced as adjusted

### Focus Management
- Handle is keyboard focusable
- Clear focus indicator on handle
- Tab order naturally includes handle
- Visual feedback on resize actions
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const panelStyle = (label: string, bg = "hsl(var(--muted))"): React.CSSProperties => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  background: bg,
  fontSize: 13,
  fontWeight: 500,
  color: "hsl(var(--muted-foreground))",
  height: "100%",
  userSelect: "none",
});

export const Default: Story = {
  render: () => (
    <div style={{ height: 200, border: "1px solid hsl(var(--border))", borderRadius: 8, overflow: "hidden" }}>
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel defaultSize={50}>
          <div style={panelStyle("Left")}>Left Panel</div>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={50}>
          <div style={panelStyle("Right")}>Right Panel</div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  ),
};

export const ThreePanelLayout: Story = {
  render: () => (
    <div style={{ height: 300, border: "1px solid hsl(var(--border))", borderRadius: 8, overflow: "hidden" }}>
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel defaultSize={20} minSize={10}>
          <div style={panelStyle("Sidebar")}>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontWeight: 600, marginBottom: 4 }}>Sidebar</div>
              <div style={{ fontSize: 11, opacity: 0.7 }}>min: 10%</div>
            </div>
          </div>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={60} minSize={30}>
          <div style={panelStyle("Main", "hsl(var(--background))")}>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontWeight: 600, marginBottom: 4 }}>Main Content</div>
              <div style={{ fontSize: 11, opacity: 0.7 }}>min: 30%</div>
            </div>
          </div>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={20} minSize={10}>
          <div style={panelStyle("Detail")}>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontWeight: 600, marginBottom: 4 }}>Detail</div>
              <div style={{ fontSize: 11, opacity: 0.7 }}>min: 10%</div>
            </div>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  ),
};

export const Vertical: Story = {
  render: () => (
    <div style={{ height: 300, border: "1px solid hsl(var(--border))", borderRadius: 8, overflow: "hidden" }}>
      <ResizablePanelGroup direction="vertical">
        <ResizablePanel defaultSize={30}>
          <div style={panelStyle("Top")}>Top Panel</div>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={40}>
          <div style={panelStyle("Middle", "hsl(var(--background))")}>Middle Panel</div>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={30}>
          <div style={panelStyle("Bottom")}>Bottom Panel</div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  ),
};

export const NestedPanels: Story = {
  render: () => (
    <div style={{ height: 300, border: "1px solid hsl(var(--border))", borderRadius: 8, overflow: "hidden" }}>
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel defaultSize={25} minSize={15}>
          <div style={panelStyle("Sidebar")}>Sidebar</div>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={75}>
          <ResizablePanelGroup direction="vertical">
            <ResizablePanel defaultSize={60}>
              <div style={panelStyle("Editor", "hsl(var(--background))")}>Editor</div>
            </ResizablePanel>
            <ResizableHandle withHandle />
            <ResizablePanel defaultSize={40}>
              <div style={panelStyle("Terminal")}>Terminal</div>
            </ResizablePanel>
          </ResizablePanelGroup>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  ),
};

export const WithoutHandle: Story = {
  render: () => (
    <div style={{ height: 200, border: "1px solid hsl(var(--border))", borderRadius: 8, overflow: "hidden" }}>
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel defaultSize={50}>
          <div style={panelStyle("Left")}>Left (no grip)</div>
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel defaultSize={50}>
          <div style={panelStyle("Right")}>Right (no grip)</div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  ),
};
