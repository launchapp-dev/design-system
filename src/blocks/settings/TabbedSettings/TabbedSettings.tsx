import * as React from "react";
import { cn } from "@/lib/utils";
import { TabsRoot, TabsList, TabsTrigger, TabsContent } from "@/components/Tabs";
import { Badge } from "@/components/Badge";

export interface TabbedSettingsTab {
  id: string;
  label: string;
  badge?: string | number;
  disabled?: boolean;
  children: React.ReactNode;
}

export interface TabbedSettingsProps extends React.HTMLAttributes<HTMLDivElement> {
  tabs: TabbedSettingsTab[];
  defaultTab?: string;
  onTabChange?: (tabId: string) => void;
  title?: string;
  description?: string;
}

function TabbedSettings({
  tabs,
  defaultTab,
  onTabChange,
  title = "Settings",
  description,
  className,
  ...props
}: TabbedSettingsProps) {
  const [activeTab, setActiveTab] = React.useState(defaultTab || tabs[0]?.id);

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    onTabChange?.(tabId);
  };

  return (
    <div className={cn("w-full", className)} {...props}>
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
        {description && <p className="mt-1 text-muted-foreground">{description}</p>}
      </div>

      <TabsRoot
        value={activeTab}
        onValueChange={handleTabChange}
        className="w-full"
      >
        <TabsList className="w-full justify-start border-b rounded-none bg-transparent h-auto p-0">
          {tabs.map((tab) => (
            <TabsTrigger
              key={tab.id}
              value={tab.id}
              disabled={tab.disabled}
              className={cn(
                "rounded-none border-b-2 border-transparent px-4 py-3 text-sm font-medium transition-colors data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none",
                tab.disabled && "opacity-50 cursor-not-allowed",
              )}
            >
              {tab.label}
              {tab.badge !== undefined && (
                <Badge
                  variant="secondary"
                  className="ml-2 h-5 min-w-5 px-1.5 text-xs"
                >
                  {tab.badge}
                </Badge>
              )}
            </TabsTrigger>
          ))}
        </TabsList>

        {tabs.map((tab) => (
          <TabsContent
            key={tab.id}
            value={tab.id}
            className="mt-6"
          >
            {tab.children}
          </TabsContent>
        ))}
      </TabsRoot>
    </div>
  );
}

TabbedSettings.displayName = "TabbedSettings";

export { TabbedSettings };
