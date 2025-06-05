import type { MaybeRef, Ref } from 'vue'
import { ref, toValue } from 'vue'
import { onContentUpdated } from 'vuepress/client'
import type { GetHeadersOptions } from '../../shared/index.js'
import type { HeaderItem } from '../utils/index.js'
import { getHeaders } from '../utils/index.js'

export type HeadersRef = Ref<HeaderItem[]>

/**
 * Composables for page headers
 *
 * 页面标题的组合函数
 *
 * @param options - Options for getting headers / 获取标题的选项
 *
 * @returns Reactive headers reference / 响应式标题引用
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
