import { useSupported } from '@vueuse/core'
import type { ComputedRef } from 'vue'
import { computed } from 'vue'

export const useMobile = (): ComputedRef<boolean> => {
  const supportUserAgent = useSupported(
    () => typeof window !== 'undefined' && 'userAgent' in window.navigator,
  )

  return computed(
    () =>
      supportUserAgent.value &&
      /\b(?:Android|iPhone)/i.test(navigator.userAgent),
  )
}
