export type BlockCategory =
  | "auth"
  | "dashboard"
  | "settings"
  | "navigation"
  | "data"
  | "ecommerce"
  | "marketing"
  | "app-shells";

export const BLOCK_CATEGORY_LABELS: Record<BlockCategory, string> = {
  auth: "Authentication",
  dashboard: "Dashboard",
  settings: "Settings",
  navigation: "Navigation",
  data: "Data",
  ecommerce: "E-commerce",
  marketing: "Marketing",
  "app-shells": "App Shells",
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
];

export function getBlocksByCategory(category: BlockCategory): BlockEntry[] {
  return blocks.filter((b) => b.category === category);
}

export function getBlock(id: string): BlockEntry | undefined {
  return blocks.find((b) => b.id === id);
}
