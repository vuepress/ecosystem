import { useThemeLocaleData } from '@theme/useThemeData'
import type { HeaderItem } from '@vuepress/helper/client'
import { getHeaders } from '@vuepress/helper/client'
import { injectLocal, provideLocal, watchImmediate } from '@vueuse/core'
import type { InjectionKey, Ref } from 'vue'
import { computed, onMounted, ref } from 'vue'
import { usePageFrontmatter, useRoutePath } from 'vuepress/client'
import type { DefaultThemeNormalPageFrontmatter } from '../../shared/index.js'

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
  const headersRef: HeadersRef = ref([])

  const routePath = useRoutePath()
  const themeLocale = useThemeLocaleData()
  const frontmatter = usePageFrontmatter<DefaultThemeNormalPageFrontmatter>()
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

  onMounted(() => {
    watchImmediate([levels, routePath], updateHeaders)
  })
}
