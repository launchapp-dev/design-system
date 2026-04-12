<script lang="ts">
import { cn } from "../utils/cn";

  let { class: className, children, ...restProps }: {

    class?: string;
    children?: import('svelte').Snippet;
    [key: string]: any;
  } = $props();



let classes = $derived(cn("mt-4 text-sm text-muted-foreground", className));
</script>

<caption class={classes} {...restProps}>
    {@render children?.()}
  </caption>
