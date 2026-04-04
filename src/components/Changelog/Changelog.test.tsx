import { render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import type { ChangelogEntry } from "./Changelog";
import { Changelog } from "./Changelog";

const ENTRIES: ChangelogEntry[] = [
  {
    version: "v2.0.0",
    date: "March 21, 2026",
    title: "Major release",
    description: "Big update.",
    changes: [
      { text: "New feature added", tag: "feature" },
      { text: "Critical bug fixed", tag: "fix" },
      { text: "Security patch applied", tag: "security" },
      { text: "Performance improved", tag: "improvement" },
    ],
  },
  {
    version: "v1.9.0",
    date: "March 7, 2026",
    title: "Minor update",
    changes: [
      { text: "Breaking change to API", tag: "breaking" },
      { text: "Old feature deprecated", tag: "deprecation" },
    ],
  },
];

describe("Changelog", () => {
  it("renders default title", () => {
    render(<Changelog entries={ENTRIES} />);
    expect(
      screen.getByRole("heading", { name: "Changelog" }),
    ).toBeInTheDocument();
  });

  it("renders custom title", () => {
    render(<Changelog entries={ENTRIES} title="Release Notes" />);
    expect(
      screen.getByRole("heading", { name: "Release Notes" }),
    ).toBeInTheDocument();
  });

  it("renders version strings", () => {
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
    expect(screen.getByText("Big update.")).toBeInTheDocument();
  });

  it("renders change text items", () => {
    render(<Changelog entries={ENTRIES} />);
    expect(screen.getByText("New feature added")).toBeInTheDocument();
    expect(screen.getByText("Critical bug fixed")).toBeInTheDocument();
    expect(screen.getByText("Breaking change to API")).toBeInTheDocument();
    expect(screen.getByText("Old feature deprecated")).toBeInTheDocument();
  });

  describe("CVA tag variants", () => {
    it.each([
      ["feature", "Feature"],
      ["fix", "Fix"],
      ["security", "Security"],
      ["improvement", "Improvement"],
      ["breaking", "Breaking"],
      ["deprecation", "Deprecated"],
    ] as const)("renders %s tag with label '%s'", (_tag, label) => {
      render(<Changelog entries={ENTRIES} />);
      expect(screen.getByText(label)).toBeInTheDocument();
    });
  });

  it("renders change without a tag", () => {
    const entries: ChangelogEntry[] = [
      {
        version: "v1.0.0",
        date: "Jan 1, 2026",
        title: "Initial",
        changes: [{ text: "Unlabelled change" }],
      },
    ];
    render(<Changelog entries={entries} />);
    expect(screen.getByText("Unlabelled change")).toBeInTheDocument();
  });

  describe("date grouping", () => {
    it("renders date strings as section headers", () => {
      render(<Changelog entries={ENTRIES} />);
      expect(screen.getByText("March 21, 2026")).toBeInTheDocument();
      expect(screen.getByText("March 7, 2026")).toBeInTheDocument();
    });

    it("groups multiple entries under the same date into one section header", () => {
      const sameDate: ChangelogEntry[] = [
        {
          version: "v2.0.1",
          date: "March 21, 2026",
          title: "Patch A",
          changes: [],
        },
        {
          version: "v2.0.2",
          date: "March 21, 2026",
          title: "Patch B",
          changes: [],
        },
      ];
      render(<Changelog entries={sameDate} />);
      expect(screen.getAllByText("March 21, 2026")).toHaveLength(1);
      expect(screen.getByText("Patch A")).toBeInTheDocument();
      expect(screen.getByText("Patch B")).toBeInTheDocument();
    });
  });

  describe("className merging", () => {
    it("merges custom className with base classes", () => {
      const { container } = render(
        <Changelog entries={ENTRIES} className="custom-class" />,
      );
      expect(container.firstChild).toHaveClass("custom-class");
      expect(container.firstChild).toHaveClass("space-y-8");
    });
  });

  describe("HTML attribute forwarding", () => {
    it("forwards data attributes to root div", () => {
      render(<Changelog entries={ENTRIES} data-testid="changelog" />);
      expect(screen.getByTestId("changelog")).toBeInTheDocument();
    });
  });

  describe("dark mode", () => {
    afterEach(() => {
      document.documentElement.classList.remove("dark");
    });

    it("renders all tag variants in dark mode context", () => {
      document.documentElement.classList.add("dark");
      render(<Changelog entries={ENTRIES} data-testid="dark-changelog" />);
      expect(screen.getByTestId("dark-changelog")).toBeInTheDocument();
      expect(screen.getByText("Breaking")).toBeInTheDocument();
      expect(screen.getByText("Deprecated")).toBeInTheDocument();
    });
  });
});
