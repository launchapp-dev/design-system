import type { Meta, StoryObj } from "@storybook/react";
import { UserProfileHeader, type UserProfileStat, } from "./UserProfileHeader";

const stats: UserProfileStat[] = [
  { label: "Followers", value: "12.4k" },
  { label: "Following", value: "842" },
  { label: "Projects", value: "28" },
];

const meta: Meta<typeof UserProfileHeader> = {
  title: "Blocks/Profile/UserProfileHeader",
  component: UserProfileHeader,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof UserProfileHeader>;

export const Default: Story = {
  args: {
    user: {
      name: "Sarah Chen",
      username: "sarahchen",
      role: "Product Designer",
      bio: "Building products that matter. Previously at Figma, Stripe, and Linear. Passionate about design systems and developer experience.",
      avatar: "https://i.pravatar.cc/150?u=sarah",
      initials: "SC",
      location: "San Francisco, CA",
      website: "sarahchen.design",
      joinedDate: "March 2024",
      isVerified: true,
    },
    stats,
    coverImage: "https://images.unsplash.com/photo-1557683316-973673baf926?w=800&q=80",
  },
};

export const WithoutCover: Story = {
  args: {
    user: {
      name: "Alex Kim",
      username: "alexkim",
      role: "Frontend Engineer",
      bio: "Building the future of web at LaunchApp.",
      avatar: "https://i.pravatar.cc/150?u=alex",
      initials: "AK",
      location: "Seattle, WA",
      joinedDate: "January 2025",
    },
    stats: stats.slice(0, 2),
    isFollowing: true,
  },
};

export const WithActions: Story = {
  args: {
    user: {
      name: "Jordan Lee",
      username: "jordanlee",
      role: "Engineering Manager",
      avatar: "https://i.pravatar.cc/150?u=jordan",
      initials: "JL",
    },
    actions: [
      { label: "Edit Profile", variant: "outline", onClick: () => {} },
      { label: "Message", onClick: () => {} },
    ],
  },
};