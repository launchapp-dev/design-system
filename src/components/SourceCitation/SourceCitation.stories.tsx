import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import { SourceCitation } from "./index";

const meta: Meta<typeof SourceCitation> = {
  title: "Components/SourceCitation",
  component: SourceCitation,
  argTypes: {
    index: { control: "number" },
    title: { control: "text" },
    url: { control: "text" },
    snippet: { control: "text" },
  },
  args: {
    index: 1,
    title: "Introduction to React",
    url: "https://react.dev",
    snippet: "React is a JavaScript library for building user interfaces, maintained by Meta and a community of individual developers.",
  },
};

export default meta;
type Story = StoryObj<typeof SourceCitation>;

export const Default: Story = {};

export const WithoutURL: Story = {
  args: {
    index: 2,
    title: "Design Systems Handbook",
    url: undefined,
    snippet: "A design system is a collection of reusable components, guided by clear standards, that can be assembled to build any number of applications.",
  },
};

export const WithoutSnippet: Story = {
  args: {
    index: 3,
    title: "Tailwind CSS Documentation",
    url: "https://tailwindcss.com/docs",
    snippet: undefined,
  },
};

export const InlineUsage: Story = {
  render: () => (
    <div style={{ maxWidth: 480, lineHeight: "1.7" }}>
      <p style={{ fontSize: 14 }}>
        React was first released in 2013
        <SourceCitation
          index={1}
          title="React (software)"
          url="https://en.wikipedia.org/wiki/React_(software)"
          snippet="React is a free and open-source front-end JavaScript library for building user interfaces based on components."
        />
        {" "}and has since become one of the most popular frontend libraries
        <SourceCitation
          index={2}
          title="State of JS Survey"
          url="https://stateofjs.com"
          snippet="React continues to dominate frontend library usage across the JavaScript ecosystem."
        />
        . It was created by Jordan Walke
        <SourceCitation
          index={3}
          title="Jordan Walke - React Creator"
          snippet="Jordan Walke is a software engineer at Meta who created the React JavaScript library."
        />
        .
      </p>
    </div>
  ),
};

export const MultipleCitations: Story = {
  render: () => (
    <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
      {[1, 2, 3, 4, 5].map((i) => (
        <SourceCitation
          key={i}
          index={i}
          title={`Source ${i}`}
          url={`https://example.com/source-${i}`}
          snippet={`This is a snippet from source ${i}.`}
        />
      ))}
    </div>
  ),
};
