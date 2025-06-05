import type {
  WebpackBundlerOptions,
  WebpackConfiguration,
} from '@vuepress/bundler-webpack'
import type { App } from 'vuepress/core'
import { getBundlerName } from '../getBundlerName.js'

/**
 * Configure webpack options
 *
 * 配置 webpack 选项
 *
 * @param bundlerOptions - VuePress Bundler config / VuePress 打包器配置
 * @param app - VuePress Node App / VuePress Node 应用
 * @param configureWebpack - Function to configure webpack / 配置 webpack 的函数
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
