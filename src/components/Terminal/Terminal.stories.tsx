import type { Meta, StoryObj } from "@storybook/react";
import { Terminal, TerminalHeader } from "./index";

const meta = {
  title: "Components/Terminal",
  component: Terminal,
  argTypes: {
    theme: {
      control: "select",
      options: ["dark", "light"],
      description: "Theme variant for the terminal",
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
      description: "Size variant for the terminal",
    },
    typingSpeed: {
      control: "number",
      description: "Typing speed in milliseconds per character",
    },
    showCursor: {
      control: "boolean",
      description: "Show blinking cursor at end of typing",
    },
    showLineNumbers: {
      control: "boolean",
      description: "Show line numbers",
    },
  },
} satisfies Meta<typeof Terminal>;

export default meta;
type Story = StoryObj<typeof meta>;

const basicLines = [
  { type: "output" as const, content: "Welcome to the terminal" },
  { type: "input" as const, content: "npm install @launchapp/design-system" },
  { type: "output" as const, content: "added 156 packages in 4.2s" },
  { type: "input" as const, content: "npm run dev" },
  { type: "output" as const, content: "Starting development server..." },
  { type: "output" as const, content: "Server running at http://localhost:3000" },
];

const errorLines = [
  { type: "output" as const, content: "$ npm run build" },
  { type: "output" as const, content: "Building for production..." },
  { type: "error" as const, content: "Error: Cannot find module './src/components'" },
  { type: "output" as const, content: "Hint: Run npm install to install dependencies" },
];

const gitLines = [
  { type: "input" as const, content: "git status" },
  { type: "output" as const, content: "On branch main" },
  { type: "output" as const, content: "Changes not staged for commit:" },
  { type: "output" as const, content: "  modified:   src/components/Terminal.tsx" },
  { type: "input" as const, content: "git commit -m 'feat: add Terminal component'" },
  { type: "output" as const, content: "[main a1b2c3d] feat: add Terminal component" },
  { type: "output" as const, content: " 1 file changed, 200 insertions(+)" },
];

export const Default: Story = {
  args: {
    lines: basicLines,
    theme: "dark",
    size: "md",
    typingSpeed: 30,
    showCursor: true,
  },
};

export const LightTheme: Story = {
  args: {
    lines: basicLines,
    theme: "light",
    size: "md",
    typingSpeed: 30,
    showCursor: true,
  },
};

export const WithLineNumbers: Story = {
  args: {
    lines: basicLines,
    theme: "dark",
    size: "md",
    typingSpeed: 30,
    showCursor: true,
    showLineNumbers: true,
  },
};

export const WithErrorLines: Story = {
  args: {
    lines: errorLines,
    theme: "dark",
    size: "md",
    typingSpeed: 25,
    showCursor: true,
  },
};

export const GitWorkflow: Story = {
  args: {
    lines: gitLines,
    theme: "dark",
    size: "md",
    typingSpeed: 40,
    showCursor: true,
  },
};

export const SmallSize: Story = {
  args: {
    lines: basicLines,
    theme: "dark",
    size: "sm",
    typingSpeed: 20,
    showCursor: true,
  },
};

export const LargeSize: Story = {
  args: {
    lines: basicLines,
    theme: "dark",
    size: "lg",
    typingSpeed: 50,
    showCursor: true,
  },
};

export const FastTyping: Story = {
  args: {
    lines: basicLines,
    theme: "dark",
    size: "md",
    typingSpeed: 5,
    showCursor: true,
  },
};

export const NoCursor: Story = {
  args: {
    lines: basicLines,
    theme: "dark",
    size: "md",
    typingSpeed: 30,
    showCursor: false,
  },
};

export const WithHeader: Story = {
  args: {
    lines: basicLines,
    theme: "dark",
    size: "md",
    typingSpeed: 30,
    showCursor: true,
  },
  render: (args) => (
    <Terminal {...args} header={<TerminalHeader variant="dots" title="bash - 80×24" />} />
  ),
};

export const WithCustomHeader: Story = {
  args: {
    lines: basicLines,
    theme: "dark",
    size: "md",
    typingSpeed: 30,
    showCursor: true,
  },
  render: (args) => (
    <Terminal
      {...args}
      header={
        <TerminalHeader title="npm ~ development">
          <div className="ml-auto flex gap-2">
            <button className="px-2 py-0.5 text-xs bg-green-600 text-white rounded">Run</button>
          </div>
        </TerminalHeader>
      }
    />
  ),
};

export const DarkMode: Story = {
  decorators: [
    (Story) => (
      <div className="dark p-4" style={{ background: "#09090b", borderRadius: "8px" }}>
        <Story />
      </div>
    ),
  ],
  args: {
    lines: basicLines,
    theme: "dark",
    size: "md",
    typingSpeed: 30,
    showCursor: true,
  },
};

export const LightModeBackground: Story = {
  decorators: [
    (Story) => (
      <div className="p-4 bg-white border border-zinc-200 rounded-lg">
        <Story />
      </div>
    ),
  ],
  args: {
    lines: basicLines,
    theme: "light",
    size: "md",
    typingSpeed: 30,
    showCursor: true,
  },
};

export const AllSizes: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div>
        <p className="text-sm text-muted-foreground mb-2">Small</p>
        <Terminal lines={basicLines.slice(0, 3)} size="sm" theme="dark" />
      </div>
      <div>
        <p className="text-sm text-muted-foreground mb-2">Medium (default)</p>
        <Terminal lines={basicLines.slice(0, 3)} size="md" theme="dark" />
      </div>
      <div>
        <p className="text-sm text-muted-foreground mb-2">Large</p>
        <Terminal lines={basicLines.slice(0, 3)} size="lg" theme="dark" />
      </div>
    </div>
  ),
};

export const AllThemes: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div>
        <p className="text-sm text-muted-foreground mb-2">Dark</p>
        <Terminal lines={basicLines.slice(0, 3)} theme="dark" />
      </div>
      <div className="p-4 bg-white border border-zinc-200 rounded-lg">
        <p className="text-sm text-muted-foreground mb-2">Light</p>
        <Terminal lines={basicLines.slice(0, 3)} theme="light" />
      </div>
    </div>
  ),
};

export const StaticContent: Story = {
  args: {
    theme: "dark",
    size: "md",
    children: (
      <div className="text-muted-foreground">
        <p>Static terminal output without typing animation.</p>
        <p className="mt-2">This is useful for displaying pre-rendered content.</p>
      </div>
    ),
  },
};
