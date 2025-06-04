import type {
  WebpackBundlerOptions,
  WebpackChainConfig,
} from '@vuepress/bundler-webpack'
import type { App } from 'vuepress/core'
import { getBundlerName } from '../getBundlerName.js'

/**
 * Chain webpack
 *
 * 链式配置 webpack
 *
 * @param bundlerOptions - VuePress Bundler config / VuePress 打包器配置
 * @param app - VuePress Node App / VuePress Node 应用
 * @param chain - Chain function / 链式配置函数
 */
export const chainWebpack = (
  bundlerOptions: unknown,
  app: App,
  chain: (
    config: WebpackChainConfig,
    isServer: boolean,
    isBuild: boolean,
  ) => void,
): void => {
  if (getBundlerName(app) === 'webpack') {
    const webpackBundlerOptions = bundlerOptions as WebpackBundlerOptions
    const { chainWebpack: originalChainWebpack } = webpackBundlerOptions

    webpackBundlerOptions.chainWebpack = (config, isServer, isBuild): void => {
      originalChainWebpack?.(config, isServer, isBuild)
      chain(config, isServer, isBuild)
    }
  }
}
