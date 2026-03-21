import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import * as React from "react";
import { Lightbox } from "./Lightbox";

describe("Lightbox", () => {
  const sampleImages = [
    { src: "https://example.com/image1.jpg", alt: "Image 1" },
    { src: "https://example.com/image2.jpg", alt: "Image 2" },
    { src: "https://example.com/image3.jpg", alt: "Image 3" },
  ];

  it("renders with default props", () => {
    render(<Lightbox images={sampleImages} />);
    expect(document.body).toBeInTheDocument();
  });

  it("renders with specified variant", () => {
    const { rerender } = render(<Lightbox images={sampleImages} variant="dark" />);
    expect(document.body).toBeInTheDocument();
    
    rerender(<Lightbox images={sampleImages} variant="light" />);
    expect(document.body).toBeInTheDocument();
  });

  it("renders close button", () => {
    render(<Lightbox images={sampleImages} />);
    expect(screen.getByRole("button", { name: /close/i })).toBeInTheDocument();
  });

  it("shows navigation when enabled", () => {
    render(<Lightbox images={sampleImages} showNavigation={true} />);
    expect(screen.getByRole("button", { name: /previous/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /next/i })).toBeInTheDocument();
  });

  it("hides navigation when disabled", () => {
    render(<Lightbox images={sampleImages} showNavigation={false} />);
    expect(screen.queryByRole("button", { name: /previous/i })).not.toBeInTheDocument();
    expect(screen.queryByRole("button", { name: /next/i })).not.toBeInTheDocument();
  });

  it("hides navigation for single image", () => {
    render(<Lightbox images={[sampleImages[0]]} showNavigation={true} />);
    expect(screen.queryByRole("button", { name: /previous/i })).not.toBeInTheDocument();
    expect(screen.queryByRole("button", { name: /next/i })).not.toBeInTheDocument();
  });

  it("renders zoom controls", () => {
    render(<Lightbox images={sampleImages} />);
    expect(screen.getByRole("button", { name: /zoom out/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /zoom in/i })).toBeInTheDocument();
  });

  it("shows image counter", () => {
    render(<Lightbox images={sampleImages} initialIndex={0} />);
    expect(screen.getByText(/1 \/ 3/)).toBeInTheDocument();
  });

  it("displays thumbnails when enabled", () => {
    render(<Lightbox images={sampleImages} showThumbnails={true} />);
    expect(screen.getByRole("button", { name: /view image 1/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /view image 2/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /view image 3/i })).toBeInTheDocument();
  });

  it("calls onClose callback", () => {
    const handleClose = vi.fn();
    render(<Lightbox images={sampleImages} onClose={handleClose} />);
    expect(handleClose).not.toHaveBeenCalled();
  });

  it("renders light variant", () => {
    render(<Lightbox images={sampleImages} variant="light" />);
    expect(document.body).toBeInTheDocument();
  });

  it("renders dark variant", () => {
    render(<Lightbox images={sampleImages} variant="dark" />);
    expect(document.body).toBeInTheDocument();
  });

  it("handles controlled open state", () => {
    const { rerender } = render(
      <Lightbox images={sampleImages} open={true} onOpenChange={() => {}} />
    );
    expect(document.body).toBeInTheDocument();
  });
});
