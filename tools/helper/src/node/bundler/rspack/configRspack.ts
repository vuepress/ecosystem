import type {
  RspackBundlerOptions,
  RspackConfiguration,
} from '@vuepress/bundler-rspack'
import type { App } from 'vuepress/core'

import { getBundlerName } from '../getBundlerName.js'

/**
 * Configure rspack options
 *
 * 配置 rspack 选项
 *
 * @param bundlerOptions - VuePress Bundler config / VuePress 打包器配置
 * @param app - VuePress Node App / VuePress Node 应用
 * @param configureRspack - Function to configure rspack / 配置 rspack 的函数
 */
export const configRspack = (
  bundlerOptions: unknown,
  app: App,
  configureRspack: (
    config: RspackConfiguration,
    isServer: boolean,
    isBuild: boolean,
  ) => void,
): void => {
  if (getBundlerName(app) === 'rspack') {
    const rspackBundlerOptions = bundlerOptions as RspackBundlerOptions
    const { configureRspack: originalConfigRspack } = rspackBundlerOptions

    /**
     * Configure rspack options
     *
     * @param config - Rspack config
     * @param isServer - Whether it's for server
     * @param isBuild - Whether it's for build
     * @returns Updated rspack config
     */
    rspackBundlerOptions.configureRspack = (
      config,
      isServer,
      isBuild,
    ): RspackConfiguration | void => {
      const result = originalConfigRspack?.(config, isServer, isBuild)

      configureRspack(config, isServer, isBuild)

      return result
    }
  }
}
