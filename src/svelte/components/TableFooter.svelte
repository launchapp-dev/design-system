<script lang="ts">
import { cn } from "../utils/cn";

  let { class: className, children, ...restProps }: {

    class?: string;
    children?: import('svelte').Snippet;
    [key: string]: any;
  } = $props();



let classes = $derived(
cn("border-t border-border bg-muted/50 font-medium [&>tr]:last:border-b-0", className),
);
</script>

<tfoot class={classes} {...restProps}>
    {@render children?.()}
  </tfoot>
