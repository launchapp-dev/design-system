import * as React from "react";
import { cn } from "../../lib/utils";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/Card";
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import { Switch } from "../../components/Switch";
import { Label } from "../../components/Label";

// ── Icons (inline SVG to avoid lucide-react dep in block layer) ──────────────
function WebhookIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M18 16.98h-5.99c-1.1 0-1.95.94-2.48 1.9A4 4 0 0 1 2 17c.01-.7.2-1.4.57-2" />
      <path d="m6 17 3.13-5.78c.53-.97.1-2.18-.5-3.1a4 4 0 1 1 6.89-4.06" />
      <path d="m12 6 3.13 5.73C15.66 12.7 16.9 13 18 13a4 4 0 0 1 0 8" />
    </svg>
  );
}
function BellIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
      <path d="M13.73 21a2 2 0 0 1-3.46 0" />
    </svg>
  );
}

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
  onAddSecret,
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
          <WebhookIcon className="h-5 w-5 text-muted-foreground" />
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
            <BellIcon className="mr-2 h-4 w-4" />
            Send test event
          </Button>
        )}
      </div>
    </div>
  );
}

WebhookConfig.displayName = "WebhookConfig";

export { WebhookConfig };
