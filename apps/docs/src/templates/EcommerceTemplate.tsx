'use client';

import * as React from 'react';
import { TopNav } from '@launchapp/design-system/blocks/navigation';
import { Button } from '@launchapp/design-system/components/Button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@launchapp/design-system/components/Card';
import { Badge } from '@launchapp/design-system/components/Badge';
import { Input } from '@launchapp/design-system/components/Input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@launchapp/design-system/components/Select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@launchapp/design-system/components/Tabs';

const PRODUCTS = [
  {
    id: '1',
    name: 'Premium Headphones',
    price: 299.99,
    originalPrice: 399.99,
    rating: 4.5,
    reviews: 234,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop',
    category: 'Electronics',
    inStock: true,
  },
  {
    id: '2',
    name: 'Wireless Earbuds',
    price: 149.99,
    originalPrice: 199.99,
    rating: 4.8,
    reviews: 567,
    image: 'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=500&h=500&fit=crop',
    category: 'Electronics',
    inStock: true,
  },
  {
    id: '3',
    name: 'Smartwatch Pro',
    price: 349.99,
    originalPrice: 449.99,
    rating: 4.3,
    reviews: 189,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&h=500&fit=crop',
    category: 'Electronics',
    inStock: true,
  },
  {
    id: '4',
    name: 'USB-C Cable',
    price: 19.99,
    originalPrice: 29.99,
    rating: 4.6,
    reviews: 1234,
    image: 'https://images.unsplash.com/photo-1625948515291-69613efd103f?w=500&h=500&fit=crop',
    category: 'Accessories',
    inStock: false,
  },
  {
    id: '5',
    name: 'Phone Case',
    price: 39.99,
    originalPrice: 59.99,
    rating: 4.4,
    reviews: 456,
    image: 'https://images.unsplash.com/photo-1592286927505-1def25e4a967?w=500&h=500&fit=crop',
    category: 'Accessories',
    inStock: true,
  },
  {
    id: '6',
    name: 'Screen Protector',
    price: 14.99,
    originalPrice: 24.99,
    rating: 4.7,
    reviews: 890,
    image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=500&h=500&fit=crop',
    category: 'Accessories',
    inStock: true,
  },
];

function ProductCard({ product }: { product: (typeof PRODUCTS)[0] }) {
  const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative aspect-square bg-muted overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
        />
        {discount > 0 && (
          <Badge className="absolute top-2 right-2 bg-destructive hover:bg-destructive">
            -{discount}%
          </Badge>
        )}
        {!product.inStock && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <span className="text-white font-semibold">Out of Stock</span>
          </div>
        )}
      </div>
      <CardContent className="pt-4 space-y-3">
        <div>
          <p className="text-sm text-muted-foreground mb-1">{product.category}</p>
          <h3 className="font-semibold line-clamp-2">{product.name}</h3>
        </div>
        <div className="flex items-center gap-1">
          <div className="flex items-center gap-0.5">
            {[...Array(5)].map((_, i) => (
              <span
                key={i}
                className={i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'}
              >
                ★
              </span>
            ))}
          </div>
          <span className="text-xs text-muted-foreground">({product.reviews})</span>
        </div>
        <div className="space-y-2">
          <div className="flex items-baseline gap-2">
            <span className="text-xl font-bold">${product.price}</span>
            <span className="text-sm text-muted-foreground line-through">${product.originalPrice}</span>
          </div>
          <Button
            className="w-full"
            variant={product.inStock ? 'default' : 'secondary'}
            disabled={!product.inStock}
          >
            {product.inStock ? 'Add to Cart' : 'Notify Me'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

export default function EcommerceTemplate() {
  const [selectedCategory, setSelectedCategory] = React.useState('all');
  const [sortBy, setSortBy] = React.useState('popular');
  const [cartCount] = React.useState(3);

  const filteredProducts = selectedCategory === 'all'
    ? PRODUCTS
    : PRODUCTS.filter((p) => p.category === selectedCategory);

  const categories = ['all', ...new Set(PRODUCTS.map((p) => p.category))];

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <TopNav
        logo={<span className="text-lg font-bold">Store</span>}
        items={[
          { label: 'Shop', href: '#', isActive: true },
          { label: 'Categories', href: '#' },
          { label: 'Deals', href: '#' },
        ]}
        user={{
          name: 'Customer',
          avatarFallback: 'C',
        }}
      />

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary/10 to-primary/5 border-b">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <h1 className="text-4xl font-bold tracking-tight mb-2">Welcome to Our Store</h1>
          <p className="text-lg text-muted-foreground">
            Discover premium products with exclusive offers and fast shipping.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Filters and Sort */}
        <div className="space-y-6 mb-8">
          <Tabs defaultValue="all" value={selectedCategory} onValueChange={setSelectedCategory}>
            <TabsList className="bg-muted">
              {categories.map((category) => (
                <TabsTrigger key={category} value={category} className="capitalize">
                  {category === 'all' ? 'All Products' : category}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>

          <div className="flex items-center gap-4">
            <Input placeholder="Search products..." className="flex-1" />
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="popular">Most Popular</SelectItem>
                <SelectItem value="newest">Newest</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="rating">Highest Rated</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Results */}
        <div className="mb-8">
          <p className="text-sm text-muted-foreground">
            Showing {filteredProducts.length} products
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Featured Section */}
        <Card className="bg-gradient-to-r from-primary/5 to-primary/10 border-primary/20">
          <CardContent className="pt-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <h3 className="font-semibold mb-2">Free Shipping</h3>
                <p className="text-sm text-muted-foreground">
                  On all orders over $50
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">30-Day Returns</h3>
                <p className="text-sm text-muted-foreground">
                  Easy returns with no questions asked
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Secure Checkout</h3>
                <p className="text-sm text-muted-foreground">
                  Protected by industry-leading encryption
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
