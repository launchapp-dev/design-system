import type * as React from "react";
import { Command as CommandPrimitive } from "cmdk";
import { cn } from "@/lib/utils";

function Command({ className, ref, ...props }: React.ComponentPropsWithoutRef<typeof CommandPrimitive> & { ref?: React.Ref<React.ComponentRef<typeof CommandPrimitive>> }) {
  return (
  <CommandPrimitive
    ref={ref}
    className={cn(
      "flex h-full w-full flex-col overflow-hidden rounded-md bg-popover text-popover-foreground",
      className
    )}
    {...props}
  />
);
}
Command.displayName = CommandPrimitive.displayName;

const CommandDialog = ({
  children,
  ...props
}: React.ComponentPropsWithoutRef<typeof CommandPrimitive.Dialog>) => (
  <CommandPrimitive.Dialog
    className={cn(
      "[&_[cmdk-dialog-content]]:fixed [&_[cmdk-dialog-content]]:left-1/2 [&_[cmdk-dialog-content]]:top-[20%] [&_[cmdk-dialog-content]]:z-50 [&_[cmdk-dialog-content]]:w-full [&_[cmdk-dialog-content]]:max-w-lg [&_[cmdk-dialog-content]]:-translate-x-1/2",
      "[&_[cmdk-overlay]]:fixed [&_[cmdk-overlay]]:inset-0 [&_[cmdk-overlay]]:z-50 [&_[cmdk-overlay]]:bg-black/80"
    )}
    {...props}
  >
    <Command className="rounded-lg border border-border shadow-md">
      {children}
    </Command>
  </CommandPrimitive.Dialog>
);
CommandDialog.displayName = "CommandDialog";

function CommandInput({ className, ref, ...props }: React.ComponentPropsWithoutRef<typeof CommandPrimitive.Input> & { ref?: React.Ref<React.ComponentRef<typeof CommandPrimitive.Input>> }) {
  return (
  <div className="flex items-center border-b border-border px-3">
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
      className="mr-2 h-4 w-4 shrink-0 opacity-50"
      aria-hidden="true"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
    <CommandPrimitive.Input
      ref={ref}
      className={cn(
        "flex h-12 md:h-10 w-full rounded-md bg-transparent py-4 md:py-3 text-base md:text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    />
  </div>
);
}
CommandInput.displayName = CommandPrimitive.Input.displayName;

function CommandList({ className, ref, ...props }: React.ComponentPropsWithoutRef<typeof CommandPrimitive.List> & { ref?: React.Ref<React.ComponentRef<typeof CommandPrimitive.List>> }) {
  return (
  <CommandPrimitive.List
    ref={ref}
    className={cn("max-h-[300px] overflow-y-auto overflow-x-hidden p-1", className)}
    {...props}
  />
);
}
CommandList.displayName = CommandPrimitive.List.displayName;

function CommandEmpty({ ref, ...props }: React.ComponentProps<typeof CommandPrimitive.Empty>) {
  return (
    <CommandPrimitive.Empty
      ref={ref}
      className="py-6 text-center text-sm text-muted-foreground"
      {...props}
    />
  );
}
CommandEmpty.displayName = CommandPrimitive.Empty.displayName;

function CommandGroup({ className, ref, ...props }: React.ComponentPropsWithoutRef<typeof CommandPrimitive.Group> & { ref?: React.Ref<React.ComponentRef<typeof CommandPrimitive.Group>> }) {
  return (
  <CommandPrimitive.Group
    ref={ref}
    className={cn(
      "overflow-hidden p-1 text-foreground [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground",
      className
    )}
    {...props}
  />
);
}
CommandGroup.displayName = CommandPrimitive.Group.displayName;

function CommandSeparator({ className, ref, ...props }: React.ComponentPropsWithoutRef<typeof CommandPrimitive.Separator> & { ref?: React.Ref<React.ComponentRef<typeof CommandPrimitive.Separator>> }) {
  return (
  <CommandPrimitive.Separator
    ref={ref}
    className={cn("-mx-1 h-px bg-border", className)}
    {...props}
  />
);
}
CommandSeparator.displayName = CommandPrimitive.Separator.displayName;

function CommandItem({ className, ref, ...props }: React.ComponentPropsWithoutRef<typeof CommandPrimitive.Item> & { ref?: React.Ref<React.ComponentRef<typeof CommandPrimitive.Item>> }) {
  return (
  <CommandPrimitive.Item
    ref={ref}
    className={cn(
      "relative flex cursor-default select-none items-center gap-2 rounded-sm px-3 md:px-2 py-4 md:py-1.5 text-base md:text-sm outline-none data-[disabled=true]:pointer-events-none data-[selected=true]:bg-accent data-[selected=true]:text-accent-foreground data-[disabled=true]:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 min-h-[44px] md:min-h-0",
      className
    )}
    {...props}
  />
);
}
CommandItem.displayName = CommandPrimitive.Item.displayName;

const CommandShortcut = ({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) => (
  <span
    className={cn("ml-auto text-xs tracking-widest text-muted-foreground", className)}
    {...props}
  />
);
CommandShortcut.displayName = "CommandShortcut";

export {
  Command,
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandSeparator,
  CommandShortcut,
};
