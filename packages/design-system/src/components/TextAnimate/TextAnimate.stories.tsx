import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import { Typewriter, BlurIn, FadeUp, LetterReveal, WordReveal, GradientText } from "./index";

const meta: Meta = {
  title: "Components/TextAnimate",
};

export default meta;

export const TypewriterStory: StoryObj = {
  name: "Typewriter",
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      <div>
        <p style={{ fontSize: "12px", marginBottom: "8px" }}>Default (50ms)</p>
        <Typewriter text="Hello, world!" />
      </div>
      <div>
        <p style={{ fontSize: "12px", marginBottom: "8px" }}>Fast (20ms)</p>
        <Typewriter text="This types really fast!" speed={20} />
      </div>
      <div>
        <p style={{ fontSize: "12px", marginBottom: "8px" }}>No cursor</p>
        <Typewriter text="No cursor here." showCursor={false} />
      </div>
      <div>
        <p style={{ fontSize: "12px", marginBottom: "8px" }}>Large text</p>
        <Typewriter
          text="Big animated text"
          className="text-3xl font-bold"
        />
      </div>
    </div>
  ),
};

export const BlurInStory: StoryObj = {
  name: "BlurIn",
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      {(["sm", "md", "lg"] as const).map((size) => (
        <div key={size}>
          <p style={{ fontSize: "12px", marginBottom: "8px" }}>Size: {size}</p>
          <BlurIn size={size}>Text fades in from blurred to sharp</BlurIn>
        </div>
      ))}
      <div>
        <p style={{ fontSize: "12px", marginBottom: "8px" }}>Custom class</p>
        <BlurIn className="text-2xl font-semibold text-[hsl(var(--la-primary))]">
          Styled blur in text
        </BlurIn>
      </div>
    </div>
  ),
};

export const FadeUpStory: StoryObj = {
  name: "FadeUp",
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      {(["sm", "md", "lg"] as const).map((size) => (
        <div key={size}>
          <p style={{ fontSize: "12px", marginBottom: "8px" }}>Size: {size}</p>
          <FadeUp size={size}>Text slides up and fades in</FadeUp>
        </div>
      ))}
      <div>
        <p style={{ fontSize: "12px", marginBottom: "8px" }}>Custom class</p>
        <FadeUp className="text-2xl font-bold">Styled fade up text</FadeUp>
      </div>
    </div>
  ),
};

export const LetterRevealStory: StoryObj = {
  name: "LetterReveal",
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      <div>
        <p style={{ fontSize: "12px", marginBottom: "8px" }}>
          Default (30ms stagger)
        </p>
        <LetterReveal text="Letters reveal one by one" />
      </div>
      <div>
        <p style={{ fontSize: "12px", marginBottom: "8px" }}>
          Fast (15ms stagger)
        </p>
        <LetterReveal text="Fast letter reveal" staggerDelay={15} />
      </div>
      <div>
        <p style={{ fontSize: "12px", marginBottom: "8px" }}>
          Slow (60ms stagger)
        </p>
        <LetterReveal text="Slow dramatic reveal" staggerDelay={60} />
      </div>
      <div>
        <p style={{ fontSize: "12px", marginBottom: "8px" }}>Large styled</p>
        <LetterReveal
          text="BIG REVEAL"
          className="text-4xl font-extrabold tracking-wider"
          staggerDelay={80}
        />
      </div>
    </div>
  ),
};

export const WordRevealStory: StoryObj = {
  name: "WordReveal",
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      <div>
        <p style={{ fontSize: "12px", marginBottom: "8px" }}>
          Default (100ms stagger)
        </p>
        <WordReveal text="Words reveal one by one" />
      </div>
      <div>
        <p style={{ fontSize: "12px", marginBottom: "8px" }}>
          Fast (50ms stagger)
        </p>
        <WordReveal text="Fast word reveal" staggerDelay={50} />
      </div>
      <div>
        <p style={{ fontSize: "12px", marginBottom: "8px" }}>
          Slow (200ms stagger)
        </p>
        <WordReveal text="Slow dramatic reveal" staggerDelay={200} />
      </div>
      <div>
        <p style={{ fontSize: "12px", marginBottom: "8px" }}>Large styled</p>
        <WordReveal
          text="Beautiful Word Animation"
          className="text-3xl font-bold"
          staggerDelay={100}
        />
      </div>
    </div>
  ),
};

export const GradientTextStory: StoryObj = {
  name: "GradientText",
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      <div>
        <p style={{ fontSize: "12px", marginBottom: "8px" }}>Default</p>
        <GradientText>Primary gradient text</GradientText>
      </div>
      <div>
        <p style={{ fontSize: "12px", marginBottom: "8px" }}>Primary variant</p>
        <GradientText variant="primary">Primary variant</GradientText>
      </div>
      <div>
        <p style={{ fontSize: "12px", marginBottom: "8px" }}>Rainbow variant</p>
        <GradientText variant="rainbow" className="text-3xl font-bold">
          Rainbow gradient text
        </GradientText>
      </div>
      <div>
        <p style={{ fontSize: "12px", marginBottom: "8px" }}>Sunset variant</p>
        <GradientText variant="sunset" className="text-2xl font-semibold">
          Sunset gradient text
        </GradientText>
      </div>
      <div>
        <p style={{ fontSize: "12px", marginBottom: "8px" }}>Large styled</p>
        <GradientText variant="primary" className="text-4xl font-extrabold">
          Beautiful gradient text
        </GradientText>
      </div>
    </div>
  ),
};

export const AllTextAnimations: StoryObj = {
  name: "All Text Animations",
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "40px", padding: "24px" }}>
      <section>
        <h3 style={{ fontSize: "14px", fontWeight: "600", marginBottom: "12px" }}>
          Typewriter
        </h3>
        <Typewriter text="Building a design system one component at a time." className="text-xl" />
      </section>
      <section>
        <h3 style={{ fontSize: "14px", fontWeight: "600", marginBottom: "12px" }}>
          Blur In
        </h3>
        <BlurIn className="text-xl">Emerging from the blur into clarity.</BlurIn>
      </section>
      <section>
        <h3 style={{ fontSize: "14px", fontWeight: "600", marginBottom: "12px" }}>
          Fade Up
        </h3>
        <FadeUp className="text-xl">Rising up with purpose and style.</FadeUp>
      </section>
      <section>
        <h3 style={{ fontSize: "14px", fontWeight: "600", marginBottom: "12px" }}>
          Letter Reveal
        </h3>
        <LetterReveal text="Every letter has its moment." className="text-xl" />
      </section>
      <section>
        <h3 style={{ fontSize: "14px", fontWeight: "600", marginBottom: "12px" }}>
          Word Reveal
        </h3>
        <WordReveal text="Every word has its moment." className="text-xl" />
      </section>
      <section>
        <h3 style={{ fontSize: "14px", fontWeight: "600", marginBottom: "12px" }}>
          Gradient Text
        </h3>
        <GradientText variant="primary" className="text-xl">
          Beautiful gradient text effect.
        </GradientText>
      </section>
    </div>
  ),
};
