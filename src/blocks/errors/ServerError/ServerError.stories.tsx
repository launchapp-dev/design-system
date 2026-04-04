import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "../../../components/Button";
import { ServerError } from "./index";

const meta: Meta<typeof ServerError> = {
  title: "Blocks/Errors/ServerError",
  component: ServerError,
  parameters: {
    layout: "fullscreen",
    docs: {
      source: {
        code: `import { ServerError } from "@launchapp/design-system";
import { Button } from "@launchapp/design-system";

export default function ErrorPage() {
  return (
    <ServerError
      retryAction={<Button onClick={() => window.location.reload()}>Try again</Button>}
      homeAction={<Button variant="outline" asChild><a href="/">Go home</a></Button>}
    />
  );
}`,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof ServerError>;

export const Default: Story = {
  render: () => (
    <ServerError
      retryAction={<Button>Try again</Button>}
      homeAction={<Button variant="outline">Go home</Button>}
    />
  ),
};

export const WithErrorDetails: Story = {
  render: () => (
    <ServerError
      errorCode="INTERNAL_SERVER_ERROR"
      errorDetails="Request ID: req_8f2a9b3c · 2026-03-19T14:32:01Z"
      retryAction={<Button>Retry</Button>}
      homeAction={<Button variant="outline">Go home</Button>}
    />
  ),
};

export const CustomMessage: Story = {
  render: () => (
    <ServerError
      title="Service temporarily unavailable"
      description="Our team has been notified and is working on a fix. Please try again in a few minutes."
      retryAction={<Button>Try again</Button>}
    />
  ),
};

export const WithoutActions: Story = {
  render: () => (
    <ServerError
      title="An error occurred"
      description="Please refresh the page to try again."
      errorCode="500"
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
    <ServerError
      errorCode="INTERNAL_SERVER_ERROR"
      errorDetails="Request ID: req_8f2a9b3c · 2026-03-19T14:32:01Z"
      retryAction={<Button>Try again</Button>}
      homeAction={<Button variant="outline">Go home</Button>}
    />
  ),
};

export const Mobile: Story = {
  parameters: { viewport: { defaultViewport: "mobile1" } },
  render: () => (
    <ServerError
      retryAction={<Button>Try again</Button>}
      homeAction={<Button variant="outline">Go home</Button>}
    />
  ),
};
