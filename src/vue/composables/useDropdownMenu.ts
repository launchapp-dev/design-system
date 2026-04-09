import { inject, provide, ref, type Ref } from "vue";

interface DropdownMenuContext {
  open: Ref<boolean>;
  containerRef: Ref<HTMLElement | null>;
  toggle: () => void;
  close: () => void;
}

const DROPDOWN_KEY = Symbol("dropdown-menu");

export function provideDropdownMenuContext(ctx: DropdownMenuContext) {
  provide<DropdownMenuContext>(DROPDOWN_KEY, ctx);
}

export function useDropdownMenuContext(): DropdownMenuContext {
  const ctx = inject<DropdownMenuContext>(DROPDOWN_KEY);
  if (!ctx) throw new Error("DropdownMenu components must be used within <LaDropdownMenu>");
  return ctx;
}
