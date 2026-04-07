import * as React from "react";
import { Button } from "@/components/Button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/Card";
import { Input } from "@/components/Input";
import { Badge } from "@/components/Badge";
import { Separator } from "@/components/Separator";
import { cn } from "@/lib/utils";

export interface InviteEntry {
  id: string;
  email: string;
  role: "admin" | "member" | "viewer";
  status: "pending" | "sent" | "error";
}

export interface TeamInviteFlowProps extends React.HTMLAttributes<HTMLDivElement> {
  entries?: InviteEntry[];
  onSendInvites?: (emails: string[]) => void;
  onRemoveEntry?: (id: string) => void;
  onSkip?: () => void;
  maxInvites?: number;
}

const TeamInviteFlow = React.forwardRef<HTMLDivElement, TeamInviteFlowProps>(
  (
    {
      entries = [],
      onSendInvites,
      onRemoveEntry,
      onSkip,
      maxInvites = 10,
      className,
      ...props
    },
    ref,
  ) => {
    const [emailInput, setEmailInput] = React.useState("");
    const [role, setRole] = React.useState<InviteEntry["role"]>("member");
    const [localEntries, setLocalEntries] = React.useState<InviteEntry[]>(entries);

    const addEntry = () => {
      if (!emailInput.trim() || localEntries.length >= maxInvites) return;
      const newEntry: InviteEntry = {
        id: crypto.randomUUID(),
        email: emailInput.trim(),
        role,
        status: "pending",
      };
      setLocalEntries((prev) => [...prev, newEntry]);
      setEmailInput("");
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (e.key === "Enter") {
        e.preventDefault();
        addEntry();
      }
    };

    const handleSendAll = () => {
      const emails = localEntries.filter((e) => e.status === "pending").map((e) => e.email);
      onSendInvites?.(emails);
      setLocalEntries((prev) =>
        prev.map((e) => (e.status === "pending" ? { ...e, status: "sent" as const } : e)),
      );
    };

    const handleRemove = (id: string) => {
      setLocalEntries((prev) => prev.filter((e) => e.id !== id));
      onRemoveEntry?.(id);
    };

    return (
      <div ref={ref} className={cn("space-y-6", className)} {...props}>
        <Card>
          <CardHeader>
            <CardTitle>Invite your team</CardTitle>
            <CardDescription>
              Add teammates to collaborate. You can invite up to {maxInvites} people.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2">
              <Input
                type="email"
                placeholder="teammate@company.com"
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                onKeyDown={handleKeyDown}
                className="flex-1"
              />
              <select
                value={role}
                onChange={(e) => setRole(e.target.value as InviteEntry["role"])}
                className="rounded-md border border-border bg-background px-3 text-sm"
              >
                <option value="viewer">Viewer</option>
                <option value="member">Member</option>
                <option value="admin">Admin</option>
              </select>
              <Button size="sm" onClick={addEntry} disabled={!emailInput.trim() || localEntries.length >= maxInvites}>
                Add
              </Button>
            </div>

            {localEntries.length > 0 && (
              <>
                <Separator />
                <ul className="space-y-2" role="list">
                  {localEntries.map((entry) => (
                    <li key={entry.id} className="flex items-center justify-between rounded-md border p-3">
                      <div className="flex items-center gap-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted text-sm">
                          {entry.email[0].toUpperCase()}
                        </div>
                        <div>
                          <p className="text-sm font-medium">{entry.email}</p>
                          <p className="text-xs capitalize text-muted-foreground">{entry.role}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge
                          variant={entry.status === "sent" ? "default" : entry.status === "error" ? "destructive" : "secondary"}
                          className="text-xs"
                        >
                          {entry.status === "pending" ? "Pending" : entry.status === "sent" ? "Sent" : "Failed"}
                        </Badge>
                        <button
                          type="button"
                          onClick={() => handleRemove(entry.id)}
                          className="text-xs text-muted-foreground hover:text-destructive"
                        >
                          Remove
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              </>
            )}

            <div className="flex items-center justify-between pt-2">
              <Button variant="ghost" size="sm" onClick={onSkip}>
                Skip for now
              </Button>
              <Button
                size="sm"
                onClick={handleSendAll}
                disabled={localEntries.filter((e) => e.status === "pending").length === 0}
              >
                Send {localEntries.filter((e) => e.status === "pending").length > 0 ? `(${localEntries.filter((e) => e.status === "pending").length})` : ""} invitations
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  },
);
TeamInviteFlow.displayName = "TeamInviteFlow";

export { TeamInviteFlow };