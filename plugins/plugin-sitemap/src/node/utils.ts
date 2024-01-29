import { Logger } from '@vuepress/helper/node'
import type { App } from 'vuepress/core'
import {
  ensureEndingSlash,
  isLinkHttp,
  removeEndingSlash,
} from 'vuepress/shared'
import { getDirname, path } from 'vuepress/utils'
import type { SitemapOptions } from './options.js'

const __dirname = getDirname(import.meta.url)

export const TEMPLATE_FOLDER = ensureEndingSlash(
  path.resolve(__dirname, '../../templates'),
)

export const DEFAULT_TEMPLATE_PATH = `${TEMPLATE_FOLDER}sitemap.xsl`

export const PLUGIN_NAME = '@vuepress/plugin-sitemap'

export const logger = new Logger(PLUGIN_NAME)

export const ensureHostName = (
  app: App,
  options: Partial<SitemapOptions>,
): boolean => {
  const hostname = app.env.isDev
    ? options.devHostname || `http://localhost:${app.options.port}`
    : options.hostname

  if (hostname) {
    // make sure hostname do not end with `/`
    options.hostname = removeEndingSlash(
      isLinkHttp(hostname) ? hostname : `https://${hostname}`,
    )

    return true
  }

  return false
}
