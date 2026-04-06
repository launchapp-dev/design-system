import type { Meta, StoryObj } from "@storybook/react";
import { WebhookManager, type WebhookEndpoint, type WebhookDelivery } from "./WebhookManager";

const meta: Meta<typeof WebhookManager> = {
  title: "Blocks/Admin/WebhookManager",
  component: WebhookManager,
};
export default meta;
type Story = StoryObj<typeof WebhookManager>;

const sampleEndpoints: WebhookEndpoint[] = [
  {
    id: "1",
    name: "Production",
    url: "https://api.example.com/webhooks/prod",
    eventTypes: ["user.created", "user.updated", "payment.succeeded"],
    active: true,
    createdAt: "2024-01-15",
  },
  {
    id: "2",
    name: "Analytics",
    url: "https://analytics.example.com/ingest",
    eventTypes: ["payment.succeeded", "subscription.cancelled"],
    active: true,
    createdAt: "2024-02-20",
  },
  {
    id: "3",
    name: "Legacy Integration",
    url: "https://old-api.example.com/hooks",
    eventTypes: ["user.created"],
    active: false,
    createdAt: "2023-11-05",
  },
];

const sampleDeliveries: WebhookDelivery[] = [
  {
    id: "d1",
    endpointId: "1",
    timestamp: "2024-04-05 14:32:11",
    status: "success",
    statusCode: 200,
    durationMs: 145,
    attempt: 1,
  },
  {
    id: "d2",
    endpointId: "1",
    timestamp: "2024-04-05 13:22:05",
    status: "failed",
    statusCode: 500,
    durationMs: 2000,
    attempt: 1,
    error: "Internal server error",
  },
  {
    id: "d3",
    endpointId: "1",
    timestamp: "2024-04-05 13:22:06",
    status: "success",
    statusCode: 200,
    durationMs: 130,
    attempt: 2,
  },
  { id: "d4", endpointId: "2", timestamp: "2024-04-05 12:00:00", status: "pending", attempt: 1 },
];

export const Default: Story = {
  args: {
    endpoints: sampleEndpoints,
    deliveries: sampleDeliveries,
    onCreateEndpoint: (data) => console.log("create endpoint", data),
    onDeleteEndpoint: (id) => console.log("delete", id),
    onToggleEndpoint: (id, active) => console.log("toggle", id, active),
  },
};

export const Empty: Story = {
  args: {
    endpoints: [],
    onCreateEndpoint: (data) => console.log("create endpoint", data),
    onDeleteEndpoint: (id) => console.log("delete", id),
  },
};

export const NoDeliveries: Story = {
  args: {
    endpoints: sampleEndpoints,
    deliveries: [],
    onCreateEndpoint: (data) => console.log("create endpoint", data),
    onDeleteEndpoint: (id) => console.log("delete", id),
  },
};
