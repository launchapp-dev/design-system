import * as React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/Card";
import { Button } from "../../components/Button";
import { Badge } from "../../components/Badge";
import { RadioGroup, RadioGroupItem } from "../../components/RadioGroup";
import { Label } from "../../components/Label";
import { Separator } from "../../components/Separator";
import { CreditCard, Check } from "lucide-react";
import { cn } from "../../lib/utils";

export type PaymentMethodType = "card" | "bank_account" | "paypal";

export interface PaymentMethod {
  id: string;
  type: PaymentMethodType;
  brand?: string;
  last4?: string;
  expiryMonth?: number;
  expiryYear?: number;
  isDefault?: boolean;
  name?: string;
}

export interface PaymentMethodCardProps extends React.HTMLAttributes<HTMLDivElement> {
  methods: PaymentMethod[];
  selectedId?: string;
  onSelect?: (method: PaymentMethod) => void;
  onManage?: (method: PaymentMethod) => void;
  onSetDefault?: (method: PaymentMethod) => void;
  onAddNew?: () => void;
  showLabels?: boolean;
}

function PaymentMethodCard({
  methods,
  selectedId,
  onSelect,
  onManage,
  onSetDefault,
  onAddNew,
  showLabels = true,
  className,
  ...props
}: PaymentMethodCardProps) {
  const isRadio = onSelect != null;

  return (
    <div className={cn("space-y-4", className)} {...props}>
      <RadioGroup
        value={selectedId}
        onValueChange={(id) => {
          const m = methods.find((x) => x.id === id);
          if (m) onSelect?.(m);
        }}
        disabled={!onSelect}
        className="space-y-3"
      >
        {methods.map((method) => {
          const isSelected = selectedId === method.id;
          const label = method.brand
            ? `${method.brand} •••• ${method.last4}`
            : method.type === "paypal"
            ? "PayPal"
            : `Account •••• ${method.last4}`;

          return (
            <div key={method.id}>
              <RadioGroupItem value={method.id} id={method.id} className="peer sr-only" />
              <Label
                htmlFor={method.id}
                className={cn(
                  "flex cursor-pointer items-center justify-between rounded-lg border p-4 transition-colors",
                  "hover:border-primary/50",
                  isRadio && !isSelected && "border-input",
                  isRadio && isSelected && "border-primary bg-primary/5",
                  !isRadio && "border-input cursor-default"
                )}
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                    <CreditCard className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">{label}</span>
                      {method.isDefault && (
                        <Badge variant="secondary" className="text-xs">
                          Default
                        </Badge>
                      )}
                    </div>
                    {method.expiryMonth && (
                      <p className="text-xs text-muted-foreground">
                        Expires {method.expiryMonth.toString().padStart(2, "0")}/{method.expiryYear}
                      </p>
                    )}
                    {method.name && (
                      <p className="text-xs text-muted-foreground">{method.name}</p>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {isSelected && (
                    <div className="flex h-5 w-5 items-center justify-center rounded-full bg-primary">
                      <Check className="h-3 w-3 text-primary-foreground" />
                    </div>
                  )}
                  {onManage && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        onManage(method);
                      }}
                    >
                      {showLabels ? "Manage" : ""}
                    </Button>
                  )}
                </div>
              </Label>
              {!isSelected && !method.isDefault && onSetDefault && (
                <button
                  type="button"
                  onClick={() => onSetDefault(method)}
                  className="ml-14 mt-1 text-xs text-muted-foreground hover:text-primary"
                >
                  Set as default
                </button>
              )}
            </div>
          );
        })}
      </RadioGroup>

      {onAddNew && (
        <>
          <Separator />
          <Button
            variant="outline"
            onClick={onAddNew}
            className="w-full"
          >
            <CreditCard className="mr-2 h-4 w-4" />
            Add payment method
          </Button>
        </>
      )}
    </div>
  );
}

PaymentMethodCard.displayName = "PaymentMethodCard";

export { PaymentMethodCard };
export type { PaymentMethodCardProps, PaymentMethod, PaymentMethodType };
