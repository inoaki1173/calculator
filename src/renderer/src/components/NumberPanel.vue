<script setup lang="ts">
import { ButtonInfo } from '@renderer/types/buttonType'

import NumberButton from '@renderer/components/NumberButton.vue'
import FunctionButton from '@renderer/components/FunctionButton.vue'

const numberGrid: ButtonInfo[][] = [
  [
    { label: '→', type: 'function' },
    { label: 'CE', type: 'function' },
    { label: 'C', type: 'function' }
  ],
  [
    { label: '7', type: 'number' },
    { label: '8', type: 'number' },
    { label: '9', type: 'number' }
  ],
  [
    { label: '4', type: 'number' },
    { label: '5', type: 'number' },
    { label: '6', type: 'number' }
  ],
  [
    { label: '1', type: 'number' },
    { label: '2', type: 'number' },
    { label: '3', type: 'number' }
  ],
  [
    { label: '+/-', type: 'function' },
    { label: '0', type: 'number' },
    { label: '.', type: 'number' }
  ]
]
</script>

<template>
  <div class="number-panel">
    <div v-for="(row, idx) in numberGrid" :key="'row' + (idx + 1)" class="number-row">
      <div v-for="cell in row" :key="'cell' + cell" class="number-cell">
        <number-button v-if="cell.type === 'number'" :label="cell.label" />
        <function-button v-else-if="cell.type === 'function'" :label="cell.label" />
      </div>
    </div>
  </div>
</template>
