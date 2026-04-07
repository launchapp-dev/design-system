import type * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { UserProfileCard } from "./UserProfileCard";

const meta: Meta<typeof UserProfileCard> = {
  title: "Blocks/Profile/UserProfileCard",
  component: UserProfileCard,
  parameters: {
    layout: "padded",
    docs: {
      source: {
        code: `import { UserProfileCard } from "@launchapp/design-system/blocks/profile";

export default function Page() {
  return (
    <div className="max-w-sm">
      <UserProfileCard
        name="Alice Chen"
        role="Senior Engineer"
        email="alice@example.com"
        bio="Building great products at LaunchApp. Passionate about developer experience and design systems."
        location="San Francisco, CA"
        website="https://alice.example.com"
        socialLinks={[
          { platform: "github", url: "https://github.com/alice", label: "GitHub" },
          { platform: "twitter", url: "https://twitter.com/alice", label: "Twitter" },
        ]}
        tags={["React", "TypeScript", "Design Systems"]}
        onEdit={() => {}}
        onMessage={() => {}}
      />
    </div>
  );
}`,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof UserProfileCard>;

export const Default: Story = {
  render: (args) => (
    <div className="max-w-sm">
      <UserProfileCard {...args} />
    </div>
  ),
  args: {
    name: "Alice Chen",
    role: "Senior Engineer",
    email: "alice@example.com",
    bio: "Building great products at LaunchApp. Passionate about DX and design systems.",
    location: "San Francisco, CA",
    website: "https://alice.example.com",
    socialLinks: [
      { platform: "github", url: "https://github.com/alice" },
      { platform: "twitter", url: "https://twitter.com/alice" },
    ],
    tags: ["React", "TypeScript", "Design Systems"],
    onEdit: () => {},
    onMessage: () => {},
  },
};

export const Minimal: Story = {
  render: (args) => (
    <div className="max-w-sm">
      <UserProfileCard {...args} />
    </div>
  ),
  args: {
    name: "Bob Kim",
    role: "Product Manager",
    avatarFallback: "BK",
  },
};

export const DarkMode: Story = {
  parameters: { backgrounds: { default: "dark" } },
  render: (args) => (
    <div className="dark bg-background p-6 max-w-sm">
      <UserProfileCard {...args} />
    </div>
  ),
  args: {
    name: "Charlie Park",
    role: "CTO",
    email: "charlie@launchapp.dev",
    bio: "Serial founder. Previously built products used by millions.",
    location: "New York, NY",
    socialLinks: [{ platform: "linkedin", url: "https://linkedin.com/in/charlie" }],
    tags: ["Leadership", "Architecture"],
    onEdit: () => {},
  },
};

export const Mobile: Story = {
  parameters: { viewport: { defaultViewport: "mobile1" } },
  render: (args) => (
    <div className="max-w-xs">
      <UserProfileCard {...args} />
    </div>
  ),
  args: {
    name: "Dana Lee",
    role: "Designer",
    email: "dana@example.com",
    bio: "UI/UX Designer focused on clean, functional interfaces.",
    tags: ["Figma", "CSS", "Motion"],
    onEdit: () => {},
    onMessage: () => {},
  },
};
