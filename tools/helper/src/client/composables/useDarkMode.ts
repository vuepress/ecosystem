import type { Ref } from 'vue'
import { readonly, ref } from 'vue'

import { getDarkMode } from '../utils/index.js'

const darkmode: Ref<boolean> = ref(false)

// Ensure darkmode is initialized only once in client-side
if (typeof document !== 'undefined') {
  darkmode.value = getDarkMode()

  const mutationObserver = new MutationObserver(() => {
    darkmode.value = getDarkMode()
  })

  mutationObserver.observe(document.documentElement, {
    attributeFilter: ['data-theme'],
    attributes: true,
  })
}

/**
 * Get darkmode status
 *
 * 获取暗色模式状态
 *
 * @returns Readonly darkmode ref / 只读的暗色模式响应式引用
 */

export const useDarkMode = (): Readonly<Ref<boolean>> => readonly(darkmode)
