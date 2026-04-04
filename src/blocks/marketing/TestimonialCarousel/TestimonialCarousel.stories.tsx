import type { Meta, StoryObj } from "@storybook/react";
import type { Testimonial } from "./index";
import { TestimonialCarousel } from "./index";

const testimonials: Testimonial[] = [
  {
    quote:
      "This design system has completely transformed how our team builds products. We ship features twice as fast now.",
    name: "Sarah Chen",
    role: "VP of Engineering at Acme Corp",
    avatarFallback: "SC",
    badge: "Verified customer",
  },
  {
    quote:
      "The accessibility built into every component means we stopped worrying about compliance and started focusing on our users.",
    name: "Marcus Johnson",
    role: "Lead Designer at BuildCo",
    avatarFallback: "MJ",
  },
  {
    quote:
      "I evaluated five design systems and this one won on TypeScript support and documentation alone. The components are a bonus.",
    name: "Priya Patel",
    role: "Senior Frontend Engineer at StartupXYZ",
    avatarFallback: "PP",
    badge: "Top reviewer",
  },
  {
    quote:
      "Dark mode support out of the box. That sold our whole team. No more 2am CSS overrides.",
    name: "Alex Rivera",
    role: "CTO at DevShop",
    avatarFallback: "AR",
  },
];

const meta: Meta<typeof TestimonialCarousel> = {
  title: "Blocks/Marketing/TestimonialCarousel",
  component: TestimonialCarousel,
  parameters: {
    docs: {
      source: {
        code: `import { TestimonialCarousel } from "@launchapp/design-system/blocks";

const testimonials = [
  {
    id: "1",
    quote: "LaunchApp cut our frontend development time in half. The components are beautiful and accessible out of the box.",
    author: "Sarah Chen",
    role: "CTO at Startup Inc.",
    avatarFallback: "SC",
  },
  {
    id: "2",
    quote: "The best design system I've worked with. Theming support and dark mode made our redesign a breeze.",
    author: "Mark Rivera",
    role: "Lead Engineer at TechCorp",
    avatarFallback: "MR",
  },
];

export default function Page() {
  return <TestimonialCarousel testimonials={testimonials} />;
}`,
      },
    },
  },
  argTypes: {
    autoAdvanceInterval: {
      control: { type: "number", min: 1000, max: 10000, step: 500 },
    },
  },
};

export default meta;
type Story = StoryObj<typeof TestimonialCarousel>;

export const Default: Story = {
  render: (args) => (
    <TestimonialCarousel
      {...args}
      headline="What our customers say"
      subheadline="Trusted by teams at companies of all sizes."
      testimonials={testimonials}
    />
  ),
};

export const WithoutHeader: Story = {
  render: () => <TestimonialCarousel testimonials={testimonials} />,
};

export const SingleTestimonial: Story = {
  render: () => (
    <TestimonialCarousel
      headline="Customer spotlight"
      testimonials={[testimonials[0]]}
    />
  ),
};

export const WithBadges: Story = {
  render: () => (
    <TestimonialCarousel
      headline="Featured reviews"
      testimonials={testimonials.map((t, i) => ({
        ...t,
        badge: i % 2 === 0 ? "Verified" : undefined,
      }))}
    />
  ),
};

export const SlowAutoAdvance: Story = {
  render: () => (
    <TestimonialCarousel
      headline="Testimonials"
      testimonials={testimonials}
      autoAdvanceInterval={8000}
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
    <TestimonialCarousel
      headline="What our customers say"
      subheadline="Trusted by thousands of developers worldwide."
      testimonials={testimonials}
    />
  ),
};

export const Mobile: Story = {
  parameters: {
    viewport: { defaultViewport: "mobile1" },
  },
  render: () => (
    <TestimonialCarousel
      headline="What our customers say"
      testimonials={testimonials}
    />
  ),
};

export const Tablet: Story = {
  parameters: {
    viewport: { defaultViewport: "tablet" },
  },
  render: () => (
    <TestimonialCarousel
      headline="What our customers say"
      subheadline="Trusted by teams at companies of all sizes."
      testimonials={testimonials}
    />
  ),
};

export const CompositionExample: Story = {
  name: "Composition (Built From)",
  render: () => (
    <TestimonialCarousel
      headline="What our customers say"
      subheadline="Trusted by teams at companies of all sizes."
      testimonials={testimonials}
    />
  ),
  parameters: {
    docs: {
      description: {
        story:
          "TestimonialCarousel is composed from these design system primitives. Use the **Show code** toggle to see the full implementation.",
      },
      source: {
        code: `import {
  Avatar, AvatarFallback, AvatarImage,
  Badge,
  Button,
  Card, CardContent,
} from "@launchapp/design-system";

// TestimonialCarousel manages auto-advance and manual navigation state locally.
// Each slide is a Card containing quote text, author Avatar, name, role, and optional Badge.
// Navigation dots and prev/next Buttons are rendered below the card.
// autoAdvanceInterval prop (ms) controls auto-play; set to 0 to disable.
export function TestimonialCarousel({ headline, subheadline, testimonials = [], autoAdvanceInterval = 5000 }) {
  const [active, setActive] = React.useState(0);

  React.useEffect(() => {
    if (!autoAdvanceInterval) return;
    const id = setInterval(() => setActive((i) => (i + 1) % testimonials.length), autoAdvanceInterval);
    return () => clearInterval(id);
  }, [autoAdvanceInterval, testimonials.length]);

  const current = testimonials[active];

  return (
    <section className="py-16 px-4 space-y-8 text-center">
      {(headline || subheadline) && (
        <div className="space-y-2">
          {headline && <h2 className="text-3xl font-bold">{headline}</h2>}
          {subheadline && <p className="text-muted-foreground">{subheadline}</p>}
        </div>
      )}
      <Card className="max-w-2xl mx-auto">
        <CardContent className="pt-8 pb-6 space-y-4">
          <p className="text-lg italic">&ldquo;{current?.quote}&rdquo;</p>
          <div className="flex items-center justify-center gap-3">
            <Avatar>
              {current?.author.avatarSrc && <AvatarImage src={current.author.avatarSrc} />}
              <AvatarFallback>{current?.author.initials}</AvatarFallback>
            </Avatar>
            <div className="text-left">
              <p className="font-semibold">{current?.author.name}</p>
              <p className="text-sm text-muted-foreground">{current?.author.role}</p>
            </div>
            {current?.badge && <Badge variant="secondary">{current.badge}</Badge>}
          </div>
        </CardContent>
      </Card>
      <div className="flex items-center justify-center gap-2">
        <Button variant="ghost" size="icon" onClick={() => setActive((i) => (i - 1 + testimonials.length) % testimonials.length)}>
          ‹
        </Button>
        {testimonials.map((_, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className={i === active ? "h-2 w-6 rounded-full bg-primary" : "h-2 w-2 rounded-full bg-muted-foreground/30"}
          />
        ))}
        <Button variant="ghost" size="icon" onClick={() => setActive((i) => (i + 1) % testimonials.length)}>
          ›
        </Button>
      </div>
    </section>
  );
}`,
      },
    },
  },
};
