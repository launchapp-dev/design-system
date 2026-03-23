import * as React from "react";
import { cn } from "../../../lib/utils";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../../components/Card";
import { Button } from "../../../components/Button";
import { Separator } from "../../../components/Separator";
import { Badge } from "../../../components/Badge";

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
  variant?: string;
  currency?: string;
}

export interface ShoppingCartProps extends React.HTMLAttributes<HTMLDivElement> {
  items?: CartItem[];
  taxRate?: number;
  shippingCost?: number;
  freeShippingThreshold?: number;
  onQuantityChange?: (id: string, quantity: number) => void;
  onRemoveItem?: (id: string) => void;
  onCheckout?: () => void;
  currency?: string;
}

function ShoppingCart({
      className,
      items: itemsProp,
      taxRate = 0.08,
      shippingCost = 5.99,
      freeShippingThreshold,
      onQuantityChange,
      onRemoveItem,
      onCheckout,
      currency = "$", ref,
      ...props
    }: ShoppingCartProps & { ref?: React.Ref<HTMLDivElement> }) {
    const [items, setItems] = React.useState<CartItem[]>(itemsProp ?? []);

    React.useEffect(() => {
      if (itemsProp !== undefined) setItems(itemsProp);
    }, [itemsProp]);

    function handleQuantityChange(id: string, delta: number) {
      setItems((prev) =>
        prev.map((item) =>
          item.id === id
            ? { ...item, quantity: Math.max(1, item.quantity + delta) }
            : item
        )
      );
      const item = items.find((i) => i.id === id);
      if (item) onQuantityChange?.(id, Math.max(1, item.quantity + delta));
    }

    function handleRemove(id: string) {
      setItems((prev) => prev.filter((item) => item.id !== id));
      onRemoveItem?.(id);
    }

    const subtotal = items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    const qualifiesForFreeShipping =
      freeShippingThreshold !== undefined && subtotal >= freeShippingThreshold;
    const shipping =
      items.length === 0 ? 0 : qualifiesForFreeShipping ? 0 : shippingCost;
    const tax = subtotal * taxRate;
    const total = subtotal + tax + shipping;
    const itemCount = items.reduce((sum, i) => sum + i.quantity, 0);

    if (items.length === 0) {
      return (
        <Card ref={ref} className={cn("w-full max-w-md", className)} {...props}>
          <CardContent className="flex flex-col items-center justify-center py-16 text-center">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-muted">
              <svg
                className="h-8 w-8 text-muted-foreground"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                />
              </svg>
            </div>
            <p className="text-sm font-medium">Your cart is empty</p>
            <p className="mt-1 text-xs text-muted-foreground">
              Add items to get started.
            </p>
          </CardContent>
        </Card>
      );
    }

    return (
      <Card ref={ref} className={cn("w-full max-w-md", className)} {...props}>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">Shopping Cart</CardTitle>
            <Badge variant="secondary">{itemCount} {itemCount === 1 ? "item" : "items"}</Badge>
          </div>
          {freeShippingThreshold !== undefined && !qualifiesForFreeShipping && (
            <p className="text-xs text-muted-foreground">
              Add {currency}{(freeShippingThreshold - subtotal).toFixed(2)} more for free shipping
            </p>
          )}
          {qualifiesForFreeShipping && (
            <p className="text-xs text-primary font-medium">
              You qualify for free shipping!
            </p>
          )}
        </CardHeader>
        <CardContent className="space-y-4">
          {items.map((item) => (
            <div key={item.id} className="flex gap-3">
              {item.image ? (
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-16 w-16 shrink-0 rounded-md object-cover"
                />
              ) : (
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-md bg-muted text-muted-foreground text-xs">
                  IMG
                </div>
              )}
              <div className="flex flex-1 flex-col justify-between min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <p className="text-sm font-medium leading-tight truncate">
                      {item.name}
                    </p>
                    {item.variant && (
                      <p className="text-xs text-muted-foreground">{item.variant}</p>
                    )}
                  </div>
                  <button
                    type="button"
                    className="shrink-0 text-muted-foreground transition-colors hover:text-destructive focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded"
                    onClick={() => handleRemove(item.id)}
                    aria-label={`Remove ${item.name}`}
                  >
                    <svg
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
                <div className="flex items-center justify-between">
                  <div
                    className="flex items-center rounded-md border"
                    role="group"
                    aria-label="Quantity"
                  >
                    <button
                      type="button"
                      className="flex h-7 w-7 items-center justify-center text-sm transition-colors hover:bg-muted disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-l"
                      onClick={() => handleQuantityChange(item.id, -1)}
                      disabled={item.quantity <= 1}
                      aria-label="Decrease quantity"
                    >
                      −
                    </button>
                    <span
                      className="flex h-7 w-8 items-center justify-center text-xs font-medium"
                      aria-live="polite"
                      aria-atomic="true"
                    >
                      {item.quantity}
                    </span>
                    <button
                      type="button"
                      className="flex h-7 w-7 items-center justify-center text-sm transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-r"
                      onClick={() => handleQuantityChange(item.id, 1)}
                      aria-label="Increase quantity"
                    >
                      +
                    </button>
                  </div>
                  <span className="text-sm font-semibold">
                    {currency}{(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          ))}
          <Separator />
          <div className="space-y-2 text-sm">
            <div className="flex justify-between text-muted-foreground">
              <span>Subtotal</span>
              <span>{currency}{subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-muted-foreground">
              <span>Tax ({(taxRate * 100).toFixed(0)}%)</span>
              <span>{currency}{tax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-muted-foreground">
              <span>Shipping</span>
              <span>
                {shipping === 0 ? (
                  <span className="text-primary font-medium">Free</span>
                ) : (
                  `${currency}${shipping.toFixed(2)}`
                )}
              </span>
            </div>
            <Separator />
            <div className="flex justify-between font-semibold text-base">
              <span>Total</span>
              <span>{currency}{total.toFixed(2)}</span>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full" onClick={onCheckout}>
            Proceed to Checkout
          </Button>
        </CardFooter>
      </Card>
    );
  }

ShoppingCart.displayName = "ShoppingCart";

export { ShoppingCart };
