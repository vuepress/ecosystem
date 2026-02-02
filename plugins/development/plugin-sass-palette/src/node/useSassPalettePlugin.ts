import type { App, PluginObject } from 'vuepress/core'
import type { SassPalettePluginOptions } from './options.js'
import { sassPalettePlugin } from './sassPalettePlugin.js'
import { PLUGIN_NAME } from './utils.js'

/**
 * Use sass palette plugin
 *
 * 使用 Sass 调色板插件
 *
 * @description Add sass palette plugin to app if not already registered with the same id.
 *
 * 如果具有相同 ID 的插件尚未注册，则将 Sass 调色板插件添加到应用中。
 *
 * @example
 * ```ts
 * // Use sass palette plugin with specific options
 * useSassPalettePlugin(app, {
 *   id: "hope",
 *   config: ".vuepress/styles/config.scss"
 * })
 * ```
 */
export const useSassPalettePlugin = (
  app: App,
  options: SassPalettePluginOptions,
): void => {
  const { plugins } = app.pluginApi

  if (
    plugins
      .filter<PluginObject & { id: string }>(
        (plugin): plugin is PluginObject & { id: string } =>
          plugin.name === PLUGIN_NAME,
      )
      .every((plugin) => plugin.id !== options.id)
  )
    app.use(sassPalettePlugin(options))
}
