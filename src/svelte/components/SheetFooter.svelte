<script lang="ts">
import { cn } from "../utils/cn";

  let { class: className, children, ...restProps }: {

    class?: string;
    children?: import('svelte').Snippet;
    [key: string]: any;
  } = $props();



let classes = $derived(
cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className),
);
</script>

<div class={classes} {...restProps}>
    {@render children?.()}
  </div>
