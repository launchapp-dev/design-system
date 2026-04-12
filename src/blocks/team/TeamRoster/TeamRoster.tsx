import type * as React from "react";
import { cn } from "../../../lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "../../../components/Avatar";
import { Badge } from "../../../components/Badge";
import { Button } from "../../../components/Button";
import { EmptyStateCard } from "../../data/EmptyStateCard";
import type { TeamMember } from "../TeamMemberList";

export type TeamRosterMember = TeamMember & {
  title?: string;
  department?: string;
  phone?: string;
  skills?: string[];
  availability?: "available" | "busy" | "away" | "offline";
};

export interface TeamRosterProps extends React.HTMLAttributes<HTMLDivElement> {
  members: TeamRosterMember[];
  view?: "grid" | "list";
  showSkills?: boolean;
  showContact?: boolean;
  showDepartment?: boolean;
  showAvailability?: boolean;
  onMemberClick?: (member: TeamRosterMember) => void;
  onMessage?: (member: TeamRosterMember) => void;
  emptyMessage?: string;
}

const availabilityDot: Record<string, string> = {
  available: "bg-success",
  busy: "bg-destructive",
  away: "bg-warning",
  offline: "bg-muted-foreground",
};

const availabilityLabel: Record<string, string> = {
  available: "Available",
  busy: "Busy",
  away: "Away",
  offline: "Offline",
};

const roleColor: Record<string, string> = {
  owner: "bg-primary/10 text-primary border-primary/20",
  admin: "bg-info/10 text-info border-info/20",
  member: "bg-muted text-muted-foreground border-border",
  billing: "bg-primary/10 text-primary border-primary/20",
};

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

function GridMemberCard({
  member,
  showSkills,
  showContact,
  showAvailability,
  showDepartment,
  onMemberClick,
  onMessage,
}: {
  member: TeamRosterMember;
  showSkills?: boolean;
  showContact?: boolean;
  showAvailability?: boolean;
  showDepartment?: boolean;
  onMemberClick?: (member: TeamRosterMember) => void;
  onMessage?: (member: TeamRosterMember) => void;
}) {
  const isPending = member.status === "pending";

  return (
    <div
      className={cn(
        "group relative flex flex-col items-center rounded-lg border bg-card p-4 text-center transition-shadow hover:shadow-md",
        isPending && "border-dashed opacity-75",
      )}
    >
      {showAvailability && member.availability && (
        <div
          className={cn(
            "absolute right-3 top-3 h-2.5 w-2.5 rounded-full border-2 border-background",
            availabilityDot[member.availability],
          )}
          aria-label={availabilityLabel[member.availability]}
        />
      )}
      <button
        type="button"
        onClick={() => onMemberClick?.(member)}
        className="flex flex-col items-center gap-2 w-full"
      >
        <div className="relative">
          <Avatar className="h-16 w-16">
            <AvatarImage src={member.avatarUrl} alt={member.name} />
            <AvatarFallback className="text-lg">{getInitials(member.name)}</AvatarFallback>
          </Avatar>
        </div>
        <div className="space-y-1 min-w-0 w-full">
          <p className="text-sm font-medium truncate">{member.name}</p>
          {member.title && <p className="text-xs text-muted-foreground truncate">{member.title}</p>}
          {showDepartment && member.department && (
            <p className="text-xs text-muted-foreground truncate">{member.department}</p>
          )}
        </div>
        <Badge className={cn("text-xs capitalize border", roleColor[member.role])}>
          {member.role}
        </Badge>
      </button>

      {showSkills && member.skills && member.skills.length > 0 && (
        <div className="mt-2 flex flex-wrap justify-center gap-1">
          {member.skills.slice(0, 3).map((skill) => (
            <span
              key={skill}
              className="inline-flex items-center rounded-full bg-muted px-2 py-0 text-[10px] text-muted-foreground"
            >
              {skill}
            </span>
          ))}
          {member.skills.length > 3 && (
            <span className="inline-flex items-center rounded-full bg-muted px-2 py-0 text-[10px] text-muted-foreground">
              +{member.skills.length - 3}
            </span>
          )}
        </div>
      )}

      {showContact && (
        <div className="mt-3 flex gap-2">
          {onMessage && !isPending && (
            <Button
              size="sm"
              variant="outline"
              className="h-7 text-xs"
              onClick={() => onMessage(member)}
            >
              Message
            </Button>
          )}
          {member.phone && (
            <Button size="sm" variant="ghost" className="h-7 w-7 p-0" asChild>
              <a href={`tel:${member.phone}`} aria-label={`Call ${member.name}`}>
                <span className="sr-only">Call {member.name}</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  aria-hidden="true"
                >
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.27h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.14a16 16 0 0 0 6.29 6.29l.93-.93a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21.73 16.92z" />
                </svg>
              </a>
            </Button>
          )}
        </div>
      )}
    </div>
  );
}

function ListMemberRow({
  member,
  showSkills,
  showDepartment,
  showAvailability,
  onMemberClick,
  onMessage,
}: {
  member: TeamRosterMember;
  showSkills?: boolean;
  showDepartment?: boolean;
  showAvailability?: boolean;
  onMemberClick?: (member: TeamRosterMember) => void;
  onMessage?: (member: TeamRosterMember) => void;
}) {
  const isPending = member.status === "pending";

  return (
    <div
      className={cn(
        "flex items-center gap-4 rounded-lg border bg-card p-3 transition-shadow hover:shadow-sm",
        isPending && "border-dashed opacity-75",
      )}
    >
      <div className="relative shrink-0">
        <Avatar className="h-10 w-10">
          <AvatarImage src={member.avatarUrl} alt={member.name} />
          <AvatarFallback>{getInitials(member.name)}</AvatarFallback>
        </Avatar>
        {showAvailability && member.availability && (
          <div
            className={cn(
              "absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-background",
              availabilityDot[member.availability],
            )}
          />
        )}
      </div>
      <button
        type="button"
        onClick={() => onMemberClick?.(member)}
        className="flex-1 text-left min-w-0"
      >
        <div className="flex flex-wrap items-center gap-2">
          <span className={cn("text-sm font-medium", isPending && "text-muted-foreground")}>
            {member.name}
          </span>
          <Badge className={cn("text-xs capitalize border", roleColor[member.role])}>
            {member.role}
          </Badge>
          {isPending && (
            <Badge variant="secondary" className="text-xs">
              Pending
            </Badge>
          )}
        </div>
        <div className="flex flex-wrap items-center gap-3 mt-0.5">
          {member.email && (
            <span className="text-xs text-muted-foreground truncate">{member.email}</span>
          )}
          {showDepartment && member.department && (
            <span className="text-xs text-muted-foreground">{member.department}</span>
          )}
          {member.title && <span className="text-xs text-muted-foreground">{member.title}</span>}
        </div>
      </button>
      {showSkills && member.skills && member.skills.length > 0 && (
        <div className="hidden lg:flex flex-wrap gap-1 shrink-0">
          {member.skills.slice(0, 4).map((skill) => (
            <span
              key={skill}
              className="inline-flex items-center rounded-full bg-muted px-2 py-0 text-[10px] text-muted-foreground"
            >
              {skill}
            </span>
          ))}
        </div>
      )}
      {onMessage && !isPending && (
        <Button size="sm" variant="outline" className="shrink-0" onClick={() => onMessage(member)}>
          Message
        </Button>
      )}
    </div>
  );
}

function TeamRoster(
  {
    members,
    view = "grid",
    showSkills = false,
    showContact = false,
    showDepartment = false,
    showAvailability = false,
    onMemberClick,
    onMessage,
    emptyMessage = "No team members found",
    className,
    ...props
  }: TeamRosterProps,
  ref: React.Ref<HTMLDivElement>,
) {
  if (members.length === 0) {
    return (
      <div ref={ref} className={cn("flex items-center justify-center py-16", className)} {...props}>
        <EmptyStateCard
          title="No members"
          description={emptyMessage}
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              aria-hidden="true"
            >
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
              <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
          }
        />
      </div>
    );
  }

  if (view === "list") {
    return (
      <div ref={ref} className={cn("space-y-2", className)} {...props}>
        {members.map((member) => (
          <ListMemberRow
            key={member.id}
            member={member}
            showSkills={showSkills}
            showDepartment={showDepartment}
            showAvailability={showAvailability}
            onMemberClick={onMemberClick}
            onMessage={onMessage}
          />
        ))}
      </div>
    );
  }

  return (
    <div
      ref={ref}
      className={cn(
        "grid gap-4",
        "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
        className,
      )}
      {...props}
    >
      {members.map((member) => (
        <GridMemberCard
          key={member.id}
          member={member}
          showSkills={showSkills}
          showContact={showContact}
          showDepartment={showDepartment}
          showAvailability={showAvailability}
          onMemberClick={onMemberClick}
          onMessage={onMessage}
        />
      ))}
    </div>
  );
}

TeamRoster.displayName = "TeamRoster";

export { TeamRoster };
