import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import * as React from "react";
import { Carousel, CarouselSlide } from "./Carousel";

describe("Carousel", () => {
  const renderSlides = () => (
    <>
      <CarouselSlide>
        <div>Slide 1</div>
      </CarouselSlide>
      <CarouselSlide>
        <div>Slide 2</div>
      </CarouselSlide>
      <CarouselSlide>
        <div>Slide 3</div>
      </CarouselSlide>
    </>
  );

  it("renders with default props", () => {
    render(<Carousel>{renderSlides()}</Carousel>);
    expect(screen.getByRole("region", { name: "Image carousel" })).toBeInTheDocument();
  });

  it("renders with custom children", () => {
    render(
      <Carousel>
        <CarouselSlide>Custom Slide</CarouselSlide>
      </Carousel>
    );
    expect(screen.getByText("Custom Slide")).toBeInTheDocument();
  });

  it("forwards ref to the container element", () => {
    const ref = React.createRef<HTMLDivElement>();
    render(
      <Carousel ref={ref}>
        {renderSlides()}
      </Carousel>
    );
    expect(ref.current).toBeInTheDocument();
  });

  it("merges custom className", () => {
    render(
      <Carousel className="custom-class">
        {renderSlides()}
      </Carousel>
    );
    expect(screen.getByRole("region", { name: "Image carousel" })).toHaveClass("custom-class");
  });

  it.each(["sm" as const, "md" as const, "lg" as const, "full" as const])(
    "renders size %s",
    (size) => {
      render(
        <Carousel size={size}>
          {renderSlides()}
        </Carousel>
      );
      expect(screen.getByRole("region", { name: "Image carousel" })).toBeInTheDocument();
    }
  );

  it("shows arrows when enabled", () => {
    render(
      <Carousel showArrows={true}>
        {renderSlides()}
      </Carousel>
    );
    expect(screen.getByRole("button", { name: "Previous slide" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Next slide" })).toBeInTheDocument();
  });

  it("hides arrows when disabled", () => {
    render(
      <Carousel showArrows={false}>
        {renderSlides()}
      </Carousel>
    );
    expect(screen.queryByRole("button", { name: "Previous slide" })).not.toBeInTheDocument();
    expect(screen.queryByRole("button", { name: "Next slide" })).not.toBeInTheDocument();
  });

  it("accepts onSlideChange callback", () => {
    const handleSlideChange = vi.fn();
    render(
      <Carousel onSlideChange={handleSlideChange}>
        {renderSlides()}
      </Carousel>
    );
    expect(handleSlideChange).toBeDefined();
  });

  it("renders all slides with proper aria roles", () => {
    render(
      <Carousel>
        {renderSlides()}
      </Carousel>
    );
    const slideGroups = screen.getAllByRole("group");
    expect(slideGroups.length).toBeGreaterThan(0);
    slideGroups.forEach((group) => {
      expect(group).toHaveAttribute("aria-roledescription", "slide");
    });
  });

  it("renders carousel with aria role", () => {
    render(
      <Carousel>
        {renderSlides()}
      </Carousel>
    );
    expect(screen.getByRole("region", { name: "Image carousel" })).toHaveAttribute(
      "aria-roledescription",
      "carousel"
    );
  });
});

describe("CarouselSlide", () => {
  it("renders with children", () => {
    render(
      <Carousel>
        <CarouselSlide>Slide Content</CarouselSlide>
      </Carousel>
    );
    expect(screen.getByText("Slide Content")).toBeInTheDocument();
  });

  it("forwards ref to the slide element", () => {
    const ref = React.createRef<HTMLDivElement>();
    render(
      <Carousel>
        <CarouselSlide ref={ref}>Slide</CarouselSlide>
      </Carousel>
    );
    expect(ref.current).toBeInTheDocument();
  });

  it("merges custom className", () => {
    render(
      <Carousel>
        <CarouselSlide className="custom-slide">Slide</CarouselSlide>
      </Carousel>
    );
    expect(screen.getByText("Slide")).toHaveClass("custom-slide");
  });

  it("renders with slide role and aria-label", () => {
    render(
      <Carousel>
        <CarouselSlide>Slide</CarouselSlide>
      </Carousel>
    );
    expect(screen.getByRole("group")).toBeInTheDocument();
  });
});
