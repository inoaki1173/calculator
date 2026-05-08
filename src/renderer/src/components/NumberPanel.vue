<script setup lang="ts">
import NumberButton from '@renderer/components/NumberButton.vue'
const numberGrid: string[][] = [
  ['→', 'CE', 'C'],
  ['7', '8', '9'],
  ['4', '5', '6'],
  ['1', '2', '3'],
  ['+/-', '0', '.']
]
</script>

<template>
  <div class="number-panel">
    <div v-for="(row, idx) in numberGrid" :key="'row' + (idx + 1)" class="number-row">
      <div v-for="cell in row" :key="'cell' + cell" class="number-cell">
        <number-button :label="cell" />
      </div>
    </div>
  </div>
</template>
