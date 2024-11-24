import {
  addViteConfig,
  addViteOptimizeDepsExclude,
  chainWebpack,
} from '@vuepress/helper'
import type { App, BundlerOptions } from 'vuepress'

export const extendsBundlerOptions = (
  bundlerOptions: BundlerOptions,
  app: App,
): void => {
  // ensure theme alias is not optimized by Vite
  addViteOptimizeDepsExclude(bundlerOptions, app, '@theme')
  // FIXME: hide sass deprecation warning for mixed-decls
  const silenceDeprecations = [
    'mixed-decls',
    'legacy-js-api',
    'import',
    'global-builtin',
  ]
  addViteConfig(bundlerOptions, app, {
    css: {
      preprocessorOptions: {
        sass: { silenceDeprecations },
        scss: { silenceDeprecations },
      },
    },
  })
  chainWebpack(bundlerOptions, app, (config) => {
    config.module
      .rule('scss')
      .use('sass-loader')
      .tap((options) => ({
        ...options,
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        sassOptions: {
          silenceDeprecations,
          ...options.sassOptions,
        },
      }))
  })
}
