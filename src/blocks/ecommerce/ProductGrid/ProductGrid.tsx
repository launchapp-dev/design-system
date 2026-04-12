import * as React from "react";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardFooter } from "@/components/Card";
import { Button } from "@/components/Button";
import { Badge } from "@/components/Badge";
import { SelectRoot as Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/Select";
import { Input } from "@/components/Input";

export interface GridProduct {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  rating?: number;
  reviewCount?: number;
  image?: string;
  badge?: string;
  currency?: string;
  category?: string;
  stock?: number;
  description?: string;
}

export type SortOption = "price-asc" | "price-desc" | "rating" | "newest" | "name";
export type ViewMode = "grid" | "list";

export interface ProductGridProps extends React.HTMLAttributes<HTMLDivElement> {
  products: GridProduct[];
  columns?: 2 | 3 | 4;
  showSearch?: boolean;
  showSort?: boolean;
  showStock?: boolean;
  sortOptions?: { value: SortOption; label: string }[];
  searchPlaceholder?: string;
  onAddToCart?: (product: GridProduct) => void;
  onProductClick?: (product: GridProduct) => void;
  loading?: boolean;
  emptyMessage?: string;
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          className={cn(
            "h-3.5 w-3.5",
            star <= Math.floor(rating)
              ? "fill-warning text-warning"
              : star - 0.5 <= rating
                ? "fill-warning/50 text-warning"
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

function ProductCardItem({
  product,
  onAddToCart,
  onProductClick,
  showStock,
}: {
  product: GridProduct;
  onAddToCart?: (p: GridProduct) => void;
  onProductClick?: (p: GridProduct) => void;
  showStock?: boolean;
}) {
  const currency = product.currency ?? "$";
  const discount = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : null;
  const outOfStock = showStock && (product.stock ?? 1) <= 0;

  return (
    <Card
      className="group overflow-hidden"
      role="article"
      aria-label={product.name}
    >
      <div
        className="relative cursor-pointer overflow-hidden rounded-t-lg"
        onClick={() => onProductClick?.(product)}
      >
        {product.image ? (
          <img
            src={product.image}
            alt={product.name}
            className="w-full object-cover transition-transform duration-300 group-hover:scale-105 h-48"
          />
        ) : (
          <div className="flex h-48 w-full items-center justify-center bg-muted text-muted-foreground text-xs">
            No image
          </div>
        )}
        {product.badge && (
          <Badge className="absolute left-2 top-2" variant="secondary">
            {product.badge}
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
      <CardContent className="p-4">
        <button
          type="button"
          onClick={() => onProductClick?.(product)}
          className="text-left w-full"
        >
          <p className="font-medium text-sm line-clamp-2 leading-tight">{product.name}</p>
        </button>
        {product.description && (
          <p className="mt-1 text-xs text-muted-foreground line-clamp-2">{product.description}</p>
        )}
        {product.rating !== undefined && (
          <div className="mt-1.5 flex items-center gap-2">
            <StarRating rating={product.rating} />
            {product.reviewCount !== undefined && (
              <span className="text-xs text-muted-foreground">({product.reviewCount})</span>
            )}
          </div>
        )}
        {showStock && product.stock !== undefined && !outOfStock && (
          <p className="mt-1 text-xs text-muted-foreground">
            {product.stock <= 5 ? `Only ${product.stock} left` : `${product.stock} in stock`}
          </p>
        )}
        <div className="mt-2 flex items-baseline gap-1.5">
          <span className="text-base font-semibold">
            {currency}
            {product.price.toFixed(2)}
          </span>
          {product.originalPrice && (
            <span className="text-sm text-muted-foreground line-through">
              {currency}
              {product.originalPrice.toFixed(2)}
            </span>
          )}
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button
          className="w-full"
          size="sm"
          onClick={() => onAddToCart?.(product)}
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

const defaultSortOptions = [
  { value: "newest" as SortOption, label: "Newest" },
  { value: "price-asc" as SortOption, label: "Price: Low to High" },
  { value: "price-desc" as SortOption, label: "Price: High to Low" },
  { value: "rating" as SortOption, label: "Top Rated" },
  { value: "name" as SortOption, label: "Name A–Z" },
];

function ProductGrid({
  products,
  columns = 3,
  showSearch = true,
  showSort = true,
  showStock = false,
  sortOptions = defaultSortOptions,
  searchPlaceholder = "Search products…",
  onAddToCart,
  onProductClick,
  loading = false,
  emptyMessage = "No products found",
  className,
  ...props
}: ProductGridProps) {
  const [search, setSearch] = React.useState("");
  const [sort, setSort] = React.useState<SortOption>("newest");

  const filtered = React.useMemo(() => {
    let result = [...products];
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description?.toLowerCase().includes(q) ||
          p.category?.toLowerCase().includes(q),
      );
    }
    result.sort((a, b) => {
      switch (sort) {
        case "price-asc":
          return a.price - b.price;
        case "price-desc":
          return b.price - a.price;
        case "rating":
          return (b.rating ?? 0) - (a.rating ?? 0);
        case "name":
          return a.name.localeCompare(b.name);
        default:
          return 0;
      }
    });
    return result;
  }, [products, search, sort]);

  return (
    <div className={cn("space-y-4", className)} {...props}>
      {(showSearch || showSort) && (
        <div className="flex flex-wrap items-center gap-3">
          {showSearch && (
            <div className="relative flex-1 min-w-48">
              <svg
                className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.35-4.35" />
              </svg>
              <Input
                type="search"
                placeholder={searchPlaceholder}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9"
                aria-label="Search products"
              />
            </div>
          )}
          {showSort && (
            <Select
              value={sort}
              onValueChange={(v: string) => setSort(v as SortOption)}
            >
              <SelectTrigger className="w-44" aria-label="Sort products">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {sortOptions.map((opt) => (
                  <SelectItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        </div>
      )}

      <div
        className={cn("grid gap-4", columnsClass[columns] ?? columnsClass[3])}
        role="list"
        aria-label="Product grid"
      >
        {loading
          ? Array.from({ length: columns * 2 }).map((_, i) => (
              <Card key={i} className="overflow-hidden">
                <div className="h-48 animate-pulse bg-muted" />
                <CardContent className="p-4 space-y-3">
                  <div className="h-4 w-3/4 animate-pulse rounded bg-muted" />
                  <div className="h-3 w-1/2 animate-pulse rounded bg-muted" />
                  <div className="h-5 w-1/3 animate-pulse rounded bg-muted" />
                </CardContent>
              </Card>
            ))
          : filtered.length === 0
            ? (
              <div className="col-span-full flex flex-col items-center justify-center py-16 text-center">
                <svg
                  className="mb-4 h-12 w-12 text-muted-foreground/50"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  aria-hidden="true"
                >
                  <circle cx="11" cy="11" r="8" />
                  <path d="m21 21-4.35-4.35" />
                </svg>
                <p className="text-muted-foreground">{emptyMessage}</p>
              </div>
            )
            : filtered.map((product) => (
              <div key={product.id} role="listitem">
                <ProductCardItem
                  product={product}
                  onAddToCart={onAddToCart}
                  onProductClick={onProductClick}
                  showStock={showStock}
                />
              </div>
            ))}
      </div>

      {filtered.length > 0 && !loading && (
        <p className="text-sm text-muted-foreground text-center" aria-live="polite">
          Showing {filtered.length} of {products.length} product{products.length !== 1 ? "s" : ""}
        </p>
      )}
    </div>
  );
}

ProductGrid.displayName = "ProductGrid";

export { ProductGrid };
