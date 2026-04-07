import * as React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/Card";
import { Button } from "@/components/Button";
import { Badge } from "@/components/Badge";
import { cn } from "@/lib/utils";

export interface PasswordRequirement {
  id: string;
  label: string;
  met: boolean;
}

export interface SecuritySettingsProps extends React.HTMLAttributes<HTMLDivElement> {
  has2FA?: boolean;
  lastPasswordChange?: string;
  activeSessions?: number;
  onPasswordChange?: () => void;
  onEnable2FA?: () => void;
  onRevokeSessions?: () => void;
}

const SecuritySettings = React.forwardRef<HTMLDivElement, SecuritySettingsProps>(
  (
    {
      has2FA = false,
      lastPasswordChange = "90 days ago",
      activeSessions = 1,
      onPasswordChange,
      onEnable2FA,
      onRevokeSessions,
      className,
      ...props
    },
    ref,
  ) => {
    const requirements: PasswordRequirement[] = [
      { id: "length", label: "At least 12 characters", met: true },
      { id: "upper", label: "Uppercase letter", met: true },
      { id: "lower", label: "Lowercase letter", met: false },
      { id: "number", label: "Number", met: false },
    ];

    return (
      <div ref={ref} className={cn("space-y-8", className)} {...props}>
        <Card>
          <CardHeader>
            <CardTitle>Password</CardTitle>
            <CardDescription>Last changed {lastPasswordChange}.</CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="outline" size="sm" onClick={onPasswordChange}>
              Change password
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <CardTitle>Two-factor authentication</CardTitle>
              {has2FA && <Badge variant="default">Enabled</Badge>}
            </div>
            <CardDescription>Add an extra layer of security to your account.</CardDescription>
          </CardHeader>
          <CardContent>
            {!has2FA ? (
              <Button size="sm" onClick={onEnable2FA}>
                Enable 2FA
              </Button>
            ) : (
              <p className="text-sm text-muted-foreground">Your account is protected with 2FA.</p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Active sessions</CardTitle>
                <CardDescription>{activeSessions} device{activeSessions !== 1 ? "s" : ""} currently signed in.</CardDescription>
              </div>
              {activeSessions > 1 && (
                <Button variant="outline" size="sm" onClick={onRevokeSessions}>
                  Revoke all
                </Button>
              )}
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between rounded-md border p-3">
                <div>
                  <p className="text-sm font-medium">MacBook Pro — Current session</p>
                  <p className="text-xs text-muted-foreground">San Francisco, CA • Now</p>
                </div>
                <Badge variant="outline">Active</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Password requirements</CardTitle>
            <CardDescription>Your password must meet the following criteria.</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2" role="list">
              {requirements.map((req) => (
                <li key={req.id} className="flex items-center gap-2 text-sm">
                  <span
                    className={cn(
                      "flex h-5 w-5 items-center justify-center rounded-full text-xs",
                      req.met ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground",
                    )}
                    aria-hidden="true"
                  >
                    {req.met ? "✓" : "✗"}
                  </span>
                  <span className={cn(req.met ? "text-foreground" : "text-muted-foreground")}>
                    {req.label}
                  </span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    );
  },
);
SecuritySettings.displayName = "SecuritySettings";

export { SecuritySettings };