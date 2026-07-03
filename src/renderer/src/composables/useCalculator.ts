import { computed, onMounted, onUnmounted, ref, Ref } from 'vue'

import { transition, currentResult } from '@renderer/core/calculatorState'
import {
  CalculatorState,
  CalculatorEvent,
  CalculatorKeyType,
  SendEvent,
  ButtonPanelInstance
} from '@renderer/types/calculatorType'
import { isKeyType, keyToEventType } from '@renderer/core/keyTypeUtils'
import { operatorToLabel } from '@renderer/core/operatorUtils'

/** Composable関数
 *
 * @returns
 * currentValue - 現在の数字 \
 * previousValue - 直前に入力した、計算処理用に保持している数字 \
 * operator - 現在の演算子 \
 * send - 電卓処理用イベント
 */
export const useCalculator = (buttonPanelRef: Ref<ButtonPanelInstance>): UseCalculator => {
  // キーボード入力による電卓処理を登録
  onMounted(() => {
    window.addEventListener('keydown', handleKeyDown)
    _buttonPanelRef = buttonPanelRef
  })

  onUnmounted(() => {
    window.removeEventListener('keydown', handleKeyDown)
  })

  return {
    displayResult,
    displayFormula,
    send: send
  }
}

/** Composable関数の戻り値用 */
interface UseCalculator {
  displayResult: Ref<string>
  displayFormula: Ref<string>
  send: SendEvent
}

/** 電卓が管理する現在のデータ */
const state: Ref<CalculatorState> = ref({
  status: 'IDLE',
  currentValue: '',
  previousValue: '',
  operator: ''
})

const displayResult = computed(() => {
  if (state.value.status === 'RESULT') {
    return currentResult.value
  } else {
    return state.value.currentValue
  }
})
const displayFormula = computed(() => {
  if (state.value.status === 'ERROR') {
    return ''
  } else {
    const displayEqual = state.value.status === 'RESULT' ? '=' : ''
    return `${state.value.previousValue} ${operatorToLabel(state.value.operator)} ${state.value.currentValue} ${displayEqual}`
  }
})

/** ボタンクリックエフェクト発火用 */
let _buttonPanelRef: Ref<ButtonPanelInstance>

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

  // ボタンクリックエフェクトを発動
  _buttonPanelRef.value.buttonRecord[event.key].triggerButtonRipple()

  // 電卓処理用送信データを生成
  const key: CalculatorKeyType = event.key as CalculatorKeyType
  const calculatorEvent: CalculatorEvent = {
    type: keyToEventType(key),
    value: key
  }

  send(calculatorEvent)
}
