import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import { Terminal } from "./index";

const meta: Meta<typeof Terminal> = {
  title: "Components/Terminal",
  component: Terminal,
  argTypes: {
    title: { control: "text" },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
    showTimestamps: { control: "boolean" },
    typing: { control: "boolean" },
    scrollable: { control: "boolean" },
    typingSpeed: { control: "number" },
  },
  args: {
    title: "Terminal",
    size: "md",
    showTimestamps: false,
    typing: false,
    scrollable: true,
    typingSpeed: 30,
  },
};

export default meta;
type Story = StoryObj<typeof Terminal>;

const basicLines = [
  { type: "input" as const, content: "npm install @launchapp/design-system" },
  { type: "output" as const, content: "" },
  { type: "output" as const, content: "added 247 packages in 12s" },
  { type: "output" as const, content: "" },
  { type: "input" as const, content: "npm run dev" },
  { type: "output" as const, content: "" },
  { type: "info" as const, content: "  VITE v5.0.0  ready in 342 ms" },
  { type: "info" as const, content: "" },
  { type: "info" as const, content: "  ➜  Local:   http://localhost:3000/" },
  { type: "info" as const, content: "  ➜  Network: http://192.168.1.42:3000/" },
];

const errorLines = [
  { type: "input" as const, content: "npm run build" },
  { type: "error" as const, content: "" },
  { type: "error" as const, content: "Error: Cannot find module './components/Button'" },
  { type: "error" as const, content: "    at resolve (/app/node_modules/vite/dist/node/index.js:2344:15)" },
  { type: "error" as const, content: "    at pluginResolve (/app/node_modules/vite/dist/node/index.js:1567:12)" },
  { type: "error" as const, content: "    at /app/node_modules/vite/dist/node/index.js:1554:12" },
  { type: "output" as const, content: "" },
  { type: "warning" as const, content: "  Command failed with exit code 1." },
];

const gitLines = [
  { type: "input" as const, content: "git status" },
  { type: "output" as const, content: "On branch main" },
  { type: "output" as const, content: "Your branch is up to date with 'origin/main'." },
  { type: "output" as const, content: "" },
  { type: "output" as const, content: "Changes not staged for commit:" },
  { type: "output" as const, content: "  (use \"git add <file>...\" to update what will be committed)" },
  { type: "output" as const, content: "" },
  { type: "output" as const, content: "\tmodified:   src/components/Button/Button.tsx" },
  { type: "output" as const, content: "\tmodified:   src/components/Card/Card.tsx" },
  { type: "output" as const, content: "" },
  { type: "input" as const, content: "git log --oneline -5" },
  { type: "output" as const, content: "a1b2c3d feat: Add new Button component" },
  { type: "output" as const, content: "e4f5g6h chore: Update dependencies" },
  { type: "output" as const, content: "i7j8k9l fix: Resolve TypeScript errors" },
  { type: "output" as const, content: "m0n1o2p docs: Update README" },
  { type: "output" as const, content: "q3r4s5t feat: Initial commit" },
];

const successLines = [
  { type: "input" as const, content: "npm run build" },
  { type: "output" as const, content: "" },
  { type: "info" as const, content: "> @launchapp/design-system@0.1.0 build" },
  { type: "info" as const, content: "> tsup" },
  { type: "output" as const, content: "" },
  { type: "success" as const, content: "Build completed successfully!" },
  { type: "output" as const, content: "" },
  { type: "output" as const, content: "✓ Built in 2.34s" },
  { type: "output" as const, content: "" },
  { type: "output" as const, content: "Output:" },
  { type: "output" as const, content: "  dist/index.js  142.3 kB" },
  { type: "output" as const, content: "  dist/index.cjs  145.1 kB" },
  { type: "output" as const, content: "  dist/index.d.ts  89.2 kB" },
];

export const Default: Story = {
  render: (args) => (
    <Terminal
      {...args}
      lines={basicLines}
    />
  ),
};

export const WithTyping: Story = {
  render: (args) => (
    <Terminal
      {...args}
      lines={basicLines}
      typing={true}
      typingSpeed={20}
    />
  ),
};

export const WithCustomTitle: Story = {
  render: (args) => (
    <Terminal
      {...args}
      lines={basicLines}
      title="bash"
    />
  ),
};

export const WithTimestamps: Story = {
  render: (args) => (
    <Terminal
      {...args}
      lines={basicLines}
      showTimestamps={true}
    />
  ),
};

export const ErrorOutput: Story = {
  render: (args) => (
    <Terminal
      {...args}
      lines={errorLines}
      title="Error Output"
    />
  ),
};

export const GitWorkflow: Story = {
  render: (args) => (
    <Terminal
      {...args}
      lines={gitLines}
      title="Git"
    />
  ),
};

export const SuccessOutput: Story = {
  render: (args) => (
    <Terminal
      {...args}
      lines={successLines}
      title="Build"
    />
  ),
};

export const SmallSize: Story = {
  render: (args) => (
    <Terminal
      {...args}
      lines={basicLines.slice(0, 4)}
      size="sm"
    />
  ),
};

export const LargeSize: Story = {
  render: (args) => (
    <Terminal
      {...args}
      lines={basicLines}
      size="lg"
    />
  ),
};

export const MaxLines: Story = {
  render: (args) => (
    <Terminal
      {...args}
      lines={gitLines}
      title="Git Log"
      maxLines={5}
    />
  ),
};

export const Empty: Story = {
  render: (args) => (
    <Terminal
      {...args}
      lines={[]}
    />
  ),
};
