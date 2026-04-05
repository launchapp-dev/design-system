import * as React from "react";
import { cn } from "../../lib/utils";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/Card";
import { Button } from "../../components/Button";
import { Badge } from "../../components/Badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../components/DropdownMenu";
import { Input } from "../../components/Input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../../components/Dialog";
import { MoreHorizontal, Eye, EyeOff, Copy, Trash2, RefreshCw, Key } from "lucide-react";

export interface ApiKey {
  id: string;
  name: string;
  prefix: string;
  createdAt: string;
  lastUsedAt?: string;
  expiresAt?: string;
  scopes?: string[];
}

export interface ApiKeyManagerProps extends React.HTMLAttributes<HTMLDivElement> {
  keys: ApiKey[];
  onCreate?: () => void;
  onRevoke?: (key: ApiKey) => void;
  onRotate?: (key: ApiKey) => void;
  onCopy?: (key: ApiKey) => void;
  canManage?: boolean;
  title?: string;
  description?: string;
}

function maskKey(prefix: string): string {
  return `${prefix}${"•".repeat(20)}`;
}

function ApiKeyManager({
  keys,
  onCreate,
  onRevoke,
  onRotate,
  canManage = true,
  title = "API Keys",
  description = "Manage your API keys for programmatic access.",
  className,
  ...props
}: ApiKeyManagerProps) {
  const [revealed, setRevealed] = React.useState<Set<string>>(new Set());
  const [copied, setCopied] = React.useState<Set<string>>(new Set());

  function toggleReveal(id: string) {
    setRevealed((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  async function copyKey(key: ApiKey, fullKey?: string) {
    const val = fullKey ?? maskKey(key.prefix);
    await navigator.clipboard.writeText(val);
    setCopied((prev) => new Set(prev).add(key.id));
    setTimeout(() => setCopied((prev) => new Set(prev)), 2000);
  }

  function formatDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  }

  return (
    <div className={cn("space-y-4", className)} {...props}>
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-base font-semibold">{title}</h3>
          {description && <p className="text-sm text-muted-foreground">{description}</p>}
        </div>
        {onCreate && canManage && (
          <Button onClick={onCreate}>
            <Key className="mr-2 h-4 w-4" />
            Create key
          </Button>
        )}
      </div>

      <div className="space-y-3">
        {keys.length === 0 ? (
          <Card>
            <CardContent className="py-8 text-center text-sm text-muted-foreground">
              No API keys yet. Create one to get started.
            </CardContent>
          </Card>
        ) : (
          keys.map((key) => {
            const isRevealed = revealed.has(key.id);
            const wasCopied = copied.has(key.id);

            return (
              <Card key={key.id} className="relative">
                <CardHeader className="pb-2">
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <CardTitle className="text-sm">{key.name}</CardTitle>
                      <p className="text-xs font-mono text-muted-foreground">
                        {isRevealed ? key.prefix + "sk_live_••••••••••••••••••" : maskKey(key.prefix)}
                      </p>
                    </div>
                    {key.scopes && key.scopes.length > 0 && (
                      <div className="flex flex-wrap gap-1">
                        {key.scopes.map((s) => (
                          <Badge key={s} variant="outline" className="text-xs">
                            {s}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span>Created {formatDate(key.createdAt)}</span>
                    {key.lastUsedAt && <span>Last used {formatDate(key.lastUsedAt)}</span>}
                    {key.expiresAt && <span>Expires {formatDate(key.expiresAt)}</span>}
                  </div>

                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => toggleReveal(key.id)}
                    >
                      {isRevealed ? (
                        <>
                          <EyeOff className="mr-2 h-4 w-4" />
                          Hide
                        </>
                      ) : (
                        <>
                          <Eye className="mr-2 h-4 w-4" />
                          Reveal
                        </>
                      )}
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => copyKey(key)}
                    >
                      <Copy className="mr-2 h-4 w-4" />
                      {wasCopied ? "Copied" : "Copy"}
                    </Button>
                    {canManage && (onRevoke || onRotate) && (
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-9 w-9">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          {onRotate && (
                            <DropdownMenuItem onClick={() => onRotate(key)}>
                              <RefreshCw className="mr-2 h-4 w-4" />
                              Rotate key
                            </DropdownMenuItem>
                          )}
                          {onRevoke && (
                            <DropdownMenuItem
                              onClick={() => onRevoke(key)}
                              className="text-destructive focus:text-destructive"
                            >
                              <Trash2 className="mr-2 h-4 w-4" />
                              Revoke key
                            </DropdownMenuItem>
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })
        )}
      </div>
    </div>
  );
}

ApiKeyManager.displayName = "ApiKeyManager";

export { ApiKeyManager };
export type { ApiKeyManagerProps, ApiKey };
