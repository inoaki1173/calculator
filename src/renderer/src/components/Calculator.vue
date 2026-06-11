<script setup lang="ts">
import { provide } from 'vue'

import CalcView from '@renderer/components/CalcView.vue'
import ButtonPanel from '@renderer/components/ButtonPanel.vue'
import { useCalculator } from '@renderer/composables/useCalculator.js'

// 電卓処理用のイベントを登録
const { send } = useCalculator()
provide('sendEvent', send)
</script>

<template>
  <div class="calculator">
    <calc-view />
    <button-panel />
  </div>
</template>
