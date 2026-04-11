<script lang="ts">
import { useSelectContext } from "../composables/useSelect";

  let { placeholder, class: className, ...restProps }: {
  placeholder?: string;
    class?: string;
    [key: string]: any;
  } = $props();



const { value } = useSelectContext();
</script>

<span class="truncate" {...restProps}>{{ value || placeholder }}</span>
