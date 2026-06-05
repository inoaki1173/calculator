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

/** 電卓の状態遷移用 */
export type CalculatorStateType =
  | 'IDLE'
  | 'INPUT_LEFT'
  | 'INPUT_RIGHT'
  | 'INPUT_OPERATOR'
  | 'RESULT'

/** 電卓処理イベント */
export interface CalculatorEvent {
  type: CalculatorEventType
  value: CalculatorKeyType
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

/** CalculatorKeyTypeの配列版 */
// CalculatorKeyTypeを配列として扱いたい場合に利用する
export const calculatorKeyTypeRaw = [
  '0',
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  '.',
  '+',
  '-',
  '*',
  '/',
  'Enter',
  'Escape',
  'Delete',
  'Backspace',
  'n'
] as const

/** 電卓処理で扱うキー */
/*
JavaScript標準のKeyBoardEventに対応したキーの中から、
電卓処理で使うものを抽出したType
*/
export type CalculatorKeyType = (typeof calculatorKeyTypeRaw)[number]
