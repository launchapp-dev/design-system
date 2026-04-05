import * as React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../../components/Card";
import { Badge } from "../../components/Badge";
import { Button } from "../../components/Button";
import { Progress } from "../../components/Progress";
import { Separator } from "../../components/Separator";
import { cn } from "../../lib/utils";

export type SubscriptionStatus =
  | "active"
  | "trialing"
  | "canceled"
  | "past_due"
  | "paused"
  | "incomplete";

export interface PlanDetails {
  id: string;
  name: string;
  description?: string;
  price: string;
  billingCycle: string;
  features?: string[];
}

export interface UsageMeter {
  id: string;
  label: string;
  used: number;
  total: number;
  unit: string;
  warningThreshold?: number;
}

export interface BillingOverviewProps extends React.HTMLAttributes<HTMLDivElement> {
  plan: PlanDetails;
  status: SubscriptionStatus;
  statusLabel?: string;
  currentPeriodStart?: string;
  currentPeriodEnd?: string;
  usage?: UsageMeter[];
  cancelAtPeriodEnd?: boolean;
  onUpgrade?: () => void;
  onManage?: () => void;
  onCancel?: () => void;
  onReactivate?: () => void;
  showUsage?: boolean;
}

const statusBadgeVariant: Record<SubscriptionStatus, "default" | "secondary" | "destructive" | "outline"> = {
  active: "default",
  trialing: "secondary",
  canceled: "outline",
  past_due: "destructive",
  paused: "secondary",
  incomplete: "destructive",
};

const defaultStatusLabel: Record<SubscriptionStatus, string> = {
  active: "Active",
  trialing: "Trial",
  canceled: "Canceled",
  past_due: "Past due",
  paused: "Paused",
  incomplete: "Incomplete",
};

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function BillingOverview({
  plan,
  status,
  statusLabel,
  currentPeriodStart,
  currentPeriodEnd,
  usage = [],
  cancelAtPeriodEnd = false,
  onUpgrade,
  onManage,
  onCancel,
  onReactivate,
  showUsage = true,
  className,
  ...props
}: BillingOverviewProps) {
  const displayStatusLabel = statusLabel || defaultStatusLabel[status];
  const isTrialing = status === "trialing";
  const isCanceled = status === "canceled";
  const isPastDue = status === "past_due";
  const isPaused = status === "paused";
  const isActive = status === "active";

  return (
    <div className={cn("space-y-6", className)} {...props}>
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2 flex-wrap">
                <CardTitle>{plan.name}</CardTitle>
                <Badge variant={statusBadgeVariant[status]}>{displayStatusLabel}</Badge>
              </div>
              {plan.description && <CardDescription>{plan.description}</CardDescription>}
            </div>
            <div className="text-left sm:text-right">
              <div className="text-2xl font-bold">{plan.price}</div>
              <div className="text-sm text-muted-foreground">{plan.billingCycle}</div>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Period info */}
          {(currentPeriodStart || currentPeriodEnd) && (
            <div className="flex items-center gap-4 text-sm">
              {currentPeriodStart && (
                <div>
                  <span className="text-muted-foreground">Started: </span>
                  <span>{formatDate(currentPeriodStart)}</span>
                </div>
              )}
              {currentPeriodEnd && (
                <div>
                  <span className="text-muted-foreground">{isCanceled ? "Ends: " : "Renews: "}</span>
                  <span>{formatDate(currentPeriodEnd)}</span>
                </div>
              )}
            </div>
          )}

          {/* Cancellation warning */}
          {cancelAtPeriodEnd && isActive && (
            <div className="rounded-lg border border-destructive/50 bg-destructive/10 p-3 text-sm">
              <span className="font-medium text-destructive">Your subscription will cancel</span>
              {" "}
              <span className="text-muted-foreground">on {currentPeriodEnd ? formatDate(currentPeriodEnd) : "the end of this period"}.</span>
            </div>
          )}

          {/* Past due warning */}
          {isPastDue && (
            <div className="rounded-lg border border-destructive/50 bg-destructive/10 p-3 text-sm">
              <span className="font-medium text-destructive">Payment failed</span>
              {" "}
              <span className="text-muted-foreground">Please update your payment method to continue using all features.</span>
            </div>
          )}

          {/* Trial info */}
          {isTrialing && currentPeriodEnd && (
            <div className="rounded-lg border border-primary/50 bg-primary/10 p-3 text-sm">
              <span className="font-medium text-primary">You're on a trial</span>
              {" "}
              <span className="text-muted-foreground">Your trial ends on {formatDate(currentPeriodEnd)}.</span>
            </div>
          )}

          {/* Features */}
          {plan.features && plan.features.length > 0 && (
            <>
              <Separator />
              <div>
                <h4 className="text-sm font-medium mb-3">Included features</h4>
                <ul className="grid gap-2 sm:grid-cols-2">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <svg
                        className="h-4 w-4 text-primary flex-shrink-0"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </>
          )}

          {/* Usage meters */}
          {showUsage && usage.length > 0 && (
            <>
              <Separator />
              <div className="space-y-4">
                <h4 className="text-sm font-medium">Current usage</h4>
                {usage.map((meter) => {
                  const pct = Math.min(Math.round((meter.used / meter.total) * 100), 100);
                  const isWarning = meter.warningThreshold && pct >= meter.warningThreshold;
                  return (
                    <div key={meter.id} className="space-y-1.5">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">{meter.label}</span>
                        <span className={cn(isWarning && "text-destructive font-medium")}>
                          {meter.used} / {meter.total} {meter.unit}
                        </span>
                      </div>
                      <Progress
                        value={pct}
                        size="sm"
                        className={isWarning ? "[&>div]:bg-destructive" : undefined}
                        aria-label={`${meter.label} usage: ${pct}%`}
                      />
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </CardContent>

        <CardFooter className="flex flex-wrap gap-2">
          {(isActive || isTrialing) && !cancelAtPeriodEnd && (
            <>
              <Button onClick={onManage} variant="outline">
                Manage subscription
              </Button>
              <Button onClick={onUpgrade}>Upgrade</Button>
            </>
          )}
          {cancelAtPeriodEnd && (
            <Button onClick={onReactivate}>Reactivate subscription</Button>
          )}
          {(isCanceled || isPaused) && (
            <Button onClick={onReactivate}>Reactivate</Button>
          )}
          {isPastDue && (
            <Button onClick={onManage}>Update payment method</Button>
          )}
          {isActive && onCancel && !cancelAtPeriodEnd && (
            <Button variant="ghost" onClick={onCancel} className="text-muted-foreground hover:text-destructive">
              Cancel
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}

BillingOverview.displayName = "BillingOverview";

export { BillingOverview };
