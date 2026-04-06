import type * as React from "react";
import { cn } from "../../lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "../../components/Avatar";
import { Badge } from "../../components/Badge";
import { Button } from "../../components/Button";
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
function CrownIcon({ className }: { className?: string }) {
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
      <path d="m2 4 3 12h14l3-12-6 7-4-7-4 7-6-7zm3 16h14" />
    </svg>
  );
}

export type MemberRole = "owner" | "admin" | "member" | "billing";

export interface TeamMember {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  role: MemberRole;
  joinedAt?: string;
  status?: "active" | "pending" | "inactive";
}

export interface TeamMemberListProps extends React.HTMLAttributes<HTMLDivElement> {
  members: TeamMember[];
  currentUserId?: string;
  onRemove?: (member: TeamMember) => void;
  onChangeRole?: (member: TeamMember, role: MemberRole) => void;
  onResendInvite?: (member: TeamMember) => void;
  showEmail?: boolean;
  showRole?: boolean;
}

const roleBadgeVariant: Record<MemberRole, "default" | "secondary" | "destructive" | "outline"> = {
  owner: "default",
  admin: "secondary",
  member: "outline",
  billing: "outline",
};

const roleLabel: Record<MemberRole, string> = {
  owner: "Owner",
  admin: "Admin",
  member: "Member",
  billing: "Billing",
};

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

function TeamMemberList({
  members,
  currentUserId,
  onRemove,
  onChangeRole,
  onResendInvite,
  showEmail = true,
  showRole = true,
  className,
  ...props
}: TeamMemberListProps) {
  const sorted = [...members].sort((a, b) => {
    const order: Record<MemberRole, number> = { owner: 0, admin: 1, billing: 2, member: 3 };
    return order[a.role] - order[b.role];
  });

  return (
    <div className={cn("space-y-3", className)} {...props}>
      {sorted.map((member) => {
        const isCurrent = member.id === currentUserId;
        const isPending = member.status === "pending";
        const isOwner = member.role === "owner";

        return (
          <div
            key={member.id}
            className={cn(
              "flex items-center gap-3 rounded-lg border p-3",
              isPending && "border-dashed bg-muted/30",
            )}
          >
            <Avatar className="h-9 w-9">
              <AvatarImage src={member.avatarUrl} alt={member.name} />
              <AvatarFallback>{getInitials(member.name)}</AvatarFallback>
            </Avatar>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span
                  className={cn(
                    "text-sm font-medium truncate",
                    isPending && "text-muted-foreground",
                  )}
                >
                  {member.name}
                </span>
                {isCurrent && <span className="text-xs text-muted-foreground">(you)</span>}
                {isOwner && <CrownIcon className="h-3 w-3 text-amber-500" />}
                {isPending ? (
                  <Badge variant="secondary" className="text-xs">
                    <MailIcon className="mr-1 h-3 w-3" />
                    Pending
                  </Badge>
                ) : showRole ? (
                  <Badge variant={roleBadgeVariant[member.role]} className="text-xs">
                    {roleLabel[member.role]}
                  </Badge>
                ) : null}
              </div>
              {showEmail && (
                <p className="text-xs text-muted-foreground truncate">{member.email}</p>
              )}
            </div>

            {!isOwner &&
              !isCurrent &&
              (onRemove || onChangeRole || (isPending && onResendInvite)) && (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8 shrink-0">
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
                    {isPending && onResendInvite && (
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
        );
      })}
    </div>
  );
}

TeamMemberList.displayName = "TeamMemberList";

export { TeamMemberList };
