import * as React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/Card";
import { Badge } from "@/components/Badge";
import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { Separator } from "@/components/Separator";
import { cn } from "@/lib/utils";

export interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: "owner" | "admin" | "member" | "viewer";
  avatar?: string;
  status?: "active" | "pending" | "invited";
  joinedAt?: string;
}

export interface TeamSettingsProps extends React.HTMLAttributes<HTMLDivElement> {
  members: TeamMember[];
  onInvite?: (email: string, role: TeamMember["role"]) => void;
  onRemove?: (id: string) => void;
  onChangeRole?: (id: string, role: TeamMember["role"]) => void;
}

const roleColors: Record<TeamMember["role"], string> = {
  owner: "bg-amber-100 text-amber-800",
  admin: "bg-violet-100 text-violet-800",
  member: "bg-blue-100 text-blue-800",
  viewer: "bg-muted text-muted-foreground",
};

const roleLabels: Record<TeamMember["role"], string> = {
  owner: "Owner",
  admin: "Admin",
  member: "Member",
  viewer: "Viewer",
};

const TeamSettings = React.forwardRef<HTMLDivElement, TeamSettingsProps>(
  ({ members, onInvite, onRemove, onChangeRole, className, ...props }, ref) => {
    const [inviteEmail, setInviteEmail] = React.useState("");
    const [inviteRole, setInviteRole] = React.useState<TeamMember["role"]>("member");

    const handleInvite = () => {
      if (inviteEmail && onInvite) {
        onInvite(inviteEmail, inviteRole);
        setInviteEmail("");
      }
    };

    return (
      <div ref={ref} className={cn("space-y-8", className)} {...props}>
        <Card>
          <CardHeader>
            <CardTitle>Team members</CardTitle>
            <CardDescription>Manage who has access to your workspace.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2">
              <Input
                type="email"
                placeholder="colleague@company.com"
                value={inviteEmail}
                onChange={(e) => setInviteEmail(e.target.value)}
                className="flex-1"
              />
              <select
                value={inviteRole}
                onChange={(e) => setInviteRole(e.target.value as TeamMember["role"])}
                className="rounded-md border border-border bg-background px-3 text-sm"
              >
                <option value="viewer">Viewer</option>
                <option value="member">Member</option>
                <option value="admin">Admin</option>
              </select>
              <Button size="sm" onClick={handleInvite} disabled={!inviteEmail}>
                Invite
              </Button>
            </div>

            <Separator />

            <ul className="space-y-3" role="list">
              {members.map((member) => (
                <li key={member.id} className="flex items-center justify-between rounded-md border p-3">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-muted text-sm font-medium">
                      {member.name[0]}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium">{member.name}</span>
                        {member.status === "pending" && (
                          <Badge variant="secondary" className="text-xs">Pending</Badge>
                        )}
                        {member.status === "invited" && (
                          <Badge variant="outline" className="text-xs">Invited</Badge>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground">{member.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={cn("rounded-full px-2 py-0.5 text-xs font-medium", roleColors[member.role])}>
                      {roleLabels[member.role]}
                    </span>
                    {member.role !== "owner" && (
                      <button
                        type="button"
                        onClick={() => onRemove?.(member.id)}
                        className="text-xs text-muted-foreground hover:text-destructive"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    );
  },
);
TeamSettings.displayName = "TeamSettings";

export { TeamSettings };