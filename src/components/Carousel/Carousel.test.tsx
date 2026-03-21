import * as React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
  CarouselDots,
} from "./Carousel";

describe("Carousel", () => {
  const renderCarousel = (props = {}) => {
    return render(
      <Carousel {...props}>
        <CarouselContent>
          <CarouselItem>Slide 1</CarouselItem>
          <CarouselItem>Slide 2</CarouselItem>
          <CarouselItem>Slide 3</CarouselItem>
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
        <CarouselDots />
      </Carousel>
    );
  };

  it("renders carousel region", () => {
    renderCarousel();
    const region = screen.getByRole("region");
    expect(region).toBeInTheDocument();
    expect(region).toHaveAttribute("aria-roledescription", "carousel");
  });

  it("renders previous and next buttons", () => {
    renderCarousel();
    expect(screen.getByLabelText(/previous slide/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/next slide/i)).toBeInTheDocument();
  });

  it("renders dot indicators", () => {
    renderCarousel();
    expect(screen.getByRole("tablist", { name: /carousel navigation/i })).toBeInTheDocument();
  });

  it("hides arrows when showArrows is false", () => {
    renderCarousel({ showArrows: false });
    expect(screen.queryByLabelText(/previous slide/i)).not.toBeInTheDocument();
    expect(screen.queryByLabelText(/next slide/i)).not.toBeInTheDocument();
  });

  it("hides dots when showDots is false", () => {
    renderCarousel({ showDots: false });
    expect(screen.queryByRole("tablist")).not.toBeInTheDocument();
  });

  it("applies size variant classes", () => {
    const { container } = renderCarousel({ size: "lg" });
    const carousel = container.querySelector('[role="region"]');
    expect(carousel).toHaveClass("max-w-5xl");
  });

  it("applies custom className to carousel root", () => {
    const { container } = renderCarousel({ className: "custom-class" });
    const carousel = container.querySelector('[role="region"]');
    expect(carousel).toHaveClass("custom-class");
  });

  it("renders with single slide", () => {
    render(
      <Carousel>
        <CarouselContent>
          <CarouselItem>Only Slide</CarouselItem>
        </CarouselContent>
        <CarouselDots />
      </Carousel>
    );
    
    expect(screen.getByText("Only Slide")).toBeInTheDocument();
  });
});

describe("CarouselAccessibility", () => {
  it("has correct ARIA attributes on carousel", () => {
    render(
      <Carousel>
        <CarouselContent>
          <CarouselItem>Slide 1</CarouselItem>
        </CarouselContent>
      </Carousel>
    );
    
    const carousel = screen.getByRole("region");
    expect(carousel).toHaveAttribute("aria-roledescription", "carousel");
  });

  it("has correct ARIA attributes on slides", () => {
    render(
      <Carousel>
        <CarouselContent>
          <CarouselItem>Slide 1</CarouselItem>
        </CarouselContent>
      </Carousel>
    );
    
    const slide = screen.getByRole("group");
    expect(slide).toHaveAttribute("aria-roledescription", "slide");
  });

  it("navigation buttons have accessible labels", () => {
    render(
      <Carousel>
        <CarouselContent>
          <CarouselItem>Slide 1</CarouselItem>
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    );
    
    expect(screen.getByLabelText(/previous slide/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/next slide/i)).toBeInTheDocument();
  });

  it("dot indicators have accessible labels", () => {
    render(
      <Carousel>
        <CarouselContent>
          <CarouselItem>Slide 1</CarouselItem>
          <CarouselItem>Slide 2</CarouselItem>
          <CarouselItem>Slide 3</CarouselItem>
        </CarouselContent>
        <CarouselDots />
      </Carousel>
    );
    
    expect(screen.getByLabelText(/go to slide 1/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/go to slide 2/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/go to slide 3/i)).toBeInTheDocument();
  });
});
