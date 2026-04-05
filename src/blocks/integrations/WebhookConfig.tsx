import * as React from "react";
import { cn } from "../../lib/utils";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/Card";
import { Button } from "../../components/Button";
import { Badge } from "../../components/Badge";
import { Input } from "../../components/Input";
import { Switch } from "../../components/Switch";
import { Label } from "../../components/Label";
import { Separator } from "../../components/Separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/Select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../../components/Dialog";
import { Plus, Trash2, Webhook, Bell, AlertTriangle } from "lucide-react";

export interface WebhookEvent {
  id: string;
  name: string;
  description?: string;
  enabled: boolean;
}

export interface WebhookConfigProps extends React.HTMLAttributes<HTMLDivElement> {
  url?: string;
  secret?: string;
  events: WebhookEvent[];
  onUrlChange?: (url: string) => void;
  onToggleEvent?: (event: WebhookEvent) => void;
  onSave?: () => void;
  onTest?: () => void;
  onDisconnect?: () => void;
  onAddSecret?: () => void;
  isLoading?: boolean;
  title?: string;
}

function WebhookConfig({
  url,
  secret,
  events,
  onUrlChange,
  onToggleEvent,
  onSave,
  onTest,
  onDisconnect,
  isLoading,
  title = "Webhook Configuration",
  className,
  ...props
}: WebhookConfigProps) {
  const [urlInput, setUrlInput] = React.useState(url ?? "");
  const enabledCount = events.filter((e) => e.enabled).length;

  React.useEffect(() => {
    setUrlInput(url ?? "");
  }, [url]);

  return (
    <div className={cn("space-y-6", className)} {...props}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Webhook className="h-5 w-5 text-muted-foreground" />
          <h3 className="text-base font-semibold">{title}</h3>
        </div>
        {onDisconnect && (
          <Button variant="ghost" size="sm" onClick={onDisconnect}>
            Disconnect
          </Button>
        )}
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm">Endpoint</CardTitle>
          <CardDescription>
            Your endpoint URL must be accessible via HTTPS and respond with a 2xx status code.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="webhook-url">Webhook URL</Label>
            <Input
              id="webhook-url"
              type="url"
              placeholder="https://your-domain.com/webhooks/launchapp"
              value={urlInput}
              onChange={(e) => {
                setUrlInput(e.target.value);
                onUrlChange?.(e.target.value);
              }}
              disabled={isLoading}
            />
          </div>

          {secret ? (
            <div className="flex items-center gap-2 rounded-lg border p-3">
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium">Signing secret</p>
                <p className="text-xs text-muted-foreground truncate font-mono">{secret}</p>
              </div>
              <Button variant="outline" size="sm" onClick={onAddSecret}>
                Regenerate
              </Button>
            </div>
          ) : (
            <Button variant="outline" size="sm" onClick={onAddSecret}>
              Generate signing secret
            </Button>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-sm">Events</CardTitle>
              <CardDescription>
                Choose which events trigger your webhook. {enabledCount} enabled.
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          {events.map((event) => (
            <div key={event.id} className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor={event.id} className="text-sm cursor-pointer">
                  {event.name}
                </Label>
                {event.description && (
                  <p className="text-xs text-muted-foreground">{event.description}</p>
                )}
              </div>
              <Switch
                id={event.id}
                checked={event.enabled}
                onCheckedChange={() => onToggleEvent?.(event)}
                disabled={isLoading}
              />
            </div>
          ))}
        </CardContent>
      </Card>

      <div className="flex gap-2">
        {onSave && (
          <Button onClick={onSave} disabled={isLoading || !urlInput}>
            {isLoading ? "Saving…" : "Save changes"}
          </Button>
        )}
        {onTest && (
          <Button variant="outline" onClick={onTest} disabled={isLoading || !urlInput}>
            <Bell className="mr-2 h-4 w-4" />
            Send test event
          </Button>
        )}
      </div>
    </div>
  );
}

WebhookConfig.displayName = "WebhookConfig";

export { WebhookConfig };
export type { WebhookConfigProps, WebhookEvent };
