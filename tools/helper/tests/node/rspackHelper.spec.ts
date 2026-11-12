import type { RspackBundlerOptions } from '@vuepress/bundler-rspack'
import { describe, expect, it, vi } from 'vitest'
import type { App } from 'vuepress/core'

import { chainRspack } from '../../src/node/bundler/rspack/chainRspack.js'
import { configRspack } from '../../src/node/bundler/rspack/configRspack.js'

type RspackChainConfig = Parameters<
  NonNullable<RspackBundlerOptions['chainRspack']>
>[0]
type RspackConfig = Parameters<
  NonNullable<RspackBundlerOptions['configureRspack']>
>[0]

const createApp = (name: string): App =>
  ({ options: { bundler: { name } } }) as unknown as App

describe(chainRspack, () => {
  it('should wrap the original chainRspack', () => {
    const originalChain =
      vi.fn<
        (config: RspackChainConfig, isServer: boolean, isBuild: boolean) => void
      >()
    const chain =
      vi.fn<
        (config: RspackChainConfig, isServer: boolean, isBuild: boolean) => void
      >()
    const bundlerOptions: RspackBundlerOptions = {
      chainRspack: originalChain,
    }

    chainRspack(bundlerOptions, createApp('@vuepress/bundler-rspack'), chain)

    const { chainRspack: wrapped } = bundlerOptions

    expect(wrapped).toBeTypeOf('function')

    const config = {} as RspackChainConfig
    wrapped?.(config, true, false)

    expect(originalChain).toHaveBeenCalledWith(config, true, false)
    expect(chain).toHaveBeenCalledWith(config, true, false)
  })

  it('should do nothing for other bundlers', () => {
    const chain =
      vi.fn<
        (config: RspackChainConfig, isServer: boolean, isBuild: boolean) => void
      >()
    const bundlerOptions: RspackBundlerOptions = {}

    chainRspack(bundlerOptions, createApp('@vuepress/bundler-vite'), chain)

    expect(bundlerOptions.chainRspack).toBeUndefined()
    expect(chain).not.toHaveBeenCalled()
  })
})

describe(configRspack, () => {
  it('should wrap the original configureRspack and keep its return value', () => {
    const newConfig = {} as RspackConfig
    const originalConfigure = vi.fn<
      (
        config: RspackConfig,
        isServer: boolean,
        isBuild: boolean,
      ) => RspackConfig
    >(() => newConfig)
    const configure =
      vi.fn<
        (config: RspackConfig, isServer: boolean, isBuild: boolean) => void
      >()
    const bundlerOptions: RspackBundlerOptions = {
      configureRspack: originalConfigure,
    }

    configRspack(
      bundlerOptions,
      createApp('@vuepress/bundler-rspack'),
      configure,
    )

    const { configureRspack: wrapped } = bundlerOptions
    const config = {} as RspackConfig
    const result = wrapped?.(config, false, true)

    expect(result).toBe(newConfig)
    expect(originalConfigure).toHaveBeenCalledWith(config, false, true)
    expect(configure).toHaveBeenCalledWith(config, false, true)
  })

  it('should do nothing for other bundlers', () => {
    const configure =
      vi.fn<
        (config: RspackConfig, isServer: boolean, isBuild: boolean) => void
      >()
    const bundlerOptions: RspackBundlerOptions = {}

    configRspack(
      bundlerOptions,
      createApp('@vuepress/bundler-webpack'),
      configure,
    )

    expect(bundlerOptions.configureRspack).toBeUndefined()
    expect(configure).not.toHaveBeenCalled()
  })
})
