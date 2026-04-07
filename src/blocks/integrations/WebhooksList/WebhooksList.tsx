import * as React from "react";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/Card";
import { Button } from "@/components/Button";
import { Badge } from "@/components/Badge";
import { Input } from "@/components/Input";
import { Switch } from "@/components/Switch";
import { Label } from "@/components/Label";
import { Progress } from "@/components/Progress";
import {
  DialogRoot as Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/Dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/DropdownMenu";

function PlusIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  );
}
function MoreHorizontalIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <circle cx="12" cy="12" r="1.5" /><circle cx="19" cy="12" r="1.5" /><circle cx="5" cy="12" r="1.5" />
    </svg>
  );
}
function WebhookIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M18 16.98h-5.99c-1.1 0-1.95.94-2.48 1.9A4 4 0 0 1 2 17c.01-.7.2-1.4.57-2" />
      <path d="m6 17 3.13-5.78c.53-.97.1-2.18-.5-3.1a4 4 0 1 1 6.89-4.06" />
      <path d="m12 6 3.13 5.73C15.66 12.7 16.9 13 18 13a4 4 0 0 1 0 8" />
    </svg>
  );
}
function BellIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.73 21a2 2 0 0 1-3.46 0" />
    </svg>
  );
}
function Trash2Icon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M3 6h18" /><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" /><line x1="10" y1="11" x2="10" y2="17" /><line x1="14" y1="11" x2="14" y2="17" />
    </svg>
  );
}
function PencilIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
    </svg>
  );
}
function CheckCircleIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  );
}
function XCircleIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <circle cx="12" cy="12" r="10" /><line x1="15" y1="9" x2="9" y2="15" /><line x1="9" y1="9" x2="15" y2="15" />
    </svg>
  );
}

export type WebhookStatus = "active" | "inactive" | "failing";

export interface WebhookItem {
  id: string;
  name: string;
  url: string;
  status: WebhookStatus;
  events: string[];
  createdAt: string;
  lastTriggeredAt?: string;
  successRate?: number;
  secret?: string;
}

export interface WebhooksListProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onToggle"> {
  webhooks: WebhookItem[];
  onAdd?: (data: { name: string; url: string; events: string[] }) => void;
  onEdit?: (webhook: WebhookItem) => void;
  onDelete?: (webhook: WebhookItem) => void;
  onToggle?: (webhook: WebhookItem) => void;
  onTest?: (webhook: WebhookItem) => void;
  onTestResult?: (webhook: WebhookItem, result: "success" | "failure") => void;
  canManage?: boolean;
  title?: string;
  description?: string;
}

const statusVariant: Record<WebhookStatus, "default" | "secondary" | "destructive"> = {
  active: "default",
  inactive: "secondary",
  failing: "destructive",
};

const statusLabel: Record<WebhookStatus, string> = {
  active: "Active",
  inactive: "Inactive",
  failing: "Failing",
};

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
}

function WebhooksList({
  webhooks,
  onAdd,
  onEdit,
  onDelete,
  onToggle,
  onTest,
  onTestResult,
  canManage = true,
  title = "Webhooks",
  description = "Manage webhook endpoints that receive event notifications.",
  className,
  ...props
}: WebhooksListProps) {
  const [showAddDialog, setShowAddDialog] = React.useState(false);
  const [editingWebhook, setEditingWebhook] = React.useState<WebhookItem | null>(null);
  const [testingId, setTestingId] = React.useState<string | null>(null);
  const [testResult, setTestResult] = React.useState<"success" | "failure" | null>(null);
  const [addForm, setAddForm] = React.useState({ name: "", url: "", events: "" });

  const [editForm, setEditForm] = React.useState({ name: "", url: "", events: "" });

  function openAddDialog() {
    setAddForm({ name: "", url: "", events: "" });
    setShowAddDialog(true);
  }

  function openEditDialog(webhook: WebhookItem) {
    setEditForm({ name: webhook.name, url: webhook.url, events: webhook.events.join(", ") });
    setEditingWebhook(webhook);
  }

  async function handleTest(webhook: WebhookItem) {
    setTestingId(webhook.id);
    setTestResult(null);
    await new Promise((r) => setTimeout(r, 1500));
    const result = Math.random() > 0.3 ? "success" : "failure";
    setTestResult(result);
    setTestingId(null);
    onTestResult?.(webhook, result);
  }

  function handleAdd() {
    onAdd?.({
      name: addForm.name,
      url: addForm.url,
      events: addForm.events.split(",").map((e) => e.trim()).filter(Boolean),
    });
    setShowAddDialog(false);
  }

  function handleEdit() {
    if (!editingWebhook) return;
    onEdit?.({
      ...editingWebhook,
      name: editForm.name,
      url: editForm.url,
      events: editForm.events.split(",").map((e) => e.trim()).filter(Boolean),
    });
    setEditingWebhook(null);
  }

  return (
    <div className={cn("space-y-4", className)} {...props}>
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-base font-semibold">{title}</h3>
          {description && <p className="text-sm text-muted-foreground">{description}</p>}
        </div>
        {onAdd && canManage && (
          <Button onClick={openAddDialog}>
            <PlusIcon className="mr-2 h-4 w-4" />
            Add webhook
          </Button>
        )}
      </div>

      <div className="space-y-3">
        {webhooks.length === 0 ? (
          <Card>
            <CardContent className="py-8 text-center text-sm text-muted-foreground">
              No webhooks configured yet.
            </CardContent>
          </Card>
        ) : (
          webhooks.map((webhook) => {
            const isTesting = testingId === webhook.id;
            return (
              <Card key={webhook.id} className={cn(webhook.status === "failing" && "border-destructive/50")}>
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-2 min-w-0">
                      <WebhookIcon className="h-5 w-5 text-muted-foreground shrink-0" />
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <CardTitle className="text-sm">{webhook.name}</CardTitle>
                          <Badge variant={statusVariant[webhook.status]} className="text-xs h-5">
                            {statusLabel[webhook.status]}
                          </Badge>
                          {testResult && testingId === null && (
                            <span className="text-xs text-muted-foreground">
                              Last test: {testResult === "success" ? "Success" : "Failed"}
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground truncate font-mono mt-0.5">{webhook.url}</p>
                      </div>
                    </div>
                    {canManage && (
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8 shrink-0">
                            <MoreHorizontalIcon className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => openEditDialog(webhook)}>
                            <PencilIcon className="mr-2 h-4 w-4" />
                            Edit webhook
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleTest(webhook)} disabled={isTesting}>
                            <BellIcon className="mr-2 h-4 w-4" />
                            {isTesting ? "Testing…" : "Send test event"}
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => onToggle?.(webhook)}>
                            {webhook.status === "active" ? "Deactivate" : "Activate"}
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            onClick={() => onDelete?.(webhook)}
                            className="text-destructive focus:text-destructive"
                          >
                            <Trash2Icon className="mr-2 h-4 w-4" />
                            Delete webhook
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex flex-wrap gap-1.5">
                    {webhook.events.map((event) => (
                      <Badge key={event} variant="outline" className="text-xs h-5">{event}</Badge>
                    ))}
                  </div>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span>Created {formatDate(webhook.createdAt)}</span>
                    {webhook.lastTriggeredAt && (
                      <span>Last triggered {formatDate(webhook.lastTriggeredAt)}</span>
                    )}
                    {webhook.successRate !== undefined && (
                      <div className="flex items-center gap-1.5">
                        <span>Success rate:</span>
                        <Progress
                          value={webhook.successRate}
                          className="w-16 h-2"
                          aria-label={`${webhook.successRate}% success rate`}
                        />
                        <span className="font-medium">{webhook.successRate}%</span>
                      </div>
                    )}
                    {isTesting && (
                      <div className="flex items-center gap-1.5 text-muted-foreground">
                        <span className="animate-pulse">Testing…</span>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })
        )}
      </div>

      {/* Add Dialog */}
      <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Webhook</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="wh-name">Name</Label>
              <Input id="wh-name" value={addForm.name} onChange={(e) => setAddForm((f) => ({ ...f, name: e.target.value }))} placeholder="Production webhook" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="wh-url">Endpoint URL</Label>
              <Input id="wh-url" type="url" value={addForm.url} onChange={(e) => setAddForm((f) => ({ ...f, url: e.target.value }))} placeholder="https://your-domain.com/webhooks" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="wh-events">Events (comma-separated)</Label>
              <Input id="wh-events" value={addForm.events} onChange={(e) => setAddForm((f) => ({ ...f, events: e.target.value }))} placeholder="user.created, payment.succeeded" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAddDialog(false)}>Cancel</Button>
            <Button onClick={handleAdd} disabled={!addForm.name || !addForm.url}>Create</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={!!editingWebhook} onOpenChange={(o: boolean) => !o && setEditingWebhook(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Webhook</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="wh-edit-name">Name</Label>
              <Input id="wh-edit-name" value={editForm.name} onChange={(e) => setEditForm((f) => ({ ...f, name: e.target.value }))} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="wh-edit-url">Endpoint URL</Label>
              <Input id="wh-edit-url" type="url" value={editForm.url} onChange={(e) => setEditForm((f) => ({ ...f, url: e.target.value }))} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="wh-edit-events">Events (comma-separated)</Label>
              <Input id="wh-edit-events" value={editForm.events} onChange={(e) => setEditForm((f) => ({ ...f, events: e.target.value }))} />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditingWebhook(null)}>Cancel</Button>
            <Button onClick={handleEdit}>Save changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

WebhooksList.displayName = "WebhooksList";

export { WebhooksList };
