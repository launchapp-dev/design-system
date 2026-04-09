<script setup lang="ts">
import { useCollapsibleContext } from "../composables/useCollapsible";

const { toggle } = useCollapsibleContext();
</script>

<template>
  <span @click="toggle">
    <slot />
  </span>
</template>
