import type { App } from 'vuepress/core'
import type { ReadingTimePluginOptions } from './options.js'
import { readingTimePlugin } from './readingTimePlugin.js'

/**
 * Composition API to use `@vuepress/plugin-reading-time`
 *
 * 使用 `@vuepress/plugin-reading-time` 的组合式 API
 *
 * @param app - VuePress app instance
 * @param options - plugin options
 *
 * @example
 * ```ts
 * import { useReadingTimePlugin } from '@vuepress/plugin-reading-time'
 *
 * export default (options) => (app) => {
 *   useReadingTimePlugin(app, {
 *     wordPerMinute: 250
 *   })
 *
 *   return {
 *     name: 'vuepress-plugin-xxx'
 *   }
 * }
 * ```
 */
export const useReadingTimePlugin = (
  app: App,
  options: ReadingTimePluginOptions = {},
): void => {
  const { plugins } = app.pluginApi

  if (
    plugins.every((plugin) => plugin.name !== '@vuepress/plugin-reading-time')
  )
    app.use(readingTimePlugin(options))
}

/**
 * Composition API to remove `@vuepress/plugin-reading-time`
 *
 * 移除 `@vuepress/plugin-reading-time` 的组合式 API
 *
 * @param app - VuePress app instance
 *
 * @example
 * ```ts
 * import { removeReadingTimePlugin } from '@vuepress/plugin-reading-time'
 *
 * export default (options) => (app) => {
 *   removeReadingTimePlugin(app)
 *
 *   return {
 *     name: 'vuepress-plugin-xxx'
 *   }
 * }
 * ```
 */
export const removeReadingTimePlugin = (app: App): void => {
  const { plugins } = app.pluginApi

  const index = plugins.findIndex(
    (plugin) => plugin.name === '@vuepress/plugin-reading-time',
  )

  if (index !== -1) app.pluginApi.plugins.splice(index, 1)
}
