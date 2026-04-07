export * from "./auth";
export * from "./dashboard";
export * from "./navigation";
export * from "./settings";
export * from "./data";
export * from "./marketing";
export * from "./ecommerce";
export * from "./landing";
export * from "./blog";
export * from "./errors";
export * from "./onboarding";
export * from "./files";
export * from "./messaging";
export * from "./notifications";
export * from "./community";
export * from "./admin";
export * from "./forms";
export * from "./search";
export * from "./app";
export * from "./billing";
export * from "./team";
export * from "./integrations";

// Explicit re-exports to resolve ambiguity from duplicate names across block categories.
// dashboard is the authoritative source for these shared types.
export type { BreadcrumbItem } from "./dashboard";
export { ActivityFeed } from "./dashboard";
export type { ActivityFeedProps } from "./dashboard";
export { Timeline } from "./dashboard";
export type { TimelineProps, TimelineEntry } from "./dashboard";
// team is the authoritative source for TeamMember (also exported by settings).
export type { TeamMember } from "./team";
// billing is the authoritative source for InvoiceTable/Invoice (also exported by data).
export { InvoiceTable } from "./billing";
export type { InvoiceTableProps, Invoice, InvoiceStatus } from "./billing";
