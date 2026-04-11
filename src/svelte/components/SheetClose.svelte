<script lang="ts">
import { useDialogContext } from "../composables/useDisclosure";

const { close } = useDialogContext();
</script>

<span @click="close" {...restProps}>
    {@render children?.()}
  </span>
