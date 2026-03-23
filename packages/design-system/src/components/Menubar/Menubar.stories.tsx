import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import {
  MenubarRoot,
  MenubarMenu,
  MenubarTrigger,
  MenubarContent,
  MenubarItem,
  MenubarCheckboxItem,
  MenubarRadioItem,
  MenubarLabel,
  MenubarSeparator,
  MenubarShortcut,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarRadioGroup,
} from "./index";

const meta: Meta<typeof MenubarRoot> = {
  title: "Components/Menubar",
  component: MenubarRoot,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div style={{ padding: "32px" }}>
      <MenubarRoot>
        <MenubarMenu>
          <MenubarTrigger>File</MenubarTrigger>
          <MenubarContent>
            <MenubarItem>
              New Tab <MenubarShortcut>⌘T</MenubarShortcut>
            </MenubarItem>
            <MenubarItem>
              New Window <MenubarShortcut>⌘N</MenubarShortcut>
            </MenubarItem>
            <MenubarItem disabled>New Incognito Window</MenubarItem>
            <MenubarSeparator />
            <MenubarItem>
              Share <MenubarShortcut>⌘S</MenubarShortcut>
            </MenubarItem>
            <MenubarSeparator />
            <MenubarItem>
              Print <MenubarShortcut>⌘P</MenubarShortcut>
            </MenubarItem>
          </MenubarContent>
        </MenubarMenu>
        <MenubarMenu>
          <MenubarTrigger>Edit</MenubarTrigger>
          <MenubarContent>
            <MenubarItem>
              Undo <MenubarShortcut>⌘Z</MenubarShortcut>
            </MenubarItem>
            <MenubarItem>
              Redo <MenubarShortcut>⇧⌘Z</MenubarShortcut>
            </MenubarItem>
            <MenubarSeparator />
            <MenubarItem>
              Cut <MenubarShortcut>⌘X</MenubarShortcut>
            </MenubarItem>
            <MenubarItem>
              Copy <MenubarShortcut>⌘C</MenubarShortcut>
            </MenubarItem>
            <MenubarItem>
              Paste <MenubarShortcut>⌘V</MenubarShortcut>
            </MenubarItem>
          </MenubarContent>
        </MenubarMenu>
        <MenubarMenu>
          <MenubarTrigger>View</MenubarTrigger>
          <MenubarContent>
            <MenubarItem>Always Show Bookmarks Bar</MenubarItem>
            <MenubarItem>Always Show Full URLs</MenubarItem>
            <MenubarSeparator />
            <MenubarItem>
              Reload <MenubarShortcut>⌘R</MenubarShortcut>
            </MenubarItem>
            <MenubarItem disabled>
              Force Reload <MenubarShortcut>⇧⌘R</MenubarShortcut>
            </MenubarItem>
            <MenubarSeparator />
            <MenubarItem>Toggle Fullscreen</MenubarItem>
            <MenubarSeparator />
            <MenubarItem>Hide Sidebar</MenubarItem>
          </MenubarContent>
        </MenubarMenu>
      </MenubarRoot>
    </div>
  ),
};

export const AllVariants: Story = {
  render: () => {
    const [bookmarks, setBookmarks] = React.useState(true);
    const [urls, setUrls] = React.useState(false);
    const [person, setPerson] = React.useState("pedro");

    return (
      <div style={{ padding: "32px" }}>
        <MenubarRoot>
          <MenubarMenu>
            <MenubarTrigger>File</MenubarTrigger>
            <MenubarContent>
              <MenubarLabel>Application</MenubarLabel>
              <MenubarItem>
                New Tab <MenubarShortcut>⌘T</MenubarShortcut>
              </MenubarItem>
              <MenubarItem disabled>Save (disabled)</MenubarItem>
              <MenubarSeparator />
              <MenubarSub>
                <MenubarSubTrigger>Share</MenubarSubTrigger>
                <MenubarSubContent>
                  <MenubarItem>Email Link</MenubarItem>
                  <MenubarItem>Messages</MenubarItem>
                  <MenubarItem>Notes</MenubarItem>
                </MenubarSubContent>
              </MenubarSub>
              <MenubarSeparator />
              <MenubarItem>
                Quit <MenubarShortcut>⌘Q</MenubarShortcut>
              </MenubarItem>
            </MenubarContent>
          </MenubarMenu>

          <MenubarMenu>
            <MenubarTrigger>View</MenubarTrigger>
            <MenubarContent>
              <MenubarCheckboxItem checked={bookmarks} onCheckedChange={setBookmarks}>
                Always Show Bookmarks
                <MenubarShortcut>⌘⇧B</MenubarShortcut>
              </MenubarCheckboxItem>
              <MenubarCheckboxItem checked={urls} onCheckedChange={setUrls}>
                Always Show Full URLs
              </MenubarCheckboxItem>
            </MenubarContent>
          </MenubarMenu>

          <MenubarMenu>
            <MenubarTrigger>Profiles</MenubarTrigger>
            <MenubarContent>
              <MenubarLabel>People</MenubarLabel>
              <MenubarSeparator />
              <MenubarRadioGroup value={person} onValueChange={setPerson}>
                <MenubarRadioItem value="pedro">Pedro Duarte</MenubarRadioItem>
                <MenubarRadioItem value="colm">Colm Tuite</MenubarRadioItem>
                <MenubarRadioItem value="adam">Adam Wathan</MenubarRadioItem>
              </MenubarRadioGroup>
              <MenubarSeparator />
              <MenubarItem>Edit Profiles...</MenubarItem>
            </MenubarContent>
          </MenubarMenu>
        </MenubarRoot>
      </div>
    );
  },
};

export const Interactive: Story = {
  render: () => {
    const [bookmarks, setBookmarks] = React.useState(true);
    const [fullUrls, setFullUrls] = React.useState(false);
    const [theme, setTheme] = React.useState("system");
    const [lastAction, setLastAction] = React.useState<string | null>(null);

    return (
      <div style={{ padding: "32px", display: "flex", flexDirection: "column", gap: "16px" }}>
        <MenubarRoot>
          <MenubarMenu>
            <MenubarTrigger>File</MenubarTrigger>
            <MenubarContent>
              <MenubarItem onSelect={() => setLastAction("new-tab")}>
                New Tab <MenubarShortcut>⌘T</MenubarShortcut>
              </MenubarItem>
              <MenubarItem onSelect={() => setLastAction("new-window")}>
                New Window <MenubarShortcut>⌘N</MenubarShortcut>
              </MenubarItem>
              <MenubarSeparator />
              <MenubarItem onSelect={() => setLastAction("print")}>
                Print <MenubarShortcut>⌘P</MenubarShortcut>
              </MenubarItem>
            </MenubarContent>
          </MenubarMenu>

          <MenubarMenu>
            <MenubarTrigger>View</MenubarTrigger>
            <MenubarContent>
              <MenubarCheckboxItem checked={bookmarks} onCheckedChange={setBookmarks}>
                Show Bookmarks Bar
              </MenubarCheckboxItem>
              <MenubarCheckboxItem checked={fullUrls} onCheckedChange={setFullUrls}>
                Show Full URLs
              </MenubarCheckboxItem>
            </MenubarContent>
          </MenubarMenu>

          <MenubarMenu>
            <MenubarTrigger>Appearance</MenubarTrigger>
            <MenubarContent>
              <MenubarLabel>Theme</MenubarLabel>
              <MenubarRadioGroup value={theme} onValueChange={setTheme}>
                <MenubarRadioItem value="light">Light</MenubarRadioItem>
                <MenubarRadioItem value="dark">Dark</MenubarRadioItem>
                <MenubarRadioItem value="system">System</MenubarRadioItem>
              </MenubarRadioGroup>
            </MenubarContent>
          </MenubarMenu>
        </MenubarRoot>

        <p style={{ fontSize: "13px", color: "hsl(var(--muted-foreground))" }}>
          {lastAction ? `Last action: ${lastAction} · ` : ""}
          Bookmarks: {bookmarks ? "on" : "off"} · Full URLs: {fullUrls ? "on" : "off"} · Theme: {theme}
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
      <MenubarRoot>
        <MenubarMenu>
          <MenubarTrigger>File</MenubarTrigger>
          <MenubarContent>
            <MenubarItem>
              New Tab <MenubarShortcut>⌘T</MenubarShortcut>
            </MenubarItem>
            <MenubarItem disabled>Disabled Item</MenubarItem>
            <MenubarSeparator />
            <MenubarItem>Quit</MenubarItem>
          </MenubarContent>
        </MenubarMenu>
        <MenubarMenu>
          <MenubarTrigger>Edit</MenubarTrigger>
          <MenubarContent>
            <MenubarItem>
              Undo <MenubarShortcut>⌘Z</MenubarShortcut>
            </MenubarItem>
            <MenubarItem>
              Redo <MenubarShortcut>⇧⌘Z</MenubarShortcut>
            </MenubarItem>
          </MenubarContent>
        </MenubarMenu>
      </MenubarRoot>
    </div>
  ),
};

export const EdgeCases: Story = {
  render: () => (
    <div style={{ padding: "32px", display: "flex", flexDirection: "column", gap: "24px" }}>
      <div>
        <p style={{ fontSize: "12px", marginBottom: "8px", color: "hsl(var(--muted-foreground))" }}>Inset items</p>
        <MenubarRoot>
          <MenubarMenu>
            <MenubarTrigger>Menu</MenubarTrigger>
            <MenubarContent>
              <MenubarLabel inset>Section</MenubarLabel>
              <MenubarItem inset>Inset Item</MenubarItem>
              <MenubarItem inset disabled>Inset Disabled</MenubarItem>
              <MenubarSeparator />
              <MenubarItem inset>Another Item</MenubarItem>
            </MenubarContent>
          </MenubarMenu>
        </MenubarRoot>
      </div>
      <div>
        <p style={{ fontSize: "12px", marginBottom: "8px", color: "hsl(var(--muted-foreground))" }}>Nested sub-menus</p>
        <MenubarRoot>
          <MenubarMenu>
            <MenubarTrigger>Options</MenubarTrigger>
            <MenubarContent>
              <MenubarItem>Direct Item</MenubarItem>
              <MenubarSub>
                <MenubarSubTrigger>Level 1</MenubarSubTrigger>
                <MenubarSubContent>
                  <MenubarItem>Item A</MenubarItem>
                  <MenubarSub>
                    <MenubarSubTrigger>Level 2</MenubarSubTrigger>
                    <MenubarSubContent>
                      <MenubarItem>Deep Item X</MenubarItem>
                      <MenubarItem>Deep Item Y</MenubarItem>
                    </MenubarSubContent>
                  </MenubarSub>
                </MenubarSubContent>
              </MenubarSub>
            </MenubarContent>
          </MenubarMenu>
        </MenubarRoot>
      </div>
    </div>
  ),
};
