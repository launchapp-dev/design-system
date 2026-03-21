import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import * as React from "react";
import { LiveIndicator } from "./LiveIndicator";

describe("LiveIndicator", () => {
  it("renders with default label and online status", () => {
    render(<LiveIndicator />);
    expect(screen.getByText("Live")).toBeInTheDocument();
  });

  it("renders a custom label", () => {
    render(<LiveIndicator label="Streaming" />);
    expect(screen.getByText("Streaming")).toBeInTheDocument();
  });

  it("renders ping element when status is online and pulse is true", () => {
    const { container } = render(<LiveIndicator status="online" pulse={true} />);
    expect(container.querySelector(".animate-ping")).toBeTruthy();
  });

  it("does not render ping when pulse is false", () => {
    const { container } = render(<LiveIndicator status="online" pulse={false} />);
    expect(container.querySelector(".animate-ping")).toBeNull();
  });

  it("does not render ping when status is offline", () => {
    const { container } = render(<LiveIndicator status="offline" pulse={true} />);
    expect(container.querySelector(".animate-ping")).toBeNull();
  });

  it("applies custom className", () => {
    const { container } = render(<LiveIndicator className="custom-class" />);
    expect(container.firstChild).toHaveClass("custom-class");
  });

  it("forwards additional HTML attributes", () => {
    render(<LiveIndicator data-testid="indicator" />);
    expect(screen.getByTestId("indicator")).toBeInTheDocument();
  });
});
