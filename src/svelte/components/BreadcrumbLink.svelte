<script lang="ts">
import { cn } from "../utils/cn";

  let { href, class: className, children, ...restProps }: {
  href?: string;
    class?: string;
    children?: import('svelte').Snippet;
    [key: string]: any;
  } = $props();



let classes = $derived(
cn("transition-colors hover:text-foreground", className),
);
</script>

<a v-if="href" :href="href" class={classes} {...restProps}>
    {@render children?.()}
  </a>
  <span v-else class={classes}>
    {@render children?.()}
  </span>
