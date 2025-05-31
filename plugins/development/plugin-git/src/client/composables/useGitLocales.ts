import type { ExactLocaleConfig } from '@vuepress/helper/client'
import { useLocale } from '@vuepress/helper/client'
import type { ComputedRef } from 'vue'
import type { GitLocaleData } from '../../shared/index.js'

declare const __GIT_LOCALES__: ExactLocaleConfig<GitLocaleData>

export const locales =
  typeof __GIT_LOCALES__ === 'undefined' ? {} : __GIT_LOCALES__

export const useGitLocale = (): ComputedRef<GitLocaleData> => useLocale(locales)
