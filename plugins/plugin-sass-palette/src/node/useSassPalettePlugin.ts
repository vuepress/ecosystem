import type { App, PluginObject } from 'vuepress/core'
import type { SassPalettePluginOptions } from './options.js'
import { sassPalettePlugin } from './sassPalettePlugin.js'

export const useSassPalettePlugin = (
  app: App,
  options: SassPalettePluginOptions,
): void => {
  const { plugins } = app.pluginApi

  if (
    plugins
      .filter<
        PluginObject & { id: string }
      >((plugin): plugin is PluginObject & { id: string } => plugin.name === `@vuepress/plugin-sass-palette`)
      .every((plugin) => plugin.id !== options.id)
  )
    app.use(sassPalettePlugin(options))
}
