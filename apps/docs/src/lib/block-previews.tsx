"use client";

import * as React from "react";
import { TooltipProvider } from "@launchapp/design-system";

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
import {
  AppShell,
  SidebarLayout,
  DashboardLayout,
  IconOnlySidebarShell,
  DualPanelSidebarShell,
  CommandPaletteShell,
  SplitPaneLayout,
} from "@ds/blocks/layout";
import { APIKeyManager, AuditLogViewer, UserManagementTable } from "@ds/blocks/admin";
import { SubscriptionManager, PaymentMethodCard } from "@ds/blocks/billing";
import { PostList } from "@ds/blocks/blog";
import { UserProfileCard } from "@ds/blocks/community";
import { NotFound } from "@ds/blocks/errors";
import { ChatInterface } from "@ds/blocks/messaging";
import { NotificationCenter, ActivityTimeline } from "@ds/blocks/notifications";
import { OnboardingWizard, OnboardingChecklist, ProgressChecklist } from "@ds/blocks/onboarding";
import { TeamMemberList } from "@ds/blocks/team";
import { AuthFormBlock, ResetPasswordForm } from "@ds/blocks/auth";
import {
  DashboardShell,
  Timeline as DashboardTimeline,
  StatusPageDashboard,
} from "@ds/blocks/dashboard";
import {
  SettingsLayoutBlock,
  DataExportCard,
  DataExportPanel,
  AccountDeletionCard,
  PrivacySettingsLayout,
  BillingOverview,
  SecuritySettings,
  TeamSettings,
  AppearanceSettings,
  NotificationSettingsCard,
  AccountOverview,
  LanguageSettings,
  PrivacySettings,
  ConnectedAccounts,
  CookiePreferences,
  TabbedSettings,
} from "@ds/blocks/settings";
import { BreadcrumbNav, CommandPalette, UserMenu } from "@ds/blocks/navigation";
import {
  CalendarView,
  ChartCard,
  DataTrend,
  EmptyStateCard,
  FilterBar,
  SparklineCard,
  FunnelChartCard,
  GaugeCard,
  DataTableCard,
  KPIComparisonCard,
  DataTableToolbar,
  ColumnFilters,
  ComparisonTable,
  CheckoutFunnel,
  DataExportWizard,
  CalendarWidget,
  ProjectBoard,
} from "@ds/blocks/data";
import { ProductGrid, CartDrawer, OrderSummary, ReviewsList, WishlistGrid } from "@ds/blocks/ecommerce";
import {
  LogoCloud,
  ChangelogTimeline,
  BillingCard,
  FeatureComparison,
  PricingComparisonTable,
  ChangelogFeed,
} from "@ds/blocks/marketing";
import { MultiPanelLayout, MobileNavDrawerShell, EmptyState as LayoutEmptyState } from "@ds/blocks/layout";
import { SystemSettingsPanel, WebhookManager, FeatureFlagPanel, StatusPage } from "@ds/blocks/admin";
import {
  AppShellMinimal,
  CollapsibleSidebar,
  CompactSidebar,
  DashboardHeader,
  PageContainer,
  SettingsLayout as AppSettingsLayout,
} from "@ds/blocks/app";
import {
  InvoiceTable,
  UsageMeter,
  SubscriptionUsageMeter,
  QuotaUsageBar,
  BillingHistory,
} from "@ds/blocks/billing";
import { PostDetail, NewsletterSignup } from "@ds/blocks/blog";
import {
  CommunityThemesGallery,
  ThemeSubmissionForm,
  TeamMemberCard,
} from "@ds/blocks/community";
import { ServerError, Maintenance } from "@ds/blocks/errors";
import {
  DropZone,
  FileList,
  ImageGallery,
  FileGrid,
  FileUploadZone,
  FileManager,
} from "@ds/blocks/files";
import { RichTextEditor, SupportTicketForm } from "@ds/blocks/forms";
import { OAuthConnectCard, ApiKeyManager, WebhookConfig, IntegrationCardGrid, IntegrationMarketplace, WebhooksList } from "@ds/blocks/integrations";
import {
  SaaSLanding,
  Portfolio,
  Agency,
  Startup,
  HeroSectionBlock,
  PricingTableBlock,
  FeatureGridBlock,
  PricingSectionBlock,
  TestimonialsSection,
  FAQSection,
  CTASection,
  HeroBrowserFrame,
} from "@ds/blocks/landing";
import { MessageBubbles, TypingIndicator } from "@ds/blocks/messaging";
import {
  InboxView,
  NotificationBell,
  NotificationPreferencesCenter,
  FeedbackWidget,
} from "@ds/blocks/notifications";
import {
  MultiStepWizard,
  WelcomeScreen,
  OnboardingStepper,
  ProgressStepper,
  SetupChecklist,
  WelcomeWizard,
  SetupWizard,
  TeamInviteFlow,
  GoalSetupWizard,
  ChecklistWithLinks,
  OnboardingFlow,
} from "@ds/blocks/onboarding";
import { SearchCommandPalette, SearchResults, CommandPalette as SearchCommandPaletteBlock } from "@ds/blocks/search";
import { RoleSelector, InviteForm, WorkspaceSwitcher, TeamMemberGrid, TeamRoster, InviteMemberDialog, RolePermissionMatrix, RolePermissionsMatrix } from "@ds/blocks/team";
import type { ColumnDef } from "@tanstack/react-table";
import { ActivityStream, AuditLogViewer as ActivityAuditLogViewer } from "@ds/blocks/activity";
import { InboxManager } from "@ds/blocks/inbox";
import { MetricsDashboard } from "@ds/blocks/metrics";
import { UserProfileHeader, UserProfileCard as ProfileCard } from "@ds/blocks/profile";
import { ProjectKanban } from "@ds/blocks/project";
import { TimelineView } from "@ds/blocks/timeline";

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
  "app-shell": () => (
    <div className="h-[540px] overflow-hidden rounded-lg border">
      <AppShell
        navSections={[
          {
            title: "Main",
            items: [
              { label: "Dashboard", href: "#", isActive: true },
              { label: "Analytics", href: "#" },
              { label: "Projects", href: "#", badge: "3" },
            ],
          },
          {
            title: "Settings",
            items: [
              { label: "Profile", href: "#" },
              { label: "Billing", href: "#" },
            ],
          },
        ]}
        user={{ name: "Alice Johnson", email: "alice@example.com", avatarFallback: "AJ" }}
        collapsible
      >
        <div className="p-6">
          <h2 className="text-lg font-semibold mb-2">Dashboard</h2>
          <p className="text-sm text-muted-foreground">Welcome back, Alice. Here's what's happening.</p>
        </div>
      </AppShell>
    </div>
  ),
  "sidebar-layout": () => (
    <div className="h-[420px] overflow-hidden rounded-lg border">
      <SidebarLayout
        sidebar={
          <nav className="flex flex-col gap-1 p-3">
            <div className="px-2 py-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">Navigation</div>
            {["Overview", "Components", "Blocks", "Tokens"].map((item, i) => (
              <div key={item} className={`rounded-md px-2 py-1.5 text-sm ${i === 0 ? "bg-accent font-medium" : "text-muted-foreground hover:bg-accent"}`}>{item}</div>
            ))}
          </nav>
        }
        header={
          <div className="flex items-center justify-between px-4 py-2 border-b text-sm font-semibold">
            <span>My App</span>
          </div>
        }
      >
        <div className="p-6">
          <p className="text-sm text-muted-foreground">Main content area.</p>
        </div>
      </SidebarLayout>
    </div>
  ),
  "dashboard-layout": () => (
    <div className="h-[420px] overflow-hidden rounded-lg border">
      <DashboardLayout
        columns={2}
        header={
          <div className="flex items-center px-4 h-10 border-b text-sm font-semibold bg-background">
            Dashboard
          </div>
        }
        leftPanel={
          <aside className="p-4 h-full space-y-3">
            <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Side Panel</div>
            {["Total Revenue", "Active Users", "Conversion"].map((label) => (
              <div key={label} className="rounded-md border p-2 text-xs">{label}</div>
            ))}
          </aside>
        }
      >
        <div className="p-6">
          <h2 className="text-base font-semibold mb-2">Main Content</h2>
          <p className="text-sm text-muted-foreground">Charts and data tables go here.</p>
        </div>
      </DashboardLayout>
    </div>
  ),
  "collapsible-sidebar": () => (
    <div className="h-[420px] overflow-hidden rounded-lg border flex">
      <div className="flex-1 relative">
        <p className="absolute inset-0 flex items-center justify-center text-sm text-muted-foreground p-4 text-center">
          CollapsibleSidebar — use within a SidebarLayout or as a standalone sidebar
        </p>
      </div>
    </div>
  ),
  "icon-only-sidebar-shell": () => (
    <div className="h-[420px] overflow-hidden rounded-lg border">
      <IconOnlySidebarShell
        navSections={[
          {
            items: [
              {
                label: "Dashboard",
                href: "#",
                isActive: true,
                icon: (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>
                ),
              },
              {
                label: "Analytics",
                href: "#",
                icon: (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
                ),
              },
              {
                label: "Settings",
                href: "#",
                icon: (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="3"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14M4.93 4.93a10 10 0 0 0 0 14.14"/></svg>
                ),
              },
            ],
          },
        ]}
      >
        <div className="p-6">
          <h2 className="text-base font-semibold mb-2">Icon-Only Sidebar</h2>
          <p className="text-sm text-muted-foreground">Hover over the icons for labels.</p>
        </div>
      </IconOnlySidebarShell>
    </div>
  ),
  "dual-panel-sidebar-shell": () => (
    <div className="h-[420px] overflow-hidden rounded-lg border">
      <DualPanelSidebarShell
        primaryNavItems={[
          {
            label: "Main",
            icon: (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>
            ),
            isActive: true,
          },
          {
            label: "Analytics",
            icon: (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
            ),
          },
        ]}
        secondaryPanelOpen
        secondaryPanel={
          <nav className="p-3 space-y-1">
            <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground px-2 pb-1">Main</div>
            {["Dashboard", "Analytics", "Projects"].map((item, i) => (
              <div key={item} className={`rounded-md px-2 py-1.5 text-sm ${i === 0 ? "bg-accent font-medium" : "text-muted-foreground"}`}>{item}</div>
            ))}
          </nav>
        }
        secondaryPanelTitle="Main"
      >
        <div className="p-6">
          <h2 className="text-base font-semibold mb-2">Dual Panel Shell</h2>
          <p className="text-sm text-muted-foreground">Icon rail + contextual secondary panel.</p>
        </div>
      </DualPanelSidebarShell>
    </div>
  ),
  "command-palette-shell": () => {
    const CommandPaletteDemo = () => {
      const [open, setOpen] = React.useState(false);
      return (
        <div className="h-[420px] overflow-hidden rounded-lg border flex flex-col items-center justify-center gap-4 p-6">
          <p className="text-sm text-muted-foreground text-center">
            Command Palette Shell wraps your app with a ⌘K accessible command palette.
          </p>
          <button
            onClick={() => setOpen(true)}
            className="inline-flex items-center gap-2 rounded-md border px-4 py-2 text-sm font-medium hover:bg-accent transition-colors"
          >
            Open Palette
            <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] opacity-100">
              <span className="text-xs">⌘</span>K
            </kbd>
          </button>
          <CommandPaletteShell
            open={open}
            onOpenChange={setOpen}
            groups={[
              {
                label: "Navigation",
                actions: [
                  { id: "dashboard", label: "Dashboard", onSelect: () => setOpen(false) },
                  { id: "analytics", label: "Analytics", onSelect: () => setOpen(false) },
                  { id: "settings", label: "Settings", onSelect: () => setOpen(false) },
                ],
              },
            ]}
          />
        </div>
      );
    };
    return <CommandPaletteDemo />;
  },
  "split-pane-layout": () => (
    <div className="h-[420px] overflow-hidden rounded-lg border">
      <SplitPaneLayout
        orientation="vertical"
        leftPane={
          <div className="p-4 h-full bg-muted/30">
            <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">Left Panel</div>
            <p className="text-sm text-muted-foreground">File tree, navigation, or secondary content.</p>
          </div>
        }
        rightPane={
          <div className="p-4 h-full">
            <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">Main Panel</div>
            <p className="text-sm text-muted-foreground">Primary content, editor, or detail view.</p>
          </div>
        }
        leftPaneSize="40%"
      />
    </div>
  ),

  // admin
  "api-key-manager": () => (
    <APIKeyManager
      keys={[
        { id: "1", name: "Production Key", key: "sk-prod-xxxxxxxxxxxx", createdAt: "2024-01-01", active: true, permissions: ["read", "write"] },
        { id: "2", name: "Read-only Key", key: "sk-ro-xxxxxxxxxxxx", createdAt: "2024-02-01", active: true, permissions: ["read"] },
      ]}
      availablePermissions={["read", "write", "admin"]}
      onCreateKey={(d: Parameters<NonNullable<Parameters<typeof APIKeyManager>[0]["onCreateKey"]>>[0]) => console.log("create", d)}
      onRevokeKey={(id: string) => console.log("revoke", id)}
      onCopyKey={(k: string) => console.log("copy", k)}
    />
  ),
  "audit-log-viewer": () => (
    <AuditLogViewer
      logs={[
        { id: "1", actor: "Alice Johnson", action: "create" as const, level: "info" as const, timestamp: "2024-01-01T10:00:00Z", description: "Created user bob@example.com" },
        { id: "2", actor: "Bob Smith", action: "api_call" as const, level: "warning" as const, timestamp: "2024-01-02T11:00:00Z", description: "Revoked API key sk-xxx" },
        { id: "3", actor: "System", action: "login" as const, level: "error" as const, timestamp: "2024-01-03T09:30:00Z", description: "Failed login attempt from 192.168.1.1", ipAddress: "192.168.1.1" },
      ]}
      pageSize={10}
    />
  ),
  "user-management-table": () => (
    <UserManagementTable
      users={[
        { id: "1", name: "Alice Johnson", email: "alice@example.com", role: "admin" as const, status: "active" as const, createdAt: "2024-01-01", lastActiveAt: "2024-01-15" },
        { id: "2", name: "Bob Smith", email: "bob@example.com", role: "editor" as const, status: "active" as const, createdAt: "2024-02-01", lastActiveAt: "2024-02-10" },
        { id: "3", name: "Carol White", email: "carol@example.com", role: "viewer" as const, status: "pending" as const, createdAt: "2024-03-01", lastActiveAt: "2024-03-01" },
      ]}
      onBanUser={(id: string) => console.log("ban", id)}
      onUnbanUser={(id: string) => console.log("unban", id)}
      onDeleteUser={(id: string) => console.log("delete", id)}
      onAddUser={() => console.log("add user")}
    />
  ),

  // billing
  "subscription-manager": () => (
    <SubscriptionManager
      plans={[
        { id: "starter", name: "Starter", price: "$9/mo", billingCycle: "month", features: ["5 projects", "10GB storage", "Community support"] },
        { id: "pro", name: "Pro", price: "$29/mo", billingCycle: "month", features: ["Unlimited projects", "100GB storage", "Priority support"] },
        { id: "enterprise", name: "Enterprise", price: "$99/mo", billingCycle: "month", features: ["Everything in Pro", "SSO", "Dedicated support"] },
      ]}
      currentPlanId="starter"
      onChangePlan={(id: string) => console.log("change to", id)}
    />
  ),
  "payment-method-card": () => (
    <PaymentMethodCard
      methods={[
        { id: "1", type: "card" as const, brand: "Visa", last4: "4242", expiryMonth: 12, expiryYear: 2026, isDefault: true },
        { id: "2", type: "card" as const, brand: "Mastercard", last4: "5353", expiryMonth: 8, expiryYear: 2027, isDefault: false },
      ]}
      selectedId="1"
    />
  ),

  // blog
  "post-list": () => (
    <PostList
      title="From the blog"
      posts={[
        { id: "1", title: "Getting Started with LaunchApp", excerpt: "A quick intro to the design system.", category: "Tutorial", date: "2024-01-01", author: "Alice Johnson" },
        { id: "2", title: "Advanced Component Patterns", excerpt: "Deep dive into composition patterns.", category: "Guide", date: "2024-02-01", author: "Bob Smith" },
        { id: "3", title: "What's New in v2.0", excerpt: "All the new features and improvements.", category: "Release", date: "2024-03-01", author: "Carol White" },
      ]}
      categories={["Tutorial", "Guide", "Release"]}
    />
  ),

  // community
  "user-profile-card": () => (
    <UserProfileCard
      user={{ name: "Alice Johnson", username: "alice", bio: "Full-stack developer passionate about great UX.", location: "San Francisco, CA", joinedDate: "January 2023", isVerified: true }}
      stats={[{ label: "Posts", value: 42 }, { label: "Followers", value: 128 }, { label: "Following", value: 64 }]}
    />
  ),

  // errors
  "not-found-page": () => (
    <NotFound
      homeAction={<button type="button" className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground">Go home</button>}
      backAction={<button type="button" className="rounded-md border px-4 py-2 text-sm font-medium">Go back</button>}
    />
  ),

  // messaging
  "chat-interface": () => (
    <ChatInterface
      messages={[
        { id: "1", content: "Hey! How's the new design system coming along?", sender: "received" as const, senderName: "Alice", timestamp: "10:00 AM" },
        { id: "2", content: "Really well! Just finished the new block previews.", sender: "sent" as const, timestamp: "10:01 AM" },
        { id: "3", content: "That's awesome! Can't wait to see it.", sender: "received" as const, senderName: "Alice", timestamp: "10:02 AM" },
      ]}
      title="Alice"
      isTyping={false}
      onSend={(msg: string) => console.log("send", msg)}
      maxHeight={360}
    />
  ),

  // notifications
  "notification-center": () => (
    <NotificationCenter
      notifications={[
        { id: "1", title: "New comment", description: "Alice commented on your post.", timestamp: "5m ago", read: false, avatarInitials: "AJ" },
        { id: "2", title: "Payment received", description: "$49 payment processed successfully.", timestamp: "1h ago", read: false, avatarInitials: "ST" },
        { id: "3", title: "Team invite accepted", description: "Bob joined your workspace.", timestamp: "2h ago", read: true, avatarInitials: "BS" },
      ]}
      onRead={(id: string) => console.log("read", id)}
      onReadAll={() => console.log("read all")}
    />
  ),
  "activity-timeline-block": () => (
    <ActivityTimeline
      items={[
        { id: "1", title: "Project created", description: "You created 'LaunchApp v2'", timestamp: "2024-01-01T10:00:00Z" },
        { id: "2", title: "Member added", description: "Alice joined the team", timestamp: "2024-01-02T09:00:00Z" },
        { id: "3", title: "PR merged", description: "feat(docs): update component library", timestamp: "2024-01-03T14:30:00Z" },
      ]}
      title="Recent Activity"
    />
  ),

  // onboarding
  "onboarding-wizard": () => (
    <OnboardingWizard
      steps={[
        { id: "profile", title: "Set up profile", description: "Tell us about yourself.", content: <div className="p-4 text-sm text-muted-foreground">Profile form placeholder</div> },
        { id: "team", title: "Invite team", description: "Add your teammates.", content: <div className="p-4 text-sm text-muted-foreground">Team invite form placeholder</div> },
        { id: "done", title: "All done!", description: "You're ready to go.", content: <div className="p-4 text-sm text-muted-foreground">Setup complete!</div> },
      ]}
      onComplete={() => console.log("complete")}
      allowSkip
    />
  ),
  "onboarding-checklist": () => (
    <OnboardingChecklist
      items={[
        { id: "profile", title: "Complete your profile", completed: true, href: "#" },
        { id: "team", title: "Invite teammates", completed: true, href: "#" },
        { id: "billing", title: "Set up billing", completed: false, href: "#" },
        { id: "integration", title: "Connect an integration", completed: false, href: "#" },
      ]}
      onItemToggle={(id: string, completed: boolean) => console.log("toggle", id, completed)}
    />
  ),
  "progress-checklist": () => (
    <ProgressChecklist
      sections={[
        {
          id: "basics",
          title: "Getting started",
          items: [
            { id: "1", title: "Create account", completed: true },
            { id: "2", title: "Verify email", completed: true },
            { id: "3", title: "Set up workspace", completed: false },
          ],
        },
        {
          id: "advanced",
          title: "Next steps",
          items: [
            { id: "4", title: "Invite team members", completed: false },
            { id: "5", title: "Connect first integration", completed: false },
          ],
        },
      ]}
    />
  ),

  // team
  "team-member-list": () => (
    <TeamMemberList
      members={[
        { id: "1", name: "Alice Johnson", email: "alice@example.com", role: "admin" as const, status: "active" as const },
        { id: "2", name: "Bob Smith", email: "bob@example.com", role: "member" as const, status: "active" as const },
        { id: "3", name: "Carol White", email: "carol@example.com", role: "member" as const, status: "pending" as const },
      ]}
      onRemove={(member) => console.log("remove", member.id)}
    />
  ),

  // auth (additional)
  "auth-form-block": () => <AuthFormBlock variant="login" />,
  "reset-password-form": () => <ResetPasswordForm />,

  // dashboard (additional)
  "dashboard-shell": () => (
    <div className="h-[480px] overflow-hidden rounded-lg border">
      <DashboardShell
        navigation={[
          { id: "dashboard", label: "Dashboard", href: "#", active: true },
          { id: "analytics", label: "Analytics", href: "#" },
          { id: "projects", label: "Projects", href: "#" },
        ]}
        user={{ name: "Alice Johnson", email: "alice@example.com", fallbackInitials: "AJ" }}
      >
        <div className="p-6">
          <h2 className="text-lg font-semibold mb-2">Dashboard</h2>
          <p className="text-sm text-muted-foreground">Welcome back, Alice.</p>
        </div>
      </DashboardShell>
    </div>
  ),
  "dashboard-timeline": () => (
    <DashboardTimeline
      entries={[
        { id: "1", title: "Project created", timestamp: "2024-01-01T10:00:00Z", description: "Repository initialized." },
        { id: "2", title: "First PR merged", timestamp: "2024-01-05T14:00:00Z", description: "feat(auth): initial auth setup" },
        { id: "3", title: "v1.0 released", timestamp: "2024-02-01T09:00:00Z", description: "Public launch." },
      ]}
    />
  ),
  "data-activity-feed": () => (
    <ActivityFeed
      activities={[
        { id: "1", title: "Created a project", type: "create" as const, timestamp: "2 min ago", user: { name: "Alice Johnson" } },
        { id: "2", title: "Merged pull request #42", type: "update" as const, timestamp: "1 hour ago", user: { name: "Bob Smith" } },
        { id: "3", title: "Commented on issue #18", type: "comment" as const, timestamp: "3 hours ago", user: { name: "Carol White" } },
      ]}
      title="Recent Activity"
    />
  ),

  // settings (additional)
  "account-overview": () => (
    <AccountOverview
      user={{ name: "Alice Johnson", email: "alice@example.com", fallbackInitials: "AJ" }}
      plan={{ name: "Pro", status: "active", renewsAt: "2025-03-01" }}
      onEditProfile={() => console.log("edit profile")}
      onManageBilling={() => console.log("manage billing")}
    />
  ),
  "appearance-settings": () => (
    <AppearanceSettings
      onThemeChange={(id: string) => console.log("theme", id)}
      onFontChange={(id: string) => console.log("font", id)}
    />
  ),
  "billing-overview": () => (
    <BillingOverview
      plan={{ id: "pro", name: "Pro", price: "$29/mo", billingCycle: "monthly", description: "Best for growing teams." }}
      status="active"
      onUpgrade={() => console.log("upgrade")}
      onManage={() => console.log("manage")}
    />
  ),
  "connected-accounts": () => (
    <ConnectedAccounts
      accounts={[
        { id: "github", provider: "github", connected: true, accountName: "alice-dev" },
        { id: "google", provider: "google", connected: false },
      ]}
      onConnectionToggle={(id: string) => console.log("toggle", id)}
    />
  ),
  "settings-cookie-preferences": () => (
    <CookiePreferences onSave={(prefs: Record<string, boolean>) => console.log("save prefs", prefs)} />
  ),
  "data-export-card": () => (
    <DataExportCard
      lastExportDate="2024-01-01"
      onExport={() => console.log("export")}
    />
  ),
  "language-settings": () => (
    <LanguageSettings />
  ),
  "notification-settings-card": () => (
    <NotificationSettingsCard
      groups={[
        {
          id: "comments",
          label: "Comments",
          channels: [
            { id: "email", channel: "email", label: "Email", enabled: true },
            { id: "push", channel: "push", label: "Push", enabled: false },
          ],
        },
        {
          id: "mentions",
          label: "Mentions",
          channels: [
            { id: "email", channel: "email", label: "Email", enabled: true },
            { id: "push", channel: "push", label: "Push", enabled: true },
          ],
        },
      ]}
      onChannelToggle={(groupId: string, channelId: string, enabled: boolean) => console.log("toggle", groupId, channelId, enabled)}
    />
  ),
  "privacy-settings": () => (
    <PrivacySettings
      onExportData={() => console.log("export data")}
      onDeleteAccount={() => console.log("delete account")}
    />
  ),
  "privacy-settings-layout": () => (
    <PrivacySettingsLayout
      onExport={() => console.log("export")}
      onDeleteAccount={() => console.log("delete")}
    />
  ),
  "security-settings": () => (
    <SecuritySettings
      onPasswordChange={() => console.log("change password")}
      onEnable2FA={() => console.log("enable 2fa")}
      onRevokeSessions={() => console.log("revoke sessions")}
    />
  ),
  "settings-layout": () => (
    <div className="h-[480px] overflow-hidden rounded-lg border">
      <SettingsLayoutBlock
        sections={[
          { id: "profile" as const, label: "Profile" },
          { id: "billing" as const, label: "Billing" },
          { id: "notifications" as const, label: "Notifications" },
          { id: "security" as const, label: "Security" },
        ]}
        defaultSection="profile"
        onSectionChange={(id: string) => console.log("section", id)}
      >
        <div className="p-6 text-sm text-muted-foreground">Settings content for selected section.</div>
      </SettingsLayoutBlock>
    </div>
  ),
  "settings-layout-block": () => (
    <div className="h-[420px] overflow-hidden rounded-lg border">
      <AppSettingsLayout
        sections={[
          {
            items: [
              { id: "profile", label: "Profile", href: "/settings/profile" },
              { id: "billing", label: "Billing", href: "/settings/billing" },
              { id: "security", label: "Security", href: "/settings/security" },
            ],
          },
        ]}
        activeItemId="profile"
      >
        <div className="p-6 text-sm text-muted-foreground">Profile settings content.</div>
      </AppSettingsLayout>
    </div>
  ),
  "tabbed-settings": () => (
    <TabbedSettings
      tabs={[
        { id: "profile", label: "Profile", children: <div className="p-4 text-sm text-muted-foreground">Profile settings</div> },
        { id: "account", label: "Account", children: <div className="p-4 text-sm text-muted-foreground">Account settings</div> },
        { id: "notifications", label: "Notifications", children: <div className="p-4 text-sm text-muted-foreground">Notification settings</div> },
      ]}
    />
  ),
  "team-settings": () => (
    <TeamSettings
      members={[
        { id: "1", name: "Alice Johnson", email: "alice@example.com", role: "owner" as const },
        { id: "2", name: "Bob Smith", email: "bob@example.com", role: "admin" as const },
        { id: "3", name: "Carol White", email: "carol@example.com", role: "member" as const },
      ]}
      onInvite={(email: string, role: string) => console.log("invite", email, role)}
      onRemove={(id: string) => console.log("remove", id)}
      onChangeRole={(id: string, role: string) => console.log("change role", id, role)}
    />
  ),
  "account-deletion-card": () => (
    <AccountDeletionCard
      onDelete={() => console.log("delete account")}
    />
  ),

  // navigation (additional)
  "breadcrumb-nav": () => (
    <BreadcrumbNav
      items={[
        { label: "Home", href: "/" },
        { label: "Projects", href: "/projects" },
        { label: "LaunchApp v2" },
      ]}
    />
  ),
  "command-palette-nav": () => {
    const CommandPaletteDemo = () => {
      const [open, setOpen] = React.useState(true);
      return (
        <div className="h-[340px] overflow-hidden rounded-lg border flex flex-col items-center justify-center gap-4 p-6">
          <p className="text-sm text-muted-foreground text-center">
            ⌘K command palette with search, keyboard navigation, and grouped actions.
          </p>
          <button
            onClick={() => setOpen(true)}
            className="inline-flex items-center gap-2 rounded-md border px-4 py-2 text-sm font-medium hover:bg-accent transition-colors"
          >
            Open Command Palette
            <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] opacity-100">
              <span className="text-xs">⌘</span>K
            </kbd>
          </button>
          <CommandPalette
            open={open}
            onOpenChange={setOpen}
            actions={[
              { id: "dashboard", label: "Dashboard", group: "pages", onSelect: () => console.log("navigate to dashboard") },
              { id: "settings", label: "Settings", group: "pages", onSelect: () => console.log("navigate to settings") },
              { id: "analytics", label: "Analytics", group: "pages", onSelect: () => console.log("navigate to analytics") },
            ]}
            groups={[{ id: "pages", label: "Pages" }]}
          />
        </div>
      );
    };
    return <CommandPaletteDemo />;
  },
  "user-menu-block": () => (
    <div className="flex justify-center p-4">
      <UserMenu
        user={{ name: "Alice Johnson", email: "alice@example.com", avatarFallback: "AJ" }}
        sections={[
          { items: [{ label: "Settings", href: "/settings" }, { label: "Billing", href: "/billing" }] },
          { items: [{ label: "Sign out", onClick: () => console.log("sign out"), danger: true }] },
        ]}
      />
    </div>
  ),

  // app shells (additional)
  "app-shell-minimal": () => (
    <div className="h-[480px] overflow-hidden rounded-lg border">
      <AppShellMinimal
        navItems={[
          { id: "dashboard", label: "Dashboard", href: "#" },
          { id: "analytics", label: "Analytics", href: "#" },
          { id: "settings", label: "Settings", href: "#" },
        ]}
        activeItemId="dashboard"
        user={{ name: "Alice Johnson", email: "alice@example.com", fallbackInitials: "AJ" }}
      >
        <div className="p-6">
          <h2 className="text-base font-semibold mb-2">Dashboard</h2>
          <p className="text-sm text-muted-foreground">Minimal app shell with clean navigation.</p>
        </div>
      </AppShellMinimal>
    </div>
  ),
  "collapsible-sidebar-block": () => (
    <div className="h-[420px] overflow-hidden rounded-lg border flex">
      <CollapsibleSidebar
        items={[
          { id: "home", label: "Home", href: "/" },
          { id: "analytics", label: "Analytics", href: "/analytics" },
          { id: "settings", label: "Settings", href: "/settings" },
        ]}
        activeItemId="home"
        user={{ name: "Alice Johnson", email: "alice@example.com", fallbackInitials: "AJ" }}
      >
        <div className="p-6 text-sm text-muted-foreground">Main content area.</div>
      </CollapsibleSidebar>
    </div>
  ),
  "compact-sidebar": () => (
    <TooltipProvider>
      <div className="h-[420px] overflow-hidden rounded-lg border flex">
        <CompactSidebar
          items={[
            { id: "dashboard", label: "Dashboard", href: "/" },
            { id: "analytics", label: "Analytics", href: "/analytics" },
            { id: "projects", label: "Projects", href: "/projects" },
          ]}
          activeItemId="dashboard"
          user={{ name: "Alice Johnson", email: "alice@example.com", fallbackInitials: "AJ" }}
        >
          <div className="p-6 text-sm text-muted-foreground">Compact sidebar layout.</div>
        </CompactSidebar>
      </div>
    </TooltipProvider>
  ),
  "dashboard-header": () => (
    <DashboardHeader
      title="Dashboard"
      breadcrumbs={[{ label: "Home", href: "/" }, { label: "Dashboard" }]}
      user={{ name: "Alice Johnson", email: "alice@example.com", fallbackInitials: "AJ" }}
    />
  ),
  "page-container": () => (
    <PageContainer title="My Page" description="Page description here." maxWidth="lg">
      <div className="rounded-lg border p-6 text-sm text-muted-foreground">Content goes here</div>
    </PageContainer>
  ),
  "multi-panel-layout-shell": () => (
    <div className="h-[420px] overflow-hidden rounded-lg border">
      <MultiPanelLayout
        leftPanel={<div className="p-4 h-full bg-muted/30 text-sm text-muted-foreground">Left Panel</div>}
        centerPanel={<div className="p-4 h-full text-sm text-muted-foreground">Center Panel</div>}
        rightPanel={<div className="p-4 h-full bg-muted/20 text-sm text-muted-foreground">Right Panel</div>}
      />
    </div>
  ),
  "mobile-nav-drawer-shell": () => {
    const MobileNavDemo = () => {
      const [open, setOpen] = React.useState(false);
      return (
        <div className="h-[420px] overflow-hidden rounded-lg border">
          <MobileNavDrawerShell
            drawerOpen={open}
            onDrawerOpenChange={setOpen}
            navSections={[
              {
                items: [
                  { label: "Home", href: "#" },
                  { label: "Analytics", href: "#" },
                  { label: "Settings", href: "#" },
                ],
              },
            ]}
            user={{ name: "Alice Johnson", email: "alice@example.com", avatarFallback: "AJ" }}
          >
            <div className="p-6">
              <button
                onClick={() => setOpen(true)}
                className="rounded-md border px-4 py-2 text-sm font-medium hover:bg-accent transition-colors"
              >
                Open Mobile Nav
              </button>
              <p className="mt-3 text-sm text-muted-foreground">Tap the button to open the mobile navigation drawer.</p>
            </div>
          </MobileNavDrawerShell>
        </div>
      );
    };
    return <MobileNavDemo />;
  },

  // data (additional)
  "calendar-view": () => (
    <CalendarView
      events={[
        { id: "1", date: new Date(2024, 0, 15), title: "Team standup", color: "primary" },
        { id: "2", date: new Date(2024, 0, 20), title: "Product launch", color: "secondary" },
        { id: "3", date: new Date(2024, 0, 25), title: "Sprint review", color: "destructive" },
      ]}
      onDateSelect={(date: Date) => console.log("selected", date)}
    />
  ),
  "chart-card": () => (
    <ChartCard
      title="Revenue Over Time"
      description="Monthly revenue for the past 6 months"
      periods={["1W", "1M", "3M", "6M", "1Y"]}
    >
      <div className="h-48 flex items-center justify-center text-muted-foreground text-sm">
        Chart visualization goes here
      </div>
    </ChartCard>
  ),
  "data-trend": () => (
    <DataTrend
      label="Monthly Active Users"
      value={12450}
      change={15.3}
      direction="up"
    />
  ),
  "empty-state-block": () => (
    <EmptyState
      title="No projects yet"
      description="Get started by creating your first project."
      primaryAction={{ label: "Create project", onClick: () => console.log("create") }}
    />
  ),
  "empty-state-card": () => (
    <EmptyStateCard
      title="No results found"
      description="Try adjusting your search or filters."
      action={{ label: "Clear filters", onClick: () => console.log("clear") }}
    />
  ),
  "filter-bar": () => (
    <FilterBar
      filters={[
        {
          column: "status",
          label: "Status",
          options: [
            { label: "Active", value: "active" },
            { label: "Inactive", value: "inactive" },
            { label: "Pending", value: "pending" },
          ],
        },
        {
          column: "role",
          label: "Role",
          options: [
            { label: "Admin", value: "admin" },
            { label: "Member", value: "member" },
            { label: "Viewer", value: "viewer" },
          ],
        },
      ]}
      onFiltersChange={(filters: Record<string, string[]>) => console.log("filters", filters)}
    />
  ),
  "sparkline-card": () => (
    <SparklineCard
      title="Revenue"
      value="$45,231"
      data={[30, 40, 35, 50, 49, 60, 70, 65, 80]}
      trend="up"
      trendValue="+20.1%"
      description="vs last month"
    />
  ),
  "funnel-chart-card": () => (
    <FunnelChartCard
      title="Checkout Funnel"
      stages={[
        { label: "Visitors", value: 10000 },
        { label: "Sign Ups", value: 4200 },
        { label: "Trial", value: 1800 },
        { label: "Paid", value: 620 },
      ]}
      description="Conversion funnel for this month"
    />
  ),
  "gauge-card": () => (
    <GaugeCard
      title="CPU Usage"
      value={68}
      max={100}
      unit="%"
      description="Current server load"
      thresholds={[
        { label: "Normal", value: 60 },
        { label: "Warning", value: 80 },
      ]}
    />
  ),
  "data-table-card": () => (
    <DataTableCard
      title="Recent Users"
      description="Latest registered users"
      columns={[
        { key: "name", header: "Name" },
        { key: "email", header: "Email" },
        { key: "role", header: "Role" },
      ]}
      data={[
        { name: "Alice Johnson", email: "alice@example.com", role: "Admin" },
        { name: "Bob Smith", email: "bob@example.com", role: "Member" },
        { name: "Carol White", email: "carol@example.com", role: "Viewer" },
      ]}
      keyField="email"
    />
  ),
  "kpi-comparison-card": () => (
    <KPIComparisonCard
      title="Monthly Revenue"
      currentValue="$45,231"
      previousValue="$37,890"
      change={19.6}
      changeDirection="up"
      changeLabel="vs last month"
      description="Total recurring revenue"
    />
  ),
  "data-table-toolbar": () => (
    <TooltipProvider>
      <DataTableToolbar
        searchPlaceholder="Search users..."
        showSearch
        actions={[
          { id: "export", label: "Export", onClick: () => console.log("export") },
          { id: "import", label: "Import", onClick: () => console.log("import") },
        ]}
      />
    </TooltipProvider>
  ),
  "column-filters": () => (
    <ColumnFilters
      columns={[
        { id: "status", label: "Status", type: "select", options: [{ value: "active", label: "Active" }, { value: "inactive", label: "Inactive" }] },
        { id: "name", label: "Name", type: "text" },
        { id: "role", label: "Role", type: "select", options: [{ value: "admin", label: "Admin" }, { value: "member", label: "Member" }] },
      ]}
      filters={[]}
      onFiltersChange={(filters: unknown[]) => console.log("filters changed", filters)}
    />
  ),
  "feature-comparison": () => (
    <FeatureComparison
      tiers={[
        { id: "free", name: "Free", price: { monthly: 0, annually: 0 }, cta: { label: "Get started" } },
        { id: "pro", name: "Pro", price: { monthly: 29, annually: 290 }, popular: true, cta: { label: "Start trial" } },
        { id: "enterprise", name: "Enterprise", price: { monthly: "Custom", annually: "Custom" }, cta: { label: "Contact sales" } },
      ]}
      features={[
        { id: "projects", name: "Projects", values: { free: "5", pro: "Unlimited", enterprise: "Unlimited" } },
        { id: "storage", name: "Storage", values: { free: "5GB", pro: "100GB", enterprise: "Custom" } },
        { id: "support", name: "Support", values: { free: false, pro: true, enterprise: true } },
        { id: "sso", name: "SSO", values: { free: false, pro: false, enterprise: true } },
      ]}
      headline="Compare plans"
      subheadline="Choose the right plan for your team."
    />
  ),

  // ecommerce (additional)
  "product-grid": () => (
    <ProductGrid
      products={[
        { id: "1", name: "Wireless Headphones", price: 99.99, originalPrice: 149.99, rating: 4.5, reviewCount: 128, badge: "Sale" },
        { id: "2", name: "Smart Watch", price: 299.99, rating: 4.8, reviewCount: 89, badge: "New" },
        { id: "3", name: "Bluetooth Speaker", price: 59.99, rating: 4.3, reviewCount: 54 },
        { id: "4", name: "Laptop Stand", price: 39.99, rating: 4.6, reviewCount: 203 },
      ]}
      columns={2}
      onAddToCart={(product: { id: string }) => console.log("add to cart", product.id)}
    />
  ),
  "cart-drawer": () => {
    const CartDrawerDemo = () => {
      const [open, setOpen] = React.useState(false);
      return (
        <div className="flex flex-col items-center gap-4 p-6">
          <button
            onClick={() => setOpen(true)}
            className="rounded-md border px-4 py-2 text-sm font-medium hover:bg-accent transition-colors"
          >
            Open Cart
          </button>
          <p className="text-sm text-muted-foreground">Slide-out cart drawer with item list and checkout.</p>
          <CartDrawer
            open={open}
            onOpenChange={setOpen}
            items={[
              { id: "1", name: "Wireless Headphones", price: 99.99, quantity: 1 },
              { id: "2", name: "Smart Watch", price: 299.99, quantity: 2 },
            ]}
            taxRate={0.08}
            shippingCost={9.99}
            onCheckout={() => console.log("checkout")}
          />
        </div>
      );
    };
    return <CartDrawerDemo />;
  },
  "order-summary": () => (
    <OrderSummary
      items={[
        { id: "1", name: "Premium Plan", quantity: 1, price: 290 },
        { id: "2", name: "Extra Storage", quantity: 1, price: 49 },
      ]}
      taxRate={0.08}
      shippingCost={0}
      onCheckout={() => console.log("checkout")}
    />
  ),

  // marketing (additional)
  "logo-cloud": () => (
    <LogoCloud
      logos={[
        { name: "Acme Corp" },
        { name: "Globex" },
        { name: "Initech" },
        { name: "Umbrella" },
        { name: "Hooli" },
      ]}
      headline="Trusted by leading teams"
      variant="simple"
    />
  ),
  "changelog-timeline": () => (
    <ChangelogTimeline
      title="Changelog"
      description="Latest updates and improvements."
      entries={[
        { id: "1", version: "2.0.0", date: "March 2024", title: "Design System v2", description: "268 components, dark mode, and more.", tags: ["breaking"] },
        { id: "2", version: "1.5.0", date: "January 2024", title: "New Components", description: "Added Carousel, Timeline, and Heatmap.", tags: ["feature"] },
        { id: "3", version: "1.4.2", date: "December 2023", title: "Bug Fixes", description: "Resolved accessibility issues in Combobox.", tags: ["fix"] },
      ]}
    />
  ),
  "billing-card": () => (
    <BillingCard
      planName="Pro"
      price="$29"
      billingPeriod="month"
      status="active"
      features={[
        { name: "Unlimited projects", included: true },
        { name: "100 GB storage", included: true },
        { name: "Priority support", included: true },
      ]}
      nextBillingDate="April 1, 2025"
      onUpgrade={() => console.log("upgrade")}
      onManage={() => console.log("manage")}
    />
  ),
  "pricing-comparison-table": () => (
    <PricingComparisonTable
      headline="Compare plans"
      subheadline="Find the right plan for your team."
      plans={[
        { id: "free", name: "Free", price: { monthly: 0, annually: 0 }, cta: { label: "Get started" } },
        { id: "pro", name: "Pro", price: { monthly: 29, annually: 290 }, popular: true, cta: { label: "Start trial" } },
        { id: "enterprise", name: "Enterprise", price: { monthly: "Custom", annually: "Custom" }, cta: { label: "Contact sales" } },
      ]}
      features={[
        { name: "Projects", category: "Core", values: { free: "5", pro: "Unlimited", enterprise: "Unlimited" } },
        { name: "Storage", category: "Core", values: { free: "5 GB", pro: "100 GB", enterprise: "Custom" } },
        { name: "Priority Support", category: "Support", values: { free: false, pro: true, enterprise: true } },
        { name: "SSO", category: "Security", values: { free: false, pro: false, enterprise: true } },
      ]}
    />
  ),

  // admin (additional)
  "system-settings-panel": () => (
    <SystemSettingsPanel
      appName="LaunchApp"
      appConfig={[
        { id: "max_upload", label: "Max Upload Size (MB)", type: "number", value: "50" },
        { id: "session_timeout", label: "Session Timeout (minutes)", type: "number", value: "60" },
      ]}
      featureFlags={[
        { id: "new_dashboard", name: "New Dashboard", description: "Enable the redesigned dashboard layout.", enabled: true },
        { id: "ai_assistant", name: "AI Assistant", description: "Enable AI-powered suggestions.", enabled: false },
        { id: "maintenance", name: "Maintenance Mode", description: "Take the site offline for maintenance.", enabled: false },
      ]}
      onFlagToggle={(id: string, enabled: boolean) => console.log("toggle flag", id, enabled)}
      onSaveConfig={() => console.log("save config")}
    />
  ),
  "webhook-manager": () => (
    <WebhookManager
      endpoints={[
        { id: "1", name: "Production Webhook", url: "https://api.example.com/hooks", eventTypes: ["user.created", "payment.success"], active: true, createdAt: "2024-01-01" },
        { id: "2", name: "Staging Webhook", url: "https://staging.example.com/hooks", eventTypes: ["user.created"], active: false, createdAt: "2024-02-01" },
      ]}
      availableEventTypes={["user.created", "user.deleted", "payment.success", "payment.failed", "subscription.updated"]}
      onCreateEndpoint={(data: unknown) => console.log("create", data)}
      onDeleteEndpoint={(id: string) => console.log("delete", id)}
      onToggleEndpoint={(id: string, active: boolean) => console.log("toggle", id, active)}
    />
  ),

  // billing (additional)
  "invoice-table": () => (
    <InvoiceTable
      invoices={[
        { id: "INV-001", number: "INV-001", date: "2024-01-01", amount: "49", status: "paid" as const, description: "Pro Plan - January 2024", downloadUrl: "#" },
        { id: "INV-002", number: "INV-002", date: "2024-02-01", amount: "49", status: "paid" as const, description: "Pro Plan - February 2024", downloadUrl: "#" },
        { id: "INV-003", number: "INV-003", date: "2024-03-01", amount: "49", status: "pending" as const, description: "Pro Plan - March 2024" },
      ]}
      onDownload={(invoice: { id: string }) => console.log("download", invoice.id)}
    />
  ),
  "usage-meter": () => (
    <UsageMeter
      title="Plan Usage"
      items={[
        { id: "storage", label: "Storage", used: 3.2, total: 10, unit: "GB", warningThreshold: 80 },
        { id: "api_calls", label: "API Calls", used: 7500, total: 10000, unit: "calls", warningThreshold: 75 },
      ]}
      onUpgrade={() => console.log("upgrade")}
    />
  ),

  // blog (additional)
  "post-detail": () => (
    <PostDetail
      title="Getting Started with LaunchApp Design System"
      content={
        <div className="prose prose-sm max-w-none">
          <p>The LaunchApp Design System provides a comprehensive set of components built on Radix UI primitives and styled with Tailwind CSS 4.</p>
          <h2>Installation</h2>
          <p>Install the package via npm and import the styles to get started quickly.</p>
          <h2>Usage</h2>
          <p>Import components directly and customize them using design tokens.</p>
        </div>
      }
      author="Alice Johnson"
      publishedAt="January 15, 2025"
      readingTime="5 min read"
      category="Tutorial"
      tags={["Design System", "React", "TypeScript"]}
    />
  ),
  "newsletter-signup": () => (
    <NewsletterSignup
      variant="card"
      title="Stay up to date"
      subtitle="Get the latest updates and releases directly to your inbox."
      onSubmit={async (email: string) => console.log("subscribe", email)}
    />
  ),

  // community (additional)
  "community-themes-gallery": () => (
    <CommunityThemesGallery columns={3} />
  ),
  "theme-submission-form": () => (
    <ThemeSubmissionForm
      onSubmit={(theme: unknown) => console.log("submit theme", theme)}
      onCancel={() => console.log("cancel")}
    />
  ),
  "team-member-card": () => (
    <TeamMemberCard
      name="Alice Johnson"
      role="Senior Frontend Engineer"
      department="Engineering"
      bio="Passionate about building accessible, beautiful user interfaces."
      initials="AJ"
      socialLinks={[
        { network: "github" as const, href: "#", label: "GitHub" },
        { network: "linkedin" as const, href: "#", label: "LinkedIn" },
      ]}
      tags={["React", "TypeScript", "Design Systems"]}
    />
  ),

  // errors (additional)
  "server-error-page": () => (
    <ServerError
      retryAction={<button type="button" className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground">Try again</button>}
      homeAction={<button type="button" className="rounded-md border px-4 py-2 text-sm font-medium">Go home</button>}
    />
  ),
  "maintenance-page": () => (
    <Maintenance
      title="We'll be back soon"
      description="We're performing scheduled maintenance. This should only take a few minutes."
      estimatedTime="30 minutes"
      updates={[
        { label: "Database migration", status: "done" as const },
        { label: "Service restart", status: "in-progress" as const },
        { label: "Cache warm-up", status: "pending" as const },
      ]}
    />
  ),

  // files
  "file-grid": () => (
    <FileGrid
      files={[
        { id: "1", name: "report.pdf", type: "document" as const, size: 2457600, modifiedAt: "2024-01-01" },
        { id: "2", name: "photo.jpg", type: "image" as const, size: 1153434, modifiedAt: "2024-01-02" },
        { id: "3", name: "spreadsheet.xlsx", type: "document" as const, size: 552960, modifiedAt: "2024-01-03" },
        { id: "4", name: "archive.zip", type: "archive" as const, size: 983040, modifiedAt: "2024-01-04" },
      ]}
      columns={4}
      onOpen={(id: string) => console.log("open", id)}
      onDownload={(id: string) => console.log("download", id)}
    />
  ),
  "file-list": () => (
    <FileList
      files={[
        { id: "1", name: "document.pdf", size: 2457600, status: "complete" as const },
        { id: "2", name: "photo.jpg", size: 1153434, status: "complete" as const },
        { id: "3", name: "video.mp4", size: 52428800, status: "uploading" as const },
      ]}
      onRemove={(id: string) => console.log("remove", id)}
      title="Uploaded Files"
    />
  ),
  "image-gallery": () => (
    <ImageGallery
      images={[
        { id: "1", src: "/placeholder-image.jpg", alt: "Photo 1" },
        { id: "2", src: "/placeholder-image.jpg", alt: "Photo 2" },
        { id: "3", src: "/placeholder-image.jpg", alt: "Photo 3" },
        { id: "4", src: "/placeholder-image.jpg", alt: "Photo 4" },
        { id: "5", src: "/placeholder-image.jpg", alt: "Photo 5" },
        { id: "6", src: "/placeholder-image.jpg", alt: "Photo 6" },
      ]}
      columns={3}
    />
  ),
  "drop-zone": () => (
    <DropZone
      accept="image/*,application/pdf"
      multiple
      onFilesSelected={(files: File[]) => console.log("files selected", files.map(f => f.name))}
    />
  ),
  "file-upload-zone": () => (
    <FileUploadZone
      accept="image/*,application/pdf"
      maxFiles={5}
      maxSize={10 * 1024 * 1024}
    />
  ),

  // forms
  "rich-text-editor": () => (
    <RichTextEditor
      label="Description"
      placeholder="Write your content here..."
      minHeight={200}
      showWordCount
      onChange={(html: string) => console.log("change", html.slice(0, 50))}
    />
  ),

  // integrations
  "oauth-connect-card": () => (
    <OAuthConnectCard
      provider={{ id: "github", name: "GitHub", description: "Connect your GitHub account to sync repositories.", scopes: ["repo", "user"] }}
      isConnected={false}
      onConnect={() => console.log("connect github")}
    />
  ),
  "integrations-api-key-manager": () => (
    <ApiKeyManager
      keys={[
        { id: "1", name: "Production Key", prefix: "sk-prod", createdAt: "2024-01-01" },
        { id: "2", name: "Staging Key", prefix: "sk-stage", createdAt: "2024-02-01" },
      ]}
      onCreate={() => console.log("create key")}
      onRevoke={(key: { id: string }) => console.log("revoke", key.id)}
      title="API Keys"
      description="Manage your API access keys."
    />
  ),
  "webhook-config": () => (
    <WebhookConfig
      url="https://api.example.com/webhooks"
      events={[
        { id: "user.created", name: "User Created", enabled: true },
        { id: "payment.success", name: "Payment Success", enabled: true },
        { id: "subscription.updated", name: "Subscription Updated", enabled: false },
      ]}
      onUrlChange={(url: string) => console.log("url changed", url)}
      onToggleEvent={(event) => console.log("toggle event", event.id, event.enabled)}
      onSave={() => console.log("save webhook")}
      onTest={() => console.log("test webhook")}
    />
  ),

  // landing
  "landing-hero-section": () => (
    <HeroSectionBlock
      variant="centered"
      eyebrow="New — v2.0 released"
      headline="Build faster with LaunchApp"
      subheadline="A complete design system built on Radix UI and Tailwind CSS. Ship production-ready UIs in hours, not weeks."
      primaryAction={<button type="button" className="rounded-md bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground">Get started</button>}
      secondaryAction={<button type="button" className="rounded-md border px-6 py-2.5 text-sm font-medium">View docs</button>}
    />
  ),
  "landing-feature-grid": () => (
    <FeatureGridBlock
      variant="default"
      cols="3"
      eyebrow="Features"
      headline="Everything you need to ship"
      subheadline="Production-ready UI components built for modern applications."
      features={[
        { title: "Accessible", description: "Built on Radix UI primitives for full keyboard and screen reader support.", icon: <span aria-hidden className="text-2xl">♿</span> },
        { title: "Customizable", description: "CSS custom properties and Tailwind for effortless theming.", icon: <span aria-hidden className="text-2xl">🎨</span> },
        { title: "TypeScript", description: "Fully typed APIs with IntelliSense for a great DX.", icon: <span aria-hidden className="text-2xl">📘</span> },
        { title: "Dark Mode", description: "First-class dark mode support out of the box.", icon: <span aria-hidden className="text-2xl">🌙</span> },
        { title: "Production Ready", description: "Battle-tested components shipped in production apps.", icon: <span aria-hidden className="text-2xl">🚀</span> },
        { title: "Open Source", description: "MIT licensed and open for contributions.", icon: <span aria-hidden className="text-2xl">🔓</span> },
      ]}
    />
  ),
  "landing-pricing-table": () => (
    <PricingTableBlock
      headline="Simple, transparent pricing"
      subheadline="No hidden fees. Cancel anytime."
    />
  ),
  "landing-pricing-section": () => (
    <PricingSectionBlock
      headline="Choose your plan"
      subheadline="Scale as your team grows."
      tiers={[
        { name: "Free", monthlyPrice: "0", annualPrice: "0", description: "Perfect for individuals.", features: ["5 projects", "10 GB storage", "Community support"], ctaLabel: "Get started" },
        { name: "Pro", monthlyPrice: "29", annualPrice: "290", description: "Best for growing teams.", features: ["Unlimited projects", "100 GB storage", "Priority support", "Analytics"], ctaLabel: "Start free trial", popular: true },
        { name: "Enterprise", monthlyPrice: "99", annualPrice: "990", description: "For large organizations.", features: ["Everything in Pro", "SSO", "Dedicated support", "SLA"], ctaLabel: "Contact sales" },
      ]}
    />
  ),
  "landing-testimonials": () => (
    <TestimonialsSection
      variant="default"
      displayMode="grid"
      eyebrow="Testimonials"
      headline="Loved by developers"
      testimonials={[
        { quote: "LaunchApp cut our dev time in half.", author: { name: "Alice Johnson", role: "CTO", company: "Startup Inc." } },
        { quote: "Best component library we've used.", author: { name: "Bob Smith", role: "Lead Engineer", company: "Startup Co." } },
        { quote: "The theming support is incredible.", author: { name: "Carol White", role: "Frontend Lead", company: "TechCorp" } },
      ]}
    />
  ),
  "landing-faq-section": () => (
    <FAQSection
      variant="default"
      eyebrow="FAQ"
      headline="Frequently asked questions"
      items={[
        { question: "How do I get started?", answer: "Sign up for free and follow the quickstart guide in our documentation." },
        { question: "Is there a free plan?", answer: "Yes, we have a generous free tier with 5 projects and 10 GB storage." },
        { question: "Can I cancel anytime?", answer: "Absolutely. Cancel your subscription at any time with no questions asked." },
        { question: "Do you offer team pricing?", answer: "Yes, our Pro and Enterprise plans support unlimited team members." },
      ]}
    />
  ),
  "landing-cta-section": () => (
    <CTASection
      variant="default"
      background="primary"
      headline="Ready to ship faster?"
      subtext="Join thousands of developers building with LaunchApp."
      primaryAction={<button type="button" className="rounded-md bg-white px-6 py-2.5 text-sm font-semibold text-primary">Get started free</button>}
      secondaryAction={<button type="button" className="rounded-md border border-white/30 px-6 py-2.5 text-sm font-medium text-white">View docs</button>}
      align="center"
    />
  ),
  "landing-saas": () => (
    <SaaSLanding
      badge="New — v2.0 released"
      headline="Build faster with LaunchApp"
      subheadline="A complete design system built on Radix UI and Tailwind CSS."
      primaryAction={<button type="button" className="rounded-md bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground">Get started</button>}
      secondaryAction={<button type="button" className="rounded-md border px-6 py-2.5 text-sm font-medium">View docs</button>}
      featuresTitle="Everything you need"
      features={[
        { title: "Fast", description: "Optimized for performance.", icon: <span>⚡</span> },
        { title: "Secure", description: "Enterprise-grade security.", icon: <span>🔒</span> },
        { title: "Scalable", description: "Grows with your business.", icon: <span>📈</span> },
      ]}
    />
  ),
  "landing-startup": () => (
    <Startup
      badge="YC-backed"
      headline="The fastest way to build your startup"
      subheadline="From idea to launch in days, not months."
      primaryAction={<button type="button" className="rounded-md bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground">Start building</button>}
      socialProof={[
        { metric: "500+", label: "Startups" },
        { metric: "$50M+", label: "Raised" },
        { metric: "10k+", label: "Users" },
      ]}
      testimonials={[
        { quote: "Shipped our MVP in 2 weeks using LaunchApp.", author: "Sarah Chen", role: "Founder at Acme" },
      ]}
    />
  ),
  "landing-agency": () => (
    <Agency
      badge="Award-winning studio"
      headline="We craft digital experiences that convert"
      subheadline="Strategy, design, and engineering for forward-thinking brands."
      primaryAction={<button type="button" className="rounded-md bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground">Start a project</button>}
      services={[
        { title: "Strategy", description: "Brand positioning and go-to-market planning.", icon: <span>📊</span> },
        { title: "Design", description: "UI/UX design systems and prototyping.", icon: <span>🎨</span> },
        { title: "Engineering", description: "Full-stack development and DevOps.", icon: <span>⚙️</span> },
      ]}
    />
  ),
  "landing-portfolio": () => (
    <Portfolio
      name="Alice Johnson"
      title="Full-Stack Engineer & Designer"
      bio={<p>I build beautiful, performant web applications with a focus on user experience and accessibility.</p>}
      projects={[
        { title: "LaunchApp", description: "A complete SaaS design system.", tags: ["React", "TypeScript"], link: "#" },
        { title: "DataViz", description: "Real-time analytics dashboard.", tags: ["Next.js", "D3.js"], link: "#" },
        { title: "Commerce", description: "E-commerce platform with AR.", tags: ["Remix", "Three.js"], link: "#" },
      ]}
    />
  ),

  // messaging (additional)
  "message-bubbles": () => (
    <MessageBubbles
      messages={[
        { id: "1", content: "Hey! How's the new design system coming along?", sender: "received" as const, senderName: "Alice", timestamp: "10:00 AM", avatarInitials: "AJ" },
        { id: "2", content: "Really well! Just finished the new block previews.", sender: "sent" as const, timestamp: "10:01 AM" },
        { id: "3", content: "That's awesome! Can't wait to see it.", sender: "received" as const, senderName: "Alice", timestamp: "10:02 AM", avatarInitials: "AJ" },
        { id: "4", content: "It should be ready for review later today.", sender: "sent" as const, timestamp: "10:03 AM" },
      ]}
    />
  ),
  "typing-indicator": () => (
    <div className="p-4 space-y-3">
      <TypingIndicator label="Alice is typing..." />
      <p className="text-xs text-muted-foreground">Shows when someone is composing a message.</p>
    </div>
  ),

  // notifications (additional)
  "inbox-view": () => (
    <InboxView
      title="Inbox"
      items={[
        { id: "1", sender: "Alice Johnson", subject: "New comment on your post", preview: "Left a review on the design tokens RFC...", date: "5m ago", read: false, senderInitials: "AJ" },
        { id: "2", sender: "Bob Smith", subject: "PR #42 merged", preview: "feat(auth): add OAuth providers", date: "1h ago", read: false, senderInitials: "BS" },
        { id: "3", sender: "Carol White", subject: "Team invite accepted", preview: "Carol joined your workspace", date: "2h ago", read: true, senderInitials: "CW" },
      ]}
      onSelect={(id: string) => console.log("select", id)}
      onMarkRead={(id: string) => console.log("mark read", id)}
    />
  ),
  "notification-bell-block": () => (
    <div className="flex justify-center p-4">
      <NotificationBell
        notifications={[
          { id: "1", title: "New comment", timestamp: "5m ago", read: false, description: "Alice commented on your post." },
          { id: "2", title: "Payment received", timestamp: "1h ago", read: false, description: "$49 payment processed." },
          { id: "3", title: "Team invite", timestamp: "2h ago", read: true, description: "Bob joined your workspace." },
        ]}
        onRead={(id: string) => console.log("read", id)}
        onReadAll={() => console.log("read all")}
        badgeCount={2}
      />
    </div>
  ),
  "notification-preferences-block": () => (
    <NotificationPreferencesCenter
      onChange={(categoryId: string, channelId: string, enabled: boolean) => console.log("change", categoryId, channelId, enabled)}
      onSave={() => console.log("save preferences")}
    />
  ),

  // onboarding (additional)
  "multi-step-wizard-block": () => (
    <MultiStepWizard
      steps={[
        { id: "basics", title: "Basic Info", description: "Tell us about yourself.", content: <div className="p-4 text-sm text-muted-foreground">Name and email form goes here</div> },
        { id: "plan", title: "Choose Plan", description: "Select the right plan for you.", content: <div className="p-4 text-sm text-muted-foreground">Plan selection goes here</div> },
        { id: "payment", title: "Payment", description: "Enter payment details.", content: <div className="p-4 text-sm text-muted-foreground">Payment form goes here</div> },
      ]}
      onComplete={() => console.log("wizard complete")}
    />
  ),
  "onboarding-stepper": () => (
    <OnboardingStepper
      steps={[
        { id: "profile", title: "Profile", content: <div className="p-4 text-sm text-muted-foreground">Profile setup</div> },
        { id: "team", title: "Team", content: <div className="p-4 text-sm text-muted-foreground">Team setup</div> },
        { id: "billing", title: "Billing", content: <div className="p-4 text-sm text-muted-foreground">Billing setup</div> },
        { id: "done", title: "Done", content: <div className="p-4 text-sm text-muted-foreground">All done!</div> },
      ]}
      onComplete={() => console.log("complete")}
    />
  ),
  "progress-stepper": () => (
    <ProgressStepper
      steps={[
        { id: "profile", title: "Profile", content: <div className="p-4 text-sm text-muted-foreground">Profile step</div> },
        { id: "billing", title: "Billing", content: <div className="p-4 text-sm text-muted-foreground">Billing step</div> },
        { id: "review", title: "Review", content: <div className="p-4 text-sm text-muted-foreground">Review step</div> },
        { id: "launch", title: "Launch", content: <div className="p-4 text-sm text-muted-foreground">Launch step</div> },
      ]}
      initialStep={2}
      onComplete={() => console.log("complete")}
    />
  ),
  "setup-checklist": () => (
    <SetupChecklist
      title="Complete setup"
      items={[
        { id: "verify", title: "Verify your email", completed: true, href: "#" },
        { id: "profile", title: "Complete your profile", completed: true, href: "/settings/profile" },
        { id: "invite", title: "Invite your team", completed: false, href: "/team/invite" },
        { id: "integrate", title: "Set up an integration", completed: false, href: "/integrations" },
      ]}
      showProgress
    />
  ),
  "setup-wizard": () => (
    <SetupWizard
      steps={[
        { id: "profile", label: "Profile", completed: true },
        { id: "team", label: "Team", completed: true },
        { id: "billing", label: "Billing", completed: false },
        { id: "launch", label: "Launch", completed: false },
      ]}
      currentStepId="billing"
      onComplete={() => console.log("setup complete")}
    />
  ),
  "welcome-screen": () => (
    <WelcomeScreen
      title="Welcome to LaunchApp"
      description="Everything you need to build and ship your SaaS product."
      features={[
        { icon: <span aria-hidden>🚀</span>, title: "Ship faster", description: "Production-ready components out of the box." },
        { icon: <span aria-hidden>🎨</span>, title: "Beautiful by default", description: "Thoughtfully designed with dark mode support." },
        { icon: <span aria-hidden>♿</span>, title: "Fully accessible", description: "Built on Radix UI for WCAG compliance." },
      ]}
      ctaLabel="Get started"
      onCta={() => console.log("get started")}
    />
  ),
  "welcome-wizard": () => (
    <WelcomeWizard
      steps={[
        { id: "welcome", title: "Welcome!", description: "Let's get you set up.", content: <div className="p-4 text-sm text-muted-foreground">Welcome content</div> },
        { id: "profile", title: "Your profile", description: "Tell us about yourself.", content: <div className="p-4 text-sm text-muted-foreground">Profile setup content</div> },
        { id: "done", title: "You're all set!", description: "Start using the app.", content: <div className="p-4 text-sm text-muted-foreground">Completion screen</div> },
      ]}
      onComplete={() => console.log("wizard complete")}
    />
  ),
  "team-invite-flow": () => (
    <TeamInviteFlow
      onSendInvites={(emails: string[]) => console.log("invite", emails)}
      onSkip={() => console.log("skip")}
      maxInvites={5}
    />
  ),
  "goal-setup-wizard": () => (
    <GoalSetupWizard
      steps={[
        {
          id: "goals",
          title: "What are you trying to accomplish?",
          description: "Select all that apply.",
          options: [
            { id: "launch", label: "Launch my product", description: "Ship a new product or feature", icon: <span>🚀</span> },
            { id: "grow", label: "Grow my team", description: "Scale engineering capacity", icon: <span>👥</span> },
            { id: "automate", label: "Automate workflows", description: "Reduce manual processes", icon: <span>⚙️</span> },
          ],
          multiSelect: true,
        },
      ]}
      onComplete={(selections: Record<string, string[]>) => console.log("goals", selections)}
    />
  ),
  "checklist-with-links": () => (
    <ChecklistWithLinks
      title="Setup checklist"
      items={[
        { id: "verify", title: "Verify your email", completed: true, href: "#" },
        { id: "profile", title: "Complete your profile", completed: true, href: "/settings/profile" },
        { id: "billing", title: "Add payment method", completed: false, href: "/billing" },
        { id: "invite", title: "Invite teammates", completed: false, href: "/team/invite" },
      ]}
    />
  ),

  // search
  "search-command-palette": () => {
    const SearchPaletteDemo = () => {
      const [open, setOpen] = React.useState(false);
      return (
        <div className="flex flex-col items-center gap-4 p-6 min-h-[300px]">
          <button
            onClick={() => setOpen(true)}
            className="inline-flex items-center gap-2 rounded-md border px-4 py-2 text-sm font-medium hover:bg-accent transition-colors"
          >
            Open Search
            <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] opacity-100">
              <span className="text-xs">⌘</span>K
            </kbd>
          </button>
          <p className="text-sm text-muted-foreground text-center">Searchable command palette with keyboard navigation.</p>
          <SearchCommandPalette
            open={open}
            onOpenChange={setOpen}
            results={[
              { id: "1", title: "Dashboard", url: "/dashboard" },
              { id: "2", title: "Settings", url: "/settings" },
              { id: "3", title: "Getting Started Guide", url: "/docs/getting-started" },
            ]}
          />
        </div>
      );
    };
    return <SearchPaletteDemo />;
  },
  "search-results-page": () => (
    <SearchResults
      query="design system"
      searchResults={[
        { id: "1", title: "Getting Started Guide", excerpt: "Learn how to use LaunchApp.", url: "/docs/getting-started" },
        { id: "2", title: "Dashboard", excerpt: "Main dashboard", url: "/dashboard" },
        { id: "3", title: "API Reference", excerpt: "Complete API documentation.", url: "/docs/api" },
        { id: "4", title: "Settings", excerpt: "Account settings", url: "/settings" },
      ]}
      totalCount={4}
      onSearch={(q: string) => console.log("search", q)}
      onResultClick={(result: { id: string }) => console.log("click", result.id)}
    />
  ),

  // team (additional)
  "role-selector": () => (
    <div className="flex flex-col gap-3 p-4">
      <p className="text-sm font-medium">Select a role</p>
      <RoleSelector
        value="member"
        onChange={(role: string) => console.log("role changed to", role)}
      />
    </div>
  ),
  "team-invite-form": () => (
    <InviteForm
      onSubmit={({ email, role }: { email: string; role: string }) => console.log("invite", email, role)}
      onCancel={() => console.log("cancel")}
    />
  ),
  "workspace-switcher": () => (
    <div className="flex justify-center p-4">
      <WorkspaceSwitcher
        workspaces={[
          { id: "1", name: "Acme Corp", slug: "acme", role: "owner" },
          { id: "2", name: "Personal", slug: "personal", role: "owner" },
          { id: "3", name: "Globex", slug: "globex", role: "member" },
        ]}
        currentId="1"
        onChange={(ws: { id: string; name: string }) => console.log("switched to", ws.name)}
        onCreate={() => console.log("create workspace")}
      />
    </div>
  ),

  // additional billing
  "subscription-usage-meter": () => (
    <TooltipProvider>
      <SubscriptionUsageMeter
        planName="Pro"
        metrics={[
          { id: "storage", label: "Storage", used: 32, limit: 100, unit: "GB", warningThreshold: 80 },
          { id: "api_calls", label: "API Calls", used: 75000, limit: 100000, unit: "calls", warningThreshold: 75 },
          { id: "members", label: "Team Members", used: 8, limit: 15 },
        ]}
      />
    </TooltipProvider>
  ),
  "quota-usage-bar": () => (
    <QuotaUsageBar
      title="Storage Quota"
      description="Your current storage usage by type."
      quotas={[
        { id: "files", name: "Files", used: 3.2, limit: 10, unit: "GB" },
        { id: "media", name: "Media", used: 1.8, limit: 5, unit: "GB" },
        { id: "backups", name: "Backups", used: 0.5, limit: 2, unit: "GB" },
      ]}
      onUpgrade={() => console.log("upgrade")}
    />
  ),
  "billing-history": () => (
    <BillingHistory
      invoices={[
        { id: "INV-001", number: "INV-001", date: "2024-01-01", amount: "2900", status: "paid" as const },
        { id: "INV-002", number: "INV-002", date: "2024-02-01", amount: "2900", status: "paid" as const },
        { id: "INV-003", number: "INV-003", date: "2024-03-01", amount: "2900", status: "pending" as const },
      ]}
      onDownload={(invoice: { id: string }) => console.log("download", invoice.id)}
    />
  ),

  // dashboard (batch-1)
  "status-page-dashboard": () => (
    <StatusPageDashboard
      title="System Status"
      organizationName="LaunchApp"
      overallStatus="operational"
      lastChecked="2024-01-15T10:00:00Z"
      components={[
        { id: "api", name: "API", status: "operational" as const, description: "REST and GraphQL APIs" },
        { id: "web", name: "Web App", status: "operational" as const, description: "Main web application" },
        { id: "db", name: "Database", status: "degraded" as const, description: "Primary database cluster" },
        { id: "cdn", name: "CDN", status: "operational" as const, description: "Content delivery network" },
      ]}
      incidents={[
        {
          id: "inc-1",
          title: "Database latency spike",
          status: "monitoring" as const,
          severity: "medium" as const,
          createdAt: "2024-01-15T08:00:00Z",
          updatedAt: "2024-01-15T09:30:00Z",
          affectedComponents: ["db"],
        },
      ]}
    />
  ),

  // settings (batch-1)
  "data-export-panel": () => (
    <DataExportPanel
      title="Export Your Data"
      description="Download a copy of your data in various formats."
      history={[
        { id: "1", format: "json" as const, scope: "all" as const, status: "ready" as const, requestedAt: "2024-01-01T10:00:00Z", completedAt: "2024-01-01T10:02:00Z", downloadUrl: "#", sizeBytes: 1024000 },
        { id: "2", format: "csv" as const, scope: "account" as const, status: "ready" as const, requestedAt: "2024-01-05T14:00:00Z", completedAt: "2024-01-05T14:01:30Z", downloadUrl: "#", sizeBytes: 204800 },
      ]}
      onRequestExport={(format, scope) => console.log("export", format, scope)}
      onDownload={(item) => console.log("download", item.id)}
    />
  ),

  // data (batch-1)
  "checkout-funnel": () => {
    const CF = CheckoutFunnel as React.ComponentType<{ steps: { id: string; label: string; count: number }[]; showDropoff?: boolean; showValues?: boolean }>;
    return (
      <CF
        steps={[
          { id: "visitors", label: "Visitors", count: 10000 },
          { id: "signups", label: "Sign Ups", count: 4200 },
          { id: "trial", label: "Trial Started", count: 1800 },
          { id: "paid", label: "Paid", count: 620 },
        ]}
        showDropoff
        showValues
      />
    );
  },
  "data-export-wizard": () => (
    <DataExportWizard
      title="Export Data"
      availableDataTypes={[
        { id: "users", label: "Users", count: 1250 },
        { id: "orders", label: "Orders", count: 8430 },
        { id: "products", label: "Products", count: 340 },
      ]}
      availableFields={[
        { id: "name", label: "Name", category: "User" },
        { id: "email", label: "Email", category: "User" },
        { id: "created_at", label: "Created At", category: "User" },
        { id: "order_id", label: "Order ID", category: "Order" },
        { id: "total", label: "Total", category: "Order" },
      ]}
      onExport={(options) => console.log("export", options)}
    />
  ),

  // ecommerce (batch-1)
  "reviews-list": () => {
    const RL = ReviewsList as React.ComponentType<{ reviews: { id: string; author: string; rating: number; title?: string; content: string; date: string; verified?: boolean; helpful?: number }[]; overallRating?: number; totalCount?: number; ratingDistribution?: Record<number, number>; showDistribution?: boolean; showHelpful?: boolean; showVerified?: boolean; onHelpful?: (r: { id: string }) => void; onReport?: (r: { id: string }) => void }>;
    return (
      <RL
        overallRating={4.3}
        totalCount={128}
        showDistribution
        showHelpful
        showVerified
        ratingDistribution={{ 5: 68, 4: 32, 3: 14, 2: 8, 1: 6 }}
        reviews={[
          { id: "1", author: "Alice Johnson", rating: 5, title: "Excellent product!", content: "Exactly what I was looking for. Great quality and fast shipping.", date: "2024-01-15", verified: true, helpful: 12 },
          { id: "2", author: "Bob Smith", rating: 4, title: "Good but could be better", content: "Overall satisfied with the purchase. Minor issue with packaging.", date: "2024-01-10", verified: true, helpful: 7 },
          { id: "3", author: "Carol White", rating: 3, title: "Average", content: "Meets expectations but nothing special.", date: "2024-01-05", verified: false, helpful: 2 },
        ]}
        onHelpful={(review) => console.log("helpful", review.id)}
        onReport={(review) => console.log("report", review.id)}
      />
    );
  },
  "wishlist-grid": () => {
    const WG = WishlistGrid as React.ComponentType<{ items: { id: string; name: string; price: number; originalPrice?: number }[]; columns?: number; onRemove?: (item: { id: string }) => void; onAddToCart?: (item: { id: string }) => void }>;
    return (
      <WG
        columns={3}
        items={[
          { id: "1", name: "Wireless Headphones", price: 99.99, originalPrice: 149.99 },
          { id: "2", name: "Smart Watch", price: 299.99 },
          { id: "3", name: "Bluetooth Speaker", price: 59.99 },
          { id: "4", name: "Laptop Stand", price: 39.99 },
        ]}
        onRemove={(item) => console.log("remove", item.id)}
        onAddToCart={(item) => console.log("add to cart", item.id)}
      />
    );
  },

  // integrations (batch-1)
  "integration-card-grid": () => (
    <IntegrationCardGrid
      title="Integrations"
      description="Connect your favorite tools and services."
      searchable
      integrations={[
        { id: "github", name: "GitHub", description: "Sync repositories and pull requests.", category: "other" as const, status: "connected" as const },
        { id: "slack", name: "Slack", description: "Send notifications to Slack channels.", category: "communication" as const, status: "disconnected" as const },
        { id: "stripe", name: "Stripe", description: "Process payments and subscriptions.", category: "payments" as const, status: "connected" as const },
        { id: "hubspot", name: "HubSpot", description: "Sync leads and customer data.", category: "crm" as const, status: "disconnected" as const },
        { id: "google-analytics", name: "Google Analytics", description: "Track user behavior.", category: "analytics" as const, status: "disconnected" as const },
        { id: "zapier", name: "Zapier", description: "Automate workflows between apps.", category: "other" as const, status: "disconnected" as const },
      ]}
      onConnect={(integration) => console.log("connect", integration.id)}
      onDisconnect={(integration) => console.log("disconnect", integration.id)}
      onConfigure={(integration) => console.log("configure", integration.id)}
    />
  ),
  "integration-marketplace": () => (
    <IntegrationMarketplace
      title="Integration Marketplace"
      description="Discover and install integrations to extend your workflow."
      showSearch
      showCategories
      integrations={[
        { id: "github", name: "GitHub", description: "Version control and collaboration.", category: "developer" as const, status: "installed" as const, version: "2.1.0", isEnabled: true },
        { id: "slack", name: "Slack", description: "Team messaging and notifications.", category: "communication" as const, status: "not_installed" as const, version: "1.3.0", isEnabled: false },
        { id: "stripe", name: "Stripe", description: "Payment processing platform.", category: "payment" as const, status: "installed" as const, version: "3.0.1", isEnabled: true },
        { id: "zapier", name: "Zapier", description: "Workflow automation tool.", category: "developer" as const, status: "not_installed" as const, version: "1.0.0", isEnabled: false },
      ]}
      onInstall={(integration) => console.log("install", integration.id)}
      onConfigure={(integration) => console.log("configure", integration.id)}
      onUninstall={(integration) => console.log("uninstall", integration.id)}
      onToggle={(integration, enabled) => console.log("toggle", integration.id, enabled)}
    />
  ),

  // team (batch-1)
  "team-member-grid": () => (
    <TeamMemberGrid
      title="Team Members"
      description="Manage your team and their permissions."
      columns={2}
      showInviteButton
      members={[
        { id: "1", name: "Alice Johnson", email: "alice@example.com", role: "owner" as const, status: "active" as const, joinedAt: "2023-01-01" },
        { id: "2", name: "Bob Smith", email: "bob@example.com", role: "admin" as const, status: "active" as const, joinedAt: "2023-02-01" },
        { id: "3", name: "Carol White", email: "carol@example.com", role: "member" as const, status: "active" as const, joinedAt: "2023-03-01" },
        { id: "4", name: "Dave Brown", email: "dave@example.com", role: "member" as const, status: "pending" as const, joinedAt: "2024-01-01" },
      ]}
      currentUserId="1"
      onRemove={(member) => console.log("remove", member.id)}
      onChangeRole={(member, role) => console.log("change role", member.id, role)}
      onInvite={() => console.log("invite")}
    />
  ),
  "team-roster": () => {
    const TR = TeamRoster as React.ComponentType<{ members: { id: string; name: string; email: string; role: string; title?: string; department?: string; availability?: string; skills?: string[] }[]; view?: "grid" | "list"; showSkills?: boolean; showContact?: boolean; showDepartment?: boolean; onMemberClick?: (m: { id: string }) => void; onMessage?: (m: { id: string }) => void }>;
    return (
      <TR
        view="grid"
        showSkills
        showContact
        showDepartment
        members={[
          { id: "1", name: "Alice Johnson", email: "alice@example.com", role: "member", title: "Engineering Lead", department: "Engineering", availability: "available", skills: ["React", "TypeScript", "Node.js"] },
          { id: "2", name: "Bob Smith", email: "bob@example.com", role: "member", title: "Senior Designer", department: "Design", availability: "busy", skills: ["Figma", "UX Research", "Tailwind"] },
          { id: "3", name: "Carol White", email: "carol@example.com", role: "member", title: "Product Manager", department: "Product", availability: "away", skills: ["Roadmapping", "Scrum", "Analytics"] },
        ]}
        onMemberClick={(member) => console.log("click", member.id)}
        onMessage={(member) => console.log("message", member.id)}
      />
    );
  },

  // notifications (batch-1)
  "feedback-widget": () => (
    <FeedbackWidget
      variant="inline"
      title="How are we doing?"
      placeholder="Share your thoughts..."
      showEmail
      categories={["bug", "feature", "ui", "performance", "other"]}
      onSubmit={(feedback) => console.log("feedback submitted", feedback)}
    />
  ),

  // activity
  "activity-stream": () => (
    <ActivityStream
      title="Recent Activity"
      showLoadMore
      events={[
        { id: "1", actor: { name: "Alice Johnson", initials: "AJ" }, action: "created", target: "Q3 Roadmap", timestamp: "2 min ago", type: "create" },
        { id: "2", actor: { name: "Bob Smith", initials: "BS" }, action: "commented on", target: "Design Review", timestamp: "15 min ago", type: "comment" },
        { id: "3", actor: { name: "Carol White", initials: "CW" }, action: "published", target: "API Documentation", timestamp: "1 hour ago", type: "publish" },
        { id: "4", actor: { name: "Dan Lee", initials: "DL" }, action: "updated", target: "Sprint Goals", timestamp: "3 hours ago", type: "update" },
        { id: "5", actor: { name: "Eve Chen", initials: "EC" }, action: "shared", target: "Analytics Report", timestamp: "Yesterday", type: "share" },
      ]}
    />
  ),

  "activity-audit-log-viewer": () => (
    <ActivityAuditLogViewer
      title="Audit Log"
      logs={[
        { id: "1", timestamp: "2025-01-15T10:23:00Z", action: "user.login", actor: "Alice Johnson", actorEmail: "alice@example.com", resource: "auth", level: "info", severity: "low", description: "User signed in successfully." },
        { id: "2", timestamp: "2025-01-15T10:45:00Z", action: "api_key.created", actor: "Bob Smith", actorEmail: "bob@example.com", resource: "api_keys", resourceId: "key_abc123", level: "info", severity: "medium", description: "New API key created with read/write scope." },
        { id: "3", timestamp: "2025-01-15T11:00:00Z", action: "user.deleted", actor: "Carol White", actorEmail: "carol@example.com", resource: "users", resourceId: "usr_xyz", level: "warning", severity: "high", description: "User account deleted by admin." },
        { id: "4", timestamp: "2025-01-15T11:30:00Z", action: "billing.payment_failed", actor: "system", resource: "billing", level: "error", severity: "critical", description: "Payment processing failed for subscription renewal." },
        { id: "5", timestamp: "2025-01-15T12:00:00Z", action: "settings.updated", actor: "Dan Lee", actorEmail: "dan@example.com", resource: "settings", level: "success", severity: "low", description: "Security settings updated." },
      ]}
      onExport={() => console.log("export")}
    />
  ),

  // admin (batch-2)
  "feature-flag-panel": () => {
    const FFP = FeatureFlagPanel as unknown as React.ComponentType<any>;
    return (
      <FFP
        flags={[
          { id: "1", key: "new-dashboard", name: "new-dashboard", description: "Redesigned dashboard UI", environments: { development: true, staging: true, production: false }, createdAt: "2024-01-01", updatedAt: "2024-01-10" },
          { id: "2", key: "ai-suggestions", name: "ai-suggestions", description: "AI-powered content suggestions", environments: { development: true, staging: false, production: false }, createdAt: "2024-01-05", updatedAt: "2024-01-05" },
          { id: "3", key: "advanced-export", name: "advanced-export", description: "Export data to multiple formats", environments: { development: true, staging: true, production: true }, createdAt: "2023-12-15", updatedAt: "2024-01-12" },
        ]}
        onToggle={(flag: { id: string }, env: string, enabled: boolean) => console.log("toggle", flag.id, env, enabled)}
      />
    );
  },

  "status-page": () => {
    const SP = StatusPage as React.ComponentType<{ services: { id: string; name: string; status: "operational" | "degraded" | "outage" | "maintenance"; uptime?: number; latency?: number; description?: string }[]; overallStatus?: "operational" | "degraded" | "outage" | "maintenance"; title?: string }>;
    return (
      <SP
        title="System Status"
        overallStatus="operational"
        services={[
          { id: "1", name: "API Gateway", status: "operational", uptime: 99.98, latency: 42 },
          { id: "2", name: "Web App", status: "operational", uptime: 99.95, latency: 120 },
          { id: "3", name: "Database", status: "degraded", uptime: 99.5, latency: 85, description: "Elevated query times" },
          { id: "4", name: "Email Service", status: "operational", uptime: 100, latency: 250 },
        ]}
      />
    );
  },

  // data (batch-2)
  "calendar-widget": () => {
    const CW = CalendarWidget as React.ComponentType<{ events?: { id: string; title: string; date: Date; color?: string; allDay?: boolean }[]; onDateSelect?: (date: Date) => void }>;
    return (
      <CW
        events={[
          { id: "1", title: "Team Standup", date: new Date(), color: "#6366f1" },
          { id: "2", title: "Product Review", date: new Date(Date.now() + 86400000 * 2), color: "#f59e0b" },
          { id: "3", title: "Sprint Planning", date: new Date(Date.now() + 86400000 * 5), color: "#10b981" },
        ]}
        onDateSelect={(date) => console.log("selected", date)}
      />
    );
  },

  "project-board": () => (
    <ProjectBoard
      initialColumns={[
        { id: "planning", title: "To Do", status: "planning", tasks: [
          { id: "1", title: "Design onboarding flow", priority: "high", tags: ["design"] },
          { id: "2", title: "Write API docs", priority: "medium", tags: ["docs"] },
        ]},
        { id: "in-progress", title: "In Progress", status: "in-progress", tasks: [
          { id: "3", title: "Implement auth", priority: "high", assignee: { name: "Bob Smith" }, tags: ["auth"] },
        ]},
        { id: "review", title: "Review", status: "review", tasks: [] },
        { id: "completed", title: "Done", status: "completed", tasks: [
          { id: "4", title: "Setup CI/CD", priority: "medium", assignee: { name: "Carol White" } },
        ]},
      ]}
    />
  ),

  // files (batch-2)
  "file-manager": () => {
    const FM = FileManager as React.ComponentType<{ files: { id: string; name: string; size: number; type: string; mimeType?: string; modifiedAt: string; thumbnail?: string }[]; folders?: { id: string; name: string; itemCount?: number }[]; onFileOpen?: (f: { id: string }) => void; onFileDownload?: (f: { id: string }) => void }>;
    return (
      <FM
        folders={[
          { id: "f1", name: "Documents", itemCount: 12 },
          { id: "f2", name: "Images", itemCount: 34 },
          { id: "f3", name: "Reports", itemCount: 8 },
        ]}
        files={[
          { id: "1", name: "Q3 Report.pdf", size: 2400000, type: "pdf", mimeType: "application/pdf", modifiedAt: "2024-01-15" },
          { id: "2", name: "Logo.svg", size: 45000, type: "svg", mimeType: "image/svg+xml", modifiedAt: "2024-01-10" },
          { id: "3", name: "Budget 2024.xlsx", size: 890000, type: "xlsx", mimeType: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", modifiedAt: "2024-01-08" },
          { id: "4", name: "Presentation.pptx", size: 5200000, type: "pptx", mimeType: "application/vnd.ms-powerpoint", modifiedAt: "2024-01-05" },
        ]}
        onFileOpen={(f) => console.log("open", f.id)}
        onFileDownload={(f) => console.log("download", f.id)}
      />
    );
  },

  // forms (batch-2)
  "support-ticket-form": () => (
    <SupportTicketForm
      onSubmit={(data) => console.log("ticket submitted", data)}
      categories={[
        { value: "bug", label: "Bug Report" },
        { value: "feature", label: "Feature Request" },
        { value: "account", label: "Account Issue" },
        { value: "billing", label: "Billing" },
        { value: "general", label: "General" },
      ]}
    />
  ),

  // inbox
  "inbox-manager": () => {
    const IM = InboxManager as unknown as React.ComponentType<any>;
    return (
      <IM
        folders={[
          { id: "inbox", label: "Inbox", count: 3 },
          { id: "starred", label: "Starred", count: 1 },
          { id: "sent", label: "Sent" },
          { id: "trash", label: "Trash" },
        ]}
        messages={[
          { id: "1", subject: "Welcome to LaunchApp!", sender: { name: "LaunchApp Team", initials: "LT" }, preview: "Thanks for signing up. Here's how to get started...", timestamp: "10:30 AM", read: false, starred: true },
          { id: "2", subject: "Your invoice is ready", sender: { name: "Billing", initials: "BI" }, preview: "Your invoice for January 2024 is now available...", timestamp: "Yesterday", read: true },
          { id: "3", subject: "New team member joined", sender: { name: "Alice Johnson", initials: "AJ" }, preview: "Bob Smith has accepted your invitation and joined...", timestamp: "Mon", read: true },
        ]}
        onMessageSelect={(m: { id: string }) => console.log("selected", m.id)}
      />
    );
  },

  // integrations (batch-2)
  "webhooks-list": () => (
    <WebhooksList
      webhooks={[
        { id: "1", name: "Production Webhook", url: "https://api.example.com/webhooks/prod", status: "active", events: ["user.created", "payment.succeeded"], createdAt: "2024-01-01", lastTriggeredAt: "2024-01-15", successRate: 98 },
        { id: "2", name: "Staging Webhook", url: "https://staging.example.com/webhooks", status: "inactive", events: ["user.updated", "subscription.changed"], createdAt: "2024-01-05", successRate: 75 },
        { id: "3", name: "Analytics Sink", url: "https://ingest.analytics.io/hook", status: "failing", events: ["page.viewed", "button.clicked"], createdAt: "2023-12-15", lastTriggeredAt: "2024-01-14", successRate: 42 },
      ]}
      onAdd={(data) => console.log("add", data)}
      onToggle={(w) => console.log("toggle", w.id)}
      onDelete={(w) => console.log("delete", w.id)}
    />
  ),

  // landing (batch-2)
  "hero-browser-frame": () => {
    const HBF = HeroBrowserFrame as React.ComponentType<{ url?: string; stats?: { label: string; value: string }[]; tableRows?: { name: string; status: string; value: string }[] }>;
    return (
      <HBF
        url="app.launchapp.dev/dashboard"
        stats={[
          { label: "MRR", value: "$24,500" },
          { label: "Users", value: "1,234" },
          { label: "Uptime", value: "99.9%" },
        ]}
        tableRows={[
          { name: "Stripe Integration", status: "Active", value: "$12,400" },
          { name: "Polar.sh", status: "Active", value: "$8,200" },
          { name: "Lemon Squeezy", status: "Pending", value: "$3,900" },
        ]}
      />
    );
  },

  // marketing (batch-2)
  "changelog-feed": () => {
    const CF = ChangelogFeed as React.ComponentType<{ entries: { id: string; version?: string; date: string; title: string; description?: string; type?: "feature" | "fix" | "improvement" | "breaking"; tags?: string[] }[]; title?: string; showFilters?: boolean; showSearch?: boolean }>;
    return (
      <CF
        title="Changelog"
        showFilters
        showSearch
        entries={[
          { id: "1", version: "v2.4.0", date: "2024-01-15", title: "AI-powered suggestions", description: "Introduced AI suggestions across the dashboard to help you make better decisions faster.", type: "feature", tags: ["AI", "Dashboard"] },
          { id: "2", version: "v2.3.2", date: "2024-01-08", title: "Fix export CSV encoding", description: "Fixed an issue where special characters in exports caused garbled output.", type: "fix", tags: ["Export"] },
          { id: "3", version: "v2.3.0", date: "2024-01-01", title: "Improved dark mode support", description: "Overhauled theming for better dark mode consistency across all pages.", type: "improvement", tags: ["UI", "Theme"] },
        ]}
      />
    );
  },

  // metrics
  "metrics-dashboard": () => (
    <MetricsDashboard
      title="Key Metrics"
      columns={3}
      showChange
      metrics={[
        { id: "mrr", label: "MRR", value: "$24,500", change: "+12%", changeType: "up" },
        { id: "users", label: "Active Users", value: "1,234", change: "+8%", changeType: "up" },
        { id: "churn", label: "Churn Rate", value: "2.1%", change: "-0.3%", changeType: "down" },
        { id: "arr", label: "ARR", value: "$294,000", change: "+15%", changeType: "up" },
        { id: "nps", label: "NPS Score", value: "72", change: "+4", changeType: "up" },
        { id: "tickets", label: "Open Tickets", value: "18", change: "+3", changeType: "neutral" },
      ]}
    />
  ),

  // onboarding (batch-2)
  "onboarding-flow": () => (
    <OnboardingFlow
      showProgress
      allowSkip
      steps={[
        { id: "welcome", title: "Welcome", description: "Let's get you set up in just a few steps.", content: <div className="py-4 text-sm text-muted-foreground">Welcome to LaunchApp! We'll guide you through setup.</div> },
        { id: "profile", title: "Your Profile", description: "Tell us a bit about yourself.", content: <div className="py-4 text-sm text-muted-foreground">Profile setup goes here.</div> },
        { id: "workspace", title: "Workspace", description: "Configure your workspace settings.", content: <div className="py-4 text-sm text-muted-foreground">Workspace configuration goes here.</div> },
        { id: "done", title: "All Set!", description: "You're ready to go.", content: <div className="py-4 text-sm text-muted-foreground">Everything is configured. Let's launch!</div> },
      ]}
      onComplete={() => console.log("onboarding complete")}
    />
  ),

  // profile
  "user-profile-header": () => (
    <UserProfileHeader
      user={{
        name: "Alice Johnson",
        username: "alice_j",
        role: "Engineering Lead",
        bio: "Building great products at the intersection of design and engineering. Open source enthusiast.",
        location: "San Francisco, CA",
        website: "alicejohnson.dev",
        joinedDate: "January 2022",
        isVerified: true,
        initials: "AJ",
      }}
      stats={[
        { label: "Projects", value: 24 },
        { label: "Followers", value: "1.2k" },
        { label: "Following", value: 89 },
      ]}
      actions={[
        { label: "Follow", onClick: () => console.log("follow"), variant: "default" },
        { label: "Message", onClick: () => console.log("message"), variant: "outline" },
      ]}
      onFollow={() => console.log("follow")}
    />
  ),

  "profile-card": () => (
    <ProfileCard
      name="Alice Johnson"
      role="Senior Frontend Engineer"
      email="alice@example.com"
      bio="Passionate about building accessible, beautiful user interfaces. Open source contributor and design systems enthusiast."
      location="San Francisco, CA"
      website="https://alice.dev"
      tags={["React", "TypeScript", "Design Systems", "a11y"]}
      socialLinks={[
        { platform: "twitter", url: "https://twitter.com/alice", label: "Twitter" },
        { platform: "github", url: "https://github.com/alice", label: "GitHub" },
        { platform: "linkedin", url: "https://linkedin.com/in/alice", label: "LinkedIn" },
      ]}
      onMessage={() => console.log("message")}
      onEdit={() => console.log("edit")}
    />
  ),

  // project
  "project-kanban": () => {
    const PK = ProjectKanban as React.ComponentType<{ columns: { id: string; title: string; color?: string; cards: { id: string; title: string; description?: string; priority?: "low" | "medium" | "high" | "urgent"; labels?: string[]; assignees?: { name: string; avatar?: string; initials?: string }[]; dueDate?: string; commentCount?: number }[] }[]; onCardClick?: (card: { id: string }) => void; onAddCard?: (columnId: string) => void }>;
    return (
      <PK
        columns={[
          { id: "backlog", title: "Backlog", color: "#94a3b8", cards: [
            { id: "c1", title: "Update dependencies", priority: "low", labels: ["maintenance"] },
            { id: "c2", title: "Write unit tests", priority: "medium", labels: ["testing"] },
          ]},
          { id: "in-progress", title: "In Progress", color: "#f59e0b", cards: [
            { id: "c3", title: "Implement OAuth flow", priority: "high", labels: ["auth"], assignees: [{ name: "Alice", initials: "AJ" }], dueDate: "Jan 20", commentCount: 3 },
          ]},
          { id: "review", title: "Review", color: "#6366f1", cards: [
            { id: "c4", title: "Design system update", priority: "medium", labels: ["design"], assignees: [{ name: "Bob", initials: "BS" }], commentCount: 5 },
          ]},
          { id: "done", title: "Done", color: "#10b981", cards: [
            { id: "c5", title: "Setup CI/CD pipeline", priority: "high", labels: ["devops"], assignees: [{ name: "Carol", initials: "CW" }] },
          ]},
        ]}
        onCardClick={(card) => console.log("card click", card.id)}
        onAddCard={(colId) => console.log("add card to", colId)}
      />
    );
  },

  // team (batch-2)
  "invite-member-dialog": () => (
    <InviteMemberDialog
      open={true}
      onOpenChange={() => {}}
      defaultRole="member"
      onInvite={(data) => console.log("invite", data)}
    />
  ),

  "role-permission-matrix": () => {
    const RPM = RolePermissionMatrix as unknown as React.ComponentType<any>;
    return (
      <RPM
        title="Role Permissions"
        canManage
        roles={[
          { id: "owner", name: "Owner", description: "Full access to all resources", color: "#6366f1", permissions: { Content: ["read", "write", "delete", "admin"], Users: ["read", "write", "admin"], Billing: ["read", "write", "admin"] }, isSystem: true },
          { id: "admin", name: "Admin", description: "Manage settings and members", color: "#f59e0b", permissions: { Content: ["read", "write", "delete"], Users: ["read", "write"], Billing: ["read"] } },
          { id: "member", name: "Member", description: "Standard access", color: "#10b981", permissions: { Content: ["read", "write"], Users: ["read"], Billing: [] } },
          { id: "viewer", name: "Viewer", description: "Read-only access", color: "#94a3b8", permissions: { Content: ["read"], Users: [], Billing: [] } },
        ]}
        permissionCategories={["Content", "Users", "Billing"]}
        permissionMap={{
          owner: ["content.view", "content.create", "content.edit", "content.delete", "users.view", "users.invite", "users.manage", "billing.view", "billing.manage"],
          admin: ["content.view", "content.create", "content.edit", "content.delete", "users.view", "users.invite", "billing.view"],
          member: ["content.view", "content.create", "content.edit", "users.view"],
          viewer: ["content.view", "users.view"],
        }}
        onPermissionChange={(roleId: string, permId: string, granted: boolean) => console.log("permission change", roleId, permId, granted)}
      />
    );
  },

  "role-permissions-matrix": () => {
    const RPM2 = RolePermissionsMatrix as unknown as React.ComponentType<any>;
    return (
      <RPM2
        title="Permissions Overview"
        showDescriptions
        roles={[
          { id: "owner", name: "Owner", color: "#6366f1", permissionCount: 9, categoryBreakdown: { Content: 4, Users: 3, Billing: 2 }, highestPermission: "full" },
          { id: "admin", name: "Admin", color: "#f59e0b", permissionCount: 7, categoryBreakdown: { Content: 4, Users: 2, Billing: 1 }, highestPermission: "full" },
          { id: "member", name: "Member", color: "#10b981", permissionCount: 4, categoryBreakdown: { Content: 3, Users: 1, Billing: 0 }, highestPermission: "limited" },
          { id: "viewer", name: "Viewer", color: "#94a3b8", permissionCount: 2, categoryBreakdown: { Content: 1, Users: 1, Billing: 0 }, highestPermission: "limited" },
        ]}
        permissions={[
          { permissionId: "content.view", label: "View Content", category: "Content", level: "full" },
          { permissionId: "content.create", label: "Create Content", category: "Content", level: "full" },
          { permissionId: "content.edit", label: "Edit Content", category: "Content", level: "limited" },
          { permissionId: "content.delete", label: "Delete Content", category: "Content", level: "none" },
          { permissionId: "users.view", label: "View Users", category: "Users", level: "full" },
          { permissionId: "users.invite", label: "Invite Users", category: "Users", level: "limited" },
          { permissionId: "billing.view", label: "View Billing", category: "Billing", level: "none" },
        ]}
        onExport={(format: string) => console.log("export", format)}
        onRoleClick={(id: string) => console.log("role click", id)}
      />
    );
  },

  // timeline
  "timeline-view": () => (
    <TimelineView
      title="Project Timeline"
      events={[
        { id: "1", date: "Jan 2024", title: "Project Kickoff", description: "Initial planning and team alignment completed.", badge: "Milestone", badgeVariant: "default" },
        { id: "2", date: "Feb 2024", title: "Design Phase", description: "UI/UX designs reviewed and approved.", badge: "Design", badgeVariant: "secondary" },
        { id: "3", date: "Mar 2024", title: "Alpha Release", description: "First internal release shipped to early testers.", badge: "Release", badgeVariant: "outline" },
        { id: "4", date: "Apr 2024", title: "Beta Launch", description: "Public beta opened to 500 users.", badge: "Launch", badgeVariant: "default" },
        { id: "5", date: "May 2024", title: "v1.0 GA", description: "General availability release.", badge: "GA", badgeVariant: "default" },
      ]}
      onEventClick={(e) => console.log("event click", e.id)}
    />
  ),

  // batch-3: registry-aligned keys (aliases + new previews)
  "activity-timeline": () => (
    <ActivityTimeline
      items={[
        { id: "1", title: "Project created", description: "You created 'LaunchApp v2'", timestamp: "2024-01-01T10:00:00Z" },
        { id: "2", title: "Member added", description: "Alice joined the team", timestamp: "2024-01-02T09:00:00Z" },
        { id: "3", title: "PR merged", description: "feat(docs): update component library", timestamp: "2024-01-03T14:30:00Z" },
      ]}
      title="Recent Activity"
    />
  ),
  "agency": () => (
    <Agency
      badge="Award-winning studio"
      headline="We craft digital experiences that convert"
      subheadline="Strategy, design, and engineering for forward-thinking brands."
      primaryAction={<button type="button" className="rounded-md bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground">Start a project</button>}
      services={[
        { title: "Strategy", description: "Brand positioning and go-to-market planning.", icon: <span>📊</span> },
        { title: "Design", description: "UI/UX design systems and prototyping.", icon: <span>🎨</span> },
        { title: "Engineering", description: "Full-stack development and DevOps.", icon: <span>⚙️</span> },
      ]}
    />
  ),
  "command-palette": () => {
    const CommandPaletteDemo2 = () => {
      const [open, setOpen] = React.useState(true);
      return (
        <div className="h-[340px] overflow-hidden rounded-lg border flex flex-col items-center justify-center gap-4 p-6">
          <button
            onClick={() => setOpen(true)}
            className="inline-flex items-center gap-2 rounded-md border px-4 py-2 text-sm font-medium hover:bg-accent transition-colors"
          >
            Open Command Palette
            <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] opacity-100">
              <span className="text-xs">⌘</span>K
            </kbd>
          </button>
          <CommandPalette
            open={open}
            onOpenChange={setOpen}
            actions={[
              { id: "dashboard", label: "Dashboard", group: "pages", onSelect: () => console.log("navigate to dashboard") },
              { id: "settings", label: "Settings", group: "pages", onSelect: () => console.log("navigate to settings") },
              { id: "analytics", label: "Analytics", group: "pages", onSelect: () => console.log("navigate to analytics") },
            ]}
            groups={[{ id: "pages", label: "Pages" }]}
          />
        </div>
      );
    };
    return <CommandPaletteDemo2 />;
  },
  "comparison-table": () => {
    const CT = ComparisonTable as unknown as React.ComponentType<{ products: { id: string; name: string; price?: number; currency?: string; badge?: string; rating?: number; pros?: string[]; cons?: string[] }[]; attributes: { key: string; label: string; render?: (p: { id: string; name: string; price?: number; rating?: number; pros?: string[] }) => React.ReactNode }[]; selectedIds?: string[]; onAddToCart?: (p: { id: string }) => void; onRemove?: (p: { id: string }) => void }>;
    return (
      <CT
        selectedIds={["1", "2"]}
        products={[
          { id: "1", name: "Starter Plan", price: 9, currency: "USD", badge: "Popular", rating: 4.2, pros: ["5 projects", "10 GB storage", "Community support"], cons: ["No SSO", "Limited API access"] },
          { id: "2", name: "Pro Plan", price: 29, currency: "USD", badge: "Best Value", rating: 4.8, pros: ["Unlimited projects", "100 GB storage", "Priority support", "Analytics"], cons: ["No dedicated support"] },
          { id: "3", name: "Enterprise", price: 99, currency: "USD", rating: 5, pros: ["Everything in Pro", "SSO", "Dedicated support", "SLA"], cons: [] },
        ]}
        attributes={[
          { key: "price", label: "Price/mo", render: (p) => <span className="font-semibold">${p.price}</span> },
          { key: "rating", label: "Rating", render: (p) => <span>{p.rating} / 5</span> },
          { key: "pros", label: "Highlights", render: (p) => <span>{(p.pros ?? []).slice(0, 2).join(", ")}</span> },
        ]}
        onAddToCart={(p) => console.log("select", p.id)}
        onRemove={(p) => console.log("remove", p.id)}
      />
    );
  },
  "cookie-preferences": () => (
    <CookiePreferences onSave={(prefs: Record<string, boolean>) => console.log("save prefs", prefs)} />
  ),
  "cta-section": () => (
    <CTASection
      variant="default"
      background="primary"
      headline="Ready to ship faster?"
      subtext="Join thousands of developers building with LaunchApp."
      primaryAction={<button type="button" className="rounded-md bg-white px-6 py-2.5 text-sm font-semibold text-primary">Get started free</button>}
      secondaryAction={<button type="button" className="rounded-md border border-white/30 px-6 py-2.5 text-sm font-medium text-white">View docs</button>}
      align="center"
    />
  ),
  "faq-section": () => (
    <FAQSection
      variant="default"
      eyebrow="FAQ"
      headline="Frequently asked questions"
      items={[
        { question: "How do I get started?", answer: "Sign up for free and follow the quickstart guide in our documentation." },
        { question: "Is there a free plan?", answer: "Yes, we have a generous free tier with 5 projects and 10 GB storage." },
        { question: "Can I cancel anytime?", answer: "Absolutely. Cancel your subscription at any time with no questions asked." },
        { question: "Do you offer team pricing?", answer: "Yes, our Pro and Enterprise plans support unlimited team members." },
      ]}
    />
  ),
  "feature-grid-block": () => (
    <FeatureGridBlock
      variant="default"
      cols="3"
      eyebrow="Features"
      headline="Everything you need to ship"
      subheadline="Production-ready UI components built for modern applications."
      features={[
        { title: "Accessible", description: "Built on Radix UI primitives for full keyboard and screen reader support.", icon: <span aria-hidden className="text-2xl">♿</span> },
        { title: "Customizable", description: "CSS custom properties and Tailwind for effortless theming.", icon: <span aria-hidden className="text-2xl">🎨</span> },
        { title: "TypeScript", description: "Fully typed APIs with IntelliSense for a great DX.", icon: <span aria-hidden className="text-2xl">📘</span> },
        { title: "Dark Mode", description: "First-class dark mode support out of the box.", icon: <span aria-hidden className="text-2xl">🌙</span> },
        { title: "Production Ready", description: "Battle-tested components shipped in production apps.", icon: <span aria-hidden className="text-2xl">🚀</span> },
        { title: "Open Source", description: "MIT licensed and open for contributions.", icon: <span aria-hidden className="text-2xl">🔓</span> },
      ]}
    />
  ),
  "invite-form": () => (
    <InviteForm
      onSubmit={({ email, role }: { email: string; role: string }) => console.log("invite", email, role)}
      onCancel={() => console.log("cancel")}
    />
  ),
  "maintenance": () => (
    <Maintenance
      title="We'll be back soon"
      description="We're performing scheduled maintenance. This should only take a few minutes."
      estimatedTime="30 minutes"
      updates={[
        { label: "Database migration", status: "done" as const },
        { label: "Service restart", status: "in-progress" as const },
        { label: "Cache warm-up", status: "pending" as const },
      ]}
    />
  ),
  "multi-panel-layout": () => (
    <div className="h-[420px] overflow-hidden rounded-lg border">
      <MultiPanelLayout
        leftPanel={<div className="p-4 h-full bg-muted/30 text-sm text-muted-foreground">Left Panel</div>}
        centerPanel={<div className="p-4 h-full text-sm text-muted-foreground">Center Panel</div>}
        rightPanel={<div className="p-4 h-full bg-muted/20 text-sm text-muted-foreground">Right Panel</div>}
      />
    </div>
  ),
  "multi-step-wizard": () => (
    <MultiStepWizard
      steps={[
        { id: "basics", title: "Basic Info", description: "Tell us about yourself.", content: <div className="p-4 text-sm text-muted-foreground">Name and email form goes here</div> },
        { id: "plan", title: "Choose Plan", description: "Select the right plan for you.", content: <div className="p-4 text-sm text-muted-foreground">Plan selection goes here</div> },
        { id: "payment", title: "Payment", description: "Enter payment details.", content: <div className="p-4 text-sm text-muted-foreground">Payment form goes here</div> },
      ]}
      onComplete={() => console.log("wizard complete")}
    />
  ),
  "not-found": () => (
    <NotFound
      homeAction={<button type="button" className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground">Go home</button>}
      backAction={<button type="button" className="rounded-md border px-4 py-2 text-sm font-medium">Go back</button>}
    />
  ),
  "notification-bell": () => (
    <div className="flex justify-center p-4">
      <NotificationBell
        notifications={[
          { id: "1", title: "New comment", timestamp: "5m ago", read: false, description: "Alice commented on your post." },
          { id: "2", title: "Payment received", timestamp: "1h ago", read: false, description: "$49 payment processed." },
          { id: "3", title: "Team invite", timestamp: "2h ago", read: true, description: "Bob joined your workspace." },
        ]}
        onRead={(id: string) => console.log("read", id)}
        onReadAll={() => console.log("read all")}
        badgeCount={2}
      />
    </div>
  ),
  "portfolio": () => (
    <Portfolio
      name="Alice Johnson"
      title="Full-Stack Engineer & Designer"
      bio={<p>I build beautiful, performant web applications with a focus on user experience and accessibility.</p>}
      projects={[
        { title: "LaunchApp", description: "A complete SaaS design system.", tags: ["React", "TypeScript"], link: "#" },
        { title: "DataViz", description: "Real-time analytics dashboard.", tags: ["Next.js", "D3.js"], link: "#" },
        { title: "Commerce", description: "E-commerce platform with AR.", tags: ["Remix", "Three.js"], link: "#" },
      ]}
    />
  ),
  "pricing-section-block": () => (
    <PricingSectionBlock
      headline="Choose your plan"
      subheadline="Scale as your team grows."
      tiers={[
        { name: "Free", monthlyPrice: "0", annualPrice: "0", description: "Perfect for individuals.", features: ["5 projects", "10 GB storage", "Community support"], ctaLabel: "Get started" },
        { name: "Pro", monthlyPrice: "29", annualPrice: "290", description: "Best for growing teams.", features: ["Unlimited projects", "100 GB storage", "Priority support", "Analytics"], ctaLabel: "Start free trial", popular: true },
        { name: "Enterprise", monthlyPrice: "99", annualPrice: "990", description: "For large organizations.", features: ["Everything in Pro", "SSO", "Dedicated support", "SLA"], ctaLabel: "Contact sales" },
      ]}
    />
  ),
  "pricing-table-block": () => (
    <PricingTableBlock
      headline="Simple, transparent pricing"
      subheadline="No hidden fees. Cancel anytime."
    />
  ),
  "saas-landing": () => (
    <SaaSLanding
      badge="New — v2.0 released"
      headline="Build faster with LaunchApp"
      subheadline="A complete design system built on Radix UI and Tailwind CSS."
      primaryAction={<button type="button" className="rounded-md bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground">Get started</button>}
      secondaryAction={<button type="button" className="rounded-md border px-6 py-2.5 text-sm font-medium">View docs</button>}
      featuresTitle="Everything you need"
      features={[
        { title: "Fast", description: "Optimized for performance.", icon: <span>⚡</span> },
        { title: "Secure", description: "Enterprise-grade security.", icon: <span>🔒</span> },
        { title: "Scalable", description: "Grows with your business.", icon: <span>📈</span> },
      ]}
    />
  ),
  "search-results": () => (
    <SearchResults
      query="design system"
      searchResults={[
        { id: "1", title: "Getting Started Guide", excerpt: "Learn how to use LaunchApp.", url: "/docs/getting-started" },
        { id: "2", title: "Dashboard", excerpt: "Main dashboard", url: "/dashboard" },
        { id: "3", title: "API Reference", excerpt: "Complete API documentation.", url: "/docs/api" },
        { id: "4", title: "Settings", excerpt: "Account settings", url: "/settings" },
      ]}
      totalCount={4}
      onSearch={(q: string) => console.log("search", q)}
      onResultClick={(result: { id: string }) => console.log("click", result.id)}
    />
  ),
  "server-error": () => (
    <ServerError
      retryAction={<button type="button" className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground">Try again</button>}
      homeAction={<button type="button" className="rounded-md border px-4 py-2 text-sm font-medium">Go home</button>}
    />
  ),
  "startup": () => (
    <Startup
      badge="YC-backed"
      headline="The fastest way to build your startup"
      subheadline="From idea to launch in days, not months."
      primaryAction={<button type="button" className="rounded-md bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground">Start building</button>}
      socialProof={[
        { metric: "500+", label: "Startups" },
        { metric: "$50M+", label: "Raised" },
        { metric: "10k+", label: "Users" },
      ]}
      testimonials={[
        { quote: "Shipped our MVP in 2 weeks using LaunchApp.", author: "Sarah Chen", role: "Founder at Acme" },
      ]}
    />
  ),
  "testimonials-section": () => (
    <TestimonialsSection
      variant="default"
      displayMode="grid"
      eyebrow="Testimonials"
      headline="Loved by developers"
      testimonials={[
        { quote: "LaunchApp cut our dev time in half.", author: { name: "Alice Johnson", role: "CTO", company: "Startup Inc." } },
        { quote: "Best component library we've used.", author: { name: "Bob Smith", role: "Lead Engineer", company: "Startup Co." } },
        { quote: "The theming support is incredible.", author: { name: "Carol White", role: "Frontend Lead", company: "TechCorp" } },
      ]}
    />
  ),
  "user-menu": () => (
    <div className="flex justify-center p-4">
      <UserMenu
        user={{ name: "Alice Johnson", email: "alice@example.com", avatarFallback: "AJ" }}
        sections={[
          { items: [{ label: "Settings", href: "/settings" }, { label: "Billing", href: "/billing" }] },
          { items: [{ label: "Sign out", onClick: () => console.log("sign out"), danger: true }] },
        ]}
      />
    </div>
  ),

  // batch-4: registry-aligned alias keys
  "dashboard": () => (
    <div className="h-[480px] overflow-hidden rounded-lg border">
      <DashboardShell
        navigation={[
          { id: "home", label: "Home", href: "#", active: true },
          { id: "analytics", label: "Analytics", href: "#" },
          { id: "projects", label: "Projects", href: "#" },
          { id: "settings", label: "Settings", href: "#" },
        ]}
        user={{ name: "Alice Johnson", email: "alice@example.com", fallbackInitials: "AJ" }}
      >
        <div className="p-6">
          <h1 className="text-2xl font-semibold">Dashboard</h1>
          <p className="mt-1 text-sm text-muted-foreground">Welcome back, Alice.</p>
        </div>
      </DashboardShell>
    </div>
  ),

  "analytics": () => (
    <MetricsDashboard
      title="Analytics"
      columns={3}
      showChange
      metrics={[
        { id: "visitors", label: "Visitors", value: "12,450", change: "+18%", changeType: "up" },
        { id: "pageviews", label: "Page Views", value: "48,200", change: "+22%", changeType: "up" },
        { id: "bounce", label: "Bounce Rate", value: "38.2%", change: "-2.1%", changeType: "down" },
        { id: "sessions", label: "Sessions", value: "9,810", change: "+14%", changeType: "up" },
        { id: "conversion", label: "Conversion", value: "3.6%", change: "+0.4%", changeType: "up" },
        { id: "revenue", label: "Revenue", value: "$18,900", change: "+9%", changeType: "up" },
      ]}
    />
  ),

  "users": () => (
    <UserManagementTable
      users={[
        { id: "1", name: "Alice Johnson", email: "alice@example.com", role: "admin" as const, status: "active" as const, createdAt: "2024-01-01", lastActiveAt: "2024-01-15" },
        { id: "2", name: "Bob Smith", email: "bob@example.com", role: "editor" as const, status: "active" as const, createdAt: "2024-02-01", lastActiveAt: "2024-02-10" },
        { id: "3", name: "Carol White", email: "carol@example.com", role: "viewer" as const, status: "pending" as const, createdAt: "2024-03-01", lastActiveAt: "2024-03-01" },
      ]}
      onBanUser={(id: string) => console.log("ban", id)}
      onUnbanUser={(id: string) => console.log("unban", id)}
      onDeleteUser={(id: string) => console.log("delete", id)}
      onAddUser={() => console.log("add user")}
    />
  ),

  "settings": () => (
    <TabbedSettings
      tabs={[
        { id: "general", label: "General", children: <div className="p-4 text-sm text-muted-foreground">General settings</div> },
        { id: "account", label: "Account", children: <div className="p-4 text-sm text-muted-foreground">Account settings</div> },
        { id: "notifications", label: "Notifications", children: <div className="p-4 text-sm text-muted-foreground">Notification preferences</div> },
        { id: "billing", label: "Billing", children: <div className="p-4 text-sm text-muted-foreground">Billing and plan details</div> },
      ]}
    />
  ),

  "notifications": () => (
    <NotificationCenter
      notifications={[
        { id: "1", title: "PR approved", description: "Alice approved your pull request.", timestamp: "2m ago", read: false, avatarInitials: "AJ" },
        { id: "2", title: "Payment received", description: "$290 payment processed.", timestamp: "1h ago", read: false, avatarInitials: "ST" },
        { id: "3", title: "Deployment complete", description: "Production deploy finished successfully.", timestamp: "3h ago", read: true, avatarInitials: "CI" },
      ]}
      onRead={(id: string) => console.log("read", id)}
      onReadAll={() => console.log("read all")}
    />
  ),

  "integrations": () => (
    <IntegrationCardGrid
      title="Integrations"
      description="Connect the tools your team already uses."
      searchable
      integrations={[
        { id: "github", name: "GitHub", description: "Sync repositories and pull requests.", category: "other" as const, status: "connected" as const },
        { id: "slack", name: "Slack", description: "Send notifications to Slack channels.", category: "communication" as const, status: "connected" as const },
        { id: "stripe", name: "Stripe", description: "Process payments and subscriptions.", category: "payments" as const, status: "connected" as const },
        { id: "hubspot", name: "HubSpot", description: "Sync leads and customer data.", category: "crm" as const, status: "disconnected" as const },
        { id: "zapier", name: "Zapier", description: "Automate workflows between apps.", category: "other" as const, status: "disconnected" as const },
        { id: "intercom", name: "Intercom", description: "Customer messaging platform.", category: "communication" as const, status: "disconnected" as const },
      ]}
      onConnect={(integration) => console.log("connect", integration.id)}
      onDisconnect={(integration) => console.log("disconnect", integration.id)}
      onConfigure={(integration) => console.log("configure", integration.id)}
    />
  ),

  "team": () => (
    <TeamMemberList
      members={[
        { id: "1", name: "Alice Johnson", email: "alice@example.com", role: "admin" as const, status: "active" as const },
        { id: "2", name: "Bob Smith", email: "bob@example.com", role: "member" as const, status: "active" as const },
        { id: "3", name: "Carol White", email: "carol@example.com", role: "member" as const, status: "active" as const },
        { id: "4", name: "Dave Brown", email: "dave@example.com", role: "member" as const, status: "pending" as const },
      ]}
      onRemove={(member) => console.log("remove", member.id)}
    />
  ),

  "profile": () => (
    <UserProfileCard
      user={{ name: "Alice Johnson", username: "alice", bio: "Full-stack developer passionate about great UX.", location: "San Francisco, CA", joinedDate: "January 2023", isVerified: true }}
      stats={[{ label: "Posts", value: 42 }, { label: "Followers", value: 128 }, { label: "Following", value: 64 }]}
    />
  ),

  "billing": () => (
    <BillingOverview
      plan={{ id: "pro", name: "Pro", price: "$29/mo", billingCycle: "monthly", description: "Best for growing teams." }}
      status="active"
      onUpgrade={() => console.log("upgrade")}
      onManage={() => console.log("manage")}
    />
  ),

  "files": () => (
    <FileGrid
      files={[
        { id: "1", name: "report.pdf", type: "document" as const, size: 2457600, modifiedAt: "2024-01-01" },
        { id: "2", name: "photo.jpg", type: "image" as const, size: 1153434, modifiedAt: "2024-01-02" },
        { id: "3", name: "slides.pptx", type: "document" as const, size: 4194304, modifiedAt: "2024-01-03" },
        { id: "4", name: "archive.zip", type: "archive" as const, size: 983040, modifiedAt: "2024-01-04" },
      ]}
      columns={4}
      onOpen={(id: string) => console.log("open", id)}
      onDownload={(id: string) => console.log("download", id)}
    />
  ),

  "projects": () => (
    <ProjectBoard
      initialColumns={[
        { id: "planning", title: "To Do", status: "planning", tasks: [
          { id: "1", title: "Design onboarding flow", priority: "high", tags: ["design"] },
          { id: "2", title: "Write API docs", priority: "medium", tags: ["docs"] },
        ]},
        { id: "in-progress", title: "In Progress", status: "in-progress", tasks: [
          { id: "3", title: "Implement auth", priority: "high", assignee: { name: "Bob Smith" }, tags: ["auth"] },
        ]},
        { id: "review", title: "Review", status: "review", tasks: [] },
        { id: "completed", title: "Done", status: "completed", tasks: [
          { id: "4", title: "Setup CI/CD", priority: "medium", assignee: { name: "Carol White" } },
        ]},
      ]}
    />
  ),

  "revenue": () => (
    <StatsCard
      title="Monthly Revenue"
      value="$45,231"
      description="MRR — Monthly Recurring Revenue"
      trend={{ direction: "up", value: "+20.1%", label: "vs last month" }}
    />
  ),

  "members": () => (
    <TeamMemberGrid
      title="Team Members"
      description="Manage your team and their permissions."
      columns={2}
      showInviteButton
      members={[
        { id: "1", name: "Alice Johnson", email: "alice@example.com", role: "owner" as const, status: "active" as const, joinedAt: "2023-01-01" },
        { id: "2", name: "Bob Smith", email: "bob@example.com", role: "admin" as const, status: "active" as const, joinedAt: "2023-02-01" },
        { id: "3", name: "Carol White", email: "carol@example.com", role: "member" as const, status: "active" as const, joinedAt: "2023-03-01" },
        { id: "4", name: "Dave Brown", email: "dave@example.com", role: "member" as const, status: "pending" as const, joinedAt: "2024-01-01" },
      ]}
      currentUserId="1"
      onRemove={(member) => console.log("remove", member.id)}
      onChangeRole={(member, role) => console.log("change role", member.id, role)}
      onInvite={() => console.log("invite")}
    />
  ),

  "invite": () => (
    <TeamInviteFlow
      onSendInvites={(emails: string[]) => console.log("invite", emails)}
      onSkip={() => console.log("skip")}
      maxInvites={5}
    />
  ),

  "role": () => (
    <div className="flex flex-col gap-3 p-4">
      <p className="text-sm font-medium">Select a role</p>
      <RoleSelector
        value="member"
        onChange={(role: string) => console.log("role changed to", role)}
      />
    </div>
  ),

  "status": () => {
    const SP = StatusPage as React.ComponentType<{ services: { id: string; name: string; status: "operational" | "degraded" | "outage" | "maintenance"; uptime?: number; latency?: number; description?: string }[]; overallStatus?: "operational" | "degraded" | "outage" | "maintenance"; title?: string }>;
    return (
      <SP
        title="System Status"
        overallStatus="operational"
        services={[
          { id: "api", name: "API Gateway", status: "operational", uptime: 99.98, latency: 42 },
          { id: "web", name: "Web App", status: "operational", uptime: 99.95, latency: 120 },
          { id: "db", name: "Database", status: "degraded", uptime: 99.5, latency: 85, description: "Elevated query times" },
          { id: "email", name: "Email Service", status: "operational", uptime: 100, latency: 250 },
        ]}
      />
    );
  },

  "welcome": () => (
    <WelcomeScreen
      title="Welcome to LaunchApp"
      description="Everything you need to build and ship your SaaS product."
      features={[
        { icon: <span aria-hidden>🚀</span>, title: "Ship faster", description: "Production-ready components out of the box." },
        { icon: <span aria-hidden>🎨</span>, title: "Beautiful by default", description: "Thoughtfully designed with dark mode support." },
        { icon: <span aria-hidden>♿</span>, title: "Fully accessible", description: "Built on Radix UI for WCAG compliance." },
      ]}
      ctaLabel="Get started"
      onCta={() => console.log("get started")}
    />
  ),

  "review": () => {
    const RL = ReviewsList as React.ComponentType<{ reviews: { id: string; author: string; rating: number; title?: string; content: string; date: string; verified?: boolean; helpful?: number }[]; overallRating?: number; totalCount?: number; ratingDistribution?: Record<number, number>; showDistribution?: boolean; showHelpful?: boolean; showVerified?: boolean; onHelpful?: (r: { id: string }) => void; onReport?: (r: { id: string }) => void }>;
    return (
      <RL
        overallRating={4.3}
        totalCount={128}
        showDistribution
        showHelpful
        showVerified
        ratingDistribution={{ 5: 68, 4: 32, 3: 14, 2: 8, 1: 6 }}
        reviews={[
          { id: "1", author: "Alice Johnson", rating: 5, title: "Excellent product!", content: "Exactly what I was looking for. Great quality and fast shipping.", date: "2024-01-15", verified: true, helpful: 12 },
          { id: "2", author: "Bob Smith", rating: 4, title: "Good but could be better", content: "Overall satisfied with the purchase. Minor issue with packaging.", date: "2024-01-10", verified: true, helpful: 7 },
          { id: "3", author: "Carol White", rating: 3, title: "Average", content: "Meets expectations but nothing special.", date: "2024-01-05", verified: false, helpful: 2 },
        ]}
        onHelpful={(r) => console.log("helpful", r.id)}
        onReport={(r) => console.log("report", r.id)}
      />
    );
  },

  "orders": () => (
    <OrderSummary
      items={[
        { id: "1", name: "Premium Plan", quantity: 1, price: 290 },
        { id: "2", name: "Extra Storage (50GB)", quantity: 1, price: 49 },
        { id: "3", name: "Priority Support", quantity: 1, price: 99 },
      ]}
      taxRate={0.08}
      shippingCost={0}
      onCheckout={() => console.log("checkout")}
    />
  ),

  "payment": () => (
    <PaymentMethodCard
      methods={[
        { id: "1", type: "card" as const, brand: "Visa", last4: "4242", expiryMonth: 12, expiryYear: 2026, isDefault: true },
        { id: "2", type: "card" as const, brand: "Mastercard", last4: "5353", expiryMonth: 8, expiryYear: 2027, isDefault: false },
      ]}
      selectedId="1"
    />
  ),

  "storage": () => (
    <QuotaUsageBar
      title="Storage Usage"
      description="Your current storage usage by category."
      quotas={[
        { id: "files", name: "Files", used: 3.2, limit: 10, unit: "GB" },
        { id: "media", name: "Media", used: 1.8, limit: 5, unit: "GB" },
        { id: "backups", name: "Backups", used: 0.5, limit: 2, unit: "GB" },
      ]}
      onUpgrade={() => console.log("upgrade")}
    />
  ),

  "images": () => (
    <ImageGallery
      images={[
        { id: "1", src: "/placeholder-image.jpg", alt: "Screenshot 1" },
        { id: "2", src: "/placeholder-image.jpg", alt: "Screenshot 2" },
        { id: "3", src: "/placeholder-image.jpg", alt: "Screenshot 3" },
        { id: "4", src: "/placeholder-image.jpg", alt: "Screenshot 4" },
        { id: "5", src: "/placeholder-image.jpg", alt: "Screenshot 5" },
        { id: "6", src: "/placeholder-image.jpg", alt: "Screenshot 6" },
      ]}
      columns={3}
    />
  ),

  "navigation": () => (
    <div className="h-[500px] relative overflow-hidden border rounded-lg">
      <AppSidebar sections={navSections} user={navUser} />
    </div>
  ),

  "home": () => (
    <div className="h-[480px] overflow-hidden rounded-lg border">
      <DashboardShell
        navigation={[
          { id: "home", label: "Home", href: "#", active: true },
          { id: "analytics", label: "Analytics", href: "#" },
          { id: "settings", label: "Settings", href: "#" },
        ]}
        user={{ name: "Alice Johnson", email: "alice@example.com", fallbackInitials: "AJ" }}
      >
        <div className="p-6">
          <h1 className="text-2xl font-semibold">Home</h1>
          <p className="mt-1 text-sm text-muted-foreground">Your workspace at a glance.</p>
        </div>
      </DashboardShell>
    </div>
  ),

  "me": () => (
    <UserProfileCard
      user={{ name: "Alice Johnson", username: "alice_j", bio: "Product designer and full-stack developer. Building great UX at LaunchApp.", location: "San Francisco, CA", joinedDate: "January 2023", isVerified: true }}
      stats={[{ label: "Projects", value: 12 }, { label: "Contributions", value: 248 }, { label: "Following", value: 34 }]}
    />
  ),

  // batch-6: new unregistered blocks
  "layout-empty-state": () => (
    <LayoutEmptyState
      variant="folder"
      title="No files yet"
      description="Upload your first file to get started."
      action={{ label: "Upload file", onClick: () => console.log("upload") }}
      secondaryAction={{ label: "Learn more", onClick: () => console.log("learn") }}
    />
  ),

  "files-upload-zone": () => (
    <FileUploadZone
      accept="image/*,.pdf"
      maxSize={10 * 1024 * 1024}
      maxFiles={5}
      onUpload={(files) => console.log("upload", files.map((f) => f.id))}
    />
  ),

  "command-palette-block": () => {
    const CommandPaletteDemo = () => {
      const [open, setOpen] = React.useState(true);
      return (
        <div className="h-[360px] overflow-hidden rounded-lg border flex flex-col items-center justify-center gap-4 p-6">
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="inline-flex items-center gap-2 rounded-md border px-4 py-2 text-sm font-medium hover:bg-accent transition-colors"
          >
            Open Command Palette
            <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] opacity-100">
              <span className="text-xs">⌘</span>K
            </kbd>
          </button>
          <SearchCommandPaletteBlock
            open={open}
            onOpenChange={setOpen}
            groups={[
              {
                id: "pages",
                label: "Pages",
                items: [
                  { id: "dashboard", label: "Dashboard", shortcut: "G D" },
                  { id: "settings", label: "Settings", shortcut: "G S" },
                  { id: "team", label: "Team", shortcut: "G T" },
                ],
              },
              {
                id: "actions",
                label: "Actions",
                items: [
                  { id: "invite", label: "Invite teammate" },
                  { id: "new-project", label: "New project" },
                ],
              },
            ]}
            recentItems={[
              { id: "recent-1", label: "Dashboard" },
              { id: "recent-2", label: "Settings" },
            ]}
            placeholder="Search commands..."
          />
        </div>
      );
    };
    return <CommandPaletteDemo />;
  },

  // batch-8: alias/data-item IDs from blocks-registry code snippets
  "account": () => <AccountSettings />,

  "acme": () => (
    <div className="flex justify-center p-4">
      <WorkspaceSwitcher
        workspaces={[
          { id: "acme", name: "Acme Corp", slug: "acme", role: "owner" },
          { id: "personal", name: "Personal", slug: "personal", role: "owner" },
        ]}
        currentId="acme"
        onChange={(ws: { id: string; name: string }) => console.log("switched to", ws.name)}
        onCreate={() => console.log("create workspace")}
      />
    </div>
  ),

  "actions": () => {
    const CommandPaletteActionsDemo = () => {
      const [open, setOpen] = React.useState(true);
      return (
        <div className="h-[340px] overflow-hidden rounded-lg border flex flex-col items-center justify-center gap-4 p-6">
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="inline-flex items-center gap-2 rounded-md border px-4 py-2 text-sm font-medium hover:bg-accent transition-colors"
          >
            Open Actions Palette
            <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] opacity-100">
              <span className="text-xs">⌘</span>K
            </kbd>
          </button>
          <CommandPalette
            open={open}
            onOpenChange={setOpen}
            actions={[
              { id: "invite", label: "Invite teammate", group: "actions", onSelect: () => console.log("invite") },
              { id: "new-project", label: "New project", group: "actions", onSelect: () => console.log("new-project") },
              { id: "import", label: "Import data", group: "actions", onSelect: () => console.log("import") },
            ]}
            groups={[{ id: "actions", label: "Actions" }]}
          />
        </div>
      );
    };
    return <CommandPaletteActionsDemo />;
  },

  "admin": () => (
    <UserManagementTable
      users={[
        { id: "1", name: "Alice Johnson", email: "alice@example.com", role: "admin" as const, status: "active" as const, createdAt: "2024-01-01", lastActiveAt: "2024-01-15" },
        { id: "2", name: "Bob Smith", email: "bob@example.com", role: "admin" as const, status: "active" as const, createdAt: "2024-02-01", lastActiveAt: "2024-02-10" },
        { id: "3", name: "Carol White", email: "carol@example.com", role: "editor" as const, status: "active" as const, createdAt: "2024-03-01", lastActiveAt: "2024-03-01" },
      ]}
      onBanUser={(id: string) => console.log("ban", id)}
      onUnbanUser={(id: string) => console.log("unban", id)}
      onDeleteUser={(id: string) => console.log("delete", id)}
      onAddUser={() => console.log("add user")}
    />
  ),

  "api": () => {
    const SP = StatusPage as React.ComponentType<{ services: { id: string; name: string; status: "operational" | "degraded" | "outage" | "maintenance"; uptime?: number; latency?: number; description?: string }[]; overallStatus?: "operational" | "degraded" | "outage" | "maintenance"; title?: string }>;
    return (
      <SP
        title="API Status"
        overallStatus="operational"
        services={[
          { id: "api", name: "API Gateway", status: "operational", uptime: 99.98, latency: 42 },
          { id: "graphql", name: "GraphQL API", status: "operational", uptime: 99.95, latency: 38 },
          { id: "webhooks", name: "Webhooks", status: "operational", uptime: 99.9, latency: 120 },
        ]}
      />
    );
  },

  "automate": () => (
    <GoalSetupWizard
      steps={[
        {
          id: "automate",
          title: "What do you want to automate?",
          description: "Select all that apply.",
          options: [
            { id: "workflows", label: "Automate workflows", description: "Reduce manual processes with triggers", icon: <span>⚙️</span> },
            { id: "emails", label: "Automate emails", description: "Send emails based on user actions", icon: <span>📧</span> },
            { id: "reports", label: "Automate reports", description: "Schedule and deliver reports automatically", icon: <span>📊</span> },
          ],
          multiSelect: true,
        },
      ]}
      onComplete={(selections: Record<string, string[]>) => console.log("automate goals", selections)}
    />
  ),

  "backlog": () => (
    <ProjectBoard
      initialColumns={[
        { id: "backlog", title: "Backlog", status: "planning", tasks: [
          { id: "1", title: "Research competitors", priority: "low", tags: ["research"] },
          { id: "2", title: "Design new onboarding", priority: "medium", tags: ["design"] },
          { id: "3", title: "Write API docs", priority: "medium", tags: ["docs"] },
          { id: "4", title: "Fix mobile navigation", priority: "high", tags: ["bug"] },
        ]},
        { id: "in-progress", title: "In Progress", status: "in-progress", tasks: [] },
        { id: "done", title: "Done", status: "completed", tasks: [] },
      ]}
    />
  ),

  "backups": () => (
    <QuotaUsageBar
      title="Backup Storage"
      description="Automated backup storage usage."
      quotas={[
        { id: "daily", name: "Daily Backups", used: 1.2, limit: 5, unit: "GB" },
        { id: "weekly", name: "Weekly Backups", used: 3.8, limit: 10, unit: "GB" },
        { id: "monthly", name: "Monthly Archives", used: 0.5, limit: 2, unit: "GB" },
      ]}
      onUpgrade={() => console.log("upgrade")}
    />
  ),

  "basics": () => (
    <MultiStepWizard
      steps={[
        { id: "basics", title: "Basic Info", description: "Tell us the basics.", content: <div className="p-4 space-y-3"><div className="text-sm font-medium">Name</div><div className="rounded-md border px-3 py-2 text-sm text-muted-foreground">Alice Johnson</div><div className="text-sm font-medium mt-2">Email</div><div className="rounded-md border px-3 py-2 text-sm text-muted-foreground">alice@example.com</div></div> },
        { id: "plan", title: "Choose Plan", description: "Pick the right plan.", content: <div className="p-4 text-sm text-muted-foreground">Plan selection</div> },
        { id: "done", title: "Done", description: "You're all set!", content: <div className="p-4 text-sm text-muted-foreground">Setup complete!</div> },
      ]}
      onComplete={() => console.log("complete")}
    />
  ),

  "bug": () => (
    <SupportTicketForm
      onSubmit={(data) => console.log("bug report", data)}
      categories={[
        { value: "bug", label: "Bug Report" },
        { value: "feature", label: "Feature Request" },
        { value: "account", label: "Account Issue" },
        { value: "billing", label: "Billing" },
        { value: "general", label: "General" },
      ]}
    />
  ),

  "churn": () => (
    <MetricsDashboard
      title="Churn Analytics"
      columns={3}
      showChange
      metrics={[
        { id: "churn", label: "Churn Rate", value: "3.2%", change: "-1.1%", changeType: "down" },
        { id: "mrr-lost", label: "MRR Lost", value: "$1,240", change: "-8%", changeType: "down" },
        { id: "at-risk", label: "At-Risk Accounts", value: "14", change: "+2", changeType: "neutral" },
      ]}
    />
  ),

  "content": () => (
    <RichTextEditor
      label="Content"
      placeholder="Write your content here..."
      minHeight={200}
      showWordCount
      onChange={(html: string) => console.log("change", html.slice(0, 50))}
    />
  ),

  "conversion": () => (
    <MetricGrid
      columns={2}
      metrics={[
        { id: "conversion", stats: { title: "Conversion Rate", value: "3.24%", trend: { direction: "up", value: "+0.4%" } } },
        { id: "trials", stats: { title: "Trial Conversions", value: "62%", trend: { direction: "up", value: "+5.2%" } } },
        { id: "leads", stats: { title: "Lead Conversion", value: "18.7%", trend: { direction: "down", value: "-1.3%" } } },
        { id: "checkout", stats: { title: "Checkout Completion", value: "78.4%", trend: { direction: "up", value: "+2.1%" } } },
      ]}
    />
  ),

  "dash": () => (
    <div className="h-[480px] overflow-hidden rounded-lg border">
      <DashboardShell
        navigation={[
          { id: "dash", label: "Dashboard", href: "#", active: true },
          { id: "analytics", label: "Analytics", href: "#" },
          { id: "team", label: "Team", href: "#" },
          { id: "settings", label: "Settings", href: "#" },
        ]}
        user={{ name: "Alice Johnson", email: "alice@example.com", fallbackInitials: "AJ" }}
      >
        <div className="p-6">
          <h1 className="text-2xl font-semibold">Dashboard</h1>
          <p className="mt-1 text-sm text-muted-foreground">Your business at a glance.</p>
        </div>
      </DashboardShell>
    </div>
  ),

  "db": () => {
    const SP = StatusPage as React.ComponentType<{ services: { id: string; name: string; status: "operational" | "degraded" | "outage" | "maintenance"; uptime?: number; latency?: number; description?: string }[]; overallStatus?: "operational" | "degraded" | "outage" | "maintenance"; title?: string }>;
    return (
      <SP
        title="Database Status"
        overallStatus="degraded"
        services={[
          { id: "primary", name: "Primary DB", status: "degraded", uptime: 99.5, latency: 85, description: "Elevated query times" },
          { id: "replica", name: "Read Replica", status: "operational", uptime: 99.9, latency: 28 },
          { id: "cache", name: "Redis Cache", status: "operational", uptime: 100, latency: 2 },
        ]}
      />
    );
  },

  "docs": () => {
    const FM = FileManager as React.ComponentType<{ files: { id: string; name: string; size: number; type: string; mimeType?: string; modifiedAt: string }[]; folders?: { id: string; name: string; itemCount?: number }[]; onFileOpen?: (f: { id: string }) => void; onFileDownload?: (f: { id: string }) => void }>;
    return (
      <FM
        folders={[
          { id: "docs", name: "Documentation", itemCount: 8 },
          { id: "api", name: "API Reference", itemCount: 12 },
          { id: "guides", name: "Guides", itemCount: 5 },
        ]}
        files={[
          { id: "1", name: "getting-started.md", size: 24576, type: "md", mimeType: "text/markdown", modifiedAt: "2024-01-15" },
          { id: "2", name: "api-reference.pdf", size: 2400000, type: "pdf", mimeType: "application/pdf", modifiedAt: "2024-01-10" },
          { id: "3", name: "architecture.md", size: 18432, type: "md", mimeType: "text/markdown", modifiedAt: "2024-01-08" },
        ]}
        onFileOpen={(f) => console.log("open", f.id)}
        onFileDownload={(f) => console.log("download", f.id)}
      />
    );
  },

  "done": () => (
    <KanbanBoard
      initialColumns={[
        { id: "todo", title: "To Do", cards: [] },
        { id: "in-progress", title: "In Progress", cards: [] },
        { id: "done", title: "Done", cards: [
          { id: "1", title: "Setup CI/CD pipeline", badge: "DevOps", badgeVariant: "secondary" as const },
          { id: "2", title: "Design system audit", badge: "Design", badgeVariant: "outline" as const },
          { id: "3", title: "Auth integration", badge: "Engineering", badgeVariant: "default" as const },
          { id: "4", title: "User research sessions", badge: "Research", badgeVariant: "secondary" as const },
        ]},
      ]}
    />
  ),

  "enterprise": () => (
    <FeatureComparison
      tiers={[
        { id: "starter", name: "Starter", price: { monthly: 9, annually: 7 }, cta: { label: "Get started" } },
        { id: "pro", name: "Pro", price: { monthly: 29, annually: 24 }, popular: true, cta: { label: "Start trial" } },
        { id: "enterprise", name: "Enterprise", price: { monthly: "Custom", annually: "Custom" }, cta: { label: "Contact sales" } },
      ]}
      features={[
        { id: "projects", name: "Projects", values: { starter: "5", pro: "Unlimited", enterprise: "Unlimited" } },
        { id: "storage", name: "Storage", values: { starter: "5GB", pro: "100GB", enterprise: "Custom" } },
        { id: "support", name: "Priority Support", values: { starter: false, pro: true, enterprise: true } },
        { id: "sso", name: "SSO / SAML", values: { starter: false, pro: false, enterprise: true } },
        { id: "sla", name: "SLA Guarantee", values: { starter: false, pro: false, enterprise: true } },
      ]}
      headline="Enterprise — everything your org needs"
      subheadline="Dedicated support, custom integrations, and enterprise-grade security."
    />
  ),

  "feature": () => (
    <SupportTicketForm
      onSubmit={(data) => console.log("feature request", data)}
      categories={[
        { value: "bug", label: "Bug Report" },
        { value: "feature", label: "Feature Request" },
        { value: "account", label: "Account Issue" },
        { value: "billing", label: "Billing" },
        { value: "general", label: "General" },
      ]}
    />
  ),

  "free": () => (
    <FeatureComparison
      tiers={[
        { id: "free", name: "Free", price: { monthly: 0, annually: 0 }, cta: { label: "Get started" } },
        { id: "pro", name: "Pro", price: { monthly: 29, annually: 24 }, popular: true, cta: { label: "Start trial" } },
        { id: "enterprise", name: "Enterprise", price: { monthly: "Custom", annually: "Custom" }, cta: { label: "Contact sales" } },
      ]}
      features={[
        { id: "projects", name: "Projects", values: { free: "5", pro: "Unlimited", enterprise: "Unlimited" } },
        { id: "storage", name: "Storage", values: { free: "5 GB", pro: "100 GB", enterprise: "Custom" } },
        { id: "support", name: "Priority Support", values: { free: false, pro: true, enterprise: true } },
        { id: "sso", name: "SSO", values: { free: false, pro: false, enterprise: true } },
      ]}
      headline="Start free, scale as you grow"
      subheadline="No credit card required on the free plan."
    />
  ),

  "general": () => (
    <SupportTicketForm
      onSubmit={(data) => console.log("general ticket", data)}
      categories={[
        { value: "bug", label: "Bug Report" },
        { value: "feature", label: "Feature Request" },
        { value: "account", label: "Account Issue" },
        { value: "billing", label: "Billing" },
        { value: "general", label: "General" },
      ]}
    />
  ),

  "github": () => (
    <ConnectedAccounts
      accounts={[
        { id: "github", provider: "github", connected: true, accountName: "alice-dev" },
        { id: "google", provider: "google", connected: false },
        { id: "slack", provider: "slack", connected: false },
      ]}
      onConnectionToggle={(id: string) => console.log("toggle", id)}
    />
  ),

  "google": () => (
    <ConnectedAccounts
      accounts={[
        { id: "github", provider: "github", connected: true, accountName: "alice-dev" },
        { id: "google", provider: "google", connected: true, accountName: "alice@gmail.com" },
        { id: "slack", provider: "slack", connected: false },
      ]}
      onConnectionToggle={(id: string) => console.log("toggle", id)}
    />
  ),

  "grow": () => (
    <GoalSetupWizard
      steps={[
        {
          id: "grow",
          title: "How do you want to grow your team?",
          description: "Select all that apply.",
          options: [
            { id: "hire", label: "Hire engineers", description: "Expand your engineering capacity", icon: <span>👷</span> },
            { id: "contractors", label: "Add contractors", description: "Bring in specialists for projects", icon: <span>🤝</span> },
            { id: "onboard", label: "Onboard faster", description: "Reduce time to productivity for new hires", icon: <span>🚀</span> },
          ],
          multiSelect: true,
        },
      ]}
      onComplete={(selections: Record<string, string[]>) => console.log("grow goals", selections)}
    />
  ),

  "in-progress": () => (
    <KanbanBoard
      initialColumns={[
        { id: "todo", title: "To Do", cards: [
          { id: "1", title: "Write documentation", badge: "Docs", badgeVariant: "outline" as const },
        ]},
        { id: "in-progress", title: "In Progress", cards: [
          { id: "2", title: "Implement OAuth flow", badge: "Auth", badgeVariant: "default" as const },
          { id: "3", title: "Design dashboard v2", badge: "Design", badgeVariant: "secondary" as const },
          { id: "4", title: "Fix mobile nav bug", badge: "Bug", badgeVariant: "default" as const },
        ]},
        { id: "done", title: "Done", cards: [] },
      ]}
    />
  ),

  "integrate": () => (
    <SetupChecklist
      title="Connect your tools"
      items={[
        { id: "verify", title: "Verify your email", completed: true, href: "#" },
        { id: "profile", title: "Complete your profile", completed: true, href: "/settings/profile" },
        { id: "billing", title: "Set up billing", completed: true, href: "/billing" },
        { id: "integrate", title: "Connect your first integration", completed: false, href: "/integrations" },
        { id: "invite", title: "Invite your team", completed: false, href: "/team/invite" },
      ]}
      showProgress
    />
  ),

  "launch": () => (
    <GoalSetupWizard
      steps={[
        {
          id: "launch",
          title: "What are you trying to launch?",
          description: "Select all that apply.",
          options: [
            { id: "product", label: "Launch a new product", description: "Ship a brand new app or feature", icon: <span>🚀</span> },
            { id: "feature", label: "Launch a feature", description: "Release a specific new capability", icon: <span>⭐</span> },
            { id: "marketing", label: "Launch a marketing campaign", description: "Drive awareness and signups", icon: <span>📣</span> },
          ],
          multiSelect: true,
        },
      ]}
      onComplete={(selections: Record<string, string[]>) => console.log("launch goals", selections)}
    />
  ),

  "main": () => (
    <div className="h-[500px] relative overflow-hidden border rounded-lg">
      <AppSidebar
        sections={[
          {
            title: "Main",
            items: [
              { label: "Dashboard", href: "#", isActive: true },
              { label: "Analytics", href: "#" },
              { label: "Projects", href: "#" },
              { label: "Inbox", href: "#" },
            ],
          },
          {
            title: "Settings",
            items: [
              { label: "Profile", href: "#" },
              { label: "Billing", href: "#" },
              { label: "Team", href: "#" },
            ],
          },
        ]}
        user={navUser}
      />
    </div>
  ),

  "marketing": () => (
    <NotificationPreferences
    />
  ),

  "media": () => (
    <QuotaUsageBar
      title="Media Storage"
      description="Media file storage usage by type."
      quotas={[
        { id: "images", name: "Images", used: 2.4, limit: 5, unit: "GB" },
        { id: "videos", name: "Videos", used: 8.1, limit: 10, unit: "GB" },
        { id: "audio", name: "Audio", used: 0.3, limit: 2, unit: "GB" },
      ]}
      onUpgrade={() => console.log("upgrade")}
    />
  ),

  "member": () => (
    <TeamMemberList
      members={[
        { id: "1", name: "Alice Johnson", email: "alice@example.com", role: "admin" as const, status: "active" as const },
        { id: "2", name: "Bob Smith", email: "bob@example.com", role: "member" as const, status: "active" as const },
        { id: "3", name: "Carol White", email: "carol@example.com", role: "member" as const, status: "active" as const },
        { id: "4", name: "Dave Brown", email: "dave@example.com", role: "member" as const, status: "pending" as const },
      ]}
      onRemove={(member) => console.log("remove", member.id)}
    />
  ),

  "name": () => (
    <TooltipProvider>
      <ColumnFilters
        columns={[
          { id: "name", label: "Name", type: "text" },
          { id: "status", label: "Status", type: "select", options: [{ value: "active", label: "Active" }, { value: "inactive", label: "Inactive" }] },
          { id: "role", label: "Role", type: "select", options: [{ value: "admin", label: "Admin" }, { value: "member", label: "Member" }] },
        ]}
        filters={[]}
        onFiltersChange={(filters: unknown[]) => console.log("filters", filters)}
      />
    </TooltipProvider>
  ),

  "new-project": () => (
    <MultiStepWizard
      steps={[
        {
          id: "new-project",
          title: "New Project",
          description: "Give your project a name and description.",
          content: (
            <div className="p-4 space-y-4">
              <div>
                <div className="text-sm font-medium mb-1">Project name</div>
                <div className="rounded-md border px-3 py-2 text-sm text-muted-foreground">My New Project</div>
              </div>
              <div>
                <div className="text-sm font-medium mb-1">Description</div>
                <div className="rounded-md border px-3 py-2 text-sm text-muted-foreground h-16">A short description of the project.</div>
              </div>
            </div>
          ),
        },
        {
          id: "template",
          title: "Choose Template",
          description: "Start from a template or blank project.",
          content: <div className="p-4 text-sm text-muted-foreground">Template selection</div>,
        },
        {
          id: "invite",
          title: "Invite Team",
          description: "Invite collaborators to your project.",
          content: <div className="p-4 text-sm text-muted-foreground">Invite teammates</div>,
        },
      ]}
      defaultStep={0}
      onStepChange={(step) => console.log("step", step)}
      onComplete={() => console.log("project created")}
    />
  ),

  "nps": () => (
    <MetricsDashboard
      title="NPS & Satisfaction"
      columns={3}
      showChange
      metrics={[
        { id: "nps", label: "NPS Score", value: "72", change: "+4", changeType: "up" },
        { id: "csat", label: "CSAT", value: "4.6 / 5", change: "+0.2", changeType: "up" },
        { id: "promoters", label: "Promoters", value: "68%", change: "+3%", changeType: "up" },
        { id: "detractors", label: "Detractors", value: "8%", change: "-2%", changeType: "down" },
        { id: "responses", label: "Responses", value: "1,240", change: "+180", changeType: "up" },
        { id: "response-rate", label: "Response Rate", value: "34%", change: "+5%", changeType: "up" },
      ]}
    />
  ),

  "pages": () => {
    const CommandPalettePagesDemo = () => {
      const [open, setOpen] = React.useState(true);
      return (
        <div className="h-[340px] overflow-hidden rounded-lg border flex flex-col items-center justify-center gap-4 p-6">
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="inline-flex items-center gap-2 rounded-md border px-4 py-2 text-sm font-medium hover:bg-accent transition-colors"
          >
            Open Pages Palette
            <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] opacity-100">
              <span className="text-xs">⌘</span>K
            </kbd>
          </button>
          <CommandPalette
            open={open}
            onOpenChange={setOpen}
            actions={[
              { id: "dashboard", label: "Dashboard", group: "pages", onSelect: () => console.log("dashboard") },
              { id: "analytics", label: "Analytics", group: "pages", onSelect: () => console.log("analytics") },
              { id: "settings", label: "Settings", group: "pages", onSelect: () => console.log("settings") },
              { id: "team", label: "Team", group: "pages", onSelect: () => console.log("team") },
              { id: "billing", label: "Billing", group: "pages", onSelect: () => console.log("billing") },
            ]}
            groups={[{ id: "pages", label: "Pages" }]}
          />
        </div>
      );
    };
    return <CommandPalettePagesDemo />;
  },

  "paid": () => (
    <FunnelChartCard
      title="Paid Conversion Funnel"
      stages={[
        { label: "Visitors", value: 10000 },
        { label: "Sign Ups", value: 4200 },
        { label: "Trial", value: 1800 },
        { label: "Paid", value: 620 },
      ]}
      description="Funnel from visitor to paying customer"
    />
  ),

  "personal": () => (
    <div className="flex justify-center p-4">
      <WorkspaceSwitcher
        workspaces={[
          { id: "personal", name: "Personal", slug: "personal", role: "owner" },
          { id: "acme", name: "Acme Corp", slug: "acme", role: "member" },
        ]}
        currentId="personal"
        onChange={(ws: { id: string; name: string }) => console.log("switched to", ws.name)}
        onCreate={() => console.log("create workspace")}
      />
    </div>
  ),

  "plan": () => (
    <SetupWizard
      steps={[
        { id: "profile", label: "Profile", completed: true },
        { id: "plan", label: "Choose Plan", completed: false },
        { id: "payment", label: "Payment", completed: false },
        { id: "launch", label: "Launch", completed: false },
      ]}
      currentStepId="plan"
      onComplete={() => console.log("plan selected")}
    />
  ),

  "pro": () => (
    <BillingOverview
      plan={{ id: "pro", name: "Pro", price: "$29/mo", billingCycle: "monthly", description: "Best for growing teams and businesses." }}
      status="active"
      onUpgrade={() => console.log("upgrade")}
      onManage={() => console.log("manage")}
    />
  ),

  "signups": () => (
    <FunnelChartCard
      title="Signup Conversion"
      stages={[
        { label: "Visitors", value: 10000 },
        { label: "Sign Ups", value: 4200 },
        { label: "Verified", value: 3100 },
        { label: "Active", value: 2400 },
      ]}
      description="Visitor to active user conversion"
    />
  ),

  "slack": () => (
    <IntegrationCardGrid
      title="Slack Integration"
      description="Connect Slack to receive notifications in your channels."
      searchable={false}
      integrations={[
        { id: "slack", name: "Slack", description: "Send notifications to Slack channels.", category: "communication" as const, status: "connected" as const },
        { id: "slack-bot", name: "Slack Bot", description: "Interactive bot for team commands.", category: "communication" as const, status: "disconnected" as const },
      ]}
      onConnect={(integration) => console.log("connect", integration.id)}
      onDisconnect={(integration) => console.log("disconnect", integration.id)}
      onConfigure={(integration) => console.log("configure", integration.id)}
    />
  ),

  "starter": () => (
    <SubscriptionManager
      plans={[
        { id: "starter", name: "Starter", price: "$9/mo", billingCycle: "month", features: ["5 projects", "10GB storage", "Community support"] },
        { id: "pro", name: "Pro", price: "$29/mo", billingCycle: "month", features: ["Unlimited projects", "100GB storage", "Priority support"] },
        { id: "enterprise", name: "Enterprise", price: "$99/mo", billingCycle: "month", features: ["Everything in Pro", "SSO", "Dedicated support"] },
      ]}
      currentPlanId="starter"
      onChangePlan={(id: string) => console.log("change to", id)}
    />
  ),

  "stripe": () => (
    <IntegrationCardGrid
      title="Stripe Integration"
      description="Process payments and manage subscriptions."
      searchable={false}
      integrations={[
        { id: "stripe", name: "Stripe", description: "Payment processing and subscription management.", category: "payments" as const, status: "connected" as const },
        { id: "stripe-radar", name: "Stripe Radar", description: "Fraud detection and prevention.", category: "payments" as const, status: "disconnected" as const },
      ]}
      onConnect={(integration) => console.log("connect", integration.id)}
      onDisconnect={(integration) => console.log("disconnect", integration.id)}
      onConfigure={(integration) => console.log("configure", integration.id)}
    />
  ),

  "todo": () => (
    <KanbanBoard
      initialColumns={[
        { id: "todo", title: "To Do", cards: [
          { id: "1", title: "Research competitors", badge: "Research", badgeVariant: "secondary" as const },
          { id: "2", title: "Design wireframes", badge: "Design", badgeVariant: "outline" as const },
          { id: "3", title: "Write user stories", badge: "Planning", badgeVariant: "secondary" as const },
          { id: "4", title: "Set up analytics", badge: "Engineering", badgeVariant: "default" as const },
        ]},
        { id: "in-progress", title: "In Progress", cards: [] },
        { id: "done", title: "Done", cards: [] },
      ]}
    />
  ),

  "trial": () => (
    <FunnelChartCard
      title="Trial Conversion Funnel"
      stages={[
        { label: "Sign Ups", value: 4200 },
        { label: "Trial Started", value: 1800 },
        { label: "Feature Used", value: 1200 },
        { label: "Paid", value: 620 },
      ]}
      description="Trial to paid conversion funnel"
    />
  ),

  "user1": () => (
    <ChatInterface
      messages={[
        { id: "1", content: "Hey! How's it going?", sender: "received" as const, senderName: "Alice", timestamp: "10:00 AM" },
        { id: "2", content: "Great! Just shipped the new feature.", sender: "sent" as const, timestamp: "10:01 AM" },
        { id: "3", content: "Nice! The team will love it.", sender: "received" as const, senderName: "Alice", timestamp: "10:02 AM" },
        { id: "4", content: "Hoping so! Let me know what you think.", sender: "sent" as const, timestamp: "10:03 AM" },
      ]}
      title="Alice"
      isTyping={false}
      onSend={(msg: string) => console.log("send", msg)}
      maxHeight={360}
    />
  ),

  "verify": () => (
    <SetupChecklist
      title="Account setup"
      items={[
        { id: "verify", title: "Verify your email", completed: true, href: "#" },
        { id: "profile", title: "Complete your profile", completed: false, href: "/settings/profile" },
        { id: "billing", title: "Set up billing", completed: false, href: "/billing" },
        { id: "invite", title: "Invite teammates", completed: false, href: "/team/invite" },
      ]}
      showProgress
    />
  ),

  "viewer": () => (
    <UserManagementTable
      users={[
        { id: "1", name: "Alice Johnson", email: "alice@example.com", role: "admin" as const, status: "active" as const, createdAt: "2024-01-01", lastActiveAt: "2024-01-15" },
        { id: "2", name: "Bob Smith", email: "bob@example.com", role: "editor" as const, status: "active" as const, createdAt: "2024-02-01", lastActiveAt: "2024-02-10" },
        { id: "3", name: "Carol White", email: "carol@example.com", role: "viewer" as const, status: "active" as const, createdAt: "2024-03-01", lastActiveAt: "2024-03-05" },
        { id: "4", name: "Dave Brown", email: "dave@example.com", role: "viewer" as const, status: "pending" as const, createdAt: "2024-04-01", lastActiveAt: "2024-04-01" },
      ]}
      onBanUser={(id: string) => console.log("ban", id)}
      onUnbanUser={(id: string) => console.log("unban", id)}
      onDeleteUser={(id: string) => console.log("delete", id)}
      onAddUser={() => console.log("add user")}
    />
  ),

  "visitors": () => (
    <FunnelChartCard
      title="Visitor Funnel"
      stages={[
        { label: "Visitors", value: 10000 },
        { label: "Sign Ups", value: 4200 },
        { label: "Trial", value: 1800 },
        { label: "Paid", value: 620 },
      ]}
      description="Visitor to paid conversion"
    />
  ),

  "web": () => {
    const SP = StatusPage as React.ComponentType<{ services: { id: string; name: string; status: "operational" | "degraded" | "outage" | "maintenance"; uptime?: number; latency?: number; description?: string }[]; overallStatus?: "operational" | "degraded" | "outage" | "maintenance"; title?: string }>;
    return (
      <SP
        title="Web App Status"
        overallStatus="operational"
        services={[
          { id: "web", name: "Web App", status: "operational", uptime: 99.95, latency: 120 },
          { id: "cdn", name: "CDN", status: "operational", uptime: 100, latency: 18 },
          { id: "assets", name: "Static Assets", status: "operational", uptime: 100, latency: 12 },
        ]}
      />
    );
  },

  "workspace": () => (
    <SetupWizard
      steps={[
        { id: "profile", label: "Profile", completed: true },
        { id: "workspace", label: "Workspace", completed: false },
        { id: "invite", label: "Invite Team", completed: false },
        { id: "done", label: "Done", completed: false },
      ]}
      currentStepId="workspace"
      onComplete={() => console.log("workspace setup")}
    />
  ),
};
