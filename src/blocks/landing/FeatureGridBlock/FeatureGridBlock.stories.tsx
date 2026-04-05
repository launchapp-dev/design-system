import type { Meta, StoryObj } from "@storybook/react";
import { FeatureGridBlock } from "./FeatureGridBlock";
import {
  Shield,
  Zap,
  Globe,
  Database,
  Lock,
  BarChart3,
  Users,
  Code,
  Cloud,
  Headphones,
  Smartphone,
  Clock,
} from "lucide-react";

const meta: Meta<typeof FeatureGridBlock> = {
  title: "Blocks/Landing/FeatureGridBlock",
  component: FeatureGridBlock,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof FeatureGridBlock>;

const defaultFeatures = [
  {
    icon: <Shield className="h-6 w-6" />,
    title: "Enterprise Security",
    description:
      "Bank-grade encryption and security protocols to keep your data safe and compliant.",
  },
  {
    icon: <Zap className="h-6 w-6" />,
    title: "Lightning Fast",
    description:
      "Optimized for performance with edge caching and global CDN distribution.",
  },
  {
    icon: <Globe className="h-6 w-6" />,
    title: "Global Scale",
    description:
      "Deploy worldwide with 99.99% uptime SLA and automatic failover protection.",
  },
  {
    icon: <Database className="h-6 w-6" />,
    title: "Reliable Storage",
    description:
      "Redundant data storage with automatic backups and point-in-time recovery.",
  },
  {
    icon: <Lock className="h-6 w-6" />,
    title: "Access Control",
    description:
      "Granular permissions and SSO integration for seamless team management.",
  },
  {
    icon: <BarChart3 className="h-6 w-6" />,
    title: "Advanced Analytics",
    description:
      "Real-time insights and custom reports to track your most important metrics.",
  },
];

const fourColumnFeatures = [
  {
    icon: <Users className="h-6 w-6" />,
    title: "Team Collaboration",
    description: "Work together seamlessly with shared workspaces and comments.",
  },
  {
    icon: <Code className="h-6 w-6" />,
    title: "Developer API",
    description: "RESTful API with SDKs for popular languages and frameworks.",
  },
  {
    icon: <Cloud className="h-6 w-6" />,
    title: "Cloud Native",
    description: "Built for the cloud with Kubernetes and container orchestration.",
  },
  {
    icon: <Headphones className="h-6 w-6" />,
    title: "24/7 Support",
    description: "Round-the-clock expert support via chat, email, and phone.",
  },
];

const sixColumnFeatures = [
  { icon: <Zap className="h-5 w-5" />, title: "Fast", description: "Lightning speed" },
  { icon: <Shield className="h-5 w-5" />, title: "Secure", description: "Enterprise grade" },
  { icon: <Globe className="h-5 w-5" />, title: "Global", description: "Worldwide nodes" },
  { icon: <Database className="h-5 w-5" />, title: "Reliable", description: "99.99% uptime" },
  { icon: <Smartphone className="h-5 w-5" />, title: "Mobile", description: "iOS & Android" },
  { icon: <Clock className="h-5 w-5" />, title: "Always On", description: "24/7 support" },
];

export const Default: Story = {
  args: {
    headline: "Everything you need to scale",
    subheadline:
      "Powerful features designed to help you build, launch, and grow your product faster.",
    features: defaultFeatures,
    columns: "3",
    centered: true,
  },
};

export const ThreeColumns: Story = {
  args: {
    headline: "Three Column Layout",
    subheadline: "Perfect for showcasing 3-6 key features with detailed descriptions.",
    features: defaultFeatures.slice(0, 3),
    columns: "3",
    centered: true,
  },
};

export const FourColumns: Story = {
  args: {
    headline: "Four Column Layout",
    subheadline: "Great for displaying 4-8 features in a compact grid.",
    features: fourColumnFeatures,
    columns: "4",
    centered: true,
  },
};

export const SixColumns: Story = {
  args: {
    headline: "Six Column Layout",
    subheadline: "Ideal for displaying many smaller features or integrations.",
    features: sixColumnFeatures,
    columns: "6",
    centered: true,
  },
};

export const Bordered: Story = {
  args: {
    headline: "Bordered Variant",
    subheadline: "Adds visual separation with top and bottom borders.",
    features: defaultFeatures.slice(0, 3),
    columns: "3",
    variant: "bordered",
    centered: true,
  },
};

export const Muted: Story = {
  args: {
    headline: "Muted Background",
    subheadline: "Subtle background color to visually group the section.",
    features: defaultFeatures.slice(0, 3),
    columns: "3",
    variant: "muted",
    centered: true,
  },
};

export const LeftAligned: Story = {
  args: {
    headline: "Left Aligned",
    subheadline: "Text and feature cards aligned to the left.",
    features: defaultFeatures.slice(0, 3),
    columns: "3",
    centered: false,
  },
};

export const Interactive: Story = {
  args: {
    headline: "Interactive Cards",
    subheadline: "Cards with hover effects for clickable feature items.",
    features: defaultFeatures.slice(0, 3),
    columns: "3",
    interactive: true,
    centered: true,
  },
};

export const WithoutHeadline: Story = {
  args: {
    features: defaultFeatures.slice(0, 3),
    columns: "3",
    centered: true,
  },
};

export const WithoutIcons: Story = {
  args: {
    headline: "Features Without Icons",
    subheadline: "Clean text-only feature cards for a minimal look.",
    features: defaultFeatures.slice(0, 3).map(({ title, description }) => ({
      title,
      description,
    })),
    columns: "3",
    centered: true,
  },
};
