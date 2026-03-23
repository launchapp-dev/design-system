import type { Meta, StoryObj } from "@storybook/react";
import {
  ChatBubble,
  ChatBubbleGroup,
  ChatBubbleLinkPreview,
} from "./index";

const meta = {
  title: "Components/ChatBubble",
  component: ChatBubble,
  argTypes: {
    variant: {
      control: "select",
      options: ["user", "assistant", "system"],
    },
    showAvatar: {
      control: "boolean",
    },
  },
} satisfies Meta<typeof ChatBubble>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <ChatBubble {...args}>
      Hello! How can I help you today?
    </ChatBubble>
  ),
  args: {
    variant: "assistant",
    showAvatar: true,
    avatarFallback: "AI",
  },
};

export const UserMessage: Story = {
  render: (args) => (
    <ChatBubble {...args}>
      Can you help me write a React component?
    </ChatBubble>
  ),
  args: {
    variant: "user",
    showAvatar: true,
    avatarFallback: "JD",
    timestamp: "2:34 PM",
  },
};

export const AssistantMessage: Story = {
  render: (args) => (
    <ChatBubble {...args}>
      Of course! I'd be happy to help you write a React component. What kind of component are you looking to create?
    </ChatBubble>
  ),
  args: {
    variant: "assistant",
    showAvatar: true,
    avatarFallback: "AI",
    timestamp: "2:35 PM",
  },
};

export const SystemMessage: Story = {
  render: (args) => (
    <ChatBubble {...args}>
      This conversation is being monitored for quality assurance.
    </ChatBubble>
  ),
  args: {
    variant: "system",
    showAvatar: false,
    timestamp: "2:30 PM",
  },
};

export const WithMarkdown: Story = {
  render: (args) => (
    <ChatBubble {...args}>
      {`Here's how to create a **React component**:\n\nYou can use *functional components* with \`useState\`:\n\n\`\`\`tsx\nimport { useState } from 'react';\n\nfunction Counter() {\n  const [count, setCount] = useState(0);\n  return (\n    <button onClick={() => setCount(c => c + 1)}>\n      Count: {count}\n    </button>\n  );\n}\n\`\`\`\n\nCheck out [React docs](https://react.dev) for more info.`}
    </ChatBubble>
  ),
  args: {
    variant: "assistant",
    showAvatar: true,
    avatarFallback: "AI",
    timestamp: "2:36 PM",
  },
};

export const WithCodeBlock: Story = {
  render: (args) => (
    <ChatBubble {...args}>
      {`Here's the complete solution:\n\n\`\`\`typescript\ninterface Props {\n  name: string;\n  age: number;\n}\n\nconst Greeting: React.FC<Props> = ({ name, age }) => {\n  return (\n    <div>\n      <h1>Hello, {name}!</h1>\n      <p>You are {age} years old.</p>\n    </div>\n  );\n};\n\nexport default Greeting;\n\`\`\``}
    </ChatBubble>
  ),
  args: {
    variant: "assistant",
    showAvatar: true,
    avatarFallback: "AI",
    timestamp: "2:37 PM",
  },
};

export const WithLinkPreview: Story = {
  render: (args) => (
    <ChatBubble {...args}>
      Check out this amazing article!
      <ChatBubbleLinkPreview
        url="https://example.com/article"
        title="Understanding React Hooks"
        description="A comprehensive guide to using React hooks in your applications for better state management."
        image="https://picsum.photos/seed/react/200/200"
      />
    </ChatBubble>
  ),
  args: {
    variant: "assistant",
    showAvatar: true,
    avatarFallback: "AI",
    timestamp: "2:38 PM",
  },
};

export const Conversation: Story = {
  render: () => (
    <ChatBubbleGroup className="max-w-xl">
      <ChatBubble variant="system" showAvatar={false}>
        Chat started at 2:30 PM
      </ChatBubble>
      <ChatBubble variant="user" avatarFallback="JD" timestamp="2:31 PM">
        Hi there! I need help with my project.
      </ChatBubble>
      <ChatBubble variant="assistant" avatarFallback="AI" timestamp="2:31 PM">
        Hello! I'm happy to help. What kind of project are you working on?
      </ChatBubble>
      <ChatBubble variant="user" avatarFallback="JD" timestamp="2:32 PM">
        I'm building a **dashboard** with *charts* and need to know how to use `recharts`.
      </ChatBubble>
      <ChatBubble variant="assistant" avatarFallback="AI" timestamp="2:33 PM">
        {`Great choice! Recharts is excellent for dashboards. Here's a simple example:\n\n\`\`\`tsx\nimport { LineChart, Line, XAxis, YAxis } from 'recharts';\n\nconst data = [\n  { name: 'Jan', value: 400 },\n  { name: 'Feb', value: 300 },\n];\n\`\`\`\n\nLearn more at [recharts.org](https://recharts.org).`}
      </ChatBubble>
    </ChatBubbleGroup>
  ),
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-4 max-w-xl">
      <ChatBubble variant="user" avatarFallback="US">
        User message - right aligned
      </ChatBubble>
      <ChatBubble variant="assistant" avatarFallback="AI">
        Assistant message - left aligned
      </ChatBubble>
      <ChatBubble variant="system" showAvatar={false}>
        System message - centered
      </ChatBubble>
    </div>
  ),
};

export const WithAvatarImage: Story = {
  render: (args) => (
    <ChatBubble {...args}>
      Thanks for reaching out! I'm here to help with any questions you might have.
    </ChatBubble>
  ),
  args: {
    variant: "assistant",
    showAvatar: true,
    avatarSrc: "https://github.com/shadcn.png",
    avatarAlt: "Assistant",
    avatarFallback: "AI",
    timestamp: "2:40 PM",
  },
};

export const LongMessage: Story = {
  render: (args) => (
    <ChatBubble {...args}>
      {`This is a longer message that demonstrates how the chat bubble handles extensive text content. The component should properly wrap text and maintain readability even with longer paragraphs. **Bold text** and *italic text* should still render correctly within the flow.\n\nHere's some \`inline code\` and a link to [documentation](https://example.com).\n\n\`\`\`python\ndef long_example():\n    # This code block demonstrates\n    # how longer code snippets are handled\n    for i in range(10):\n        print(f"Item {i}")\n    return "Complete"\n\`\`\`\n\nThe bubble should expand appropriately while maintaining good visual hierarchy.`}
    </ChatBubble>
  ),
  args: {
    variant: "assistant",
    showAvatar: true,
    avatarFallback: "AI",
    timestamp: "2:41 PM",
  },
};

export const UserWithMarkdown: Story = {
  render: (args) => (
    <ChatBubble {...args}>
      {`I tried this code:\n\n\`\`\`js\nconst test = () => console.log("hello");\n\`\`\`\n\nBut it's not working with **my setup**. Can you help?`}
    </ChatBubble>
  ),
  args: {
    variant: "user",
    showAvatar: true,
    avatarFallback: "JD",
    timestamp: "2:42 PM",
  },
};

export const DarkMode: Story = {
  decorators: [
    (Story) => (
      <div className="dark bg-zinc-900 p-6 rounded-lg">
        <Story />
      </div>
    ),
  ],
  render: () => (
    <ChatBubbleGroup className="max-w-xl">
      <ChatBubble variant="user" avatarFallback="JD" timestamp="2:43 PM">
        How does this look in dark mode?
      </ChatBubble>
      <ChatBubble variant="assistant" avatarFallback="AI" timestamp="2:43 PM">
        {`Dark mode looks great! Here's some \`inline code\` and a code block:\n\n\`\`\`css\n.dark {\n  background: #18181b;\n  color: #fafafa;\n}\n\`\`\``}
      </ChatBubble>
    </ChatBubbleGroup>
  ),
};

export const WithoutAvatar: Story = {
  render: (args) => (
    <ChatBubble {...args}>
      This message has no avatar displayed.
    </ChatBubble>
  ),
  args: {
    variant: "assistant",
    showAvatar: false,
    timestamp: "2:44 PM",
  },
};
