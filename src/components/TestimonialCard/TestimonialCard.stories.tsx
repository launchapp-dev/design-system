import type { Meta, StoryObj } from "@storybook/react";
import { TestimonialCard, TestimonialCardGrid } from "./TestimonialCard";

const meta = {
  title: "Components/Rich Media/TestimonialCard",
  component: TestimonialCard,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "elevated", "bordered", "gradient"],
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
    rating: {
      control: { type: "range", min: 1, max: 5, step: 1 },
    },
  },
} satisfies Meta<typeof TestimonialCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    quote: "This design system has completely transformed how our team builds products. The components are intuitive, well-documented, and a joy to use.",
    author: "Sarah Johnson",
    role: "Senior Frontend Developer",
    company: "TechCorp Inc.",
    avatarSrc: "https://i.pravatar.cc/150?img=1",
    rating: 5,
    variant: "default",
    size: "md",
    className: "max-w-md",
  },
};

export const Elevated: Story = {
  args: {
    ...Default.args,
    variant: "elevated",
  },
};

export const Bordered: Story = {
  args: {
    ...Default.args,
    variant: "bordered",
  },
};

export const Gradient: Story = {
  args: {
    ...Default.args,
    variant: "gradient",
  },
};

export const Small: Story = {
  args: {
    ...Default.args,
    size: "sm",
    className: "max-w-sm",
  },
};

export const Large: Story = {
  args: {
    ...Default.args,
    size: "lg",
    className: "max-w-lg",
  },
};

export const WithoutRating: Story = {
  args: {
    ...Default.args,
    rating: undefined,
  },
};

export const FourStars: Story = {
  args: {
    ...Default.args,
    rating: 4,
  },
};

export const ThreeStars: Story = {
  args: {
    ...Default.args,
    rating: 3,
  },
};

export const WithoutAvatar: Story = {
  args: {
    ...Default.args,
    avatarSrc: undefined,
    avatarFallback: "SJ",
  },
};

export const WithoutCompany: Story = {
  args: {
    ...Default.args,
    company: undefined,
  },
};

export const LongQuote: Story = {
  args: {
    quote: "I've been working with various design systems for over a decade, and this one stands out for its exceptional attention to detail. The component library is comprehensive, the documentation is thorough, and the accessibility features are built in from the ground up. It has significantly reduced our development time while improving the quality of our user interfaces. The team behind it is responsive to feedback and continuously improves the system based on real-world usage.",
    author: "Michael Chen",
    role: "Engineering Lead",
    company: "Innovation Labs",
    avatarSrc: "https://i.pravatar.cc/150?img=3",
    rating: 5,
    variant: "elevated",
    className: "max-w-lg",
  },
};

export const Grid: Story = {
  render: () => (
    <TestimonialCardGrid columns={3}>
      <TestimonialCard
        quote="The best design system I've ever used. It just works."
        author="Alice Williams"
        role="Product Designer"
        company="DesignCo"
        avatarSrc="https://i.pravatar.cc/150?img=5"
        rating={5}
        variant="elevated"
      />
      <TestimonialCard
        quote="Incredibly well documented and easy to customize."
        author="Bob Martinez"
        role="Full Stack Developer"
        company="StartupXYZ"
        avatarSrc="https://i.pravatar.cc/150?img=8"
        rating={5}
        variant="elevated"
      />
      <TestimonialCard
        quote="Has everything we need for our enterprise applications."
        author="Carol Davis"
        role="Tech Lead"
        company="Enterprise Inc"
        avatarSrc="https://i.pravatar.cc/150?img=9"
        rating={4}
        variant="elevated"
      />
    </TestimonialCardGrid>
  ),
};

export const TwoColumnGrid: Story = {
  render: () => (
    <TestimonialCardGrid columns={2}>
      <TestimonialCard
        quote="Fantastic component library with great accessibility."
        author="David Brown"
        role="UX Engineer"
        company="Agency Pro"
        avatarSrc="https://i.pravatar.cc/150?img=11"
        rating={5}
        variant="gradient"
      />
      <TestimonialCard
        quote="Saved us months of development time."
        author="Emma Wilson"
        role="CTO"
        company="FastGrowth"
        avatarSrc="https://i.pravatar.cc/150?img=16"
        rating={5}
        variant="gradient"
      />
    </TestimonialCardGrid>
  ),
};
