import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import * as React from "react";
import { CookieConsentBanner, CookieSettingsButton, LAUNCHAPP_CATEGORIES } from "./CookieConsentBanner";

describe("LAUNCHAPP_CATEGORIES", () => {
  it("has exactly 3 categories", () => {
    expect(LAUNCHAPP_CATEGORIES).toHaveLength(3);
  });

  it("includes essential, analytics, and marketing", () => {
    const ids = LAUNCHAPP_CATEGORIES.map((c) => c.id);
    expect(ids).toContain("essential");
    expect(ids).toContain("analytics");
    expect(ids).toContain("marketing");
  });

  it("marks essential as required", () => {
    const essential = LAUNCHAPP_CATEGORIES.find((c) => c.id === "essential");
    expect(essential?.required).toBe(true);
  });

  it("marks analytics and marketing as not required", () => {
    const analytics = LAUNCHAPP_CATEGORIES.find((c) => c.id === "analytics");
    const marketing = LAUNCHAPP_CATEGORIES.find((c) => c.id === "marketing");
    expect(analytics?.required).toBeFalsy();
    expect(marketing?.required).toBeFalsy();
  });
});

describe("CookieConsentBanner", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  function renderAndShow(props?: Partial<React.ComponentProps<typeof CookieConsentBanner>>) {
    const onConsent = vi.fn();
    render(<CookieConsentBanner show={true} onConsent={onConsent} {...props} />);
    act(() => { vi.advanceTimersByTime(300); });
    vi.useRealTimers();
    return { onConsent, user: userEvent.setup() };
  }

  it("does not render when show is false", () => {
    render(<CookieConsentBanner show={false} onConsent={() => undefined} />);
    act(() => { vi.advanceTimersByTime(300); });
    expect(screen.queryByRole("dialog")).toBeNull();
  });

  it("renders after delay when show is true", () => {
    render(<CookieConsentBanner show={true} onConsent={() => undefined} />);
    expect(screen.queryByRole("dialog")).toBeNull();
    act(() => { vi.advanceTimersByTime(300); });
    expect(screen.getByRole("dialog")).toBeInTheDocument();
    vi.useRealTimers();
  });

  describe("initial state (compact)", () => {
    it("shows Accept All, Reject All, and Customize buttons", () => {
      renderAndShow();
      expect(screen.getByRole("button", { name: "Accept All" })).toBeInTheDocument();
      expect(screen.getByRole("button", { name: "Reject All" })).toBeInTheDocument();
      expect(screen.getByRole("button", { name: "Customize" })).toBeInTheDocument();
    });

    it("does not show category switches in compact mode", () => {
      renderAndShow();
      expect(screen.queryByRole("switch")).toBeNull();
    });

    it("shows cookie policy link with default href", () => {
      renderAndShow();
      const link = screen.getByRole("link", { name: "Cookie Policy" });
      expect(link).toHaveAttribute("href", "/cookie-policy");
    });

    it("uses custom policyHref when provided", () => {
      renderAndShow({ policyHref: "/privacy" });
      const link = screen.getByRole("link", { name: "Cookie Policy" });
      expect(link).toHaveAttribute("href", "/privacy");
    });
  });

  describe("Customize mode", () => {
    it("shows category switches after clicking Customize", async () => {
      const { user } = renderAndShow();
      await user.click(screen.getByRole("button", { name: "Customize" }));
      expect(screen.getAllByRole("switch").length).toBeGreaterThan(0);
    });

    it("renders switches for all default categories", async () => {
      const { user } = renderAndShow();
      await user.click(screen.getByRole("button", { name: "Customize" }));
      expect(screen.getByRole("switch", { name: /Essential cookies/i })).toBeInTheDocument();
      expect(screen.getByRole("switch", { name: /Analytics cookies/i })).toBeInTheDocument();
      expect(screen.getByRole("switch", { name: /Marketing cookies/i })).toBeInTheDocument();
    });

    it("disables essential switch", async () => {
      const { user } = renderAndShow();
      await user.click(screen.getByRole("button", { name: "Customize" }));
      expect(screen.getByRole("switch", { name: /Essential cookies/i })).toBeDisabled();
    });

    it("shows Save Preferences button in customize mode", async () => {
      const { user } = renderAndShow();
      await user.click(screen.getByRole("button", { name: "Customize" }));
      expect(screen.getByRole("button", { name: "Save Preferences" })).toBeInTheDocument();
    });
  });

  describe("Accept All", () => {
    it("calls onConsent with all categories enabled", async () => {
      const { user, onConsent } = renderAndShow();
      await user.click(screen.getByRole("button", { name: "Accept All" }));
      expect(onConsent).toHaveBeenCalledOnce();
      const prefs = onConsent.mock.calls[0][0] as Record<string, boolean>;
      expect(prefs.essential).toBe(true);
      expect(prefs.analytics).toBe(true);
      expect(prefs.marketing).toBe(true);
    });

    it("hides the banner after accepting", async () => {
      const { user } = renderAndShow();
      await user.click(screen.getByRole("button", { name: "Accept All" }));
      expect(screen.queryByRole("dialog")).toBeNull();
    });
  });

  describe("Reject All", () => {
    it("calls onConsent with only required categories enabled", async () => {
      const { user, onConsent } = renderAndShow();
      await user.click(screen.getByRole("button", { name: "Reject All" }));
      expect(onConsent).toHaveBeenCalledOnce();
      const prefs = onConsent.mock.calls[0][0] as Record<string, boolean>;
      expect(prefs.essential).toBe(true);
      expect(prefs.analytics).toBe(false);
      expect(prefs.marketing).toBe(false);
    });
  });

  describe("Save Preferences (custom)", () => {
    it("passes toggled preferences to onConsent", async () => {
      const { user, onConsent } = renderAndShow();
      await user.click(screen.getByRole("button", { name: "Customize" }));
      await user.click(screen.getByRole("switch", { name: /Analytics cookies/i }));
      await user.click(screen.getByRole("button", { name: "Save Preferences" }));
      const prefs = onConsent.mock.calls[0][0] as Record<string, boolean>;
      expect(prefs.essential).toBe(true);
      expect(prefs.analytics).toBe(true);
      expect(prefs.marketing).toBe(false);
    });

    it("always forces required categories to true", async () => {
      const { user, onConsent } = renderAndShow();
      await user.click(screen.getByRole("button", { name: "Customize" }));
      await user.click(screen.getByRole("button", { name: "Save Preferences" }));
      const prefs = onConsent.mock.calls[0][0] as Record<string, boolean>;
      expect(prefs.essential).toBe(true);
    });
  });

  describe("custom categories", () => {
    it("renders custom category names in customize mode", async () => {
      const { user } = renderAndShow({
        categories: [
          { id: "core", name: "Core", description: "Required.", required: true, enabled: true },
          { id: "stats", name: "Statistics", description: "For stats.", required: false, enabled: false },
        ],
      });
      await user.click(screen.getByRole("button", { name: "Customize" }));
      expect(screen.getByText("Core")).toBeInTheDocument();
      expect(screen.getByText("Statistics")).toBeInTheDocument();
    });
  });
});

describe("CookieSettingsButton", () => {
  it("renders with default label", () => {
    render(<CookieSettingsButton onClick={() => undefined} />);
    expect(screen.getByRole("button", { name: "Cookie Settings" })).toBeInTheDocument();
  });

  it("renders custom children", () => {
    render(<CookieSettingsButton onClick={() => undefined}>Manage Cookies</CookieSettingsButton>);
    expect(screen.getByRole("button", { name: "Manage Cookies" })).toBeInTheDocument();
  });

  it("calls onClick when clicked", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(<CookieSettingsButton onClick={onClick} />);
    await user.click(screen.getByRole("button", { name: "Cookie Settings" }));
    expect(onClick).toHaveBeenCalledOnce();
  });

  it("applies custom className", () => {
    render(<CookieSettingsButton onClick={() => undefined} className="custom-class" />);
    expect(screen.getByRole("button")).toHaveClass("custom-class");
  });
});
