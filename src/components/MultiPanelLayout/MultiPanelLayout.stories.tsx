import type { Meta, StoryObj } from "@storybook/react";
import type * as React from "react";
import { MultiPanelLayout } from "./index";

const panelStyle = (_label: string, bg = "hsl(var(--muted))"): React.CSSProperties => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  background: bg,
  fontSize: 13,
  fontWeight: 500,
  color: "hsl(var(--muted-foreground))",
  height: "100%",
  userSelect: "none",
  padding: "1rem",
});

const meta: Meta<typeof MultiPanelLayout> = {
  title: "Components/MultiPanelLayout",
  component: MultiPanelLayout,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
  decorators: [
    (Story) => (
      <div className="h-[400px] w-full overflow-hidden rounded-lg border border-[hsl(var(--la-border))]">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof MultiPanelLayout>;

export const Default: Story = {
  args: {
    panels: [
      {
        id: "sidebar",
        header: "Sidebar",
        children: <div style={panelStyle("Sidebar")}>Sidebar content</div>,
        defaultSize: 25,
        minSize: 15,
      },
      {
        id: "main",
        header: "Main",
        children: <div style={panelStyle("Main", "hsl(var(--background))")}>Main content</div>,
        defaultSize: 50,
        minSize: 30,
      },
      {
        id: "detail",
        header: "Detail",
        children: <div style={panelStyle("Detail")}>Detail panel</div>,
        defaultSize: 25,
        minSize: 10,
      },
    ],
    direction: "horizontal",
    resizable: true,
    showHandles: true,
  },
};

export const Vertical: Story = {
  args: {
    panels: [
      {
        id: "top",
        header: "Top",
        children: <div style={panelStyle("Top")}>Top panel</div>,
        defaultSize: 40,
      },
      {
        id: "middle",
        header: "Middle",
        children: <div style={panelStyle("Middle", "hsl(var(--background))")}>Middle panel</div>,
        defaultSize: 35,
      },
      {
        id: "bottom",
        header: "Bottom",
        children: <div style={panelStyle("Bottom")}>Bottom panel</div>,
        defaultSize: 25,
      },
    ],
    direction: "vertical",
    resizable: true,
    showHandles: true,
  },
};

export const TwoPanel: Story = {
  args: {
    panels: [
      {
        id: "left",
        header: "Explorer",
        children: <div style={panelStyle("Explorer")}>File explorer</div>,
        defaultSize: 30,
        minSize: 10,
      },
      {
        id: "right",
        header: "Editor",
        children: <div style={panelStyle("Editor", "hsl(var(--background))")}>Code editor</div>,
        defaultSize: 70,
        minSize: 30,
      },
    ],
    direction: "horizontal",
    resizable: true,
    showHandles: true,
    handleWithHandleIndicator: true,
  },
};

export const WithoutHandles: Story = {
  args: {
    panels: [
      {
        id: "p1",
        children: <div style={panelStyle("Panel 1")}>Fixed panel 1</div>,
        defaultSize: 33,
      },
      {
        id: "p2",
        children: <div style={panelStyle("Panel 2", "hsl(var(--background))")}>Fixed panel 2</div>,
        defaultSize: 34,
      },
      {
        id: "p3",
        children: <div style={panelStyle("Panel 3")}>Fixed panel 3</div>,
        defaultSize: 33,
      },
    ],
    direction: "horizontal",
    resizable: false,
    showHandles: false,
  },
};

export const NonResizablePanels: Story = {
  args: {
    panels: [
      {
        id: "sidebar",
        header: "Sidebar",
        children: <div style={panelStyle("Sidebar")}>Sidebar</div>,
        defaultSize: 20,
        minSize: 20,
        maxSize: 20,
      },
      {
        id: "main",
        header: "Content",
        children: <div style={panelStyle("Main", "hsl(var(--background))")}>Main content</div>,
        defaultSize: 60,
      },
      {
        id: "aside",
        header: "Aside",
        children: <div style={panelStyle("Aside")}>Aside</div>,
        defaultSize: 20,
        minSize: 20,
        maxSize: 20,
      },
    ],
    direction: "horizontal",
    resizable: true,
    showHandles: true,
  },
};

export const WithFooters: Story = {
  args: {
    panels: [
      {
        id: "files",
        header: "Files",
        footer: "12 items",
        children: <div style={panelStyle("Files")}>File tree</div>,
        defaultSize: 25,
      },
      {
        id: "editor",
        header: "Editor",
        footer: "main.ts — UTF-8",
        children: <div style={panelStyle("Editor", "hsl(var(--background))")}>Code content</div>,
        defaultSize: 50,
      },
      {
        id: "output",
        header: "Output",
        footer: "Ready",
        children: <div style={panelStyle("Output")}>Console output</div>,
        defaultSize: 25,
      },
    ],
    direction: "horizontal",
    resizable: true,
    showHandles: true,
    handleWithHandleIndicator: true,
  },
};

export const FourPanels: Story = {
  args: {
    panels: [
      {
        id: "p1",
        children: <div style={panelStyle("P1")}>Panel 1</div>,
        defaultSize: 25,
      },
      {
        id: "p2",
        children: <div style={panelStyle("P2", "hsl(var(--background))")}>Panel 2</div>,
        defaultSize: 25,
      },
      {
        id: "p3",
        children: <div style={panelStyle("P3")}>Panel 3</div>,
        defaultSize: 25,
      },
      {
        id: "p4",
        children: <div style={panelStyle("P4")}>Panel 4</div>,
        defaultSize: 25,
      },
    ],
    direction: "horizontal",
    resizable: true,
    showHandles: true,
  },
};

export const DarkMode: Story = {
  decorators: [
    (Story) => (
      <div className="dark h-[400px] w-full overflow-hidden rounded-lg border border-[hsl(var(--la-border))]">
        <Story />
      </div>
    ),
  ],
  args: {
    panels: [
      {
        id: "sidebar",
        header: "Sidebar",
        children: <div style={panelStyle("Sidebar")}>Sidebar content</div>,
        defaultSize: 25,
      },
      {
        id: "main",
        header: "Main",
        children: <div style={panelStyle("Main", "hsl(var(--background))")}>Main content</div>,
        defaultSize: 50,
      },
      {
        id: "detail",
        header: "Detail",
        children: <div style={panelStyle("Detail")}>Detail panel</div>,
        defaultSize: 25,
      },
    ],
    direction: "horizontal",
    resizable: true,
    showHandles: true,
  },
};
