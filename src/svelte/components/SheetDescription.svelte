<script lang="ts">
import { cn } from "../utils/cn";

  let { class: className, children, ...restProps }: {

    class?: string;
    children?: import('svelte').Snippet;
    [key: string]: any;
  } = $props();



let classes = $derived(cn("text-sm text-[hsl(var(--la-muted-foreground))]", className));
</script>

<p class={classes} {...restProps}>
    {@render children?.()}
  </p>
