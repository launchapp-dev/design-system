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
  DialogRoot as Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../../components/Dialog";

// ── Icons (inline SVG to avoid lucide-react dep in block layer) ──────────────
function MoreHorizontalIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <circle cx="12" cy="12" r="1.5" /><circle cx="19" cy="12" r="1.5" /><circle cx="5" cy="12" r="1.5" />
    </svg>
  );
}
function EyeIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" /><circle cx="12" cy="12" r="3" />
    </svg>
  );
}
function EyeOffIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" /><path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" /><path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" /><line x1="2" y1="2" x2="22" y2="22" />
    </svg>
  );
}
function CopyIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <rect width="14" height="14" x="8" y="8" rx="2" ry="2" /><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
    </svg>
  );
}
function Trash2Icon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M3 6h18" /><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" /><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" /><line x1="10" y1="11" x2="10" y2="17" /><line x1="14" y1="11" x2="14" y2="17" />
    </svg>
  );
}
function RefreshCwIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" /><path d="M21 3v5h-5" /><path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" /><path d="M8 16H3v5" />
    </svg>
  );
}
function KeyIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <circle cx="7.5" cy="15.5" r="5.5" /><path d="m21 2-9.6 9.6" /><path d="m15.5 7.5 3 3L22 7l-3-3" />
    </svg>
  );
}

export interface ApiKey {
  id: string;
  name: string;
  prefix: string;
  createdAt: string;
  lastUsedAt?: string;
  expiresAt?: string;
  scopes?: string[];
}

export interface ApiKeyManagerProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onCopy'> {
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
  onCopy: onCopyProp,
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
            <KeyIcon className="mr-2 h-4 w-4" />
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
                          <EyeOffIcon className="mr-2 h-4 w-4" />
                          Hide
                        </>
                      ) : (
                        <>
                          <EyeIcon className="mr-2 h-4 w-4" />
                          Reveal
                        </>
                      )}
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => copyKey(key)}
                    >
                      <CopyIcon className="mr-2 h-4 w-4" />
                      {wasCopied ? "Copied" : "Copy"}
                    </Button>
                    {canManage && (onRevoke || onRotate) && (
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-9 w-9">
                            <MoreHorizontalIcon className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          {onRotate && (
                            <DropdownMenuItem onClick={() => onRotate(key)}>
                              <RefreshCwIcon className="mr-2 h-4 w-4" />
                              Rotate key
                            </DropdownMenuItem>
                          )}
                          {onRevoke && (
                            <DropdownMenuItem
                              onClick={() => onRevoke(key)}
                              className="text-destructive focus:text-destructive"
                            >
                              <Trash2Icon className="mr-2 h-4 w-4" />
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
