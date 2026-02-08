import type { ExactLocaleConfig } from '@vuepress/helper/client'
import { useLocale } from '@vuepress/helper/client'
import type { ComputedRef } from 'vue'
import type { GitLocaleData } from '../../shared/index.js'

declare const __GIT_LOCALES__: ExactLocaleConfig<GitLocaleData>

/**
 * Git plugin locales
 *
 * Git 插件多语言配置
 */
export const locales =
  typeof __GIT_LOCALES__ === 'undefined' ? {} : __GIT_LOCALES__

/**
 * Git locale composable
 *
 * Git 多语言组合式函数
 *
 * @returns Git locale data / Git 多语言数据
 */
export const useGitLocale = (): ComputedRef<GitLocaleData> => useLocale(locales)
