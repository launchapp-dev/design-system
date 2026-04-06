import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { AnimatedText, TextTransition } from "./index";

const meta: Meta<typeof AnimatedText> = {
  title: "Components/AnimatedText",
  component: AnimatedText,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const FadeUp: Story = {
  args: {
    text: "Animated text with fade up effect",
    animation: "fadeUp",
    size: "md",
  },
};

export const BlurIn: Story = {
  args: {
    text: "Text that blurs in smoothly",
    animation: "blurIn",
    size: "lg",
  },
};

export const LetterReveal: Story = {
  args: {
    text: "Letter by letter reveal",
    animation: "letterReveal",
    size: "md",
    staggerDelay: 50,
  },
};

export const WordReveal: Story = {
  args: {
    text: "Word by word animation reveal",
    animation: "wordReveal",
    size: "md",
    staggerDelay: 100,
  },
};

export const WithDelay: Story = {
  args: {
    text: "This text animates with a delay",
    animation: "fadeUp",
    size: "md",
    delay: 500,
  },
};

export const AllSizes: Story = {
  render: () => (
    <div className="space-y-4">
      <div>
        <AnimatedText text="Small text" animation="fadeUp" size="sm" />
      </div>
      <div>
        <AnimatedText text="Medium text" animation="fadeUp" size="md" />
      </div>
      <div>
        <AnimatedText text="Large text" animation="fadeUp" size="lg" />
      </div>
      <div>
        <AnimatedText text="Extra large text" animation="fadeUp" size="xl" />
      </div>
      <div>
        <AnimatedText text="2XL text" animation="fadeUp" size="2xl" />
      </div>
    </div>
  ),
};

export const AllAnimations: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <p className="text-sm text-muted-foreground mb-2">Fade Up</p>
        <AnimatedText text="Fade up animation" animation="fadeUp" size="md" />
      </div>
      <div>
        <p className="text-sm text-muted-foreground mb-2">Blur In</p>
        <AnimatedText text="Blur in animation" animation="blurIn" size="md" />
      </div>
      <div>
        <p className="text-sm text-muted-foreground mb-2">Letter Reveal</p>
        <AnimatedText text="Letter reveal" animation="letterReveal" size="md" staggerDelay={30} />
      </div>
      <div>
        <p className="text-sm text-muted-foreground mb-2">Word Reveal</p>
        <AnimatedText
          text="Word by word reveal"
          animation="wordReveal"
          size="md"
          staggerDelay={100}
        />
      </div>
    </div>
  ),
};

export const TextTransitionStory: Story = {
  render: () => {
    const [count, setCount] = React.useState(0);
    const texts = ["Count: 0", "Count: 1", "Count: 2", "Count: 3"];

    React.useEffect(() => {
      const timer = setInterval(() => {
        setCount((prev) => (prev + 1) % texts.length);
      }, 2000);
      return () => clearInterval(timer);
    }, [texts.length]);

    return (
      <div className="space-y-4">
        <p className="text-sm text-muted-foreground">Auto-transitioning text</p>
        <TextTransition text={texts[count]} size="lg" />
      </div>
    );
  },
};

export const TextTransitionDirections: Story = {
  render: () => {
    const [upCount, setUpCount] = React.useState(0);
    const [downCount, setDownCount] = React.useState(0);
    const texts = ["Direction: Up", "Direction: Updated"];

    React.useEffect(() => {
      const timer = setInterval(() => {
        setUpCount((prev) => (prev + 1) % 2);
      }, 2000);
      return () => clearInterval(timer);
    }, []);

    React.useEffect(() => {
      const timer = setInterval(() => {
        setDownCount((prev) => (prev + 1) % 2);
      }, 2000);
      return () => clearInterval(timer);
    }, []);

    return (
      <div className="space-y-6">
        <div>
          <p className="text-sm text-muted-foreground mb-2">Slide from Bottom</p>
          <TextTransition text={texts[upCount]} direction="up" />
        </div>
        <div>
          <p className="text-sm text-muted-foreground mb-2">Slide from Top</p>
          <TextTransition text={texts[downCount]} direction="down" />
        </div>
      </div>
    );
  },
};
