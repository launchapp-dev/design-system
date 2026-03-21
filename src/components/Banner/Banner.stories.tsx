import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import { Banner } from "./index";

const meta: Meta<typeof Banner> = {
  title: "Components/Banner",
  component: Banner,
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;
type Story = StoryObj<typeof Banner>;

export const Default: Story = {
  render: () => (
    <div className="p-8">
      <Banner
        title="Welcome to our platform"
        description="Get started by completing your profile setup."
      />
    </div>
  ),
};

export const Info: Story = {
  render: () => (
    <div className="p-8">
      <Banner
        variant="info"
        title="Scheduled maintenance"
        description="System maintenance is planned for this Sunday from 2:00 AM to 4:00 AM UTC."
      />
    </div>
  ),
};

export const Warning: Story = {
  render: () => (
    <div className="p-8">
      <Banner
        variant="warning"
        title="Your storage is almost full"
        description="You have used 95% of your storage. Upgrade your plan to get more space."
        action="Upgrade"
        actionOnClick={() => {}}
      />
    </div>
  ),
};

export const Error: Story = {
  render: () => (
    <div className="p-8">
      <Banner
        variant="error"
        title="Connection failed"
        description="Unable to connect to the server. Please check your internet connection."
        action="Retry"
        actionOnClick={() => {}}
      />
    </div>
  ),
};

export const Success: Story = {
  render: () => (
    <div className="p-8">
      <Banner
        variant="success"
        title="Payment successful"
        description="Your subscription has been renewed for another year."
        action="View invoice"
        actionOnClick={() => {}}
      />
    </div>
  ),
};

export const Dismissible: Story = {
  render: () => {
    const [visible, setVisible] = React.useState(true);
    return (
      <div className="p-8">
        {visible && (
          <Banner
            title="Cookie notice"
            description="We use cookies to improve your experience."
            dismissible
            onDismiss={() => setVisible(false)}
          />
        )}
        {!visible && (
          <div className="text-center text-muted-foreground">
            Banner dismissed. <button onClick={() => setVisible(true)} className="underline">Show again</button>
          </div>
        )}
      </div>
    );
  },
};

export const WithActions: Story = {
  render: () => (
    <div className="p-8">
      <Banner
        variant="info"
        title="New features available"
        description="Check out our latest updates including dark mode and improved performance."
        action="What's new"
        actionOnClick={() => {}}
        secondaryAction="Dismiss"
        secondaryActionOnClick={() => {}}
      />
    </div>
  ),
};

export const Sticky: Story = {
  render: () => (
    <div className="min-h-screen">
      <Banner
        variant="info"
        sticky
        title="Important update"
        description="We're rolling out a new design. Check out the preview mode."
        action="Try it now"
        actionOnClick={() => {}}
      />
      <div className="p-8">
        <p className="text-muted-foreground">
          This banner sticks to the top of the viewport. Scroll down to see it stay in place.
        </p>
        <div className="mt-96 h-64 border border-dashed border-border" />
      </div>
    </div>
  ),
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-4 p-8">
      <Banner
        title="Default banner"
        description="A neutral informational message."
      />
      <Banner
        variant="info"
        title="Info banner"
        description="An informational message with blue styling."
      />
      <Banner
        variant="warning"
        title="Warning banner"
        description="A warning message with amber styling."
      />
      <Banner
        variant="error"
        title="Error banner"
        description="An error message with red styling."
      />
      <Banner
        variant="success"
        title="Success banner"
        description="A success message with green styling."
      />
    </div>
  ),
};

export const DarkMode: Story = {
  decorators: [
    (Story) => (
      <div className="dark" style={{ background: "hsl(240 10% 3.9%)", minHeight: "100vh" }}>
        <Story />
      </div>
    ),
  ],
  render: () => (
    <div className="flex flex-col gap-4 p-8">
      <Banner
        title="Default banner"
        description="A neutral informational message."
      />
      <Banner
        variant="info"
        title="Info banner"
        description="An informational message with blue styling."
      />
      <Banner
        variant="warning"
        title="Warning banner"
        description="A warning message with amber styling."
      />
      <Banner
        variant="error"
        title="Error banner"
        description="An error message with red styling."
      />
      <Banner
        variant="success"
        title="Success banner"
        description="A success message with green styling."
      />
    </div>
  ),
};
