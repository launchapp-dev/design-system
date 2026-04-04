import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import * as React from "react";
import { CookieConsentBanner } from "./CookieConsentBanner";

describe("CookieConsentBanner", () => {
  it("renders when open", () => {
    render(<CookieConsentBanner open />);
    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });

  it("does not render when closed", () => {
    render(<CookieConsentBanner open={false} />);
    expect(screen.queryByRole("dialog")).toBeNull();
  });

  it("renders default title and description", () => {
    render(<CookieConsentBanner open />);
    expect(screen.getByText("We use cookies")).toBeInTheDocument();
    expect(
      screen.getByText(/enhance your browsing experience/)
    ).toBeInTheDocument();
  });

  it("renders custom title and description", () => {
    render(
      <CookieConsentBanner
        open
        title="Cookie Notice"
        description="Custom description."
      />
    );
    expect(screen.getByText("Cookie Notice")).toBeInTheDocument();
    expect(screen.getByText("Custom description.")).toBeInTheDocument();
  });

  it("renders privacy policy link when url provided", () => {
    render(<CookieConsentBanner open privacyPolicyUrl="/privacy" />);
    const link = screen.getByRole("link", { name: /learn more/i });
    expect(link).toHaveAttribute("href", "/privacy");
  });

  describe("action buttons", () => {
    it("calls onAcceptAll and onSavePreferences with all enabled", async () => {
      const user = userEvent.setup();
      const onAcceptAll = vi.fn();
      const onSavePreferences = vi.fn();
      render(
        <CookieConsentBanner
          open
          onAcceptAll={onAcceptAll}
          onSavePreferences={onSavePreferences}
        />
      );
      await user.click(screen.getByRole("button", { name: "Accept All" }));
      expect(onAcceptAll).toHaveBeenCalledOnce();
      expect(onSavePreferences).toHaveBeenCalledWith({
        essential: true,
        analytics: true,
        marketing: true,
      });
    });

    it("calls onRejectAll and onSavePreferences with essential only", async () => {
      const user = userEvent.setup();
      const onRejectAll = vi.fn();
      const onSavePreferences = vi.fn();
      render(
        <CookieConsentBanner
          open
          onRejectAll={onRejectAll}
          onSavePreferences={onSavePreferences}
        />
      );
      await user.click(screen.getByRole("button", { name: "Reject All" }));
      expect(onRejectAll).toHaveBeenCalledOnce();
      expect(onSavePreferences).toHaveBeenCalledWith({
        essential: true,
        analytics: false,
        marketing: false,
      });
    });

    it("calls onCustomize when provided", async () => {
      const user = userEvent.setup();
      const onCustomize = vi.fn();
      render(<CookieConsentBanner open onCustomize={onCustomize} />);
      await user.click(screen.getByRole("button", { name: "Customize" }));
      expect(onCustomize).toHaveBeenCalledOnce();
    });
  });

  describe("inline preferences", () => {
    it("shows preference toggles when Customize is clicked without onCustomize", async () => {
      const user = userEvent.setup();
      render(<CookieConsentBanner open />);
      await user.click(screen.getByRole("button", { name: "Customize" }));
      expect(
        screen.getByRole("switch", { name: /Essential cookies/i })
      ).toBeInTheDocument();
      expect(
        screen.getByRole("switch", { name: /Analytics cookies/i })
      ).toBeInTheDocument();
      expect(
        screen.getByRole("switch", { name: /Marketing cookies/i })
      ).toBeInTheDocument();
    });

    it("essential switch is disabled", async () => {
      const user = userEvent.setup();
      render(<CookieConsentBanner open />);
      await user.click(screen.getByRole("button", { name: "Customize" }));
      expect(
        screen.getByRole("switch", { name: /Essential cookies/i })
      ).toBeDisabled();
    });

    it("toggles analytics preference", async () => {
      const user = userEvent.setup();
      render(<CookieConsentBanner open />);
      await user.click(screen.getByRole("button", { name: "Customize" }));
      const analyticsSwitch = screen.getByRole("switch", {
        name: /Analytics cookies/i,
      });
      expect(analyticsSwitch).toHaveAttribute("aria-checked", "false");
      await user.click(analyticsSwitch);
      expect(analyticsSwitch).toHaveAttribute("aria-checked", "true");
    });

    it("saves custom preferences", async () => {
      const user = userEvent.setup();
      const onSavePreferences = vi.fn();
      render(
        <CookieConsentBanner open onSavePreferences={onSavePreferences} />
      );
      await user.click(screen.getByRole("button", { name: "Customize" }));
      await user.click(
        screen.getByRole("switch", { name: /Analytics cookies/i })
      );
      await user.click(
        screen.getByRole("button", { name: "Save Preferences" })
      );
      expect(onSavePreferences).toHaveBeenCalledWith({
        essential: true,
        analytics: true,
        marketing: false,
      });
    });
  });

  describe("compact mode", () => {
    it("renders Accept and Reject buttons in compact mode", () => {
      render(<CookieConsentBanner open compact />);
      expect(
        screen.getByRole("button", { name: "Accept" })
      ).toBeInTheDocument();
      expect(
        screen.getByRole("button", { name: "Reject" })
      ).toBeInTheDocument();
    });

    it("does not render Customize button in compact mode", () => {
      render(<CookieConsentBanner open compact />);
      expect(
        screen.queryByRole("button", { name: "Customize" })
      ).toBeNull();
    });

    it("renders privacy policy link in compact mode", () => {
      render(<CookieConsentBanner open compact privacyPolicyUrl="/privacy" />);
      const link = screen.getByRole("link", { name: /privacy policy/i });
      expect(link).toHaveAttribute("href", "/privacy");
    });
  });

  describe("position", () => {
    it("defaults to bottom position", () => {
      render(<CookieConsentBanner open />);
      const banner = screen.getByRole("dialog");
      expect(banner.className).toContain("bottom-0");
    });

    it("supports top position", () => {
      render(<CookieConsentBanner open position="top" />);
      const banner = screen.getByRole("dialog");
      expect(banner.className).toContain("top-0");
    });
  });

  describe("accessibility", () => {
    it("has dialog role with aria-label", () => {
      render(<CookieConsentBanner open />);
      expect(
        screen.getByRole("dialog", { name: "We use cookies" })
      ).toBeInTheDocument();
    });

    it("has aria-describedby pointing to description", () => {
      render(<CookieConsentBanner open />);
      const dialog = screen.getByRole("dialog");
      expect(dialog).toHaveAttribute(
        "aria-describedby",
        "cookie-banner-description"
      );
      expect(
        document.getElementById("cookie-banner-description")
      ).toBeInTheDocument();
    });
  });

  describe("dark mode", () => {
    it("renders in dark mode context", () => {
      document.documentElement.classList.add("dark");
      render(<CookieConsentBanner open />);
      expect(screen.getByRole("dialog")).toBeInTheDocument();
      document.documentElement.classList.remove("dark");
    });
  });
});
