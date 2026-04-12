<script lang="ts">
import { cn } from "../utils/cn";

  let { class: className, children, ...restProps }: {

    class?: string;
    children?: import('svelte').Snippet;
    [key: string]: any;
  } = $props();



let classes = $derived(cn("font-normal text-foreground", className));
</script>

<span aria-current="page" class={classes} {...restProps}>
    {@render children?.()}
  </span>
