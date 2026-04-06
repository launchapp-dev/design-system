import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import { SearchCommandPalette, useSearchCommandPalette, type SearchResult, type SearchFilter, type RecentSearch } from "./SearchCommandPalette";
import { Button } from "@/components/Button";

const mockResults: SearchResult[] = [
  {
    id: "1",
    title: "Getting Started Guide",
    description: "Learn how to set up your account and invite team members.",
    category: "Documentation",
    url: "/docs/getting-started",
  },
  {
    id: "2",
    title: "API Reference",
    description: "Complete API documentation for developers.",
    category: "Documentation",
    url: "/docs/api",
  },
  {
    id: "3",
    title: "Billing Settings",
    description: "Manage your subscription and payment methods.",
    category: "Settings",
    url: "/settings/billing",
  },
  {
    id: "4",
    title: "Dashboard Overview",
    description: "View your team's activity and metrics at a glance.",
    category: "App",
    url: "/dashboard",
  },
  {
    id: "5",
    title: "Notification Preferences",
    description: "Configure how and when you receive notifications.",
    category: "Settings",
    url: "/settings/notifications",
  },
];

const mockFilters: SearchFilter[] = [
  { id: "all", label: "All", count: 124 },
  { id: "docs", label: "Documentation", count: 42 },
  { id: "settings", label: "Settings", count: 18 },
  { id: "app", label: "App", count: 55 },
  { id: "blog", label: "Blog", count: 9 },
];

const mockRecentSearches: RecentSearch[] = [
  { id: "1", query: "authentication setup", timestamp: "2h ago" },
  { id: "2", query: "API keys", timestamp: "Yesterday" },
  { id: "3", query: "team permissions", timestamp: "3 days ago" },
  { id: "4", query: "billing invoice", timestamp: "1 week ago" },
];

const meta: Meta<typeof SearchCommandPalette> = {
  title: "Blocks/Search/SearchCommandPalette",
  component: SearchCommandPalette,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

const InteractiveTemplate = (args: React.ComponentProps<typeof SearchCommandPalette>) => {
  const { open, setOpen } = useSearchCommandPalette();
  return (
    <>
      <Button onClick={() => setOpen(true)}>Search (⌘K)</Button>
      <SearchCommandPalette {...args} open={open} onOpenChange={setOpen} />
    </>
  );
};

export const Default: Story = {
  render: (args) => (
    <div className="p-8">
      <InteractiveTemplate {...args} />
    </div>
  ),
  args: {
    results: mockResults,
    filters: mockFilters,
    recentSearches: mockRecentSearches,
  },
};

export const WithActiveFilter: Story = {
  render: (args) => (
    <div className="p-8">
      <InteractiveTemplate {...args} />
    </div>
  ),
  args: {
    results: mockResults.filter((r) => r.category === "Documentation"),
    filters: mockFilters,
    recentSearches: mockRecentSearches,
    activeFilter: "docs",
  },
};

export const NoRecentSearches: Story = {
  render: (args) => (
    <div className="p-8">
      <InteractiveTemplate {...args} />
    </div>
  ),
  args: {
    results: mockResults,
    filters: mockFilters,
    recentSearches: [],
  },
};

export const EmptyResults: Story = {
  render: (args) => (
    <div className="p-8">
      <InteractiveTemplate {...args} />
    </div>
  ),
  args: {
    results: [],
    filters: mockFilters,
    recentSearches: mockRecentSearches,
  },
};

export const DarkMode: Story = {
  render: (args) => (
    <div className="dark bg-background p-8" style={{ background: "hsl(240 10% 3.9%)" }}>
      <InteractiveTemplate {...args} />
    </div>
  ),
  args: {
    results: mockResults,
    filters: mockFilters,
    recentSearches: mockRecentSearches,
  },
};
