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
