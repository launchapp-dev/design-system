import type { Meta, StoryObj } from "@storybook/react";
import { ProductCard, ProductCardGrid } from "./index";
import type { ProductCardItem } from "./index";

const sampleProducts: ProductCardItem[] = [
  {
    id: "1",
    name: "Wireless Noise-Cancelling Headphones",
    price: 79.99,
    originalPrice: 129.99,
    rating: 4.5,
    reviewCount: 238,
    badge: "Sale",
    description: "Premium sound quality with 30-hour battery life and active noise cancellation.",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop",
  },
  {
    id: "2",
    name: "Minimalist Leather Watch",
    price: 149.0,
    rating: 4.8,
    reviewCount: 92,
    badge: "New",
    description: "Handcrafted genuine leather band with sapphire crystal glass.",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=300&fit=crop",
  },
  {
    id: "3",
    name: "Portable Bluetooth Speaker",
    price: 49.99,
    originalPrice: 69.99,
    rating: 4.2,
    reviewCount: 417,
    description: "Waterproof and dustproof with 12-hour playtime.",
    image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=300&fit=crop",
  },
  {
    id: "4",
    name: "Mechanical Keyboard",
    price: 119.0,
    rating: 4.7,
    reviewCount: 156,
    badge: "Popular",
    description: "Tactile switches with RGB backlighting and aluminum frame.",
    image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400&h=300&fit=crop",
  },
];

const meta: Meta<typeof ProductCard> = {
  title: "Blocks/Ecommerce/ProductCard",
  component: ProductCard,
  parameters: {
    docs: {
      source: {
        code: `import { ProductCardGrid } from "@launchapp/design-system/blocks";

const products = [
  {
    id: "1",
    name: "Wireless Headphones",
    price: 99.99,
    originalPrice: 149.99,
    rating: 4.5,
    reviewCount: 128,
    badge: "Sale",
    imageSrc: "/products/headphones.jpg",
    imageAlt: "Wireless Headphones",
  },
  {
    id: "2",
    name: "Smart Watch",
    price: 299.99,
    rating: 4.8,
    reviewCount: 89,
    badge: "New",
    imageSrc: "/products/watch.jpg",
    imageAlt: "Smart Watch",
  },
];

export default function Page() {
  return (
    <ProductCardGrid
      products={products}
      onAddToCart={(id) => console.log("add to cart", id)}
    />
  );
}`,
      },
    },
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["compact", "detailed", "horizontal"],
    },
  },
  args: {
    variant: "compact",
    product: sampleProducts[0],
  },
};

export default meta;
type Story = StoryObj<typeof ProductCard>;

export const Compact: Story = {
  render: (args) => (
    <div className="w-64">
      <ProductCard {...args} variant="compact" product={sampleProducts[0]} />
    </div>
  ),
};

export const Detailed: Story = {
  render: (args) => (
    <div className="w-72">
      <ProductCard {...args} variant="detailed" product={sampleProducts[1]} />
    </div>
  ),
};

export const Horizontal: Story = {
  render: (args) => (
    <div className="w-full max-w-lg">
      <ProductCard {...args} variant="horizontal" product={sampleProducts[0]} />
    </div>
  ),
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-8">
      <div>
        <p className="mb-3 text-sm font-semibold text-muted-foreground uppercase tracking-wide">
          Compact
        </p>
        <div className="flex flex-wrap gap-4">
          {sampleProducts.slice(0, 2).map((p) => (
            <div key={p.id} className="w-56">
              <ProductCard variant="compact" product={p} onAddToCart={() => {}} />
            </div>
          ))}
        </div>
      </div>
      <div>
        <p className="mb-3 text-sm font-semibold text-muted-foreground uppercase tracking-wide">
          Detailed
        </p>
        <div className="flex flex-wrap gap-4">
          {sampleProducts.slice(0, 2).map((p) => (
            <div key={p.id} className="w-72">
              <ProductCard variant="detailed" product={p} onAddToCart={() => {}} />
            </div>
          ))}
        </div>
      </div>
      <div>
        <p className="mb-3 text-sm font-semibold text-muted-foreground uppercase tracking-wide">
          Horizontal
        </p>
        <div className="flex flex-col gap-3 max-w-xl">
          {sampleProducts.slice(0, 2).map((p) => (
            <ProductCard key={p.id} variant="horizontal" product={p} onAddToCart={() => {}} />
          ))}
        </div>
      </div>
    </div>
  ),
};

export const GridTwo: Story = {
  render: () => (
    <ProductCardGrid
      products={sampleProducts}
      columns={2}
      variant="compact"
      onAddToCart={(p) => console.log("Added to cart:", p.name)}
    />
  ),
};

export const GridThree: Story = {
  render: () => (
    <ProductCardGrid
      products={sampleProducts}
      columns={3}
      variant="compact"
      onAddToCart={(p) => console.log("Added to cart:", p.name)}
    />
  ),
};

export const GridFour: Story = {
  render: () => (
    <ProductCardGrid
      products={sampleProducts}
      columns={4}
      variant="compact"
      onAddToCart={(p) => console.log("Added to cart:", p.name)}
    />
  ),
};

export const DetailedGrid: Story = {
  render: () => (
    <ProductCardGrid
      products={sampleProducts}
      columns={3}
      variant="detailed"
      onAddToCart={(p) => console.log("Added to cart:", p.name)}
    />
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
    <ProductCardGrid
      products={sampleProducts}
      columns={2}
      variant="compact"
      onAddToCart={() => {}}
    />
  ),
};

export const Mobile: Story = {
  parameters: {
    viewport: { defaultViewport: "mobile1" },
  },
  render: () => (
    <ProductCardGrid
      products={sampleProducts}
      columns={1}
      variant="compact"
      onAddToCart={() => {}}
    />
  ),
};

export const Tablet: Story = {
  parameters: {
    viewport: { defaultViewport: "tablet" },
  },
  render: () => (
    <ProductCardGrid
      products={sampleProducts}
      columns={2}
      variant="detailed"
      onAddToCart={() => {}}
    />
  ),
};

export const CompositionExample: Story = {
  name: "Composition (Built From)",
  render: () => (
    <ProductCardGrid
      products={sampleProducts}
      columns={3}
      variant="compact"
      onAddToCart={() => {}}
    />
  ),
  parameters: {
    docs: {
      description: {
        story:
          "ProductCard / ProductCardGrid is composed from these design system primitives. Use the **Show code** toggle to see the full implementation.",
      },
      source: {
        code: `import { ProductCardGrid } from "@launchapp/design-system/blocks";
import { ProductCard } from "@launchapp/design-system/blocks";

// Usage — pass products and handle cart events:
export default function Page() {
  return (
    <ProductCardGrid
      products={[
        {
          id: "1",
          name: "Wireless Headphones",
          price: 79.99,
          originalPrice: 129.99,
          image: "/headphones.jpg",
          badge: "Sale",
          rating: 4.5,
          reviewCount: 128,
        },
      ]}
      columns={3}
      variant="compact"
      onAddToCart={(product) => console.log("Added:", product.id)}
      onWishlist={(product) => console.log("Wishlisted:", product.id)}
    />
  );
}

// ProductCard internally composes these design system primitives:
//
// import {
//   Badge,
//   Button,
//   Card, CardContent, CardFooter,
// } from "@launchapp/design-system";
// import { cva } from "class-variance-authority";
//
// CVA variants: compact | detailed | horizontal
// compact  – image top, minimal text, single CTA button
// detailed – image top, ratings, full description, price stack
// horizontal – image left (40%), text right, stacked CTAs`,
      },
    },
  },
};
