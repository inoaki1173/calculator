<script setup lang="ts">
import CalcButton from '@renderer/components/CalcButton.vue'
import { useButtonPanel } from '@renderer/composables/useButtonPanel'

const { numberGrid, operatorGrid } = useButtonPanel()
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
