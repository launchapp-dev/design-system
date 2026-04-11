<script lang="ts">
import { useDropdownMenuContext } from "../composables/useDropdownMenu";

const { toggle } = useDropdownMenuContext();
</script>

<span @click="toggle" {...restProps}>
    {@render children?.()}
  </span>
