<script setup lang="ts">
import { inject, useTemplateRef } from 'vue'

import { CalculatorEvent, SendEvent } from '@renderer/types/calculatorType'
import { useCalcButton } from '@renderer/composables/useCalcButton'
import { VBtn } from 'vuetify/components'

const { triggerRipple } = useCalcButton()

defineProps<{
  label: string
  event: CalculatorEvent
}>()

// クリックエフェクト用関数を親に公開
const buttonRef = useTemplateRef('button')
const triggerButtonRipple = (): void => triggerRipple(buttonRef.value?.$el)
defineExpose({ triggerButtonRipple })

// 電卓処理イベントを取得
const sendEvent = inject<SendEvent>('sendEvent')
</script>

<template>
  <v-btn
    ref="button"
    v-ripple.center
    :text="label"
    class="calc-button button-ripple"
    @click="sendEvent?.(event)"
  />
</template>
