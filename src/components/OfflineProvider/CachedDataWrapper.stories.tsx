import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import { CachedDataWrapper } from "./CachedDataWrapper";
import { OfflineProvider } from "./OfflineProvider";
import { Button } from "../Button";

const meta: Meta = {
  title: "Components/Offline/CachedDataWrapper",
  parameters: {
    layout: "padded",
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  decorators: [
    (Story) => (
      <OfflineProvider>
        <Story />
      </OfflineProvider>
    ),
  ],
  render: () => (
    <div className="space-y-4">
      <h3 className="text-sm font-medium">Fresh Data (Not Stale)</h3>
      <CachedDataWrapper cachedAt={Date.now()}>
        <div className="p-4 border rounded-lg">
          <p className="font-medium">Content loaded at {new Date().toLocaleTimeString()}</p>
          <p className="text-sm text-muted-foreground">
            This data is fresh and up to date.
          </p>
        </div>
      </CachedDataWrapper>
    </div>
  ),
};

export const StaleData: Story = {
  decorators: [
    (Story) => (
      <OfflineProvider>
        <Story />
      </OfflineProvider>
    ),
  ],
  render: () => {
    const oldTimestamp = Date.now() - 10 * 60 * 1000;

    return (
      <div className="space-y-4">
        <h3 className="text-sm font-medium">Stale Data (Older than threshold)</h3>
        <CachedDataWrapper
          cachedAt={oldTimestamp}
          staleThreshold={5 * 60 * 1000}
        >
          <div className="p-4 border rounded-lg">
            <p className="font-medium">Content loaded at {new Date(oldTimestamp).toLocaleTimeString()}</p>
            <p className="text-sm text-muted-foreground">
              This data is stale and should be refreshed.
            </p>
          </div>
        </CachedDataWrapper>
      </div>
    );
  },
};

export const WithLoadingState: Story = {
  decorators: [
    (Story) => (
      <OfflineProvider>
        <Story />
      </OfflineProvider>
    ),
  ],
  render: () => (
    <div className="space-y-4">
      <h3 className="text-sm font-medium">Loading State (No indicator)</h3>
      <CachedDataWrapper cachedAt={Date.now()} isLoading={true}>
        <div className="p-4 border rounded-lg">
          <p className="font-medium">Loading fresh content...</p>
          <p className="text-sm text-muted-foreground">
            The stale indicator won&apos;t show during loading.
          </p>
        </div>
      </CachedDataWrapper>
    </div>
  ),
};

export const CustomIndicatorLabel: Story = {
  decorators: [
    (Story) => (
      <OfflineProvider>
        <Story />
      </OfflineProvider>
    ),
  ],
  render: () => {
    const oldTimestamp = Date.now() - 60 * 60 * 1000;

    return (
      <div className="space-y-4">
        <h3 className="text-sm font-medium">Custom Indicator Label</h3>
        <CachedDataWrapper
          cachedAt={oldTimestamp}
          indicatorLabel="Data may be outdated - refresh for latest"
        >
          <div className="p-4 border rounded-lg">
            <p className="font-medium">Custom stale indicator message</p>
            <p className="text-sm text-muted-foreground">
              You can provide custom labels for the stale indicator.
            </p>
          </div>
        </CachedDataWrapper>
      </div>
    );
  },
};

export const NoIndicator: Story = {
  decorators: [
    (Story) => (
      <OfflineProvider>
        <Story />
      </OfflineProvider>
    ),
  ],
  render: () => {
    const oldTimestamp = Date.now() - 60 * 60 * 1000;

    return (
      <div className="space-y-4">
        <h3 className="text-sm font-medium">No Indicator</h3>
        <CachedDataWrapper cachedAt={oldTimestamp} showIndicator={false}>
          <div className="p-4 border rounded-lg">
            <p className="font-medium">No stale indicator shown</p>
            <p className="text-sm text-muted-foreground">
              The indicator can be hidden by setting showIndicator to false.
            </p>
          </div>
        </CachedDataWrapper>
      </div>
    );
  },
};

export const ForceStale: Story = {
  decorators: [
    (Story) => (
      <OfflineProvider>
        <Story />
      </OfflineProvider>
    ),
  ],
  render: () => (
    <div className="space-y-4">
      <h3 className="text-sm font-medium">Forced Stale State</h3>
      <CachedDataWrapper stale={true}>
        <div className="p-4 border rounded-lg">
          <p className="font-medium">Forced stale state</p>
          <p className="text-sm text-muted-foreground">
            You can force the stale state regardless of timestamp.
          </p>
        </div>
      </CachedDataWrapper>
    </div>
  ),
};

export const InteractiveExample: Story = {
  decorators: [
    (Story) => (
      <OfflineProvider>
        <Story />
      </OfflineProvider>
    ),
  ],
  render: () => {
    const [cachedAt, setCachedAt] = React.useState<number | null>(Date.now());
    const [isLoading, setIsLoading] = React.useState(false);

    const handleRefresh = () => {
      setIsLoading(true);
      setTimeout(() => {
        setCachedAt(Date.now());
        setIsLoading(false);
      }, 1000);
    };

    const handleMakeStale = () => {
      setCachedAt(Date.now() - 10 * 60 * 1000);
    };

    return (
      <div className="space-y-4">
        <h3 className="text-sm font-medium">Interactive Demo</h3>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={handleRefresh} disabled={isLoading}>
            Refresh Data
          </Button>
          <Button variant="outline" size="sm" onClick={handleMakeStale}>
            Make Data Stale
          </Button>
        </div>
        <CachedDataWrapper cachedAt={cachedAt} isLoading={isLoading}>
          <div className="p-4 border rounded-lg">
            <p className="font-medium">
              Data timestamp:{" "}
              {cachedAt ? new Date(cachedAt).toLocaleTimeString() : "None"}
            </p>
            <p className="text-sm text-muted-foreground">
              {isLoading
                ? "Loading..."
                : cachedAt && Date.now() - cachedAt > 5 * 60 * 1000
                  ? "This data is stale."
                  : "This data is fresh."}
            </p>
          </div>
        </CachedDataWrapper>
      </div>
    );
  },
};
