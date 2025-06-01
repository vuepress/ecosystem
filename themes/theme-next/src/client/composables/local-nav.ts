import { useData } from '@theme/data'
import type { MenuItem } from '@theme/outline'
import { getHeaders } from '@theme/outline'
import type { ComputedRef, ShallowRef } from 'vue'
import { computed, shallowRef } from 'vue'
import { onContentUpdated } from 'vuepress/client'

/**
 * ReturnType of `useLocalNav`.
 */
export interface DocLocalNav {
  /**
   * The outline headers of the current page.
   */
  headers: ShallowRef

  /**
   * Whether the current page has a local nav. Local nav is shown when the
   * "outline" is present in the page. However, note that the actual
   * local nav visibility depends on the screen width as well.
   */
  hasLocalNav: ComputedRef<boolean>
}

export const useLocalNav = (): DocLocalNav => {
  const { themeLocale, frontmatter } = useData()

  const headers = shallowRef<MenuItem[]>([])

  const hasLocalNav = computed(() => headers.value.length > 0)

  onContentUpdated((reason) => {
    headers.value =
      reason === 'beforeUnmount'
        ? []
        : getHeaders(frontmatter.value.outline ?? themeLocale.value.outline)
  })

  return {
    headers,
    hasLocalNav,
  }
}
