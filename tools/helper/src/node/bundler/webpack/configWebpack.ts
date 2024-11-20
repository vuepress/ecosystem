import type {
  WebpackBundlerOptions,
  WebpackConfiguration,
} from '@vuepress/bundler-webpack'
import type { App } from 'vuepress/core'
import { getBundlerName } from '../getBundlerName.js'

/**
 * Configure webpack options
 *
 * @param bundlerOptions VuePress Bundler config
 * @param app VuePress Node App
 * @param configureWebpack function to configure webpack
 */
export const configWebpack = (
  bundlerOptions: unknown,
  app: App,
  configureWebpack: (
    config: WebpackConfiguration,
    isServer: boolean,
    isBuild: boolean,
  ) => void,
): void => {
  if (getBundlerName(app) === 'webpack') {
    const webpackBundlerOptions = bundlerOptions as WebpackBundlerOptions
    const { configureWebpack: originalConfigWebpack } = webpackBundlerOptions

    webpackBundlerOptions.configureWebpack = (
      config,
      isServer,
      isBuild,
    ): WebpackConfiguration | void => {
      const result = originalConfigWebpack?.(config, isServer, isBuild)

      configureWebpack(config, isServer, isBuild)

      return result
    }
  }
}
