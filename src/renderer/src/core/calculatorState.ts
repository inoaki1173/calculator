import {
  CalculatorState,
  CalculatorStateType,
  CalculatorEvent,
  CalculatorEventType,
  CalculatorKeyType
} from '@renderer/types/calculatorType'
import clonedeep from 'lodash.clonedeep'
import { Ref, ref } from 'vue'
import { calculate } from '@renderer/core/calcFunction'
import { errorText } from '@renderer/types/errorTypes'

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
export const transition = (
  state: Readonly<CalculatorState>,
  event: CalculatorEvent
): CalculatorState => {
  const returnedState: CalculatorState = clonedeep(state)

  /**
   * 状態とイベントをそれぞれ比較する
   * @param status - 電卓の状態
   * @param type - イベントの種類
   * @returns - 現在のデータと合致しているか
   */
  const check = (status: CalculatorStateType, type: CalculatorEventType): boolean => {
    return state.status === status && event.type === type
  }

  /**
   * 数字入力処理
   */
  const addNumber = (): void => {
    if (MAX_VALUE_SIZE <= returnedState.currentValue.replace('.', '').length) {
      return
    }
    if (event.value === '.') {
      // すでに小数点が入力されているなら中止
      if (returnedState.currentValue.includes('.')) {
        return
      }
      // 初期状態では空白表示のため、0を付け足す
      if (returnedState.currentValue === '') {
        returnedState.currentValue = '0'
      }
    }
    // 直前の値が0のみの場合、上書きする
    else if (returnedState.currentValue === '0') {
      returnedState.currentValue = ''
    }

    returnedState.currentValue += event.value
  }

  /**
   * 計算結果を保存する
   * @summary 現在の入力値を使って計算を行い、結果を更新する \
   *          オーバーフロー等の場合は更新されない
   *
   * @returns 計算結果が更新されたか
   */
  const updateResult = (): boolean => {
    const result = calculate(
      returnedState.previousValue,
      returnedState.currentValue,
      returnedState.operator as CalculatorKeyType
    )

    if (MAX_VALUE_SIZE < result.replace('.', '').length) {
      return false
    }
    currentResult.value = result
    return true
  }

  const showError = (errorText: string): void => {
    returnedState.status = 'ERROR'
    returnedState.currentValue = errorText
    returnedState.previousValue = ''
    returnedState.operator = ''
  }

  // 状態とイベントに応じて、異なる処理を行う
  if (check('IDLE', 'DIGIT')) {
    // 初期状態 : 数字入力処理

    returnedState.status = 'INPUT_LEFT'
    addNumber()
  } else if (check('INPUT_LEFT', 'DIGIT') || check('INPUT_RIGHT', 'DIGIT')) {
    // 左辺入力状態 / 右辺入力状態 : 数字入力処理

    addNumber()
  } else if (check('INPUT_OPERATOR', 'DIGIT')) {
    // 演算子入力状態 : 数字入力処理

    returnedState.status = 'INPUT_RIGHT'
    addNumber()
  } else if (check('RESULT', 'DIGIT')) {
    // 計算結果確定状態 : 数字入力処理

    returnedState.status = 'INPUT_LEFT'
    returnedState.currentValue = ''
    returnedState.previousValue = ''
    returnedState.operator = ''
    addNumber()
  } else if (check('INPUT_LEFT', 'OPERATOR')) {
    // 左辺入力状態 : 演算子入力処理

    if (returnedState.currentValue.at(-1) === '.') {
      returnedState.currentValue += '0'
    }

    returnedState.status = 'INPUT_OPERATOR'
    returnedState.previousValue = returnedState.currentValue
    returnedState.currentValue = ''
    returnedState.operator = event.value
  } else if (check('INPUT_OPERATOR', 'OPERATOR')) {
    // 演算子入力状態 : 演算子入力処理

    returnedState.operator = event.value
  } else if (check('INPUT_RIGHT', 'EQUAL')) {
    // 右辺入力状態 : 計算実行処理

    returnedState.status = 'RESULT'
    const success: boolean = updateResult()
    if (success == false) {
      showError(errorText.overflow)
    }
  } else if (check('RESULT', 'OPERATOR')) {
    // 計算結果確定状態 : 演算子入力処理

    returnedState.status = 'INPUT_OPERATOR'
    returnedState.currentValue = ''
    returnedState.previousValue = currentResult.value
    returnedState.operator = event.value
  } else if (event.type === 'ERASEALL') {
    // すべての状態 : 全消去処理

    returnedState.status = 'IDLE'
    returnedState.currentValue = ''
    returnedState.previousValue = ''
    returnedState.operator = ''
  } else if (check('INPUT_LEFT', 'ERASE') || check('INPUT_RIGHT', 'ERASE')) {
    // 左辺入力状態 / 右辺入力状態 : 現在値消去処理

    returnedState.currentValue = '0'
  } else if (check('INPUT_LEFT', 'ERASEDIGIT') || check('INPUT_RIGHT', 'ERASEDIGIT')) {
    // 左辺入力状態 / 右辺入力状態 : 1桁消去処理

    if (returnedState.currentValue.length) {
      returnedState.currentValue = returnedState.currentValue.slice(
        0,
        returnedState.currentValue.length - 1
      )
    }
    if (returnedState.currentValue.length <= 0) {
      returnedState.currentValue = '0'
    }
  }

  return returnedState
}

export const currentResult: Ref<string> = ref('')
