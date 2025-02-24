import type { HeaderItem } from '@vuepress/helper/client'
import { getHeaders } from '@vuepress/helper/client'
import type { MaybeRef, Ref } from 'vue'
import { ref, toValue } from 'vue'
import { onContentUpdated } from 'vuepress/client'
import type { GetHeadersOptions } from '../../shared/index.js'

export type HeadersRef = Ref<HeaderItem[]>

/**
 * Inject headers
 */
export const useHeaders = (
  options: MaybeRef<GetHeadersOptions | undefined> = {},
): HeadersRef => {
  const headersRef: HeadersRef = ref([])

  onContentUpdated((reason) => {
    headersRef.value =
      reason === 'beforeUnmount' ? [] : getHeaders(toValue(options))
  })

  return headersRef
}
