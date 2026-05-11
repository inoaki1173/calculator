/** ボタンの種類 */
export type ButtonType = 'number' | 'function' | 'operator'

/** ボタンの種類と文字の情報を持つ */
export interface ButtonInfo {
  label: string
  type: ButtonType
}
