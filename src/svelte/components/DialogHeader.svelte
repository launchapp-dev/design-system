<script lang="ts">
import { cn } from "../utils/cn";

  let { class: className, children, ...restProps }: {

    class?: string;
    children?: import('svelte').Snippet;
    [key: string]: any;
  } = $props();



let classes = $derived(cn("flex flex-col space-y-1.5 text-center sm:text-left", className));
</script>

<div class={classes} {...restProps}>
    {@render children?.()}
  </div>
