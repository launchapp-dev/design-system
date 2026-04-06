import type { Meta, StoryObj } from "@storybook/react";
import { TeamMemberCard, TeamGrid } from "./TeamMemberCard";

const meta = {
  title: "Blocks/Community/TeamMemberCard",
  component: TeamMemberCard,
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof TeamMemberCard>;

export default meta;
type Story = StoryObj<typeof meta>;

const alice = {
  name: "Alice Chen",
  role: "Engineering Lead",
  department: "Platform",
  bio: "Building resilient infrastructure and shipping at scale. Previously at Stripe and Vercel.",
  initials: "AC",
  socialLinks: [
    { network: "twitter" as const, href: "https://twitter.com" },
    { network: "github" as const, href: "https://github.com" },
    { network: "linkedin" as const, href: "https://linkedin.com" },
  ],
  tags: ["TypeScript", "Go", "Kubernetes"],
};

const bob = {
  name: "Bob Marsden",
  role: "Product Designer",
  department: "Design",
  bio: "Designing intuitive interfaces that delight. Focused on design systems and accessibility.",
  initials: "BM",
  socialLinks: [
    { network: "twitter" as const, href: "https://twitter.com" },
    { network: "website" as const, href: "https://example.com" },
  ],
  tags: ["Figma", "Motion", "A11y"],
};

const carol = {
  name: "Carol Silva",
  role: "Head of Growth",
  department: "Marketing",
  bio: "Turning data into decisions. Ex-YC, helped 3 startups reach Series A.",
  initials: "CS",
  socialLinks: [
    { network: "linkedin" as const, href: "https://linkedin.com" },
    { network: "twitter" as const, href: "https://twitter.com" },
  ],
  tags: ["SEO", "Analytics", "Copywriting"],
};

const dave = {
  name: "Dave Park",
  role: "Backend Engineer",
  department: "Platform",
  bio: "PostgreSQL aficionado. Building reliable APIs that handle millions of requests.",
  initials: "DP",
  socialLinks: [{ network: "github" as const, href: "https://github.com" }],
  tags: ["Rust", "PostgreSQL", "Redis"],
};

export const Default: Story = {
  args: alice,
};

export const Horizontal: Story = {
  args: { ...alice, variant: "horizontal" },
  parameters: { layout: "padded" },
  decorators: [
    (S) => (
      <div className="max-w-sm">
        <S />
      </div>
    ),
  ],
};

export const Minimal: Story = {
  args: { ...alice, variant: "minimal" },
};

export const NoAvatar: Story = {
  args: {
    name: "Sam Wright",
    role: "CTO",
    department: "Engineering",
    initials: "SW",
    socialLinks: [
      { network: "github" as const, href: "https://github.com" },
      { network: "twitter" as const, href: "https://twitter.com" },
    ],
  },
};

// ── Grid stories ─────────────────────────────────────────────────────────────

const GridMeta = {
  title: "Blocks/Community/TeamGrid",
  component: TeamGrid,
  parameters: { layout: "padded" },
} satisfies Meta<typeof TeamGrid>;

export const Grid3Col: StoryObj<typeof GridMeta> = {
  render: () => (
    <TeamGrid
      members={[alice, bob, carol, dave]}
      columns={3}
      headline="Meet the team"
      subheadline="A small but mighty crew shipping product every day."
    />
  ),
};

export const Grid4Col: StoryObj<typeof GridMeta> = {
  render: () => (
    <TeamGrid
      members={[alice, bob, carol, dave]}
      columns={4}
      variant="minimal"
      headline="Our people"
    />
  ),
};

export const GridHorizontal: StoryObj<typeof GridMeta> = {
  render: () => <TeamGrid members={[alice, bob, carol]} columns={2} variant="horizontal" />,
};
