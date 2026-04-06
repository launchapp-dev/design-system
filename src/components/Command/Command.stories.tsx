import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import {
  Command,
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandSeparator,
  CommandShortcut,
} from "./index";
import { Button } from "../Button";

const meta: Meta = {
  title: "Components/Command",
  argTypes: {
    placeholder: { control: "text" },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const HomeIcon = () => (
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
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    <polyline points="9 22 9 12 15 12 15 22" />
  </svg>
);

const UserIcon = () => (
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
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

const CardIcon = () => (
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
    <rect width="20" height="14" x="2" y="5" rx="2" />
    <line x1="2" x2="22" y1="10" y2="10" />
  </svg>
);

const SettingsIcon = () => (
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
    <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const MailIcon = () => (
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
    <rect width="20" height="16" x="2" y="4" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
);

const ClockIcon = () => (
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
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);

const FileIcon = () => (
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
    <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
    <polyline points="14 2 14 8 20 8" />
  </svg>
);

const CalendarIcon = () => (
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
    <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
    <line x1="16" x2="16" y1="2" y2="6" />
    <line x1="8" x2="8" y1="2" y2="6" />
    <line x1="3" x2="21" y1="10" y2="10" />
  </svg>
);

export const Default: Story = {
  render: () => (
    <div className="w-full max-w-md border border-border rounded-lg shadow-md">
      <Command>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Pages">
            <CommandItem>
              <HomeIcon />
              Home
              <CommandShortcut>⌘H</CommandShortcut>
            </CommandItem>
            <CommandItem>
              <UserIcon />
              Profile
              <CommandShortcut>⌘P</CommandShortcut>
            </CommandItem>
            <CommandItem>
              <CardIcon />
              Billing
              <CommandShortcut>⌘B</CommandShortcut>
            </CommandItem>
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Settings">
            <CommandItem>
              <SettingsIcon />
              Preferences
              <CommandShortcut>⌘,</CommandShortcut>
            </CommandItem>
            <CommandItem>
              <MailIcon />
              Notifications
            </CommandItem>
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Recent">
            <CommandItem>
              <ClockIcon />
              Recently Viewed
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>
    </div>
  ),
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
      <div>
        <p style={{ fontSize: "12px", marginBottom: "8px", color: "hsl(var(--muted-foreground))" }}>
          Inline Command (no border)
        </p>
        <div className="w-full max-w-md">
          <Command>
            <CommandInput placeholder="Search commands..." />
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup heading="Actions">
                <CommandItem>
                  <HomeIcon />
                  Go to Home
                  <CommandShortcut>⌘H</CommandShortcut>
                </CommandItem>
                <CommandItem>
                  <SettingsIcon />
                  Open Settings
                  <CommandShortcut>⌘,</CommandShortcut>
                </CommandItem>
              </CommandGroup>
            </CommandList>
          </Command>
        </div>
      </div>

      <div>
        <p style={{ fontSize: "12px", marginBottom: "8px", color: "hsl(var(--muted-foreground))" }}>
          With border and shadow
        </p>
        <div className="w-full max-w-md border border-border rounded-lg shadow-md">
          <Command>
            <CommandInput placeholder="Search commands..." />
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup heading="Actions">
                <CommandItem>
                  <HomeIcon />
                  Go to Home
                  <CommandShortcut>⌘H</CommandShortcut>
                </CommandItem>
                <CommandItem disabled>
                  <FileIcon />
                  Disabled Item
                </CommandItem>
                <CommandItem>
                  <SettingsIcon />
                  Open Settings
                  <CommandShortcut>⌘,</CommandShortcut>
                </CommandItem>
              </CommandGroup>
            </CommandList>
          </Command>
        </div>
      </div>

      <div>
        <p style={{ fontSize: "12px", marginBottom: "8px", color: "hsl(var(--muted-foreground))" }}>
          Empty state
        </p>
        <div className="w-full max-w-md border border-border rounded-lg shadow-md">
          <Command>
            <CommandInput
              placeholder="Try typing something obscure..."
              defaultValue="xyznotfound"
            />
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup heading="Actions">
                <CommandItem>
                  <HomeIcon />
                  Home
                </CommandItem>
              </CommandGroup>
            </CommandList>
          </Command>
        </div>
      </div>
    </div>
  ),
};

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
      <div>
        <p style={{ fontSize: "12px", marginBottom: "8px", color: "hsl(var(--muted-foreground))" }}>
          Compact (max-w-sm)
        </p>
        <div className="w-full max-w-sm border border-border rounded-lg shadow-md">
          <Command>
            <CommandInput placeholder="Search..." />
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup heading="Pages">
                <CommandItem>
                  <HomeIcon />
                  Home<CommandShortcut>⌘H</CommandShortcut>
                </CommandItem>
                <CommandItem>
                  <UserIcon />
                  Profile
                </CommandItem>
              </CommandGroup>
            </CommandList>
          </Command>
        </div>
      </div>

      <div>
        <p style={{ fontSize: "12px", marginBottom: "8px", color: "hsl(var(--muted-foreground))" }}>
          Default (max-w-md)
        </p>
        <div className="w-full max-w-md border border-border rounded-lg shadow-md">
          <Command>
            <CommandInput placeholder="Type a command or search..." />
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup heading="Pages">
                <CommandItem>
                  <HomeIcon />
                  Home<CommandShortcut>⌘H</CommandShortcut>
                </CommandItem>
                <CommandItem>
                  <UserIcon />
                  Profile<CommandShortcut>⌘P</CommandShortcut>
                </CommandItem>
                <CommandItem>
                  <CardIcon />
                  Billing<CommandShortcut>⌘B</CommandShortcut>
                </CommandItem>
              </CommandGroup>
              <CommandSeparator />
              <CommandGroup heading="Settings">
                <CommandItem>
                  <SettingsIcon />
                  Preferences<CommandShortcut>⌘,</CommandShortcut>
                </CommandItem>
                <CommandItem>
                  <MailIcon />
                  Notifications
                </CommandItem>
              </CommandGroup>
            </CommandList>
          </Command>
        </div>
      </div>

      <div>
        <p style={{ fontSize: "12px", marginBottom: "8px", color: "hsl(var(--muted-foreground))" }}>
          Wide (max-w-lg)
        </p>
        <div className="w-full max-w-lg border border-border rounded-lg shadow-md">
          <Command>
            <CommandInput placeholder="Type a command or search..." />
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup heading="Pages">
                <CommandItem>
                  <HomeIcon />
                  Home<CommandShortcut>⌘H</CommandShortcut>
                </CommandItem>
                <CommandItem>
                  <UserIcon />
                  Profile<CommandShortcut>⌘P</CommandShortcut>
                </CommandItem>
                <CommandItem>
                  <CardIcon />
                  Billing<CommandShortcut>⌘B</CommandShortcut>
                </CommandItem>
              </CommandGroup>
              <CommandSeparator />
              <CommandGroup heading="Settings">
                <CommandItem>
                  <SettingsIcon />
                  Preferences<CommandShortcut>⌘,</CommandShortcut>
                </CommandItem>
                <CommandItem>
                  <MailIcon />
                  Notifications
                </CommandItem>
              </CommandGroup>
              <CommandSeparator />
              <CommandGroup heading="Recent">
                <CommandItem>
                  <ClockIcon />
                  Recently Viewed
                </CommandItem>
                <CommandItem>
                  <FileIcon />
                  Last Edited Document
                </CommandItem>
                <CommandItem>
                  <CalendarIcon />
                  Upcoming Events
                </CommandItem>
              </CommandGroup>
            </CommandList>
          </Command>
        </div>
      </div>
    </div>
  ),
};

export const Interactive: Story = {
  render: () => {
    const [open, setOpen] = React.useState(false);
    const [selected, setSelected] = React.useState<string | null>(null);

    React.useEffect(() => {
      const down = (e: KeyboardEvent) => {
        if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
          e.preventDefault();
          setOpen((o) => !o);
        }
      };
      document.addEventListener("keydown", down);
      return () => document.removeEventListener("keydown", down);
    }, []);

    const handleSelect = (value: string) => {
      setSelected(value);
      setOpen(false);
    };

    return (
      <div className="flex flex-col items-center gap-4" style={{ minHeight: "200px" }}>
        <p className="text-sm text-muted-foreground">
          Press{" "}
          <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border border-border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
            <span className="text-xs">⌘</span>K
          </kbd>{" "}
          or click the button
        </p>
        <Button variant="outline" onClick={() => setOpen(true)}>
          Open Command Palette
        </Button>
        {selected && (
          <p className="text-sm text-muted-foreground">
            Last selected: <strong>{selected}</strong>
          </p>
        )}
        <CommandDialog open={open} onOpenChange={setOpen} label="Command Palette">
          <CommandInput placeholder="Type a command or search..." />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup heading="Pages">
              <CommandItem onSelect={() => handleSelect("Home")}>
                <HomeIcon />
                Home
                <CommandShortcut>⌘H</CommandShortcut>
              </CommandItem>
              <CommandItem onSelect={() => handleSelect("Profile")}>
                <UserIcon />
                Profile
                <CommandShortcut>⌘P</CommandShortcut>
              </CommandItem>
              <CommandItem onSelect={() => handleSelect("Billing")}>
                <CardIcon />
                Billing
                <CommandShortcut>⌘B</CommandShortcut>
              </CommandItem>
            </CommandGroup>
            <CommandSeparator />
            <CommandGroup heading="Settings">
              <CommandItem onSelect={() => handleSelect("Preferences")}>
                <SettingsIcon />
                Preferences
                <CommandShortcut>⌘,</CommandShortcut>
              </CommandItem>
              <CommandItem onSelect={() => handleSelect("Notifications")}>
                <MailIcon />
                Notifications
              </CommandItem>
              <CommandItem disabled>
                <FileIcon />
                Disabled Action
              </CommandItem>
            </CommandGroup>
            <CommandSeparator />
            <CommandGroup heading="Recent">
              <CommandItem onSelect={() => handleSelect("Recently Viewed")}>
                <ClockIcon />
                Recently Viewed
              </CommandItem>
              <CommandItem onSelect={() => handleSelect("Last Document")}>
                <FileIcon />
                Last Edited Document
              </CommandItem>
              <CommandItem onSelect={() => handleSelect("Upcoming Events")}>
                <CalendarIcon />
                Upcoming Events
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </CommandDialog>
      </div>
    );
  },
};

export const DarkMode: Story = {
  decorators: [
    (Story) => (
      <div className="dark" style={{ background: "#09090b", padding: "24px", borderRadius: "8px" }}>
        <Story />
      </div>
    ),
  ],
  render: () => (
    <div className="w-full max-w-md border border-border rounded-lg shadow-md">
      <Command>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Pages">
            <CommandItem>
              <HomeIcon />
              Home
              <CommandShortcut>⌘H</CommandShortcut>
            </CommandItem>
            <CommandItem>
              <UserIcon />
              Profile
              <CommandShortcut>⌘P</CommandShortcut>
            </CommandItem>
            <CommandItem disabled>
              <CardIcon />
              Billing (disabled)
            </CommandItem>
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Settings">
            <CommandItem>
              <SettingsIcon />
              Preferences
              <CommandShortcut>⌘,</CommandShortcut>
            </CommandItem>
            <CommandItem>
              <MailIcon />
              Notifications
            </CommandItem>
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Recent">
            <CommandItem>
              <ClockIcon />
              Recently Viewed
            </CommandItem>
            <CommandItem>
              <FileIcon />
              Last Edited Document
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>
    </div>
  ),
};

export const WithDialog: Story = {
  render: () => {
    const [open, setOpen] = React.useState(false);

    React.useEffect(() => {
      const down = (e: KeyboardEvent) => {
        if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
          e.preventDefault();
          setOpen((o) => !o);
        }
      };
      document.addEventListener("keydown", down);
      return () => document.removeEventListener("keydown", down);
    }, []);

    return (
      <div className="flex flex-col items-center gap-4">
        <p className="text-sm text-muted-foreground">
          Press{" "}
          <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border border-border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
            <span className="text-xs">⌘</span>K
          </kbd>
        </p>
        <Button variant="outline" onClick={() => setOpen(true)}>
          Open Command Palette
        </Button>
        <CommandDialog open={open} onOpenChange={setOpen} label="Command Palette">
          <CommandInput placeholder="Type a command or search..." />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup heading="Pages">
              <CommandItem onSelect={() => setOpen(false)}>
                <HomeIcon />
                Home
                <CommandShortcut>⌘H</CommandShortcut>
              </CommandItem>
              <CommandItem onSelect={() => setOpen(false)}>
                <UserIcon />
                Profile
                <CommandShortcut>⌘P</CommandShortcut>
              </CommandItem>
            </CommandGroup>
            <CommandSeparator />
            <CommandGroup heading="Settings">
              <CommandItem onSelect={() => setOpen(false)}>
                <SettingsIcon />
                Preferences
                <CommandShortcut>⌘,</CommandShortcut>
              </CommandItem>
              <CommandItem onSelect={() => setOpen(false)}>
                <MailIcon />
                Notifications
              </CommandItem>
            </CommandGroup>
            <CommandSeparator />
            <CommandGroup heading="Recent">
              <CommandItem onSelect={() => setOpen(false)}>
                <ClockIcon />
                Recently Viewed
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </CommandDialog>
      </div>
    );
  },
};

export const EdgeCases: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
      <div>
        <p style={{ fontSize: "12px", marginBottom: "8px", color: "hsl(var(--muted-foreground))" }}>
          Long item labels
        </p>
        <div className="w-full max-w-md border border-border rounded-lg shadow-md">
          <Command>
            <CommandInput placeholder="Search..." />
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup heading="Actions">
                <CommandItem>
                  <FileIcon />
                  This is a very long command item label that tests text overflow and truncation
                  behavior
                  <CommandShortcut>⌘⇧L</CommandShortcut>
                </CommandItem>
                <CommandItem>
                  <HomeIcon />
                  Normal item
                  <CommandShortcut>⌘N</CommandShortcut>
                </CommandItem>
              </CommandGroup>
            </CommandList>
          </Command>
        </div>
      </div>

      <div>
        <p style={{ fontSize: "12px", marginBottom: "8px", color: "hsl(var(--muted-foreground))" }}>
          Many groups and items (scrollable list)
        </p>
        <div className="w-full max-w-md border border-border rounded-lg shadow-md">
          <Command>
            <CommandInput placeholder="Search..." />
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>
              {["Pages", "Settings", "Tools", "Recent", "Favorites"].map((group) => (
                <React.Fragment key={group}>
                  <CommandGroup heading={group}>
                    {["Item One", "Item Two", "Item Three"].map((item) => (
                      <CommandItem key={item}>
                        <FileIcon />
                        {group}: {item}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                  <CommandSeparator />
                </React.Fragment>
              ))}
            </CommandList>
          </Command>
        </div>
      </div>

      <div>
        <p style={{ fontSize: "12px", marginBottom: "8px", color: "hsl(var(--muted-foreground))" }}>
          No icons, shortcuts only
        </p>
        <div className="w-full max-w-md border border-border rounded-lg shadow-md">
          <Command>
            <CommandInput placeholder="Search..." />
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup heading="Keyboard Commands">
                <CommandItem>
                  Copy<CommandShortcut>⌘C</CommandShortcut>
                </CommandItem>
                <CommandItem>
                  Paste<CommandShortcut>⌘V</CommandShortcut>
                </CommandItem>
                <CommandItem>
                  Cut<CommandShortcut>⌘X</CommandShortcut>
                </CommandItem>
                <CommandItem>
                  Undo<CommandShortcut>⌘Z</CommandShortcut>
                </CommandItem>
                <CommandItem>
                  Redo<CommandShortcut>⌘⇧Z</CommandShortcut>
                </CommandItem>
              </CommandGroup>
            </CommandList>
          </Command>
        </div>
      </div>
    </div>
  ),
};
