<script lang="ts">
import { cn } from "../utils/cn";
import { useAccordionContext, useAccordionItemContext } from "../composables/useAccordion";

  let { class: className, children, ...restProps }: {

    class?: string;
    children?: import('svelte').Snippet;
    [key: string]: any;
  } = $props();



const { activeItems } = useAccordionContext();
const { value } = useAccordionItemContext();
let isOpen = $derived(activeItems.value.includes(value));
let classes = $derived(cn("overflow-hidden text-sm", className));
</script>

<div v-if="isOpen" class={classes} {...restProps}>
    <div class="pb-4 pt-0">
      {@render children?.()}
    </div>
  </div>
