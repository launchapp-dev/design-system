<script lang="ts">
import { cn } from "../utils/cn";

  let { class: className, children, ...restProps }: {

    class?: string;
    children?: import('svelte').Snippet;
    [key: string]: any;
  } = $props();



let classes = $derived(cn("[&_tr]:border-b", className));
</script>

<thead class={classes} {...restProps}>
    {@render children?.()}
  </thead>
