import * as React from "react";
import { Switch } from "../../components/Switch";
import { Label } from "../../components/Label";
import { Separator } from "../../components/Separator";
import { Card, CardHeader, CardTitle, CardContent } from "../../components/Card";
import { cn } from "../../lib/utils";

export interface NotificationPreferenceItem {
  id: string;
  label: string;
  description: string;
  defaultChecked?: boolean;
}

export interface NotificationGroup {
  id: string;
  title: string;
  items: NotificationPreferenceItem[];
}

export interface NotificationPreferencesProps {
  groups?: NotificationGroup[];
  values?: Record<string, boolean>;
  onChange?: (id: string, checked: boolean) => void;
  className?: string;
}

const defaultGroups: NotificationGroup[] = [
  {
    id: "email",
    title: "Email notifications",
    items: [
      { id: "email_product_updates", label: "Product updates", description: "News about new features and improvements.", defaultChecked: true },
      { id: "email_account_activity", label: "Account activity", description: "Sign-ins, password changes, and security alerts.", defaultChecked: true },
      { id: "email_marketing", label: "Marketing & promotions", description: "Special offers, deals, and newsletters.", defaultChecked: false },
      { id: "email_weekly_digest", label: "Weekly digest", description: "A summary of your activity each week.", defaultChecked: false },
    ],
  },
  {
    id: "push",
    title: "Push notifications",
    items: [
      { id: "push_mentions", label: "Mentions", description: "When someone mentions you in a comment.", defaultChecked: true },
      { id: "push_replies", label: "Replies", description: "Replies to your comments and posts.", defaultChecked: true },
      { id: "push_reminders", label: "Reminders", description: "Scheduled reminders and due-date alerts.", defaultChecked: false },
    ],
  },
  {
    id: "inapp",
    title: "In-app notifications",
    items: [
      { id: "inapp_all_activity", label: "All activity", description: "Show a badge for all new notifications.", defaultChecked: true },
      { id: "inapp_direct_messages", label: "Direct messages", description: "Notify when you receive a new direct message.", defaultChecked: true },
      { id: "inapp_system", label: "System alerts", description: "Maintenance windows and service updates.", defaultChecked: true },
    ],
  },
];

function NotificationPreferences({ groups = defaultGroups, values, onChange, className, ref}: NotificationPreferencesProps & { ref?: React.Ref<HTMLDivElement> }) {
    const [localValues, setLocalValues] = React.useState<Record<string, boolean>>(() => {
      const initial: Record<string, boolean> = {};
      for (const g of groups) {
        for (const item of g.items) {
          initial[item.id] = item.defaultChecked ?? false;
        }
      }
      return initial;
    });

    const getChecked = (id: string) => values?.[id] ?? localValues[id] ?? false;

    const handleChange = (id: string, checked: boolean) => {
      if (!values) {
        setLocalValues((prev) => ({ ...prev, [id]: checked }));
      }
      onChange?.(id, checked);
    };

    return (
      <div ref={ref} className={cn("space-y-6", className)}>
        <div>
          <h3 className="text-lg font-semibold text-foreground">Notification preferences</h3>
          <p className="text-sm text-muted-foreground">Choose what you want to be notified about.</p>
        </div>
        <Separator />
        <div className="space-y-4">
          {groups.map((group, groupIndex) => (
            <React.Fragment key={group.id}>
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium">{group.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-0">
                  {group.items.map((item, itemIndex) => (
                    <React.Fragment key={item.id}>
                      <div className="flex flex-col sm:flex-row items-start justify-between gap-4 py-3">
                        <div className="space-y-0.5 flex-1">
                          <Label
                            htmlFor={item.id}
                            className="text-sm font-medium cursor-pointer"
                          >
                            {item.label}
                          </Label>
                          <p className="text-xs text-muted-foreground">{item.description}</p>
                        </div>
                        <Switch
                          id={item.id}
                          checked={getChecked(item.id)}
                          onCheckedChange={(checked) => handleChange(item.id, checked)}
                          aria-label={item.label}
                        />
                      </div>
                      {itemIndex < group.items.length - 1 && (
                        <Separator />
                      )}
                    </React.Fragment>
                  ))}
                </CardContent>
              </Card>
              {groupIndex < groups.length - 1 && <div />}
            </React.Fragment>
          ))}
        </div>
      </div>
    );
  }

NotificationPreferences.displayName = "NotificationPreferences";

export { NotificationPreferences };
