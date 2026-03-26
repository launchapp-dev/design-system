import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import { BrandThemeGenerator } from "./BrandThemeGenerator";

describe("BrandThemeGenerator", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    global.fetch = vi.fn();
  });

  it("renders with URL input field", () => {
    render(<BrandThemeGenerator />);
    expect(
      screen.getByLabelText("Website Screenshot URL or Image URL")
    ).toBeInTheDocument();
  });

  it("renders analyze button", () => {
    render(<BrandThemeGenerator />);
    expect(screen.getByRole("button", { name: /analyze image/i })).toBeInTheDocument();
  });

  it("disables analyze button when URL is empty", async () => {
    const user = userEvent.setup();
    render(<BrandThemeGenerator />);
    const button = screen.getByRole("button", { name: /analyze image/i });
    expect(button).toBeDisabled();
  });

  it("enables analyze button when URL is provided", async () => {
    const user = userEvent.setup();
    render(<BrandThemeGenerator />);
    const input = screen.getByLabelText("Website Screenshot URL or Image URL");
    await user.type(input, "https://example.com/screenshot.png");
    expect(screen.getByRole("button", { name: /analyze image/i })).toBeEnabled();
  });

  it("shows error when analyze is clicked without URL", async () => {
    const user = userEvent.setup();
    render(<BrandThemeGenerator />);
    // Make sure URL field is empty
    expect(screen.getByRole("button", { name: /analyze image/i })).toBeDisabled();
  });

  it("calls API endpoint when analyze is clicked", async () => {
    const user = userEvent.setup();
    const mockResponse = {
      ok: true,
      json: async () => ({
        colors: {
          primary: "#3b82f6",
          secondary: "#6366f1",
          muted: "#94a3b8",
          accent: "#f59e0b",
          destructive: "#ef4444",
        },
        theme: {
          light: {},
          dark: {},
          cssString: "",
        },
      }),
    };

    vi.mocked(global.fetch).mockResolvedValueOnce(mockResponse as Response);

    render(<BrandThemeGenerator />);
    const input = screen.getByLabelText("Website Screenshot URL or Image URL");
    await user.type(input, "https://example.com/screenshot.png");
    await user.click(screen.getByRole("button", { name: /analyze image/i }));

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith("/api/analyze-brand", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ imageUrl: "https://example.com/screenshot.png" }),
      });
    });
  });

  it("displays extracted colors after API response", async () => {
    const user = userEvent.setup();
    const mockResponse = {
      ok: true,
      json: async () => ({
        colors: {
          primary: "#3b82f6",
          secondary: "#6366f1",
          muted: "#94a3b8",
          accent: "#f59e0b",
          destructive: "#ef4444",
        },
        theme: {
          light: {
            primary: "262 83% 58%",
            secondary: "240 4.8% 95.9%",
            muted: "240 4.8% 95.9%",
            accent: "240 4.8% 95.9%",
            destructive: "0 84.2% 60.2%",
            background: "0 0% 100%",
            foreground: "240 10% 3.9%",
            card: "0 0% 100%",
            "card-foreground": "240 10% 3.9%",
            popover: "0 0% 100%",
            "popover-foreground": "240 10% 3.9%",
            "primary-foreground": "0 0% 98%",
            "secondary-foreground": "240 5.9% 10%",
            "muted-foreground": "240 3.8% 46.1%",
            "accent-foreground": "240 5.9% 10%",
            "destructive-foreground": "0 0% 98%",
            border: "240 5.9% 90%",
            input: "240 5.9% 90%",
            ring: "262 83% 58%",
          },
          dark: {
            primary: "263 70% 50%",
            secondary: "240 3.7% 15.9%",
            muted: "240 3.7% 15.9%",
            accent: "240 3.7% 15.9%",
            destructive: "0 62.8% 30.6%",
            background: "240 10% 3.9%",
            foreground: "0 0% 98%",
            card: "240 10% 3.9%",
            "card-foreground": "0 0% 98%",
            popover: "240 10% 3.9%",
            "popover-foreground": "0 0% 98%",
            "primary-foreground": "0 0% 98%",
            "secondary-foreground": "0 0% 98%",
            "muted-foreground": "240 5% 64.9%",
            "accent-foreground": "0 0% 98%",
            "destructive-foreground": "0 0% 98%",
            border: "240 3.7% 15.9%",
            input: "240 3.7% 15.9%",
            ring: "263 70% 50%",
          },
          cssString: ":root { --la-primary: 262 83% 58%; }",
        },
      }),
    };

    vi.mocked(global.fetch).mockResolvedValueOnce(mockResponse as Response);

    render(<BrandThemeGenerator />);
    const input = screen.getByLabelText("Website Screenshot URL or Image URL");
    await user.type(input, "https://example.com/screenshot.png");
    await user.click(screen.getByRole("button", { name: /analyze image/i }));

    await waitFor(() => {
      expect(screen.getByText("Extracted Colors")).toBeInTheDocument();
    });
  });

  it("allows color override input", async () => {
    const user = userEvent.setup();
    const mockResponse = {
      ok: true,
      json: async () => ({
        colors: {
          primary: "#3b82f6",
          secondary: "#6366f1",
          muted: "#94a3b8",
          accent: "#f59e0b",
          destructive: "#ef4444",
        },
        theme: {
          light: {
            primary: "262 83% 58%",
            secondary: "240 4.8% 95.9%",
            muted: "240 4.8% 95.9%",
            accent: "240 4.8% 95.9%",
            destructive: "0 84.2% 60.2%",
            background: "0 0% 100%",
            foreground: "240 10% 3.9%",
            card: "0 0% 100%",
            "card-foreground": "240 10% 3.9%",
            popover: "0 0% 100%",
            "popover-foreground": "240 10% 3.9%",
            "primary-foreground": "0 0% 98%",
            "secondary-foreground": "240 5.9% 10%",
            "muted-foreground": "240 3.8% 46.1%",
            "accent-foreground": "240 5.9% 10%",
            "destructive-foreground": "0 0% 98%",
            border: "240 5.9% 90%",
            input: "240 5.9% 90%",
            ring: "262 83% 58%",
          },
          dark: {},
          cssString: "",
        },
      }),
    };

    vi.mocked(global.fetch).mockResolvedValueOnce(mockResponse as Response);

    render(<BrandThemeGenerator />);
    const input = screen.getByLabelText("Website Screenshot URL or Image URL");
    await user.type(input, "https://example.com/screenshot.png");
    await user.click(screen.getByRole("button", { name: /analyze image/i }));

    await waitFor(() => {
      expect(screen.getByText("Extracted Colors")).toBeInTheDocument();
    });
  });

  it("shows theme preview after analysis", async () => {
    const user = userEvent.setup();
    const mockResponse = {
      ok: true,
      json: async () => ({
        colors: {
          primary: "#3b82f6",
          secondary: "#6366f1",
          muted: "#94a3b8",
          accent: "#f59e0b",
          destructive: "#ef4444",
        },
        theme: {
          light: {
            primary: "262 83% 58%",
            secondary: "240 4.8% 95.9%",
            muted: "240 4.8% 95.9%",
            accent: "240 4.8% 95.9%",
            destructive: "0 84.2% 60.2%",
            background: "0 0% 100%",
            foreground: "240 10% 3.9%",
            card: "0 0% 100%",
            "card-foreground": "240 10% 3.9%",
            popover: "0 0% 100%",
            "popover-foreground": "240 10% 3.9%",
            "primary-foreground": "0 0% 98%",
            "secondary-foreground": "240 5.9% 10%",
            "muted-foreground": "240 3.8% 46.1%",
            "accent-foreground": "240 5.9% 10%",
            "destructive-foreground": "0 0% 98%",
            border: "240 5.9% 90%",
            input: "240 5.9% 90%",
            ring: "262 83% 58%",
          },
          dark: {},
          cssString: "",
        },
      }),
    };

    vi.mocked(global.fetch).mockResolvedValueOnce(mockResponse as Response);

    render(<BrandThemeGenerator />);
    const input = screen.getByLabelText("Website Screenshot URL or Image URL");
    await user.type(input, "https://example.com/screenshot.png");
    await user.click(screen.getByRole("button", { name: /analyze image/i }));

    await waitFor(() => {
      expect(screen.getByText("Theme Preview")).toBeInTheDocument();
    });
  });

  it("shows save theme form after analysis", async () => {
    const user = userEvent.setup();
    const mockResponse = {
      ok: true,
      json: async () => ({
        colors: {
          primary: "#3b82f6",
          secondary: "#6366f1",
          muted: "#94a3b8",
          accent: "#f59e0b",
          destructive: "#ef4444",
        },
        theme: {
          light: {
            primary: "262 83% 58%",
            secondary: "240 4.8% 95.9%",
            muted: "240 4.8% 95.9%",
            accent: "240 4.8% 95.9%",
            destructive: "0 84.2% 60.2%",
            background: "0 0% 100%",
            foreground: "240 10% 3.9%",
            card: "0 0% 100%",
            "card-foreground": "240 10% 3.9%",
            popover: "0 0% 100%",
            "popover-foreground": "240 10% 3.9%",
            "primary-foreground": "0 0% 98%",
            "secondary-foreground": "240 5.9% 10%",
            "muted-foreground": "240 3.8% 46.1%",
            "accent-foreground": "240 5.9% 10%",
            "destructive-foreground": "0 0% 98%",
            border: "240 5.9% 90%",
            input: "240 5.9% 90%",
            ring: "262 83% 58%",
          },
          dark: {},
          cssString: "",
        },
      }),
    };

    vi.mocked(global.fetch).mockResolvedValueOnce(mockResponse as Response);

    render(<BrandThemeGenerator />);
    const input = screen.getByLabelText("Website Screenshot URL or Image URL");
    await user.type(input, "https://example.com/screenshot.png");
    await user.click(screen.getByRole("button", { name: /analyze image/i }));

    await waitFor(() => {
      expect(screen.getByText("Save Generated Theme")).toBeInTheDocument();
    });
  });

  it("calls onSaveTheme callback with theme and name", async () => {
    const user = userEvent.setup();
    const onSaveTheme = vi.fn();
    const mockResponse = {
      ok: true,
      json: async () => ({
        colors: {
          primary: "#3b82f6",
          secondary: "#6366f1",
          muted: "#94a3b8",
          accent: "#f59e0b",
          destructive: "#ef4444",
        },
        theme: {
          light: {
            primary: "262 83% 58%",
            secondary: "240 4.8% 95.9%",
            muted: "240 4.8% 95.9%",
            accent: "240 4.8% 95.9%",
            destructive: "0 84.2% 60.2%",
            background: "0 0% 100%",
            foreground: "240 10% 3.9%",
            card: "0 0% 100%",
            "card-foreground": "240 10% 3.9%",
            popover: "0 0% 100%",
            "popover-foreground": "240 10% 3.9%",
            "primary-foreground": "0 0% 98%",
            "secondary-foreground": "240 5.9% 10%",
            "muted-foreground": "240 3.8% 46.1%",
            "accent-foreground": "240 5.9% 10%",
            "destructive-foreground": "0 0% 98%",
            border: "240 5.9% 90%",
            input: "240 5.9% 90%",
            ring: "262 83% 58%",
          },
          dark: {},
          cssString: ":root {}",
        },
      }),
    };

    vi.mocked(global.fetch).mockResolvedValueOnce(mockResponse as Response);

    render(<BrandThemeGenerator onSaveTheme={onSaveTheme} />);
    const input = screen.getByLabelText("Website Screenshot URL or Image URL");
    await user.type(input, "https://example.com/screenshot.png");
    await user.click(screen.getByRole("button", { name: /analyze image/i }));

    await waitFor(() => {
      expect(screen.getByLabelText("Theme Name")).toBeInTheDocument();
    });

    const themeName = screen.getByLabelText("Theme Name");
    await user.type(themeName, "My Brand");
    await user.click(screen.getByRole("button", { name: /save theme/i }));

    expect(onSaveTheme).toHaveBeenCalled();
  });
});
