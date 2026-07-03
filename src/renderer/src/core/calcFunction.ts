import { CalculatorKeyType } from '@renderer/types/calculatorType'
import { Decimal } from 'decimal.js'

/**
 * 渡された文字列を基に計算を行う
 * @param left - 左辺の数字
 * @param right - 右辺の数字
 * @param operator - 演算子
 * @returns - 計算結果の文字列
 */
export const calculate = (left: string, right: string, operator: CalculatorKeyType): string => {
  if (Number.isNaN(left) || Number.isNaN(right)) {
    throw Error('計算処理に数字でない文字列が渡されました')
  }

  switch (operator) {
    case '+': {
      return Decimal(left).add(right).toFixed()
    }
    case '-': {
      return Decimal(left).sub(right).toFixed()
    }
    case '*': {
      return Decimal(left).mul(right).toFixed()
    }
    case '/': {
      return Decimal(left).div(right).toFixed()
    }
    default: {
      throw Error('演算子を入力してください')
    }
  }
}
