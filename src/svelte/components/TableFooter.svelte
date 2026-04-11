<script lang="ts">
import { cn } from "../utils/cn";

  let { class: className, children, ...restProps }: {

    class?: string;
    children?: import('svelte').Snippet;
    [key: string]: any;
  } = $props();



let classes = $derived(
cn("border-t border-[hsl(var(--la-border))] bg-[hsl(var(--la-muted)/0.5)] font-medium [&>tr]:last:border-b-0", className),
);
</script>

<tfoot class={classes} {...restProps}>
    {@render children?.()}
  </tfoot>
