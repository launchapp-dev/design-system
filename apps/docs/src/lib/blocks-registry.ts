export type BlockCategory =
  | "auth"
  | "dashboard"
  | "settings"
  | "navigation"
  | "data"
  | "ecommerce"
  | "marketing"
  | "app-shells"
  | "admin"
  | "app"
  | "billing"
  | "blog"
  | "community"
  | "errors"
  | "files"
  | "forms"
  | "integrations"
  | "landing"
  | "messaging"
  | "notifications"
  | "onboarding"
  | "search"
  | "team";

export const BLOCK_CATEGORY_LABELS: Record<BlockCategory, string> = {
  auth: "Authentication",
  dashboard: "Dashboard",
  settings: "Settings",
  navigation: "Navigation",
  data: "Data",
  ecommerce: "E-commerce",
  marketing: "Marketing",
  "app-shells": "App Shells",
  admin: "Admin",
  app: "App Layouts",
  billing: "Billing",
  blog: "Blog",
  community: "Community",
  errors: "Error Pages",
  files: "Files & Media",
  forms: "Forms",
  integrations: "Integrations",
  landing: "Landing",
  messaging: "Messaging",
  notifications: "Notifications",
  onboarding: "Onboarding",
  search: "Search",
  team: "Team",
};

export const BLOCK_CATEGORY_DESCRIPTIONS: Record<BlockCategory, string> = {
  auth: "Login, signup, password reset, and OTP verification forms.",
  dashboard: "Metric cards, stats overview, and activity feeds for dashboards.",
  settings: "Account, billing, notification, and profile settings pages.",
  navigation: "Application sidebar, top navigation, and mobile navigation drawer.",
  data: "Data tables, Kanban boards, searchable tables, and timeline components.",
  ecommerce: "Product cards, shopping cart, and checkout form components.",
  marketing: "Hero sections, feature grids, pricing tables, and testimonial carousels.",
  "app-shells": "Full application shell layouts — collapsible sidebars, dashboard shells, split panes, and command palette wrappers.",
  admin: "API key management, audit logs, user management, and system admin tools.",
  app: "Minimal app shells, collapsible sidebars, compact layouts, and page containers.",
  billing: "Invoice tables, payment method cards, subscription management, and usage meters.",
  blog: "Post list, post detail, and newsletter signup for blog and content sites.",
  community: "User profiles, team member cards, theme galleries, and community forms.",
  errors: "404, 500, and maintenance page layouts for error handling.",
  files: "File grids, file lists, drop zones, and image galleries for file management UIs.",
  forms: "File upload zones and rich text editors for advanced form inputs.",
  integrations: "OAuth connect cards, API key managers, and webhook configuration UIs.",
  landing: "Hero sections, pricing blocks, feature grids, FAQ, testimonials, and full landing page templates.",
  messaging: "Chat interfaces, message bubbles, and typing indicators for real-time messaging.",
  notifications: "Notification centers, inbox views, activity timelines, and notification preferences.",
  onboarding: "Multi-step wizards, progress checklists, welcome screens, and onboarding flows.",
  search: "Search command palettes and search results pages.",
  team: "Team member lists, invite forms, role selectors, and workspace switchers.",
};

export interface BlockEntry {
  id: string;
  name: string;
  description: string;
  category: BlockCategory;
  code: string;
  sourcePath: string;
}

export const ALL_BLOCK_CATEGORIES: BlockCategory[] = [
  "auth",
  "dashboard",
  "settings",
  "navigation",
  "data",
  "ecommerce",
  "marketing",
  "app-shells",
  "admin",
  "app",
  "billing",
  "blog",
  "community",
  "errors",
  "files",
  "forms",
  "integrations",
  "landing",
  "messaging",
  "notifications",
  "onboarding",
  "search",
  "team",
];

export const blocks: BlockEntry[] = [
  {
    id: "login-form",
    name: "Login Form",
    description: "Email and password login form with remember me checkbox and validation.",
    category: "auth",
    sourcePath: "auth/LoginForm.tsx",
    code: `import { LoginForm } from "@launchapp/design-system/blocks/auth";

export default function Page() {
  return (
    <LoginForm
      onSubmit={async (values) => {
        console.log(values);
      }}
      onSignUpClick={() => console.log("sign up")}
    />
  );
}`,
  },
  {
    id: "sign-up-form",
    name: "Sign Up Form",
    description: "User registration form with name, email, and password fields.",
    category: "auth",
    sourcePath: "auth/SignUpForm.tsx",
    code: `import { SignUpForm } from "@launchapp/design-system/blocks/auth";

export default function Page() {
  return (
    <SignUpForm
      onSubmit={async (values) => {
        console.log(values);
      }}
      onSignInClick={() => console.log("sign in")}
    />
  );
}`,
  },
  {
    id: "forgot-password-form",
    name: "Forgot Password Form",
    description: "Password reset request form with email input and success state.",
    category: "auth",
    sourcePath: "auth/ForgotPasswordForm.tsx",
    code: `import { ForgotPasswordForm } from "@launchapp/design-system/blocks/auth";

export default function Page() {
  return (
    <ForgotPasswordForm
      onSubmit={async (values) => {
        console.log(values);
      }}
      onBackToLoginClick={() => console.log("back to login")}
    />
  );
}`,
  },
  {
    id: "otp-verification",
    name: "OTP Verification",
    description: "One-time password input for two-factor authentication.",
    category: "auth",
    sourcePath: "auth/OTPVerification.tsx",
    code: `import { OTPVerification } from "@launchapp/design-system/blocks/auth";

export default function Page() {
  return (
    <OTPVerification
      onVerify={async (otp) => {
        console.log(otp);
      }}
      onResend={() => console.log("resend")}
    />
  );
}`,
  },
  {
    id: "metric-cards",
    name: "Metric Cards",
    description: "Grid of KPI metric cards with trend indicators and sparkline charts.",
    category: "dashboard",
    sourcePath: "dashboard/MetricCards.tsx",
    code: `import { MetricCards } from "@launchapp/design-system/blocks/dashboard";

const items = [
  {
    id: "revenue",
    label: "Total Revenue",
    value: "$45,231",
    trend: "up",
    trendValue: "+20.1%",
    sparklineData: [30, 40, 35, 50, 49, 60, 70],
  },
  {
    id: "users",
    label: "Active Users",
    value: "2,350",
    trend: "up",
    trendValue: "+15.3%",
    sparklineData: [20, 30, 25, 40, 35, 45, 50],
  },
];

export default function Page() {
  return <MetricCards items={items} />;
}`,
  },
  {
    id: "stats-overview",
    name: "Stats Overview",
    description: "Dashboard stats overview with summary metrics and area chart.",
    category: "dashboard",
    sourcePath: "dashboard/StatsOverview.tsx",
    code: `import { StatsOverview } from "@launchapp/design-system/blocks/dashboard";

const items = [
  { title: "Total Revenue", value: "$45,231", trend: "up", trendValue: "+20.1%" },
  { title: "Subscriptions", value: "+2350", trend: "up", trendValue: "+180.1%" },
  { title: "Sales", value: "+12,234", trend: "up", trendValue: "+19%" },
  { title: "Active Now", value: "+573", trend: "up", trendValue: "+201" },
];

export default function Page() {
  return (
    <StatsOverview
      title="Overview"
      description="Your business performance at a glance."
      items={items}
    />
  );
}`,
  },
  {
    id: "activity-feed",
    name: "Activity Feed",
    description: "Chronological activity feed with avatar, action badge, and timestamp.",
    category: "dashboard",
    sourcePath: "dashboard/ActivityFeed.tsx",
    code: `import { ActivityFeed } from "@launchapp/design-system/blocks/dashboard";

const items = [
  {
    id: "1",
    user: { name: "Alice Johnson", initials: "AJ" },
    description: "created a new project",
    timestamp: "2 minutes ago",
    actionType: "Created",
    actionVariant: "default",
  },
  {
    id: "2",
    user: { name: "Bob Smith", initials: "BS" },
    description: "merged pull request #42",
    timestamp: "1 hour ago",
    actionType: "Merged",
    actionVariant: "secondary",
  },
];

export default function Page() {
  return <ActivityFeed items={items} title="Recent Activity" />;
}`,
  },
  {
    id: "profile-settings",
    name: "Profile Settings",
    description: "User profile edit form with avatar, display name, bio, and social links.",
    category: "settings",
    sourcePath: "settings/ProfileSettings.tsx",
    code: `import { ProfileSettings } from "@launchapp/design-system/blocks/settings";

export default function Page() {
  return (
    <ProfileSettings
      onSave={async (values) => {
        console.log(values);
      }}
    />
  );
}`,
  },
  {
    id: "account-settings",
    name: "Account Settings",
    description: "Account preferences including email change, password update, and danger zone.",
    category: "settings",
    sourcePath: "settings/AccountSettings.tsx",
    code: `import { AccountSettings } from "@launchapp/design-system/blocks/settings";

export default function Page() {
  return (
    <AccountSettings
      onEmailChange={async (values) => console.log(values)}
      onPasswordChange={async (values) => console.log(values)}
      onDeleteAccount={() => console.log("delete account")}
    />
  );
}`,
  },
  {
    id: "notification-preferences",
    name: "Notification Preferences",
    description: "Granular notification toggle controls grouped by category.",
    category: "settings",
    sourcePath: "settings/NotificationPreferences.tsx",
    code: `import { NotificationPreferences } from "@launchapp/design-system/blocks/settings";

export default function Page() {
  return (
    <NotificationPreferences
      onSave={async (values) => {
        console.log(values);
      }}
    />
  );
}`,
  },
  {
    id: "billing-page",
    name: "Billing Page",
    description: "Subscription plan comparison, usage meters, payment methods, and invoices.",
    category: "settings",
    sourcePath: "settings/BillingPage.tsx",
    code: `import { BillingPage } from "@launchapp/design-system/blocks/settings";

export default function Page() {
  return (
    <BillingPage
      currentPlan="pro"
      onUpgrade={(plan) => console.log("upgrade to", plan)}
      onManagePayment={() => console.log("manage payment")}
    />
  );
}`,
  },
  {
    id: "app-sidebar",
    name: "App Sidebar",
    description: "Collapsible application sidebar with nested navigation sections and user area.",
    category: "navigation",
    sourcePath: "navigation/AppSidebar.tsx",
    code: `import { AppSidebar } from "@launchapp/design-system/blocks/navigation";

const sections = [
  {
    title: "Main",
    items: [
      { label: "Dashboard", href: "/", isActive: true },
      { label: "Analytics", href: "/analytics" },
      { label: "Projects", href: "/projects" },
    ],
  },
  {
    title: "Settings",
    items: [
      { label: "Profile", href: "/profile" },
      { label: "Billing", href: "/billing" },
    ],
  },
];

export default function Page() {
  return (
    <AppSidebar
      sections={sections}
      user={{ name: "Alice Johnson", email: "alice@example.com", avatarFallback: "AJ" }}
    />
  );
}`,
  },
  {
    id: "top-nav",
    name: "Top Navigation",
    description: "Horizontal top navigation bar with logo, links, notifications, and user menu.",
    category: "navigation",
    sourcePath: "navigation/TopNav.tsx",
    code: `import { TopNav } from "@launchapp/design-system/blocks/navigation";

const items = [
  { label: "Dashboard", href: "/" },
  { label: "Projects", href: "/projects" },
  { label: "Team", href: "/team" },
];

export default function Page() {
  return (
    <TopNav
      items={items}
      notificationCount={3}
      user={{
        name: "Alice Johnson",
        email: "alice@example.com",
        avatarFallback: "AJ",
      }}
    />
  );
}`,
  },
  {
    id: "mobile-nav-drawer",
    name: "Mobile Nav Drawer",
    description: "Slide-in mobile navigation drawer with menu items and close button.",
    category: "navigation",
    sourcePath: "navigation/MobileNavDrawer.tsx",
    code: `import { MobileNavDrawer } from "@launchapp/design-system/blocks/navigation";

const items = [
  { label: "Dashboard", href: "/" },
  { label: "Projects", href: "/projects" },
  { label: "Team", href: "/team" },
  { label: "Settings", href: "/settings" },
];

export default function Page() {
  return <MobileNavDrawer items={items} />;
}`,
  },
  {
    id: "full-data-table",
    name: "Full Data Table",
    description: "Feature-rich data table with sorting, filtering, pagination, and bulk actions.",
    category: "data",
    sourcePath: "data/FullDataTable/FullDataTable.tsx",
    code: `import { FullDataTable } from "@launchapp/design-system/blocks/data";
import type { ColumnDef } from "@tanstack/react-table";

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  status: "active" | "inactive";
}

const columns: ColumnDef<User>[] = [
  { accessorKey: "name", header: "Name" },
  { accessorKey: "email", header: "Email" },
  { accessorKey: "role", header: "Role" },
  { accessorKey: "status", header: "Status" },
];

const data: User[] = [
  { id: "1", name: "Alice Johnson", email: "alice@example.com", role: "Admin", status: "active" },
  { id: "2", name: "Bob Smith", email: "bob@example.com", role: "Member", status: "active" },
  { id: "3", name: "Carol White", email: "carol@example.com", role: "Member", status: "inactive" },
];

export default function Page() {
  return <FullDataTable columns={columns} data={data} searchColumn="name" />;
}`,
  },
  {
    id: "kanban-board",
    name: "Kanban Board",
    description: "Drag-and-drop Kanban board with columns and cards.",
    category: "data",
    sourcePath: "data/KanbanBoard/KanbanBoard.tsx",
    code: `import { KanbanBoard } from "@launchapp/design-system/blocks/data";

const initialColumns = [
  {
    id: "todo",
    title: "To Do",
    cards: [
      { id: "1", title: "Research competitors", badge: "Research" },
      { id: "2", title: "Design wireframes", badge: "Design" },
    ],
  },
  {
    id: "in-progress",
    title: "In Progress",
    cards: [
      { id: "3", title: "Build API endpoints", badge: "Engineering" },
    ],
  },
  {
    id: "done",
    title: "Done",
    cards: [
      { id: "4", title: "Project kickoff", badge: "Planning" },
    ],
  },
];

export default function Page() {
  return <KanbanBoard initialColumns={initialColumns} />;
}`,
  },
  {
    id: "searchable-data-table",
    name: "Searchable Data Table",
    description: "Data table with search input and column visibility controls.",
    category: "data",
    sourcePath: "data/SearchableDataTable/SearchableDataTable.tsx",
    code: `import { SearchableDataTable } from "@launchapp/design-system/blocks/data";
import type { ColumnDef } from "@tanstack/react-table";

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
}

const columns: ColumnDef<Product>[] = [
  { accessorKey: "name", header: "Name" },
  { accessorKey: "category", header: "Category" },
  { accessorKey: "price", header: "Price" },
];

const data: Product[] = [
  { id: "1", name: "Wireless Headphones", category: "Electronics", price: 99 },
  { id: "2", name: "Running Shoes", category: "Sports", price: 75 },
  { id: "3", name: "Coffee Maker", category: "Appliances", price: 49 },
];

export default function Page() {
  return (
    <SearchableDataTable
      columns={columns}
      data={data}
      searchColumn="name"
      searchPlaceholder="Search products..."
    />
  );
}`,
  },
  {
    id: "timeline",
    name: "Timeline",
    description: "Vertical timeline for displaying chronological events with icons and badges.",
    category: "data",
    sourcePath: "data/Timeline/Timeline.tsx",
    code: `import { Timeline } from "@launchapp/design-system/blocks/data";

const items = [
  {
    id: "1",
    title: "Project kickoff",
    description: "Initial planning meeting with all stakeholders.",
    date: "Jan 15, 2025",
    status: "completed",
  },
  {
    id: "2",
    title: "Design phase",
    description: "Created wireframes and design system.",
    date: "Feb 1, 2025",
    status: "completed",
  },
  {
    id: "3",
    title: "Development sprint",
    description: "Building core features and API integration.",
    date: "Mar 10, 2025",
    status: "current",
  },
  {
    id: "4",
    title: "Launch",
    description: "Public release and marketing campaign.",
    date: "Apr 1, 2025",
    status: "upcoming",
  },
];

export default function Page() {
  return <Timeline items={items} />;
}`,
  },
  {
    id: "product-card",
    name: "Product Card",
    description: "Product card grid with image, title, price, rating, and add-to-cart action.",
    category: "ecommerce",
    sourcePath: "ecommerce/ProductCard/ProductCard.tsx",
    code: `import { ProductCardGrid } from "@launchapp/design-system/blocks/ecommerce";

const products = [
  {
    id: "1",
    name: "Wireless Headphones",
    price: 99.99,
    originalPrice: 149.99,
    rating: 4.5,
    reviewCount: 128,
    badge: "Sale",
    imageSrc: "/products/headphones.jpg",
    imageAlt: "Wireless Headphones",
  },
  {
    id: "2",
    name: "Smart Watch",
    price: 299.99,
    rating: 4.8,
    reviewCount: 89,
    badge: "New",
    imageSrc: "/products/watch.jpg",
    imageAlt: "Smart Watch",
  },
];

export default function Page() {
  return (
    <ProductCardGrid
      products={products}
      onAddToCart={(id) => console.log("add to cart", id)}
    />
  );
}`,
  },
  {
    id: "shopping-cart",
    name: "Shopping Cart",
    description: "Shopping cart with item list, quantity controls, and order summary.",
    category: "ecommerce",
    sourcePath: "ecommerce/ShoppingCart/ShoppingCart.tsx",
    code: `import { ShoppingCart } from "@launchapp/design-system/blocks/ecommerce";

const items = [
  {
    id: "1",
    name: "Wireless Headphones",
    price: 99.99,
    quantity: 1,
    imageSrc: "/products/headphones.jpg",
    imageAlt: "Wireless Headphones",
  },
  {
    id: "2",
    name: "Smart Watch",
    price: 299.99,
    quantity: 2,
    imageSrc: "/products/watch.jpg",
    imageAlt: "Smart Watch",
  },
];

export default function Page() {
  return (
    <ShoppingCart
      items={items}
      taxRate={0.08}
      shippingCost={9.99}
      freeShippingThreshold={100}
      onCheckout={() => console.log("checkout")}
    />
  );
}`,
  },
  {
    id: "checkout-form",
    name: "Checkout Form",
    description: "Multi-step checkout form with shipping address and payment information.",
    category: "ecommerce",
    sourcePath: "ecommerce/CheckoutForm/CheckoutForm.tsx",
    code: `import { CheckoutForm } from "@launchapp/design-system/blocks/ecommerce";

const orderSummary = [
  { name: "Wireless Headphones", quantity: 1, price: 99.99 },
  { name: "Smart Watch", quantity: 2, price: 299.99 },
];

export default function Page() {
  return (
    <CheckoutForm
      orderSummary={orderSummary}
      onSubmit={async (values) => {
        console.log(values);
      }}
    />
  );
}`,
  },
  {
    id: "hero-section",
    name: "Hero Section",
    description: "Landing page hero with headline, subheadline, and CTA buttons.",
    category: "marketing",
    sourcePath: "marketing/HeroSection/HeroSection.tsx",
    code: `import { HeroSection } from "@launchapp/design-system/blocks/marketing";
import { Button } from "@launchapp/design-system";

export default function Page() {
  return (
    <HeroSection
      badge="New — v2.0 released"
      headline="Build faster with LaunchApp"
      subheadline="A complete design system built on Radix UI and Tailwind CSS. Ship production-ready UIs in hours, not weeks."
      primaryAction={<Button size="lg">Get started</Button>}
      secondaryAction={<Button size="lg" variant="outline">View docs</Button>}
    />
  );
}`,
  },
  {
    id: "feature-grid",
    name: "Feature Grid",
    description: "Grid layout showcasing product features with icons and descriptions.",
    category: "marketing",
    sourcePath: "marketing/FeatureGrid/FeatureGrid.tsx",
    code: `import { FeatureGrid } from "@launchapp/design-system/blocks/marketing";

const features = [
  {
    title: "Accessible",
    description: "Built on Radix UI primitives for full keyboard and screen reader support.",
    icon: "♿",
  },
  {
    title: "Customizable",
    description: "CSS custom properties and Tailwind for effortless theming.",
    icon: "🎨",
  },
  {
    title: "TypeScript",
    description: "Fully typed APIs with IntelliSense for a great DX.",
    icon: "📘",
  },
  {
    title: "Dark Mode",
    description: "First-class dark mode support out of the box.",
    icon: "🌙",
  },
];

export default function Page() {
  return <FeatureGrid features={features} title="Why LaunchApp?" />;
}`,
  },
  {
    id: "pricing-table",
    name: "Pricing Table",
    description: "Pricing plans comparison table with feature lists and CTA buttons.",
    category: "marketing",
    sourcePath: "marketing/PricingTable/PricingTable.tsx",
    code: `import { PricingTable } from "@launchapp/design-system/blocks/marketing";

const plans = [
  {
    name: "Starter",
    price: "$9",
    period: "/month",
    description: "Perfect for individuals and small projects.",
    features: ["5 projects", "10 GB storage", "Email support"],
    ctaLabel: "Get started",
  },
  {
    name: "Pro",
    price: "$29",
    period: "/month",
    description: "Best for growing teams and businesses.",
    features: ["Unlimited projects", "100 GB storage", "Priority support", "Analytics"],
    ctaLabel: "Start free trial",
    highlighted: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    description: "For large organizations with advanced needs.",
    features: ["Unlimited everything", "Dedicated support", "Custom integrations", "SLA"],
    ctaLabel: "Contact sales",
  },
];

export default function Page() {
  return <PricingTable plans={plans} onSelect={(plan) => console.log(plan)} />;
}`,
  },
  {
    id: "testimonial-carousel",
    name: "Testimonial Carousel",
    description: "Auto-rotating testimonials from customers with avatar and quote.",
    category: "marketing",
    sourcePath: "marketing/TestimonialCarousel/TestimonialCarousel.tsx",
    code: `import { TestimonialCarousel } from "@launchapp/design-system/blocks/marketing";

const testimonials = [
  {
    id: "1",
    quote: "LaunchApp cut our frontend development time in half. The components are beautiful and accessible out of the box.",
    author: "Sarah Chen",
    role: "CTO at Startup Inc.",
    avatarFallback: "SC",
  },
  {
    id: "2",
    quote: "The best design system I've worked with. Theming support and dark mode made our redesign a breeze.",
    author: "Mark Rivera",
    role: "Lead Engineer at TechCorp",
    avatarFallback: "MR",
  },
];

export default function Page() {
  return <TestimonialCarousel testimonials={testimonials} />;
}`,
  },
  {
    id: "app-shell",
    name: "App Shell",
    description: "Full application shell with collapsible sidebar, header actions, mobile drawer, and nested navigation sections.",
    category: "app-shells",
    sourcePath: "layout/AppShell/AppShell.tsx",
    code: `import { AppShell } from "@launchapp/design-system/blocks/layout";

const navSections = [
  {
    title: "Main",
    items: [
      { label: "Dashboard", href: "/dashboard", isActive: true },
      { label: "Analytics", href: "/analytics" },
      { label: "Projects", href: "/projects", badge: "3" },
    ],
  },
  {
    title: "Settings",
    items: [
      { label: "Profile", href: "/settings/profile" },
      { label: "Billing", href: "/settings/billing" },
    ],
  },
];

export default function Page() {
  return (
    <AppShell
      navSections={navSections}
      user={{ name: "Alice Johnson", email: "alice@example.com", avatarFallback: "AJ" }}
      collapsible
    >
      <div className="p-6">Page content goes here</div>
    </AppShell>
  );
}`,
  },
  {
    id: "sidebar-layout",
    name: "Sidebar Layout",
    description: "Flexible sidebar layout wrapper supporting app, docs, and minimal variants with optional collapsible and mobile drawer.",
    category: "app-shells",
    sourcePath: "layout/SidebarLayout/SidebarLayout.tsx",
    code: `import { SidebarLayout } from "@launchapp/design-system/blocks/layout";

export default function Page() {
  return (
    <SidebarLayout
      sidebar={<nav className="p-4">Sidebar content</nav>}
      header={<div className="px-6 py-3 border-b font-semibold">My App</div>}
    >
      <div className="p-6">Main content</div>
    </SidebarLayout>
  );
}`,
  },
  {
    id: "dashboard-layout",
    name: "Dashboard Layout",
    description: "Dashboard layout with optional sticky header and 1–3 column arrangements for side panels and main content.",
    category: "app-shells",
    sourcePath: "layout/DashboardLayout/DashboardLayout.tsx",
    code: `import { DashboardLayout } from "@launchapp/design-system/blocks/layout";

export default function Page() {
  return (
    <DashboardLayout
      columns={2}
      header={<div className="px-6 py-3 border-b">Header</div>}
      leftPanel={<aside className="p-4 border-r">Side panel</aside>}
    >
      <div className="p-6">Main content</div>
    </DashboardLayout>
  );
}`,
  },
  {
    id: "collapsible-sidebar",
    name: "Collapsible Sidebar",
    description: "Standalone collapsible sidebar with icon-only collapsed state, nested sections, badge support, and user footer.",
    category: "app-shells",
    sourcePath: "app/CollapsibleSidebar/CollapsibleSidebar.tsx",
    code: `import { CollapsibleSidebar } from "@launchapp/design-system/blocks/app";

const sections = [
  {
    title: "Main",
    items: [
      { label: "Dashboard", href: "#", icon: "grid" as const, isActive: true },
      { label: "Analytics", href: "#", icon: "chart" as const },
    ],
  },
];

export default function Page() {
  return (
    <CollapsibleSidebar
      sections={sections}
      user={{ name: "Alice Johnson", email: "alice@example.com", avatarFallback: "AJ" }}
    />
  );
}`,
  },
  {
    id: "icon-only-sidebar-shell",
    name: "Icon-Only Sidebar Shell",
    description: "Full-page shell with an icon-only sidebar, tooltips on hover, and grouped navigation sections.",
    category: "app-shells",
    sourcePath: "layout/IconOnlySidebarShell/IconOnlySidebarShell.tsx",
    code: `import { IconOnlySidebarShell } from "@launchapp/design-system/blocks/layout";

const sections = [
  {
    items: [
      { id: "dashboard", label: "Dashboard", href: "#", icon: <span>⊞</span>, isActive: true },
      { id: "analytics", label: "Analytics", href: "#", icon: <span>📈</span> },
    ],
  },
];

export default function Page() {
  return (
    <IconOnlySidebarShell sections={sections}>
      <div className="p-6">Page content</div>
    </IconOnlySidebarShell>
  );
}`,
  },
  {
    id: "dual-panel-sidebar-shell",
    name: "Dual Panel Sidebar Shell",
    description: "Two-level sidebar shell with a primary icon rail and secondary expandable panel, ideal for complex navigation trees.",
    category: "app-shells",
    sourcePath: "layout/DualPanelSidebarShell/DualPanelSidebarShell.tsx",
    code: `import { DualPanelSidebarShell } from "@launchapp/design-system/blocks/layout";

const sections = [
  {
    id: "main",
    label: "Main",
    icon: <span>⊞</span>,
    items: [
      { id: "dash", label: "Dashboard", href: "#", isActive: true },
      { id: "analytics", label: "Analytics", href: "#" },
    ],
  },
];

export default function Page() {
  return (
    <DualPanelSidebarShell sections={sections} title="My App">
      <div className="p-6">Page content</div>
    </DualPanelSidebarShell>
  );
}`,
  },
  {
    id: "command-palette-shell",
    name: "Command Palette Shell",
    description: "App shell with a built-in ⌘K command palette for quick navigation, actions, and search.",
    category: "app-shells",
    sourcePath: "layout/CommandPaletteShell/CommandPaletteShell.tsx",
    code: `import { CommandPaletteShell } from "@launchapp/design-system/blocks/layout";

const groups = [
  {
    id: "navigation",
    label: "Navigation",
    actions: [
      { id: "dashboard", label: "Dashboard", href: "#", shortcut: "D" },
      { id: "settings", label: "Settings", href: "#", shortcut: "S" },
    ],
  },
];

export default function Page() {
  return (
    <CommandPaletteShell groups={groups} triggerShortcut="k">
      <div className="p-6">Press ⌘K to open palette</div>
    </CommandPaletteShell>
  );
}`,
  },
  {
    id: "split-pane-layout",
    name: "Split Pane Layout",
    description: "Resizable split-pane layout supporting horizontal and vertical orientations, with configurable panel sizes.",
    category: "app-shells",
    sourcePath: "layout/SplitPaneLayout/SplitPaneLayout.tsx",
    code: `import { SplitPaneLayout } from "@launchapp/design-system/blocks/layout";

export default function Page() {
  return (
    <SplitPaneLayout
      orientation="horizontal"
      primaryPanel={<div className="p-4 h-full bg-muted/30">Primary panel</div>}
      secondaryPanel={<div className="p-4 h-full">Secondary panel</div>}
      defaultSplit={60}
    />
  );
}`,
  },

  // auth (additional)
  {
    id: "auth-form-block",
    name: "Auth Form Block",
    description: "Configurable auth form supporting login, signup, and forgot-password modes.",
    category: "auth",
    sourcePath: "auth/AuthFormBlock.tsx",
    code: `import { AuthFormBlock } from "@launchapp/design-system/blocks/auth";

export default function Page() {
  return (
    <AuthFormBlock
      mode="login"
      onLogin={async (email, password) => console.log("login", email)}
      onSignup={async (email, password) => console.log("signup", email)}
    />
  );
}`,
  },
  {
    id: "reset-password-form",
    name: "Reset Password Form",
    description: "Form for setting a new password after receiving a reset token.",
    category: "auth",
    sourcePath: "auth/ResetPasswordForm.tsx",
    code: `import { ResetPasswordForm } from "@launchapp/design-system/blocks/auth";

export default function Page() {
  return (
    <ResetPasswordForm
      onSubmit={async (password) => console.log("reset password", password)}
    />
  );
}`,
  },

  // dashboard (additional)
  {
    id: "dashboard-shell",
    name: "Dashboard Shell",
    description: "Complete dashboard layout shell with sidebar, header, and content area.",
    category: "dashboard",
    sourcePath: "dashboard/DashboardShell.tsx",
    code: `import { DashboardShell } from "@launchapp/design-system/blocks/dashboard";

export default function Page() {
  return (
    <DashboardShell
      title="Dashboard"
      user={{ name: "Alice Johnson", email: "alice@example.com" }}
    >
      <div className="p-6">Dashboard content</div>
    </DashboardShell>
  );
}`,
  },
  {
    id: "dashboard-timeline",
    name: "Dashboard Timeline",
    description: "Chronological activity timeline for dashboard overview panels.",
    category: "dashboard",
    sourcePath: "dashboard/Timeline/Timeline.tsx",
    code: `import { Timeline } from "@launchapp/design-system/blocks/dashboard";

const items = [
  { id: "1", title: "Project created", date: "Jan 1", status: "completed" as const },
  { id: "2", title: "First PR merged", date: "Jan 5", status: "completed" as const },
  { id: "3", title: "v1.0 release", date: "Feb 1", status: "current" as const },
];

export default function Page() {
  return <Timeline items={items} />;
}`,
  },

  // settings (additional)
  {
    id: "account-overview",
    name: "Account Overview",
    description: "Account summary card with user info, plan status, and quick actions.",
    category: "settings",
    sourcePath: "settings/AccountOverview/AccountOverview.tsx",
    code: `import { AccountOverview } from "@launchapp/design-system/blocks/settings";

export default function Page() {
  return (
    <AccountOverview
      user={{ name: "Alice Johnson", email: "alice@example.com", fallbackInitials: "AJ" }}
      plan={{ name: "Pro", status: "active", renewsAt: "2025-01-01" }}
      onEditProfile={() => console.log("edit")}
      onManageBilling={() => console.log("billing")}
    />
  );
}`,
  },
  {
    id: "appearance-settings",
    name: "Appearance Settings",
    description: "Theme, color scheme, font, and density preferences panel.",
    category: "settings",
    sourcePath: "settings/AppearanceSettings/AppearanceSettings.tsx",
    code: `import { AppearanceSettings } from "@launchapp/design-system/blocks/settings";

export default function Page() {
  return (
    <AppearanceSettings
      onSave={(appearance) => console.log("save appearance", appearance)}
    />
  );
}`,
  },
  {
    id: "billing-overview",
    name: "Billing Overview",
    description: "Current plan summary with renewal date, usage stats, and upgrade CTA.",
    category: "settings",
    sourcePath: "settings/BillingOverview.tsx",
    code: `import { BillingOverview } from "@launchapp/design-system/blocks/settings";

export default function Page() {
  return (
    <BillingOverview
      plan={{ name: "Pro", status: "active", price: "$29/mo", renewsAt: "2025-03-01" }}
      onUpgrade={() => console.log("upgrade")}
      onManage={() => console.log("manage")}
    />
  );
}`,
  },
  {
    id: "connected-accounts",
    name: "Connected Accounts",
    description: "Manage OAuth provider connections — connect, disconnect, and view scopes.",
    category: "settings",
    sourcePath: "settings/ConnectedAccounts/ConnectedAccounts.tsx",
    code: `import { ConnectedAccounts } from "@launchapp/design-system/blocks/settings";

const accounts = [
  { id: "github", provider: "github", name: "GitHub", username: "alice-dev", connected: true, scopes: ["repo", "user"] },
  { id: "google", provider: "google", name: "Google", connected: false },
];

export default function Page() {
  return (
    <ConnectedAccounts
      accounts={accounts}
      onConnect={(provider) => console.log("connect", provider)}
      onDisconnect={(id) => console.log("disconnect", id)}
    />
  );
}`,
  },
  {
    id: "settings-cookie-preferences",
    name: "Cookie Preferences",
    description: "Granular cookie category management for GDPR compliance settings.",
    category: "settings",
    sourcePath: "settings/CookiePreferences/CookiePreferences.tsx",
    code: `import { CookiePreferences } from "@launchapp/design-system/blocks/settings";

export default function Page() {
  return (
    <CookiePreferences
      onSave={(prefs) => console.log("save prefs", prefs)}
    />
  );
}`,
  },
  {
    id: "data-export-card",
    name: "Data Export Card",
    description: "Card for requesting a full account data export in various formats.",
    category: "settings",
    sourcePath: "settings/DataExportCard/DataExportCard.tsx",
    code: `import { DataExportCard } from "@launchapp/design-system/blocks/settings";

export default function Page() {
  return (
    <DataExportCard
      onExport={(format) => console.log("export", format)}
      lastExportDate="2024-01-01"
    />
  );
}`,
  },
  {
    id: "language-settings",
    name: "Language Settings",
    description: "Language, locale, and timezone preferences settings panel.",
    category: "settings",
    sourcePath: "settings/LanguageSettings/LanguageSettings.tsx",
    code: `import { LanguageSettings } from "@launchapp/design-system/blocks/settings";

export default function Page() {
  return (
    <LanguageSettings
      onSave={(settings) => console.log("save", settings)}
    />
  );
}`,
  },
  {
    id: "notification-settings-card",
    name: "Notification Settings Card",
    description: "Card with grouped notification channel toggles for email, push, and in-app.",
    category: "settings",
    sourcePath: "settings/NotificationSettingsCard/NotificationSettingsCard.tsx",
    code: `import { NotificationSettingsCard } from "@launchapp/design-system/blocks/settings";

export default function Page() {
  return (
    <NotificationSettingsCard
      onSave={(settings) => console.log("save", settings)}
    />
  );
}`,
  },
  {
    id: "privacy-settings",
    name: "Privacy Settings",
    description: "Privacy toggles for data sharing, analytics, and personalization.",
    category: "settings",
    sourcePath: "settings/PrivacySettings/PrivacySettings.tsx",
    code: `import { PrivacySettings } from "@launchapp/design-system/blocks/settings";

const toggles = [
  { id: "analytics", label: "Usage Analytics", description: "Share usage data to improve the product.", enabled: true },
  { id: "marketing", label: "Marketing Emails", description: "Receive product updates and offers.", enabled: false },
];

export default function Page() {
  return (
    <PrivacySettings
      toggles={toggles}
      onToggle={(id, value) => console.log(id, value)}
    />
  );
}`,
  },
  {
    id: "privacy-settings-layout",
    name: "Privacy Settings Layout",
    description: "Full privacy settings page with consent history, data export, and account deletion.",
    category: "settings",
    sourcePath: "settings/PrivacySettingsLayout/PrivacySettingsLayout.tsx",
    code: `import { PrivacySettingsLayout } from "@launchapp/design-system/blocks/settings";

export default function Page() {
  return (
    <PrivacySettingsLayout
      onExportData={() => console.log("export")}
      onDeleteAccount={() => console.log("delete account")}
    />
  );
}`,
  },
  {
    id: "security-settings",
    name: "Security Settings",
    description: "Password change, two-factor authentication, and session management.",
    category: "settings",
    sourcePath: "settings/SecuritySettings/SecuritySettings.tsx",
    code: `import { SecuritySettings } from "@launchapp/design-system/blocks/settings";

export default function Page() {
  return (
    <SecuritySettings
      hasTwoFactor={false}
      onChangePassword={async (current, next) => console.log("change password")}
      onEnableTwoFactor={() => console.log("enable 2fa")}
      onRevokeSession={(id) => console.log("revoke session", id)}
    />
  );
}`,
  },
  {
    id: "settings-layout",
    name: "Settings Layout Block",
    description: "Two-column settings page layout with navigation sidebar and content area.",
    category: "settings",
    sourcePath: "settings/SettingsLayoutBlock.tsx",
    code: `import { SettingsLayoutBlock } from "@launchapp/design-system/blocks/settings";

export default function Page() {
  return (
    <SettingsLayoutBlock
      activeSection="profile"
      onSectionChange={(id) => console.log("section", id)}
    >
      <div>Settings content for active section</div>
    </SettingsLayoutBlock>
  );
}`,
  },
  {
    id: "tabbed-settings",
    name: "Tabbed Settings",
    description: "Settings page with horizontal tab navigation for different setting groups.",
    category: "settings",
    sourcePath: "settings/TabbedSettings/TabbedSettings.tsx",
    code: `import { TabbedSettings } from "@launchapp/design-system/blocks/settings";

const tabs = [
  { id: "profile", label: "Profile", content: <div>Profile settings</div> },
  { id: "account", label: "Account", content: <div>Account settings</div> },
  { id: "notifications", label: "Notifications", content: <div>Notification settings</div> },
];

export default function Page() {
  return <TabbedSettings tabs={tabs} />;
}`,
  },
  {
    id: "team-settings",
    name: "Team Settings",
    description: "Team management settings with member list, roles, and invite controls.",
    category: "settings",
    sourcePath: "settings/TeamSettings/TeamSettings.tsx",
    code: `import { TeamSettings } from "@launchapp/design-system/blocks/settings";

export default function Page() {
  return (
    <TeamSettings
      onInvite={(email, role) => console.log("invite", email, role)}
      onRemoveMember={(id) => console.log("remove", id)}
      onChangeRole={(id, role) => console.log("change role", id, role)}
    />
  );
}`,
  },
  {
    id: "account-deletion-card",
    name: "Account Deletion Card",
    description: "Danger zone card for permanently deleting an account with confirmation.",
    category: "settings",
    sourcePath: "settings/AccountDeletionCard/AccountDeletionCard.tsx",
    code: `import { AccountDeletionCard } from "@launchapp/design-system/blocks/settings";

export default function Page() {
  return (
    <AccountDeletionCard
      onDelete={async (confirmation) => console.log("delete account", confirmation)}
    />
  );
}`,
  },

  // navigation (additional)
  {
    id: "breadcrumb-nav",
    name: "Breadcrumb Navigation",
    description: "Breadcrumb trail navigation component with overflow handling.",
    category: "navigation",
    sourcePath: "navigation/BreadcrumbNav/BreadcrumbNav.tsx",
    code: `import { BreadcrumbNav } from "@launchapp/design-system/blocks/navigation";

export default function Page() {
  return (
    <BreadcrumbNav
      items={[
        { label: "Home", href: "/" },
        { label: "Projects", href: "/projects" },
        { label: "LaunchApp v2" },
      ]}
    />
  );
}`,
  },
  {
    id: "command-palette-nav",
    name: "Command Palette",
    description: "⌘K command palette with search, keyboard navigation, and action groups.",
    category: "navigation",
    sourcePath: "navigation/CommandPalette/CommandPalette.tsx",
    code: `import { CommandPalette } from "@launchapp/design-system/blocks/navigation";

const groups = [
  {
    id: "pages",
    label: "Pages",
    items: [
      { id: "dashboard", label: "Dashboard", href: "/dashboard" },
      { id: "settings", label: "Settings", href: "/settings" },
    ],
  },
];

export default function Page() {
  return (
    <CommandPalette
      groups={groups}
      onSelect={(item) => console.log("navigate to", item.href)}
    />
  );
}`,
  },
  {
    id: "user-menu-block",
    name: "User Menu",
    description: "Avatar dropdown menu with profile, settings, billing, and sign-out actions.",
    category: "navigation",
    sourcePath: "navigation/UserMenu/UserMenu.tsx",
    code: `import { UserMenu } from "@launchapp/design-system/blocks/navigation";

export default function Page() {
  return (
    <UserMenu
      user={{ name: "Alice Johnson", email: "alice@example.com", avatarFallback: "AJ" }}
      onSignOut={() => console.log("sign out")}
    />
  );
}`,
  },

  // data (additional)
  {
    id: "stats-card",
    name: "Stats Card",
    description: "Single-metric stat card with trend indicator and sparkline.",
    category: "data",
    sourcePath: "data/StatsCard/StatsCard.tsx",
    code: `import { StatsCard } from "@launchapp/design-system/blocks/data";

export default function Page() {
  return (
    <StatsCard
      label="Total Revenue"
      value="$45,231"
      trend="up"
      trendValue="+20.1% from last month"
      sparklineData={[30, 40, 35, 50, 49, 60, 70]}
    />
  );
}`,
  },
  {
    id: "metric-grid",
    name: "Metric Grid",
    description: "Responsive grid of metric cards for dashboard overview sections.",
    category: "data",
    sourcePath: "data/MetricGrid/MetricGrid.tsx",
    code: `import { MetricGrid } from "@launchapp/design-system/blocks/data";

const metrics = [
  { id: "revenue", label: "Revenue", value: "$45,231", trend: "up" as const, trendValue: "+20.1%" },
  { id: "users", label: "Active Users", value: "2,350", trend: "up" as const, trendValue: "+15.3%" },
  { id: "orders", label: "Orders", value: "1,247", trend: "down" as const, trendValue: "-4.2%" },
  { id: "conversion", label: "Conversion", value: "3.24%", trend: "neutral" as const, trendValue: "0.0%" },
];

export default function Page() {
  return <MetricGrid metrics={metrics} />;
}`,
  },
  {
    id: "data-activity-feed",
    name: "Activity Feed",
    description: "Paginated activity feed for data dashboards with filtering.",
    category: "data",
    sourcePath: "data/ActivityFeed/ActivityFeed.tsx",
    code: `import { ActivityFeed } from "@launchapp/design-system/blocks/data";

const items = [
  { id: "1", user: { name: "Alice", initials: "AJ" }, action: "Created a project", timestamp: "2 min ago", actionType: "create" },
  { id: "2", user: { name: "Bob", initials: "BS" }, action: "Merged a PR", timestamp: "1 hour ago", actionType: "merge" },
];

export default function Page() {
  return <ActivityFeed items={items} />;
}`,
  },
  {
    id: "empty-state-block",
    name: "Empty State",
    description: "Empty state placeholder with icon, title, description, and CTA.",
    category: "data",
    sourcePath: "data/EmptyState/EmptyState.tsx",
    code: `import { EmptyState } from "@launchapp/design-system/blocks/data";

export default function Page() {
  return (
    <EmptyState
      title="No projects yet"
      description="Get started by creating your first project."
      action={<button type="button">Create project</button>}
    />
  );
}`,
  },
  {
    id: "calendar-view",
    name: "Calendar View",
    description: "Monthly calendar view with event markers and day selection.",
    category: "data",
    sourcePath: "data/CalendarView/CalendarView.tsx",
    code: `import { CalendarView } from "@launchapp/design-system/blocks/data";

const events = [
  { id: "1", date: "2024-01-15", title: "Team standup", color: "blue" },
  { id: "2", date: "2024-01-20", title: "Product launch", color: "green" },
];

export default function Page() {
  return <CalendarView events={events} onDateSelect={(date) => console.log("selected", date)} />;
}`,
  },
  {
    id: "chart-card",
    name: "Chart Card",
    description: "Card wrapper for charts with title, description, period selector, and actions.",
    category: "data",
    sourcePath: "data/ChartCard/ChartCard.tsx",
    code: `import { ChartCard } from "@launchapp/design-system/blocks/data";

export default function Page() {
  return (
    <ChartCard
      title="Revenue Over Time"
      description="Monthly revenue for the past 6 months"
      periods={["1W", "1M", "3M", "6M", "1Y"]}
    >
      <div className="h-48 flex items-center justify-center text-muted-foreground text-sm">
        Chart goes here
      </div>
    </ChartCard>
  );
}`,
  },
  {
    id: "data-trend",
    name: "Data Trend",
    description: "Trend indicator card showing metric value with percentage change and sparkline.",
    category: "data",
    sourcePath: "data/DataTrend/DataTrend.tsx",
    code: `import { DataTrend } from "@launchapp/design-system/blocks/data";

export default function Page() {
  return (
    <DataTrend
      label="Monthly Active Users"
      value={12450}
      previousValue={10800}
      format="number"
      sparklineData={[8200, 9100, 10200, 10800, 11400, 12450]}
    />
  );
}`,
  },
  {
    id: "empty-state-card",
    name: "Empty State Card",
    description: "Card-styled empty state for table and list components.",
    category: "data",
    sourcePath: "data/EmptyStateCard/EmptyStateCard.tsx",
    code: `import { EmptyStateCard } from "@launchapp/design-system/blocks/data";

export default function Page() {
  return (
    <EmptyStateCard
      title="No results found"
      description="Try adjusting your search or filters to find what you're looking for."
    />
  );
}`,
  },
  {
    id: "filter-bar",
    name: "Filter Bar",
    description: "Horizontal filter bar with multi-select dropdowns and active filter chips.",
    category: "data",
    sourcePath: "data/FilterBar/FilterBar.tsx",
    code: `import { FilterBar } from "@launchapp/design-system/blocks/data";

const filters = [
  { id: "status", label: "Status", options: ["Active", "Inactive", "Pending"] },
  { id: "role", label: "Role", options: ["Admin", "Member", "Viewer"] },
];

export default function Page() {
  return (
    <FilterBar
      filters={filters}
      onFilterChange={(id, values) => console.log("filter", id, values)}
      onClearAll={() => console.log("clear all")}
    />
  );
}`,
  },
  {
    id: "funnel-chart-card",
    name: "Funnel Chart Card",
    description: "Card displaying a conversion funnel chart with stage-by-stage breakdown.",
    category: "data",
    sourcePath: "data/FunnelChartCard/FunnelChartCard.tsx",
    code: `import { FunnelChartCard } from "@launchapp/design-system/blocks/data";

const stages = [
  { label: "Visitors", value: 10000 },
  { label: "Sign-ups", value: 3500 },
  { label: "Activated", value: 1200 },
  { label: "Converted", value: 420 },
];

export default function Page() {
  return <FunnelChartCard title="Conversion Funnel" stages={stages} />;
}`,
  },
  {
    id: "gauge-card",
    name: "Gauge Card",
    description: "Card with circular gauge meter for displaying a single KPI as a percentage.",
    category: "data",
    sourcePath: "data/GaugeCard/GaugeCard.tsx",
    code: `import { GaugeCard } from "@launchapp/design-system/blocks/data";

export default function Page() {
  return (
    <GaugeCard
      title="System Health"
      value={87}
      unit="%"
      threshold={{ warning: 60, critical: 30 }}
    />
  );
}`,
  },
  {
    id: "kpi-comparison-card",
    name: "KPI Comparison Card",
    description: "Side-by-side KPI comparison card showing current vs previous period.",
    category: "data",
    sourcePath: "data/KPIComparisonCard/KPIComparisonCard.tsx",
    code: `import { KPIComparisonCard } from "@launchapp/design-system/blocks/data";

export default function Page() {
  return (
    <KPIComparisonCard
      title="Revenue"
      current={{ value: 45231, label: "This Month", formatted: "$45,231" }}
      previous={{ value: 37600, label: "Last Month", formatted: "$37,600" }}
    />
  );
}`,
  },
  {
    id: "sparkline-card",
    name: "Sparkline Card",
    description: "Compact metric card with inline sparkline chart for trend visualization.",
    category: "data",
    sourcePath: "data/SparklineCard/SparklineCard.tsx",
    code: `import { SparklineCard } from "@launchapp/design-system/blocks/data";

export default function Page() {
  return (
    <SparklineCard
      label="Weekly Signups"
      value={342}
      trend="up"
      trendValue="+12%"
      data={[180, 220, 195, 280, 310, 290, 342]}
    />
  );
}`,
  },
  {
    id: "data-table-card",
    name: "Data Table Card",
    description: "Card-wrapped data table with header, title, and export button.",
    category: "data",
    sourcePath: "data/DataTableCard/DataTableCard.tsx",
    code: `import { DataTableCard } from "@launchapp/design-system/blocks/data";
import type { ColumnDef } from "@tanstack/react-table";

const columns: ColumnDef<{ name: string; email: string; status: string }>[] = [
  { accessorKey: "name", header: "Name" },
  { accessorKey: "email", header: "Email" },
  { accessorKey: "status", header: "Status" },
];

const data = [
  { name: "Alice Johnson", email: "alice@example.com", status: "Active" },
  { name: "Bob Smith", email: "bob@example.com", status: "Pending" },
];

export default function Page() {
  return <DataTableCard title="Users" columns={columns} data={data} />;
}`,
  },
  {
    id: "column-filters",
    name: "Column Filters",
    description: "Per-column filter controls for data tables with type-aware input components.",
    category: "data",
    sourcePath: "data/ColumnFilters/ColumnFilters.tsx",
    code: `import { ColumnFilters } from "@launchapp/design-system/blocks/data";

const filters = [
  { id: "name", label: "Name", type: "text" as const },
  { id: "status", label: "Status", type: "select" as const, options: ["active", "inactive"] },
];

export default function Page() {
  return (
    <ColumnFilters
      filters={filters}
      onFiltersChange={(values) => console.log("filters changed", values)}
    />
  );
}`,
  },
  {
    id: "data-table-toolbar",
    name: "Data Table Toolbar",
    description: "Toolbar for data tables with global search, filter, column visibility, and bulk actions.",
    category: "data",
    sourcePath: "data/DataTableToolbar/DataTableToolbar.tsx",
    code: `import { DataTableToolbar } from "@launchapp/design-system/blocks/data";

export default function Page() {
  return (
    <DataTableToolbar
      onSearch={(q) => console.log("search", q)}
      onAddNew={() => console.log("add new")}
      onExport={() => console.log("export")}
    />
  );
}`,
  },

  // ecommerce (additional)
  {
    id: "order-summary",
    name: "Order Summary",
    description: "Order summary sidebar with line items, discounts, taxes, and total.",
    category: "ecommerce",
    sourcePath: "ecommerce/OrderSummary/OrderSummary.tsx",
    code: `import { OrderSummary } from "@launchapp/design-system/blocks/ecommerce";

const items = [
  { id: "1", name: "Premium Plan", description: "Annual subscription", price: 290, quantity: 1 },
];

export default function Page() {
  return (
    <OrderSummary
      items={items}
      subtotal={290}
      tax={29}
      total={319}
      onApplyDiscount={(code) => console.log("apply", code)}
    />
  );
}`,
  },
  {
    id: "cart-drawer",
    name: "Cart Drawer",
    description: "Slide-in shopping cart drawer with item management and checkout CTA.",
    category: "ecommerce",
    sourcePath: "ecommerce/CartDrawer/CartDrawer.tsx",
    code: `import { CartDrawer } from "@launchapp/design-system/blocks/ecommerce";

const items = [
  { id: "1", name: "Wireless Headphones", price: 99, quantity: 1, imageUrl: "" },
];

export default function Page() {
  return (
    <CartDrawer
      items={items}
      total={99}
      onUpdateQuantity={(id, qty) => console.log("update", id, qty)}
      onRemove={(id) => console.log("remove", id)}
      onCheckout={() => console.log("checkout")}
    />
  );
}`,
  },
  {
    id: "product-grid",
    name: "Product Grid",
    description: "Responsive product grid with sorting, filtering, and pagination.",
    category: "ecommerce",
    sourcePath: "ecommerce/ProductGrid/ProductGrid.tsx",
    code: `import { ProductGrid } from "@launchapp/design-system/blocks/ecommerce";

const products = [
  { id: "1", name: "Wireless Headphones", price: 99, rating: 4.5, imageUrl: "", badge: "New" },
  { id: "2", name: "Running Shoes", price: 75, rating: 4.2, imageUrl: "" },
  { id: "3", name: "Smart Watch", price: 199, rating: 4.8, imageUrl: "", badge: "Popular" },
];

export default function Page() {
  return (
    <ProductGrid
      products={products}
      onAddToCart={(id) => console.log("add to cart", id)}
    />
  );
}`,
  },

  // marketing (additional)
  {
    id: "billing-card",
    name: "Billing Card",
    description: "Pricing plan card with features list, billing period toggle, and CTA.",
    category: "marketing",
    sourcePath: "marketing/BillingCard.tsx",
    code: `import { BillingCard } from "@launchapp/design-system/blocks/marketing";

export default function Page() {
  return (
    <BillingCard
      name="Pro"
      price={{ monthly: 29, annual: 290 }}
      description="For growing teams"
      features={["Unlimited projects", "100GB storage", "Priority support", "Custom domains"]}
      highlighted
      ctaLabel="Get started"
      onSelect={() => console.log("selected pro")}
    />
  );
}`,
  },
  {
    id: "changelog-timeline",
    name: "Changelog Timeline",
    description: "Marketing-facing changelog timeline showing product updates and releases.",
    category: "marketing",
    sourcePath: "marketing/ChangelogTimeline.tsx",
    code: `import { ChangelogTimeline } from "@launchapp/design-system/blocks/marketing";

const entries = [
  { id: "1", version: "2.0.0", date: "March 2024", title: "Design System v2", description: "268 components, dark mode, and more.", badge: "Major" },
  { id: "2", version: "1.5.0", date: "January 2024", title: "New Components", description: "Added Carousel, Timeline, and Heatmap.", badge: "Feature" },
];

export default function Page() {
  return <ChangelogTimeline entries={entries} />;
}`,
  },
  {
    id: "feature-comparison",
    name: "Feature Comparison",
    description: "Side-by-side feature comparison table for free vs paid tiers.",
    category: "marketing",
    sourcePath: "marketing/FeatureComparison.tsx",
    code: `import { FeatureComparison } from "@launchapp/design-system/blocks/marketing";

const features = [
  { name: "Projects", free: "5", pro: "Unlimited" },
  { name: "Storage", free: "5GB", pro: "100GB" },
  { name: "Team members", free: "3", pro: "Unlimited" },
  { name: "Priority support", free: false, pro: true },
  { name: "Custom domains", free: false, pro: true },
];

export default function Page() {
  return <FeatureComparison features={features} plans={["Free", "Pro"]} />;
}`,
  },
  {
    id: "logo-cloud",
    name: "Logo Cloud",
    description: "Scrolling or static grid of company logos for social proof sections.",
    category: "marketing",
    sourcePath: "marketing/LogoCloud/LogoCloud.tsx",
    code: `import { LogoCloud } from "@launchapp/design-system/blocks/marketing";

const logos = [
  { id: "1", name: "Acme Corp", src: "/logos/acme.svg" },
  { id: "2", name: "Globex", src: "/logos/globex.svg" },
  { id: "3", name: "Initech", src: "/logos/initech.svg" },
];

export default function Page() {
  return <LogoCloud logos={logos} headline="Trusted by leading companies" />;
}`,
  },
  {
    id: "pricing-comparison-table",
    name: "Pricing Comparison Table",
    description: "Detailed feature-by-feature comparison table across all pricing tiers.",
    category: "marketing",
    sourcePath: "marketing/PricingComparisonTable/PricingComparisonTable.tsx",
    code: `import { PricingComparisonTable } from "@launchapp/design-system/blocks/marketing";

const plans = [
  { id: "free", name: "Free", price: "$0" },
  { id: "pro", name: "Pro", price: "$29/mo", highlighted: true },
  { id: "enterprise", name: "Enterprise", price: "Custom" },
];

const features = [
  { category: "Core", items: [
    { name: "Projects", free: "5", pro: "Unlimited", enterprise: "Unlimited" },
    { name: "Storage", free: "5GB", pro: "100GB", enterprise: "1TB" },
  ]},
];

export default function Page() {
  return <PricingComparisonTable plans={plans} features={features} />;
}`,
  },

  // app-shells (additional)
  {
    id: "mobile-nav-drawer-shell",
    name: "Mobile Nav Drawer Shell",
    description: "Full app shell with slide-in mobile navigation drawer and overlay.",
    category: "app-shells",
    sourcePath: "layout/MobileNavDrawerShell/MobileNavDrawerShell.tsx",
    code: `import { MobileNavDrawerShell } from "@launchapp/design-system/blocks/layout";

const navItems = [
  { id: "home", label: "Home", href: "/", icon: <span>🏠</span>, isActive: true },
  { id: "projects", label: "Projects", href: "/projects", icon: <span>📁</span> },
  { id: "settings", label: "Settings", href: "/settings", icon: <span>⚙️</span> },
];

export default function Page() {
  return (
    <MobileNavDrawerShell navItems={navItems}>
      <div className="p-6">
        <h1 className="text-xl font-semibold">Mobile App</h1>
        <p className="mt-2 text-muted-foreground">Tap the menu icon to open navigation.</p>
      </div>
    </MobileNavDrawerShell>
  );
}`,
  },
  {
    id: "multi-panel-layout-shell",
    name: "Multi Panel Layout",
    description: "Flexible multi-panel application layout with configurable pane arrangement.",
    category: "app-shells",
    sourcePath: "layout/MultiPanelLayout/MultiPanelLayout.tsx",
    code: `import { MultiPanelLayout } from "@launchapp/design-system/blocks/layout";

export default function Page() {
  return (
    <div className="h-[480px]">
      <MultiPanelLayout
        leftPanel={<div className="p-4 h-full bg-muted/30">Navigation / File Tree</div>}
        mainPanel={<div className="p-4 h-full">Editor / Main Content</div>}
        rightPanel={<div className="p-4 h-full bg-muted/20">Inspector / Properties</div>}
      />
    </div>
  );
}`,
  },

  // onboarding (additional)
  {
    id: "multi-step-wizard-block",
    name: "Multi Step Wizard",
    description: "Generic multi-step wizard component with step validation and progress bar.",
    category: "onboarding",
    sourcePath: "onboarding/MultiStepWizard.tsx",
    code: `import { MultiStepWizard } from "@launchapp/design-system/blocks/onboarding";

const steps = [
  { id: "basics", title: "Basic Info", content: <div className="p-4">Name and email form</div> },
  { id: "plan", title: "Choose Plan", content: <div className="p-4">Plan selection</div> },
  { id: "payment", title: "Payment", content: <div className="p-4">Payment form</div> },
];

export default function Page() {
  return <MultiStepWizard steps={steps} onComplete={() => console.log("complete")} />;
}`,
  },
  {
    id: "progress-stepper",
    name: "Progress Stepper",
    description: "Horizontal or vertical step indicator showing progress through a multi-step flow.",
    category: "onboarding",
    sourcePath: "onboarding/ProgressStepper.tsx",
    code: `import { ProgressStepper } from "@launchapp/design-system/blocks/onboarding";

const steps = [
  { id: "profile", title: "Profile", completed: true },
  { id: "billing", title: "Billing", completed: true },
  { id: "review", title: "Review", completed: false, current: true },
  { id: "launch", title: "Launch", completed: false },
];

export default function Page() {
  return <ProgressStepper steps={steps} orientation="horizontal" />;
}`,
  },
  {
    id: "setup-checklist",
    name: "Setup Checklist",
    description: "Post-signup setup checklist guiding users through initial configuration steps.",
    category: "onboarding",
    sourcePath: "onboarding/SetupChecklist.tsx",
    code: `import { SetupChecklist } from "@launchapp/design-system/blocks/onboarding";

const steps = [
  { id: "verify", title: "Verify your email", completed: true, href: "#" },
  { id: "profile", title: "Complete your profile", completed: false, href: "/settings/profile" },
  { id: "invite", title: "Invite your team", completed: false, href: "/team/invite" },
  { id: "integrate", title: "Set up an integration", completed: false, href: "/integrations" },
];

export default function Page() {
  return <SetupChecklist steps={steps} title="Complete setup" />;
}`,
  },

  // admin
  {
    id: "api-key-manager",
    name: "API Key Manager",
    description: "Create, view, and revoke API keys with permission scopes and expiry.",
    category: "admin",
    sourcePath: "admin/APIKeyManager/APIKeyManager.tsx",
    code: `import { APIKeyManager } from "@launchapp/design-system/blocks/admin";

const keys = [
  { id: "1", name: "Production Key", key: "sk-prod-xxxx", createdAt: "2024-01-01", active: true, permissions: ["read", "write"] },
  { id: "2", name: "Read-only Key", key: "sk-ro-xxxx", createdAt: "2024-02-01", active: true, permissions: ["read"] },
];

export default function Page() {
  return (
    <APIKeyManager
      keys={keys}
      onCreateKey={(data) => console.log("create", data)}
      onRevokeKey={(id) => console.log("revoke", id)}
      onCopyKey={(key) => navigator.clipboard.writeText(key)}
      availablePermissions={["read", "write", "admin"]}
    />
  );
}`,
  },
  {
    id: "audit-log-viewer",
    name: "Audit Log Viewer",
    description: "Paginated audit log with search, level filters, and action filters.",
    category: "admin",
    sourcePath: "admin/AuditLogViewer/AuditLogViewer.tsx",
    code: `import { AuditLogViewer } from "@launchapp/design-system/blocks/admin";

const logs = [
  { id: "1", actor: { name: "Alice" }, action: "user.create", level: "info", timestamp: "2024-01-01T10:00:00Z", message: "Created user bob@example.com" },
  { id: "2", actor: { name: "Bob" }, action: "api_key.revoke", level: "warning", timestamp: "2024-01-02T11:00:00Z", message: "Revoked key sk-xxx" },
];

export default function Page() {
  return <AuditLogViewer logs={logs} pageSize={20} />;
}`,
  },
  {
    id: "system-settings-panel",
    name: "System Settings Panel",
    description: "Admin panel for toggling system-wide feature flags and configuration.",
    category: "admin",
    sourcePath: "admin/SystemSettingsPanel/SystemSettingsPanel.tsx",
    code: `import { SystemSettingsPanel } from "@launchapp/design-system/blocks/admin";

const settings = [
  { id: "maintenance", label: "Maintenance Mode", description: "Take the site offline for maintenance", enabled: false },
  { id: "signups", label: "New Signups", description: "Allow new user registrations", enabled: true },
];

export default function Page() {
  return <SystemSettingsPanel settings={settings} onToggle={(id, value) => console.log(id, value)} />;
}`,
  },
  {
    id: "user-management-table",
    name: "User Management Table",
    description: "Admin table for managing users — ban, unban, edit, and delete.",
    category: "admin",
    sourcePath: "admin/UserManagementTable/UserManagementTable.tsx",
    code: `import { UserManagementTable } from "@launchapp/design-system/blocks/admin";

const users = [
  { id: "1", name: "Alice Johnson", email: "alice@example.com", role: "admin", status: "active", createdAt: "2024-01-01" },
  { id: "2", name: "Bob Smith", email: "bob@example.com", role: "member", status: "active", createdAt: "2024-02-01" },
];

export default function Page() {
  return (
    <UserManagementTable
      users={users}
      onBanUser={(id) => console.log("ban", id)}
      onDeleteUser={(id) => console.log("delete", id)}
      onAddUser={() => console.log("add user")}
    />
  );
}`,
  },
  {
    id: "webhook-manager",
    name: "Webhook Manager",
    description: "Create and manage outbound webhooks with event subscriptions and delivery logs.",
    category: "admin",
    sourcePath: "admin/WebhookManager/WebhookManager.tsx",
    code: `import { WebhookManager } from "@launchapp/design-system/blocks/admin";

const webhooks = [
  { id: "1", url: "https://example.com/hook", events: ["user.created"], active: true, createdAt: "2024-01-01" },
];

export default function Page() {
  return (
    <WebhookManager
      webhooks={webhooks}
      onCreateWebhook={(data) => console.log("create", data)}
      onDeleteWebhook={(id) => console.log("delete", id)}
      onToggleWebhook={(id, active) => console.log(id, active)}
      availableEvents={["user.created", "user.deleted", "payment.succeeded"]}
    />
  );
}`,
  },

  // app
  {
    id: "app-shell-minimal",
    name: "App Shell Minimal",
    description: "Minimal full-page shell with header, sidebar, and main content area.",
    category: "app",
    sourcePath: "app/AppShellMinimal/AppShellMinimal.tsx",
    code: `import { AppShellMinimal } from "@launchapp/design-system/blocks/app";

export default function Page() {
  return (
    <AppShellMinimal
      header={<div className="px-4 font-semibold">My App</div>}
      sidebar={<nav className="p-4">Sidebar</nav>}
    >
      <div className="p-6">Main content</div>
    </AppShellMinimal>
  );
}`,
  },
  {
    id: "collapsible-sidebar-block",
    name: "Collapsible Sidebar",
    description: "Sidebar that collapses to icon-only mode with a toggle button.",
    category: "app",
    sourcePath: "app/CollapsibleSidebar/CollapsibleSidebar.tsx",
    code: `import { CollapsibleSidebar } from "@launchapp/design-system/blocks/app";

const navItems = [
  { id: "home", label: "Home", href: "/", icon: <span>🏠</span> },
  { id: "settings", label: "Settings", href: "/settings", icon: <span>⚙️</span> },
];

export default function Page() {
  return (
    <CollapsibleSidebar navItems={navItems}>
      <div className="p-6">Main content</div>
    </CollapsibleSidebar>
  );
}`,
  },
  {
    id: "compact-sidebar",
    name: "Compact Sidebar",
    description: "Narrow icon-and-label sidebar suitable for dense application UIs.",
    category: "app",
    sourcePath: "app/CompactSidebar/CompactSidebar.tsx",
    code: `import { CompactSidebar } from "@launchapp/design-system/blocks/app";

const navItems = [
  { id: "dashboard", label: "Dashboard", href: "/", icon: <span>⊞</span>, isActive: true },
  { id: "analytics", label: "Analytics", href: "/analytics", icon: <span>📈</span> },
];

export default function Page() {
  return (
    <CompactSidebar navItems={navItems}>
      <div className="p-6">Content</div>
    </CompactSidebar>
  );
}`,
  },
  {
    id: "dashboard-header",
    name: "Dashboard Header",
    description: "Top header bar with breadcrumbs, user menu, and action buttons.",
    category: "app",
    sourcePath: "app/DashboardHeader/DashboardHeader.tsx",
    code: `import { DashboardHeader } from "@launchapp/design-system/blocks/app";

export default function Page() {
  return (
    <DashboardHeader
      title="Dashboard"
      breadcrumbs={[{ label: "Home", href: "/" }, { label: "Dashboard" }]}
      actions={<button type="button">New</button>}
    />
  );
}`,
  },
  {
    id: "page-container",
    name: "Page Container",
    description: "Centered content container with configurable max-width and padding.",
    category: "app",
    sourcePath: "app/PageContainer/PageContainer.tsx",
    code: `import { PageContainer } from "@launchapp/design-system/blocks/app";

export default function Page() {
  return (
    <PageContainer title="My Page" description="Page description here.">
      <div>Content goes here</div>
    </PageContainer>
  );
}`,
  },
  {
    id: "settings-layout-block",
    name: "Settings Layout",
    description: "Two-column settings layout with category sidebar and content area.",
    category: "app",
    sourcePath: "app/SettingsLayout.tsx",
    code: `import { SettingsLayout } from "@launchapp/design-system/blocks/app";

const sections = [
  { id: "profile", label: "Profile", href: "/settings/profile" },
  { id: "billing", label: "Billing", href: "/settings/billing" },
];

export default function Page() {
  return (
    <SettingsLayout sections={sections} activeSection="profile">
      <div>Profile settings content</div>
    </SettingsLayout>
  );
}`,
  },

  // billing
  {
    id: "invoice-table",
    name: "Invoice Table",
    description: "Table of billing invoices with status badges and download actions.",
    category: "billing",
    sourcePath: "billing/InvoiceTable.tsx",
    code: `import { InvoiceTable } from "@launchapp/design-system/blocks/billing";

const invoices = [
  { id: "INV-001", date: "2024-01-01", amount: 49, currency: "USD", status: "paid", downloadUrl: "#" },
  { id: "INV-002", date: "2024-02-01", amount: 49, currency: "USD", status: "paid", downloadUrl: "#" },
];

export default function Page() {
  return <InvoiceTable invoices={invoices} onDownload={(id) => console.log("download", id)} />;
}`,
  },
  {
    id: "payment-method-card",
    name: "Payment Method Card",
    description: "Card displaying a saved payment method with default badge and remove action.",
    category: "billing",
    sourcePath: "billing/PaymentMethodCard.tsx",
    code: `import { PaymentMethodCard } from "@launchapp/design-system/blocks/billing";

export default function Page() {
  return (
    <PaymentMethodCard
      type="card"
      brand="Visa"
      last4="4242"
      expiryMonth={12}
      expiryYear={2026}
      isDefault={true}
      onRemove={() => console.log("remove")}
      onSetDefault={() => console.log("set default")}
    />
  );
}`,
  },
  {
    id: "subscription-manager",
    name: "Subscription Manager",
    description: "Plan picker with billing interval toggle and current plan indicator.",
    category: "billing",
    sourcePath: "billing/SubscriptionManager.tsx",
    code: `import { SubscriptionManager } from "@launchapp/design-system/blocks/billing";

const plans = [
  { id: "starter", name: "Starter", price: "$9/mo", billingCycle: "month", features: ["5 projects", "10GB storage"] },
  { id: "pro", name: "Pro", price: "$29/mo", billingCycle: "month", features: ["Unlimited projects", "100GB storage"] },
];

export default function Page() {
  return (
    <SubscriptionManager
      plans={plans}
      currentPlanId="starter"
      onChangePlan={(id) => console.log("change to", id)}
    />
  );
}`,
  },
  {
    id: "usage-meter",
    name: "Usage Meter",
    description: "Visual usage meter showing current consumption against plan limits.",
    category: "billing",
    sourcePath: "billing/UsageMeter.tsx",
    code: `import { UsageMeter } from "@launchapp/design-system/blocks/billing";

const metrics = [
  { id: "api_calls", label: "API Calls", current: 7500, limit: 10000, unit: "calls" },
  { id: "storage", label: "Storage", current: 3.2, limit: 10, unit: "GB" },
];

export default function Page() {
  return <UsageMeter metrics={metrics} />;
}`,
  },

  // blog
  {
    id: "post-list",
    name: "Post List",
    description: "Blog post listing with category filters and pagination.",
    category: "blog",
    sourcePath: "blog/PostList/PostList.tsx",
    code: `import { PostList } from "@launchapp/design-system/blocks/blog";

const posts = [
  { id: "1", title: "Getting Started", slug: "getting-started", excerpt: "A quick intro.", category: "Tutorial", publishedAt: "2024-01-01", author: { name: "Alice" } },
  { id: "2", title: "Advanced Patterns", slug: "advanced", excerpt: "Deep dive.", category: "Guide", publishedAt: "2024-02-01", author: { name: "Bob" } },
];

export default function Page() {
  return <PostList title="Blog" posts={posts} categories={["Tutorial", "Guide"]} />;
}`,
  },
  {
    id: "post-detail",
    name: "Post Detail",
    description: "Full blog post layout with author info, metadata, and related posts.",
    category: "blog",
    sourcePath: "blog/PostDetail/PostDetail.tsx",
    code: `import { PostDetail } from "@launchapp/design-system/blocks/blog";

export default function Page() {
  return (
    <PostDetail
      title="Getting Started with LaunchApp"
      publishedAt="2024-01-01"
      author={{ name: "Alice Johnson", avatarUrl: "" }}
      category="Tutorial"
      content={<p>Post content goes here.</p>}
    />
  );
}`,
  },
  {
    id: "newsletter-signup",
    name: "Newsletter Signup",
    description: "Email newsletter signup form with headline and confirmation state.",
    category: "blog",
    sourcePath: "blog/NewsletterSignup/NewsletterSignup.tsx",
    code: `import { NewsletterSignup } from "@launchapp/design-system/blocks/blog";

export default function Page() {
  return (
    <NewsletterSignup
      headline="Stay in the loop"
      description="Get the latest updates delivered to your inbox."
      onSubscribe={(email) => console.log("subscribe", email)}
    />
  );
}`,
  },

  // community
  {
    id: "user-profile-card",
    name: "User Profile Card",
    description: "Profile card with avatar, bio, stats, and action buttons.",
    category: "community",
    sourcePath: "community/UserProfileCard/UserProfileCard.tsx",
    code: `import { UserProfileCard } from "@launchapp/design-system/blocks/community";

export default function Page() {
  return (
    <UserProfileCard
      user={{ name: "Alice Johnson", username: "alice", bio: "Full-stack developer." }}
      stats={[{ label: "Posts", value: 42 }, { label: "Followers", value: 128 }]}
    />
  );
}`,
  },
  {
    id: "team-member-card",
    name: "Team Member Card",
    description: "Card displaying a team member's avatar, role, and social links.",
    category: "community",
    sourcePath: "community/TeamMemberCard/TeamMemberCard.tsx",
    code: `import { TeamMemberCard } from "@launchapp/design-system/blocks/community";

export default function Page() {
  return (
    <TeamMemberCard
      name="Alice Johnson"
      role="Engineering Lead"
      bio="Builds fast, ships faster."
    />
  );
}`,
  },
  {
    id: "community-themes-gallery",
    name: "Community Themes Gallery",
    description: "Grid gallery of community-submitted themes with preview and like actions.",
    category: "community",
    sourcePath: "community/CommunityThemesGallery.tsx",
    code: `import { CommunityThemesGallery } from "@launchapp/design-system/blocks/community";

const themes = [
  { id: "1", name: "Midnight Blue", author: "Alice", likes: 42, previewColors: ["#0f172a", "#1e40af", "#3b82f6"] },
  { id: "2", name: "Forest Green", author: "Bob", likes: 28, previewColors: ["#14532d", "#16a34a", "#4ade80"] },
];

export default function Page() {
  return <CommunityThemesGallery themes={themes} onLike={(id) => console.log("like", id)} />;
}`,
  },
  {
    id: "theme-submission-form",
    name: "Theme Submission Form",
    description: "Form for submitting a community theme with name, colors, and preview.",
    category: "community",
    sourcePath: "community/ThemeSubmissionForm.tsx",
    code: `import { ThemeSubmissionForm } from "@launchapp/design-system/blocks/community";

export default function Page() {
  return (
    <ThemeSubmissionForm
      onSubmit={(data) => console.log("submit", data)}
    />
  );
}`,
  },

  // errors
  {
    id: "not-found-page",
    name: "404 Not Found",
    description: "Clean 404 page with headline, description, and home/back actions.",
    category: "errors",
    sourcePath: "errors/NotFound/NotFound.tsx",
    code: `import { NotFound } from "@launchapp/design-system/blocks/errors";
import Link from "next/link";

export default function NotFoundPage() {
  return (
    <NotFound
      homeAction={<Link href="/">Go home</Link>}
      backAction={<button type="button" onClick={() => history.back()}>Go back</button>}
    />
  );
}`,
  },
  {
    id: "server-error-page",
    name: "500 Server Error",
    description: "Server error page with retry action and support contact.",
    category: "errors",
    sourcePath: "errors/ServerError/ServerError.tsx",
    code: `import { ServerError } from "@launchapp/design-system/blocks/errors";

export default function ErrorPage() {
  return (
    <ServerError
      onRetry={() => window.location.reload()}
    />
  );
}`,
  },
  {
    id: "maintenance-page",
    name: "Maintenance Page",
    description: "Maintenance mode page with status message and estimated return time.",
    category: "errors",
    sourcePath: "errors/Maintenance/Maintenance.tsx",
    code: `import { Maintenance } from "@launchapp/design-system/blocks/errors";

export default function MaintenancePage() {
  return (
    <Maintenance
      title="We'll be back soon"
      description="We're performing scheduled maintenance. Estimated downtime: 30 minutes."
      estimatedReturn="2024-01-01T15:00:00Z"
    />
  );
}`,
  },

  // files
  {
    id: "file-grid",
    name: "File Grid",
    description: "Responsive grid of file thumbnails with selection, open, and delete actions.",
    category: "files",
    sourcePath: "files/FileGrid/FileGrid.tsx",
    code: `import { FileGrid } from "@launchapp/design-system/blocks/files";

const files = [
  { id: "1", name: "report.pdf", type: "pdf", size: "2.4 MB", updatedAt: "2024-01-01" },
  { id: "2", name: "photo.jpg", type: "image", size: "1.1 MB", updatedAt: "2024-01-02", thumbnailUrl: "/thumb.jpg" },
];

export default function Page() {
  return (
    <FileGrid
      files={files}
      onOpen={(id) => console.log("open", id)}
      onDelete={(id) => console.log("delete", id)}
      selectionEnabled
    />
  );
}`,
  },
  {
    id: "file-list",
    name: "File List",
    description: "List view of files with metadata, sort, and bulk action support.",
    category: "files",
    sourcePath: "files/FileList.tsx",
    code: `import { FileList } from "@launchapp/design-system/blocks/files";

const files = [
  { id: "1", name: "document.pdf", type: "pdf", size: "2.4 MB", updatedAt: "2024-01-01" },
  { id: "2", name: "spreadsheet.xlsx", type: "spreadsheet", size: "540 KB", updatedAt: "2024-01-02" },
];

export default function Page() {
  return (
    <FileList
      files={files}
      onOpen={(id) => console.log("open", id)}
      onDelete={(id) => console.log("delete", id)}
    />
  );
}`,
  },
  {
    id: "drop-zone",
    name: "Drop Zone",
    description: "Drag-and-drop file upload zone with file type and size restrictions.",
    category: "files",
    sourcePath: "files/DropZone.tsx",
    code: `import { DropZone } from "@launchapp/design-system/blocks/files";

export default function Page() {
  return (
    <DropZone
      accept={{ "image/*": [".png", ".jpg"], "application/pdf": [".pdf"] }}
      maxSize={10 * 1024 * 1024}
      onDrop={(files) => console.log("dropped", files)}
    />
  );
}`,
  },
  {
    id: "image-gallery",
    name: "Image Gallery",
    description: "Masonry or grid image gallery with lightbox preview.",
    category: "files",
    sourcePath: "files/ImageGallery.tsx",
    code: `import { ImageGallery } from "@launchapp/design-system/blocks/files";

const images = [
  { id: "1", src: "/photo1.jpg", alt: "Photo 1", width: 800, height: 600 },
  { id: "2", src: "/photo2.jpg", alt: "Photo 2", width: 600, height: 800 },
];

export default function Page() {
  return <ImageGallery images={images} />;
}`,
  },

  // forms
  {
    id: "file-upload-zone",
    name: "File Upload Zone",
    description: "Form-integrated file upload with progress bar and file preview list.",
    category: "forms",
    sourcePath: "forms/FileUploadZone/FileUploadZone.tsx",
    code: `import { FileUploadZone } from "@launchapp/design-system/blocks/forms";

export default function Page() {
  return (
    <FileUploadZone
      onUpload={(files) => console.log("upload", files)}
      maxFiles={5}
      maxSize={5 * 1024 * 1024}
    />
  );
}`,
  },
  {
    id: "rich-text-editor",
    name: "Rich Text Editor",
    description: "WYSIWYG editor with bold, italic, lists, links, and code blocks.",
    category: "forms",
    sourcePath: "forms/RichTextEditor/RichTextEditor.tsx",
    code: `import { RichTextEditor } from "@launchapp/design-system/blocks/forms";

export default function Page() {
  return (
    <RichTextEditor
      placeholder="Start writing..."
      onChange={(content) => console.log("content", content)}
    />
  );
}`,
  },

  // integrations
  {
    id: "oauth-connect-card",
    name: "OAuth Connect Card",
    description: "Card for connecting or disconnecting an OAuth provider integration.",
    category: "integrations",
    sourcePath: "integrations/OAuthConnectCard.tsx",
    code: `import { OAuthConnectCard } from "@launchapp/design-system/blocks/integrations";

export default function Page() {
  return (
    <OAuthConnectCard
      provider={{ id: "github", name: "GitHub", description: "Connect your GitHub account", scopes: ["repo", "user"] }}
      isConnected={false}
      onConnect={() => console.log("connect")}
      onDisconnect={() => console.log("disconnect")}
    />
  );
}`,
  },
  {
    id: "integrations-api-key-manager",
    name: "API Key Manager (Integrations)",
    description: "Manage third-party API keys for external service integrations.",
    category: "integrations",
    sourcePath: "integrations/ApiKeyManager.tsx",
    code: `import { ApiKeyManager } from "@launchapp/design-system/blocks/integrations";

const keys = [
  { id: "1", service: "Stripe", key: "sk_live_xxxx", createdAt: "2024-01-01" },
];

export default function Page() {
  return (
    <ApiKeyManager
      keys={keys}
      onAdd={() => console.log("add")}
      onDelete={(id) => console.log("delete", id)}
    />
  );
}`,
  },
  {
    id: "webhook-config",
    name: "Webhook Config",
    description: "Configure webhook URLs and select event triggers for integrations.",
    category: "integrations",
    sourcePath: "integrations/WebhookConfig.tsx",
    code: `import { WebhookConfig } from "@launchapp/design-system/blocks/integrations";

export default function Page() {
  return (
    <WebhookConfig
      endpoint="https://example.com/webhook"
      events={["payment.succeeded", "subscription.canceled"]}
      onSave={(config) => console.log("save", config)}
    />
  );
}`,
  },

  // landing
  {
    id: "landing-hero-section",
    name: "Hero Section",
    description: "Landing page hero with headline, subheadline, CTAs, and optional media.",
    category: "landing",
    sourcePath: "landing/HeroSection/HeroSection.tsx",
    code: `import { HeroSectionBlock } from "@launchapp/design-system/blocks/landing";

export default function Page() {
  return (
    <HeroSectionBlock
      eyebrow="Introducing v2.0"
      headline="Build products users love"
      subheadline="The complete design system for modern SaaS applications."
      primaryAction={<a href="/signup">Get started free</a>}
      secondaryAction={<a href="/docs">Read the docs</a>}
      variant="centered"
    />
  );
}`,
  },
  {
    id: "landing-cta-section",
    name: "CTA Section",
    description: "Full-width call-to-action section with headline and action buttons.",
    category: "landing",
    sourcePath: "landing/CTASection/CTASection.tsx",
    code: `import { CTASection } from "@launchapp/design-system/blocks/landing";

export default function Page() {
  return (
    <CTASection
      headline="Ready to get started?"
      description="Join thousands of teams already using LaunchApp."
      primaryAction={<a href="/signup">Start for free</a>}
      secondaryAction={<a href="/contact">Talk to sales</a>}
    />
  );
}`,
  },
  {
    id: "landing-faq-section",
    name: "FAQ Section",
    description: "Accordion FAQ section with categories and search.",
    category: "landing",
    sourcePath: "landing/FAQSection/FAQSection.tsx",
    code: `import { FAQSection } from "@launchapp/design-system/blocks/landing";

const faqs = [
  { id: "1", question: "How do I get started?", answer: "Sign up and follow the quickstart guide." },
  { id: "2", question: "Is there a free plan?", answer: "Yes, we have a generous free tier." },
];

export default function Page() {
  return <FAQSection faqs={faqs} headline="Frequently asked questions" />;
}`,
  },
  {
    id: "landing-feature-grid",
    name: "Feature Grid",
    description: "Grid of feature cards with icons, titles, and descriptions.",
    category: "landing",
    sourcePath: "landing/FeatureGridBlock/FeatureGridBlock.tsx",
    code: `import { FeatureGridBlock } from "@launchapp/design-system/blocks/landing";

const features = [
  { id: "1", title: "Fast", description: "Optimized for performance.", icon: <span>⚡</span> },
  { id: "2", title: "Secure", description: "Enterprise-grade security.", icon: <span>🔒</span> },
  { id: "3", title: "Scalable", description: "Grows with your business.", icon: <span>📈</span> },
];

export default function Page() {
  return <FeatureGridBlock headline="Why choose us" features={features} />;
}`,
  },
  {
    id: "landing-pricing-section",
    name: "Pricing Section",
    description: "Pricing section with monthly/annual toggle and tier cards.",
    category: "landing",
    sourcePath: "landing/PricingSectionBlock/PricingSectionBlock.tsx",
    code: `import { PricingSectionBlock } from "@launchapp/design-system/blocks/landing";

const tiers = [
  { id: "free", name: "Free", monthlyPrice: 0, annualPrice: 0, features: ["5 projects", "Community support"], cta: "Get started", href: "/signup" },
  { id: "pro", name: "Pro", monthlyPrice: 29, annualPrice: 290, features: ["Unlimited projects", "Priority support"], cta: "Start trial", href: "/signup/pro", highlighted: true },
];

export default function Page() {
  return <PricingSectionBlock tiers={tiers} headline="Simple, transparent pricing" />;
}`,
  },
  {
    id: "landing-pricing-table",
    name: "Pricing Table",
    description: "Detailed comparison pricing table for multiple tiers.",
    category: "landing",
    sourcePath: "landing/PricingTableBlock/PricingTableBlock.tsx",
    code: `import { PricingTableBlock } from "@launchapp/design-system/blocks/landing";

const plans = [
  { id: "starter", name: "Starter", price: "$9/mo", features: { "API calls": "10k", Storage: "5GB" } },
  { id: "pro", name: "Pro", price: "$29/mo", features: { "API calls": "100k", Storage: "50GB" } },
];

export default function Page() {
  return <PricingTableBlock plans={plans} featureKeys={["API calls", "Storage"]} />;
}`,
  },
  {
    id: "landing-testimonials",
    name: "Testimonials Section",
    description: "Customer testimonials section with avatars and company logos.",
    category: "landing",
    sourcePath: "landing/TestimonialsSection/TestimonialsSection.tsx",
    code: `import { TestimonialsSection } from "@launchapp/design-system/blocks/landing";

const testimonials = [
  { id: "1", quote: "LaunchApp cut our dev time in half.", author: "Alice Johnson", role: "CTO", company: "Acme Inc." },
  { id: "2", quote: "Best component library we've used.", author: "Bob Smith", role: "Lead Engineer", company: "Startup Co." },
];

export default function Page() {
  return <TestimonialsSection testimonials={testimonials} headline="Loved by developers" />;
}`,
  },
  {
    id: "landing-saas",
    name: "SaaS Landing",
    description: "Complete SaaS landing page template with hero, features, pricing, and CTA.",
    category: "landing",
    sourcePath: "landing/SaaSLanding/SaaSLanding.tsx",
    code: `import { SaaSLanding } from "@launchapp/design-system/blocks/landing";

export default function Page() {
  return (
    <SaaSLanding
      productName="MyApp"
      headline="The all-in-one platform"
      subheadline="Everything you need to build, launch, and grow."
      ctaLabel="Get started free"
      ctaHref="/signup"
    />
  );
}`,
  },
  {
    id: "landing-agency",
    name: "Agency Landing",
    description: "Full-page agency landing with hero, services, portfolio, and contact.",
    category: "landing",
    sourcePath: "landing/Agency/Agency.tsx",
    code: `import { Agency } from "@launchapp/design-system/blocks/landing";

export default function Page() {
  return (
    <Agency
      agencyName="Pixel Studio"
      tagline="We craft digital experiences."
      ctaLabel="See our work"
    />
  );
}`,
  },
  {
    id: "landing-startup",
    name: "Startup Landing",
    description: "Startup landing page with bold hero, traction metrics, and waitlist form.",
    category: "landing",
    sourcePath: "landing/Startup/Startup.tsx",
    code: `import { Startup } from "@launchapp/design-system/blocks/landing";

export default function Page() {
  return (
    <Startup
      headline="The next big thing"
      description="Join the waitlist and be first to know."
      onJoinWaitlist={(email) => console.log("waitlist", email)}
    />
  );
}`,
  },
  {
    id: "landing-portfolio",
    name: "Portfolio Landing",
    description: "Personal portfolio landing page with projects grid and contact section.",
    category: "landing",
    sourcePath: "landing/Portfolio/Portfolio.tsx",
    code: `import { Portfolio } from "@launchapp/design-system/blocks/landing";

const projects = [
  { id: "1", title: "Project Alpha", description: "A web application.", tags: ["React", "Node.js"], imageUrl: "" },
];

export default function Page() {
  return (
    <Portfolio
      name="Alex Developer"
      bio="I build things for the web."
      projects={projects}
    />
  );
}`,
  },

  // messaging
  {
    id: "chat-interface",
    name: "Chat Interface",
    description: "Full chat UI with message bubbles, typing indicator, and send input.",
    category: "messaging",
    sourcePath: "messaging/ChatInterface.tsx",
    code: `import { ChatInterface } from "@launchapp/design-system/blocks/messaging";

const messages = [
  { id: "1", content: "Hey! How's it going?", sender: { id: "user1", name: "Alice" }, timestamp: "10:00 AM", isOwn: false },
  { id: "2", content: "Great, thanks! Working on the new feature.", sender: { id: "me", name: "Me" }, timestamp: "10:01 AM", isOwn: true },
];

export default function Page() {
  return (
    <ChatInterface
      messages={messages}
      title="Alice"
      onSend={(msg) => console.log("send", msg)}
    />
  );
}`,
  },
  {
    id: "message-bubbles",
    name: "Message Bubbles",
    description: "Chat message bubble components for own and other messages.",
    category: "messaging",
    sourcePath: "messaging/MessageBubbles.tsx",
    code: `import { MessageBubbles } from "@launchapp/design-system/blocks/messaging";

const messages = [
  { id: "1", content: "Hello there!", isOwn: false, sender: "Alice", timestamp: "10:00 AM" },
  { id: "2", content: "Hi Alice!", isOwn: true, timestamp: "10:01 AM" },
];

export default function Page() {
  return <MessageBubbles messages={messages} />;
}`,
  },
  {
    id: "typing-indicator",
    name: "Typing Indicator",
    description: "Animated typing indicator showing when someone is composing a message.",
    category: "messaging",
    sourcePath: "messaging/TypingIndicator.tsx",
    code: `import { TypingIndicator } from "@launchapp/design-system/blocks/messaging";

export default function Page() {
  return <TypingIndicator userName="Alice" />;
}`,
  },

  // notifications
  {
    id: "notification-center",
    name: "Notification Center",
    description: "Dropdown notification center with unread count and mark-all-read action.",
    category: "notifications",
    sourcePath: "notifications/NotificationCenter.tsx",
    code: `import { NotificationCenter } from "@launchapp/design-system/blocks/notifications";

const notifications = [
  { id: "1", title: "New comment", description: "Alice commented on your post.", timestamp: "5m ago", read: false },
  { id: "2", title: "Payment received", description: "$49 payment processed.", timestamp: "1h ago", read: true },
];

export default function Page() {
  return (
    <NotificationCenter
      notifications={notifications}
      onRead={(id) => console.log("read", id)}
      onReadAll={() => console.log("read all")}
    />
  );
}`,
  },
  {
    id: "inbox-view",
    name: "Inbox View",
    description: "Full inbox layout with notification list, filters, and bulk actions.",
    category: "notifications",
    sourcePath: "notifications/InboxView.tsx",
    code: `import { InboxView } from "@launchapp/design-system/blocks/notifications";

const notifications = [
  { id: "1", title: "New comment", description: "Alice replied to your thread.", timestamp: "5m ago", read: false, type: "comment" },
  { id: "2", title: "Mention", description: "Bob mentioned you in a post.", timestamp: "1h ago", read: false, type: "mention" },
];

export default function Page() {
  return (
    <InboxView
      notifications={notifications}
      onRead={(id) => console.log("read", id)}
      onDelete={(id) => console.log("delete", id)}
    />
  );
}`,
  },
  {
    id: "activity-timeline-block",
    name: "Activity Timeline",
    description: "Vertical timeline of recent activity events with icons and timestamps.",
    category: "notifications",
    sourcePath: "notifications/ActivityTimeline.tsx",
    code: `import { ActivityTimeline } from "@launchapp/design-system/blocks/notifications";

const events = [
  { id: "1", title: "Project created", description: "You created 'LaunchApp v2'", timestamp: "2024-01-01T10:00:00Z", type: "create" },
  { id: "2", title: "Member added", description: "Alice joined the team", timestamp: "2024-01-02T09:00:00Z", type: "user" },
];

export default function Page() {
  return <ActivityTimeline events={events} />;
}`,
  },
  {
    id: "notification-bell-block",
    name: "Notification Bell",
    description: "Bell icon button with unread badge that opens a notification popover.",
    category: "notifications",
    sourcePath: "notifications/NotificationBell/NotificationBell.tsx",
    code: `import { NotificationBell } from "@launchapp/design-system/blocks/notifications";

export default function Page() {
  return (
    <NotificationBell
      count={3}
      notifications={[
        { id: "1", title: "New message", read: false, timestamp: "now" },
      ]}
      onRead={(id) => console.log("read", id)}
    />
  );
}`,
  },
  {
    id: "notification-preferences-block",
    name: "Notification Preferences",
    description: "Settings panel for toggling email, push, and in-app notification preferences.",
    category: "notifications",
    sourcePath: "notifications/NotificationPreferences.tsx",
    code: `import { NotificationPreferences } from "@launchapp/design-system/blocks/notifications";

const preferences = [
  { id: "email_comments", label: "Comments", description: "Email when someone comments", channel: "email", enabled: true },
  { id: "push_mentions", label: "Mentions", description: "Push when mentioned", channel: "push", enabled: false },
];

export default function Page() {
  return (
    <NotificationPreferences
      preferences={preferences}
      onToggle={(id, enabled) => console.log(id, enabled)}
    />
  );
}`,
  },

  // onboarding
  {
    id: "onboarding-wizard",
    name: "Onboarding Wizard",
    description: "Multi-step onboarding wizard with progress bar and step navigation.",
    category: "onboarding",
    sourcePath: "onboarding/OnboardingWizard.tsx",
    code: `import { OnboardingWizard } from "@launchapp/design-system/blocks/onboarding";

const steps = [
  { id: "profile", title: "Set up profile", description: "Tell us about yourself.", content: <div>Profile form</div> },
  { id: "team", title: "Invite team", description: "Add your teammates.", content: <div>Invite form</div> },
  { id: "done", title: "You're all set!", description: "Start using the app.", content: <div>Completion screen</div> },
];

export default function Page() {
  return (
    <OnboardingWizard
      steps={steps}
      onComplete={() => console.log("done")}
      allowSkip
    />
  );
}`,
  },
  {
    id: "welcome-screen",
    name: "Welcome Screen",
    description: "Full-screen welcome splash with branding, tagline, and get-started CTA.",
    category: "onboarding",
    sourcePath: "onboarding/WelcomeScreen.tsx",
    code: `import { WelcomeScreen } from "@launchapp/design-system/blocks/onboarding";

export default function Page() {
  return (
    <WelcomeScreen
      productName="LaunchApp"
      tagline="Build your SaaS faster"
      onGetStarted={() => console.log("get started")}
    />
  );
}`,
  },
  {
    id: "onboarding-checklist",
    name: "Onboarding Checklist",
    description: "Progress checklist of setup tasks with completion tracking.",
    category: "onboarding",
    sourcePath: "onboarding/OnboardingChecklist.tsx",
    code: `import { OnboardingChecklist } from "@launchapp/design-system/blocks/onboarding";

const tasks = [
  { id: "profile", title: "Complete your profile", completed: true, href: "/settings/profile" },
  { id: "team", title: "Invite teammates", completed: false, href: "/team/invite" },
  { id: "billing", title: "Set up billing", completed: false, href: "/billing" },
];

export default function Page() {
  return <OnboardingChecklist tasks={tasks} onComplete={(id) => console.log("complete", id)} />;
}`,
  },
  {
    id: "setup-wizard",
    name: "Setup Wizard",
    description: "Guided setup wizard with branching steps and completion confirmation.",
    category: "onboarding",
    sourcePath: "onboarding/SetupWizard/SetupWizard.tsx",
    code: `import { SetupWizard } from "@launchapp/design-system/blocks/onboarding";

const steps = [
  { id: "workspace", title: "Create workspace", content: <div>Workspace form</div> },
  { id: "integrations", title: "Connect tools", content: <div>Integrations form</div> },
];

export default function Page() {
  return <SetupWizard steps={steps} onFinish={() => console.log("finish")} />;
}`,
  },
  {
    id: "team-invite-flow",
    name: "Team Invite Flow",
    description: "Multi-step flow for inviting team members with role assignment.",
    category: "onboarding",
    sourcePath: "onboarding/TeamInviteFlow/TeamInviteFlow.tsx",
    code: `import { TeamInviteFlow } from "@launchapp/design-system/blocks/onboarding";

export default function Page() {
  return (
    <TeamInviteFlow
      roles={["admin", "member", "viewer"]}
      onInvite={(invites) => console.log("invite", invites)}
      onSkip={() => console.log("skip")}
    />
  );
}`,
  },
  {
    id: "goal-setup-wizard",
    name: "Goal Setup Wizard",
    description: "Goal-setting wizard for personalizing the onboarding experience.",
    category: "onboarding",
    sourcePath: "onboarding/GoalSetupWizard/GoalSetupWizard.tsx",
    code: `import { GoalSetupWizard } from "@launchapp/design-system/blocks/onboarding";

const goals = [
  { id: "launch", label: "Launch my product", icon: <span>🚀</span> },
  { id: "grow", label: "Grow my team", icon: <span>👥</span> },
  { id: "automate", label: "Automate workflows", icon: <span>⚙️</span> },
];

export default function Page() {
  return (
    <GoalSetupWizard
      goals={goals}
      onComplete={(selected) => console.log("goals", selected)}
    />
  );
}`,
  },
  {
    id: "progress-checklist",
    name: "Progress Checklist",
    description: "Checklist widget with percentage progress bar and item completion.",
    category: "onboarding",
    sourcePath: "onboarding/ProgressChecklist/ProgressChecklist.tsx",
    code: `import { ProgressChecklist } from "@launchapp/design-system/blocks/onboarding";

const items = [
  { id: "1", label: "Create account", completed: true },
  { id: "2", label: "Verify email", completed: true },
  { id: "3", label: "Set up workspace", completed: false },
  { id: "4", label: "Invite team", completed: false },
];

export default function Page() {
  return <ProgressChecklist items={items} title="Getting started" />;
}`,
  },
  {
    id: "checklist-with-links",
    name: "Checklist With Links",
    description: "Onboarding checklist with each item linking to the relevant page.",
    category: "onboarding",
    sourcePath: "onboarding/ChecklistWithLinks/ChecklistWithLinks.tsx",
    code: `import { ChecklistWithLinks } from "@launchapp/design-system/blocks/onboarding";

const items = [
  { id: "profile", label: "Complete profile", href: "/settings/profile", completed: true },
  { id: "billing", label: "Add payment method", href: "/billing", completed: false },
];

export default function Page() {
  return <ChecklistWithLinks items={items} title="Setup checklist" />;
}`,
  },
  {
    id: "onboarding-stepper",
    name: "Onboarding Stepper",
    description: "Step indicator showing current progress through a multi-step onboarding.",
    category: "onboarding",
    sourcePath: "onboarding/OnboardingStepper.tsx",
    code: `import { OnboardingStepper } from "@launchapp/design-system/blocks/onboarding";

const steps = [
  { id: "profile", label: "Profile" },
  { id: "team", label: "Team" },
  { id: "billing", label: "Billing" },
];

export default function Page() {
  return <OnboardingStepper steps={steps} currentStep={1} />;
}`,
  },
  {
    id: "welcome-wizard",
    name: "Welcome Wizard",
    description: "Branded welcome wizard combining personalization questions and setup steps.",
    category: "onboarding",
    sourcePath: "onboarding/WelcomeWizard/WelcomeWizard.tsx",
    code: `import { WelcomeWizard } from "@launchapp/design-system/blocks/onboarding";

export default function Page() {
  return (
    <WelcomeWizard
      productName="LaunchApp"
      onComplete={(data) => console.log("complete", data)}
    />
  );
}`,
  },

  // search
  {
    id: "search-command-palette",
    name: "Search Command Palette",
    description: "Full-featured command palette with search, recent items, and keyboard shortcuts.",
    category: "search",
    sourcePath: "search/SearchCommandPalette/SearchCommandPalette.tsx",
    code: `import { SearchCommandPalette } from "@launchapp/design-system/blocks/search";

const results = [
  { id: "1", title: "Dashboard", description: "Main dashboard", href: "/dashboard", type: "page" },
  { id: "2", title: "Settings", description: "Account settings", href: "/settings", type: "page" },
];

export default function Page() {
  return (
    <SearchCommandPalette
      results={results}
      onSearch={(q) => console.log("search", q)}
      onSelect={(item) => console.log("select", item)}
    />
  );
}`,
  },
  {
    id: "search-results-page",
    name: "Search Results",
    description: "Search results page with filters, sort, and paginated result list.",
    category: "search",
    sourcePath: "search/SearchResults/SearchResults.tsx",
    code: `import { SearchResults } from "@launchapp/design-system/blocks/search";

const results = [
  { id: "1", title: "Getting Started Guide", description: "Learn how to use LaunchApp.", type: "doc", href: "/docs/getting-started" },
  { id: "2", title: "API Reference", description: "Complete API documentation.", type: "doc", href: "/docs/api" },
];

export default function Page() {
  return (
    <SearchResults
      query="getting started"
      searchResults={results}
      totalCount={2}
      onSearch={(q) => console.log("search", q)}
      onResultClick={(item) => console.log("click", item)}
    />
  );
}`,
  },

  // team
  {
    id: "team-member-list",
    name: "Team Member List",
    description: "List of team members with roles, status, and management actions.",
    category: "team",
    sourcePath: "team/TeamMemberList.tsx",
    code: `import { TeamMemberList } from "@launchapp/design-system/blocks/team";

const members = [
  { id: "1", name: "Alice Johnson", email: "alice@example.com", role: "Admin", status: "active", avatarUrl: "" },
  { id: "2", name: "Bob Smith", email: "bob@example.com", role: "Member", status: "active", avatarUrl: "" },
];

export default function Page() {
  return (
    <TeamMemberList
      members={members}
      onRemove={(id) => console.log("remove", id)}
      onChangeRole={(id, role) => console.log(id, role)}
    />
  );
}`,
  },
  {
    id: "team-invite-form",
    name: "Invite Form",
    description: "Form to invite new team members by email with role selection.",
    category: "team",
    sourcePath: "team/InviteForm.tsx",
    code: `import { InviteForm } from "@launchapp/design-system/blocks/team";

export default function Page() {
  return (
    <InviteForm
      roles={["admin", "member", "viewer"]}
      onInvite={(email, role) => console.log("invite", email, role)}
    />
  );
}`,
  },
  {
    id: "role-selector",
    name: "Role Selector",
    description: "Dropdown or radio selector for assigning roles with description tooltips.",
    category: "team",
    sourcePath: "team/RoleSelector.tsx",
    code: `import { RoleSelector } from "@launchapp/design-system/blocks/team";

const roles = [
  { id: "admin", label: "Admin", description: "Full access to all resources" },
  { id: "member", label: "Member", description: "Can view and edit assigned projects" },
  { id: "viewer", label: "Viewer", description: "Read-only access" },
];

export default function Page() {
  return (
    <RoleSelector
      roles={roles}
      value="member"
      onChange={(role) => console.log("role", role)}
    />
  );
}`,
  },
  {
    id: "workspace-switcher",
    name: "Workspace Switcher",
    description: "Dropdown for switching between multiple workspaces or organizations.",
    category: "team",
    sourcePath: "team/WorkspaceSwitcher.tsx",
    code: `import { WorkspaceSwitcher } from "@launchapp/design-system/blocks/team";

const workspaces = [
  { id: "personal", name: "Personal", plan: "Free", avatarUrl: "" },
  { id: "acme", name: "Acme Corp", plan: "Pro", avatarUrl: "" },
];

export default function Page() {
  return (
    <WorkspaceSwitcher
      workspaces={workspaces}
      currentWorkspaceId="acme"
      onSwitch={(id) => console.log("switch to", id)}
    />
  );
}`,
  },

  // batch-1 additions: dashboard
  {
    id: "status-page-dashboard",
    name: "Status Page Dashboard",
    description: "Public status page with service health, incidents, and uptime history.",
    category: "dashboard",
    sourcePath: "dashboard/StatusPageDashboard/StatusPageDashboard.tsx",
    code: `import { StatusPageDashboard } from "@launchapp/design-system/blocks/dashboard";

const components = [
  { id: "api", name: "API", status: "operational" },
  { id: "web", name: "Web App", status: "operational" },
  { id: "db", name: "Database", status: "degraded" },
];

export default function Page() {
  return (
    <StatusPageDashboard
      title="System Status"
      organizationName="MyApp"
      overallStatus="degraded"
      components={components}
    />
  );
}`,
  },

  // batch-1 additions: settings
  {
    id: "data-export-panel",
    name: "Data Export Panel",
    description: "Settings panel for requesting and downloading data exports in multiple formats.",
    category: "settings",
    sourcePath: "settings/DataExportPanel/DataExportPanel.tsx",
    code: `import { DataExportPanel } from "@launchapp/design-system/blocks/settings";

export default function Page() {
  return (
    <DataExportPanel
      title="Export Your Data"
      onRequestExport={(format, scope) => console.log("export", format, scope)}
      onDownload={(item) => console.log("download", item.id)}
    />
  );
}`,
  },

  // batch-1 additions: data
  {
    id: "checkout-funnel",
    name: "Checkout Funnel",
    description: "Funnel chart visualization showing step-by-step conversion rates through checkout.",
    category: "data",
    sourcePath: "data/CheckoutFunnel/CheckoutFunnel.tsx",
    code: `import { CheckoutFunnel } from "@launchapp/design-system/blocks/data";

const steps = [
  { id: "visitors", label: "Visitors", value: 10000 },
  { id: "signups", label: "Sign Ups", value: 4200 },
  { id: "trial", label: "Trial", value: 1800 },
  { id: "paid", label: "Paid", value: 620 },
];

export default function Page() {
  return (
    <CheckoutFunnel
      steps={steps}
      showDropoff
      showValues
    />
  );
}`,
  },
  {
    id: "data-export-wizard",
    name: "Data Export Wizard",
    description: "Multi-step wizard for selecting data types, fields, and export format before downloading.",
    category: "data",
    sourcePath: "data/DataExportWizard/DataExportWizard.tsx",
    code: `import { DataExportWizard } from "@launchapp/design-system/blocks/data";

const dataTypes = [
  { id: "users", label: "Users", count: 1250 },
  { id: "orders", label: "Orders", count: 8430 },
];

export default function Page() {
  return (
    <DataExportWizard
      availableDataTypes={dataTypes}
      onExport={(options) => console.log("export", options)}
    />
  );
}`,
  },

  // batch-1 additions: ecommerce
  {
    id: "reviews-list",
    name: "Reviews List",
    description: "Product review list with rating distribution, verified badge, and helpful votes.",
    category: "ecommerce",
    sourcePath: "ecommerce/ReviewsList/ReviewsList.tsx",
    code: `import { ReviewsList } from "@launchapp/design-system/blocks/ecommerce";

const reviews = [
  { id: "1", author: "Alice J.", rating: 5, title: "Excellent!", body: "Exactly what I needed.", date: "2024-01-15", verified: true, helpfulCount: 12 },
  { id: "2", author: "Bob S.", rating: 4, title: "Good purchase", body: "Happy with the quality.", date: "2024-01-10", verified: true, helpfulCount: 5 },
];

export default function Page() {
  return (
    <ReviewsList
      reviews={reviews}
      overallRating={4.5}
      totalCount={128}
      showDistribution
      showVerified
    />
  );
}`,
  },
  {
    id: "wishlist-grid",
    name: "Wishlist Grid",
    description: "Grid of saved wishlist items with add-to-cart and remove actions.",
    category: "ecommerce",
    sourcePath: "ecommerce/WishlistGrid/WishlistGrid.tsx",
    code: `import { WishlistGrid } from "@launchapp/design-system/blocks/ecommerce";

const items = [
  { id: "1", name: "Wireless Headphones", price: 99.99, originalPrice: 149.99, inStock: true },
  { id: "2", name: "Smart Watch", price: 299.99, inStock: true },
  { id: "3", name: "Bluetooth Speaker", price: 59.99, inStock: false },
];

export default function Page() {
  return (
    <WishlistGrid
      items={items}
      columns={3}
      onAddToCart={(item) => console.log("add to cart", item.id)}
      onRemove={(item) => console.log("remove", item.id)}
    />
  );
}`,
  },

  // batch-1 additions: billing
  {
    id: "billing-history",
    name: "Billing History",
    description: "Invoice history table with status, amounts, and download links.",
    category: "billing",
    sourcePath: "billing/BillingHistory/BillingHistory.tsx",
    code: `import { BillingHistory } from "@launchapp/design-system/blocks/billing";

const invoices = [
  { id: "1", number: "INV-001", date: "2024-01-01", amount: "2900", status: "paid" },
  { id: "2", number: "INV-002", date: "2024-02-01", amount: "2900", status: "paid" },
  { id: "3", number: "INV-003", date: "2024-03-01", amount: "2900", status: "pending" },
];

export default function Page() {
  return (
    <BillingHistory
      invoices={invoices}
      onDownload={(invoice) => console.log("download", invoice.id)}
    />
  );
}`,
  },
  {
    id: "quota-usage-bar",
    name: "Quota Usage Bar",
    description: "Segmented usage bar showing quota consumption across multiple resource types.",
    category: "billing",
    sourcePath: "billing/QuotaUsageBar.tsx",
    code: `import { QuotaUsageBar } from "@launchapp/design-system/blocks/billing";

const quotas = [
  { id: "files", name: "Files", used: 3.2, limit: 10, unit: "GB" },
  { id: "media", name: "Media", used: 1.8, limit: 5, unit: "GB" },
  { id: "backups", name: "Backups", used: 0.5, limit: 2, unit: "GB" },
];

export default function Page() {
  return (
    <QuotaUsageBar
      title="Storage Quota"
      quotas={quotas}
      onUpgrade={() => console.log("upgrade")}
    />
  );
}`,
  },
  {
    id: "subscription-usage-meter",
    name: "Subscription Usage Meter",
    description: "Multi-metric usage meter showing plan limits with visual progress bars.",
    category: "billing",
    sourcePath: "billing/SubscriptionUsageMeter/SubscriptionUsageMeter.tsx",
    code: `import { SubscriptionUsageMeter } from "@launchapp/design-system/blocks/billing";

const metrics = [
  { id: "storage", label: "Storage", used: 32, limit: 100, unit: "GB" },
  { id: "api", label: "API Calls", used: 75000, limit: 100000, unit: "calls" },
  { id: "members", label: "Team Members", used: 8, limit: 15 },
];

export default function Page() {
  return (
    <SubscriptionUsageMeter
      planName="Pro"
      metrics={metrics}
    />
  );
}`,
  },

  // batch-1 additions: integrations
  {
    id: "integration-card-grid",
    name: "Integration Card Grid",
    description: "Searchable grid of integration cards with connect/disconnect/configure actions.",
    category: "integrations",
    sourcePath: "integrations/IntegrationCardGrid/IntegrationCardGrid.tsx",
    code: `import { IntegrationCardGrid } from "@launchapp/design-system/blocks/integrations";

const integrations = [
  { id: "github", name: "GitHub", description: "Sync repositories.", category: "developer", status: "connected" },
  { id: "slack", name: "Slack", description: "Team notifications.", category: "communication", status: "disconnected" },
  { id: "stripe", name: "Stripe", description: "Payment processing.", category: "payments", status: "connected" },
];

export default function Page() {
  return (
    <IntegrationCardGrid
      integrations={integrations}
      searchable
      onConnect={(i) => console.log("connect", i.id)}
      onDisconnect={(i) => console.log("disconnect", i.id)}
      onConfigure={(i) => console.log("configure", i.id)}
    />
  );
}`,
  },
  {
    id: "integration-marketplace",
    name: "Integration Marketplace",
    description: "App marketplace with search, categories, install/uninstall, and toggle controls.",
    category: "integrations",
    sourcePath: "integrations/IntegrationMarketplace.tsx",
    code: `import { IntegrationMarketplace } from "@launchapp/design-system/blocks/integrations";

const integrations = [
  { id: "github", name: "GitHub", description: "Version control.", category: "developer", status: "installed", version: "2.1.0", enabled: true, isOfficial: true },
  { id: "slack", name: "Slack", description: "Messaging.", category: "communication", status: "available", version: "1.3.0", enabled: false, isOfficial: true },
];

export default function Page() {
  return (
    <IntegrationMarketplace
      integrations={integrations}
      showSearch
      showCategories
      onInstall={(i) => console.log("install", i.id)}
      onConfigure={(i) => console.log("configure", i.id)}
      onUninstall={(i) => console.log("uninstall", i.id)}
      onToggle={(i, enabled) => console.log("toggle", i.id, enabled)}
    />
  );
}`,
  },

  // batch-1 additions: team
  {
    id: "team-member-grid",
    name: "Team Member Grid",
    description: "Card grid of team members with role management, invite, and remove actions.",
    category: "team",
    sourcePath: "team/TeamMemberGrid.tsx",
    code: `import { TeamMemberGrid } from "@launchapp/design-system/blocks/team";

const members = [
  { id: "1", name: "Alice Johnson", email: "alice@example.com", role: "owner", status: "active", joinedAt: "2023-01-01", initials: "AJ" },
  { id: "2", name: "Bob Smith", email: "bob@example.com", role: "admin", status: "active", joinedAt: "2023-02-01", initials: "BS" },
  { id: "3", name: "Carol White", email: "carol@example.com", role: "member", status: "pending", joinedAt: "2024-01-01", initials: "CW" },
];

export default function Page() {
  return (
    <TeamMemberGrid
      members={members}
      currentUserId="1"
      columns={3}
      showInviteButton
      onInvite={() => console.log("invite")}
      onRemove={(m) => console.log("remove", m.id)}
      onChangeRole={(m, role) => console.log("role", m.id, role)}
    />
  );
}`,
  },
  {
    id: "team-roster",
    name: "Team Roster",
    description: "Team directory with grid/list views, availability status, skills, and contact actions.",
    category: "team",
    sourcePath: "team/TeamRoster/TeamRoster.tsx",
    code: `import { TeamRoster } from "@launchapp/design-system/blocks/team";

const members = [
  { id: "1", name: "Alice Johnson", email: "alice@example.com", role: "Engineering Lead", department: "Engineering", availability: "available", skills: ["React", "TypeScript"], initials: "AJ" },
  { id: "2", name: "Bob Smith", email: "bob@example.com", role: "Senior Designer", department: "Design", availability: "busy", skills: ["Figma", "UX"], initials: "BS" },
];

export default function Page() {
  return (
    <TeamRoster
      members={members}
      view="grid"
      showSkills
      showDepartment
      onMessage={(m) => console.log("message", m.id)}
    />
  );
}`,
  },

  // batch-1 additions: notifications
  {
    id: "feedback-widget",
    name: "Feedback Widget",
    description: "In-app feedback form with rating, categories, and optional email capture.",
    category: "notifications",
    sourcePath: "notifications/FeedbackWidget/FeedbackWidget.tsx",
    code: `import { FeedbackWidget } from "@launchapp/design-system/blocks/notifications";

export default function Page() {
  return (
    <FeedbackWidget
      variant="inline"
      title="How are we doing?"
      categories={[
        { id: "bug", label: "Bug Report" },
        { id: "feature", label: "Feature Request" },
        { id: "general", label: "General" },
      ]}
      onSubmit={(feedback) => console.log("feedback", feedback)}
    />
  );
}`,
  },

  // batch-1 additions: data (empty-state is a data block)
  {
    id: "empty-state",
    name: "Empty State",
    description: "Centered empty state with icon, title, description, and optional action button.",
    category: "data",
    sourcePath: "data/EmptyState/EmptyState.tsx",
    code: `import { EmptyState } from "@launchapp/design-system/blocks/data";

export default function Page() {
  return (
    <EmptyState
      title="No projects yet"
      description="Create your first project to get started."
      primaryAction={{ label: "Create project", onClick: () => console.log("create") }}
    />
  );
}`,
  },

  // activity
  {
    id: "activity-stream",
    name: "Activity Stream",
    description: "Real-time activity stream with actor avatars, action types, and timestamps.",
    category: "dashboard",
    sourcePath: "activity/ActivityStream/ActivityStream.tsx",
    code: `import { ActivityStream } from "@launchapp/design-system/blocks/activity";

const events = [
  { id: "1", actor: { name: "Alice Johnson", initials: "AJ" }, action: "created", target: "LaunchApp v2", timestamp: "2024-01-01T10:00:00Z", type: "create" },
  { id: "2", actor: { name: "Bob Smith", initials: "BS" }, action: "merged", target: "PR #42", timestamp: "2024-01-02T09:00:00Z", type: "update" },
  { id: "3", actor: { name: "Carol White", initials: "CW" }, action: "commented on", target: "Issue #18", timestamp: "2024-01-03T14:30:00Z", type: "comment" },
];

export default function Page() {
  return <ActivityStream events={events} title="Activity Stream" showLoadMore />;
}`,
  },

  // admin (additional)
  {
    id: "feature-flag-panel",
    name: "Feature Flag Panel",
    description: "Manage feature flags across development, staging, and production environments.",
    category: "admin",
    sourcePath: "admin/FeatureFlagPanel.tsx",
    code: `import { FeatureFlagPanel } from "@launchapp/design-system/blocks/admin";

const flags = [
  {
    id: "1",
    key: "new_dashboard",
    name: "New Dashboard",
    description: "Enable the redesigned dashboard layout.",
    environments: { development: true, staging: true, production: false },
    createdAt: "2024-01-01",
    updatedAt: "2024-01-15",
  },
  {
    id: "2",
    key: "ai_assistant",
    name: "AI Assistant",
    description: "Enable AI-powered suggestions.",
    environments: { development: true, staging: false, production: false },
    createdAt: "2024-02-01",
    updatedAt: "2024-02-01",
  },
];

export default function Page() {
  return (
    <FeatureFlagPanel
      flags={flags}
      onToggle={(flag, env, enabled) => console.log("toggle", flag.key, env, enabled)}
    />
  );
}`,
  },
  {
    id: "status-page",
    name: "Status Page",
    description: "Public-facing service status page with uptime, incidents, and overall health.",
    category: "admin",
    sourcePath: "admin/StatusPage.tsx",
    code: `import { StatusPage } from "@launchapp/design-system/blocks/admin";

const services = [
  { id: "api", name: "API", description: "REST and GraphQL APIs", status: "operational", uptime: 99.98 },
  { id: "web", name: "Web App", description: "Main web application", status: "operational", uptime: 99.95 },
  { id: "db", name: "Database", description: "Primary database cluster", status: "degraded", uptime: 99.82 },
];

export default function Page() {
  return (
    <StatusPage
      services={services}
      overallStatus="degraded"
      title="System Status"
    />
  );
}`,
  },

  // data (additional)
  {
    id: "calendar-widget",
    name: "Calendar Widget",
    description: "Mini calendar widget with event dots and date selection.",
    category: "data",
    sourcePath: "data/CalendarWidget/CalendarWidget.tsx",
    code: `import { CalendarWidget } from "@launchapp/design-system/blocks/data";

const events = [
  { id: "1", title: "Team standup", date: new Date(), color: "primary" },
  { id: "2", title: "Product launch", date: new Date(Date.now() + 5 * 86400000), color: "secondary" },
];

export default function Page() {
  return (
    <CalendarWidget
      events={events}
      onDateSelect={(date) => console.log("selected", date)}
      onEventClick={(event) => console.log("event", event.id)}
    />
  );
}`,
  },
  {
    id: "comparison-table",
    name: "Comparison Table",
    description: "Side-by-side product comparison table with attributes, ratings, and add-to-cart.",
    category: "data",
    sourcePath: "data/ComparisonTable/ComparisonTable.tsx",
    code: `import { ComparisonTable } from "@launchapp/design-system/blocks/data";

const products = [
  { id: "1", name: "Starter Plan", price: 9, badge: "Popular", rating: 4.5, pros: ["Easy setup", "Good support"], cons: ["Limited features"] },
  { id: "2", name: "Pro Plan", price: 29, badge: "Best Value", rating: 4.8, pros: ["All features", "Priority support"], cons: ["Higher cost"] },
  { id: "3", name: "Enterprise", price: 99, rating: 4.9, pros: ["Unlimited everything", "Dedicated support"], cons: [] },
];

const attributes = [
  { key: "price", label: "Price" },
  { key: "rating", label: "Rating" },
];

export default function Page() {
  return (
    <ComparisonTable
      products={products}
      attributes={attributes}
      onAddToCart={(p) => console.log("add", p.id)}
    />
  );
}`,
  },
  {
    id: "project-board",
    name: "Project Board",
    description: "Kanban-style project board with task cards, priorities, and column management.",
    category: "data",
    sourcePath: "data/ProjectBoard/ProjectBoard.tsx",
    code: `import { ProjectBoard } from "@launchapp/design-system/blocks/data";

const columns = [
  {
    id: "backlog",
    title: "Backlog",
    status: "backlog",
    tasks: [
      { id: "1", title: "Research competitors", priority: "low" },
      { id: "2", title: "Design new onboarding", priority: "medium" },
    ],
  },
  {
    id: "in-progress",
    title: "In Progress",
    status: "in_progress",
    tasks: [
      { id: "3", title: "Build API endpoints", priority: "high", assignee: { name: "Alice", initials: "AJ" } },
    ],
  },
  {
    id: "done",
    title: "Done",
    status: "done",
    tasks: [
      { id: "4", title: "Project kickoff", priority: "low" },
    ],
  },
];

export default function Page() {
  return (
    <ProjectBoard
      initialColumns={columns}
      onCardClick={(card) => console.log("card", card.id)}
    />
  );
}`,
  },

  // files (additional)
  {
    id: "file-manager",
    name: "File Manager",
    description: "Full file manager with folder tree, grid/list view, upload, and file actions.",
    category: "files",
    sourcePath: "files/FileManager/FileManager.tsx",
    code: `import { FileManager } from "@launchapp/design-system/blocks/files";

const files = [
  { id: "1", name: "report.pdf", type: "document", size: 2457600, modifiedAt: "2024-01-01" },
  { id: "2", name: "photo.jpg", type: "image", size: 1153434, modifiedAt: "2024-01-02" },
  { id: "3", name: "archive.zip", type: "archive", size: 983040, modifiedAt: "2024-01-03" },
];

const folders = [
  { id: "docs", name: "Documents", parentId: null },
  { id: "images", name: "Images", parentId: null },
];

export default function Page() {
  return (
    <FileManager
      files={files}
      folders={folders}
      onFileOpen={(id) => console.log("open", id)}
      onFileDownload={(id) => console.log("download", id)}
      onFileDelete={(id) => console.log("delete", id)}
      onUpload={(files) => console.log("upload", files.map(f => f.name))}
    />
  );
}`,
  },

  // forms (additional)
  {
    id: "support-ticket-form",
    name: "Support Ticket Form",
    description: "Customer support ticket form with subject, priority, category, and attachment upload.",
    category: "forms",
    sourcePath: "forms/SupportTicketForm.tsx",
    code: `import { SupportTicketForm } from "@launchapp/design-system/blocks/forms";

export default function Page() {
  return (
    <SupportTicketForm
      onSubmit={(data) => console.log("submit", data)}
      title="Contact Support"
      description="Describe your issue and we'll get back to you shortly."
    />
  );
}`,
  },

  // notifications (inbox)
  {
    id: "inbox-manager",
    name: "Inbox Manager",
    description: "Full inbox layout with folder tree, message list, and message detail panel.",
    category: "notifications",
    sourcePath: "inbox/InboxManager/InboxManager.tsx",
    code: `import { InboxManager } from "@launchapp/design-system/blocks/inbox";

const messages = [
  { id: "1", subject: "New comment on your post", from: { name: "Alice Johnson", email: "alice@example.com", initials: "AJ" }, preview: "Left a review on the design tokens RFC...", date: "2024-01-15T10:00:00Z", read: false, starred: false, labels: ["design"] },
  { id: "2", subject: "PR #42 merged", from: { name: "Bob Smith", email: "bob@example.com", initials: "BS" }, preview: "feat(auth): add OAuth providers", date: "2024-01-14T09:00:00Z", read: true, starred: true, labels: ["engineering"] },
];

export default function Page() {
  return (
    <InboxManager
      messages={messages}
      onMessageSelect={(msg) => console.log("select", msg.id)}
      onMessageArchive={(id) => console.log("archive", id)}
      onMarkAllRead={() => console.log("mark all read")}
    />
  );
}`,
  },

  // integrations (additional)
  {
    id: "webhooks-list",
    name: "Webhooks List",
    description: "Manage outbound webhooks with status, event subscriptions, and test functionality.",
    category: "integrations",
    sourcePath: "integrations/WebhooksList/WebhooksList.tsx",
    code: `import { WebhooksList } from "@launchapp/design-system/blocks/integrations";

const webhooks = [
  { id: "1", name: "Production Webhook", url: "https://api.example.com/hooks", status: "active", events: ["user.created", "payment.success"], createdAt: "2024-01-01", successRate: 98.5 },
  { id: "2", name: "Staging Webhook", url: "https://staging.example.com/hooks", status: "inactive", events: ["user.created"], createdAt: "2024-02-01" },
];

export default function Page() {
  return (
    <WebhooksList
      webhooks={webhooks}
      canManage
      onAdd={(data) => console.log("add", data)}
      onEdit={(wh) => console.log("edit", wh.id)}
      onDelete={(wh) => console.log("delete", wh.id)}
      onToggle={(wh) => console.log("toggle", wh.id)}
      onTest={(wh) => console.log("test", wh.id)}
    />
  );
}`,
  },

  // landing (additional)
  {
    id: "hero-browser-frame",
    name: "Hero Browser Frame",
    description: "Browser-chrome mockup framing a live dashboard preview for hero sections.",
    category: "landing",
    sourcePath: "landing/HeroBrowserFrame/HeroBrowserFrame.tsx",
    code: `import { HeroBrowserFrame } from "@launchapp/design-system/blocks/landing";

export default function Page() {
  return (
    <HeroBrowserFrame
      url="app.yourproduct.com"
      stats={[
        { label: "Monthly Revenue", value: "$12.4k", trend: "up" },
        { label: "Active Users", value: "2,847", trend: "up" },
        { label: "Conversion", value: "3.24%", trend: "down" },
      ]}
    />
  );
}`,
  },

  // marketing (additional)
  {
    id: "changelog-feed",
    name: "Changelog Feed",
    description: "Filterable changelog feed with entry types, tags, and search.",
    category: "marketing",
    sourcePath: "marketing/ChangelogFeed.tsx",
    code: `import { ChangelogFeed } from "@launchapp/design-system/blocks/marketing";

const entries = [
  { id: "1", version: "2.0.0", date: "2024-03-01", title: "Design System v2", summary: "268 components, dark mode, and complete token refresh.", type: "feature", tags: ["components", "theming"] },
  { id: "2", version: "1.5.0", date: "2024-01-15", title: "New Block Library", summary: "40+ new application blocks across 12 categories.", type: "feature", tags: ["blocks"] },
  { id: "3", version: "1.4.2", date: "2023-12-01", title: "Accessibility Fixes", summary: "Resolved WCAG 2.1 AA issues in Combobox and Dialog.", type: "fix", tags: ["a11y"] },
];

export default function Page() {
  return (
    <ChangelogFeed
      entries={entries}
      title="Changelog"
      showFilters
      showSearch
    />
  );
}`,
  },

  // dashboard (metrics)
  {
    id: "metrics-dashboard",
    name: "Metrics Dashboard",
    description: "Responsive grid of metric cards with trend indicators and progress bars.",
    category: "dashboard",
    sourcePath: "metrics/MetricsDashboard/MetricsDashboard.tsx",
    code: `import { MetricsDashboard } from "@launchapp/design-system/blocks/metrics";

const metrics = [
  { id: "revenue", label: "Total Revenue", value: "$45,231", change: "+20.1%", changeType: "up", changeLabel: "vs last month" },
  { id: "users", label: "Active Users", value: "2,350", change: "+15.3%", changeType: "up", changeLabel: "vs last month" },
  { id: "churn", label: "Churn Rate", value: "3.2%", change: "-1.1%", changeType: "down", changeLabel: "vs last month" },
  { id: "nps", label: "NPS Score", value: "72", change: "+4", changeType: "up", changeLabel: "vs last quarter", progress: 72 },
];

export default function Page() {
  return (
    <MetricsDashboard
      metrics={metrics}
      columns={4}
      showChange
      showProgress
    />
  );
}`,
  },

  // onboarding (additional)
  {
    id: "onboarding-flow",
    name: "Onboarding Flow",
    description: "Linear onboarding flow with step cards, progress tracking, and back/next navigation.",
    category: "onboarding",
    sourcePath: "onboarding/OnboardingFlow/OnboardingFlow.tsx",
    code: `import { OnboardingFlow } from "@launchapp/design-system/blocks/onboarding";

const steps = [
  { id: "welcome", title: "Welcome to LaunchApp", description: "Let's get you set up in just a few steps.", content: <div className="p-4">Welcome content</div> },
  { id: "profile", title: "Set up your profile", description: "Tell us a bit about yourself.", content: <div className="p-4">Profile form</div> },
  { id: "team", title: "Invite your team", description: "Collaborate with your colleagues.", content: <div className="p-4">Team invite form</div> },
  { id: "done", title: "You're all set!", description: "Start building something amazing.", content: <div className="p-4">Completion screen</div> },
];

export default function Page() {
  return (
    <OnboardingFlow
      steps={steps}
      onComplete={() => console.log("onboarding complete")}
      showProgress
      allowSkip
    />
  );
}`,
  },

  // community (profile)
  {
    id: "user-profile-header",
    name: "User Profile Header",
    description: "Profile header with cover image, avatar, bio, stats, and follow/action buttons.",
    category: "community",
    sourcePath: "profile/UserProfileHeader/UserProfileHeader.tsx",
    code: `import { UserProfileHeader } from "@launchapp/design-system/blocks/profile";

export default function Page() {
  return (
    <UserProfileHeader
      user={{
        name: "Alice Johnson",
        username: "alice",
        role: "Senior Frontend Engineer",
        bio: "Passionate about building accessible, beautiful user interfaces.",
        location: "San Francisco, CA",
        website: "alice.dev",
        joinedDate: "January 2023",
        isVerified: true,
        initials: "AJ",
      }}
      stats={[
        { label: "Projects", value: 42 },
        { label: "Followers", value: 1280 },
        { label: "Following", value: 96 },
      ]}
      onFollow={() => console.log("follow")}
    />
  );
}`,
  },

  // data (project)
  {
    id: "project-kanban",
    name: "Project Kanban",
    description: "Kanban board for project management with priority badges, assignees, and due dates.",
    category: "data",
    sourcePath: "project/ProjectKanban/ProjectKanban.tsx",
    code: `import { ProjectKanban } from "@launchapp/design-system/blocks/project";

const columns = [
  {
    id: "todo",
    title: "To Do",
    color: "bg-slate-500",
    cards: [
      { id: "1", title: "Research competitors", priority: "low", labels: ["Research"] },
      { id: "2", title: "Design wireframes", priority: "medium", labels: ["Design"] },
    ],
  },
  {
    id: "in-progress",
    title: "In Progress",
    color: "bg-blue-500",
    cards: [
      { id: "3", title: "Build API endpoints", priority: "high", assignee: { name: "Alice Johnson", initials: "AJ" }, dueDate: "2024-02-15" },
    ],
  },
  {
    id: "done",
    title: "Done",
    color: "bg-emerald-500",
    cards: [
      { id: "4", title: "Project kickoff", priority: "low", labels: ["Planning"] },
    ],
  },
];

export default function Page() {
  return (
    <ProjectKanban
      columns={columns}
      onCardClick={(card) => console.log("card", card.id)}
      onAddCard={(colId) => console.log("add to", colId)}
    />
  );
}`,
  },

  // team (additional)
  {
    id: "invite-member-dialog",
    name: "Invite Member Dialog",
    description: "Modal dialog for inviting multiple team members with role assignment.",
    category: "team",
    sourcePath: "team/InviteMemberDialog/InviteMemberDialog.tsx",
    code: `import { InviteMemberDialog } from "@launchapp/design-system/blocks/team";

export default function Page() {
  return (
    <InviteMemberDialog
      open={true}
      onOpenChange={(open) => console.log("open change", open)}
      defaultRole="member"
      onInvite={(recipients) => console.log("invite", recipients)}
    />
  );
}`,
  },
  {
    id: "role-permission-matrix",
    name: "Role Permission Matrix",
    description: "Matrix view of role permissions across resource categories with toggle controls.",
    category: "team",
    sourcePath: "team/RolePermissionMatrix/RolePermissionMatrix.tsx",
    code: `import { RolePermissionMatrix } from "@launchapp/design-system/blocks/team";

const roles = [
  { id: "admin", name: "Admin", description: "Full access to all resources", color: "bg-red-500", permissions: { "content": ["view", "create", "edit", "delete"], "users": ["view", "invite", "manage"] } },
  { id: "member", name: "Member", description: "Can view and edit assigned projects", color: "bg-blue-500", permissions: { "content": ["view", "create", "edit"], "users": ["view"] } },
  { id: "viewer", name: "Viewer", description: "Read-only access", color: "bg-slate-500", permissions: { "content": ["view"], "users": ["view"] } },
];

const categories = [
  { id: "content", label: "Content", permissions: [{ id: "content.view", label: "View" }, { id: "content.create", label: "Create" }, { id: "content.edit", label: "Edit" }, { id: "content.delete", label: "Delete" }] },
  { id: "users", label: "Users", permissions: [{ id: "users.view", label: "View" }, { id: "users.invite", label: "Invite" }, { id: "users.manage", label: "Manage" }] },
];

export default function Page() {
  return (
    <RolePermissionMatrix
      roles={roles}
      permissionCategories={categories}
      permissionMap={{ admin: ["content.view", "content.create", "content.edit", "content.delete", "users.view", "users.invite", "users.manage"], member: ["content.view", "content.create", "content.edit", "users.view"], viewer: ["content.view", "users.view"] }}
      canManage
      onPermissionChange={(roleId, permId, granted) => console.log("change", roleId, permId, granted)}
    />
  );
}`,
  },
  {
    id: "role-permissions-matrix",
    name: "Role Permissions Matrix (Summary)",
    description: "Read-only summary matrix showing permission coverage across roles with export.",
    category: "team",
    sourcePath: "team/RolePermissionsMatrix/RolePermissionsMatrix.tsx",
    code: `import { RolePermissionsMatrix } from "@launchapp/design-system/blocks/team";

const roles = [
  { id: "admin", name: "Admin", color: "bg-red-500", permissionCount: 12, categoryBreakdown: { content: 4, users: 4, billing: 2, integrations: 2 }, highestPermission: "full" },
  { id: "member", name: "Member", color: "bg-blue-500", permissionCount: 6, categoryBreakdown: { content: 3, users: 2, billing: 0, integrations: 1 }, highestPermission: "limited" },
  { id: "viewer", name: "Viewer", color: "bg-slate-500", permissionCount: 3, categoryBreakdown: { content: 1, users: 1, billing: 1, integrations: 0 }, highestPermission: "limited" },
];

const permissions = [
  { permissionId: "content.view", label: "View Content", category: "Content", level: "full" },
  { permissionId: "content.edit", label: "Edit Content", category: "Content", level: "limited" },
  { permissionId: "users.manage", label: "Manage Users", category: "Users", level: "full" },
  { permissionId: "billing.view", label: "View Billing", category: "Billing", level: "limited" },
];

export default function Page() {
  return (
    <RolePermissionsMatrix
      roles={roles}
      permissions={permissions}
      onExport={(format) => console.log("export", format)}
      onRoleClick={(roleId) => console.log("role", roleId)}
    />
  );
}`,
  },

  // timeline
  {
    id: "timeline-view",
    name: "Timeline View",
    description: "Vertical timeline with event entries, avatars, badges, and click handlers.",
    category: "data",
    sourcePath: "timeline/TimelineView/TimelineView.tsx",
    code: `import { TimelineView } from "@launchapp/design-system/blocks/timeline";

const events = [
  { id: "1", date: "Jan 15, 2025", title: "Project kicked off", description: "Initial planning meeting with all stakeholders.", badge: "Completed", badgeVariant: "secondary", avatarFallback: "AJ" },
  { id: "2", date: "Feb 1, 2025", title: "Design phase complete", description: "Wireframes and design tokens finalized.", badge: "Completed", badgeVariant: "secondary", avatarFallback: "BS" },
  { id: "3", date: "Mar 10, 2025", title: "Development sprint", description: "Building core features and API integration.", badge: "In Progress", badgeVariant: "default", avatarFallback: "CW" },
  { id: "4", date: "Apr 1, 2025", title: "Public launch", description: "Go-live and marketing campaign.", badge: "Upcoming", badgeVariant: "outline" },
];

export default function Page() {
  return (
    <TimelineView
      events={events}
      title="Project Timeline"
      onEventClick={(event) => console.log("event", event.id)}
    />
  );
}`,
  },
];

export function getBlocksByCategory(category: BlockCategory): BlockEntry[] {
  return blocks.filter((b) => b.category === category);
}

export function getBlock(id: string): BlockEntry | undefined {
  return blocks.find((b) => b.id === id);
}
