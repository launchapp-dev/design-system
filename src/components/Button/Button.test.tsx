import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import * as React from "react";
import { Button } from "./Button";

describe("Button", () => {
  it("renders with default variant and size", () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole("button", { name: "Click me" })).toBeInTheDocument();
  });

  it("forwards ref to the button element", () => {
    const ref = React.createRef<HTMLButtonElement>();
    render(<Button ref={ref}>Ref test</Button>);
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });

  it("merges custom className", () => {
    render(<Button className="custom-class">Styled</Button>);
    expect(screen.getByRole("button", { name: "Styled" })).toHaveClass("custom-class");
  });

  it("renders as child when asChild is true", () => {
    render(
      <Button asChild>
        <a href="/test">Link button</a>
      </Button>,
    );
    expect(screen.getByRole("link", { name: "Link button" })).toBeInTheDocument();
  });

  it("is disabled when disabled prop is passed", async () => {
    render(<Button disabled>Disabled</Button>);
    expect(screen.getByRole("button", { name: "Disabled" })).toBeDisabled();
  });

  it("is disabled and shows spinner when loading is true", () => {
    const { container } = render(<Button loading>Save</Button>);
    const btn = screen.getByRole("button");
    expect(btn).toBeDisabled();
    expect(container.querySelector("svg")).toBeInTheDocument();
    expect(screen.getByText("Save")).toBeInTheDocument();
  });

  it("does not fire onClick when loading", async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();
    render(<Button loading onClick={handleClick}>Save</Button>);
    await user.click(screen.getByRole("button"));
    expect(handleClick).not.toHaveBeenCalled();
  });

  it("does not show spinner when asChild and loading", () => {
    const { container } = render(
      <Button asChild loading>
        <a href="/test">Link</a>
      </Button>,
    );
    expect(container.querySelector("svg")).not.toBeInTheDocument();
  });

  it("calls onClick when clicked", async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Clickable</Button>);
    await user.click(screen.getByRole("button", { name: "Clickable" }));
    expect(handleClick).toHaveBeenCalledOnce();
  });

  it.each([
    ["destructive" as const],
    ["outline" as const],
    ["secondary" as const],
    ["ghost" as const],
    ["link" as const],
  ])("renders variant %s", (variant) => {
    render(<Button variant={variant}>{variant}</Button>);
    expect(screen.getByRole("button", { name: variant })).toBeInTheDocument();
  });

  it.each([
    ["sm" as const],
    ["md" as const],
    ["lg" as const],
    ["icon" as const],
  ])("renders size %s", (size) => {
    render(<Button size={size}>size</Button>);
    expect(screen.getByRole("button", { name: "size" })).toBeInTheDocument();
  });
});
