import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { CookiePreferencesDialog } from "./CookiePreferencesDialog";

describe("CookiePreferencesDialog", () => {
  it("renders dialog when open", () => {
    render(<CookiePreferencesDialog open onOpenChange={() => undefined} />);
    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });

  it("does not render dialog when closed", () => {
    render(<CookiePreferencesDialog open={false} onOpenChange={() => undefined} />);
    expect(screen.queryByRole("dialog")).toBeNull();
  });

  it("renders default title", () => {
    render(<CookiePreferencesDialog open onOpenChange={() => undefined} />);
    expect(screen.getByText("Privacy Preferences")).toBeInTheDocument();
  });

  it("renders custom title", () => {
    render(
      <CookiePreferencesDialog open onOpenChange={() => undefined} title="My Cookie Settings" />
    );
    expect(screen.getByText("My Cookie Settings")).toBeInTheDocument();
  });

  it("renders category tabs", () => {
    render(<CookiePreferencesDialog open onOpenChange={() => undefined} />);
    expect(screen.getByRole("tab", { name: /Essential/i })).toBeInTheDocument();
    expect(screen.getByRole("tab", { name: /Analytics/i })).toBeInTheDocument();
    expect(screen.getByRole("tab", { name: /Marketing/i })).toBeInTheDocument();
    expect(screen.getByRole("tab", { name: /Preferences/i })).toBeInTheDocument();
  });

  it("renders switch for first (active) category", () => {
    render(<CookiePreferencesDialog open onOpenChange={() => undefined} />);
    expect(
      screen.getByRole("switch", { name: /Essential cookies/i })
    ).toBeInTheDocument();
  });

  it("calls onAcceptAll and closes when Accept All clicked", async () => {
    const user = userEvent.setup();
    const onAcceptAll = vi.fn();
    const onOpenChange = vi.fn();
    render(
      <CookiePreferencesDialog
        open
        onOpenChange={onOpenChange}
        onAcceptAll={onAcceptAll}
      />
    );
    await user.click(screen.getByRole("button", { name: "Accept All" }));
    expect(onAcceptAll).toHaveBeenCalledOnce();
    expect(onOpenChange).toHaveBeenCalledWith(false);
  });

  it("calls onRejectAll and closes when Reject All clicked", async () => {
    const user = userEvent.setup();
    const onRejectAll = vi.fn();
    const onOpenChange = vi.fn();
    render(
      <CookiePreferencesDialog
        open
        onOpenChange={onOpenChange}
        onRejectAll={onRejectAll}
      />
    );
    await user.click(screen.getByRole("button", { name: "Reject All" }));
    expect(onRejectAll).toHaveBeenCalledOnce();
    expect(onOpenChange).toHaveBeenCalledWith(false);
  });

  it("calls onSave with preferences when Save Preferences clicked", async () => {
    const user = userEvent.setup();
    const onSave = vi.fn();
    const onOpenChange = vi.fn();
    render(
      <CookiePreferencesDialog open onOpenChange={onOpenChange} onSave={onSave} />
    );
    await user.click(screen.getByRole("button", { name: "Save Preferences" }));
    expect(onSave).toHaveBeenCalledOnce();
    expect(onOpenChange).toHaveBeenCalledWith(false);
  });

  it("renders privacy policy link when privacyPolicyUrl provided", () => {
    render(
      <CookiePreferencesDialog
        open
        onOpenChange={() => undefined}
        privacyPolicyUrl="https://example.com/privacy"
      />
    );
    const link = screen.getByRole("link", { name: /Privacy Policy/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "https://example.com/privacy");
  });

  it("essential switch is disabled", () => {
    render(<CookiePreferencesDialog open onOpenChange={() => undefined} />);
    expect(
      screen.getByRole("switch", { name: /Essential cookies/i })
    ).toBeDisabled();
  });

  it("Escape key closes dialog", async () => {
    const user = userEvent.setup();
    const onOpenChange = vi.fn();
    render(<CookiePreferencesDialog open onOpenChange={onOpenChange} />);
    await user.keyboard("{Escape}");
    expect(onOpenChange).toHaveBeenCalledWith(false);
  });
});
