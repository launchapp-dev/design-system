import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import { OfflineProvider, useOffline, OfflineIndicator } from "./index";
import { Button } from "../Button";

const meta: Meta = {
  title: "Components/Offline",
  parameters: {
    layout: "padded",
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const OfflineProviderDemo: Story = {
  render: () => {
    function StatusDisplay() {
      const { isOffline, wasOffline, lastOfflineAt, lastOnlineAt } = useOffline();

      return (
        <div className="space-y-4 p-4 border rounded-lg">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span
                className={`h-3 w-3 rounded-full ${
                  isOffline ? "bg-red-500" : "bg-green-500"
                }`}
              />
              <span className="font-medium">
                {isOffline ? "Offline" : "Online"}
              </span>
            </div>
            <p className="text-sm text-muted-foreground">
              {wasOffline
                ? "You have been offline at least once during this session."
                : "You have not been offline during this session."}
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-muted-foreground">Last offline:</p>
              <p className="font-mono">
                {lastOfflineAt
                  ? new Date(lastOfflineAt).toLocaleTimeString()
                  : "Never"}
              </p>
            </div>
            <div>
              <p className="text-muted-foreground">Last online:</p>
              <p className="font-mono">
                {lastOnlineAt
                  ? new Date(lastOnlineAt).toLocaleTimeString()
                  : "N/A"}
              </p>
            </div>
          </div>
        </div>
      );
    }

    return (
      <OfflineProvider>
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Toggle your browser&apos;s network connection or airplane mode to see
            the state change.
          </p>
          <StatusDisplay />
        </div>
      </OfflineProvider>
    );
  },
};

export const OfflineIndicatorBottom: Story = {
  decorators: [
    (Story) => (
      <OfflineProvider>
        <div className="min-h-[200px]">
          <Story />
        </div>
      </OfflineProvider>
    ),
  ],
  render: () => (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">
        Enable airplane mode or disconnect from the network to see the offline
        indicator.
      </p>
      <OfflineIndicator position="bottom" />
    </div>
  ),
};

export const OfflineIndicatorTop: Story = {
  decorators: [
    (Story) => (
      <OfflineProvider>
        <div className="min-h-[200px]">
          <Story />
        </div>
      </OfflineProvider>
    ),
  ],
  render: () => (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">
        The indicator can also appear at the top of the viewport.
      </p>
      <OfflineIndicator position="top" />
    </div>
  ),
};

export const OfflineIndicatorVariants: Story = {
  decorators: [
    (Story) => (
      <OfflineProvider>
        <div className="space-y-8">
          <Story />
        </div>
      </OfflineProvider>
    ),
  ],
  render: () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-sm font-medium mb-2">Default Variant</h3>
        <OfflineIndicator variant="default" />
      </div>
      <div>
        <h3 className="text-sm font-medium mb-2">Warning Variant</h3>
        <OfflineIndicator variant="warning" />
      </div>
      <div>
        <h3 className="text-sm font-medium mb-2">Destructive Variant</h3>
        <OfflineIndicator variant="destructive" />
      </div>
      <p className="text-sm text-muted-foreground">
        Note: Indicators are only visible when offline. Enable airplane mode to
        test.
      </p>
    </div>
  ),
};

export const NonDismissibleIndicator: Story = {
  decorators: [
    (Story) => (
      <OfflineProvider>
        <div className="min-h-[200px]">
          <Story />
        </div>
      </OfflineProvider>
    ),
  ],
  render: () => (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">
        This indicator cannot be dismissed.
      </p>
      <OfflineIndicator dismissible={false} />
    </div>
  ),
};

export const CustomLabel: Story = {
  decorators: [
    (Story) => (
      <OfflineProvider>
        <div className="min-h-[200px]">
          <Story />
        </div>
      </OfflineProvider>
    ),
  ],
  render: () => (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">
        Custom labels can be provided for the indicator.
      </p>
      <OfflineIndicator label="No internet connection - changes will sync when back online" />
    </div>
  ),
};

export const WithOfflineAction: Story = {
  decorators: [
    (Story) => (
      <OfflineProvider>
        <div className="min-h-[200px]">
          <Story />
        </div>
      </OfflineProvider>
    ),
  ],
  render: () => {
    function OfflineContent() {
      const { isOffline } = useOffline();

      return (
        <div className="space-y-4">
          <div className="p-4 border rounded-lg">
            {isOffline ? (
              <div className="space-y-2">
                <p className="font-medium">You&apos;re offline</p>
                <p className="text-sm text-muted-foreground">
                  Your changes will be saved locally and synced when you&apos;re
                  back online.
                </p>
                <Button variant="outline" disabled>
                  Submit (disabled offline)
                </Button>
              </div>
            ) : (
              <div className="space-y-2">
                <p className="font-medium">You&apos;re online</p>
                <p className="text-sm text-muted-foreground">
                  All changes will be submitted immediately.
                </p>
                <Button variant="default">Submit</Button>
              </div>
            )}
          </div>
          <OfflineIndicator />
        </div>
      );
    }

    return <OfflineContent />;
  },
};
