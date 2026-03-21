import * as React from "react";
import * as MenubarPrimitive from "@radix-ui/react-menubar";
import { cn } from "../../lib/utils";

const MenubarMenu = MenubarPrimitive.Menu;

const MenubarGroup = MenubarPrimitive.Group;

const MenubarPortal = MenubarPrimitive.Portal;

const MenubarSub = MenubarPrimitive.Sub;

const MenubarRadioGroup = MenubarPrimitive.RadioGroup;

function MenubarRoot({ className, ref, ...props }: React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Root> & { ref?: React.Ref<React.ComponentRef<typeof MenubarPrimitive.Root>> }) {
  return (
  <MenubarPrimitive.Root
    ref={ref}
    className={cn(
      "flex h-9 items-center gap-1 rounded-md border border-border bg-background px-1",
      className
    )}
    {...props}
  />
);
}
MenubarRoot.displayName = MenubarPrimitive.Root.displayName;

function MenubarTrigger({ className, ref, ...props }: React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Trigger> & { ref?: React.Ref<React.ComponentRef<typeof MenubarPrimitive.Trigger>> }) {
  return (
  <MenubarPrimitive.Trigger
    ref={ref}
    className={cn(
      "flex cursor-default select-none items-center rounded px-3 py-2 md:py-1 text-sm font-medium outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[state=open]:bg-accent data-[state=open]:text-accent-foreground min-h-[44px] md:min-h-0",
      className
    )}
    {...props}
  />
);
}
MenubarTrigger.displayName = MenubarPrimitive.Trigger.displayName;

function MenubarSubTrigger({ className, inset, children, ref, ...props }: React.ComponentPropsWithoutRef<typeof MenubarPrimitive.SubTrigger> & {
    inset?: boolean;
  } & { ref?: React.Ref<React.ComponentRef<typeof MenubarPrimitive.SubTrigger>> }) {
  return (
  <MenubarPrimitive.SubTrigger
    ref={ref}
    className={cn(
      "flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent data-[state=open]:bg-accent [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
      inset && "pl-8",
      className
    )}
    {...props}
  >
    {children}
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="ml-auto"
      aria-hidden="true"
    >
      <path d="m9 18 6-6-6-6" />
    </svg>
  </MenubarPrimitive.SubTrigger>
);
}
MenubarSubTrigger.displayName = MenubarPrimitive.SubTrigger.displayName;

function MenubarSubContent({ className, ref, ...props }: React.ComponentPropsWithoutRef<typeof MenubarPrimitive.SubContent> & { ref?: React.Ref<React.ComponentRef<typeof MenubarPrimitive.SubContent>> }) {
  return (
  <MenubarPrimitive.SubContent
    ref={ref}
    className={cn(
      "z-50 min-w-[8rem] overflow-hidden rounded-md border border-border bg-popover p-1 text-popover-foreground shadow-lg data-[state=open]:animate-scale-in data-[state=closed]:animate-fade-out",
      className
    )}
    {...props}
  />
);
}
MenubarSubContent.displayName = MenubarPrimitive.SubContent.displayName;

function MenubarContent({ className, align = "start", alignOffset = -4, sideOffset = 8, ref, ...props }: React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Content> & { ref?: React.Ref<React.ComponentRef<typeof MenubarPrimitive.Content>> }) {
  return (
  <MenubarPrimitive.Portal>
    <MenubarPrimitive.Content
      ref={ref}
      align={align}
      alignOffset={alignOffset}
      sideOffset={sideOffset}
      className={cn(
        "z-50 min-w-[12rem] overflow-hidden rounded-md border border-border bg-popover p-1 text-popover-foreground shadow-md data-[state=open]:animate-scale-in data-[state=closed]:animate-fade-out",
        className
      )}
      {...props}
    />
  </MenubarPrimitive.Portal>
);
}
MenubarContent.displayName = MenubarPrimitive.Content.displayName;

function MenubarItem({ className, inset, ref, ...props }: React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Item> & {
    inset?: boolean;
  } & { ref?: React.Ref<React.ComponentRef<typeof MenubarPrimitive.Item>> }) {
  return (
  <MenubarPrimitive.Item
    ref={ref}
    className={cn(
      "relative flex cursor-default select-none items-center gap-2 rounded-sm px-3 md:px-2 py-4 md:py-1.5 text-base md:text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 min-h-[44px] md:min-h-0",
      inset && "pl-8",
      className
    )}
    {...props}
  />
);
}
MenubarItem.displayName = MenubarPrimitive.Item.displayName;

function MenubarCheckboxItem({ className, children, checked, ref, ...props }: React.ComponentPropsWithoutRef<typeof MenubarPrimitive.CheckboxItem> & { ref?: React.Ref<React.ComponentRef<typeof MenubarPrimitive.CheckboxItem>> }) {
  return (
  <MenubarPrimitive.CheckboxItem
    ref={ref}
    className={cn(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    )}
    checked={checked}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <MenubarPrimitive.ItemIndicator>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M20 6 9 17l-5-5" />
        </svg>
      </MenubarPrimitive.ItemIndicator>
    </span>
    {children}
  </MenubarPrimitive.CheckboxItem>
);
}
MenubarCheckboxItem.displayName = MenubarPrimitive.CheckboxItem.displayName;

function MenubarRadioItem({ className, children, ref, ...props }: React.ComponentPropsWithoutRef<typeof MenubarPrimitive.RadioItem> & { ref?: React.Ref<React.ComponentRef<typeof MenubarPrimitive.RadioItem>> }) {
  return (
  <MenubarPrimitive.RadioItem
    ref={ref}
    className={cn(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    )}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <MenubarPrimitive.ItemIndicator>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <circle cx="12" cy="12" r="4" fill="currentColor" />
        </svg>
      </MenubarPrimitive.ItemIndicator>
    </span>
    {children}
  </MenubarPrimitive.RadioItem>
);
}
MenubarRadioItem.displayName = MenubarPrimitive.RadioItem.displayName;

function MenubarLabel({ className, inset, ref, ...props }: React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Label> & {
    inset?: boolean;
  } & { ref?: React.Ref<React.ComponentRef<typeof MenubarPrimitive.Label>> }) {
  return (
  <MenubarPrimitive.Label
    ref={ref}
    className={cn(
      "px-2 py-1.5 text-xs font-semibold text-muted-foreground",
      inset && "pl-8",
      className
    )}
    {...props}
  />
);
}
MenubarLabel.displayName = MenubarPrimitive.Label.displayName;

function MenubarSeparator({ className, ref, ...props }: React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Separator> & { ref?: React.Ref<React.ComponentRef<typeof MenubarPrimitive.Separator>> }) {
  return (
  <MenubarPrimitive.Separator
    ref={ref}
    className={cn("-mx-1 my-1 h-px bg-border", className)}
    {...props}
  />
);
}
MenubarSeparator.displayName = MenubarPrimitive.Separator.displayName;

const MenubarShortcut = ({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) => (
  <span
    className={cn("ml-auto text-xs tracking-widest opacity-60", className)}
    {...props}
  />
);
MenubarShortcut.displayName = "MenubarShortcut";

export {
  MenubarRoot,
  MenubarMenu,
  MenubarTrigger,
  MenubarContent,
  MenubarItem,
  MenubarCheckboxItem,
  MenubarRadioItem,
  MenubarLabel,
  MenubarSeparator,
  MenubarShortcut,
  MenubarGroup,
  MenubarPortal,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarRadioGroup,
};
