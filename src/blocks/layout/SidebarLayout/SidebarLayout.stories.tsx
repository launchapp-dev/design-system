import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import { SidebarLayout } from "./SidebarLayout";

const meta: Meta<typeof SidebarLayout> = {
  title: "Blocks/Layout/SidebarLayout",
  component: SidebarLayout,
  parameters: { layout: "fullscreen" },
};

export default meta;
type Story = StoryObj<typeof SidebarLayout>;

const mockNav = (
  <nav className="flex flex-col gap-1 p-4" aria-label="Main navigation">
    <div className="mb-4 px-2 py-1.5 text-sm font-semibold text-muted-foreground">Navigation</div>
    {["Dashboard", "Projects", "Team", "Settings"].map((item) => (
      <button
        key={item}
        type="button"
        className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium hover:bg-muted data-[active]:bg-primary/10 data-[active]:text-primary"
        data-active={item === "Dashboard" ? true : undefined}
      >
        <span aria-hidden="true">•</span>
        {item}
      </button>
    ))}
  </nav>
);

export const App: Story = {
  render: () => (
    <SidebarLayout
      sidebar={mockNav}
      header={<div className="text-sm font-medium">App Header</div>}
    >
      <div className="space-y-4">
        <h2 className="text-lg font-semibold">Main Content</h2>
        <p className="text-muted-foreground">The sidebar layout provides navigation and a content area.</p>
      </div>
    </SidebarLayout>
  ),
};

export const Collapsible: Story = {
  render: () => {
    const [open, setOpen] = React.useState(false);
    return (
      <SidebarLayout
        sidebarCollapsible
        mobileSidebarOpen={open}
        onMobileSidebarClose={() => setOpen(false)}
        sidebar={mockNav}
        header={
          <div className="flex items-center gap-4">
            <button type="button" onClick={() => setOpen(true)} className="flex h-9 w-9 items-center justify-center rounded-md border border-border hover:bg-muted lg:hidden" aria-label="Open sidebar">
              <span>☰</span>
            </button>
            <span className="text-sm font-medium">Collapsible Sidebar</span>
          </div>
        }
      >
        <div className="space-y-4">
          <h2 className="text-lg font-semibold">Content Area</h2>
          <p className="text-muted-foreground">Resize the window to see the mobile sidebar behavior.</p>
        </div>
      </SidebarLayout>
    );
  },
};

export const Docs: Story = {
  render: () => (
    <SidebarLayout variant="docs" sidebar={mockNav}>
      <div className="space-y-4">
        <h2 className="text-lg font-semibold">Documentation Content</h2>
        <p className="text-muted-foreground">Docs variant has muted sidebar background.</p>
      </div>
    </SidebarLayout>
  ),
};

export const DarkMode: Story = {
  render: () => (
    <div className="dark" style={{ background: "hsl(240 10% 3.9%)", minHeight: "100vh" }}>
      <SidebarLayout sidebar={mockNav}>
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-white">Main Content</h2>
          <p className="text-muted-foreground">Dark mode sidebar layout.</p>
        </div>
      </SidebarLayout>
    </div>
  ),
};