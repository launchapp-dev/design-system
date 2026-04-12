import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import { CookiePreferences } from "./CookiePreferences";

const meta: Meta<typeof CookiePreferences> = {
  title: "Blocks/Settings/CookiePreferences",
  component: CookiePreferences,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "GDPR-compliant cookie preferences block for settings pages. Displays categorised cookie toggles (essential, functional, analytics, marketing) with persistent state, accept/reject-all shortcuts, and a detailed dialog.",
      },
      source: {
        code: `import { CookiePreferences } from "@launchapp/design-system/blocks";

export default function PrivacySettingsPage() {
  return (
    <CookiePreferences
      onSave={(prefs) => saveCookieConsent(prefs)}
      onAcceptAll={(prefs) => saveCookieConsent(prefs)}
      onRejectAll={(prefs) => saveCookieConsent(prefs)}
      privacyPolicyUrl="/privacy"
    />
  );
}`,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// ─── Default (uncontrolled) ───────────────────────────────────────────────────

export const Default: Story = {
  render: () => (
    <div style={{ maxWidth: 640 }}>
      <CookiePreferences
        onSave={(prefs) => console.log("save", prefs)}
        onAcceptAll={(prefs) => console.log("accept all", prefs)}
        onRejectAll={(prefs) => console.log("reject all", prefs)}
        privacyPolicyUrl="/privacy"
      />
    </div>
  ),
};

// ─── Controlled (all accepted) ───────────────────────────────────────────────

export const AllAccepted: Story = {
  render: () => (
    <div style={{ maxWidth: 640 }}>
      <CookiePreferences
        values={{
          essential: true,
          functional: true,
          analytics: true,
          marketing: true,
        }}
        onSave={(prefs) => console.log("save", prefs)}
      />
    </div>
  ),
};

// ─── Controlled (only essential) ─────────────────────────────────────────────

export const OnlyEssential: Story = {
  render: () => (
    <div style={{ maxWidth: 640 }}>
      <CookiePreferences
        values={{
          essential: true,
          functional: false,
          analytics: false,
          marketing: false,
        }}
        onSave={(prefs) => console.log("save", prefs)}
      />
    </div>
  ),
};

// ─── Interactive ─────────────────────────────────────────────────────────────

export const Interactive: Story = {
  render: function InteractiveStory() {
    const [saved, setSaved] = React.useState<Record<string, boolean> | null>(null);

    return (
      <div style={{ maxWidth: 640, display: "flex", flexDirection: "column", gap: "24px" }}>
        <CookiePreferences
          onSave={(prefs) => setSaved(prefs)}
          onAcceptAll={(prefs) => setSaved(prefs)}
          onRejectAll={(prefs) => setSaved(prefs)}
          privacyPolicyUrl="/privacy"
        />
        {saved && (
          <div
            style={{
              background: "var(--la-muted, #f4f4f5)",
              borderRadius: "8px",
              padding: "12px 16px",
              fontFamily: "monospace",
              fontSize: "12px",
            }}
          >
            <strong>Saved preferences:</strong>
            <pre style={{ margin: "4px 0 0" }}>{JSON.stringify(saved, null, 2)}</pre>
          </div>
        )}
      </div>
    );
  },
};

// ─── Dark mode ───────────────────────────────────────────────────────────────

export const DarkMode: Story = {
  decorators: [
    (Story) => (
      <div className="dark" style={{ background: "#09090b", padding: "24px", borderRadius: "8px" }}>
        <Story />
      </div>
    ),
  ],
  render: () => (
    <div style={{ maxWidth: 640 }}>
      <CookiePreferences
        onSave={(prefs) => console.log("save", prefs)}
        privacyPolicyUrl="/privacy"
      />
    </div>
  ),
};

// ─── Mobile ───────────────────────────────────────────────────────────────────

export const Mobile: Story = {
  parameters: {
    viewport: { defaultViewport: "mobile1" },
  },
  render: () => (
    <CookiePreferences onSave={(prefs) => console.log("save", prefs)} privacyPolicyUrl="/privacy" />
  ),
};

// ─── Composition example ─────────────────────────────────────────────────────

export const CompositionExample: Story = {
  name: "Composition (Built From)",
  render: () => (
    <div style={{ maxWidth: 640 }}>
      <CookiePreferences onSave={(prefs) => console.log("save", prefs)} />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "CookiePreferences is composed from design system primitives. Use the **Show code** toggle to see the implementation.",
      },
      source: {
        code: `import {
  Card, CardHeader, CardTitle, CardContent, CardFooter,
  Badge,
  Button,
  Label,
  Separator,
  Switch,
  CookiePreferencesDialog,
} from "@launchapp/design-system";

const categories = [
  { id: "essential", name: "Essential", required: true, ... },
  { id: "functional", name: "Functional", ... },
  { id: "analytics", name: "Analytics", ... },
  { id: "marketing", name: "Marketing", ... },
];

export function CookiePreferences({ onSave, onAcceptAll, onRejectAll }) {
  const [prefs, setPrefs] = React.useState({
    essential: true,
    functional: false,
    analytics: false,
    marketing: false,
  });

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold">Cookie preferences</h3>
        <p className="text-sm text-muted-foreground">
          Manage how this site uses cookies.
        </p>
      </div>
      <Separator />
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium">Cookie categories</CardTitle>
        </CardHeader>
        <CardContent className="space-y-0">
          {categories.map((cat, i) => (
            <React.Fragment key={cat.id}>
              <div className="flex flex-col sm:flex-row items-start justify-between gap-4 py-3">
                <div className="space-y-0.5 flex-1">
                  <div className="flex items-center gap-2">
                    <Label htmlFor={cat.id}>{cat.name}</Label>
                    {cat.required && <Badge variant="secondary">Required</Badge>}
                  </div>
                  <p className="text-xs text-muted-foreground">{cat.description}</p>
                </div>
                <Switch
                  id={cat.id}
                  checked={prefs[cat.id]}
                  disabled={cat.required}
                  onCheckedChange={(v) => setPrefs((p) => ({ ...p, [cat.id]: v }))}
                />
              </div>
              {i < categories.length - 1 && <Separator />}
            </React.Fragment>
          ))}
        </CardContent>
        <CardFooter className="flex justify-end gap-2 pt-4 border-t border-border">
          <Button variant="outline" size="sm" onClick={() => onRejectAll?.({...})}>Reject All</Button>
          <Button variant="outline" size="sm" onClick={() => onAcceptAll?.({...})}>Accept All</Button>
          <Button size="sm" onClick={() => onSave?.(prefs)}>Save Preferences</Button>
        </CardFooter>
      </Card>
    </div>
  );
}`,
      },
    },
  },
};
