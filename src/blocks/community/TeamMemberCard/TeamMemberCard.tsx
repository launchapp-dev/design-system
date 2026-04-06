import type * as React from "react";
import { cva, } from "class-variance-authority";
import { cn } from "../../../lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "../../../components/Avatar";
import { Badge } from "../../../components/Badge";
import { Button } from "../../../components/Button";
import { Card, CardContent } from "../../../components/Card";

// ── Social icon helpers ───────────────────────────────────────────────────────

function TwitterIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={cn("h-4 w-4", className)}>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={cn("h-4 w-4", className)}>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function GitHubIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={cn("h-4 w-4", className)}>
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
    </svg>
  );
}

function GlobeIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={cn("h-4 w-4", className)}>
      <circle cx="12" cy="12" r="10" />
      <path d="M2 12h20" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  );
}

// ── Types ─────────────────────────────────────────────────────────────────────

export type SocialNetwork = "twitter" | "linkedin" | "github" | "website";

export interface SocialLink {
  network: SocialNetwork;
  href: string;
  label?: string;
}

export interface TeamMemberCardProps extends React.HTMLAttributes<HTMLDivElement> {
  name: string;
  role: string;
  department?: string;
  bio?: string;
  avatar?: string;
  /** Initials used when avatar image fails to load */
  initials?: string;
  socialLinks?: SocialLink[];
  /** Additional tags / skills */
  tags?: string[];
  variant?: "default" | "horizontal" | "minimal";
}

// ── CVA variants ─────────────────────────────────────────────────────────────

const cardVariants = cva("", {
  variants: {
    variant: {
      default: "flex flex-col items-center text-center p-6",
      horizontal: "flex flex-row items-start gap-5 p-5",
      minimal: "flex flex-col items-center text-center p-4",
    },
  },
  defaultVariants: { variant: "default" },
});

const avatarSizes: Record<string, "sm" | "md" | "lg"> = {
  default: "lg",
  horizontal: "lg",
  minimal: "md",
};

// ── Social icon map ───────────────────────────────────────────────────────────

const socialIcons: Record<SocialNetwork, React.ComponentType<{ className?: string }>> = {
  twitter: TwitterIcon,
  linkedin: LinkedInIcon,
  github: GitHubIcon,
  website: GlobeIcon,
};

const socialLabels: Record<SocialNetwork, string> = {
  twitter: "Twitter / X",
  linkedin: "LinkedIn",
  github: "GitHub",
  website: "Website",
};

// ── Component ─────────────────────────────────────────────────────────────────

export function TeamMemberCard({
  name,
  role,
  department,
  bio,
  avatar,
  initials,
  socialLinks = [],
  tags = [],
  variant = "default",
  className,
  ...props
}: TeamMemberCardProps) {
  const fallback =
    initials ??
    name
      .split(" ")
      .slice(0, 2)
      .map((n) => n[0])
      .join("")
      .toUpperCase();

  const isHorizontal = variant === "horizontal";

  return (
    <Card className={cn("overflow-hidden", className)} {...props}>
      <CardContent className={cn(cardVariants({ variant }))}>
        {/* Avatar */}
        <Avatar
          size={avatarSizes[variant]}
          className={cn("shrink-0 ring-2 ring-border", isHorizontal ? "mt-1" : "mb-4")}
        >
          {avatar && <AvatarImage src={avatar} alt={name} />}
          <AvatarFallback>{fallback}</AvatarFallback>
        </Avatar>

        {/* Info */}
        <div className={cn("min-w-0 flex-1", isHorizontal ? "" : "w-full")}>
          <div className={cn(isHorizontal ? "" : "flex flex-col items-center")}>
            <h3 className="text-base font-semibold leading-tight text-foreground">{name}</h3>
            <p className="mt-0.5 text-sm font-medium text-primary">{role}</p>
            {department && (
              <p className="text-xs text-muted-foreground">{department}</p>
            )}
          </div>

          {bio && variant !== "minimal" && (
            <p
              className={cn(
                "mt-3 text-sm leading-relaxed text-muted-foreground",
                !isHorizontal && "line-clamp-3"
              )}
            >
              {bio}
            </p>
          )}

          {/* Tags */}
          {tags.length > 0 && variant !== "minimal" && (
            <div className={cn("mt-3 flex flex-wrap gap-1.5", !isHorizontal && "justify-center")}>
              {tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
          )}

          {/* Social links */}
          {socialLinks.length > 0 && (
            <div className={cn("mt-4 flex items-center gap-1.5", !isHorizontal && "justify-center")}>
              {socialLinks.map((link) => {
                const Icon = socialIcons[link.network];
                return (
                  <Button
                    key={link.network}
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0 text-muted-foreground hover:text-foreground"
                    asChild
                  >
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={link.label ?? socialLabels[link.network]}
                    >
                      <Icon />
                    </a>
                  </Button>
                );
              })}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

// ── Team grid wrapper ─────────────────────────────────────────────────────────

export interface TeamGridProps extends React.HTMLAttributes<HTMLDivElement> {
  members: TeamMemberCardProps[];
  columns?: 2 | 3 | 4;
  variant?: TeamMemberCardProps["variant"];
  headline?: React.ReactNode;
  subheadline?: React.ReactNode;
}

export function TeamGrid({
  members,
  columns = 3,
  variant = "default",
  headline,
  subheadline,
  className,
  ...props
}: TeamGridProps) {
  const colClass = {
    2: "sm:grid-cols-2",
    3: "sm:grid-cols-2 lg:grid-cols-3",
    4: "sm:grid-cols-2 lg:grid-cols-4",
  }[columns];

  return (
    <div className={cn("w-full", className)} {...props}>
      {(headline ?? subheadline) && (
        <div className="mb-10 text-center">
          {headline && (
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              {headline}
            </h2>
          )}
          {subheadline && (
            <p className="mt-3 text-lg text-muted-foreground">{subheadline}</p>
          )}
        </div>
      )}
      <div className={cn("grid grid-cols-1 gap-6", colClass)}>
        {members.map((member) => (
          <TeamMemberCard key={member.name} {...member} variant={variant} />
        ))}
      </div>
    </div>
  );
}
