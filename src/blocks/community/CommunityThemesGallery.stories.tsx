import type { Meta, StoryObj } from "@storybook/react";
import { CommunityThemesGallery } from "./CommunityThemesGallery";

const meta: Meta<typeof CommunityThemesGallery> = {
  title: "Blocks/Community/CommunityThemesGallery",
  component: CommunityThemesGallery,
  parameters: {
    layout: "default",
    docs: {
      source: {
        code: `import { CommunityThemesGallery } from "@launchapp/design-system/blocks";

export default function Page() {
  return (
    <CommunityThemesGallery
      featuredThemeIds={["dracula", "nord"]}
      onUseTheme={(themeId) => {
        console.log("Use theme:", themeId);
      }}
      columns={3}
    />
  );
}`,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof CommunityThemesGallery>;

export const Default: Story = {
  args: {
    onUseTheme: (themeId) => {
      console.log("Using theme:", themeId);
      alert(`Now using theme: ${themeId}`);
    },
    columns: 3,
  },
};

export const WithFeaturedThemes: Story = {
  args: {
    featuredThemeIds: ["dracula", "nord"],
    onUseTheme: (themeId) => {
      console.log("Using theme:", themeId);
      alert(`Now using theme: ${themeId}`);
    },
    columns: 3,
  },
};

export const TwoColumns: Story = {
  args: {
    featuredThemeIds: ["dracula"],
    onUseTheme: (themeId) => {
      console.log("Using theme:", themeId);
    },
    columns: 2,
  },
};

export const FourColumns: Story = {
  args: {
    featuredThemeIds: ["dracula", "nord", "gruvbox"],
    onUseTheme: (themeId) => {
      console.log("Using theme:", themeId);
    },
    columns: 4,
  },
};
