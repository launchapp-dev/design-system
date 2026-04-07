import type { Meta, StoryObj } from "@storybook/react";
import { ReviewsList } from "./ReviewsList";
import type { Review, RatingDistribution } from "./ReviewsList";

const reviews: Review[] = [
  {
    id: "1",
    author: "Sarah Mitchell",
    avatarUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop",
    rating: 5,
    title: "Exceeded all expectations!",
    content:
      "I've been using these headphones for a month now and they're absolutely fantastic. The noise cancellation is top-notch — I use them daily on my commute and can't hear a thing. Battery life is as advertised, and the sound quality is rich and detailed.",
    date: "2024-03-15",
    verified: true,
    helpful: 47,
    tags: ["Great sound", "Battery life", "Comfortable"],
  },
  {
    id: "2",
    author: "James Chen",
    avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop",
    rating: 4,
    title: "Solid choice, minor issues",
    content:
      "Really great headphones overall. The ANC works well and they're comfortable for long listening sessions. I docked one star because the ear cups get a bit warm after extended use. Still highly recommend.",
    date: "2024-03-08",
    verified: true,
    helpful: 23,
    variant: "product",
    tags: ["Good ANC", "Comfort"],
  },
  {
    id: "3",
    author: "Alex Rivera",
    avatarUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop",
    rating: 3,
    title: "Decent but overpriced",
    content:
      "These are good headphones but for this price point I expected a bit more. The build quality is solid but I found similar performance in cheaper alternatives. Worth considering if you catch them on sale.",
    date: "2024-02-20",
    verified: false,
    helpful: 8,
    tags: ["Average", "Price"],
  },
  {
    id: "4",
    author: "Morgan Taylor",
    avatarUrl: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop",
    rating: 5,
    title: "Best purchase this year",
    content:
      "Absolutely love these! The transparency mode is incredibly natural and the app customization options are great. Pairing with multiple devices is seamless. My only regret is not buying them sooner.",
    date: "2024-02-12",
    verified: true,
    helpful: 31,
    tags: ["Transparency mode", "Multi-device"],
  },
  {
    id: "5",
    author: "Sam Patel",
    rating: 2,
    content:
      "Not for me. The fit was uncomfortable after about an hour and the bass felt muddy compared to my previous pair. Returns were easy though, so that's a plus.",
    date: "2024-01-30",
    verified: true,
    helpful: 4,
  },
];

const distribution: RatingDistribution = { 1: 2, 2: 5, 3: 12, 4: 28, 5: 53 };

const meta: Meta<typeof ReviewsList> = {
  title: "Blocks/Ecommerce/ReviewsList",
  component: ReviewsList,
};

export default meta;
type Story = StoryObj<typeof ReviewsList>;

export const Default: Story = {
  render: () => (
    <div className="max-w-2xl p-4">
      <ReviewsList
        reviews={reviews}
        onHelpful={(r) => console.log("Helpful", r.id)}
        onReport={(r) => console.log("Report", r.id)}
      />
    </div>
  ),
};

export const WithDistribution: Story = {
  render: () => (
    <div className="max-w-2xl p-4">
      <ReviewsList
        reviews={reviews}
        overallRating={4.2}
        totalCount={100}
        ratingDistribution={distribution}
        showDistribution
        onHelpful={(r) => console.log("Helpful", r.id)}
      />
    </div>
  ),
};

export const WithVerifiedBadge: Story = {
  render: () => (
    <div className="max-w-2xl p-4">
      <ReviewsList
        reviews={reviews}
        showVerified
        onHelpful={(r) => console.log("Helpful", r.id)}
      />
    </div>
  ),
};

export const Empty: Story = {
  render: () => (
    <div className="max-w-2xl p-4">
      <ReviewsList
        reviews={[]}
        emptyMessage="Be the first to review this product"
      />
    </div>
  ),
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
    <div className="max-w-2xl">
      <ReviewsList
        reviews={reviews.slice(0, 3)}
        onHelpful={(r) => console.log("Helpful", r.id)}
      />
    </div>
  ),
};

export const Mobile: Story = {
  parameters: { viewport: { defaultViewport: "mobile1" } },
  render: () => (
    <ReviewsList
      reviews={reviews}
      onHelpful={(r) => console.log("Helpful", r.id)}
    />
  ),
};
