import type { Plugin, PluginFunction } from 'vuepress/core'
import { colors } from 'vuepress/utils'
import type { ExtendPage } from '../typings/index.js'
import { appendSEO } from './appendSEO.js'
import { generateDescription } from './generateDescription.js'
import { generateRobotsTxt } from './generateRobotsTxt.js'
import type { SeoPluginOptions } from './options.js'
import { PLUGIN_NAME, logger } from './utils/index.js'

export const seoPlugin =
  (options: SeoPluginOptions): PluginFunction =>
  (app) => {
    if (app.env.isDebug) logger.info('Options:', options)

    const { autoDescription = true, hostname, ...rest } = options

    const plugin: Plugin = { name: PLUGIN_NAME }

    if (!hostname) {
      logger.error(`Option ${colors.magenta('hostname')} is required!`)

      return plugin
    }

    return {
      ...plugin,

      extendsPage: (page: ExtendPage): void => {
        if (page.frontmatter.seo !== false)
          generateDescription(app, page, autoDescription)
      },

      onInitialized: (): void => {
        appendSEO(app, { hostname, ...rest })
      },

      onGenerated: (): Promise<void> => generateRobotsTxt(app),
    }
  }
