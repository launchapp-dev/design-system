import { inject, provide, type ComputedRef } from "vue";

interface RadioGroupContext {
  value: ComputedRef<string | undefined>;
  onChange: (v: string) => void;
}

const RADIO_KEY = Symbol("radio-group");

export function provideRadioGroupContext(ctx: RadioGroupContext) {
  provide<RadioGroupContext>(RADIO_KEY, ctx);
}

export function useRadioGroupContext(): RadioGroupContext {
  const ctx = inject<RadioGroupContext>(RADIO_KEY);
  if (!ctx) throw new Error("RadioGroupItem must be used within <LaRadioGroup>");
  return ctx;
}
