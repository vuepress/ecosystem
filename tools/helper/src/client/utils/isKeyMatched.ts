import { isString } from 'vuepress/shared'
import type { KeyOptions } from '../../shared/index.js'

/**
 * Check if keyboard event matches any of the provided hotkeys
 *
 * 检查键盘事件是否匹配提供的任何热键
 *
 * @param event - Keyboard event / 键盘事件
 * @param hotKeys - Array of hotkey configurations / 热键配置数组
 *
 * @returns Whether the event matches any hotkey / 事件是否匹配任何热键
 */
export const isKeyMatched = (
  event: KeyboardEvent,
  hotKeys: (KeyOptions | string)[],
): boolean =>
  hotKeys.some((item) => {
    if (isString(item)) return item === event.key

    const { key, ctrl = false, shift = false, alt = false } = item

    return (
      key === event.key &&
      ctrl === event.ctrlKey &&
      shift === event.shiftKey &&
      alt === event.altKey
    )
  })
