import {
  CalculatorState,
  CalculatorStateType,
  CalculatorEvent,
  CalculatorEventType
} from '@renderer/types/calculatorType'
import clonedeep from 'lodash.clonedeep'

/** 電卓の現在数字の最大桁数 */
export const MAX_VALUE_SIZE = 10

/**
 * 電卓処理イベントに応じて、データの更新、状態遷移を行う
 * 現在の状態とイベント内容に応じて、状態を遷移させる

 * @param
 * state - 現在の電卓が持つ状態 \
 * この関数によってデータは直接更新されない
 * @param
 * event - 実行する電卓処理イベントの内容

 * @returns
 * 更新後のデータを返す
 */
export const transition = (state: CalculatorState, event: CalculatorEvent): CalculatorState => {
  const returnedState: CalculatorState = clonedeep(state)

  // 状態とイベントを判定する関数
  const check = (status: CalculatorStateType, type: CalculatorEventType): boolean => {
    return state.status === status && event.type === type
  }

  // 状態とイベントに応じて、異なる処理を行う
  if (check('IDLE', 'DIGIT')) {
    // 初期状態 : 数字入力処理

    returnedState.status = 'INPUT_LEFT'

    // 初期状態では何も表示されていないため、0を付け足す
    if (event.value === '.') {
      returnedState.currentValue = '0.'
    }
    returnedState.currentValue = event.value
  } else if (check('INPUT_LEFT', 'DIGIT') || check('INPUT_RIGHT', 'DIGIT')) {
    // 左辺入力状態 / 右辺入力状態 : 数字入力処理

    if (event.value === '.' && state.currentValue.includes('.')) {
      return state
    }
    if (returnedState.currentValue.length < MAX_VALUE_SIZE) {
      returnedState.currentValue += event.value
    }
  } else if (check('INPUT_OPERATOR', 'DIGIT')) {
    // 演算子入力状態 : 数字入力処理

    returnedState.status = 'INPUT_RIGHT'
    returnedState.currentValue = event.value
  } else if (check('RESULT', 'DIGIT')) {
    // 計算結果確定状態 : 数字入力処理

    returnedState.status = 'INPUT_LEFT'
    returnedState.currentValue = event.value
    returnedState.previousValue = ''
    returnedState.operator = ''
  }
  return returnedState
}
