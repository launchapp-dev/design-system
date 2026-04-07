import type * as React from "react";
import { cn } from "@/lib/utils";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/Card";
import { Button } from "@/components/Button";
import { Badge } from "@/components/Badge";
import { Switch } from "@/components/Switch";

export interface ConnectedAccount {
  id: string;
  provider: string;
  providerIcon?: React.ReactNode;
  connected: boolean;
  accountEmail?: string;
  accountName?: string;
  connectedAt?: string;
  onConnect?: (id: string) => void;
  onDisconnect?: (id: string) => void;
}

export interface ConnectedAccountsProps extends React.HTMLAttributes<HTMLDivElement> {
  accounts: ConnectedAccount[];
  title?: string;
  description?: string;
  onConnectionToggle?: (id: string, enabled: boolean) => void;
}

const UnlinkIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M18.84 12.25l1.72-1.71h-.02a5.004 5.004 0 0 0-.12-7.07 5.006 5.006 0 0 0-6.95 0l-1.72 1.71" />
    <path d="M5.17 11.75l-1.71 1.71a5.004 5.004 0 0 0 .12 7.07 5.006 5.006 0 0 0 6.95 0l1.71-1.71" />
    <line x1="8" x2="8" y1="2" y2="5" />
    <polyline points="2 8 2 2 8 2" />
    <line x1="16" x2="16" y1="19" y2="22" />
    <polyline points="22 16 22 22 16 22" />
  </svg>
);

function ConnectedAccounts({
  accounts,
  title = "Connected Accounts",
  description = "Manage third-party accounts connected to your profile.",
  className,
  ...props
}: ConnectedAccountsProps) {
  const connectedCount = accounts.filter((a) => a.connected).length;

  return (
    <Card ref={null} className={cn("", className)} {...props}>
      <CardHeader>
        <div className="flex items-start justify-between gap-4">
          <div>
            <CardTitle className="text-base">{title}</CardTitle>
            <CardDescription className="mt-1">{description}</CardDescription>
          </div>
          {connectedCount > 0 && (
            <Badge variant="secondary" className="shrink-0">
              {connectedCount} connected
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {accounts.map((account) => (
          <div
            key={account.id}
            className="flex items-center justify-between gap-4 rounded-lg border p-4"
          >
            <div className="flex items-center gap-3">
              {account.providerIcon ? (
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
                  {account.providerIcon}
                </div>
              ) : (
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted text-sm font-semibold">
                  {account.provider.charAt(0).toUpperCase()}
                </div>
              )}
              <div>
                <p className="font-medium text-sm">{account.provider}</p>
                {account.connected ? (
                  <p className="text-xs text-muted-foreground">
                    {account.accountEmail || account.accountName || "Connected"}
                    {account.connectedAt && ` · Connected ${account.connectedAt}`}
                  </p>
                ) : (
                  <p className="text-xs text-muted-foreground">Not connected</p>
                )}
              </div>
            </div>

            <div className="flex items-center gap-3">
              {account.connected ? (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => account.onDisconnect?.(account.id)}
                  className="text-destructive hover:text-destructive"
                >
                  <UnlinkIcon />
                  Disconnect
                </Button>
              ) : (
                <Button
                  variant="default"
                  size="sm"
                  onClick={() => account.onConnect?.(account.id)}
                >
                  Connect
                </Button>
              )}
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

ConnectedAccounts.displayName = "ConnectedAccounts";

export { ConnectedAccounts };
