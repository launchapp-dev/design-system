import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { SmartThemingGenerator } from "./SmartThemingGenerator";
import { ThemePreview } from "../ThemePreview";
import type { VisionColorMap } from "@/lib/vision";

const meta: Meta<typeof SmartThemingGenerator> = {
  title: "Design System/Smart Theming",
  component: SmartThemingGenerator,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: `
## Accessibility Features

### Keyboard Navigation
- **Tab**: Navigate through color inputs and controls
- **Arrow Keys**: Adjust color values
- **Space/Enter**: Apply theme changes
- **Escape**: Cancel changes if in modal

### Screen Reader Behavior
- Theme generator announced as application
- Color inputs labeled with descriptive names
- Generated color palette announced with contrast ratios
- Contrast issues highlighted in announcements
- Preview updates announced

### Visual Accessibility
- High contrast color picker interface
- Sufficient contrast between controls and background
- Clear labels for all inputs
- WCAG contrast ratio display for generated colors
- Magnified color preview available

### Color Vision Deficiency Support
- Simulated vision mode shows how colors appear
- Protanopia, Deuteranopia, Tritanopia modes available
- Contrast checker identifies accessibility issues
- Generates theme from accessible color
        `,
      },
    },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof SmartThemingGenerator>;

export const Generator: Story = {
  render: function Render(props) {
    const [colors, setColors] = useState<VisionColorMap | null>(null);

    return (
      <div className="space-y-8">
        <SmartThemingGenerator
          apiKey={props.apiKey || ""}
          onThemeGenerated={setColors}
          disabled={props.disabled}
        />
        <ThemePreview colors={colors} />
      </div>
    );
  },
  args: {
    apiKey: process.env.REACT_APP_ANTHROPIC_API_KEY || "",
  },
};

export const WithCustomApiKey: Story = {
  render: function Render() {
    const [colors, setColors] = useState<VisionColorMap | null>(null);

    return (
      <div className="space-y-8">
        <SmartThemingGenerator apiKey="sk-test-key-here" onThemeGenerated={setColors} />
        <ThemePreview colors={colors} />
      </div>
    );
  },
};

export const PreviewOnly: Story = {
  render: function Render() {
    const [colors] = useState<VisionColorMap>({
      primary: "#3b82f6",
      secondary: "#8b5cf6",
      muted: "#e2e8f0",
      accent: "#06b6d4",
      destructive: "#ef4444",
    });

    return <ThemePreview colors={colors} />;
  },
};

export const DisabledState: Story = {
  render: function Render() {
    return <SmartThemingGenerator apiKey="" disabled={true} />;
  },
};
