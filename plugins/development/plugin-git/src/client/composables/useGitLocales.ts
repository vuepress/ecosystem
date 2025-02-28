import { useLocaleConfig } from '@vuepress/helper/client'
import type { ComputedRef } from 'vue'
import type { GitLocaleData, GitLocales } from '../../shared/index.js'

declare const __GIT_LOCALES__: GitLocales

export const locales = __GIT_LOCALES__

export const useGitLocales = (): ComputedRef<Partial<GitLocaleData>> =>
  useLocaleConfig(locales)
