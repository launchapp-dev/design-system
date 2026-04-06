import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { Label } from "@/components/Label";
import { Badge } from "@/components/Badge";
import { ScrollArea } from "@/components/ScrollArea";
import {
  DialogRoot,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/Dialog";

export type WebhookDeliveryStatus = "pending" | "success" | "failed";

export interface WebhookEndpoint {
  id: string;
  name: string;
  url: string;
  eventTypes: string[];
  active: boolean;
  secret?: string;
  createdAt: string;
}

export interface WebhookDelivery {
  id: string;
  endpointId: string;
  timestamp: string;
  status: WebhookDeliveryStatus;
  statusCode?: number;
  attempt: number;
  durationMs?: number;
  responseBody?: string;
  error?: string;
}

export interface CreateWebhookFormData {
  name: string;
  url: string;
  eventTypes: string[];
}

export interface WebhookManagerProps extends React.HTMLAttributes<HTMLDivElement> {
  endpoints: WebhookEndpoint[];
  deliveries?: WebhookDelivery[];
  onCreateEndpoint?: (data: CreateWebhookFormData) => void;
  onDeleteEndpoint?: (endpointId: string) => void;
  onToggleEndpoint?: (endpointId: string, active: boolean) => void;
  onDeliveriesExpanded?: (endpointId: string) => void;
  availableEventTypes?: string[];
  creating?: boolean;
}

function WebhookManagerInner(
  {
    endpoints,
    deliveries = [],
    onCreateEndpoint,
    onDeleteEndpoint,
    onToggleEndpoint,
    onDeliveriesExpanded: _onDeliveriesExpanded,
    availableEventTypes = ["user.created", "user.updated", "user.deleted", "payment.succeeded", "payment.failed", "subscription.created", "subscription.cancelled"],
    creating: _creating = false,
    className,
  }: WebhookManagerProps,
  ref: React.ForwardedRef<HTMLDivElement>
) {
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [name, setName] = React.useState("");
  const [url, setUrl] = React.useState("");
  const [selectedEvents, setSelectedEvents] = React.useState<string[]>([]);
  const [expandedEndpoint, setExpandedEndpoint] = React.useState<string | null>(null);

  const toggleEvent = (event: string) => {
    setSelectedEvents((prev) =>
      prev.includes(event) ? prev.filter((e) => e !== event) : [...prev, event]
    );
  };

  const handleCreate = () => {
    if (!name.trim() || !url.trim()) return;
    onCreateEndpoint?.({ name: name.trim(), url: url.trim(), eventTypes: selectedEvents });
    setDialogOpen(false);
    setName("");
    setUrl("");
    setSelectedEvents([]);
  };

  const endpointDeliveries = (endpointId: string) =>
    deliveries.filter((d) => d.endpointId === endpointId);

  const deliveryStatusVariant = (status: WebhookDeliveryStatus): "default" | "destructive" | "secondary" => {
    if (status === "success") return "default";
    if (status === "failed") return "destructive";
    return "secondary";
  };

  return (
    <div ref={ref} className={cn("space-y-4", className)}>
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold tracking-tight">Webhooks</h2>
          <p className="text-sm text-[hsl(var(--la-muted-foreground))]">
            {endpoints.filter((e) => e.active).length} active endpoint{endpoints.filter((e) => e.active).length !== 1 ? "s" : ""}
          </p>
        </div>
        {onCreateEndpoint && (
          <Button onClick={() => setDialogOpen(true)} size="sm">
            Add Endpoint
          </Button>
        )}
      </div>

      {endpoints.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-[hsl(var(--la-border))] py-12 text-center">
          <p className="text-sm text-[hsl(var(--la-muted-foreground))]">No webhook endpoints configured.</p>
          {onCreateEndpoint && (
            <Button variant="outline" size="sm" className="mt-3" onClick={() => setDialogOpen(true)}>
              Add your first endpoint
            </Button>
          )}
        </div>
      ) : (
        <div className="space-y-3">
          {endpoints.map((endpoint) => {
            const isExpanded = expandedEndpoint === endpoint.id;
            const relatedDeliveries = endpointDeliveries(endpoint.id);
            return (
              <div key={endpoint.id} className="rounded-lg border border-[hsl(var(--la-border))]">
                <div className="flex flex-col gap-3 p-4 sm:flex-row sm:items-start">
                  <div className="min-w-0 flex-1 space-y-2">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-medium text-sm">{endpoint.name}</span>
                      <Badge variant={endpoint.active ? "default" : "secondary"}>
                        {endpoint.active ? "Active" : "Inactive"}
                      </Badge>
                    </div>
                    <p className="font-mono text-xs text-[hsl(var(--la-muted-foreground))] break-all">{endpoint.url}</p>
                    <div className="flex flex-wrap gap-1">
                      {endpoint.eventTypes.map((et) => (
                        <Badge key={et} variant="outline" className="text-[10px]">{et}</Badge>
                      ))}
                    </div>
                    <p className="text-xs text-[hsl(var(--la-muted-foreground))]">
                      Created: {endpoint.createdAt}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    {onToggleEndpoint && (
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-8 text-xs"
                        onClick={() => onToggleEndpoint(endpoint.id, !endpoint.active)}
                      >
                        {endpoint.active ? "Disable" : "Enable"}
                      </Button>
                    )}
                    <Button
                      variant="destructive"
                      size="sm"
                      className="h-8 text-xs"
                      onClick={() => onDeleteEndpoint?.(endpoint.id)}
                    >
                      Delete
                    </Button>
                  </div>
                </div>

                {relatedDeliveries.length > 0 && (
                  <div className="border-t border-[hsl(var(--la-border))]">
                    <button
                      className="w-full px-4 py-2 text-left text-xs text-[hsl(var(--la-muted-foreground))] hover:bg-[hsl(var(--la-muted))] transition-colors"
                      onClick={() => setExpandedEndpoint(isExpanded ? null : endpoint.id)}
                    >
                      {relatedDeliveries.length} delivery log{relatedDeliveries.length !== 1 ? "s" : ""} {isExpanded ? "▲" : "▼"}
                    </button>
                    {isExpanded && (
                      <ScrollArea className="h-48">
                        <div className="divide-y divide-[hsl(var(--la-border))]">
                          {relatedDeliveries.map((d) => (
                            <div key={d.id} className="flex items-start gap-3 px-4 py-2">
                              <Badge variant={deliveryStatusVariant(d.status)} className="shrink-0 mt-0.5 text-[10px]">
                                {d.status}
                              </Badge>
                              <div className="min-w-0 flex-1 space-y-0.5">
                                <div className="flex flex-wrap gap-2 text-xs text-[hsl(var(--la-muted-foreground))]">
                                  <span>{d.timestamp}</span>
                                  {d.statusCode && <span>HTTP {d.statusCode}</span>}
                                  {d.durationMs !== undefined && <span>{d.durationMs}ms</span>}
                                  <span>Attempt {d.attempt}</span>
                                </div>
                                {d.error && (
                                  <p className="text-xs text-destructive">{d.error}</p>
                                )}
                                {d.responseBody && (
                                  <p className="text-xs font-mono text-[hsl(var(--la-muted-foreground))] truncate">
                                    {d.responseBody}
                                  </p>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </ScrollArea>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      <DialogRoot open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Webhook Endpoint</DialogTitle>
            <DialogDescription>
              Configure a URL to receive webhook events.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div>
              <Label htmlFor="wh-name">Name</Label>
              <Input id="wh-name" value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Production Webhook" className="mt-1" />
            </div>
            <div>
              <Label htmlFor="wh-url">Endpoint URL</Label>
              <Input id="wh-url" type="url" value={url} onChange={(e) => setUrl(e.target.value)} placeholder="https://example.com/webhooks" className="mt-1" />
            </div>
            <div>
              <Label>Event Types</Label>
              <div className="mt-2 flex flex-col gap-2">
                {availableEventTypes.map((event) => (
                  <Label key={event} className="flex cursor-pointer items-center gap-2 text-sm font-normal">
                    <input
                      type="checkbox"
                      checked={selectedEvents.includes(event)}
                      onChange={() => toggleEvent(event)}
                      className="rounded border-[hsl(var(--la-border))]"
                    />
                    {event}
                  </Label>
                ))}
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleCreate}
              disabled={!name.trim() || !url.trim() || _creating}
            >
              Add Endpoint
            </Button>
          </DialogFooter>
        </DialogContent>
      </DialogRoot>
    </div>
  );
}

export const WebhookManager = React.forwardRef(WebhookManagerInner) as (
  props: WebhookManagerProps & { ref?: React.ForwardedRef<HTMLDivElement> }
) => React.ReactElement;

(WebhookManager as React.ForwardRefExoticComponent<WebhookManagerProps>).displayName = "WebhookManager";
