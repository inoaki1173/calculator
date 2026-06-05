import { onMounted, onUnmounted, ref, Ref } from 'vue'

import { transition } from '@renderer/core/calculatorState'
import {
  CalculatorState,
  CalculatorEvent,
  CalculatorKeyType,
  SendEvent
} from '@renderer/types/calculatorType'
import { isKeyType, keyToEventType } from '@renderer/core/keyTypeUtils'

/** Composable関数 */
export const useCalculator = (): UseCalculator => {
  // キーボード入力イベントの登録
  onMounted(() => {
    window.addEventListener('keydown', handleKeyDown)
  })

  // キーボード入力イベントの解除
  onUnmounted(() => {
    window.removeEventListener('keydown', handleKeyDown)
  })

  return {
    ...state.value,
    send: send
  }
}

// Composable返却値
interface UseCalculator {
  value: string
  previousValue: string
  operator: string
  send: SendEvent
}

/** 電卓の状態 */
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

/** キーボード入力時の処理 */
const handleKeyDown = (event: KeyboardEvent): void => {
  // KeyType以外はスルー
  if (isKeyType(event.key) === false) {
    return
  }

  // 送信用データを生成
  const key: CalculatorKeyType = event.key as CalculatorKeyType
  const calculatorEvent: CalculatorEvent = {
    type: keyToEventType(key),
    value: key
  }

  send(calculatorEvent)
}
