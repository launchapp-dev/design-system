import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import * as React from "react";
import { MultiSelect } from "./MultiSelect";

const options = [
  { value: "apple", label: "Apple" },
  { value: "banana", label: "Banana" },
  { value: "cherry", label: "Cherry" },
];

describe("MultiSelect", () => {
  it("renders with combobox role", () => {
    render(<MultiSelect options={options} />);
    expect(screen.getByRole("combobox")).toBeInTheDocument();
  });

  it("trigger is not a button element (no invalid nesting)", () => {
    render(<MultiSelect options={options} value={["apple"]} />);
    const combobox = screen.getByRole("combobox");
    expect(combobox.tagName).not.toBe("BUTTON");
  });

  it("shows placeholder when no values selected", () => {
    render(<MultiSelect options={options} placeholder="Pick one" />);
    expect(screen.getByText("Pick one")).toBeInTheDocument();
  });

  it("shows selected badges", () => {
    render(<MultiSelect options={options} value={["apple", "banana"]} />);
    expect(screen.getByText("Apple")).toBeInTheDocument();
    expect(screen.getByText("Banana")).toBeInTheDocument();
  });

  it("remove buttons are accessible with aria-label", () => {
    render(<MultiSelect options={options} value={["apple"]} />);
    const removeBtn = screen.getByRole("button", { name: "Remove Apple" });
    expect(removeBtn).toBeInTheDocument();
  });

  it("remove button click calls onValueChange without the removed value", async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();
    render(
      <MultiSelect
        options={options}
        value={["apple", "banana"]}
        onValueChange={handleChange}
      />
    );
    await user.click(screen.getByRole("button", { name: "Remove Apple" }));
    expect(handleChange).toHaveBeenCalledWith(["banana"]);
  });

  it("has aria-multiselectable=true", () => {
    render(<MultiSelect options={options} />);
    expect(screen.getByRole("combobox")).toHaveAttribute("aria-multiselectable", "true");
  });

  it("is disabled when disabled prop is set", () => {
    render(<MultiSelect options={options} disabled />);
    const combobox = screen.getByRole("combobox");
    expect(combobox).toHaveAttribute("aria-disabled", "true");
  });
});
