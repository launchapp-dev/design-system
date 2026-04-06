import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ConsentHistoryTable } from "./ConsentHistoryTable";
import type { ConsentHistoryEntry } from "./ConsentHistoryTable";

const SAMPLE_ENTRIES: ConsentHistoryEntry[] = [
  {
    id: "1",
    timestamp: new Date("2024-01-15T10:30:00Z"),
    action: "accepted_all",
  },
  {
    id: "2",
    timestamp: new Date("2024-02-01T14:00:00Z"),
    action: "customized",
    categories: { essential: true, analytics: true, marketing: false },
  },
  {
    id: "3",
    timestamp: new Date("2024-03-10T09:00:00Z"),
    action: "rejected_all",
  },
  {
    id: "4",
    timestamp: new Date("2024-03-20T12:00:00Z"),
    action: "withdrawn",
  },
];

describe("ConsentHistoryTable", () => {
  it("renders empty state when no entries", () => {
    render(<ConsentHistoryTable entries={[]} />);
    expect(screen.getByText("No consent history found.")).toBeInTheDocument();
  });

  it("renders custom empty message", () => {
    render(<ConsentHistoryTable entries={[]} emptyMessage="Nothing here yet." />);
    expect(screen.getByText("Nothing here yet.")).toBeInTheDocument();
  });

  it("renders a table with entries", () => {
    render(<ConsentHistoryTable entries={SAMPLE_ENTRIES} />);
    expect(screen.getByRole("table")).toBeInTheDocument();
  });

  it("renders action badges for all entries", () => {
    render(<ConsentHistoryTable entries={SAMPLE_ENTRIES} />);
    expect(screen.getByText("Accepted All")).toBeInTheDocument();
    expect(screen.getByText("Customized")).toBeInTheDocument();
    expect(screen.getByText("Rejected All")).toBeInTheDocument();
    expect(screen.getByText("Withdrawn")).toBeInTheDocument();
  });

  it("renders category chips for customized entry", () => {
    render(<ConsentHistoryTable entries={SAMPLE_ENTRIES} />);
    expect(screen.getByText("essential")).toBeInTheDocument();
    expect(screen.getByText("analytics")).toBeInTheDocument();
    expect(screen.getByText("marketing")).toBeInTheDocument();
  });

  it("renders Withdraw button for non-withdrawn entries when onWithdraw is provided", () => {
    const onWithdraw = vi.fn();
    render(<ConsentHistoryTable entries={SAMPLE_ENTRIES} onWithdraw={onWithdraw} />);
    const withdrawButtons = screen.getAllByRole("button", { name: /withdraw/i });
    // 3 entries are not withdrawn
    expect(withdrawButtons).toHaveLength(3);
  });

  it("does not render Withdraw button for withdrawn entries", () => {
    const onWithdraw = vi.fn();
    const withdrawnOnly: ConsentHistoryEntry[] = [
      { id: "1", timestamp: new Date(), action: "withdrawn" },
    ];
    render(<ConsentHistoryTable entries={withdrawnOnly} onWithdraw={onWithdraw} />);
    expect(screen.queryByRole("button", { name: /withdraw/i })).toBeNull();
  });

  it("calls onWithdraw with entry id when Withdraw clicked", async () => {
    const user = userEvent.setup();
    const onWithdraw = vi.fn();
    render(<ConsentHistoryTable entries={[SAMPLE_ENTRIES[0]]} onWithdraw={onWithdraw} />);
    await user.click(screen.getByRole("button", { name: /withdraw/i }));
    expect(onWithdraw).toHaveBeenCalledWith("1");
  });

  it("renders column headers", () => {
    render(<ConsentHistoryTable entries={SAMPLE_ENTRIES} />);
    expect(screen.getByText("Date & Time")).toBeInTheDocument();
    expect(screen.getByText("Action")).toBeInTheDocument();
    expect(screen.getByText("Categories")).toBeInTheDocument();
  });

  it("accepts string timestamps", () => {
    const entry: ConsentHistoryEntry = {
      id: "1",
      timestamp: "2024-06-15T08:00:00Z",
      action: "accepted_all",
    };
    render(<ConsentHistoryTable entries={[entry]} />);
    expect(screen.getByRole("table")).toBeInTheDocument();
  });
});
