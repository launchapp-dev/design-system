import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import {
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuCheckboxItem,
  ContextMenuRadioItem,
  ContextMenuLabel,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuGroup,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuRadioGroup,
} from "./index";

const meta: Meta<typeof ContextMenu> = {
  title: "Components/ContextMenu",
  component: ContextMenu,
  argTypes: {
    modal: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const TriggerArea = ({ children }: { children: React.ReactNode }) => (
  <div
    style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      height: "120px",
      borderRadius: "8px",
      border: "2px dashed hsl(var(--border))",
      color: "hsl(var(--muted-foreground))",
      fontSize: "13px",
      userSelect: "none",
    }}
  >
    {children}
  </div>
);

export const Default: Story = {
  render: () => (
    <div style={{ padding: "32px" }}>
      <ContextMenu>
        <ContextMenuTrigger asChild>
          <TriggerArea>Right-click here to open context menu</TriggerArea>
        </ContextMenuTrigger>
        <ContextMenuContent className="w-56">
          <ContextMenuLabel>Actions</ContextMenuLabel>
          <ContextMenuSeparator />
          <ContextMenuItem>
            Back <ContextMenuShortcut>⌘[</ContextMenuShortcut>
          </ContextMenuItem>
          <ContextMenuItem>
            Forward <ContextMenuShortcut>⌘]</ContextMenuShortcut>
          </ContextMenuItem>
          <ContextMenuItem>
            Reload <ContextMenuShortcut>⌘R</ContextMenuShortcut>
          </ContextMenuItem>
          <ContextMenuSeparator />
          <ContextMenuItem disabled>Save As...</ContextMenuItem>
          <ContextMenuItem>Print</ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>
    </div>
  ),
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ padding: "32px", display: "flex", flexDirection: "column", gap: "24px" }}>
      <div>
        <p style={{ fontSize: "12px", marginBottom: "8px", color: "hsl(var(--muted-foreground))" }}>With Checkbox Items</p>
        <CheckboxExample />
      </div>
      <div>
        <p style={{ fontSize: "12px", marginBottom: "8px", color: "hsl(var(--muted-foreground))" }}>With Radio Items</p>
        <RadioExample />
      </div>
      <div>
        <p style={{ fontSize: "12px", marginBottom: "8px", color: "hsl(var(--muted-foreground))" }}>With Sub Menu</p>
        <SubMenuExample />
      </div>
    </div>
  ),
};

function CheckboxExample() {
  const [showBookmarks, setShowBookmarks] = React.useState(true);
  const [showUrls, setShowUrls] = React.useState(false);
  return (
    <ContextMenu>
      <ContextMenuTrigger asChild>
        <TriggerArea>Right-click for checkbox items</TriggerArea>
      </ContextMenuTrigger>
      <ContextMenuContent className="w-56">
        <ContextMenuLabel>View Options</ContextMenuLabel>
        <ContextMenuSeparator />
        <ContextMenuCheckboxItem checked={showBookmarks} onCheckedChange={setShowBookmarks}>
          Show Bookmarks Bar
          <ContextMenuShortcut>⌘⇧B</ContextMenuShortcut>
        </ContextMenuCheckboxItem>
        <ContextMenuCheckboxItem checked={showUrls} onCheckedChange={setShowUrls}>
          Show Full URLs
        </ContextMenuCheckboxItem>
      </ContextMenuContent>
    </ContextMenu>
  );
}

function RadioExample() {
  const [person, setPerson] = React.useState("pedro");
  return (
    <ContextMenu>
      <ContextMenuTrigger asChild>
        <TriggerArea>Right-click for radio items</TriggerArea>
      </ContextMenuTrigger>
      <ContextMenuContent className="w-56">
        <ContextMenuLabel>People</ContextMenuLabel>
        <ContextMenuSeparator />
        <ContextMenuRadioGroup value={person} onValueChange={setPerson}>
          <ContextMenuRadioItem value="pedro">Pedro Duarte</ContextMenuRadioItem>
          <ContextMenuRadioItem value="colm">Colm Tuite</ContextMenuRadioItem>
          <ContextMenuRadioItem value="adam">Adam Wathan</ContextMenuRadioItem>
        </ContextMenuRadioGroup>
      </ContextMenuContent>
    </ContextMenu>
  );
}

function SubMenuExample() {
  return (
    <ContextMenu>
      <ContextMenuTrigger asChild>
        <TriggerArea>Right-click for sub-menu</TriggerArea>
      </ContextMenuTrigger>
      <ContextMenuContent className="w-56">
        <ContextMenuItem>New Tab</ContextMenuItem>
        <ContextMenuItem>New Window</ContextMenuItem>
        <ContextMenuSub>
          <ContextMenuSubTrigger>Share</ContextMenuSubTrigger>
          <ContextMenuSubContent>
            <ContextMenuItem>Email Link</ContextMenuItem>
            <ContextMenuItem>Message</ContextMenuItem>
            <ContextMenuSub>
              <ContextMenuSubTrigger>More</ContextMenuSubTrigger>
              <ContextMenuSubContent>
                <ContextMenuItem>Twitter</ContextMenuItem>
                <ContextMenuItem>Facebook</ContextMenuItem>
              </ContextMenuSubContent>
            </ContextMenuSub>
          </ContextMenuSubContent>
        </ContextMenuSub>
        <ContextMenuSeparator />
        <ContextMenuItem disabled>Inspect</ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
}

export const Interactive: Story = {
  render: () => {
    const [bookmarks, setBookmarks] = React.useState(true);
    const [theme, setTheme] = React.useState("system");
    const [lastAction, setLastAction] = React.useState<string | null>(null);
    return (
      <div style={{ padding: "32px", display: "flex", flexDirection: "column", gap: "16px" }}>
        <ContextMenu>
          <ContextMenuTrigger asChild>
            <TriggerArea>Right-click for full interactive menu</TriggerArea>
          </ContextMenuTrigger>
          <ContextMenuContent className="w-64">
            <ContextMenuLabel>Actions</ContextMenuLabel>
            <ContextMenuSeparator />
            <ContextMenuGroup>
              <ContextMenuItem onSelect={() => setLastAction("cut")}>
                Cut <ContextMenuShortcut>⌘X</ContextMenuShortcut>
              </ContextMenuItem>
              <ContextMenuItem onSelect={() => setLastAction("copy")}>
                Copy <ContextMenuShortcut>⌘C</ContextMenuShortcut>
              </ContextMenuItem>
              <ContextMenuItem onSelect={() => setLastAction("paste")}>
                Paste <ContextMenuShortcut>⌘V</ContextMenuShortcut>
              </ContextMenuItem>
            </ContextMenuGroup>
            <ContextMenuSeparator />
            <ContextMenuCheckboxItem checked={bookmarks} onCheckedChange={setBookmarks}>
              Show Bookmarks
            </ContextMenuCheckboxItem>
            <ContextMenuSeparator />
            <ContextMenuLabel>Theme</ContextMenuLabel>
            <ContextMenuRadioGroup value={theme} onValueChange={setTheme}>
              <ContextMenuRadioItem value="light">Light</ContextMenuRadioItem>
              <ContextMenuRadioItem value="dark">Dark</ContextMenuRadioItem>
              <ContextMenuRadioItem value="system">System</ContextMenuRadioItem>
            </ContextMenuRadioGroup>
          </ContextMenuContent>
        </ContextMenu>
        <p style={{ fontSize: "13px", color: "hsl(var(--muted-foreground))" }}>
          {lastAction ? `Last action: ${lastAction} · ` : ""}
          Bookmarks: {bookmarks ? "on" : "off"} · Theme: {theme}
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
    <div style={{ padding: "32px", background: "hsl(var(--background))" }}>
      <ContextMenu>
        <ContextMenuTrigger asChild>
          <TriggerArea>Right-click here (dark mode)</TriggerArea>
        </ContextMenuTrigger>
        <ContextMenuContent className="w-56">
          <ContextMenuLabel>Actions</ContextMenuLabel>
          <ContextMenuSeparator />
          <ContextMenuItem>
            Copy <ContextMenuShortcut>⌘C</ContextMenuShortcut>
          </ContextMenuItem>
          <ContextMenuItem>
            Paste <ContextMenuShortcut>⌘V</ContextMenuShortcut>
          </ContextMenuItem>
          <ContextMenuItem disabled>Disabled</ContextMenuItem>
          <ContextMenuSeparator />
          <ContextMenuItem>Delete</ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>
    </div>
  ),
};

export const EdgeCases: Story = {
  render: () => (
    <div style={{ padding: "32px", display: "flex", flexDirection: "column", gap: "24px" }}>
      <div>
        <p style={{ fontSize: "12px", marginBottom: "8px", color: "hsl(var(--muted-foreground))" }}>Inset labels</p>
        <ContextMenu>
          <ContextMenuTrigger asChild>
            <TriggerArea>Right-click (inset items)</TriggerArea>
          </ContextMenuTrigger>
          <ContextMenuContent className="w-56">
            <ContextMenuLabel inset>Section</ContextMenuLabel>
            <ContextMenuItem inset>Item with inset</ContextMenuItem>
            <ContextMenuItem inset disabled>Disabled inset</ContextMenuItem>
            <ContextMenuSeparator />
            <ContextMenuItem inset>Another item</ContextMenuItem>
          </ContextMenuContent>
        </ContextMenu>
      </div>
      <div>
        <p style={{ fontSize: "12px", marginBottom: "8px", color: "hsl(var(--muted-foreground))" }}>Many items</p>
        <ContextMenu>
          <ContextMenuTrigger asChild>
            <TriggerArea>Right-click (many items)</TriggerArea>
          </ContextMenuTrigger>
          <ContextMenuContent>
            {Array.from({ length: 8 }, (_, i) => (
              <ContextMenuItem key={i}>Item {i + 1}</ContextMenuItem>
            ))}
          </ContextMenuContent>
        </ContextMenu>
      </div>
    </div>
  ),
};
