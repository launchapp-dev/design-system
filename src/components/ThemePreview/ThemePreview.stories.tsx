import type { Meta, StoryObj } from "@storybook/react";
import type { VisionColorMap } from "@/lib/vision";
import { ThemePreview } from "./ThemePreview";

const meta: Meta<typeof ThemePreview> = {
  title: "Components/ThemePreview",
  component: ThemePreview,
  parameters: {
    layout: "centered",
    docs: {
      source: {
        code: `import { ThemePreview } from "@launchapp/design-system";

const colors = {
  primary: "#3B82F6",
  secondary: "#8B5CF6",
  accent: "#EC4899",
  muted: "#6B7280",
  destructive: "#EF4444",
};

export default function Page() {
  return <ThemePreview colors={colors} />;
}`,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof ThemePreview>;

const blueTheme: VisionColorMap = {
  primary: "#3B82F6",
  secondary: "#8B5CF6",
  accent: "#EC4899",
  muted: "#6B7280",
  destructive: "#EF4444",
};

const greenTheme: VisionColorMap = {
  primary: "#10B981",
  secondary: "#14B8A6",
  accent: "#F59E0B",
  muted: "#6B7280",
  destructive: "#EF4444",
};

const purpleTheme: VisionColorMap = {
  primary: "#A855F7",
  secondary: "#D946EF",
  accent: "#EC4899",
  muted: "#6B7280",
  destructive: "#EF4444",
};

export const ColorPalettePreview: Story = {
  args: {
    colors: blueTheme,
  },
};

export const GreenTheme: Story = {
  args: {
    colors: greenTheme,
  },
};

export const PurpleTheme: Story = {
  args: {
    colors: purpleTheme,
  },
};

export const EmptyState: Story = {
  args: {
    colors: null,
  },
};

export const ComponentExamples: Story = {
  args: {
    colors: blueTheme,
  },
  parameters: {
    docs: {
      description: {
        story:
          "Shows buttons, badges, and cards rendered with the generated theme",
      },
    },
  },
};

export const DarkModeToggle: Story = {
  args: {
    colors: blueTheme,
  },
  parameters: {
    docs: {
      description: {
        story:
          "The theme preview includes a dark mode toggle to see how tokens adapt",
      },
    },
  },
};

export const CSSTokenDisplay: Story = {
  args: {
    colors: greenTheme,
  },
  parameters: {
    docs: {
      description: {
        story:
          "Displays CSS custom properties that can be copied into your project",
      },
    },
  },
};
