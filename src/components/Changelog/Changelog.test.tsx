import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import * as React from "react";
import { Changelog } from "./Changelog";
import type { ChangelogEntry } from "./Changelog";

const ENTRIES: ChangelogEntry[] = [
  {
    version: "v2.0.0",
    date: "March 21, 2026",
    title: "Major release",
    changes: [
      { text: "New feature added", tag: "feature" },
      { text: "Critical bug fixed", tag: "fix" },
    ],
  },
  {
    version: "v1.9.0",
    date: "March 7, 2026",
    title: "Minor update",
    description: "Small improvements.",
    changes: [{ text: "Breaking change to API", tag: "breaking" }],
  },
];

describe("Changelog", () => {
  it("renders the title", () => {
    render(<Changelog entries={ENTRIES} title="Release Notes" />);
    expect(screen.getByText("Release Notes")).toBeInTheDocument();
  });

  it("renders default title when none provided", () => {
    render(<Changelog entries={ENTRIES} />);
    expect(screen.getByText("Changelog")).toBeInTheDocument();
  });

  it("renders all version numbers", () => {
    render(<Changelog entries={ENTRIES} />);
    expect(screen.getByText("v2.0.0")).toBeInTheDocument();
    expect(screen.getByText("v1.9.0")).toBeInTheDocument();
  });

  it("renders entry titles", () => {
    render(<Changelog entries={ENTRIES} />);
    expect(screen.getByText("Major release")).toBeInTheDocument();
    expect(screen.getByText("Minor update")).toBeInTheDocument();
  });

  it("renders entry description when provided", () => {
    render(<Changelog entries={ENTRIES} />);
    expect(screen.getByText("Small improvements.")).toBeInTheDocument();
  });

  it("renders change texts", () => {
    render(<Changelog entries={ENTRIES} />);
    expect(screen.getByText("New feature added")).toBeInTheDocument();
    expect(screen.getByText("Critical bug fixed")).toBeInTheDocument();
  });

  it("renders change tag labels", () => {
    render(<Changelog entries={ENTRIES} />);
    expect(screen.getByText("Feature")).toBeInTheDocument();
    expect(screen.getByText("Fix")).toBeInTheDocument();
    expect(screen.getByText("Breaking")).toBeInTheDocument();
  });

  it("renders dates as section headers", () => {
    render(<Changelog entries={ENTRIES} />);
    expect(screen.getByText("March 21, 2026")).toBeInTheDocument();
    expect(screen.getByText("March 7, 2026")).toBeInTheDocument();
  });

  it("groups multiple entries under the same date", () => {
    const sameDate: ChangelogEntry[] = [
      { version: "v2.0.1", date: "March 21, 2026", title: "Patch A", changes: [] },
      { version: "v2.0.2", date: "March 21, 2026", title: "Patch B", changes: [] },
    ];
    render(<Changelog entries={sameDate} />);
    const dateHeaders = screen.getAllByText("March 21, 2026");
    expect(dateHeaders).toHaveLength(1);
  });
});
