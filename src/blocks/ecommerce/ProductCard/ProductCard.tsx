import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../../lib/utils";
import {
  Card,
  CardContent,
  CardFooter,
} from "../../../components/Card";
import { Button } from "../../../components/Button";
import { Badge } from "../../../components/Badge";

const productCardVariants = cva("group overflow-hidden", {
  variants: {
    variant: {
      compact: "flex flex-col",
      detailed: "flex flex-col",
      horizontal: "flex flex-row",
    },
  },
  defaultVariants: {
    variant: "compact",
  },
});

export interface ProductCardItem {
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
}

export interface ProductCardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof productCardVariants> {
  product: ProductCardItem;
  onAddToCart?: (product: ProductCardItem) => void;
  isLoading?: boolean;
}

function StarRating({ rating, count }: { rating: number; count?: number }) {
  return (
    <div className="flex items-center gap-1">
      <div className="flex" aria-label={`${rating} out of 5 stars`}>
        {[1, 2, 3, 4, 5].map((star) => (
          <svg
            key={star}
            className={cn(
              "h-3.5 w-3.5",
              star <= Math.floor(rating)
                ? "fill-amber-400 text-amber-400"
                : star - 0.5 <= rating
                  ? "fill-amber-200 text-amber-400"
                  : "fill-muted text-muted-foreground"
            )}
            viewBox="0 0 20 20"
            aria-hidden="true"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
      {count !== undefined && (
        <span className="text-xs text-muted-foreground">({count})</span>
      )}
    </div>
  );
}

const ProductCard = React.forwardRef<HTMLDivElement, ProductCardProps>(
  ({ className, variant, product, onAddToCart, isLoading, ...props }, ref) => {
    const currency = product.currency ?? "$";
    const discount =
      product.originalPrice
        ? Math.round((1 - product.price / product.originalPrice) * 100)
        : null;

    if (variant === "horizontal") {
      return (
        <Card
          ref={ref}
          className={cn(productCardVariants({ variant }), className)}
          {...props}
        >
          <div className="relative w-32 flex-shrink-0 overflow-hidden rounded-l-lg sm:w-48">
            {product.image ? (
              <img
                src={product.image}
                alt={product.name}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full min-h-[100px] w-full items-center justify-center bg-muted text-muted-foreground text-xs">
                No image
              </div>
            )}
            {product.badge && (
              <Badge className="absolute left-2 top-2" variant="secondary">
                {product.badge}
              </Badge>
            )}
          </div>
          <div className="flex flex-1 flex-col justify-between p-4">
            <div className="space-y-1">
              <p className="text-sm font-medium leading-tight">{product.name}</p>
              {product.description && (
                <p className="text-xs text-muted-foreground line-clamp-2">
                  {product.description}
                </p>
              )}
              {product.rating !== undefined && (
                <StarRating rating={product.rating} count={product.reviewCount} />
              )}
            </div>
            <div className="mt-3 flex items-center justify-between gap-2">
              <div className="flex items-baseline gap-1.5">
                <span className="text-base font-semibold">
                  {currency}{product.price.toFixed(2)}
                </span>
                {product.originalPrice && (
                  <span className="text-sm text-muted-foreground line-through">
                    {currency}{product.originalPrice.toFixed(2)}
                  </span>
                )}
              </div>
              <Button
                size="sm"
                onClick={() => onAddToCart?.(product)}
                disabled={isLoading}
              >
                Add to cart
              </Button>
            </div>
          </div>
        </Card>
      );
    }

    return (
      <Card
        ref={ref}
        className={cn(productCardVariants({ variant }), className)}
        {...props}
      >
        <div className="relative overflow-hidden rounded-t-lg">
          {product.image ? (
            <img
              src={product.image}
              alt={product.name}
              className={cn(
                "w-full object-cover transition-transform duration-300 group-hover:scale-105",
                variant === "detailed" ? "h-56" : "h-40"
              )}
            />
          ) : (
            <div
              className={cn(
                "flex w-full items-center justify-center bg-muted text-muted-foreground text-xs",
                variant === "detailed" ? "h-56" : "h-40"
              )}
            >
              No image
            </div>
          )}
          {product.badge && (
            <Badge className="absolute left-2 top-2" variant="secondary">
              {product.badge}
            </Badge>
          )}
          {discount && (
            <Badge className="absolute right-2 top-2" variant="destructive">
              -{discount}%
            </Badge>
          )}
        </div>
        <CardContent
          className={cn(
            "flex flex-1 flex-col",
            variant === "detailed" ? "p-4" : "p-3"
          )}
        >
          <p
            className={cn(
              "font-medium leading-tight",
              variant === "detailed" ? "text-sm" : "text-sm line-clamp-2"
            )}
          >
            {product.name}
          </p>
          {variant === "detailed" && product.description && (
            <p className="mt-1 text-xs text-muted-foreground line-clamp-2">
              {product.description}
            </p>
          )}
          {product.rating !== undefined && (
            <div className="mt-1.5">
              <StarRating rating={product.rating} count={product.reviewCount} />
            </div>
          )}
          <div className="mt-2 flex items-baseline gap-1.5">
            <span className="text-base font-semibold">
              {currency}{product.price.toFixed(2)}
            </span>
            {product.originalPrice && (
              <span className="text-xs text-muted-foreground line-through">
                {currency}{product.originalPrice.toFixed(2)}
              </span>
            )}
          </div>
        </CardContent>
        <CardFooter
          className={cn(variant === "detailed" ? "px-4 pb-4" : "px-3 pb-3")}
        >
          <Button
            className="w-full"
            size={variant === "detailed" ? "default" : "sm"}
            onClick={() => onAddToCart?.(product)}
            disabled={isLoading}
          >
            Add to cart
          </Button>
        </CardFooter>
      </Card>
    );
  }
);

ProductCard.displayName = "ProductCard";

const columnsClass: Record<number, string> = {
  1: "grid-cols-1",
  2: "grid-cols-1 sm:grid-cols-2",
  3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
  4: "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4",
};

export interface ProductCardGridProps extends React.HTMLAttributes<HTMLDivElement> {
  products: ProductCardItem[];
  columns?: 1 | 2 | 3 | 4;
  variant?: "compact" | "detailed" | "horizontal";
  onAddToCart?: (product: ProductCardItem) => void;
}

const ProductCardGrid = React.forwardRef<HTMLDivElement, ProductCardGridProps>(
  (
    { className, products, columns = 3, variant = "compact", onAddToCart, ...props },
    ref
  ) => (
    <div
      ref={ref}
      className={cn("grid gap-4", columnsClass[columns] ?? columnsClass[3], className)}
      {...props}
    >
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          variant={variant}
          onAddToCart={onAddToCart}
        />
      ))}
    </div>
  )
);

ProductCardGrid.displayName = "ProductCardGrid";

export { ProductCard, productCardVariants, ProductCardGrid };
