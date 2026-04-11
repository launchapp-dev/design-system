<script lang="ts">
import { useCollapsibleContext } from "../composables/useCollapsible";

const { toggle } = useCollapsibleContext();
</script>

<span @click="toggle" {...restProps}>
    {@render children?.()}
  </span>
