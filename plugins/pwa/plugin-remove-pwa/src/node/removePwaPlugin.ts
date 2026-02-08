import type { PluginObject } from 'vuepress/core'
import type { RemovePwaPluginOptions } from './options.js'
import { generateEmptyServiceWorker } from './serviceWorkerContent.js'

/**
 * VuePress plugin to remove PWA service workers
 *
 * VuePress 插件，用于移除 PWA service workers
 */
export const removePwaPlugin = ({
  swLocation = 'service-worker.js',
  cachePatterns = [],
}: RemovePwaPluginOptions): PluginObject => ({
  name: '@vuepress/plugin-remove-pwa',

  onGenerated: async (app) => {
    await generateEmptyServiceWorker(app, swLocation, cachePatterns)
  },
})
