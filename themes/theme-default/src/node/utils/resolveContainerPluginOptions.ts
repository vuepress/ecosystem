import type { MarkdownContainerPluginOptions } from '@vuepress/plugin-markdown-container'
import type { DefaultThemeData } from '../../shared/index.js'

/**
 * Resolve options for @vuepress/plugin-markdown-container
 *
 * For custom containers default title
 */
export const resolveMarkdownContainerPluginOptions = (
  localeOptions: DefaultThemeData,
  type: 'danger' | 'tip' | 'warning',
): MarkdownContainerPluginOptions => {
  const locales = Object.entries(localeOptions.locales ?? {}).reduce(
    (result, [key, value]) => {
      result[key] = {
        defaultInfo: value[type] ?? localeOptions[type],
      }
      return result
    },
    {},
  )

  return {
    type,
    locales,
  }
}
