import '@vuepress/helper/colors.css'
import './theme-default/styles/fonts.css'

export * from './theme-default/without-fonts.js'
export { default } from './theme-default/without-fonts.js'

export {
  usePageIsNotFound,
  usePageLastUpdated,
  usePageRelativePath,
  usePageType,
  useThemePageData,
  useThemePageFrontmatter,
} from './composables/useThemePageData.js'
export type * from './composables/useThemePageData.js'
export {
  COLOR_MODE_STORAGE_KEY,
  createDarkModeRef,
  themeDarkModeSymbol,
  useDarkMode,
} from './composables/useDarkMode.js'
export { useRuntimeBase } from './composables/useRuntimeBase.js'
export {
  useThemeLocalePath,
  useThemeLocales,
} from './composables/useThemeLocalePath.js'
export type { ThemeLocale } from './composables/useThemeLocalePath.js'
export {
  useThemeData,
  useThemeLocaleData,
} from '@vuepress/plugin-theme-data/client'
export type {
  AppearanceOptions,
  ThemeConfig,
  ThemeContributor,
  ThemeLayout,
  ThemePageData,
  ThemePluginsOptions,
} from '../shared/types.js'
