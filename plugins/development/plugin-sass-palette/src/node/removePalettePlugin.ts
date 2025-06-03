import type { App, PluginObject } from 'vuepress/core'

/**
 * Remove sass palette plugin with specific id
 *
 * @description Remove a sass palette plugin instance from app by id to avoid conflicts.
 *
 * 移除指定 ID 的 Sass 调色板插件
 *
 * @description 通过 ID 从应用中移除一个 Sass 调色板插件实例以避免冲突。
 *
 * @example
 * ```ts
 * // Remove palette plugin with id "hope"
 * removePalettePlugin(app, "hope")
 * ```
 */
export const removePalettePlugin = (app: App, id: string): void => {
  const { plugins } = app.pluginApi

  const index = plugins
    .filter<
      PluginObject & { id: string }
    >((plugin): plugin is PluginObject & { id: string } => plugin.name === `@vuepress/plugin-sass-palette`)
    .findIndex((plugin) => plugin.id === id)

  if (index !== -1) plugins.splice(index, 1)
}
