import { ref, Ref } from 'vue'

import { CalculatorState, transition } from '@renderer/core/calculatorState'
import { SendEvent } from '@renderer/types/calculatorType'

const state: Ref<CalculatorState> = ref({
  status: 'IDLE',
  value: '',
  previousValue: '',
  operator: ''
})

/** イベントを通知する */
const send: SendEvent = (event) => {
  state.value = transition(state.value, event)
}

// Composable返却値
interface UseCalculator {
  value: string
  previousValue: string
  operator: string
  send: SendEvent
}

/** Composable関数 */
export const useCalculator = (): UseCalculator => {
  return {
    ...state.value,
    send: send
  }
}
