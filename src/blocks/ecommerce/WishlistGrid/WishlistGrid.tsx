import type * as React from "react";
import { cn } from "../../../lib/utils";
import { Card, CardContent, CardFooter } from "../../../components/Card";
import { Button } from "../../../components/Button";
import { Badge } from "../../../components/Badge";
import { EmptyStateCard } from "../../data/EmptyStateCard";

export interface WishlistItem {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  rating?: number;
  reviewCount?: number;
  image?: string;
  badge?: string;
  currency?: string;
  description?: string;
  stock?: number;
}

export interface WishlistGridProps extends React.HTMLAttributes<HTMLDivElement> {
  items: WishlistItem[];
  onRemove?: (item: WishlistItem) => void;
  onAddToCart?: (item: WishlistItem) => void;
  onItemClick?: (item: WishlistItem) => void;
  columns?: 2 | 3 | 4;
  emptyMessage?: string;
  loading?: boolean;
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

function WishlistCard({
  item,
  onRemove,
  onAddToCart,
  onItemClick,
}: {
  item: WishlistItem;
  onRemove?: (item: WishlistItem) => void;
  onAddToCart?: (item: WishlistItem) => void;
  onItemClick?: (item: WishlistItem) => void;
}) {
  const currency = item.currency ?? "$";
  const discount = item.originalPrice
    ? Math.round((1 - item.price / item.originalPrice) * 100)
    : null;
  const outOfStock = (item.stock ?? 1) <= 0;

  return (
    <Card className="group overflow-hidden">
      <div className="relative">
        <div
          className="relative cursor-pointer overflow-hidden rounded-t-lg"
          onClick={() => onItemClick?.(item)}
        >
          {item.image ? (
            <img
              src={item.image}
              alt={item.name}
              className="w-full object-cover transition-transform duration-300 group-hover:scale-105 h-40"
            />
          ) : (
            <div className="flex h-40 w-full items-center justify-center bg-muted text-muted-foreground text-xs">
              No image
            </div>
          )}
          {item.badge && (
            <Badge className="absolute left-2 top-2" variant="secondary">
              {item.badge}
            </Badge>
          )}
          {discount ? (
            <Badge className="absolute right-2 top-2" variant="destructive">
              -{discount}%
            </Badge>
          ) : outOfStock ? (
            <Badge className="absolute right-2 top-2" variant="outline">
              Out of stock
            </Badge>
          ) : null}
        </div>
        <button
          type="button"
          aria-label="Remove from wishlist"
          onClick={(e) => {
            e.stopPropagation();
            onRemove?.(item);
          }}
          className="absolute right-2 bottom-2 flex h-8 w-8 items-center justify-center rounded-full bg-background/80 text-muted-foreground opacity-0 transition-opacity hover:bg-background hover:text-destructive focus:opacity-100 group-hover:opacity-100 backdrop-blur-sm"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
        </button>
      </div>
      <CardContent className="p-3">
        <button type="button" onClick={() => onItemClick?.(item)} className="text-left w-full">
          <p className="text-sm font-medium line-clamp-2 leading-tight">{item.name}</p>
        </button>
        {item.description && (
          <p className="mt-1 text-xs text-muted-foreground line-clamp-2">{item.description}</p>
        )}
        {item.rating !== undefined && (
          <div className="mt-1.5 flex items-center gap-2">
            <StarRating rating={item.rating} />
            {item.reviewCount !== undefined && (
              <span className="text-xs text-muted-foreground">({item.reviewCount})</span>
            )}
          </div>
        )}
        <div className="mt-2 flex items-baseline gap-1.5">
          <span className="text-base font-semibold">
            {currency}
            {item.price.toFixed(2)}
          </span>
          {item.originalPrice && (
            <span className="text-sm text-muted-foreground line-through">
              {currency}
              {item.originalPrice.toFixed(2)}
            </span>
          )}
        </div>
      </CardContent>
      <CardFooter className="p-3 pt-0">
        <Button
          className="w-full"
          size="sm"
          onClick={() => onAddToCart?.(item)}
          disabled={outOfStock}
        >
          {outOfStock ? "Out of stock" : "Add to cart"}
        </Button>
      </CardFooter>
    </Card>
  );
}

const columnsClass: Record<number, string> = {
  2: "grid-cols-1 sm:grid-cols-2",
  3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
  4: "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4",
};

function WishlistGrid(
  {
    items,
    onRemove,
    onAddToCart,
    onItemClick,
    columns = 3,
    emptyMessage = "Your wishlist is empty",
    loading = false,
    className,
    ...props
  }: WishlistGridProps,
  ref: React.Ref<HTMLDivElement>,
) {
  if (!loading && items.length === 0) {
    return (
      <div ref={ref} className={cn("flex items-center justify-center py-16", className)} {...props}>
        <EmptyStateCard
          title="No saved items"
          description={emptyMessage}
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              aria-hidden="true"
            >
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
          }
        />
      </div>
    );
  }

  return (
    <div
      ref={ref}
      className={cn("grid gap-4", columnsClass[columns] ?? columnsClass[3], className)}
      {...props}
    >
      {loading
        ? Array.from({ length: columns * 2 }).map((_, i) => (
            <Card key={i} className="overflow-hidden">
              <div className="h-40 animate-pulse bg-muted rounded-t-lg" />
              <CardContent className="p-3 space-y-3">
                <div className="h-4 w-3/4 animate-pulse rounded bg-muted" />
                <div className="h-3 w-1/2 animate-pulse rounded bg-muted" />
                <div className="h-5 w-1/3 animate-pulse rounded bg-muted" />
              </CardContent>
            </Card>
          ))
        : items.map((item) => (
            <WishlistCard
              key={item.id}
              item={item}
              onRemove={onRemove}
              onAddToCart={onAddToCart}
              onItemClick={onItemClick}
            />
          ))}
    </div>
  );
}

WishlistGrid.displayName = "WishlistGrid";

export { WishlistGrid };
