import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import * as React from "react";
import {
  CookieConsent,
  CookieConsentBanner,
  CookieConsentProvider,
  CookiePreferencesModal,
  useCookieConsent,
} from "./CookieConsent";

beforeEach(() => {
  localStorage.clear();
});

describe("CookieConsent (backward-compatible modal)", () => {
  it("renders dialog role when open", () => {
    render(<CookieConsent open onOpenChange={() => undefined} />);
    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });

  it("does not render dialog when closed", () => {
    render(<CookieConsent open={false} onOpenChange={() => undefined} />);
    expect(screen.queryByRole("dialog")).toBeNull();
  });

  describe("title and description", () => {
    it("renders default title", () => {
      render(<CookieConsent open onOpenChange={() => undefined} />);
      expect(screen.getByText("Cookie Preferences")).toBeInTheDocument();
    });

    it("renders custom title", () => {
      render(<CookieConsent open onOpenChange={() => undefined} title="Privacy Settings" />);
      expect(screen.getByText("Privacy Settings")).toBeInTheDocument();
    });

    it("renders custom description", () => {
      render(
        <CookieConsent
          open
          onOpenChange={() => undefined}
          description="Control your data."
        />
      );
      expect(screen.getByText("Control your data.")).toBeInTheDocument();
    });
  });

  describe("categories", () => {
    it("renders all default category names", () => {
      render(<CookieConsent open onOpenChange={() => undefined} />);
      expect(screen.getByText("Necessary")).toBeInTheDocument();
      expect(screen.getByText("Analytics")).toBeInTheDocument();
      expect(screen.getByText("Marketing")).toBeInTheDocument();
      expect(screen.getByText("Preferences")).toBeInTheDocument();
    });

    it("renders custom categories", () => {
      render(
        <CookieConsent
          open
          onOpenChange={() => undefined}
          categories={[
            {
              id: "essential",
              name: "Essential",
              description: "Required.",
              required: true,
              enabled: true,
            },
            {
              id: "ads",
              name: "Advertising",
              description: "For ads.",
              required: false,
              enabled: false,
            },
          ]}
        />
      );
      expect(screen.getByText("Essential")).toBeInTheDocument();
      expect(screen.getByText("Advertising")).toBeInTheDocument();
    });
  });

  describe("ARIA attributes", () => {
    it("renders switches with aria-labels", () => {
      render(<CookieConsent open onOpenChange={() => undefined} />);
      expect(
        screen.getByRole("switch", { name: /Necessary cookies/i })
      ).toBeInTheDocument();
      expect(
        screen.getByRole("switch", { name: /Analytics cookies/i })
      ).toBeInTheDocument();
      expect(
        screen.getByRole("switch", { name: /Marketing cookies/i })
      ).toBeInTheDocument();
    });

    it("disables switch for required category", () => {
      render(<CookieConsent open onOpenChange={() => undefined} />);
      expect(
        screen.getByRole("switch", { name: /Necessary cookies/i })
      ).toBeDisabled();
    });

    it("enables switch for non-required categories", () => {
      render(<CookieConsent open onOpenChange={() => undefined} />);
      expect(
        screen.getByRole("switch", { name: /Analytics cookies/i })
      ).not.toBeDisabled();
    });
  });

  describe("action buttons", () => {
    it("calls onAcceptAll and closes dialog when Accept All is clicked", async () => {
      const user = userEvent.setup();
      const onAcceptAll = vi.fn();
      const onOpenChange = vi.fn();
      render(
        <CookieConsent open onOpenChange={onOpenChange} onAcceptAll={onAcceptAll} />
      );
      await user.click(screen.getByRole("button", { name: "Accept All" }));
      expect(onAcceptAll).toHaveBeenCalledOnce();
      expect(onOpenChange).toHaveBeenCalledWith(false);
    });

    it("calls onRejectAll and closes dialog when Reject All is clicked", async () => {
      const user = userEvent.setup();
      const onRejectAll = vi.fn();
      const onOpenChange = vi.fn();
      render(
        <CookieConsent open onOpenChange={onOpenChange} onRejectAll={onRejectAll} />
      );
      await user.click(screen.getByRole("button", { name: "Reject All" }));
      expect(onRejectAll).toHaveBeenCalledOnce();
      expect(onOpenChange).toHaveBeenCalledWith(false);
    });

    it("calls onSavePreferences with preferences and closes dialog", async () => {
      const user = userEvent.setup();
      const onSavePreferences = vi.fn();
      const onOpenChange = vi.fn();
      render(
        <CookieConsent
          open
          onOpenChange={onOpenChange}
          onSavePreferences={onSavePreferences}
        />
      );
      await user.click(screen.getByRole("button", { name: "Save Preferences" }));
      expect(onSavePreferences).toHaveBeenCalledOnce();
      expect(onOpenChange).toHaveBeenCalledWith(false);
      const prefs = onSavePreferences.mock.calls[0][0] as Record<string, boolean>;
      expect(prefs.necessary).toBe(true);
    });
  });

  describe("keyboard navigation and interaction", () => {
    it("toggles non-required switch via click", async () => {
      const user = userEvent.setup();
      render(<CookieConsent open onOpenChange={() => undefined} />);
      const analyticsSwitch = screen.getByRole("switch", {
        name: /Analytics cookies/i,
      });
      expect(analyticsSwitch).toHaveAttribute("data-state", "unchecked");
      await user.click(analyticsSwitch);
      expect(analyticsSwitch).toHaveAttribute("data-state", "checked");
    });

    it("toggles switch via Space key", async () => {
      const user = userEvent.setup();
      render(<CookieConsent open onOpenChange={() => undefined} />);
      const marketingSwitch = screen.getByRole("switch", {
        name: /Marketing cookies/i,
      });
      marketingSwitch.focus();
      await user.keyboard(" ");
      expect(marketingSwitch).toHaveAttribute("data-state", "checked");
    });

    it("updated preferences are passed to onSavePreferences after toggling", async () => {
      const user = userEvent.setup();
      const onSavePreferences = vi.fn();
      render(
        <CookieConsent
          open
          onOpenChange={() => undefined}
          onSavePreferences={onSavePreferences}
        />
      );
      await user.click(
        screen.getByRole("switch", { name: /Analytics cookies/i })
      );
      await user.click(screen.getByRole("button", { name: "Save Preferences" }));
      const prefs = onSavePreferences.mock.calls[0][0] as Record<string, boolean>;
      expect(prefs.analytics).toBe(true);
    });

    it("Escape key calls onOpenChange with false", async () => {
      const user = userEvent.setup();
      const onOpenChange = vi.fn();
      render(<CookieConsent open onOpenChange={onOpenChange} />);
      await user.keyboard("{Escape}");
      expect(onOpenChange).toHaveBeenCalledWith(false);
    });
  });

  describe("close button", () => {
    it("renders close button", () => {
      render(<CookieConsent open onOpenChange={() => undefined} />);
      expect(screen.getByRole("button", { name: /close/i })).toBeInTheDocument();
    });

    it("calls onOpenChange(false) when close button is clicked", async () => {
      const user = userEvent.setup();
      const onOpenChange = vi.fn();
      render(<CookieConsent open onOpenChange={onOpenChange} />);
      await user.click(screen.getByRole("button", { name: /close/i }));
      expect(onOpenChange).toHaveBeenCalledWith(false);
    });
  });

  describe("focus management", () => {
    it("focuses an element within dialog on open", () => {
      render(<CookieConsent open onOpenChange={() => undefined} />);
      const dialog = screen.getByRole("dialog");
      expect(dialog.contains(document.activeElement)).toBe(true);
    });
  });

  describe("dark mode", () => {
    afterEach(() => {
      document.documentElement.classList.remove("dark");
    });

    it("renders dialog in dark mode context", () => {
      document.documentElement.classList.add("dark");
      render(<CookieConsent open onOpenChange={() => undefined} />);
      expect(screen.getByRole("dialog")).toBeInTheDocument();
    });
  });
});

describe("CookieConsentBanner", () => {
  it("renders banner when no provider (always visible)", () => {
    render(<CookieConsentBanner />);
    expect(screen.getByRole("region", { name: /cookie consent/i })).toBeInTheDocument();
  });

  it("renders default title and description", () => {
    render(<CookieConsentBanner />);
    expect(screen.getByText("We use cookies")).toBeInTheDocument();
  });

  it("renders custom title and description", () => {
    render(<CookieConsentBanner title="Privacy" description="We care." />);
    expect(screen.getByText("Privacy")).toBeInTheDocument();
    expect(screen.getByText("We care.")).toBeInTheDocument();
  });

  it("renders Accept All, Customize, and Reject All buttons by default", () => {
    render(<CookieConsentBanner />);
    expect(screen.getByRole("button", { name: "Accept All" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Customize" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Reject All" })).toBeInTheDocument();
  });

  it("hides Reject All when showReject is false", () => {
    render(<CookieConsentBanner showReject={false} />);
    expect(screen.queryByRole("button", { name: "Reject All" })).toBeNull();
  });

  it("renders custom button labels", () => {
    render(
      <CookieConsentBanner
        acceptLabel="OK"
        rejectLabel="No Thanks"
        customizeLabel="Settings"
      />
    );
    expect(screen.getByRole("button", { name: "OK" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "No Thanks" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Settings" })).toBeInTheDocument();
  });
});

describe("CookieConsentProvider + useCookieConsent", () => {
  function HookConsumer() {
    const { state, preferences, showBanner } = useCookieConsent();
    return (
      <div>
        <span data-testid="state">{state}</span>
        <span data-testid="banner">{showBanner ? "visible" : "hidden"}</span>
        <span data-testid="prefs">{JSON.stringify(preferences)}</span>
      </div>
    );
  }

  it("throws when used outside provider", () => {
    const spy = vi.spyOn(console, "error").mockImplementation(() => {});
    expect(() => render(<HookConsumer />)).toThrow(
      "useCookieConsent must be used within a CookieConsentProvider"
    );
    spy.mockRestore();
  });

  it("starts with undecided state and banner visible", () => {
    render(
      <CookieConsentProvider>
        <HookConsumer />
      </CookieConsentProvider>
    );
    expect(screen.getByTestId("state").textContent).toBe("undecided");
    expect(screen.getByTestId("banner").textContent).toBe("visible");
  });

  it("acceptAll sets accepted state and persists to localStorage", async () => {
    function AcceptButton() {
      const { acceptAll } = useCookieConsent();
      return <button onClick={acceptAll}>accept</button>;
    }
    const user = userEvent.setup();
    render(
      <CookieConsentProvider>
        <HookConsumer />
        <AcceptButton />
      </CookieConsentProvider>
    );
    await user.click(screen.getByRole("button", { name: "accept" }));
    expect(screen.getByTestId("state").textContent).toBe("accepted");
    expect(screen.getByTestId("banner").textContent).toBe("hidden");
    const stored = JSON.parse(localStorage.getItem("la-cookie-consent")!);
    expect(stored.state).toBe("accepted");
  });

  it("rejectAll sets rejected state with only required cookies", async () => {
    function RejectButton() {
      const { rejectAll } = useCookieConsent();
      return <button onClick={rejectAll}>reject</button>;
    }
    const user = userEvent.setup();
    render(
      <CookieConsentProvider>
        <HookConsumer />
        <RejectButton />
      </CookieConsentProvider>
    );
    await user.click(screen.getByRole("button", { name: "reject" }));
    expect(screen.getByTestId("state").textContent).toBe("rejected");
    const prefs = JSON.parse(screen.getByTestId("prefs").textContent!);
    expect(prefs.necessary).toBe(true);
    expect(prefs.analytics).toBe(false);
    expect(prefs.marketing).toBe(false);
  });

  it("savePreferences sets custom state", async () => {
    function SaveButton() {
      const { savePreferences } = useCookieConsent();
      return (
        <button onClick={() => savePreferences({ necessary: true, analytics: true, marketing: false, preferences: false })}>
          save
        </button>
      );
    }
    const user = userEvent.setup();
    render(
      <CookieConsentProvider>
        <HookConsumer />
        <SaveButton />
      </CookieConsentProvider>
    );
    await user.click(screen.getByRole("button", { name: "save" }));
    expect(screen.getByTestId("state").textContent).toBe("custom");
    const prefs = JSON.parse(screen.getByTestId("prefs").textContent!);
    expect(prefs.analytics).toBe(true);
    expect(prefs.marketing).toBe(false);
  });

  it("reset clears state back to undecided and removes localStorage", async () => {
    function Controls() {
      const { acceptAll, reset } = useCookieConsent();
      return (
        <>
          <button onClick={acceptAll}>accept</button>
          <button onClick={reset}>reset</button>
        </>
      );
    }
    const user = userEvent.setup();
    render(
      <CookieConsentProvider>
        <HookConsumer />
        <Controls />
      </CookieConsentProvider>
    );
    await user.click(screen.getByRole("button", { name: "accept" }));
    expect(screen.getByTestId("state").textContent).toBe("accepted");
    await user.click(screen.getByRole("button", { name: "reset" }));
    expect(screen.getByTestId("state").textContent).toBe("undecided");
    expect(localStorage.getItem("la-cookie-consent")).toBeNull();
  });

  it("restores state from localStorage on mount", () => {
    localStorage.setItem(
      "la-cookie-consent",
      JSON.stringify({ state: "accepted", preferences: { necessary: true, analytics: true, marketing: true, preferences: true } })
    );
    render(
      <CookieConsentProvider>
        <HookConsumer />
      </CookieConsentProvider>
    );
    expect(screen.getByTestId("state").textContent).toBe("accepted");
    expect(screen.getByTestId("banner").textContent).toBe("hidden");
  });

  it("calls onConsentChange callback", async () => {
    const onConsentChange = vi.fn();
    function AcceptButton() {
      const { acceptAll } = useCookieConsent();
      return <button onClick={acceptAll}>accept</button>;
    }
    const user = userEvent.setup();
    render(
      <CookieConsentProvider onConsentChange={onConsentChange}>
        <AcceptButton />
      </CookieConsentProvider>
    );
    await user.click(screen.getByRole("button", { name: "accept" }));
    expect(onConsentChange).toHaveBeenCalledWith("accepted", expect.objectContaining({ necessary: true }));
  });
});

describe("CookieConsentBanner within Provider", () => {
  it("hides banner after accepting", async () => {
    const user = userEvent.setup();
    render(
      <CookieConsentProvider>
        <CookieConsentBanner />
      </CookieConsentProvider>
    );
    expect(screen.getByRole("region", { name: /cookie consent/i })).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "Accept All" }));
    expect(screen.queryByRole("region", { name: /cookie consent/i })).toBeNull();
  });

  it("hides banner after rejecting", async () => {
    const user = userEvent.setup();
    render(
      <CookieConsentProvider>
        <CookieConsentBanner />
      </CookieConsentProvider>
    );
    await user.click(screen.getByRole("button", { name: "Reject All" }));
    expect(screen.queryByRole("region", { name: /cookie consent/i })).toBeNull();
  });
});

describe("CookiePreferencesModal within Provider", () => {
  it("opens when openPreferences is called from provider", async () => {
    function OpenButton() {
      const { openPreferences } = useCookieConsent();
      return <button onClick={openPreferences}>open prefs</button>;
    }
    const user = userEvent.setup();
    render(
      <CookieConsentProvider>
        <OpenButton />
        <CookiePreferencesModal />
      </CookieConsentProvider>
    );
    expect(screen.queryByRole("dialog")).toBeNull();
    await user.click(screen.getByRole("button", { name: "open prefs" }));
    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });
});
