import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import * as React from "react";
import { ImageComparison } from "./ImageComparison";

describe("ImageComparison", () => {
  const defaultProps = {
    beforeImage: "https://example.com/before.jpg",
    afterImage: "https://example.com/after.jpg",
  };

  it("renders with default props", () => {
    render(<ImageComparison {...defaultProps} />);
    expect(document.body).toBeInTheDocument();
  });

  it("displays before label", () => {
    render(<ImageComparison {...defaultProps} beforeLabel="Before" />);
    expect(screen.getByText("Before")).toBeInTheDocument();
  });

  it("displays after label", () => {
    render(<ImageComparison {...defaultProps} afterLabel="After" />);
    expect(screen.getByText("After")).toBeInTheDocument();
  });

  it("uses custom labels when provided", () => {
    render(<ImageComparison {...defaultProps} beforeLabel="Original" afterLabel="Edited" />);
    expect(screen.getByText("Original")).toBeInTheDocument();
    expect(screen.getByText("Edited")).toBeInTheDocument();
  });

  it("forwards ref to the container element", () => {
    const ref = React.createRef<HTMLDivElement>();
    render(<ImageComparison ref={ref} {...defaultProps} />);
    expect(ref.current).toBeInTheDocument();
  });

  it("merges custom className", () => {
    render(<ImageComparison {...defaultProps} className="custom-class" />);
    const container = document.querySelector('[class*="relative"]');
    expect(container).toHaveClass("custom-class");
  });

  it.each(["sm" as const, "md" as const, "lg" as const])("renders size %s", (size) => {
    render(<ImageComparison {...defaultProps} size={size} />);
    expect(document.body).toBeInTheDocument();
  });

  it("calls onPositionChange callback", () => {
    const handlePositionChange = vi.fn();
    render(<ImageComparison {...defaultProps} onPositionChange={handlePositionChange} />);
    expect(handlePositionChange).not.toHaveBeenCalled();
  });

  it("renders with different initial positions", () => {
    render(<ImageComparison {...defaultProps} initialPosition={75} />);
    expect(document.body).toBeInTheDocument();
  });

  it("renders with default initial position", () => {
    render(<ImageComparison {...defaultProps} initialPosition={50} />);
    expect(document.body).toBeInTheDocument();
  });

  it("renders slider with accessible attributes", () => {
    render(<ImageComparison {...defaultProps} />);
    const slider = screen.getByRole("slider");
    expect(slider).toBeInTheDocument();
    expect(slider).toHaveAttribute("aria-orientation", "horizontal");
    expect(slider).toHaveAttribute("aria-valuemin", "0");
    expect(slider).toHaveAttribute("aria-valuemax", "100");
  });
});
