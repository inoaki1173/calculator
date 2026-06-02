import {
  CalculatorEventType,
  CalculatorKeyType,
  calculatorKeyTypeRaw
} from '@renderer/types/calculatorType'

export const isKeyType = (key: string): boolean => {
  return calculatorKeyTypeRaw.some((value) => value === key)
}

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
