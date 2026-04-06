import type * as React from "react";
import { Separator } from "../../../components/Separator";
import { DataExportCard } from "../DataExportCard";
import { AccountDeletionCard } from "../AccountDeletionCard";
import { cn } from "../../../lib/utils";

export interface PrivacySettingsLayoutProps extends React.HTMLAttributes<HTMLDivElement> {
  lastExportDate?: string | null;
  onExport?: () => void | Promise<void>;
  onDeleteAccount?: () => void | Promise<void>;
  isExporting?: boolean;
}

function PrivacySettingsLayout({
  lastExportDate,
  onExport,
  onDeleteAccount,
  isExporting,
  className,
  ref,
  ...props
}: PrivacySettingsLayoutProps & { ref?: React.Ref<HTMLDivElement> }) {
  return (
    <div ref={ref} className={cn("space-y-8", className)} {...props}>
      <div>
        <h3 className="text-lg font-semibold text-foreground">Privacy</h3>
        <p className="text-sm text-muted-foreground">
          Manage your data and account privacy settings.
        </p>
      </div>

      <Separator />

      <section>
        <DataExportCard
          lastExportDate={lastExportDate}
          onExport={onExport}
          isExporting={isExporting}
        />
      </section>

      <Separator />

      <section>
        <AccountDeletionCard onDelete={onDeleteAccount} />
      </section>
    </div>
  );
}

PrivacySettingsLayout.displayName = "PrivacySettingsLayout";

export { PrivacySettingsLayout };
