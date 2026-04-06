import { describe, it, expect, afterEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { LiveIndicator } from "./LiveIndicator";

describe("LiveIndicator", () => {
  it("renders with default label", () => {
    render(<LiveIndicator />);
    expect(screen.getByText("Live")).toBeInTheDocument();
  });

  it("renders custom label", () => {
    render(<LiveIndicator label="Streaming" />);
    expect(screen.getByText("Streaming")).toBeInTheDocument();
  });

  describe("size variants", () => {
    it("applies sm size classes", () => {
      const { container } = render(<LiveIndicator size="sm" />);
      expect(container.firstChild).toHaveClass("gap-1.5", "text-xs");
    });

    it("applies md size classes by default", () => {
      const { container } = render(<LiveIndicator />);
      expect(container.firstChild).toHaveClass("gap-2", "text-sm");
    });

    it("applies lg size classes", () => {
      const { container } = render(<LiveIndicator size="lg" />);
      expect(container.firstChild).toHaveClass("gap-2.5", "text-base");
    });
  });

  describe("status variants", () => {
    it.each([["online"], ["offline"], ["degraded"]] as const)(
      "renders without error for status %s",
      (status) => {
        render(<LiveIndicator status={status} data-testid="indicator" />);
        expect(screen.getByTestId("indicator")).toBeInTheDocument();
      }
    );

    it("shows animate-ping when online and pulse is true", () => {
      const { container } = render(<LiveIndicator status="online" pulse />);
      expect(container.querySelector(".animate-ping")).toBeTruthy();
    });

    it("shows animate-ping when degraded and pulse is true", () => {
      const { container } = render(<LiveIndicator status="degraded" pulse />);
      expect(container.querySelector(".animate-ping")).toBeTruthy();
    });

    it("hides animate-ping when status is offline", () => {
      const { container } = render(<LiveIndicator status="offline" pulse />);
      expect(container.querySelector(".animate-ping")).toBeNull();
    });

    it("hides animate-ping when pulse is false", () => {
      const { container } = render(<LiveIndicator status="online" pulse={false} />);
      expect(container.querySelector(".animate-ping")).toBeNull();
    });
  });

  describe("className merging", () => {
    it("merges custom className with base classes", () => {
      const { container } = render(<LiveIndicator className="my-custom" />);
      expect(container.firstChild).toHaveClass("my-custom");
      expect(container.firstChild).toHaveClass("inline-flex");
    });
  });

  describe("HTML attribute forwarding", () => {
    it("forwards data attributes to root span", () => {
      render(<LiveIndicator data-testid="live-indicator" />);
      expect(screen.getByTestId("live-indicator")).toBeInTheDocument();
    });

    it("forwards aria attributes to root span", () => {
      render(<LiveIndicator data-testid="live" aria-label="Live status" />);
      expect(screen.getByTestId("live")).toHaveAttribute("aria-label", "Live status");
    });
  });

  describe("dark mode", () => {
    afterEach(() => {
      document.documentElement.classList.remove("dark");
    });

    it("renders offline status in dark mode context", () => {
      document.documentElement.classList.add("dark");
      render(<LiveIndicator status="offline" data-testid="dark-live" />);
      expect(screen.getByTestId("dark-live")).toBeInTheDocument();
    });

    it("renders degraded status in dark mode context", () => {
      document.documentElement.classList.add("dark");
      render(<LiveIndicator status="degraded" data-testid="dark-degraded" />);
      expect(screen.getByTestId("dark-degraded")).toBeInTheDocument();
    });
  });
});
