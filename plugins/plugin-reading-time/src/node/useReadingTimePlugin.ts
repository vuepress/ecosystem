import type { App } from 'vuepress/core'
import type { ReadingTimePluginOptions } from './options.js'
import { readingTimePlugin } from './readingTimePlugin.js'

/**
 * Composition Api to use `@vuepress/plugin-reading-time`
 */
export const useReadingTimePlugin = (
  app: App,
  options: ReadingTimePluginOptions = {},
  legacy = true,
): void => {
  const { plugins } = app.pluginApi

  if (
    plugins.every((plugin) => plugin.name !== '@vuepress/plugin-reading-time')
  )
    app.use(readingTimePlugin(options, legacy))
}

/**
 * Composition Api to remove `@vuepress/plugin-reading-time`
 */
export const removeReadingTimePlugin = (app: App): void => {
  const { plugins } = app.pluginApi

  const index = plugins.findIndex(
    (plugin) => plugin.name === '@vuepress/plugin-reading-time',
  )

  if (index !== -1) app.pluginApi.plugins.splice(index, 1)
}
