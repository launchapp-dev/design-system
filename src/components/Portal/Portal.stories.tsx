import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import { Portal } from "./index";

const meta = {
  title: "Utility/Portal",
  component: Portal,
} satisfies Meta<typeof Portal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    const [open, setOpen] = React.useState(false);
    return (
      <div>
        <button onClick={() => setOpen((v) => !v)}>
          {open ? "Hide portal content" : "Show portal content"}
        </button>
        {open && (
          <Portal>
            <div
              style={{
                position: "fixed",
                bottom: "24px",
                right: "24px",
                background: "#18181b",
                color: "#fafafa",
                padding: "12px 20px",
                borderRadius: "8px",
                zIndex: 9999,
              }}
            >
              Rendered in document.body via Portal
            </div>
          </Portal>
        )}
      </div>
    );
  },
};

export const WithCustomContainer: Story = {
  render: () => {
    const containerRef = React.useRef<HTMLDivElement>(null);
    const [open, setOpen] = React.useState(false);
    return (
      <div style={{ display: "flex", gap: "24px" }}>
        <div>
          <button onClick={() => setOpen((v) => !v)}>
            {open ? "Hide" : "Show"} in custom container
          </button>
        </div>
        <div
          ref={containerRef}
          style={{
            border: "2px dashed #71717a",
            padding: "12px",
            minWidth: "200px",
            minHeight: "60px",
            borderRadius: "6px",
          }}
        >
          <p style={{ margin: 0, fontSize: "12px", color: "#71717a" }}>
            Custom container
          </p>
          {open && containerRef.current && (
            <Portal container={containerRef.current}>
              <p style={{ margin: "8px 0 0" }}>Portal content here</p>
            </Portal>
          )}
        </div>
      </div>
    );
  },
};
