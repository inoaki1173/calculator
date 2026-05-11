<script setup lang="ts">
import OperatorButton from '@renderer/components/OperatorButton.vue'

// 各演算子ボタンのラベル
const operatorColumn: string[] = ['÷', '×', '-', '+', '=']
</script>

<template>
  <div class="operator-panel">
    <div v-for="opr in operatorColumn" :key="opr" class="operator-col">
      <operator-button :label="opr" :class="{ 'equal-button': opr === '=' }" />
    </div>
  </div>
</template>
