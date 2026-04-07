import * as React from "react";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader } from "@/components/Card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/Avatar";
import { Badge } from "@/components/Badge";
import { Button } from "@/components/Button";
import { Separator } from "@/components/Separator";

function MapPinIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
    </svg>
  );
}
function LinkIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" /><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
    </svg>
  );
}
function MailIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <rect width="20" height="16" x="2" y="4" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}
function TwitterIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}
function GithubIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
    </svg>
  );
}
function LinkedinIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

export interface SocialLink {
  platform: "twitter" | "github" | "linkedin" | "website" | string;
  url: string;
  label?: string;
}

export interface UserProfileCardProps extends React.HTMLAttributes<HTMLDivElement> {
  name: string;
  role?: string;
  email?: string;
  bio?: string;
  avatar?: string;
  avatarFallback?: string;
  location?: string;
  website?: string;
  socialLinks?: SocialLink[];
  tags?: string[];
  onEdit?: () => void;
  onMessage?: () => void;
  title?: string;
}

const socialIcon = (platform: string) => {
  switch (platform) {
    case "twitter": return <TwitterIcon className="h-4 w-4" />;
    case "github": return <GithubIcon className="h-4 w-4" />;
    case "linkedin": return <LinkedinIcon className="h-4 w-4" />;
    default: return <LinkIcon className="h-4 w-4" />;
  }
};

function UserProfileCard({
  name,
  role,
  email,
  bio,
  avatar,
  avatarFallback,
  location,
  website,
  socialLinks = [],
  tags = [],
  onEdit,
  onMessage,
  title,
  className,
  ...props
}: UserProfileCardProps) {
  const initials = (avatarFallback ?? name).split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase();

  return (
    <Card className={cn("", className)} {...props}>
      <CardHeader className="pb-4">
        <div className="flex items-start gap-4">
          <Avatar className="h-16 w-16 text-lg">
            {avatar && <AvatarImage src={avatar} alt={name} />}
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>
          <div className="flex-1 space-y-1 min-w-0">
            <h3 className="text-base font-semibold leading-none">{name}</h3>
            {role && <p className="text-sm text-muted-foreground">{role}</p>}
            {email && (
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <MailIcon className="h-3.5 w-3.5 shrink-0" />
                <a href={`mailto:${email}`} className="hover:underline truncate">{email}</a>
              </div>
            )}
            {location && (
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <MapPinIcon className="h-3.5 w-3.5 shrink-0" />
                <span>{location}</span>
              </div>
            )}
          </div>
        </div>
      </CardHeader>

      {(bio || tags.length > 0) && (
        <>
          <Separator />
          <CardContent className={cn("pt-4", !bio && "pb-4")}>
            {bio && <p className="text-sm text-muted-foreground leading-relaxed">{bio}</p>}
            {tags.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mt-3">
                {tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="text-xs h-5">{tag}</Badge>
                ))}
              </div>
            )}
          </CardContent>
        </>
      )}

      {(socialLinks.length > 0 || website || onEdit || onMessage) && (
        <>
          <Separator />
          <CardContent className="pt-4">
            {(socialLinks.length > 0 || website) && (
              <div className="flex flex-wrap items-center gap-2 mb-3">
                {website && (
                  <a href={website} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground">
                    <LinkIcon className="h-4 w-4" />
                    <span className="underline">Website</span>
                  </a>
                )}
                {socialLinks.map((link) => (
                  <a
                    key={link.url}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground"
                    aria-label={link.label ?? link.platform}
                  >
                    {socialIcon(link.platform)}
                    <span className="underline">{link.label ?? link.platform}</span>
                  </a>
                ))}
              </div>
            )}
            {(onEdit || onMessage) && (
              <div className="flex gap-2">
                {onMessage && <Button size="sm" onClick={onMessage}>Message</Button>}
                {onEdit && <Button variant="outline" size="sm" onClick={onEdit}>Edit profile</Button>}
              </div>
            )}
          </CardContent>
        </>
      )}
    </Card>
  );
}

UserProfileCard.displayName = "UserProfileCard";

export { UserProfileCard };
