import { computed, shallowRef } from 'vue'
import type { ComputedRef, ShallowRef } from 'vue'
import { onContentUpdated } from '../composables/content-update.js'
import { getHeaders } from '../composables/outline.js'
import type { MenuItem } from '../composables/outline.js'
import { useData } from './data.js'

/**
 * ReturnType of `useLocalNav`.
 */
export interface DocLocalNav {
  /**
   * The outline headers of the current page.
   */
  headers: ShallowRef<any>

  /**
   * Whether the current page has a local nav. Local nav is shown when the
   * "outline" is present in the page. However, note that the actual
   * local nav visibility depends on the screen width as well.
   */
  hasLocalNav: ComputedRef<boolean>
}

export function useLocalNav(): DocLocalNav {
  const { theme, frontmatter } = useData()

  const headers = shallowRef<MenuItem[]>([])

  const hasLocalNav = computed(() => {
    return headers.value.length > 0
  })

  onContentUpdated(() => {
    headers.value = getHeaders(frontmatter.value.outline ?? theme.value.outline)
  })

  return {
    headers,
    hasLocalNav,
  }
}
