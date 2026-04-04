import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import * as React from "react";
import {
  CookieBanner,
  CookiePreferences,
  CookieConsentProvider,
  ConsentGate,
  useCookieConsent,
  DEFAULT_CATEGORIES,
} from "./CookieConsent";
import type { ConsentPreferences, ConsentCategory } from "./CookieConsent";

function clearCookies() {
  document.cookie.split(";").forEach((c) => {
    const name = c.trim().split("=")[0];
    if (name) document.cookie = `${name}=; max-age=0; path=/`;
  });
}

beforeEach(() => {
  clearCookies();
});

afterEach(() => {
  clearCookies();
  document.documentElement.classList.remove("dark");
});

describe("CookieBanner", () => {
  it("renders banner with default title and description", () => {
    render(
      <CookieBanner
        onAcceptAll={() => undefined}
        onRejectAll={() => undefined}
        onOpenPreferences={() => undefined}
      />,
    );
    expect(screen.getByText("We use cookies")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Accept All" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Reject All" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Manage Preferences" })).toBeInTheDocument();
  });

  it("renders custom title and description", () => {
    render(
      <CookieBanner
        title="Custom Title"
        description="Custom description."
        onAcceptAll={() => undefined}
        onRejectAll={() => undefined}
        onOpenPreferences={() => undefined}
      />,
    );
    expect(screen.getByText("Custom Title")).toBeInTheDocument();
    expect(screen.getByText(/Custom description/)).toBeInTheDocument();
  });

  it("renders privacy policy link when provided", () => {
    render(
      <CookieBanner
        privacyPolicyUrl="/privacy"
        onAcceptAll={() => undefined}
        onRejectAll={() => undefined}
        onOpenPreferences={() => undefined}
      />,
    );
    const link = screen.getByText("Privacy Policy");
    expect(link).toHaveAttribute("href", "/privacy");
  });

  it("has dialog role with aria-label", () => {
    render(
      <CookieBanner
        onAcceptAll={() => undefined}
        onRejectAll={() => undefined}
        onOpenPreferences={() => undefined}
      />,
    );
    expect(screen.getByRole("dialog", { name: "We use cookies" })).toBeInTheDocument();
  });

  it("calls onAcceptAll when Accept All is clicked", async () => {
    const user = userEvent.setup();
    const onAcceptAll = vi.fn();
    render(
      <CookieBanner
        onAcceptAll={onAcceptAll}
        onRejectAll={() => undefined}
        onOpenPreferences={() => undefined}
      />,
    );
    await user.click(screen.getByRole("button", { name: "Accept All" }));
    expect(onAcceptAll).toHaveBeenCalledOnce();
  });

  it("calls onRejectAll when Reject All is clicked", async () => {
    const user = userEvent.setup();
    const onRejectAll = vi.fn();
    render(
      <CookieBanner
        onAcceptAll={() => undefined}
        onRejectAll={onRejectAll}
        onOpenPreferences={() => undefined}
      />,
    );
    await user.click(screen.getByRole("button", { name: "Reject All" }));
    expect(onRejectAll).toHaveBeenCalledOnce();
  });

  it("calls onOpenPreferences when Manage Preferences is clicked", async () => {
    const user = userEvent.setup();
    const onOpenPreferences = vi.fn();
    render(
      <CookieBanner
        onAcceptAll={() => undefined}
        onRejectAll={() => undefined}
        onOpenPreferences={onOpenPreferences}
      />,
    );
    await user.click(screen.getByRole("button", { name: "Manage Preferences" }));
    expect(onOpenPreferences).toHaveBeenCalledOnce();
  });
});

describe("CookiePreferences", () => {
  const defaultProps = {
    open: true,
    onOpenChange: () => undefined,
    categories: DEFAULT_CATEGORIES,
    preferences: { essential: true, functional: false, analytics: false, marketing: false } as ConsentPreferences,
    onToggle: () => undefined,
    onAcceptAll: () => undefined,
    onRejectAll: () => undefined,
    onSave: () => undefined,
  };

  it("renders dialog role when open", () => {
    render(<CookiePreferences {...defaultProps} />);
    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });

  it("does not render dialog when closed", () => {
    render(<CookiePreferences {...defaultProps} open={false} />);
    expect(screen.queryByRole("dialog")).toBeNull();
  });

  it("renders default title", () => {
    render(<CookiePreferences {...defaultProps} />);
    expect(screen.getByText("Cookie Preferences")).toBeInTheDocument();
  });

  it("renders all category names", () => {
    render(<CookiePreferences {...defaultProps} />);
    expect(screen.getByText("Essential")).toBeInTheDocument();
    expect(screen.getByText("Functional")).toBeInTheDocument();
    expect(screen.getByText("Analytics")).toBeInTheDocument();
    expect(screen.getByText("Marketing")).toBeInTheDocument();
  });

  it("renders switches with aria-labels", () => {
    render(<CookiePreferences {...defaultProps} />);
    expect(screen.getByRole("switch", { name: /Essential cookies/i })).toBeInTheDocument();
    expect(screen.getByRole("switch", { name: /Analytics cookies/i })).toBeInTheDocument();
    expect(screen.getByRole("switch", { name: /Marketing cookies/i })).toBeInTheDocument();
  });

  it("disables switch for required category", () => {
    render(<CookiePreferences {...defaultProps} />);
    expect(screen.getByRole("switch", { name: /Essential cookies/i })).toBeDisabled();
  });

  it("enables switch for non-required categories", () => {
    render(<CookiePreferences {...defaultProps} />);
    expect(screen.getByRole("switch", { name: /Analytics cookies/i })).not.toBeDisabled();
  });

  it("shows 'Always on' badge for required categories", () => {
    render(<CookiePreferences {...defaultProps} />);
    expect(screen.getByText("Always on")).toBeInTheDocument();
  });

  it("calls onAcceptAll when Accept All is clicked", async () => {
    const user = userEvent.setup();
    const onAcceptAll = vi.fn();
    render(<CookiePreferences {...defaultProps} onAcceptAll={onAcceptAll} />);
    await user.click(screen.getByRole("button", { name: "Accept All" }));
    expect(onAcceptAll).toHaveBeenCalledOnce();
  });

  it("calls onRejectAll when Reject All is clicked", async () => {
    const user = userEvent.setup();
    const onRejectAll = vi.fn();
    render(<CookiePreferences {...defaultProps} onRejectAll={onRejectAll} />);
    await user.click(screen.getByRole("button", { name: "Reject All" }));
    expect(onRejectAll).toHaveBeenCalledOnce();
  });

  it("calls onSave when Save Preferences is clicked", async () => {
    const user = userEvent.setup();
    const onSave = vi.fn();
    render(<CookiePreferences {...defaultProps} onSave={onSave} />);
    await user.click(screen.getByRole("button", { name: "Save Preferences" }));
    expect(onSave).toHaveBeenCalledOnce();
  });

  it("calls onToggle when a switch is toggled", async () => {
    const user = userEvent.setup();
    const onToggle = vi.fn();
    render(<CookiePreferences {...defaultProps} onToggle={onToggle} />);
    await user.click(screen.getByRole("switch", { name: /Analytics cookies/i }));
    expect(onToggle).toHaveBeenCalledWith("analytics", true);
  });

  it("toggles switch via Space key", async () => {
    const user = userEvent.setup();
    const onToggle = vi.fn();
    render(<CookiePreferences {...defaultProps} onToggle={onToggle} />);
    const marketingSwitch = screen.getByRole("switch", { name: /Marketing cookies/i });
    marketingSwitch.focus();
    await user.keyboard(" ");
    expect(onToggle).toHaveBeenCalledWith("marketing", true);
  });

  it("renders close button", () => {
    render(<CookiePreferences {...defaultProps} />);
    expect(screen.getByRole("button", { name: /close/i })).toBeInTheDocument();
  });

  it("Escape key calls onOpenChange with false", async () => {
    const user = userEvent.setup();
    const onOpenChange = vi.fn();
    render(<CookiePreferences {...defaultProps} onOpenChange={onOpenChange} />);
    await user.keyboard("{Escape}");
    expect(onOpenChange).toHaveBeenCalledWith(false);
  });

  it("focuses an element within dialog on open", () => {
    render(<CookiePreferences {...defaultProps} />);
    const dialog = screen.getByRole("dialog");
    expect(dialog.contains(document.activeElement)).toBe(true);
  });

  it("renders in dark mode context", () => {
    document.documentElement.classList.add("dark");
    render(<CookiePreferences {...defaultProps} />);
    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });
});

describe("CookieConsentProvider", () => {
  it("shows banner on first visit (no cookie)", () => {
    render(
      <CookieConsentProvider>
        <div>App</div>
      </CookieConsentProvider>,
    );
    expect(screen.getByRole("dialog", { name: "We use cookies" })).toBeInTheDocument();
  });

  it("hides banner when consent cookie exists", () => {
    document.cookie = `la-cookie-consent=${encodeURIComponent(JSON.stringify({ essential: true, functional: false, analytics: false, marketing: false }))}; path=/`;
    render(
      <CookieConsentProvider>
        <div>App</div>
      </CookieConsentProvider>,
    );
    expect(screen.queryByRole("dialog", { name: "We use cookies" })).toBeNull();
  });

  it("Accept All persists consent cookie and hides banner", async () => {
    const user = userEvent.setup();
    const onConsentChange = vi.fn();
    render(
      <CookieConsentProvider onConsentChange={onConsentChange}>
        <div>App</div>
      </CookieConsentProvider>,
    );
    await user.click(screen.getByRole("button", { name: "Accept All" }));
    expect(screen.queryByRole("dialog", { name: "We use cookies" })).toBeNull();
    expect(onConsentChange).toHaveBeenCalledWith({
      essential: true,
      functional: true,
      analytics: true,
      marketing: true,
    });
    expect(document.cookie).toContain("la-cookie-consent");
  });

  it("Reject All persists only required categories", async () => {
    const user = userEvent.setup();
    const onConsentChange = vi.fn();
    render(
      <CookieConsentProvider onConsentChange={onConsentChange}>
        <div>App</div>
      </CookieConsentProvider>,
    );
    await user.click(screen.getByRole("button", { name: "Reject All" }));
    expect(onConsentChange).toHaveBeenCalledWith({
      essential: true,
      functional: false,
      analytics: false,
      marketing: false,
    });
  });

  it("Manage Preferences opens modal", async () => {
    const user = userEvent.setup();
    render(
      <CookieConsentProvider>
        <div>App</div>
      </CookieConsentProvider>,
    );
    await user.click(screen.getByRole("button", { name: "Manage Preferences" }));
    expect(screen.getByText("Cookie Preferences")).toBeInTheDocument();
  });
});

describe("useCookieConsent", () => {
  function TestConsumer() {
    const { hasConsented, hasConsent, setShowPreferences } = useCookieConsent();
    return (
      <div>
        <span data-testid="consented">{String(hasConsented)}</span>
        <span data-testid="analytics">{String(hasConsent("analytics"))}</span>
        <button onClick={() => setShowPreferences(true)}>Open Prefs</button>
      </div>
    );
  }

  it("throws when used outside provider", () => {
    const spy = vi.spyOn(console, "error").mockImplementation(() => undefined);
    expect(() => render(<TestConsumer />)).toThrow(
      "useCookieConsent must be used within a CookieConsentProvider",
    );
    spy.mockRestore();
  });

  it("reports hasConsented=false before consent", () => {
    render(
      <CookieConsentProvider>
        <TestConsumer />
      </CookieConsentProvider>,
    );
    expect(screen.getByTestId("consented").textContent).toBe("false");
  });

  it("reports hasConsent accurately after accepting", async () => {
    const user = userEvent.setup();
    render(
      <CookieConsentProvider>
        <TestConsumer />
      </CookieConsentProvider>,
    );
    await user.click(screen.getByRole("button", { name: "Accept All" }));
    expect(screen.getByTestId("consented").textContent).toBe("true");
    expect(screen.getByTestId("analytics").textContent).toBe("true");
  });

  it("reports analytics=false after rejecting", async () => {
    const user = userEvent.setup();
    render(
      <CookieConsentProvider>
        <TestConsumer />
      </CookieConsentProvider>,
    );
    await user.click(screen.getByRole("button", { name: "Reject All" }));
    expect(screen.getByTestId("analytics").textContent).toBe("false");
  });

  it("opens preferences from hook", async () => {
    const user = userEvent.setup();
    document.cookie = `la-cookie-consent=${encodeURIComponent(JSON.stringify({ essential: true, functional: false, analytics: false, marketing: false }))}; path=/`;
    render(
      <CookieConsentProvider>
        <TestConsumer />
      </CookieConsentProvider>,
    );
    await user.click(screen.getByRole("button", { name: "Open Prefs" }));
    expect(screen.getByText("Cookie Preferences")).toBeInTheDocument();
  });
});

describe("ConsentGate", () => {
  it("renders children when consent is granted", async () => {
    const user = userEvent.setup();
    render(
      <CookieConsentProvider>
        <ConsentGate category="analytics">
          <span>Analytics Script</span>
        </ConsentGate>
      </CookieConsentProvider>,
    );
    expect(screen.queryByText("Analytics Script")).toBeNull();
    await user.click(screen.getByRole("button", { name: "Accept All" }));
    expect(screen.getByText("Analytics Script")).toBeInTheDocument();
  });

  it("renders fallback when consent is denied", async () => {
    const user = userEvent.setup();
    render(
      <CookieConsentProvider>
        <ConsentGate category="marketing" fallback={<span>Blocked</span>}>
          <span>Marketing Pixel</span>
        </ConsentGate>
      </CookieConsentProvider>,
    );
    await user.click(screen.getByRole("button", { name: "Reject All" }));
    expect(screen.queryByText("Marketing Pixel")).toBeNull();
    expect(screen.getByText("Blocked")).toBeInTheDocument();
  });
});

describe("DEFAULT_CATEGORIES", () => {
  it("has 4 categories: essential, functional, analytics, marketing", () => {
    expect(DEFAULT_CATEGORIES).toHaveLength(4);
    expect(DEFAULT_CATEGORIES.map((c) => c.id)).toEqual([
      "essential",
      "functional",
      "analytics",
      "marketing",
    ]);
  });

  it("essential is required and enabled by default", () => {
    const essential = DEFAULT_CATEGORIES.find((c) => c.id === "essential");
    expect(essential?.required).toBe(true);
    expect(essential?.enabled).toBe(true);
  });

  it("non-essential categories are disabled by default", () => {
    const nonEssential = DEFAULT_CATEGORIES.filter((c) => c.id !== "essential");
    for (const cat of nonEssential) {
      expect(cat.enabled).toBe(false);
    }
  });
});
