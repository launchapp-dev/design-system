import type { Meta, StoryObj } from "@storybook/react";
import { ThemeCard } from "./ThemeCard";
import { getCommunityThemeById } from "../../themes/community-registry";

const dracula = getCommunityThemeById("dracula") as import("../../themes/community-themes").CommunityTheme;
const nord = getCommunityThemeById("nord") as import("../../themes/community-themes").CommunityTheme;

const meta: Meta<typeof ThemeCard> = {
  title: "Components/ThemeCard",
  component: ThemeCard,
  parameters: {
    layout: "centered",
    docs: {
      source: {
        code: `import { ThemeCard } from "@launchapp/design-system";
import { getCommunityThemeById } from "@launchapp/design-system";

const theme = getCommunityThemeById("dracula");

export default function Page() {
  return (
    <ThemeCard
      theme={theme}
      onViewDetails={(id) => console.log("View details:", id)}
      onUseTheme={(id) => console.log("Use theme:", id)}
    />
  );
}`,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof ThemeCard>;

export const Default: Story = {
  args: {
    theme: dracula,
    onViewDetails: (id) => alert(`View details for: ${id}`),
    onUseTheme: (id) => alert(`Use theme: ${id}`),
  },
};

export const Featured: Story = {
  args: {
    theme: nord,
    isFeatured: true,
    onViewDetails: (id) => console.log("View details:", id),
    onUseTheme: (id) => console.log("Use theme:", id),
  },
};

export const Compact: Story = {
  args: {
    theme: dracula,
    onViewDetails: undefined,
  },
};
