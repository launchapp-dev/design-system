import type { Meta, StoryObj } from "@storybook/react";
import { SmartThemingGenerator } from "./SmartThemingGenerator";

const meta: Meta<typeof SmartThemingGenerator> = {
  title: "Components/SmartThemingGenerator",
  component: SmartThemingGenerator,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof SmartThemingGenerator>;

export const Default: Story = {
  render: () => (
    <SmartThemingGenerator
      onThemeGenerated={(theme) => {
        console.log("Theme generated:", theme);
      }}
    />
  ),
};

export const WithApiKey: Story = {
  render: () => (
    <SmartThemingGenerator
      apiKey={process.env.STORYBOOK_OPENAI_API_KEY}
      onVisionResult={(result) => {
        console.log("Vision result:", result);
      }}
      onThemeGenerated={(theme) => {
        console.log("Theme generated:", theme);
      }}
    />
  ),
};
