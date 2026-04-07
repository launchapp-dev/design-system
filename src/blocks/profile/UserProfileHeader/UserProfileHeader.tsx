import type * as React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/Avatar";
import { Badge } from "@/components/Badge";
import { Button } from "@/components/Button";
import { Card, CardContent, CardHeader } from "@/components/Card";
import { Separator } from "@/components/Separator";
import { cn } from "@/lib/utils";

export interface ProfileStat {
  label: string;
  value: string | number;
}

export interface ProfileAction {
  label: string;
  onClick: () => void;
  variant?: "default" | "outline" | "secondary" | "ghost";
  icon?: React.ReactNode;
}

export interface UserProfileHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  user: {
    name: string;
    username?: string;
    avatar?: string;
    initials?: string;
    role?: string;
    bio?: string;
    location?: string;
    website?: string;
    email?: string;
    joinedDate?: string;
    isVerified?: boolean;
  };
  stats?: ProfileStat[];
  actions?: ProfileAction[];
  coverImage?: string;
  isFollowing?: boolean;
  onFollow?: () => void;
}

function UserProfileHeader({
  user,
  stats = [],
  actions = [],
  coverImage,
  isFollowing = false,
  onFollow,
  className,
  ...props
}: UserProfileHeaderProps) {
  return (
    <div ref={null} className={cn("", className)} {...props}>
      {coverImage && (
        <div
          className="h-32 w-full rounded-t-[--la-radius] bg-cover bg-center"
          style={{ backgroundImage: `url(${coverImage})` }}
          aria-hidden="true"
        />
      )}
      <Card className={cn("rounded-t-none", coverImage && "-mt-6")}>
        <CardHeader className="pb-4">
          <div className="flex flex-col sm:flex-row sm:items-end gap-4">
            <Avatar size="lg" className="shrink-0 ring-4 ring-background">
              {user.avatar && <AvatarImage src={user.avatar} alt={user.name} />}
              <AvatarFallback>{user.initials ?? user.name.slice(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="text-xl font-bold tracking-tight">{user.name}</h2>
                {user.isVerified && (
                  <span className="text-blue-500" aria-label="Verified">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </span>
                )}
                {user.username && (
                  <span className="text-sm text-muted-foreground">@{user.username}</span>
                )}
              </div>
              {user.role && <p className="text-sm text-muted-foreground mt-0.5">{user.role}</p>}
              {user.bio && <p className="text-sm mt-2">{user.bio}</p>}
              <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground flex-wrap">
                {user.location && (
                  <span className="flex items-center gap-1">
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                    {user.location}
                  </span>
                )}
                {user.website && (
                  <span className="flex items-center gap-1">
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <circle cx="12" cy="12" r="10" />
                      <line x1="2" y1="12" x2="22" y2="12" />
                      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                    </svg>
                    <a href={user.website} className="hover:underline">{user.website}</a>
                  </span>
                )}
                {user.joinedDate && (
                  <span className="flex items-center gap-1">
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                      <line x1="16" y1="2" x2="16" y2="6" />
                      <line x1="8" y1="2" x2="8" y2="6" />
                      <line x1="3" y1="10" x2="21" y2="10" />
                    </svg>
                    Joined {user.joinedDate}
                  </span>
                )}
              </div>
            </div>
          </div>
        </CardHeader>
        {stats.length > 0 && (
          <>
            <Separator />
            <CardContent className="pt-4 pb-4">
              <div className="flex gap-8 flex-wrap">
                {stats.map((stat) => (
                  <div key={stat.label} className="text-center">
                    <div className="text-xl font-bold">{stat.value}</div>
                    <div className="text-xs text-muted-foreground">{stat.label}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </>
        )}
        {(actions.length > 0 || onFollow) && (
          <>
            <Separator />
            <CardContent className="pt-4 flex gap-2 flex-wrap">
              {onFollow && (
                <Button variant={isFollowing ? "secondary" : "default"} onClick={onFollow} size="sm">
                  {isFollowing ? "Following" : "Follow"}
                </Button>
              )}
              {actions.map((action) => (
                <Button
                  key={action.label}
                  variant={action.variant ?? "outline"}
                  onClick={action.onClick}
                  size="sm"
                >
                  {action.icon}
                  {action.label}
                </Button>
              ))}
            </CardContent>
          </>
        )}
      </Card>
    </div>
  );
}

UserProfileHeader.displayName = "UserProfileHeader";

export { UserProfileHeader };
export type { ProfileStat, ProfileAction, UserProfileHeaderProps };