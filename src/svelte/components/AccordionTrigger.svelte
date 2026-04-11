<script lang="ts">
import { cn } from "../utils/cn";
import { useAccordionContext, useAccordionItemContext } from "../composables/useAccordion";

  let { class: className, children, ...restProps }: {

    class?: string;
    children?: import('svelte').Snippet;
    [key: string]: any;
  } = $props();



const { activeItems, toggle } = useAccordionContext();
const { value } = useAccordionItemContext();
let isOpen = $derived(activeItems.value.includes(value));

let classes = $derived(
cn(
    "flex flex-1 items-center justify-between py-4 font-medium transition-all hover:underline",
    className,
  ),
);
</script>

<h3 class="flex" {...restProps}>
    <button
      type="button"
      :aria-expanded="isOpen"
      class={classes}
      @click="toggle(value)"
    >
      {@render children?.()}
      <svg
        class="h-4 w-4 shrink-0 transition-transform duration-200"
        :class="isOpen ? 'rotate-180' : ''"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
      >
        <path d="M6 9l6 6 6-6" />
      </svg>
    </button>
  </h3>
