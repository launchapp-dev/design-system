import type { Meta, StoryObj } from "@storybook/react";
import { Badge } from "../../../components/Badge";
import { Button } from "../../../components/Button";
import { Agency } from "./index";

const sampleServices = [
  {
    icon: (
      <svg
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
        />
      </svg>
    ),
    title: "Web Design & Development",
    description:
      "We design and build fast, accessible websites that convert visitors into customers.",
  },
  {
    icon: (
      <svg
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
        />
      </svg>
    ),
    title: "Mobile App Development",
    description:
      "Native and cross-platform mobile apps built with modern frameworks.",
  },
  {
    icon: (
      <svg
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
        />
      </svg>
    ),
    title: "Brand Strategy",
    description:
      "From logo design to brand guidelines, we craft identities that stand out.",
  },
  {
    title: "SEO & Performance",
    description:
      "Data-driven SEO strategies that drive organic growth and improve rankings.",
  },
  {
    title: "Cloud & DevOps",
    description:
      "Scalable cloud infrastructure and CI/CD pipelines for modern applications.",
  },
  {
    title: "UX Research",
    description:
      "In-depth user research and usability testing to inform product decisions.",
  },
];

const sampleTeam = [
  {
    name: "Maria Santos",
    role: "CEO & Creative Director",
    avatarFallback: "MS",
  },
  { name: "David Kim", role: "Head of Engineering", avatarFallback: "DK" },
  { name: "Priya Patel", role: "Lead Designer", avatarFallback: "PP" },
  { name: "James Wright", role: "Strategy Lead", avatarFallback: "JW" },
  { name: "Sofia Chen", role: "Frontend Engineer", avatarFallback: "SC" },
  { name: "Omar Hassan", role: "Backend Engineer", avatarFallback: "OH" },
  { name: "Emma Taylor", role: "Project Manager", avatarFallback: "ET" },
  { name: "Luca Ferrari", role: "Motion Designer", avatarFallback: "LF" },
];

const sampleCaseStudies = [
  {
    title: "Fintech Platform Redesign",
    description:
      "Redesigned the core product for a series-B fintech startup, improving user retention by 45% and cutting support tickets by 30%.",
    result: "45% increase in user retention",
    tags: ["UX Research", "Product Design", "React"],
    image: (
      <div className="h-full w-full bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-900/30 dark:to-indigo-900/30 flex items-center justify-center text-muted-foreground text-sm">
        Case study preview
      </div>
    ),
  },
  {
    title: "E-commerce Growth Strategy",
    description:
      "End-to-end digital strategy and implementation for a DTC brand, scaling revenue from $2M to $8M ARR in 18 months.",
    result: "4× revenue growth in 18 months",
    tags: ["SEO", "Performance", "Next.js"],
    image: (
      <div className="h-full w-full bg-gradient-to-br from-emerald-100 to-teal-100 dark:from-emerald-900/30 dark:to-teal-900/30 flex items-center justify-center text-muted-foreground text-sm">
        Case study preview
      </div>
    ),
  },
  {
    title: "Healthcare App Launch",
    description:
      "Built a HIPAA-compliant mobile app for patient-provider communication, deployed across 50 clinics in 6 months.",
    result: "50 clinics onboarded in 6 months",
    tags: ["React Native", "HIPAA", "Cloud"],
  },
  {
    title: "B2B SaaS Rebrand",
    description:
      "Complete rebrand of an enterprise SaaS product including identity, website, and marketing materials.",
    result: "120% increase in qualified leads",
    tags: ["Brand Strategy", "Web Design", "Copywriting"],
  },
];

const meta: Meta<typeof Agency> = {
  title: "Blocks/Landing/Agency",
  component: Agency,
  parameters: {
    layout: "fullscreen",
    docs: {
      source: {
        code: `import { Agency } from "@launchapp/design-system";
import { Button, Badge } from "@launchapp/design-system";

export default function Page() {
  return (
    <Agency
      headline="We build digital products that drive growth"
      subheadline="Strategy, design, and engineering for ambitious companies."
      primaryAction={<Button size="lg">Start a project</Button>}
      services={services}
      team={team}
      caseStudies={caseStudies}
    />
  );
}`,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Agency>;

export const Default: Story = {
  render: () => (
    <Agency
      badge={<Badge variant="secondary">Award-winning agency</Badge>}
      headline="We build digital products that drive growth"
      subheadline="Strategy, design, and engineering for ambitious companies. From seed to Series C and beyond."
      primaryAction={<Button size="lg">Start a project</Button>}
      secondaryAction={
        <Button size="lg" variant="outline">
          View our work
        </Button>
      }
      services={sampleServices}
      servicesSubtitle="Full-service digital agency covering every touchpoint of your product journey."
      team={sampleTeam}
      teamSubtitle="A team of passionate craftspeople dedicated to your success."
      caseStudies={sampleCaseStudies}
      caseStudiesSubtitle="Real results for real clients."
    />
  ),
};

export const ServicesOnly: Story = {
  render: () => (
    <Agency
      headline="What we do"
      subheadline="Specialized services for digital-first businesses."
      services={sampleServices}
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
    <Agency
      headline="Building the future, one product at a time"
      subheadline="Digital-native agency for the next generation of companies."
      primaryAction={<Button size="lg">Get in touch</Button>}
      services={sampleServices.slice(0, 3)}
      team={sampleTeam.slice(0, 4)}
      caseStudies={sampleCaseStudies.slice(0, 2)}
    />
  ),
};

export const Mobile: Story = {
  parameters: { viewport: { defaultViewport: "mobile1" } },
  render: () => (
    <Agency
      headline="Digital agency for ambitious brands"
      subheadline="Strategy, design, and engineering."
      primaryAction={<Button size="lg">Start a project</Button>}
      services={sampleServices.slice(0, 3)}
      team={sampleTeam.slice(0, 4)}
      caseStudies={sampleCaseStudies.slice(0, 2)}
    />
  ),
};
