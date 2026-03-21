import { describe, it, expect, beforeAll } from "vitest";
import { render, screen } from "@testing-library/react";
import * as React from "react";
import { TabContentCrossfade, TabPanel } from "./TabContentCrossfade";

beforeAll(() => {
  Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: (query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: () => {},
      removeListener: () => {},
      addEventListener: () => {},
      removeEventListener: () => {},
      dispatchEvent: () => false,
    }),
  });
});

describe("TabPanel", () => {
  it("renders with role=tabpanel", () => {
    render(<TabPanel tabKey="tab1">Content</TabPanel>);
    expect(screen.getByRole("tabpanel")).toBeInTheDocument();
  });

  it("has aria-labelledby derived from tabKey", () => {
    render(<TabPanel tabKey="overview">Content</TabPanel>);
    const panel = screen.getByRole("tabpanel");
    expect(panel).toHaveAttribute("aria-labelledby", "tab-overview");
  });

  it("uses explicit aria-labelledby when provided", () => {
    render(
      <TabPanel tabKey="overview" aria-labelledby="custom-tab-id">
        Content
      </TabPanel>
    );
    const panel = screen.getByRole("tabpanel");
    expect(panel).toHaveAttribute("aria-labelledby", "custom-tab-id");
  });
});

describe("TabContentCrossfade", () => {
  it("renders the active panel", () => {
    render(
      <TabContentCrossfade activeKey="tab1">
        <TabPanel tabKey="tab1">Panel 1</TabPanel>
        <TabPanel tabKey="tab2">Panel 2</TabPanel>
      </TabContentCrossfade>
    );
    expect(screen.getByText("Panel 1")).toBeInTheDocument();
    expect(screen.queryByText("Panel 2")).not.toBeInTheDocument();
  });

  it("active panel has aria-labelledby", () => {
    render(
      <TabContentCrossfade activeKey="tab1">
        <TabPanel tabKey="tab1">Panel 1</TabPanel>
      </TabContentCrossfade>
    );
    const panel = screen.getByRole("tabpanel");
    expect(panel).toHaveAttribute("aria-labelledby", "tab-tab1");
  });
});
