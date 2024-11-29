import { addViteOptimizeDepsExclude } from '@vuepress/helper'
import type { App, BundlerOptions } from 'vuepress'

export const extendsBundlerOptions = (
  bundlerOptions: BundlerOptions,
  app: App,
): void => {
  // ensure theme alias is not optimized by Vite
  addViteOptimizeDepsExclude(bundlerOptions, app, '@theme')
}
