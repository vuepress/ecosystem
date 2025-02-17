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
 * @returns readonly darkmode ref
 */
// eslint-disable-next-line no-return-assign
export const useDarkMode = (): Readonly<Ref<boolean>> =>
  (darkmode ??= _useDarkMode())
