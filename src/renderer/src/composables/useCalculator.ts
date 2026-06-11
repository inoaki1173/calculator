import { onMounted, onUnmounted, ref, Ref } from 'vue'

import { transition } from '@renderer/core/calculatorState'
import {
  CalculatorState,
  CalculatorEvent,
  CalculatorKeyType,
  SendEvent
} from '@renderer/types/calculatorType'
import { isKeyType, keyToEventType } from '@renderer/core/keyTypeUtils'

/** Composable関数
 *
 * @returns
 * currentValue - 現在の数字 \
 * previousValue - 直前に入力した、計算処理用に保持している数字 \
 * operator - 現在の演算子 \
 * send - 電卓処理用イベント
 */
export const useCalculator = (): UseCalculator => {
  // キーボード入力による電卓処理を登録
  onMounted(() => {
    window.addEventListener('keydown', handleKeyDown)
  })

  onUnmounted(() => {
    window.removeEventListener('keydown', handleKeyDown)
  })

  return {
    ...state.value,
    send: send
  }
}

/** Composable関数の戻り値用 */
interface UseCalculator {
  currentValue: string
  previousValue: string
  operator: string
  send: SendEvent
}

/** 電卓が管理する現在のデータ */
const state: Ref<CalculatorState> = ref({
  status: 'IDLE',
  currentValue: '',
  previousValue: '',
  operator: ''
})

/**
 * 電卓処理イベントを通知する
 *
 * @param
 * event - 電卓処理の内容
 */
const send: SendEvent = (event) => {
  state.value = transition(state.value, event)
}

/**
 * キーボード入力を電卓処理に変換して実行する
 *
 * @param
 * event - 入力されたキーボードのキー
 */
const handleKeyDown = (event: KeyboardEvent): void => {
  if (isKeyType(event.key) === false) {
    return
  }

  // 電卓処理用送信データを生成
  const key: CalculatorKeyType = event.key as CalculatorKeyType
  const calculatorEvent: CalculatorEvent = {
    type: keyToEventType(key),
    value: key
  }

  send(calculatorEvent)
}
