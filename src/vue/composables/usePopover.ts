import { inject, provide, ref, type Ref } from "vue";

interface PopoverContext {
  open: Ref<boolean>;
  containerRef: Ref<HTMLElement | null>;
  toggle: () => void;
  close: () => void;
}

const POPOVER_KEY = Symbol("popover");

export function providePopoverContext(ctx: PopoverContext) {
  provide<PopoverContext>(POPOVER_KEY, ctx);
}

export function usePopoverContext(): PopoverContext {
  const ctx = inject<PopoverContext>(POPOVER_KEY);
  if (!ctx) throw new Error("Popover components must be used within <LaPopover>");
  return ctx;
}
