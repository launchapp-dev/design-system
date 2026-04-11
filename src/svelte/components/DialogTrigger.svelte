<script lang="ts">
import { useDialogContext } from "../composables/useDisclosure";

const { toggle } = useDialogContext();
</script>

<span @click="toggle" {...restProps}>
    {@render children?.()}
  </span>
