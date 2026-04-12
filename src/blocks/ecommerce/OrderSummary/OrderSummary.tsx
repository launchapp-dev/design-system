import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/Card";
import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { Separator } from "@/components/Separator";
import { Badge } from "@/components/Badge";
import { cn } from "@/lib/utils";

export interface SummaryItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
  image?: string;
  currency?: string;
}

export interface OrderSummaryProps extends React.HTMLAttributes<HTMLDivElement> {
  items: SummaryItem[];
  currency?: string;
  subtotalLabel?: string;
  subtotal?: number;
  shippingCost?: number;
  shippingLabel?: string;
  freeShippingThreshold?: number;
  taxRate?: number;
  taxLabel?: string;
  discount?: { code: string; amount: number; description?: string };
  discountInput?: boolean;
  onApplyDiscount?: (code: string) => Promise<number | undefined> | undefined;
  onRemoveDiscount?: () => void;
  totalLabel?: string;
  checkoutLabel?: string;
  secureCheckoutLabel?: string;
  showSecureBadge?: boolean;
  onCheckout?: () => void;
  loading?: boolean;
  itemLabel?: string;
  itemsLabel?: string;
}

function OrderSummary({
  items,
  currency = "$",
  subtotalLabel = "Subtotal",
  subtotal,
  shippingCost,
  shippingLabel = "Shipping",
  freeShippingThreshold,
  taxRate,
  taxLabel,
  discount,
  discountInput = false,
  onApplyDiscount,
  onRemoveDiscount,
  totalLabel = "Total",
  checkoutLabel = "Proceed to checkout",
  secureCheckoutLabel = "Secure checkout",
  showSecureBadge = true,
  onCheckout,
  loading = false,
  itemLabel = "item",
  itemsLabel = "items",
  className,
  ...props
}: OrderSummaryProps) {
  const [discountCode, setDiscountCode] = React.useState(discount?.code ?? "");
  const [discountError, setDiscountError] = React.useState("");
  const [isApplying, setIsApplying] = React.useState(false);

  const computedSubtotal = subtotal ?? items.reduce((s, i) => s + i.price * i.quantity, 0);
  const discountAmount = discount?.amount ?? 0;
  const effectiveSubtotal = computedSubtotal - discountAmount;
  const tax = taxRate !== undefined ? effectiveSubtotal * taxRate : 0;
  const total = effectiveSubtotal + (shippingCost ?? 0) + tax;

  const freeShippingProgress =
    freeShippingThreshold && shippingCost !== undefined && shippingCost > 0
      ? Math.min(1, computedSubtotal / freeShippingThreshold)
      : null;

  const handleApplyDiscount = async () => {
    if (!discountCode.trim()) return;
    setIsApplying(true);
    setDiscountError("");
    try {
      await onApplyDiscount?.(discountCode.trim());
    } catch {
      setDiscountError("Invalid discount code");
    } finally {
      setIsApplying(false);
    }
  };

  return (
    <Card className={cn("", className)} {...props}>
      <CardHeader>
        <CardTitle className="text-lg">Order Summary</CardTitle>
        <CardDescription>
          {items.reduce((s, i) => s + i.quantity, 0)}{" "}
          {items.reduce((s, i) => s + i.quantity, 0) === 1 ? itemLabel : itemsLabel}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3 max-h-64 overflow-y-auto">
          {items.map((item) => (
            <div key={item.id} className="flex items-center gap-3">
              <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-md bg-muted">
                {item.image ? (
                  <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-muted-foreground text-xs">
                    N/A
                  </div>
                )}
                {item.quantity > 1 && (
                  <Badge
                    variant="secondary"
                    className="absolute -right-1.5 -top-1.5 h-5 min-w-5 justify-center px-1 text-xs"
                  >
                    {item.quantity}
                  </Badge>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium line-clamp-1">{item.name}</p>
                <p className="text-xs text-muted-foreground">
                  {currency}
                  {item.price.toFixed(2)} × {item.quantity}
                </p>
              </div>
              <p className="text-sm font-medium shrink-0">
                {currency}
                {(item.price * item.quantity).toFixed(2)}
              </p>
            </div>
          ))}
        </div>

        {freeShippingProgress !== null && (
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>
                {shippingCost === 0
                  ? "You qualify for free shipping!"
                  : `$${((freeShippingThreshold ?? 0) - computedSubtotal).toFixed(2)} away from free shipping`}
              </span>
              <span className="font-medium text-foreground">
                {shippingCost === 0 ? "FREE" : `${currency}${(shippingCost ?? 0).toFixed(2)}`}
              </span>
            </div>
            <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
              <div
                className={cn(
                  "h-full rounded-full transition-all duration-500",
                  freeShippingProgress >= 1 ? "bg-success" : "bg-primary",
                )}
                style={{ width: `${freeShippingProgress * 100}%` }}
                role="progressbar"
                aria-valuenow={Math.round(freeShippingProgress * 100)}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-label="Free shipping progress"
              />
            </div>
          </div>
        )}

        <Separator />

        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">{subtotalLabel}</span>
            <span>
              {currency}
              {computedSubtotal.toFixed(2)}
            </span>
          </div>

          {discountAmount > 0 && discount && (
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="text-xs">
                  {discount.code}
                </Badge>
                {discount.description && (
                  <span className="text-xs text-muted-foreground">{discount.description}</span>
                )}
                {onRemoveDiscount && (
                  <button
                    type="button"
                    onClick={onRemoveDiscount}
                    className="text-xs text-muted-foreground hover:text-destructive transition-colors"
                  >
                    Remove
                  </button>
                )}
              </div>
              <span className="text-success">
                -{currency}
                {discountAmount.toFixed(2)}
              </span>
            </div>
          )}

          {shippingCost !== undefined && (
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">{shippingLabel}</span>
              <span className={cn(shippingCost === 0 && "text-success font-medium")}>
                {shippingCost === 0 ? "FREE" : `${currency}${shippingCost.toFixed(2)}`}
              </span>
            </div>
          )}

          {taxRate !== undefined && (
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">
                {taxLabel ?? `Tax (${(taxRate * 100).toFixed(0)}%)`}
              </span>
              <span>
                {currency}
                {tax.toFixed(2)}
              </span>
            </div>
          )}
        </div>

        {discountInput && !discount && (
          <div className="space-y-2">
            <div className="flex gap-2">
              <Input
                type="text"
                placeholder="Discount code"
                value={discountCode}
                onChange={(e) => {
                  setDiscountCode(e.target.value.toUpperCase());
                  setDiscountError("");
                }}
                className="text-sm"
                aria-label="Discount code"
              />
              <Button
                size="sm"
                variant="outline"
                onClick={handleApplyDiscount}
                disabled={!discountCode.trim() || isApplying}
              >
                {isApplying ? "…" : "Apply"}
              </Button>
            </div>
            {discountError && (
              <p className="text-xs text-destructive" role="alert">
                {discountError}
              </p>
            )}
          </div>
        )}

        <Separator />

        <div className="flex items-center justify-between font-semibold">
          <span>{totalLabel}</span>
          <span>
            {currency}
            {total.toFixed(2)}
          </span>
        </div>
      </CardContent>

      <CardFooter className="flex-col gap-3">
        <Button
          className="w-full"
          size="lg"
          onClick={onCheckout}
          disabled={loading}
        >
          {loading ? "Loading…" : checkoutLabel}
        </Button>
        {showSecureBadge && (
          <div className="flex items-center justify-center gap-1.5 text-xs text-muted-foreground">
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
              <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
            {secureCheckoutLabel}
          </div>
        )}
      </CardFooter>
    </Card>
  );
}

OrderSummary.displayName = "OrderSummary";

export { OrderSummary };
