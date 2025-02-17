import { useMutationObserver } from '@vueuse/core'
import type { Ref } from 'vue'
import { onMounted, readonly, ref } from 'vue'

import { getDarkmode } from '../utils/index.js'

let darkmode: Readonly<Ref<boolean>> | null = null

const _useDarkmode = (): Readonly<Ref<boolean>> => {
  const isDarkmode = ref(false)

  onMounted(() => {
    isDarkmode.value = getDarkmode()

    // Watch darkmode change
    useMutationObserver(
      document.documentElement,
      () => {
        isDarkmode.value = getDarkmode()
      },
      {
        attributeFilter: ['data-theme'],
        attributes: true,
      },
    )
  })

  return readonly(isDarkmode)
}

/**
 * Get darkmode status
 *
 * @returns readonly darkmode ref
 */
// eslint-disable-next-line no-return-assign
export const useDarkmode = (): Readonly<Ref<boolean>> =>
  (darkmode ??= _useDarkmode())
