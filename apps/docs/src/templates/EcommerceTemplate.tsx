"use client";

import { TopNav } from "@launchapp/design-system/blocks/navigation";
import { ProductCard } from "@launchapp/design-system/blocks/ecommerce";
import { Button } from "@launchapp/design-system/components/Button";
import { Card } from "@launchapp/design-system/components/Card";
import { Badge } from "@launchapp/design-system/components/Badge";
import React, { useState } from "react";

const mockProducts = [
  {
    id: "1",
    name: "Premium Wireless Headphones",
    price: 299.99,
    originalPrice: 399.99,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop",
    rating: 4.5,
    reviews: 128,
    inStock: true,
    badge: "Sale",
  },
  {
    id: "2",
    name: "Wireless Earbuds Pro",
    price: 149.99,
    originalPrice: 199.99,
    image: "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=300&h=300&fit=crop",
    rating: 4.8,
    reviews: 256,
    inStock: true,
    badge: "Popular",
  },
  {
    id: "3",
    name: "Studio Monitor Speakers",
    price: 449.99,
    image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=300&h=300&fit=crop",
    rating: 4.7,
    reviews: 95,
    inStock: true,
    badge: null,
  },
  {
    id: "4",
    name: "Noise Cancelling Over-Ear",
    price: 279.99,
    originalPrice: 349.99,
    image: "https://images.unsplash.com/photo-1487180144351-b8472da7d491?w=300&h=300&fit=crop",
    rating: 4.6,
    reviews: 189,
    inStock: true,
    badge: "New",
  },
  {
    id: "5",
    name: "Portable Bluetooth Speaker",
    price: 79.99,
    image: "https://images.unsplash.com/photo-1512941691920-25bda36dc643?w=300&h=300&fit=crop",
    rating: 4.4,
    reviews: 423,
    inStock: true,
    badge: null,
  },
  {
    id: "6",
    name: "Retro Vintage Headphones",
    price: 189.99,
    image: "https://images.unsplash.com/photo-1588308032307-be87eb37e01f?w=300&h=300&fit=crop",
    rating: 4.3,
    reviews: 76,
    inStock: false,
    badge: "Coming Soon",
  },
];

export default function EcommerceTemplate() {
  const [cart, setCart] = useState<{ id: string; quantity: number }[]>([]);
  const [sortBy, setSortBy] = useState<"popular" | "price-low" | "price-high" | "newest">("popular");
  const [filterCategory, setFilterCategory] = useState<"all" | "headphones" | "speakers">("all");

  const addToCart = (productId: string) => {
    const existing = cart.find((item) => item.id === productId);
    if (existing) {
      setCart(cart.map((item) => (item.id === productId ? { ...item, quantity: item.quantity + 1 } : item)));
    } else {
      setCart([...cart, { id: productId, quantity: 1 }]);
    }
  };

  const cartTotal = cart.reduce((total, item) => {
    const product = mockProducts.find((p) => p.id === item.id);
    return total + (product?.price ?? 0) * item.quantity;
  }, 0);

  return (
    <div className="min-h-screen bg-background">
      <TopNav />

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight mb-2">Audio Store</h1>
          <p className="text-muted-foreground">Discover our premium collection of audio equipment and accessories</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          <aside className="lg:w-48 flex-shrink-0">
            <Card className="p-6 sticky top-24">
              <h3 className="font-semibold mb-4">Categories</h3>
              <div className="space-y-2">
                {(["all", "headphones", "speakers"] as const).map((category) => (
                  <button
                    key={category}
                    onClick={() => setFilterCategory(category)}
                    className={`block w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                      filterCategory === category ? "bg-primary text-primary-foreground" : "hover:bg-muted"
                    }`}
                  >
                    {category === "all" ? "All Products" : category.charAt(0).toUpperCase() + category.slice(1)}
                  </button>
                ))}
              </div>

              <div className="mt-6 pt-6 border-t">
                <h3 className="font-semibold mb-4">Sort By</h3>
                <div className="space-y-2">
                  {(["popular", "price-low", "price-high", "newest"] as const).map((sort) => (
                    <button
                      key={sort}
                      onClick={() => setSortBy(sort)}
                      className={`block w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                        sortBy === sort ? "bg-primary text-primary-foreground" : "hover:bg-muted"
                      }`}
                    >
                      {sort === "popular"
                        ? "Most Popular"
                        : sort === "price-low"
                          ? "Price: Low to High"
                          : sort === "price-high"
                            ? "Price: High to Low"
                            : "Newest First"}
                    </button>
                  ))}
                </div>
              </div>
            </Card>
          </aside>

          <div className="flex-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {mockProducts.map((product) => (
                <Card key={product.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="relative">
                    <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
                    {product.badge && (
                      <Badge className="absolute top-3 right-3">{product.badge}</Badge>
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold mb-2 line-clamp-2">{product.name}</h3>
                    <div className="flex items-center gap-1 mb-3">
                      <span className="text-sm text-yellow-500">★</span>
                      <span className="text-sm font-medium">{product.rating}</span>
                      <span className="text-xs text-muted-foreground">({product.reviews})</span>
                    </div>
                    <div className="mb-4">
                      <div className="flex items-baseline gap-2">
                        <span className="text-xl font-bold">${product.price}</span>
                        {product.originalPrice && (
                          <span className="text-sm text-muted-foreground line-through">
                            ${product.originalPrice}
                          </span>
                        )}
                      </div>
                    </div>
                    <Button
                      onClick={() => addToCart(product.id)}
                      disabled={!product.inStock}
                      className="w-full"
                    >
                      {product.inStock ? "Add to Cart" : "Out of Stock"}
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          <aside className="lg:w-72 flex-shrink-0">
            <Card className="p-6 sticky top-24">
              <h3 className="text-lg font-semibold mb-4">Shopping Cart</h3>
              {cart.length === 0 ? (
                <p className="text-sm text-muted-foreground">Your cart is empty</p>
              ) : (
                <>
                  <div className="space-y-3 mb-4 max-h-48 overflow-auto">
                    {cart.map((item) => {
                      const product = mockProducts.find((p) => p.id === item.id);
                      return (
                        <div key={item.id} className="flex justify-between text-sm">
                          <span className="truncate">{product?.name}</span>
                          <span className="font-medium">×{item.quantity}</span>
                        </div>
                      );
                    })}
                  </div>
                  <div className="border-t pt-4">
                    <div className="flex justify-between font-semibold mb-4">
                      <span>Total:</span>
                      <span>${cartTotal.toFixed(2)}</span>
                    </div>
                    <Button className="w-full">Checkout</Button>
                  </div>
                </>
              )}
            </Card>
          </aside>
        </div>
      </div>
    </div>
  );
}
