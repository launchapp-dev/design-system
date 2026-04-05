import * as React from "react";
import { cn } from "@/lib/utils";

export type SettingsSectionId =
  | "profile"
  | "billing"
  | "team"
  | "notifications"
  | "security"
  | "privacy";

export interface SettingsSection {
  id: SettingsSectionId;
  label: string;
  icon?: React.ReactNode;
  badge?: string | number;
  disabled?: boolean;
}

export interface SettingsLayoutBlockProps extends React.HTMLAttributes<HTMLDivElement> {
  sections: SettingsSection[];
  defaultSection?: SettingsSectionId;
  activeSection?: SettingsSectionId;
  onSectionChange?: (section: SettingsSectionId) => void;
  header?: React.ReactNode;
  footer?: React.ReactNode;
  children?: React.ReactNode;
}

function SettingsLayoutBlock({
  sections,
  defaultSection = "profile",
  activeSection: controlledActiveSection,
  onSectionChange,
  header,
  footer,
  children,
  className,
  ref,
  ...props
}: SettingsLayoutBlockProps & { ref?: React.Ref<HTMLDivElement> }) {
  const [uncontrolledActive, setUncontrolledActive] = React.useState(defaultSection);

  const isControlled = controlledActiveSection !== undefined;
  const activeSection = isControlled ? controlledActiveSection : uncontrolledActive;

  const handleSectionChange = (section: SettingsSectionId) => {
    if (!isControlled) {
      setUncontrolledActive(section);
    }
    onSectionChange?.(section);
  };

  const activeIndex = sections.findIndex((s) => s.id === activeSection);

  return (
    <div ref={ref} className={cn("min-h-screen", className)} {...props}>
      {header && <div className="border-b border-border">{header}</div>}

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-8 lg:flex-row lg:gap-12">
          <aside className="lg:w-64 lg:flex-shrink-0">
            <nav
              aria-label="Settings navigation"
              className="lg:sticky lg:top-8 space-y-0.5"
            >
              {sections.map((section) => {
                const isActive = section.id === activeSection;
                return (
                  <button
                    key={section.id}
                    type="button"
                    onClick={() => !section.disabled && handleSectionChange(section.id)}
                    disabled={section.disabled}
                    aria-current={isActive ? "page" : undefined}
                    className={cn(
                      "flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                      isActive
                        ? "bg-primary/10 text-primary"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground",
                      section.disabled && "cursor-not-allowed opacity-50"
                    )}
                  >
                    {section.icon && (
                      <span className="flex-shrink-0" aria-hidden="true">
                        {section.icon}
                      </span>
                    )}
                    <span className="flex-1 text-left">{section.label}</span>
                    {section.badge !== undefined && (
                      <span
                        className={cn(
                          "flex h-5 min-w-5 items-center justify-center rounded-full px-1.5 text-xs font-semibold",
                          isActive
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted text-muted-foreground"
                        )}
                      >
                        {section.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </nav>

            <div
              role="tablist"
              aria-label="Settings sections"
              className="flex gap-1 overflow-x-auto pb-2 lg:hidden -mx-2 px-2"
            >
              {sections.map((section) => {
                const isActive = section.id === activeSection;
                const isDisabled = section.disabled;
                return (
                  <button
                    key={section.id}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    aria-controls={`settings-panel-${section.id}`}
                    onClick={() => !isDisabled && handleSectionChange(section.id)}
                    disabled={isDisabled}
                    className={cn(
                      "flex flex-col items-center gap-1 rounded-lg px-3 py-2 text-xs font-medium transition-colors whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                      isActive
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:bg-muted"
                    )}
                  >
                    {section.icon && (
                      <span aria-hidden="true" className="text-base">
                        {section.icon}
                      </span>
                    )}
                    <span>{section.label}</span>
                    {section.badge !== undefined && (
                      <span className="flex h-4 min-w-4 items-center justify-center rounded-full bg-black/20 px-1 text-[10px]">
                        {section.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </aside>

          <div className="min-w-0 flex-1">
            <div
              id={`settings-panel-${activeSection}`}
              role="tabpanel"
              aria-labelledby={`settings-tab-${activeSection}`}
            >
              {children}
            </div>
          </div>
        </div>
      </div>

      {footer && <div className="border-t border-border">{footer}</div>}
    </div>
  );
}

SettingsLayoutBlock.displayName = "SettingsLayoutBlock";

export { SettingsLayoutBlock };