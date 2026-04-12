import * as React from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetFooter } from "@/components/Sheet";
import { Button } from "@/components/Button";
import { Badge } from "@/components/Badge";
import { Input } from "@/components/Input";
import { Separator } from "@/components/Separator";

export interface DrawerCartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
  currency?: string;
  maxQuantity?: number;
}

export interface CartDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  items: DrawerCartItem[];
  onUpdateQuantity?: (itemId: string, quantity: number) => void;
  onRemoveItem?: (itemId: string) => void;
  onClearCart?: () => void;
  onCheckout?: () => void;
  currency?: string;
  shippingCost?: number;
  taxRate?: number;
  discount?: { code: string; amount: number };
  loading?: boolean;
  emptyMessage?: string;
  checkoutLabel?: string;
  continueShoppingLabel?: string;
}

function CartDrawerItem({
  item,
  onUpdateQuantity,
  onRemoveItem,
  currency = "$",
}: {
  item: DrawerCartItem;
  onUpdateQuantity?: (id: string, qty: number) => void;
  onRemoveItem?: (id: string) => void;
  currency?: string;
}) {
  const [qty, setQty] = React.useState(item.quantity);
  const maxQty = item.maxQuantity ?? 99;

  React.useEffect(() => {
    setQty(item.quantity);
  }, [item.quantity]);

  const handleChange = (val: string) => {
    const parsed = parseInt(val, 10);
    if (!Number.isNaN(parsed) && parsed >= 0 && parsed <= maxQty) {
      setQty(parsed);
      onUpdateQuantity?.(item.id, parsed);
    }
  };

  return (
    <div className="flex gap-3 py-3">
      <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-md bg-muted">
        {item.image ? (
          <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-muted-foreground text-xs">
            No img
          </div>
        )}
      </div>
      <div className="flex flex-1 flex-col justify-between">
        <div className="flex flex-col sm:flex-row items-start justify-between gap-2">
          <p className="text-sm font-medium leading-tight line-clamp-2">{item.name}</p>
          <button
            type="button"
            onClick={() => onRemoveItem?.(item.id)}
            className="shrink-0 text-muted-foreground hover:text-destructive transition-colors"
            aria-label={`Remove ${item.name}`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M18 6 6 18" />
              <path d="m6 6 12 12" />
            </svg>
          </button>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => handleChange(String(Math.max(1, qty - 1)))}
              disabled={qty <= 1}
              className="flex h-7 w-7 items-center justify-center rounded border bg-background text-sm transition-colors hover:bg-accent disabled:opacity-50"
              aria-label="Decrease quantity"
            >
              −
            </button>
            <Input
              type="number"
              min={1}
              max={maxQty}
              value={qty}
              onChange={(e) => handleChange(e.target.value)}
              className="h-7 w-12 text-center text-sm"
              aria-label="Quantity"
            />
            <button
              type="button"
              onClick={() => handleChange(String(Math.min(maxQty, qty + 1)))}
              disabled={qty >= maxQty}
              className="flex h-7 w-7 items-center justify-center rounded border bg-background text-sm transition-colors hover:bg-accent disabled:opacity-50"
              aria-label="Increase quantity"
            >
              +
            </button>
          </div>
          <p className="text-sm font-medium">
            {currency}
            {(item.price * qty).toFixed(2)}
          </p>
        </div>
      </div>
    </div>
  );
}

function CartDrawer({
  open,
  onOpenChange,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onCheckout,
  currency = "$",
  shippingCost,
  taxRate,
  discount,
  loading = false,
  emptyMessage = "Your cart is empty",
  checkoutLabel = "Checkout",
  continueShoppingLabel = "Continue shopping",
}: CartDrawerProps) {
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const discountAmount = discount?.amount ?? 0;
  const effectiveSubtotal = subtotal - discountAmount;
  const tax = taxRate !== undefined ? effectiveSubtotal * taxRate : undefined;
  const total = tax !== undefined && shippingCost !== undefined
    ? effectiveSubtotal + tax + shippingCost
    : tax !== undefined
      ? effectiveSubtotal + tax
      : effectiveSubtotal;

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        className="flex w-full flex-col sm:max-w-md"
        aria-describedby="cart-description"
      >
        <SheetHeader className="space-y-0 pb-4">
          <div className="flex items-center justify-between">
            <SheetTitle className="text-lg flex items-center gap-2">
              Shopping Cart
              {items.length > 0 && (
                <Badge variant="secondary" className="ml-1">
                  {items.reduce((s, i) => s + i.quantity, 0)}
                </Badge>
              )}
            </SheetTitle>
          </div>
          <SheetDescription id="cart-description" className="sr-only">
            Your shopping cart with {items.length} items
          </SheetDescription>
        </SheetHeader>

        {items.length === 0 && !loading ? (
          <div className="flex flex-1 flex-col items-center justify-center text-center">
            <svg
              className="mb-4 h-14 w-14 text-muted-foreground/50"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <circle cx="8" cy="21" r="1" />
              <circle cx="19" cy="21" r="1" />
              <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
            </svg>
            <p className="text-muted-foreground mb-4">{emptyMessage}</p>
            <Button variant="outline" size="sm" onClick={() => onOpenChange(false)}>
              {continueShoppingLabel}
            </Button>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto">
              {loading ? (
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="flex gap-3">
                      <div className="h-16 w-16 animate-pulse rounded-md bg-muted shrink-0" />
                      <div className="flex-1 space-y-2">
                        <div className="h-4 w-3/4 animate-pulse rounded bg-muted" />
                        <div className="h-3 w-1/2 animate-pulse rounded bg-muted" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div>
                  {items.map((item) => (
                    <CartDrawerItem
                      key={item.id}
                      item={item}
                      onUpdateQuantity={onUpdateQuantity}
                      onRemoveItem={onRemoveItem}
                      currency={currency}
                    />
                  ))}
                </div>
              )}
            </div>

            <div className="border-t pt-4 mt-4 space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Subtotal</span>
                <span>
                  {currency}
                  {subtotal.toFixed(2)}
                </span>
              </div>

              {discountAmount > 0 && discount && (
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="text-xs">{discount.code}</Badge>
                    <span className="text-muted-foreground">Discount</span>
                  </div>
                  <span className="text-success">
                    -{currency}
                    {discountAmount.toFixed(2)}
                  </span>
                </div>
              )}

              {shippingCost !== undefined && (
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Shipping</span>
                  <span>
                    {shippingCost === 0 ? "Free" : `${currency}${shippingCost.toFixed(2)}`}
                  </span>
                </div>
              )}

              {tax !== undefined && (
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">
                    Tax {taxRate ? `(${(taxRate * 100).toFixed(0)}%)` : ""}
                  </span>
                  <span>
                    {currency}
                    {tax.toFixed(2)}
                  </span>
                </div>
              )}

              <Separator />

              <div className="flex items-center justify-between font-semibold">
                <span>Total</span>
                <span>
                  {currency}
                  {total.toFixed(2)}
                </span>
              </div>

              <SheetFooter className="flex-col gap-2 pt-2">
                <Button className="w-full" onClick={onCheckout} size="lg">
                  {checkoutLabel}
                </Button>
                <div className="flex w-full items-center justify-between">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onOpenChange(false)}
                  >
                    {continueShoppingLabel}
                  </Button>
                  {items.length > 0 && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={onClearCart}
                      className="text-destructive hover:text-destructive"
                    >
                      Clear cart
                    </Button>
                  )}
                </div>
              </SheetFooter>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}

CartDrawer.displayName = "CartDrawer";

export { CartDrawer };
