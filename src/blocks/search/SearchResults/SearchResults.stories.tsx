import type { Meta, StoryObj } from "@storybook/react";
import { SearchResults, type SearchResultItem } from "./SearchResults";

const mockResults: SearchResultItem[] = [
  {
    id: "1",
    title: "Getting Started with LaunchApp",
    excerpt:
      "A comprehensive guide to setting up your LaunchApp workspace, inviting team members, and configuring your first project.",
    category: "Documentation",
    tags: ["guide", "setup"],
    author: "Sarah Chen",
    date: "March 15, 2026",
    readingTime: "5 min read",
    url: "/docs/getting-started",
  },
  {
    id: "2",
    title: "API Authentication Guide",
    excerpt:
      "Learn how to authenticate your API requests using OAuth 2.0, API keys, and JWT tokens.",
    category: "Documentation",
    tags: ["api", "authentication", "security"],
    author: "Marcus Webb",
    date: "March 10, 2026",
    readingTime: "8 min read",
    url: "/docs/api-auth",
  },
  {
    id: "3",
    title: "Billing and Subscription Management",
    excerpt:
      "Everything you need to know about managing your subscription, updating payment methods, and understanding invoices.",
    category: "Settings",
    tags: ["billing", "subscription"],
    author: "Priya Patel",
    date: "February 28, 2026",
    readingTime: "4 min read",
    url: "/docs/billing",
  },
  {
    id: "4",
    title: "Building Your First Integration",
    excerpt:
      "Step-by-step tutorial for connecting LaunchApp with your existing tools and workflows using webhooks and our REST API.",
    category: "Tutorials",
    tags: ["integrations", "api", "webhooks"],
    author: "Jordan Lee",
    date: "February 20, 2026",
    readingTime: "12 min read",
    url: "/docs/first-integration",
  },
];

const mockFilters = [
  { label: "Documentation", count: 42 },
  { label: "Tutorials", count: 18 },
  { label: "Settings", count: 12 },
  { label: "Blog", count: 9 },
];

const mockSortOptions = [
  { label: "Most relevant", value: "relevance" },
  { label: "Newest first", value: "newest" },
  { label: "Oldest first", value: "oldest" },
];

const meta: Meta<typeof SearchResults> = {
  title: "Blocks/Search/SearchResults",
  component: SearchResults,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    query: "launchapp",
    searchResults: mockResults,
    totalCount: 4,
    filters: mockFilters,
    showFilters: true,
    sortOptions: mockSortOptions,
    activeSort: "relevance",
    onSearch: (q) => console.log("Search:", q),
    onResultClick: (item) => console.log("Clicked:", item.title),
    onSortChange: (s) => console.log("Sort:", s),
    onFilterChange: (f) => console.log("Filter:", f),
  },
};

export const WithActiveFilter: Story = {
  args: {
    query: "launchapp",
    searchResults: mockResults.filter((r) => r.category === "Documentation"),
    totalCount: 42,
    filters: mockFilters,
    showFilters: true,
    sortOptions: mockSortOptions,
    activeSort: "relevance",
    activeFilter: "Documentation",
    onSearch: (q) => console.log("Search:", q),
  },
};

export const EmptyResults: Story = {
  args: {
    query: "nonexistent query xyz123",
    searchResults: [],
    totalCount: 0,
    filters: mockFilters,
    showFilters: true,
    sortOptions: mockSortOptions,
    onSearch: (q) => console.log("Search:", q),
  },
};

export const Loading: Story = {
  args: {
    query: "launchapp",
    searchResults: [],
    totalCount: 0,
    filters: mockFilters,
    showFilters: true,
    sortOptions: mockSortOptions,
    isLoading: true,
  },
};

export const NoFilters: Story = {
  args: {
    query: "launchapp",
    searchResults: mockResults,
    totalCount: 4,
    showFilters: false,
    onSearch: (q) => console.log("Search:", q),
  },
};

export const DarkMode: Story = {
  parameters: {
    backgrounds: { default: "dark" },
  },
  args: {
    query: "launchapp",
    searchResults: mockResults,
    totalCount: 4,
    filters: mockFilters,
    showFilters: true,
    sortOptions: mockSortOptions,
    activeSort: "relevance",
    onSearch: (q) => console.log("Search:", q),
  },
};

export const Mobile: Story = {
  parameters: {
    viewport: {
      defaultViewport: "mobile1",
    },
  },
  args: {
    query: "launchapp",
    searchResults: mockResults,
    totalCount: 4,
    filters: mockFilters,
    showFilters: true,
    sortOptions: mockSortOptions,
    activeSort: "relevance",
    onSearch: (q) => console.log("Search:", q),
  },
};
