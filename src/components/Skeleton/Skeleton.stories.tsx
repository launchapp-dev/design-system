import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import { Skeleton } from "./index";

const meta: Meta = {
  title: "Components/Skeleton",
};

export default meta;
type Story = StoryObj<typeof meta>;

export const CardSkeleton: Story = {
  render: () => (
    <div className="flex flex-col space-y-3" style={{ width: 300 }}>
      <Skeleton className="h-40 w-full rounded-lg" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-4/5" />
      </div>
      <div className="flex items-center space-x-3">
        <Skeleton className="h-10 w-10 rounded-full" />
        <div className="flex-1 space-y-2">
          <Skeleton className="h-3 w-3/4" />
          <Skeleton className="h-3 w-1/2" />
        </div>
      </div>
    </div>
  ),
};

export const ListSkeleton: Story = {
  render: () => (
    <div className="flex flex-col space-y-4" style={{ width: 400 }}>
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="flex items-center space-x-4">
          <Skeleton className="h-12 w-12 rounded-full" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-3 w-1/2" />
          </div>
        </div>
      ))}
    </div>
  ),
};

export const TextSkeleton: Story = {
  render: () => (
    <div className="space-y-2" style={{ width: 400 }}>
      <Skeleton className="h-5 w-2/3" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-4/5" />
    </div>
  ),
};
