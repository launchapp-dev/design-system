import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import { NewsletterSignup } from "./index";

const meta: Meta<typeof NewsletterSignup> = {
  title: "Blocks/Blog/NewsletterSignup",
  component: NewsletterSignup,
  parameters: {
    docs: {
      source: {
        code: `import { NewsletterSignup } from "@launchapp/design-system";

export default function Page() {
  return (
    <NewsletterSignup
      title="Stay in the loop"
      subtitle="Get the latest articles delivered to your inbox, weekly."
      onSubmit={async (email) => {
        await subscribe(email);
      }}
    />
  );
}`,
      },
    },
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "card", "inline"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof NewsletterSignup>;

export const Default: Story = {
  render: () => (
    <NewsletterSignup
      title="Stay in the loop"
      subtitle="Get the latest articles on engineering and design delivered to your inbox."
      onSubmit={async (email) => {
        await new Promise((r) => setTimeout(r, 1000));
        console.log("Subscribed:", email);
      }}
    />
  ),
};

export const Card: Story = {
  render: () => (
    <NewsletterSignup
      variant="card"
      title="Weekly digest"
      subtitle="One email, every Friday. No spam."
      buttonLabel="Subscribe"
      onSubmit={async (email) => {
        await new Promise((r) => setTimeout(r, 1000));
        console.log("Subscribed:", email);
      }}
    />
  ),
};

export const Inline: Story = {
  render: () => (
    <div className="px-4 py-8 max-w-xl mx-auto">
      <NewsletterSignup
        variant="inline"
        title=""
        subtitle=""
        placeholder="your@email.com"
        buttonLabel="Join"
        onSubmit={async (email) => {
          await new Promise((r) => setTimeout(r, 800));
          console.log("Subscribed:", email);
        }}
      />
    </div>
  ),
};

export const SuccessState: Story = {
  render: () => {
    const [success, setSuccess] = React.useState(false);
    return (
      <NewsletterSignup
        title="Stay in the loop"
        subtitle="Weekly articles on engineering and design."
        successTitle="You're all set!"
        successMessage="Thanks for subscribing. See you in your inbox!"
        onSubmit={async () => {
          await new Promise((r) => setTimeout(r, 800));
          setSuccess(true);
        }}
      />
    );
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col divide-y divide-border">
      <NewsletterSignup
        title="Default variant"
        subtitle="Full-width section with background."
      />
      <NewsletterSignup
        variant="card"
        title="Card variant"
        subtitle="Contained in a card component."
      />
      <div className="px-4 py-8 max-w-xl mx-auto w-full">
        <NewsletterSignup
          variant="inline"
          title=""
          subtitle=""
          placeholder="your@email.com"
          buttonLabel="Join newsletter"
        />
      </div>
    </div>
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
    <NewsletterSignup
      title="Stay in the loop"
      subtitle="Weekly articles on engineering and design."
      onSubmit={async (email) => {
        await new Promise((r) => setTimeout(r, 800));
        console.log("Subscribed:", email);
      }}
    />
  ),
};

export const Mobile: Story = {
  parameters: { viewport: { defaultViewport: "mobile1" } },
  render: () => (
    <NewsletterSignup
      title="Stay in the loop"
      subtitle="Get the latest articles in your inbox."
    />
  ),
};
