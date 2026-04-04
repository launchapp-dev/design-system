import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";
import { CookieConsent } from "./CookieConsent";

describe("CookieConsent", () => {
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
      render(
        <CookieConsent
          open
          onOpenChange={() => undefined}
          title="Privacy Settings"
        />,
      );
      expect(screen.getByText("Privacy Settings")).toBeInTheDocument();
    });

    it("renders custom description", () => {
      render(
        <CookieConsent
          open
          onOpenChange={() => undefined}
          description="Control your data."
        />,
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
        />,
      );
      expect(screen.getByText("Essential")).toBeInTheDocument();
      expect(screen.getByText("Advertising")).toBeInTheDocument();
    });
  });

  describe("ARIA attributes", () => {
    it("renders switches with aria-labels", () => {
      render(<CookieConsent open onOpenChange={() => undefined} />);
      expect(
        screen.getByRole("switch", { name: /Necessary cookies/i }),
      ).toBeInTheDocument();
      expect(
        screen.getByRole("switch", { name: /Analytics cookies/i }),
      ).toBeInTheDocument();
      expect(
        screen.getByRole("switch", { name: /Marketing cookies/i }),
      ).toBeInTheDocument();
    });

    it("disables switch for required category", () => {
      render(<CookieConsent open onOpenChange={() => undefined} />);
      expect(
        screen.getByRole("switch", { name: /Necessary cookies/i }),
      ).toBeDisabled();
    });

    it("enables switch for non-required categories", () => {
      render(<CookieConsent open onOpenChange={() => undefined} />);
      expect(
        screen.getByRole("switch", { name: /Analytics cookies/i }),
      ).not.toBeDisabled();
    });
  });

  describe("action buttons", () => {
    it("calls onAcceptAll and closes dialog when Accept All is clicked", async () => {
      const user = userEvent.setup();
      const onAcceptAll = vi.fn();
      const onOpenChange = vi.fn();
      render(
        <CookieConsent
          open
          onOpenChange={onOpenChange}
          onAcceptAll={onAcceptAll}
        />,
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
        <CookieConsent
          open
          onOpenChange={onOpenChange}
          onRejectAll={onRejectAll}
        />,
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
        />,
      );
      await user.click(
        screen.getByRole("button", { name: "Save Preferences" }),
      );
      expect(onSavePreferences).toHaveBeenCalledOnce();
      expect(onOpenChange).toHaveBeenCalledWith(false);
      const prefs = onSavePreferences.mock.calls[0][0] as Record<
        string,
        boolean
      >;
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
        />,
      );
      await user.click(
        screen.getByRole("switch", { name: /Analytics cookies/i }),
      );
      await user.click(
        screen.getByRole("button", { name: "Save Preferences" }),
      );
      const prefs = onSavePreferences.mock.calls[0][0] as Record<
        string,
        boolean
      >;
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
      expect(
        screen.getByRole("button", { name: /close/i }),
      ).toBeInTheDocument();
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
