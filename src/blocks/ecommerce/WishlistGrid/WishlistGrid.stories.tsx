import type { Meta, StoryObj } from "@storybook/react";
import { WishlistGrid } from "./WishlistGrid";
import type { WishlistItem } from "./WishlistGrid";

const wishlistItems: WishlistItem[] = [
  {
    id: "1",
    name: "Wireless Noise-Cancelling Headphones",
    price: 79.99,
    originalPrice: 129.99,
    rating: 4.5,
    reviewCount: 238,
    badge: "Sale",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop",
    description: "Premium sound quality with 30-hour battery life.",
    stock: 15,
  },
  {
    id: "2",
    name: "Minimalist Leather Watch",
    price: 149.0,
    rating: 4.8,
    reviewCount: 92,
    badge: "New",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop",
    description: "Handcrafted genuine leather band with sapphire crystal glass.",
    stock: 8,
  },
  {
    id: "3",
    name: "Portable Bluetooth Speaker",
    price: 49.99,
    rating: 4.2,
    reviewCount: 417,
    image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=400&fit=crop",
    description: "Waterproof and dustproof with 12-hour playtime.",
    stock: 0,
  },
  {
    id: "4",
    name: "Mechanical Keyboard",
    price: 119.0,
    rating: 4.7,
    reviewCount: 156,
    badge: "Popular",
    image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400&h=400&fit=crop",
    description: "Tactile switches with RGB backlighting and aluminum frame.",
    stock: 23,
  },
];

const meta: Meta<typeof WishlistGrid> = {
  title: "Blocks/Ecommerce/WishlistGrid",
  component: WishlistGrid,
};

export default meta;
type Story = StoryObj<typeof WishlistGrid>;

export const Default: Story = {
  render: () => (
    <WishlistGrid
      items={wishlistItems}
      onRemove={(item) => console.log("Remove", item.name)}
      onAddToCart={(item) => console.log("Add to cart", item.name)}
      onItemClick={(item) => console.log("View", item.name)}
    />
  ),
};

export const GridTwoColumns: Story = {
  render: () => (
    <WishlistGrid
      items={wishlistItems}
      columns={2}
      onRemove={(item) => console.log("Remove", item.name)}
      onAddToCart={(item) => console.log("Add to cart", item.name)}
    />
  ),
};

export const GridFourColumns: Story = {
  render: () => (
    <WishlistGrid
      items={wishlistItems}
      columns={4}
      onRemove={(item) => console.log("Remove", item.name)}
      onAddToCart={(item) => console.log("Add to cart", item.name)}
    />
  ),
};

export const Empty: Story = {
  render: () => (
    <WishlistGrid
      items={[]}
      emptyMessage="You haven't saved any items yet"
      onAddToCart={() => {}}
    />
  ),
};

export const Loading: Story = {
  render: () => <WishlistGrid items={[]} loading columns={3} />,
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
    <WishlistGrid
      items={wishlistItems.slice(0, 2)}
      columns={2}
      onRemove={(item) => console.log("Remove", item.name)}
      onAddToCart={(item) => console.log("Add to cart", item.name)}
    />
  ),
};

export const Mobile: Story = {
  parameters: { viewport: { defaultViewport: "mobile1" } },
  render: () => (
    <WishlistGrid
      items={wishlistItems}
      columns={1}
      onRemove={(item) => console.log("Remove", item.name)}
      onAddToCart={(item) => console.log("Add to cart", item.name)}
    />
  ),
};
