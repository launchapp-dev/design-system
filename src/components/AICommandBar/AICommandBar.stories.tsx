import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import {
  AICommandBar,
  AICommandBarTrigger,
  AICommandBarContent,
  AICommandBarList,
  AICommandBarEmpty,
  AICommandBarItem,
  AICommandBarGroup,
  AICommandBarSeparator,
  AIResponse,
} from "./index";
import { Button } from "@/components/Button";

const meta: Meta<typeof AICommandBarContent> = {
  title: "Components/AICommandBar",
  component: AICommandBarContent,
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
    placeholder: { control: "text" },
    aiPlaceholder: { control: "text" },
  },
  args: {
    size: "md",
    placeholder: "Search commands...",
    aiPlaceholder: "Ask anything...",
  },
};

export default meta;
type Story = StoryObj<typeof AICommandBarContent>;

export const Default: Story = {
  render: (args) => (
    <AICommandBar>
      <AICommandBarTrigger asChild>
        <Button>Open Command Bar</Button>
      </AICommandBarTrigger>
      <AICommandBarContent {...args}>
        <AICommandBarList>
          <AICommandBarGroup heading="Commands">
            <AICommandBarItem shortcut="⌘N">
              Create new file
            </AICommandBarItem>
            <AICommandBarItem shortcut="⌘O">
              Open file
            </AICommandBarItem>
            <AICommandBarItem shortcut="⌘S">
              Save file
            </AICommandBarItem>
          </AICommandBarGroup>
          <AICommandBarSeparator />
          <AICommandBarGroup heading="Navigation">
            <AICommandBarItem shortcut="⌘P">
              Go to file
            </AICommandBarItem>
            <AICommandBarItem shortcut="⌘G">
              Go to line
            </AICommandBarItem>
          </AICommandBarGroup>
        </AICommandBarList>
      </AICommandBarContent>
    </AICommandBar>
  ),
};

export const WithAISuggestions: Story = {
  render: (args) => (
    <AICommandBar>
      <AICommandBarTrigger asChild>
        <Button>Open AI Command Bar</Button>
      </AICommandBarTrigger>
      <AICommandBarContent {...args}>
        <AICommandBarList>
          <AICommandBarGroup heading="AI Suggestions">
            <AICommandBarItem aiSuggestion>
              Generate unit tests for selected code
            </AICommandBarItem>
            <AICommandBarItem aiSuggestion>
              Explain this function in plain English
            </AICommandBarItem>
            <AICommandBarItem aiSuggestion>
              Refactor for better performance
            </AICommandBarItem>
          </AICommandBarGroup>
          <AICommandBarSeparator />
          <AICommandBarGroup heading="Recent Commands">
            <AICommandBarItem shortcut="⌘⇧F">
              Format document
            </AICommandBarItem>
            <AICommandBarItem shortcut="⌘⇧L">
              Toggle line numbers
            </AICommandBarItem>
          </AICommandBarGroup>
        </AICommandBarList>
      </AICommandBarContent>
    </AICommandBar>
  ),
};

export const WithAIResponse: Story = {
  render: (args) => (
    <AICommandBar>
      <AICommandBarTrigger asChild>
        <Button>Open with Response</Button>
      </AICommandBarTrigger>
      <AICommandBarContent {...args}>
        <AIResponse streaming={false}>
          <p>
            I found 3 relevant commands for your query:
          </p>
          <ul>
            <li><strong>Create component</strong> - Generate a new React component</li>
            <li><strong>Create hook</strong> - Generate a custom React hook</li>
            <li><strong>Create util</strong> - Generate a utility function</li>
          </ul>
        </AIResponse>
      </AICommandBarContent>
    </AICommandBar>
  ),
};

export const StreamingResponse: Story = {
  render: (args) => (
    <AICommandBar>
      <AICommandBarTrigger asChild>
        <Button>Open with Streaming</Button>
      </AICommandBarTrigger>
      <AICommandBarContent {...args}>
        <AIResponse streaming>
          <p>Processing your request...</p>
        </AIResponse>
      </AICommandBarContent>
    </AICommandBar>
  ),
};

export const WithIcons: Story = {
  render: (args) => (
    <AICommandBar>
      <AICommandBarTrigger asChild>
        <Button>Open with Icons</Button>
      </AICommandBarTrigger>
      <AICommandBarContent {...args}>
        <AICommandBarList>
          <AICommandBarGroup heading="File">
            <AICommandBarItem
              shortcut="⌘N"
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/></svg>
              }
            >
              New File
            </AICommandBarItem>
            <AICommandBarItem
              shortcut="⌘O"
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/></svg>
              }
            >
              Open Folder
            </AICommandBarItem>
            <AICommandBarItem
              shortcut="⌘S"
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/></svg>
              }
            >
              Save
            </AICommandBarItem>
          </AICommandBarGroup>
          <AICommandBarSeparator />
          <AICommandBarGroup heading="Edit">
            <AICommandBarItem
              shortcut="⌘C"
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>
              }
            >
              Copy
            </AICommandBarItem>
            <AICommandBarItem
              shortcut="⌘V"
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><rect width="8" height="4" x="8" y="2" rx="1" ry="1"/></svg>
              }
            >
              Paste
            </AICommandBarItem>
          </AICommandBarGroup>
        </AICommandBarList>
      </AICommandBarContent>
    </AICommandBar>
  ),
};

export const EmptyState: Story = {
  render: (args) => (
    <AICommandBar>
      <AICommandBarTrigger asChild>
        <Button>Open with Empty</Button>
      </AICommandBarTrigger>
      <AICommandBarContent {...args}>
        <AICommandBarList>
          <AICommandBarEmpty>
            No commands found. Try a different search term.
          </AICommandBarEmpty>
        </AICommandBarList>
      </AICommandBarContent>
    </AICommandBar>
  ),
};

export const RenderProps: Story = {
  render: (args) => {
    const commands = [
      { id: "1", label: "Create component", shortcut: "⌘⇧C" },
      { id: "2", label: "Create hook", shortcut: "⌘⇧H" },
      { id: "3", label: "Create test", shortcut: "⌘⇧T" },
    ];

    return (
      <AICommandBar>
        <AICommandBarTrigger asChild>
          <Button>Open with Filter</Button>
        </AICommandBarTrigger>
        <AICommandBarContent {...args}>
          {(query, mode) => (
            <AICommandBarList>
              {mode === "ai" ? (
                <AIResponse streaming={query.length > 3}>
                  <p>AI is processing: "{query}"</p>
                </AIResponse>
              ) : (
                <>
                  <AICommandBarGroup heading="Commands">
                    {commands
                      .filter((cmd) =>
                        cmd.label.toLowerCase().includes(query.toLowerCase())
                      )
                      .map((cmd) => (
                        <AICommandBarItem key={cmd.id} shortcut={cmd.shortcut}>
                          {cmd.label}
                        </AICommandBarItem>
                      ))}
                  </AICommandBarGroup>
                  {commands.filter((cmd) =>
                    cmd.label.toLowerCase().includes(query.toLowerCase())
                  ).length === 0 && <AICommandBarEmpty />}
                </>
              )}
            </AICommandBarList>
          )}
        </AICommandBarContent>
      </AICommandBar>
    );
  },
};

export const AllSizes: Story = {
  render: () => (
    <div className="flex gap-4 flex-wrap">
      {(["sm", "md", "lg"] as const).map((size) => (
        <AICommandBar key={size}>
          <AICommandBarTrigger asChild>
            <Button>Size: {size}</Button>
          </AICommandBarTrigger>
          <AICommandBarContent size={size}>
            <AICommandBarList>
              <AICommandBarGroup heading={`Size: ${size}`}>
                <AICommandBarItem>Command 1</AICommandBarItem>
                <AICommandBarItem>Command 2</AICommandBarItem>
                <AICommandBarItem>Command 3</AICommandBarItem>
              </AICommandBarGroup>
            </AICommandBarList>
          </AICommandBarContent>
        </AICommandBar>
      ))}
    </div>
  ),
};
