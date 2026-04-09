import { inject, provide, type Ref } from "vue";

interface CollapsibleContext {
  open: Ref<boolean>;
  toggle: () => void;
}

const COLLAPSIBLE_KEY = Symbol("collapsible");

export function provideCollapsibleContext(ctx: CollapsibleContext) {
  provide<CollapsibleContext>(COLLAPSIBLE_KEY, ctx);
}

export function useCollapsibleContext(): CollapsibleContext {
  const ctx = inject<CollapsibleContext>(COLLAPSIBLE_KEY);
  if (!ctx) throw new Error("Collapsible components must be used within <LaCollapsible>");
  return ctx;
}
