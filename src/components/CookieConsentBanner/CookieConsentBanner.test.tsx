import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import * as React from "react";
import { CookieConsentBanner } from "./CookieConsentBanner";

describe("CookieConsentBanner", () => {
  it("renders banner region when visible", () => {
    render(<CookieConsentBanner visible />);
    expect(screen.getByRole("region", { name: /cookie consent/i })).toBeInTheDocument();
  });

  it("does not render when visible=false", () => {
    render(<CookieConsentBanner visible={false} />);
    expect(screen.queryByRole("region", { name: /cookie consent/i })).toBeNull();
  });

  it("renders title and description", () => {
    render(<CookieConsentBanner visible title="Custom Title" description="Custom desc" />);
    expect(screen.getByText("Custom Title")).toBeInTheDocument();
    expect(screen.getByText("Custom desc")).toBeInTheDocument();
  });

  it("renders Accept All, Reject All, and Customize buttons", () => {
    render(<CookieConsentBanner visible />);
    expect(screen.getByRole("button", { name: "Accept All" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Reject All" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Customize" })).toBeInTheDocument();
  });

  it("calls onAcceptAll when Accept All is clicked", async () => {
    const user = userEvent.setup();
    const onAcceptAll = vi.fn();
    render(<CookieConsentBanner visible onAcceptAll={onAcceptAll} />);
    await user.click(screen.getByRole("button", { name: "Accept All" }));
    expect(onAcceptAll).toHaveBeenCalledOnce();
  });

  it("calls onRejectAll when Reject All is clicked", async () => {
    const user = userEvent.setup();
    const onRejectAll = vi.fn();
    render(<CookieConsentBanner visible onRejectAll={onRejectAll} />);
    await user.click(screen.getByRole("button", { name: "Reject All" }));
    expect(onRejectAll).toHaveBeenCalledOnce();
  });

  it("shows customize panel when Customize is clicked", async () => {
    const user = userEvent.setup();
    render(<CookieConsentBanner visible />);
    await user.click(screen.getByRole("button", { name: "Customize" }));
    expect(screen.getByText("Cookie Preferences")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Save Preferences" })).toBeInTheDocument();
  });

  it("renders category switches in customize panel", async () => {
    const user = userEvent.setup();
    render(<CookieConsentBanner visible />);
    await user.click(screen.getByRole("button", { name: "Customize" }));
    expect(screen.getByRole("switch", { name: /Essential cookies/i })).toBeInTheDocument();
    expect(screen.getByRole("switch", { name: /Analytics cookies/i })).toBeInTheDocument();
    expect(screen.getByRole("switch", { name: /Marketing cookies/i })).toBeInTheDocument();
  });

  it("calls onCustomize with preferences when Save Preferences clicked", async () => {
    const user = userEvent.setup();
    const onCustomize = vi.fn();
    render(<CookieConsentBanner visible onCustomize={onCustomize} />);
    await user.click(screen.getByRole("button", { name: "Customize" }));
    await user.click(screen.getByRole("switch", { name: /Analytics cookies/i }));
    await user.click(screen.getByRole("button", { name: "Save Preferences" }));
    expect(onCustomize).toHaveBeenCalledOnce();
    const prefs = onCustomize.mock.calls[0][0] as Record<string, boolean>;
    expect(prefs.analytics).toBe(true);
    expect(prefs.essential).toBe(true);
  });

  it("essential switch is disabled in customize panel", async () => {
    const user = userEvent.setup();
    render(<CookieConsentBanner visible />);
    await user.click(screen.getByRole("button", { name: "Customize" }));
    expect(screen.getByRole("switch", { name: /Essential cookies/i })).toBeDisabled();
  });

  it("Back button returns to default banner view", async () => {
    const user = userEvent.setup();
    render(<CookieConsentBanner visible />);
    await user.click(screen.getByRole("button", { name: "Customize" }));
    await user.click(screen.getByRole("button", { name: /back/i }));
    expect(screen.getByRole("button", { name: "Accept All" })).toBeInTheDocument();
  });
});
