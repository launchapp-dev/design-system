import type { Meta, StoryObj } from "@storybook/react";
import { Avatar, AvatarFallback } from "../../../components/Avatar";
import { Portfolio } from "./index";

const sampleProjects = [
  {
    title: "E-commerce Redesign",
    description:
      "Complete redesign of a fashion brand's online store, increasing conversion rate by 32%.",
    tags: ["React", "TypeScript", "Tailwind CSS"],
    image: (
      <div className="h-full w-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center text-muted-foreground text-sm">
        Project preview
      </div>
    ),
    link: "#",
  },
  {
    title: "SaaS Dashboard",
    description:
      "Analytics dashboard for a B2B SaaS product with real-time data visualization.",
    tags: ["Next.js", "Recharts", "PostgreSQL"],
    image: (
      <div className="h-full w-full bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 flex items-center justify-center text-muted-foreground text-sm">
        Dashboard preview
      </div>
    ),
  },
  {
    title: "Mobile App",
    description:
      "Cross-platform mobile app for task management with offline sync.",
    tags: ["React Native", "Expo", "SQLite"],
    link: "#",
  },
  {
    title: "Design System",
    description:
      "Custom design system for a fintech startup, documenting 80+ components.",
    tags: ["Storybook", "Figma", "TypeScript"],
  },
  {
    title: "Marketing Site",
    description:
      "High-performance marketing site with animations and CMS integration.",
    tags: ["Next.js", "Framer Motion", "Contentful"],
    link: "#",
  },
  {
    title: "Data Pipeline",
    description:
      "ETL pipeline processing 10M+ events per day for analytics reporting.",
    tags: ["Python", "Apache Kafka", "dbt"],
  },
];

const meta: Meta<typeof Portfolio> = {
  title: "Blocks/Landing/Portfolio",
  component: Portfolio,
  parameters: {
    layout: "fullscreen",
    docs: {
      source: {
        code: `import { Portfolio } from "@launchapp/design-system";

export default function Page() {
  return (
    <Portfolio
      name="Alex Johnson"
      title="Full-stack engineer & designer"
      bio="I build products that people love to use."
      projects={projects}
    />
  );
}`,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Portfolio>;

export const Default: Story = {
  render: () => (
    <Portfolio
      name="Alex Johnson"
      title="Full-stack engineer & designer"
      avatar={
        <Avatar className="h-24 w-24">
          <AvatarFallback className="text-2xl">AJ</AvatarFallback>
        </Avatar>
      }
      bio="I'm a full-stack engineer with 8 years of experience building products for startups and enterprises. I love working at the intersection of design and engineering."
      projects={sampleProjects}
      contactTitle="Let's work together"
      contactSubtitle="Have a project in mind? I'd love to hear about it."
    />
  ),
};

export const MinimalBio: Story = {
  render: () => (
    <Portfolio
      name="Sam Rivera"
      title="UI/UX Designer"
      projects={sampleProjects.slice(0, 3)}
      contactTitle="Say hello"
    />
  ),
};

export const DarkMode: Story = {
  decorators: [
    (Story) => (
      <div className="dark bg-background">
        <Story />
      </div>
    ),
  ],
  render: () => (
    <Portfolio
      name="Jordan Lee"
      title="Frontend engineer"
      bio="Building accessible, performant web experiences."
      avatar={
        <Avatar className="h-24 w-24">
          <AvatarFallback className="text-2xl">JL</AvatarFallback>
        </Avatar>
      }
      projects={sampleProjects}
      contactTitle="Get in touch"
    />
  ),
};

export const Mobile: Story = {
  parameters: { viewport: { defaultViewport: "mobile1" } },
  render: () => (
    <Portfolio
      name="Alex Johnson"
      title="Full-stack engineer"
      bio="I build products at the intersection of design and engineering."
      projects={sampleProjects.slice(0, 3)}
    />
  ),
};
