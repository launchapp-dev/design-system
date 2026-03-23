import * as React from "react";
import * as NavigationMenuPrimitive from "@radix-ui/react-navigation-menu";
import { cva } from "class-variance-authority";
import { cn } from "../../lib/utils";

function NavigationMenu({ className, children, ref, ...props }: React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Root> & { ref?: React.Ref<React.ComponentRef<typeof NavigationMenuPrimitive.Root>> }) {
  return (
  <NavigationMenuPrimitive.Root
    ref={ref}
    className={cn(
      "relative z-10 hidden md:flex max-w-max flex-1 items-center justify-center",
      className
    )}
    {...props}
  >
    {children}
    <NavigationMenuViewport />
  </NavigationMenuPrimitive.Root>
);
}
NavigationMenu.displayName = NavigationMenuPrimitive.Root.displayName;

function NavigationMenuList({ className, ref, ...props }: React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.List> & { ref?: React.Ref<React.ComponentRef<typeof NavigationMenuPrimitive.List>> }) {
  return (
  <NavigationMenuPrimitive.List
    ref={ref}
    className={cn(
      "group flex flex-1 list-none items-center justify-center gap-1",
      className
    )}
    {...props}
  />
);
}
NavigationMenuList.displayName = NavigationMenuPrimitive.List.displayName;

const NavigationMenuItem = NavigationMenuPrimitive.Item;

const navigationMenuTriggerStyle = cva(
  "group inline-flex h-9 w-max items-center justify-center rounded-[--la-radius] bg-[hsl(var(--la-background))] px-4 py-2 text-sm font-medium transition-colors hover:bg-[hsl(var(--la-accent))] hover:text-[hsl(var(--la-accent-foreground))] focus:bg-[hsl(var(--la-accent))] focus:text-[hsl(var(--la-accent-foreground))] focus:outline-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--la-ring))] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-[hsl(var(--la-accent)/0.5)] data-[state=open]:bg-[hsl(var(--la-accent)/0.5)]"
);

function NavigationMenuTrigger({ className, children, ref, ...props }: React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Trigger> & { ref?: React.Ref<React.ComponentRef<typeof NavigationMenuPrimitive.Trigger>> }) {
  return (
  <NavigationMenuPrimitive.Trigger
    ref={ref}
    className={cn(navigationMenuTriggerStyle(), "group", className)}
    {...props}
  >
    {children}
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="relative top-[1px] ms-1 h-3 w-3 transition duration-300 group-data-[state=open]:rotate-180"
      aria-hidden="true"
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  </NavigationMenuPrimitive.Trigger>
);
}
NavigationMenuTrigger.displayName = NavigationMenuPrimitive.Trigger.displayName;

function NavigationMenuContent({ className, ref, ...props }: React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Content> & { ref?: React.Ref<React.ComponentRef<typeof NavigationMenuPrimitive.Content>> }) {
  return (
  <NavigationMenuPrimitive.Content
    ref={ref}
    className={cn(
      "start-0 top-0 w-full md:absolute md:w-auto",
      "data-[motion^=from-]:animate-in data-[motion^=to-]:animate-out data-[motion^=from-]:fade-in data-[motion^=to-]:fade-out data-[motion=from-end]:slide-in-from-right-52 data-[motion=from-start]:slide-in-from-left-52 data-[motion=to-end]:slide-out-to-right-52 data-[motion=to-start]:slide-out-to-left-52",
      className
    )}
    {...props}
  />
);
}
NavigationMenuContent.displayName = NavigationMenuPrimitive.Content.displayName;

const NavigationMenuLink = NavigationMenuPrimitive.Link;

function NavigationMenuViewport({ className, ref, ...props }: React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Viewport> & { ref?: React.Ref<React.ComponentRef<typeof NavigationMenuPrimitive.Viewport>> }) {
  return (
  <div className={cn("absolute start-0 top-full flex justify-center")}>
    <NavigationMenuPrimitive.Viewport
      className={cn(
        "origin-top-center relative mt-1.5 h-[var(--radix-navigation-menu-viewport-height)] w-full overflow-hidden rounded-[--la-radius] border border-[hsl(var(--la-border))] bg-[hsl(var(--la-popover))] text-[hsl(var(--la-popover-foreground))] shadow-lg md:w-[var(--radix-navigation-menu-viewport-width)]",
        "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-90",
        className
      )}
      ref={ref}
      {...props}
    />
  </div>
);
}
NavigationMenuViewport.displayName =
  NavigationMenuPrimitive.Viewport.displayName;

function NavigationMenuIndicator({ className, ref, ...props }: React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Indicator> & { ref?: React.Ref<React.ComponentRef<typeof NavigationMenuPrimitive.Indicator>> }) {
  return (
  <NavigationMenuPrimitive.Indicator
    ref={ref}
    className={cn(
      "top-full z-[1] flex h-1.5 items-end justify-center overflow-hidden",
      "data-[state=visible]:animate-in data-[state=hidden]:animate-out data-[state=hidden]:fade-out data-[state=visible]:fade-in",
      className
    )}
    {...props}
  >
    <div className="relative top-[60%] h-2 w-2 rotate-45 rounded-tl-sm bg-[hsl(var(--la-border))] shadow-md" />
  </NavigationMenuPrimitive.Indicator>
);
}
NavigationMenuIndicator.displayName =
  NavigationMenuPrimitive.Indicator.displayName;

export {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuContent,
  NavigationMenuTrigger,
  NavigationMenuLink,
  NavigationMenuViewport,
  NavigationMenuIndicator,
  navigationMenuTriggerStyle,
};
