<script setup lang="ts">
import { provide, Ref, useTemplateRef } from 'vue'

import CalcView from '@renderer/components/CalcView.vue'
import ButtonPanel from '@renderer/components/ButtonPanel.vue'
import { useCalculator } from '@renderer/composables/useCalculator.js'
import { ButtonPanelInstance } from '@renderer/types/calculatorType'

// キーボード入力用クリックイベントを取得
const buttonPanelRef = useTemplateRef('buttonPanel')

// 電卓処理用のイベントを登録
const { send } = useCalculator(buttonPanelRef as Ref<ButtonPanelInstance>)
provide('sendEvent', send)
</script>

<template>
  <div class="calculator">
    <calc-view />
    <button-panel ref="buttonPanel" />
  </div>
</template>
