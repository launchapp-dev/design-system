<script lang="ts">
import { cn } from "../utils/cn";
import { useSelectContext } from "../composables/useSelect";

  let { class: className, children, ...restProps }: {

    class?: string;
    children?: import('svelte').Snippet;
    [key: string]: any;
  } = $props();



const { toggle, open } = useSelectContext();

let classes = $derived(
cn(
    "flex h-10 w-full items-center justify-between rounded-[--la-radius] border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
    className,
  ),
);
</script>

<button type="button" class={classes} aria-haspopup="listbox" :aria-expanded="open" @click="toggle" {...restProps}>
    {@render children?.()}
    <svg class="h-4 w-4 opacity-50 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M6 9l6 6 6-6" />
    </svg>
  </button>
