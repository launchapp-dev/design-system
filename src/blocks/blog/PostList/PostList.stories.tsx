import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import { PostList } from "./index";

const samplePosts = [
  {
    id: "1",
    title: "Getting started with React 19",
    excerpt:
      "Explore the new features in React 19 including the Actions API, new hooks, and improved performance optimizations that make building UIs easier than ever.",
    category: "Engineering",
    author: "Sarah Chen",
    date: "Mar 12, 2026",
    readingTime: "5 min read",
    image: (
      <div className="h-full w-full bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-900/30 dark:to-indigo-900/30" />
    ),
    href: "#",
  },
  {
    id: "2",
    title: "Design systems at scale: lessons learned",
    excerpt:
      "After three years of building and maintaining design systems across multiple products, here's what we learned about token architecture, component APIs, and governance.",
    category: "Design",
    author: "Marcus Rivera",
    date: "Mar 8, 2026",
    readingTime: "8 min read",
    image: (
      <div className="h-full w-full bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30" />
    ),
  },
  {
    id: "3",
    title: "The future of TypeScript: type-level programming",
    excerpt:
      "Advanced TypeScript patterns that can make your code safer and more expressive without sacrificing developer experience.",
    category: "Engineering",
    author: "Aisha Nwosu",
    date: "Mar 5, 2026",
    readingTime: "12 min read",
    href: "#",
  },
  {
    id: "4",
    title: "Building accessible forms: a practical guide",
    excerpt:
      "A step-by-step approach to building forms that work for everyone, including screen reader users and keyboard-only navigators.",
    category: "Accessibility",
    author: "Tom Bergström",
    date: "Feb 28, 2026",
    readingTime: "7 min read",
    image: (
      <div className="h-full w-full bg-gradient-to-br from-green-100 to-teal-100 dark:from-green-900/30 dark:to-teal-900/30" />
    ),
    href: "#",
  },
  {
    id: "5",
    title: "Performance budgets in production",
    excerpt:
      "How we set up automated performance budgets and alerting to catch regressions before they reach users.",
    category: "Engineering",
    author: "Yuki Tanaka",
    date: "Feb 20, 2026",
    readingTime: "6 min read",
  },
  {
    id: "6",
    title: "The psychology of color in product design",
    excerpt:
      "How color choices affect user perception, trust, and conversion — with real examples from successful products.",
    category: "Design",
    author: "Priya Kapoor",
    date: "Feb 15, 2026",
    readingTime: "9 min read",
    image: (
      <div className="h-full w-full bg-gradient-to-br from-orange-100 to-red-100 dark:from-orange-900/30 dark:to-red-900/30" />
    ),
    href: "#",
  },
];

const categories = ["Engineering", "Design", "Accessibility", "Product"];

const meta: Meta<typeof PostList> = {
  title: "Blocks/Blog/PostList",
  component: PostList,
  parameters: {
    layout: "fullscreen",
    docs: {
      source: {
        code: `import { PostList } from "@launchapp/design-system";

export default function BlogPage() {
  return (
    <PostList
      title="Blog"
      posts={posts}
      categories={["Engineering", "Design", "Product"]}
      totalPages={3}
      currentPage={1}
    />
  );
}`,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof PostList>;

export const Default: Story = {
  render: () => (
    <PostList
      title="Blog"
      subtitle="Thoughts on engineering, design, and building products."
      posts={samplePosts}
      categories={categories}
      totalPages={3}
      currentPage={1}
    />
  ),
};

export const WithCategoryFilter: Story = {
  render: () => {
    const [selected, setSelected] = React.useState<string | undefined>(
      "Engineering",
    );
    const filtered = selected
      ? samplePosts.filter((p) => p.category === selected)
      : samplePosts;
    return (
      <PostList
        title="Blog"
        posts={filtered}
        categories={categories}
        selectedCategory={selected}
        onCategoryChange={setSelected}
      />
    );
  },
};

export const EmptyState: Story = {
  render: () => (
    <PostList
      title="Blog"
      posts={[]}
      categories={categories}
      selectedCategory="Product"
    />
  ),
};

export const WithPagination: Story = {
  render: () => {
    const [page, setPage] = React.useState(1);
    return (
      <PostList
        title="Latest posts"
        posts={samplePosts}
        currentPage={page}
        totalPages={5}
        onPageChange={setPage}
      />
    );
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
  render: () => (
    <PostList
      title="Blog"
      posts={samplePosts}
      categories={categories}
      totalPages={2}
      currentPage={1}
    />
  ),
};

export const Mobile: Story = {
  parameters: { viewport: { defaultViewport: "mobile1" } },
  render: () => (
    <PostList
      title="Blog"
      posts={samplePosts.slice(0, 3)}
      categories={categories}
    />
  ),
};

export const Tablet: Story = {
  parameters: { viewport: { defaultViewport: "tablet" } },
  render: () => (
    <PostList
      title="Blog"
      posts={samplePosts}
      categories={categories}
      totalPages={2}
      currentPage={1}
    />
  ),
};
