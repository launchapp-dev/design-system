import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import { FocusScope } from "./index";

const meta = {
  title: "Utility/FocusScope",
  component: FocusScope,
} satisfies Meta<typeof FocusScope>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Trapped: Story = {
  render: () => {
    const [open, setOpen] = React.useState(false);
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        <button onClick={() => setOpen(true)}>Open trapped focus scope</button>
        {open && (
          <FocusScope trapped loop>
            <div
              style={{
                border: "2px solid #3b82f6",
                padding: "20px",
                borderRadius: "8px",
                display: "flex",
                flexDirection: "column",
                gap: "12px",
              }}
            >
              <p style={{ margin: 0, fontWeight: 600 }}>Focus is trapped here</p>
              <input type="text" placeholder="First input" style={{ padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }} />
              <input type="text" placeholder="Second input" style={{ padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }} />
              <button onClick={() => setOpen(false)}>Close (releases focus)</button>
            </div>
          </FocusScope>
        )}
      </div>
    );
  },
};

export const WithAutoFocus: Story = {
  render: () => {
    const [open, setOpen] = React.useState(false);
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        <button onClick={() => setOpen((v) => !v)}>
          {open ? "Unmount" : "Mount"} FocusScope
        </button>
        {open && (
          <FocusScope
            onMountAutoFocus={(e) => {
              e.preventDefault();
              (document.getElementById("named-input") as HTMLInputElement)?.focus();
            }}
          >
            <div
              style={{
                border: "2px solid #22c55e",
                padding: "20px",
                borderRadius: "8px",
                display: "flex",
                flexDirection: "column",
                gap: "12px",
              }}
            >
              <input type="text" placeholder="First" style={{ padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }} />
              <input id="named-input" type="text" placeholder="Auto-focused on mount" style={{ padding: "8px", borderRadius: "4px", border: "1px solid #22c55e" }} />
            </div>
          </FocusScope>
        )}
      </div>
    );
  },
};
