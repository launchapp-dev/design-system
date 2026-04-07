import * as React from "react";
import { cn } from "../../../lib/utils";
import { Checkbox } from "../../../components/Checkbox";
import { Button } from "../../../components/Button";
import { Badge } from "../../../components/Badge";
import { ScrollArea } from "../../../components/ScrollArea";

export interface ComparisonProduct {
  id: string;
  name: string;
  image?: string;
  price?: number;
  currency?: string;
  badge?: string;
  rating?: number;
  pros?: string[];
  cons?: string[];
  [key: string]: unknown;
}

export interface ComparisonAttribute {
  key: string;
  label: string;
  render?: (product: ComparisonProduct, value: unknown) => React.ReactNode;
}

export interface ComparisonTableProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "children"> {
  products: ComparisonProduct[];
  attributes: ComparisonAttribute[];
  selectedIds?: string[];
  onSelectionChange?: (ids: string[]) => void;
  maxSelect?: number;
  onAddToCart?: (product: ComparisonProduct) => void;
  onRemove?: (product: ComparisonProduct) => void;
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          className={cn(
            "h-3 w-3",
            star <= Math.floor(rating)
              ? "fill-amber-400 text-amber-400"
              : star - 0.5 <= rating
                ? "fill-amber-200 text-amber-400"
                : "fill-muted text-muted",
          )}
          viewBox="0 0 20 20"
          aria-hidden="true"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

function DefaultAttributeValue({ value }: { value: unknown }) {
  if (value === true || value === "yes" || value === "true") {
    return (
      <svg
        className="h-4 w-4 text-green-600"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        aria-label="Yes"
      >
        <polyline points="20 6 9 17 4 12" />
      </svg>
    );
  }
  if (
    value === false ||
    value === "no" ||
    value === "false" ||
    value === null ||
    value === undefined
  ) {
    return (
      <svg
        className="h-4 w-4 text-muted-foreground/40"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        aria-label="No"
      >
        <line x1="18" y1="6" x2="6" y2="18" />
        <line x1="6" y1="6" x2="18" y2="18" />
      </svg>
    );
  }
  return <span className="text-sm">{String(value)}</span>;
}

function ComparisonTable(
  {
    products,
    attributes,
    selectedIds = [],
    onSelectionChange,
    maxSelect = 4,
    onAddToCart,
    onRemove,
    className,
    ...props
  }: ComparisonTableProps,
  ref: React.Ref<HTMLDivElement>,
) {
  const [internalSelected, setInternalSelected] = React.useState<string[]>(selectedIds);
  const selected = selectedIds.length > 0 ? selectedIds : internalSelected;

  const handleToggle = (id: string) => {
    const next = selected.includes(id)
      ? selected.filter((s) => s !== id)
      : selected.length < maxSelect
        ? [...selected, id]
        : selected;
    setInternalSelected(next);
    onSelectionChange?.(next);
  };

  const currency = products[0]?.currency ?? "$";

  return (
    <div ref={ref} className={cn("space-y-4", className)} {...props}>
      {onSelectionChange && (
        <div className="flex items-center gap-3">
          <p className="text-sm text-muted-foreground">
            Select up to {maxSelect} products to compare
          </p>
          <Badge variant="outline" className="text-xs">
            {selected.length} selected
          </Badge>
        </div>
      )}

      <ScrollArea className="w-full">
        <div className="min-w-[600px]">
          <div className="grid gap-0 rounded-lg border overflow-hidden">
            {/* Header row */}
            <div
              className="grid gap-0 border-b"
              style={{ gridTemplateColumns: `200px repeat(${products.length}, 1fr)` }}
            >
              <div className="flex items-end p-4 border-r bg-muted/30">
                <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  Compare
                </span>
              </div>
              {products.map((product) => (
                <div
                  key={product.id}
                  className={cn(
                    "relative flex flex-col items-center gap-2 p-4 border-r last:border-r-0",
                    selected.includes(product.id) && "bg-primary/5",
                  )}
                >
                  {onSelectionChange && (
                    <Checkbox
                      checked={selected.includes(product.id)}
                      onCheckedChange={() => handleToggle(product.id)}
                      disabled={!selected.includes(product.id) && selected.length >= maxSelect}
                      aria-label={`Select ${product.name}`}
                      className="absolute left-2 top-2"
                    />
                  )}
                  {product.badge && (
                    <Badge variant="secondary" className="text-xs">
                      {product.badge}
                    </Badge>
                  )}
                  {product.image ? (
                    <img
                      src={product.image}
                      alt={product.name}
                      className="h-20 w-20 rounded-lg object-cover"
                    />
                  ) : (
                    <div className="flex h-20 w-20 items-center justify-center rounded-lg bg-muted text-muted-foreground text-xs">
                      IMG
                    </div>
                  )}
                  <p className="text-sm font-medium text-center leading-tight">{product.name}</p>
                  {product.price !== undefined && (
                    <span className="text-sm font-semibold">
                      {currency}
                      {product.price.toFixed(2)}
                    </span>
                  )}
                  {product.rating !== undefined && <StarRating rating={product.rating} />}
                  <div className="flex gap-2 mt-1">
                    {onAddToCart && (
                      <Button size="sm" onClick={() => onAddToCart(product)}>
                        Add to cart
                      </Button>
                    )}
                    {onRemove && (
                      <Button size="sm" variant="ghost" onClick={() => onRemove(product)}>
                        Remove
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Attribute rows */}
            {attributes.map((attr, attrIdx) => (
              <div
                key={attr.key}
                className={cn(
                  "grid gap-0 border-b last:border-b-0",
                  attrIdx % 2 === 0 ? "bg-muted/10" : "bg-background",
                )}
                style={{ gridTemplateColumns: `200px repeat(${products.length}, 1fr)` }}
              >
                <div className="flex items-center p-3 border-r bg-muted/20">
                  <span className="text-sm font-medium text-muted-foreground">{attr.label}</span>
                </div>
                {products.map((product) => (
                  <div
                    key={product.id}
                    className={cn(
                      "flex items-center justify-center p-3 border-r last:border-r-0 text-center",
                      selected.includes(product.id) && "bg-primary/5",
                    )}
                  >
                    {attr.render ? (
                      attr.render(product, product[attr.key])
                    ) : (
                      <DefaultAttributeValue value={product[attr.key]} />
                    )}
                  </div>
                ))}
              </div>
            ))}

            {/* Pros / Cons rows */}
            {products.some((p) => p.pros?.length || p.cons?.length) && (
              <>
                {products.some((p) => p.pros?.length) && (
                  <div
                    className="grid gap-0 border-b bg-muted/10"
                    style={{ gridTemplateColumns: `200px repeat(${products.length}, 1fr)` }}
                  >
                    <div className="flex items-center p-3 border-r bg-muted/20">
                      <span className="text-sm font-medium text-muted-foreground">Pros</span>
                    </div>
                    {products.map((product) => (
                      <div
                        key={product.id}
                        className={cn(
                          "p-3 border-r last:border-r-0 space-y-1",
                          selected.includes(product.id) && "bg-primary/5",
                        )}
                      >
                        {product.pros?.map((pro, i) => (
                          <div key={i} className="flex items-start gap-1.5 text-sm">
                            <svg
                              className="h-3.5 w-3.5 mt-0.5 text-green-600 shrink-0"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                              aria-hidden="true"
                            >
                              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                            </svg>
                            <span>{pro}</span>
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                )}
                {products.some((p) => p.cons?.length) && (
                  <div
                    className="grid gap-0 bg-background"
                    style={{ gridTemplateColumns: `200px repeat(${products.length}, 1fr)` }}
                  >
                    <div className="flex items-center p-3 border-r bg-muted/20">
                      <span className="text-sm font-medium text-muted-foreground">Cons</span>
                    </div>
                    {products.map((product) => (
                      <div
                        key={product.id}
                        className={cn(
                          "p-3 border-r last:border-r-0 space-y-1",
                          selected.includes(product.id) && "bg-primary/5",
                        )}
                      >
                        {product.cons?.map((con, i) => (
                          <div key={i} className="flex items-start gap-1.5 text-sm">
                            <svg
                              className="h-3.5 w-3.5 mt-0.5 text-red-400 shrink-0"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              aria-hidden="true"
                            >
                              <circle cx="12" cy="12" r="10" />
                              <line x1="12" y1="8" x2="12" y2="12" />
                              <line x1="12" y1="16" x2="12.01" y2="16" />
                            </svg>
                            <span>{con}</span>
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </ScrollArea>
    </div>
  );
}

ComparisonTable.displayName = "ComparisonTable";

export { ComparisonTable };
