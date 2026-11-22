import '@vuepress/helper/colors.css'
import './theme-default/styles/fonts.css'

export * from './theme-default/without-fonts.js'
export { default } from './theme-default/without-fonts.js'

export { usePageType } from './composables/useThemePageData.js'
export type * from './composables/useThemePageData.js'
export type {
  ThemeConfig,
  ThemeLayout,
  ThemePageData,
} from '../shared/types.js'
