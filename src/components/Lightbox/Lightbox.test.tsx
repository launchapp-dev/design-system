import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { Lightbox } from "./index";

const sampleImages = [
  {
    src: "https://example.com/image1.jpg",
    alt: "First image",
    thumbnail: "https://example.com/thumb1.jpg",
  },
  {
    src: "https://example.com/image2.jpg",
    alt: "Second image",
    thumbnail: "https://example.com/thumb2.jpg",
  },
  {
    src: "https://example.com/image3.jpg",
    alt: "Third image",
    thumbnail: "https://example.com/thumb3.jpg",
  },
];

describe("Lightbox", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should render with images when open", () => {
    render(
      <Lightbox
        images={sampleImages}
        open={true}
        onOpenChange={vi.fn()}
      />
    );

    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });

  it("should display image counter when showCounter is true", () => {
    render(
      <Lightbox
        images={sampleImages}
        open={true}
        onOpenChange={vi.fn()}
        showCounter={true}
      />
    );

    expect(screen.getByText("1 / 3")).toBeInTheDocument();
  });

  it("should navigate to next image when next button is clicked", () => {
    const onOpenChange = vi.fn();
    
    render(
      <Lightbox
        images={sampleImages}
        open={true}
        onOpenChange={onOpenChange}
        showNavigation={true}
      />
    );

    const nextButton = screen.getByLabelText("Next image");
    fireEvent.click(nextButton);

    expect(screen.getByText("2 / 3")).toBeInTheDocument();
  });

  it("should navigate to previous image when previous button is clicked", () => {
    render(
      <Lightbox
        images={sampleImages}
        open={true}
        onOpenChange={vi.fn()}
        showNavigation={true}
        initialIndex={1}
      />
    );

    expect(screen.getByText("2 / 3")).toBeInTheDocument();

    const prevButton = screen.getByLabelText("Previous image");
    fireEvent.click(prevButton);

    expect(screen.getByText("1 / 3")).toBeInTheDocument();
  });

  it("should navigate to thumbnail image when thumbnail is clicked", () => {
    render(
      <Lightbox
        images={sampleImages}
        open={true}
        onOpenChange={vi.fn()}
        showThumbnails={true}
      />
    );

    const thumbnails = screen.getByRole("tablist").querySelectorAll("button");
    expect(thumbnails.length).toBe(3);

    fireEvent.click(thumbnails[2]);

    expect(screen.getByText("3 / 3")).toBeInTheDocument();
  });

  it("should close when close button is clicked", () => {
    const onOpenChange = vi.fn();
    
    render(
      <Lightbox
        images={sampleImages}
        open={true}
        onOpenChange={onOpenChange}
      />
    );

    const closeButton = screen.getByLabelText("Close lightbox");
    fireEvent.click(closeButton);

    expect(onOpenChange).toHaveBeenCalledWith(false);
  });

  it("should call onIndexChange when index changes", () => {
    const onIndexChange = vi.fn();
    
    render(
      <Lightbox
        images={sampleImages}
        open={true}
        onOpenChange={vi.fn()}
        onIndexChange={onIndexChange}
        showNavigation={true}
      />
    );

    const nextButton = screen.getByLabelText("Next image");
    fireEvent.click(nextButton);

    expect(onIndexChange).toHaveBeenCalledWith(1);
  });

  it("should render without thumbnails when showThumbnails is false", () => {
    render(
      <Lightbox
        images={sampleImages}
        open={true}
        onOpenChange={vi.fn()}
        showThumbnails={false}
      />
    );

    expect(screen.queryByRole("tablist")).not.toBeInTheDocument();
  });

  it("should wrap around when navigating past last image", () => {
    render(
      <Lightbox
        images={sampleImages}
        open={true}
        onOpenChange={vi.fn()}
        showNavigation={true}
        initialIndex={2}
      />
    );

    expect(screen.getByText("3 / 3")).toBeInTheDocument();

    const nextButton = screen.getByLabelText("Next image");
    fireEvent.click(nextButton);

    expect(screen.getByText("1 / 3")).toBeInTheDocument();
  });

  it("should wrap around when navigating before first image", () => {
    render(
      <Lightbox
        images={sampleImages}
        open={true}
        onOpenChange={vi.fn()}
        showNavigation={true}
        initialIndex={0}
      />
    );

    expect(screen.getByText("1 / 3")).toBeInTheDocument();

    const prevButton = screen.getByLabelText("Previous image");
    fireEvent.click(prevButton);

    expect(screen.getByText("3 / 3")).toBeInTheDocument();
  });

  it("should have visible image with alt text", () => {
    render(
      <Lightbox
        images={sampleImages}
        open={true}
        onOpenChange={vi.fn()}
      />
    );

    const images = screen.getAllByRole("img");
    expect(images.length).toBeGreaterThan(0);
    expect(images[0]).toHaveAttribute("alt", "First image");
  });

  it("should show navigation buttons when showNavigation is true", () => {
    render(
      <Lightbox
        images={sampleImages}
        open={true}
        onOpenChange={vi.fn()}
        showNavigation={true}
      />
    );

    expect(screen.getByLabelText("Next image")).toBeInTheDocument();
    expect(screen.getByLabelText("Previous image")).toBeInTheDocument();
  });

  it("should hide navigation buttons when showNavigation is false", () => {
    render(
      <Lightbox
        images={sampleImages}
        open={true}
        onOpenChange={vi.fn()}
        showNavigation={false}
      />
    );

    expect(screen.queryByLabelText("Next image")).not.toBeInTheDocument();
    expect(screen.queryByLabelText("Previous image")).not.toBeInTheDocument();
  });
});
