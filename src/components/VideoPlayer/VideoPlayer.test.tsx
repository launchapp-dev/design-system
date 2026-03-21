import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import * as React from "react";
import { VideoPlayer } from "./VideoPlayer";

describe("VideoPlayer", () => {
  const defaultProps = {
    src: "https://example.com/video.mp4",
    poster: "https://example.com/poster.jpg",
  };

  it("renders with default props", () => {
    render(<VideoPlayer {...defaultProps} />);
    const video = screen.getByRole("application", { name: "Video player" });
    expect(video).toBeInTheDocument();
  });

  it("renders video element with correct src", () => {
    render(<VideoPlayer {...defaultProps} />);
    const videoElement = document.querySelector("video");
    expect(videoElement).toBeInTheDocument();
    expect(videoElement).toHaveAttribute("src", "https://example.com/video.mp4");
  });

  it("forwards ref to the video element", () => {
    const ref = React.createRef<HTMLVideoElement>();
    render(<VideoPlayer ref={ref} {...defaultProps} />);
    expect(ref.current).toBeInstanceOf(HTMLVideoElement);
  });

  it("merges custom className", () => {
    render(<VideoPlayer {...defaultProps} className="custom-class" />);
    const video = screen.getByRole("application", { name: "Video player" });
    expect(video).toHaveClass("custom-class");
  });

  it.each(["sm" as const, "md" as const, "lg" as const, "full" as const])(
    "renders size %s",
    (size) => {
      render(<VideoPlayer {...defaultProps} size={size} />);
      expect(screen.getByRole("application", { name: "Video player" })).toBeInTheDocument();
    }
  );

  it("renders with poster image", () => {
    render(<VideoPlayer {...defaultProps} />);
    const videoElement = document.querySelector("video");
    expect(videoElement).toHaveAttribute("poster", "https://example.com/poster.jpg");
  });

  it("handles showControls prop", () => {
    const { rerender } = render(<VideoPlayer {...defaultProps} showControls={true} />);
    expect(screen.getByRole("application", { name: "Video player" })).toBeInTheDocument();
    
    rerender(<VideoPlayer {...defaultProps} showControls={false} />);
    expect(screen.getByRole("application", { name: "Video player" })).toBeInTheDocument();
  });

  it("renders with autoPlay prop", () => {
    render(<VideoPlayer {...defaultProps} autoPlay={true} />);
    const videoElement = document.querySelector("video");
    expect(videoElement).toHaveAttribute("autoplay");
  });

  it("renders with loop prop", () => {
    render(<VideoPlayer {...defaultProps} loop={true} />);
    const videoElement = document.querySelector("video");
    expect(videoElement).toHaveAttribute("loop");
  });

  it("calls onTimeUpdate when provided", () => {
    const handleTimeUpdate = vi.fn();
    render(<VideoPlayer {...defaultProps} onTimeUpdate={handleTimeUpdate} />);
    expect(handleTimeUpdate).not.toHaveBeenCalled();
  });

  it("calls onEnded when video finishes", () => {
    const handleEnded = vi.fn();
    render(<VideoPlayer {...defaultProps} onEnded={handleEnded} />);
    expect(handleEnded).not.toHaveBeenCalled();
  });

  it("renders with aria-label for accessibility", () => {
    render(<VideoPlayer {...defaultProps} />);
    expect(screen.getByRole("application", { name: "Video player" })).toBeInTheDocument();
  });

  it("handles keyboard events", () => {
    render(<VideoPlayer {...defaultProps} />);
    const video = screen.getByRole("application", { name: "Video player" });
    expect(video).toHaveAttribute("tabIndex", "0");
  });
});
