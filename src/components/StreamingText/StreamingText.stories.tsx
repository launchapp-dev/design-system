import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import { StreamingText } from "./index";

const meta: Meta = {
  title: "Components/StreamingText",
};

export default meta;

export const Default: StoryObj = {
  name: "Default",
  render: () => {
    const [text, _setText] = React.useState("Hello, this is streaming text!");
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
        <StreamingText text={text} speed={30} />
      </div>
    );
  },
};

export const Sizes: StoryObj = {
  name: "Sizes",
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      <div>
        <p style={{ fontSize: "12px", marginBottom: "8px" }}>Small</p>
        <StreamingText text="Small text size" size="sm" />
      </div>
      <div>
        <p style={{ fontSize: "12px", marginBottom: "8px" }}>Medium (default)</p>
        <StreamingText text="Medium text size" size="md" />
      </div>
      <div>
        <p style={{ fontSize: "12px", marginBottom: "8px" }}>Large</p>
        <StreamingText text="Large text size" size="lg" />
      </div>
    </div>
  ),
};

export const SpeedVariants: StoryObj = {
  name: "Speed Variants",
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      <div>
        <p style={{ fontSize: "12px", marginBottom: "8px" }}>Fast (15ms)</p>
        <StreamingText text="This types really fast!" speed={15} />
      </div>
      <div>
        <p style={{ fontSize: "12px", marginBottom: "8px" }}>Normal (30ms)</p>
        <StreamingText text="Normal typing speed" speed={30} />
      </div>
      <div>
        <p style={{ fontSize: "12px", marginBottom: "8px" }}>Slow (60ms)</p>
        <StreamingText text="Slow and steady" speed={60} />
      </div>
    </div>
  ),
};

export const ChunkSizes: StoryObj = {
  name: "Chunk Sizes",
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      <div>
        <p style={{ fontSize: "12px", marginBottom: "8px" }}>Character by character</p>
        <StreamingText text="Types one character at a time" chunkSize="character" speed={40} />
      </div>
      <div>
        <p style={{ fontSize: "12px", marginBottom: "8px" }}>Word by word</p>
        <StreamingText text="Types one word at a time" chunkSize="word" speed={200} />
      </div>
    </div>
  ),
};

export const NoCursor: StoryObj = {
  name: "No Cursor",
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      <StreamingText text="No cursor shown here" showCursor={false} />
    </div>
  ),
};

export const WithMarkdown: StoryObj = {
  name: "With Markdown",
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      <StreamingText
        text="This text has **bold** and *italic* styles with `inline code`."
        renderMarkdown={true}
        speed={25}
      />
      <StreamingText
        text="Here is some code: `const x = 42;`"
        renderMarkdown={true}
        speed={20}
      />
    </div>
  ),
};

export const WithCodeBlock: StoryObj = {
  name: "With Code Block",
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      <StreamingText
        text={'Here is a code block:\n```\nfunction hello() {\n  console.log("world");\n}\n```'}
        renderMarkdown={true}
        speed={10}
      />
    </div>
  ),
};

export const OnCompleteCallback: StoryObj = {
  name: "On Complete Callback",
  render: () => {
    const [text, setText] = React.useState("This stream will complete soon!");
    const [completed, setCompleted] = React.useState(false);
    const [key, setKey] = React.useState(0);

    const handleRestart = () => {
      setCompleted(false);
      setKey((prev) => prev + 1);
      setText("Restarting the stream...");
    };

    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        <StreamingText
          key={key}
          text={text}
          onComplete={() => setCompleted(true)}
          speed={30}
        />
        {completed && (
          <p style={{ fontSize: "12px", color: "green" }}>
            Streaming completed!
          </p>
        )}
        <button
          onClick={handleRestart}
          style={{
            padding: "8px 16px",
            background: "#0066cc",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            width: "fit-content",
          }}
        >
          Restart Stream
        </button>
      </div>
    );
  },
};

export const StyledText: StoryObj = {
  name: "Styled Text",
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      <StreamingText
        text="Large bold primary colored text"
        className="text-3xl font-bold text-primary"
        speed={40}
      />
      <StreamingText
        text="Secondary styled text"
        className="text-xl text-secondary"
        speed={30}
      />
    </div>
  ),
};

export const SimulatedAIResponse: StoryObj = {
  name: "Simulated AI Response",
  render: () => {
    const fullResponse = `Great question! Here's what I think:

**Key Points:**
1. First, we need to understand the basics
2. Then apply them to practical examples
3. Finally, test and iterate

\`\`\`
const answer = "Hello, World!";
console.log(answer);
\`\`\`

Let me know if you have any questions!`;

    const [displayed, setDisplayed] = React.useState(false);
    const [key, setKey] = React.useState(0);

    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        {!displayed ? (
          <button
            onClick={() => {
              setDisplayed(true);
              setKey((prev) => prev + 1);
            }}
            style={{
              padding: "12px 24px",
              background: "#0066cc",
              color: "white",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              width: "fit-content",
            }}
          >
            Generate AI Response
          </button>
        ) : (
          <StreamingText
            key={key}
            text={fullResponse}
            renderMarkdown={true}
            speed={15}
          />
        )}
      </div>
    );
  },
};
