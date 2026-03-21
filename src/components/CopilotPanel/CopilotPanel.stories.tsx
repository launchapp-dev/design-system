import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import {
  CopilotPanel,
  CopilotPanelTrigger,
  CopilotPanelContent,
  CopilotPanelHeader,
  CopilotPanelFooter,
  SuggestionChip,
  SuggestionChipGroup,
  ContextDisplay,
  ContextDisplayGroup,
  CopilotPanelClose,
} from "./index";
import { Button } from "@/components/Button";

const meta: Meta<typeof CopilotPanelContent> = {
  title: "Components/CopilotPanel",
  component: CopilotPanelContent,
  argTypes: {
    side: {
      control: "select",
      options: ["left", "right", "bottom"],
    },
    showCloseButton: { control: "boolean" },
    title: { control: "text" },
    description: { control: "text" },
  },
  args: {
    side: "right",
    showCloseButton: true,
    title: "AI Copilot",
    description: "Your intelligent assistant",
  },
};

export default meta;
type Story = StoryObj<typeof CopilotPanelContent>;

export const Default: Story = {
  render: (args) => (
    <CopilotPanel>
      <CopilotPanelTrigger asChild>
        <Button>Open Copilot</Button>
      </CopilotPanelTrigger>
      <CopilotPanelContent {...args}>
        <div className="p-4 space-y-4">
          <p className="text-sm text-muted-foreground">
            I'm your AI assistant. How can I help you today?
          </p>
        </div>
      </CopilotPanelContent>
    </CopilotPanel>
  ),
};

export const WithSuggestionChips: Story = {
  render: (args) => (
    <CopilotPanel>
      <CopilotPanelTrigger asChild>
        <Button>Open Copilot</Button>
      </CopilotPanelTrigger>
      <CopilotPanelContent {...args}>
        <CopilotPanelHeader>
          <SuggestionChipGroup>
            <SuggestionChip onClick={() => alert("Explain code")}>
              💡 Explain this code
            </SuggestionChip>
            <SuggestionChip onClick={() => alert("Fix bugs")}>
              🐛 Find bugs
            </SuggestionChip>
            <SuggestionChip onClick={() => alert("Optimize")}>
              ⚡ Optimize
            </SuggestionChip>
            <SuggestionChip onClick={() => alert("Add tests")}>
              🧪 Add tests
            </SuggestionChip>
          </SuggestionChipGroup>
        </CopilotPanelHeader>
        <div className="p-4 space-y-4">
          <p className="text-sm text-muted-foreground">
            Select a suggestion or type your own question.
          </p>
        </div>
      </CopilotPanelContent>
    </CopilotPanel>
  ),
};

export const WithContext: Story = {
  render: (args) => (
    <CopilotPanel>
      <CopilotPanelTrigger asChild>
        <Button>Open Copilot</Button>
      </CopilotPanelTrigger>
      <CopilotPanelContent {...args}>
        <div className="p-4 space-y-4">
          <ContextDisplayGroup>
            <ContextDisplay
              label="Current File"
              value="src/components/Button.tsx"
              icon={
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
              }
            />
            <ContextDisplay
              label="Selection"
              value="Lines 45-62: Button component with variants"
              icon={
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
                  <path d="M4 7V4h16v3" />
                  <path d="M9 20h6" />
                  <path d="M12 4v16" />
                </svg>
              }
            />
          </ContextDisplayGroup>
          <p className="text-sm text-muted-foreground">
            I can see you have a Button component selected. What would you like to do?
          </p>
        </div>
      </CopilotPanelContent>
    </CopilotPanel>
  ),
};

export const FullExample: Story = {
  render: (args) => (
    <CopilotPanel>
      <CopilotPanelTrigger asChild>
        <Button>Open Full Copilot</Button>
      </CopilotPanelTrigger>
      <CopilotPanelContent {...args} title="AI Copilot" description="Your coding assistant">
        <CopilotPanelHeader>
          <p className="text-xs text-muted-foreground mb-3">Quick actions</p>
          <SuggestionChipGroup>
            <SuggestionChip>✨ Generate docs</SuggestionChip>
            <SuggestionChip>🔍 Review code</SuggestionChip>
            <SuggestionChip>📝 Refactor</SuggestionChip>
          </SuggestionChipGroup>
        </CopilotPanelHeader>
        <div className="p-4 space-y-4">
          <ContextDisplayGroup>
            <ContextDisplay
              label="Context"
              value="Button.tsx - React component with CVA variants"
            />
          </ContextDisplayGroup>
          <div className="rounded-lg bg-muted p-3">
            <p className="text-sm">
              This component uses class-variance-authority for managing style variants.
              Would you like me to add a new variant or improve the existing ones?
            </p>
          </div>
        </div>
        <CopilotPanelFooter>
          <CopilotPanelClose asChild>
            <Button variant="outline" size="sm">Cancel</Button>
          </CopilotPanelClose>
          <Button size="sm">Apply Suggestion</Button>
        </CopilotPanelFooter>
      </CopilotPanelContent>
    </CopilotPanel>
  ),
};

export const LeftSide: Story = {
  args: {
    side: "left",
    title: "Left Panel",
  },
  render: (args) => (
    <CopilotPanel>
      <CopilotPanelTrigger asChild>
        <Button>Open Left Panel</Button>
      </CopilotPanelTrigger>
      <CopilotPanelContent {...args}>
        <div className="p-4">
          <p className="text-sm">This panel slides in from the left side.</p>
        </div>
      </CopilotPanelContent>
    </CopilotPanel>
  ),
};

export const BottomPanel: Story = {
  args: {
    side: "bottom",
    title: "Bottom Panel",
  },
  render: (args) => (
    <CopilotPanel>
      <CopilotPanelTrigger asChild>
        <Button>Open Bottom Panel</Button>
      </CopilotPanelTrigger>
      <CopilotPanelContent {...args}>
        <div className="p-4">
          <p className="text-sm">This panel slides up from the bottom.</p>
        </div>
      </CopilotPanelContent>
    </CopilotPanel>
  ),
};

export const ActiveChip: Story = {
  render: () => (
    <div className="p-4">
      <SuggestionChipGroup>
        <SuggestionChip>Inactive chip</SuggestionChip>
        <SuggestionChip active>Active chip</SuggestionChip>
        <SuggestionChip>Inactive chip</SuggestionChip>
      </SuggestionChipGroup>
    </div>
  ),
};
