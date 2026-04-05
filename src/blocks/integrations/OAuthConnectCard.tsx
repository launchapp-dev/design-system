import * as React from "react";
import { cn } from "../../lib/utils";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/Card";
import { Button } from "../../components/Button";
import { Badge } from "../../components/Badge";
import { Check, X, ExternalLink, RefreshCw } from "lucide-react";

export interface OAuthProvider {
  id: string;
  name: string;
  icon?: React.ReactNode;
  description?: string;
  scopes?: string[];
}

export interface OAuthConnectCardProps extends React.HTMLAttributes<HTMLDivElement> {
  provider: OAuthProvider;
  isConnected?: boolean;
  connectedEmail?: string;
  onConnect?: () => void;
  onDisconnect?: () => void;
  onRefresh?: () => void;
  isLoading?: boolean;
}

function OAuthConnectCard({
  provider,
  isConnected,
  connectedEmail,
  onConnect,
  onDisconnect,
  onRefresh,
  isLoading,
  className,
  ...props
}: OAuthConnectCardProps) {
  return (
    <Card className={cn("relative", isConnected && "border-primary/50", className)} {...props}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            {provider.icon ? (
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                {provider.icon}
              </div>
            ) : (
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
                </svg>
              </div>
            )}
            <div>
              <CardTitle className="text-base">{provider.name}</CardTitle>
              {provider.description && (
                <CardDescription className="text-xs">{provider.description}</CardDescription>
              )}
            </div>
          </div>
          {isConnected && (
            <Badge variant="default" className="shrink-0">
              <Check className="mr-1 h-3 w-3" />
              Connected
            </Badge>
          )}
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {isConnected && connectedEmail && (
          <p className="text-sm text-muted-foreground">
            Connected as <span className="font-medium text-foreground">{connectedEmail}</span>
          </p>
        )}

        {provider.scopes && provider.scopes.length > 0 && (
          <div className="space-y-1.5">
            <p className="text-xs font-medium text-muted-foreground">Permissions</p>
            <div className="flex flex-wrap gap-1.5">
              {provider.scopes.map((scope) => (
                <Badge key={scope} variant="outline" className="text-xs">
                  {scope}
                </Badge>
              ))}
            </div>
          </div>
        )}

        <div className="flex gap-2">
          {!isConnected ? (
            <Button onClick={onConnect} disabled={isLoading} className="flex-1">
              {isLoading ? "Connecting…" : "Connect"}
            </Button>
          ) : (
            <>
              {onRefresh && (
                <Button variant="outline" size="sm" onClick={onRefresh} disabled={isLoading}>
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Refresh
                </Button>
              )}
              <Button variant="destructive" size="sm" onClick={onDisconnect} disabled={isLoading}>
                Disconnect
              </Button>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

OAuthConnectCard.displayName = "OAuthConnectCard";

export { OAuthConnectCard };
export type { OAuthConnectCardProps, OAuthProvider };
