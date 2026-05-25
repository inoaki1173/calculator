<script setup lang="ts">
interface Props {
  label: string
}

defineProps<Props>()
</script>

<template>
  <v-btn :text="label" class="calc-button" />
</template>
