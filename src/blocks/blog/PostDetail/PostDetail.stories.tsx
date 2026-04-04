import type { Meta, StoryObj } from "@storybook/react";
import { PostDetail } from "./index";

const sampleContent = (
  <div className="space-y-4">
    <p>
      React 19 introduces a fundamentally new mental model for handling async
      operations in your components. The new Actions API removes the need for
      manually tracking loading states, errors, and optimistic updates.
    </p>
    <h2 id="actions-api" className="text-2xl font-bold text-foreground mt-8">
      The Actions API
    </h2>
    <p>
      With React 19, you can pass async functions directly to form elements.
      React automatically handles pending states, error boundaries, and
      optimistic updates — all without extra boilerplate.
    </p>
    <pre className="rounded-lg bg-muted p-4 overflow-x-auto text-sm">
      <code>{`async function addToCart(formData) {
  await saveItem(formData.get('itemId'));
}

function Cart() {
  return (
    <form action={addToCart}>
      <input name="itemId" value="123" type="hidden" />
      <SubmitButton />
    </form>
  );
}`}</code>
    </pre>
    <h2 id="new-hooks" className="text-2xl font-bold text-foreground mt-8">
      New Hooks
    </h2>
    <p>
      React 19 ships four new hooks:{" "}
      <code className="bg-muted px-1 py-0.5 rounded text-sm">
        useActionState
      </code>
      ,{" "}
      <code className="bg-muted px-1 py-0.5 rounded text-sm">
        useFormStatus
      </code>
      ,{" "}
      <code className="bg-muted px-1 py-0.5 rounded text-sm">
        useOptimistic
      </code>
      , and <code className="bg-muted px-1 py-0.5 rounded text-sm">use</code>.
    </p>
    <h3
      id="useactionstate"
      className="text-xl font-semibold text-foreground mt-6"
    >
      useActionState
    </h3>
    <p>
      This hook allows you to update state based on the result of a form action.
      It returns the current state of the action plus a dispatch function.
    </p>
    <h3
      id="useoptimistic"
      className="text-xl font-semibold text-foreground mt-6"
    >
      useOptimistic
    </h3>
    <p>
      The{" "}
      <code className="bg-muted px-1 py-0.5 rounded text-sm">
        useOptimistic
      </code>{" "}
      hook lets you show a different state while an async action is underway,
      then automatically revert if it fails.
    </p>
    <h2 id="performance" className="text-2xl font-bold text-foreground mt-8">
      Performance improvements
    </h2>
    <p>
      React 19 includes significant compiler improvements that reduce
      unnecessary re-renders without any changes to your code. The new compiler
      understands JavaScript semantics deeply.
    </p>
  </div>
);

const sampleToc = [
  { id: "actions-api", title: "The Actions API", level: 2 },
  { id: "new-hooks", title: "New Hooks", level: 2 },
  { id: "useactionstate", title: "useActionState", level: 3 },
  { id: "useoptimistic", title: "useOptimistic", level: 3 },
  { id: "performance", title: "Performance improvements", level: 2 },
];

const meta: Meta<typeof PostDetail> = {
  title: "Blocks/Blog/PostDetail",
  component: PostDetail,
  parameters: {
    layout: "fullscreen",
    docs: {
      source: {
        code: `import { PostDetail } from "@launchapp/design-system";

export default function PostPage() {
  return (
    <PostDetail
      title="Getting started with React 19"
      content={<article>...</article>}
      author="Sarah Chen"
      publishedAt="March 12, 2026"
      readingTime="5 min read"
      category="Engineering"
      tags={["React", "JavaScript"]}
      tableOfContents={toc}
    />
  );
}`,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof PostDetail>;

export const Default: Story = {
  render: () => (
    <PostDetail
      title="Getting started with React 19: Actions, new hooks, and what's changed"
      content={sampleContent}
      author="Sarah Chen"
      authorBio="Staff engineer at Vercel. Writes about React, performance, and developer experience."
      authorAvatarFallback="SC"
      publishedAt="March 12, 2026"
      readingTime="5 min read"
      category="Engineering"
      tags={["React", "JavaScript", "Frontend", "Web Development"]}
      tableOfContents={sampleToc}
    />
  ),
};

export const WithoutSidebar: Story = {
  render: () => (
    <PostDetail
      title="The psychology of great developer tooling"
      content={sampleContent}
      author="Marcus Rivera"
      authorBio="Design engineer and tooling nerd."
      authorAvatarFallback="MR"
      publishedAt="March 8, 2026"
      readingTime="8 min read"
      category="Design"
      tags={["Design", "Developer Experience"]}
    />
  ),
};

export const MinimalMetadata: Story = {
  render: () => (
    <PostDetail
      title="A short thought on composition"
      content={
        <p className="text-muted-foreground">
          Composition is the act of combining simple pieces into complex
          behavior. The best APIs expose the right primitives and let users
          build what they need. Over-engineering is always worse than
          under-engineering.
        </p>
      }
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
    <PostDetail
      title="Getting started with React 19"
      content={sampleContent}
      author="Sarah Chen"
      authorBio="Staff engineer. Writes about React and performance."
      authorAvatarFallback="SC"
      publishedAt="March 12, 2026"
      readingTime="5 min read"
      category="Engineering"
      tags={["React", "JavaScript"]}
      tableOfContents={sampleToc}
    />
  ),
};

export const Mobile: Story = {
  parameters: { viewport: { defaultViewport: "mobile1" } },
  render: () => (
    <PostDetail
      title="Getting started with React 19"
      content={sampleContent}
      author="Sarah Chen"
      publishedAt="March 12, 2026"
      readingTime="5 min read"
      category="Engineering"
      tableOfContents={sampleToc}
    />
  ),
};
