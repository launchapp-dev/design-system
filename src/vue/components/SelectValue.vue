<script setup lang="ts">
import { useSelectContext } from "../composables/useSelect";

interface Props {
  placeholder?: string;
}

const props = defineProps<Props>();
const { value } = useSelectContext();
</script>

<template>
  <span class="truncate">{{ value || placeholder }}</span>
</template>
