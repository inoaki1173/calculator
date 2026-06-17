import { RippleEvent } from '@renderer/types/calculatorType'

interface UseCalcButton {
  triggerRipple: RippleEvent
}

export const useCalcButton = (): UseCalcButton => {
  return {
    triggerRipple
  }
}

/**
 * ボタンのマウスクリックイベントを発火させる
 */
const triggerRipple: RippleEvent = (el: HTMLElement): void => {
  const rect = el.getBoundingClientRect()
  const cx = rect.left + rect.width / 2
  const cy = rect.top + rect.height / 2

  el.dispatchEvent(
    new MouseEvent('mousedown', {
      bubbles: true,
      cancelable: true,
      clientX: cx,
      clientY: cy
    })
  )
  el.dispatchEvent(
    new MouseEvent('mouseup', {
      bubbles: true,
      cancelable: true,
      clientX: cx,
      clientY: cy
    })
  )
}
