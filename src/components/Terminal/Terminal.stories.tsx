import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import {
  Terminal,
  TerminalOutput,
  TerminalCommand,
  TerminalCursor,
  TerminalLine,
} from "./index";

const meta: Meta<typeof Terminal> = {
  title: "Components/Terminal",
  component: Terminal,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    theme: {
      control: "select",
      options: ["dark", "light"],
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
    typingSpeed: {
      control: { type: "range", min: 5, max: 100, step: 5 },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Terminal>;

const basicCommands: TerminalLine[] = [
  { type: "input", content: "npm install @design-system/react" },
  { type: "output", content: "added 142 packages in 3.2s" },
  { type: "input", content: "npm run build" },
  { type: "output", content: "✓ Compiled successfully!" },
  { type: "output", content: "  dist/index.js    142.3kb" },
  { type: "output", content: "  dist/index.d.ts  28.1kb" },
  { type: "input", content: "echo 'Build complete!'" },
  { type: "output", content: "Build complete!" },
];

export const Default: Story = {
  args: {
    title: "bash",
    lines: basicCommands,
    typingSpeed: 30,
    animateTyping: true,
    showCursor: true,
    theme: "dark",
    size: "md",
  },
  decorators: [
    (Story) => (
      <div style={{ width: "600px" }}>
        <Story />
      </div>
    ),
  ],
};

export const StaticContent: Story = {
  args: {
    title: "output.log",
    lines: basicCommands,
    static: true,
    showCursor: false,
    theme: "dark",
    size: "md",
  },
  decorators: [
    (Story) => (
      <div style={{ width: "600px" }}>
        <Story />
      </div>
    ),
  ],
};

export const LightTheme: Story = {
  args: {
    title: "terminal",
    lines: basicCommands,
    typingSpeed: 30,
    animateTyping: true,
    showCursor: true,
    theme: "light",
    size: "md",
  },
  decorators: [
    (Story) => (
      <div style={{ width: "600px" }}>
        <Story />
      </div>
    ),
  ],
};

export const WithTimestamps: Story = {
  args: {
    title: "server.log",
    lines: [
      { type: "info", content: "Starting development server...", timestamp: "10:23:45" },
      { type: "output", content: "Server listening on port 3000", timestamp: "10:23:46" },
      { type: "input", content: "GET /api/users", timestamp: "10:24:01" },
      { type: "output", content: "200 OK - 45ms", timestamp: "10:24:01" },
      { type: "error", content: "Error: Connection timeout", timestamp: "10:25:30" },
    ],
    showTimestamps: true,
    typingSpeed: 25,
    theme: "dark",
    size: "md",
  },
  decorators: [
    (Story) => (
      <div style={{ width: "600px" }}>
        <Story />
      </div>
    ),
  ],
};

export const WithErrors: Story = {
  args: {
    title: "npm run test",
    lines: [
      { type: "input", content: "npm run test" },
      { type: "output", content: "PASS src/utils.test.ts" },
      { type: "output", content: "PASS src/components/Button.test.tsx" },
      { type: "error", content: "FAIL src/components/Form.test.tsx" },
      { type: "error", content: "  ✕ should validate email format (15ms)" },
      { type: "error", content: "  ✕ should show error message (8ms)" },
      { type: "info", content: "Test Suites: 1 failed, 2 passed, 3 total" },
    ],
    typingSpeed: 20,
    theme: "dark",
    size: "md",
  },
  decorators: [
    (Story) => (
      <div style={{ width: "600px" }}>
        <Story />
      </div>
    ),
  ],
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px", width: "600px" }}>
      <div>
        <p style={{ fontSize: "12px", fontWeight: "600", marginBottom: "8px" }}>Small</p>
        <Terminal
          title="terminal"
          lines={[
            { type: "input", content: "echo 'Small terminal'" },
            { type: "output", content: "Small terminal" },
          ]}
          size="sm"
          static
          showCursor={false}
        />
      </div>
      <div>
        <p style={{ fontSize: "12px", fontWeight: "600", marginBottom: "8px" }}>Medium (default)</p>
        <Terminal
          title="terminal"
          lines={[
            { type: "input", content: "echo 'Medium terminal'" },
            { type: "output", content: "Medium terminal" },
          ]}
          size="md"
          static
          showCursor={false}
        />
      </div>
      <div>
        <p style={{ fontSize: "12px", fontWeight: "600", marginBottom: "8px" }}>Large</p>
        <Terminal
          title="terminal"
          lines={[
            { type: "input", content: "echo 'Large terminal'" },
            { type: "output", content: "Large terminal" },
          ]}
          size="lg"
          static
          showCursor={false}
        />
      </div>
    </div>
  ),
};

export const EmptyWithCursor: Story = {
  args: {
    title: "bash",
    lines: [],
    showCursor: true,
    theme: "dark",
    size: "md",
  },
  decorators: [
    (Story) => (
      <div style={{ width: "600px" }}>
        <Story />
      </div>
    ),
  ],
};

export const CustomPrompt: Story = {
  args: {
    title: "root@server",
    lines: [
      { type: "input", content: "systemctl status nginx" },
      { type: "output", content: "● nginx.service - A high performance web server" },
      { type: "output", content: "   Active: active (running) since Mon 2024-01-15 10:00:00 UTC" },
      { type: "input", content: "exit" },
    ],
    prompt: "#",
    typingSpeed: 25,
    theme: "dark",
    size: "md",
  },
  decorators: [
    (Story) => (
      <div style={{ width: "600px" }}>
        <Story />
      </div>
    ),
  ],
};

export const FastTyping: Story = {
  args: {
    title: "fast-terminal",
    lines: basicCommands,
    typingSpeed: 10,
    animateTyping: true,
    showCursor: true,
    theme: "dark",
    size: "md",
  },
  decorators: [
    (Story) => (
      <div style={{ width: "600px" }}>
        <Story />
      </div>
    ),
  ],
};

export const SlowTyping: Story = {
  args: {
    title: "slow-terminal",
    lines: [
      { type: "input", content: "npm install" },
      { type: "output", content: "Installing dependencies..." },
    ],
    typingSpeed: 80,
    animateTyping: true,
    showCursor: true,
    theme: "dark",
    size: "md",
  },
  decorators: [
    (Story) => (
      <div style={{ width: "600px" }}>
        <Story />
      </div>
    ),
  ],
};

export const MaxLines: Story = {
  args: {
    title: "scrollable-terminal",
    lines: [
      { type: "input", content: "cat log.txt" },
      { type: "output", content: "Line 1: First log entry" },
      { type: "output", content: "Line 2: Second log entry" },
      { type: "output", content: "Line 3: Third log entry" },
      { type: "output", content: "Line 4: Fourth log entry" },
      { type: "output", content: "Line 5: Fifth log entry" },
    ],
    maxLines: 3,
    typingSpeed: 30,
    theme: "dark",
    size: "md",
  },
  decorators: [
    (Story) => (
      <div style={{ width: "600px" }}>
        <Story />
      </div>
    ),
  ],
};

export const TerminalOutputStory: StoryObj<typeof TerminalOutput> = {
  name: "TerminalOutput",
  render: () => (
    <div style={{ width: "600px" }}>
      <TerminalOutput title="code.js" theme="dark" size="md">
        <pre style={{ margin: 0, whiteSpace: "pre-wrap" }}>
{`function greet(name) {
  return \`Hello, \${name}!\`;
}

console.log(greet("World"));`}
        </pre>
      </TerminalOutput>
    </div>
  ),
};

export const TerminalCommandStory: StoryObj<typeof TerminalCommand> = {
  name: "TerminalCommand",
  render: () => (
    <div
      style={{
        width: "600px",
        padding: "16px",
        background: "#1e1e1e",
        borderRadius: "8px",
        fontFamily: "monospace",
      }}
    >
      <TerminalCommand prompt="$" theme="dark">
        npm run build
      </TerminalCommand>
      <div style={{ marginTop: "8px" }}>
        <TerminalCommand prompt=">" theme="dark">
          next build
        </TerminalCommand>
      </div>
    </div>
  ),
};

export const TerminalCursorStory: StoryObj<typeof TerminalCursor> = {
  name: "TerminalCursor",
  render: () => (
    <div
      style={{
        padding: "16px",
        background: "#1e1e1e",
        borderRadius: "8px",
        fontFamily: "monospace",
        color: "#d4d4d4",
      }}
    >
      <span>Type something</span>
      <TerminalCursor char="|" />
      <div style={{ marginTop: "8px" }}>
        <span>Block cursor</span>
        <TerminalCursor char="\u2588" />
      </div>
      <div style={{ marginTop: "8px" }}>
        <span>Underline cursor</span>
        <TerminalCursor char="_" />
      </div>
    </div>
  ),
};

export const InteractiveDemo: Story = {
  render: function InteractiveDemo() {
    const [lines, setLines] = React.useState<TerminalLine[]>([
      { type: "output", content: "Welcome to the interactive terminal demo!" },
      { type: "output", content: "Click the button to add commands." },
    ]);
    const [key, setKey] = React.useState(0);

    const addCommand = () => {
      const commands = [
        { cmd: "ls -la", output: "total 48\ndrwxr-xr-x  12 user  staff   384 Jan 15 10:00 ." },
        { cmd: "pwd", output: "/Users/user/projects/design-system" },
        { cmd: "git status", output: "On branch main\nnothing to commit, working tree clean" },
        { cmd: "date", output: new Date().toString() },
      ];
      const random = commands[Math.floor(Math.random() * commands.length)];
      setLines((prev) => [
        ...prev,
        { type: "input", content: random.cmd },
        { type: "output", content: random.output },
      ]);
      setKey((k) => k + 1);
    };

    return (
      <div style={{ width: "600px" }}>
        <button
          onClick={addCommand}
          style={{
            marginBottom: "12px",
            padding: "8px 16px",
            background: "hsl(262, 83%, 58%)",
            color: "white",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
          }}
        >
          Add Command
        </button>
        <Terminal
          key={key}
          title="interactive-demo"
          lines={lines}
          typingSpeed={25}
          theme="dark"
          size="md"
        />
      </div>
    );
  },
};
