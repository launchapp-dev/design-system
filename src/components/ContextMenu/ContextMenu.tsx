import type * as React from "react";
import * as ContextMenuPrimitive from "@radix-ui/react-context-menu";
import { cn } from "../../lib/utils";

const ContextMenu = ContextMenuPrimitive.Root;

const ContextMenuTrigger = ContextMenuPrimitive.Trigger;

const ContextMenuGroup = ContextMenuPrimitive.Group;

const ContextMenuPortal = ContextMenuPrimitive.Portal;

const ContextMenuSub = ContextMenuPrimitive.Sub;

const ContextMenuRadioGroup = ContextMenuPrimitive.RadioGroup;

function ContextMenuSubTrigger({ className, inset, children, ref, ...props }: React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.SubTrigger> & {
    inset?: boolean;
  } & { ref?: React.Ref<React.ComponentRef<typeof ContextMenuPrimitive.SubTrigger>> }) {
  return (
  <ContextMenuPrimitive.SubTrigger
    ref={ref}
    className={cn(
      "flex cursor-default select-none items-center gap-2 rounded-sm px-3 md:px-2 py-4 md:py-1.5 text-base md:text-sm outline-none focus:bg-accent data-[state=open]:bg-accent [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 min-h-[44px] md:min-h-0",
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
  </ContextMenuPrimitive.SubTrigger>
);
}
ContextMenuSubTrigger.displayName = ContextMenuPrimitive.SubTrigger.displayName;

function ContextMenuSubContent({ className, ref, ...props }: React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.SubContent> & { ref?: React.Ref<React.ComponentRef<typeof ContextMenuPrimitive.SubContent>> }) {
  return (
  <ContextMenuPrimitive.SubContent
    ref={ref}
    className={cn(
      "z-50 min-w-[8rem] overflow-hidden rounded-md border border-border bg-popover p-1 text-popover-foreground shadow-lg data-[state=open]:animate-scale-in data-[state=closed]:animate-fade-out",
      className
    )}
    {...props}
  />
);
}
ContextMenuSubContent.displayName = ContextMenuPrimitive.SubContent.displayName;

function ContextMenuContent({ className, ref, ...props }: React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Content> & { ref?: React.Ref<React.ComponentRef<typeof ContextMenuPrimitive.Content>> }) {
  return (
  <ContextMenuPrimitive.Portal>
    <ContextMenuPrimitive.Content
      ref={ref}
      className={cn(
        "z-50 min-w-[8rem] overflow-hidden rounded-md border border-border bg-popover p-1 text-popover-foreground shadow-md data-[state=open]:animate-scale-in data-[state=closed]:animate-fade-out",
        className
      )}
      {...props}
    />
  </ContextMenuPrimitive.Portal>
);
}
ContextMenuContent.displayName = ContextMenuPrimitive.Content.displayName;

function ContextMenuItem({ className, inset, ref, ...props }: React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Item> & {
    inset?: boolean;
  } & { ref?: React.Ref<React.ComponentRef<typeof ContextMenuPrimitive.Item>> }) {
  return (
  <ContextMenuPrimitive.Item
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
ContextMenuItem.displayName = ContextMenuPrimitive.Item.displayName;

function ContextMenuCheckboxItem({ className, children, checked, ref, ...props }: React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.CheckboxItem> & { ref?: React.Ref<React.ComponentRef<typeof ContextMenuPrimitive.CheckboxItem>> }) {
  return (
  <ContextMenuPrimitive.CheckboxItem
    ref={ref}
    className={cn(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    )}
    checked={checked}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <ContextMenuPrimitive.ItemIndicator>
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
      </ContextMenuPrimitive.ItemIndicator>
    </span>
    {children}
  </ContextMenuPrimitive.CheckboxItem>
);
}
ContextMenuCheckboxItem.displayName = ContextMenuPrimitive.CheckboxItem.displayName;

function ContextMenuRadioItem({ className, children, ref, ...props }: React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.RadioItem> & { ref?: React.Ref<React.ComponentRef<typeof ContextMenuPrimitive.RadioItem>> }) {
  return (
  <ContextMenuPrimitive.RadioItem
    ref={ref}
    className={cn(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    )}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <ContextMenuPrimitive.ItemIndicator>
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
      </ContextMenuPrimitive.ItemIndicator>
    </span>
    {children}
  </ContextMenuPrimitive.RadioItem>
);
}
ContextMenuRadioItem.displayName = ContextMenuPrimitive.RadioItem.displayName;

function ContextMenuLabel({ className, inset, ref, ...props }: React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Label> & {
    inset?: boolean;
  } & { ref?: React.Ref<React.ComponentRef<typeof ContextMenuPrimitive.Label>> }) {
  return (
  <ContextMenuPrimitive.Label
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
ContextMenuLabel.displayName = ContextMenuPrimitive.Label.displayName;

function ContextMenuSeparator({ className, ref, ...props }: React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Separator> & { ref?: React.Ref<React.ComponentRef<typeof ContextMenuPrimitive.Separator>> }) {
  return (
  <ContextMenuPrimitive.Separator
    ref={ref}
    className={cn("-mx-1 my-1 h-px bg-border", className)}
    {...props}
  />
);
}
ContextMenuSeparator.displayName = ContextMenuPrimitive.Separator.displayName;

const ContextMenuShortcut = ({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) => (
  <span
    className={cn("ml-auto text-xs tracking-widest opacity-60", className)}
    {...props}
  />
);
ContextMenuShortcut.displayName = "ContextMenuShortcut";

export {
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuCheckboxItem,
  ContextMenuRadioItem,
  ContextMenuLabel,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuGroup,
  ContextMenuPortal,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuRadioGroup,
};
