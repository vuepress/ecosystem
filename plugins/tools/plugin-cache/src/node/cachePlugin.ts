import type { Plugin } from 'vuepress/core'
import { highlightCache } from './highlightCache.js'
import { renderCache } from './renderCache.js'

/**
 * Cache markdown rendering, optimize compilation speed.
 *
 * This plugin is recommended to be placed after all other plugins to ensure maximum utilization of the cache.
 */
export const cachePlugin = (): Plugin => {
  return {
    name: '@vuepress/plugin-cache',

    async extendsMarkdown(md, app) {
      highlightCache(md, app)
      await renderCache(md, app)
    },
  }
}
