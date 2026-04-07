import type { Meta, StoryObj } from "@storybook/react";
import { UserProfileCard } from "./UserProfileCard";
import type { UserProfileCardProps } from "./UserProfileCard";

const defaultUser = {
  name: "Alice Johnson",
  username: "alicej",
  avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop",
  bio: "Product designer crafting delightful user experiences. Building the future of SaaS.",
  location: "San Francisco, CA",
  website: "https://alice.design",
  email: "alice@example.com",
  joinedDate: "March 2024",
  isVerified: true,
};

const stats = [
  { label: "Followers", value: "2.4k" },
  { label: "Following", value: "186" },
  { label: "Projects", value: "42" },
];

const badges = [
  { label: "Pro Member" },
  { label: "Top Contributor" },
];

const meta: Meta<typeof UserProfileCard> = {
  title: "Blocks/Community/UserProfileCard",
  component: UserProfileCard,
  parameters: {
    layout: "padded",
  },
};

export default meta;
type Story = StoryObj<typeof UserProfileCard>;

export const Default: Story = {
  args: {
    user: defaultUser,
    stats,
    badges,
    coverImage: "https://images.unsplash.com/photo-1557683316-973673bdar25?w=600&h=200&fit=crop",
    actions: [
      { label: "Follow", onClick: () => console.log("Follow") },
      { label: "Message", onClick: () => console.log("Message"), variant: "outline" },
    ],
  } as StoryArgs,
};

export const Compact: Story = {
  args: {
    user: { ...defaultUser, bio: undefined, website: undefined, email: undefined },
    stats: stats.slice(0, 1),
    size: "sm",
    actions: [
      { label: "Follow", onClick: () => console.log("Follow") },
    ],
  } as StoryArgs,
};

export const Large: Story = {
  args: {
    user: defaultUser,
    stats,
    badges,
    size: "lg",
    showEmail: true,
    showJoinedDate: true,
    coverImage: "https://images.unsplash.com/photo-1557683316-973673baf25b?w=600&h=200&fit=crop",
    actions: [
      { label: "Follow", onClick: () => console.log("Follow") },
      { label: "Message", onClick: () => console.log("Message"), variant: "outline" },
    ],
  } as StoryArgs,
};

export const Following: Story = {
  name: "Following State",
  args: {
    user: defaultUser,
    stats,
    isFollowing: true,
    actions: [
      { label: "Following", onClick: () => console.log("Unfollow") },
      { label: "Message", onClick: () => console.log("Message"), variant: "outline" },
    ],
  } as StoryArgs,
};

export const NoStats: Story = {
  name: "No Stats",
  args: {
    user: { ...defaultUser, bio: undefined },
    badges,
    actions: [
      { label: "Follow", onClick: () => console.log("Follow") },
    ],
  } as StoryArgs,
};

export const DarkMode: Story = {
  decorators: [
    (Story) => (
      <div className="dark bg-background p-6 rounded-lg">
        <Story />
      </div>
    ),
  ],
  args: {
    user: defaultUser,
    stats,
    badges,
    coverImage: "https://images.unsplash.com/photo-1557683316-973673baf25b?w=600&h=200&fit=crop",
    actions: [
      { label: "Follow", onClick: () => console.log("Follow") },
    ],
  } as StoryArgs,
};

export const Mobile: Story = {
  parameters: {
    viewport: { defaultViewport: "mobile1" },
  },
  args: {
    user: defaultUser,
    stats,
    actions: [
      { label: "Follow", onClick: () => console.log("Follow") },
      { label: "Message", onClick: () => console.log("Message"), variant: "outline" },
    ],
  } as StoryArgs,
};

type StoryArgs = StoryObj<UserProfileCardProps>;
