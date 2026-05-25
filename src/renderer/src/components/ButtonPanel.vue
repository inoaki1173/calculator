<script setup lang="ts">
import CalcButton from '@renderer/components/CalcButton.vue'

// 各数字/機能ボタンのラベル
const numberGrid: string[][] = [
  ['→', 'CE', 'C'],
  ['7', '8', '9'],
  ['4', '5', '6'],
  ['1', '2', '3'],
  ['+/-', '0', '.']
]

// 各演算子ボタンのラベル
const operatorGrid: string[] = ['÷', '×', '-', '+', '=']
</script>

<template>
  <div class="button-panel">
    <div class="number-panel">
      <div v-for="(row, idx) in numberGrid" :key="'row-' + (idx + 1)" class="number-row">
        <div v-for="label in row" :key="'cell-' + label" class="number-cell">
          <calc-button :label="label" />
        </div>
      </div>
    </div>
    <div class="operator-panel">
      <div v-for="label in operatorGrid" :key="label" class="operator-col">
        <calc-button :label="label" :class="{ 'equal-button': label === '=' }" />
      </div>
    </div>
  </div>
</template>
