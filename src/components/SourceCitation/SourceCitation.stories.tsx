import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import {
  SourceCitation,
  SourceCitationList,
  SourceCitationInline,
} from "./index";
import type { Source } from "./index";

const meta: Meta<typeof SourceCitation> = {
  title: "Components/SourceCitation",
  component: SourceCitation,
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "primary", "outline"],
    },
    number: { control: "number" },
    source: { control: "text" },
  },
  args: {
    variant: "default",
    number: 1,
    source: "Wikipedia",
  },
};

export default meta;
type Story = StoryObj<typeof SourceCitation>;

export const Default: Story = {
  render: (args) => (
    <p className="p-4 text-sm">
      The Earth orbits the Sun{" "}
      <SourceCitation {...args} />
      {" "}at an average distance of 93 million miles.
    </p>
  ),
};

export const WithLink: Story = {
  args: {
    number: 1,
    source: "NASA",
    href: "https://nasa.gov",
    title: "NASA Official Website",
  },
  render: (args) => (
    <p className="p-4 text-sm">
      According to recent research{" "}
      <SourceCitation {...args} />
      , the James Webb telescope has revealed new insights.
    </p>
  ),
};

export const Inline: Story = {
  render: () => (
    <p className="p-4 text-sm leading-relaxed">
      Machine learning has transformed many industries
      <SourceCitationInline number={1} className="mx-0.5" />
      , with applications ranging from healthcare
      <SourceCitationInline number={2} variant="primary" className="mx-0.5" />
      {" "}to autonomous vehicles
      <SourceCitationInline number={3} variant="outline" className="mx-0.5" />
      .
    </p>
  ),
};

export const CitationList: StoryObj<typeof SourceCitationList> = {
  render: () => {
    const sources: Source[] = [
      {
        id: "1",
        number: 1,
        title: "Machine Learning Fundamentals",
        url: "https://example.com/ml",
        snippet: "An introduction to machine learning concepts and algorithms for beginners.",
      },
      {
        id: "2",
        number: 2,
        title: "AI in Healthcare: A Review",
        url: "https://example.com/healthcare",
        snippet: "How artificial intelligence is revolutionizing medical diagnosis and treatment.",
      },
      {
        id: "3",
        number: 3,
        title: "Autonomous Vehicle Technology",
        url: "https://example.com/vehicles",
        snippet: "The latest developments in self-driving car technology and safety features.",
      },
    ];

    return (
      <div className="p-4 max-w-2xl">
        <SourceCitationList sources={sources} />
      </div>
    );
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-6 p-4 max-w-2xl">
      <div className="flex flex-col gap-2">
        <span className="text-xs font-medium text-muted-foreground uppercase">Default</span>
        <p className="text-sm">
          Citation example
          <SourceCitation number={1} source="Source" variant="default" className="ml-1" />
        </p>
      </div>
      <div className="flex flex-col gap-2">
        <span className="text-xs font-medium text-muted-foreground uppercase">Primary</span>
        <p className="text-sm">
          Citation example
          <SourceCitation number={1} source="Source" variant="primary" className="ml-1" />
        </p>
      </div>
      <div className="flex flex-col gap-2">
        <span className="text-xs font-medium text-muted-foreground uppercase">Outline</span>
        <p className="text-sm">
          Citation example
          <SourceCitation number={1} source="Source" variant="outline" className="ml-1" />
        </p>
      </div>
    </div>
  ),
};

export const CompleteExample: Story = {
  render: () => {
    const sources: Source[] = [
      {
        id: "1",
        number: 1,
        title: "OpenAI Research",
        url: "https://openai.com/research",
        snippet: "Large language models demonstrate emergent capabilities at scale.",
      },
      {
        id: "2",
        number: 2,
        title: "Stanford AI Lab",
        url: "https://ai.stanford.edu",
        snippet: "Transformer architectures have revolutionized natural language processing.",
      },
    ];

    return (
      <div className="p-4 max-w-2xl space-y-4">
        <div className="rounded-lg bg-muted p-4">
          <p className="text-sm leading-relaxed">
            Large language models have shown remarkable capabilities in understanding
            and generating human-like text
            <SourceCitationInline number={1} className="mx-0.5" />
            . These models leverage transformer architectures
            <SourceCitationInline number={2} className="mx-0.5" />
            {" "}to process and generate coherent responses across a wide range of topics.
          </p>
        </div>
        <SourceCitationList sources={sources} />
      </div>
    );
  },
};
