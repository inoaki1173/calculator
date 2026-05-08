<script setup lang="ts">
import CalcView from '@renderer/components/CalcView.vue'
import NumberPanel from '@renderer/components/NumberPanel.vue'
</script>

<template>
  <div class="calculator">
    <calc-view />
    <div class="input-region">
      <number-panel />
    </div>
  </div>
</template>
