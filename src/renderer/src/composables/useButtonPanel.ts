import { CalculatorEvent } from '@renderer/types/calculatorType'

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
    operatorGrid
  }
}

/** Composable関数の戻り値用 */
interface UseButtonPanel {
  numberGrid: ButtonInfo[][]
  operatorGrid: ButtonInfo[]
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
    { label: 'CE', event: { type: 'ERASEALL', value: 'Delete' } },
    { label: 'C', event: { type: 'ERASE', value: 'Escape' } }
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
