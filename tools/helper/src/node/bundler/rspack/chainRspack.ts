import type { RspackBundlerOptions } from '@vuepress/bundler-rspack'
import type { App } from 'vuepress/core'

import { getBundlerName } from '../getBundlerName.js'

/**
 * Chain rspack
 *
 * 链式配置 rspack
 *
 * @param bundlerOptions - VuePress Bundler config / VuePress 打包器配置
 * @param app - VuePress Node App / VuePress Node 应用
 * @param chain - Chain function / 链式配置函数
 */
export const chainRspack = (
  bundlerOptions: unknown,
  app: App,
  chain: (
    config: Parameters<NonNullable<RspackBundlerOptions['chainRspack']>>[0],
    isServer: boolean,
    isBuild: boolean,
  ) => void,
): void => {
  if (getBundlerName(app) === 'rspack') {
    const rspackBundlerOptions = bundlerOptions as RspackBundlerOptions
    const { chainRspack: originalChainRspack } = rspackBundlerOptions

    /**
     * Chain rspack config
     *
     * @param config - Rspack chain config
     * @param isServer - Whether it's for server
     * @param isBuild - Whether it's for build
     */
    rspackBundlerOptions.chainRspack = (config, isServer, isBuild): void => {
      originalChainRspack?.(config, isServer, isBuild)
      chain(config, isServer, isBuild)
    }
  }
}
