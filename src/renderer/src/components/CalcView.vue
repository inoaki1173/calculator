<script setup lang="ts">
defineProps<{
  result: string
  formula: string
}>()
</script>

<template>
  <div class="calc-view">
    <div class="formula">{{ formula }}</div>
    <div class="result">{{ result }}</div>
  </div>
</template>
