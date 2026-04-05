import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import { TestimonialSection } from "./index";
import { Badge } from "../../../components/Badge";

const meta: Meta<typeof TestimonialSection> = {
  title: "Blocks/Marketing/TestimonialSection",
  component: TestimonialSection,
  parameters: {
    docs: {
      source: {
        code: `import { TestimonialSection } from "@launchapp/design-system/blocks";

const testimonials = [
  {
    quote: "LaunchApp has completely transformed how we build products. The components are intuitive, accessible, and beautifully designed.",
    name: "Sarah Chen",
    role: "Head of Design",
    company: "Acme Inc",
    avatarSrc: "https://i.pravatar.cc/150?u=sarah",
  },
  {
    quote: "We shipped our MVP in 3 weeks instead of 3 months. This design system is a game changer for startups.",
    name: "Marcus Johnson",
    role: "CTO",
    company: "StartupXYZ",
    avatarSrc: "https://i.pravatar.cc/150?u=marcus",
    badge: "Verified Customer",
  },
];

export default function Page() {
  return (
    <TestimonialSection
      layout="carousel"
      headline="Loved by teams everywhere"
      subheadline="See what our customers have to say about their experience."
      testimonials={testimonials}
    />
  );
}`,
      },
    },
  },
  argTypes: {
    layout: {
      control: "select",
      options: ["carousel", "grid", "marquee", "minimal"],
    },
    columns: {
      control: "select",
      options: [2, 3, 4],
    },
    showQuoteIcon: {
      control: "boolean",
    },
  },
  args: {
    layout: "carousel",
    showQuoteIcon: true,
  },
};

export default meta;
type Story = StoryObj<typeof TestimonialSection>;

const sampleTestimonials = [
  {
    quote: "LaunchApp has completely transformed how we build products. The components are intuitive, accessible, and beautifully designed.",
    name: "Sarah Chen",
    role: "Head of Design",
    company: "Acme Inc",
    avatarSrc: "https://i.pravatar.cc/150?u=sarah",
    rating: 5,
  },
  {
    quote: "We shipped our MVP in 3 weeks instead of 3 months. This design system is a game changer for startups.",
    name: "Marcus Johnson",
    role: "CTO",
    company: "StartupXYZ",
    avatarSrc: "https://i.pravatar.cc/150?u=marcus",
    rating: 5,
    badge: "Verified Customer",
  },
  {
    quote: "The attention to detail in every component is remarkable. It feels like having an extra designer on the team.",
    name: "Emily Rodriguez",
    role: "Product Manager",
    company: "TechFlow",
    avatarSrc: "https://i.pravatar.cc/150?u=emily",
    rating: 4,
  },
  {
    quote: "Finally, a design system that actually understands what developers need. The documentation is incredible.",
    name: "David Park",
    role: "Senior Engineer",
    company: "CodeCraft",
    avatarSrc: "https://i.pravatar.cc/150?u=david",
    rating: 5,
  },
  {
    quote: "We've reduced our design debt by 80% since switching to LaunchApp. Our team can focus on features instead of UI consistency.",
    name: "Lisa Thompson",
    role: "VP of Engineering",
    company: "ScaleUp Co",
    avatarSrc: "https://i.pravatar.cc/150?u=lisa",
    badge: "Enterprise",
    rating: 5,
  },
  {
    quote: "The dark mode support alone saved us weeks of work. Everything just works out of the box.",
    name: "James Wilson",
    role: "Frontend Lead",
    company: "DarkMode Labs",
    avatarSrc: "https://i.pravatar.cc/150?u=james",
    rating: 5,
  },
];

export const Carousel: Story = {
  args: {
    layout: "carousel",
    headline: "Loved by teams everywhere",
    subheadline: "See what our customers have to say about their experience with LaunchApp.",
    testimonials: sampleTestimonials,
  },
};

export const Grid: Story = {
  args: {
    layout: "grid",
    columns: 3,
    eyebrow: <Badge variant="secondary">Testimonials</Badge>,
    headline: "Trusted by thousands of teams",
    subheadline: "From startups to enterprises, teams rely on LaunchApp to ship faster.",
    testimonials: sampleTestimonials,
  },
};

export const GridTwoColumns: Story = {
  name: "Grid (2 Columns)",
  args: {
    layout: "grid",
    columns: 2,
    headline: "Customer Success Stories",
    testimonials: sampleTestimonials.slice(0, 4),
  },
};

export const GridFourColumns: Story = {
  name: "Grid (4 Columns)",
  args: {
    layout: "grid",
    columns: 4,
    headline: "What People Are Saying",
    testimonials: sampleTestimonials,
  },
};

export const Marquee: Story = {
  args: {
    layout: "marquee",
    headline: "Customer Love",
    subheadline: "Join thousands of satisfied customers",
    testimonials: sampleTestimonials.slice(0, 4),
  },
  parameters: {
    docs: {
      description: {
        story: "Marquee layout automatically scrolls testimonials horizontally. Note: Requires CSS animation support.",
      },
    },
  },
};

export const Minimal: Story = {
  args: {
    layout: "minimal",
    headline: "Don't just take our word for it",
    testimonials: [sampleTestimonials[0]],
  },
};

export const WithRatings: Story = {
  name: "With Star Ratings",
  args: {
    layout: "grid",
    columns: 2,
    headline: "Rated 5 stars by our customers",
    testimonials: sampleTestimonials.slice(0, 4),
  },
};

export const WithBadges: Story = {
  name: "With Verified Badges",
  args: {
    layout: "carousel",
    headline: "Verified Customer Reviews",
    testimonials: sampleTestimonials.filter(t => t.badge),
  },
};

export const WithoutQuoteIcon: Story = {
  name: "Without Quote Icon",
  args: {
    layout: "grid",
    columns: 2,
    showQuoteIcon: false,
    headline: "Clean and minimal",
    testimonials: sampleTestimonials.slice(0, 4),
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col divide-y divide-border">
      <TestimonialSection
        layout="carousel"
        headline="Carousel Layout"
        subheadline="Auto-advancing testimonials with navigation dots."
        testimonials={sampleTestimonials.slice(0, 3)}
      />
      <TestimonialSection
        layout="grid"
        columns={3}
        headline="Grid Layout"
        subheadline="Display multiple testimonials in a responsive grid."
        testimonials={sampleTestimonials.slice(0, 3)}
      />
      <TestimonialSection
        layout="minimal"
        headline="Minimal Layout"
        testimonials={[sampleTestimonials[0]]}
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "All layout variants in one view. The marquee layout is shown separately due to its animation.",
      },
    },
  },
};

export const DarkMode: Story = {
  decorators: [
    (Story) => (
      <div className="dark bg-background">
        <Story />
      </div>
    ),
  ],
  args: {
    layout: "grid",
    columns: 2,
    headline: "Looks great in dark mode too",
    subheadline: "Every component supports both light and dark themes out of the box.",
    testimonials: sampleTestimonials.slice(0, 4),
  },
};

export const Mobile: Story = {
  parameters: {
    viewport: { defaultViewport: "mobile1" },
  },
  args: {
    layout: "carousel",
    headline: "Mobile Responsive",
    subheadline: "Testimonials look great on any device.",
    testimonials: sampleTestimonials.slice(0, 3),
  },
};

export const Tablet: Story = {
  parameters: {
    viewport: { defaultViewport: "tablet" },
  },
  args: {
    layout: "grid",
    columns: 2,
    headline: "Tablet Layout",
    testimonials: sampleTestimonials.slice(0, 4),
  },
};

export const CompositionExample: Story = {
  name: "Composition (Built From)",
  args: {
    layout: "carousel",
    headline: "Built with Design System Primitives",
    testimonials: sampleTestimonials.slice(0, 3),
  },
  parameters: {
    docs: {
      description: {
        story:
          "TestimonialSection is composed from Card, Avatar, Badge, and other design system primitives. Use the **Show code** toggle to see the full implementation.",
      },
      source: {
        code: `import { TestimonialSection } from "@launchapp/design-system/blocks";
import { Card, CardContent, Avatar, AvatarImage, AvatarFallback, Badge } from "@launchapp/design-system";
import { cva } from "class-variance-authority";
import { cn } from "@launchapp/design-system/utils";

// TestimonialSection uses CVA to switch between layout variants:
// "carousel" – single testimonial with auto-advance and dot navigation
// "grid"     – responsive grid of testimonial cards
// "marquee"  – horizontally scrolling testimonials
// "minimal"  – single centered testimonial without card wrapper
//
// Composed from these primitives:
// - Card/CardContent: container with consistent styling
// - Avatar/AvatarImage/AvatarFallback: user profile images
// - Badge: optional verified/customer labels
// - Star ratings: inline SVG components
//
// All layouts support:
// - Custom headline and subheadline
// - Optional eyebrow badge
// - Star ratings (1-5)
// - Company attribution
// - Responsive behavior

const testimonialVariants = cva("w-full", {
  variants: {
    layout: {
      carousel: "px-4 py-16",
      grid: "px-4 py-16",
      marquee: "py-16 overflow-hidden",
      minimal: "px-4 py-16",
    },
  },
  defaultVariants: { layout: "carousel" },
});

export function TestimonialSection({ layout, testimonials, headline, subheadline, ...props }) {
  // Layout logic handles carousel auto-advance, grid columns, marquee animation
  return (
    <section className={cn(testimonialVariants({ layout }))}>
      {headline && <h2>{headline}</h2>}
      {testimonials.map((t) => (
        <Card key={t.name}>
          <CardContent>
            <blockquote>"{t.quote}"</blockquote>
            <footer>
              <Avatar>
                <AvatarImage src={t.avatarSrc} />
                <AvatarFallback>{t.name.slice(0, 2)}</AvatarFallback>
              </Avatar>
              <div>
                <p>{t.name}</p>
                <p>{t.role} @ {t.company}</p>
              </div>
              {t.badge && <Badge>{t.badge}</Badge>}
            </footer>
          </CardContent>
        </Card>
      ))}
    </section>
  );
}`,
      },
    },
  },
};
