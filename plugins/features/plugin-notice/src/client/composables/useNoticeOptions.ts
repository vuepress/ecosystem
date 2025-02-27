import { NOTICE_OPTIONS } from '@internal/noticeOptions'
import type { Ref } from 'vue'
import { ref } from 'vue'
import type { NoticeAttrOptions } from '../../shared/index.js'

declare const __VUE_HMR_RUNTIME__: Record<string, unknown>

export type NoticeOptionsRef = Ref<NoticeAttrOptions[]>

export const noticeOptions: NoticeOptionsRef = ref(
  NOTICE_OPTIONS,
) as NoticeOptionsRef

export const useNoticeOptions = (): NoticeOptionsRef => noticeOptions

if (__VUEPRESS_DEV__ && (import.meta.webpackHot || import.meta.hot)) {
  __VUE_HMR_RUNTIME__.updateNoticeOptions = (data: NoticeAttrOptions[]) => {
    noticeOptions.value = data
  }
}
