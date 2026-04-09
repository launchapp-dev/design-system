import { inject, provide, type ComputedRef } from "vue";

interface ToggleGroupContext {
  value: ComputedRef<string | string[] | undefined>;
  variant: ComputedRef<string>;
  size: ComputedRef<string>;
  type: "single" | "multiple";
  toggle: (v: string) => void;
}

const TOGGLE_GROUP_KEY = Symbol("toggle-group");

export function provideToggleGroupContext(ctx: ToggleGroupContext) {
  provide<ToggleGroupContext>(TOGGLE_GROUP_KEY, ctx);
}

export function useToggleGroupContext(): ToggleGroupContext {
  const ctx = inject<ToggleGroupContext>(TOGGLE_GROUP_KEY);
  if (!ctx) throw new Error("ToggleGroupItem must be used within <LaToggleGroup>");
  return ctx;
}
