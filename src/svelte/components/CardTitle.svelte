<script lang="ts">
import { cn } from "../utils/cn";

  let { class: className, children, ...restProps }: {

    class?: string;
    children?: import('svelte').Snippet;
    [key: string]: any;
  } = $props();



let classes = $derived(cn("text-2xl font-semibold leading-none tracking-tight", className));
</script>

<h3 class={classes} {...restProps}>
    {@render children?.()}
  </h3>
