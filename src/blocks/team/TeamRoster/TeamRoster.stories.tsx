import type { Meta, StoryObj } from "@storybook/react";
import { TeamRoster } from "./TeamRoster";
import type { TeamRosterMember } from "./TeamRoster";

const members: TeamRosterMember[] = [
  {
    id: "1",
    name: "Sarah Mitchell",
    email: "sarah@company.com",
    role: "owner",
    title: "Co-Founder & CEO",
    department: "Leadership",
    avatarUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop",
    status: "active",
    availability: "busy",
    skills: ["Strategy", "Product", "Leadership"],
  },
  {
    id: "2",
    name: "James Chen",
    email: "james@company.com",
    role: "admin",
    title: "Engineering Lead",
    department: "Engineering",
    avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop",
    status: "active",
    availability: "available",
    skills: ["React", "Node.js", "System Design", "AWS"],
  },
  {
    id: "3",
    name: "Alex Rivera",
    email: "alex@company.com",
    role: "member",
    title: "Senior Designer",
    department: "Design",
    avatarUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop",
    status: "active",
    availability: "away",
    skills: ["Figma", "UI/UX", "Motion"],
  },
  {
    id: "4",
    name: "Morgan Taylor",
    email: "morgan@company.com",
    role: "member",
    title: "Product Manager",
    department: "Product",
    avatarUrl: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop",
    status: "active",
    availability: "available",
    skills: ["Roadmapping", "Analytics", "User Research"],
  },
  {
    id: "5",
    name: "Sam Patel",
    email: "sam@company.com",
    role: "billing",
    title: "Finance Manager",
    department: "Finance",
    avatarUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop",
    status: "active",
    availability: "offline",
    skills: ["Finance", "Reporting"],
  },
  {
    id: "6",
    name: "Jordan Lee",
    email: "jordan@company.com",
    role: "member",
    title: "Frontend Engineer",
    department: "Engineering",
    avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop",
    status: "pending",
    skills: ["TypeScript", "CSS", "Testing"],
  },
];

const meta: Meta<typeof TeamRoster> = {
  title: "Blocks/Team/TeamRoster",
  component: TeamRoster,
};

export default meta;
type Story = StoryObj<typeof TeamRoster>;

export const GridView: Story = {
  render: () => (
    <TeamRoster
      members={members}
      view="grid"
      showSkills
      showDepartment
      onMemberClick={(m) => console.log("Click", m.name)}
      onMessage={(m) => console.log("Message", m.name)}
    />
  ),
};

export const GridWithAvailability: Story = {
  render: () => (
    <TeamRoster
      members={members}
      view="grid"
      showAvailability
      showContact
      showDepartment
      onMemberClick={(m) => console.log("Click", m.name)}
      onMessage={(m) => console.log("Message", m.name)}
    />
  ),
};

export const ListView: Story = {
  render: () => (
    <TeamRoster
      members={members}
      view="list"
      showSkills
      showDepartment
      onMemberClick={(m) => console.log("Click", m.name)}
      onMessage={(m) => console.log("Message", m.name)}
    />
  ),
};

export const ListWithAvailability: Story = {
  render: () => (
    <TeamRoster
      members={members}
      view="list"
      showAvailability
      onMemberClick={(m) => console.log("Click", m.name)}
      onMessage={(m) => console.log("Message", m.name)}
    />
  ),
};

export const Empty: Story = {
  render: () => <TeamRoster members={[]} emptyMessage="No team members yet" />,
};

export const DarkMode: Story = {
  decorators: [
    (Story) => (
      <div className="dark bg-background p-6 rounded-lg">
        <Story />
      </div>
    ),
  ],
  render: () => (
    <TeamRoster
      members={members.slice(0, 4)}
      view="grid"
      showSkills
      showAvailability
      onMemberClick={(m) => console.log("Click", m.name)}
      onMessage={(m) => console.log("Message", m.name)}
    />
  ),
};

export const Mobile: Story = {
  parameters: { viewport: { defaultViewport: "mobile1" } },
  render: () => (
    <TeamRoster
      members={members}
      view="grid"
      showSkills
      showAvailability
      onMemberClick={(m) => console.log("Click", m.name)}
    />
  ),
};
