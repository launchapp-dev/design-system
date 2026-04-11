<script lang="ts">
import { cn } from "../utils/cn";

  let { class: className, children, ...restProps }: {

    class?: string;
    children?: import('svelte').Snippet;
    [key: string]: any;
  } = $props();



let classes = $derived(cn("inline-flex items-center gap-1.5", className));
</script>

<li class={classes} {...restProps}>
    {@render children?.()}
  </li>
