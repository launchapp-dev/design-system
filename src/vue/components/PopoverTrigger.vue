<script setup lang="ts">
import { usePopoverContext } from "../composables/usePopover";

const { toggle } = usePopoverContext();
</script>

<template>
  <span @click="toggle">
    <slot />
  </span>
</template>
