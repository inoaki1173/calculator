<script setup lang="ts">
import CalcButton from '@renderer/components/CalcButton.vue'
import { CalculatorEvent } from '@renderer/types/calculatorType'

interface ButtonInfo {
  label: string
  event: CalculatorEvent
}

// 各数字/機能ボタンの情報
const numberGrid: ButtonInfo[][] = [
  [
    { label: '→', event: { type: 'ERASEDIGIT', value: '→' } },
    { label: 'CE', event: { type: 'ERASEALL' } },
    { label: 'C', event: { type: 'ERASE' } }
  ],
  [
    { label: '7', event: { type: 'DIGIT', value: '7' } },
    { label: '8', event: { type: 'DIGIT', value: '8' } },
    { label: '9', event: { type: 'DIGIT', value: '9' } }
  ],
  [
    { label: '4', event: { type: 'DIGIT', value: '4' } },
    { label: '5', event: { type: 'DIGIT', value: '5' } },
    { label: '6', event: { type: 'DIGIT', value: '6' } }
  ],
  [
    { label: '1', event: { type: 'DIGIT', value: '1' } },
    { label: '2', event: { type: 'DIGIT', value: '2' } },
    { label: '3', event: { type: 'DIGIT', value: '3' } }
  ],
  [
    { label: '+/-', event: { type: 'NEGATE' } },
    { label: '0', event: { type: 'DIGIT', value: '0' } },
    { label: '.', event: { type: 'DIGIT', value: '.' } }
  ]
]

// 各演算子ボタンのラベル
const operatorGrid: ButtonInfo[] = [
  { label: '÷', event: { type: 'OPERATOR', value: '÷' } },
  { label: '×', event: { type: 'OPERATOR', value: '×' } },
  { label: '-', event: { type: 'OPERATOR', value: '-' } },
  { label: '+', event: { type: 'OPERATOR', value: '+' } },
  { label: '=', event: { type: 'EQUAL', value: '=' } }
]
</script>

<template>
  <div class="button-panel">
    <div class="number-panel">
      <div v-for="(row, idx) in numberGrid" :key="'row-' + (idx + 1)" class="number-row">
        <div v-for="info in row" :key="'cell-' + info.label" class="number-cell">
          <calc-button :label="info.label" :event="info.event" />
        </div>
      </div>
    </div>
    <div class="operator-panel">
      <div v-for="info in operatorGrid" :key="info.label" class="operator-cell">
        <calc-button
          :label="info.label"
          :event="info.event"
          :class="{ 'equal-button': info.event.type === 'EQUAL' }"
        />
      </div>
    </div>
  </div>
</template>
