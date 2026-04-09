<script setup lang="ts">
import { useDialogContext } from "../composables/useDisclosure";

const { toggle } = useDialogContext();
</script>

<template>
  <span @click="toggle">
    <slot />
  </span>
</template>
