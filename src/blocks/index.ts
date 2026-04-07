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
export * from "./metrics";
export * from "./activity";
export * from "./profile";
export * from "./project";
export * from "./timeline";
export * from "./inbox";

// Explicit re-exports to resolve ambiguity from duplicate names across block categories.
// dashboard is the authoritative source for these shared types.
export type { BreadcrumbItem } from "./dashboard";
export { ActivityFeed } from "./dashboard";
export type { ActivityFeedProps } from "./dashboard";
export { Timeline } from "./dashboard";
export type { TimelineProps, TimelineEntry } from "./dashboard";
// team is the authoritative source for TeamMember (also exported by settings).
export type { TeamMember } from "./team";
// files is the authoritative source for FileUploadZone (also in forms).
export { FileUploadZone } from "./files";
export type { FileUploadZoneProps } from "./files";
// admin is the authoritative source for AuditLogViewer (also in activity).
export { AuditLogViewer } from "./admin";
export type { AuditLogViewerProps, AuditLogEntry, AuditLogLevel } from "./admin";
// community is the authoritative source for UserProfileCard (also in profile).
export { UserProfileCard } from "./community";
export type { UserProfileCardProps, SocialLink } from "./community";
