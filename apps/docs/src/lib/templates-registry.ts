export type TemplateId = "dashboard" | "ecommerce" | "landing";

export interface TemplateEntry {
  id: TemplateId;
  name: string;
  description: string;
  category: string;
  features: string[];
  blocks: string[];
  previewCode: string;
  scaffoldCommand: string;
  sourceFile: string;
}

export const templates: TemplateEntry[] = [
  {
    id: "dashboard",
    name: "Admin Dashboard",
    description: "Full-featured admin dashboard with metrics, charts, and data management.",
    category: "SaaS",
    features: [
      "Real-time metrics and KPIs",
      "Interactive charts and data visualization",
      "Activity feed and notifications",
      "Responsive grid layout",
      "Dark mode support",
    ],
    blocks: [
      "AppSidebar",
      "TopNav",
      "StatsOverview",
      "MetricCards",
      "ActivityFeed",
      "FullDataTable",
    ],
    previewCode: `import { AppSidebar } from "@launchapp/design-system/blocks/navigation";
import { TopNav } from "@launchapp/design-system/blocks/navigation";
import { StatsOverview } from "@launchapp/design-system/blocks/dashboard";

export default function DashboardPage() {
  return (
    <div className="flex h-screen">
      <AppSidebar />
      <div className="flex-1 flex flex-col">
        <TopNav />
        <main className="flex-1 overflow-auto p-8">
          <StatsOverview
            items={[
              { id: "revenue", label: "Revenue", value: "$45,231.89", change: "+20.1%" },
              { id: "users", label: "Active Users", value: "2,350", change: "+15.3%" },
              { id: "orders", label: "Orders", value: "1,234", change: "+8.2%" },
              { id: "growth", label: "Growth", value: "12.5%", change: "+4.3%" },
            ]}
          />
        </main>
      </div>
    </div>
  );
}`,
    scaffoldCommand: "npx create-launchapp-app --template=dashboard",
    sourceFile: "templates/DashboardTemplate.tsx",
  },
  {
    id: "ecommerce",
    name: "E-commerce Store",
    description: "Complete e-commerce platform with product catalog, shopping cart, and checkout.",
    category: "Retail",
    features: [
      "Product catalog with filtering",
      "Shopping cart management",
      "Secure checkout process",
      "Product reviews and ratings",
      "Order history and tracking",
      "Responsive mobile design",
    ],
    blocks: [
      "ProductCard",
      "ShoppingCart",
      "CheckoutForm",
      "SearchableDataTable",
      "TopNav",
    ],
    previewCode: `import { ProductCard } from "@launchapp/design-system/blocks/ecommerce";
import { ShoppingCart } from "@launchapp/design-system/blocks/ecommerce";

export default function StorePage() {
  const products = [
    {
      id: "1",
      name: "Premium Headphones",
      price: 299.99,
      rating: 4.5,
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e",
    },
    {
      id: "2",
      name: "Wireless Earbuds",
      price: 149.99,
      rating: 4.8,
      image: "https://images.unsplash.com/photo-1484704849700-f032a568e944",
    },
  ];

  return (
    <div className="min-h-screen">
      <div className="grid grid-cols-4 gap-6 p-8">
        {products.map((product) => (
          <ProductCard key={product.id} {...product} />
        ))}
      </div>
    </div>
  );
}`,
    scaffoldCommand: "npx create-launchapp-app --template=ecommerce",
    sourceFile: "templates/EcommerceTemplate.tsx",
  },
  {
    id: "landing",
    name: "Landing Page",
    description: "Conversion-focused landing page with hero section, features, and CTA.",
    category: "Marketing",
    features: [
      "Eye-catching hero section",
      "Feature highlights grid",
      "Pricing comparison table",
      "Testimonials carousel",
      "Email signup form",
      "SEO optimized",
    ],
    blocks: [
      "HeroSection",
      "FeatureGrid",
      "PricingTable",
      "TestimonialCarousel",
    ],
    previewCode: `import { HeroSection } from "@launchapp/design-system/blocks/marketing";
import { FeatureGrid } from "@launchapp/design-system/blocks/marketing";
import { PricingTable } from "@launchapp/design-system/blocks/marketing";

export default function LandingPage() {
  return (
    <div>
      <HeroSection
        headline="Build Amazing Products"
        subheadline="A comprehensive design system for modern web applications"
        primaryAction={<button>Get Started</button>}
      />
      <FeatureGrid />
      <PricingTable />
    </div>
  );
}`,
    scaffoldCommand: "npx create-launchapp-app --template=landing",
    sourceFile: "templates/LandingTemplate.tsx",
  },
];

export const ALL_TEMPLATE_IDS: TemplateId[] = templates.map((t) => t.id);

export function getTemplateById(id: TemplateId): TemplateEntry | undefined {
  return templates.find((t) => t.id === id);
}
