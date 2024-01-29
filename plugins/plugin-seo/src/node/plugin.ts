import type { Plugin, PluginFunction } from 'vuepress/core'
import { colors } from 'vuepress/utils'
import { generateDescription } from './description.js'
import type { SeoOptions } from './options.js'
import { appendSEO, generateRobotsTxt } from './seo.js'
import type { ExtendPage } from './typings/index.js'
import { logger, PLUGIN_NAME } from './utils/index.js'

export const seoPlugin =
  (options: SeoOptions): PluginFunction =>
  (app) => {
    if (app.env.isDebug) logger.info('Options:', options)

    const plugin: Plugin = { name: PLUGIN_NAME }

    if (!options.hostname) {
      logger.error(`Option ${colors.magenta('hostname')} is required!`)

      return plugin
    }

    return {
      ...plugin,

      extendsPage: (page: ExtendPage): void => {
        if (page.frontmatter.seo !== false)
          generateDescription(app, page, options.autoDescription !== false)
      },

      onInitialized: (app): void => {
        appendSEO(app, options)
      },

      onGenerated: (app): Promise<void> => generateRobotsTxt(app.dir),
    }
  }
