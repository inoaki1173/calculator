<script setup lang="ts">
import { ref, Ref } from 'vue'

import CalcButton from '@renderer/components/CalcButton.vue'
import { useButtonPanel } from '@renderer/composables/useButtonPanel'
import { CalcButtonInstance } from '@renderer/types/calculatorType'

const { numberGrid, operatorGrid, getButtonClass } = useButtonPanel()

const buttonRecord: Ref<Record<string, CalcButtonInstance>> = ref({})
defineExpose({ buttonRecord })
</script>

<template>
  <div class="button-panel">
    <div class="number-panel">
      <div v-for="(row, idx) in numberGrid" :key="'row-' + (idx + 1)" class="number-row">
        <div v-for="info in row" :key="'cell-' + info.label" class="number-cell">
          <calc-button
            :ref="(el) => (buttonRecord[info.event.value] = el as CalcButtonInstance)"
            :label="info.label"
            :event="info.event"
            :class="getButtonClass(info.event.type)"
          />
        </div>
      </div>
    </div>
    <div class="operator-panel">
      <div v-for="info in operatorGrid" :key="info.label" class="operator-cell">
        <calc-button
          :ref="(el) => (buttonRecord[info.event.value] = el as CalcButtonInstance)"
          :label="info.label"
          :event="info.event"
          :class="getButtonClass(info.event.type)"
        />
      </div>
    </div>
  </div>
</template>
