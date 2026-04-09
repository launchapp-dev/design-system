<script setup lang="ts">
import { ref } from "vue";
import { provideDropdownMenuContext } from "../composables/useDropdownMenu";

const open = ref(false);
const containerRef = ref<HTMLElement | null>(null);

function toggle() {
  open.value = !open.value;
}

function close() {
  open.value = false;
}

provideDropdownMenuContext({ open, containerRef, toggle, close });
</script>

<template>
  <div ref="containerRef" class="relative inline-block">
    <slot />
  </div>
</template>
