<script lang="ts">
import { usePopoverContext } from "../composables/usePopover";

const { toggle } = usePopoverContext();
</script>

<span @click="toggle" {...restProps}>
    {@render children?.()}
  </span>
