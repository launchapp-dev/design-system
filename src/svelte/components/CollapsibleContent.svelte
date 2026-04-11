<script lang="ts">
import { useCollapsibleContext } from "../composables/useCollapsible";

const { open } = useCollapsibleContext();
</script>

<div v-if="open" {...restProps}>
    {@render children?.()}
  </div>
