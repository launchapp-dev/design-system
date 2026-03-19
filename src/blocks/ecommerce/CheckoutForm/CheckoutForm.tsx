import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { cn } from "../../../lib/utils";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "../../../components/Form";
import { Input } from "../../../components/Input";
import { Button } from "../../../components/Button";
import { Label } from "../../../components/Label";
import { RadioGroup, RadioGroupItem } from "../../../components/RadioGroup";
import { Separator } from "../../../components/Separator";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../components/Card";
import { Badge } from "../../../components/Badge";

const checkoutSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(7, "Please enter a valid phone number"),
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  address: z.string().min(1, "Address is required"),
  apartment: z.string().optional(),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required"),
  zip: z.string().min(4, "ZIP code is required"),
  country: z.string().min(1, "Country is required"),
  paymentMethod: z.enum(["card", "paypal"]),
  cardName: z.string().optional(),
  cardNumber: z.string().optional(),
  cardExpiry: z.string().optional(),
  cardCvv: z.string().optional(),
});

export type CheckoutValues = z.infer<typeof checkoutSchema>;

export interface OrderSummaryItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
  image?: string;
  variant?: string;
  currency?: string;
}

export interface CheckoutFormProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onSubmit"> {
  orderItems?: OrderSummaryItem[];
  taxRate?: number;
  shippingCost?: number;
  currency?: string;
  onSubmit?: (values: CheckoutValues) => void | Promise<void>;
  isLoading?: boolean;
}

function OrderSummary({
  items,
  taxRate,
  shippingCost,
  currency,
}: {
  items: OrderSummaryItem[];
  taxRate: number;
  shippingCost: number;
  currency: string;
}) {
  const subtotal = items.reduce((s, i) => s + i.price * i.quantity, 0);
  const tax = subtotal * taxRate;
  const total = subtotal + tax + shippingCost;

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-base">Order Summary</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="space-y-3">
          {items.map((item) => (
            <div key={item.id} className="flex gap-3">
              <div className="relative flex-shrink-0">
                {item.image ? (
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-14 w-14 rounded-md object-cover"
                  />
                ) : (
                  <div className="flex h-14 w-14 items-center justify-center rounded-md bg-muted text-muted-foreground text-xs">
                    IMG
                  </div>
                )}
                <Badge
                  className="absolute -right-1.5 -top-1.5 flex h-4 w-4 items-center justify-center rounded-full p-0 text-[10px]"
                  variant="secondary"
                >
                  {item.quantity}
                </Badge>
              </div>
              <div className="flex flex-1 items-center justify-between min-w-0">
                <div className="min-w-0">
                  <p className="text-sm font-medium leading-tight truncate">{item.name}</p>
                  {item.variant && (
                    <p className="text-xs text-muted-foreground">{item.variant}</p>
                  )}
                </div>
                <span className="ml-2 flex-shrink-0 text-sm font-medium">
                  {currency}{(item.price * item.quantity).toFixed(2)}
                </span>
              </div>
            </div>
          ))}
        </div>
        <Separator />
        <div className="space-y-1.5 text-sm">
          <div className="flex justify-between text-muted-foreground">
            <span>Subtotal</span>
            <span>{currency}{subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-muted-foreground">
            <span>Shipping</span>
            <span>{currency}{shippingCost.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-muted-foreground">
            <span>Tax</span>
            <span>{currency}{tax.toFixed(2)}</span>
          </div>
          <Separator />
          <div className="flex justify-between font-semibold text-base">
            <span>Total</span>
            <span>{currency}{total.toFixed(2)}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

const CheckoutForm = React.forwardRef<HTMLDivElement, CheckoutFormProps>(
  (
    {
      className,
      orderItems = [],
      taxRate = 0.08,
      shippingCost = 5.99,
      currency = "$",
      onSubmit,
      isLoading,
      ...props
    },
    ref
  ) => {
    const form = useForm<CheckoutValues>({
      resolver: zodResolver(checkoutSchema),
      defaultValues: {
        email: "",
        phone: "",
        firstName: "",
        lastName: "",
        address: "",
        apartment: "",
        city: "",
        state: "",
        zip: "",
        country: "",
        paymentMethod: "card",
        cardName: "",
        cardNumber: "",
        cardExpiry: "",
        cardCvv: "",
      },
    });

    const paymentMethod = form.watch("paymentMethod");

    async function handleSubmit(values: CheckoutValues) {
      await onSubmit?.(values);
    }

    return (
      <div
        ref={ref}
        className={cn("w-full", className)}
        {...props}
      >
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_360px]">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className="space-y-8"
            >
              <section aria-labelledby="contact-heading">
                <h2
                  id="contact-heading"
                  className="text-base font-semibold text-foreground mb-4"
                >
                  Contact Information
                </h2>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem className="sm:col-span-2">
                        <FormLabel>Email address</FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            placeholder="you@example.com"
                            autoComplete="email"
                            disabled={isLoading}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem className="sm:col-span-2">
                        <FormLabel>Phone number</FormLabel>
                        <FormControl>
                          <Input
                            type="tel"
                            placeholder="+1 (555) 000-0000"
                            autoComplete="tel"
                            disabled={isLoading}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </section>

              <Separator />

              <section aria-labelledby="shipping-heading">
                <h2
                  id="shipping-heading"
                  className="text-base font-semibold text-foreground mb-4"
                >
                  Shipping Address
                </h2>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>First name</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Jane"
                            autoComplete="given-name"
                            disabled={isLoading}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Last name</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Smith"
                            autoComplete="family-name"
                            disabled={isLoading}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                      <FormItem className="sm:col-span-2">
                        <FormLabel>Address</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="123 Main Street"
                            autoComplete="street-address"
                            disabled={isLoading}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="apartment"
                    render={({ field }) => (
                      <FormItem className="sm:col-span-2">
                        <FormLabel>Apartment, suite, etc. (optional)</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Apt 4B"
                            autoComplete="address-line2"
                            disabled={isLoading}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="city"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>City</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="San Francisco"
                            autoComplete="address-level2"
                            disabled={isLoading}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="state"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>State / Province</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="CA"
                            autoComplete="address-level1"
                            disabled={isLoading}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="zip"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>ZIP / Postal code</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="94103"
                            autoComplete="postal-code"
                            disabled={isLoading}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="country"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Country</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="United States"
                            autoComplete="country-name"
                            disabled={isLoading}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </section>

              <Separator />

              <section aria-labelledby="payment-heading">
                <h2
                  id="payment-heading"
                  className="text-base font-semibold text-foreground mb-4"
                >
                  Payment Method
                </h2>
                <FormField
                  control={form.control}
                  name="paymentMethod"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <RadioGroup
                          value={field.value}
                          onValueChange={field.onChange}
                          className="grid grid-cols-2 gap-3"
                          disabled={isLoading}
                        >
                          <div>
                            <RadioGroupItem
                              value="card"
                              id="payment-card"
                              className="peer sr-only"
                            />
                            <Label
                              htmlFor="payment-card"
                              className="flex cursor-pointer items-center justify-center rounded-lg border-2 border-muted bg-background p-3 text-sm font-medium transition-colors hover:bg-muted peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5"
                            >
                              Credit Card
                            </Label>
                          </div>
                          <div>
                            <RadioGroupItem
                              value="paypal"
                              id="payment-paypal"
                              className="peer sr-only"
                            />
                            <Label
                              htmlFor="payment-paypal"
                              className="flex cursor-pointer items-center justify-center rounded-lg border-2 border-muted bg-background p-3 text-sm font-medium transition-colors hover:bg-muted peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5"
                            >
                              PayPal
                            </Label>
                          </div>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {paymentMethod === "card" && (
                  <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="cardName"
                      render={({ field }) => (
                        <FormItem className="sm:col-span-2">
                          <FormLabel>Name on card</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Jane Smith"
                              autoComplete="cc-name"
                              disabled={isLoading}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="cardNumber"
                      render={({ field }) => (
                        <FormItem className="sm:col-span-2">
                          <FormLabel>Card number</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="4242 4242 4242 4242"
                              autoComplete="cc-number"
                              maxLength={19}
                              disabled={isLoading}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="cardExpiry"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Expiry date</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="MM / YY"
                              autoComplete="cc-exp"
                              maxLength={7}
                              disabled={isLoading}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="cardCvv"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>CVV</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="123"
                              autoComplete="cc-csc"
                              maxLength={4}
                              disabled={isLoading}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                )}

                {paymentMethod === "paypal" && (
                  <div className="mt-4 rounded-lg border border-dashed p-6 text-center text-sm text-muted-foreground">
                    You will be redirected to PayPal to complete your payment.
                  </div>
                )}
              </section>

              <Button type="submit" className="w-full" size="lg" disabled={isLoading}>
                {isLoading ? "Placing order…" : "Place Order"}
              </Button>
            </form>
          </Form>

          <aside className="lg:sticky lg:top-6 h-fit">
            {orderItems.length > 0 ? (
              <OrderSummary
                items={orderItems}
                taxRate={taxRate}
                shippingCost={shippingCost}
                currency={currency}
              />
            ) : (
              <Card>
                <CardContent className="py-8 text-center text-sm text-muted-foreground">
                  No items in order
                </CardContent>
              </Card>
            )}
          </aside>
        </div>
      </div>
    );
  }
);

CheckoutForm.displayName = "CheckoutForm";

export { CheckoutForm };
