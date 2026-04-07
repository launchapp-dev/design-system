import type * as React from "react";
import { cn } from "@/lib/utils";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/Card";
import { Button } from "@/components/Button";
import { Badge } from "@/components/Badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/Avatar";
import { Separator } from "@/components/Separator";

export interface AccountOverviewUser {
  name: string;
  email: string;
  avatarUrl?: string;
  fallbackInitials?: string;
  createdAt?: string;
}

export interface AccountOverviewPlan {
  name: string;
  status: "active" | "canceled" | "past_due";
  renewsAt?: string;
}

export interface AccountOverviewProps extends React.HTMLAttributes<HTMLDivElement> {
  user: AccountOverviewUser;
  plan?: AccountOverviewPlan;
  memberSince?: string;
  onEditProfile?: () => void;
  onManageBilling?: () => void;
  onManageSubscription?: () => void;
  additionalInfo?: React.ReactNode;
}

const CreditCardIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect width="20" height="14" x="2" y="5" rx="2" />
    <line x1="2" x2="22" y1="10" y2="10" />
  </svg>
);

const UserIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

function AccountOverview({
  user,
  plan,
  memberSince,
  onEditProfile,
  onManageBilling,
  onManageSubscription,
  additionalInfo,
  className,
  ...props
}: AccountOverviewProps) {
  const planStatusColors = {
    active: "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400",
    canceled: "bg-muted text-muted-foreground",
    past_due: "bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-400",
  };

  const planStatusLabels = {
    active: "Active",
    canceled: "Canceled",
    past_due: "Past Due",
  };

  return (
    <div className={cn("grid gap-6 lg:grid-cols-3", className)} {...props}>
      <Card className="lg:col-span-2">
        <CardHeader>
          <div className="flex items-center gap-4">
            <Avatar size="lg">
              {user.avatarUrl && <AvatarImage src={user.avatarUrl} alt={user.name} />}
              <AvatarFallback className="text-xl">
                {user.fallbackInitials || user.name.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-xl">{user.name}</CardTitle>
              <CardDescription className="mt-0.5">{user.email}</CardDescription>
              {memberSince && (
                <p className="mt-1 text-xs text-muted-foreground">Member since {memberSince}</p>
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex gap-3">
            <Button variant="outline" size="sm" onClick={onEditProfile}>
              Edit Profile
            </Button>
            <Button variant="outline" size="sm" onClick={onManageBilling}>
              <CreditCardIcon />
              Manage Billing
            </Button>
          </div>
        </CardContent>
      </Card>

      {plan && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Subscription</CardTitle>
            <CardDescription>Current plan details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold">{plan.name}</span>
                <Badge className={planStatusColors[plan.status]}>
                  {planStatusLabels[plan.status]}
                </Badge>
              </div>
              {plan.renewsAt && (
                <p className="mt-1 text-xs text-muted-foreground">
                  {plan.status === "canceled"
                    ? "Access until"
                    : "Renews on"}{" "}
                  {plan.renewsAt}
                </p>
              )}
            </div>
            <Separator />
            <Button variant="outline" size="sm" className="w-full" onClick={onManageSubscription}>
              Manage Subscription
            </Button>
          </CardContent>
        </Card>
      )}

      {additionalInfo && (
        <div className="lg:col-span-3">
          {additionalInfo}
        </div>
      )}
    </div>
  );
}

AccountOverview.displayName = "AccountOverview";

export { AccountOverview };
