import { customizeDevServer } from '@vuepress/helper/node'
import type { PluginFunction, PluginObject } from 'vuepress/core'
import { colors } from 'vuepress/utils'
import { getSiteMap } from './getSitemap.js'
import { getSiteMapTemplate } from './getSitemapTemplate.js'
import type { SitemapOptions } from './options.js'
import { outputSitemap } from './outputSitemap.js'
import { ensureHostName, logger, PLUGIN_NAME } from './utils.js'

export const sitemapPlugin =
  (options: SitemapOptions): PluginFunction =>
  (app) => {
    if (app.env.isDebug) logger.info('Options:', options)

    const plugin: PluginObject = {
      name: PLUGIN_NAME,
    }

    if (!ensureHostName(app, options)) {
      logger.error(`Option ${colors.magenta('hostname')} is required!`)

      return plugin
    }

    return {
      ...plugin,

      extendsBundlerOptions: async (config, app): Promise<void> => {
        if (options.devServer)
          [await getSiteMap(app, options), getSiteMapTemplate(options)].forEach(
            ([path, content]) => {
              customizeDevServer(config, app, {
                path,
                response: async () => Promise.resolve(content),
                errMsg: 'Unexpected sitemap generation error',
              })
            },
          )
      },

      onGenerated: (app): Promise<void> => outputSitemap(app, options),
    }
  }
