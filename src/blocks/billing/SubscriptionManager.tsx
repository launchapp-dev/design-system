import * as React from "react";
import { cn } from "../../lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/Card";
import { Button } from "../../components/Button";
import { Badge } from "../../components/Badge";
import {
  SelectRoot as Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/Select";

export interface SubscriptionManagerPlan {
  id: string;
  name: string;
  price: string;
  billingCycle: string;
  features?: string[];
}

export interface SubscriptionManagerProps extends React.HTMLAttributes<HTMLDivElement> {
  plans: SubscriptionManagerPlan[];
  currentPlanId: string;
  billingInterval?: "month" | "year";
  onChangePlan?: (planId: string) => void;
  onSubscribe?: (planId: string) => void;
  isLoading?: boolean;
  title?: string;
}

function SubscriptionManager({
  plans,
  currentPlanId,
  billingInterval = "month",
  onChangePlan,
  onSubscribe,
  isLoading,
  title = "Change plan",
  className,
  ...props
}: SubscriptionManagerProps) {
  const [selected, setSelected] = React.useState(currentPlanId);

  function _handleSubscribe() {
    if (selected !== currentPlanId) {
      onSubscribe?.(selected);
    }
  }

  return (
    <div className={cn("space-y-6", className)} {...props}>
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">{title}</h2>
        <Select
          value={billingInterval}
          onValueChange={(_v: string) => {}}
        >
          <SelectTrigger className="w-36">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="month">Monthly</SelectItem>
            <SelectItem value="year">Yearly</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {plans.map((plan) => {
          const isCurrent = plan.id === currentPlanId;
          const isSelected = selected === plan.id;

          return (
            <Card
              key={plan.id}
              className={cn(
                "relative cursor-pointer transition-colors",
                isSelected && !isCurrent && "border-primary ring-2 ring-primary/20",
                isCurrent && "border-primary/50"
              )}
              onClick={() => {
                setSelected(plan.id);
                if (!isCurrent) onChangePlan?.(plan.id);
              }}
            >
              {isCurrent && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <Badge variant="default" className="px-3">
                    Current plan
                  </Badge>
                </div>
              )}
              <CardHeader className="pb-2">
                <CardTitle className="text-base">{plan.name}</CardTitle>
                <div className="flex items-baseline gap-1">
                  <span className="text-2xl font-bold">{plan.price}</span>
                  <span className="text-sm text-muted-foreground">/ {billingInterval === "month" ? "mo" : "yr"}</span>
                </div>
                <p className="text-xs text-muted-foreground">{plan.billingCycle}</p>
              </CardHeader>
              <CardContent className="space-y-3">
                {plan.features && plan.features.length > 0 && (
                  <ul className="space-y-1.5">
                    {plan.features.slice(0, 4).map((f) => (
                      <li key={f} className="flex items-center gap-2 text-sm">
                        <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                        {f}
                      </li>
                    ))}
                    {plan.features.length > 4 && (
                      <li className="text-xs text-muted-foreground">
                        + {plan.features.length - 4} more
                      </li>
                    )}
                  </ul>
                )}
                {!isCurrent && onSubscribe && (
                  <Button
                    className="w-full"
                    variant={isSelected ? "default" : "outline"}
                    disabled={isLoading}
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelected(plan.id);
                      onSubscribe(plan.id);
                    }}
                  >
                    {isSelected ? "Select plan" : "Select"}
                  </Button>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

SubscriptionManager.displayName = "SubscriptionManager";

export { SubscriptionManager };
