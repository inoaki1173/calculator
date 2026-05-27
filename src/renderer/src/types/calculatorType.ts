/** 電卓の管理状態 */
export type CalculatorStateType =
  | 'IDLE'
  | 'INPUT_LEFT'
  | 'INPUT_RIGHT'
  | 'INPUT_OPERATOR'
  | 'RESULT'

/** 電卓処理イベント */
export interface CalculatorEvent {
  type: CalculatorEventType
  value?: string
}

/** 電卓処理イベントの種類 */
export type CalculatorEventType =
  | 'DIGIT'
  | 'OPERATOR'
  | 'EQUAL'
  | 'NEGATE'
  | 'ERASEALL'
  | 'ERASE'
  | 'ERASEDIGIT'
  | 'EMPTY'

/** 電卓処理送信イベント */
export type SendEvent = (event: CalculatorEvent) => void
