import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "./index";

const meta: Meta<typeof DropdownMenu> = {
  title: "Components/DropdownMenu",
  component: DropdownMenu,
  argTypes: {
    open: { control: "boolean" },
    modal: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div style={{ display: "flex", justifyContent: "center", padding: "80px" }}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button
            style={{
              padding: "8px 16px",
              border: "1px solid hsl(var(--border))",
              borderRadius: "6px",
              background: "hsl(var(--background))",
              cursor: "pointer",
            }}
          >
            Open Menu
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            Profile
            <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            Billing
            <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            Settings
            <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Log out</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  ),
};

export const AllVariants: Story = {
  render: () => (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "32px",
        justifyContent: "center",
        padding: "16px",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "8px",
        }}
      >
        <span style={{ fontSize: "12px", color: "var(--muted-foreground)" }}>
          Basic Items
        </span>
        <DropdownMenu defaultOpen>
          <DropdownMenuTrigger asChild>
            <button
              style={{
                padding: "8px 16px",
                border: "1px solid hsl(var(--border))",
                borderRadius: "6px",
                background: "hsl(var(--background))",
                cursor: "pointer",
              }}
            >
              Basic
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent style={{ position: "relative" }}>
            <DropdownMenuLabel>Section</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Item One</DropdownMenuItem>
            <DropdownMenuItem>Item Two</DropdownMenuItem>
            <DropdownMenuItem disabled>Disabled Item</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              Item with Shortcut <DropdownMenuShortcut>⌘K</DropdownMenuShortcut>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "8px",
        }}
      >
        <span style={{ fontSize: "12px", color: "var(--muted-foreground)" }}>
          Checkbox Items
        </span>
        <CheckboxMenuExample />
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "8px",
        }}
      >
        <span style={{ fontSize: "12px", color: "var(--muted-foreground)" }}>
          Radio Items
        </span>
        <RadioMenuExample />
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "8px",
        }}
      >
        <span style={{ fontSize: "12px", color: "var(--muted-foreground)" }}>
          Sub Menu
        </span>
        <DropdownMenu defaultOpen>
          <DropdownMenuTrigger asChild>
            <button
              style={{
                padding: "8px 16px",
                border: "1px solid hsl(var(--border))",
                borderRadius: "6px",
                background: "hsl(var(--background))",
                cursor: "pointer",
              }}
            >
              Sub Menu
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>Item One</DropdownMenuItem>
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>More Options</DropdownMenuSubTrigger>
              <DropdownMenuSubContent>
                <DropdownMenuItem>Sub Item A</DropdownMenuItem>
                <DropdownMenuItem>Sub Item B</DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuSub>
            <DropdownMenuItem>Item Two</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  ),
};

function CheckboxMenuExample() {
  const [showStatus, setShowStatus] = React.useState(true);
  const [showPanel, setShowPanel] = React.useState(false);
  return (
    <DropdownMenu defaultOpen>
      <DropdownMenuTrigger asChild>
        <button
          style={{
            padding: "8px 16px",
            border: "1px solid hsl(var(--border))",
            borderRadius: "6px",
            background: "hsl(var(--background))",
            cursor: "pointer",
          }}
        >
          Checkboxes
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>View Options</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuCheckboxItem
          checked={showStatus}
          onCheckedChange={setShowStatus}
        >
          Show Status Bar
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          checked={showPanel}
          onCheckedChange={setShowPanel}
        >
          Show Panel
        </DropdownMenuCheckboxItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function RadioMenuExample() {
  const [position, setPosition] = React.useState("bottom");
  return (
    <DropdownMenu defaultOpen>
      <DropdownMenuTrigger asChild>
        <button
          style={{
            padding: "8px 16px",
            border: "1px solid hsl(var(--border))",
            borderRadius: "6px",
            background: "hsl(var(--background))",
            cursor: "pointer",
          }}
        >
          Radio
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Panel Position</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup value={position} onValueChange={setPosition}>
          <DropdownMenuRadioItem value="top">Top</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="bottom">Bottom</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="right">Right</DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export const AllSizes: Story = {
  render: () => (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "32px",
        justifyContent: "center",
        padding: "16px",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "8px",
        }}
      >
        <span style={{ fontSize: "12px", color: "var(--muted-foreground)" }}>
          Compact (w-32)
        </span>
        <DropdownMenu defaultOpen>
          <DropdownMenuTrigger asChild>
            <button
              style={{
                padding: "8px 16px",
                border: "1px solid hsl(var(--border))",
                borderRadius: "6px",
                background: "hsl(var(--background))",
                cursor: "pointer",
              }}
            >
              Compact
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-32">
            <DropdownMenuItem>Edit</DropdownMenuItem>
            <DropdownMenuItem>Copy</DropdownMenuItem>
            <DropdownMenuItem>Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "8px",
        }}
      >
        <span style={{ fontSize: "12px", color: "var(--muted-foreground)" }}>
          Default (w-56)
        </span>
        <DropdownMenu defaultOpen>
          <DropdownMenuTrigger asChild>
            <button
              style={{
                padding: "8px 16px",
                border: "1px solid hsl(var(--border))",
                borderRadius: "6px",
                background: "hsl(var(--background))",
                cursor: "pointer",
              }}
            >
              Default
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuLabel>Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile Settings</DropdownMenuItem>
            <DropdownMenuItem>Notifications</DropdownMenuItem>
            <DropdownMenuItem>Log out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "8px",
        }}
      >
        <span style={{ fontSize: "12px", color: "var(--muted-foreground)" }}>
          Wide (w-72)
        </span>
        <DropdownMenu defaultOpen>
          <DropdownMenuTrigger asChild>
            <button
              style={{
                padding: "8px 16px",
                border: "1px solid hsl(var(--border))",
                borderRadius: "6px",
                background: "hsl(var(--background))",
                cursor: "pointer",
              }}
            >
              Wide
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-72">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              Export as CSV
              <DropdownMenuShortcut>⌘E</DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuItem>
              Duplicate Record
              <DropdownMenuShortcut>⌘D</DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Archive</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  ),
};

export const Interactive: Story = {
  render: () => {
    const [checked, setChecked] = React.useState(false);
    const [radioValue, setRadioValue] = React.useState("light");
    const [lastAction, setLastAction] = React.useState<string | null>(null);

    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "16px",
          padding: "80px",
        }}
      >
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              style={{
                padding: "8px 16px",
                border: "1px solid hsl(var(--border))",
                borderRadius: "6px",
                background: "hsl(var(--background))",
                cursor: "pointer",
              }}
            >
              Open Interactive Menu
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuLabel>Preferences</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuCheckboxItem
                checked={checked}
                onCheckedChange={setChecked}
              >
                Enable notifications
              </DropdownMenuCheckboxItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuLabel>Theme</DropdownMenuLabel>
            <DropdownMenuRadioGroup
              value={radioValue}
              onValueChange={setRadioValue}
            >
              <DropdownMenuRadioItem value="light">Light</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="dark">Dark</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="system">
                System
              </DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem onSelect={() => setLastAction("profile")}>
              View Profile
            </DropdownMenuItem>
            <DropdownMenuItem onSelect={() => setLastAction("logout")}>
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        {lastAction && (
          <p style={{ fontSize: "13px", color: "var(--muted-foreground)" }}>
            Last action: {lastAction}
          </p>
        )}
        <p style={{ fontSize: "13px", color: "var(--muted-foreground)" }}>
          Notifications: {checked ? "on" : "off"} · Theme: {radioValue}
        </p>
      </div>
    );
  },
};

export const DarkMode: Story = {
  parameters: {
    globals: { theme: "dark" },
  },
  render: () => (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        padding: "80px",
        background: "hsl(var(--background))",
      }}
    >
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button
            style={{
              padding: "8px 16px",
              border: "1px solid hsl(var(--border))",
              borderRadius: "6px",
              background: "hsl(var(--background))",
              color: "hsl(var(--foreground))",
              cursor: "pointer",
            }}
          >
            Open Menu
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            Profile
            <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            Billing
            <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem disabled>Disabled Option</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Log out</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  ),
};

export const EdgeCases: Story = {
  render: () => (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "32px",
        justifyContent: "center",
        padding: "16px",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "8px",
        }}
      >
        <span style={{ fontSize: "12px", color: "var(--muted-foreground)" }}>
          Long Labels
        </span>
        <DropdownMenu defaultOpen>
          <DropdownMenuTrigger asChild>
            <button
              style={{
                padding: "8px 16px",
                border: "1px solid hsl(var(--border))",
                borderRadius: "6px",
                background: "hsl(var(--background))",
                cursor: "pointer",
              }}
            >
              Long Text
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>
              A very long menu item label that tests overflow
            </DropdownMenuItem>
            <DropdownMenuItem>Short item</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "8px",
        }}
      >
        <span style={{ fontSize: "12px", color: "var(--muted-foreground)" }}>
          All Disabled
        </span>
        <DropdownMenu defaultOpen>
          <DropdownMenuTrigger asChild>
            <button
              style={{
                padding: "8px 16px",
                border: "1px solid hsl(var(--border))",
                borderRadius: "6px",
                background: "hsl(var(--background))",
                cursor: "pointer",
              }}
            >
              Disabled
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem disabled>Cannot click</DropdownMenuItem>
            <DropdownMenuItem disabled>Also disabled</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem disabled>Disabled too</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "8px",
        }}
      >
        <span style={{ fontSize: "12px", color: "var(--muted-foreground)" }}>
          Grouped
        </span>
        <DropdownMenu defaultOpen>
          <DropdownMenuTrigger asChild>
            <button
              style={{
                padding: "8px 16px",
                border: "1px solid hsl(var(--border))",
                borderRadius: "6px",
                background: "hsl(var(--background))",
                cursor: "pointer",
              }}
            >
              Groups
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-48">
            <DropdownMenuGroup>
              <DropdownMenuLabel>Group A</DropdownMenuLabel>
              <DropdownMenuItem>A1</DropdownMenuItem>
              <DropdownMenuItem>A2</DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuLabel>Group B</DropdownMenuLabel>
              <DropdownMenuItem>B1</DropdownMenuItem>
              <DropdownMenuItem>B2</DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  ),
};
