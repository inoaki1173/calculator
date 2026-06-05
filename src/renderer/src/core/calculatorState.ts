import { CalculatorStateType, CalculatorEvent } from '@renderer/types/calculatorType'

/** 電卓の情報 */
// 電卓が持つすべての状態を保持する
export interface CalculatorState {
  /** 現在の遷移状態 */
  status: CalculatorStateType
  /** 入力中の数字 */
  value: string
  /** 保持している値 */
  previousValue: string
  /** 入力されている演算子 */
  operator: string
}

/** 電卓の状態を変更する */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const transition = (state: CalculatorState, event: CalculatorEvent): CalculatorState => {
  return state
}
