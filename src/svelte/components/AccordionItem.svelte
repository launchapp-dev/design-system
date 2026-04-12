<script lang="ts">
import { cn } from "../utils/cn";
import { provideAccordionItemContext, useAccordionContext } from "../composables/useAccordion";

  let { value, class: className, children, ...restProps }: {
  value: string;
    class?: string;
    children?: import('svelte').Snippet;
    [key: string]: any;
  } = $props();



provideAccordionItemContext({ value: value });
const { activeItems } = useAccordionContext();
let isOpen = $derived(activeItems.value.includes(value));
let classes = $derived(cn("border-b border-border", className));
</script>

<div class={classes} :data-state="isOpen ? 'open' : 'closed'" {...restProps}>
    {@render children?.()}
  </div>
