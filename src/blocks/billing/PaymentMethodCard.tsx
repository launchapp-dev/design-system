import type * as React from "react";
import { Button } from "../../components/Button";
import { Badge } from "../../components/Badge";
import { RadioGroup, RadioGroupItem } from "../../components/RadioGroup";
import { Label } from "../../components/Label";
import { Separator } from "../../components/Separator";
// ── Icons (inline SVG to avoid lucide-react dep in block layer) ──────────────
function CreditCardIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <rect width="20" height="14" x="2" y="5" rx="2" /><line x1="2" y1="10" x2="22" y2="10" />
    </svg>
  );
}
function CheckIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}
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

export interface PaymentMethodCardProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onSelect'> {
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
                    <CreditCardIcon className="h-5 w-5 text-muted-foreground" />
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
                      <CheckIcon className="h-3 w-3 text-primary-foreground" />
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
            <CreditCardIcon className="mr-2 h-4 w-4" />
            Add payment method
          </Button>
        </>
      )}
    </div>
  );
}

PaymentMethodCard.displayName = "PaymentMethodCard";

export { PaymentMethodCard };
