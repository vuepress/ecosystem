import { computed, onMounted, ref, watchEffect } from 'vue'
import type { ComputedRef, Ref } from 'vue'
import { usePageLang } from 'vuepress/client'
import { useData } from './data.js'

export function useLastUpdated(): {
  datetime: Ref<string>
  lastUpdatedText: ComputedRef<string | undefined>
  isoDatetime: ComputedRef<string | undefined>
} {
  const { theme, page, frontmatter } = useData()
  const lang = usePageLang()

  const date = computed(() =>
    page.value.git?.updatedTime ? new Date(page.value.git.updatedTime) : null,
  )
  const isoDatetime = computed(() => date.value?.toISOString())

  const datetime = ref('')

  const lastUpdatedText = computed(() => {
    if (theme.value.lastUpdated === false) return
    return theme.value.lastUpdatedText || 'Last updated'
  })

  // set time on mounted hook to avoid hydration mismatch due to
  // potential differences in timezones of the server and clients
  onMounted(() => {
    watchEffect(() => {
      if (
        frontmatter.value.lastUpdated === false ||
        theme.value.lastUpdated === false
      )
        return

      datetime.value = date.value
        ? new Intl.DateTimeFormat(
            theme.value.lastUpdatedFormatOptions?.forceLocale
              ? lang.value
              : undefined,
            theme.value.lastUpdatedFormatOptions ?? {
              dateStyle: 'short',
              timeStyle: 'short',
            },
          ).format(date.value)
        : ''
    })
  })

  return {
    isoDatetime,
    datetime,
    lastUpdatedText,
  }
}
