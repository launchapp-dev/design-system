<script lang="ts">
  import { cn } from "../utils/cn";

  let { class: className, ...restProps }: {
    class?: string;
        [key: string]: any;
  } = $props();

  let classes = $derived(cn("shrink-0 bg-border", className));
</script>

<div class={classes} {...restProps} />
