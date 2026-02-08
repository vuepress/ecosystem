// oxlint-disable promise/prefer-await-to-callbacks
import type { DocSearchProps } from '@docsearch/react'
import { isMacOS, isiPad } from '@vuepress/helper/client'
import { useEventListener } from '@vueuse/core'
import type { ComputedRef } from 'vue'

/**
 * Add hotkey listener, remove it after triggered
 *
 * @param options - DocSearch options / DocSearch 配置项
 * @param callback - Callback function to open search modal / 打开搜索模态框的回调函数
 */
export const useDocSearchHotkeyListener = (
  options: ComputedRef<DocSearchProps>,
  callback: () => void,
): void => {
  const cleanup = useEventListener('keydown', (event) => {
    const { keyboardShortcuts = {} } = options.value
    const triggerByHotKey =
      keyboardShortcuts['Ctrl/Cmd+K'] !== false &&
      event.key === 'k' &&
      (isMacOS() || isiPad() ? event.metaKey : event.ctrlKey)
    const triggeredBySlashKey =
      keyboardShortcuts['/'] !== false && event.key === '/'

    if (triggerByHotKey || triggeredBySlashKey) {
      event.preventDefault()
      callback()
      cleanup()
    }
  })
}
