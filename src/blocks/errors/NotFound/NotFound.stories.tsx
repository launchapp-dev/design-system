import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "../../../components/Button";
import { NotFound } from "./index";

const meta: Meta<typeof NotFound> = {
  title: "Blocks/Errors/NotFound",
  component: NotFound,
  parameters: {
    layout: "fullscreen",
    docs: {
      source: {
        code: `import { NotFound } from "@launchapp/design-system";
import { Button } from "@launchapp/design-system";

export default function NotFoundPage() {
  return (
    <NotFound
      title="Page not found"
      description="Sorry, we couldn't find the page you're looking for."
      homeAction={<Button asChild><a href="/">Go home</a></Button>}
    />
  );
}`,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof NotFound>;

export const Default: Story = {
  render: () => (
    <NotFound
      homeAction={<Button>Go home</Button>}
      backAction={<Button variant="outline">Go back</Button>}
    />
  ),
};

export const CustomMessage: Story = {
  render: () => (
    <NotFound
      title="This page doesn't exist"
      description="The URL you entered may be incorrect, or the page may have been moved or deleted."
      homeAction={<Button>Return home</Button>}
      backAction={<Button variant="ghost">← Back</Button>}
    />
  ),
};

export const WithoutActions: Story = {
  render: () => (
    <NotFound
      title="Nothing here"
      description="This page hasn't been created yet."
    />
  ),
};

export const CustomIllustration: Story = {
  render: () => (
    <NotFound
      illustration={
        <div
          className="text-8xl select-none"
          role="img"
          aria-label="Lost ghost"
        >
          👻
        </div>
      }
      title="Boo! Page not found"
      description="This page has vanished into thin air."
      homeAction={<Button>Escape ghost house</Button>}
    />
  ),
};

export const DarkMode: Story = {
  decorators: [
    (Story) => (
      <div className="dark bg-background min-h-screen">
        <Story />
      </div>
    ),
  ],
  render: () => (
    <NotFound
      homeAction={<Button>Go home</Button>}
      backAction={<Button variant="outline">Go back</Button>}
    />
  ),
};

export const Mobile: Story = {
  parameters: { viewport: { defaultViewport: "mobile1" } },
  render: () => (
    <NotFound
      homeAction={<Button>Go home</Button>}
      backAction={<Button variant="outline">Go back</Button>}
    />
  ),
};
