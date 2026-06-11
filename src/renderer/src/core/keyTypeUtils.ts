import {
  CalculatorEventType,
  CalculatorKeyType,
  calculatorKeyTypeRaw
} from '@renderer/types/calculatorType'

/**
 * 文字列がKeyTypeに含まれているか
 *
 * @param
 * key - KeyTypeか確認したいキーの種類
 *
 * @returns
 * 確認した結果を返す
 * */
export const isKeyType = (key: string): boolean => {
  return calculatorKeyTypeRaw.some((value) => value === key)
}

/**
 * KeyTypeを対応する電卓イベントに変換する
 *
 * @param
 * key - 変換したいキーの種類
 *
 * @returns
 * 変換したイベントを返す
 */
export const keyToEventType = (key: CalculatorKeyType): CalculatorEventType => {
  switch (key) {
    case '0':
    case '1':
    case '2':
    case '3':
    case '4':
    case '5':
    case '6':
    case '7':
    case '8':
    case '9':
    case '.':
      return 'DIGIT'
    case 'n':
      return 'NEGATE'
    case '+':
    case '-':
    case '*':
    case '/':
      return 'OPERATOR'
    case 'Enter':
      return 'EQUAL'
    case 'Escape':
      return 'ERASEALL'
    case 'Delete':
      return 'ERASE'
    case 'Backspace':
      return 'ERASEDIGIT'
    default:
      return 'EMPTY'
  }
}
