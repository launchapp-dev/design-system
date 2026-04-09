import { inject, provide, ref, type Ref } from "vue";

interface SelectContext {
  open: Ref<boolean>;
  value: Ref<string>;
  containerRef: Ref<HTMLElement | null>;
  select: (v: string) => void;
  close: () => void;
  toggle: () => void;
}

const SELECT_KEY = Symbol("select");

export function provideSelectContext(ctx: SelectContext) {
  provide<SelectContext>(SELECT_KEY, ctx);
}

export function useSelectContext(): SelectContext {
  const ctx = inject<SelectContext>(SELECT_KEY);
  if (!ctx) throw new Error("Select components must be used within <LaSelect>");
  return ctx;
}
