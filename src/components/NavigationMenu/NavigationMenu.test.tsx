import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import * as React from "react";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  navigationMenuTriggerStyle,
} from "./NavigationMenu";

describe("NavigationMenuTrigger", () => {
  it("renders a trigger button", () => {
    render(
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Menu</NavigationMenuTrigger>
            <NavigationMenuContent>Content</NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    );
    expect(screen.getByText("Menu")).toBeInTheDocument();
  });

  it("trigger style includes focus-visible ring classes", () => {
    const style = navigationMenuTriggerStyle();
    expect(style).toContain("focus-visible:ring-2");
    expect(style).toContain("focus-visible:ring-offset-2");
  });

  it("trigger style does not solely rely on focus:outline-none without focus-visible ring", () => {
    const style = navigationMenuTriggerStyle();
    expect(style).toContain("focus-visible:ring-2");
  });
});

describe("NavigationMenu", () => {
  it("renders navigation landmark", () => {
    render(
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Item</NavigationMenuTrigger>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    );
    expect(screen.getByRole("navigation")).toBeInTheDocument();
  });
});
