<script setup lang="ts">
// Props定義
interface Props {
  label: string
}

defineProps<Props>()
</script>

<template>
  <v-btn :text="label" class="function-button" />
</template>
