import type * as React from "react";
import { cn } from "../../lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "../../components/Avatar";
import { Badge } from "../../components/Badge";
import { Button } from "../../components/Button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../../components/Card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../components/DropdownMenu";

// ── Icons (inline SVG to avoid lucide-react dep in block layer) ──────────────
function MoreHorizontalIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="1.5" />
      <circle cx="19" cy="12" r="1.5" />
      <circle cx="5" cy="12" r="1.5" />
    </svg>
  );
}

function MailIcon({ className }: { className?: string }) {
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
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}

function Trash2Icon({ className }: { className?: string }) {
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
      <path d="M3 6h18" />
      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
      <line x1="10" y1="11" x2="10" y2="17" />
      <line x1="14" y1="11" x2="14" y2="17" />
    </svg>
  );
}

function ShieldIcon({ className }: { className?: string }) {
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
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  );
}

function UserPlusIcon({ className }: { className?: string }) {
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
      <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="8.5" cy="7" r="4" />
      <line x1="20" y1="8" x2="20" y2="14" />
      <line x1="23" y1="11" x2="17" y2="11" />
    </svg>
  );
}

function UsersIcon({ className }: { className?: string }) {
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
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}

export type TeamMemberGridRole = "owner" | "admin" | "member" | "billing";
export type TeamMemberGridStatus = "active" | "pending" | "inactive";

export interface TeamMemberGridMember {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  role: TeamMemberGridRole;
  status: TeamMemberGridStatus;
  joinedAt?: string;
  department?: string;
}

export interface TeamMemberGridProps extends React.HTMLAttributes<HTMLDivElement> {
  members: TeamMemberGridMember[];
  currentUserId?: string;
  onRemove?: (member: TeamMemberGridMember) => void;
  onChangeRole?: (member: TeamMemberGridMember, role: TeamMemberGridRole) => void;
  onResendInvite?: (member: TeamMemberGridMember) => void;
  onInvite?: () => void;
  title?: string;
  description?: string;
  showInviteButton?: boolean;
  columns?: 1 | 2 | 3 | 4;
}

const roleBadgeVariant: Record<TeamMemberGridRole, "default" | "secondary" | "destructive" | "outline"> = {
  owner: "default",
  admin: "secondary",
  member: "outline",
  billing: "outline",
};

const roleLabel: Record<TeamMemberGridRole, string> = {
  owner: "Owner",
  admin: "Admin",
  member: "Member",
  billing: "Billing",
};

const statusConfig: Record<TeamMemberGridStatus, { label: string; className: string }> = {
  active: { label: "Active", className: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20" },
  pending: { label: "Pending", className: "bg-amber-500/10 text-amber-600 border-amber-500/20" },
  inactive: { label: "Inactive", className: "bg-muted text-muted-foreground" },
};

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

function TeamMemberGrid({
  members,
  currentUserId,
  onRemove,
  onChangeRole,
  onResendInvite,
  onInvite,
  title = "Team Members",
  description,
  showInviteButton = true,
  columns = 3,
  className,
  ...props
}: TeamMemberGridProps) {
  const sorted = [...members].sort((a, b) => {
    const order: Record<TeamMemberGridRole, number> = { owner: 0, admin: 1, billing: 2, member: 3 };
    return order[a.role] - order[b.role];
  });

  const gridCols = {
    1: "grid-cols-1",
    2: "grid-cols-1 sm:grid-cols-2",
    3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
  };

  return (
    <Card className={cn("", className)} {...props}>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="flex items-center gap-2">
            <UsersIcon className="h-5 w-5 text-muted-foreground" />
            {title}
          </CardTitle>
          {description && <CardDescription>{description}</CardDescription>}
        </div>
        {showInviteButton && onInvite && (
          <Button onClick={onInvite} size="sm">
            <UserPlusIcon className="mr-2 h-4 w-4" />
            Invite member
          </Button>
        )}
      </CardHeader>
      <CardContent>
        <div className={cn("grid gap-4", gridCols[columns])}>
          {sorted.map((member) => {
            const isCurrent = member.id === currentUserId;
            const isOwner = member.role === "owner";
            const status = statusConfig[member.status];

            return (
              <div
                key={member.id}
                className={cn(
                  "relative flex flex-col gap-3 rounded-lg border p-4 transition-colors",
                  member.status === "pending" && "border-dashed bg-muted/30",
                  member.status === "inactive" && "opacity-75"
                )}
              >
                <div className="flex items-start justify-between">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={member.avatarUrl} alt={member.name} />
                    <AvatarFallback className="text-sm">{getInitials(member.name)}</AvatarFallback>
                  </Avatar>
                  {!isOwner && !isCurrent && (onRemove || onChangeRole || (member.status === "pending" && onResendInvite)) && (
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8 -mr-2 -mt-2">
                          <MoreHorizontalIcon className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        {onChangeRole && (
                          <>
                            <DropdownMenuItem onClick={() => onChangeRole(member, "admin")}>
                              <ShieldIcon className="mr-2 h-4 w-4" />
                              Make admin
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => onChangeRole(member, "member")}>
                              Make member
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                          </>
                        )}
                        {member.status === "pending" && onResendInvite && (
                          <DropdownMenuItem onClick={() => onResendInvite(member)}>
                            <MailIcon className="mr-2 h-4 w-4" />
                            Resend invite
                          </DropdownMenuItem>
                        )}
                        {onRemove && (
                          <DropdownMenuItem
                            onClick={() => onRemove(member)}
                            className="text-destructive focus:text-destructive"
                          >
                            <Trash2Icon className="mr-2 h-4 w-4" />
                            Remove
                          </DropdownMenuItem>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  )}
                </div>

                <div className="space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className={cn("font-medium", member.status === "pending" && "text-muted-foreground")}>
                      {member.name}
                    </span>
                    {isCurrent && <span className="text-xs text-muted-foreground">(you)</span>}
                  </div>
                  <p className="text-sm text-muted-foreground truncate">{member.email}</p>
                </div>

                <div className="flex items-center gap-2 flex-wrap mt-auto pt-2">
                  <Badge variant={roleBadgeVariant[member.role]} className="text-xs">
                    {roleLabel[member.role]}
                  </Badge>
                  <Badge variant="outline" className={cn("text-xs", status.className)}>
                    {status.label}
                  </Badge>
                  {member.department && (
                    <span className="text-xs text-muted-foreground">{member.department}</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}

TeamMemberGrid.displayName = "TeamMemberGrid";

export { TeamMemberGrid };
