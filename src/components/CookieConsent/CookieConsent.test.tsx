import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import * as React from "react";
import { CookieConsent, DEFAULT_CATEGORIES } from "./CookieConsent";

describe("CookieConsent", () => {
  it("renders the dialog title when open", () => {
    render(<CookieConsent open={true} onOpenChange={() => undefined} />);
    expect(screen.getByText("Cookie Preferences")).toBeInTheDocument();
  });

  it("renders default category names", () => {
    render(<CookieConsent open={true} onOpenChange={() => undefined} />);
    expect(screen.getByText("Necessary")).toBeInTheDocument();
    expect(screen.getByText("Analytics")).toBeInTheDocument();
    expect(screen.getByText("Marketing")).toBeInTheDocument();
    expect(screen.getByText("Preferences")).toBeInTheDocument();
  });

  it("renders custom title and description", () => {
    render(
      <CookieConsent
        open={true}
        onOpenChange={() => undefined}
        title="Privacy Settings"
        description="Control your data."
      />
    );
    expect(screen.getByText("Privacy Settings")).toBeInTheDocument();
    expect(screen.getByText("Control your data.")).toBeInTheDocument();
  });

  it("calls onAcceptAll when Accept All is clicked", () => {
    const onAcceptAll = vi.fn();
    const onOpenChange = vi.fn();
    render(
      <CookieConsent
        open={true}
        onOpenChange={onOpenChange}
        onAcceptAll={onAcceptAll}
      />
    );
    fireEvent.click(screen.getByText("Accept All"));
    expect(onAcceptAll).toHaveBeenCalledOnce();
  });

  it("calls onRejectAll when Reject All is clicked", () => {
    const onRejectAll = vi.fn();
    const onOpenChange = vi.fn();
    render(
      <CookieConsent
        open={true}
        onOpenChange={onOpenChange}
        onRejectAll={onRejectAll}
      />
    );
    fireEvent.click(screen.getByText("Reject All"));
    expect(onRejectAll).toHaveBeenCalledOnce();
  });

  it("calls onSavePreferences with current preferences when Save Preferences is clicked", () => {
    const onSavePreferences = vi.fn();
    const onOpenChange = vi.fn();
    render(
      <CookieConsent
        open={true}
        onOpenChange={onOpenChange}
        onSavePreferences={onSavePreferences}
      />
    );
    fireEvent.click(screen.getByText("Save Preferences"));
    expect(onSavePreferences).toHaveBeenCalledOnce();
    const prefs = onSavePreferences.mock.calls[0][0] as Record<string, boolean>;
    expect(prefs).toHaveProperty("necessary", true);
  });

  it("marks required category switch as disabled", () => {
    render(<CookieConsent open={true} onOpenChange={() => undefined} />);
    const necessarySwitch = screen.getByRole("switch", { name: /Necessary cookies/i });
    expect(necessarySwitch).toBeDisabled();
  });

  it("does not render dialog content when closed", () => {
    render(<CookieConsent open={false} onOpenChange={() => undefined} />);
    expect(screen.queryByText("Cookie Preferences")).toBeNull();
  });

  it("renders custom categories", () => {
    render(
      <CookieConsent
        open={true}
        onOpenChange={() => undefined}
        categories={[
          { id: "essential", name: "Essential", description: "Required.", required: true, enabled: true },
          { id: "ads", name: "Advertising", description: "For ads.", required: false, enabled: false },
        ]}
      />
    );
    expect(screen.getByText("Essential")).toBeInTheDocument();
    expect(screen.getByText("Advertising")).toBeInTheDocument();
  });
});
