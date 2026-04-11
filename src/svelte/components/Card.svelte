<script lang="ts">
import { cn } from "../utils/cn";

  let { class: className, children, ...restProps }: {

    class?: string;
    children?: import('svelte').Snippet;
    [key: string]: any;
  } = $props();



let classes = $derived(
cn("rounded-[--la-radius] border border-[hsl(var(--la-border))] bg-[hsl(var(--la-card))] text-[hsl(var(--la-card-foreground))] shadow-sm", className),
);
</script>

<div class={classes} {...restProps}>
    {@render children?.()}
  </div>
