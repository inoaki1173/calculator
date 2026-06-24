import { CalculatorEvent, CalculatorEventType } from '@renderer/types/calculatorType'

/**
 * Composable関数
 *
 * @returns
 * numberGrid - 各数字/機能ボタンの情報 \
 * operatorGrid - 各演算子ボタンの情報
 */
export const useButtonPanel = (): UseButtonPanel => {
  return {
    numberGrid,
    operatorGrid,
    getButtonClass
  }
}

/** Composable関数の戻り値用 */
interface UseButtonPanel {
  numberGrid: ButtonInfo[][]
  operatorGrid: ButtonInfo[]
  getButtonClass: (type: CalculatorEventType) => string
}

/** ボタンの構成データ */
interface ButtonInfo {
  /** ボタン表示 */
  label: string
  event: CalculatorEvent
}

/** 各数字/機能ボタンの情報 */
const numberGrid: ButtonInfo[][] = [
  [
    { label: '→', event: { type: 'ERASEDIGIT', value: 'Backspace' } },
    { label: 'CE', event: { type: 'ERASE', value: 'Delete' } },
    { label: 'C', event: { type: 'ERASEALL', value: 'Escape' } }
  ],
  [
    { label: '7', event: { type: 'DIGIT', value: '7' } },
    { label: '8', event: { type: 'DIGIT', value: '8' } },
    { label: '9', event: { type: 'DIGIT', value: '9' } }
  ],
  [
    { label: '4', event: { type: 'DIGIT', value: '4' } },
    { label: '5', event: { type: 'DIGIT', value: '5' } },
    { label: '6', event: { type: 'DIGIT', value: '6' } }
  ],
  [
    { label: '1', event: { type: 'DIGIT', value: '1' } },
    { label: '2', event: { type: 'DIGIT', value: '2' } },
    { label: '3', event: { type: 'DIGIT', value: '3' } }
  ],
  [
    { label: '+/-', event: { type: 'NEGATE', value: 'n' } },
    { label: '0', event: { type: 'DIGIT', value: '0' } },
    { label: '.', event: { type: 'DIGIT', value: '.' } }
  ]
]

/** 各演算子ボタンの情報 */
const operatorGrid: ButtonInfo[] = [
  { label: '÷', event: { type: 'OPERATOR', value: '/' } },
  { label: '×', event: { type: 'OPERATOR', value: '*' } },
  { label: '-', event: { type: 'OPERATOR', value: '-' } },
  { label: '+', event: { type: 'OPERATOR', value: '+' } },
  { label: '=', event: { type: 'EQUAL', value: 'Enter' } }
]

/**
 * ボタンの持つイベントに応じたCSSクラス名を取得する
 *
 * @param
 * type - ボタンの持つイベントの種類
 *
 * @returns
 * CSSクラス名
 */
const getButtonClass = (type: CalculatorEventType): string => {
  switch (type) {
    case 'DIGIT':
    case 'NEGATE':
      return 'number-button'
    case 'ERASE':
    case 'ERASEALL':
    case 'ERASEDIGIT':
      return 'function-button'
    case 'OPERATOR':
      return 'operator-button'
    case 'EQUAL':
      return 'equal-button'
    default:
      return ''
  }
}
