"use client";

import * as React from "react";

import { LoginForm, SignUpForm, ForgotPasswordForm, OTPVerification } from "@ds/blocks/auth";
import { MetricCards, StatsOverview } from "@ds/blocks/dashboard";
import {
  ProfileSettings,
  AccountSettings,
  NotificationPreferences,
  BillingPage,
} from "@ds/blocks/settings";
import { AppSidebar, TopNav, MobileNavDrawer } from "@ds/blocks/navigation";
import {
  FullDataTable,
  KanbanBoard,
  SearchableDataTable,
  Timeline,
  StatsCard,
  MetricGrid,
  ActivityFeed,
  EmptyState,
} from "@ds/blocks/data";
import { ProductCardGrid, ShoppingCart, CheckoutForm } from "@ds/blocks/ecommerce";
import { HeroSection, FeatureGrid, PricingTable, TestimonialCarousel } from "@ds/blocks/marketing";
import type { ColumnDef } from "@tanstack/react-table";

export type BlockPreviewFn = () => React.ReactElement;

const metricCardItems = [
  {
    id: "revenue",
    label: "Total Revenue",
    value: "$45,231",
    trend: "up" as const,
    trendValue: "+20.1%",
    sparklineData: [30, 40, 35, 50, 49, 60, 70],
  },
  {
    id: "users",
    label: "Active Users",
    value: "2,350",
    trend: "up" as const,
    trendValue: "+15.3%",
    sparklineData: [20, 30, 25, 40, 35, 45, 50],
  },
  {
    id: "orders",
    label: "New Orders",
    value: "1,247",
    trend: "down" as const,
    trendValue: "-4.2%",
    sparklineData: [50, 45, 60, 40, 55, 35, 42],
  },
  {
    id: "conversion",
    label: "Conversion",
    value: "3.24%",
    trend: "neutral" as const,
    trendValue: "0.0%",
    sparklineData: [3, 3.5, 3.2, 3.1, 3.3, 3.2, 3.24],
  },
];

const statsItems = [
  { label: "Total Revenue", value: "$45,231", trend: "up" as const, trendLabel: "+20.1%" },
  { label: "Subscriptions", value: "+2350", trend: "up" as const, trendLabel: "+180.1%" },
  { label: "Sales", value: "+12,234", trend: "up" as const, trendLabel: "+19%" },
  { label: "Active Now", value: "+573", trend: "up" as const, trendLabel: "+201" },
];

const activityItems = [
  {
    id: "1",
    type: "create" as const,
    title: "Created a new project",
    description: "Project 'LaunchApp v2' was created",
    timestamp: new Date(Date.now() - 2 * 60 * 1000),
    user: { name: "Alice Johnson" },
  },
  {
    id: "2",
    type: "update" as const,
    title: "Merged pull request #42",
    description: "feat(auth): add OAuth providers",
    timestamp: new Date(Date.now() - 60 * 60 * 1000),
    user: { name: "Bob Smith" },
  },
  {
    id: "3",
    type: "comment" as const,
    title: "Commented on issue #18",
    description: "Left a review on the design tokens RFC",
    timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000),
    user: { name: "Carol White" },
  },
];

interface UserRow {
  id: string;
  name: string;
  email: string;
  role: string;
  status: string;
}

const userColumns: ColumnDef<UserRow>[] = [
  { accessorKey: "name", header: "Name" },
  { accessorKey: "email", header: "Email" },
  { accessorKey: "role", header: "Role" },
  { accessorKey: "status", header: "Status" },
];

const userData: UserRow[] = [
  { id: "1", name: "Alice Johnson", email: "alice@example.com", role: "Admin", status: "Active" },
  { id: "2", name: "Bob Smith", email: "bob@example.com", role: "Member", status: "Active" },
  { id: "3", name: "Carol White", email: "carol@example.com", role: "Member", status: "Inactive" },
  { id: "4", name: "Dave Brown", email: "dave@example.com", role: "Viewer", status: "Active" },
];

const kanbanColumns = [
  {
    id: "todo",
    title: "To Do",
    cards: [
      { id: "1", title: "Research competitors", badge: "Research", badgeVariant: "secondary" as const },
      { id: "2", title: "Design wireframes", badge: "Design", badgeVariant: "outline" as const },
    ],
  },
  {
    id: "in-progress",
    title: "In Progress",
    cards: [
      { id: "3", title: "Build API endpoints", badge: "Engineering", badgeVariant: "default" as const },
      { id: "4", title: "Write unit tests", badge: "QA", badgeVariant: "secondary" as const },
    ],
  },
  {
    id: "done",
    title: "Done",
    cards: [
      { id: "5", title: "Project kickoff", badge: "Planning", badgeVariant: "outline" as const },
    ],
  },
];

const timelineItems = [
  {
    id: "1",
    title: "Project kickoff",
    description: "Initial planning meeting with all stakeholders.",
    date: "Jan 15, 2025",
    badge: "Completed",
    badgeVariant: "secondary" as const,
  },
  {
    id: "2",
    title: "Design phase",
    description: "Created wireframes and design system tokens.",
    date: "Feb 1, 2025",
    badge: "Completed",
    badgeVariant: "secondary" as const,
  },
  {
    id: "3",
    title: "Development sprint",
    description: "Building core features and API integration.",
    date: "Mar 10, 2025",
    badge: "In Progress",
    badgeVariant: "default" as const,
  },
  {
    id: "4",
    title: "Launch",
    description: "Public release and marketing campaign.",
    date: "Apr 1, 2025",
    badge: "Upcoming",
    badgeVariant: "outline" as const,
  },
];

const products = [
  {
    id: "1",
    name: "Wireless Headphones",
    price: 99.99,
    originalPrice: 149.99,
    rating: 4.5,
    reviewCount: 128,
    badge: "Sale",
  },
  {
    id: "2",
    name: "Smart Watch",
    price: 299.99,
    rating: 4.8,
    reviewCount: 89,
    badge: "New",
  },
  {
    id: "3",
    name: "Bluetooth Speaker",
    price: 59.99,
    rating: 4.3,
    reviewCount: 54,
  },
];

const cartItems = [
  { id: "1", name: "Wireless Headphones", price: 99.99, quantity: 1 },
  { id: "2", name: "Smart Watch", price: 299.99, quantity: 2 },
];

const features = [
  {
    title: "Accessible",
    description: "Built on Radix UI primitives for full keyboard and screen reader support.",
    icon: <span aria-hidden className="text-2xl">♿</span>,
  },
  {
    title: "Customizable",
    description: "CSS custom properties and Tailwind for effortless theming.",
    icon: <span aria-hidden className="text-2xl">🎨</span>,
  },
  {
    title: "TypeScript",
    description: "Fully typed APIs with IntelliSense for a great DX.",
    icon: <span aria-hidden className="text-2xl">📘</span>,
  },
  {
    title: "Dark Mode",
    description: "First-class dark mode support out of the box.",
    icon: <span aria-hidden className="text-2xl">🌙</span>,
  },
  {
    title: "Production Ready",
    description: "Battle-tested components shipped in production apps.",
    icon: <span aria-hidden className="text-2xl">🚀</span>,
  },
  {
    title: "Open Source",
    description: "MIT licensed and open for contributions.",
    icon: <span aria-hidden className="text-2xl">🔓</span>,
  },
];

const pricingTiers = [
  {
    id: "starter",
    name: "Starter",
    price: { monthly: 9, annually: 7 },
    description: "Perfect for individuals and small projects.",
    features: ["5 projects", "10 GB storage", "Email support"],
    cta: { label: "Get started" },
  },
  {
    id: "pro",
    name: "Pro",
    price: { monthly: 29, annually: 24 },
    description: "Best for growing teams and businesses.",
    features: ["Unlimited projects", "100 GB storage", "Priority support", "Analytics"],
    cta: { label: "Start free trial" },
    popular: true,
    badge: "Most Popular",
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: { monthly: "Custom", annually: "Custom" },
    description: "For large organizations with advanced needs.",
    features: ["Unlimited everything", "Dedicated support", "Custom integrations", "SLA"],
    cta: { label: "Contact sales" },
  },
];

const testimonials = [
  {
    quote: "LaunchApp cut our frontend development time in half. The components are beautiful and accessible out of the box.",
    name: "Sarah Chen",
    role: "CTO",
    company: "Startup Inc.",
    avatarFallback: "SC",
  },
  {
    quote: "The best design system I've worked with. Theming support and dark mode made our redesign a breeze.",
    name: "Mark Rivera",
    role: "Lead Engineer",
    company: "TechCorp",
    avatarFallback: "MR",
  },
  {
    quote: "We migrated our entire component library to LaunchApp in a weekend. Incredible productivity boost.",
    name: "Priya Patel",
    role: "Frontend Lead",
    company: "GrowthCo",
    avatarFallback: "PP",
  },
];

const navSections = [
  {
    title: "Main",
    items: [
      { label: "Dashboard", href: "#", isActive: true },
      { label: "Analytics", href: "#" },
      { label: "Projects", href: "#" },
    ],
  },
  {
    title: "Settings",
    items: [
      { label: "Profile", href: "#" },
      { label: "Billing", href: "#" },
    ],
  },
];

const navUser = { name: "Alice Johnson", email: "alice@example.com", avatarFallback: "AJ" };

const topNavItems = [
  { label: "Dashboard", href: "#" },
  { label: "Projects", href: "#" },
  { label: "Team", href: "#" },
];

export const blockPreviews: Record<string, BlockPreviewFn> = {
  "login-form": () => <LoginForm />,
  "sign-up-form": () => <SignUpForm />,
  "forgot-password-form": () => <ForgotPasswordForm />,
  "otp-verification": () => <OTPVerification email="alice@example.com" />,
  "metric-cards": () => <MetricCards items={metricCardItems} />,
  "stats-overview": () => (
    <StatsOverview
      title="Overview"
      description="Your business performance at a glance."
      items={statsItems}
    />
  ),
  "activity-feed": () => <ActivityFeed activities={activityItems} title="Recent Activity" />,
  "profile-settings": () => (
    <ProfileSettings
      avatarFallback="AJ"
      defaultValues={{ name: "Alice Johnson", bio: "Product designer at LaunchApp." }}
    />
  ),
  "account-settings": () => <AccountSettings />,
  "notification-preferences": () => <NotificationPreferences />,
  "billing-page": () => <BillingPage />,
  "app-sidebar": () => (
    <div className="h-[500px] relative overflow-hidden border rounded-lg">
      <AppSidebar sections={navSections} user={navUser} />
    </div>
  ),
  "top-nav": () => (
    <TopNav
      items={topNavItems}
      notificationCount={3}
      user={navUser}
    />
  ),
  "mobile-nav-drawer": () => (
    <MobileNavDrawer
      sections={navSections}
      title="Navigation"
      user={navUser}
    />
  ),
  "full-data-table": () => (
    <FullDataTable columns={userColumns} data={userData} searchColumn="name" />
  ),
  "kanban-board": () => <KanbanBoard initialColumns={kanbanColumns} />,
  "searchable-data-table": () => (
    <SearchableDataTable
      columns={userColumns}
      data={userData}
      searchColumn="name"
      searchPlaceholder="Search users..."
    />
  ),
  "timeline": () => <Timeline items={timelineItems} />,
  "stats-card": () => (
    <StatsCard
      title="Total Revenue"
      value="$45,231"
      description="Monthly recurring revenue"
      trend={{ direction: "up", value: "+20.1%", label: "vs last month" }}
    />
  ),
  "metric-grid": () => (
    <MetricGrid
      columns={3}
      metrics={[
        { id: "revenue", stats: { title: "Revenue", value: "$45,231", trend: { direction: "up", value: "+20.1%" } } },
        { id: "users", stats: { title: "Active Users", value: "2,350", trend: { direction: "up", value: "+8.2%" } } },
        { id: "churn", stats: { title: "Churn Rate", value: "3.2%", trend: { direction: "down", value: "-1.1%" } } },
      ]}
    />
  ),
  "empty-state": () => (
    <EmptyState
      title="No projects yet"
      description="Create your first project to get started."
      primaryAction={{ label: "Create project" }}
    />
  ),
  "product-card": () => (
    <ProductCardGrid products={products} columns={3} />
  ),
  "shopping-cart": () => (
    <ShoppingCart items={cartItems} taxRate={0.08} shippingCost={9.99} freeShippingThreshold={100} />
  ),
  "checkout-form": () => (
    <CheckoutForm
      orderItems={[
        { id: "1", name: "Wireless Headphones", quantity: 1, price: 99.99 },
        { id: "2", name: "Smart Watch", quantity: 2, price: 299.99 },
      ]}
      taxRate={0.08}
      shippingCost={9.99}
    />
  ),
  "hero-section": () => (
    <HeroSection
      headline="Build faster with LaunchApp"
      subheadline="A complete design system built on Radix UI and Tailwind CSS."
    />
  ),
  "feature-grid": () => (
    <FeatureGrid
      features={features}
      headline="Why LaunchApp?"
      subheadline="Everything you need to ship production UIs."
    />
  ),
  "pricing-table": () => <PricingTable tiers={pricingTiers} headline="Simple, transparent pricing" />,
  "testimonial-carousel": () => (
    <TestimonialCarousel
      testimonials={testimonials}
      headline="Loved by developers"
    />
  ),
  "testimonial-grid": () => (
    <TestimonialCarousel
      testimonials={testimonials}
      headline="Loved by developers"
      displayMode="grid"
    />
  ),
};
