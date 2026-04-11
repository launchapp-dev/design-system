<script lang="ts">
import { cn } from "../utils/cn";

  let { class: className, children, ...restProps }: {

    class?: string;
    children?: import('svelte').Snippet;
    [key: string]: any;
  } = $props();



let classes = $derived(cn("text-lg font-semibold text-[hsl(var(--la-foreground))]", className));
</script>

<h2 class={classes} {...restProps}>
    {@render children?.()}
  </h2>
