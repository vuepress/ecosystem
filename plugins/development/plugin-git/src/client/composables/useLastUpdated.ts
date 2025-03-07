import type { ComputedRef } from 'vue'
import { computed } from 'vue'
import { usePageData, usePageLang } from 'vuepress/client'
import type { GitPluginPageData } from '../../shared/index.js'
import { useGitLocaleConfig } from './useGitLocales.js'

export interface LastUpdated {
  date: Date
  iso: string
  text: string
}

export const useLastUpdated = (): ComputedRef<LastUpdated | null> => {
  const lang = usePageLang()
  const locale = useGitLocaleConfig()
  const page = usePageData<GitPluginPageData>()

  return computed(() => {
    const timeStamp =
      // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
      page.value.git?.updatedTime ?? page.value.git?.changelog?.[0].time

    if (!timeStamp) return null

    const date = new Date(timeStamp)

    const formatted = new Intl.DateTimeFormat(lang.value, {
      dateStyle: 'short',
      timeStyle: 'short',
    }).format(timeStamp)

    return {
      date,
      iso: date.toISOString(),
      text: `${locale.value.latestUpdateAt} ${formatted}`,
    }
  })
}
