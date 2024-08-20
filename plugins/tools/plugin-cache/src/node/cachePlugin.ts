import ci from 'ci-info'
import type { Plugin } from 'vuepress/core'
import { highlightCache } from './highlightCache.js'
import {
  renderCacheWithFilesystem,
  renderCacheWithMemory,
} from './renderCache.js'

export interface CachePluginOptions {
  /**
   * Cache type
   *
   * - Using memory caching can achieve the best optimization effects, but the cost increases as the project grows, occupying more content, suitable for projects with fewer pages.
   * - For complex projects with many pages, it is recommended to use file caching.
   *
   * @default 'memory'
   */
  type?: 'filesystem' | 'memory'

  /**
   * Whether to enable the cache in CI environment.
   *
   * @default false
   */
  enableInCi?: boolean
}
/**
 * Cache markdown rendering, optimize compilation speed.
 *
 * This plugin is recommended to be placed after all other plugins to ensure maximum utilization of the cache.
 */
export const cachePlugin = ({
  type,
  enableInCi = false,
}: CachePluginOptions = {}): Plugin => {
  const plugin: Plugin = {
    name: '@vuepress/plugin-cache',
  }

  if (ci.isCI && !enableInCi) {
    return plugin
  }

  return {
    ...plugin,

    async extendsMarkdown(md, app) {
      highlightCache(md, app)
      if (type === 'filesystem') {
        await renderCacheWithFilesystem(md, app)
      } else {
        await renderCacheWithMemory(md, app)
      }
    },
  }
}
