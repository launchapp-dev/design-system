import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Logo } from "./Logo";

describe("Logo", () => {
  it("renders with default variant and size", () => {
    render(<Logo />);
    expect(screen.getByRole("img", { name: "LaunchApp" })).toBeInTheDocument();
  });

  it("renders custom aria label", () => {
    render(<Logo label="My Brand" />);
    expect(screen.getByRole("img", { name: "My Brand" })).toBeInTheDocument();
  });

  it("merges custom className", () => {
    render(<Logo className="custom-class" />);
    expect(screen.getByRole("img", { name: "LaunchApp" })).toHaveClass("custom-class");
  });

  it("shows wordmark text in horizontal variant", () => {
    render(<Logo variant="horizontal" />);
    expect(screen.getByText("LaunchApp")).toBeInTheDocument();
  });

  it("shows wordmark text in stacked variant", () => {
    render(<Logo variant="stacked" />);
    expect(screen.getByText("LaunchApp")).toBeInTheDocument();
  });

  it("shows only SVG mark in mark variant", () => {
    const { container } = render(<Logo variant="mark" />);
    expect(screen.queryByText("LaunchApp")).not.toBeInTheDocument();
    expect(container.querySelector("svg")).toBeInTheDocument();
  });

  it("shows only text in wordmark variant", () => {
    const { container } = render(<Logo variant="wordmark" />);
    expect(screen.getByText("LaunchApp")).toBeInTheDocument();
    expect(container.querySelector("svg")).not.toBeInTheDocument();
  });

  it.each([
    ["horizontal" as const],
    ["stacked" as const],
    ["mark" as const],
    ["wordmark" as const],
  ])("renders variant %s", (variant) => {
    render(<Logo variant={variant} />);
    expect(screen.getByRole("img", { name: "LaunchApp" })).toBeInTheDocument();
  });

  it.each([
    ["xs" as const],
    ["sm" as const],
    ["md" as const],
    ["lg" as const],
    ["xl" as const],
  ])("renders size %s", (size) => {
    render(<Logo size={size} />);
    expect(screen.getByRole("img", { name: "LaunchApp" })).toBeInTheDocument();
  });

  it.each([
    ["brand" as const],
    ["white" as const],
    ["black" as const],
    ["current" as const],
  ])("renders color scheme %s", (color) => {
    render(<Logo color={color} />);
    expect(screen.getByRole("img", { name: "LaunchApp" })).toBeInTheDocument();
  });
});
