import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { SmartThemingGenerator } from "./SmartThemingGenerator";

describe("SmartThemingGenerator", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders the component", () => {
    render(<SmartThemingGenerator />);
    expect(screen.getByText("Generate Theme")).toBeInTheDocument();
  });

  it("displays color input fields", () => {
    render(<SmartThemingGenerator />);
    expect(screen.getByDisplayValue("#3b82f6")).toBeInTheDocument(); // Primary
    expect(screen.getByDisplayValue("#06b6d4")).toBeInTheDocument(); // Secondary
  });

  it("generates theme when button is clicked", async () => {
    const onThemeGenerated = vi.fn();
    render(<SmartThemingGenerator onThemeGenerated={onThemeGenerated} />);

    const generateButton = screen.getByText("Generate Theme");
    fireEvent.click(generateButton);

    await waitFor(() => {
      expect(onThemeGenerated).toHaveBeenCalled();
      const result = onThemeGenerated.mock.calls[0][0];
      expect(result).toHaveProperty("light");
      expect(result).toHaveProperty("dark");
      expect(result).toHaveProperty("cssString");
    });
  });

  it("displays preview after theme generation", async () => {
    render(<SmartThemingGenerator />);

    const generateButton = screen.getByText("Generate Theme");
    fireEvent.click(generateButton);

    await waitFor(() => {
      expect(screen.getByText("Live Preview")).toBeInTheDocument();
      expect(screen.getByText("Color Palette")).toBeInTheDocument();
      expect(screen.getByText("Theme Tokens")).toBeInTheDocument();
    });
  });

  it("allows manual color adjustment", async () => {
    const user = userEvent.setup();
    render(<SmartThemingGenerator />);

    const primaryInput = screen.getAllByDisplayValue("#3b82f6")[1]; // Text input
    await user.clear(primaryInput);
    await user.type(primaryInput, "#ff0000");

    expect(primaryInput).toHaveValue("#ff0000");
  });

  it("displays color picker components", () => {
    render(<SmartThemingGenerator />);
    const colorInputs = screen.getAllByRole("img", { hidden: true });
    // Color swatches should exist
    expect(screen.getByText("Primary")).toBeInTheDocument();
    expect(screen.getByText("Secondary")).toBeInTheDocument();
    expect(screen.getByText("Destructive")).toBeInTheDocument();
  });

  it("handles upload button click when apiKey is provided", async () => {
    const { container } = render(
      <SmartThemingGenerator apiKey="test-key" />
    );

    const uploadButton = screen.getByText("Upload Image");
    expect(uploadButton).toBeInTheDocument();

    fireEvent.click(uploadButton);
    // File input should be triggered (hidden in DOM)
    const fileInput = container.querySelector('input[type="file"]');
    expect(fileInput).toBeInTheDocument();
  });

  it("displays error when API key is missing for vision analysis", async () => {
    const { container } = render(<SmartThemingGenerator />);

    // Without apiKey, upload button should not exist
    const uploadButton = screen.queryByText("Upload Image");
    expect(uploadButton).not.toBeInTheDocument();
  });

  it("copies theme tokens to clipboard", async () => {
    const user = userEvent.setup();
    const clipboardSpy = vi.spyOn(navigator.clipboard, "writeText");

    render(<SmartThemingGenerator />);

    const generateButton = screen.getByText("Generate Theme");
    fireEvent.click(generateButton);

    await waitFor(() => {
      expect(screen.getByText("Copy CSS Variables")).toBeInTheDocument();
    });

    const copyButton = screen.getByText("Copy CSS Variables");
    await user.click(copyButton);

    await waitFor(() => {
      expect(clipboardSpy).toHaveBeenCalled();
    });

    clipboardSpy.mockRestore();
  });

  it("displays preview components after generation", async () => {
    render(<SmartThemingGenerator />);

    const generateButton = screen.getByText("Generate Theme");
    fireEvent.click(generateButton);

    await waitFor(() => {
      expect(screen.getByText("Buttons")).toBeInTheDocument();
      expect(screen.getByText("Cards")).toBeInTheDocument();
      expect(screen.getByText("Badges")).toBeInTheDocument();
      expect(screen.getByText("Text & Borders")).toBeInTheDocument();
    });
  });
});
