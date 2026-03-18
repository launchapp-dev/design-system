import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "./index";

const meta: Meta = {
  title: "Components/Collapsible",
};

export default meta;
type Story = StoryObj<typeof meta>;

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

export const WithDescription: Story = {
  render: () => {
    const [open, setOpen] = React.useState(true);
    return (
      <Collapsible open={open} onOpenChange={setOpen} style={{ width: 400 }}>
        <div className="flex items-center justify-between">
          <h4 className="text-sm font-semibold">Project Details</h4>
          <CollapsibleTrigger asChild>
            <button className="text-sm text-muted-foreground underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded">
              {open ? "Show less" : "Show more"}
            </button>
          </CollapsibleTrigger>
        </div>
        <CollapsibleContent className="mt-3 space-y-2 text-sm text-muted-foreground">
          <p>This design system is built with React, TypeScript, and Tailwind CSS.</p>
          <p>It uses Radix UI primitives to ensure accessibility compliance out of the box.</p>
          <p>Components follow the CVA pattern for consistent variant management.</p>
        </CollapsibleContent>
      </Collapsible>
    );
  },
};
