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
    "flex h-10 w-full items-center justify-between rounded-[--la-radius] border border-[hsl(var(--la-input))] bg-[hsl(var(--la-background))] px-3 py-2 text-sm ring-offset-[hsl(var(--la-background))] placeholder:text-[hsl(var(--la-muted-foreground))] focus:outline-none focus:ring-2 focus:ring-[hsl(var(--la-ring))] focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
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
