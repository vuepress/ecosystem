import { useMutationObserver } from '@vueuse/core'
import type { Ref } from 'vue'
import { onMounted, readonly, ref } from 'vue'

import { getDarkMode } from '../utils/index.js'

let darkmode: Readonly<Ref<boolean>> | null = null

const _useDarkMode = (): Readonly<Ref<boolean>> => {
  const isDarkMode = ref(false)

  onMounted(() => {
    isDarkMode.value = getDarkMode()

    // Watch darkmode change
    useMutationObserver(
      document.documentElement,
      () => {
        isDarkMode.value = getDarkMode()
      },
      {
        attributeFilter: ['data-theme'],
        attributes: true,
      },
    )
  })

  return readonly(isDarkMode)
}

/**
 * Get darkmode status
 *
 * 获取暗色模式状态
 *
 * @returns Readonly darkmode ref / 只读的暗色模式响应式引用
 */
// eslint-disable-next-line no-return-assign
export const useDarkMode = (): Readonly<Ref<boolean>> =>
  (darkmode ??= _useDarkMode())
