<script setup lang="ts">
import { useDropdownMenuContext } from "../composables/useDropdownMenu";

const { toggle } = useDropdownMenuContext();
</script>

<template>
  <span @click="toggle">
    <slot />
  </span>
</template>
