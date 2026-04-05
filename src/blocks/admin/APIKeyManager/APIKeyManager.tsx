import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { Label } from "@/components/Label";
import { Badge } from "@/components/Badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/Dialog";

export interface APIKey {
  id: string;
  name: string;
  key: string;
  createdAt: string;
  lastUsedAt?: string;
  expiresAt?: string;
  permissions?: string[];
  active: boolean;
}

export interface CreateAPIKeyFormData {
  name: string;
  permissions: string[];
  expiresInDays?: number;
}

export interface APIKeyManagerProps extends React.HTMLAttributes<HTMLDivElement> {
  keys: APIKey[];
  onCreateKey?: (data: CreateAPIKeyFormData) => void;
  onRevokeKey?: (keyId: string) => void;
  onCopyKey?: (key: string) => void;
  availablePermissions?: string[];
  creating?: boolean;
}

function APIKeyManagerInner(
  {
    keys,
    onCreateKey,
    onRevokeKey,
    onCopyKey,
    availablePermissions = ["read", "write", "admin"],
    creating = false,
    className,
  }: APIKeyManagerProps,
  ref: React.ForwardedRef<HTMLDivElement>
) {
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [name, setName] = React.useState("");
  const [selectedPerms, setSelectedPerms] = React.useState<string[]>(["read"]);
  const [copiedId, setCopiedId] = React.useState<string | null>(null);

  const togglePerm = (perm: string) => {
    setSelectedPerms((prev) =>
      prev.includes(perm) ? prev.filter((p) => p !== perm) : [...prev, perm]
    );
  };

  const handleCreate = () => {
    if (!name.trim()) return;
    onCreateKey?.({ name: name.trim(), permissions: selectedPerms });
    setDialogOpen(false);
    setName("");
    setSelectedPerms(["read"]);
  };

  const handleCopy = (key: APIKey) => {
    navigator.clipboard.writeText(key.key).then(() => {
      setCopiedId(key.id);
      onCopyKey?.(key.key);
      setTimeout(() => setCopiedId(null), 2000);
    });
  };

  const maskedKey = (key: string) => {
    if (key.length <= 8) return "*".repeat(key.length);
    return key.slice(0, 4) + "*".repeat(Math.min(key.length - 8, 20)) + key.slice(-4);
  };

  return (
    <div ref={ref} className={cn("space-y-4", className)}>
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold tracking-tight">API Keys</h2>
          <p className="text-sm text-[hsl(var(--la-muted-foreground))]">
            {keys.length} key{keys.length !== 1 ? "s" : ""}
          </p>
        </div>
        {onCreateKey && (
          <Button onClick={() => setDialogOpen(true)} size="sm">
            Create Key
          </Button>
        )}
      </div>

      {keys.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-[hsl(var(--la-border))] py-12 text-center">
          <p className="text-sm text-[hsl(var(--la-muted-foreground))]">No API keys yet.</p>
          {onCreateKey && (
            <Button variant="outline" size="sm" className="mt-3" onClick={() => setDialogOpen(true)}>
              Create your first key
            </Button>
          )}
        </div>
      ) : (
        <div className="space-y-3">
          {keys.map((key) => (
            <div
              key={key.id}
              className="flex flex-col gap-2 rounded-lg border border-[hsl(var(--la-border))] p-4 sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="min-w-0 space-y-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-medium text-sm">{key.name}</span>
                  <Badge variant={key.active ? "default" : "secondary"}>
                    {key.active ? "Active" : "Revoked"}
                  </Badge>
                </div>
                <p className="font-mono text-xs text-[hsl(var(--la-muted-foreground))] break-all">
                  {maskedKey(key.key)}
                </p>
                <div className="flex flex-wrap gap-2 text-xs text-[hsl(var(--la-muted-foreground))]">
                  <span>Created: {key.createdAt}</span>
                  {key.lastUsedAt && <span>Last used: {key.lastUsedAt}</span>}
                  {key.expiresAt && <span>Expires: {key.expiresAt}</span>}
                </div>
                {key.permissions && key.permissions.length > 0 && (
                  <div className="flex flex-wrap gap-1 pt-1">
                    {key.permissions.map((p) => (
                      <Badge key={p} variant="outline" className="text-[10px]">{p}</Badge>
                    ))}
                  </div>
                )}
              </div>
              {key.active && (
                <div className="flex items-center gap-2 shrink-0">
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-8 text-xs"
                    onClick={() => handleCopy(key)}
                  >
                    {copiedId === key.id ? "Copied!" : "Copy"}
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    className="h-8 text-xs"
                    onClick={() => onRevokeKey?.(key.id)}
                  >
                    Revoke
                  </Button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create API Key</DialogTitle>
            <DialogDescription>
              Give your key a name and select permissions.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div>
              <Label htmlFor="key-name">Name</Label>
              <Input
                id="key-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Production API Key"
                className="mt-1"
              />
            </div>
            <div>
              <Label>Permissions</Label>
              <div className="mt-2 flex flex-wrap gap-2">
                {availablePermissions.map((perm) => (
                  <Badge
                    key={perm}
                    variant={selectedPerms.includes(perm) ? "default" : "outline"}
                    className="cursor-pointer capitalize"
                    onClick={() => togglePerm(perm)}
                  >
                    {perm}
                  </Badge>
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
              disabled={!name.trim() || creating}
              loading={creating}
            >
              Create Key
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export const APIKeyManager = React.forwardRef(APIKeyManagerInner) as (
  props: APIKeyManagerProps & { ref?: React.ForwardedRef<HTMLDivElement> }
) => React.ReactElement;

(APIKeyManager as React.ForwardRefExoticComponent<APIKeyManagerProps>).displayName = "APIKeyManager";
