<script lang="ts">
  import { cn } from "../utils/cn";

  let { class: className, ...restProps }: {
    class?: string;
        [key: string]: any;
  } = $props();

  let classes = $derived(cn("relative flex touch-none select-none items-center", className));
</script>

<div class={classes} {...restProps} />
