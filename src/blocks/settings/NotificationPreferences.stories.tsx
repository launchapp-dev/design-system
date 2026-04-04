import type { Meta, StoryObj } from "@storybook/react";
import { NotificationPreferences } from "./NotificationPreferences";

const meta: Meta<typeof NotificationPreferences> = {
  title: "Blocks/Settings/NotificationPreferences",
  component: NotificationPreferences,
  parameters: {
    layout: "padded",
    docs: {
      source: {
        code: `import { NotificationPreferences } from "@launchapp/design-system/blocks";

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
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div style={{ maxWidth: 640 }}>
      <NotificationPreferences
        onChange={(id, checked) => console.log(id, checked)}
      />
    </div>
  ),
};

export const AllEnabled: Story = {
  render: () => {
    const allOn: Record<string, boolean> = {
      email_product_updates: true,
      email_account_activity: true,
      email_marketing: true,
      email_weekly_digest: true,
      push_mentions: true,
      push_replies: true,
      push_reminders: true,
      inapp_all_activity: true,
      inapp_direct_messages: true,
      inapp_system: true,
    };
    return (
      <div style={{ maxWidth: 640 }}>
        <NotificationPreferences values={allOn} />
      </div>
    );
  },
};

export const DarkMode: Story = {
  decorators: [
    (Story) => (
      <div
        className="dark"
        style={{ background: "#09090b", padding: "24px", borderRadius: "8px" }}
      >
        <Story />
      </div>
    ),
  ],
  render: () => (
    <div style={{ maxWidth: 640 }}>
      <NotificationPreferences />
    </div>
  ),
};

export const Mobile: Story = {
  parameters: {
    viewport: { defaultViewport: "mobile1" },
  },
  render: () => (
    <NotificationPreferences
      onChange={(id, checked) => console.log(id, checked)}
    />
  ),
};

export const Tablet: Story = {
  parameters: {
    viewport: { defaultViewport: "tablet" },
  },
  render: () => (
    <div style={{ maxWidth: 640, margin: "0 auto" }}>
      <NotificationPreferences
        onChange={(id, checked) => console.log(id, checked)}
      />
    </div>
  ),
};

export const CompositionExample: Story = {
  name: "Composition (Built From)",
  render: () => (
    <div style={{ maxWidth: 640 }}>
      <NotificationPreferences
        onChange={(id, checked) => console.log(id, checked)}
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "NotificationPreferences is composed from these design system primitives. Use the **Show code** toggle to see the full implementation.",
      },
      source: {
        code: `import {
  Card, CardHeader, CardTitle, CardDescription, CardContent,
  Label,
  Separator,
  Switch,
} from "@launchapp/design-system";

// NotificationPreferences renders grouped notification toggles.
// Each group is a section with a title and individual Switch + Label rows.
// The onChange callback receives (notificationId, enabled) so callers can persist preferences.
export function NotificationPreferences({ groups, onChange }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Notifications</CardTitle>
        <CardDescription>Choose how and when you want to be notified.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {groups.map((group, gi) => (
          <div key={group.title}>
            {gi > 0 && <Separator className="mb-6" />}
            <h3 className="text-sm font-semibold mb-3">{group.title}</h3>
            <div className="space-y-4">
              {group.items.map((item) => (
                <div key={item.id} className="flex items-center justify-between gap-4">
                  <div>
                    <Label htmlFor={item.id} className="font-medium">{item.label}</Label>
                    {item.description && (
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                    )}
                  </div>
                  <Switch
                    id={item.id}
                    defaultChecked={item.defaultEnabled}
                    onCheckedChange={(checked) => onChange?.(item.id, checked)}
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}`,
      },
    },
  },
};
