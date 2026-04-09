<script setup lang="ts">
import { useDialogContext } from "../composables/useDisclosure";

const { close } = useDialogContext();
</script>

<template>
  <span @click="close">
    <slot />
  </span>
</template>
