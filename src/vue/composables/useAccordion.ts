import { inject, provide, ref, type Ref } from "vue";

interface AccordionContext {
  activeItems: Ref<string[]>;
  type: "single" | "multiple";
  toggle: (value: string) => void;
}

const ACCORDION_KEY = Symbol("accordion");
const ACCORDION_ITEM_KEY = Symbol("accordion-item");

export function provideAccordionContext(ctx: AccordionContext) {
  provide<AccordionContext>(ACCORDION_KEY, ctx);
}

export function useAccordionContext(): AccordionContext {
  const ctx = inject<AccordionContext>(ACCORDION_KEY);
  if (!ctx) throw new Error("Accordion components must be used within <LaAccordion>");
  return ctx;
}

interface AccordionItemContext {
  value: string;
}

export function provideAccordionItemContext(ctx: AccordionItemContext) {
  provide<AccordionItemContext>(ACCORDION_ITEM_KEY, ctx);
}

export function useAccordionItemContext(): AccordionItemContext {
  const ctx = inject<AccordionItemContext>(ACCORDION_ITEM_KEY);
  if (!ctx) throw new Error("AccordionItem components must be used within <LaAccordionItem>");
  return ctx;
}
