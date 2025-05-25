import { useData } from '@theme/useData'
import type { HeaderItem } from '@vuepress/helper/client'
import { getHeaders } from '@vuepress/helper/client'
import { injectLocal, provideLocal } from '@vueuse/core'
import type { InjectionKey, Ref } from 'vue'
import { computed, ref } from 'vue'
import { onContentUpdated } from 'vuepress/client'

export type HeadersRef = Ref<HeaderItem[]>

export const headersSymbol: InjectionKey<HeadersRef> = Symbol('headers')

/**
 * Inject headers
 */
export const useHeaders = (): HeadersRef => {
  const headers = injectLocal(headersSymbol)

  if (!headers) {
    throw new Error('useHeaders() is called without provider.')
  }
  return headers
}

export const setupHeaders = (): void => {
  const { frontmatter, themeLocale } = useData()

  const headersRef: HeadersRef = ref([])
  const levels = computed(
    () => frontmatter.value.sidebarDepth ?? themeLocale.value.sidebarDepth ?? 2,
  )

  const updateHeaders = (): void => {
    if (levels.value <= 0) {
      headersRef.value = []
      return
    }

    headersRef.value = getHeaders({
      levels: [2, levels.value + 1],
      ignore: ['.vp-badge'],
    })
  }

  provideLocal(headersSymbol, headersRef)

  onContentUpdated((reason) => {
    if (reason === 'beforeUnmount') headersRef.value = []
    else updateHeaders()
  })
}
