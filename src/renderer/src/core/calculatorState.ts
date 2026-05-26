import { CalculatorStateType, CalculatorEvent } from '@renderer/types/calculatorType'

/** 電卓の状態 */
export interface CalculatorState {
  status: CalculatorStateType
  value: string
  previousValue: string
  operator: string
}

/** 電卓の状態を変更する */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const transition = (state: CalculatorState, event: CalculatorEvent): CalculatorState => {
  return state
}
