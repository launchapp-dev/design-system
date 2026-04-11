<script lang="ts">
  import { cn } from "../utils/cn";

  let { class: className, ...restProps }: {
    class?: string;
        [key: string]: any;
  } = $props();

  let classes = $derived(cn("", className));
</script>

<input class={classes} {...restProps} />
