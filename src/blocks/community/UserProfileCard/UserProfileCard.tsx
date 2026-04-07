import type * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Card, CardContent, CardHeader } from "@/components/Card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/Avatar";
import { Button } from "@/components/Button";
import { Badge } from "@/components/Badge";
import { Separator } from "@/components/Separator";
import { cn } from "@/lib/utils";

const profileCardVariants = cva("", {
  variants: {
    size: {
      sm: "",
      md: "",
      lg: "",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

export interface ProfileStat {
  label: string;
  value: string | number;
  icon?: React.ReactNode;
}

export interface ProfileBadge {
  label: string;
  variant?: "default" | "secondary" | "outline" | "destructive";
}

export interface UserProfileCardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof profileCardVariants> {
  user: {
    name: string;
    username?: string;
    avatar?: string;
    bio?: string;
    location?: string;
    website?: string;
    email?: string;
    joinedDate?: string;
    isVerified?: boolean;
  };
  stats?: ProfileStat[];
  badges?: ProfileBadge[];
  actions?: Array<{
    label: string;
    onClick: () => void;
    variant?: "default" | "outline" | "secondary" | "ghost" | "destructive";
    icon?: React.ReactNode;
  }>;
  coverImage?: string;
  isFollowing?: boolean;
  showEmail?: boolean;
  showJoinedDate?: boolean;
}

const sizeAvatar: Record<string, string> = {
  sm: "h-12 w-12",
  md: "h-16 w-16",
  lg: "h-20 w-20",
};

const sizeStats: Record<string, string> = {
  sm: "text-sm",
  md: "text-base",
  lg: "text-lg",
};

function UserProfileCard({
  user,
  stats,
  badges,
  actions,
  coverImage,
  isFollowing,
  showEmail = false,
  showJoinedDate = false,
  size = "md",
  className,
  ...props
}: UserProfileCardProps) {
  const initials = user.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  const avatarSize = sizeAvatar[size as keyof typeof sizeAvatar] ?? sizeAvatar.md;
  const statSize = sizeStats[size as keyof typeof sizeStats] ?? sizeStats.md;

  return (
    <Card className={cn(profileCardVariants({ size }), "overflow-hidden", className)} {...props}>
      {coverImage && (
        <div className="h-24 overflow-hidden bg-muted sm:h-32">
          <img
            src={coverImage}
            alt={`${user.name}'s cover`}
            className="h-full w-full object-cover"
          />
        </div>
      )}

      <CardHeader className="relative pb-0">
        <div className={cn("relative", coverImage ? "-mt-10" : "")}>
          <Avatar className={cn(avatarSize, "border-4 border-background")}>
            <AvatarImage src={user.avatar} alt={user.name} />
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>
          {user.isVerified && (
            <div className="absolute -bottom-0.5 -right-0.5 rounded-full bg-primary text-primary-foreground p-0.5">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-label="Verified"
              >
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          )}
        </div>
      </CardHeader>

      <CardContent className="pt-3 space-y-3">
        <div>
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="font-semibold text-base">{user.name}</h3>
            {user.username && (
              <span className="text-sm text-muted-foreground">@{user.username}</span>
            )}
          </div>
          {user.bio && <p className="mt-1 text-sm text-muted-foreground line-clamp-2">{user.bio}</p>}
        </div>

        {badges && badges.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {badges.map((badge, i) => (
              <Badge key={i} variant={badge.variant ?? "secondary"} className="text-xs">
                {badge.label}
              </Badge>
            ))}
          </div>
        )}

        <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
          {user.location && (
            <span className="flex items-center gap-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              {user.location}
            </span>
          )}
          {user.website && (
            <a
              href={user.website}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 hover:text-primary transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <circle cx="12" cy="12" r="10" />
                <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
              </svg>
              Website
            </a>
          )}
          {showEmail && user.email && (
            <span className="flex items-center gap-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <rect width="20" height="16" x="2" y="4" rx="2" />
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
              </svg>
              {user.email}
            </span>
          )}
          {showJoinedDate && user.joinedDate && (
            <span className="flex items-center gap-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
                <line x1="16" x2="16" y1="2" y2="6" />
                <line x1="8" x2="8" y1="2" y2="6" />
                <line x1="3" x2="21" y1="10" y2="10" />
              </svg>
              Joined {user.joinedDate}
            </span>
          )}
        </div>

        {stats && stats.length > 0 && (
          <>
            <Separator />
            <div className="flex items-center justify-around">
              {stats.map((stat, i) => (
                <div key={i} className="text-center">
                  <p className={cn("font-semibold", statSize)}>{stat.value}</p>
                  <p className="text-xs text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </div>
          </>
        )}

        {actions && actions.length > 0 && (
          <div className="flex flex-wrap gap-2 pt-1">
            {isFollowing !== undefined && (
              <Button
                variant={isFollowing ? "outline" : "default"}
                size="sm"
                className="flex-1"
                onClick={actions[0]?.onClick}
              >
                {isFollowing ? "Following" : "Follow"}
              </Button>
            )}
            {actions.slice(isFollowing !== undefined ? 1 : 0).map((action, i) => (
              <Button
                key={i}
                variant={action.variant ?? "outline"}
                size="sm"
                onClick={action.onClick}
              >
                {action.icon}
                {action.label}
              </Button>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

UserProfileCard.displayName = "UserProfileCard";

export { UserProfileCard, profileCardVariants };
