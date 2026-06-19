/**
 * 演算子の識別データを、表示用の文字列に変換する
 * @param operator - 変換する演算子
 * @returns 変換後の文字列。対象外なら空文字列を返す
 */
export const operatorToLabel = (operator: string): string => {
  switch (operator) {
    case '+':
    case '-':
      return operator
    case '*':
      return '×'
    case '/':
      return '÷'
    default:
      return ''
  }
}
