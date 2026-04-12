import type * as React from "react";
import { cn } from "../../lib/utils";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from "../../components/Card";
import { Badge } from "../../components/Badge";
import { Button } from "../../components/Button";
import { Progress } from "../../components/Progress";

// Inline SVG icons (avoiding lucide-react dependency)
function CheckIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

function CreditCardIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <rect width="20" height="14" x="2" y="5" rx="2" />
      <line x1="2" x2="22" y1="10" y2="10" />
    </svg>
  );
}

function AlertCircleIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <circle cx="12" cy="12" r="10" />
      <line x1="12" x2="12" y1="8" y2="12" />
      <line x1="12" x2="12.01" y1="16" y2="16" />
    </svg>
  );
}

export type BillingStatus =
  | "active"
  | "trialing"
  | "canceled"
  | "past_due"
  | "paused"
  | "incomplete";

export interface BillingFeature {
  name: string;
  included: boolean;
}

export interface BillingUsage {
  label: string;
  used: number;
  total: number;
  unit?: string;
}

export interface BillingCardProps extends React.HTMLAttributes<HTMLDivElement> {
  planName: string;
  planDescription?: string;
  price: string;
  billingPeriod: string;
  status?: BillingStatus;
  statusLabel?: string;
  features?: BillingFeature[];
  usage?: BillingUsage;
  nextBillingDate?: string;
  paymentMethod?: {
    type: "card" | "paypal" | "bank";
    last4?: string;
    brand?: string;
    expiry?: string;
  };
  onUpgrade?: () => void;
  onManage?: () => void;
  onUpdatePayment?: () => void;
  compact?: boolean;
}

const statusConfig: Record<
  BillingStatus,
  { variant: "default" | "secondary" | "destructive" | "outline"; label: string }
> = {
  active: { variant: "default", label: "Active" },
  trialing: { variant: "secondary", label: "Trial" },
  canceled: { variant: "outline", label: "Canceled" },
  past_due: { variant: "destructive", label: "Past Due" },
  paused: { variant: "secondary", label: "Paused" },
  incomplete: { variant: "destructive", label: "Incomplete" },
};

function BillingCard({
  planName,
  planDescription,
  price,
  billingPeriod,
  status = "active",
  statusLabel,
  features = [],
  usage,
  nextBillingDate,
  paymentMethod,
  onUpgrade,
  onManage,
  onUpdatePayment,
  compact = false,
  className,
  ...props
}: BillingCardProps) {
  const statusConfigItem = statusConfig[status];
  const displayStatusLabel = statusLabel || statusConfigItem.label;
  const usagePercent = usage ? Math.min(Math.round((usage.used / usage.total) * 100), 100) : 0;

  if (compact) {
    return (
      <Card className={cn("overflow-hidden", className)} {...props}>
        <CardHeader className="pb-3">
          <div className="flex flex-col sm:flex-row items-start justify-between gap-2">
            <div>
              <CardTitle className="text-base">{planName}</CardTitle>
              {planDescription && (
                <CardDescription className="text-xs">{planDescription}</CardDescription>
              )}
            </div>
            <Badge variant={statusConfigItem.variant}>{displayStatusLabel}</Badge>
          </div>
        </CardHeader>
        <CardContent className="pb-3">
          <div className="flex items-baseline gap-1">
            <span className="text-2xl font-bold">{price}</span>
            <span className="text-sm text-muted-foreground">/{billingPeriod}</span>
          </div>
          {usage && (
            <div className="mt-3 space-y-1.5">
              <div className="flex justify-between text-xs">
                <span className="text-muted-foreground">{usage.label}</span>
                <span>
                  {usage.used} / {usage.total} {usage.unit || ""}
                </span>
              </div>
              <Progress value={usagePercent} size="sm" />
            </div>
          )}
        </CardContent>
        {(onManage || onUpgrade) && (
          <CardFooter className="flex gap-2 pt-0">
            {onManage && (
              <Button variant="outline" size="sm" className="flex-1" onClick={onManage}>
                Manage
              </Button>
            )}
            {onUpgrade && (
              <Button size="sm" className="flex-1" onClick={onUpgrade}>
                Upgrade
              </Button>
            )}
          </CardFooter>
        )}
      </Card>
    );
  }

  return (
    <Card className={cn("overflow-hidden", className)} {...props}>
      <CardHeader>
        <div className="flex flex-col sm:flex-row items-start justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <CardTitle>{planName}</CardTitle>
              <Badge variant={statusConfigItem.variant}>{displayStatusLabel}</Badge>
            </div>
            {planDescription && <CardDescription>{planDescription}</CardDescription>}
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold">{price}</div>
            <div className="text-sm text-muted-foreground">/{billingPeriod}</div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Features */}
        {features.length > 0 && (
          <div className="space-y-2">
            <h4 className="text-sm font-medium">Included features</h4>
            <ul className="space-y-2">
              {features.map((feature, index) => (
                <li key={index} className="flex items-center gap-2 text-sm">
                  <CheckIcon
                    className={cn(
                      "h-4 w-4",
                      feature.included ? "text-primary" : "text-muted-foreground/30",
                    )}
                  />
                  <span className={cn(!feature.included && "text-muted-foreground line-through")}>
                    {feature.name}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Usage */}
        {usage && (
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="font-medium">{usage.label}</span>
              <span className="text-muted-foreground">
                {usage.used} / {usage.total} {usage.unit || ""}
              </span>
            </div>
            <Progress value={usagePercent} />
            {usagePercent >= 80 && (
              <p className="flex items-center gap-1.5 text-xs text-warning">
                <AlertCircleIcon className="h-3.5 w-3.5" />
                You&apos;re approaching your limit
              </p>
            )}
          </div>
        )}

        {/* Payment method */}
        {paymentMethod && (
          <div className="flex items-center gap-3 rounded-lg border p-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
              <CreditCardIcon className="h-5 w-5 text-muted-foreground" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium">
                {paymentMethod.brand || "Card"} ending in {paymentMethod.last4}
              </p>
              {paymentMethod.expiry && (
                <p className="text-xs text-muted-foreground">Expires {paymentMethod.expiry}</p>
              )}
            </div>
            {onUpdatePayment && (
              <Button variant="ghost" size="sm" onClick={onUpdatePayment}>
                Update
              </Button>
            )}
          </div>
        )}

        {/* Next billing */}
        {nextBillingDate && status === "active" && (
          <p className="text-sm text-muted-foreground">
            Next billing date:{" "}
            <span className="font-medium text-foreground">{nextBillingDate}</span>
          </p>
        )}
      </CardContent>

      <CardFooter className="flex gap-2">
        {onManage && (
          <Button variant="outline" className="flex-1" onClick={onManage}>
            Manage subscription
          </Button>
        )}
        {onUpgrade && (
          <Button className="flex-1" onClick={onUpgrade}>
            Upgrade plan
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}

BillingCard.displayName = "BillingCard";

export { BillingCard };
