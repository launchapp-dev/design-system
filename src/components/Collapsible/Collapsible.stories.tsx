import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "./index";

const meta: Meta<typeof Collapsible> = {
  title: "Components/Collapsible",
  component: Collapsible,
  argTypes: {
    defaultOpen: { control: "boolean" },
    disabled: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const ChevronIcon = ({ open }: { open: boolean }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}
    aria-hidden="true"
  >
    <path d="m6 9 6 6 6-6" />
  </svg>
);

export const Default: Story = {
  render: () => {
    const [open, setOpen] = React.useState(false);
    return (
      <Collapsible open={open} onOpenChange={setOpen} style={{ width: 360 }}>
        <div className="flex items-center justify-between space-x-4 px-4">
          <h4 className="text-sm font-semibold">Expandable Section</h4>
          <CollapsibleTrigger asChild>
            <button
              className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-border bg-background hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              aria-label={open ? "Collapse" : "Expand"}
            >
              <ChevronIcon open={open} />
            </button>
          </CollapsibleTrigger>
        </div>
        <div className="rounded-md border border-border px-4 py-2 font-mono text-sm mt-2">
          @radix-ui/react-collapsible
        </div>
        <CollapsibleContent className="space-y-2 mt-2">
          <div className="rounded-md border border-border px-4 py-2 font-mono text-sm">
            @radix-ui/react-accordion
          </div>
          <div className="rounded-md border border-border px-4 py-2 font-mono text-sm">
            @radix-ui/react-dialog
          </div>
          <div className="rounded-md border border-border px-4 py-2 font-mono text-sm">
            @radix-ui/react-dropdown-menu
          </div>
        </CollapsibleContent>
      </Collapsible>
    );
  },
};

export const AllVariants: Story = {
  render: () => {
    const [open1, setOpen1] = React.useState(false);
    const [open2, setOpen2] = React.useState(true);
    const [open3, setOpen3] = React.useState(false);
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "32px", width: 420 }}>
        <div>
          <p style={{ fontSize: "12px", marginBottom: "8px", fontWeight: 500 }}>
            Icon Button Trigger
          </p>
          <Collapsible open={open1} onOpenChange={setOpen1}>
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-semibold">Dependencies</h4>
              <CollapsibleTrigger asChild>
                <button
                  className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-border bg-background hover:bg-accent"
                  aria-label={open1 ? "Collapse" : "Expand"}
                >
                  <ChevronIcon open={open1} />
                </button>
              </CollapsibleTrigger>
            </div>
            <CollapsibleContent className="mt-2 space-y-1">
              {["react", "typescript", "tailwindcss"].map((dep) => (
                <div
                  key={dep}
                  className="rounded-md border border-border px-3 py-2 font-mono text-sm"
                >
                  {dep}
                </div>
              ))}
            </CollapsibleContent>
          </Collapsible>
        </div>

        <div>
          <p style={{ fontSize: "12px", marginBottom: "8px", fontWeight: 500 }}>
            Text Link Trigger (open by default)
          </p>
          <Collapsible open={open2} onOpenChange={setOpen2}>
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-semibold">Project Details</h4>
              <CollapsibleTrigger asChild>
                <button className="text-sm text-muted-foreground underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded">
                  {open2 ? "Show less" : "Show more"}
                </button>
              </CollapsibleTrigger>
            </div>
            <CollapsibleContent className="mt-3 space-y-2 text-sm text-muted-foreground">
              <p>This design system is built with React, TypeScript, and Tailwind CSS.</p>
              <p>It uses Radix UI primitives to ensure accessibility compliance out of the box.</p>
            </CollapsibleContent>
          </Collapsible>
        </div>

        <div>
          <p style={{ fontSize: "12px", marginBottom: "8px", fontWeight: 500 }}>
            Full-width Header Trigger
          </p>
          <Collapsible open={open3} onOpenChange={setOpen3}>
            <CollapsibleTrigger asChild>
              <button className="flex w-full items-center justify-between rounded-md border border-border px-4 py-3 text-sm font-medium hover:bg-muted/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                <span>Advanced Settings</span>
                <ChevronIcon open={open3} />
              </button>
            </CollapsibleTrigger>
            <CollapsibleContent className="border border-t-0 border-border rounded-b-md px-4 py-3 space-y-2 text-sm text-muted-foreground">
              <p>Configure advanced options for this component.</p>
              <p>These settings override default behavior.</p>
            </CollapsibleContent>
          </Collapsible>
        </div>
      </div>
    );
  },
};

export const AllSizes: Story = {
  render: () => {
    const [openStates, setOpenStates] = React.useState({ sm: false, md: false, lg: false });
    const toggle = (key: keyof typeof openStates) =>
      setOpenStates((s) => ({ ...s, [key]: !s[key] }));
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
        <div>
          <p style={{ fontSize: "12px", marginBottom: "8px", fontWeight: 500 }}>Narrow (300px)</p>
          <Collapsible
            open={openStates.sm}
            onOpenChange={() => toggle("sm")}
            style={{ width: 300 }}
          >
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold">Section</span>
              <CollapsibleTrigger asChild>
                <button className="inline-flex h-7 w-7 items-center justify-center rounded border border-border text-xs hover:bg-muted">
                  <ChevronIcon open={openStates.sm} />
                </button>
              </CollapsibleTrigger>
            </div>
            <CollapsibleContent className="mt-2 text-sm text-muted-foreground">
              Narrow content area. Text wraps sooner.
            </CollapsibleContent>
          </Collapsible>
        </div>

        <div>
          <p style={{ fontSize: "12px", marginBottom: "8px", fontWeight: 500 }}>Medium (480px)</p>
          <Collapsible
            open={openStates.md}
            onOpenChange={() => toggle("md")}
            style={{ width: 480 }}
          >
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold">Section</span>
              <CollapsibleTrigger asChild>
                <button className="inline-flex h-8 w-8 items-center justify-center rounded border border-border hover:bg-muted">
                  <ChevronIcon open={openStates.md} />
                </button>
              </CollapsibleTrigger>
            </div>
            <CollapsibleContent className="mt-2 text-sm text-muted-foreground">
              Medium content area with more horizontal room for text.
            </CollapsibleContent>
          </Collapsible>
        </div>

        <div>
          <p style={{ fontSize: "12px", marginBottom: "8px", fontWeight: 500 }}>Wide (640px)</p>
          <Collapsible
            open={openStates.lg}
            onOpenChange={() => toggle("lg")}
            style={{ width: 640 }}
          >
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold">Section</span>
              <CollapsibleTrigger asChild>
                <button className="inline-flex h-9 w-9 items-center justify-center rounded border border-border hover:bg-muted">
                  <ChevronIcon open={openStates.lg} />
                </button>
              </CollapsibleTrigger>
            </div>
            <CollapsibleContent className="mt-2 text-sm text-muted-foreground">
              Wide content area. Works well for dashboards or sidebars at larger breakpoints.
            </CollapsibleContent>
          </Collapsible>
        </div>
      </div>
    );
  },
};

export const Interactive: Story = {
  args: {
    defaultOpen: false,
    disabled: false,
  },
  render: (args) => (
    <Collapsible {...args} style={{ width: 360 }}>
      <div className="flex items-center justify-between">
        <h4 className="text-sm font-semibold">Interactive Collapsible</h4>
        <CollapsibleTrigger asChild>
          <button
            className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-border bg-background hover:bg-accent disabled:opacity-50"
            disabled={args.disabled}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="m6 9 6 6 6-6" />
            </svg>
          </button>
        </CollapsibleTrigger>
      </div>
      <CollapsibleContent className="mt-2 space-y-1 text-sm text-muted-foreground">
        <p>Toggle defaultOpen and disabled using the controls panel.</p>
        <p>The disabled prop prevents the trigger from opening or closing content.</p>
      </CollapsibleContent>
    </Collapsible>
  ),
};

export const DarkMode: Story = {
  decorators: [
    (Story) => (
      <div className="dark bg-background p-6 rounded-lg">
        <Story />
      </div>
    ),
  ],
  render: () => {
    const [open, setOpen] = React.useState(false);
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "24px", width: 400 }}>
        <Collapsible open={open} onOpenChange={setOpen}>
          <div className="flex items-center justify-between space-x-4 px-4">
            <h4 className="text-sm font-semibold">Dark Mode Section</h4>
            <CollapsibleTrigger asChild>
              <button
                className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-border bg-background hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                aria-label={open ? "Collapse" : "Expand"}
              >
                <ChevronIcon open={open} />
              </button>
            </CollapsibleTrigger>
          </div>
          <div className="rounded-md border border-border px-4 py-2 font-mono text-sm mt-2">
            @radix-ui/react-collapsible
          </div>
          <CollapsibleContent className="space-y-2 mt-2">
            <div className="rounded-md border border-border px-4 py-2 font-mono text-sm">
              @radix-ui/react-accordion
            </div>
            <div className="rounded-md border border-border px-4 py-2 font-mono text-sm">
              @radix-ui/react-dialog
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>
    );
  },
};
