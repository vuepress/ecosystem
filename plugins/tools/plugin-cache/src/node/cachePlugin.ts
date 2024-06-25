import type { Plugin } from 'vuepress/core'
import { highlightCache } from './highlightCache.js'
import { renderCacheWithFile, renderCacheWithMemory } from './renderCache.js'

export interface CachePluginOptions {
  /**
   * Cache type
   *
   * - Using memory caching can achieve the best optimization effects, but the cost increases as the project grows, occupying more content, suitable for projects with fewer pages.
   * - For complex projects with many pages, it is recommended to use file caching.
   *
   * @default 'memory'
   */
  type?: 'memory' | 'file'
}
/**
 * Cache markdown rendering, optimize compilation speed.
 *
 * This plugin is recommended to be placed after all other plugins to ensure maximum utilization of the cache.
 */
export const cachePlugin = ({ type }: CachePluginOptions = {}): Plugin => {
  return {
    name: '@vuepress/plugin-cache',

    async extendsMarkdown(md, app) {
      highlightCache(md, app)
      if (type === 'file') {
        await renderCacheWithFile(md, app)
      } else {
        await renderCacheWithMemory(md, app)
      }
    },
  }
}
