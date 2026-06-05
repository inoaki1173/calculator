<script setup lang="ts">
import { inject } from 'vue'

import { CalculatorEvent, SendEvent } from '@renderer/types/calculatorType'

interface Props {
  label: string
  event: CalculatorEvent
}
defineProps<Props>()

// 電卓処理イベントを取得
const sendEvent = inject<SendEvent>('sendEvent')
</script>

<template>
  <v-btn :text="label" class="calc-button" @click="sendEvent?.(event)" />
</template>
