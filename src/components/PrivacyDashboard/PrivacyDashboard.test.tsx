import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { PrivacyDashboard } from "./PrivacyDashboard";
import type { ConsentHistoryEntry } from "../ConsentHistoryTable";

const SAMPLE_HISTORY: ConsentHistoryEntry[] = [
  { id: "1", timestamp: new Date("2024-01-10T10:00:00Z"), action: "accepted_all" },
  { id: "2", timestamp: new Date("2024-02-05T14:30:00Z"), action: "customized", categories: { essential: true, analytics: true, marketing: false } },
];

describe("PrivacyDashboard", () => {
  it("renders default title", () => {
    render(<PrivacyDashboard />);
    expect(screen.getByText("Privacy & Data")).toBeInTheDocument();
  });

  it("renders custom title", () => {
    render(<PrivacyDashboard title="My Privacy Settings" />);
    expect(screen.getByText("My Privacy Settings")).toBeInTheDocument();
  });

  it("renders userName when provided", () => {
    render(<PrivacyDashboard userName="alice@example.com" />);
    expect(screen.getByText("alice@example.com")).toBeInTheDocument();
  });

  describe("data download section", () => {
    it("renders Request Data Export button in idle state", () => {
      render(<PrivacyDashboard />);
      expect(
        screen.getByRole("button", { name: "Request Data Export" })
      ).toBeInTheDocument();
    });

    it("calls onRequestDataDownload when button clicked", async () => {
      const user = userEvent.setup();
      const onRequest = vi.fn();
      render(<PrivacyDashboard onRequestDataDownload={onRequest} />);
      await user.click(screen.getByRole("button", { name: "Request Data Export" }));
      expect(onRequest).toHaveBeenCalledOnce();
    });

    it("shows preparing state when status is pending", () => {
      render(<PrivacyDashboard dataDownloadStatus="pending" />);
      expect(screen.getByRole("button", { name: "Preparing Export…" })).toBeDisabled();
    });

    it("shows download link when status is ready", () => {
      render(
        <PrivacyDashboard
          dataDownloadStatus="ready"
          dataDownloadUrl="https://example.com/data.zip"
        />
      );
      const link = screen.getByRole("link", { name: "Download Archive" });
      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute("href", "https://example.com/data.zip");
    });

    it("shows error message when status is error", () => {
      render(<PrivacyDashboard dataDownloadStatus="error" />);
      expect(
        screen.getByText(/There was a problem preparing your export/i)
      ).toBeInTheDocument();
    });
  });

  describe("consent section", () => {
    it("shows consent history table", () => {
      render(<PrivacyDashboard consentHistory={SAMPLE_HISTORY} />);
      expect(screen.getByRole("table")).toBeInTheDocument();
    });

    it("shows empty consent message when no history", () => {
      render(<PrivacyDashboard consentHistory={[]} />);
      expect(
        screen.getByText("No consent history recorded yet.")
      ).toBeInTheDocument();
    });

    it("renders Manage Preferences button when onManageConsent provided", () => {
      const onManage = vi.fn();
      render(<PrivacyDashboard onManageConsent={onManage} />);
      expect(
        screen.getByRole("button", { name: "Manage Preferences" })
      ).toBeInTheDocument();
    });

    it("calls onManageConsent when button clicked", async () => {
      const user = userEvent.setup();
      const onManage = vi.fn();
      render(<PrivacyDashboard onManageConsent={onManage} />);
      await user.click(screen.getByRole("button", { name: "Manage Preferences" }));
      expect(onManage).toHaveBeenCalledOnce();
    });
  });

  describe("account deletion section", () => {
    it("renders Delete My Account button in idle state", () => {
      render(<PrivacyDashboard />);
      expect(
        screen.getByRole("button", { name: "Delete My Account" })
      ).toBeInTheDocument();
    });

    it("calls onRequestAccountDeletion when delete clicked", async () => {
      const user = userEvent.setup();
      const onRequest = vi.fn();
      render(<PrivacyDashboard onRequestAccountDeletion={onRequest} />);
      await user.click(screen.getByRole("button", { name: "Delete My Account" }));
      expect(onRequest).toHaveBeenCalledOnce();
    });

    it("shows confirmation UI in confirm state", () => {
      render(<PrivacyDashboard deleteAccountStatus="confirm" />);
      expect(screen.getByText("Are you absolutely sure?")).toBeInTheDocument();
      expect(
        screen.getByRole("button", { name: "Yes, Delete My Account" })
      ).toBeInTheDocument();
      expect(screen.getByRole("button", { name: "Cancel" })).toBeInTheDocument();
    });

    it("calls onConfirmAccountDeletion when confirmation accepted", async () => {
      const user = userEvent.setup();
      const onConfirm = vi.fn();
      render(
        <PrivacyDashboard
          deleteAccountStatus="confirm"
          onConfirmAccountDeletion={onConfirm}
        />
      );
      await user.click(
        screen.getByRole("button", { name: "Yes, Delete My Account" })
      );
      expect(onConfirm).toHaveBeenCalledOnce();
    });

    it("calls onCancelAccountDeletion when Cancel clicked", async () => {
      const user = userEvent.setup();
      const onCancel = vi.fn();
      render(
        <PrivacyDashboard
          deleteAccountStatus="confirm"
          onCancelAccountDeletion={onCancel}
        />
      );
      await user.click(screen.getByRole("button", { name: "Cancel" }));
      expect(onCancel).toHaveBeenCalledOnce();
    });

    it("shows deleted confirmation message in deleted state", () => {
      render(<PrivacyDashboard deleteAccountStatus="deleted" />);
      expect(
        screen.getByText(/Your account deletion request has been submitted/i)
      ).toBeInTheDocument();
    });

    it("shows error message in error state", () => {
      render(<PrivacyDashboard deleteAccountStatus="error" />);
      expect(
        screen.getByText(/There was a problem processing your request/i)
      ).toBeInTheDocument();
    });
  });
});
