import ButtonPanel from '@renderer/components/ButtonPanel.vue'
import CalcButton from '@renderer/components/CalcButton.vue'

/**
 * 電卓が持つすべての状態を保管する
 */
export interface CalculatorState {
  /** 現在の遷移状態 */
  status: CalculatorStateType
  /** 現在入力中の数字 */
  currentValue: string
  /** 直前に入力した、計算処理用に保持している数字 */
  previousValue: string
  operator: string
}

/**
 * 電卓が持ち、遷移する状態の一覧
 */
export type CalculatorStateType =
  | 'IDLE'
  | 'INPUT_LEFT'
  | 'INPUT_RIGHT'
  | 'INPUT_OPERATOR'
  | 'RESULT'
  | 'ERROR'

/**
 * 電卓処理の際に送るデータの集まり
 */
export interface CalculatorEvent {
  type: CalculatorEventType
  value: CalculatorKeyType
}

/**
 * 電卓処理イベントの一覧
 */
export type CalculatorEventType =
  | 'DIGIT'
  | 'OPERATOR'
  | 'EQUAL'
  | 'NEGATE'
  | 'ERASEALL'
  | 'ERASE'
  | 'ERASEDIGIT'
  | 'EMPTY'

/**
 * 電卓処理送信イベント
 */
export type SendEvent = (event: CalculatorEvent) => void

/**
 * ボタンクリックエフェクトの明示的発火イベント
 */
export type RippleEvent = (el: HTMLElement) => void

/**
 * {@link CalculatorKeyType}の配列版
 */
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

/**
 * 電卓処理で使う内部キーの一覧
 * @summary JavaScript標準のKeyBoardEventで使うキーに対応した、電卓処理で使う内部キーの一覧
 */
export type CalculatorKeyType = (typeof calculatorKeyTypeRaw)[number]

/**
 * ButtonPanelコンポーネントの型
 */
export type ButtonPanelInstance = InstanceType<typeof ButtonPanel>

/**
 * CalcButtonコンポーネントの型
 */
export type CalcButtonInstance = InstanceType<typeof CalcButton>
