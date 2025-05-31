import { useData } from '@theme/data'
import type { ComputedRef, Ref } from 'vue'
import { computed, onMounted, ref, watchEffect } from 'vue'
import { usePageLang } from 'vuepress/client'

export const useLastUpdated = (): {
  datetime: Ref<string>
  lastUpdatedText: ComputedRef<string | undefined>
  isoDatetime: ComputedRef<string | undefined>
} => {
  const { frontmatter, page, themeLocale } = useData()
  const lang = usePageLang()

  const date = computed(() =>
    page.value.git?.updatedTime ? new Date(page.value.git.updatedTime) : null,
  )
  const isoDatetime = computed(() => date.value?.toISOString())

  const datetime = ref('')

  const lastUpdatedText = computed(() => {
    if (themeLocale.value.lastUpdated === false) return
    return themeLocale.value.lastUpdatedText || 'Last updated'
  })

  // set time on mounted hook to avoid hydration mismatch due to
  // potential differences in timezones of the server and clients
  onMounted(() => {
    watchEffect(() => {
      if (
        frontmatter.value.lastUpdated === false ||
        themeLocale.value.lastUpdated === false
      )
        return

      datetime.value = date.value
        ? new Intl.DateTimeFormat(
            themeLocale.value.lastUpdatedFormatOptions?.forceLocale
              ? lang.value
              : undefined,
            themeLocale.value.lastUpdatedFormatOptions ?? {
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
