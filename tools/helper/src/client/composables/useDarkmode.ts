import { useMutationObserver } from '@vueuse/core'
import type { Ref } from 'vue'
import { onMounted, readonly, ref } from 'vue'

import { getDarkmode } from '../utils/index.js'

let darkmode: Readonly<Ref<boolean>> | null = null

const _useDarkmode = (): Readonly<Ref<boolean>> => {
  const isDarkmode = ref(false)

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

  onMounted(() => {
    isDarkmode.value = getDarkmode()
  })

  return readonly(isDarkmode)
}

// eslint-disable-next-line no-return-assign
export const useDarkmode = (): Readonly<Ref<boolean>> =>
  (darkmode ??= _useDarkmode())
