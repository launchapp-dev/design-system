<script setup lang="ts">
import { useCollapsibleContext } from "../composables/useCollapsible";

const { open } = useCollapsibleContext();
</script>

<template>
  <div v-if="open">
    <slot />
  </div>
</template>
