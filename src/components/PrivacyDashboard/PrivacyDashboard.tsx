
import * as SeparatorPrimitive from "@radix-ui/react-separator";
import { cn } from "../../lib/utils";
import { Button } from "../Button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../Card";
import { ConsentHistoryTable } from "../ConsentHistoryTable";
import type { ConsentHistoryEntry } from "../ConsentHistoryTable";

export type DataRequestStatus = "idle" | "pending" | "ready" | "error";
export type DeleteAccountStatus = "idle" | "confirm" | "pending" | "deleted" | "error";

export interface PrivacyDashboardProps {
  // Data download
  onRequestDataDownload?: () => void;
  dataDownloadStatus?: DataRequestStatus;
  dataDownloadUrl?: string;
  // Account deletion
  onRequestAccountDeletion?: () => void;
  onConfirmAccountDeletion?: () => void;
  onCancelAccountDeletion?: () => void;
  deleteAccountStatus?: DeleteAccountStatus;
  // Consent history
  consentHistory?: ConsentHistoryEntry[];
  onWithdrawConsent?: (entryId: string) => void;
  onManageConsent?: () => void;
  // Customisation
  title?: string;
  userName?: string;
  className?: string;
}

const DATA_DOWNLOAD_STATUS_MESSAGES: Record<DataRequestStatus, string | null> = {
  idle: null,
  pending: "Your data export is being prepared. You will receive an email when it is ready.",
  ready: "Your data export is ready to download.",
  error: "There was a problem preparing your export. Please try again.",
};

function PrivacyDashboard({
  onRequestDataDownload,
  dataDownloadStatus = "idle",
  dataDownloadUrl,
  onRequestAccountDeletion,
  onConfirmAccountDeletion,
  onCancelAccountDeletion,
  deleteAccountStatus = "idle",
  consentHistory = [],
  onWithdrawConsent,
  onManageConsent,
  title = "Privacy & Data",
  userName,
  className,
}: PrivacyDashboardProps) {
  return (
    <div className={cn("space-y-6", className)}>
      {/* Page header */}
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-[hsl(var(--la-foreground))]">
          {title}
        </h1>
        <p className="mt-1 text-sm text-[hsl(var(--la-muted-foreground))]">
          Manage your personal data, consent preferences, and account settings.
          {userName && (
            <> Logged in as <span className="font-medium">{userName}</span>.</>
          )}
        </p>
      </div>

      <SeparatorPrimitive.Root className="h-px bg-[hsl(var(--la-border))]" />

      {/* Data Download */}
      <Card>
        <CardHeader>
          <div className="flex items-start gap-3">
            <div
              aria-hidden="true"
              className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[hsl(var(--la-muted))]"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
            </div>
            <div>
              <CardTitle className="text-base">Download Your Data</CardTitle>
              <CardDescription className="mt-1">
                Request a copy of all personal data we hold about you. We will
                prepare a downloadable archive and notify you by email when it is
                ready (typically within 48 hours).
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            {dataDownloadStatus === "ready" && dataDownloadUrl ? (
              <Button asChild size="sm">
                <a href={dataDownloadUrl} download>
                  Download Archive
                </a>
              </Button>
            ) : (
              <Button
                size="sm"
                variant="outline"
                onClick={onRequestDataDownload}
                disabled={dataDownloadStatus === "pending"}
                aria-describedby="data-download-status"
              >
                {dataDownloadStatus === "pending"
                  ? "Preparing Export…"
                  : "Request Data Export"}
              </Button>
            )}
            {DATA_DOWNLOAD_STATUS_MESSAGES[dataDownloadStatus] && (
              <p
                id="data-download-status"
                className={cn(
                  "text-sm",
                  dataDownloadStatus === "error"
                    ? "text-red-600 dark:text-red-400"
                    : "text-[hsl(var(--la-muted-foreground))]"
                )}
              >
                {DATA_DOWNLOAD_STATUS_MESSAGES[dataDownloadStatus]}
              </p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Consent Management */}
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row items-start justify-between gap-4">
            <div className="flex items-start gap-3">
              <div
                aria-hidden="true"
                className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[hsl(var(--la-muted))]"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
              </div>
              <div>
                <CardTitle className="text-base">Cookie &amp; Consent Preferences</CardTitle>
                <CardDescription className="mt-1">
                  Review and update your cookie consent choices at any time. Your
                  preferences are stored and applied across all sessions.
                </CardDescription>
              </div>
            </div>
            {onManageConsent && (
              <Button
                size="sm"
                variant="outline"
                onClick={onManageConsent}
                className="shrink-0"
              >
                Manage Preferences
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <ConsentHistoryTable
            entries={consentHistory}
            onWithdraw={onWithdrawConsent}
            emptyMessage="No consent history recorded yet."
          />
        </CardContent>
      </Card>

      {/* Account Deletion */}
      <Card className="border-red-200 dark:border-red-900/50">
        <CardHeader>
          <div className="flex items-start gap-3">
            <div
              aria-hidden="true"
              className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-red-50 dark:bg-red-900/20"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-red-600 dark:text-red-400"
              >
                <polyline points="3 6 5 6 21 6" />
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
                <line x1="10" y1="11" x2="10" y2="17" />
                <line x1="14" y1="11" x2="14" y2="17" />
              </svg>
            </div>
            <div>
              <CardTitle className="text-base text-red-700 dark:text-red-400">
                Delete Account
              </CardTitle>
              <CardDescription className="mt-1">
                Permanently delete your account and all associated data. This action
                cannot be undone. All your data will be erased within 30 days in
                accordance with GDPR Article 17.
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {deleteAccountStatus === "deleted" ? (
            <p className="text-sm text-[hsl(var(--la-muted-foreground))]">
              Your account deletion request has been submitted. You will receive a
              confirmation email shortly.
            </p>
          ) : deleteAccountStatus === "confirm" ? (
            <div className="space-y-3">
              <div className="rounded-md border border-red-200 bg-red-50 px-4 py-3 dark:border-red-900/50 dark:bg-red-900/20">
                <p className="text-sm font-medium text-red-800 dark:text-red-300">
                  Are you absolutely sure?
                </p>
                <p className="mt-1 text-sm text-red-700 dark:text-red-400">
                  This will permanently delete your account, all your data, and
                  cancel any active subscriptions. This cannot be undone.
                </p>
              </div>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={onConfirmAccountDeletion}
                >
                  Yes, Delete My Account
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={onCancelAccountDeletion}
                >
                  Cancel
                </Button>
              </div>
            </div>
          ) : (
            <Button
              size="sm"
              variant="destructive"
              onClick={onRequestAccountDeletion}
              disabled={deleteAccountStatus === "pending"}
            >
              {deleteAccountStatus === "pending"
                ? "Processing…"
                : "Delete My Account"}
            </Button>
          )}
          {deleteAccountStatus === "error" && (
            <p className="mt-2 text-sm text-red-600 dark:text-red-400">
              There was a problem processing your request. Please try again or
              contact support.
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

PrivacyDashboard.displayName = "PrivacyDashboard";

export { PrivacyDashboard };
