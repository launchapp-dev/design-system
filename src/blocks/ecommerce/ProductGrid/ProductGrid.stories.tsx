import type { Meta, StoryObj } from "@storybook/react";
import { ProductGrid } from "./ProductGrid";
import type { GridProduct } from "./ProductGrid";

const products: GridProduct[] = [
  {
    id: "1",
    name: "Wireless Noise-Cancelling Headphones",
    price: 79.99,
    originalPrice: 99.99,
    rating: 4.5,
    reviewCount: 1284,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop",
    badge: "Best Seller",
    category: "Electronics",
    stock: 23,
    description: "Premium noise-cancelling with 30-hour battery life.",
  },
  {
    id: "2",
    name: "Minimalist Leather Watch",
    price: 149.0,
    rating: 4.8,
    reviewCount: 342,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop",
    category: "Accessories",
    stock: 5,
    description: "Swiss movement with genuine leather strap.",
  },
  {
    id: "3",
    name: "Portable Bluetooth Speaker",
    price: 49.99,
    originalPrice: 69.99,
    rating: 4.2,
    reviewCount: 876,
    image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=400&fit=crop",
    badge: "Sale",
    category: "Electronics",
    stock: 47,
    description: "Waterproof speaker with 12-hour playtime.",
  },
  {
    id: "4",
    name: "Ceramic Pour-Over Coffee Set",
    price: 38.0,
    rating: 4.6,
    reviewCount: 201,
    image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&h=400&fit=crop",
    category: "Kitchen",
    stock: 0,
    description: "Handcrafted ceramic dripper with matching mug.",
  },
  {
    id: "5",
    name: "Ergonomic Desk Lamp",
    price: 64.99,
    rating: 4.4,
    reviewCount: 567,
    image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=400&h=400&fit=crop",
    category: "Home Office",
    stock: 31,
    description: "Adjustable LED lamp with wireless charging base.",
  },
  {
    id: "6",
    name: "Merino Wool Beanie",
    price: 29.99,
    rating: 4.7,
    reviewCount: 412,
    image: "https://images.unsplash.com/photo-1576871337622-98d48d1cf531?w=400&h=400&fit=crop",
    category: "Apparel",
    stock: 15,
    description: "100% merino wool, naturally temperature regulating.",
  },
];

const meta: Meta<typeof ProductGrid> = {
  title: "Blocks/Ecommerce/ProductGrid",
  component: ProductGrid,
  parameters: {
    layout: "padded",
  },
};

export default meta;
type Story = StoryObj<typeof ProductGrid>;

export const Default: Story = {
  args: {
    products,
    columns: 3,
    showSearch: true,
    showSort: true,
    showStock: false,
    onAddToCart: (product) => console.log("Add to cart:", product.name),
    onProductClick: (product) => console.log("View product:", product.name),
  },
};

export const WithStockIndicator: Story = {
  name: "With Stock Indicator",
  args: {
    products,
    columns: 3,
    showSearch: true,
    showSort: true,
    showStock: true,
    onAddToCart: (product) => console.log("Add to cart:", product.name),
  },
};

export const TwoColumns: Story = {
  args: {
    products,
    columns: 2,
    showSearch: true,
    showSort: false,
    onAddToCart: (product) => console.log("Add to cart:", product.name),
  },
};

export const FourColumns: Story = {
  args: {
    products,
    columns: 4,
    showSearch: false,
    showSort: true,
    onAddToCart: (product) => console.log("Add to cart:", product.name),
  },
};

export const Loading: Story = {
  args: {
    products: [],
    columns: 3,
    loading: true,
    showSearch: true,
    showSort: true,
  },
};

export const Empty: Story = {
  args: {
    products: [],
    columns: 3,
    showSearch: true,
    showSort: true,
    emptyMessage: "No products match your search",
  },
};

export const DarkMode: Story = {
  decorators: [
    (Story) => (
      <div className="dark bg-background p-6 rounded-lg">
        <Story />
      </div>
    ),
  ],
  args: {
    products,
    columns: 3,
    showSearch: true,
    showSort: true,
    onAddToCart: (product) => console.log("Add to cart:", product.name),
  },
};

export const Mobile: Story = {
  parameters: {
    viewport: { defaultViewport: "mobile1" },
  },
  args: {
    products,
    columns: 2,
    showSearch: true,
    showSort: false,
    onAddToCart: (product) => console.log("Add to cart:", product.name),
  },
};
